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
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';


export type FormZone = 'zTop' | 'zBottom' | 'zLeft' | 'zRight';

/**
 *
 *  We need to be able to instantiate sa button or link programmatically. Just like the other
 *  components where angular does not support any directive manipulation or to work with native
 *  components we need to create a component out from mat button directive
 *
 *
 */
@Component({
  selector: 'fdp-form-field',
  templateUrl: 'form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FormFieldComponent implements OnInit {

  @Input()
  label: string;

  @Input()
  id: string;

  @Input()
  zone: FormZone;

  @Input()
  hintLayout: 'inline' | 'popover' = 'popover';

  @Input()
  hint: string;

  @Input()
  required: boolean = false;

  @Input()
  rank: number;

  @Input()
  placeHolder: string;

  @Input()
  fluid: boolean = false;

  @ViewChild('renderer', {static: true})
  renderer: TemplateRef<any>;

  constructor(private cd: ChangeDetectorRef) {
    // need to inject ngForm + formGroup as well. to register

  }

  ngOnInit(): void {

  }


}

