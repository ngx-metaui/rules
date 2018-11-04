/**
 *
 * @license
 * Copyright 2017 SAP Ariba
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 *
 */
import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import {assert, isBlank, isPresent} from '../../core/utils/lang';
import {MapWrapper} from '../../core/utils/collection';
import {StringComponent} from '../widgets/string/string.component';
import {ComponentReference} from './component-reference';
import {ComponentRegistry} from './component-registry.service';

/**
 * this is specific import to we can use components as components[typename] and  get back a
 * type.
 * I could not find any better dynamic way up to now
 */
/**
 *  `IncludeComponent` directive dynamically instantiate and insert a components into the screen
 * based on the name. It can accepts bindings as well which will be automatically bound and applied
 * to the component
 *
 *  ### usage:
 *
 *  Instead of inserting component in the way:
 *
 *  ```
 *    <textfield value="some value">
 *
 *  ```
 *
 *  you can do so dynamically like this:
 *
 * ```
 *  <aw-include-component 'TextfieldComponent' [bindings]=bindings ></aw-include-component>
 * ```
 *
 * This is the main building block to dynamically generated UI.
 *
 *
 * Todo: Currently the way Angular API work and we use it to create programatically components
 * is too complext we need to create everything 3 different calls to place a component to the
 * container. What I want is is to create some kind of representation of ContainerElement and this
 * can be also parent for our BaseComponent with method add and remove content. Then we could have
 * some AWContent.
 *
 * e.g.: to replace applyContentElementIfAny where we have several calls to create and add
 * component to the view.
 *
 * ```ts
 *  let containerElement = AWConcreteTemplate(viewContainer, factoryResolver)
 *  containerElement.add('Clck Me')
 * ```
 *
 * To assemble different components together - not only adding string content
 *
 * ```ts
 *  let content = new AWContent(ButtonComponent, bindingsMap)
 *  content.add('Click Me');
 *  containerElement.add(content)
 *
 * ```
 *
 * add more component hierarchy:
 *
 * ```ts
 *  let content = new AWContent(HoverCardComponnets, bindingsMap)
 *  content.add(createLayout();
 *  containerElement.add(content)
 *
 * ```
 *
 *
 *
 *
 */
