/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
            /** @type {?} */
            var selectedObject = this.selectedObject();
            /** @type {?} */
            var selectedObjects = this.selectedObjects();
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
            /** @type {?} */
            var recentSelectedObjects = [];
            this.recentSelectedDisplayed = 0;
            /** @type {?} */
            var selectedObjects = this.selectedObjects();
            /** @type {?} */
            var size = selectedObjects.length;
            /** @type {?} */
            var maxCount = DataSource.MaxRecentSelected;
            if (size > DataSource.MaxRecentSelected && !this.showAllRecentlySelected) {
                maxCount -= 1;
            }
            if (this.showAllRecentlySelected) {
                maxCount = size;
            }
            for (var i = size - 1; i >= 0 && (this.recentSelectedDisplayed < maxCount); i--) {
                /** @type {?} */
                var selection = selectedObjects[i];
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
if (false) {
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
if (false) {
    /** @type {?} */
    DefaultSelectionState.prototype._selectedObject;
    /** @type {?} */
    DefaultSelectionState.prototype._selectedObjects;
    /** @type {?} */
    DefaultSelectionState.prototype.multiSelect;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvb3Nlci1zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2Nob29zZXIvY2hvb3Nlci1zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW9CQSxPQUFPLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDZCQUE2QixDQUFDOzs7Ozs7O0FBUXZEOzs7Ozs7QUFBQTtJQWtGSSxzQkFBWSxxQkFBNkMsRUFBRSxPQUF1QjtRQUF2Qix3QkFBQSxFQUFBLGNBQXVCOzs7Ozt5QkFyQjdELEtBQUs7Ozs7Ozt1QkFPUCxLQUFLO3VDQUdVLENBQUM7Ozs7Ozt1Q0FRQSxLQUFLO1FBTXBDLElBQUksQ0FBQyxjQUFjLEdBQUcscUJBQXFCLENBQUM7UUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFFM0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNyRTtLQUNKO0lBR0Q7Ozs7T0FJRzs7Ozs7Ozs7SUFDSCw2Q0FBc0I7Ozs7Ozs7SUFBdEIsVUFBdUIsSUFBUztRQUU1QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQzNCO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxF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ZTs7O0lBQWY7UUFFSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7U0FDOUI7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0tBQ2hDOzs7OztJQUVELDBDQUFVOzs7O0lBQVYsVUFBVyxTQUFjO1FBRXJCLE1BQU0sQ0FBQyxpQkFBTSxVQUFVLFlBQUMsU0FBUyxDQUFDLENBQUM7S0FDdEM7Z0NBOVFMO0VBb08yQyxxQkFBcUIsRUEyQy9ELENBQUE7Ozs7QUEzQ0QsaUNBMkNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge2lzQmxhbmssIGlzUHJlc2VudCwgTGlzdFdyYXBwZXJ9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtDaG9vc2VyU2VsZWN0aW9uU3RhdGV9IGZyb20gJy4vY2hvb3Nlci1zZWxlY3Rpb24tc3RhdGUnO1xuaW1wb3J0IHtEYXRhU291cmNlfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1zb3VyY2UnO1xuXG4vKipcbiAqIENob29zZXJTdGF0ZSBtYW5hZ2VzIGNvbXBsZXRlIGxpZmVjeWNsZSBmb3IgdGhlIENob29zZXIgQ29tcG9uZW50LiBJdCBrZWVwcyB0cmFjayBvZiBjdXJyZW50XG4gKiBzZWxlY3Rpb24gYXMgd2VsbCBhcyBpdCBjYW4gYnJvYWRjYXN0IGFueSB1cGRhdGVzLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBDaG9vc2VyU3RhdGVcbntcblxuICAgIC8qKlxuICAgICAqICBDYWxsYmFjayB0byB0aGUgcGFyZW50IG9iamVjdCB0byBzdG9yZSBjdXJyZW50IHNlbGVjdGlvblxuICAgICAqL1xuICAgIHNlbGVjdGlvblN0YXRlOiBDaG9vc2VyU2VsZWN0aW9uU3RhdGU7XG5cbiAgICAvKipcbiAgICAgKiB0b2RvOiBXZSBkbyBub3QgbmVlZGVkIHRoaXMgISFcbiAgICAgKi9cbiAgICBjdXJyZW50SXRlbTogYW55O1xuXG5cbiAgICAvKipcbiAgICAgKiBNYXRjaGluZyBwYXR0ZXJuLiBVc2VyIGxhdGVzdCBpbnB1dCB0byB0aGUgY2hvb3NlciBpbnB1dCBmaWVsZFxuICAgICAqL1xuICAgIHBhdHRlcm46IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogTGFzdCBzdWNjZXNzZnVsbCBwYXR0ZXJuIHRoYXQgcmV0cmlldmVkIHNvbWUgZGF0YVxuICAgICAqL1xuICAgIGxhc3RGdWxsTWF0Y2hQYXR0ZXJuOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgbWF0Y2hlZCBpdGVtcyB1c2luZyBDaG9vc2VyU2VsZWN0aW9uU3RhdGVcbiAgICAgKi9cbiAgICBtYXRjaGVzOiBBcnJheTxhbnk+O1xuXG5cbiAgICAvKipcbiAgICAgKiBJcyB0aGlzIG11bHRpc2VsZWN0IGNob29zZXJcbiAgICAgKi9cbiAgICBtdWx0aXNlbGVjdDogYm9vbGVhbjtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJbXBsZW1lbnRhdGlvbiBjYW4gc2V0IGxvb2t1cCBrZXkgdG8gbmFycm93IHRoZSBzZWFyY2guIElmIHdlIGFyZSBkZWFsaW5nIHdpdGggb2JqZWN0XG4gICAgICogeW91IHNob3VsZCBzZXQgdGhpcy5cbiAgICAgKlxuICAgICAqL1xuICAgIGxvb2t1cEtleTogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBwcmV2aW91cyBkaXNwbGF5IHZhbHVlIGlzIHNldCB3aGVuIHRoZSBkaXNwbGF5IHZhbHVlIGlzIHJlbmRlcmVkIG9uIHRoZSBjaG9vc2VyLiB3ZSBjYWNoZVxuICAgICAqIHRoZSBVSSB2YWx1ZSB0byBjb21wYXJlIHdpdGggdGhlIGluYm91bmQgdmFsdWUgbGF0ZXIgaW5zdGVhZCBvZiB0aGUgdmFsdWUgZnJvbSB1bmRlcmx5aW5nXG4gICAgICogb2JqZWN0IGJlY2F1c2UgYnVzaW5lc3MgbG9naWMgbGV2ZWwgY29kZSBjb3VsZCBoYXZlIGNoYW5nZWQgdGhlIHVuZGVybHlpbmcgb2JqZWN0J3MgdmFsdWVcbiAgICAgKlxuICAgICAqIHRvZG86IGRvIEkgc3RpbGwgbmVlZCB0aGlzP1xuICAgICAqL1xuICAgIHByZXZEaXNwbGF5VmFsdWU6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGlmIHRoZXJlIGFyZSBhbnkgdmFsaWRhdGlvbiBsaWtlIGVudGVyZWQgdmFsdWUgZG9lcyBub3QgbXVjaCB3aXRoIHRoZSBzb3VyY2UgbGlzdC5cbiAgICAgKlxuICAgICAqL1xuICAgIGlzSW52YWxpZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBpbmRpY2F0ZXMgdGhhdCB3ZSBzdGFydGVkIHRvIHNvbWUgZWRpdGluZyBlLmcuIHN0YXJ0aW5nIHRvIHR5cGUgaW4gc29tZXRoaW5nIGludG8gdGhlXG4gICAgICogZmlsdGVyLCBvciByZW1vdmluZyBhbHJlYWR5IHNlbGVjdGVkIGl0ZW1zXG4gICAgICovXG4gICAgYWRkTW9kZTogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICByZWNlbnRTZWxlY3RlZERpc3BsYXllZDogbnVtYmVyID0gMDtcblxuXG4gICAgLyoqXG4gICAgICogV2hlbiB0aGlzIG9wdGlvbiBpcyBhY3RpdmUgd2UgZG8gbm90IHNob3cgYWxsIHNlbGVjdGVkIGl0ZW1zLCBidXQgbWF4IG51bWJlciB0aGF0IGlzXG4gICAgICogZGVmaW5lZC4gVXNlciBpcyBhYmxlIHRvIHRvZ2dsZSB0byBleHBhbmQgdGhlIHZpZXcgdG8gc2VlIGFsbCBzZWxlY3Rpb25zIGFuZCBoaWRlIHRoZW0gYXNcbiAgICAgKiB3ZWxsXG4gICAgICovXG4gICAgc2hvd0FsbFJlY2VudGx5U2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgY29uc3RydWN0b3IoY2hvb3NlclNlbGVjdGlvblN0YXRlPzogQ2hvb3NlclNlbGVjdGlvblN0YXRlLCBpc011bHRpOiBib29sZWFuID0gdHJ1ZSlcbiAgICB7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGF0ZSA9IGNob29zZXJTZWxlY3Rpb25TdGF0ZTtcbiAgICAgICAgdGhpcy5tdWx0aXNlbGVjdCA9IGlzTXVsdGk7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5zZWxlY3Rpb25TdGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhdGUgPSBuZXcgRGVmYXVsdFNlbGVjdGlvblN0YXRlKHRoaXMubXVsdGlzZWxlY3QpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEl0IHdpbGwgc2VsZWN0IGFuZCBwZXJzaXN0IGFuIGl0ZW0gdXNpbmcgQ2hvb3NlclNlbGVjdGlvblN0YXRlIHByb3ZpZGVyLlxuICAgICAqXG4gICAgICovXG4gICAgdXBkYXRlZFNlbGVjdGVkT2JqZWN0cyhpdGVtOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayhpdGVtKSkge1xuICAgICAgICAgICAgaXRlbSA9IHRoaXMuY3VycmVudEl0ZW07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMubXVsdGlzZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uU3RhdGUoaXRlbSwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRPYmplY3QgPSB0aGlzLnNlbGVjdGVkT2JqZWN0KCk7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRPYmplY3RzID0gdGhpcy5zZWxlY3RlZE9iamVjdHMoKTtcblxuXG4gICAgICAgICAgICBpZiAodGhpcy5hZGRNb2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJbnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoc2VsZWN0ZWRPYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvblN0YXRlKHNlbGVjdGVkT2JqZWN0LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvblN0YXRlKGl0ZW0sICFMaXN0V3JhcHBlci5jb250YWluc0NvbXBsZXgoc2VsZWN0ZWRPYmplY3RzLCBpdGVtKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoc2VsZWN0ZWRPYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uU3RhdGUoc2VsZWN0ZWRPYmplY3QsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25TdGF0ZShpdGVtLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogV2hlbiB1c2VyIHNlbGVjdGlvbiBpcyBsYXJnZSB3ZSB1c2UgdGhpcyBtZXRob2QgdG8gY2hlY2sgaWYgd2UgbmVlZCB0byBzaG93IGFsbCBzZWxlY3RlZFxuICAgICAqIGl0ZW1zIG9yIG9ubHkgTWF4UmVjZW50U2VsZWN0ZWRcbiAgICAgKi9cbiAgICB0b2dnbGVBbGxTZWxlY3RlZCgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnNob3dBbGxSZWNlbnRseVNlbGVjdGVkID0gIXRoaXMuc2hvd0FsbFJlY2VudGx5U2VsZWN0ZWQ7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFJlbmRlcnMgdXNlcidzIHNlbGVjdGlvbiB1bmRlciB0aGUgaW5wdXQgZmllbGRcbiAgICAgKlxuICAgICAqL1xuICAgIGdldCByZWNlbnRTZWxlY3RlZE9iamVjdHMoKTogQXJyYXkgPGFueT5cbiAgICB7XG5cbiAgICAgICAgaWYgKCF0aGlzLm11bHRpc2VsZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVjZW50U2VsZWN0ZWRPYmplY3RzOiBhbnlbXSA9IFtdO1xuICAgICAgICB0aGlzLnJlY2VudFNlbGVjdGVkRGlzcGxheWVkID0gMDtcbiAgICAgICAgbGV0IHNlbGVjdGVkT2JqZWN0cyA9IHRoaXMuc2VsZWN0ZWRPYmplY3RzKCk7XG4gICAgICAgIGxldCBzaXplID0gc2VsZWN0ZWRPYmplY3RzLmxlbmd0aDtcbiAgICAgICAgbGV0IG1heENvdW50ID0gRGF0YVNvdXJjZS5NYXhSZWNlbnRTZWxlY3RlZDtcbiAgICAgICAgaWYgKHNpemUgPiBEYXRhU291cmNlLk1heFJlY2VudFNlbGVjdGVkICYmICF0aGlzLnNob3dBbGxSZWNlbnRseVNlbGVjdGVkKSB7XG4gICAgICAgICAgICBtYXhDb3VudCAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNob3dBbGxSZWNlbnRseVNlbGVjdGVkKSB7XG4gICAgICAgICAgICBtYXhDb3VudCA9IHNpemU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gc2l6ZSAtIDE7IGkgPj0gMCAmJiAodGhpcy5yZWNlbnRTZWxlY3RlZERpc3BsYXllZCA8IG1heENvdW50KTsgaS0tKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uID0gc2VsZWN0ZWRPYmplY3RzW2ldO1xuICAgICAgICAgICAgcmVjZW50U2VsZWN0ZWRPYmplY3RzLnB1c2goc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMucmVjZW50U2VsZWN0ZWREaXNwbGF5ZWQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZWNlbnRTZWxlY3RlZE9iamVjdHM7XG4gICAgfVxuXG4gICAgc2VsZWN0ZWRPYmplY3QoKTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25TdGF0ZS5zZWxlY3RlZE9iamVjdCgpO1xuICAgIH1cblxuXG4gICAgc2VsZWN0ZWRPYmplY3RzKCk6IEFycmF5PGFueT5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblN0YXRlLnNlbGVjdGVkT2JqZWN0cygpO1xuICAgIH1cblxuICAgIHNldFNlbGVjdGlvblN0YXRlKHNlbGVjdGlvbjogYW55LCBzZWxlY3RlZDogYm9vbGVhbik6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoc2VsZWN0aW9uKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhdGUuc2V0U2VsZWN0aW9uU3RhdGUoc2VsZWN0aW9uLCBzZWxlY3RlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG4vKipcbiAqIER1bW15IGltcGxlbWVudGF0aW9uIENob29zZXJTZWxlY3Rpb25TdGF0ZVxuICovXG5leHBvcnQgY2xhc3MgRGVmYXVsdFNlbGVjdGlvblN0YXRlIGV4dGVuZHMgQ2hvb3NlclNlbGVjdGlvblN0YXRlXG57XG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRPYmplY3Q6IGFueTtcbiAgICBwcml2YXRlIF9zZWxlY3RlZE9iamVjdHM6IGFueTtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtdWx0aVNlbGVjdDogYm9vbGVhbilcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgc2V0U2VsZWN0aW9uU3RhdGUoc2VsZWN0aW9uOiBhbnksIHNlbGVjdGVkOiBib29sZWFuKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9iamVjdCA9IHNlbGVjdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLm11bHRpU2VsZWN0ICYmICFMaXN0V3JhcHBlci5jb250YWluc0NvbXBsZXgodGhpcy5zZWxlY3RlZE9iamVjdHMoKSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRPYmplY3RzKCkucHVzaChzZWxlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlTZWxlY3QpIHtcbiAgICAgICAgICAgICAgICBMaXN0V3JhcHBlci5yZW1vdmVJZkV4aXN0KHRoaXMuc2VsZWN0ZWRPYmplY3RzKCksIHNlbGVjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RlZE9iamVjdCgpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZE9iamVjdDtcbiAgICB9XG5cbiAgICBzZWxlY3RlZE9iamVjdHMoKTogQXJyYXk8YW55PlxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fc2VsZWN0ZWRPYmplY3RzKSkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPYmplY3RzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkT2JqZWN0cztcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKHNlbGVjdGlvbjogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmlzU2VsZWN0ZWQoc2VsZWN0aW9uKTtcbiAgICB9XG59XG5cbiJdfQ==