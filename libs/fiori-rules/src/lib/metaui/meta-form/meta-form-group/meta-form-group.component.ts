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
 * Based on original work: MetaUI: Craig Federighi (2008)
 *
 */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  QueryList,
  ViewChildren
} from '@angular/core';

import {Environment, MetaBaseComponent, MetaContextComponent} from '@ngx-metaui/rules';
import {FormField} from '@fundamental-ngx/platform';
import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';
import {MetaFFAdapter} from '../form-field-adapter.directive';

/**
 * Renders a dynamic form based on current MetaContext
 *
 */
@Component({
  selector: 'm-form-group',
  templateUrl: 'meta-form-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetaFormGroup extends MetaBaseComponent implements AfterViewInit {
  @Input()
  mc: MetaContextComponent;


  @ViewChildren('ff')
  formFields: QueryList<FormField>;

  constructor(private _cd: ChangeDetectorRef, public env: Environment) {
    super(env, null);
  }

  ngOnInit(): void {
    this._metaContext = this.mc;
    super.ngOnInit();
  }


  ngAfterViewInit(): void {
    if (!this.editing) {
      this._cd.detectChanges();
      return;
    }
    this.formFields.forEach((formField) => {
      if (formField.control.ngControl) {
        const control = formField.control.ngControl.control;
        control.setValidators(Validators.compose(this.createValidators(formField)));
        control.markAsPristine();
      }
    });
  }


  private createValidators(formField: FormField): ValidatorFn[] {
    const metaValidator = (control: AbstractControl): { [key: string]: any } => {
      const metaContext = (formField.control as MetaFFAdapter).metaInclude.metaContext;
      const editing = metaContext.context.booleanPropertyForKey('editing', false);

      if (editing) {
        const errorMsg = metaContext.context.validateErrors();
        return errorMsg ? {'metavalid': {'msg': errorMsg}} : null;
      }
      return null;
    };
    return [metaValidator];
  }

  trackByFn(index, item) {
    return item;
  }


}

