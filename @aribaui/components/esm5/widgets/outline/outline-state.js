/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { isBlank, isEntity, ListWrapper } from '@aribaui/core';
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
        this.globalState = false;
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
        this.expansionStates.clear();
        this.globalState = false;
    };
    /**
     * @return {?}
     */
    OutlineState.prototype.expandAll = /**
     * @return {?}
     */
    function () {
        this.expansionStates.clear();
        this.globalState = true;
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
     * @param {?=} chidren
     * @return {?}
     */
    OutlineState.prototype.toggleExpansion = /**
     * @param {?} currentPath
     * @param {?=} chidren
     * @return {?}
     */
    function (currentPath, chidren) {
        var _this = this;
        if (isBlank(currentPath)) {
            return;
        }
        var /** @type {?} */ item = ListWrapper.last(currentPath);
        var /** @type {?} */ itemChildren = chidren || [];
        var /** @type {?} */ newState = !this.isExpanded(item);
        this.setExpansionState(item, newState);
        if (!newState) {
            ListWrapper.removeLast(currentPath);
            itemChildren.forEach(function (child) {
                _this.setExpansionState(child, newState);
            });
        }
        this.setExpansionPath(currentPath);
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
        var /** @type {?} */ key = this.itemToKey(item);
        if (isExpanded === this.globalState) {
            this.expansionStates.delete(key);
        }
        else {
            this.expansionStates.set(key, (isExpanded) ? true : false);
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
     * @param {?} item
     * @return {?}
     */
    OutlineState.prototype.setExpansionPath = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var _this = this;
        this.expansionPath = item;
        item.forEach(function (node) {
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
        var /** @type {?} */ key = this.itemToKey(item);
        if (!this.expansionStates.has(key)) {
            return this.globalState;
        }
        return this.expansionStates.get(key);
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
    OutlineState.prototype.globalState;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS1zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL291dGxpbmUvb3V0bGluZS1zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFTLE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF1RXJDOzs7Ozs7OzJCQXRCdUIsS0FBSzs7Ozs7OzRCQU9MLENBQUMsQ0FBQztRQWlCckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0tBQ3BDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILGtDQUFXOzs7Ozs7SUFBWDtRQUVJLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7S0FDNUI7Ozs7SUFFRCxnQ0FBUzs7O0lBQVQ7UUFFSSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0tBQzNCO0lBR0Qsc0JBQUksdUNBQWE7Ozs7UUFBakI7WUFFSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7YUFDNUI7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztTQUM5Qjs7Ozs7UUFHRCxVQUFtQixLQUFZO1lBQS9CLGlCQVdDO1lBVEcsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFFNUIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFD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dHksIGlzQmxhbmssIGlzRW50aXR5LCBMaXN0V3JhcHBlcn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPdXRsaW5lRm9yQ29tcG9uZW50fSBmcm9tICcuL291dGxpbmUtZm9yLmNvbXBvbmVudCc7XG5cbi8qKlxuICogT3V0bGluZVN0YXRlIGlzIHRoZSBrZXkgZ2x1aW5nIHBhcnQgZm9yIHRoZSBPdXRsaW5lRm9yIGFuZCBPdXRsaW5lQ29udHJvbGxlciBjb21wb25lbnRzLiBJdFxuICogaG9sZHMgYWxsIGltcG9ydGFudCBpbmZvcm1hdGlvbiBmb3IgdGhlIGN1cnJlbnQgb3V0bGluZSB0cmVlIGFuZCBtYW5hZ2VzIGV4cGFuc2lvbiBzdGF0ZXMgaW4gZm9ybVxuICogb2Ygc28gY2FsbGVkIGV4cGFuc2lvblBhdGggYW5kIGV4cGFuc2lvblN0YXRlc1xuICpcbiAqIFdlIG5lZWQgdG8gaGF2ZSBhIHdheSBob3cgdG8gd29yayB3aXRoIGdlbmVyaWMgZGF0YSBzdHJ1Y3R1cmUgaW4gb3JkZXIgbm90IHRvIGhvbGQgVUkgc3BlY2lmaWNcbiAqIGluZm9ybWF0aW9uIG9uIHRoZSBkb21haW4gb2JqZWN0IG1vZGVsIGp1c3QgbGlrZSB3ZSBoYWQgaXQgYmVmb3JlLCB3aGVyZSB3ZSBoYWQgYW4gaW50ZXJmYWNlXG4gKiBjYWxsZWQgT3V0bGluZU5vZGUsIHdpdGggZmllbGRzIChleHBhbmRlZCwgc2VsZWN0ZWQsIGV0Yy4uIClcbiAqXG4gKlxuICogYGV4cGFuc2lvblBhdGhgOiBIb2xkcyBhbiBhcnJheSBvZiBjdXJyZW50bHkgc2VsZWN0ZWQgYW5kIGV4cGFuZGVkIG5vZGVzLiBUaGlzIGlzIGZpbGxlZCBieVxuICogT3V0bGluZUNvbnRyb2xsZXIuXG4gKlxuICpcbiAqIElmIHdlIGFyZSBkZWFsaW5nIHdpdGggRW50aXR5IG9yIGFueXRoaW5nIHRoYXQgaGFzIGlkZW50aXR5IHRoZW4gd2UgaGF2ZSBlYXNpZXIgc2l0dWF0aW9uIGFzIHdlXG4gKiBjYW4gYXNrIGZvciBJRCBhbmQgaXQgaXMgbW9yZSBlZmZpY2llbnQgZm9yIHNlcmlhbGl6YXRpb25cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE91dGxpbmVTdGF0ZVxue1xuICAgIC8qKlxuICAgICAqIEFycmF5IG9mIGN1cnJlbnRseSBzZWxlY3RlZCBhbmQgZXhwYW5kZWQgbm9kZXNcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgX2V4cGFuc2lvblBhdGg6IGFueVtdO1xuXG4gICAgLyoqXG4gICAgICogV2hlbiBgYWxsb3dTZWxlY3Rpb25gIGlzIGVuYWJsZWQgb24gT3V0bGluZUNvbnRyb2wgaXQgc2F2ZWQgY3VycmVudGx5IHNlbGVjdGVkIGl0ZW0gdG8gYmVcbiAgICAgKiBhYmxlIGxhdGVyIG9uIGFwcGx5IHNvbWUgc3R5bGluZyBhbmQgYnJvYWRjYXN0IHRoaXMgc2VsZWN0aW9uIG91dHNpZGUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBzZWxlY3RlZEl0ZW06IGFueTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogTWFwcyBvYmplY3QgcmVmZXJlbmNlIHRvIGJvb2xlYW4gdmFsdWVzLCB3aGVyZSBUUlVFIG1lYW5zIEVYUEFOREVELCBGQUxTRSBjb2xsYXBzZWRcbiAgICAgKlxuICAgICAqL1xuICAgIGV4cGFuc2lvblN0YXRlczogTWFwPGFueSwgYm9vbGVhbj47XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiBvdXRsaW5lIGlzIHJlbmRlcmVkIGZvciBmaXJzdCB0aW1lIG9yIHJlLXJlbmRlcmVkIGFuZCB3ZSBzZXQgZGVmYXVsdCB2YWx1ZSBmb3IgdGhlXG4gICAgICogZXhwYW5zaW9uU3RhdGVzLiBUaGlzIHdheSB3ZSBjYW4gcHJldHR5IGVhc2lseSBleGVjdXRlIENvbGxhcHNlQWxsLCBFeHBhbmRBbGxcbiAgICAgKlxuICAgICAqL1xuICAgIGdsb2JhbFN0YXRlOiBib29sZWFuID0gZmFsc2U7IC8vIGNvbGxhcHNlZFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBIb2xkcyBjdXJyZW50IGxldmVsIGR1cmluZyB0cmVlIG5vZGUgcmVuZGVyaW5nIHNvIHdlIGNhbiBhcHBseSBjb3JyZWN0IGluZGVudGF0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBjdXJyZW50TGV2ZWw6IG51bWJlciA9IC0xO1xuXG4gICAgLyoqXG4gICAgICogVXNlZCBkdXJpbmcgYSB0b2dnbGUgYWN0aW9uIHRvIHJlY29yZCBjdXJyZW50IHNlbGVjdGlvbiBwYXRoLlxuICAgICAqXG4gICAgICovXG4gICAgY3VycmVudFBhdGg6IGFueVtdO1xuXG5cbiAgICAvKipcbiAgICAgKiBHbG9iYWxseSBzaGFyZWQgcHJvcGVydHlcbiAgICAgKi9cbiAgICBvdXRsaW5lRm9yOiBPdXRsaW5lRm9yQ29tcG9uZW50O1xuXG5cbiAgICBjb25zdHJ1Y3RvciAoKVxuICAgIHtcbiAgICAgICAgdGhpcy5leHBhbnNpb25TdGF0ZXMgPSBuZXcgTWFwKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9yIHRoZSBjb2xsYXBzZUFsbCBhbmQgZXhwYW5kQWxsIHdlIGFyZSB1c2luZyBzaW1wbGUgbWVjaGFuaXNtIHdoZXJlIHdlIGNsZWFuIHVwIGFsbFxuICAgICAqIHNlbGVjdGlvbiBhbmQgdGhlbiBzZXQgdGhlIGdsb2JhbCBleHBhbmQgc3RhdGUsIHRoaXMgd2hleSBpc0V4cGFuZCBtZXRob2QgcmV0dXJucyB0aGUgc2FtZVxuICAgICAqIHN0YXRlIGZvciBhbGwgaXRlbXNcbiAgICAgKi9cbiAgICBjb2xsYXBzZUFsbCAoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5leHBhbnNpb25TdGF0ZXMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5nbG9iYWxTdGF0ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGV4cGFuZEFsbCAoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5leHBhbnNpb25TdGF0ZXMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5nbG9iYWxTdGF0ZSA9IHRydWU7XG4gICAgfVxuXG5cbiAgICBnZXQgZXhwYW5zaW9uUGF0aCAoKTogYW55W11cbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX2V4cGFuc2lvblBhdGgpKSB7XG4gICAgICAgICAgICB0aGlzLl9leHBhbnNpb25QYXRoID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cGFuc2lvblBhdGg7XG4gICAgfVxuXG5cbiAgICBzZXQgZXhwYW5zaW9uUGF0aCAodmFsdWU6IGFueVtdKVxuICAgIHtcbiAgICAgICAgdGhpcy5fZXhwYW5zaW9uUGF0aCA9IHZhbHVlO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX2V4cGFuc2lvblBhdGgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZXhwYW5zaW9uUGF0aC5mb3JFYWNoKChpdGVtOiBhbnkpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RXhwYW5zaW9uU3RhdGUoaXRlbSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgdG9nZ2xlRXhwYW5zaW9uIChjdXJyZW50UGF0aDogYW55W10sIGNoaWRyZW4/OiBhbnlbXSk6IHZvaWRcbiAgICB7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsoY3VycmVudFBhdGgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGl0ZW0gPSBMaXN0V3JhcHBlci5sYXN0KGN1cnJlbnRQYXRoKTtcbiAgICAgICAgbGV0IGl0ZW1DaGlsZHJlbiA9IGNoaWRyZW4gfHwgW107XG4gICAgICAgIGxldCBuZXdTdGF0ZSA9ICF0aGlzLmlzRXhwYW5kZWQoaXRlbSk7XG4gICAgICAgIHRoaXMuc2V0RXhwYW5zaW9uU3RhdGUoaXRlbSwgbmV3U3RhdGUpO1xuXG4gICAgICAgIGlmICghbmV3U3RhdGUpIHtcbiAgICAgICAgICAgIExpc3RXcmFwcGVyLnJlbW92ZUxhc3QoY3VycmVudFBhdGgpO1xuICAgICAgICAgICAgaXRlbUNoaWxkcmVuLmZvckVhY2goKGNoaWxkOiBhbnkpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFeHBhbnNpb25TdGF0ZShjaGlsZCwgbmV3U3RhdGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldEV4cGFuc2lvblBhdGgoY3VycmVudFBhdGgpO1xuICAgIH1cblxuICAgIHNldEV4cGFuc2lvblN0YXRlIChpdGVtOiBhbnksIGlzRXhwYW5kZWQ6IGJvb2xlYW4pOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQga2V5ID0gdGhpcy5pdGVtVG9LZXkoaXRlbSk7XG4gICAgICAgIGlmIChpc0V4cGFuZGVkID09PSB0aGlzLmdsb2JhbFN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuc2lvblN0YXRlcy5kZWxldGUoa2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5zaW9uU3RhdGVzLnNldChrZXksIChpc0V4cGFuZGVkKSA/IHRydWUgOiBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUbyBpbXByb3ZlIHN0YXRlIHBlcnNpc3RpbmcgbGV0cyBjaGVjayBpZiB3ZSBhcmUgZGVhbGluZyB3aXRoIGFuIE9iamVjdCB0aGF0IGhhcyBJZGVudGl0eVxuICAgICAqIHNvIHdlIGNhbiBleHRyYWN0IGFuIElEIG90aGVyd2lzZSB1c2Ugb2JqZWN0IHRvIGNvbXBhcmUgYnkgcmVmZXJlbmNlXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgaXRlbVRvS2V5IChpdGVtOiBhbnkpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBpc0VudGl0eShpdGVtKSA/ICg8RW50aXR5Pml0ZW0pLmlkZW50aXR5KCkgOiBpdGVtO1xuICAgIH1cblxuXG4gICAgc2V0RXhwYW5zaW9uUGF0aCAoaXRlbTogYW55W10pOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmV4cGFuc2lvblBhdGggPSBpdGVtO1xuXG4gICAgICAgIGl0ZW0uZm9yRWFjaCgobm9kZTogYW55KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNldEV4cGFuc2lvblN0YXRlKG5vZGUsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpc0V4cGFuZGVkIChpdGVtOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICBsZXQga2V5ID0gdGhpcy5pdGVtVG9LZXkoaXRlbSk7XG4gICAgICAgIGlmICghdGhpcy5leHBhbnNpb25TdGF0ZXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdsb2JhbFN0YXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmV4cGFuc2lvblN0YXRlcy5nZXQoa2V5KTtcbiAgICB9XG5cbn1cbiJdfQ==