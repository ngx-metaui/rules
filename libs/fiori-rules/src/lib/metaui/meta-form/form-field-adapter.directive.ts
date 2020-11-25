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
import {ChangeDetectorRef, Directive, Host, OnInit, Optional, SkipSelf} from '@angular/core';
import {MetaIncludeComponent} from '@ngx-metaui/rules';
import {NgControl} from '@angular/forms';
import {ContentDensity, FormField, FormFieldControl, Status} from '@fundamental-ngx/platform';
import {Observable} from 'rxjs';


/**
 *
 *  Fiori FormField expect the FormFieldControl and since MetaIncludeComponent is different type
 *  we need to composite new component that has both functionality of MetaIncludeComponent and
 *  FormField.
 *
 *  Therefore we have this adapter that insert required FormFieldControl behavior to the
 *  m-render and re-connects instantiated component with the FormField.
 *
 *
 */
@Directive({
  selector: '[mFormFieldAdapter]',
  providers: [
    {provide: FormFieldControl, useExisting: MetaFFAdapter, multi: true}
  ]
})
export class MetaFFAdapter implements FormFieldControl<any>, OnInit {

  constructor(public metaInclude: MetaIncludeComponent,
              private cd: ChangeDetectorRef,
              @Optional() @SkipSelf() @Host() private formField: FormField,
  ) {
  }


  ngOnInit(): void {

    if (this.formField) {
      this.formField.registerFormFieldControl(this);
    }

    if (this.metaInclude && this.hasComponent()) {
      this.registerType();
      this.cd.detectChanges();
    }
  }


  get value(): any | null {
    if (this.metaInclude && this.hasComponent()) {
      return (<FormFieldControl<any>>this.metaInclude.component).value;
    }
    this.formFieldControlInterfaceError();
  }

  set value(value: any | null) {
    if (this.metaInclude && this.hasComponent()) {
      (<FormFieldControl<any>>this.metaInclude.component).value = value;
    }
  }

  get placeholder(): string {
    if (this.metaInclude && this.hasComponent()) {
      return (<FormFieldControl<any>>this.metaInclude.component).placeholder;
    }
    this.formFieldControlInterfaceError();
  }

  set placeholder(placeholder: string) {
    if (this.metaInclude && this.hasComponent()) {
      (<FormFieldControl<any>>this.metaInclude.component).placeholder = placeholder;
    }
  }

  get id(): string {
    if (this.metaInclude && this.hasComponent()) {
      return (<FormFieldControl<any>>this.metaInclude.component).id;
    }
    this.formFieldControlInterfaceError();
  }

  set id(id: string) {
    if (this.metaInclude && this.hasComponent()) {
      (<FormFieldControl<any>>this.metaInclude.component).id = id;
    }
  }


  get editable(): boolean {
    if (this.metaInclude && this.hasComponent()) {
      const editable = this.metaInclude.metaContext.context
        .booleanPropertyForKey('editable', true);
      return editable;
    }
    this.formFieldControlInterfaceError();
  }

  set editable(editable: boolean) {
    if (this.metaInclude && this.hasComponent()) {
      (<FormFieldControl<any>>this.metaInclude.component).editable = editable;
    }
  }

  get contentDensity(): ContentDensity {
    if (this.metaInclude && this.hasComponent()) {
      return (<FormFieldControl<any>>this.metaInclude.component).contentDensity;
    }
    this.formFieldControlInterfaceError();
  }

  set contentDensity(contentDensity: ContentDensity) {
    if (this.metaInclude && this.hasComponent()) {
      (<FormFieldControl<any>>this.metaInclude.component).contentDensity = contentDensity;
    }
  }

  get stateChanges(): Observable<void> {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<FormFieldControl<any>>this.metaInclude.component).stateChanges;
    }
    this.formFieldControlInterfaceError();
  }

  focus(event?: MouseEvent): void {
  }


  get ngControl(): NgControl | null {
    if (this.metaInclude && this.hasComponent()) {
      return this.metaInclude.currentComponent['ngModelCtx'] as NgControl;
    }
    this.formFieldControlInterfaceError();
  }

  get disabled(): boolean {
    if (this.metaInclude && this.hasComponent()) {
      const editable = this.metaInclude.metaContext.context
        .booleanPropertyForKey('editable', false);

      const edit = this.metaInclude.metaContext.context
        .booleanPropertyForKey('editing', false);
      return (<FormFieldControl<any>>this.metaInclude.component).disabled || (edit && !editable);
    }
    this.formFieldControlInterfaceError();
  }


  get focused(): boolean {
    if (this.metaInclude && this.hasComponent()) {
      return (<FormFieldControl<any>>this.metaInclude.component).focused;
    }
    this.formFieldControlInterfaceError();
  }

  get status(): Status {
    if (this.metaInclude && this.hasComponent()) {
      return (<FormFieldControl<any>>this.metaInclude.component).status;
    }
    this.formFieldControlInterfaceError();
  }


  onContainerClick(event: MouseEvent): void {
    if (this.metaInclude && this.hasComponent()) {
      (<FormFieldControl<any>>this.metaInclude.component).onContainerClick(event);
    }
  }

  hasComponent(): boolean {
    return this.isFormControl(this.metaInclude.component);
  }

  private isFormControl(component: any): component is  FormFieldControl<any> {
    return component.stateChanges !== undefined &&
      component.contentDensity !== undefined &&
      component.ngControl !== undefined;
  }

  /**
   * Based on the data type set a type for the HTML Input
   */
  private registerType() {
    const dataType = this.metaInclude.metaContext.context.propertyForKey('type');

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


  private formFieldControlInterfaceError(): void {
    throw new Error('Dynamic component must implement FormFieldControl interface.');
  }
}
