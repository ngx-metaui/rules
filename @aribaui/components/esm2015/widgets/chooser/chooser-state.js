/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { isBlank, isPresent, ListWrapper } from '@aribaui/core';
import { ChooserSelectionState } from './chooser-selection-state';
import { DataSource } from '../../core/data/data-source';
/**
 * ChooserState manages complete lifecycle for the Chooser Component. It keeps track of current
 * selection as well as it can broadcast any updates.
 *
 *
 */
export class ChooserState {
    /**
     * @param {?=} chooserSelectionState
     * @param {?=} isMulti
     */
    constructor(chooserSelectionState, isMulti = true) {
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
     * @param {?} item
     * @return {?}
     */
    updatedSelectedObjects(item) {
        if (isBlank(item)) {
            item = this.currentItem;
        }
        if (!this.multiselect) {
            this.setSelectionState(item, true);
        }
        else {
            /** @type {?} */
            let selectedObject = this.selectedObject();
            /** @type {?} */
            let selectedObjects = this.selectedObjects();
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
    }
    /**
     * When user selection is large we use this method to check if we need to show all selected
     * items or only MaxRecentSelected
     * @return {?}
     */
    toggleAllSelected() {
        this.showAllRecentlySelected = !this.showAllRecentlySelected;
    }
    /**
     *
     * Renders user's selection under the input field
     *
     * @return {?}
     */
    get recentSelectedObjects() {
        if (!this.multiselect) {
            return [];
        }
        /** @type {?} */
        let recentSelectedObjects = [];
        this.recentSelectedDisplayed = 0;
        /** @type {?} */
        let selectedObjects = this.selectedObjects();
        /** @type {?} */
        let size = selectedObjects.length;
        /** @type {?} */
        let maxCount = DataSource.MaxRecentSelected;
        if (size > DataSource.MaxRecentSelected && !this.showAllRecentlySelected) {
            maxCount -= 1;
        }
        if (this.showAllRecentlySelected) {
            maxCount = size;
        }
        for (let i = size - 1; i >= 0 && (this.recentSelectedDisplayed < maxCount); i--) {
            /** @type {?} */
            let selection = selectedObjects[i];
            recentSelectedObjects.push(selection);
            this.recentSelectedDisplayed++;
        }
        return recentSelectedObjects;
    }
    /**
     * @return {?}
     */
    selectedObject() {
        return this.selectionState.selectedObject();
    }
    /**
     * @return {?}
     */
    selectedObjects() {
        return this.selectionState.selectedObjects();
    }
    /**
     * @param {?} selection
     * @param {?} selected
     * @return {?}
     */
    setSelectionState(selection, selected) {
        if (isPresent(selection)) {
            this.selectionState.setSelectionState(selection, selected);
        }
    }
}
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
export class DefaultSelectionState extends ChooserSelectionState {
    /**
     * @param {?} multiSelect
     */
    constructor(multiSelect) {
        super();
        this.multiSelect = multiSelect;
    }
    /**
     * @param {?} selection
     * @param {?} selected
     * @return {?}
     */
    setSelectionState(selection, selected) {
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
    }
    /**
     * @return {?}
     */
    selectedObject() {
        return this._selectedObject;
    }
    /**
     * @return {?}
     */
    selectedObjects() {
        if (isBlank(this._selectedObjects)) {
            this._selectedObjects = [];
        }
        return this._selectedObjects;
    }
    /**
     * @param {?} selection
     * @return {?}
     */
    isSelected(selection) {
        return super.isSelected(selection);
    }
}
if (false) {
    /** @type {?} */
    DefaultSelectionState.prototype._selectedObject;
    /** @type {?} */
    DefaultSelectionState.prototype._selectedObjects;
    /** @type {?} */
    DefaultSelectionState.prototype.multiSelect;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvb3Nlci1zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2Nob29zZXIvY2hvb3Nlci1zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7Ozs7Ozs7QUFRdkQsTUFBTTs7Ozs7SUFrRkYsWUFBWSxxQkFBNkMsRUFBRSxVQUFtQixJQUFJOzs7Ozt5QkFyQjdELEtBQUs7Ozs7Ozt1QkFPUCxLQUFLO3VDQUdVLENBQUM7Ozs7Ozt1Q0FRQSxLQUFLO1FBTXBDLElBQUksQ0FBQyxjQUFjLEdBQUcscUJBQXFCLENBQUM7UUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFFM0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNyRTtLQUNKOzs7Ozs7OztJQVFELHNCQUFzQixDQUFDLElBQVM7UUFFNUIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUMzQjtRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN0QztRQUFDLElBQUksQ0FBQyxDQUFDOztZ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QWM7UUFFckIsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDdEM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtpc0JsYW5rLCBpc1ByZXNlbnQsIExpc3RXcmFwcGVyfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7Q2hvb3NlclNlbGVjdGlvblN0YXRlfSBmcm9tICcuL2Nob29zZXItc2VsZWN0aW9uLXN0YXRlJztcbmltcG9ydCB7RGF0YVNvdXJjZX0gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtc291cmNlJztcblxuLyoqXG4gKiBDaG9vc2VyU3RhdGUgbWFuYWdlcyBjb21wbGV0ZSBsaWZlY3ljbGUgZm9yIHRoZSBDaG9vc2VyIENvbXBvbmVudC4gSXQga2VlcHMgdHJhY2sgb2YgY3VycmVudFxuICogc2VsZWN0aW9uIGFzIHdlbGwgYXMgaXQgY2FuIGJyb2FkY2FzdCBhbnkgdXBkYXRlcy5cbiAqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQ2hvb3NlclN0YXRlXG57XG5cbiAgICAvKipcbiAgICAgKiAgQ2FsbGJhY2sgdG8gdGhlIHBhcmVudCBvYmplY3QgdG8gc3RvcmUgY3VycmVudCBzZWxlY3Rpb25cbiAgICAgKi9cbiAgICBzZWxlY3Rpb25TdGF0ZTogQ2hvb3NlclNlbGVjdGlvblN0YXRlO1xuXG4gICAgLyoqXG4gICAgICogdG9kbzogV2UgZG8gbm90IG5lZWRlZCB0aGlzICEhXG4gICAgICovXG4gICAgY3VycmVudEl0ZW06IGFueTtcblxuXG4gICAgLyoqXG4gICAgICogTWF0Y2hpbmcgcGF0dGVybi4gVXNlciBsYXRlc3QgaW5wdXQgdG8gdGhlIGNob29zZXIgaW5wdXQgZmllbGRcbiAgICAgKi9cbiAgICBwYXR0ZXJuOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIExhc3Qgc3VjY2Vzc2Z1bGwgcGF0dGVybiB0aGF0IHJldHJpZXZlZCBzb21lIGRhdGFcbiAgICAgKi9cbiAgICBsYXN0RnVsbE1hdGNoUGF0dGVybjogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IG1hdGNoZWQgaXRlbXMgdXNpbmcgQ2hvb3NlclNlbGVjdGlvblN0YXRlXG4gICAgICovXG4gICAgbWF0Y2hlczogQXJyYXk8YW55PjtcblxuXG4gICAgLyoqXG4gICAgICogSXMgdGhpcyBtdWx0aXNlbGVjdCBjaG9vc2VyXG4gICAgICovXG4gICAgbXVsdGlzZWxlY3Q6IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSW1wbGVtZW50YXRpb24gY2FuIHNldCBsb29rdXAga2V5IHRvIG5hcnJvdyB0aGUgc2VhcmNoLiBJZiB3ZSBhcmUgZGVhbGluZyB3aXRoIG9iamVjdFxuICAgICAqIHlvdSBzaG91bGQgc2V0IHRoaXMuXG4gICAgICpcbiAgICAgKi9cbiAgICBsb29rdXBLZXk6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogcHJldmlvdXMgZGlzcGxheSB2YWx1ZSBpcyBzZXQgd2hlbiB0aGUgZGlzcGxheSB2YWx1ZSBpcyByZW5kZXJlZCBvbiB0aGUgY2hvb3Nlci4gd2UgY2FjaGVcbiAgICAgKiB0aGUgVUkgdmFsdWUgdG8gY29tcGFyZSB3aXRoIHRoZSBpbmJvdW5kIHZhbHVlIGxhdGVyIGluc3RlYWQgb2YgdGhlIHZhbHVlIGZyb20gdW5kZXJseWluZ1xuICAgICAqIG9iamVjdCBiZWNhdXNlIGJ1c2luZXNzIGxvZ2ljIGxldmVsIGNvZGUgY291bGQgaGF2ZSBjaGFuZ2VkIHRoZSB1bmRlcmx5aW5nIG9iamVjdCdzIHZhbHVlXG4gICAgICpcbiAgICAgKiB0b2RvOiBkbyBJIHN0aWxsIG5lZWQgdGhpcz9cbiAgICAgKi9cbiAgICBwcmV2RGlzcGxheVZhbHVlOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBpZiB0aGVyZSBhcmUgYW55IHZhbGlkYXRpb24gbGlrZSBlbnRlcmVkIHZhbHVlIGRvZXMgbm90IG11Y2ggd2l0aCB0aGUgc291cmNlIGxpc3QuXG4gICAgICpcbiAgICAgKi9cbiAgICBpc0ludmFsaWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogaW5kaWNhdGVzIHRoYXQgd2Ugc3RhcnRlZCB0byBzb21lIGVkaXRpbmcgZS5nLiBzdGFydGluZyB0byB0eXBlIGluIHNvbWV0aGluZyBpbnRvIHRoZVxuICAgICAqIGZpbHRlciwgb3IgcmVtb3ZpbmcgYWxyZWFkeSBzZWxlY3RlZCBpdGVtc1xuICAgICAqL1xuICAgIGFkZE1vZGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgcmVjZW50U2VsZWN0ZWREaXNwbGF5ZWQ6IG51bWJlciA9IDA7XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gdGhpcyBvcHRpb24gaXMgYWN0aXZlIHdlIGRvIG5vdCBzaG93IGFsbCBzZWxlY3RlZCBpdGVtcywgYnV0IG1heCBudW1iZXIgdGhhdCBpc1xuICAgICAqIGRlZmluZWQuIFVzZXIgaXMgYWJsZSB0byB0b2dnbGUgdG8gZXhwYW5kIHRoZSB2aWV3IHRvIHNlZSBhbGwgc2VsZWN0aW9ucyBhbmQgaGlkZSB0aGVtIGFzXG4gICAgICogd2VsbFxuICAgICAqL1xuICAgIHNob3dBbGxSZWNlbnRseVNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIGNvbnN0cnVjdG9yKGNob29zZXJTZWxlY3Rpb25TdGF0ZT86IENob29zZXJTZWxlY3Rpb25TdGF0ZSwgaXNNdWx0aTogYm9vbGVhbiA9IHRydWUpXG4gICAge1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhdGUgPSBjaG9vc2VyU2VsZWN0aW9uU3RhdGU7XG4gICAgICAgIHRoaXMubXVsdGlzZWxlY3QgPSBpc011bHRpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuc2VsZWN0aW9uU3RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXRlID0gbmV3IERlZmF1bHRTZWxlY3Rpb25TdGF0ZSh0aGlzLm11bHRpc2VsZWN0KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJdCB3aWxsIHNlbGVjdCBhbmQgcGVyc2lzdCBhbiBpdGVtIHVzaW5nIENob29zZXJTZWxlY3Rpb25TdGF0ZSBwcm92aWRlci5cbiAgICAgKlxuICAgICAqL1xuICAgIHVwZGF0ZWRTZWxlY3RlZE9iamVjdHMoaXRlbTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsoaXRlbSkpIHtcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmN1cnJlbnRJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm11bHRpc2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvblN0YXRlKGl0ZW0sIHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkT2JqZWN0ID0gdGhpcy5zZWxlY3RlZE9iamVjdCgpO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkT2JqZWN0cyA9IHRoaXMuc2VsZWN0ZWRPYmplY3RzKCk7XG5cblxuICAgICAgICAgICAgaWYgKHRoaXMuYWRkTW9kZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSW52YWxpZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNQcmVzZW50KHNlbGVjdGVkT2JqZWN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25TdGF0ZShzZWxlY3RlZE9iamVjdCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25TdGF0ZShpdGVtLCAhTGlzdFdyYXBwZXIuY29udGFpbnNDb21wbGV4KHNlbGVjdGVkT2JqZWN0cywgaXRlbSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNQcmVzZW50KHNlbGVjdGVkT2JqZWN0KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvblN0YXRlKHNlbGVjdGVkT2JqZWN0LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uU3RhdGUoaXRlbSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gdXNlciBzZWxlY3Rpb24gaXMgbGFyZ2Ugd2UgdXNlIHRoaXMgbWV0aG9kIHRvIGNoZWNrIGlmIHdlIG5lZWQgdG8gc2hvdyBhbGwgc2VsZWN0ZWRcbiAgICAgKiBpdGVtcyBvciBvbmx5IE1heFJlY2VudFNlbGVjdGVkXG4gICAgICovXG4gICAgdG9nZ2xlQWxsU2VsZWN0ZWQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5zaG93QWxsUmVjZW50bHlTZWxlY3RlZCA9ICF0aGlzLnNob3dBbGxSZWNlbnRseVNlbGVjdGVkO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBSZW5kZXJzIHVzZXIncyBzZWxlY3Rpb24gdW5kZXIgdGhlIGlucHV0IGZpZWxkXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXQgcmVjZW50U2VsZWN0ZWRPYmplY3RzKCk6IEFycmF5IDxhbnk+XG4gICAge1xuXG4gICAgICAgIGlmICghdGhpcy5tdWx0aXNlbGVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlY2VudFNlbGVjdGVkT2JqZWN0czogYW55W10gPSBbXTtcbiAgICAgICAgdGhpcy5yZWNlbnRTZWxlY3RlZERpc3BsYXllZCA9IDA7XG4gICAgICAgIGxldCBzZWxlY3RlZE9iamVjdHMgPSB0aGlzLnNlbGVjdGVkT2JqZWN0cygpO1xuICAgICAgICBsZXQgc2l6ZSA9IHNlbGVjdGVkT2JqZWN0cy5sZW5ndGg7XG4gICAgICAgIGxldCBtYXhDb3VudCA9IERhdGFTb3VyY2UuTWF4UmVjZW50U2VsZWN0ZWQ7XG4gICAgICAgIGlmIChzaXplID4gRGF0YVNvdXJjZS5NYXhSZWNlbnRTZWxlY3RlZCAmJiAhdGhpcy5zaG93QWxsUmVjZW50bHlTZWxlY3RlZCkge1xuICAgICAgICAgICAgbWF4Q291bnQgLT0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zaG93QWxsUmVjZW50bHlTZWxlY3RlZCkge1xuICAgICAgICAgICAgbWF4Q291bnQgPSBzaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHNpemUgLSAxOyBpID49IDAgJiYgKHRoaXMucmVjZW50U2VsZWN0ZWREaXNwbGF5ZWQgPCBtYXhDb3VudCk7IGktLSkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbiA9IHNlbGVjdGVkT2JqZWN0c1tpXTtcbiAgICAgICAgICAgIHJlY2VudFNlbGVjdGVkT2JqZWN0cy5wdXNoKHNlbGVjdGlvbik7XG4gICAgICAgICAgICB0aGlzLnJlY2VudFNlbGVjdGVkRGlzcGxheWVkKys7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVjZW50U2VsZWN0ZWRPYmplY3RzO1xuICAgIH1cblxuICAgIHNlbGVjdGVkT2JqZWN0KCk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uU3RhdGUuc2VsZWN0ZWRPYmplY3QoKTtcbiAgICB9XG5cblxuICAgIHNlbGVjdGVkT2JqZWN0cygpOiBBcnJheTxhbnk+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25TdGF0ZS5zZWxlY3RlZE9iamVjdHMoKTtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3Rpb25TdGF0ZShzZWxlY3Rpb246IGFueSwgc2VsZWN0ZWQ6IGJvb2xlYW4pOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHNlbGVjdGlvbilcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXRlLnNldFNlbGVjdGlvblN0YXRlKHNlbGVjdGlvbiwgc2VsZWN0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBEdW1teSBpbXBsZW1lbnRhdGlvbiBDaG9vc2VyU2VsZWN0aW9uU3RhdGVcbiAqL1xuZXhwb3J0IGNsYXNzIERlZmF1bHRTZWxlY3Rpb25TdGF0ZSBleHRlbmRzIENob29zZXJTZWxlY3Rpb25TdGF0ZVxue1xuICAgIHByaXZhdGUgX3NlbGVjdGVkT2JqZWN0OiBhbnk7XG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRPYmplY3RzOiBhbnk7XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbXVsdGlTZWxlY3Q6IGJvb2xlYW4pXG4gICAge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHNldFNlbGVjdGlvblN0YXRlKHNlbGVjdGlvbjogYW55LCBzZWxlY3RlZDogYm9vbGVhbik6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPYmplY3QgPSBzZWxlY3Rpb247XG4gICAgICAgICAgICBpZiAodGhpcy5tdWx0aVNlbGVjdCAmJiAhTGlzdFdyYXBwZXIuY29udGFpbnNDb21wbGV4KHRoaXMuc2VsZWN0ZWRPYmplY3RzKCksXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkT2JqZWN0cygpLnB1c2goc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm11bHRpU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgTGlzdFdyYXBwZXIucmVtb3ZlSWZFeGlzdCh0aGlzLnNlbGVjdGVkT2JqZWN0cygpLCBzZWxlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0ZWRPYmplY3QoKTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRPYmplY3Q7XG4gICAgfVxuXG4gICAgc2VsZWN0ZWRPYmplY3RzKCk6IEFycmF5PGFueT5cbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX3NlbGVjdGVkT2JqZWN0cykpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT2JqZWN0cyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZE9iamVjdHM7XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZChzZWxlY3Rpb246IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBzdXBlci5pc1NlbGVjdGVkKHNlbGVjdGlvbik7XG4gICAgfVxufVxuXG4iXX0=