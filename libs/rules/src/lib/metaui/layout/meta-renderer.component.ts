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
  Compiler,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  DoCheck,
  Input,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import {ComponentRegistry} from '../core/component-registry.service';
import {BaseRenderer, ComponentReference, NgContent} from './core/base-renderer.directive';
import {Environment} from '../core/config/environment';
import {
  KeyBindings,
  KeyComponentName,
  KeyLayout,
  KeyWrapperBinding,
  KeyWrapperComponent
} from '../core/constants';
import {Context} from '../core/context';
import {MetaContextComponent} from '../core/meta-context/meta-context.component';
import {NgModel} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {BindingValueFactory, MetaBindable} from '../core/binding-factory.service';
import {isPresent} from '../core/utils/lang';

export const NgContentLayout = 'ngcontentLayout';


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
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetaRendererComponent extends BaseRenderer implements AfterViewInit, DoCheck {
  /**
   *
   * In metaU we can also insert into the element not only ngcontent but new instantiated
   * component which is defined by layout
   *
   *```
   * field trait=ObjectDetail {
   * 	editable=false {
   * 		component: HoverCardComponent;
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

  /**
   * There could some other dependencies that are not injected during instantiation. Such example
   * is @Host(), where instantiated component is trying Inject its parent host component
   */
  @Input()
  hostBindings: Record<string, any>;


  private _currentNgModel: NgModel;
  private _destroy: Subject<void> = new Subject<void>();
  private _currentContext: Context;

  private _markRefresh: boolean = false;


  get context(): Context {
    return this._currentContext;
  }

  constructor(public mc: MetaContextComponent,
              public viewContainer: ViewContainerRef,
              public componentFactoryResolver: ComponentFactoryResolver,
              public env: Environment,
              public cd: ChangeDetectorRef,
              public compRegistry: ComponentRegistry,
              public renderer: Renderer2,
              public bindingValueFactory: BindingValueFactory,
              protected _compiler: Compiler) {
    super(viewContainer, componentFactoryResolver, cd, compRegistry, renderer, _compiler);
  }


  ngOnInit(): void {
    this._currentContext = this.mc.contextChanged$.getValue();
    // console.log('Renderer, INIT', this.mc._debugKeys());

    super.ngOnInit();
    this.mc.contextChanged$
      .pipe(takeUntil(this._destroy))
      .subscribe(context => this._handleContextChanged(context));

  }

  ngDoCheck(): void {
    if (this._markRefresh) {
      this._markRefresh = false;
      this.cd.detectChanges();
    }
  }


  ngAfterViewInit(): void {
    super.ngAfterViewInit();

    const wrapperComponentName = this._componentName(KeyWrapperComponent);
    if (wrapperComponentName) {
      const wrapperCR = super._createComponentReference(wrapperComponentName);
      const wrapperBindings = this._bindingsForNewReference(wrapperCR, true);
      const wrapperComponent = super._createElement(wrapperCR, wrapperBindings, null,
        1);
      wrapperComponent.location.nativeElement
        .appendChild(this.currentComponent.location.nativeElement);
      this.applyBindings(wrapperCR, wrapperComponent, wrapperBindings,
        this.componentReference.metadata.outputs, true);
    }

    console.log(this.componentReference);
  }

  protected _bindingsForNewReference(reference: ComponentReference,
                                     isWrapper: boolean = false): Map<string, any> {
    const typeBindings = super._bindingsForNewReference(reference, isWrapper);
    const rulesBindings: Map<string, any> = this._currentContext.propertyForKey(KeyBindings);
    if (rulesBindings) {
      rulesBindings.forEach((val, key) => {
        if (typeBindings && !typeBindings.has(key) && (key === 'ngModel' || key === NgContent)) {
          typeBindings.set(key, this._bindingValue(key, isWrapper));
        }
      });
    }
    return typeBindings;
  }

  protected _bindingValue(name: string, isWrapper: boolean = false): any {
    const key = isWrapper ? KeyWrapperBinding : KeyBindings;
    const propertyForKey: Map<string, any> = this._currentContext.propertyForKey(key);
    return propertyForKey && propertyForKey.has(name) ? propertyForKey.get(name)
      : this._currentContext.propertyForKey(name);
  }


  protected hasBindingValue(name: string, isWrapper: boolean = false): boolean {
    const key = isWrapper ? KeyWrapperBinding : KeyBindings;
    const propertyForKey: Map<string, any> = this._currentContext.propertyForKey(key);
    const hasBinding = propertyForKey ? (propertyForKey.has(name) ||
      this._currentContext.allProperties().has(name)) : false;

    return hasBinding;
  }

  protected _componentName(name: string = KeyComponentName): string {
    const componentName = this._currentContext.propertyForKey(name);
    if (!componentName && name === KeyComponentName) {
      return undefined;
    }
    return componentName;
  }


  _lookupComponentReference(): ComponentReference {
    const properties = this._currentContext.allProperties();
    let key = '';
    properties.forEach((v, k) => {
      key += `${k}:${this.context.propertyForKey(k)}`;
    });
    return this.componentReferenceMap().get(key);
  }


  protected _storeComponentReference(name: string, reference: ComponentReference): void {
    const properties = this._currentContext.allProperties();
    let key = '';
    properties.forEach((v, k) => {
      key += `${k}:${this.context.propertyForKey(k)}`;
    });
    this.componentReferenceMap().set(key, reference);
  }

  protected componentReferenceMap(): Map<string, any> {
    return this._currentContext.meta.identityCache;
  }


  protected _createContentElement(bindings: Map<string, any>): any {
    if (bindings && bindings.has(NgContentLayout)) {
      const layoutName = bindings.get(NgContentLayout);

      this._currentContext.push();
      this._currentContext.set(KeyLayout, layoutName);

      const componentReference = this._initComponentReference();
      const componentRef = super._createElement(componentReference, bindings);
      this._currentContext.pop();

      return componentRef.location.nativeElement;
    }

    if (bindings.has(NgContent)) {
      const inputValue = this.bindingValueFactory.getInputValue(this.mc,
        this.currentComponent, NgContent, bindings.get(NgContent));
      bindings.set(NgContent, (inputValue as MetaBindable<any>).getValue());
    }
    return super._createContentElement(bindings);
  }


  protected applyBindings(reference: ComponentReference, component: ComponentRef<any>,
                          bindings: Map<string, any>, outputBindings: Array<string> = [],
                          isWrapper: boolean = false): void {

    bindings.forEach((value, field) => {
      const inputValue: MetaBindable<any> = this.bindingValueFactory.getInputValue(
        this.mc, component, field, value);
      if (inputValue.isSettableInComponent()) {
        const newValue = inputValue.getValue();
        if (!component.instance[field] || newValue) {
          component.instance[field] = newValue;
        }
      }
    });

    outputBindings.forEach((output) => {
      this.bindingValueFactory.initOutputValue(this.mc, component, output);
    });

    if (this.hostBindings) {
      for (const field in this.hostBindings) {
        component.instance[field] = this.hostBindings[field];
      }
    }
    // save current MC to component
    component.instance['_MC_'] = this.mc;
  }


  /**
   * todo: change applyInputs in here and better listen on changes.
   */
  private _handleContextChanged(context: Context): void {
    // console.log('Renderer, _handleContextChanged', this.mc._debugKeys());
    const needsFullRerender = context.isEditing() !== this.context.isEditing();

    this._currentContext = context;
    if (this._isComponentChanged() || needsFullRerender) {
      this._refreshView();
    } else {
      if (this._currentNgModel && this._currentNgModel.control.dirty) {
        this._currentNgModel.control.markAsPristine();
      }
      // const reference = this._currentComponentReference();
      // this._applyInputs(this.currentComponent, this._bindingsForNewReference(reference));
    }
    this._markRefresh = true;
    this.cd.markForCheck();
  }


  /**
   * Compares component names from newly calculated property set with current component that is
   * used within MetaIncludeComponent
   */
  private _isComponentChanged(): boolean {
    if (!this.componentReference) {
      return true;
    }
    const name = this.componentReference.component;
    const newComponent = this._currentContext.propertyForKey('component');
    return isPresent(newComponent) && (isPresent(name) && name !== newComponent);
  }


  private _refreshView(): void {
    this.viewContainer.clear();
    this._destroy.unsubscribe();
    this.componentReference = undefined;
    // console.log('Renderer, _refreshView', this.mc._debugKeys());

    this.doRender();
  }


  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.bindingValueFactory.release();
  }
}

