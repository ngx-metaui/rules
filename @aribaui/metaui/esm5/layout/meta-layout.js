/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { assert, isBlank, isPresent } from '@aribaui/core';
import { MetaBaseComponent } from './meta.base.component';
import { UIMeta } from '../core/uimeta';
/**
 * MetaLayout represent a high level rule that aggregates defined layout. When we iterate thru the
 * different layout we need to remember both current rendered context as well as ItemProperties.
 *
 *
 *
 */
var /**
 * MetaLayout represent a high level rule that aggregates defined layout. When we iterate thru the
 * different layout we need to remember both current rendered context as well as ItemProperties.
 *
 *
 *
 */
MetaLayout = /** @class */ (function (_super) {
    tslib_1.__extends(MetaLayout, _super);
    function MetaLayout(_metaContext, env) {
        var _this = _super.call(this, env, _metaContext) || this;
        _this._metaContext = _metaContext;
        _this.env = env;
        /**
         * Layout definitions by its name
         *
         */
        _this.nameToLayout = new Map();
        /**
         * A map linking the name of the layout to the actual context. We need this when we need
         * to access current content.
         *
         */
        _this.contextMap = new Map();
        return _this;
    }
    /**
     * Can be called by m-content to @Output when context properties are pushed to stack
     *
     */
    /**
     * Can be called by m-content to \@Output when context properties are pushed to stack
     *
     * @param {?} layoutName
     * @return {?}
     */
    MetaLayout.prototype.afterContextSet = /**
     * Can be called by m-content to \@Output when context properties are pushed to stack
     *
     * @param {?} layoutName
     * @return {?}
     */
    function (layoutName) {
        this.layoutContext = this.activeContext;
        this.contextMap.set(layoutName, this.layoutContext.snapshot().hydrate(false));
    };
    /**
     * Can be called by m-content to @Output after context properties are pushed to stack
     *
     */
    /**
     * Can be called by m-content to \@Output after context properties are pushed to stack
     *
     * @param {?} layoutName
     * @return {?}
     */
    MetaLayout.prototype.beforeContextSet = /**
     * Can be called by m-content to \@Output after context properties are pushed to stack
     *
     * @param {?} layoutName
     * @return {?}
     */
    function (layoutName) {
        this.layout = this.nameToLayout.get(layoutName);
    };
    Object.defineProperty(MetaLayout.prototype, "activeContext", {
        get: /**
         * @return {?}
         */
        function () {
            return this._metaContext.activeContext();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MetaLayout.prototype, "allLayouts", {
        /**
         * Retrieves all available and active layouts for zones defined by subclasses
         *
         */
        get: /**
         * Retrieves all available and active layouts for zones defined by subclasses
         *
         * @return {?}
         */
        function () {
            var _this = this;
            if (isBlank(this._allLayouts)) {
                var /** @type {?} */ meta = /** @type {?} */ (this.activeContext.meta);
                this._allLayouts = meta.itemList(this.activeContext, UIMeta.KeyLayout, this.zones());
                this.nameToLayout.clear();
                this._allLayouts.forEach(function (item) {
                    return _this.nameToLayout.set(item.name, item);
                });
            }
            return this._allLayouts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MetaLayout.prototype, "layoutsByZones", {
        /**
         * Retrieves all available and active layouts and aggregate them their name
         *
         */
        get: /**
         * Retrieves all available and active layouts and aggregate them their name
         *
         * @return {?}
         */
        function () {
            if (isBlank(this._layoutsByZones)) {
                var /** @type {?} */ meta = /** @type {?} */ (this.activeContext.meta);
                this._layoutsByZones = meta.itemsByZones(this.activeContext, UIMeta.KeyLayout, this.zones());
            }
            return this._layoutsByZones;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MetaLayout.prototype, "layout", {
        get: /**
         * @return {?}
         */
        function () {
            return this._layout;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._layout = value;
            this._propertyMap = null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MetaLayout.prototype, "propertyMap", {
        // todo: should this be for current layout?
        get: /**
         * @return {?}
         */
        function () {
            if (isBlank(this._propertyMap)) {
                this.activeContext.push();
                this._propertyMap = this.activeContext.allProperties();
                this.activeContext.pop();
            }
            return this._propertyMap;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MetaLayout.prototype.label = /**
     * @return {?}
     */
    function () {
        return this.activeContext.resolveValue(this.propertyMap.get(UIMeta.KeyLabel));
    };
    /**
     * @param {?} name
     * @return {?}
     */
    MetaLayout.prototype.labelForContext = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        var /** @type {?} */ context = this.contextMap.get(name);
        return _super.prototype.aProperties.call(this, context, UIMeta.KeyLabel);
    };
    /**
     * @return {?}
     */
    MetaLayout.prototype.zones = /**
     * @return {?}
     */
    function () {
        return UIMeta.ZonesTLRMB;
    };
    // remove this ugly solution once I figure out custom value accessor
    /**
     * @param {?} key
     * @param {?=} defValue
     * @return {?}
     */
    MetaLayout.prototype.properties = /**
     * @param {?} key
     * @param {?=} defValue
     * @return {?}
     */
    function (key, defValue) {
        if (defValue === void 0) { defValue = null; }
        return isPresent(this.activeContext) ? this.activeContext.propertyForKey(key) : defValue;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    MetaLayout.prototype.debugString = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        var /** @type {?} */ context = this.contextMap.get(name);
        assert(isPresent(context), 'Trying to retrive debugString on non-existing context');
        return context.debugString();
    };
    /**
     * @return {?}
     */
    MetaLayout.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.layoutContext = null;
        this.contextMap.clear();
        this.contextMap = null;
    };
    return MetaLayout;
}(MetaBaseComponent));
/**
 * MetaLayout represent a high level rule that aggregates defined layout. When we iterate thru the
 * different layout we need to remember both current rendered context as well as ItemProperties.
 *
 *
 *
 */
export { MetaLayout };
function MetaLayout_tsickle_Closure_declarations() {
    /**
     * List all available Layouts defines for current Context
     * @type {?}
     */
    MetaLayout.prototype._allLayouts;
    /**
     * Layout sorted by zones. Each implementation can support different zones.
     * @type {?}
     */
    MetaLayout.prototype._layoutsByZones;
    /**
     * Context properties for current active rendered layout
     *
     * @type {?}
     */
    MetaLayout.prototype._propertyMap;
    /**
     * Current Layout being rendered
     * @type {?}
     */
    MetaLayout.prototype._layout;
    /**
     * Layout definitions by its name
     *
     * @type {?}
     */
    MetaLayout.prototype.nameToLayout;
    /**
     * A map linking the name of the layout to the actual context. We need this when we need
     * to access current content.
     *
     * @type {?}
     */
    MetaLayout.prototype.contextMap;
    /**
     * Current context being rendered
     * @type {?}
     */
    MetaLayout.prototype.layoutContext;
    /** @type {?} */
    MetaLayout.prototype._metaContext;
    /** @type {?} */
    MetaLayout.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1sYXlvdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJsYXlvdXQvbWV0YS1sYXlvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFtQkEsT0FBTyxFQUFDLE1BQU0sRUFBZSxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBSXhELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUFXdEM7Ozs7Ozs7QUFBQTtJQUFnQyxzQ0FBaUI7SUEyQzdDLG9CQUFzQixZQUFrQyxFQUFTLEdBQWdCO1FBQWpGLFlBRUksa0JBQU0sR0FBRyxFQUFFLFlBQVksQ0FBQyxTQUUzQjtRQUpxQixrQkFBWSxHQUFaLFlBQVksQ0FBc0I7UUFBUyxTQUFHLEdBQUgsR0FBRyxDQUFhOzs7Ozs2QkFoQjFCLElBQUksR0FBRyxFQUEwQjs7Ozs7OzJCQU9wRCxJQUFJLEdBQUcsRUFBbUI7O0tBYTdEO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsb0NBQWU7Ozs7OztJQUFmLFVBQWdCLFVBQWU7UUFFM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBRWpGO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gscUNBQWdCOzs7Ozs7SUFBaEIsVUFBaUIsVUFBZTtRQUU1QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ25EO0lBR0Qsc0JBQUkscUNBQWE7Ozs7UUFBakI7WUFFSSxNQUFNLENBQUMsSUFB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QVcsRUFBRSxRQUFvQjtRQUFwQix5QkFBQSxFQUFBLGVBQW9CO1FBRXhDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0tBRTVGOzs7OztJQUVELGdDQUFXOzs7O0lBQVgsVUFBWSxJQUFZO1FBRXBCLHFCQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLHVEQUF1RCxDQUFDLENBQUM7UUFFcEYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNoQzs7OztJQUdELGdDQUFXOzs7SUFBWDtRQUVJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7S0FDMUI7cUJBN01MO0VBbUNnQyxpQkFBaUIsRUEyS2hELENBQUE7Ozs7Ozs7O0FBM0tELHNCQTJLQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHthc3NlcnQsIEVudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtNZXRhQmFzZUNvbXBvbmVudH0gZnJvbSAnLi9tZXRhLmJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7SXRlbVByb3BlcnRpZXN9IGZyb20gJy4uL2NvcmUvaXRlbS1wcm9wZXJ0aWVzJztcbmltcG9ydCB7UHJvcGVydHlNYXB9IGZyb20gJy4uL2NvcmUvbWV0YSc7XG5pbXBvcnQge01ldGFDb250ZXh0Q29tcG9uZW50fSBmcm9tICcuLi9jb3JlL21ldGEtY29udGV4dC9tZXRhLWNvbnRleHQuY29tcG9uZW50JztcbmltcG9ydCB7VUlNZXRhfSBmcm9tICcuLi9jb3JlL3VpbWV0YSc7XG5pbXBvcnQge0NvbnRleHR9IGZyb20gJy4uL2NvcmUvY29udGV4dCc7XG5pbXBvcnQge09uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogTWV0YUxheW91dCByZXByZXNlbnQgYSBoaWdoIGxldmVsIHJ1bGUgdGhhdCBhZ2dyZWdhdGVzIGRlZmluZWQgbGF5b3V0LiBXaGVuIHdlIGl0ZXJhdGUgdGhydSB0aGVcbiAqIGRpZmZlcmVudCBsYXlvdXQgd2UgbmVlZCB0byByZW1lbWJlciBib3RoIGN1cnJlbnQgcmVuZGVyZWQgY29udGV4dCBhcyB3ZWxsIGFzIEl0ZW1Qcm9wZXJ0aWVzLlxuICpcbiAqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgTWV0YUxheW91dCBleHRlbmRzIE1ldGFCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95XG57XG4gICAgLyoqXG4gICAgICogTGlzdCBhbGwgYXZhaWxhYmxlIExheW91dHMgZGVmaW5lcyBmb3IgY3VycmVudCBDb250ZXh0XG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9hbGxMYXlvdXRzOiBJdGVtUHJvcGVydGllc1tdO1xuXG4gICAgLyoqXG4gICAgICogTGF5b3V0IHNvcnRlZCBieSB6b25lcy4gRWFjaCBpbXBsZW1lbnRhdGlvbiBjYW4gc3VwcG9ydCBkaWZmZXJlbnQgem9uZXMuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9sYXlvdXRzQnlab25lczogTWFwPHN0cmluZywgYW55PjtcblxuICAgIC8qKlxuICAgICAqIENvbnRleHQgcHJvcGVydGllcyBmb3IgY3VycmVudCBhY3RpdmUgcmVuZGVyZWQgbGF5b3V0XG4gICAgICpcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX3Byb3BlcnR5TWFwOiBQcm9wZXJ0eU1hcDtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgTGF5b3V0IGJlaW5nIHJlbmRlcmVkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9sYXlvdXQ6IEl0ZW1Qcm9wZXJ0aWVzO1xuXG4gICAgLyoqXG4gICAgICogTGF5b3V0IGRlZmluaXRpb25zIGJ5IGl0cyBuYW1lXG4gICAgICpcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgbmFtZVRvTGF5b3V0OiBNYXAgPHN0cmluZywgSXRlbVByb3BlcnRpZXM+ID0gbmV3IE1hcDxzdHJpbmcsIEl0ZW1Qcm9wZXJ0aWVzPigpO1xuXG4gICAgLyoqXG4gICAgICogQSBtYXAgbGlua2luZyB0aGUgbmFtZSBvZiB0aGUgbGF5b3V0IHRvIHRoZSBhY3R1YWwgY29udGV4dC4gV2UgbmVlZCB0aGlzIHdoZW4gd2UgbmVlZFxuICAgICAqIHRvIGFjY2VzcyBjdXJyZW50IGNvbnRlbnQuXG4gICAgICpcbiAgICAgKi9cbiAgICBjb250ZXh0TWFwOiBNYXAgPHN0cmluZywgQ29udGV4dD4gPSBuZXcgTWFwPHN0cmluZywgQ29udGV4dD4oKTtcblxuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBjb250ZXh0IGJlaW5nIHJlbmRlcmVkXG4gICAgICovXG4gICAgbGF5b3V0Q29udGV4dDogQ29udGV4dDtcblxuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9tZXRhQ29udGV4dDogTWV0YUNvbnRleHRDb21wb25lbnQsIHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBfbWV0YUNvbnRleHQpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FuIGJlIGNhbGxlZCBieSBtLWNvbnRlbnQgdG8gQE91dHB1dCB3aGVuIGNvbnRleHQgcHJvcGVydGllcyBhcmUgcHVzaGVkIHRvIHN0YWNrXG4gICAgICpcbiAgICAgKi9cbiAgICBhZnRlckNvbnRleHRTZXQobGF5b3V0TmFtZTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5sYXlvdXRDb250ZXh0ID0gdGhpcy5hY3RpdmVDb250ZXh0O1xuICAgICAgICB0aGlzLmNvbnRleHRNYXAuc2V0KGxheW91dE5hbWUsIHRoaXMubGF5b3V0Q29udGV4dC5zbmFwc2hvdCgpLmh5ZHJhdGUoZmFsc2UpKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbiBiZSBjYWxsZWQgYnkgbS1jb250ZW50IHRvIEBPdXRwdXQgYWZ0ZXIgY29udGV4dCBwcm9wZXJ0aWVzIGFyZSBwdXNoZWQgdG8gc3RhY2tcbiAgICAgKlxuICAgICAqL1xuICAgIGJlZm9yZUNvbnRleHRTZXQobGF5b3V0TmFtZTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5sYXlvdXQgPSB0aGlzLm5hbWVUb0xheW91dC5nZXQobGF5b3V0TmFtZSk7XG4gICAgfVxuXG5cbiAgICBnZXQgYWN0aXZlQ29udGV4dCgpOiBDb250ZXh0XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YUNvbnRleHQuYWN0aXZlQ29udGV4dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyBhbGwgYXZhaWxhYmxlIGFuZCBhY3RpdmUgbGF5b3V0cyBmb3Igem9uZXMgZGVmaW5lZCBieSBzdWJjbGFzc2VzXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXQgYWxsTGF5b3V0cygpOiBJdGVtUHJvcGVydGllc1tdXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9hbGxMYXlvdXRzKSkge1xuICAgICAgICAgICAgbGV0IG1ldGE6IFVJTWV0YSA9IDxVSU1ldGE+IHRoaXMuYWN0aXZlQ29udGV4dC5tZXRhO1xuICAgICAgICAgICAgdGhpcy5fYWxsTGF5b3V0cyA9IG1ldGEuaXRlbUxpc3QodGhpcy5hY3RpdmVDb250ZXh0LCBVSU1ldGEuS2V5TGF5b3V0LCB0aGlzLnpvbmVzKCkpO1xuICAgICAgICAgICAgdGhpcy5uYW1lVG9MYXlvdXQuY2xlYXIoKTtcblxuICAgICAgICAgICAgdGhpcy5fYWxsTGF5b3V0cy5mb3JFYWNoKChpdGVtOiBJdGVtUHJvcGVydGllcykgPT5cbiAgICAgICAgICAgICAgICB0aGlzLm5hbWVUb0xheW91dC5zZXQoaXRlbS5uYW1lLCBpdGVtKSk7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fYWxsTGF5b3V0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgYWxsIGF2YWlsYWJsZSBhbmQgYWN0aXZlIGxheW91dHMgYW5kIGFnZ3JlZ2F0ZSB0aGVtIHRoZWlyIG5hbWVcbiAgICAgKlxuICAgICAqL1xuICAgIGdldCBsYXlvdXRzQnlab25lcygpOiBNYXA8c3RyaW5nLCBhbnk+XG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9sYXlvdXRzQnlab25lcykpIHtcbiAgICAgICAgICAgIGxldCBtZXRhOiBVSU1ldGEgPSA8VUlNZXRhPiB0aGlzLmFjdGl2ZUNvbnRleHQubWV0YTtcbiAgICAgICAgICAgIHRoaXMuX2xheW91dHNCeVpvbmVzID0gbWV0YS5pdGVtc0J5Wm9uZXModGhpcy5hY3RpdmVDb250ZXh0LCBVSU1ldGEuS2V5TGF5b3V0LFxuICAgICAgICAgICAgICAgIHRoaXMuem9uZXMoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheW91dHNCeVpvbmVzO1xuICAgIH1cblxuXG4gICAgZ2V0IGxheW91dCgpOiBJdGVtUHJvcGVydGllc1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheW91dDtcbiAgICB9XG5cbiAgICBzZXQgbGF5b3V0KHZhbHVlOiBJdGVtUHJvcGVydGllcylcbiAgICB7XG4gICAgICAgIHRoaXMuX2xheW91dCA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9wcm9wZXJ0eU1hcCA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gdG9kbzogc2hvdWxkIHRoaXMgYmUgZm9yIGN1cnJlbnQgbGF5b3V0P1xuICAgIGdldCBwcm9wZXJ0eU1hcCgpOiBQcm9wZXJ0eU1hcFxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fcHJvcGVydHlNYXApKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUNvbnRleHQucHVzaCgpO1xuICAgICAgICAgICAgdGhpcy5fcHJvcGVydHlNYXAgPSB0aGlzLmFjdGl2ZUNvbnRleHQuYWxsUHJvcGVydGllcygpO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVDb250ZXh0LnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0eU1hcDtcbiAgICB9XG5cblxuICAgIGxhYmVsKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlQ29udGV4dC5yZXNvbHZlVmFsdWUodGhpcy5wcm9wZXJ0eU1hcC5nZXQoVUlNZXRhLktleUxhYmVsKSk7XG4gICAgfVxuXG5cbiAgICBsYWJlbEZvckNvbnRleHQobmFtZTogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICBsZXQgY29udGV4dDogQ29udGV4dCA9IHRoaXMuY29udGV4dE1hcC5nZXQobmFtZSk7XG4gICAgICAgIHJldHVybiBzdXBlci5hUHJvcGVydGllcyhjb250ZXh0LCBVSU1ldGEuS2V5TGFiZWwpO1xuICAgIH1cblxuICAgIHpvbmVzKCk6IHN0cmluZ1tdXG4gICAge1xuICAgICAgICByZXR1cm4gVUlNZXRhLlpvbmVzVExSTUI7XG4gICAgfVxuXG5cbiAgICAvLyByZW1vdmUgdGhpcyB1Z2x5IHNvbHV0aW9uIG9uY2UgSSBmaWd1cmUgb3V0IGN1c3RvbSB2YWx1ZSBhY2Nlc3NvclxuICAgIHByb3BlcnRpZXMoa2V5OiBzdHJpbmcsIGRlZlZhbHVlOiBhbnkgPSBudWxsKTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuYWN0aXZlQ29udGV4dCkgPyB0aGlzLmFjdGl2ZUNvbnRleHQucHJvcGVydHlGb3JLZXkoa2V5KSA6IGRlZlZhbHVlO1xuXG4gICAgfVxuXG4gICAgZGVidWdTdHJpbmcobmFtZTogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMuY29udGV4dE1hcC5nZXQobmFtZSk7XG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQoY29udGV4dCksICdUcnlpbmcgdG8gcmV0cml2ZSBkZWJ1Z1N0cmluZyBvbiBub24tZXhpc3RpbmcgY29udGV4dCcpO1xuXG4gICAgICAgIHJldHVybiBjb250ZXh0LmRlYnVnU3RyaW5nKCk7XG4gICAgfVxuXG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmxheW91dENvbnRleHQgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRleHRNYXAuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5jb250ZXh0TWFwID0gbnVsbDtcbiAgICB9XG59XG4iXX0=