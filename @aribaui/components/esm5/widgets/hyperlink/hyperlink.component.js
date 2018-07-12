/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                },] },
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
function HyperlinkComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwZXJsaW5rLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2h5cGVybGluay9oeXBlcmxpbmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXNERiw4Q0FBYTtJQW9EakQsNEJBQW1CLEdBQWdCO1FBQW5DLFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBRWI7UUFKa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTs7OztxQkF6QmxCLFFBQVE7Ozs7dUJBa0JHLElBQUksWUFBWSxFQUFFOzs7OzBCQUsxQixNQUFNOztLQU16Qjs7OztJQUVELHFDQUFROzs7SUFBUjtRQUVJLGlCQUFNLFFBQVEsV0FBRSxDQUFDOztRQUdqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNaLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixLQUFLLE9BQU87b0JBQ1IsSUFBSSxDQUFDLFNBQVMsSUFBSSxVQUFVLENBQUM7b0JBQzdCLEtBQUssQ0FBQztnQkFDVixLQUFLLFFBQVE7b0JBQ1QsSUFBSSxDQUFDLFNBQVMsSUFBSSxXQUFXLENBQUM7b0JBQzlCLEtBQUssQ0FBQztnQkFDVixLQUFLLE9BQU87b0JBQ1IsSUFBSSxDQUFDLFNBQVMsSUFBSSxVQUFVLENBQUM7b0JBQzdCLEtBQUssQ0FBQzthQUNiO1NBQ0o7O1FBR0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFNBQVMsSUFBSSxVQUFVLENBQUM7U0FDaEM7S0FFSjtJQUVEOztPQUVHOzs7Ozs7SUFDSCxvQ0FBTzs7Ozs7SUFBUCxVQUFRLEtBQVU7UUFFZCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNiLEtBQUssRUFBRSxLQUFLO1lBQ1osS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ3BCLENBQUMsQ0FBQztLQUNOOztnQkE1R0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUUsOE9BVWI7b0JBQ0csTUFBTSxFQUFFLENBQUMsdVFBQXVRLENBQUM7aUJBQ3BSOzs7O2dCQXJETyxXQUFXOzs7dUJBNkRkLEtBQUs7dUJBTUwsS0FBSztzQkFNTCxLQUFLO3VCQU9MLEtBQUs7eUJBTUwsS0FBSzt3QkFNTCxLQUFLO3lCQU1MLE1BQU07OzZCQXhIWDtFQTRFd0MsYUFBYTtTQUF4QyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7RW52aXJvbm1lbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuXG4vKipcbiAqIEh5cGVybGluayBjb21wb25lbnQgdGhhdCBpbXBsZW1lbnRzIGNvbnNpc3RlbnQgc3R5bGluZywgYmVoYXZpb3IuIEh5cGVybGluayBzdXBwb3J0cyBhbGwgb2YgdGhlXG4gKiBuYXRpdmUgbGluayBmdW5jdGlvbmFsaXR5LiBJbiBhZGRpdGlvbiwgaXQgc3VwcG9ydHMgbmF2aWdhdGlvbiB0byBjb21wb25lbnRzIHRocm91Z2ggdGhlIGFjdGlvblxuICogYmluZGluZy5cbiAqXG4gKlxuICogZm9yIG1vcmUgaW5mbyBwbGVhc2Ugc2VlIGNsYXNzIERvYyBvZiB0aGU6XG4gKiAgQHNlZSB7QGxpbmsgYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHN9XG4gKlxuICogICMjIyBFeGFtcGxlXG4gKiAgYGBgXG4gKlxuICogIEBDb21wb25lbnQoe1xuICogICAgc2VsZWN0b3I6ICdyZWdpc3RyYXRpb24nICxcbiAqICAgIHRlbXBsYXRlOiBgXG4gKlxuICogICAgICAgICAgIDxhdy1oeXBlcmxpbmsgIFt0eXBlXT1cIid0ZXh0L2h0bWwnXCIgW25hbWVdPVwiJ2xpbmsnXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgKGFjdGlvbik9XCJvbkNsaWNrZWQoJGV2ZW50KVwiIFt2YWx1ZV09XCJjdXN0b21lcklkXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgW3NpemVdPVwiJ2xhcmdlJ1wiID5teSBsaW5rPC9hdy1oeXBlcmxpbms+XG4gKlxuICogICAgYFxuICogICAgfSlcbiAqICAgIGV4cG9ydCBjbGFzcyBNeUNvbXBvbmVudFxuICogICAge1xuICogICAgICAgIGNvbW1hbmQ6Ym9vbGVhbjtcbiAqXG4gKiAgICAgICAgY29uc3RydWN0b3IgKClcbiAqICAgICAgICB7XG4gKiAgICAgICAgfVxuICpcbiAqICAgICAgICBvbkNsaWNrZWQoY3VzdG9tZXJJZDpzdHJpbmcpIHtcbiAqICAgICAgICAgICBpZiAoY3VzdG9tZXJJZCkge1xuICogICAgICAgICAgICAgIC8vIGRpc3BsYXkgY3VzdG9tZXIgZGV0YWlscyBjb21wb25lbnQuXG4gKiAgICAgICAgICAgfVxuICogICAgICAgIH1cbiAqICAgIH1cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1oeXBlcmxpbmsnLFxuICAgIHRlbXBsYXRlOiBgPGEgW2F0dHIudHlwZV09XCJ0eXBlXCJcbiAgIFthdHRyLmhyZWZdPVwiaHJlZlwiXG4gICBbYXR0ci5yZWxdPVwicmVsXCJcbiAgIFthdHRyLnRhcmdldF09XCJ0YXJnZXRcIlxuICAgW25nQ2xhc3NdPVwibGlua0NsYXNzXCJcbiAgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAoY2xpY2spPVwiY2xpY2tlZCgkZXZlbnQpXCI+XG5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2E+XG5gLFxuICAgIHN0eWxlczogW2AubGlua3tjb2xvcjojMDI3NWQ4O2N1cnNvcjpwb2ludGVyfS5saW5rLmxpbmstYmh7Y29sb3I6IzAyNzVkOH0ubGluay5saW5rLWJoOmhvdmVye3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmU7Y3Vyc29yOnBvaW50ZXJ9Lmxpbmstc217Zm9udC1zaXplOi44NzVlbX0ubGluay1taWR7Zm9udC1zaXplOjFlbX0ubGluay1sZ3tmb250LXNpemU6MS4yNWVtfS5saW5rLmRpc2FibGVke3BvaW50ZXItZXZlbnRzOm5vbmU7Y3Vyc29yOmRlZmF1bHQ7Y29sb3I6I2RkZH1gXVxufSlcbmV4cG9ydCBjbGFzcyBIeXBlcmxpbmtDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XG57XG5cbiAgICAvKipcbiAgICAgKiAgICBTcGVjaWZpZXMgdGhlIG1lZGlhIHR5cGUgb2YgdGhlIGxpbmtlZCBkb2N1bWVudC4gTWltZSB0eXBlXG4gICAgICogICAgZXg6IFt0ZXh0L2h0bWwgfCB0ZXh0L2NzdiB8IGltYWdlL3BuZyB8IGF1ZGlvLzNncHAgfCAuLi4uXVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdHlwZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogdXJsIGZvciB0aGlzIGh5cGVybGluay4gQ2FuIGJlIHVzZWQgdG8gbmF2aWdhdGUgdG8gYSBjb21wb25lbnQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBocmVmOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiByZWwgZm9yIHRoaXMgaHlwZXJsaW5rLiBTcGVjaWZ5IHRoZSByZWxhdGlvbnNoaXAgb2YgdGhlIGN1cnJlbnQgZG9jdW1lbnQgYW5kIGxpbmtlZCBkb2N1bWVudFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcmVsOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIHNpemluZyBmb3IgdGhpcyBsaW5rLiBbbGFyZ2UsIG5vcm1hbCwgc21hbGxdLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2l6ZTogTGlua1NpemUgPSAnbm9ybWFsJztcblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIHRhcmdldCBvZiB0aGUgaHlwZXJsaW5rLiBbX2JsYW5rIHwgX3NlbGYgfCBfcGFyZW50IHwgX3RvcCB8IGZyYW1lbmFtZSBdXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0YXJnZXQ6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFZhbHVlIHRvIGJlIHNlbmQgdG8gc2VydmVyIHdoZW4gY2xpY2tlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHZhbHVlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBmaXJlZCB3aGVuIHVzZXIgc2VsZWN0IGEgaXRlbVxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIGFjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBDU1MgY2xhc3MgdGhhdCBzdHlsZXMgdGhpcyBoeXBlcmxpbmsgYmFzZWQgb24gaW5wdXQgJ3NpemUnXG4gICAgICovXG4gICAgbGlua0NsYXNzOiBzdHJpbmcgPSAnbGluayc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgbGluayBjbGFzcyBiYXNlZCBvbiBpbnB1dCBzaXplLlxuICAgICAgICBpZiAodGhpcy5zaXplKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuc2l6ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xhcmdlJyA6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlua0NsYXNzICs9ICcgbGluay1sZyc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ25vcm1hbCcgOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmtDbGFzcyArPSAnIGxpbmstbWlkJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc21hbGwnIDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5rQ2xhc3MgKz0gJyBsaW5rLXNtJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBJIGhhdmUgYW4gYWN0aW9uIHRhZywgYW5kIG5vIGhyZWYuIFdlIGFkZCBkZWZhdWx0IHN0eWxpbmcgYW5kIGJlaGF2aW9yLlxuICAgICAgICBpZiAodGhpcy5hY3Rpb24ub2JzZXJ2ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubGlua0NsYXNzICs9ICcgbGluay1iaCc7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBBY3Rpb24gY2xpY2tlZC4gQ2FsbCBwYXJlbnQgYWN0aW9uLlxuICAgICAqL1xuICAgIGNsaWNrZWQoZXZlbnQ6IGFueSlcbiAgICB7XG4gICAgICAgIHRoaXMuYWN0aW9uLmVtaXQoe1xuICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWVcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIFN1cHBvcnRlZCBMaW5rIFNpemVcbiAqL1xuZXhwb3J0IHR5cGUgTGlua1NpemUgPSAnbGFyZ2UnIHwgJ25vcm1hbCcgfCAnc21hbGwnO1xuIl19