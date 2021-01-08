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
import {ContentDensity, FormField, FormFieldControl, Status} from '@fundamental-ngx/platform';
import {NgControl} from '@angular/forms';
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
  contentDensity: ContentDensity;
  readonly disabled: boolean;
  editable: boolean;
  readonly focused: boolean;
  id: string;
  readonly ngControl: NgControl | null;
  placeholder: string;
  readonly stateChanges: Observable<void>;
  readonly status: Status;
  value: any | null;


  constructor(public metaInclude: MetaIncludeComponent,
              private cd: ChangeDetectorRef,
              @Optional() @SkipSelf() @Host() private formField: FormField,
  ) {
  }


  ngOnInit(): void {
    if (this.metaInclude && this.hasComponent()) {
      this.registerType();

      if (this.formField) {
        this.metaInclude.component['__metaContext__'] = this.metaInclude.metaContext;
        this.formField.registerFormFieldControl(this.metaInclude.component);
      }

      this.cd.detectChanges();
    }
  }


  focus(event?: MouseEvent): void {
  }

  onContainerClick(event: MouseEvent): void {
  }

  hasComponent(): boolean {
    return this.isFormControl(this.metaInclude.component);
  }

  private isFormControl(component: any): component is  FormFieldControl<any> {
    return component.stateChanges !== undefined &&
      component.focus !== undefined &&
      component.onContainerClick !== undefined &&
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


}
