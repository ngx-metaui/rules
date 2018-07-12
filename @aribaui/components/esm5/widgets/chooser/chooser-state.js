/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { isBlank, isPresent, ListWrapper } from '@aribaui/core';
import { ChooserSelectionState } from './chooser-selection-state';
import { DataSource } from '../../core/data/data-source';
/**
 * ChooserState manages complete lifecycle for the Chooser Component. It keeps track of current
 * selection as well as it can broadcast any updates.
 *
 *
 */
var /**
 * ChooserState manages complete lifecycle for the Chooser Component. It keeps track of current
 * selection as well as it can broadcast any updates.
 *
 *
 */
ChooserState = /** @class */ (function () {
    function ChooserState(chooserSelectionState, isMulti) {
        if (isMulti === void 0) { isMulti = true; }
        /**
         * Indicates if there are any validation like entered value does not much with the source list.
         *
         */
        this.isInvalid = false;
        /**
         *
         * indicates that we started to some editing e.g. starting to type in something into the
         * filter, or removing already selected items
         */
        this.addMode = false;
        this.recentSelectedDisplayed = 0;
        /**
         * When this option is active we do not show all selected items, but max number that is
         * defined. User is able to toggle to expand the view to see all selections and hide them as
         * well
         */
        this.showAllRecentlySelected = false;
        this.selectionState = chooserSelectionState;
        this.multiselect = isMulti;
        if (isBlank(this.selectionState)) {
            this.selectionState = new DefaultSelectionState(this.multiselect);
        }
    }
    /**
     *
     * It will select and persist an item using ChooserSelectionState provider.
     *
     */
    /**
     *
     * It will select and persist an item using ChooserSelectionState provider.
     *
     * @param {?} item
     * @return {?}
     */
    ChooserState.prototype.updatedSelectedObjects = /**
     *
     * It will select and persist an item using ChooserSelectionState provider.
     *
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (isBlank(item)) {
            item = this.currentItem;
        }
        if (!this.multiselect) {
            this.setSelectionState(item, true);
        }
        else {
            var /** @type {?} */ selectedObject = this.selectedObject();
            var /** @type {?} */ selectedObjects = this.selectedObjects();
            if (this.addMode) {
                if (this.isInvalid) {
                    if (isPresent(selectedObject)) {
                        this.setSelectionState(selectedObject, false);
                    }
                }
                this.setSelectionState(item, !ListWrapper.containsComplex(selectedObjects, item));
            }
            else {
                if (isPresent(selectedObject)) {
                    this.setSelectionState(selectedObject, false);
                }
                this.setSelectionState(item, true);
            }
        }
    };
    /**
     * When user selection is large we use this method to check if we need to show all selected
     * items or only MaxRecentSelected
     */
    /**
     * When user selection is large we use this method to check if we need to show all selected
     * items or only MaxRecentSelected
     * @return {?}
     */
    ChooserState.prototype.toggleAllSelected = /**
     * When user selection is large we use this method to check if we need to show all selected
     * items or only MaxRecentSelected
     * @return {?}
     */
    function () {
        this.showAllRecentlySelected = !this.showAllRecentlySelected;
    };
    Object.defineProperty(ChooserState.prototype, "recentSelectedObjects", {
        /**
         *
         * Renders user's selection under the input field
         *
         */
        get: /**
         *
         * Renders user's selection under the input field
         *
         * @return {?}
         */
        function () {
            if (!this.multiselect) {
                return [];
            }
            var /** @type {?} */ recentSelectedObjects = [];
            this.recentSelectedDisplayed = 0;
            var /** @type {?} */ selectedObjects = this.selectedObjects();
            var /** @type {?} */ size = selectedObjects.length;
            var /** @type {?} */ maxCount = DataSource.MaxRecentSelected;
            if (size > DataSource.MaxRecentSelected && !this.showAllRecentlySelected) {
                maxCount -= 1;
            }
            if (this.showAllRecentlySelected) {
                maxCount = size;
            }
            for (var /** @type {?} */ i = size - 1; i >= 0 && (this.recentSelectedDisplayed < maxCount); i--) {
                var /** @type {?} */ selection = selectedObjects[i];
                recentSelectedObjects.push(selection);
                this.recentSelectedDisplayed++;
            }
            return recentSelectedObjects;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ChooserState.prototype.selectedObject = /**
     * @return {?}
     */
    function () {
        return this.selectionState.selectedObject();
    };
    /**
     * @return {?}
     */
    ChooserState.prototype.selectedObjects = /**
     * @return {?}
     */
    function () {
        return this.selectionState.selectedObjects();
    };
    /**
     * @param {?} selection
     * @param {?} selected
     * @return {?}
     */
    ChooserState.prototype.setSelectionState = /**
     * @param {?} selection
     * @param {?} selected
     * @return {?}
     */
    function (selection, selected) {
        if (isPresent(selection)) {
            this.selectionState.setSelectionState(selection, selected);
        }
    };
    return ChooserState;
}());
/**
 * ChooserState manages complete lifecycle for the Chooser Component. It keeps track of current
 * selection as well as it can broadcast any updates.
 *
 *
 */
export { ChooserState };
function ChooserState_tsickle_Closure_declarations() {
    /**
     *  Callback to the parent object to store current selection
     * @type {?}
     */
    ChooserState.prototype.selectionState;
    /**
     * todo: We do not needed this !!
     * @type {?}
     */
    ChooserState.prototype.currentItem;
    /**
     * Matching pattern. User latest input to the chooser input field
     * @type {?}
     */
    ChooserState.prototype.pattern;
    /**
     * Last successfull pattern that retrieved some data
     * @type {?}
     */
    ChooserState.prototype.lastFullMatchPattern;
    /**
     * Current matched items using ChooserSelectionState
     * @type {?}
     */
    ChooserState.prototype.matches;
    /**
     * Is this multiselect chooser
     * @type {?}
     */
    ChooserState.prototype.multiselect;
    /**
     *
     * Implementation can set lookup key to narrow the search. If we are dealing with object
     * you should set this.
     *
     * @type {?}
     */
    ChooserState.prototype.lookupKey;
    /**
     * previous display value is set when the display value is rendered on the chooser. we cache
     * the UI value to compare with the inbound value later instead of the value from underlying
     * object because business logic level code could have changed the underlying object's value
     *
     * todo: do I still need this?
     * @type {?}
     */
    ChooserState.prototype.prevDisplayValue;
    /**
     * Indicates if there are any validation like entered value does not much with the source list.
     *
     * @type {?}
     */
    ChooserState.prototype.isInvalid;
    /**
     *
     * indicates that we started to some editing e.g. starting to type in something into the
     * filter, or removing already selected items
     * @type {?}
     */
    ChooserState.prototype.addMode;
    /** @type {?} */
    ChooserState.prototype.recentSelectedDisplayed;
    /**
     * When this option is active we do not show all selected items, but max number that is
     * defined. User is able to toggle to expand the view to see all selections and hide them as
     * well
     * @type {?}
     */
    ChooserState.prototype.showAllRecentlySelected;
}
/**
 * Dummy implementation ChooserSelectionState
 */
var /**
 * Dummy implementation ChooserSelectionState
 */
DefaultSelectionState = /** @class */ (function (_super) {
    tslib_1.__extends(DefaultSelectionState, _super);
    function DefaultSelectionState(multiSelect) {
        var _this = _super.call(this) || this;
        _this.multiSelect = multiSelect;
        return _this;
    }
    /**
     * @param {?} selection
     * @param {?} selected
     * @return {?}
     */
    DefaultSelectionState.prototype.setSelectionState = /**
     * @param {?} selection
     * @param {?} selected
     * @return {?}
     */
    function (selection, selected) {
        if (selected) {
            this._selectedObject = selection;
            if (this.multiSelect && !ListWrapper.containsComplex(this.selectedObjects(), selection)) {
                this.selectedObjects().push(selection);
            }
        }
        else {
            if (this.multiSelect) {
                ListWrapper.removeIfExist(this.selectedObjects(), selection);
            }
        }
    };
    /**
     * @return {?}
     */
    DefaultSelectionState.prototype.selectedObject = /**
     * @return {?}
     */
    function () {
        return this._selectedObject;
    };
    /**
     * @return {?}
     */
    DefaultSelectionState.prototype.selectedObjects = /**
     * @return {?}
     */
    function () {
        if (isBlank(this._selectedObjects)) {
            this._selectedObjects = [];
        }
        return this._selectedObjects;
    };
    /**
     * @param {?} selection
     * @return {?}
     */
    DefaultSelectionState.prototype.isSelected = /**
     * @param {?} selection
     * @return {?}
     */
    function (selection) {
        return _super.prototype.isSelected.call(this, selection);
    };
    return DefaultSelectionState;
}(ChooserSelectionState));
/**
 * Dummy implementation ChooserSelectionState
 */
export { DefaultSelectionState };
function DefaultSelectionState_tsickle_Closure_declarations() {
    /** @type {?} */
    DefaultSelectionState.prototype._selectedObject;
    /** @type {?} */
    DefaultSelectionState.prototype._selectedObjects;
    /** @type {?} */
    DefaultSelectionState.prototype.multiSelect;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvb3Nlci1zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2Nob29zZXIvY2hvb3Nlci1zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW9CQSxPQUFPLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDZCQUE2QixDQUFDOzs7Ozs7O0FBUXZEOzs7Ozs7QUFBQTtJQWtGSSxzQkFBWSxxQkFBNkMsRUFBRSxPQUF1QjtRQUF2Qix3QkFBQSxFQUFBLGNBQXVCOzs7Ozt5QkFyQjdELEtBQUs7Ozs7Ozt1QkFPUCxLQUFLO3VDQUdVLENBQUM7Ozs7Ozt1Q0FRQSxLQUFLO1FBTXBDLElBQUksQ0FBQyxjQUFjLEdBQUcscUJBQXFCLENBQUM7UUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFFM0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNyRTtLQUNKO0lBR0Q7Ozs7T0FJRzs7Ozs7Ozs7SUFDSCw2Q0FBc0I7Ozs7Ozs7SUFBdEIsVUFBdUIsSUFBUztRQUU1QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQzNCO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxF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QWU7OztJQUFmO1FBRUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1NBQzlCO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztLQUNoQzs7Ozs7SUFFRCwwQ0FBVTs7OztJQUFWLFVBQVcsU0FBYztRQUVyQixNQUFNLENBQUMsaUJBQU0sVUFBVSxZQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3RDO2dDQTlRTDtFQW9PMkMscUJBQXFCLEVBMkMvRCxDQUFBOzs7O0FBM0NELGlDQTJDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtpc0JsYW5rLCBpc1ByZXNlbnQsIExpc3RXcmFwcGVyfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7Q2hvb3NlclNlbGVjdGlvblN0YXRlfSBmcm9tICcuL2Nob29zZXItc2VsZWN0aW9uLXN0YXRlJztcbmltcG9ydCB7RGF0YVNvdXJjZX0gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtc291cmNlJztcblxuLyoqXG4gKiBDaG9vc2VyU3RhdGUgbWFuYWdlcyBjb21wbGV0ZSBsaWZlY3ljbGUgZm9yIHRoZSBDaG9vc2VyIENvbXBvbmVudC4gSXQga2VlcHMgdHJhY2sgb2YgY3VycmVudFxuICogc2VsZWN0aW9uIGFzIHdlbGwgYXMgaXQgY2FuIGJyb2FkY2FzdCBhbnkgdXBkYXRlcy5cbiAqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQ2hvb3NlclN0YXRlXG57XG5cbiAgICAvKipcbiAgICAgKiAgQ2FsbGJhY2sgdG8gdGhlIHBhcmVudCBvYmplY3QgdG8gc3RvcmUgY3VycmVudCBzZWxlY3Rpb25cbiAgICAgKi9cbiAgICBzZWxlY3Rpb25TdGF0ZTogQ2hvb3NlclNlbGVjdGlvblN0YXRlO1xuXG4gICAgLyoqXG4gICAgICogdG9kbzogV2UgZG8gbm90IG5lZWRlZCB0aGlzICEhXG4gICAgICovXG4gICAgY3VycmVudEl0ZW06IGFueTtcblxuXG4gICAgLyoqXG4gICAgICogTWF0Y2hpbmcgcGF0dGVybi4gVXNlciBsYXRlc3QgaW5wdXQgdG8gdGhlIGNob29zZXIgaW5wdXQgZmllbGRcbiAgICAgKi9cbiAgICBwYXR0ZXJuOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIExhc3Qgc3VjY2Vzc2Z1bGwgcGF0dGVybiB0aGF0IHJldHJpZXZlZCBzb21lIGRhdGFcbiAgICAgKi9cbiAgICBsYXN0RnVsbE1hdGNoUGF0dGVybjogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IG1hdGNoZWQgaXRlbXMgdXNpbmcgQ2hvb3NlclNlbGVjdGlvblN0YXRlXG4gICAgICovXG4gICAgbWF0Y2hlczogQXJyYXk8YW55PjtcblxuXG4gICAgLyoqXG4gICAgICogSXMgdGhpcyBtdWx0aXNlbGVjdCBjaG9vc2VyXG4gICAgICovXG4gICAgbXVsdGlzZWxlY3Q6IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSW1wbGVtZW50YXRpb24gY2FuIHNldCBsb29rdXAga2V5IHRvIG5hcnJvdyB0aGUgc2VhcmNoLiBJZiB3ZSBhcmUgZGVhbGluZyB3aXRoIG9iamVjdFxuICAgICAqIHlvdSBzaG91bGQgc2V0IHRoaXMuXG4gICAgICpcbiAgICAgKi9cbiAgICBsb29rdXBLZXk6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogcHJldmlvdXMgZGlzcGxheSB2YWx1ZSBpcyBzZXQgd2hlbiB0aGUgZGlzcGxheSB2YWx1ZSBpcyByZW5kZXJlZCBvbiB0aGUgY2hvb3Nlci4gd2UgY2FjaGVcbiAgICAgKiB0aGUgVUkgdmFsdWUgdG8gY29tcGFyZSB3aXRoIHRoZSBpbmJvdW5kIHZhbHVlIGxhdGVyIGluc3RlYWQgb2YgdGhlIHZhbHVlIGZyb20gdW5kZXJseWluZ1xuICAgICAqIG9iamVjdCBiZWNhdXNlIGJ1c2luZXNzIGxvZ2ljIGxldmVsIGNvZGUgY291bGQgaGF2ZSBjaGFuZ2VkIHRoZSB1bmRlcmx5aW5nIG9iamVjdCdzIHZhbHVlXG4gICAgICpcbiAgICAgKiB0b2RvOiBkbyBJIHN0aWxsIG5lZWQgdGhpcz9cbiAgICAgKi9cbiAgICBwcmV2RGlzcGxheVZhbHVlOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBpZiB0aGVyZSBhcmUgYW55IHZhbGlkYXRpb24gbGlrZSBlbnRlcmVkIHZhbHVlIGRvZXMgbm90IG11Y2ggd2l0aCB0aGUgc291cmNlIGxpc3QuXG4gICAgICpcbiAgICAgKi9cbiAgICBpc0ludmFsaWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogaW5kaWNhdGVzIHRoYXQgd2Ugc3RhcnRlZCB0byBzb21lIGVkaXRpbmcgZS5nLiBzdGFydGluZyB0byB0eXBlIGluIHNvbWV0aGluZyBpbnRvIHRoZVxuICAgICAqIGZpbHRlciwgb3IgcmVtb3ZpbmcgYWxyZWFkeSBzZWxlY3RlZCBpdGVtc1xuICAgICAqL1xuICAgIGFkZE1vZGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgcmVjZW50U2VsZWN0ZWREaXNwbGF5ZWQ6IG51bWJlciA9IDA7XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gdGhpcyBvcHRpb24gaXMgYWN0aXZlIHdlIGRvIG5vdCBzaG93IGFsbCBzZWxlY3RlZCBpdGVtcywgYnV0IG1heCBudW1iZXIgdGhhdCBpc1xuICAgICAqIGRlZmluZWQuIFVzZXIgaXMgYWJsZSB0byB0b2dnbGUgdG8gZXhwYW5kIHRoZSB2aWV3IHRvIHNlZSBhbGwgc2VsZWN0aW9ucyBhbmQgaGlkZSB0aGVtIGFzXG4gICAgICogd2VsbFxuICAgICAqL1xuICAgIHNob3dBbGxSZWNlbnRseVNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIGNvbnN0cnVjdG9yKGNob29zZXJTZWxlY3Rpb25TdGF0ZT86IENob29zZXJTZWxlY3Rpb25TdGF0ZSwgaXNNdWx0aTogYm9vbGVhbiA9IHRydWUpXG4gICAge1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhdGUgPSBjaG9vc2VyU2VsZWN0aW9uU3RhdGU7XG4gICAgICAgIHRoaXMubXVsdGlzZWxlY3QgPSBpc011bHRpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuc2VsZWN0aW9uU3RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXRlID0gbmV3IERlZmF1bHRTZWxlY3Rpb25TdGF0ZSh0aGlzLm11bHRpc2VsZWN0KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJdCB3aWxsIHNlbGVjdCBhbmQgcGVyc2lzdCBhbiBpdGVtIHVzaW5nIENob29zZXJTZWxlY3Rpb25TdGF0ZSBwcm92aWRlci5cbiAgICAgKlxuICAgICAqL1xuICAgIHVwZGF0ZWRTZWxlY3RlZE9iamVjdHMoaXRlbTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsoaXRlbSkpIHtcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmN1cnJlbnRJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm11bHRpc2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvblN0YXRlKGl0ZW0sIHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkT2JqZWN0ID0gdGhpcy5zZWxlY3RlZE9iamVjdCgpO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkT2JqZWN0cyA9IHRoaXMuc2VsZWN0ZWRPYmplY3RzKCk7XG5cblxuICAgICAgICAgICAgaWYgKHRoaXMuYWRkTW9kZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSW52YWxpZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNQcmVzZW50KHNlbGVjdGVkT2JqZWN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25TdGF0ZShzZWxlY3RlZE9iamVjdCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25TdGF0ZShpdGVtLCAhTGlzdFdyYXBwZXIuY29udGFpbnNDb21wbGV4KHNlbGVjdGVkT2JqZWN0cywgaXRlbSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNQcmVzZW50KHNlbGVjdGVkT2JqZWN0KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvblN0YXRlKHNlbGVjdGVkT2JqZWN0LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uU3RhdGUoaXRlbSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gdXNlciBzZWxlY3Rpb24gaXMgbGFyZ2Ugd2UgdXNlIHRoaXMgbWV0aG9kIHRvIGNoZWNrIGlmIHdlIG5lZWQgdG8gc2hvdyBhbGwgc2VsZWN0ZWRcbiAgICAgKiBpdGVtcyBvciBvbmx5IE1heFJlY2VudFNlbGVjdGVkXG4gICAgICovXG4gICAgdG9nZ2xlQWxsU2VsZWN0ZWQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5zaG93QWxsUmVjZW50bHlTZWxlY3RlZCA9ICF0aGlzLnNob3dBbGxSZWNlbnRseVNlbGVjdGVkO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBSZW5kZXJzIHVzZXIncyBzZWxlY3Rpb24gdW5kZXIgdGhlIGlucHV0IGZpZWxkXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXQgcmVjZW50U2VsZWN0ZWRPYmplY3RzKCk6IEFycmF5IDxhbnk+XG4gICAge1xuXG4gICAgICAgIGlmICghdGhpcy5tdWx0aXNlbGVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlY2VudFNlbGVjdGVkT2JqZWN0czogYW55W10gPSBbXTtcbiAgICAgICAgdGhpcy5yZWNlbnRTZWxlY3RlZERpc3BsYXllZCA9IDA7XG4gICAgICAgIGxldCBzZWxlY3RlZE9iamVjdHMgPSB0aGlzLnNlbGVjdGVkT2JqZWN0cygpO1xuICAgICAgICBsZXQgc2l6ZSA9IHNlbGVjdGVkT2JqZWN0cy5sZW5ndGg7XG4gICAgICAgIGxldCBtYXhDb3VudCA9IERhdGFTb3VyY2UuTWF4UmVjZW50U2VsZWN0ZWQ7XG4gICAgICAgIGlmIChzaXplID4gRGF0YVNvdXJjZS5NYXhSZWNlbnRTZWxlY3RlZCAmJiAhdGhpcy5zaG93QWxsUmVjZW50bHlTZWxlY3RlZCkge1xuICAgICAgICAgICAgbWF4Q291bnQgLT0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zaG93QWxsUmVjZW50bHlTZWxlY3RlZCkge1xuICAgICAgICAgICAgbWF4Q291bnQgPSBzaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHNpemUgLSAxOyBpID49IDAgJiYgKHRoaXMucmVjZW50U2VsZWN0ZWREaXNwbGF5ZWQgPCBtYXhDb3VudCk7IGktLSkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbiA9IHNlbGVjdGVkT2JqZWN0c1tpXTtcbiAgICAgICAgICAgIHJlY2VudFNlbGVjdGVkT2JqZWN0cy5wdXNoKHNlbGVjdGlvbik7XG4gICAgICAgICAgICB0aGlzLnJlY2VudFNlbGVjdGVkRGlzcGxheWVkKys7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVjZW50U2VsZWN0ZWRPYmplY3RzO1xuICAgIH1cblxuICAgIHNlbGVjdGVkT2JqZWN0KCk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uU3RhdGUuc2VsZWN0ZWRPYmplY3QoKTtcbiAgICB9XG5cblxuICAgIHNlbGVjdGVkT2JqZWN0cygpOiBBcnJheTxhbnk+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25TdGF0ZS5zZWxlY3RlZE9iamVjdHMoKTtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3Rpb25TdGF0ZShzZWxlY3Rpb246IGFueSwgc2VsZWN0ZWQ6IGJvb2xlYW4pOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHNlbGVjdGlvbilcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXRlLnNldFNlbGVjdGlvblN0YXRlKHNlbGVjdGlvbiwgc2VsZWN0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBEdW1teSBpbXBsZW1lbnRhdGlvbiBDaG9vc2VyU2VsZWN0aW9uU3RhdGVcbiAqL1xuZXhwb3J0IGNsYXNzIERlZmF1bHRTZWxlY3Rpb25TdGF0ZSBleHRlbmRzIENob29zZXJTZWxlY3Rpb25TdGF0ZVxue1xuICAgIHByaXZhdGUgX3NlbGVjdGVkT2JqZWN0OiBhbnk7XG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRPYmplY3RzOiBhbnk7XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbXVsdGlTZWxlY3Q6IGJvb2xlYW4pXG4gICAge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHNldFNlbGVjdGlvblN0YXRlKHNlbGVjdGlvbjogYW55LCBzZWxlY3RlZDogYm9vbGVhbik6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPYmplY3QgPSBzZWxlY3Rpb247XG4gICAgICAgICAgICBpZiAodGhpcy5tdWx0aVNlbGVjdCAmJiAhTGlzdFdyYXBwZXIuY29udGFpbnNDb21wbGV4KHRoaXMuc2VsZWN0ZWRPYmplY3RzKCksXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkT2JqZWN0cygpLnB1c2goc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm11bHRpU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgTGlzdFdyYXBwZXIucmVtb3ZlSWZFeGlzdCh0aGlzLnNlbGVjdGVkT2JqZWN0cygpLCBzZWxlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0ZWRPYmplY3QoKTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRPYmplY3Q7XG4gICAgfVxuXG4gICAgc2VsZWN0ZWRPYmplY3RzKCk6IEFycmF5PGFueT5cbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX3NlbGVjdGVkT2JqZWN0cykpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT2JqZWN0cyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZE9iamVjdHM7XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZChzZWxlY3Rpb246IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBzdXBlci5pc1NlbGVjdGVkKHNlbGVjdGlvbik7XG4gICAgfVxufVxuXG4iXX0=