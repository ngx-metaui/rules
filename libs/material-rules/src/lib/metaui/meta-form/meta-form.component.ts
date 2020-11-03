/**
 * @license
 * F. Kolar
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
import {Component, ContentChild, OnInit} from '@angular/core';
import {
  Environment,
  KeyField,
  MetaBaseComponent,
  MetaContextComponent,
  ZoneBottom,
  ZoneLeft,
  ZoneRight,
  ZoneTop
} from '@ngx-metaui/rules';
import {MatFormField} from '@angular/material/form-field';


/**
 *  Since MetaUI is using stack to PUSH/POP properties and it relies on certain order to get
 *  consistent behavior we need to create these views. For more info please see
 *  MetaContextComponent
 *
 *
 */
@Component({
  selector: 'm-md-form',
  templateUrl: './meta-form.component.html',
  styleUrls: ['./meta-form.component.scss']
})
export class MetaForm extends MetaBaseComponent implements OnInit {
  /**
   * For multi-zone layout this contains fields broken by its assigned zones
   */
  private fieldsByZone: Map<string, any>;

  /**
   * Is five zone layout? For MetaUi we  have always fiveZone, unless in MetaRules we say
   * otherwise
   */
  isFiveZoneLayout: boolean;


  /**
   * Do we have labels on top layout?
   */
  showLabelsAboveControls: boolean;


  /**
   * Pre-calcuated zones
   */
  mainZones: ZoneField[];

  @ContentChild('classMetaContext', {static: true})
  private _classContext: MetaContextComponent;


  /**
   * @internal
   */
  _errorMessage: string;

  constructor(public env: Environment) {
    super(env, null);
  }

  ngOnInit(): void {
    this._metaContext = this._classContext;
    super.ngOnInit();
  }


  canShowZone(zone: string): boolean {
    return this.fieldsByZone && this.fieldsByZone.has(zone);
  }

  canShowMainZone(): boolean {
    return this.canShowZone('zLeft') || this.canShowZone('zRight');
  }

  zLeft(): string[] {
    return this.fieldsByZone.get(ZoneLeft);
  }

  zRight(): string[] {
    return this.fieldsByZone.get(ZoneRight);
  }

  zTop(): string[] {
    return this.fieldsByZone.get(ZoneTop);
  }

  zBottom(): string[] {
    return this.fieldsByZone.get(ZoneBottom);
  }

  trackByFieldName(index, zoneField: ZoneField) {
    return zoneField ? zoneField.name : undefined;
  }

  fieldHasError(ff: MatFormField): boolean {
    return this.editing && ff._control && ff._control.ngControl.control.invalid;
  }

  errMessage(ff: MatFormField): string {
    return ff._control.ngControl.errors['metavalid'] ?
      ff._control.ngControl.errors['metavalid'].msg
      : '';
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
      return this.zLeft().map<ZoneField>((item: string, index: number) =>
        new ZoneField(item, (index + 1), true));
    }

    return [];
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
