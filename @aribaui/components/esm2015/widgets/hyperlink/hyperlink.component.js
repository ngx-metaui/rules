/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export class HyperlinkComponent extends BaseComponent {
    /**
     * @param {?} env
     */
    constructor(env) {
        super(env);
        this.env = env;
        /**
         * sizing for this link. [large, normal, small].
         */
        this.size = 'normal';
        /**
         * Event fired when user select a item
         */
        this.action = new EventEmitter();
        /**
         * Internal CSS class that styles this hyperlink based on input 'size'
         */
        this.linkClass = 'link';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
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
    }
    /**
     *  Action clicked. Call parent action.
     * @param {?} event
     * @return {?}
     */
    clicked(event) {
        this.action.emit({
            event: event,
            value: this.value
        });
    }
}
HyperlinkComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-hyperlink',
                template: `<a [attr.type]="type"
   [attr.href]="href"
   [attr.rel]="rel"
   [attr.target]="target"
   [ngClass]="linkClass"
   [class.disabled]="disabled"
   (click)="clicked($event)">

    <ng-content></ng-content>
</a>
`,
                styles: [`.link{color:#0275d8;cursor:pointer}.link.link-bh{color:#0275d8}.link.link-bh:hover{text-decoration:underline;cursor:pointer}.link-sm{font-size:.875em}.link-mid{font-size:1em}.link-lg{font-size:1.25em}.link.disabled{pointer-events:none;cursor:default;color:#ddd}`]
            },] },
];
/** @nocollapse */
HyperlinkComponent.ctorParameters = () => [
    { type: Environment }
];
HyperlinkComponent.propDecorators = {
    type: [{ type: Input }],
    href: [{ type: Input }],
    rel: [{ type: Input }],
    size: [{ type: Input }],
    target: [{ type: Input }],
    value: [{ type: Input }],
    action: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwZXJsaW5rLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2h5cGVybGluay9oeXBlcmxpbmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzRDFDLE1BQU0seUJBQTBCLFNBQVEsYUFBYTs7OztJQW9EakQsWUFBbUIsR0FBZ0I7UUFFL0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRkksUUFBRyxHQUFILEdBQUcsQ0FBYTs7OztvQkF6QmxCLFFBQVE7Ozs7c0JBa0JHLElBQUksWUFBWSxFQUFFOzs7O3lCQUsxQixNQUFNO0tBTXpCOzs7O0lBRUQsUUFBUTtRQUVKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7UUFHakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsS0FBSyxPQUFPO29CQUNSLElBQUksQ0FBQyxTQUFTLElBQUksVUFBVSxDQUFDO29CQUM3QixLQUFLLENBQUM7Z0JBQ1YsS0FBSyxRQUFRO29CQUNULElBQUksQ0FBQyxTQUFTLElBQUksV0FBVyxDQUFDO29CQUM5QixLQUFLLENBQUM7Z0JBQ1YsS0FBSyxPQUFPO29CQUNSLElBQUksQ0FBQyxTQUFTLElBQUksVUFBVSxDQUFDO29CQUM3QixLQUFLLENBQUM7YUFDYjtTQUNKOztRQUdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxTQUFTLElBQUksVUFBVSxDQUFDO1NBQ2hDO0tBRUo7Ozs7OztJQUtELE9BQU8sQ0FBQyxLQUFVO1FBRWQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDYixLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNwQixDQUFDLENBQUM7S0FDTjs7O1lBNUdKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFOzs7Ozs7Ozs7O0NBVWI7Z0JBQ0csTUFBTSxFQUFFLENBQUMsdVFBQXVRLENBQUM7YUFDcFI7Ozs7WUFyRE8sV0FBVzs7O21CQTZEZCxLQUFLO21CQU1MLEtBQUs7a0JBTUwsS0FBSzttQkFPTCxLQUFLO3FCQU1MLEtBQUs7b0JBTUwsS0FBSztxQkFNTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQge0Vudmlyb25tZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcblxuLyoqXG4gKiBIeXBlcmxpbmsgY29tcG9uZW50IHRoYXQgaW1wbGVtZW50cyBjb25zaXN0ZW50IHN0eWxpbmcsIGJlaGF2aW9yLiBIeXBlcmxpbmsgc3VwcG9ydHMgYWxsIG9mIHRoZVxuICogbmF0aXZlIGxpbmsgZnVuY3Rpb25hbGl0eS4gSW4gYWRkaXRpb24sIGl0IHN1cHBvcnRzIG5hdmlnYXRpb24gdG8gY29tcG9uZW50cyB0aHJvdWdoIHRoZSBhY3Rpb25cbiAqIGJpbmRpbmcuXG4gKlxuICpcbiAqIGZvciBtb3JlIGluZm8gcGxlYXNlIHNlZSBjbGFzcyBEb2Mgb2YgdGhlOlxuICogIEBzZWUge0BsaW5rIGJ1dHRvbi9idXR0b24uY29tcG9uZW50LnRzfVxuICpcbiAqICAjIyMgRXhhbXBsZVxuICogIGBgYFxuICpcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yOiAncmVnaXN0cmF0aW9uJyAsXG4gKiAgICB0ZW1wbGF0ZTogYFxuICpcbiAqICAgICAgICAgICA8YXctaHlwZXJsaW5rICBbdHlwZV09XCIndGV4dC9odG1sJ1wiIFtuYW1lXT1cIidsaW5rJ1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIChhY3Rpb24pPVwib25DbGlja2VkKCRldmVudClcIiBbdmFsdWVdPVwiY3VzdG9tZXJJZFwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIFtzaXplXT1cIidsYXJnZSdcIiA+bXkgbGluazwvYXctaHlwZXJsaW5rPlxuICpcbiAqICAgIGBcbiAqICAgIH0pXG4gKiAgICBleHBvcnQgY2xhc3MgTXlDb21wb25lbnRcbiAqICAgIHtcbiAqICAgICAgICBjb21tYW5kOmJvb2xlYW47XG4gKlxuICogICAgICAgIGNvbnN0cnVjdG9yICgpXG4gKiAgICAgICAge1xuICogICAgICAgIH1cbiAqXG4gKiAgICAgICAgb25DbGlja2VkKGN1c3RvbWVySWQ6c3RyaW5nKSB7XG4gKiAgICAgICAgICAgaWYgKGN1c3RvbWVySWQpIHtcbiAqICAgICAgICAgICAgICAvLyBkaXNwbGF5IGN1c3RvbWVyIGRldGFpbHMgY29tcG9uZW50LlxuICogICAgICAgICAgIH1cbiAqICAgICAgICB9XG4gKiAgICB9XG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctaHlwZXJsaW5rJyxcbiAgICB0ZW1wbGF0ZTogYDxhIFthdHRyLnR5cGVdPVwidHlwZVwiXG4gICBbYXR0ci5ocmVmXT1cImhyZWZcIlxuICAgW2F0dHIucmVsXT1cInJlbFwiXG4gICBbYXR0ci50YXJnZXRdPVwidGFyZ2V0XCJcbiAgIFtuZ0NsYXNzXT1cImxpbmtDbGFzc1wiXG4gICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgKGNsaWNrKT1cImNsaWNrZWQoJGV2ZW50KVwiPlxuXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9hPlxuYCxcbiAgICBzdHlsZXM6IFtgLmxpbmt7Y29sb3I6IzAyNzVkODtjdXJzb3I6cG9pbnRlcn0ubGluay5saW5rLWJoe2NvbG9yOiMwMjc1ZDh9LmxpbmsubGluay1iaDpob3Zlcnt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lO2N1cnNvcjpwb2ludGVyfS5saW5rLXNte2ZvbnQtc2l6ZTouODc1ZW19LmxpbmstbWlke2ZvbnQtc2l6ZToxZW19LmxpbmstbGd7Zm9udC1zaXplOjEuMjVlbX0ubGluay5kaXNhYmxlZHtwb2ludGVyLWV2ZW50czpub25lO2N1cnNvcjpkZWZhdWx0O2NvbG9yOiNkZGR9YF1cbn0pXG5leHBvcnQgY2xhc3MgSHlwZXJsaW5rQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICogICAgU3BlY2lmaWVzIHRoZSBtZWRpYSB0eXBlIG9mIHRoZSBsaW5rZWQgZG9jdW1lbnQuIE1pbWUgdHlwZVxuICAgICAqICAgIGV4OiBbdGV4dC9odG1sIHwgdGV4dC9jc3YgfCBpbWFnZS9wbmcgfCBhdWRpby8zZ3BwIHwgLi4uLl1cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHR5cGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIHVybCBmb3IgdGhpcyBoeXBlcmxpbmsuIENhbiBiZSB1c2VkIHRvIG5hdmlnYXRlIHRvIGEgY29tcG9uZW50LlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaHJlZjogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogcmVsIGZvciB0aGlzIGh5cGVybGluay4gU3BlY2lmeSB0aGUgcmVsYXRpb25zaGlwIG9mIHRoZSBjdXJyZW50IGRvY3VtZW50IGFuZCBsaW5rZWQgZG9jdW1lbnRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHJlbDogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBzaXppbmcgZm9yIHRoaXMgbGluay4gW2xhcmdlLCBub3JtYWwsIHNtYWxsXS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNpemU6IExpbmtTaXplID0gJ25vcm1hbCc7XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHRoZSB0YXJnZXQgb2YgdGhlIGh5cGVybGluay4gW19ibGFuayB8IF9zZWxmIHwgX3BhcmVudCB8IF90b3AgfCBmcmFtZW5hbWUgXVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdGFyZ2V0OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBWYWx1ZSB0byBiZSBzZW5kIHRvIHNlcnZlciB3aGVuIGNsaWNrZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB2YWx1ZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgZmlyZWQgd2hlbiB1c2VyIHNlbGVjdCBhIGl0ZW1cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBhY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgQ1NTIGNsYXNzIHRoYXQgc3R5bGVzIHRoaXMgaHlwZXJsaW5rIGJhc2VkIG9uIGlucHV0ICdzaXplJ1xuICAgICAqL1xuICAgIGxpbmtDbGFzczogc3RyaW5nID0gJ2xpbmsnO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIGxpbmsgY2xhc3MgYmFzZWQgb24gaW5wdXQgc2l6ZS5cbiAgICAgICAgaWYgKHRoaXMuc2l6ZSkge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnNpemUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdsYXJnZScgOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmtDbGFzcyArPSAnIGxpbmstbGcnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdub3JtYWwnIDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5rQ2xhc3MgKz0gJyBsaW5rLW1pZCc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3NtYWxsJyA6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlua0NsYXNzICs9ICcgbGluay1zbSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgSSBoYXZlIGFuIGFjdGlvbiB0YWcsIGFuZCBubyBocmVmLiBXZSBhZGQgZGVmYXVsdCBzdHlsaW5nIGFuZCBiZWhhdmlvci5cbiAgICAgICAgaWYgKHRoaXMuYWN0aW9uLm9ic2VydmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmtDbGFzcyArPSAnIGxpbmstYmgnO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgQWN0aW9uIGNsaWNrZWQuIENhbGwgcGFyZW50IGFjdGlvbi5cbiAgICAgKi9cbiAgICBjbGlja2VkKGV2ZW50OiBhbnkpXG4gICAge1xuICAgICAgICB0aGlzLmFjdGlvbi5lbWl0KHtcbiAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBTdXBwb3J0ZWQgTGluayBTaXplXG4gKi9cbmV4cG9ydCB0eXBlIExpbmtTaXplID0gJ2xhcmdlJyB8ICdub3JtYWwnIHwgJ3NtYWxsJztcbiJdfQ==