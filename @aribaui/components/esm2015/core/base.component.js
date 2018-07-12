/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Input } from '@angular/core';
import { AppConfig } from '@aribaui/core';
/**
 *  Base component shares common functionality among all the components (layouts, widgets).
 *
 * @abstract
 */
export class BaseComponent {
    /**
     * @param {?=} env
     */
    constructor(env) {
        this.env = env;
        /**
         * Adds disabled flag to the component
         *
         */
        this.disabled = false;
        /**
         * Weather this component is visible
         * Default is false;
         */
        this.visible = false;
        /**
         * Tell  the component if we are in editing mode.
         *
         */
        this.editable = true;
        /**
         * Removes padding from the component. Usually used when we are nesting other component with
         * its own grid.
         */
        this.omitPadding = false;
        /**
         * Prefix for the correct asset path
         */
        this.assetFolder = 'assets';
        this.extBindings = new Map();
        this.omitPadding = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.assetFolder = this.env.getValue(AppConfig.AssetFolder);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
    }
}
BaseComponent.propDecorators = {
    disabled: [{ type: Input }],
    visible: [{ type: Input }],
    editable: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    styleClass: [{ type: Input }],
    omitPadding: [{ type: Input }]
};
function BaseComponent_tsickle_Closure_declarations() {
    /**
     * Adds disabled flag to the component
     *
     * @type {?}
     */
    BaseComponent.prototype.disabled;
    /**
     * Weather this component is visible
     * Default is false;
     * @type {?}
     */
    BaseComponent.prototype.visible;
    /**
     * Tell  the component if we are in editing mode.
     *
     * @type {?}
     */
    BaseComponent.prototype.editable;
    /**
     * Every component have option to set a custom with
     *
     * @type {?}
     */
    BaseComponent.prototype.width;
    /**
     * Every component have option to set a custom with
     * @type {?}
     */
    BaseComponent.prototype.height;
    /**
     * optional css class which can be utilized by component
     * @type {?}
     */
    BaseComponent.prototype.styleClass;
    /**
     * Removes padding from the component. Usually used when we are nesting other component with
     * its own grid.
     * @type {?}
     */
    BaseComponent.prototype.omitPadding;
    /**
     * Class extension support register here any dynamic field that does not existing on the
     * class/component
     * @type {?}
     */
    BaseComponent.prototype.extBindings;
    /**
     * Prefix for the correct asset path
     * @type {?}
     */
    BaseComponent.prototype.assetFolder;
    /** @type {?} */
    BaseComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9iYXNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBVSxLQUFLLEVBQThDLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBQyxTQUFTLEVBQWMsTUFBTSxlQUFlLENBQUM7Ozs7OztBQU9yRCxNQUFNOzs7O0lBK0RGLFlBQW1CLEdBQWlCO1FBQWpCLFFBQUcsR0FBSCxHQUFHLENBQWM7Ozs7O3dCQXZEaEIsS0FBSzs7Ozs7dUJBUU4sS0FBSzs7Ozs7d0JBT0gsSUFBSTs7Ozs7MkJBMEJYLEtBQUs7Ozs7MkJBWUcsUUFBUTtRQUkxQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7S0FDNUI7Ozs7SUFHRCxRQUFRO1FBRUosSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDL0Q7Ozs7O0lBR0QsV0FBVyxDQUFDLE9BQXNCO0tBRWpDOzs7O0lBR0QsU0FBUztLQUVSOzs7O0lBR0QsV0FBVztLQUVWOzs7dUJBakZBLEtBQUs7c0JBUUwsS0FBSzt1QkFPTCxLQUFLO29CQU9MLEtBQUs7cUJBTUwsS0FBSzt5QkFNTCxLQUFLOzBCQU9MLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7RG9DaGVjaywgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFNpbXBsZUNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBcHBDb25maWcsIEVudmlyb25tZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcblxuXG4vKipcbiAqICBCYXNlIGNvbXBvbmVudCBzaGFyZXMgY29tbW9uIGZ1bmN0aW9uYWxpdHkgYW1vbmcgYWxsIHRoZSBjb21wb25lbnRzIChsYXlvdXRzLCB3aWRnZXRzKS5cbiAqXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIERvQ2hlY2ssIE9uRGVzdHJveVxue1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBkaXNhYmxlZCBmbGFnIHRvIHRoZSBjb21wb25lbnRcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgLyoqXG4gICAgICogV2VhdGhlciB0aGlzIGNvbXBvbmVudCBpcyB2aXNpYmxlXG4gICAgICogRGVmYXVsdCBpcyBmYWxzZTtcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFRlbGwgIHRoZSBjb21wb25lbnQgaWYgd2UgYXJlIGluIGVkaXRpbmcgbW9kZS5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZWRpdGFibGU/OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIEV2ZXJ5IGNvbXBvbmVudCBoYXZlIG9wdGlvbiB0byBzZXQgYSBjdXN0b20gd2l0aFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB3aWR0aDogYW55O1xuXG4gICAgLyoqXG4gICAgICogRXZlcnkgY29tcG9uZW50IGhhdmUgb3B0aW9uIHRvIHNldCBhIGN1c3RvbSB3aXRoXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBoZWlnaHQ6IGFueTtcblxuICAgIC8qKlxuICAgICAqIG9wdGlvbmFsIGNzcyBjbGFzcyB3aGljaCBjYW4gYmUgdXRpbGl6ZWQgYnkgY29tcG9uZW50XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzdHlsZUNsYXNzOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHBhZGRpbmcgZnJvbSB0aGUgY29tcG9uZW50LiBVc3VhbGx5IHVzZWQgd2hlbiB3ZSBhcmUgbmVzdGluZyBvdGhlciBjb21wb25lbnQgd2l0aFxuICAgICAqIGl0cyBvd24gZ3JpZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG9taXRQYWRkaW5nID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBDbGFzcyBleHRlbnNpb24gc3VwcG9ydCByZWdpc3RlciBoZXJlIGFueSBkeW5hbWljIGZpZWxkIHRoYXQgZG9lcyBub3QgZXhpc3Rpbmcgb24gdGhlXG4gICAgICogY2xhc3MvY29tcG9uZW50XG4gICAgICovXG4gICAgZXh0QmluZGluZ3M6IE1hcDxzdHJpbmcsIGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIFByZWZpeCBmb3IgdGhlIGNvcnJlY3QgYXNzZXQgcGF0aFxuICAgICAqL1xuICAgIGFzc2V0Rm9sZGVyOiBzdHJpbmcgPSAnYXNzZXRzJztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY/OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHRoaXMuZXh0QmluZGluZ3MgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICB0aGlzLm9taXRQYWRkaW5nID0gZmFsc2U7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmFzc2V0Rm9sZGVyID0gdGhpcy5lbnYuZ2V0VmFsdWUoQXBwQ29uZmlnLkFzc2V0Rm9sZGVyKTtcbiAgICB9XG5cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkXG4gICAge1xuICAgIH1cblxuXG4gICAgbmdEb0NoZWNrKCk6IHZvaWRcbiAgICB7XG4gICAgfVxuXG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkXG4gICAge1xuICAgIH1cbn1cblxuXG4iXX0=