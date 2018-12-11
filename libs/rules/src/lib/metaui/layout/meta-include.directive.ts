/**
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
 * Based on original work: MetaUI: Craig Federighi (2008)
 *
 */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  DoCheck,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  SimpleChange,
  Type,
  ViewContainerRef
} from '@angular/core';
import {ComponentRegistry} from '../core/component-registry.service';
import {ComponentReference, IncludeDirective} from './core/include.directive';
import {DomUtilsService} from './core/dom-utils.service';

import {
  assert,
  equals,
  isBlank,
  isPresent,
  isString,
  nonPrivatePrefix,
  StringWrapper
} from '../core/utils/lang';
import {Environment} from '../core/config/environment';
import {MapWrapper} from '../core/utils/collection';
import {NoMetaComponent} from './no-meta/no-meta.component';
import {
  KeyBindings,
  KeyComponentName,
  KeyEditable,
  KeyEditing,
  KeyField,
  KeyLayout,
  KeyType,
  KeyWrapperBinding,
  KeyWrapperComponent
} from '../core/meta-rules';
import {Context} from '../core/context';
import {ContextFieldPath, ValueConverter} from '../core/property-value';
import {MetaContextComponent, MetaUIActionEvent} from '../core/meta-context/meta-context.component';
import {DynamicPropertyValue} from '../core/policies/merging-policy';
import {NgModel} from '@angular/forms';


/**
 *  MetaIncludeDirective is (along with MetaContext) the key element for binding MetaUI
 * into Angular user interfaces. You can think of it such GLUE.
 *
 *  MetaIncludeDirective dynamically switches in a Angular's component based on the
 * current MetaContext's
 * 'component' property and sets its bindings from the 'bindings' property.  This alone enables
 * almost any existing Angular's widget to be specified for use for a particular field or layout
 * using rules -- without any additional glue code .
 *
 *  component using 'wrapperComponent' and 'wrapperBindings', binding component content using the
 * bindings 'ngcontent', ngcontentLayout and 'ngcontentelElement', and event binding named Content
 * templates using an
 * 'awcontentLayouts' map binding. Without this we will not be able to use complex layouts.
 *
 */
