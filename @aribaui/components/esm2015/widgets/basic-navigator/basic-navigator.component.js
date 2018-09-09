/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { BaseComponent } from '../../core/base.component';
import { AppConfig, Environment, isBlank, isPresent } from '@aribaui/core';
/**
 *
 * basic navigation bar provide a main action buttons for its content (page level buttons).
 * This is not the Top level application navigation. This component provides by default action OK,
 * CANCEL and you are free to modify how the OK or CANCEL will be call as well as subscribe to the
 * event. Or you can provide your own buttons template which will be used instead of this default
 * one.
 *
 *
 *
 *
 *
 * ### Example 1:
 *
 * In order to use navigation bar in its basic usage you can do following:
 * this will render buttons on the top as well as on the bottom around the content.
 *
 *
 *  ```html
 *
 *      <aw-basic-navigator [brandImg]="'img/aribalogobal.png'">
 *
 *            <div class="container">
 *                <form>
 *                    User name: <input type=text value="peter.pan">
 *                </<form>>
 *            </div>
 *      </aw-basic-navigator>
 *
 *
 * ```
 *
 *  if you do not want button on the top or bottom you can say thi using binding showTop or
 * showBottom.
 *
 *
 * ### Example 2:
 *  In this example we are providing custom buttons as well as brank section
 *
 *
 *  ```html
 *
 *
 *      <aw-basic-navigator [brandImg]="'img/aribalogobal.png'">
 *            <ng-template #buttons>
 *                <ul class="nav navbar-nav float-md-right collapse navbar-toggleable-xs">
 *                    <li class="nav-item ">
 *                        <button class="btn btn-secondary" type="button"
 * (click)="onSaveAction($evemt)">Cancel</button>
 *                    </li>
 *                    <li class="nav-item active">
 *                        <button class="btn btn-primary" type="button"
 * (click)="onCancelAction($event)"> Save
 *                        </button>
 *                    </li>
 *                </ul>
 *            </ng-template>
 *
 *            <ng-template #brand>
 *                <span class="brand-title">Ariba</span>
 *            </ng-template>
 *
 *
 *            <div class="container">
 *                <form>
 *                    User name: <input type=text value="peter.pan">
 *                </<form>>
 *            </div>
 *      </aw-basic-navigator>
 *
 *
 * ```
 *
 */
