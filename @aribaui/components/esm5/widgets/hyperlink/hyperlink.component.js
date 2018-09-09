/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from '../../core/base.component';
import { Environment } from '@aribaui/core';
/**
 * Hyperlink component that implements consistent styling, behavior. Hyperlink supports all of the
 * native link functionality. In addition, it supports navigation to components through the action
 * binding.
 *
 *
 * for more info please see class Doc of the:
 * @see {\@link button/button.component.ts}
 *
 *  ### Example
 *  ```
 *
 * \@Component({
 *    selector: 'registration' ,
 *    template: `
 *
 *           <aw-hyperlink  [type]="'text/html'" [name]="'link'"
 *                        (action)="onClicked($event)" [value]="customerId"
 *                        [size]="'large'" >my link</aw-hyperlink>
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
 *        onClicked(customerId:string) {
 *           if (customerId) {
 *              // display customer details component.
 *           }
 *        }
 *    }
 */
var HyperlinkComponent = /** @class */ (function (_super) {
    tslib_1.__extends(HyperlinkComponent, _super);
    function HyperlinkComponent(env) {
        var _this = _super.call(this, env) || this;
        _this.env = env;
        /**
         * sizing for this link. [large, normal, small].
         */
        _this.size = 'normal';
        /**
         * Event fired when user select a item
         */
        _this.action = new EventEmitter();
        /**
         * Internal CSS class that styles this hyperlink based on input 'size'
         */
        _this.linkClass = 'link';
        return _this;
    }
    /**
     * @return {?}
     */
    HyperlinkComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        // Determine the link class based on input size.
        if (this.size) {
            switch (this.size) {
                case 'large':
                    this.linkClass += ' link-lg';
                    break;
                case 'normal':
                    this.linkClass += ' link-mid';
                    break;
                case 'small':
                    this.linkClass += ' link-sm';
                    break;
            }
        }
        // If I have an action tag, and no href. We add default styling and behavior.
        if (this.action.observers.length > 0) {
            this.linkClass += ' link-bh';
        }
    };
    /**
     *  Action clicked. Call parent action.
     */
    /**
     *  Action clicked. Call parent action.
     * @param {?} event
     * @return {?}
     */
    HyperlinkComponent.prototype.clicked = /**
     *  Action clicked. Call parent action.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.action.emit({
            event: event,
            value: this.value
        });
    };
    HyperlinkComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-hyperlink',
                    template: "<a [attr.type]=\"type\"\n   [attr.href]=\"href\"\n   [attr.rel]=\"rel\"\n   [attr.target]=\"target\"\n   [ngClass]=\"linkClass\"\n   [class.disabled]=\"disabled\"\n   (click)=\"clicked($event)\">\n\n    <ng-content></ng-content>\n</a>\n",
                    styles: [".link{color:#0275d8;cursor:pointer}.link.link-bh{color:#0275d8}.link.link-bh:hover{text-decoration:underline;cursor:pointer}.link-sm{font-size:.875em}.link-mid{font-size:1em}.link-lg{font-size:1.25em}.link.disabled{pointer-events:none;cursor:default;color:#ddd}"]
                }] }
    ];
    /** @nocollapse */
    HyperlinkComponent.ctorParameters = function () { return [
        { type: Environment }
    ]; };
    HyperlinkComponent.propDecorators = {
        type: [{ type: Input }],
        href: [{ type: Input }],
        rel: [{ type: Input }],
        size: [{ type: Input }],
        target: [{ type: Input }],
        value: [{ type: Input }],
        action: [{ type: Output }]
    };
    return HyperlinkComponent;
}(BaseComponent));
export { HyperlinkComponent };
if (false) {
    /**
     *    Specifies the media type of the linked document. Mime type
     *    ex: [text/html | text/csv | image/png | audio/3gpp | ....]
     * @type {?}
     */
    HyperlinkComponent.prototype.type;
    /**
     * url for this hyperlink. Can be used to navigate to a component.
     * @type {?}
     */
    HyperlinkComponent.prototype.href;
    /**
     * rel for this hyperlink. Specify the relationship of the current document and linked document
     * @type {?}
     */
    HyperlinkComponent.prototype.rel;
    /**
     * sizing for this link. [large, normal, small].
     * @type {?}
     */
    HyperlinkComponent.prototype.size;
    /**
     * Specify the target of the hyperlink. [_blank | _self | _parent | _top | framename ]
     * @type {?}
     */
    HyperlinkComponent.prototype.target;
    /**
     * Value to be send to server when clicked.
     * @type {?}
     */
    HyperlinkComponent.prototype.value;
    /**
     * Event fired when user select a item
     * @type {?}
     */
    HyperlinkComponent.prototype.action;
    /**
     * Internal CSS class that styles this hyperlink based on input 'size'
     * @type {?}
     */
    HyperlinkComponent.prototype.linkClass;
    /** @type {?} */
    HyperlinkComponent.prototype.env;
}
/** @typedef {?} */
var LinkSize;
export { LinkSize };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwZXJsaW5rLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2h5cGVybGluay9oeXBlcmxpbmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTRDRiw4Q0FBYTtJQW9EakQsNEJBQW1CLEdBQWdCO1FBQW5DLFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBRWI7UUFKa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTs7OztxQkF6QmxCLFFBQVE7Ozs7dUJBa0JHLElBQUksWUFBWSxFQUFFOzs7OzBCQUsxQixNQUFNOztLQU16Qjs7OztJQUVELHFDQUFROzs7SUFBUjtRQUVJLGlCQUFNLFFBQVEsV0FBRSxDQUFDOztRQUdqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNaLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixLQUFLLE9BQU87b0JBQ1IsSUFBSSxDQUFDLFNBQVMsSUFBSSxVQUFVLENBQUM7b0JBQzdCLEtBQUssQ0FBQztnQkFDVixLQUFLLFFBQVE7b0JBQ1QsSUFBSSxDQUFDLFNBQVMsSUFBSSxXQUFXLENBQUM7b0JBQzlCLEtBQUssQ0FBQztnQkFDVixLQUFLLE9BQU87b0JBQ1IsSUFBSSxDQUFDLFNBQVMsSUFBSSxVQUFVLENBQUM7b0JBQzdCLEtBQUssQ0FBQzthQUNiO1NBQ0o7O1FBR0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFNBQVMsSUFBSSxVQUFVLENBQUM7U0FDaEM7S0FFSjtJQUVEOztPQUVHOzs7Ozs7SUFDSCxvQ0FBTzs7Ozs7SUFBUCxVQUFRLEtBQVU7UUFFZCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNiLEtBQUssRUFBRSxLQUFLO1lBQ1osS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ3BCLENBQUMsQ0FBQztLQUNOOztnQkFsR0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxjQUFjO29CQUN4Qix3UEFBdUM7O2lCQUUxQzs7OztnQkEzQ08sV0FBVzs7O3VCQW1EZCxLQUFLO3VCQU1MLEtBQUs7c0JBTUwsS0FBSzt1QkFPTCxLQUFLO3lCQU1MLEtBQUs7d0JBTUwsS0FBSzt5QkFNTCxNQUFNOzs2QkE5R1g7RUFrRXdDLGFBQWE7U0FBeEMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQge0Vudmlyb25tZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcblxuLyoqXG4gKiBIeXBlcmxpbmsgY29tcG9uZW50IHRoYXQgaW1wbGVtZW50cyBjb25zaXN0ZW50IHN0eWxpbmcsIGJlaGF2aW9yLiBIeXBlcmxpbmsgc3VwcG9ydHMgYWxsIG9mIHRoZVxuICogbmF0aXZlIGxpbmsgZnVuY3Rpb25hbGl0eS4gSW4gYWRkaXRpb24sIGl0IHN1cHBvcnRzIG5hdmlnYXRpb24gdG8gY29tcG9uZW50cyB0aHJvdWdoIHRoZSBhY3Rpb25cbiAqIGJpbmRpbmcuXG4gKlxuICpcbiAqIGZvciBtb3JlIGluZm8gcGxlYXNlIHNlZSBjbGFzcyBEb2Mgb2YgdGhlOlxuICogIEBzZWUge0BsaW5rIGJ1dHRvbi9idXR0b24uY29tcG9uZW50LnRzfVxuICpcbiAqICAjIyMgRXhhbXBsZVxuICogIGBgYFxuICpcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yOiAncmVnaXN0cmF0aW9uJyAsXG4gKiAgICB0ZW1wbGF0ZTogYFxuICpcbiAqICAgICAgICAgICA8YXctaHlwZXJsaW5rICBbdHlwZV09XCIndGV4dC9odG1sJ1wiIFtuYW1lXT1cIidsaW5rJ1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIChhY3Rpb24pPVwib25DbGlja2VkKCRldmVudClcIiBbdmFsdWVdPVwiY3VzdG9tZXJJZFwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIFtzaXplXT1cIidsYXJnZSdcIiA+bXkgbGluazwvYXctaHlwZXJsaW5rPlxuICpcbiAqICAgIGBcbiAqICAgIH0pXG4gKiAgICBleHBvcnQgY2xhc3MgTXlDb21wb25lbnRcbiAqICAgIHtcbiAqICAgICAgICBjb21tYW5kOmJvb2xlYW47XG4gKlxuICogICAgICAgIGNvbnN0cnVjdG9yICgpXG4gKiAgICAgICAge1xuICogICAgICAgIH1cbiAqXG4gKiAgICAgICAgb25DbGlja2VkKGN1c3RvbWVySWQ6c3RyaW5nKSB7XG4gKiAgICAgICAgICAgaWYgKGN1c3RvbWVySWQpIHtcbiAqICAgICAgICAgICAgICAvLyBkaXNwbGF5IGN1c3RvbWVyIGRldGFpbHMgY29tcG9uZW50LlxuICogICAgICAgICAgIH1cbiAqICAgICAgICB9XG4gKiAgICB9XG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctaHlwZXJsaW5rJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2h5cGVybGluay5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2h5cGVybGluay5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEh5cGVybGlua0NvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqICAgIFNwZWNpZmllcyB0aGUgbWVkaWEgdHlwZSBvZiB0aGUgbGlua2VkIGRvY3VtZW50LiBNaW1lIHR5cGVcbiAgICAgKiAgICBleDogW3RleHQvaHRtbCB8IHRleHQvY3N2IHwgaW1hZ2UvcG5nIHwgYXVkaW8vM2dwcCB8IC4uLi5dXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0eXBlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiB1cmwgZm9yIHRoaXMgaHlwZXJsaW5rLiBDYW4gYmUgdXNlZCB0byBuYXZpZ2F0ZSB0byBhIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGhyZWY6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIHJlbCBmb3IgdGhpcyBoeXBlcmxpbmsuIFNwZWNpZnkgdGhlIHJlbGF0aW9uc2hpcCBvZiB0aGUgY3VycmVudCBkb2N1bWVudCBhbmQgbGlua2VkIGRvY3VtZW50XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICByZWw6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogc2l6aW5nIGZvciB0aGlzIGxpbmsuIFtsYXJnZSwgbm9ybWFsLCBzbWFsbF0uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaXplOiBMaW5rU2l6ZSA9ICdub3JtYWwnO1xuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgdGFyZ2V0IG9mIHRoZSBoeXBlcmxpbmsuIFtfYmxhbmsgfCBfc2VsZiB8IF9wYXJlbnQgfCBfdG9wIHwgZnJhbWVuYW1lIF1cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHRhcmdldDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVmFsdWUgdG8gYmUgc2VuZCB0byBzZXJ2ZXIgd2hlbiBjbGlja2VkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdmFsdWU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGZpcmVkIHdoZW4gdXNlciBzZWxlY3QgYSBpdGVtXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgYWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIENTUyBjbGFzcyB0aGF0IHN0eWxlcyB0aGlzIGh5cGVybGluayBiYXNlZCBvbiBpbnB1dCAnc2l6ZSdcbiAgICAgKi9cbiAgICBsaW5rQ2xhc3M6IHN0cmluZyA9ICdsaW5rJztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBsaW5rIGNsYXNzIGJhc2VkIG9uIGlucHV0IHNpemUuXG4gICAgICAgIGlmICh0aGlzLnNpemUpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5zaXplKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGFyZ2UnIDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5rQ2xhc3MgKz0gJyBsaW5rLWxnJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbm9ybWFsJyA6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlua0NsYXNzICs9ICcgbGluay1taWQnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzbWFsbCcgOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmtDbGFzcyArPSAnIGxpbmstc20nO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIEkgaGF2ZSBhbiBhY3Rpb24gdGFnLCBhbmQgbm8gaHJlZi4gV2UgYWRkIGRlZmF1bHQgc3R5bGluZyBhbmQgYmVoYXZpb3IuXG4gICAgICAgIGlmICh0aGlzLmFjdGlvbi5vYnNlcnZlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5saW5rQ2xhc3MgKz0gJyBsaW5rLWJoJztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIEFjdGlvbiBjbGlja2VkLiBDYWxsIHBhcmVudCBhY3Rpb24uXG4gICAgICovXG4gICAgY2xpY2tlZChldmVudDogYW55KVxuICAgIHtcbiAgICAgICAgdGhpcy5hY3Rpb24uZW1pdCh7XG4gICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKlxuICogU3VwcG9ydGVkIExpbmsgU2l6ZVxuICovXG5leHBvcnQgdHlwZSBMaW5rU2l6ZSA9ICdsYXJnZScgfCAnbm9ybWFsJyB8ICdzbWFsbCc7XG4iXX0=