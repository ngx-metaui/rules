/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            let /** @type {?} */ selectedObject = this.selectedObject();
            let /** @type {?} */ selectedObjects = this.selectedObjects();
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
        let /** @type {?} */ recentSelectedObjects = [];
        this.recentSelectedDisplayed = 0;
        let /** @type {?} */ selectedObjects = this.selectedObjects();
        let /** @type {?} */ size = selectedObjects.length;
        let /** @type {?} */ maxCount = DataSource.MaxRecentSelected;
        if (size > DataSource.MaxRecentSelected && !this.showAllRecentlySelected) {
            maxCount -= 1;
        }
        if (this.showAllRecentlySelected) {
            maxCount = size;
        }
        for (let /** @type {?} */ i = size - 1; i >= 0 && (this.recentSelectedDisplayed < maxCount); i--) {
            let /** @type {?} */ selection = selectedObjects[i];
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
function DefaultSelectionState_tsickle_Closure_declarations() {
    /** @type {?} */
    DefaultSelectionState.prototype._selectedObject;
    /** @type {?} */
    DefaultSelectionState.prototype._selectedObjects;
    /** @type {?} */
    DefaultSelectionState.prototype.multiSelect;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvb3Nlci1zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2Nob29zZXIvY2hvb3Nlci1zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7Ozs7Ozs7QUFRdkQsTUFBTTs7Ozs7SUFrRkYsWUFBWSxxQkFBNkMsRUFBRSxVQUFtQixJQUFJOzs7Ozt5QkFyQjdELEtBQUs7Ozs7Ozt1QkFPUCxLQUFLO3VDQUdVLENBQUM7Ozs7Ozt1Q0FRQSxLQUFLO1FBTXBDLElBQUksQ0FBQyxjQUFjLEdBQUcscUJBQXFCLENBQUM7UUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFFM0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNyRTtLQUNKOzs7Ozs7OztJQVFELHNCQUFzQixDQUFDLElBQVM7UUFFNUIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUMzQjtRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN0QztRQUFDLElBQUksQ0FBQyxDQUFDO1lB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QUFjO1FBRXJCLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3RDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50LCBMaXN0V3JhcHBlcn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Nob29zZXJTZWxlY3Rpb25TdGF0ZX0gZnJvbSAnLi9jaG9vc2VyLXNlbGVjdGlvbi1zdGF0ZSc7XG5pbXBvcnQge0RhdGFTb3VyY2V9IGZyb20gJy4uLy4uL2NvcmUvZGF0YS9kYXRhLXNvdXJjZSc7XG5cbi8qKlxuICogQ2hvb3NlclN0YXRlIG1hbmFnZXMgY29tcGxldGUgbGlmZWN5Y2xlIGZvciB0aGUgQ2hvb3NlciBDb21wb25lbnQuIEl0IGtlZXBzIHRyYWNrIG9mIGN1cnJlbnRcbiAqIHNlbGVjdGlvbiBhcyB3ZWxsIGFzIGl0IGNhbiBicm9hZGNhc3QgYW55IHVwZGF0ZXMuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIENob29zZXJTdGF0ZVxue1xuXG4gICAgLyoqXG4gICAgICogIENhbGxiYWNrIHRvIHRoZSBwYXJlbnQgb2JqZWN0IHRvIHN0b3JlIGN1cnJlbnQgc2VsZWN0aW9uXG4gICAgICovXG4gICAgc2VsZWN0aW9uU3RhdGU6IENob29zZXJTZWxlY3Rpb25TdGF0ZTtcblxuICAgIC8qKlxuICAgICAqIHRvZG86IFdlIGRvIG5vdCBuZWVkZWQgdGhpcyAhIVxuICAgICAqL1xuICAgIGN1cnJlbnRJdGVtOiBhbnk7XG5cblxuICAgIC8qKlxuICAgICAqIE1hdGNoaW5nIHBhdHRlcm4uIFVzZXIgbGF0ZXN0IGlucHV0IHRvIHRoZSBjaG9vc2VyIGlucHV0IGZpZWxkXG4gICAgICovXG4gICAgcGF0dGVybjogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBMYXN0IHN1Y2Nlc3NmdWxsIHBhdHRlcm4gdGhhdCByZXRyaWV2ZWQgc29tZSBkYXRhXG4gICAgICovXG4gICAgbGFzdEZ1bGxNYXRjaFBhdHRlcm46IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBtYXRjaGVkIGl0ZW1zIHVzaW5nIENob29zZXJTZWxlY3Rpb25TdGF0ZVxuICAgICAqL1xuICAgIG1hdGNoZXM6IEFycmF5PGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIElzIHRoaXMgbXVsdGlzZWxlY3QgY2hvb3NlclxuICAgICAqL1xuICAgIG11bHRpc2VsZWN0OiBib29sZWFuO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEltcGxlbWVudGF0aW9uIGNhbiBzZXQgbG9va3VwIGtleSB0byBuYXJyb3cgdGhlIHNlYXJjaC4gSWYgd2UgYXJlIGRlYWxpbmcgd2l0aCBvYmplY3RcbiAgICAgKiB5b3Ugc2hvdWxkIHNldCB0aGlzLlxuICAgICAqXG4gICAgICovXG4gICAgbG9va3VwS2V5OiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIHByZXZpb3VzIGRpc3BsYXkgdmFsdWUgaXMgc2V0IHdoZW4gdGhlIGRpc3BsYXkgdmFsdWUgaXMgcmVuZGVyZWQgb24gdGhlIGNob29zZXIuIHdlIGNhY2hlXG4gICAgICogdGhlIFVJIHZhbHVlIHRvIGNvbXBhcmUgd2l0aCB0aGUgaW5ib3VuZCB2YWx1ZSBsYXRlciBpbnN0ZWFkIG9mIHRoZSB2YWx1ZSBmcm9tIHVuZGVybHlpbmdcbiAgICAgKiBvYmplY3QgYmVjYXVzZSBidXNpbmVzcyBsb2dpYyBsZXZlbCBjb2RlIGNvdWxkIGhhdmUgY2hhbmdlZCB0aGUgdW5kZXJseWluZyBvYmplY3QncyB2YWx1ZVxuICAgICAqXG4gICAgICogdG9kbzogZG8gSSBzdGlsbCBuZWVkIHRoaXM/XG4gICAgICovXG4gICAgcHJldkRpc3BsYXlWYWx1ZTogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgaWYgdGhlcmUgYXJlIGFueSB2YWxpZGF0aW9uIGxpa2UgZW50ZXJlZCB2YWx1ZSBkb2VzIG5vdCBtdWNoIHdpdGggdGhlIHNvdXJjZSBsaXN0LlxuICAgICAqXG4gICAgICovXG4gICAgaXNJbnZhbGlkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIGluZGljYXRlcyB0aGF0IHdlIHN0YXJ0ZWQgdG8gc29tZSBlZGl0aW5nIGUuZy4gc3RhcnRpbmcgdG8gdHlwZSBpbiBzb21ldGhpbmcgaW50byB0aGVcbiAgICAgKiBmaWx0ZXIsIG9yIHJlbW92aW5nIGFscmVhZHkgc2VsZWN0ZWQgaXRlbXNcbiAgICAgKi9cbiAgICBhZGRNb2RlOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIHJlY2VudFNlbGVjdGVkRGlzcGxheWVkOiBudW1iZXIgPSAwO1xuXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRoaXMgb3B0aW9uIGlzIGFjdGl2ZSB3ZSBkbyBub3Qgc2hvdyBhbGwgc2VsZWN0ZWQgaXRlbXMsIGJ1dCBtYXggbnVtYmVyIHRoYXQgaXNcbiAgICAgKiBkZWZpbmVkLiBVc2VyIGlzIGFibGUgdG8gdG9nZ2xlIHRvIGV4cGFuZCB0aGUgdmlldyB0byBzZWUgYWxsIHNlbGVjdGlvbnMgYW5kIGhpZGUgdGhlbSBhc1xuICAgICAqIHdlbGxcbiAgICAgKi9cbiAgICBzaG93QWxsUmVjZW50bHlTZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihjaG9vc2VyU2VsZWN0aW9uU3RhdGU/OiBDaG9vc2VyU2VsZWN0aW9uU3RhdGUsIGlzTXVsdGk6IGJvb2xlYW4gPSB0cnVlKVxuICAgIHtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXRlID0gY2hvb3NlclNlbGVjdGlvblN0YXRlO1xuICAgICAgICB0aGlzLm11bHRpc2VsZWN0ID0gaXNNdWx0aTtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnNlbGVjdGlvblN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGF0ZSA9IG5ldyBEZWZhdWx0U2VsZWN0aW9uU3RhdGUodGhpcy5tdWx0aXNlbGVjdCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSXQgd2lsbCBzZWxlY3QgYW5kIHBlcnNpc3QgYW4gaXRlbSB1c2luZyBDaG9vc2VyU2VsZWN0aW9uU3RhdGUgcHJvdmlkZXIuXG4gICAgICpcbiAgICAgKi9cbiAgICB1cGRhdGVkU2VsZWN0ZWRPYmplY3RzKGl0ZW06IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKGl0ZW0pKSB7XG4gICAgICAgICAgICBpdGVtID0gdGhpcy5jdXJyZW50SXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5tdWx0aXNlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25TdGF0ZShpdGVtLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZE9iamVjdCA9IHRoaXMuc2VsZWN0ZWRPYmplY3QoKTtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZE9iamVjdHMgPSB0aGlzLnNlbGVjdGVkT2JqZWN0cygpO1xuXG5cbiAgICAgICAgICAgIGlmICh0aGlzLmFkZE1vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0ludmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudChzZWxlY3RlZE9iamVjdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uU3RhdGUoc2VsZWN0ZWRPYmplY3QsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uU3RhdGUoaXRlbSwgIUxpc3RXcmFwcGVyLmNvbnRhaW5zQ29tcGxleChzZWxlY3RlZE9iamVjdHMsIGl0ZW0pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudChzZWxlY3RlZE9iamVjdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25TdGF0ZShzZWxlY3RlZE9iamVjdCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvblN0YXRlKGl0ZW0sIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHVzZXIgc2VsZWN0aW9uIGlzIGxhcmdlIHdlIHVzZSB0aGlzIG1ldGhvZCB0byBjaGVjayBpZiB3ZSBuZWVkIHRvIHNob3cgYWxsIHNlbGVjdGVkXG4gICAgICogaXRlbXMgb3Igb25seSBNYXhSZWNlbnRTZWxlY3RlZFxuICAgICAqL1xuICAgIHRvZ2dsZUFsbFNlbGVjdGVkKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuc2hvd0FsbFJlY2VudGx5U2VsZWN0ZWQgPSAhdGhpcy5zaG93QWxsUmVjZW50bHlTZWxlY3RlZDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUmVuZGVycyB1c2VyJ3Mgc2VsZWN0aW9uIHVuZGVyIHRoZSBpbnB1dCBmaWVsZFxuICAgICAqXG4gICAgICovXG4gICAgZ2V0IHJlY2VudFNlbGVjdGVkT2JqZWN0cygpOiBBcnJheSA8YW55PlxuICAgIHtcblxuICAgICAgICBpZiAoIXRoaXMubXVsdGlzZWxlY3QpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZWNlbnRTZWxlY3RlZE9iamVjdHM6IGFueVtdID0gW107XG4gICAgICAgIHRoaXMucmVjZW50U2VsZWN0ZWREaXNwbGF5ZWQgPSAwO1xuICAgICAgICBsZXQgc2VsZWN0ZWRPYmplY3RzID0gdGhpcy5zZWxlY3RlZE9iamVjdHMoKTtcbiAgICAgICAgbGV0IHNpemUgPSBzZWxlY3RlZE9iamVjdHMubGVuZ3RoO1xuICAgICAgICBsZXQgbWF4Q291bnQgPSBEYXRhU291cmNlLk1heFJlY2VudFNlbGVjdGVkO1xuICAgICAgICBpZiAoc2l6ZSA+IERhdGFTb3VyY2UuTWF4UmVjZW50U2VsZWN0ZWQgJiYgIXRoaXMuc2hvd0FsbFJlY2VudGx5U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIG1heENvdW50IC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2hvd0FsbFJlY2VudGx5U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIG1heENvdW50ID0gc2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSBzaXplIC0gMTsgaSA+PSAwICYmICh0aGlzLnJlY2VudFNlbGVjdGVkRGlzcGxheWVkIDwgbWF4Q291bnQpOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb24gPSBzZWxlY3RlZE9iamVjdHNbaV07XG4gICAgICAgICAgICByZWNlbnRTZWxlY3RlZE9iamVjdHMucHVzaChzZWxlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5yZWNlbnRTZWxlY3RlZERpc3BsYXllZCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlY2VudFNlbGVjdGVkT2JqZWN0cztcbiAgICB9XG5cbiAgICBzZWxlY3RlZE9iamVjdCgpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblN0YXRlLnNlbGVjdGVkT2JqZWN0KCk7XG4gICAgfVxuXG5cbiAgICBzZWxlY3RlZE9iamVjdHMoKTogQXJyYXk8YW55PlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uU3RhdGUuc2VsZWN0ZWRPYmplY3RzKCk7XG4gICAgfVxuXG4gICAgc2V0U2VsZWN0aW9uU3RhdGUoc2VsZWN0aW9uOiBhbnksIHNlbGVjdGVkOiBib29sZWFuKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudChzZWxlY3Rpb24pXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGF0ZS5zZXRTZWxlY3Rpb25TdGF0ZShzZWxlY3Rpb24sIHNlbGVjdGVkKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cbi8qKlxuICogRHVtbXkgaW1wbGVtZW50YXRpb24gQ2hvb3NlclNlbGVjdGlvblN0YXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBEZWZhdWx0U2VsZWN0aW9uU3RhdGUgZXh0ZW5kcyBDaG9vc2VyU2VsZWN0aW9uU3RhdGVcbntcbiAgICBwcml2YXRlIF9zZWxlY3RlZE9iamVjdDogYW55O1xuICAgIHByaXZhdGUgX3NlbGVjdGVkT2JqZWN0czogYW55O1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG11bHRpU2VsZWN0OiBib29sZWFuKVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3Rpb25TdGF0ZShzZWxlY3Rpb246IGFueSwgc2VsZWN0ZWQ6IGJvb2xlYW4pOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT2JqZWN0ID0gc2VsZWN0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlTZWxlY3QgJiYgIUxpc3RXcmFwcGVyLmNvbnRhaW5zQ29tcGxleCh0aGlzLnNlbGVjdGVkT2JqZWN0cygpLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9iamVjdHMoKS5wdXNoKHNlbGVjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tdWx0aVNlbGVjdCkge1xuICAgICAgICAgICAgICAgIExpc3RXcmFwcGVyLnJlbW92ZUlmRXhpc3QodGhpcy5zZWxlY3RlZE9iamVjdHMoKSwgc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdGVkT2JqZWN0KCk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkT2JqZWN0O1xuICAgIH1cblxuICAgIHNlbGVjdGVkT2JqZWN0cygpOiBBcnJheTxhbnk+XG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9zZWxlY3RlZE9iamVjdHMpKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9iamVjdHMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRPYmplY3RzO1xuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQoc2VsZWN0aW9uOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gc3VwZXIuaXNTZWxlY3RlZChzZWxlY3Rpb24pO1xuICAgIH1cbn1cblxuIl19