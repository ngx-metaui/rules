/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { isPresent } from '@aribaui/core';
/**
 * When we have a custom component like dropdown, radiobuttonlist and
 * many more we want to provide a custom content to it like so:
 *
 * ```
 *  <aw-dropdown [list]="listOfUsers" let somehowGetItemOut>
 *      {{item.userName}}
 *
 *   <aw-dropdown
 *
 * ```
 * Who else would know how to render list of objects..
 *
 * But its not possible in current form. if I do not provide Angular some as they call it this
 * syntactic sugar *,
 *
 *
 * ```
 *  <aw-dropdown *mySugerDirective=.....>
 *      {{item.userName}}
 *
 *   <aw-dropdown
 * ```
 *
 *
 * then angular will not know  inside is a template and I wont be able to get hold of TemplateRef
 * inside the component
 *
 * So the only way I found (expecting I do not want to change anything in terms of bindings and the
 * signature I use it. I have to use it like this:
 *
 * ```
 *  <aw-dropdown [list]="listOfUsers" let somehowGetItemOut>
 *      <ng-template let-item> {{item.userName}}</ng-template>
 *
 *   <aw-dropdown
 *
 * ```
 *
 *  This way it could work. Since I am inside ngFor I want to render the item into the correct
 * viewContainer of ngFor's current item.
 *
 *  This way I can also expose item outside using Angular's special local variable called:
 * $implicit.
 *
 * This gets even more complex if we try to pass this template 2 levels down, like in case of
 * RadioButtonList. But later on I might want to refactor this into custom NG FOR
 *
 * @deprecated in favor of ngTemplateOutlet (will be removed in the next version)
 *
 */
var EmbeddedItemDirective = /** @class */ (function () {
    function EmbeddedItemDirective(_viewContainer) {
        this._viewContainer = _viewContainer;
    }
    Object.defineProperty(EmbeddedItemDirective.prototype, "item", {
        set: /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            this._implicitValue = item;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    /**
     *
     * @param {?} changes
     * @return {?}
     */
    EmbeddedItemDirective.prototype.ngOnChanges = /**
     *
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (isPresent(this._viewRef)) {
            this._viewContainer.remove(this._viewContainer.indexOf(this._viewRef));
        }
        if (isPresent(this.embeddedItem)) {
            /** @type {?} */
            var context = new EmbededItem(this._implicitValue);
            this._viewRef = this._viewContainer.createEmbeddedView(this.embeddedItem, context);
        }
    };
    EmbeddedItemDirective.decorators = [
        { type: Directive, args: [{ selector: '[embeddedItem]' },] }
    ];
    /** @nocollapse */
    EmbeddedItemDirective.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    EmbeddedItemDirective.propDecorators = {
        embeddedItem: [{ type: Input }],
        item: [{ type: Input }]
    };
    return EmbeddedItemDirective;
}());
export { EmbeddedItemDirective };
if (false) {
    /**
     * Template we want to render N-Times
     * @type {?}
     */
    EmbeddedItemDirective.prototype.embeddedItem;
    /** @type {?} */
    EmbeddedItemDirective.prototype._implicitValue;
    /** @type {?} */
    EmbeddedItemDirective.prototype._viewRef;
    /** @type {?} */
    EmbeddedItemDirective.prototype._viewContainer;
}
/**
 * Wrapper class around Angular's EmbeddedViewRef.context()
 *
 */
var /**
 * Wrapper class around Angular's EmbeddedViewRef.context()
 *
 */
EmbededItem = /** @class */ (function () {
    function EmbededItem($implicit) {
        this.$implicit = $implicit;
    }
    return EmbededItem;
}());
/**
 * Wrapper class around Angular's EmbeddedViewRef.context()
 *
 */