@Directive({
  selector: 'm-include-component'
})
export class MetaIncludeDirective extends IncludeDirective implements DoCheck,
  AfterViewInit {

  /**
   * Just a constant use to access Environment where we store current context for current render
   * lifecycle
   *
   */
  static readonly FormatterBinding = 'formatter';


  /**
   *
   * In metaU we can also insert into the element not only ngcontent but new instantiated
   * component which is defined by layout
   *
   *```
   * field trait=ObjectDetail {
   * 	editable=false {
   * 		component: HoverCardComponnet;
   * 		bindings: {
   * 			ngcontentLayout: Content;
   * 			linkTitle:${properties.get("label")};
   * 		}
   * 	}
   *
   *    @layout=Content {
   * 		component: MetaContextObject;
   * 		bindings: {
   * 			object: $value;
   * 			layout:DetailLayout
   * 			operation:"view";
   * 		}
   * 	}
   * }
   * ```
   *
   */
  static readonly NgContentLayout = 'ngcontentLayout';


  /**
   * I could not find any realiable way how to access parent view. Even forwardRef up to certain
   * point worked but had to get away from this approach as it fails for my usecase when updating
   * context and pushing new properties to the stack.
   */
  @Input()
  context: MetaContextComponent;


  constructor(@Inject(forwardRef(() => MetaContextComponent))
              public metaContext: MetaContextComponent,
              public viewContainer: ViewContainerRef,
              public factoryResolver: ComponentFactoryResolver,
              public env: Environment,
              public cd: ChangeDetectorRef,
              public compRegistry: ComponentRegistry,
              public domUtils: DomUtilsService) {
    super(viewContainer, factoryResolver, cd, compRegistry);

  }

  /**
   * First we simply render the a component in the ngOnInit() and then every time something
   * changes.
   */
  ngDoCheck(): void {
    // console.log('MetaInclude(ngDoCheck):', this.name);

    const context = this.metaContext.myContext();
    if (isBlank(context) || isBlank(this.currentComponent)) {
      // console.log('No context/ component for ' + this.name);
      return;
    }

    const newComponent = context.propertyForKey('component');
    if (isPresent(newComponent) && isPresent(this.name) && (this.name !== newComponent)) {
      this.viewContainer.clear();
      this.doRenderComponent();
      // console.log('MetaInclude(ngDoCheck- rerender ):', this.name);

      this.createWrapperElementIfAny();
      this.createContentElementIfAny();
    } else {

      // we might not skip component instantiation but we still need to update bindings
      // as properties could change
      let editable = context.propertyForKey(KeyEditable);
      if (isBlank(editable)) {
        editable = context.propertyForKey(KeyEditing);
      }
      const metaBindings = context.propertyForKey(KeyBindings);
      const type = context.propertyForKey(KeyType);
      const inputs: string[] = this.componentReference().metadata.inputs;

      // re-apply Inputs
      // maybe we should diff properties and only if they changed re-apply
      if (isPresent(metaBindings) && isPresent(inputs)) {
        this.applyInputs(this.currentComponent, type, metaBindings, inputs, editable);
      }
    }
  }


  /*
   * Retrieves component Name from the Context.
   */
  protected resolveComponentType(): Type<any> {
    this.name = this.metaContext.myContext().propertyForKey(KeyComponentName);

    if (isBlank(this.name)) {
      return NoMetaComponent;
    }
    return super.resolveComponentType();
  }

  /*
   * If there is a NG content as part of the bindings apply it and remove it from the list. In
   * the MetaUI world it can appear if we want to insert a text content into the element:
   *
   *
   *  trait=toManyLink {
   *         component:AWHyperlink;
   *         bindings: {
   *             action: ${
   *                this.set("object", value);
   *                this.set("actionCategory", "General");
   *                this.set("action", "Inspect");
   *                 meta.fireAction(this, true)
   *             };
   *             ngcontent: "Click Me";
   *         }
   *     }
   *
   *
   */
  protected ngContent(): string {
    let cntValue: any;
    const bindings = this.metaContext.myContext().propertyForKey(KeyBindings);

    if (isPresent(bindings) &&
      isPresent(cntValue = bindings.get(IncludeDirective.NgContent))) {
      cntValue = isString(cntValue) ? cntValue :
        this.metaContext.myContext().resolveValue(cntValue);
    }
    return cntValue;
  }


  protected ngContentElement(): string {
    let cntValue: any;
    const bindings = this.metaContext.myContext().propertyForKey(KeyBindings);

    if (isPresent(bindings) &&
      isPresent(cntValue = bindings.get(IncludeDirective.NgContentElement))) {
      cntValue = isString(cntValue) ? cntValue :
        this.metaContext.myContext().resolveValue(cntValue);
    }
    return cntValue;
  }


  /**
   * Implement custom behavior of adding ngcontentLayout described above (where the constant
   * is defined)
   *
   */
  protected createContentElementIfAny(): boolean {
    let detectChanges = false;
    const bindings = this.metaContext.myContext().propertyForKey(KeyBindings);


    if (isPresent(bindings) && bindings.has(MetaIncludeDirective.NgContentLayout)) {

      const layoutName = bindings.get(MetaIncludeDirective.NgContentLayout);
      const context = this.metaContext.myContext();

      context.push();
      context.set(KeyLayout, layoutName);

      const componentName = context.propertyForKey('component');
      const compType = this.compRegistry.nameToType.get(componentName);

      const componentFactory: ComponentFactory<any> = this.factoryResolver
        .resolveComponentFactory(compType);

      const componentMeta: Component = this.resolveDirective(componentFactory);
      const ngComponent = this.viewContainer.createComponent(componentFactory, 0);

      const cReference: ComponentReference = {
        metadata: componentMeta,
        resolvedCompFactory: componentFactory,
        componentType: compType,
        componentName: componentName
      };

      this.applyBindings(cReference, ngComponent, context.propertyForKey(KeyBindings),
        false);

      this.domUtils.insertIntoParentNgContent(this.currentComponent.location.nativeElement,
        ngComponent.location.nativeElement);

      context.pop();

      detectChanges = true;
    } else {
      detectChanges = super.createContentElementIfAny();
    }
    if (detectChanges) {
      // console.log('MetaInclude(createContentElementIfAny):', this.name);
      this.cd.detectChanges();
    }

    return detectChanges;
  }


  /**
   * Meta placeTheComponent needs to account for wrapper component. If wrapper component
   * is present. It needs to inject the wrapper component on the page and add this component
   * inside the wrapper component.
   */
  protected createWrapperElementIfAny(): void {
    const wrapperName = this.metaContext.myContext().propertyForKey(KeyWrapperComponent);
    if (isBlank(wrapperName)) {
      return;
    }

    // Now we have wrapperComponent. We do the following:
    // 1.  Create wrapper component.
    const wrapperType = this.compRegistry.nameToType.get(wrapperName);

    const componentFactory: ComponentFactory<any> = this.factoryResolver
      .resolveComponentFactory(wrapperType);
    const componentMeta: Component = this.resolveDirective(wrapperType);

    const wrapperComponent = this.viewContainer.createComponent(componentFactory);

    // 2. Add wrapper bindings to wrapper component.
    const wrapperBindings = this.metaContext.myContext().propertyForKey(KeyWrapperBinding);
    (<any> wrapperComponent.instance)['bindings'] = wrapperBindings;

    // 3. Apply the bindings. Get the wrapper metadata, look through it's input - output
    // bindings. and apply the wrapperBindings to these bindings.
    const wrapperComponentRef: ComponentReference = {
      metadata: componentMeta,
      resolvedCompFactory: componentFactory,
      componentType: wrapperType,
      componentName: wrapperName
    };

    this.applyBindings(wrapperComponentRef, wrapperComponent, wrapperBindings);
    this.domUtils.insertIntoParentNgContent(wrapperComponent.location.nativeElement,
      this.currentComponent.location.nativeElement);
  }


  /**
   * ApplyBindings reads the @Inputs from ComponentMetadata and check if there exists a binding
   * coming from MetaRules. If there is we assign it to the input.
   */
  protected applyBindings(cRef: ComponentReference,
                          component: ComponentRef<any>,
                          bindings: Map<string, any>,
                          bUseMetaBindings: boolean = true): void {
    super.applyBindings(cRef, component, bindings);
    const inputs: string[] = cRef.metadata.inputs;
    const outputs: string[] = cRef.metadata.outputs;

    let metaBindings = this.metaContext.myContext().propertyForKey(KeyBindings);
    const editable = this.metaContext.myContext().propertyForKey(KeyEditable);
    const type = this.metaContext.myContext().propertyForKey(KeyType);

    // There are cases where we want to use the bindings passed into this function.
    // For example, the wrapperBindings.
    if (!bUseMetaBindings) {
      metaBindings = bindings;
    }

    if (isBlank(metaBindings) || isBlank(inputs)) {
      return;
    }

    const currenBindings = MapWrapper.clone(metaBindings);
    this.applyInputs(component, type, currenBindings, inputs, editable);
    this.applyOutputs(component, currenBindings, outputs);

  }

  private applyInputs(component: ComponentRef<any>, type: any, bindings: any,
                      inputs: string[], editable: any, compToBeRendered: boolean = true) {
    // propagate a field type to bindings.
    if (isPresent(type) && isPresent(component.instance.canSetType) &&
      component.instance.canSetType()) {
      bindings.set(KeyType, type);
    }

    if (isPresent(editable) && isPresent(component.instance['editable'])) {
      component.instance['editable'] = editable;
    }

    if (bindings.has('ngModel') && !component['ngModelCtx']) {
      const ngModelValue = bindings.get('ngModel');
      assert(ngModelValue instanceof ContextFieldPath,
        'You cant assign non expression value to [ngModel]');
      this.applyNgModel(component, ngModelValue);

      bindings.delete('value');
    }

    for (const key of inputs) {
      const publicKey = nonPrivatePrefix(key);
      let value = bindings.get(publicKey);

      // Handle special case where we do not pass explicitly or inherit from parent @Input
      // name for the component

      if (key === 'name' && isBlank(value)) {
        value = this.metaContext.myContext().propertyForKey(KeyField);
      }

      if (this.skipInput(key, value)) {
        continue;
      }

      // compToBeRendered = only first time
      if (compToBeRendered && value instanceof ContextFieldPath) {
        this.applyDynamicInputBindings(component.instance, bindings, inputs, key, value,
          editable);

      } else if (compToBeRendered && value instanceof DynamicPropertyValue) {
        const dynval: DynamicPropertyValue = value;
        const newValue = dynval.evaluate(this.metaContext.myContext());
        component.instance[publicKey] = newValue;

      } else {
        /**
         * when re-applying Inputs skip all expressions above and only work with regular
         * types
         *
         * set it only if it changes so it will not trigger necessary `value changed
         * after ngDoCheck`
         */
        if (!equals(component.instance[publicKey], value)) {
          component.instance[publicKey] = value;
        }
      }
    }
    // apply Formatter that can be specified in the oss
    // temporary disabled until angular will support runtime i18n
    // if (bindings.has(MetaIncludeDirective.FormatterBinding)) {
    //     let transform = this.formatters
    //         .get(bindings.get(MetaIncludeDirective.FormatterBinding));
    //     component.instance[MetaIncludeDirective.FormatterBinding] = transform;
    // }
  }

  /**
   * I am not sure how to do this properly since angular does not let me instantiate a directive.
   *
   * Now it works in the way if find there is a ngModel context property, I need to setup
   * ControlValueAccessor to point to a context and to get updated when value changes.
   *
   *
   */
  private applyNgModel(component: ComponentRef<any>, cntxPath: ContextFieldPath): void {
    const ngModel: NgModel = new NgModel(null, null, null,
      [component.instance]);

    const subscription = ngModel.update.subscribe((value: any) => {
      const context = this.metaContext.myContext();

      this.mSetValue(component.instance, null, value, this.metaContext, cntxPath);
    });
    const unsubscribe = subscription.unsubscribe.bind(subscription);

    // todo: confirm if this even work
    (<any>component['_view']).disposables =
      ((<any>component['_view']).disposables) ?
        ([...(<any>component['_view']).disposables, unsubscribe]) : [unsubscribe];

    ngModel.model = this.mGetValue(component.instance, this.metaContext, cntxPath);
    ngModel.name = this.metaContext.myContext().propertyForKey(KeyField);

    ngModel.control.setValue(ngModel.model);
    ngModel.ngOnChanges({
      'model': new SimpleChange(undefined, ngModel.model, true)
    });
    component.instance['ngControl'] = ngModel;
    component['ngModelCtx'] = ngModel;
  }


  private skipInput(key: string, value: any): boolean {
    return isBlank(value) || key === IncludeDirective.NgContent ||
      key === MetaIncludeDirective.NgContentLayout;
  }

  /**
   * Currently used only within the MetaSections to emit all the events happening on the
   * component. This methods takes all the @Outputs found in the component and subscribe to them.
   *
   * I plan to refactor this functionality as now you listen for these events with:
   *
   * ```
   *  <m-context.... (onAction)='myHandler(..)'
   * ```
   *  implementing your handler that consumes all kinds of events.  It needs to be more typed.
   *
   */
  private applyOutputs(component: ComponentRef<any>, bindings: any, outputs: string[]) {
    for (const key of outputs) {
      const publicKey = nonPrivatePrefix(key);
      const value = bindings.get(publicKey);

      if (key === IncludeDirective.NgContent) {
        continue;
      }
      const eventEmitter: EventEmitter<any> = component.instance[publicKey];
      if (value instanceof DynamicPropertyValue) {
        this.applyDynamicOutputBinding(eventEmitter, value, this.metaContext.myContext());
      } else {
        // just trigger event outside

        eventEmitter.subscribe((val: any) => {
          if (this.env.hasValue('parent-cnx')) {
            let event: any = val;
            const cnx: MetaContextComponent = this.env.getValue('parent-cnx');

            if (!(val instanceof MetaUIActionEvent)) {
              event = new MetaUIActionEvent(component.instance, publicKey,
                publicKey, val);
            }
            cnx.onAction.emit(event);
          }
        });
      }
    }
  }

  private applyDynamicOutputBinding(emitter: EventEmitter<any>, value: any,
                                    context: Context): void {

    emitter.asObservable().subscribe((val: any) => {
      const dynval: DynamicPropertyValue = value;
      context.resolveValue(dynval);
    });
  }

  /**
   * Any Context property that is defined as expression is represented by ContextFieldPath and
   * therefore we need to proxy all the calls to our context.
   *
   */
  private applyDynamicInputBindings(me: any, bindings: any, inputs: string[], key: string,
                                    value: any, editable: boolean) {

    const publicKey = nonPrivatePrefix(key);
    const cnxtPath: ContextFieldPath = value;
    /**
     * captured also current context snapshot so we can replay ContextFieldPath.evaluate() if
     * called outside of push/pop cycle.
     *
     * todo: check if we can replace this with Custom value accessor
     */
    Object.defineProperty(me, publicKey, {
      get: () => {
        return this.mGetValue(me, this.metaContext, cnxtPath);
      },

      set: (val) => {

        this.mSetValue(me, key, val, this.metaContext, cnxtPath);
      },
      enumerable: true,
      configurable: true
    });
  }

  private mGetValue(instance: any, metaContext: MetaContextComponent,
                    cnxtPath: ContextFieldPath): any {
    const context = metaContext.myContext();
    return cnxtPath.evaluate(context);
  }


  private mSetValue(instance: any, key: string, val: any, metaContext: MetaContextComponent,
                    cnxtPath: ContextFieldPath): any {

    const context = metaContext.myContext();

    if (isPresent(key)) {
      const editing = context.propertyForKey(KeyEditable) || context.propertyForKey(KeyEditing);
      if (editing && !StringWrapper.equals(val, instance[nonPrivatePrefix(key)])) {
        const type = context.propertyForKey(KeyType);
        cnxtPath.evaluateSet(context, ValueConverter.value(type, val));
      }
    } else {
      const type = context.propertyForKey(KeyType);
      cnxtPath.evaluateSet(context, ValueConverter.value(type, val));
    }
  }

}
