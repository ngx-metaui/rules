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
import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {isBlank, isPresent} from '../../../core/utils/lang';
import {Environment} from '../../../core/config/environment';
import {BaseComponent} from '../../core/base.component';

/**
 * Button component that implements consistent styling, behavior. Button can be rendered either as
 * a button or as a link. It could be standalone or be part of a form.
 *
 *  ### Example
 *  ```
 *
 *  @Component({
 *    selector: 'registration' ,
 *    template: `
 *
 *   <aw-form-table >
 *       <aw-form-row [label]="'Amount'" [name]="'amount'" [size]="'small'">
 *
 *           <aw-button [type]="'submit'" [name]="'button'"
 *                     (action)="onClicked($event)" [value]="command"
 *                     [style]="'warning'" >Button</aw-button>
 *       </aw-form-row>
 *   </aw-form-table>
 *
 *    `
 *    })
 *    export class MyComponent
 *    {
 *        command:boolean;
 *
 *        constructor ()
 *        {
 *        }
 *
 *        onClicked(value:string) {
 *           if (value) {
 *              // submit form.
 *           }
 *        }
 *    }
 */
@Component({
  selector: 'aw-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss']
})
export class ButtonComponent extends BaseComponent implements AfterViewInit {

  /**
   * Button types  [ button | submit | reset ]
   *
   */
  @Input()
  type: string = 'button';

  /**
   * Name for this button. Can be used to lookup component in form.
   */
  @Input()
  name: string;


  /**
   * styling for this button. See ButtonStyle for all supported styles.
   */
  @Input()
  style: ButtonStyle = 'primary';


  /**
   * sizing for this button. [large, normal, small].
   */
  @Input()
  size: ButtonSize = 'normal';

  /**
   * Specify the target of the button. [_blank | _self | _parent | _top | framename ]
   */
  @Input()
  target: string;

  /**
   * Value to be send to server when clicked.
   */
  @Input()
  value: string;

  /**
   * Event fired when user select a item
   */
  @Output()
  action: EventEmitter<any> = new EventEmitter();


  /**
   * PrimeNg button simply does not support content so we need to get around it
   */
  label: string;

  /**
   * Internal CSS class that styles this button based on input 'style' and 'size'
   */
  buttonClass: string;

  constructor(protected element: ElementRef, public env: Environment) {
    super(env);

    // Default button class is secondary.
    this.buttonClass = 'ui-button-secondary';

    // Default disabled
    this.disabled = false;
  }

  ngOnInit() {
    super.ngOnInit();
    // How to style this button.
    if (isPresent(this.style)) {
      if (this.style === 'primary') {
        // Default .ui-button and .ui-button-primary get the same style.
        // .ui-button-primary is necessary because button style can be overridden
        // when included inside other widgets. So specify primary
        this.buttonClass = 'ui-button-primary';
      } else {
        this.buttonClass = 'ui-button-' + this.style;
      }
    }

    // Determine the button class based on input size.
    if (this.size) {

      switch (this.size) {
        case 'large' :
          this.buttonClass += ' btn-lg';
          break;
        case 'normal' :
          this.buttonClass += ' btn-mid';
          break;
        case 'small' :
          this.buttonClass += ' btn-sm';
          break;
      }
    }
  }


  /**
   * This is little hacky hackity hack as currently primeng button directive does not work with
   * ngcontent projection but it has a label bindings, which is not the way developers work with
   * button. you want to
   *
   * <button> MY CONTENT</button instead of <button label='MyContent'></button>
   *
   *
   * @Todo: Change this until the time keep a test that check that they are still using ui-button
   *     that we are expecting and replacing
   */
  ngAfterViewInit(): void {
    if (isPresent(this.element)) {
      let button = this.element.nativeElement.querySelector('button');
      let buttonTitle = button.children[0];
      button.children[0].textContent = this.element.nativeElement.textContent.trim()
        .replace('ui-button', '').replace('ui-btn', '');

      button.classList.remove('ui-button-text-empty');
      button.textContent = '';
      button.appendChild(buttonTitle);
    }
  }

  /**
   *  Action clicked. Call parent action.
   */
  clicked($event: any) {
    this.action.emit(isBlank(this.value) ? $event : this.value);
  }
}


/**
 * Supported Button Style
 */
export type ButtonStyle = 'info' | 'primary' | 'secondary' | 'warning' | 'success' | 'danger' |
  'link';

/**
 * Supported Button Size
 */
export type ButtonSize = 'large' | 'normal' | 'small';
