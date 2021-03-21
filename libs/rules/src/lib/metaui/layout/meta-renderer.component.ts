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
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injector,
  SimpleChange,
  Type,
  ViewContainerRef
} from '@angular/core';
import {ComponentRegistry} from '../core/component-registry.service';
import {BaseRenderer, ComponentReference} from './core/base-renderer.directive';
import {DomUtilsService} from './core/dom-utils.service';

import {
  assert,
  equals,
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
} from '../core/constants';
import {Context} from '../core/context';
import {ContextFieldPath, ValueConverter} from '../core/property-value';
import {MetaContextComponent, MetaUIActionEvent} from '../core/meta-context/meta-context.component';
import {DynamicPropertyValue} from '../core/policies/merging-policy';
import {NgModel} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';


/**
 *  MetaIncludeComponent is (along with MetaContext) the key element for binding MetaUI
 * into Angular user interfaces. You can think of it such GLUE.
 *
 *  MetaIncludeComponent dynamically switches in a Angular's component based on the
 * current MetaContext's 'component' property and sets its bindings from the 'bindings' property.
 *
 * This alone enables almost any existing Angular's widget to be specified for use for a particular
 * field or layout using rules -- without any additional glue code .
 *
 *
 */
@Component({
  selector: 'm-render',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetaRendererComponent extends BaseRenderer implements AfterViewInit {
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


  private _currentNgModel: NgModel;
  private _destroy: Subject<void> = new Subject<void>();
  private _currentContext: Context;


  constructor(public mc: MetaContextComponent,
              public viewContainer: ViewContainerRef,
              public factoryResolver: ComponentFactoryResolver,
              public env: Environment,
              public cd: ChangeDetectorRef,
              public compRegistry: ComponentRegistry,
              public domUtils: DomUtilsService,
              public injector: Injector) {
    super(viewContainer, factoryResolver, cd, compRegistry, injector);
  }


  ngOnInit(): void {
    this._currentContext = this.mc.contextChanged$.getValue();
    // console.log('Renderer, INIT', this.mc._debugKeys());

    super.ngOnInit();
    this.mc.contextChanged$
      .pipe(takeUntil(this._destroy))
      .subscribe(context => this._handleContextChanged(context));
  }


  /*
   * Retrieves component Name from the Context.
   */
  protected resolveComponentType(): Type<any> {
    this.name = this._currentContext.propertyForKey(KeyComponentName);
    return (!this.name) ? NoMetaComponent : super.resolveComponentType();
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
    return this._readNgContentType(BaseRenderer.NgContent);
  }


  protected ngContentElement(): string {
    return this._readNgContentType(BaseRenderer.NgContentElement);
  }


  /**
   * Implement custom behavior of adding ngcontentLayout described above (where the constant
   * is defined)
   *
   */
  protected createContentElementIfAny(inAfterViewCheck: boolean = false): boolean {
    let detectChanges: boolean;
    const bindings = this._currentContext.propertyForKey(KeyBindings);

    if (!inAfterViewCheck && bindings && bindings.has(MetaRendererComponent.NgContentLayout)) {
      const layoutName = bindings.get(MetaRendererComponent.NgContentLayout);

      this._currentContext.push();
      this._currentContext.set(KeyLayout, layoutName);

      const componentName = this._currentContext.propertyForKey('component');
      const compType = this.compRegistry.nameToType.get(componentName);

      const componentFactory: ComponentFactory<any> = this.factoryResolver
        .resolveComponentFactory(compType);

      const componentMeta: Component = this.resolveDirective(componentFactory);
      const cReference: ComponentReference = {
        metadata: componentMeta,
        resolvedCompFactory: componentFactory,
        componentType: compType,
        componentName: componentName
      };

      const ngComponent = this.viewContainer.createComponent(componentFactory, 0);


      this.applyBindings(cReference, ngComponent, this._currentContext.propertyForKey(KeyBindings),
        false);

      this.domUtils.insertIntoParentNgContent(this.currentComponent.location.nativeElement,
        ngComponent.location.nativeElement);
      this._currentContext.pop();

      detectChanges = true;
    } else {
      detectChanges = super.createContentElementIfAny();
    }
    if (detectChanges && this.initRenderInProgress && !inAfterViewCheck) {
      // console.log('MetaInclude(createContentElementIfAny):', this.name);
      this.cd.detectChanges();
    }
    return detectChanges;
  }


  /**
   * Meta addComponentToView needs to account for wrapper component. If wrapper component
   * is present. It needs to inject the wrapper component on the page and add this component
   * inside the wrapper component.
   */
  protected createWrapperElementIfAny(): void {
    const wrapperName = this._currentContext.propertyForKey(KeyWrapperComponent);
    if (!wrapperName) {
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
    const wrapperBindings = this._currentContext.propertyForKey(KeyWrapperBinding);
    (<any>wrapperComponent.instance)['bindings'] = wrapperBindings;

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
  protected applyBindings(cRef: ComponentReference, component: ComponentRef<any>,
                          bindings: Map<string, any>, bUseMetaBindings: boolean = true): void {
    super.applyBindings(cRef, component, bindings);

    const inputs: string[] = cRef.metadata.inputs;
    const outputs: string[] = cRef.metadata.outputs;
    let metaBindings = this._currentContext.propertyForKey(KeyBindings);

    // There are cases where we want to use the bindings passed into this function.
    // For example, the wrapperBindings.
    if (!bUseMetaBindings) {
      metaBindings = bindings;
    }
    if (!metaBindings || !inputs) {
      return;
    }

    const currenBindings = MapWrapper.clone(metaBindings);
    this._applyInputs(component);
    this._applyOutputs(component, currenBindings, outputs);

  }

  private _handleContextChanged(context: Context): void {
    // console.log('Renderer, _handleContextChanged', this.mc._debugKeys());

    this._currentContext = context;
    if (this._isComponentChanged()) {
      this._refreshView();
    } else {
      if (this._currentNgModel && this._currentNgModel.control.dirty) {
        this._currentNgModel.control.markAsPristine();
      }
      this._applyInputs(this.currentComponent);
    }
    this.cd.detectChanges();
  }

  private _applyInputs(component: ComponentRef<any>) {

    const editable = this._currentContext.propertyForKey(KeyEditing) ||
      this._currentContext.propertyForKey(KeyEditable) || false;
    const bindings = this._currentContext.propertyForKey(KeyBindings);
    const type = this._currentContext.propertyForKey(KeyType);
    const inputs: string[] = this.createComponentReference().metadata.inputs;

    if (!bindings || !inputs) {
      return;
    }
    // propagate a field type to bindings.
    if (this._currentContext.booleanPropertyForKey('canSetType') && type) {
      bindings.set(KeyType, type);
    }
    if (inputs.indexOf('editable') > -1) {
      this.setIfChanged(component.instance, 'editable', editable);
    }

    let updateComponent = false;
    for (const key of inputs) {
      let value = bindings.get(key);
      if (key === 'name' && !value) {
        value = this._currentContext.propertyForKey(KeyField);
      }
      if (this._skipInput(key, value)) {
        continue;
      }
      if (value instanceof ContextFieldPath) {
        this._applyDynamicInputBindings(component.instance, key, value);

      } else if (value instanceof DynamicPropertyValue) {
        const newValue = (value as DynamicPropertyValue).evaluate(this._currentContext);
        this.setIfChanged(component.instance, key, newValue);

      } else {
        /**
         * when re-applying primitives
         */
        if (!equals(component.instance[key], value)) {
          this.setIfChanged(component.instance, key, value);
          updateComponent = true;
          /*** If created NgModel update setDisabled as this is controlled by FormControl
           * property
           */
          if (component['ngModelCtx'] && key === 'disabled') {
            if (value) {
              component['ngModelCtx'].control.disable();
            } else {
              component['ngModelCtx'].control.enable();
            }
          }
        }
      }
    }

    if (bindings.has('ngModel') && !this.currentComponent['ngModelCtx']) {
      const ngModelValue = bindings.get('ngModel');
      assert(ngModelValue instanceof ContextFieldPath,
        'You cant assign non expression value to [ngModel]');
      this._applyNgModel(this.currentComponent, ngModelValue);

      bindings.delete('value');
    }

    if (updateComponent) {
      const cd = this.currentComponent.instance.cd || this.currentComponent.changeDetectorRef;
      if (cd) {
        cd.markForCheck();
      }
      if (this.currentComponent.instance.ngOnChanges) {
        this.currentComponent.instance.ngOnChanges({});
      }
    }
  }


  /**
   * I am not sure how to do this properly since angular does not let me instantiate a directive.
   *
   * Now it works in the way if find there is a ngModel context property, I need to setup
   * ControlValueAccessor to point to a context and to get updated when value changes.
   *
   *
   */
  private _applyNgModel(component: ComponentRef<any>, cntxPath: ContextFieldPath): void {
    // let's reuse existing ngModel
    if (this._currentNgModel) {
      this._currentNgModel.valueAccessor = component.instance;

    } else {
      this._currentNgModel = new NgModel(null, null, null,
        [component.instance]);

      this._currentNgModel.model = this._mGetValue(cntxPath);
      this._currentNgModel.name = this._currentContext.propertyForKey(KeyField);
      this._currentNgModel.reset(this._currentNgModel.model);

      this._currentNgModel.ngOnChanges({
        'model': new SimpleChange(undefined, this._currentNgModel.model,
          true)
      });
    }
    component.instance['ngControl'] = this._currentNgModel;
    component['ngModelCtx'] = this._currentNgModel;
    this._initNgModel(component, cntxPath);
    this._currentNgModel.control.markAsPristine();
  }

  private _initNgModel(component: ComponentRef<any>, cntxPath: ContextFieldPath): void {

    if (!!component.instance['disabled']) {
      this._currentNgModel.control.disable();
    } else {
      this._currentNgModel.control.enable();
    }
    const subscription = this._currentNgModel.update.subscribe((value: any) =>
      this._mSetValue(component.instance, null, value, cntxPath)
    );
    const destroy = component.instance.onDestroy;
    component.onDestroy(() => {
      if (destroy) {
        component.destroy.apply(component);
      }
      subscription.unsubscribe();
    });
  }


  private _skipInput(key: string, value: any): boolean {
    return !value || key === BaseRenderer.NgContent ||
      key === MetaRendererComponent.NgContentLayout;
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
  private _applyOutputs(component: ComponentRef<any>, bindings: any, outputs: string[]) {
    for (const key of outputs) {
      const publicKey = nonPrivatePrefix(key);
      const value = bindings.get(publicKey);

      if (key === BaseRenderer.NgContent) {
        continue;
      }
      const eventEmitter: EventEmitter<any> = component.instance[publicKey];
      if (value instanceof DynamicPropertyValue) {
        this._applyDynamicOutputBinding(eventEmitter, value, this._currentContext);

      } else {
        // just trigger event outside
        eventEmitter.subscribe((val: any) => {
          if (this.env.hasValue('root-meta-cnx')) {
            let event: any = val;
            const cnx: MetaContextComponent = this.env.getValue('root-meta-cnx');

            if (!(val instanceof MetaUIActionEvent)) {
              event = new MetaUIActionEvent(component.instance, publicKey, publicKey, val);
            }
            cnx.action.emit(event);
          }
        });
      }
    }
  }

  private _applyDynamicOutputBinding(emitter: EventEmitter<any>, value: any,
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
  private _applyDynamicInputBindings(comp: any, key: string, value: ContextFieldPath) {

    // need to call original accessors if any to keep component logic in sync
    const origDescriptor = Object.getOwnPropertyDescriptor(comp.constructor.prototype, key);
    const origRefSetter = origDescriptor ? origDescriptor.set : null;

    Object.defineProperty(comp, key, {
      get: () => {
        return this._mGetValue(value);
      },

      set: (val) => {
        this._mSetValue(comp, key, val, val);
        if (origRefSetter) {
          origRefSetter.call(comp, val);
        }
      },
      enumerable: true,
      configurable: true
    });
  }

  private _mGetValue(cnxtPath: ContextFieldPath): any {
    return cnxtPath.evaluate(this._currentContext);
  }


  private _mSetValue(instance: any, key: string, val: any, cnxtPath: ContextFieldPath): any {

    if (key) {
      const editing = this._currentContext.propertyForKey(KeyEditable) ||
        this._currentContext.propertyForKey(KeyEditing);
      if (editing && !StringWrapper.equals(val, instance[nonPrivatePrefix(key)])) {
        const type = this._currentContext.propertyForKey(KeyType);
        cnxtPath.evaluateSet(this._currentContext, ValueConverter.value(type, val));
      }
    } else {
      const type = this._currentContext.propertyForKey(KeyType);
      cnxtPath.evaluateSet(this._currentContext, ValueConverter.value(type, val));
    }
  }


  /**
   * Compares component names from newly calculated property set with current component that is
   * used within MetaIncludeComponent
   */
  private _isComponentChanged(): boolean {
    const newComponent = this._currentContext.propertyForKey('component');
    return isPresent(newComponent) && (isPresent(this.name) && this.name !== newComponent);
  }


  private _refreshView(): void {
    this.viewContainer.clear();
    this.resolvedComponentRef = undefined;
    // console.log('Renderer, _refreshView', this.mc._debugKeys());

    this.doRenderComponent();


    this.createWrapperElementIfAny();
    this.createContentElementIfAny();

    this.cd.markForCheck();
  }

  private _readNgContentType(type: string): string {
    let cntValue: any;
    const bindings = this._currentContext.propertyForKey(KeyBindings);

    if (bindings && (cntValue = bindings.get(type))) {
      cntValue = isString(cntValue) ? cntValue :
        this._currentContext.resolveValue(cntValue);
    }
    return cntValue;
  }

}
