/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf } from '@angular/core';
import { assert, Environment, isBlank, isPresent } from '@aribaui/core';
import { BaseComponent } from '../../../core/base.component';
import { OutlineForComponent } from '../outline-for.component';
import { OutlineState } from '../outline-state';
/**
 * OutlineControlComponent renders the indentation, arrow, and text for a node in an outline.
 * It should be used either in the body of an OutlineFor component, or inside datatable
 *
 *
 * ##Usage inside body:
 *
 *  Here you can see that we need to wrap out content inside ng-template which will push us
 *  give us current item item and then we can place OutlineControlComponent to control
 *  the tree.
 *
 * ```
 *  <aw-outline-for2 #ooo [list]="list" [hasChildren]="hasChildren">
 *
 *      <ng-template #outline let-item>
 *          <div class="my-section">
 *              <div class="outline">
 *                  <aw-outline-control>
 *                      {{item?.content}}
 *                  </aw-outline-control>
 *              </div>*
 *          </div>
 *      </ng-template>
 *  </aw-outline-for2>
 *
 *
 * ```
 *
 *
 *
 *
 */
var OutlineControlComponent = /** @class */ (function (_super) {
    tslib_1.__extends(OutlineControlComponent, _super);
    function OutlineControlComponent(env, outlineState, parentControl, outlineFor) {
        var _this = _super.call(this, env) || this;
        _this.env = env;
        _this.outlineState = outlineState;
        _this.parentControl = parentControl;
        _this.outlineFor = outlineFor;
        /**
         *
         *  If TRUE it changes the behavior of the outline node text which click is triggered
         *  it selects the item and broadcast the `onItemSelected` event
         *
         */
        _this.allowSelection = false;
        _this.allowEdit = false;
        /**
         *
         * Triggers action when outline item is expanded
         *
         */
        _this.action = new EventEmitter();
        _this.isRootItem = false;
        return _this;
    }
    /**
     * @return {?}
     */
    OutlineControlComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        this.prepareControl();
    };
    /**
     *
     * We dont show expansion icons when there no children
     *
     */
    /**
     *
     * We dont show expansion icons when there no children
     *
     * @return {?}
     */
    OutlineControlComponent.prototype.hasExpansionControl = /**
     *
     * We dont show expansion icons when there no children
     *
     * @return {?}
     */
    function () {
        return this.outlineFor.hasChildren(this.item) && this.outlineFor.showExpansionControl;
    };
    /**
     * @return {?}
     */
    OutlineControlComponent.prototype.isSelected = /**
     * @return {?}
     */
    function () {
        return this.outlineFor.state.selectedItem === this.item;
    };
    /**
     * @return {?}
     */
    OutlineControlComponent.prototype.calculateStyleClass = /**
     * @return {?}
     */
    function () {
        if (!this.hasExpansionControl() ||
            (this.outlineFor.pushRootSectionOnNewLine && isBlank(this.item.$$parentItem))) {
            return '';
        }
        if (this.outlineFor.embedded) {
            return this.outlineFor.isExpanded(this.item) ? 'icon-slim-arrow-down'
                : 'icon-slim-arrow-right';
        }
        else {
            return this.outlineFor.isExpanded(this.item)
                ? 'icon-slim-arrow-right outline-icon-expanded' : 'icon-slim-arrow-right';
        }
    };
    /**
     * Collapses and expands current node
     *
     */
    /**
     * Collapses and expands current node
     *
     * @param {?} event
     * @return {?}
     */
    OutlineControlComponent.prototype.toggleExpansion = /**
     * Collapses and expands current node
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.outlineFor.state.currentPath = [];
        /** @type {?} */
        var currentPath = this.item;
        while (isPresent(currentPath)) {
            this.outlineFor.state.currentPath.unshift(currentPath);
            currentPath = currentPath.$$parentItem;
        }
        this.outlineFor.toggleExpansion();
        /** @type {?} */
        var payload = {
            item: this.item,
            expanded: this.outlineFor.state.isExpanded(this.item)
        };
        this.action.emit(payload);
        this.outlineFor.onExpandChange.emit(payload);
        event.stopPropagation();
    };
    /**
     * @return {?}
     */
    OutlineControlComponent.prototype.select = /**
     * @return {?}
     */
    function () {
        this.outlineFor.state.selectedItem = this.item;
        this.outlineFor.onItemSelected.emit(this.item);
    };
    /**
     * @return {?}
     */
    OutlineControlComponent.prototype.prepareControl = /**
     * @return {?}
     */
    function () {
        if (isBlank(this.outlineFor) && isPresent(this.outlineState)) {
            this.outlineFor = this.outlineState.outlineFor;
        }
        assert(isPresent(this.outlineFor), 'Missing outlineFor component');
        if (this.outlineFor.embedded) {
            /** @type {?} */
            var level = this.outlineFor.state.currentLevel;
            if (this.outlineFor.pushRootSectionOnNewLine && level > 0) {
                level -= 1;
            }
            this.indentation = (this.outlineFor.indentationPerLevel * level);
        }
        this.item = this.outlineFor.currentItem;
        this.isRootItem = isBlank(this.item.$$parentItem);
    };
    OutlineControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-outline-control',
                    template: "<!--\n    Control is just the two flex box items for displaying expand/collapse icon and content\n\n    Since we animate only standalone/non-embedded case now then we need to also animate the icon\n    so we use only icon-slim-arrow-right and do tranformation on top of this to make it rotate.\n\n    If embedded case we use both icons icon-slim-arrow-right / icon-slim-arrow-down\n-->\n<div class=\"w-outline-control\"\n     [ngClass]=\"{'outline-u-unselectable-text': outlineFor.pushRootSectionOnNewLine && !item.$$parentItem}\">\n    <div class=\"outline-icon sap-icon\"\n         *ngIf=\"!outlineFor.pushRootSectionOnNewLine || !isRootItem\"\n         (click)=\"toggleExpansion($event)\"\n         [style.margin-left.px]=\"indentation\"\n         [ngClass]=\"calculateStyleClass()\">\n    </div>\n\n    <ng-container *ngIf=\"allowSelection; then withSelection else withoutSelection\">\n    </ng-container>\n</div>\n\n<!--\n We support two case for the content\n\n Selection: When you click on the content it will add extra class so you can style currently\n selected item as well as broadcast event outside so developer can hook in some custom logic\n\n If we dont support selection: Then clicking on the content is just like clicking on expandable\n icon, it toggles the state\n-->\n\n<ng-template #withSelection>\n     <span class=\"outline-content outline-content-selected\" *ngIf=\"!allowEdit && isSelected()\">\n        <ng-container *ngTemplateOutlet=\"ngContent\"></ng-container>\n    </span>\n    <span class=\"outline-content\" *ngIf=\"!allowEdit && !isSelected()\" (click)=\"select()\">\n        <ng-container *ngTemplateOutlet=\"ngContent\"></ng-container>\n    </span>\n\n</ng-template>\n\n\n<ng-template #withoutSelection>\n    <span *ngIf=\"!allowEdit\" class=\"outline-content\" (click)=\"toggleExpansion($event)\">\n        <ng-container *ngTemplateOutlet=\"ngContent\"></ng-container>\n    </span>\n    <span *ngIf=\"allowEdit\" class=\"outline-content\">\n        <ng-container *ngTemplateOutlet=\"ngContent\"></ng-container>\n    </span>\n</ng-template>\n\n\n<ng-template #ngContent>\n    <ng-content></ng-content>\n</ng-template>\n\n",
                    styles: [".w-outline-control{overflow:hidden;display:flex;flex-wrap:nowrap;cursor:pointer}.w-outline-control .outline-icon{flex:0 0 15px;color:#ababab;font-size:14px;font-weight:700;min-width:11px;-ms-grid-row-align:center;align-self:center;transition:transform 50ms ease-in;transition:transform 50ms ease-in,-webkit-transform 50ms ease-in;-webkit-transform-origin:25% 65%;transform-origin:25% 65%;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.w-outline-control .outline-icon.outline-icon-expanded{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.w-outline-control .outline-content{flex:1 1 auto;flex-wrap:wrap;padding:0 4px}.w-outline-control .outline-content.outline-content-selected{cursor:default;font-weight:700}.outline-u-unselectable-text{-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;-ms-user-select:none;user-select:none;cursor:auto}"]
                }] }
    ];
    /** @nocollapse */
    OutlineControlComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: OutlineState, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(function () { return OutlineState; }),] }] },
        { type: OutlineControlComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return OutlineControlComponent; }),] }] },
        { type: OutlineForComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return OutlineForComponent; }),] }] }
    ]; };
    OutlineControlComponent.propDecorators = {
        allowSelection: [{ type: Input }],
        allowEdit: [{ type: Input }],
        action: [{ type: Output }]
    };
    return OutlineControlComponent;
}(BaseComponent));
export { OutlineControlComponent };
if (false) {
    /**
     *
     *  If TRUE it changes the behavior of the outline node text which click is triggered
     *  it selects the item and broadcast the `onItemSelected` event
     *
     * @type {?}
     */
    OutlineControlComponent.prototype.allowSelection;
    /** @type {?} */
    OutlineControlComponent.prototype.allowEdit;
    /**
     *
     * Triggers action when outline item is expanded
     *
     * @type {?}
     */
    OutlineControlComponent.prototype.action;
    /**
     * Current item used for this `OutlineControl`
     *
     * @type {?}
     */
    OutlineControlComponent.prototype.item;
    /**
     * Calculated indentation used to shift the nested section to the left. This is used for
     * embedded mode e.g. tree table where we cannot indent parent
     * @type {?}
     */
    OutlineControlComponent.prototype.indentation;
    /** @type {?} */
    OutlineControlComponent.prototype.isRootItem;
    /** @type {?} */
    OutlineControlComponent.prototype.env;
    /** @type {?} */
    OutlineControlComponent.prototype.outlineState;
    /** @type {?} */
    OutlineControlComponent.prototype.parentControl;
    /** @type {?} */
    OutlineControlComponent.prototype.outlineFor;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL291dGxpbmUvb3V0bGluZS1jb250cm9sL291dGxpbmUtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFvQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixRQUFRLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDN0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBd0NELG1EQUFhO0lBc0N0RCxpQ0FBbUIsR0FBZ0IsRUFFZixZQUEwQixFQUUxQixhQUFzQyxFQUV2QyxVQUErQjtRQU5sRCxZQVFJLGtCQUFNLEdBQUcsQ0FBQyxTQUViO1FBVmtCLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFFZixrQkFBWSxHQUFaLFlBQVksQ0FBYztRQUUxQixtQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUFFdkMsZ0JBQVUsR0FBVixVQUFVLENBQXFCOzs7Ozs7OytCQWxDeEIsS0FBSzswQkFHVixLQUFLOzs7Ozs7dUJBUUUsSUFBSSxZQUFZLEVBQUU7MkJBZXhCLEtBQUs7O0tBWTFCOzs7O0lBRUQsMENBQVE7OztJQUFSO1FBRUksaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFD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InNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBTa2lwU2VsZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7YXNzZXJ0LCBFbnZpcm9ubWVudCwgaXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQge091dGxpbmVGb3JDb21wb25lbnR9IGZyb20gJy4uL291dGxpbmUtZm9yLmNvbXBvbmVudCc7XG5pbXBvcnQge091dGxpbmVTdGF0ZX0gZnJvbSAnLi4vb3V0bGluZS1zdGF0ZSc7XG5cblxuLyoqXG4gKiBPdXRsaW5lQ29udHJvbENvbXBvbmVudCByZW5kZXJzIHRoZSBpbmRlbnRhdGlvbiwgYXJyb3csIGFuZCB0ZXh0IGZvciBhIG5vZGUgaW4gYW4gb3V0bGluZS5cbiAqIEl0IHNob3VsZCBiZSB1c2VkIGVpdGhlciBpbiB0aGUgYm9keSBvZiBhbiBPdXRsaW5lRm9yIGNvbXBvbmVudCwgb3IgaW5zaWRlIGRhdGF0YWJsZVxuICpcbiAqXG4gKiAjI1VzYWdlIGluc2lkZSBib2R5OlxuICpcbiAqICBIZXJlIHlvdSBjYW4gc2VlIHRoYXQgd2UgbmVlZCB0byB3cmFwIG91dCBjb250ZW50IGluc2lkZSBuZy10ZW1wbGF0ZSB3aGljaCB3aWxsIHB1c2ggdXNcbiAqICBnaXZlIHVzIGN1cnJlbnQgaXRlbSBpdGVtIGFuZCB0aGVuIHdlIGNhbiBwbGFjZSBPdXRsaW5lQ29udHJvbENvbXBvbmVudCB0byBjb250cm9sXG4gKiAgdGhlIHRyZWUuXG4gKlxuICogYGBgXG4gKiAgPGF3LW91dGxpbmUtZm9yMiAjb29vIFtsaXN0XT1cImxpc3RcIiBbaGFzQ2hpbGRyZW5dPVwiaGFzQ2hpbGRyZW5cIj5cbiAqXG4gKiAgICAgIDxuZy10ZW1wbGF0ZSAjb3V0bGluZSBsZXQtaXRlbT5cbiAqICAgICAgICAgIDxkaXYgY2xhc3M9XCJteS1zZWN0aW9uXCI+XG4gKiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm91dGxpbmVcIj5cbiAqICAgICAgICAgICAgICAgICAgPGF3LW91dGxpbmUtY29udHJvbD5cbiAqICAgICAgICAgICAgICAgICAgICAgIHt7aXRlbT8uY29udGVudH19XG4gKiAgICAgICAgICAgICAgICAgIDwvYXctb3V0bGluZS1jb250cm9sPlxuICogICAgICAgICAgICAgIDwvZGl2PipcbiAqICAgICAgICAgIDwvZGl2PlxuICogICAgICA8L25nLXRlbXBsYXRlPlxuICogIDwvYXctb3V0bGluZS1mb3IyPlxuICpcbiAqXG4gKiBgYGBcbiAqXG4gKlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctb3V0bGluZS1jb250cm9sJyxcbiAgICB0ZW1wbGF0ZVVybDogJ291dGxpbmUtY29udHJvbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ291dGxpbmUtY29udHJvbC5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBPdXRsaW5lQ29udHJvbENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogIElmIFRSVUUgaXQgY2hhbmdlcyB0aGUgYmVoYXZpb3Igb2YgdGhlIG91dGxpbmUgbm9kZSB0ZXh0IHdoaWNoIGNsaWNrIGlzIHRyaWdnZXJlZFxuICAgICAqICBpdCBzZWxlY3RzIHRoZSBpdGVtIGFuZCBicm9hZGNhc3QgdGhlIGBvbkl0ZW1TZWxlY3RlZGAgZXZlbnRcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYWxsb3dTZWxlY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgYWxsb3dFZGl0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRyaWdnZXJzIGFjdGlvbiB3aGVuIG91dGxpbmUgaXRlbSBpcyBleHBhbmRlZFxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgYWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgaXRlbSB1c2VkIGZvciB0aGlzIGBPdXRsaW5lQ29udHJvbGBcbiAgICAgKlxuICAgICAqL1xuICAgIGl0ZW06IGFueTtcblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZWQgaW5kZW50YXRpb24gdXNlZCB0byBzaGlmdCB0aGUgbmVzdGVkIHNlY3Rpb24gdG8gdGhlIGxlZnQuIFRoaXMgaXMgdXNlZCBmb3JcbiAgICAgKiBlbWJlZGRlZCBtb2RlIGUuZy4gdHJlZSB0YWJsZSB3aGVyZSB3ZSBjYW5ub3QgaW5kZW50IHBhcmVudFxuICAgICAqL1xuICAgIGluZGVudGF0aW9uOiBudW1iZXI7XG5cblxuICAgIGlzUm9vdEl0ZW06IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBPdXRsaW5lU3RhdGUpKVxuICAgICAgICAgICAgICAgIHByaXZhdGUgb3V0bGluZVN0YXRlOiBPdXRsaW5lU3RhdGUsXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE91dGxpbmVDb250cm9sQ29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcml2YXRlIHBhcmVudENvbnRyb2w6IE91dGxpbmVDb250cm9sQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBPdXRsaW5lRm9yQ29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3V0bGluZUZvcjogT3V0bGluZUZvckNvbXBvbmVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgICAgIHRoaXMucHJlcGFyZUNvbnRyb2woKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2UgZG9udCBzaG93IGV4cGFuc2lvbiBpY29ucyB3aGVuIHRoZXJlIG5vIGNoaWxkcmVuXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNFeHBhbnNpb25Db250cm9sKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLm91dGxpbmVGb3IuaGFzQ2hpbGRyZW4odGhpcy5pdGVtKSAmJiB0aGlzLm91dGxpbmVGb3Iuc2hvd0V4cGFuc2lvbkNvbnRyb2w7XG4gICAgfVxuXG5cbiAgICBpc1NlbGVjdGVkKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLm91dGxpbmVGb3Iuc3RhdGUuc2VsZWN0ZWRJdGVtID09PSB0aGlzLml0ZW07XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlU3R5bGVDbGFzcygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGlmICghdGhpcy5oYXNFeHBhbnNpb25Db250cm9sKCkgfHxcbiAgICAgICAgICAgICh0aGlzLm91dGxpbmVGb3IucHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lICYmIGlzQmxhbmsodGhpcy5pdGVtLiQkcGFyZW50SXRlbSkpKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vdXRsaW5lRm9yLmVtYmVkZGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vdXRsaW5lRm9yLmlzRXhwYW5kZWQodGhpcy5pdGVtKSA/ICdpY29uLXNsaW0tYXJyb3ctZG93bidcbiAgICAgICAgICAgICAgICA6ICdpY29uLXNsaW0tYXJyb3ctcmlnaHQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3V0bGluZUZvci5pc0V4cGFuZGVkKHRoaXMuaXRlbSlcbiAgICAgICAgICAgICAgICA/ICdpY29uLXNsaW0tYXJyb3ctcmlnaHQgb3V0bGluZS1pY29uLWV4cGFuZGVkJyA6ICdpY29uLXNsaW0tYXJyb3ctcmlnaHQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29sbGFwc2VzIGFuZCBleHBhbmRzIGN1cnJlbnQgbm9kZVxuICAgICAqXG4gICAgICovXG4gICAgdG9nZ2xlRXhwYW5zaW9uKGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLm91dGxpbmVGb3Iuc3RhdGUuY3VycmVudFBhdGggPSBbXTtcbiAgICAgICAgbGV0IGN1cnJlbnRQYXRoID0gdGhpcy5pdGVtO1xuXG4gICAgICAgIHdoaWxlIChpc1ByZXNlbnQoY3VycmVudFBhdGgpKSB7XG4gICAgICAgICAgICB0aGlzLm91dGxpbmVGb3Iuc3RhdGUuY3VycmVudFBhdGgudW5zaGlmdChjdXJyZW50UGF0aCk7XG4gICAgICAgICAgICBjdXJyZW50UGF0aCA9IGN1cnJlbnRQYXRoLiQkcGFyZW50SXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3V0bGluZUZvci50b2dnbGVFeHBhbnNpb24oKTtcbiAgICAgICAgbGV0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW0sXG4gICAgICAgICAgICBleHBhbmRlZDogdGhpcy5vdXRsaW5lRm9yLnN0YXRlLmlzRXhwYW5kZWQodGhpcy5pdGVtKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFjdGlvbi5lbWl0KHBheWxvYWQpO1xuICAgICAgICB0aGlzLm91dGxpbmVGb3Iub25FeHBhbmRDaGFuZ2UuZW1pdChwYXlsb2FkKTtcblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5vdXRsaW5lRm9yLnN0YXRlLnNlbGVjdGVkSXRlbSA9IHRoaXMuaXRlbTtcbiAgICAgICAgdGhpcy5vdXRsaW5lRm9yLm9uSXRlbVNlbGVjdGVkLmVtaXQodGhpcy5pdGVtKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVDb250cm9sKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMub3V0bGluZUZvcikgJiYgaXNQcmVzZW50KHRoaXMub3V0bGluZVN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy5vdXRsaW5lRm9yID0gdGhpcy5vdXRsaW5lU3RhdGUub3V0bGluZUZvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQodGhpcy5vdXRsaW5lRm9yKSwgJ01pc3Npbmcgb3V0bGluZUZvciBjb21wb25lbnQnKTtcbiAgICAgICAgaWYgKHRoaXMub3V0bGluZUZvci5lbWJlZGRlZCkge1xuICAgICAgICAgICAgbGV0IGxldmVsID0gdGhpcy5vdXRsaW5lRm9yLnN0YXRlLmN1cnJlbnRMZXZlbDtcbiAgICAgICAgICAgIGlmICh0aGlzLm91dGxpbmVGb3IucHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lICYmIGxldmVsID4gMCkge1xuICAgICAgICAgICAgICAgIGxldmVsIC09IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaW5kZW50YXRpb24gPSAodGhpcy5vdXRsaW5lRm9yLmluZGVudGF0aW9uUGVyTGV2ZWwgKiBsZXZlbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pdGVtID0gdGhpcy5vdXRsaW5lRm9yLmN1cnJlbnRJdGVtO1xuICAgICAgICB0aGlzLmlzUm9vdEl0ZW0gPSBpc0JsYW5rKHRoaXMuaXRlbS4kJHBhcmVudEl0ZW0pO1xuICAgIH1cblxufVxuIl19