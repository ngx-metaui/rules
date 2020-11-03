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
import {ChangeDetectorRef, Directive} from '@angular/core';
import {MetaIncludeComponent} from '@ngx-metaui/rules';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Observable, Subject} from 'rxjs';
import {NgControl} from '@angular/forms';


/**
 *
 *  MatFormField does not support much freedom in terms of instantiating
 *  programmatically input components as they have in the ngAfterContentChecked() a check that child
 *  must be a MatFormFieldControl but at the time when FormField checks for the existence of
 *  MatFormFieldControl control our dynamic component hasn't been created.
 *
 *  Therefore we have this adapter that insert required MatFormFieldControl behavior to the
 *  <m-include-component> and re-connects instantiated component with the FormField.
 *
 *
 */
@Directive({
  selector: '[mFormFieldAdapter]',
  providers: [
    {provide: MatFormFieldControl, useExisting: MetaFFAdapter}
  ]
})
export class MetaFFAdapter implements MatFormFieldControl<any> {

  constructor(public metaInclude: MetaIncludeComponent, private cd: ChangeDetectorRef) {
  }

  get autofilled(): boolean {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<MatFormFieldControl<any>>this.metaInclude.component).autofilled;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get controlType(): string {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<MatFormFieldControl<any>>this.metaInclude.component).controlType;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get disabled(): boolean {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      const editable = this.metaInclude.metaContext.context
        .booleanPropertyForKey('editable', false);

      const edit = this.metaInclude.metaContext.context
        .booleanPropertyForKey('editing', false);

      return (<MatFormFieldControl<any>>this.metaInclude.component).disabled ||
        (edit && !editable);
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get empty(): boolean {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<MatFormFieldControl<any>>this.metaInclude.component).empty;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get errorState(): boolean {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<MatFormFieldControl<any>>this.metaInclude.component).errorState;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get focused(): boolean {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<MatFormFieldControl<any>>this.metaInclude.component).focused;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get id(): string {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<MatFormFieldControl<any>>this.metaInclude.component).id;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get ngControl(): NgControl | null {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return this.metaInclude.currentComponent['ngModelCtx'];
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get placeholder(): string {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<MatFormFieldControl<any>>this.metaInclude.component).placeholder;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get required(): boolean {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<MatFormFieldControl<any>>this.metaInclude.component).required;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get shouldLabelFloat(): boolean {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<MatFormFieldControl<any>>this.metaInclude.component).shouldLabelFloat;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get stateChanges(): Observable<void> {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<MatFormFieldControl<any>>this.metaInclude.component).stateChanges;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get value(): any | null {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      return (<MatFormFieldControl<any>>this.metaInclude.component).value;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  ngOnInit(): void {

    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      this.registerType();
      (<Subject<any>>this.stateChanges).next();
      this.cd.detectChanges();
    }
  }

  onContainerClick(event: MouseEvent): void {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      (<MatFormFieldControl<any>>this.metaInclude.component).onContainerClick(event);
    }
  }

  setDescribedByIds(ids: string[]): void {
    if (this.metaInclude && this.isFormControl(this.metaInclude.component)) {
      (<MatFormFieldControl<any>>this.metaInclude.component).setDescribedByIds(ids);
    }
  }

  hasComponent(): boolean {
    return this.isFormControl(this.metaInclude.component);
  }

  private isFormControl(component: any): component is  MatFormFieldControl<any> {
    return component.stateChanges !== undefined &&
      component.shouldLabelFloat !== undefined &&
      component.setDescribedByIds !== undefined;
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
}
