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
import {ComponentRef, EventEmitter, Injectable, SimpleChange} from '@angular/core';
import {ContextFieldPath, ValueConverter} from './property-value';
import {Context} from './context';
import {KeyField, KeyType} from './constants';
import {DynamicPropertyValue} from './policies/merging-policy';
import {assert} from './utils/lang';
import {NgModel} from '@angular/forms';
import {Environment} from '../core/config/environment';
import {MetaContextComponent, MetaUIActionEvent} from './meta-context/meta-context.component';

export const CurrentNgModel = 'ngModelCtx';


/**
 * A class holding a references to components. The methods are self-explanatory.
 *
 */
@Injectable({
  providedIn: 'root'
})
export class BindingValueFactory {
  constructor(public _env: Environment) {
  }

  getInputValue(context: Context, component: ComponentRef<any>, key: string, value: any,
                isWrapper: boolean = false): any {
    if (key === 'name') {
      return this._makeNameBinding(context, component, key, value, isWrapper);
    } else if (key === 'ngModel') {
      return this._makeNgModelBinding(context, component, key, value, isWrapper);
    } else if (key === 'disabled') {
      this._makeDisabledBinding(context, component, key, value, isWrapper);
    } else if (value instanceof ContextFieldPath) {
      return this._makeContextPathBinding(context, component, key, value, isWrapper);
    } else if (value instanceof DynamicPropertyValue) {
      return this._makeDynamicPropertyBindingInput(context, component, key, value, isWrapper);
    }

    const aValue = new ValueBinding(context, component, isWrapper, this._env);
    aValue.init(key, value, true);
    return aValue;
  }

  initOutputValue(context: Context, component: ComponentRef<any>, key: string): any {
    const bindings: Map<string, any> = context.propertyForKey('bindings');
    const event = bindings.get(key);

    if (event instanceof DynamicPropertyValue) {
      this._makeDynamicPropertyBindingOutput(context, component, key, event);
    } else {

      const aValue = new ValueBinding(context, component, false, this._env);
      aValue.init(key, event, false);
      return aValue;
    }
  }

  private _makeContextPathBinding(context: Context, component: ComponentRef<any>,
                                  key: string, value: any,
                                  isWrapper: boolean): ContextFieldPathBinding {
    const contextValue = new ContextFieldPathBinding(context, component.instance, isWrapper);
    contextValue.init(key, value, true);
    return contextValue;
  }

  private _makeDynamicPropertyBindingInput(context: Context, component: ComponentRef<any>,
                                           key: string, value: any,
                                           isWrapper: boolean): DynamicPropertyValueBinding {
    const comp = component ? component.instance : null;
    const contextValue = new DynamicPropertyValueBinding(context, comp, isWrapper);
    contextValue.init(key, value, true);
    return contextValue;
  }

  private _makeDynamicPropertyBindingOutput(context: Context, component: ComponentRef<any>,
                                            key: string, value: any): DynamicPropertyValueBinding {
    const comp = component ? component.instance : null;
    const contextValue = new DynamicPropertyValueBinding(context, comp, false);
    contextValue.init(key, value, false);
    return contextValue;
  }


  private _makeNameBinding(context: Context, component: ComponentRef<any>,
                           key: string, value: any, isWrapper: boolean): NameValueBinding {
    const contextValue = new NameValueBinding(context, component.instance, isWrapper);
    contextValue.init(key, value, true);
    return contextValue;
  }

  private _makeNgModelBinding(context: Context, component: ComponentRef<any>,
                              key: string, value: any, isWrapper: boolean): NgModelBinding {
    const contextValue = new NgModelBinding(context, component, isWrapper);
    contextValue.init(key, value, true);
    return contextValue;
  }


  private _makeDisabledBinding(context: Context, component: ComponentRef<any>,
                               key: string, value: any, isWrapper: boolean): void {
    const contextValue = new DisabledValueBinding(context, component, isWrapper);
    contextValue.init(key, value, true);
  }
}


export interface MetaBindable<T> {
  init(bindingName: string, cnxFieldPath: T, isInput: boolean): void;

  getValue(): any;

  setValue(value: any): void;

  isSettableInComponent(): boolean;

}

export class ContextFieldPathBinding implements MetaBindable<ContextFieldPath> {
  descriptor: PropertyDescriptor | undefined;
  contextPath: ContextFieldPath;


  constructor(private context: Context, private component: any, private isWrapper: boolean) {
  }

  init(bindingName: string, cnxFieldPath: ContextFieldPath, isInput: boolean = true): void {
    this.descriptor = Object.getOwnPropertyDescriptor(this.component.constructor.prototype,
      bindingName);
    this.contextPath = cnxFieldPath;

    Object.defineProperty(this.component, bindingName, {
      get: () => {
        return this.getValue();
      },

      set: (val) => {
        this.setValue(val);
        if (this.descriptor && this.descriptor.set) {
          this.descriptor.set.call(this.component, val);
        }
      },
      enumerable: true,
      configurable: true
    });
  }

  getValue(): any {
    return this.contextPath.evaluate(this.context);
  }

  setValue(value: any): void {
    if (this.context.isEditing()) {
      const type = this.context.propertyForKey(KeyType);
      this.contextPath.evaluateSet(this.context, ValueConverter.value(type, value));
    }
  }

  isSettableInComponent(): boolean {
    return false;
  }
}

