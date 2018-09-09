/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Environment, isBlank, isPresent } from '@aribaui/core';
import { BaseComponent } from '../../core/base.component';
/**
 * Button component that implements consistent styling, behavior. Button can be rendered either as
 * a button or as a link. It could be standalone or be part of a form.
 *
 *  ### Example
 *  ```
 *
 * \@Component({
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
export class ButtonComponent extends BaseComponent {
    /**
     * @param {?} element
     * @param {?} env
     */
    constructor(element, env) {
        super(env);
        this.element = element;
        this.env = env;
        /**
         * Button types  [ button | submit | reset ]
         *
         */
        this.type = 'button';
        /**
         * styling for this button. See ButtonStyle for all supported styles.
         */
        this.style = 'primary';
        /**
         * sizing for this button. [large, normal, small].
         */
        this.size = 'normal';
        /**
         * Event fired when user select a item
         */
        this.action = new EventEmitter();
        // Default button class is secondary.
        this.buttonClass = 'ui-button-secondary';
        // Default disabled
        this.disabled = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        // How to style this button.
        if (isPresent(this.style)) {
            if (this.style === 'primary') {
                // Default .ui-button and .ui-button-primary get the same style.
                // .ui-button-primary is necessary because button style can be overridden
                // when included inside other widgets. So specify primary
                this.buttonClass = 'ui-button-primary';
            }
            else {
                this.buttonClass = 'ui-button-' + this.style;
            }
        }
        // Determine the button class based on input size.
        if (this.size) {
            switch (this.size) {
                case 'large':
                    this.buttonClass += ' btn-lg';
                    break;
                case 'normal':
                    this.buttonClass += ' btn-mid';
                    break;
                case 'small':
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
     * \@Todo: Change this until the time keep a test that check that they are still using ui-button
     *     that we are expecting and replacing
     * @return {?}
     */
    ngAfterViewInit() {
        if (isPresent(this.element)) {
            /** @type {?} */
            let button = this.element.nativeElement.querySelector('button');
            /** @type {?} */
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
     * @param {?} $event
     * @return {?}
     */
    clicked($event) {
        this.action.emit(isBlank(this.value) ? $event : this.value);
    }
}
ButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-button',
                template: "<button\n    pButton\n    [attr.type]=\"type\"\n    [attr.name]=\"name\"\n    [ngClass]=\"buttonClass\"\n    [disabled]=\"disabled\"\n    [attr.value]=\"value\"\n    (click)=\"clicked($event)\">\n\n    <ng-content></ng-content>\n</button>\n",
                styles: [".ui-button-link{color:#337ab7;font-weight:400;border-radius:0;background-color:transparent}.ui-button-link,.ui-button-link.active,.ui-button-link:active,.ui-button-link:focus,.ui-button-link:hover,.ui-button-link[disabled]{border-color:transparent}.ui-button-link:focus,.ui-button-link:hover{color:#337ab7;-webkit-text-decoration:#337ab7;text-decoration:#337ab7;background-color:transparent}.ui-button-link[disabled]:focus,.ui-button-link[disabled]:hover{color:#2399e5;text-decoration:none}.ui-button{margin-right:5px}.btn-mid{height:36px;padding:5px 10px}.btn-lg{height:42px;font-size:16px;padding:5px 12px}.btn-sm{height:30px;font-size:12px;padding:5px 10px}"]
            }] }
];
/** @nocollapse */
ButtonComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment }
];
ButtonComponent.propDecorators = {
    type: [{ type: Input }],
    name: [{ type: Input }],
    style: [{ type: Input }],
    size: [{ type: Input }],
    target: [{ type: Input }],
    value: [{ type: Input }],
    action: [{ type: Output }]
};
if (false) {
    /**
     * Button types  [ button | submit | reset ]
     *
     * @type {?}
     */
    ButtonComponent.prototype.type;
    /**
     * Name for this button. Can be used to lookup component in form.
     * @type {?}
     */
    ButtonComponent.prototype.name;
    /**
     * styling for this button. See ButtonStyle for all supported styles.
     * @type {?}
     */
    ButtonComponent.prototype.style;
    /**
     * sizing for this button. [large, normal, small].
     * @type {?}
     */
    ButtonComponent.prototype.size;
    /**
     * Specify the target of the button. [_blank | _self | _parent | _top | framename ]
     * @type {?}
     */
    ButtonComponent.prototype.target;
    /**
     * Value to be send to server when clicked.
     * @type {?}
     */
    ButtonComponent.prototype.value;
    /**
     * Event fired when user select a item
     * @type {?}
     */
    ButtonComponent.prototype.action;
    /**
     * PrimeNg button simply does not support content so we need to get around it
     * @type {?}
     */
    ButtonComponent.prototype.label;
    /**
     * Internal CSS class that styles this button based on input 'style' and 'size'
     * @type {?}
     */
    ButtonComponent.prototype.buttonClass;
    /** @type {?} */
    ButtonComponent.prototype.element;
    /** @type {?} */
    ButtonComponent.prototype.env;
}
/** @typedef {?} */
var ButtonStyle;
export { ButtonStyle };
/** @typedef {?} */
var ButtonSize;
export { ButtonSize };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2J1dHRvbi9idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFnQixTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEN4RCxNQUFNLHNCQUF1QixTQUFRLGFBQWE7Ozs7O0lBMkQ5QyxZQUFzQixPQUFtQixFQUFTLEdBQWdCO1FBRTlELEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUZPLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFhOzs7OztvQkFuRG5ELFFBQVE7Ozs7cUJBYUYsU0FBUzs7OztvQkFPWCxRQUFROzs7O3NCQWtCQyxJQUFJLFlBQVksRUFBRTs7UUFrQjFDLElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQXFCLENBQUM7O1FBR3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0tBQ3pCOzs7O0lBRUQsUUFBUTtRQUVKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7UUFFakIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7O2dCQUkzQixJQUFJLENBQUMsV0FBVyxHQUFHLG1CQUFtQixDQUFDO2FBQzFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLFdBQVcsR0FBRyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUNoRDtTQUNKOztRQUdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRVosTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLEtBQUssT0FBTztvQkFDUixJQUFJLENBQUMsV0FBVyxJQUFJLFNBQVMsQ0FBQztvQkFDOUIsS0FBSyxDQUFDO2dCQUNWLEtBQUssUUFBUTtvQkFDVCxJQUFJLENBQUMsV0FBVyxJQUFJLFVBQVUsQ0FBQztvQkFDL0IsS0FBSyxDQUFDO2dCQUNWLEtBQUssT0FBTztvQkFDUixJQUFJLENBQUMsV0FBVyxJQUFJLFNBQVMsQ0FBQztvQkFDOUIsS0FBSyxDQUFDO2FBQ2I7U0FDSjtLQUNKOzs7Ozs7Ozs7Ozs7O0lBY0QsZUFBZTtRQUVYLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUMxQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7O1lBQ2hFLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtpQkFDekUsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXBELE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDeEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNuQztLQUNKOzs7Ozs7SUFLRCxPQUFPLENBQUMsTUFBVztRQUVmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQy9EOzs7WUEzSUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxXQUFXO2dCQUNyQiw0UEFBb0M7O2FBRXZDOzs7O1lBN0NpQyxVQUFVO1lBQ3BDLFdBQVc7OzttQkFvRGQsS0FBSzttQkFNTCxLQUFLO29CQU9MLEtBQUs7bUJBT0wsS0FBSztxQkFNTCxLQUFLO29CQU1MLEtBQUs7cUJBTUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcblxuLyoqXG4gKiBCdXR0b24gY29tcG9uZW50IHRoYXQgaW1wbGVtZW50cyBjb25zaXN0ZW50IHN0eWxpbmcsIGJlaGF2aW9yLiBCdXR0b24gY2FuIGJlIHJlbmRlcmVkIGVpdGhlciBhc1xuICogYSBidXR0b24gb3IgYXMgYSBsaW5rLiBJdCBjb3VsZCBiZSBzdGFuZGFsb25lIG9yIGJlIHBhcnQgb2YgYSBmb3JtLlxuICpcbiAqICAjIyMgRXhhbXBsZVxuICogIGBgYFxuICpcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yOiAncmVnaXN0cmF0aW9uJyAsXG4gKiAgICB0ZW1wbGF0ZTogYFxuICpcbiAqICAgPGF3LWZvcm0tdGFibGUgPlxuICogICAgICAgPGF3LWZvcm0tcm93IFtsYWJlbF09XCInQW1vdW50J1wiIFtuYW1lXT1cIidhbW91bnQnXCIgW3NpemVdPVwiJ3NtYWxsJ1wiPlxuICpcbiAqICAgICAgICAgICA8YXctYnV0dG9uIFt0eXBlXT1cIidzdWJtaXQnXCIgW25hbWVdPVwiJ2J1dHRvbidcIlxuICogICAgICAgICAgICAgICAgICAgICAoYWN0aW9uKT1cIm9uQ2xpY2tlZCgkZXZlbnQpXCIgW3ZhbHVlXT1cImNvbW1hbmRcIlxuICogICAgICAgICAgICAgICAgICAgICBbc3R5bGVdPVwiJ3dhcm5pbmcnXCIgPkJ1dHRvbjwvYXctYnV0dG9uPlxuICogICAgICAgPC9hdy1mb3JtLXJvdz5cbiAqICAgPC9hdy1mb3JtLXRhYmxlPlxuICpcbiAqICAgIGBcbiAqICAgIH0pXG4gKiAgICBleHBvcnQgY2xhc3MgTXlDb21wb25lbnRcbiAqICAgIHtcbiAqICAgICAgICBjb21tYW5kOmJvb2xlYW47XG4gKlxuICogICAgICAgIGNvbnN0cnVjdG9yICgpXG4gKiAgICAgICAge1xuICogICAgICAgIH1cbiAqXG4gKiAgICAgICAgb25DbGlja2VkKHZhbHVlOnN0cmluZykge1xuICogICAgICAgICAgIGlmICh2YWx1ZSkge1xuICogICAgICAgICAgICAgIC8vIHN1Ym1pdCBmb3JtLlxuICogICAgICAgICAgIH1cbiAqICAgICAgICB9XG4gKiAgICB9XG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctYnV0dG9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2J1dHRvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2J1dHRvbi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0XG57XG5cbiAgICAvKipcbiAgICAgKiBCdXR0b24gdHlwZXMgIFsgYnV0dG9uIHwgc3VibWl0IHwgcmVzZXQgXVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0eXBlOiBzdHJpbmcgPSAnYnV0dG9uJztcblxuICAgIC8qKlxuICAgICAqIE5hbWUgZm9yIHRoaXMgYnV0dG9uLiBDYW4gYmUgdXNlZCB0byBsb29rdXAgY29tcG9uZW50IGluIGZvcm0uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBuYW1lOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIHN0eWxpbmcgZm9yIHRoaXMgYnV0dG9uLiBTZWUgQnV0dG9uU3R5bGUgZm9yIGFsbCBzdXBwb3J0ZWQgc3R5bGVzLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc3R5bGU6IEJ1dHRvblN0eWxlID0gJ3ByaW1hcnknO1xuXG5cbiAgICAvKipcbiAgICAgKiBzaXppbmcgZm9yIHRoaXMgYnV0dG9uLiBbbGFyZ2UsIG5vcm1hbCwgc21hbGxdLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2l6ZTogQnV0dG9uU2l6ZSA9ICdub3JtYWwnO1xuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgdGFyZ2V0IG9mIHRoZSBidXR0b24uIFtfYmxhbmsgfCBfc2VsZiB8IF9wYXJlbnQgfCBfdG9wIHwgZnJhbWVuYW1lIF1cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHRhcmdldDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVmFsdWUgdG8gYmUgc2VuZCB0byBzZXJ2ZXIgd2hlbiBjbGlja2VkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdmFsdWU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGZpcmVkIHdoZW4gdXNlciBzZWxlY3QgYSBpdGVtXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgYWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gICAgLyoqXG4gICAgICogUHJpbWVOZyBidXR0b24gc2ltcGx5IGRvZXMgbm90IHN1cHBvcnQgY29udGVudCBzbyB3ZSBuZWVkIHRvIGdldCBhcm91bmQgaXRcbiAgICAgKi9cbiAgICBsYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgQ1NTIGNsYXNzIHRoYXQgc3R5bGVzIHRoaXMgYnV0dG9uIGJhc2VkIG9uIGlucHV0ICdzdHlsZScgYW5kICdzaXplJ1xuICAgICAqL1xuICAgIGJ1dHRvbkNsYXNzOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuXG4gICAgICAgIC8vIERlZmF1bHQgYnV0dG9uIGNsYXNzIGlzIHNlY29uZGFyeS5cbiAgICAgICAgdGhpcy5idXR0b25DbGFzcyA9ICd1aS1idXR0b24tc2Vjb25kYXJ5JztcblxuICAgICAgICAvLyBEZWZhdWx0IGRpc2FibGVkXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICAvLyBIb3cgdG8gc3R5bGUgdGhpcyBidXR0b24uXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5zdHlsZSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0eWxlID09PSAncHJpbWFyeScpIHtcbiAgICAgICAgICAgICAgICAvLyBEZWZhdWx0IC51aS1idXR0b24gYW5kIC51aS1idXR0b24tcHJpbWFyeSBnZXQgdGhlIHNhbWUgc3R5bGUuXG4gICAgICAgICAgICAgICAgLy8gLnVpLWJ1dHRvbi1wcmltYXJ5IGlzIG5lY2Vzc2FyeSBiZWNhdXNlIGJ1dHRvbiBzdHlsZSBjYW4gYmUgb3ZlcnJpZGRlblxuICAgICAgICAgICAgICAgIC8vIHdoZW4gaW5jbHVkZWQgaW5zaWRlIG90aGVyIHdpZGdldHMuIFNvIHNwZWNpZnkgcHJpbWFyeVxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uQ2xhc3MgPSAndWktYnV0dG9uLXByaW1hcnknO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbkNsYXNzID0gJ3VpLWJ1dHRvbi0nICsgdGhpcy5zdHlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgYnV0dG9uIGNsYXNzIGJhc2VkIG9uIGlucHV0IHNpemUuXG4gICAgICAgIGlmICh0aGlzLnNpemUpIHtcblxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnNpemUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdsYXJnZScgOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbkNsYXNzICs9ICcgYnRuLWxnJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbm9ybWFsJyA6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uQ2xhc3MgKz0gJyBidG4tbWlkJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc21hbGwnIDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25DbGFzcyArPSAnIGJ0bi1zbSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIGxpdHRsZSBoYWNreSBoYWNraXR5IGhhY2sgYXMgY3VycmVudGx5IHByaW1lbmcgYnV0dG9uIGRpcmVjdGl2ZSBkb2VzIG5vdCB3b3JrIHdpdGhcbiAgICAgKiBuZ2NvbnRlbnQgcHJvamVjdGlvbiBidXQgaXQgaGFzIGEgbGFiZWwgYmluZGluZ3MsIHdoaWNoIGlzIG5vdCB0aGUgd2F5IGRldmVsb3BlcnMgd29yayB3aXRoXG4gICAgICogYnV0dG9uLiB5b3Ugd2FudCB0b1xuICAgICAqXG4gICAgICogPGJ1dHRvbj4gTVkgQ09OVEVOVDwvYnV0dG9uIGluc3RlYWQgb2YgPGJ1dHRvbiBsYWJlbD0nTXlDb250ZW50Jz48L2J1dHRvbj5cbiAgICAgKlxuICAgICAqXG4gICAgICogQFRvZG86IENoYW5nZSB0aGlzIHVudGlsIHRoZSB0aW1lIGtlZXAgYSB0ZXN0IHRoYXQgY2hlY2sgdGhhdCB0aGV5IGFyZSBzdGlsbCB1c2luZyB1aS1idXR0b25cbiAgICAgKiAgICAgdGhhdCB3ZSBhcmUgZXhwZWN0aW5nIGFuZCByZXBsYWNpbmdcbiAgICAgKi9cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICBsZXQgYnV0dG9uID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XG4gICAgICAgICAgICBsZXQgYnV0dG9uVGl0bGUgPSBidXR0b24uY2hpbGRyZW5bMF07XG4gICAgICAgICAgICBidXR0b24uY2hpbGRyZW5bMF0udGV4dENvbnRlbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudC50cmltKClcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgndWktYnV0dG9uJywgJycpLnJlcGxhY2UoJ3VpLWJ0bicsICcnKTtcblxuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLWJ1dHRvbi10ZXh0LWVtcHR5Jyk7XG4gICAgICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChidXR0b25UaXRsZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgQWN0aW9uIGNsaWNrZWQuIENhbGwgcGFyZW50IGFjdGlvbi5cbiAgICAgKi9cbiAgICBjbGlja2VkKCRldmVudDogYW55KVxuICAgIHtcbiAgICAgICAgdGhpcy5hY3Rpb24uZW1pdChpc0JsYW5rKHRoaXMudmFsdWUpID8gJGV2ZW50IDogdGhpcy52YWx1ZSk7XG4gICAgfVxufVxuXG5cbi8qKlxuICogU3VwcG9ydGVkIEJ1dHRvbiBTdHlsZVxuICovXG5leHBvcnQgdHlwZSBCdXR0b25TdHlsZSA9ICdpbmZvJyB8ICdwcmltYXJ5JyB8ICdzZWNvbmRhcnknIHwgJ3dhcm5pbmcnIHwgJ3N1Y2Nlc3MnIHwgJ2RhbmdlcicgfFxuICAgICdsaW5rJztcblxuLyoqXG4gKiBTdXBwb3J0ZWQgQnV0dG9uIFNpemVcbiAqL1xuZXhwb3J0IHR5cGUgQnV0dG9uU2l6ZSA9ICdsYXJnZScgfCAnbm9ybWFsJyB8ICdzbWFsbCc7XG4iXX0=