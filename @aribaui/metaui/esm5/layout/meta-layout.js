/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                /** @type {?} */
                var meta = /** @type {?} */ (this.activeContext.meta);
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
                /** @type {?} */
                var meta = /** @type {?} */ (this.activeContext.meta);
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
        /** @type {?} */
        var context = this.contextMap.get(name);
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
        /** @type {?} */
        var context = this.contextMap.get(name);
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
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1sYXlvdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJsYXlvdXQvbWV0YS1sYXlvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFtQkEsT0FBTyxFQUFDLE1BQU0sRUFBZSxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBSXhELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUFXdEM7Ozs7Ozs7QUFBQTtJQUFnQyxzQ0FBaUI7SUEyQzdDLG9CQUFzQixZQUFrQyxFQUFTLEdBQWdCO1FBQWpGLFlBRUksa0JBQU0sR0FBRyxFQUFFLFlBQVksQ0FBQyxTQUUzQjtRQUpxQixrQkFBWSxHQUFaLFlBQVksQ0FBc0I7UUFBUyxTQUFHLEdBQUgsR0FBRyxDQUFhOzs7Ozs2QkFoQjFCLElBQUksR0FBRyxFQUEwQjs7Ozs7OzJCQU9wRCxJQUFJLEdBQUcsRUFBbUI7O0tBYTdEO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsb0NBQWU7Ozs7OztJQUFmLFVBQWdCLFVBQWU7UUFFM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBRWpGO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gscUNBQWdCOzs7Ozs7SUFBaEIsVUFBaUIsVUFBZTtRQUU1QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ25EO0lBR0Qsc0JBQUkscUNBQWE7Ozs7UUFBakI7WUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUM1Qzs7O09BQUE7SUFNRCxzQkFBSSxrQ0FBVTtRQUpkOzs7V0FHRzs7Ozs7O1FBQ0g7WUFBQSxpQkFZQztZQVZHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFDNUIsSUFBSSxJQUFJLHFCQUFvQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBQztnQkFDcEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDckYsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFFMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFvQjtvQkFDMUMsT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztnQkFBdEMsQ0FBc0MsQ0FBQyxDQUFDO2FBRS9DO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDM0I7OztPQUFBO0lBTUQsc0JBQUksc0NBQWM7UUFKbEI7OztXQUdHOzs7Ozs7UUFDSDtZQUVJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFDaEMsSUFBSSxJQUFJLHFCQUFvQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBQztnQkFDcEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFDekUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7YUFDckI7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUMvQjs7O09BQUE7SUFHRCxzQkFBSSw4QkFBTTs7OztRQUFWO1lBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDdkI7Ozs7O1FBRUQsVUFBVyxLQUFxQjtZQUU1QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUM1Qjs7O09BTkE7SUFTRCxzQkFBSSxtQ0FBVztRQURmLDJDQUEyQzs7OztRQUMzQztZQUVJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDNUI7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUM1Qjs7O09BQUE7Ozs7SUFHRCwwQkFBSzs7O0lBQUw7UUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7S0FDakY7Ozs7O0lBR0Qsb0NBQWU7Ozs7SUFBZixVQUFnQixJQUFZOztRQUV4QixJQUFJLE9BQU8sR0FBWSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsaUJBQU0sV0FBVyxZQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDdEQ7Ozs7SUFFRCwwQkFBSzs7O0lBQUw7UUFFSSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztLQUM1QjtJQUdELG9FQUFvRTs7Ozs7O0lBQ3BFLCtCQUFVOzs7OztJQUFWLFVBQVcsR0FBVyxFQUFFLFFBQW9CO1FBQXBCLHlCQUFBLEVBQUEsZUFBb0I7UUFFeEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7S0FFNUY7Ozs7O0lBRUQsZ0NBQVc7Ozs7SUFBWCxVQUFZLElBQVk7O1FBRXBCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsdURBQXVELENBQUMsQ0FBQztRQUVwRixNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ2hDOzs7O0lBR0QsZ0NBQVc7OztJQUFYO1FBRUksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztLQUMxQjtxQkE3TUw7RUFtQ2dDLGlCQUFpQixFQTJLaEQsQ0FBQTs7Ozs7Ozs7QUEzS0Qsc0JBMktDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQmFzZWQgb24gb3JpZ2luYWwgd29yazogTWV0YVVJOiBDcmFpZyBGZWRlcmlnaGkgKDIwMDgpXG4gKlxuICovXG5pbXBvcnQge2Fzc2VydCwgRW52aXJvbm1lbnQsIGlzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge01ldGFCYXNlQ29tcG9uZW50fSBmcm9tICcuL21ldGEuYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHtJdGVtUHJvcGVydGllc30gZnJvbSAnLi4vY29yZS9pdGVtLXByb3BlcnRpZXMnO1xuaW1wb3J0IHtQcm9wZXJ0eU1hcH0gZnJvbSAnLi4vY29yZS9tZXRhJztcbmltcG9ydCB7TWV0YUNvbnRleHRDb21wb25lbnR9IGZyb20gJy4uL2NvcmUvbWV0YS1jb250ZXh0L21ldGEtY29udGV4dC5jb21wb25lbnQnO1xuaW1wb3J0IHtVSU1ldGF9IGZyb20gJy4uL2NvcmUvdWltZXRhJztcbmltcG9ydCB7Q29udGV4dH0gZnJvbSAnLi4vY29yZS9jb250ZXh0JztcbmltcG9ydCB7T25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBNZXRhTGF5b3V0IHJlcHJlc2VudCBhIGhpZ2ggbGV2ZWwgcnVsZSB0aGF0IGFnZ3JlZ2F0ZXMgZGVmaW5lZCBsYXlvdXQuIFdoZW4gd2UgaXRlcmF0ZSB0aHJ1IHRoZVxuICogZGlmZmVyZW50IGxheW91dCB3ZSBuZWVkIHRvIHJlbWVtYmVyIGJvdGggY3VycmVudCByZW5kZXJlZCBjb250ZXh0IGFzIHdlbGwgYXMgSXRlbVByb3BlcnRpZXMuXG4gKlxuICpcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBNZXRhTGF5b3V0IGV4dGVuZHMgTWV0YUJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3lcbntcbiAgICAvKipcbiAgICAgKiBMaXN0IGFsbCBhdmFpbGFibGUgTGF5b3V0cyBkZWZpbmVzIGZvciBjdXJyZW50IENvbnRleHRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX2FsbExheW91dHM6IEl0ZW1Qcm9wZXJ0aWVzW107XG5cbiAgICAvKipcbiAgICAgKiBMYXlvdXQgc29ydGVkIGJ5IHpvbmVzLiBFYWNoIGltcGxlbWVudGF0aW9uIGNhbiBzdXBwb3J0IGRpZmZlcmVudCB6b25lcy5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX2xheW91dHNCeVpvbmVzOiBNYXA8c3RyaW5nLCBhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQ29udGV4dCBwcm9wZXJ0aWVzIGZvciBjdXJyZW50IGFjdGl2ZSByZW5kZXJlZCBsYXlvdXRcbiAgICAgKlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfcHJvcGVydHlNYXA6IFByb3BlcnR5TWFwO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBMYXlvdXQgYmVpbmcgcmVuZGVyZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX2xheW91dDogSXRlbVByb3BlcnRpZXM7XG5cbiAgICAvKipcbiAgICAgKiBMYXlvdXQgZGVmaW5pdGlvbnMgYnkgaXRzIG5hbWVcbiAgICAgKlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBuYW1lVG9MYXlvdXQ6IE1hcCA8c3RyaW5nLCBJdGVtUHJvcGVydGllcz4gPSBuZXcgTWFwPHN0cmluZywgSXRlbVByb3BlcnRpZXM+KCk7XG5cbiAgICAvKipcbiAgICAgKiBBIG1hcCBsaW5raW5nIHRoZSBuYW1lIG9mIHRoZSBsYXlvdXQgdG8gdGhlIGFjdHVhbCBjb250ZXh0LiBXZSBuZWVkIHRoaXMgd2hlbiB3ZSBuZWVkXG4gICAgICogdG8gYWNjZXNzIGN1cnJlbnQgY29udGVudC5cbiAgICAgKlxuICAgICAqL1xuICAgIGNvbnRleHRNYXA6IE1hcCA8c3RyaW5nLCBDb250ZXh0PiA9IG5ldyBNYXA8c3RyaW5nLCBDb250ZXh0PigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGNvbnRleHQgYmVpbmcgcmVuZGVyZWRcbiAgICAgKi9cbiAgICBsYXlvdXRDb250ZXh0OiBDb250ZXh0O1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX21ldGFDb250ZXh0OiBNZXRhQ29udGV4dENvbXBvbmVudCwgcHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIF9tZXRhQ29udGV4dCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYW4gYmUgY2FsbGVkIGJ5IG0tY29udGVudCB0byBAT3V0cHV0IHdoZW4gY29udGV4dCBwcm9wZXJ0aWVzIGFyZSBwdXNoZWQgdG8gc3RhY2tcbiAgICAgKlxuICAgICAqL1xuICAgIGFmdGVyQ29udGV4dFNldChsYXlvdXROYW1lOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmxheW91dENvbnRleHQgPSB0aGlzLmFjdGl2ZUNvbnRleHQ7XG4gICAgICAgIHRoaXMuY29udGV4dE1hcC5zZXQobGF5b3V0TmFtZSwgdGhpcy5sYXlvdXRDb250ZXh0LnNuYXBzaG90KCkuaHlkcmF0ZShmYWxzZSkpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FuIGJlIGNhbGxlZCBieSBtLWNvbnRlbnQgdG8gQE91dHB1dCBhZnRlciBjb250ZXh0IHByb3BlcnRpZXMgYXJlIHB1c2hlZCB0byBzdGFja1xuICAgICAqXG4gICAgICovXG4gICAgYmVmb3JlQ29udGV4dFNldChsYXlvdXROYW1lOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmxheW91dCA9IHRoaXMubmFtZVRvTGF5b3V0LmdldChsYXlvdXROYW1lKTtcbiAgICB9XG5cblxuICAgIGdldCBhY3RpdmVDb250ZXh0KCk6IENvbnRleHRcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhQ29udGV4dC5hY3RpdmVDb250ZXh0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIGFsbCBhdmFpbGFibGUgYW5kIGFjdGl2ZSBsYXlvdXRzIGZvciB6b25lcyBkZWZpbmVkIGJ5IHN1YmNsYXNzZXNcbiAgICAgKlxuICAgICAqL1xuICAgIGdldCBhbGxMYXlvdXRzKCk6IEl0ZW1Qcm9wZXJ0aWVzW11cbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX2FsbExheW91dHMpKSB7XG4gICAgICAgICAgICBsZXQgbWV0YTogVUlNZXRhID0gPFVJTWV0YT4gdGhpcy5hY3RpdmVDb250ZXh0Lm1ldGE7XG4gICAgICAgICAgICB0aGlzLl9hbGxMYXlvdXRzID0gbWV0YS5pdGVtTGlzdCh0aGlzLmFjdGl2ZUNvbnRleHQsIFVJTWV0YS5LZXlMYXlvdXQsIHRoaXMuem9uZXMoKSk7XG4gICAgICAgICAgICB0aGlzLm5hbWVUb0xheW91dC5jbGVhcigpO1xuXG4gICAgICAgICAgICB0aGlzLl9hbGxMYXlvdXRzLmZvckVhY2goKGl0ZW06IEl0ZW1Qcm9wZXJ0aWVzKSA9PlxuICAgICAgICAgICAgICAgIHRoaXMubmFtZVRvTGF5b3V0LnNldChpdGVtLm5hbWUsIGl0ZW0pKTtcblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9hbGxMYXlvdXRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyBhbGwgYXZhaWxhYmxlIGFuZCBhY3RpdmUgbGF5b3V0cyBhbmQgYWdncmVnYXRlIHRoZW0gdGhlaXIgbmFtZVxuICAgICAqXG4gICAgICovXG4gICAgZ2V0IGxheW91dHNCeVpvbmVzKCk6IE1hcDxzdHJpbmcsIGFueT5cbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX2xheW91dHNCeVpvbmVzKSkge1xuICAgICAgICAgICAgbGV0IG1ldGE6IFVJTWV0YSA9IDxVSU1ldGE+IHRoaXMuYWN0aXZlQ29udGV4dC5tZXRhO1xuICAgICAgICAgICAgdGhpcy5fbGF5b3V0c0J5Wm9uZXMgPSBtZXRhLml0ZW1zQnlab25lcyh0aGlzLmFjdGl2ZUNvbnRleHQsIFVJTWV0YS5LZXlMYXlvdXQsXG4gICAgICAgICAgICAgICAgdGhpcy56b25lcygpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbGF5b3V0c0J5Wm9uZXM7XG4gICAgfVxuXG5cbiAgICBnZXQgbGF5b3V0KCk6IEl0ZW1Qcm9wZXJ0aWVzXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGF5b3V0O1xuICAgIH1cblxuICAgIHNldCBsYXlvdXQodmFsdWU6IEl0ZW1Qcm9wZXJ0aWVzKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbGF5b3V0ID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX3Byb3BlcnR5TWFwID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyB0b2RvOiBzaG91bGQgdGhpcyBiZSBmb3IgY3VycmVudCBsYXlvdXQ/XG4gICAgZ2V0IHByb3BlcnR5TWFwKCk6IFByb3BlcnR5TWFwXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9wcm9wZXJ0eU1hcCkpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQ29udGV4dC5wdXNoKCk7XG4gICAgICAgICAgICB0aGlzLl9wcm9wZXJ0eU1hcCA9IHRoaXMuYWN0aXZlQ29udGV4dC5hbGxQcm9wZXJ0aWVzKCk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUNvbnRleHQucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnR5TWFwO1xuICAgIH1cblxuXG4gICAgbGFiZWwoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVDb250ZXh0LnJlc29sdmVWYWx1ZSh0aGlzLnByb3BlcnR5TWFwLmdldChVSU1ldGEuS2V5TGFiZWwpKTtcbiAgICB9XG5cblxuICAgIGxhYmVsRm9yQ29udGV4dChuYW1lOiBzdHJpbmcpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGxldCBjb250ZXh0OiBDb250ZXh0ID0gdGhpcy5jb250ZXh0TWFwLmdldChuYW1lKTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmFQcm9wZXJ0aWVzKGNvbnRleHQsIFVJTWV0YS5LZXlMYWJlbCk7XG4gICAgfVxuXG4gICAgem9uZXMoKTogc3RyaW5nW11cbiAgICB7XG4gICAgICAgIHJldHVybiBVSU1ldGEuWm9uZXNUTFJNQjtcbiAgICB9XG5cblxuICAgIC8vIHJlbW92ZSB0aGlzIHVnbHkgc29sdXRpb24gb25jZSBJIGZpZ3VyZSBvdXQgY3VzdG9tIHZhbHVlIGFjY2Vzc29yXG4gICAgcHJvcGVydGllcyhrZXk6IHN0cmluZywgZGVmVmFsdWU6IGFueSA9IG51bGwpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5hY3RpdmVDb250ZXh0KSA/IHRoaXMuYWN0aXZlQ29udGV4dC5wcm9wZXJ0eUZvcktleShrZXkpIDogZGVmVmFsdWU7XG5cbiAgICB9XG5cbiAgICBkZWJ1Z1N0cmluZyhuYW1lOiBzdHJpbmcpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5jb250ZXh0TWFwLmdldChuYW1lKTtcbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudChjb250ZXh0KSwgJ1RyeWluZyB0byByZXRyaXZlIGRlYnVnU3RyaW5nIG9uIG5vbi1leGlzdGluZyBjb250ZXh0Jyk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRleHQuZGVidWdTdHJpbmcoKTtcbiAgICB9XG5cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMubGF5b3V0Q29udGV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGV4dE1hcC5jbGVhcigpO1xuICAgICAgICB0aGlzLmNvbnRleHRNYXAgPSBudWxsO1xuICAgIH1cbn1cbiJdfQ==