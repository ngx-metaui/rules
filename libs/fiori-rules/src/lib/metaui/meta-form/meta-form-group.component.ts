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
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';

import {MetaBaseComponent, MetaContextComponent} from '@ngx-metaui/rules';
import {FormField} from '@fundamental-ngx/platform';
import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';

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

  @ViewChild('classMC', {static: true})
  private _mc: MetaContextComponent;

  @ViewChildren('ff')
  formFields: QueryList<FormField>;



  get metaContext(): MetaContextComponent {
    return this._mc;
  }

  constructor(public _cd: ChangeDetectorRef, public _parentMC: MetaContextComponent) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }


  ngAfterViewInit(): void {
    this.updateMeta();
    if (!this.editing) {
      return;
    }

    this.formFields.forEach((formField) => {
      if (formField.control && formField.control.ngControl) {
        const control = formField.control.ngControl.control;
        control.setValidators(Validators.compose(this._createValidators(formField)));
        control.markAsPristine();
      }
    });
    this._cd.detectChanges();
  }


  private _createValidators(formField: FormField): ValidatorFn[] {
    const metaValidator = (control: AbstractControl): { [key: string]: any } => {
      const cnx = formField.control['_MC_'].context;
      const editing = cnx.booleanPropertyForKey('editing', false);

      if (editing) {
        const errorMsg = cnx.validateErrors();
        return errorMsg ? {'metavalid': {'msg': errorMsg}} : null;
      }
      return null;
    };
    return [metaValidator];
  }

  protected doUpdate(): void {
    super.doUpdate();
    if (!this.metaContext) {
      return;
    }
    this._cd.detectChanges();
  }
}

