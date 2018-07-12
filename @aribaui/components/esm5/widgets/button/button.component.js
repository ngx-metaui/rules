/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var ButtonComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonComponent, _super);
    function ButtonComponent(element, env) {
        var _this = _super.call(this, env) || this;
        _this.element = element;
        _this.env = env;
        /**
         * Button types  [ button | submit | reset ]
         *
         */
        _this.type = 'button';
        /**
         * styling for this button. See ButtonStyle for all supported styles.
         */
        _this.style = 'primary';
        /**
         * sizing for this button. [large, normal, small].
         */
        _this.size = 'normal';
        /**
         * Event fired when user select a item
         */
        _this.action = new EventEmitter();
        // Default button class is secondary.
        // Default button class is secondary.
        _this.buttonClass = 'ui-button-secondary';
        // Default disabled
        // Default disabled
        _this.disabled = false;
        return _this;
    }
    /**
     * @return {?}
     */
    ButtonComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
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
    };
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
    ButtonComponent.prototype.ngAfterViewInit = /**
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
    function () {
        if (isPresent(this.element)) {
            var /** @type {?} */ button = this.element.nativeElement.querySelector('button');
            var /** @type {?} */ buttonTitle = button.children[0];
            button.children[0].textContent = this.element.nativeElement.textContent.trim()
                .replace('ui-button', '').replace('ui-btn', '');
            button.classList.remove('ui-button-text-empty');
            button.textContent = '';
            button.appendChild(buttonTitle);
        }
    };
    /**
     *  Action clicked. Call parent action.
     */
    /**
     *  Action clicked. Call parent action.
     * @param {?} $event
     * @return {?}
     */
    ButtonComponent.prototype.clicked = /**
     *  Action clicked. Call parent action.
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.action.emit(isBlank(this.value) ? $event : this.value);
    };
    ButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-button',
                    template: "<button\n    pButton\n    [attr.type]=\"type\"\n    [attr.name]=\"name\"\n    [ngClass]=\"buttonClass\"\n    [disabled]=\"disabled\"\n    [attr.value]=\"value\"\n    (click)=\"clicked($event)\">\n\n    <ng-content></ng-content>\n</button>\n",
                    styles: [".ui-button-link{color:#337ab7;font-weight:400;border-radius:0;background-color:transparent}.ui-button-link,.ui-button-link.active,.ui-button-link:active,.ui-button-link:focus,.ui-button-link:hover,.ui-button-link[disabled]{border-color:transparent}.ui-button-link:focus,.ui-button-link:hover{color:#337ab7;-webkit-text-decoration:#337ab7;text-decoration:#337ab7;background-color:transparent}.ui-button-link[disabled]:focus,.ui-button-link[disabled]:hover{color:#2399e5;text-decoration:none}.ui-button{margin-right:5px}.btn-mid{height:36px;padding:5px 10px}.btn-lg{height:42px;font-size:16px;padding:5px 12px}.btn-sm{height:30px;font-size:12px;padding:5px 10px}"]
                },] },
    ];
    /** @nocollapse */
    ButtonComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Environment }
    ]; };
    ButtonComponent.propDecorators = {
        type: [{ type: Input }],
        name: [{ type: Input }],
        style: [{ type: Input }],
        size: [{ type: Input }],
        target: [{ type: Input }],
        value: [{ type: Input }],
        action: [{ type: Output }]
    };
    return ButtonComponent;
}(BaseComponent));
export { ButtonComponent };
function ButtonComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2J1dHRvbi9idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF1RG5CLDJDQUFhO0lBMkQ5Qyx5QkFBc0IsT0FBbUIsRUFBUyxHQUFnQjtRQUFsRSxZQUVJLGtCQUFNLEdBQUcsQ0FBQyxTQU9iO1FBVHFCLGFBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxTQUFHLEdBQUgsR0FBRyxDQUFhOzs7OztxQkFuRG5ELFFBQVE7Ozs7c0JBYUYsU0FBUzs7OztxQkFPWCxRQUFROzs7O3VCQWtCQyxJQUFJLFlBQVksRUFBRTs7UUFrQjFDLEFBREEscUNBQXFDO1FBQ3JDLEtBQUksQ0FBQyxXQUFXLEdBQUcscUJBQXFCLENBQUM7O1FBR3pDLEFBREEsbUJBQW1CO1FBQ25CLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDOztLQUN6Qjs7OztJQUVELGtDQUFROzs7SUFBUjtRQUVJLGlCQUFNLFFBQVEsV0FBRSxDQUFDOztRQUVqQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7Z0JBSTNCLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLENBQUM7YUFDMUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ2hEO1NBQ0o7O1FBR0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFWixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsS0FBSyxPQUFPO29CQUNSLElBQUksQ0FBQyxXQUFXLElBQUksU0FBUyxDQUFDO29CQUM5QixLQUFLLENBQUM7Z0JBQ1YsS0FBSyxRQUFRO29CQUNULElBQUksQ0FBQyxXQUFXLElBQUksVUFBVSxDQUFDO29CQUMvQixLQUFLLENBQUM7Z0JBQ1YsS0FBSyxPQUFPO29CQUNSLElBQUksQ0FBQyxXQUFXLElBQUksU0FBUyxDQUFDO29CQUM5QixLQUFLLENBQUM7YUFDYjtTQUNKO0tBQ0o7SUFHRDs7Ozs7Ozs7OztPQVVHOzs7Ozs7Ozs7Ozs7O0lBQ0gseUNBQWU7Ozs7Ozs7Ozs7OztJQUFmO1FBRUksRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIscUJBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRSxxQkFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO2lCQUN6RSxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFcEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUN4QixNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ25DO0tBQ0o7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsaUNBQU87Ozs7O0lBQVAsVUFBUSxNQUFXO1FBRWYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDL0Q7O2dCQXRKSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRSxrUEFXYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQyxzcEJBQXNwQixDQUFDO2lCQUNucUI7Ozs7Z0JBeERpQyxVQUFVO2dCQUNwQyxXQUFXOzs7dUJBK0RkLEtBQUs7dUJBTUwsS0FBSzt3QkFPTCxLQUFLO3VCQU9MLEtBQUs7eUJBTUwsS0FBSzt3QkFNTCxLQUFLO3lCQU1MLE1BQU07OzBCQTFIWDtFQTZFcUMsYUFBYTtTQUFyQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0FmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuXG4vKipcbiAqIEJ1dHRvbiBjb21wb25lbnQgdGhhdCBpbXBsZW1lbnRzIGNvbnNpc3RlbnQgc3R5bGluZywgYmVoYXZpb3IuIEJ1dHRvbiBjYW4gYmUgcmVuZGVyZWQgZWl0aGVyIGFzXG4gKiBhIGJ1dHRvbiBvciBhcyBhIGxpbmsuIEl0IGNvdWxkIGJlIHN0YW5kYWxvbmUgb3IgYmUgcGFydCBvZiBhIGZvcm0uXG4gKlxuICogICMjIyBFeGFtcGxlXG4gKiAgYGBgXG4gKlxuICogIEBDb21wb25lbnQoe1xuICogICAgc2VsZWN0b3I6ICdyZWdpc3RyYXRpb24nICxcbiAqICAgIHRlbXBsYXRlOiBgXG4gKlxuICogICA8YXctZm9ybS10YWJsZSA+XG4gKiAgICAgICA8YXctZm9ybS1yb3cgW2xhYmVsXT1cIidBbW91bnQnXCIgW25hbWVdPVwiJ2Ftb3VudCdcIiBbc2l6ZV09XCInc21hbGwnXCI+XG4gKlxuICogICAgICAgICAgIDxhdy1idXR0b24gW3R5cGVdPVwiJ3N1Ym1pdCdcIiBbbmFtZV09XCInYnV0dG9uJ1wiXG4gKiAgICAgICAgICAgICAgICAgICAgIChhY3Rpb24pPVwib25DbGlja2VkKCRldmVudClcIiBbdmFsdWVdPVwiY29tbWFuZFwiXG4gKiAgICAgICAgICAgICAgICAgICAgIFtzdHlsZV09XCInd2FybmluZydcIiA+QnV0dG9uPC9hdy1idXR0b24+XG4gKiAgICAgICA8L2F3LWZvcm0tcm93PlxuICogICA8L2F3LWZvcm0tdGFibGU+XG4gKlxuICogICAgYFxuICogICAgfSlcbiAqICAgIGV4cG9ydCBjbGFzcyBNeUNvbXBvbmVudFxuICogICAge1xuICogICAgICAgIGNvbW1hbmQ6Ym9vbGVhbjtcbiAqXG4gKiAgICAgICAgY29uc3RydWN0b3IgKClcbiAqICAgICAgICB7XG4gKiAgICAgICAgfVxuICpcbiAqICAgICAgICBvbkNsaWNrZWQodmFsdWU6c3RyaW5nKSB7XG4gKiAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gKiAgICAgICAgICAgICAgLy8gc3VibWl0IGZvcm0uXG4gKiAgICAgICAgICAgfVxuICogICAgICAgIH1cbiAqICAgIH1cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1idXR0b24nLFxuICAgIHRlbXBsYXRlOiBgPGJ1dHRvblxuICAgIHBCdXR0b25cbiAgICBbYXR0ci50eXBlXT1cInR5cGVcIlxuICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgW25nQ2xhc3NdPVwiYnV0dG9uQ2xhc3NcIlxuICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgW2F0dHIudmFsdWVdPVwidmFsdWVcIlxuICAgIChjbGljayk9XCJjbGlja2VkKCRldmVudClcIj5cblxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvYnV0dG9uPlxuYCxcbiAgICBzdHlsZXM6IFtgLnVpLWJ1dHRvbi1saW5re2NvbG9yOiMzMzdhYjc7Zm9udC13ZWlnaHQ6NDAwO2JvcmRlci1yYWRpdXM6MDtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fS51aS1idXR0b24tbGluaywudWktYnV0dG9uLWxpbmsuYWN0aXZlLC51aS1idXR0b24tbGluazphY3RpdmUsLnVpLWJ1dHRvbi1saW5rOmZvY3VzLC51aS1idXR0b24tbGluazpob3ZlciwudWktYnV0dG9uLWxpbmtbZGlzYWJsZWRde2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudH0udWktYnV0dG9uLWxpbms6Zm9jdXMsLnVpLWJ1dHRvbi1saW5rOmhvdmVye2NvbG9yOiMzMzdhYjc7LXdlYmtpdC10ZXh0LWRlY29yYXRpb246IzMzN2FiNzt0ZXh0LWRlY29yYXRpb246IzMzN2FiNztiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fS51aS1idXR0b24tbGlua1tkaXNhYmxlZF06Zm9jdXMsLnVpLWJ1dHRvbi1saW5rW2Rpc2FibGVkXTpob3Zlcntjb2xvcjojMjM5OWU1O3RleHQtZGVjb3JhdGlvbjpub25lfS51aS1idXR0b257bWFyZ2luLXJpZ2h0OjVweH0uYnRuLW1pZHtoZWlnaHQ6MzZweDtwYWRkaW5nOjVweCAxMHB4fS5idG4tbGd7aGVpZ2h0OjQycHg7Zm9udC1zaXplOjE2cHg7cGFkZGluZzo1cHggMTJweH0uYnRuLXNte2hlaWdodDozMHB4O2ZvbnQtc2l6ZToxMnB4O3BhZGRpbmc6NXB4IDEwcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXRcbntcblxuICAgIC8qKlxuICAgICAqIEJ1dHRvbiB0eXBlcyAgWyBidXR0b24gfCBzdWJtaXQgfCByZXNldCBdXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHR5cGU6IHN0cmluZyA9ICdidXR0b24nO1xuXG4gICAgLyoqXG4gICAgICogTmFtZSBmb3IgdGhpcyBidXR0b24uIENhbiBiZSB1c2VkIHRvIGxvb2t1cCBjb21wb25lbnQgaW4gZm9ybS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG5hbWU6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogc3R5bGluZyBmb3IgdGhpcyBidXR0b24uIFNlZSBCdXR0b25TdHlsZSBmb3IgYWxsIHN1cHBvcnRlZCBzdHlsZXMuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzdHlsZTogQnV0dG9uU3R5bGUgPSAncHJpbWFyeSc7XG5cblxuICAgIC8qKlxuICAgICAqIHNpemluZyBmb3IgdGhpcyBidXR0b24uIFtsYXJnZSwgbm9ybWFsLCBzbWFsbF0uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaXplOiBCdXR0b25TaXplID0gJ25vcm1hbCc7XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHRoZSB0YXJnZXQgb2YgdGhlIGJ1dHRvbi4gW19ibGFuayB8IF9zZWxmIHwgX3BhcmVudCB8IF90b3AgfCBmcmFtZW5hbWUgXVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdGFyZ2V0OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBWYWx1ZSB0byBiZSBzZW5kIHRvIHNlcnZlciB3aGVuIGNsaWNrZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB2YWx1ZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgZmlyZWQgd2hlbiB1c2VyIHNlbGVjdCBhIGl0ZW1cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBhY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBQcmltZU5nIGJ1dHRvbiBzaW1wbHkgZG9lcyBub3Qgc3VwcG9ydCBjb250ZW50IHNvIHdlIG5lZWQgdG8gZ2V0IGFyb3VuZCBpdFxuICAgICAqL1xuICAgIGxhYmVsOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBDU1MgY2xhc3MgdGhhdCBzdHlsZXMgdGhpcyBidXR0b24gYmFzZWQgb24gaW5wdXQgJ3N0eWxlJyBhbmQgJ3NpemUnXG4gICAgICovXG4gICAgYnV0dG9uQ2xhc3M6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG5cbiAgICAgICAgLy8gRGVmYXVsdCBidXR0b24gY2xhc3MgaXMgc2Vjb25kYXJ5LlxuICAgICAgICB0aGlzLmJ1dHRvbkNsYXNzID0gJ3VpLWJ1dHRvbi1zZWNvbmRhcnknO1xuXG4gICAgICAgIC8vIERlZmF1bHQgZGlzYWJsZWRcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgICAgIC8vIEhvdyB0byBzdHlsZSB0aGlzIGJ1dHRvbi5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnN0eWxlKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3R5bGUgPT09ICdwcmltYXJ5Jykge1xuICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgLnVpLWJ1dHRvbiBhbmQgLnVpLWJ1dHRvbi1wcmltYXJ5IGdldCB0aGUgc2FtZSBzdHlsZS5cbiAgICAgICAgICAgICAgICAvLyAudWktYnV0dG9uLXByaW1hcnkgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgYnV0dG9uIHN0eWxlIGNhbiBiZSBvdmVycmlkZGVuXG4gICAgICAgICAgICAgICAgLy8gd2hlbiBpbmNsdWRlZCBpbnNpZGUgb3RoZXIgd2lkZ2V0cy4gU28gc3BlY2lmeSBwcmltYXJ5XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25DbGFzcyA9ICd1aS1idXR0b24tcHJpbWFyeSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uQ2xhc3MgPSAndWktYnV0dG9uLScgKyB0aGlzLnN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBidXR0b24gY2xhc3MgYmFzZWQgb24gaW5wdXQgc2l6ZS5cbiAgICAgICAgaWYgKHRoaXMuc2l6ZSkge1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuc2l6ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xhcmdlJyA6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uQ2xhc3MgKz0gJyBidG4tbGcnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdub3JtYWwnIDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25DbGFzcyArPSAnIGJ0bi1taWQnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzbWFsbCcgOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbkNsYXNzICs9ICcgYnRuLXNtJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgbGl0dGxlIGhhY2t5IGhhY2tpdHkgaGFjayBhcyBjdXJyZW50bHkgcHJpbWVuZyBidXR0b24gZGlyZWN0aXZlIGRvZXMgbm90IHdvcmsgd2l0aFxuICAgICAqIG5nY29udGVudCBwcm9qZWN0aW9uIGJ1dCBpdCBoYXMgYSBsYWJlbCBiaW5kaW5ncywgd2hpY2ggaXMgbm90IHRoZSB3YXkgZGV2ZWxvcGVycyB3b3JrIHdpdGhcbiAgICAgKiBidXR0b24uIHlvdSB3YW50IHRvXG4gICAgICpcbiAgICAgKiA8YnV0dG9uPiBNWSBDT05URU5UPC9idXR0b24gaW5zdGVhZCBvZiA8YnV0dG9uIGxhYmVsPSdNeUNvbnRlbnQnPjwvYnV0dG9uPlxuICAgICAqXG4gICAgICpcbiAgICAgKiBAVG9kbzogQ2hhbmdlIHRoaXMgdW50aWwgdGhlIHRpbWUga2VlcCBhIHRlc3QgdGhhdCBjaGVjayB0aGF0IHRoZXkgYXJlIHN0aWxsIHVzaW5nIHVpLWJ1dHRvblxuICAgICAqICAgICB0aGF0IHdlIGFyZSBleHBlY3RpbmcgYW5kIHJlcGxhY2luZ1xuICAgICAqL1xuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZWxlbWVudCkpIHtcbiAgICAgICAgICAgIGxldCBidXR0b24gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgICAgICAgICAgIGxldCBidXR0b25UaXRsZSA9IGJ1dHRvbi5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIGJ1dHRvbi5jaGlsZHJlblswXS50ZXh0Q29udGVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50LnRyaW0oKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd1aS1idXR0b24nLCAnJykucmVwbGFjZSgndWktYnRuJywgJycpO1xuXG4gICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgndWktYnV0dG9uLXRleHQtZW1wdHknKTtcbiAgICAgICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKGJ1dHRvblRpdGxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBBY3Rpb24gY2xpY2tlZC4gQ2FsbCBwYXJlbnQgYWN0aW9uLlxuICAgICAqL1xuICAgIGNsaWNrZWQoJGV2ZW50OiBhbnkpXG4gICAge1xuICAgICAgICB0aGlzLmFjdGlvbi5lbWl0KGlzQmxhbmsodGhpcy52YWx1ZSkgPyAkZXZlbnQgOiB0aGlzLnZhbHVlKTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBTdXBwb3J0ZWQgQnV0dG9uIFN0eWxlXG4gKi9cbmV4cG9ydCB0eXBlIEJ1dHRvblN0eWxlID0gJ2luZm8nIHwgJ3ByaW1hcnknIHwgJ3NlY29uZGFyeScgfCAnd2FybmluZycgfCAnc3VjY2VzcycgfCAnZGFuZ2VyJyB8XG4gICAgJ2xpbmsnO1xuXG4vKipcbiAqIFN1cHBvcnRlZCBCdXR0b24gU2l6ZVxuICovXG5leHBvcnQgdHlwZSBCdXR0b25TaXplID0gJ2xhcmdlJyB8ICdub3JtYWwnIHwgJ3NtYWxsJztcbiJdfQ==