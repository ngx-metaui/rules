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
import {MetaRendererComponent} from '@ngx-metaui/rules';
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

  constructor(public renderer: MetaRendererComponent, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.renderer && this.isFormControl(this.renderer.component)) {
      this.registerType();
      (<Subject<any>>this.stateChanges).next();
      this.cd.detectChanges();
    }
  }

  get autofilled(): boolean {
    if (this.renderer && this.isFormControl(this.renderer.component)) {
      return (<MatFormFieldControl<any>>this.renderer.component).autofilled;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get controlType(): string {
    if (this.renderer && this.isFormControl(this.renderer.component)) {
      return (<MatFormFieldControl<any>>this.renderer.component).controlType;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get disabled(): boolean {
    if (this.renderer && this.isFormControl(this.renderer.component)) {
      const editable = this.renderer.mc.context
        .booleanPropertyForKey('editable', false);

      const edit = this.renderer.mc.context
        .booleanPropertyForKey('editing', false);

      return (<MatFormFieldControl<any>>this.renderer.component).disabled ||
        (edit && !editable);
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get empty(): boolean {
    if (this.renderer && this.isFormControl(this.renderer.component)) {
      return (<MatFormFieldControl<any>>this.renderer.component).empty;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get errorState(): boolean {
    if (this.renderer && this.isFormControl(this.renderer.component)) {
      return (<MatFormFieldControl<any>>this.renderer.component).errorState;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get focused(): boolean {
    if (this.renderer && this.isFormControl(this.renderer.component)) {
      return (<MatFormFieldControl<any>>this.renderer.component).focused;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get id(): string {
    if (this.renderer && this.isFormControl(this.renderer.component)) {
      return (<MatFormFieldControl<any>>this.renderer.component).id;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get ngControl(): NgControl | null {
    if (this.renderer && this.isFormControl(this.renderer.component)) {
      return this.renderer.currentComponent['ngModelCtx'];
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get placeholder(): string {
    if (this.renderer && this.isFormControl(this.renderer.component)) {
      return (<MatFormFieldControl<any>>this.renderer.component).placeholder;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get required(): boolean {
    if (this.renderer && this.isFormControl(this.renderer.component)) {
      return (<MatFormFieldControl<any>>this.renderer.component).required;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get shouldLabelFloat(): boolean {
    if (this.renderer && this.isFormControl(this.renderer.component)) {
      return (<MatFormFieldControl<any>>this.renderer.component).shouldLabelFloat;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get stateChanges(): Observable<void> {
    if (this.renderer && this.isFormControl(this.renderer.component)) {
      return (<MatFormFieldControl<any>>this.renderer.component).stateChanges;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  get value(): any | null {
    if (this.renderer && this.isFormControl(this.renderer.component)) {
      return (<MatFormFieldControl<any>>this.renderer.component).value;
    }
    throw new Error('Dynamic component must MatFormFieldControl interface.');
  }

  onContainerClick(event: MouseEvent): void {
    if (this.renderer && this.isFormControl(this.renderer.component)) {
      (<MatFormFieldControl<any>>this.renderer.component).onContainerClick(event);
    }
  }

  setDescribedByIds(ids: string[]): void {
    if (this.renderer && this.isFormControl(this.renderer.component)) {
      (<MatFormFieldControl<any>>this.renderer.component).setDescribedByIds(ids);
    }
  }

  hasComponent(): boolean {
    return this.isFormControl(this.renderer.component);
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
    const dataType = this.renderer.mc.context.propertyForKey('type');

    switch (dataType) {
      case 'String':
      case 'string':
        this.renderer.component.type = 'text';
        break;
      case 'Number':
        this.renderer.component.type = 'number';
        break;
    }

  }
}
