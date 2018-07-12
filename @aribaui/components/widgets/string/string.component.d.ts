import { DomSanitizer } from '@angular/platform-browser';
import { BaseFormComponent } from '../../core/base-form.component';
import { Environment } from '@aribaui/core';
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
export declare class StringComponent extends BaseFormComponent {
    env: Environment;
    private sanitizer;
    protected parentContainer: BaseFormComponent;
    /**
     *  Value to be interpolated
     *
     */
    private _value;
    constructor(env: Environment, sanitizer: DomSanitizer, parentContainer: BaseFormComponent);
    value: any;
}
