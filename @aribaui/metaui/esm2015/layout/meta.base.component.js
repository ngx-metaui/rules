/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        return isPresent(this.context) ? this.context.propertyForKey(key) : defValue;
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
        let /** @type {?} */ activeContext = this._metaContext.activeContext();
        return isPresent(me) ? me.propertyForKey(key) : defValue;
    }
}
function MetaBaseComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS5iYXNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImxheW91dC9tZXRhLmJhc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFtQkEsT0FBTyxFQUFDLE1BQU0sRUFBZSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFHdEQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7QUFNL0MsTUFBTSx3QkFBa0MsU0FBUSxpQkFBaUI7Ozs7O0lBZ0I3RCxZQUFtQixHQUFnQixFQUNiLFlBQWtDO1FBRXBELEtBQUssQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFIVixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBQ2IsaUJBQVksR0FBWixZQUFZLENBQXNCO0tBR3ZEOzs7O0lBRUQsUUFBUTtRQUVKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDckI7Ozs7SUFHRCxTQUFTO1FBRUwsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBRXJCOzs7O0lBRUQsa0JBQWtCO0tBRWpCOzs7O0lBR1MsVUFBVTtRQUVoQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbEQ7UUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDbkI7Ozs7OztJQU9TLFFBQVE7S0FFakI7Ozs7OztJQU9ELElBQWMsT0FBTztRQUVqQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3hDO1FBRUQsTUFBTSxDQUFDLEtBQUssRUFBRSwwQ0FBMEMsQ0FBQyxDQUFDO0tBQzdEOzs7O0lBR0QsZUFBZTtRQUVYLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztLQUNoQzs7Ozs7O0lBSUQsVUFBVSxDQUFDLEdBQVcsRUFBRSxXQUFnQixJQUFJO1FBRXhDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0tBRWhGOzs7Ozs7Ozs7SUFPRCxXQUFXLENBQUMsRUFBVyxFQUFFLEdBQVcsRUFBRSxXQUFnQixJQUFJO1FBRXRELHFCQUFJLGFBQWEsR0FBWSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztLQUU1RDtDQUdKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtBZnRlclZpZXdDaGVja2VkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7YXNzZXJ0LCBFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJ0BhcmliYXVpL2NvbXBvbmVudHMnO1xuaW1wb3J0IHtNZXRhQ29udGV4dENvbXBvbmVudH0gZnJvbSAnLi4vY29yZS9tZXRhLWNvbnRleHQvbWV0YS1jb250ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQge0NvbnRleHQsIFNuYXBzaG90fSBmcm9tICcuLi9jb3JlL2NvbnRleHQnO1xuaW1wb3J0IHtVSU1ldGF9IGZyb20gJy4uL2NvcmUvdWltZXRhJztcbmltcG9ydCB7T2JqZWN0TWV0YX0gZnJvbSAnLi4vY29yZS9vYmplY3QtbWV0YSc7XG5cblxuLyoqXG4gKiBDb21tb24gY29tcG9uZW50IHRvIHNldHVwIHRoZSBjb250ZXh0IGFuZCBhbHNvIGNyZWF0ZSBjb250ZXh0IHNuYXBzaG90IGZvciBsYXRlciB1c2VyLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWV0YUJhc2VDb21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWRcbntcbiAgICBlZGl0aW5nOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogTmVlZCB0byBjYXB0dXJlIGN1cnJlbnQgc25hcHNob3QgZm9yIGVkaXQgb3BlcmF0aW9uIGFzIHdoZW4gd2UgZW50ZXIgZWRpdGluZyBtb2RlIGFuZCB1c2VyXG4gICAgICogc3RhcnQgdG8gY2hhbmdlIHZhbHVlcyB0aGUgZGV0ZWN0aW9uIGxvb3AgcnVucyBvdXQgb2YgYW55IHB1c2gvcG9wIGN5Y2xlIGFuZCBhbnkgb3JkZXIgYW5kIElcbiAgICAgKiBjb3VsZCBub3QgZmluZCBhIHdheSBob3cgdG8gZGV0ZWN0IGNvbnNpc3RlbnQgYmVoYXZpb3Igd2hlcmUgcm9vdCBjb21wb2VubnQgc3RhcnQgbmdEb0NoZWNrLFxuICAgICAqIGNoaWxkIGNvbXBvbmVudCB0cmlnZ2VyIG5nRG9DaGVjaywgY2hpbGQgZmluaXNoZXMsIHJvb3QgZmluaXNoZXMuXG4gICAgICpcbiAgICAgKiBUaGlzIG9ubHkgd29ya3Mgd2hlbiB2aWV3IGlzIGZpcnN0IHRpbWUgcmVuZGVyZWQsIGJ1dCBub3Qgd2hlbiBtYWtpbmcgY2hhbmdlc1xuICAgICAqXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGNvbnRleHRTbmFwc2hvdDogU25hcHNob3Q7XG4gICAgcHJvdGVjdGVkIG9iamVjdDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIF9tZXRhQ29udGV4dDogTWV0YUNvbnRleHRDb21wb25lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIF9tZXRhQ29udGV4dCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVNZXRhKCk7XG4gICAgfVxuXG5cbiAgICBuZ0RvQ2hlY2soKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy51cGRhdGVNZXRhKCk7XG5cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZFxuICAgIHtcbiAgICB9XG5cblxuICAgIHByb3RlY3RlZCB1cGRhdGVNZXRhKClcbiAgICB7XG4gICAgICAgIHRoaXMuZWRpdGluZyA9IHRoaXMuY29udGV4dC5ib29sZWFuUHJvcGVydHlGb3JLZXkoVUlNZXRhLktleUVkaXRpbmcsIGZhbHNlKTtcbiAgICAgICAgaWYgKHRoaXMuZWRpdGluZykge1xuICAgICAgICAgICAgdGhpcy5vYmplY3QgPSB0aGlzLmNvbnRleHQudmFsdWVzLmdldChPYmplY3RNZXRhLktleU9iamVjdCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHRTbmFwc2hvdCA9IHRoaXMuY29udGV4dC5zbmFwc2hvdCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZG9VcGRhdGUoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFBsYWNlaG9sZGVyIHRvIGJlIGltcGxlbWVudGVkIGJ5IHN1YmNsYXNzLiB0aGlzIG1ldGhvZCBpcyB0cmlnZ2VyZWQgd2hlbiB3ZSBkZXRlY3QgYW55XG4gICAgICogY2hhbmdlcyBvbiB0aGUgTWV0YUNvbnRleHRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZG9VcGRhdGUoKTogdm9pZFxuICAgIHtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbGFzdCBzYXZlZCBjb250ZXh0IGZyb20gdGhlIE1ldGFDb250ZXh0IGNvbXBvbmVudFxuICAgICAqXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldCBjb250ZXh0KCk6IENvbnRleHRcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5fbWV0YUNvbnRleHQpICYmIGlzUHJlc2VudCh0aGlzLl9tZXRhQ29udGV4dC5teUNvbnRleHQoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tZXRhQ29udGV4dC5teUNvbnRleHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VydChmYWxzZSwgJ1Nob3VsZCBhbHdheXMgaGF2ZSBtZXRhQ29udGV4dCBhdmFpbGFibGUnKTtcbiAgICB9XG5cblxuICAgIGlzTmVzdGVkQ29udGV4dCgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmlzTmVzdGVkO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSB0aGlzIHVnbHkgc29sdXRpb24gb25jZSBJIGZpZ3VyZSBvdXQgY3VzdG9tIHZhbHVlIGFjY2Vzc29yIHRoYXQgSSBjYW5cbiAgICAvLyBwcm92aWRlIGFzIGEgZXhwcmVzc2lvblxuICAgIHByb3BlcnRpZXMoa2V5OiBzdHJpbmcsIGRlZlZhbHVlOiBhbnkgPSBudWxsKTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuY29udGV4dCkgPyB0aGlzLmNvbnRleHQucHJvcGVydHlGb3JLZXkoa2V5KSA6IGRlZlZhbHVlO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgYWN0aXZlIGNvbnRleHQncyBwcm9wZXJ0aWVzXG4gICAgICpcbiAgICAgKi9cbiAgICBhUHJvcGVydGllcyhtZTogQ29udGV4dCwga2V5OiBzdHJpbmcsIGRlZlZhbHVlOiBhbnkgPSBudWxsKTogYW55XG4gICAge1xuICAgICAgICBsZXQgYWN0aXZlQ29udGV4dDogQ29udGV4dCA9IHRoaXMuX21ldGFDb250ZXh0LmFjdGl2ZUNvbnRleHQoKTtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudChtZSkgPyBtZS5wcm9wZXJ0eUZvcktleShrZXkpIDogZGVmVmFsdWU7XG5cbiAgICB9XG5cblxufVxuXG4iXX0=