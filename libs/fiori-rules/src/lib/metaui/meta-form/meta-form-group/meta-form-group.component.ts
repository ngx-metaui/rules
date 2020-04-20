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
import {AfterViewInit, ChangeDetectionStrategy, Component, Host, Optional} from '@angular/core';

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
import {ControlContainer, FormGroup} from '@angular/forms';

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
 * This way I can have fields side by side or taking full width and they can  naturally
 * wrap on smaller devices.
 *
 */
@Component({
  selector: 'm-form-group',
  templateUrl: 'meta-form-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetaFormGroup extends MetaBaseComponent implements AfterViewInit {
  /**
   * For multi-zone layout this contains fields broken by its assigned zones
   */
  private fieldsByZone: Map<string, any>;

  startInit: any;

  /**
   * Is five zone layout? For MetaUi we  have always fiveZone, unless in MetaRules we say
   * otherwise
   */
  isFiveZoneLayout: boolean;

  useNoLabelLayout = false;

  zLeft: string[] = [];
  zRight: string[] = [];
  zTop: string[] = [];
  zBottom: string[] = [];

  constructor(@Host() public _context: MetaContextComponent,
              @Optional() private formContainer: ControlContainer,
              public env: Environment) {
    super(env, _context);

    this.formGroup = <FormGroup>((this.formContainer) ? this.formContainer.control
      : new FormGroup({}));
  }


  /**
   * Todo: revisit this part as this is called after each ngDoCheck might want to move into
   * viewchecked??
   */
  protected doUpdate(): void {
    super.doUpdate();
    this.fieldsByZone = this.context.propertyForKey(PropFieldsByZone);
    this.isFiveZoneLayout = this.context.propertyForKey(PropIsFieldsByZone);

    const bin: Map<string, any> = this.context.propertyForKey('bindings');
    if (bin && bin.has('noLabelLayout')) {
      this.useNoLabelLayout = bin.get('noLabelLayout');
    }

    this.zLeft = this.updateZone(this.zLeft, this.fieldsByZone.get(ZoneLeft));
    this.zRight = this.updateZone(this.zRight, this.fieldsByZone.get(ZoneRight));
    this.zTop = this.updateZone(this.zTop, this.fieldsByZone.get(ZoneTop));
    this.zBottom = this.updateZone(this.zBottom, this.fieldsByZone.get(ZoneBottom));

  }


  private updateZone(sourceZone: string[], newArray: string[]) {
    if (newArray && (newArray.length !== sourceZone.length)) {
      return newArray;
    }
    return sourceZone;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
  }


  trackByFn(index, item) {
    return item;
  }


}