export class DynamicPropertyValueBinding implements MetaBindable<DynamicPropertyValue> {
  propertyValue: DynamicPropertyValue;
  isSettable = true;

  constructor(private context: Context, private component: any,
              private isWrapper: boolean) {
  }

  getValue(): any {
    return this.propertyValue.evaluate(this.context);
  }

  // todo: unsubscribes
  init(bindingName: string, value: DynamicPropertyValue, isInput: boolean): void {
    if (isInput) {
      this.propertyValue = value;
    } else {
      const eventEmitter: EventEmitter<any> = this.component[bindingName];
      eventEmitter.asObservable().subscribe((val: any) => {
        const dynval: DynamicPropertyValue = value;
        this.context.resolveValue(dynval);
      });
      this.isSettable = false;
    }
  }

  isSettableInComponent(): boolean {
    return true;
  }

  setValue(value: any): void {
    assert(false,
      'You can not set value directly using DynamicPropertyValue');
  }

}

export class NameValueBinding implements MetaBindable<string> {
  propertyValue: string;

  constructor(private context: Context, private component: ComponentRef<any>,
              private isWrapper: boolean) {
  }

  getValue(): any {
    return this.context.propertyForKey(KeyField);
  }

  init(bindingName: string, value: string, isInput: boolean): void {
    this.propertyValue = value;

  }

  isSettableInComponent(): boolean {
    return true;
  }

  setValue(value: any): void {
    assert(false,
      'You can not set value directly using NamBinding');
  }
}

export class DisabledValueBinding implements MetaBindable<string> {


  constructor(private context: Context, private component: ComponentRef<any>,
              private isWrapper: boolean) {
  }

  getValue(): any {
    assert(false,
      'You can not get value directly using DisabledValue Binding');
  }

  init(bindingName: string, value: string, isInput: boolean): void {
    if (this.component[CurrentNgModel] && bindingName === 'disabled') {
      if (value) {
        (this.component[CurrentNgModel] as NgModel).control.disable();
      } else {
        (this.component[CurrentNgModel] as NgModel).control.enable();
      }
    }
  }

  isSettableInComponent(): boolean {
    return false;
  }

  setValue(value: any): void {
    assert(false,
      'You can not set value directly using NamBinding');
  }
}

export class NgModelBinding implements MetaBindable<ContextFieldPath> {


  constructor(private context: Context, private component: ComponentRef<any>,
              private isWrapper: boolean) {
  }

  getValue(): any {
    assert(false,
      'You can not get value directly using dynamic NgModel');
  }

  init(bindingName: string, value: ContextFieldPath, isInput: boolean): void {
    // console.log('NgModelBinding => ', bindingName);
    if (!this.component[CurrentNgModel]) {
      assert(value instanceof ContextFieldPath,
        'You cant assign non expression value to [ngModel]');

      const ngModel = new NgModel(null, null, null,
        [this.component.instance]);
      ngModel.model = value.evaluate(this.context);
      ngModel.name = this.context.propertyForKey(KeyField);
      ngModel.valueAccessor = this.component.instance;
      ngModel.reset(ngModel.model);

      this.component[CurrentNgModel] = ngModel;
      this.component.instance['ngControl'] = ngModel;
      this._initNgModel(ngModel, this.component, value);

      ngModel.ngOnChanges({
        'model': new SimpleChange(undefined, ngModel.model,
          true)
      });
      ngModel.control.markAsPristine();
    }
  }

  private _initNgModel(ngModel: NgModel, component: ComponentRef<any>,
                       path: ContextFieldPath): void {
    if (!!component.instance['disabled']) {
      ngModel.control.disable();
    } else {
      ngModel.control.enable();
    }
    const subscription = ngModel.update.subscribe((updatedValue: any) => {
      const type = this.context.propertyForKey(KeyType);
      path.evaluateSet(this.context, ValueConverter.value(type, updatedValue));
    });
    const destroy = component.instance.onDestroy;
    component.onDestroy(() => {
      if (destroy) {
        component.destroy.apply(component);
      }
      subscription.unsubscribe();
    });
  }

  isSettableInComponent(): boolean {
    return false;
  }

  setValue(value: any): void {
    assert(false,
      'You can not set value directly using dynamic NgModel');
  }
}


export class ValueBinding implements MetaBindable<any> {
  currentValue: any;

  constructor(private context: Context, private component: ComponentRef<any>, isWrapper: boolean,
              private env?: Environment) {
  }

  getValue(): any {
    return this.currentValue;
  }

  init(bindingName: string, value: any, isInput: boolean): void {
    if (isInput) {
      this.currentValue = value;
    } else {
      const eventEmitter: EventEmitter<any> = this.component.instance[bindingName];
      eventEmitter.subscribe((val: any) => {
        if (this.env.hasValue('root-meta-cnx')) {
          let event: any = val;
          const cnx: MetaContextComponent = this.env.getValue('root-meta-cnx');

          if (!(val instanceof MetaUIActionEvent)) {
            event = new MetaUIActionEvent(this.component.instance, bindingName, bindingName, val);
          }
          cnx.action.emit(event);
        }
      });
    }
  }

  isSettableInComponent(): boolean {
    return true;
  }

  setValue(value: any): void {
    assert(false,
      'You can not set value directly using dynamic NgModel');
  }
}