@Directive({
  selector: 'aw-include-component'
})
export class IncludeComponentDirective implements OnDestroy, OnInit, AfterViewChecked,
  OnChanges, AfterViewInit, AfterContentInit {

  static readonly NgContent = 'ngcontent';
  static readonly NgContentElement = 'ngcontentElement';

  /**
   * Full component name e.g.: DropdownComponent which is going to be inserted. We need to take
   * this name and translate it into actual TYPE. In order to do this we use a trick where we
   * access an IMPORTED components.
   *
   * ```
   * import * as components from '../components';
   * ```
   *
   * Then you can retrieve a type by just components[<String Literal >] => Component TYPE
   *
   */
  @Input()
  protected name: string;

  /**
   * Provides bindings which will be passed into the component when instantiated
   */
  @Input()
  protected bindings: Map<string, any>;

  /**
   * Current created component reference using ComponentFactoryResolver. We use this to access
   * the actual component instance and Element Reference
   */
  protected currentComponent: ComponentRef<any>;

  /**
   * I use this flag to identify that component is rendering for first time or its updated during
   * change detection
   *
   */
  protected initRenderInProgress = false;

  /**
   * Not sure if we need this, but want to keep it here or maybe move it to some service so we
   * can cache created components and maybe reuse them.
   *
   */
  protected componentReferences: Map<string, ComponentReference> =
    new Map<string, ComponentReference>();


  /**
   * Need to cache the resolved component reference so we dont call ComponentFactoryResolver
   * everything we want to refresh a screen
   */
  resolvedComponentRef: ComponentReference;


  constructor(public viewContainer: ViewContainerRef,
              public factoryResolver: ComponentFactoryResolver,
              public cd: ChangeDetectorRef,
              public compRegistry: ComponentRegistry) {

    this.bindings = new Map<string, any>();
  }

  ngOnInit(): void {

    this.initRenderInProgress = true;
    // todo: check if this the right lifecycle callback, this is called only once and you want
    // to probably listen for changes, and change dection decide there is some change and we
    // need to re-draw the view
    this.viewContainer.clear();
    this.doRenderComponent();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (isPresent(changes['name']) &&
      (changes['name'].currentValue !== changes['name'].previousValue)) {
      this.viewContainer.clear();
      this.doRenderComponent();
    }
  }


  ngAfterViewChecked(): void {
    this.initRenderInProgress = false;
  }


  ngAfterViewInit(): void {
    // check to see if we need to render and reposition DOM element both for wrapper and
    // content
    this.createWrapperElementIfAny();
    this.createContentElementIfAny();
  }


  ngAfterContentInit(): void {
  }

  /**
   * Handles a case where we need to resolve additional component and wrap the current one.
   * Just like reateContentElementIfAny() this method needs to be executed after all
   * is created and initialized (inside the ngAfterViewInit() )
   *
   */
  protected createWrapperElementIfAny(): void {
  }

  /**
   * Renders a component into actual View Container. The process goes as this.
   *  1. We retrieve component Type based on the component name, which creates componentRef
   *  2. Place the component onto the screen
   *  3. Read component metadata, mainly INPUTs and apply bindings for each of them
   *  4. Manually spin change detection to update the screen. Mainly for case where I need to
   * redraw a screen
   */
  protected doRenderComponent(): void {
    this.placeTheComponent();
    // this.currentComponent.changeDetectorRef.detach();

    this.applyBindings(this.componentReference(), this.currentComponent, this.bindings);
    // this.currentComponent.changeDetectorRef.detectChanges();

    // Still not sure about this what all I should release here.
    this.currentComponent.onDestroy(() => {
      // this.bindings.clear();
      // this.bindings = undefined;
      //
      // this.componentReferences.clear();
      // this.componentReferences = undefined;

      this.destroy();
    });
  }


  /**
   * Place actual component onto the screen using ViewContainerRef
   *
   */
  protected placeTheComponent(): void {
    const reference = this.componentReference();
    this.currentComponent = this.viewContainer.createComponent(reference.resolvedCompFactory);
  }


  /**
   * When inserting Component that needs to have a content like e.g. hyperlink or button
   *
   * ```
   *   <button> MY NG CONTENT </button>
   *
   * ```
   *  this method applies and insert a child content into the main component. This method insert
   * a simple string. We are not wrapping existing component with another component here.
   *
   * @return need to run detect changes ? default is false
   */
  protected createContentElementIfAny(): boolean {

    let detectChanges = false;
    const ngContent = this.ngContent();
    const ngContentElement = this.ngContentElement();
    if (isPresent(ngContent)) {
      const awContentComponent = this.factoryResolver.resolveComponentFactory(StringComponent);
      const component = this.viewContainer.createComponent(awContentComponent, 0);

      (<StringComponent>component.instance).value = ngContent;
      const awContentContainer = this.currentComponent.location.nativeElement.firstChild;
      awContentContainer.appendChild(component.location.nativeElement);

      detectChanges = true;
    } else if (isPresent(ngContentElement)) {
      // console.log('content Element: ', ngContentElement);
    }

    return detectChanges;
  }


  /**
   *
   * Retrieve a NG Content from binding list and remove it so it its not prepagated down when
   * applying other bindings.
   *
   */
  protected ngContent(): string {
    let content: any;
    if (isPresent(content = this.bindings.get(IncludeComponentDirective.NgContent))) {
      this.bindings.delete(IncludeComponentDirective.NgContent);
    }
    return content;
  }


  protected ngContentElement(): string {
    let content: any;
    if (isPresent(content = this.bindings.get(IncludeComponentDirective.NgContentElement))) {
      this.bindings.delete(IncludeComponentDirective.NgContentElement);
    }
    return content;
  }

  /**
   * We need to convert a component name to actual a type and then use ComponentFactoryResolver
   * to instantiate a a component and save its information into our component references. The
   * reason why we have this component reference is we need to store Angular's component metadata
   * so we can iterate thru all the inputs and bind them to the context.
   *
   * returns {ComponentReference} a reference representing a compoent currently being rendered
   */
  protected componentReference(): ComponentReference {
    if (isPresent(this.resolvedComponentRef)) {
      return this.resolvedComponentRef;
    }
    const currType = this.resolveComponentType();
    const componentFactory: ComponentFactory<any> = this.factoryResolver
      .resolveComponentFactory(currType);

    const componentMeta: Component = this.resolveDirective(componentFactory);
    const compReference: ComponentReference = {
      metadata: componentMeta,
      resolvedCompFactory: componentFactory,
      componentType: currType,
      componentName: this.name
    };

    this.resolvedComponentRef = compReference;
    return compReference;
  }

  /**
   * Iterates thru ComponentMetadata @Inputs() and check if we have available binding inside the
   * 'this.bindings'
   */
  protected applyBindings(cRef: ComponentReference,
                          component: ComponentRef<any>,
                          bindings: Map<string, any>): void {
    const inputs: string[] = cRef.metadata.inputs;

    if (isBlank(inputs) || inputs.length === 0) {
      return;
    }
    // should we do any type conversion?
    MapWrapper.iterable(bindings).forEach((v, k) => {

      if (isPresent(component.instance[k])) {
        component.instance[k] = v;
      }
    });
  }


  /**
   * Resolves a component Type based on the string literal
   *
   * @returns component type used by `ComponentFactoryResolver`
   *
   * todo: rename the method so its clear that it returns component type based on string.
   */
  protected resolveComponentType(): any {
    const componentType = this.compRegistry.nameToType.get(this.name);

    if (isBlank(componentType)) {
      assert(false, this.name + ' component does not exists. Create Dummy Component instead' +
        ' of throwing this error');
      return;
    }
    return componentType;
  }


  protected resolveDirective(compFactory: ComponentFactory<any>): Component {
    const compMeta: Component = {
      inputs: [],
      outputs: []
    };

    if (isPresent(compFactory.inputs) && compFactory.inputs.length > 0) {

      compFactory.inputs.forEach((input: { propName: string, templateName: string }) => {
        compMeta.inputs.push(input.propName);
      });
    }

    if (isPresent(compFactory.outputs) && compFactory.outputs.length > 0) {

      compFactory.outputs.forEach((output: { propName: string, templateName: string }) => {
        compMeta.outputs.push(output.propName);
      });
    }
    return compMeta;
  }


  ngOnDestroy(): void {
    if (isPresent(this.currentComponent)) {
      this.currentComponent.destroy();
      this.currentComponent = undefined;
    }

    if (isPresent(this.viewContainer)) {
      this.viewContainer.clear();
    }

  }

  private destroy(): void {
    if (isPresent(this.currentComponent)) {
      this.currentComponent = null;
      this.resolvedComponentRef = null;
    }
  }
}