export { EmbededItem };
if (false) {
    /** @type {?} */
    EmbededItem.prototype.$implicit;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1iZWRkZWQtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJjb3JlL2VtYmVkZGVkLWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQ0gsU0FBUyxFQUVULEtBQUssRUFHTCxXQUFXLEVBQ1gsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBeUVwQywrQkFBb0IsY0FBZ0M7UUFBaEMsbUJBQWMsR0FBZCxjQUFjLENBQWtCO0tBRW5EO0lBWkQsc0JBQ0ksdUNBQUk7Ozs7O1FBRFIsVUFDUyxJQUFTO1lBRWQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDOUI7OztPQUFBO0lBVUQ7O09BRUc7Ozs7OztJQUNILDJDQUFXOzs7OztJQUFYLFVBQVksT0FBc0I7UUFFOUIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDMUU7UUFFRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDL0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3RGO0tBQ0o7O2dCQXBDSixTQUFTLFNBQUMsRUFBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUM7Ozs7Z0JBeERuQyxnQkFBZ0I7OzsrQkE4RGYsS0FBSzt1QkFHTCxLQUFLOztnQ0E1RlY7O1NBb0ZhLHFCQUFxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkNsQzs7OztBQUFBO0lBRUkscUJBQW1CLFNBQWM7UUFBZCxjQUFTLEdBQVQsU0FBUyxDQUFLO0tBRWhDO3NCQW5JTDtJQW9JQyxDQUFBOzs7OztBQUxELHVCQUtDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBFbWJlZGRlZFZpZXdSZWYsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcblxuXG4vKipcbiAqIFdoZW4gd2UgaGF2ZSBhIGN1c3RvbSBjb21wb25lbnQgbGlrZSBkcm9wZG93biwgcmFkaW9idXR0b25saXN0IGFuZFxuICogbWFueSBtb3JlIHdlIHdhbnQgdG8gcHJvdmlkZSBhIGN1c3RvbSBjb250ZW50IHRvIGl0IGxpa2Ugc286XG4gKlxuICogYGBgXG4gKiAgPGF3LWRyb3Bkb3duIFtsaXN0XT1cImxpc3RPZlVzZXJzXCIgbGV0IHNvbWVob3dHZXRJdGVtT3V0PlxuICogICAgICB7e2l0ZW0udXNlck5hbWV9fVxuICpcbiAqICAgPGF3LWRyb3Bkb3duXG4gKlxuICogYGBgXG4gKiBXaG8gZWxzZSB3b3VsZCBrbm93IGhvdyB0byByZW5kZXIgbGlzdCBvZiBvYmplY3RzLi5cbiAqXG4gKiBCdXQgaXRzIG5vdCBwb3NzaWJsZSBpbiBjdXJyZW50IGZvcm0uIGlmIEkgZG8gbm90IHByb3ZpZGUgQW5ndWxhciBzb21lIGFzIHRoZXkgY2FsbCBpdCB0aGlzXG4gKiBzeW50YWN0aWMgc3VnYXIgKixcbiAqXG4gKlxuICogYGBgXG4gKiAgPGF3LWRyb3Bkb3duICpteVN1Z2VyRGlyZWN0aXZlPS4uLi4uPlxuICogICAgICB7e2l0ZW0udXNlck5hbWV9fVxuICpcbiAqICAgPGF3LWRyb3Bkb3duXG4gKiBgYGBcbiAqXG4gKlxuICogdGhlbiBhbmd1bGFyIHdpbGwgbm90IGtub3cgIGluc2lkZSBpcyBhIHRlbXBsYXRlIGFuZCBJIHdvbnQgYmUgYWJsZSB0byBnZXQgaG9sZCBvZiBUZW1wbGF0ZVJlZlxuICogaW5zaWRlIHRoZSBjb21wb25lbnRcbiAqXG4gKiBTbyB0aGUgb25seSB3YXkgSSBmb3VuZCAoZXhwZWN0aW5nIEkgZG8gbm90IHdhbnQgdG8gY2hhbmdlIGFueXRoaW5nIGluIHRlcm1zIG9mIGJpbmRpbmdzIGFuZCB0aGVcbiAqIHNpZ25hdHVyZSBJIHVzZSBpdC4gSSBoYXZlIHRvIHVzZSBpdCBsaWtlIHRoaXM6XG4gKlxuICogYGBgXG4gKiAgPGF3LWRyb3Bkb3duIFtsaXN0XT1cImxpc3RPZlVzZXJzXCIgbGV0IHNvbWVob3dHZXRJdGVtT3V0PlxuICogICAgICA8bmctdGVtcGxhdGUgbGV0LWl0ZW0+IHt7aXRlbS51c2VyTmFtZX19PC9uZy10ZW1wbGF0ZT5cbiAqXG4gKiAgIDxhdy1kcm9wZG93blxuICpcbiAqIGBgYFxuICpcbiAqICBUaGlzIHdheSBpdCBjb3VsZCB3b3JrLiBTaW5jZSBJIGFtIGluc2lkZSBuZ0ZvciBJIHdhbnQgdG8gcmVuZGVyIHRoZSBpdGVtIGludG8gdGhlIGNvcnJlY3RcbiAqIHZpZXdDb250YWluZXIgb2YgbmdGb3IncyBjdXJyZW50IGl0ZW0uXG4gKlxuICogIFRoaXMgd2F5IEkgY2FuIGFsc28gZXhwb3NlIGl0ZW0gb3V0c2lkZSB1c2luZyBBbmd1bGFyJ3Mgc3BlY2lhbCBsb2NhbCB2YXJpYWJsZSBjYWxsZWQ6XG4gKiAkaW1wbGljaXQuXG4gKlxuICogVGhpcyBnZXRzIGV2ZW4gbW9yZSBjb21wbGV4IGlmIHdlIHRyeSB0byBwYXNzIHRoaXMgdGVtcGxhdGUgMiBsZXZlbHMgZG93biwgbGlrZSBpbiBjYXNlIG9mXG4gKiBSYWRpb0J1dHRvbkxpc3QuIEJ1dCBsYXRlciBvbiBJIG1pZ2h0IHdhbnQgdG8gcmVmYWN0b3IgdGhpcyBpbnRvIGN1c3RvbSBORyBGT1JcbiAqXG4gKiBAZGVwcmVjYXRlZCBpbiBmYXZvciBvZiBuZ1RlbXBsYXRlT3V0bGV0ICh3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgdmVyc2lvbilcbiAqXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW2VtYmVkZGVkSXRlbV0nfSlcbmV4cG9ydCBjbGFzcyBFbWJlZGRlZEl0ZW1EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXNcbntcbiAgICAvKipcbiAgICAgKiBUZW1wbGF0ZSB3ZSB3YW50IHRvIHJlbmRlciBOLVRpbWVzXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBlbWJlZGRlZEl0ZW06IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBpdGVtKGl0ZW06IGFueSlcbiAgICB7XG4gICAgICAgIHRoaXMuX2ltcGxpY2l0VmFsdWUgPSBpdGVtO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ltcGxpY2l0VmFsdWU6IGFueTtcbiAgICBwcml2YXRlIF92aWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8YW55PjtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZilcbiAgICB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLl92aWV3UmVmKSkge1xuICAgICAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lci5yZW1vdmUodGhpcy5fdmlld0NvbnRhaW5lci5pbmRleE9mKHRoaXMuX3ZpZXdSZWYpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5lbWJlZGRlZEl0ZW0pKSB7XG4gICAgICAgICAgICBsZXQgY29udGV4dCA9IG5ldyBFbWJlZGVkSXRlbSh0aGlzLl9pbXBsaWNpdFZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdSZWYgPSB0aGlzLl92aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLmVtYmVkZGVkSXRlbSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLyoqXG4gKiBXcmFwcGVyIGNsYXNzIGFyb3VuZCBBbmd1bGFyJ3MgRW1iZWRkZWRWaWV3UmVmLmNvbnRleHQoKVxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEVtYmVkZWRJdGVtXG57XG4gICAgY29uc3RydWN0b3IocHVibGljICRpbXBsaWNpdDogYW55KVxuICAgIHtcbiAgICB9XG59XG5cblxuIl19