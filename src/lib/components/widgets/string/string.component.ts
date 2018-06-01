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
import {Component, forwardRef, Inject, Input, Optional, SkipSelf} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {BaseFormComponent} from '../../core/base-form.component';
import {Environment} from '@aribaui/core';


/**
 * Simple component rendering values in the read only mode. Just needed some component used
 * to render Strings in read only mode
 *
 *
 *  ### Example
 *
 * Using it inside form container along with label
 *
 *
 *  ```
 *          @Component({
 *              selector: 'userInfo' ,
 *              template: `
 *                      <aw-form-table [editable]="false" >
 *                          <aw-form-row [name]="fieldName"  [label]="label">
 *                                 <aw-string [value]="inputValue" ></aw-string>
 *                           </aw-form-row>
 *                      </aw-form-table>
 *
 *                  `
 *          })
 *          export class UserProfileComponent
 *          {
 *              inputValue: string = 'Some text';
 *              inputType: string = 'string';
 *              fieldName: string = 'firstName';
 *              label: string = 'My Name';
 *              required: boolean = true;
 *              editing: boolean = true;
 *              labelsOnTop: boolean = false;
 *
 *          }
 *
 *  ```
 *
 * You can also pass html tags.
 *
 */
@Component({
    selector: 'aw-string',
    template: `
        <span class="w-string-field" [innerHTML]="value"></span>
    `,
    styleUrls: ['string.component.scss']
})
export class StringComponent extends BaseFormComponent
{
    /**
     *  Value to be interpolated
     *
     */
    private _value: string = '';


    constructor(public env: Environment, private sanitizer: DomSanitizer,
                @SkipSelf() @Optional() @Inject(forwardRef(() => BaseFormComponent))
                protected parentContainer: BaseFormComponent)
    {
        super(env, parentContainer);

    }


    @Input()
    set value(value: any)
    {
        this._value = value;
    }

    get value(): any
    {
        return this.sanitizer.bypassSecurityTrustHtml(this._value);
    }
}


