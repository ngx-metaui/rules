/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { assert, isPresent } from '@aribaui/core';
import { BaseFormComponent } from '@aribaui/components';
import { UIMeta } from '../core/uimeta';
import { ObjectMeta } from '../core/object-meta';
/**
 * Common component to setup the context and also create context snapshot for later user.
 * @abstract
 */
var /**
 * Common component to setup the context and also create context snapshot for later user.
 * @abstract
 */
MetaBaseComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MetaBaseComponent, _super);
    function MetaBaseComponent(env, _metaContext) {
        var _this = _super.call(this, env, _metaContext) || this;
        _this.env = env;
        _this._metaContext = _metaContext;
        return _this;
    }
    /**
     * @return {?}
     */
    MetaBaseComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        this.updateMeta();
    };
    /**
     * @return {?}
     */
    MetaBaseComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        this.updateMeta();
    };
    /**
     * @return {?}
     */
    MetaBaseComponent.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    MetaBaseComponent.prototype.updateMeta = /**
     * @return {?}
     */
    function () {
        this.editing = this.context.booleanPropertyForKey(UIMeta.KeyEditing, false);
        if (this.editing) {
            this.object = this.context.values.get(ObjectMeta.KeyObject);
            this.contextSnapshot = this.context.snapshot();
        }
        this.doUpdate();
    };
    /**
     * Placeholder to be implemented by subclass. this method is triggered when we detect any
     * changes on the MetaContext
     */
    /**
     * Placeholder to be implemented by subclass. this method is triggered when we detect any
     * changes on the MetaContext
     * @return {?}
     */
    MetaBaseComponent.prototype.doUpdate = /**
     * Placeholder to be implemented by subclass. this method is triggered when we detect any
     * changes on the MetaContext
     * @return {?}
     */
    function () {
    };
    Object.defineProperty(MetaBaseComponent.prototype, "context", {
        /**
         * Get the last saved context from the MetaContext component
         *
         */
        get: /**
         * Get the last saved context from the MetaContext component
         *
         * @return {?}
         */
        function () {
            if (isPresent(this._metaContext) && isPresent(this._metaContext.myContext())) {
                return this._metaContext.myContext();
            }
            assert(false, 'Should always have metaContext available');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MetaBaseComponent.prototype.isNestedContext = /**
     * @return {?}
     */
    function () {
        return this.context.isNested;
    };
    // remove this ugly solution once I figure out custom value accessor that I can
    // provide as a expression
    /**
     * @param {?} key
     * @param {?=} defValue
     * @return {?}
     */
    MetaBaseComponent.prototype.properties = /**
     * @param {?} key
     * @param {?=} defValue
     * @return {?}
     */
    function (key, defValue) {
        if (defValue === void 0) { defValue = null; }
        return isPresent(this.context) ? (isPresent(this.context.propertyForKey(key)) ?
            this.context.propertyForKey(key) : defValue) : defValue;
    };
    /**
     * Retrieves active context's properties
     *
     */
    /**
     * Retrieves active context's properties
     *
     * @param {?} me
     * @param {?} key
     * @param {?=} defValue
     * @return {?}
     */
    MetaBaseComponent.prototype.aProperties = /**
     * Retrieves active context's properties
     *
     * @param {?} me
     * @param {?} key
     * @param {?=} defValue
     * @return {?}
     */
    function (me, key, defValue) {
        if (defValue === void 0) { defValue = null; }
        /** @type {?} */
        var activeContext = this._metaContext.activeContext();
        return isPresent(me) ? me.propertyForKey(key) : defValue;
    };
    return MetaBaseComponent;
}(BaseFormComponent));
/**
 * Common component to setup the context and also create context snapshot for later user.
 * @abstract
 */
export { MetaBaseComponent };
if (false) {
    /** @type {?} */
    MetaBaseComponent.prototype.editing;
    /**
     * Need to capture current snapshot for edit operation as when we enter editing mode and user
     * start to change values the detection loop runs out of any push/pop cycle and any order and I
     * could not find a way how to detect consistent behavior where root compoennt start ngDoCheck,
     * child component trigger ngDoCheck, child finishes, root finishes.
     *
     * This only works when view is first time rendered, but not when making changes
     *
     * @type {?}
     */
    MetaBaseComponent.prototype.contextSnapshot;
    /** @type {?} */
    MetaBaseComponent.prototype.object;
    /** @type {?} */
    MetaBaseComponent.prototype.env;
    /** @type {?} */
    MetaBaseComponent.prototype._metaContext;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS5iYXNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImxheW91dC9tZXRhLmJhc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBbUJBLE9BQU8sRUFBQyxNQUFNLEVBQWUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBR3RELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBTS9DOzs7O0FBQUE7SUFBZ0QsNkNBQWlCO0lBZ0I3RCwyQkFBbUIsR0FBZ0IsRUFDYixZQUFrQztRQUR4RCxZQUdJLGtCQUFNLEdBQUcsRUFBRSxZQUFZLENBQUMsU0FDM0I7UUFKa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTtRQUNiLGtCQUFZLEdBQVosWUFBWSxDQUFzQjs7S0FHdkQ7Ozs7SUFFRCxvQ0FBUTs7O0lBQVI7UUFFSSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDckI7Ozs7SUFHRCxxQ0FBUzs7O0lBQVQ7UUFFSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7S0FFckI7Ozs7SUFFRCw4Q0FBa0I7OztJQUFsQjtLQUVDOzs7O0lBR1Msc0NBQVU7OztJQUFwQjtRQUVJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNsRDtRQUNELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNuQjtJQUdEOzs7T0FHRzs7Ozs7O0lBQ08sb0NBQVE7Ozs7O0lBQWxCO0tBRUM7SUFPRCxzQkFBYyxzQ0FBTztRQUpyQjs7O1dBR0c7Ozs7OztRQUNIO1lBRUksRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0UsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDeEM7WUFFRCxNQUFNLENBQUMsS0FBSyxFQUFFLDBDQUEwQyxDQUFDLENBQUM7U0FDN0Q7OztPQUFBOzs7O0lBR0QsMkNBQWU7OztJQUFmO1FBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO0tBQ2hDO0lBRUQsK0VBQStFO0lBQy9FLDBCQUEwQjs7Ozs7O0lBQzFCLHNDQUFVOzs7OztJQUFWLFVBQVcsR0FBVyxFQUFFLFFBQW9CO1FBQXBCLHlCQUFBLEVBQUEsZUFBb0I7UUFFeEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztLQUUvRDtJQUdEOzs7T0FHRzs7Ozs7Ozs7O0lBQ0gsdUNBQVc7Ozs7Ozs7O0lBQVgsVUFBWSxFQUFXLEVBQUUsR0FBVyxFQUFFLFFBQW9CO1FBQXBCLHlCQUFBLEVBQUEsZUFBb0I7O1FBRXRELElBQUksYUFBYSxHQUFZLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDL0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0tBRTVEOzRCQWhJTDtFQThCZ0QsaUJBQWlCLEVBcUdoRSxDQUFBOzs7OztBQXJHRCw2QkFxR0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICovXG5pbXBvcnQge0FmdGVyVmlld0NoZWNrZWR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHthc3NlcnQsIEVudmlyb25tZW50LCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlRm9ybUNvbXBvbmVudH0gZnJvbSAnQGFyaWJhdWkvY29tcG9uZW50cyc7XG5pbXBvcnQge01ldGFDb250ZXh0Q29tcG9uZW50fSBmcm9tICcuLi9jb3JlL21ldGEtY29udGV4dC9tZXRhLWNvbnRleHQuY29tcG9uZW50JztcbmltcG9ydCB7Q29udGV4dCwgU25hcHNob3R9IGZyb20gJy4uL2NvcmUvY29udGV4dCc7XG5pbXBvcnQge1VJTWV0YX0gZnJvbSAnLi4vY29yZS91aW1ldGEnO1xuaW1wb3J0IHtPYmplY3RNZXRhfSBmcm9tICcuLi9jb3JlL29iamVjdC1tZXRhJztcblxuXG4vKipcbiAqIENvbW1vbiBjb21wb25lbnQgdG8gc2V0dXAgdGhlIGNvbnRleHQgYW5kIGFsc28gY3JlYXRlIGNvbnRleHQgc25hcHNob3QgZm9yIGxhdGVyIHVzZXIuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNZXRhQmFzZUNvbXBvbmVudCBleHRlbmRzIEJhc2VGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZFxue1xuICAgIGVkaXRpbmc6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBOZWVkIHRvIGNhcHR1cmUgY3VycmVudCBzbmFwc2hvdCBmb3IgZWRpdCBvcGVyYXRpb24gYXMgd2hlbiB3ZSBlbnRlciBlZGl0aW5nIG1vZGUgYW5kIHVzZXJcbiAgICAgKiBzdGFydCB0byBjaGFuZ2UgdmFsdWVzIHRoZSBkZXRlY3Rpb24gbG9vcCBydW5zIG91dCBvZiBhbnkgcHVzaC9wb3AgY3ljbGUgYW5kIGFueSBvcmRlciBhbmQgSVxuICAgICAqIGNvdWxkIG5vdCBmaW5kIGEgd2F5IGhvdyB0byBkZXRlY3QgY29uc2lzdGVudCBiZWhhdmlvciB3aGVyZSByb290IGNvbXBvZW5udCBzdGFydCBuZ0RvQ2hlY2ssXG4gICAgICogY2hpbGQgY29tcG9uZW50IHRyaWdnZXIgbmdEb0NoZWNrLCBjaGlsZCBmaW5pc2hlcywgcm9vdCBmaW5pc2hlcy5cbiAgICAgKlxuICAgICAqIFRoaXMgb25seSB3b3JrcyB3aGVuIHZpZXcgaXMgZmlyc3QgdGltZSByZW5kZXJlZCwgYnV0IG5vdCB3aGVuIG1ha2luZyBjaGFuZ2VzXG4gICAgICpcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgY29udGV4dFNuYXBzaG90OiBTbmFwc2hvdDtcbiAgICBwcm90ZWN0ZWQgb2JqZWN0OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgX21ldGFDb250ZXh0OiBNZXRhQ29udGV4dENvbXBvbmVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgX21ldGFDb250ZXh0KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1ldGEoKTtcbiAgICB9XG5cblxuICAgIG5nRG9DaGVjaygpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnVwZGF0ZU1ldGEoKTtcblxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkXG4gICAge1xuICAgIH1cblxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU1ldGEoKVxuICAgIHtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gdGhpcy5jb250ZXh0LmJvb2xlYW5Qcm9wZXJ0eUZvcktleShVSU1ldGEuS2V5RWRpdGluZywgZmFsc2UpO1xuICAgICAgICBpZiAodGhpcy5lZGl0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLm9iamVjdCA9IHRoaXMuY29udGV4dC52YWx1ZXMuZ2V0KE9iamVjdE1ldGEuS2V5T2JqZWN0KTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dFNuYXBzaG90ID0gdGhpcy5jb250ZXh0LnNuYXBzaG90KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kb1VwZGF0ZSgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUGxhY2Vob2xkZXIgdG8gYmUgaW1wbGVtZW50ZWQgYnkgc3ViY2xhc3MuIHRoaXMgbWV0aG9kIGlzIHRyaWdnZXJlZCB3aGVuIHdlIGRldGVjdCBhbnlcbiAgICAgKiBjaGFuZ2VzIG9uIHRoZSBNZXRhQ29udGV4dFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBkb1VwZGF0ZSgpOiB2b2lkXG4gICAge1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBsYXN0IHNhdmVkIGNvbnRleHQgZnJvbSB0aGUgTWV0YUNvbnRleHQgY29tcG9uZW50XG4gICAgICpcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0IGNvbnRleHQoKTogQ29udGV4dFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLl9tZXRhQ29udGV4dCkgJiYgaXNQcmVzZW50KHRoaXMuX21ldGFDb250ZXh0Lm15Q29udGV4dCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFDb250ZXh0Lm15Q29udGV4dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXNzZXJ0KGZhbHNlLCAnU2hvdWxkIGFsd2F5cyBoYXZlIG1ldGFDb250ZXh0IGF2YWlsYWJsZScpO1xuICAgIH1cblxuXG4gICAgaXNOZXN0ZWRDb250ZXh0KCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuaXNOZXN0ZWQ7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIHRoaXMgdWdseSBzb2x1dGlvbiBvbmNlIEkgZmlndXJlIG91dCBjdXN0b20gdmFsdWUgYWNjZXNzb3IgdGhhdCBJIGNhblxuICAgIC8vIHByb3ZpZGUgYXMgYSBleHByZXNzaW9uXG4gICAgcHJvcGVydGllcyhrZXk6IHN0cmluZywgZGVmVmFsdWU6IGFueSA9IG51bGwpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5jb250ZXh0KSA/IChpc1ByZXNlbnQodGhpcy5jb250ZXh0LnByb3BlcnR5Rm9yS2V5KGtleSkpID9cbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5wcm9wZXJ0eUZvcktleShrZXkpIDogZGVmVmFsdWUpIDogZGVmVmFsdWU7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyBhY3RpdmUgY29udGV4dCdzIHByb3BlcnRpZXNcbiAgICAgKlxuICAgICAqL1xuICAgIGFQcm9wZXJ0aWVzKG1lOiBDb250ZXh0LCBrZXk6IHN0cmluZywgZGVmVmFsdWU6IGFueSA9IG51bGwpOiBhbnlcbiAgICB7XG4gICAgICAgIGxldCBhY3RpdmVDb250ZXh0OiBDb250ZXh0ID0gdGhpcy5fbWV0YUNvbnRleHQuYWN0aXZlQ29udGV4dCgpO1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KG1lKSA/IG1lLnByb3BlcnR5Rm9yS2V5KGtleSkgOiBkZWZWYWx1ZTtcblxuICAgIH1cblxuXG59XG5cbiJdfQ==