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
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Host} from '@angular/core';

import {
  Environment,
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
 * This class is responsible to layout  formFields into pre-defined 5 zone layout with
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
  changeDetection: ChangeDetectionStrategy.OnPush
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


  constructor(@Host() protected _context: MetaContextComponent,
              public env: Environment, private cd: ChangeDetectorRef) {
    super(env, _context);
  }


  /**
   * Todo: revisit this part as this is called after each ngDoCheck might want to move into
   * viewchecked??
   */
  protected doUpdate(): void {
    super.doUpdate();
    this.fieldsByZone = this.context.propertyForKey(PropFieldsByZone);
    this.isFiveZoneLayout = this.context.propertyForKey(PropIsFieldsByZone);
  }


  trackByFn(index, item) {
    return item;
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


}