export class BasicNavigatorComponent extends BaseComponent {
    /**
     * @param {?} env
     * @param {?} appConfig
     */
    constructor(env, appConfig) {
        super(env);
        /**
         * Indicates that buttons will be rendered on the top
         *
         * Default value is TRUE
         *
         */
        this.showTop = true;
        /**
         * Indicates that buttons will be rendered on the bottom
         *
         * Default value is TRUE
         *
         */
        this.showBottom = true;
        /**
         * Indicates that brand section that is on the left side and only in the top bar is visible
         *
         * Default value is TRUE
         *
         */
        this.showBrand = true;
        /**
         *
         * EventEmitter that is triggered when you click on default OK Action
         *
         */
        this.onOKAction = new EventEmitter();
        /**
         *
         * EventEmitter that is triggered when you click on default CANCEL Action
         *
         */
        this.onCancelAction = new EventEmitter();
        // todo: load this from resource file using ngTranslate service
        this.okActionLabel = 'OK';
        this.cancelActionLabel = 'Cancel';
        this.brandImg = 'images/aribalogobal.png';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (isBlank(this.showCancelButton)) {
            this.showCancelButton = this.editable || (this.onCancelAction.observers.length > 0
                && this.onOKAction.observers.length > 0);
        }
    }
    /**
     * Returns if buttonsTemplate is available
     *
     * @return {?}
     */
    hasButtonTemplate() {
        return isPresent(this.buttonsTemplate);
    }
    /**
     * Returns if brandTemplate is available
     *
     * @return {?}
     */
    hasBrandTemplate() {
        return isPresent(this.brandTemplate);
    }
}
BasicNavigatorComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-basic-navigator',
                template: "<p-toolbar *ngIf=\"showTop\" [class]=\"'w-basic-navigator'\">\n    <div class=\"ui-toolbar-group-left\">\n\n        <a class=\"nav-brand\" href=\"#\" *ngIf=\"showBrand\">\n            <ng-template [ngIf]=\"!hasBrandTemplate()\">\n                <img src=\"{{assetFolder}}/{{brandImg}}\" height=\"30\" alt=\"\">\n                <span class=\"nav-brand-title\">Ariba</span>\n            </ng-template>\n\n            <ng-template [embeddedItem]=\"brandTemplate\" [item]=\"context\"\n                         *ngIf=\"hasBrandTemplate()\"></ng-template>\n        </a>\n\n    </div>\n\n    <div class=\"ui-toolbar-group-right\">\n        <ng-template [ngIf]=\"!hasButtonTemplate()\">\n\n            <aw-button *ngIf=\"showCancelButton\" [style]=\"'secondary'\"\n                       (action)=\"onCancelAction.emit($event)\">\n                {{cancelActionLabel}}\n            </aw-button>\n\n            <aw-button (action)=\"onOKAction.emit($event)\">\n                {{okActionLabel}}\n            </aw-button>\n\n\n        </ng-template>\n        <ng-template [embeddedItem]=\"buttonsTemplate\" [item]=\"context\"\n                     *ngIf=\"hasButtonTemplate()\"></ng-template>\n    </div>\n\n</p-toolbar>\n\n<ng-content></ng-content>\n\n<p-toolbar *ngIf=\"showBottom\">\n\n    <div class=\"ui-toolbar-group-right\">\n        <ng-template [ngIf]=\"!hasButtonTemplate()\">\n\n            <aw-button *ngIf=\"showCancelButton\" [style]=\"'secondary'\"\n                       (action)=\"onCancelAction.emit($event)\">\n                {{cancelActionLabel}}\n            </aw-button>\n\n            <aw-button (action)=\"onOKAction.emit($event)\">\n                {{okActionLabel}}\n            </aw-button>\n        </ng-template>\n        <ng-template [embeddedItem]=\"buttonsTemplate\" [item]=\"context\"\n                     *ngIf=\"hasButtonTemplate()\"></ng-template>\n    </div>\n\n</p-toolbar>\n\n\n\n",
                styles: ["a.nav-brand{vertical-align:middle;line-height:inherit;text-decoration:none;color:#2d353c}a.nav-brand:focus,a.nav-brand:hover{text-decoration:none}a.nav-brand span{vertical-align:middle}.nav-brand img{display:inline-block;vertical-align:middle;padding:3px}"]
            }] }
];
/** @nocollapse */
BasicNavigatorComponent.ctorParameters = () => [
    { type: Environment },
    { type: AppConfig }
];
BasicNavigatorComponent.propDecorators = {
    showTop: [{ type: Input }],
    showBottom: [{ type: Input }],
    showBrand: [{ type: Input }],
    brandImg: [{ type: Input }],
    okActionLabel: [{ type: Input }],
    cancelActionLabel: [{ type: Input }],
    context: [{ type: Input }],
    showCancelButton: [{ type: Input }],
    onOKAction: [{ type: Output }],
    onCancelAction: [{ type: Output }],
    buttonsTemplate: [{ type: ContentChild, args: ['buttons',] }],
    brandTemplate: [{ type: ContentChild, args: ['brand',] }]
};
if (false) {
    /**
     * Indicates that buttons will be rendered on the top
     *
     * Default value is TRUE
     *
     * @type {?}
     */
    BasicNavigatorComponent.prototype.showTop;
    /**
     * Indicates that buttons will be rendered on the bottom
     *
     * Default value is TRUE
     *
     * @type {?}
     */
    BasicNavigatorComponent.prototype.showBottom;
    /**
     * Indicates that brand section that is on the left side and only in the top bar is visible
     *
     * Default value is TRUE
     *
     * @type {?}
     */
    BasicNavigatorComponent.prototype.showBrand;
    /**
     * Relative path to a image. Images are saved inside assets folder.
     *
     * @type {?}
     */
    BasicNavigatorComponent.prototype.brandImg;
    /**
     * If you are not using custom buttons you can pass a label to OK action
     *
     * Default value is OK
     * @type {?}
     */
    BasicNavigatorComponent.prototype.okActionLabel;
    /**
     * If you are not using custom buttons you can pass a label to Cancel action
     *
     * Default value is OK
     * @type {?}
     */
    BasicNavigatorComponent.prototype.cancelActionLabel;
    /**
     * Context is an object which is rendered inside nav-bar content. Sometimes there are situation
     * that you want to render some information from the object inside navigation bar. So you are
     * free to pass a context object and then access it inside your template
     *
     * ```HTML
     *            <ng-template #brand let-item>
     *                <span class="brand-title">{{item.firstName}}</span>
     *            </ng-template>
     *
     * ```
     * @type {?}
     */
    BasicNavigatorComponent.prototype.context;
    /** @type {?} */
    BasicNavigatorComponent.prototype.showCancelButton;
    /**
     *
     * EventEmitter that is triggered when you click on default OK Action
     *
     * @type {?}
     */
    BasicNavigatorComponent.prototype.onOKAction;
    /**
     *
     * EventEmitter that is triggered when you click on default CANCEL Action
     *
     * @type {?}
     */
    BasicNavigatorComponent.prototype.onCancelAction;
    /**
     * Queries a buttons template if any
     * @type {?}
     */
    BasicNavigatorComponent.prototype.buttonsTemplate;
    /**
     * Queries a brand template if any
     * @type {?}
     */
    BasicNavigatorComponent.prototype.brandTemplate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtbmF2aWdhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2Jhc2ljLW5hdmlnYXRvci9iYXNpYy1uYXZpZ2F0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtRnpFLE1BQU0sOEJBQStCLFNBQVEsYUFBYTs7Ozs7SUF5R3RELFlBQVksR0FBZ0IsRUFBRSxTQUFvQjtRQUU5QyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7dUJBakdJLElBQUk7Ozs7Ozs7MEJBVUQsSUFBSTs7Ozs7Ozt5QkFTTCxJQUFJOzs7Ozs7MEJBbURPLElBQUksWUFBWSxFQUFPOzs7Ozs7OEJBUW5CLElBQUksWUFBWSxFQUFPOztRQXNCdkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLHlCQUF5QixDQUFDO0tBQzdDOzs7O0lBRUQsUUFBUTtRQUVKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUM7bUJBQzNFLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNoRDtLQUNKOzs7Ozs7SUFPRCxpQkFBaUI7UUFFYixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUMxQzs7Ozs7O0lBTUQsZ0JBQWdCO1FBRVosTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDeEM7OztZQWxKSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsczREQUE2Qzs7YUFFaEQ7Ozs7WUFsRmtCLFdBQVc7WUFBdEIsU0FBUzs7O3NCQTRGWixLQUFLO3lCQVVMLEtBQUs7d0JBU0wsS0FBSzt1QkFPTCxLQUFLOzRCQVFMLEtBQUs7Z0NBUUwsS0FBSztzQkFnQkwsS0FBSzsrQkFJTCxLQUFLO3lCQVFMLE1BQU07NkJBUU4sTUFBTTs4QkFPTixZQUFZLFNBQUMsU0FBUzs0QkFNdEIsWUFBWSxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVGVtcGxhdGVSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7QXBwQ29uZmlnLCBFbnZpcm9ubWVudCwgaXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcblxuXG4vKipcbiAqXG4gKiBiYXNpYyBuYXZpZ2F0aW9uIGJhciBwcm92aWRlIGEgbWFpbiBhY3Rpb24gYnV0dG9ucyBmb3IgaXRzIGNvbnRlbnQgKHBhZ2UgbGV2ZWwgYnV0dG9ucykuXG4gKiBUaGlzIGlzIG5vdCB0aGUgVG9wIGxldmVsIGFwcGxpY2F0aW9uIG5hdmlnYXRpb24uIFRoaXMgY29tcG9uZW50IHByb3ZpZGVzIGJ5IGRlZmF1bHQgYWN0aW9uIE9LLFxuICogQ0FOQ0VMIGFuZCB5b3UgYXJlIGZyZWUgdG8gbW9kaWZ5IGhvdyB0aGUgT0sgb3IgQ0FOQ0VMIHdpbGwgYmUgY2FsbCBhcyB3ZWxsIGFzIHN1YnNjcmliZSB0byB0aGVcbiAqIGV2ZW50LiBPciB5b3UgY2FuIHByb3ZpZGUgeW91ciBvd24gYnV0dG9ucyB0ZW1wbGF0ZSB3aGljaCB3aWxsIGJlIHVzZWQgaW5zdGVhZCBvZiB0aGlzIGRlZmF1bHRcbiAqIG9uZS5cbiAqXG4gKlxuICpcbiAqXG4gKlxuICogIyMjIEV4YW1wbGUgMTpcbiAqXG4gKiBJbiBvcmRlciB0byB1c2UgbmF2aWdhdGlvbiBiYXIgaW4gaXRzIGJhc2ljIHVzYWdlIHlvdSBjYW4gZG8gZm9sbG93aW5nOlxuICogdGhpcyB3aWxsIHJlbmRlciBidXR0b25zIG9uIHRoZSB0b3AgYXMgd2VsbCBhcyBvbiB0aGUgYm90dG9tIGFyb3VuZCB0aGUgY29udGVudC5cbiAqXG4gKlxuICogIGBgYGh0bWxcbiAqXG4gKiAgICAgIDxhdy1iYXNpYy1uYXZpZ2F0b3IgW2JyYW5kSW1nXT1cIidpbWcvYXJpYmFsb2dvYmFsLnBuZydcIj5cbiAqXG4gKiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAqICAgICAgICAgICAgICAgIDxmb3JtPlxuICogICAgICAgICAgICAgICAgICAgIFVzZXIgbmFtZTogPGlucHV0IHR5cGU9dGV4dCB2YWx1ZT1cInBldGVyLnBhblwiPlxuICogICAgICAgICAgICAgICAgPC88Zm9ybT4+XG4gKiAgICAgICAgICAgIDwvZGl2PlxuICogICAgICA8L2F3LWJhc2ljLW5hdmlnYXRvcj5cbiAqXG4gKlxuICogYGBgXG4gKlxuICogIGlmIHlvdSBkbyBub3Qgd2FudCBidXR0b24gb24gdGhlIHRvcCBvciBib3R0b20geW91IGNhbiBzYXkgdGhpIHVzaW5nIGJpbmRpbmcgc2hvd1RvcCBvclxuICogc2hvd0JvdHRvbS5cbiAqXG4gKlxuICogIyMjIEV4YW1wbGUgMjpcbiAqICBJbiB0aGlzIGV4YW1wbGUgd2UgYXJlIHByb3ZpZGluZyBjdXN0b20gYnV0dG9ucyBhcyB3ZWxsIGFzIGJyYW5rIHNlY3Rpb25cbiAqXG4gKlxuICogIGBgYGh0bWxcbiAqXG4gKlxuICogICAgICA8YXctYmFzaWMtbmF2aWdhdG9yIFticmFuZEltZ109XCInaW1nL2FyaWJhbG9nb2JhbC5wbmcnXCI+XG4gKiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjYnV0dG9ucz5cbiAqICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cIm5hdiBuYXZiYXItbmF2IGZsb2F0LW1kLXJpZ2h0IGNvbGxhcHNlIG5hdmJhci10b2dnbGVhYmxlLXhzXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwibmF2LWl0ZW0gXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiIHR5cGU9XCJidXR0b25cIlxuICogKGNsaWNrKT1cIm9uU2F2ZUFjdGlvbigkZXZlbXQpXCI+Q2FuY2VsPC9idXR0b24+XG4gKiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAqICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJuYXYtaXRlbSBhY3RpdmVcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIlxuICogKGNsaWNrKT1cIm9uQ2FuY2VsQWN0aW9uKCRldmVudClcIj4gU2F2ZVxuICogICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAqICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICogICAgICAgICAgICAgICAgPC91bD5cbiAqICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAqXG4gKiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjYnJhbmQ+XG4gKiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJyYW5kLXRpdGxlXCI+QXJpYmE8L3NwYW4+XG4gKiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKlxuICpcbiAqICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICogICAgICAgICAgICAgICAgPGZvcm0+XG4gKiAgICAgICAgICAgICAgICAgICAgVXNlciBuYW1lOiA8aW5wdXQgdHlwZT10ZXh0IHZhbHVlPVwicGV0ZXIucGFuXCI+XG4gKiAgICAgICAgICAgICAgICA8Lzxmb3JtPj5cbiAqICAgICAgICAgICAgPC9kaXY+XG4gKiAgICAgIDwvYXctYmFzaWMtbmF2aWdhdG9yPlxuICpcbiAqXG4gKiBgYGBcblxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1iYXNpYy1uYXZpZ2F0b3InLFxuICAgIHRlbXBsYXRlVXJsOiAnYmFzaWMtbmF2aWdhdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnYmFzaWMtbmF2aWdhdG9yLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQmFzaWNOYXZpZ2F0b3JDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XG57XG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhhdCBidXR0b25zIHdpbGwgYmUgcmVuZGVyZWQgb24gdGhlIHRvcFxuICAgICAqXG4gICAgICogRGVmYXVsdCB2YWx1ZSBpcyBUUlVFXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dUb3A6IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhhdCBidXR0b25zIHdpbGwgYmUgcmVuZGVyZWQgb24gdGhlIGJvdHRvbVxuICAgICAqXG4gICAgICogRGVmYXVsdCB2YWx1ZSBpcyBUUlVFXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dCb3R0b206IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRoYXQgYnJhbmQgc2VjdGlvbiB0aGF0IGlzIG9uIHRoZSBsZWZ0IHNpZGUgYW5kIG9ubHkgaW4gdGhlIHRvcCBiYXIgaXMgdmlzaWJsZVxuICAgICAqXG4gICAgICogRGVmYXVsdCB2YWx1ZSBpcyBUUlVFXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dCcmFuZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBSZWxhdGl2ZSBwYXRoIHRvIGEgaW1hZ2UuIEltYWdlcyBhcmUgc2F2ZWQgaW5zaWRlIGFzc2V0cyBmb2xkZXIuXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGJyYW5kSW1nOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBJZiB5b3UgYXJlIG5vdCB1c2luZyBjdXN0b20gYnV0dG9ucyB5b3UgY2FuIHBhc3MgYSBsYWJlbCB0byBPSyBhY3Rpb25cbiAgICAgKlxuICAgICAqIERlZmF1bHQgdmFsdWUgaXMgT0tcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG9rQWN0aW9uTGFiZWw6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIElmIHlvdSBhcmUgbm90IHVzaW5nIGN1c3RvbSBidXR0b25zIHlvdSBjYW4gcGFzcyBhIGxhYmVsIHRvIENhbmNlbCBhY3Rpb25cbiAgICAgKlxuICAgICAqIERlZmF1bHQgdmFsdWUgaXMgT0tcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGNhbmNlbEFjdGlvbkxhYmVsOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIENvbnRleHQgaXMgYW4gb2JqZWN0IHdoaWNoIGlzIHJlbmRlcmVkIGluc2lkZSBuYXYtYmFyIGNvbnRlbnQuIFNvbWV0aW1lcyB0aGVyZSBhcmUgc2l0dWF0aW9uXG4gICAgICogdGhhdCB5b3Ugd2FudCB0byByZW5kZXIgc29tZSBpbmZvcm1hdGlvbiBmcm9tIHRoZSBvYmplY3QgaW5zaWRlIG5hdmlnYXRpb24gYmFyLiBTbyB5b3UgYXJlXG4gICAgICogZnJlZSB0byBwYXNzIGEgY29udGV4dCBvYmplY3QgYW5kIHRoZW4gYWNjZXNzIGl0IGluc2lkZSB5b3VyIHRlbXBsYXRlXG4gICAgICpcbiAgICAgKiBgYGBIVE1MXG4gICAgICogICAgICAgICAgICA8bmctdGVtcGxhdGUgI2JyYW5kIGxldC1pdGVtPlxuICAgICAqICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnJhbmQtdGl0bGVcIj57e2l0ZW0uZmlyc3ROYW1lfX08L3NwYW4+XG4gICAgICogICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAqXG4gICAgICogYGBgXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjb250ZXh0OiBhbnk7XG5cblxuICAgIEBJbnB1dCgpXG4gICAgc2hvd0NhbmNlbEJ1dHRvbjogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRXZlbnRFbWl0dGVyIHRoYXQgaXMgdHJpZ2dlcmVkIHdoZW4geW91IGNsaWNrIG9uIGRlZmF1bHQgT0sgQWN0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbk9LQWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBFdmVudEVtaXR0ZXIgdGhhdCBpcyB0cmlnZ2VyZWQgd2hlbiB5b3UgY2xpY2sgb24gZGVmYXVsdCBDQU5DRUwgQWN0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkNhbmNlbEFjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuXG4gICAgLyoqXG4gICAgICogUXVlcmllcyBhIGJ1dHRvbnMgdGVtcGxhdGUgaWYgYW55XG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnYnV0dG9ucycpXG4gICAgYnV0dG9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogUXVlcmllcyBhIGJyYW5kIHRlbXBsYXRlIGlmIGFueVxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2JyYW5kJylcbiAgICBicmFuZFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cblxuICAgIGNvbnN0cnVjdG9yKGVudjogRW52aXJvbm1lbnQsIGFwcENvbmZpZzogQXBwQ29uZmlnKVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcblxuICAgICAgICAvLyB0b2RvOiBsb2FkIHRoaXMgZnJvbSByZXNvdXJjZSBmaWxlIHVzaW5nIG5nVHJhbnNsYXRlIHNlcnZpY2VcbiAgICAgICAgdGhpcy5va0FjdGlvbkxhYmVsID0gJ09LJztcbiAgICAgICAgdGhpcy5jYW5jZWxBY3Rpb25MYWJlbCA9ICdDYW5jZWwnO1xuICAgICAgICB0aGlzLmJyYW5kSW1nID0gJ2ltYWdlcy9hcmliYWxvZ29iYWwucG5nJztcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnNob3dDYW5jZWxCdXR0b24pKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dDYW5jZWxCdXR0b24gPSB0aGlzLmVkaXRhYmxlIHx8ICh0aGlzLm9uQ2FuY2VsQWN0aW9uLm9ic2VydmVycy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5vbk9LQWN0aW9uLm9ic2VydmVycy5sZW5ndGggPiAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBpZiBidXR0b25zVGVtcGxhdGUgaXMgYXZhaWxhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNCdXR0b25UZW1wbGF0ZSgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuYnV0dG9uc1RlbXBsYXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGlmIGJyYW5kVGVtcGxhdGUgaXMgYXZhaWxhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNCcmFuZFRlbXBsYXRlKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5icmFuZFRlbXBsYXRlKTtcbiAgICB9XG5cbn1cbiJdfQ==