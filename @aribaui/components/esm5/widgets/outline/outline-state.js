/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { isBlank, isEntity, isPresent, ListWrapper } from '@aribaui/core';
import { Injectable } from '@angular/core';
/**
 * OutlineState is the key gluing part for the OutlineFor and OutlineController components. It
 * holds all important information for the current outline tree and manages expansion states in form
 * of so called expansionPath and expansionStates
 *
 * We need to have a way how to work with generic data structure in order not to hold UI specific
 * information on the domain object model just like we had it before, where we had an interface
 * called OutlineNode, with fields (expanded, selected, etc.. )
 *
 *
 * `expansionPath`: Holds an array of currently selected and expanded nodes. This is filled by
 * OutlineController.
 *
 *
 * If we are dealing with Entity or anything that has identity then we have easier situation as we
 * can ask for ID and it is more efficient for serialization
 */
var OutlineState = /** @class */ (function () {
    function OutlineState() {
        /**
         *
         * When outline is rendered for first time or re-rendered and we set default value for the
         * expansionStates. This way we can pretty easily execute CollapseAll, ExpandAll
         *
         */
        this.isExpandedAll = false;
        /**
         *
         * Holds current level during tree node rendering so we can apply correct indentation
         *
         */
        this.currentLevel = -1;
        this.expansionStates = new Map();
    }
    /**
     * For the collapseAll and expandAll we are using simple mechanism where we clean up all
     * selection and then set the global expand state, this whey isExpand method returns the same
     * state for all items
     */
    /**
     * For the collapseAll and expandAll we are using simple mechanism where we clean up all
     * selection and then set the global expand state, this whey isExpand method returns the same
     * state for all items
     * @return {?}
     */
    OutlineState.prototype.collapseAll = /**
     * For the collapseAll and expandAll we are using simple mechanism where we clean up all
     * selection and then set the global expand state, this whey isExpand method returns the same
     * state for all items
     * @return {?}
     */
    function () {
        var _this = this;
        if (isPresent(this.outlineFor) &&
            this.outlineFor.isTreeModelFormat()) {
            // for this case we collapse all but root nodes
            if (this.outlineFor.pushRootSectionOnNewLine) {
                this.outlineFor.list.forEach(function (item) {
                    _this.updateNodes(item.children || [], false);
                });
            }
            else {
                this.updateNodes(this.outlineFor.list || [], false);
            }
        }
        else {
            this.expansionStates.clear();
        }
        this.isExpandedAll = false;
    };
    /**
     * @return {?}
     */
    OutlineState.prototype.expandAll = /**
     * @return {?}
     */
    function () {
        if (isPresent(this.outlineFor) &&
            this.outlineFor.isTreeModelFormat()) {
            this.updateNodes(this.outlineFor.list, true);
        }
        else {
            this.expansionStates.clear();
        }
        this.isExpandedAll = true;
    };
    Object.defineProperty(OutlineState.prototype, "expansionPath", {
        get: /**
         * @return {?}
         */
        function () {
            if (isBlank(this._expansionPath)) {
                this._expansionPath = [];
            }
            return this._expansionPath;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this._expansionPath = value;
            if (isBlank(this._expansionPath)) {
                return;
            }
            this._expansionPath.forEach(function (item) {
                _this.setExpansionState(item, true);
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} currentPath
     * @param {?=} children
     * @return {?}
     */
    OutlineState.prototype.toggleExpansion = /**
     * @param {?} currentPath
     * @param {?=} children
     * @return {?}
     */
    function (currentPath, children) {
        if (isBlank(currentPath)) {
            return;
        }
        var /** @type {?} */ item = ListWrapper.last(currentPath);
        var /** @type {?} */ itemChildren = children || [];
        var /** @type {?} */ newState = !this.isExpanded(item);
        this.setExpansionState(item, newState);
        if (!newState) {
            ListWrapper.removeLast(currentPath);
            this.updateNodes(itemChildren, newState);
        }
        this.setExpansionPath(currentPath);
    };
    /**
     * @param {?} nodes
     * @param {?} newState
     * @return {?}
     */
    OutlineState.prototype.updateNodes = /**
     * @param {?} nodes
     * @param {?} newState
     * @return {?}
     */
    function (nodes, newState) {
        var _this = this;
        nodes.forEach(function (child) {
            var /** @type {?} */ items = _this.outlineFor.childrenForItem(child);
            if (isPresent(items) && items.length > 0) {
                _this.updateNodes(items, newState);
            }
            _this.setExpansionState(child, newState);
        });
    };
    /**
     * @param {?} item
     * @param {?} isExpanded
     * @return {?}
     */
    OutlineState.prototype.setExpansionState = /**
     * @param {?} item
     * @param {?} isExpanded
     * @return {?}
     */
    function (item, isExpanded) {
        // Even for tree mode format save the state so we can use it later on in case object
        // references gets meesed up
        if (this.outlineFor &&
            this.outlineFor.isTreeModelFormat()) {
            (/** @type {?} */ (item)).isExpanded = isExpanded;
        }
        else {
            var /** @type {?} */ key = this.itemToKey(item);
            if (isExpanded === this.isExpandedAll) {
                this.expansionStates.delete(key);
            }
            else {
                this.expansionStates.set(key, (isExpanded) ? true : false);
            }
        }
    };
    /**
     * To improve state persisting lets check if we are dealing with an Object that has Identity
     * so we can extract an ID otherwise use object to compare by reference
     *
     *
     * @param {?} item
     * @return {?}
     */
    OutlineState.prototype.itemToKey = /**
     * To improve state persisting lets check if we are dealing with an Object that has Identity
     * so we can extract an ID otherwise use object to compare by reference
     *
     *
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return isEntity(item) ? (/** @type {?} */ (item)).identity() : item;
    };
    /**
     * @param {?} items
     * @return {?}
     */
    OutlineState.prototype.setExpansionPath = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        var _this = this;
        this.expansionPath = items;
        items.forEach(function (node) {
            _this.setExpansionState(node, true);
        });
    };
    /**
     * @param {?} item
     * @return {?}
     */
    OutlineState.prototype.isExpanded = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (isPresent(this.outlineFor) &&
            this.outlineFor.isTreeModelFormat()) {
            return (/** @type {?} */ (item)).isExpanded;
        }
        else {
            var /** @type {?} */ key = this.itemToKey(item);
            if (!this.expansionStates.has(key)) {
                return this.isExpandedAll;
            }
            return this.expansionStates.get(key);
        }
    };
    OutlineState.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    OutlineState.ctorParameters = function () { return []; };
    return OutlineState;
}());
export { OutlineState };
function OutlineState_tsickle_Closure_declarations() {
    /**
     * Array of currently selected and expanded nodes
     *
     * @type {?}
     */
    OutlineState.prototype._expansionPath;
    /**
     * When `allowSelection` is enabled on OutlineControl it saved currently selected item to be
     * able later on apply some styling and broadcast this selection outside of the component.
     * @type {?}
     */
    OutlineState.prototype.selectedItem;
    /**
     *
     * Maps object reference to boolean values, where TRUE means EXPANDED, FALSE collapsed
     *
     * @type {?}
     */
    OutlineState.prototype.expansionStates;
    /**
     *
     * When outline is rendered for first time or re-rendered and we set default value for the
     * expansionStates. This way we can pretty easily execute CollapseAll, ExpandAll
     *
     * @type {?}
     */
    OutlineState.prototype.isExpandedAll;
    /**
     *
     * Holds current level during tree node rendering so we can apply correct indentation
     *
     * @type {?}
     */
    OutlineState.prototype.currentLevel;
    /**
     * Used during a toggle action to record current selection path.
     *
     * @type {?}
     */
    OutlineState.prototype.currentPath;
    /**
     * Globally shared property
     * @type {?}
     */
    OutlineState.prototype.outlineFor;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS1zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL291dGxpbmUvb3V0bGluZS1zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFTLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBdUVyQzs7Ozs7Ozs2QkF0QnlCLEtBQUs7Ozs7Ozs0QkFPUCxDQUFDLENBQUM7UUFpQnJCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztLQUNwQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCxrQ0FBVzs7Ozs7O0lBQVg7UUFBQSxpQkFvQkM7UUFsQkcsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQzs7WUFHdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7Z0JBRTNDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQWlCO29CQUUzQyxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUNoRCxDQUFDLENBQUM7YUFDTjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3ZEO1NBRUo7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FB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QztZQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxtQkFBYyxJQUFJLEVBQUMsQ0FBQyxVQUFVLENBQUM7U0FDekM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLHFCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzthQUM3QjtZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QztLQUNKOztnQkF6TUosVUFBVTs7Ozt1QkFyQlg7O1NBc0JhLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0VudGl0eSwgaXNCbGFuaywgaXNFbnRpdHksIGlzUHJlc2VudCwgTGlzdFdyYXBwZXJ9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T3V0bGluZUZvckNvbXBvbmVudCwgT3V0bGluZU5vZGV9IGZyb20gJy4vb3V0bGluZS1mb3IuY29tcG9uZW50JztcblxuLyoqXG4gKiBPdXRsaW5lU3RhdGUgaXMgdGhlIGtleSBnbHVpbmcgcGFydCBmb3IgdGhlIE91dGxpbmVGb3IgYW5kIE91dGxpbmVDb250cm9sbGVyIGNvbXBvbmVudHMuIEl0XG4gKiBob2xkcyBhbGwgaW1wb3J0YW50IGluZm9ybWF0aW9uIGZvciB0aGUgY3VycmVudCBvdXRsaW5lIHRyZWUgYW5kIG1hbmFnZXMgZXhwYW5zaW9uIHN0YXRlcyBpbiBmb3JtXG4gKiBvZiBzbyBjYWxsZWQgZXhwYW5zaW9uUGF0aCBhbmQgZXhwYW5zaW9uU3RhdGVzXG4gKlxuICogV2UgbmVlZCB0byBoYXZlIGEgd2F5IGhvdyB0byB3b3JrIHdpdGggZ2VuZXJpYyBkYXRhIHN0cnVjdHVyZSBpbiBvcmRlciBub3QgdG8gaG9sZCBVSSBzcGVjaWZpY1xuICogaW5mb3JtYXRpb24gb24gdGhlIGRvbWFpbiBvYmplY3QgbW9kZWwganVzdCBsaWtlIHdlIGhhZCBpdCBiZWZvcmUsIHdoZXJlIHdlIGhhZCBhbiBpbnRlcmZhY2VcbiAqIGNhbGxlZCBPdXRsaW5lTm9kZSwgd2l0aCBmaWVsZHMgKGV4cGFuZGVkLCBzZWxlY3RlZCwgZXRjLi4gKVxuICpcbiAqXG4gKiBgZXhwYW5zaW9uUGF0aGA6IEhvbGRzIGFuIGFycmF5IG9mIGN1cnJlbnRseSBzZWxlY3RlZCBhbmQgZXhwYW5kZWQgbm9kZXMuIFRoaXMgaXMgZmlsbGVkIGJ5XG4gKiBPdXRsaW5lQ29udHJvbGxlci5cbiAqXG4gKlxuICogSWYgd2UgYXJlIGRlYWxpbmcgd2l0aCBFbnRpdHkgb3IgYW55dGhpbmcgdGhhdCBoYXMgaWRlbnRpdHkgdGhlbiB3ZSBoYXZlIGVhc2llciBzaXR1YXRpb24gYXMgd2VcbiAqIGNhbiBhc2sgZm9yIElEIGFuZCBpdCBpcyBtb3JlIGVmZmljaWVudCBmb3Igc2VyaWFsaXphdGlvblxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3V0bGluZVN0YXRlXG57XG4gICAgLyoqXG4gICAgICogQXJyYXkgb2YgY3VycmVudGx5IHNlbGVjdGVkIGFuZCBleHBhbmRlZCBub2Rlc1xuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZXhwYW5zaW9uUGF0aDogYW55W107XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGBhbGxvd1NlbGVjdGlvbmAgaXMgZW5hYmxlZCBvbiBPdXRsaW5lQ29udHJvbCBpdCBzYXZlZCBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbSB0byBiZVxuICAgICAqIGFibGUgbGF0ZXIgb24gYXBwbHkgc29tZSBzdHlsaW5nIGFuZCBicm9hZGNhc3QgdGhpcyBzZWxlY3Rpb24gb3V0c2lkZSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqL1xuICAgIHNlbGVjdGVkSXRlbTogYW55O1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBNYXBzIG9iamVjdCByZWZlcmVuY2UgdG8gYm9vbGVhbiB2YWx1ZXMsIHdoZXJlIFRSVUUgbWVhbnMgRVhQQU5ERUQsIEZBTFNFIGNvbGxhcHNlZFxuICAgICAqXG4gICAgICovXG4gICAgZXhwYW5zaW9uU3RhdGVzOiBNYXA8YW55LCBib29sZWFuPjtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXaGVuIG91dGxpbmUgaXMgcmVuZGVyZWQgZm9yIGZpcnN0IHRpbWUgb3IgcmUtcmVuZGVyZWQgYW5kIHdlIHNldCBkZWZhdWx0IHZhbHVlIGZvciB0aGVcbiAgICAgKiBleHBhbnNpb25TdGF0ZXMuIFRoaXMgd2F5IHdlIGNhbiBwcmV0dHkgZWFzaWx5IGV4ZWN1dGUgQ29sbGFwc2VBbGwsIEV4cGFuZEFsbFxuICAgICAqXG4gICAgICovXG4gICAgaXNFeHBhbmRlZEFsbDogYm9vbGVhbiA9IGZhbHNlOyAvLyBjb2xsYXBzZWRcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSG9sZHMgY3VycmVudCBsZXZlbCBkdXJpbmcgdHJlZSBub2RlIHJlbmRlcmluZyBzbyB3ZSBjYW4gYXBwbHkgY29ycmVjdCBpbmRlbnRhdGlvblxuICAgICAqXG4gICAgICovXG4gICAgY3VycmVudExldmVsOiBudW1iZXIgPSAtMTtcblxuICAgIC8qKlxuICAgICAqIFVzZWQgZHVyaW5nIGEgdG9nZ2xlIGFjdGlvbiB0byByZWNvcmQgY3VycmVudCBzZWxlY3Rpb24gcGF0aC5cbiAgICAgKlxuICAgICAqL1xuICAgIGN1cnJlbnRQYXRoOiBhbnlbXTtcblxuXG4gICAgLyoqXG4gICAgICogR2xvYmFsbHkgc2hhcmVkIHByb3BlcnR5XG4gICAgICovXG4gICAgb3V0bGluZUZvcjogT3V0bGluZUZvckNvbXBvbmVudDtcblxuXG4gICAgY29uc3RydWN0b3IgKClcbiAgICB7XG4gICAgICAgIHRoaXMuZXhwYW5zaW9uU3RhdGVzID0gbmV3IE1hcCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvciB0aGUgY29sbGFwc2VBbGwgYW5kIGV4cGFuZEFsbCB3ZSBhcmUgdXNpbmcgc2ltcGxlIG1lY2hhbmlzbSB3aGVyZSB3ZSBjbGVhbiB1cCBhbGxcbiAgICAgKiBzZWxlY3Rpb24gYW5kIHRoZW4gc2V0IHRoZSBnbG9iYWwgZXhwYW5kIHN0YXRlLCB0aGlzIHdoZXkgaXNFeHBhbmQgbWV0aG9kIHJldHVybnMgdGhlIHNhbWVcbiAgICAgKiBzdGF0ZSBmb3IgYWxsIGl0ZW1zXG4gICAgICovXG4gICAgY29sbGFwc2VBbGwgKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5vdXRsaW5lRm9yKSAmJlxuICAgICAgICAgICAgdGhpcy5vdXRsaW5lRm9yLmlzVHJlZU1vZGVsRm9ybWF0KCkpIHtcblxuICAgICAgICAgICAgLy8gZm9yIHRoaXMgY2FzZSB3ZSBjb2xsYXBzZSBhbGwgYnV0IHJvb3Qgbm9kZXNcbiAgICAgICAgICAgIGlmICh0aGlzLm91dGxpbmVGb3IucHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm91dGxpbmVGb3IubGlzdC5mb3JFYWNoKChpdGVtOiBPdXRsaW5lTm9kZSkgPT5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTm9kZXMoaXRlbS5jaGlsZHJlbiB8fCBbXSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU5vZGVzKHRoaXMub3V0bGluZUZvci5saXN0IHx8IFtdLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5zaW9uU3RhdGVzLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0V4cGFuZGVkQWxsID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZXhwYW5kQWxsICgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMub3V0bGluZUZvcikgJiZcbiAgICAgICAgICAgIHRoaXMub3V0bGluZUZvci5pc1RyZWVNb2RlbEZvcm1hdCgpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU5vZGVzKHRoaXMub3V0bGluZUZvci5saXN0LCB0cnVlKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5leHBhbnNpb25TdGF0ZXMuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzRXhwYW5kZWRBbGwgPSB0cnVlO1xuICAgIH1cblxuXG4gICAgZ2V0IGV4cGFuc2lvblBhdGggKCk6IGFueVtdXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9leHBhbnNpb25QYXRoKSkge1xuICAgICAgICAgICAgdGhpcy5fZXhwYW5zaW9uUGF0aCA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9leHBhbnNpb25QYXRoO1xuICAgIH1cblxuXG4gICAgc2V0IGV4cGFuc2lvblBhdGggKHZhbHVlOiBhbnlbXSlcbiAgICB7XG4gICAgICAgIHRoaXMuX2V4cGFuc2lvblBhdGggPSB2YWx1ZTtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9leHBhbnNpb25QYXRoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2V4cGFuc2lvblBhdGguZm9yRWFjaCgoaXRlbTogYW55KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNldEV4cGFuc2lvblN0YXRlKGl0ZW0sIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIHRvZ2dsZUV4cGFuc2lvbiAoY3VycmVudFBhdGg6IGFueVtdLCBjaGlsZHJlbj86IGFueVtdKTogdm9pZFxuICAgIHtcblxuICAgICAgICBpZiAoaXNCbGFuayhjdXJyZW50UGF0aCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaXRlbSA9IExpc3RXcmFwcGVyLmxhc3QoY3VycmVudFBhdGgpO1xuICAgICAgICBsZXQgaXRlbUNoaWxkcmVuID0gY2hpbGRyZW4gfHwgW107XG4gICAgICAgIGxldCBuZXdTdGF0ZSA9ICF0aGlzLmlzRXhwYW5kZWQoaXRlbSk7XG4gICAgICAgIHRoaXMuc2V0RXhwYW5zaW9uU3RhdGUoaXRlbSwgbmV3U3RhdGUpO1xuXG4gICAgICAgIGlmICghbmV3U3RhdGUpIHtcbiAgICAgICAgICAgIExpc3RXcmFwcGVyLnJlbW92ZUxhc3QoY3VycmVudFBhdGgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVOb2RlcyhpdGVtQ2hpbGRyZW4sIG5ld1N0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0RXhwYW5zaW9uUGF0aChjdXJyZW50UGF0aCk7XG4gICAgfVxuXG4gICAgdXBkYXRlTm9kZXMgKG5vZGVzOiBhbnlbXSwgbmV3U3RhdGU6IGJvb2xlYW4pOiB2b2lkXG4gICAge1xuICAgICAgICBub2Rlcy5mb3JFYWNoKChjaGlsZDogYW55KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLm91dGxpbmVGb3IuY2hpbGRyZW5Gb3JJdGVtKGNoaWxkKTtcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoaXRlbXMpICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU5vZGVzKGl0ZW1zLCBuZXdTdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldEV4cGFuc2lvblN0YXRlKGNoaWxkLCBuZXdTdGF0ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldEV4cGFuc2lvblN0YXRlIChpdGVtOiBhbnksIGlzRXhwYW5kZWQ6IGJvb2xlYW4pOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBFdmVuIGZvciB0cmVlIG1vZGUgZm9ybWF0IHNhdmUgdGhlIHN0YXRlIHNvIHdlIGNhbiB1c2UgaXQgbGF0ZXIgb24gaW4gY2FzZSBvYmplY3RcbiAgICAgICAgLy8gcmVmZXJlbmNlcyBnZXRzIG1lZXNlZCB1cFxuICAgICAgICBpZiAodGhpcy5vdXRsaW5lRm9yICYmXG4gICAgICAgICAgICB0aGlzLm91dGxpbmVGb3IuaXNUcmVlTW9kZWxGb3JtYXQoKSkge1xuICAgICAgICAgICAgKDxPdXRsaW5lTm9kZT5pdGVtKS5pc0V4cGFuZGVkID0gaXNFeHBhbmRlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBrZXkgPSB0aGlzLml0ZW1Ub0tleShpdGVtKTtcbiAgICAgICAgICAgIGlmIChpc0V4cGFuZGVkID09PSB0aGlzLmlzRXhwYW5kZWRBbGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuc2lvblN0YXRlcy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbnNpb25TdGF0ZXMuc2V0KGtleSwgKGlzRXhwYW5kZWQpID8gdHJ1ZSA6IGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvIGltcHJvdmUgc3RhdGUgcGVyc2lzdGluZyBsZXRzIGNoZWNrIGlmIHdlIGFyZSBkZWFsaW5nIHdpdGggYW4gT2JqZWN0IHRoYXQgaGFzIElkZW50aXR5XG4gICAgICogc28gd2UgY2FuIGV4dHJhY3QgYW4gSUQgb3RoZXJ3aXNlIHVzZSBvYmplY3QgdG8gY29tcGFyZSBieSByZWZlcmVuY2VcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBpdGVtVG9LZXkgKGl0ZW06IGFueSk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzRW50aXR5KGl0ZW0pID8gKDxFbnRpdHk+aXRlbSkuaWRlbnRpdHkoKSA6IGl0ZW07XG4gICAgfVxuXG5cbiAgICBzZXRFeHBhbnNpb25QYXRoIChpdGVtczogYW55W10pOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmV4cGFuc2lvblBhdGggPSBpdGVtcztcblxuICAgICAgICBpdGVtcy5mb3JFYWNoKChub2RlOiBhbnkpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RXhwYW5zaW9uU3RhdGUobm9kZSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlzRXhwYW5kZWQgKGl0ZW06IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5vdXRsaW5lRm9yKSAmJlxuICAgICAgICAgICAgdGhpcy5vdXRsaW5lRm9yLmlzVHJlZU1vZGVsRm9ybWF0KCkpIHtcbiAgICAgICAgICAgIHJldHVybiAoPE91dGxpbmVOb2RlPml0ZW0pLmlzRXhwYW5kZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQga2V5ID0gdGhpcy5pdGVtVG9LZXkoaXRlbSk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZXhwYW5zaW9uU3RhdGVzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNFeHBhbmRlZEFsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGFuc2lvblN0YXRlcy5nZXQoa2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19