/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                template: "<a [attr.type]=\"type\"\n   [attr.href]=\"href\"\n   [attr.rel]=\"rel\"\n   [attr.target]=\"target\"\n   [ngClass]=\"linkClass\"\n   [class.disabled]=\"disabled\"\n   (click)=\"clicked($event)\">\n\n    <ng-content></ng-content>\n</a>\n",
                styles: [".link{color:#0275d8;cursor:pointer}.link.link-bh{color:#0275d8}.link.link-bh:hover{text-decoration:underline;cursor:pointer}.link-sm{font-size:.875em}.link-mid{font-size:1em}.link-lg{font-size:1.25em}.link.disabled{pointer-events:none;cursor:default;color:#ddd}"]
            }] }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwZXJsaW5rLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2h5cGVybGluay9oeXBlcmxpbmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QzFDLE1BQU0seUJBQTBCLFNBQVEsYUFBYTs7OztJQW9EakQsWUFBbUIsR0FBZ0I7UUFFL0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRkksUUFBRyxHQUFILEdBQUcsQ0FBYTs7OztvQkF6QmxCLFFBQVE7Ozs7c0JBa0JHLElBQUksWUFBWSxFQUFFOzs7O3lCQUsxQixNQUFNO0tBTXpCOzs7O0lBRUQsUUFBUTtRQUVKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7UUFHakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsS0FBSyxPQUFPO29CQUNSLElBQUksQ0FBQyxTQUFTLElBQUksVUFBVSxDQUFDO29CQUM3QixLQUFLLENBQUM7Z0JBQ1YsS0FBSyxRQUFRO29CQUNULElBQUksQ0FBQyxTQUFTLElBQUksV0FBVyxDQUFDO29CQUM5QixLQUFLLENBQUM7Z0JBQ1YsS0FBSyxPQUFPO29CQUNSLElBQUksQ0FBQyxTQUFTLElBQUksVUFBVSxDQUFDO29CQUM3QixLQUFLLENBQUM7YUFDYjtTQUNKOztRQUdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxTQUFTLElBQUksVUFBVSxDQUFDO1NBQ2hDO0tBRUo7Ozs7OztJQUtELE9BQU8sQ0FBQyxLQUFVO1FBRWQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDYixLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNwQixDQUFDLENBQUM7S0FDTjs7O1lBbEdKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsd1BBQXVDOzthQUUxQzs7OztZQTNDTyxXQUFXOzs7bUJBbURkLEtBQUs7bUJBTUwsS0FBSztrQkFNTCxLQUFLO21CQU9MLEtBQUs7cUJBTUwsS0FBSztvQkFNTCxLQUFLO3FCQU1MLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7RW52aXJvbm1lbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuXG4vKipcbiAqIEh5cGVybGluayBjb21wb25lbnQgdGhhdCBpbXBsZW1lbnRzIGNvbnNpc3RlbnQgc3R5bGluZywgYmVoYXZpb3IuIEh5cGVybGluayBzdXBwb3J0cyBhbGwgb2YgdGhlXG4gKiBuYXRpdmUgbGluayBmdW5jdGlvbmFsaXR5LiBJbiBhZGRpdGlvbiwgaXQgc3VwcG9ydHMgbmF2aWdhdGlvbiB0byBjb21wb25lbnRzIHRocm91Z2ggdGhlIGFjdGlvblxuICogYmluZGluZy5cbiAqXG4gKlxuICogZm9yIG1vcmUgaW5mbyBwbGVhc2Ugc2VlIGNsYXNzIERvYyBvZiB0aGU6XG4gKiAgQHNlZSB7QGxpbmsgYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHN9XG4gKlxuICogICMjIyBFeGFtcGxlXG4gKiAgYGBgXG4gKlxuICogIEBDb21wb25lbnQoe1xuICogICAgc2VsZWN0b3I6ICdyZWdpc3RyYXRpb24nICxcbiAqICAgIHRlbXBsYXRlOiBgXG4gKlxuICogICAgICAgICAgIDxhdy1oeXBlcmxpbmsgIFt0eXBlXT1cIid0ZXh0L2h0bWwnXCIgW25hbWVdPVwiJ2xpbmsnXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgKGFjdGlvbik9XCJvbkNsaWNrZWQoJGV2ZW50KVwiIFt2YWx1ZV09XCJjdXN0b21lcklkXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgW3NpemVdPVwiJ2xhcmdlJ1wiID5teSBsaW5rPC9hdy1oeXBlcmxpbms+XG4gKlxuICogICAgYFxuICogICAgfSlcbiAqICAgIGV4cG9ydCBjbGFzcyBNeUNvbXBvbmVudFxuICogICAge1xuICogICAgICAgIGNvbW1hbmQ6Ym9vbGVhbjtcbiAqXG4gKiAgICAgICAgY29uc3RydWN0b3IgKClcbiAqICAgICAgICB7XG4gKiAgICAgICAgfVxuICpcbiAqICAgICAgICBvbkNsaWNrZWQoY3VzdG9tZXJJZDpzdHJpbmcpIHtcbiAqICAgICAgICAgICBpZiAoY3VzdG9tZXJJZCkge1xuICogICAgICAgICAgICAgIC8vIGRpc3BsYXkgY3VzdG9tZXIgZGV0YWlscyBjb21wb25lbnQuXG4gKiAgICAgICAgICAgfVxuICogICAgICAgIH1cbiAqICAgIH1cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1oeXBlcmxpbmsnLFxuICAgIHRlbXBsYXRlVXJsOiAnaHlwZXJsaW5rLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnaHlwZXJsaW5rLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSHlwZXJsaW5rQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICogICAgU3BlY2lmaWVzIHRoZSBtZWRpYSB0eXBlIG9mIHRoZSBsaW5rZWQgZG9jdW1lbnQuIE1pbWUgdHlwZVxuICAgICAqICAgIGV4OiBbdGV4dC9odG1sIHwgdGV4dC9jc3YgfCBpbWFnZS9wbmcgfCBhdWRpby8zZ3BwIHwgLi4uLl1cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHR5cGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIHVybCBmb3IgdGhpcyBoeXBlcmxpbmsuIENhbiBiZSB1c2VkIHRvIG5hdmlnYXRlIHRvIGEgY29tcG9uZW50LlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaHJlZjogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogcmVsIGZvciB0aGlzIGh5cGVybGluay4gU3BlY2lmeSB0aGUgcmVsYXRpb25zaGlwIG9mIHRoZSBjdXJyZW50IGRvY3VtZW50IGFuZCBsaW5rZWQgZG9jdW1lbnRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHJlbDogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBzaXppbmcgZm9yIHRoaXMgbGluay4gW2xhcmdlLCBub3JtYWwsIHNtYWxsXS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNpemU6IExpbmtTaXplID0gJ25vcm1hbCc7XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHRoZSB0YXJnZXQgb2YgdGhlIGh5cGVybGluay4gW19ibGFuayB8IF9zZWxmIHwgX3BhcmVudCB8IF90b3AgfCBmcmFtZW5hbWUgXVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdGFyZ2V0OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBWYWx1ZSB0byBiZSBzZW5kIHRvIHNlcnZlciB3aGVuIGNsaWNrZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB2YWx1ZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgZmlyZWQgd2hlbiB1c2VyIHNlbGVjdCBhIGl0ZW1cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBhY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgQ1NTIGNsYXNzIHRoYXQgc3R5bGVzIHRoaXMgaHlwZXJsaW5rIGJhc2VkIG9uIGlucHV0ICdzaXplJ1xuICAgICAqL1xuICAgIGxpbmtDbGFzczogc3RyaW5nID0gJ2xpbmsnO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIGxpbmsgY2xhc3MgYmFzZWQgb24gaW5wdXQgc2l6ZS5cbiAgICAgICAgaWYgKHRoaXMuc2l6ZSkge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnNpemUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdsYXJnZScgOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmtDbGFzcyArPSAnIGxpbmstbGcnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdub3JtYWwnIDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5rQ2xhc3MgKz0gJyBsaW5rLW1pZCc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3NtYWxsJyA6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlua0NsYXNzICs9ICcgbGluay1zbSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgSSBoYXZlIGFuIGFjdGlvbiB0YWcsIGFuZCBubyBocmVmLiBXZSBhZGQgZGVmYXVsdCBzdHlsaW5nIGFuZCBiZWhhdmlvci5cbiAgICAgICAgaWYgKHRoaXMuYWN0aW9uLm9ic2VydmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmtDbGFzcyArPSAnIGxpbmstYmgnO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgQWN0aW9uIGNsaWNrZWQuIENhbGwgcGFyZW50IGFjdGlvbi5cbiAgICAgKi9cbiAgICBjbGlja2VkKGV2ZW50OiBhbnkpXG4gICAge1xuICAgICAgICB0aGlzLmFjdGlvbi5lbWl0KHtcbiAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBTdXBwb3J0ZWQgTGluayBTaXplXG4gKi9cbmV4cG9ydCB0eXBlIExpbmtTaXplID0gJ2xhcmdlJyB8ICdub3JtYWwnIHwgJ3NtYWxsJztcbiJdfQ==