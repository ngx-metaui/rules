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
import {Component, Host, ViewChild} from '@angular/core';

import {
  Environment,
  KeyBindings,
  MetaBaseComponent,
  MetaContextComponent,
  PropFieldsByZone,
  PropIsFieldsByZone,
  UIContext,
  ZoneBottom,
  ZoneLeft,
  ZoneMiddle,
  ZoneRight,
  ZoneTop
} from '@ngx-metaui/rules';
import {FormTableComponent} from '../../../ui/layouts/form-table/form-table.component';
import {isBlank, isPresent} from '../../../ui/core/utils/lang';

/**
 * This is a wrapper around FormtTable to render data based on current MetaContext.
 */
@Component({
  selector: 'm-form-table',
  templateUrl: 'meta-form-table.component.html',
  styleUrls: ['meta-form-table.component.scss']
})
export class MetaFormTableComponent extends MetaBaseComponent {
  /**
   * Is five zone layout? ForMetaUi we probalby have always fiveZone, unless in MetaRules we say
   * otherwise
   */
  isFiveZoneLayout: boolean;
  /**
   * Do we have labels on top layout?
   */
  showLabelsAboveControls: boolean;
  /**
   * For multizone layout this contains fields broken by its assigned zones
   */
  private fieldsByZone: Map<string, any>;
  /**
   * Reference to current rendered FormTable
   */
  @ViewChild('metaFormTable')
  private form: FormTableComponent;

  /**
   * Active zones passed to the FormTable.
   *
   * Note: I could not find better way without having this property. When using FormTable I dont
   * want to tell what zones are active. The form table should figure out byitself just from the
   * ng-contented sections.
   *
   * The other approach is the wrap these into component and probably better
   *
   *e.g.
   *
   * ```html
   *  <aw-form-table ...>
   *    <aw-form-zone name='top'>
   *        <aw-form-row>...</aw-form-row>
   *     <aw-form-zone>
   *
   *
   *    ...
   *  </aw-form-table ...>
   * ```
   *
   */


  constructor(@Host() protected _context: MetaContextComponent, public env: Environment) {
    super(env, _context);
  }


  canShowZone(zone: string): boolean {
    return isPresent(this.fieldsByZone) && this.fieldsByZone.has(zone);
  }

  zLeft(): string[] {
    return this.fieldsByZone.get(ZoneLeft);
  }

  zMiddle(): string[] {
    return this.fieldsByZone.get(ZoneMiddle);
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

  protected doUpdate(): void {
    super.doUpdate();

    this.fieldsByZone = this.context.propertyForKey(PropFieldsByZone);
    this.isFiveZoneLayout = this.context.propertyForKey(PropIsFieldsByZone);


    const bindings: Map<string, any> = this.context.propertyForKey(KeyBindings);
    if (isPresent(bindings)) {
      this.showLabelsAboveControls = bindings.get('showLabelsAboveControls');

      if (isBlank(this.showLabelsAboveControls)) {
        this.showLabelsAboveControls = false;
      }
    }

    this.initForm();
  }

  /**
   * Need to initialize FormGroup with all the available fields based on the given object. Its
   * hard to manage a state where we dynamically render different number of fields per operation.
   *
   * *
   */
  private initForm(): void {
    if (isPresent(this.form)) {
      this.form.editable = this.editable;
    }
    const obj = (<UIContext>this.context).object;
    if (Object.keys(this.formGroup.value).length !== Object.keys(obj).length) {
      Object.keys(obj).forEach((key: string) => {
        this.doRegister(key, obj[key]);
      });
    }
  }
}

