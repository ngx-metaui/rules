/**
 *
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
 *
 */
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {FormFieldControl} from '../form/form-control';


const VALID_INPUT_TYPES = [
  'standard',
  'emphasized',
  'iconleft',
  'iconright'
];


export type LinkType = 'standard' | 'emphasized' | 'iconleft' | 'iconright';


/**
 * Hyperlink component that implements consistent styling, behavior for the anchor element.
 * it supports all of the native link functionality. In addition, it supports navigation to
 * components through the action binding.
 *
 *
 */
@Component({
  selector: 'fdp-link',
  templateUrl: 'link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: FormFieldControl, useExisting: LinkComponent, multi: true}
  ]
})
export class LinkComponent {


  @Input()
  type: LinkType = 'standard';

  @Input()
  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = `sap-icon--${value}`;
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  /**
   * url for this hyperlink. Can be used to navigate to a component.
   */
  @Input()
  href: string;

  /**
   * Specify the target of the hyperlink. [_blank | _self | _parent | _top | framename ]
   */
  @Input()
  target: string;

  /**
   * Event fired when user select a item
   */
  @Output()
  click: EventEmitter<any> = new EventEmitter();

  private _disabled: boolean;
  private _icon: string;


  ngOnInit() {

    if (this.type && VALID_INPUT_TYPES.indexOf(this.type) === -1) {
      throw new Error(`fdp-link type ${this.type} is not supported`);
    }
  }

  /**
   *  Action clicked. Call parent action.
   */
  clicked(event: any) {
    this.click.emit(event);
  }
}
