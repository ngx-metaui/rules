/**
 *
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
 *
 *
 */
import {Component, Input, OnInit} from '@angular/core';
import {isBlank} from '../../../../core/utils/lang';
import {Environment} from '../../../../core/config/environment';

/**
 * Renders html step component
 *
 *  * Usage:
 *       Straight forward to use. But mostly it would be used as part of the stepper component.
 *
 *          @Component({
 *                selector: 'aw-page' ,
 *                           template: `
 *                           <aw-step [title]="step" [color]="color"></aw-step>
 *                           `
 */

  // Default color for this step.
const DEFAULT_COLOR = '#58b957';

@Component({
  selector: 'aw-step',
  templateUrl: 'step.component.html',
  styleUrls: ['step.component.scss']
})
export class StepComponent implements OnInit {
  /**
   * The color of step icon.
   */
  @Input()
  color: string;

  /**
   * title appears under the step graphics.
   */
  @Input()
  title: string;

  constructor(public env: Environment) {
  }

  ngOnInit() {
    if (isBlank(this.color)) {
      this.color = DEFAULT_COLOR;
    }
  }
}
