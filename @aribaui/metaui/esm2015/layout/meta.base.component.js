/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { assert, isPresent } from '@aribaui/core';
import { BaseFormComponent } from '@aribaui/components';
import { UIMeta } from '../core/uimeta';
import { ObjectMeta } from '../core/object-meta';
/**
 * Common component to setup the context and also create context snapshot for later user.
 * @abstract
 */
export class MetaBaseComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} _metaContext
     */
    constructor(env, _metaContext) {
        super(env, _metaContext);
        this.env = env;
        this._metaContext = _metaContext;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.updateMeta();
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        this.updateMeta();
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
    }
    /**
     * @return {?}
     */
    updateMeta() {
        this.editing = this.context.booleanPropertyForKey(UIMeta.KeyEditing, false);
        if (this.editing) {
            this.object = this.context.values.get(ObjectMeta.KeyObject);
            this.contextSnapshot = this.context.snapshot();
        }
        this.doUpdate();
    }
    /**
     * Placeholder to be implemented by subclass. this method is triggered when we detect any
     * changes on the MetaContext
     * @return {?}
     */
    doUpdate() {
    }
    /**
     * Get the last saved context from the MetaContext component
     *
     * @return {?}
     */
    get context() {
        if (isPresent(this._metaContext) && isPresent(this._metaContext.myContext())) {
            return this._metaContext.myContext();
        }
        assert(false, 'Should always have metaContext available');
    }
    /**
     * @return {?}
     */
    isNestedContext() {
        return this.context.isNested;
    }
    /**
     * @param {?} key
     * @param {?=} defValue
     * @return {?}
     */
    properties(key, defValue = null) {
        return isPresent(this.context) ? (isPresent(this.context.propertyForKey(key)) ?
            this.context.propertyForKey(key) : defValue) : defValue;
    }
    /**
     * Retrieves active context's properties
     *
     * @param {?} me
     * @param {?} key
     * @param {?=} defValue
     * @return {?}
     */
    aProperties(me, key, defValue = null) {
        /** @type {?} */
        let activeContext = this._metaContext.activeContext();
        return isPresent(me) ? me.propertyForKey(key) : defValue;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS5iYXNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImxheW91dC9tZXRhLmJhc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFtQkEsT0FBTyxFQUFDLE1BQU0sRUFBZSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFHdEQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7QUFNL0MsTUFBTSx3QkFBa0MsU0FBUSxpQkFBaUI7Ozs7O0lBZ0I3RCxZQUFtQixHQUFnQixFQUNiLFlBQWtDO1FBRXBELEtBQUssQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFIVixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBQ2IsaUJBQVksR0FBWixZQUFZLENBQXNCO0tBR3ZEOzs7O0lBRUQsUUFBUTtRQUVKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDckI7Ozs7SUFHRCxTQUFTO1FBRUwsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBRXJCOzs7O0lBRUQsa0JBQWtCO0tBRWpCOzs7O0lBR1MsVUFBVTtRQUVoQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbEQ7UUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDbkI7Ozs7OztJQU9TLFFBQVE7S0FFakI7Ozs7OztJQU9ELElBQWMsT0FBTztRQUVqQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3hDO1FBRUQsTUFBTSxDQUFDLEtBQUssRUFBRSwwQ0FBMEMsQ0FBQyxDQUFDO0tBQzdEOzs7O0lBR0QsZUFBZTtRQUVYLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztLQUNoQzs7Ozs7O0lBSUQsVUFBVSxDQUFDLEdBQVcsRUFBRSxXQUFnQixJQUFJO1FBRXhDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7S0FFL0Q7Ozs7Ozs7OztJQU9ELFdBQVcsQ0FBQyxFQUFXLEVBQUUsR0FBVyxFQUFFLFdBQWdCLElBQUk7O1FBRXRELElBQUksYUFBYSxHQUFZLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDL0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0tBRTVEO0NBR0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICovXG5pbXBvcnQge0FmdGVyVmlld0NoZWNrZWR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHthc3NlcnQsIEVudmlyb25tZW50LCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlRm9ybUNvbXBvbmVudH0gZnJvbSAnQGFyaWJhdWkvY29tcG9uZW50cyc7XG5pbXBvcnQge01ldGFDb250ZXh0Q29tcG9uZW50fSBmcm9tICcuLi9jb3JlL21ldGEtY29udGV4dC9tZXRhLWNvbnRleHQuY29tcG9uZW50JztcbmltcG9ydCB7Q29udGV4dCwgU25hcHNob3R9IGZyb20gJy4uL2NvcmUvY29udGV4dCc7XG5pbXBvcnQge1VJTWV0YX0gZnJvbSAnLi4vY29yZS91aW1ldGEnO1xuaW1wb3J0IHtPYmplY3RNZXRhfSBmcm9tICcuLi9jb3JlL29iamVjdC1tZXRhJztcblxuXG4vKipcbiAqIENvbW1vbiBjb21wb25lbnQgdG8gc2V0dXAgdGhlIGNvbnRleHQgYW5kIGFsc28gY3JlYXRlIGNvbnRleHQgc25hcHNob3QgZm9yIGxhdGVyIHVzZXIuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNZXRhQmFzZUNvbXBvbmVudCBleHRlbmRzIEJhc2VGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZFxue1xuICAgIGVkaXRpbmc6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBOZWVkIHRvIGNhcHR1cmUgY3VycmVudCBzbmFwc2hvdCBmb3IgZWRpdCBvcGVyYXRpb24gYXMgd2hlbiB3ZSBlbnRlciBlZGl0aW5nIG1vZGUgYW5kIHVzZXJcbiAgICAgKiBzdGFydCB0byBjaGFuZ2UgdmFsdWVzIHRoZSBkZXRlY3Rpb24gbG9vcCBydW5zIG91dCBvZiBhbnkgcHVzaC9wb3AgY3ljbGUgYW5kIGFueSBvcmRlciBhbmQgSVxuICAgICAqIGNvdWxkIG5vdCBmaW5kIGEgd2F5IGhvdyB0byBkZXRlY3QgY29uc2lzdGVudCBiZWhhdmlvciB3aGVyZSByb290IGNvbXBvZW5udCBzdGFydCBuZ0RvQ2hlY2ssXG4gICAgICogY2hpbGQgY29tcG9uZW50IHRyaWdnZXIgbmdEb0NoZWNrLCBjaGlsZCBmaW5pc2hlcywgcm9vdCBmaW5pc2hlcy5cbiAgICAgKlxuICAgICAqIFRoaXMgb25seSB3b3JrcyB3aGVuIHZpZXcgaXMgZmlyc3QgdGltZSByZW5kZXJlZCwgYnV0IG5vdCB3aGVuIG1ha2luZyBjaGFuZ2VzXG4gICAgICpcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgY29udGV4dFNuYXBzaG90OiBTbmFwc2hvdDtcbiAgICBwcm90ZWN0ZWQgb2JqZWN0OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgX21ldGFDb250ZXh0OiBNZXRhQ29udGV4dENvbXBvbmVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgX21ldGFDb250ZXh0KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1ldGEoKTtcbiAgICB9XG5cblxuICAgIG5nRG9DaGVjaygpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnVwZGF0ZU1ldGEoKTtcblxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkXG4gICAge1xuICAgIH1cblxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU1ldGEoKVxuICAgIHtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gdGhpcy5jb250ZXh0LmJvb2xlYW5Qcm9wZXJ0eUZvcktleShVSU1ldGEuS2V5RWRpdGluZywgZmFsc2UpO1xuICAgICAgICBpZiAodGhpcy5lZGl0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLm9iamVjdCA9IHRoaXMuY29udGV4dC52YWx1ZXMuZ2V0KE9iamVjdE1ldGEuS2V5T2JqZWN0KTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dFNuYXBzaG90ID0gdGhpcy5jb250ZXh0LnNuYXBzaG90KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kb1VwZGF0ZSgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUGxhY2Vob2xkZXIgdG8gYmUgaW1wbGVtZW50ZWQgYnkgc3ViY2xhc3MuIHRoaXMgbWV0aG9kIGlzIHRyaWdnZXJlZCB3aGVuIHdlIGRldGVjdCBhbnlcbiAgICAgKiBjaGFuZ2VzIG9uIHRoZSBNZXRhQ29udGV4dFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBkb1VwZGF0ZSgpOiB2b2lkXG4gICAge1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBsYXN0IHNhdmVkIGNvbnRleHQgZnJvbSB0aGUgTWV0YUNvbnRleHQgY29tcG9uZW50XG4gICAgICpcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0IGNvbnRleHQoKTogQ29udGV4dFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLl9tZXRhQ29udGV4dCkgJiYgaXNQcmVzZW50KHRoaXMuX21ldGFDb250ZXh0Lm15Q29udGV4dCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFDb250ZXh0Lm15Q29udGV4dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXNzZXJ0KGZhbHNlLCAnU2hvdWxkIGFsd2F5cyBoYXZlIG1ldGFDb250ZXh0IGF2YWlsYWJsZScpO1xuICAgIH1cblxuXG4gICAgaXNOZXN0ZWRDb250ZXh0KCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuaXNOZXN0ZWQ7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIHRoaXMgdWdseSBzb2x1dGlvbiBvbmNlIEkgZmlndXJlIG91dCBjdXN0b20gdmFsdWUgYWNjZXNzb3IgdGhhdCBJIGNhblxuICAgIC8vIHByb3ZpZGUgYXMgYSBleHByZXNzaW9uXG4gICAgcHJvcGVydGllcyhrZXk6IHN0cmluZywgZGVmVmFsdWU6IGFueSA9IG51bGwpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5jb250ZXh0KSA/IChpc1ByZXNlbnQodGhpcy5jb250ZXh0LnByb3BlcnR5Rm9yS2V5KGtleSkpID9cbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5wcm9wZXJ0eUZvcktleShrZXkpIDogZGVmVmFsdWUpIDogZGVmVmFsdWU7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyBhY3RpdmUgY29udGV4dCdzIHByb3BlcnRpZXNcbiAgICAgKlxuICAgICAqL1xuICAgIGFQcm9wZXJ0aWVzKG1lOiBDb250ZXh0LCBrZXk6IHN0cmluZywgZGVmVmFsdWU6IGFueSA9IG51bGwpOiBhbnlcbiAgICB7XG4gICAgICAgIGxldCBhY3RpdmVDb250ZXh0OiBDb250ZXh0ID0gdGhpcy5fbWV0YUNvbnRleHQuYWN0aXZlQ29udGV4dCgpO1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KG1lKSA/IG1lLnByb3BlcnR5Rm9yS2V5KGtleSkgOiBkZWZWYWx1ZTtcblxuICAgIH1cblxuXG59XG5cbiJdfQ==