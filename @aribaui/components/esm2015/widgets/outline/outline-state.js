/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
export class OutlineState {
    constructor() {
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
     * @return {?}
     */
    collapseAll() {
        if (isPresent(this.outlineFor) &&
            this.outlineFor.isTreeModelFormat()) {
            // for this case we collapse all but root nodes
            if (this.outlineFor.pushRootSectionOnNewLine) {
                this.outlineFor.list.forEach((item) => {
                    this.updateNodes(item.children || [], false);
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
    }
    /**
     * @return {?}
     */
    expandAll() {
        if (isPresent(this.outlineFor) &&
            this.outlineFor.isTreeModelFormat()) {
            this.updateNodes(this.outlineFor.list, true);
        }
        else {
            this.expansionStates.clear();
        }
        this.isExpandedAll = true;
    }
    /**
     * @return {?}
     */
    get expansionPath() {
        if (isBlank(this._expansionPath)) {
            this._expansionPath = [];
        }
        return this._expansionPath;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expansionPath(value) {
        this._expansionPath = value;
        if (isBlank(this._expansionPath)) {
            return;
        }
        this._expansionPath.forEach((item) => {
            this.setExpansionState(item, true);
        });
    }
    /**
     * @param {?} currentPath
     * @param {?=} children
     * @return {?}
     */
    toggleExpansion(currentPath, children) {
        if (isBlank(currentPath)) {
            return;
        }
        /** @type {?} */
        let item = ListWrapper.last(currentPath);
        /** @type {?} */
        let itemChildren = children || [];
        /** @type {?} */
        let newState = !this.isExpanded(item);
        this.setExpansionState(item, newState);
        if (!newState) {
            ListWrapper.removeLast(currentPath);
            this.updateNodes(itemChildren, newState);
        }
        this.setExpansionPath(currentPath);
    }
    /**
     * @param {?} nodes
     * @param {?} newState
     * @return {?}
     */
    updateNodes(nodes, newState) {
        nodes.forEach((child) => {
            /** @type {?} */
            let items = this.outlineFor.childrenForItem(child);
            if (isPresent(items) && items.length > 0) {
                this.updateNodes(items, newState);
            }
            this.setExpansionState(child, newState);
        });
    }
    /**
     * @param {?} item
     * @param {?} isExpanded
     * @return {?}
     */
    setExpansionState(item, isExpanded) {
        // Even for tree mode format save the state so we can use it later on in case object
        // references gets meesed up
        if (this.outlineFor &&
            this.outlineFor.isTreeModelFormat()) {
            (/** @type {?} */ (item)).isExpanded = isExpanded;
        }
        else {
            /** @type {?} */
            let key = this.itemToKey(item);
            if (isExpanded === this.isExpandedAll) {
                this.expansionStates.delete(key);
            }
            else {
                this.expansionStates.set(key, (isExpanded) ? true : false);
            }
        }
    }
    /**
     * To improve state persisting lets check if we are dealing with an Object that has Identity
     * so we can extract an ID otherwise use object to compare by reference
     *
     *
     * @param {?} item
     * @return {?}
     */
    itemToKey(item) {
        return isEntity(item) ? (/** @type {?} */ (item)).identity() : item;
    }
    /**
     * @param {?} items
     * @return {?}
     */
    setExpansionPath(items) {
        this.expansionPath = items;
        items.forEach((node) => {
            this.setExpansionState(node, true);
        });
    }
    /**
     * @param {?} item
     * @return {?}
     */
    isExpanded(item) {
        if (isPresent(this.outlineFor) &&
            this.outlineFor.isTreeModelFormat()) {
            return (/** @type {?} */ (item)).isExpanded;
        }
        else {
            /** @type {?} */
            let key = this.itemToKey(item);
            if (!this.expansionStates.has(key)) {
                return this.isExpandedAll;
            }
            return this.expansionStates.get(key);
        }
    }
}
OutlineState.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OutlineState.ctorParameters = () => [];
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS1zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL291dGxpbmUvb3V0bGluZS1zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFTLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQnpDLE1BQU07SUFrREY7Ozs7Ozs7NkJBdEJ5QixLQUFLOzs7Ozs7NEJBT1AsQ0FBQyxDQUFDO1FBaUJyQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7S0FDcEM7Ozs7Ozs7SUFPRCxXQUFXO1FBRVAsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQzs7WUFHdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7Z0JBRTNDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQWlCLEVBQUUsRUFBRTtvQkFFL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDaEQsQ0FBQyxDQUFDO2FBQ047WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN2RDtTQUVKO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUss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Q0FBQztTQUN6QztRQUFDLElBQUksQ0FBQyxDQUFDOztZQUNKLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO2FBQzdCO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hDO0tBQ0o7OztZQXpNSixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFbnRpdHksIGlzQmxhbmssIGlzRW50aXR5LCBpc1ByZXNlbnQsIExpc3RXcmFwcGVyfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge091dGxpbmVGb3JDb21wb25lbnQsIE91dGxpbmVOb2RlfSBmcm9tICcuL291dGxpbmUtZm9yLmNvbXBvbmVudCc7XG5cbi8qKlxuICogT3V0bGluZVN0YXRlIGlzIHRoZSBrZXkgZ2x1aW5nIHBhcnQgZm9yIHRoZSBPdXRsaW5lRm9yIGFuZCBPdXRsaW5lQ29udHJvbGxlciBjb21wb25lbnRzLiBJdFxuICogaG9sZHMgYWxsIGltcG9ydGFudCBpbmZvcm1hdGlvbiBmb3IgdGhlIGN1cnJlbnQgb3V0bGluZSB0cmVlIGFuZCBtYW5hZ2VzIGV4cGFuc2lvbiBzdGF0ZXMgaW4gZm9ybVxuICogb2Ygc28gY2FsbGVkIGV4cGFuc2lvblBhdGggYW5kIGV4cGFuc2lvblN0YXRlc1xuICpcbiAqIFdlIG5lZWQgdG8gaGF2ZSBhIHdheSBob3cgdG8gd29yayB3aXRoIGdlbmVyaWMgZGF0YSBzdHJ1Y3R1cmUgaW4gb3JkZXIgbm90IHRvIGhvbGQgVUkgc3BlY2lmaWNcbiAqIGluZm9ybWF0aW9uIG9uIHRoZSBkb21haW4gb2JqZWN0IG1vZGVsIGp1c3QgbGlrZSB3ZSBoYWQgaXQgYmVmb3JlLCB3aGVyZSB3ZSBoYWQgYW4gaW50ZXJmYWNlXG4gKiBjYWxsZWQgT3V0bGluZU5vZGUsIHdpdGggZmllbGRzIChleHBhbmRlZCwgc2VsZWN0ZWQsIGV0Yy4uIClcbiAqXG4gKlxuICogYGV4cGFuc2lvblBhdGhgOiBIb2xkcyBhbiBhcnJheSBvZiBjdXJyZW50bHkgc2VsZWN0ZWQgYW5kIGV4cGFuZGVkIG5vZGVzLiBUaGlzIGlzIGZpbGxlZCBieVxuICogT3V0bGluZUNvbnRyb2xsZXIuXG4gKlxuICpcbiAqIElmIHdlIGFyZSBkZWFsaW5nIHdpdGggRW50aXR5IG9yIGFueXRoaW5nIHRoYXQgaGFzIGlkZW50aXR5IHRoZW4gd2UgaGF2ZSBlYXNpZXIgc2l0dWF0aW9uIGFzIHdlXG4gKiBjYW4gYXNrIGZvciBJRCBhbmQgaXQgaXMgbW9yZSBlZmZpY2llbnQgZm9yIHNlcmlhbGl6YXRpb25cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE91dGxpbmVTdGF0ZVxue1xuICAgIC8qKlxuICAgICAqIEFycmF5IG9mIGN1cnJlbnRseSBzZWxlY3RlZCBhbmQgZXhwYW5kZWQgbm9kZXNcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgX2V4cGFuc2lvblBhdGg6IGFueVtdO1xuXG4gICAgLyoqXG4gICAgICogV2hlbiBgYWxsb3dTZWxlY3Rpb25gIGlzIGVuYWJsZWQgb24gT3V0bGluZUNvbnRyb2wgaXQgc2F2ZWQgY3VycmVudGx5IHNlbGVjdGVkIGl0ZW0gdG8gYmVcbiAgICAgKiBhYmxlIGxhdGVyIG9uIGFwcGx5IHNvbWUgc3R5bGluZyBhbmQgYnJvYWRjYXN0IHRoaXMgc2VsZWN0aW9uIG91dHNpZGUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBzZWxlY3RlZEl0ZW06IGFueTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogTWFwcyBvYmplY3QgcmVmZXJlbmNlIHRvIGJvb2xlYW4gdmFsdWVzLCB3aGVyZSBUUlVFIG1lYW5zIEVYUEFOREVELCBGQUxTRSBjb2xsYXBzZWRcbiAgICAgKlxuICAgICAqL1xuICAgIGV4cGFuc2lvblN0YXRlczogTWFwPGFueSwgYm9vbGVhbj47XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiBvdXRsaW5lIGlzIHJlbmRlcmVkIGZvciBmaXJzdCB0aW1lIG9yIHJlLXJlbmRlcmVkIGFuZCB3ZSBzZXQgZGVmYXVsdCB2YWx1ZSBmb3IgdGhlXG4gICAgICogZXhwYW5zaW9uU3RhdGVzLiBUaGlzIHdheSB3ZSBjYW4gcHJldHR5IGVhc2lseSBleGVjdXRlIENvbGxhcHNlQWxsLCBFeHBhbmRBbGxcbiAgICAgKlxuICAgICAqL1xuICAgIGlzRXhwYW5kZWRBbGw6IGJvb2xlYW4gPSBmYWxzZTsgLy8gY29sbGFwc2VkXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEhvbGRzIGN1cnJlbnQgbGV2ZWwgZHVyaW5nIHRyZWUgbm9kZSByZW5kZXJpbmcgc28gd2UgY2FuIGFwcGx5IGNvcnJlY3QgaW5kZW50YXRpb25cbiAgICAgKlxuICAgICAqL1xuICAgIGN1cnJlbnRMZXZlbDogbnVtYmVyID0gLTE7XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGR1cmluZyBhIHRvZ2dsZSBhY3Rpb24gdG8gcmVjb3JkIGN1cnJlbnQgc2VsZWN0aW9uIHBhdGguXG4gICAgICpcbiAgICAgKi9cbiAgICBjdXJyZW50UGF0aDogYW55W107XG5cblxuICAgIC8qKlxuICAgICAqIEdsb2JhbGx5IHNoYXJlZCBwcm9wZXJ0eVxuICAgICAqL1xuICAgIG91dGxpbmVGb3I6IE91dGxpbmVGb3JDb21wb25lbnQ7XG5cblxuICAgIGNvbnN0cnVjdG9yICgpXG4gICAge1xuICAgICAgICB0aGlzLmV4cGFuc2lvblN0YXRlcyA9IG5ldyBNYXAoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb3IgdGhlIGNvbGxhcHNlQWxsIGFuZCBleHBhbmRBbGwgd2UgYXJlIHVzaW5nIHNpbXBsZSBtZWNoYW5pc20gd2hlcmUgd2UgY2xlYW4gdXAgYWxsXG4gICAgICogc2VsZWN0aW9uIGFuZCB0aGVuIHNldCB0aGUgZ2xvYmFsIGV4cGFuZCBzdGF0ZSwgdGhpcyB3aGV5IGlzRXhwYW5kIG1ldGhvZCByZXR1cm5zIHRoZSBzYW1lXG4gICAgICogc3RhdGUgZm9yIGFsbCBpdGVtc1xuICAgICAqL1xuICAgIGNvbGxhcHNlQWxsICgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMub3V0bGluZUZvcikgJiZcbiAgICAgICAgICAgIHRoaXMub3V0bGluZUZvci5pc1RyZWVNb2RlbEZvcm1hdCgpKSB7XG5cbiAgICAgICAgICAgIC8vIGZvciB0aGlzIGNhc2Ugd2UgY29sbGFwc2UgYWxsIGJ1dCByb290IG5vZGVzXG4gICAgICAgICAgICBpZiAodGhpcy5vdXRsaW5lRm9yLnB1c2hSb290U2VjdGlvbk9uTmV3TGluZSkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRsaW5lRm9yLmxpc3QuZm9yRWFjaCgoaXRlbTogT3V0bGluZU5vZGUpID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU5vZGVzKGl0ZW0uY2hpbGRyZW4gfHwgW10sIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVOb2Rlcyh0aGlzLm91dGxpbmVGb3IubGlzdCB8fCBbXSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuc2lvblN0YXRlcy5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNFeHBhbmRlZEFsbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGV4cGFuZEFsbCAoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLm91dGxpbmVGb3IpICYmXG4gICAgICAgICAgICB0aGlzLm91dGxpbmVGb3IuaXNUcmVlTW9kZWxGb3JtYXQoKSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVOb2Rlcyh0aGlzLm91dGxpbmVGb3IubGlzdCwgdHJ1ZSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5zaW9uU3RhdGVzLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0V4cGFuZGVkQWxsID0gdHJ1ZTtcbiAgICB9XG5cblxuICAgIGdldCBleHBhbnNpb25QYXRoICgpOiBhbnlbXVxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fZXhwYW5zaW9uUGF0aCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2V4cGFuc2lvblBhdGggPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZXhwYW5zaW9uUGF0aDtcbiAgICB9XG5cblxuICAgIHNldCBleHBhbnNpb25QYXRoICh2YWx1ZTogYW55W10pXG4gICAge1xuICAgICAgICB0aGlzLl9leHBhbnNpb25QYXRoID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fZXhwYW5zaW9uUGF0aCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9leHBhbnNpb25QYXRoLmZvckVhY2goKGl0ZW06IGFueSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zZXRFeHBhbnNpb25TdGF0ZShpdGVtLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICB0b2dnbGVFeHBhbnNpb24gKGN1cnJlbnRQYXRoOiBhbnlbXSwgY2hpbGRyZW4/OiBhbnlbXSk6IHZvaWRcbiAgICB7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsoY3VycmVudFBhdGgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGl0ZW0gPSBMaXN0V3JhcHBlci5sYXN0KGN1cnJlbnRQYXRoKTtcbiAgICAgICAgbGV0IGl0ZW1DaGlsZHJlbiA9IGNoaWxkcmVuIHx8IFtdO1xuICAgICAgICBsZXQgbmV3U3RhdGUgPSAhdGhpcy5pc0V4cGFuZGVkKGl0ZW0pO1xuICAgICAgICB0aGlzLnNldEV4cGFuc2lvblN0YXRlKGl0ZW0sIG5ld1N0YXRlKTtcblxuICAgICAgICBpZiAoIW5ld1N0YXRlKSB7XG4gICAgICAgICAgICBMaXN0V3JhcHBlci5yZW1vdmVMYXN0KGN1cnJlbnRQYXRoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTm9kZXMoaXRlbUNoaWxkcmVuLCBuZXdTdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldEV4cGFuc2lvblBhdGgoY3VycmVudFBhdGgpO1xuICAgIH1cblxuICAgIHVwZGF0ZU5vZGVzIChub2RlczogYW55W10sIG5ld1N0YXRlOiBib29sZWFuKTogdm9pZFxuICAgIHtcbiAgICAgICAgbm9kZXMuZm9yRWFjaCgoY2hpbGQ6IGFueSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5vdXRsaW5lRm9yLmNoaWxkcmVuRm9ySXRlbShjaGlsZCk7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KGl0ZW1zKSAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVOb2RlcyhpdGVtcywgbmV3U3RhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRFeHBhbnNpb25TdGF0ZShjaGlsZCwgbmV3U3RhdGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRFeHBhbnNpb25TdGF0ZSAoaXRlbTogYW55LCBpc0V4cGFuZGVkOiBib29sZWFuKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gRXZlbiBmb3IgdHJlZSBtb2RlIGZvcm1hdCBzYXZlIHRoZSBzdGF0ZSBzbyB3ZSBjYW4gdXNlIGl0IGxhdGVyIG9uIGluIGNhc2Ugb2JqZWN0XG4gICAgICAgIC8vIHJlZmVyZW5jZXMgZ2V0cyBtZWVzZWQgdXBcbiAgICAgICAgaWYgKHRoaXMub3V0bGluZUZvciAmJlxuICAgICAgICAgICAgdGhpcy5vdXRsaW5lRm9yLmlzVHJlZU1vZGVsRm9ybWF0KCkpIHtcbiAgICAgICAgICAgICg8T3V0bGluZU5vZGU+aXRlbSkuaXNFeHBhbmRlZCA9IGlzRXhwYW5kZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQga2V5ID0gdGhpcy5pdGVtVG9LZXkoaXRlbSk7XG4gICAgICAgICAgICBpZiAoaXNFeHBhbmRlZCA9PT0gdGhpcy5pc0V4cGFuZGVkQWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbnNpb25TdGF0ZXMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5zaW9uU3RhdGVzLnNldChrZXksIChpc0V4cGFuZGVkKSA/IHRydWUgOiBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUbyBpbXByb3ZlIHN0YXRlIHBlcnNpc3RpbmcgbGV0cyBjaGVjayBpZiB3ZSBhcmUgZGVhbGluZyB3aXRoIGFuIE9iamVjdCB0aGF0IGhhcyBJZGVudGl0eVxuICAgICAqIHNvIHdlIGNhbiBleHRyYWN0IGFuIElEIG90aGVyd2lzZSB1c2Ugb2JqZWN0IHRvIGNvbXBhcmUgYnkgcmVmZXJlbmNlXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgaXRlbVRvS2V5IChpdGVtOiBhbnkpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBpc0VudGl0eShpdGVtKSA/ICg8RW50aXR5Pml0ZW0pLmlkZW50aXR5KCkgOiBpdGVtO1xuICAgIH1cblxuXG4gICAgc2V0RXhwYW5zaW9uUGF0aCAoaXRlbXM6IGFueVtdKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5leHBhbnNpb25QYXRoID0gaXRlbXM7XG5cbiAgICAgICAgaXRlbXMuZm9yRWFjaCgobm9kZTogYW55KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNldEV4cGFuc2lvblN0YXRlKG5vZGUsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpc0V4cGFuZGVkIChpdGVtOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMub3V0bGluZUZvcikgJiZcbiAgICAgICAgICAgIHRoaXMub3V0bGluZUZvci5pc1RyZWVNb2RlbEZvcm1hdCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gKDxPdXRsaW5lTm9kZT5pdGVtKS5pc0V4cGFuZGVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGtleSA9IHRoaXMuaXRlbVRvS2V5KGl0ZW0pO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmV4cGFuc2lvblN0YXRlcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzRXhwYW5kZWRBbGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leHBhbnNpb25TdGF0ZXMuZ2V0KGtleSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==