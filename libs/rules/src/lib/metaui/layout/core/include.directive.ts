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
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  Type,
  ViewContainerRef
} from '@angular/core';
import {assert, isBlank, isPresent} from '../../core/utils/lang';
import {MapWrapper} from '../../core/utils/collection';
import {ComponentRegistry} from '../../core/component-registry.service';


/**
 * Used by RenderComponent to represent a components and all required details needed to
 * dynamically instantiate and insert component into the view.
 */
export interface ComponentReference {
  /**
   * Metadata about the instantiated component.
   *
   * Note: before this one was called ComponentMetadate, but in Angular 2.0 final it was renamed
   * to Component
   */
  metadata: Component;

  /**
   * Component factory created by
   *
   * ```
   *  factoryResolver.resolveComponentFactory(<TYPE>)
   * ```
   *  We do not really need it now, but once we start caching created components it will more
   * more sense.
   *
   */
  resolvedCompFactory: ComponentFactory<any>;

  /**
   * Resolved Component TYPE
   */
  componentType: Type<any>;

  /**
   * String representation of componnent being rendered
   */
  componentName: string;
}

/**
 *  This abstract component can be used as standalone component but at the moment we removed
 *  this functionality
 *
 * This is the main building block to dynamically generated UI.
 *
 *
 * Todo: Currently the way Angular API works
 *
 * is too complex and there is no abstraction for element manipulation as we need to do  3
 * different calls to place a component to the container. What we want is to create some kind
 * of representation of ContainerElement with method add and remove content.
 *
 * e.g.: We want to replace applyContentElementIfAny for better solution. Now there are several
 * calls to create and add component to the view.
 *
 * We could have something like:
 *
 * ```ts
 *       constructor(vcr: ViewContainerRef, crf: ComponentResolverFactory){}
 *       ...
 *
 *     // we could have something called NgContainerElement
 *       vcr.containerElement(ComponentType | ComponentFactory ) => would return abstracted
 *       representation with current host
 *       vcr.containerElement(ComponentType, parent) => nested structure.
 *
 *    // to add Child Content
 *    vcr.containerElement().add(string | NgContainerElement | NgContent)
 *    // To create programmatically e.g. a button with ngContent
 *
 *    cr.containerElement().add('Click Me!')
 *
 *    // e.g. to create button with content
 *    vcr.containerElement(ButtonComponent, bindingsMap).add('Click Me')
 *
 *
 *
 * add more component hierarchy:
 *
 * ```ts
 *  let content = new NgContent(HoverCardComponnets, bindingsMap)
 *  content.add(createLayout();
 *  containerElement.add(content)
 *
 * ```
 * @deprecated Will be merged together with MetaIncludeComponent as we have no use for this one
 * anymore
 */
@Directive({})
export abstract class IncludeDirective implements OnDestroy, OnInit, AfterViewChecked,
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
  name: string;

  /**
   * Provides bindings which will be passed into the component when instantiated
   */
  @Input()
  bindings: Map<string, any>;

  /**
   *  Used by ngContent if we need to wrap readonly content
   */
  @Input()
  wrapNgContent: boolean = true;


  /**
   * Current created component reference using ComponentFactoryResolver. We use this to access
   * the actual component instance and Element Reference
   */
  currentComponent: ComponentRef<any>;
  /**
   * Need to cache the resolved component reference so we dont call ComponentFactoryResolver
   * everything we want to refresh a screen
   */
  resolvedComponentRef: ComponentReference;
  /**
   * I use this flag to identify that component is rendering for first time or its updated during
   * change detection
   *
   */
  protected initRenderInProgress = false;

  constructor(public viewContainer: ViewContainerRef,
              public factoryResolver: ComponentFactoryResolver,
              public cd: ChangeDetectorRef,
              public compRegistry: ComponentRegistry,
              public injector: Injector) {

    this.bindings = new Map<string, any>();
  }

  public get component(): any {
    return this.currentComponent.instance;
  }

  ngOnInit(): void {
    this.initRenderInProgress = true;

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

    // Need to run this as last thing since we want to manipulate with a DOM elements
    // and some 3th-party components assemble things in ngAfterViewInit
    this.createContentElementIfAny(true);
  }

  ngAfterViewInit(): void {
    // check to see if we need to render and reposition DOM element. Both for wrapper and content
    this.createWrapperElementIfAny();
    this.createContentElementIfAny();
  }

  ngAfterContentInit(): void {
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
   *  1. We retrieve component Type based on the component name and createa componentRef
   *  2. Place the component onto the screen
   *  3. Read component metadata, mainly @Input() and apply bindings for each of them
   *  4. Manually spin change detection to update the screen. Mainly for case where I need to
   * redraw a screen
   */
  protected doRenderComponent(): void {
    this.placeTheComponent();
    this.applyBindings(this.componentReference(), this.currentComponent, this.bindings);

    // Still not sure about this what all we should release here.
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
    this.currentComponent = this.viewContainer
      .createComponent(reference.resolvedCompFactory, null, this.injector);
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
  protected createContentElementIfAny(inAfterViewCheck: boolean = false): boolean {
    if (!this.currentComponent) {
      return false;
    }
    let detectChanges = false;
    const ngContent = this.ngContent();

    const ngContentPlaceHolder = this.currentComponent.location.nativeElement
      .querySelector('.u-ngcontent');


    if (isPresent(ngContent)) {
      const content = (this.wrapNgContent ? `<span class="m-string-field"> ${ngContent}</span>`
        : `${ngContent}`);

      this.viewContainer.element.nativeElement.innerHTML = '';
      if (ngContentPlaceHolder) {
        ngContentPlaceHolder.innerHTML = content;
      } else {
        this.viewContainer.element.nativeElement.append(content);
      }

      detectChanges = true;
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
    if (isPresent(content = this.bindings.get(IncludeDirective.NgContent))) {
      this.bindings.delete(IncludeDirective.NgContent);
    }
    return content;
  }

  protected ngContentElement(): string {
    let content: any;
    if (isPresent(content = this.bindings.get(IncludeDirective.NgContentElement))) {
      this.bindings.delete(IncludeDirective.NgContentElement);
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
    if (!!this.resolvedComponentRef) {
      return this.resolvedComponentRef;
    }
    const currType = this.resolveComponentType();
    if (this.compRegistry.componentCache.has(this.name)) {
      return this.compRegistry.componentCache.get(this.name);
    } else {
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
      this.compRegistry.componentCache.set(this.name, compReference);

      return compReference;
    }
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

    assert(!!componentType, `${this.name} component does not exists.`);
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

  protected destroy(): void {
    if (isPresent(this.currentComponent)) {
      this.currentComponent = null;
      this.resolvedComponentRef = null;
    }
  }

}
