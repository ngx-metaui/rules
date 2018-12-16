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
import {ChangeDetectorRef, Component, Host, ViewEncapsulation} from '@angular/core';

import {
  Environment,
  KeyBindings,
  KeyField,
  MetaBaseComponent,
  MetaContextComponent,
  PropFieldsByZone,
  PropIsFieldsByZone,
  ZoneBottom,
  ZoneLeft,
  ZoneRight,
  ZoneTop
} from '@ngx-metaui/rules';

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
 * This way I can have fields side by side or taking full width and they can nicely naturally
 * wrap on smaller devices. This is pretty fast and responsible compared to my first solution
 * that I have in prime NG where I have special components and complicated ViewChild queries..
 *
 *
 */
@Component({
  selector: 'm-form-group',
  templateUrl: 'meta-form-group.component.html',
  styleUrls: ['meta-form-group.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MetaFormGroup extends MetaBaseComponent {
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


  constructor(@Host() protected _context: MetaContextComponent,
              public env: Environment, private cd: ChangeDetectorRef) {
    super(env, _context);
  }


  canShowZone(zone: string): boolean {
    return this.fieldsByZone && this.fieldsByZone.has(zone);
  }

  canShowMainZone(): boolean {
    return this.canShowZone('zLeft') || this.canShowZone('zRight');
  }


  /**
   * Todo: revisit this part as this is called after each ngDoCheck might want to move into
   * viewchecked??
   */
  protected doUpdate(): void {
    super.doUpdate();

    this.fieldsByZone = this.context.propertyForKey(PropFieldsByZone);
    this.isFiveZoneLayout = this.context.propertyForKey(PropIsFieldsByZone);


    const bindings: Map<string, any> = this.context.propertyForKey(KeyBindings);
    if (bindings) {
      this.showLabelsAboveControls = bindings.get('showLabelsAboveControls');

      if (!this.showLabelsAboveControls) {
        this.showLabelsAboveControls = false;
      }
    }
    this.mainZones = this.calculateMainZone(this.zLeft() || [], this.zRight() || []);
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
    } else if (this.zLeft().length > 0) {
      return this.zLeft().map<ZoneField>((item: string, index: number) =>
        new ZoneField(item, (index + 1), true));
    }

    return [];
  }


  private isFluid(fieldName: string): boolean {

    this.context.push();
    this.context.set(KeyField, fieldName);
    const isFluid = this.context.booleanPropertyForKey('fluid', false);
    this.context.pop();

    return isFluid;
  }
}

export class ZoneField {

  constructor(public name?: string, public orderNum?: number,
              public isFullWidth: boolean = false) {
  }
}

