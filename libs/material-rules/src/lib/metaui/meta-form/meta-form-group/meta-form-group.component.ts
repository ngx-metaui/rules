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
  Input,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';

import {
  Environment,
  KeyBindings,
  KeyField,
  MetaBaseComponent,
  MetaContextComponent,
  PropFieldsByZone,
  ZoneLeft,
  ZoneRight
} from '@ngx-metaui/rules';
import {MatFormField} from '@angular/material/form-field';
import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';
import {MetaFFAdapter} from '../form-field-adapter.directive';

/**
 * This class is responsible to layout Material formFields into pre-defined 5 zone layout with
 * help of flex layout.
 *
 * Top and bottom zones take 12 columns where the Left and Right zone is defined differently:
 *
 * When you do:

 * zLeft -> FirstName -> Age ->  description#fluid
 * zRight-> LastName -> FavColor.
 *
 *
 * It uses flex layout to set the flex order in such way that:
 *
 *
 * FirstName (order:1, 50%width)  LastName (order:2, 50%width)
 *
 * Age (order:3, 50%width)  FavColor (order:4, 50%width)
 *
 * description (order:5, 100%width)
 *
 *
 * This way I can have fields side by side or taking full width and they can nicely
 * wrap on smaller devices. T
 *
 *
 */
@Component({
  selector: 'm-form-group',
  templateUrl: 'meta-form-group.component.html',
  styleUrls: ['meta-form-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetaFormGroup extends MetaBaseComponent implements AfterViewInit {
  @Input()
  mc: MetaContextComponent;

  @ViewChildren('ff')
  formFields: QueryList<MatFormField>;
  /**
   * Do we have labels on top layout?
   */
  showLabelsAboveControls: boolean = false;
  /**
   * Pre-calcuated zones
   */
  mainZones: ZoneField[];
  /**
   * For multi-zone layout this contains fields broken by its assigned zones
   * only needed for calculated zones (main zones)
   */
  private fieldsByZone: Map<string, any>;

  constructor(public env: Environment, private _cd: ChangeDetectorRef) {
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
      if (formField._control.ngControl) {
        const control = formField._control.ngControl.control;
        control.setValidators(Validators.compose(this.createValidators(formField)));
        control.markAsPristine();
      }
    });
  }

  trackByFieldName(index, zoneField: ZoneField) {
    return zoneField ? zoneField.name : undefined;
  }

  protected doUpdate(): void {
    super.doUpdate();
    if (!this.mc) {
      return;
    }
    this.fieldsByZone = this._metaContext.context.propertyForKey(PropFieldsByZone);
    const bindings: Map<string, any> = this._metaContext.context.propertyForKey(KeyBindings);
    if (bindings && bindings.has('showLabelsAboveControls')) {
      this.showLabelsAboveControls = bindings.get('showLabelsAboveControls');
    }
    this.mainZones = this.calculateMainZone(
      this.fieldsByZone.get(ZoneLeft) || [], this.fieldsByZone.get(ZoneRight) || []);
  }

  /**
   * To achieve LEFT and RIGHT layout we need to iterate and merge LEFT and RIGHT zones together
   * and assign each field an order they will appear in teh UI.
   *
   *
   */
  private calculateMainZone(left: string[], right: string[]): ZoneField[] {
    if (left.length > 0 && right.length > 0) {

      const merged: ZoneField[] = [];
      let indexL = 0, indexR = 0, current = 0;

      while (current < (left.length + right.length)) {

        if (indexL < left.length) {
          const fluid = this.isFluid(left[indexL]);
          merged[current++] = new ZoneField(left[indexL], current, fluid);
          indexL++;

          if (fluid) {
            continue;
          }
        }

        if (indexR < right.length) {
          merged[current++] = new ZoneField(right[indexR], current, false);
          indexR++;
        }
      }
      return merged;

    } else if (left.length > 0) {
      return left.map<ZoneField>((item: string, index: number) =>
        new ZoneField(item, (index + 1), true));
    }

    return [];
  }

  private createValidators(formField: MatFormField): ValidatorFn[] {
    const metaValidator = (control: AbstractControl): { [key: string]: any } => {
      const metaContext = (formField._control as MetaFFAdapter).metaInclude.metaContext;
      const editing = metaContext.context.booleanPropertyForKey('editing', false);

      if (editing) {
        const errorMsg = metaContext.context.validateErrors();
        return errorMsg ? {'metavalid': {'msg': errorMsg}} : null;
      }
      return null;
    };
    return [metaValidator];
  }


  private isFluid(fieldName: string): boolean {

    this._metaContext.context.push();
    this._metaContext.context.set(KeyField, fieldName);
    const isFluid = this._metaContext.context.booleanPropertyForKey('fluid', false);
    this._metaContext.context.pop();

    return isFluid;
  }


}

export class ZoneField {

  constructor(public name?: string, public orderNum?: number,
              public isFullWidth: boolean = false) {
  }
}

