/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export class MetaLayout extends MetaBaseComponent {
    /**
     * @param {?} _metaContext
     * @param {?} env
     */
    constructor(_metaContext, env) {
        super(env, _metaContext);
        this._metaContext = _metaContext;
        this.env = env;
        /**
         * Layout definitions by its name
         *
         */
        this.nameToLayout = new Map();
        /**
         * A map linking the name of the layout to the actual context. We need this when we need
         * to access current content.
         *
         */
        this.contextMap = new Map();
    }
    /**
     * Can be called by m-content to \@Output when context properties are pushed to stack
     *
     * @param {?} layoutName
     * @return {?}
     */
    afterContextSet(layoutName) {
        this.layoutContext = this.activeContext;
        this.contextMap.set(layoutName, this.layoutContext.snapshot().hydrate(false));
    }
    /**
     * Can be called by m-content to \@Output after context properties are pushed to stack
     *
     * @param {?} layoutName
     * @return {?}
     */
    beforeContextSet(layoutName) {
        this.layout = this.nameToLayout.get(layoutName);
    }
    /**
     * @return {?}
     */
    get activeContext() {
        return this._metaContext.activeContext();
    }
    /**
     * Retrieves all available and active layouts for zones defined by subclasses
     *
     * @return {?}
     */
    get allLayouts() {
        if (isBlank(this._allLayouts)) {
            let /** @type {?} */ meta = /** @type {?} */ (this.activeContext.meta);
            this._allLayouts = meta.itemList(this.activeContext, UIMeta.KeyLayout, this.zones());
            this.nameToLayout.clear();
            this._allLayouts.forEach((item) => this.nameToLayout.set(item.name, item));
        }
        return this._allLayouts;
    }
    /**
     * Retrieves all available and active layouts and aggregate them their name
     *
     * @return {?}
     */
    get layoutsByZones() {
        if (isBlank(this._layoutsByZones)) {
            let /** @type {?} */ meta = /** @type {?} */ (this.activeContext.meta);
            this._layoutsByZones = meta.itemsByZones(this.activeContext, UIMeta.KeyLayout, this.zones());
        }
        return this._layoutsByZones;
    }
    /**
     * @return {?}
     */
    get layout() {
        return this._layout;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set layout(value) {
        this._layout = value;
        this._propertyMap = null;
    }
    /**
     * @return {?}
     */
    get propertyMap() {
        if (isBlank(this._propertyMap)) {
            this.activeContext.push();
            this._propertyMap = this.activeContext.allProperties();
            this.activeContext.pop();
        }
        return this._propertyMap;
    }
    /**
     * @return {?}
     */
    label() {
        return this.activeContext.resolveValue(this.propertyMap.get(UIMeta.KeyLabel));
    }
    /**
     * @param {?} name
     * @return {?}
     */
    labelForContext(name) {
        let /** @type {?} */ context = this.contextMap.get(name);
        return super.aProperties(context, UIMeta.KeyLabel);
    }
    /**
     * @return {?}
     */
    zones() {
        return UIMeta.ZonesTLRMB;
    }
    /**
     * @param {?} key
     * @param {?=} defValue
     * @return {?}
     */
    properties(key, defValue = null) {
        return isPresent(this.activeContext) ? this.activeContext.propertyForKey(key) : defValue;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    debugString(name) {
        let /** @type {?} */ context = this.contextMap.get(name);
        assert(isPresent(context), 'Trying to retrive debugString on non-existing context');
        return context.debugString();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.layoutContext = null;
        this.contextMap.clear();
        this.contextMap = null;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1sYXlvdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJsYXlvdXQvbWV0YS1sYXlvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW1CQSxPQUFPLEVBQUMsTUFBTSxFQUFlLE9BQU8sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFJeEQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7OztBQVd0QyxNQUFNLGlCQUFrQixTQUFRLGlCQUFpQjs7Ozs7SUEyQzdDLFlBQXNCLFlBQWtDLEVBQVMsR0FBZ0I7UUFFN0UsS0FBSyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUZQLGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQWE7Ozs7OzRCQWhCMUIsSUFBSSxHQUFHLEVBQTBCOzs7Ozs7MEJBT3BELElBQUksR0FBRyxFQUFtQjtLQWE3RDs7Ozs7OztJQU1ELGVBQWUsQ0FBQyxVQUFlO1FBRTNCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUVqRjs7Ozs7OztJQU1ELGdCQUFnQixDQUFDLFVBQWU7UUFFNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNuRDs7OztJQUdELElBQUksYUFBYTtRQUViLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQzVDOzs7Ozs7SUFNRCxJQUFJLFVBQVU7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QUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsdURBQXVELENBQUMsQ0FBQztRQUVwRixNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ2hDOzs7O0lBR0QsV0FBVztRQUVQLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7S0FDMUI7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHthc3NlcnQsIEVudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtNZXRhQmFzZUNvbXBvbmVudH0gZnJvbSAnLi9tZXRhLmJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7SXRlbVByb3BlcnRpZXN9IGZyb20gJy4uL2NvcmUvaXRlbS1wcm9wZXJ0aWVzJztcbmltcG9ydCB7UHJvcGVydHlNYXB9IGZyb20gJy4uL2NvcmUvbWV0YSc7XG5pbXBvcnQge01ldGFDb250ZXh0Q29tcG9uZW50fSBmcm9tICcuLi9jb3JlL21ldGEtY29udGV4dC9tZXRhLWNvbnRleHQuY29tcG9uZW50JztcbmltcG9ydCB7VUlNZXRhfSBmcm9tICcuLi9jb3JlL3VpbWV0YSc7XG5pbXBvcnQge0NvbnRleHR9IGZyb20gJy4uL2NvcmUvY29udGV4dCc7XG5pbXBvcnQge09uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogTWV0YUxheW91dCByZXByZXNlbnQgYSBoaWdoIGxldmVsIHJ1bGUgdGhhdCBhZ2dyZWdhdGVzIGRlZmluZWQgbGF5b3V0LiBXaGVuIHdlIGl0ZXJhdGUgdGhydSB0aGVcbiAqIGRpZmZlcmVudCBsYXlvdXQgd2UgbmVlZCB0byByZW1lbWJlciBib3RoIGN1cnJlbnQgcmVuZGVyZWQgY29udGV4dCBhcyB3ZWxsIGFzIEl0ZW1Qcm9wZXJ0aWVzLlxuICpcbiAqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgTWV0YUxheW91dCBleHRlbmRzIE1ldGFCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95XG57XG4gICAgLyoqXG4gICAgICogTGlzdCBhbGwgYXZhaWxhYmxlIExheW91dHMgZGVmaW5lcyBmb3IgY3VycmVudCBDb250ZXh0XG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9hbGxMYXlvdXRzOiBJdGVtUHJvcGVydGllc1tdO1xuXG4gICAgLyoqXG4gICAgICogTGF5b3V0IHNvcnRlZCBieSB6b25lcy4gRWFjaCBpbXBsZW1lbnRhdGlvbiBjYW4gc3VwcG9ydCBkaWZmZXJlbnQgem9uZXMuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9sYXlvdXRzQnlab25lczogTWFwPHN0cmluZywgYW55PjtcblxuICAgIC8qKlxuICAgICAqIENvbnRleHQgcHJvcGVydGllcyBmb3IgY3VycmVudCBhY3RpdmUgcmVuZGVyZWQgbGF5b3V0XG4gICAgICpcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX3Byb3BlcnR5TWFwOiBQcm9wZXJ0eU1hcDtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgTGF5b3V0IGJlaW5nIHJlbmRlcmVkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9sYXlvdXQ6IEl0ZW1Qcm9wZXJ0aWVzO1xuXG4gICAgLyoqXG4gICAgICogTGF5b3V0IGRlZmluaXRpb25zIGJ5IGl0cyBuYW1lXG4gICAgICpcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgbmFtZVRvTGF5b3V0OiBNYXAgPHN0cmluZywgSXRlbVByb3BlcnRpZXM+ID0gbmV3IE1hcDxzdHJpbmcsIEl0ZW1Qcm9wZXJ0aWVzPigpO1xuXG4gICAgLyoqXG4gICAgICogQSBtYXAgbGlua2luZyB0aGUgbmFtZSBvZiB0aGUgbGF5b3V0IHRvIHRoZSBhY3R1YWwgY29udGV4dC4gV2UgbmVlZCB0aGlzIHdoZW4gd2UgbmVlZFxuICAgICAqIHRvIGFjY2VzcyBjdXJyZW50IGNvbnRlbnQuXG4gICAgICpcbiAgICAgKi9cbiAgICBjb250ZXh0TWFwOiBNYXAgPHN0cmluZywgQ29udGV4dD4gPSBuZXcgTWFwPHN0cmluZywgQ29udGV4dD4oKTtcblxuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBjb250ZXh0IGJlaW5nIHJlbmRlcmVkXG4gICAgICovXG4gICAgbGF5b3V0Q29udGV4dDogQ29udGV4dDtcblxuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9tZXRhQ29udGV4dDogTWV0YUNvbnRleHRDb21wb25lbnQsIHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBfbWV0YUNvbnRleHQpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FuIGJlIGNhbGxlZCBieSBtLWNvbnRlbnQgdG8gQE91dHB1dCB3aGVuIGNvbnRleHQgcHJvcGVydGllcyBhcmUgcHVzaGVkIHRvIHN0YWNrXG4gICAgICpcbiAgICAgKi9cbiAgICBhZnRlckNvbnRleHRTZXQobGF5b3V0TmFtZTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5sYXlvdXRDb250ZXh0ID0gdGhpcy5hY3RpdmVDb250ZXh0O1xuICAgICAgICB0aGlzLmNvbnRleHRNYXAuc2V0KGxheW91dE5hbWUsIHRoaXMubGF5b3V0Q29udGV4dC5zbmFwc2hvdCgpLmh5ZHJhdGUoZmFsc2UpKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbiBiZSBjYWxsZWQgYnkgbS1jb250ZW50IHRvIEBPdXRwdXQgYWZ0ZXIgY29udGV4dCBwcm9wZXJ0aWVzIGFyZSBwdXNoZWQgdG8gc3RhY2tcbiAgICAgKlxuICAgICAqL1xuICAgIGJlZm9yZUNvbnRleHRTZXQobGF5b3V0TmFtZTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5sYXlvdXQgPSB0aGlzLm5hbWVUb0xheW91dC5nZXQobGF5b3V0TmFtZSk7XG4gICAgfVxuXG5cbiAgICBnZXQgYWN0aXZlQ29udGV4dCgpOiBDb250ZXh0XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YUNvbnRleHQuYWN0aXZlQ29udGV4dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyBhbGwgYXZhaWxhYmxlIGFuZCBhY3RpdmUgbGF5b3V0cyBmb3Igem9uZXMgZGVmaW5lZCBieSBzdWJjbGFzc2VzXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXQgYWxsTGF5b3V0cygpOiBJdGVtUHJvcGVydGllc1tdXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9hbGxMYXlvdXRzKSkge1xuICAgICAgICAgICAgbGV0IG1ldGE6IFVJTWV0YSA9IDxVSU1ldGE+IHRoaXMuYWN0aXZlQ29udGV4dC5tZXRhO1xuICAgICAgICAgICAgdGhpcy5fYWxsTGF5b3V0cyA9IG1ldGEuaXRlbUxpc3QodGhpcy5hY3RpdmVDb250ZXh0LCBVSU1ldGEuS2V5TGF5b3V0LCB0aGlzLnpvbmVzKCkpO1xuICAgICAgICAgICAgdGhpcy5uYW1lVG9MYXlvdXQuY2xlYXIoKTtcblxuICAgICAgICAgICAgdGhpcy5fYWxsTGF5b3V0cy5mb3JFYWNoKChpdGVtOiBJdGVtUHJvcGVydGllcykgPT5cbiAgICAgICAgICAgICAgICB0aGlzLm5hbWVUb0xheW91dC5zZXQoaXRlbS5uYW1lLCBpdGVtKSk7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fYWxsTGF5b3V0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgYWxsIGF2YWlsYWJsZSBhbmQgYWN0aXZlIGxheW91dHMgYW5kIGFnZ3JlZ2F0ZSB0aGVtIHRoZWlyIG5hbWVcbiAgICAgKlxuICAgICAqL1xuICAgIGdldCBsYXlvdXRzQnlab25lcygpOiBNYXA8c3RyaW5nLCBhbnk+XG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9sYXlvdXRzQnlab25lcykpIHtcbiAgICAgICAgICAgIGxldCBtZXRhOiBVSU1ldGEgPSA8VUlNZXRhPiB0aGlzLmFjdGl2ZUNvbnRleHQubWV0YTtcbiAgICAgICAgICAgIHRoaXMuX2xheW91dHNCeVpvbmVzID0gbWV0YS5pdGVtc0J5Wm9uZXModGhpcy5hY3RpdmVDb250ZXh0LCBVSU1ldGEuS2V5TGF5b3V0LFxuICAgICAgICAgICAgICAgIHRoaXMuem9uZXMoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheW91dHNCeVpvbmVzO1xuICAgIH1cblxuXG4gICAgZ2V0IGxheW91dCgpOiBJdGVtUHJvcGVydGllc1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheW91dDtcbiAgICB9XG5cbiAgICBzZXQgbGF5b3V0KHZhbHVlOiBJdGVtUHJvcGVydGllcylcbiAgICB7XG4gICAgICAgIHRoaXMuX2xheW91dCA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9wcm9wZXJ0eU1hcCA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gdG9kbzogc2hvdWxkIHRoaXMgYmUgZm9yIGN1cnJlbnQgbGF5b3V0P1xuICAgIGdldCBwcm9wZXJ0eU1hcCgpOiBQcm9wZXJ0eU1hcFxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fcHJvcGVydHlNYXApKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUNvbnRleHQucHVzaCgpO1xuICAgICAgICAgICAgdGhpcy5fcHJvcGVydHlNYXAgPSB0aGlzLmFjdGl2ZUNvbnRleHQuYWxsUHJvcGVydGllcygpO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVDb250ZXh0LnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0eU1hcDtcbiAgICB9XG5cblxuICAgIGxhYmVsKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlQ29udGV4dC5yZXNvbHZlVmFsdWUodGhpcy5wcm9wZXJ0eU1hcC5nZXQoVUlNZXRhLktleUxhYmVsKSk7XG4gICAgfVxuXG5cbiAgICBsYWJlbEZvckNvbnRleHQobmFtZTogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICBsZXQgY29udGV4dDogQ29udGV4dCA9IHRoaXMuY29udGV4dE1hcC5nZXQobmFtZSk7XG4gICAgICAgIHJldHVybiBzdXBlci5hUHJvcGVydGllcyhjb250ZXh0LCBVSU1ldGEuS2V5TGFiZWwpO1xuICAgIH1cblxuICAgIHpvbmVzKCk6IHN0cmluZ1tdXG4gICAge1xuICAgICAgICByZXR1cm4gVUlNZXRhLlpvbmVzVExSTUI7XG4gICAgfVxuXG5cbiAgICAvLyByZW1vdmUgdGhpcyB1Z2x5IHNvbHV0aW9uIG9uY2UgSSBmaWd1cmUgb3V0IGN1c3RvbSB2YWx1ZSBhY2Nlc3NvclxuICAgIHByb3BlcnRpZXMoa2V5OiBzdHJpbmcsIGRlZlZhbHVlOiBhbnkgPSBudWxsKTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuYWN0aXZlQ29udGV4dCkgPyB0aGlzLmFjdGl2ZUNvbnRleHQucHJvcGVydHlGb3JLZXkoa2V5KSA6IGRlZlZhbHVlO1xuXG4gICAgfVxuXG4gICAgZGVidWdTdHJpbmcobmFtZTogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMuY29udGV4dE1hcC5nZXQobmFtZSk7XG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQoY29udGV4dCksICdUcnlpbmcgdG8gcmV0cml2ZSBkZWJ1Z1N0cmluZyBvbiBub24tZXhpc3RpbmcgY29udGV4dCcpO1xuXG4gICAgICAgIHJldHVybiBjb250ZXh0LmRlYnVnU3RyaW5nKCk7XG4gICAgfVxuXG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmxheW91dENvbnRleHQgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRleHRNYXAuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5jb250ZXh0TWFwID0gbnVsbDtcbiAgICB9XG59XG4iXX0=