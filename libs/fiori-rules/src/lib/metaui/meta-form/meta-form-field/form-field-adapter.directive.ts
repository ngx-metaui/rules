/**
 * @license
 * Copyright F. Kolar
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
 */
import {ChangeDetectorRef, ContentChild, Directive, OnInit} from '@angular/core';
import {MetaIncludeDirective} from '@ngx-metaui/rules';
import {Observable, Subject} from 'rxjs';
import {NgControl} from '@angular/forms';
import {FormFieldControl} from '../../../ui/form/form-control';


/**
 *
 *  MatFormField does not support much freedom in terms of instantiating
 *  programmatically input components as they have in the ngAfterContentChecked() a check that child
 *  must be a FormFieldControl but at the time when FormField checks for the existence of
 *  FormFieldControl control our dynamic component hasn't been created.
 *
 *  Therefore we have this adapter that insert required FormFieldControl behavior to the
 *  <m-include-component> and re-connects instantiated component with the FormField.
 *
 *
 */
@Directive({
  selector: '[fdpFormFieldAdapter]',
  providers: [
    {provide: FormFieldControl, useExisting: MetaFormFieldAdapter}
  ]
})
export class MetaFormFieldAdapter implements FormFieldControl<any>, OnInit {

  @ContentChild(FormFieldControl, {static: true})
  _control: FormFieldControl<any>;

  readonly _stateChanges: Subject<any> = new Subject<any>();
  protected _editable = true;

  constructor(public metaInclude: MetaIncludeDirective, private cd: ChangeDetectorRef) {
  }


  ngOnInit(): void {

    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      this.registerType();
      this._editable = this.editable;

      // (<Subject<any>>this.stateChanges).next();
      this.cd.detectChanges();
    }
  }


  onContainerClick(event: MouseEvent): void {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      (<FormFieldControl<any>>this.metaInclude.component).onContainerClick(event);
    }
  }

  set editable(value: boolean) {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      (<FormFieldControl<any>>this.metaInclude.component).editable = value;
    }
  }


  get editable(): boolean {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<FormFieldControl<any>>this.metaInclude.component).editable;
    }
    return false;
  }

  get disabled(): boolean {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<FormFieldControl<any>>this.metaInclude.component).disabled;
    } else if (!this.editable) {
      return false;
    }
    throw new Error('Dynamic component must implement FormFieldControl interface.');
  }

  get inErrorState(): boolean {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<FormFieldControl<any>>this.metaInclude.component).inErrorState;
    } else if (!this.editable) {
      return false;
    }
    throw new Error('Dynamic component must implement FormFieldControl interface.');
  }


  get focused(): boolean {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<FormFieldControl<any>>this.metaInclude.component).focused;
    } else if (!this.editable) {
      return false;
    }
    throw new Error('Dynamic component must implement FormFieldControl interface.');
  }

  set id(value: string) {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      (<FormFieldControl<any>>this.metaInclude.component).id = value;
    }
  }

  get id(): string {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<FormFieldControl<any>>this.metaInclude.component).id;
    }
    throw new Error('Dynamic component must implement FormFieldControl interface.');
  }

  get ngControl(): NgControl | null {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return this.metaInclude.currentComponent['ngModelCtx'];
    }
    // throw new Error('Dynamic component must implement FormFieldControl interface.');
  }

  set placeholder(value: string) {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      (<FormFieldControl<any>>this.metaInclude.component).placeholder = value;
    }
  }

  get placeholder(): string {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<FormFieldControl<any>>this.metaInclude.component).placeholder;
    } else if (!this.editable) {
      return '';
    }
    throw new Error('Dynamic component must implement FormFieldControl interface.');
  }


  get stateChanges(): Observable<void> {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<FormFieldControl<any>>this.metaInclude.component).stateChanges;
    } else if (!this.editable) {
      return this._stateChanges;
    }
    throw new Error('Dynamic component must implement FormFieldControl interface.');
  }

  set value(value: any) {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      (<FormFieldControl<any>>this.metaInclude.component).value = value;
    }
  }

  get value(): any | null {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<FormFieldControl<any>>this.metaInclude.component).value;
    }
    throw new Error('Dynamic component must implement FormFieldControl interface.');
  }


  hasComponent(): boolean {
    return this.isFormControl(this.metaInclude.component);
  }

  private isFormControl(component: any): component is  FormFieldControl<any> {
    return component.stateChanges !== undefined &&
      component.ngControl !== undefined;
  }

  /**
   * Based on the data type set a type for the HTML Input
   */
  private registerType() {
    const dataType = this.metaInclude.metaContext.myContext().propertyForKey('type');

    switch (dataType) {
      case 'String':
      case 'string':
        this.metaInclude.component.type = 'text';
        break;
      case 'Number':
        this.metaInclude.component.type = 'number';
        break;
    }

  }
}
