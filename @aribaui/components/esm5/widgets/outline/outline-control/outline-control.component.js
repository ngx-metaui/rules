/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
 * We can
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
        var /** @type {?} */ currentPath = this.item;
        while (isPresent(currentPath)) {
            this.outlineFor.state.currentPath.unshift(currentPath);
            currentPath = currentPath.$$parentItem;
        }
        this.outlineFor.toggleExpansion();
        var /** @type {?} */ payload = {
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
            var /** @type {?} */ level = this.outlineFor.state.currentLevel;
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
                    template: "<!--\n    Control is just the two flex box items for displaying expand/collapse icon and content\n\n    Since we animate only standalone/non-embedded case now then we need to also animate the icon\n    so we use only icon-slim-arrow-right and do tranformation on top of this to make it rotate.\n\n    If embedded case we use both icons icon-slim-arrow-right / icon-slim-arrow-down\n-->\n<div class=\"w-outline-control\"\n     [ngClass]=\"{'outline-u-unselectable-text': outlineFor.pushRootSectionOnNewLine && !item.$$parentItem}\">\n    <div class=\"outline-icon sap-icon\"\n         *ngIf=\"!outlineFor.pushRootSectionOnNewLine || !isRootItem\"\n         (click)=\"toggleExpansion($event)\"\n         [style.margin-left.px]=\"indentation\"\n         [ngClass]=\"calculateStyleClass()\">\n    </div>\n\n    <ng-container *ngIf=\"allowSelection; then withSelection else withoutSelection\">\n    </ng-container>\n</div>\n\n<!--\n We support two case for the content\n\n Selection: When you click on the content it will add extra class so you can style currently\n selected item as well as broadcast event outside so developer can hook in some custom logic\n\n If we dont support selection: Then clicking on the content is just like clicking on expandable\n icon, it toggles the state\n-->\n\n<ng-template #withSelection>\n     <span class=\"outline-content outline-content-selected\" *ngIf=\"isSelected()\">\n        <ng-container *ngTemplateOutlet=\"ngContent\"></ng-container>\n    </span>\n    <span class=\"outline-content\" *ngIf=\"!isSelected()\" (click)=\"select()\">\n        <ng-container *ngTemplateOutlet=\"ngContent\"></ng-container>\n    </span>\n\n</ng-template>\n\n\n<ng-template #withoutSelection>\n    <span class=\"outline-content\" (click)=\"toggleExpansion($event)\">\n        <ng-container *ngTemplateOutlet=\"ngContent\"></ng-container>\n    </span>\n</ng-template>\n\n\n<ng-template #ngContent>\n    <ng-content></ng-content>\n</ng-template>\n\n",
                    styles: [".w-outline-control{overflow:hidden;display:flex;flex-wrap:nowrap;cursor:pointer}.w-outline-control .outline-icon{flex:0 0 15px;color:#ababab;font-size:14px;font-weight:700;min-width:11px;align-self:center;transition:-webkit-transform 50ms ease-in;transition:transform 50ms ease-in;transition:transform 50ms ease-in,-webkit-transform 50ms ease-in;-webkit-transform-origin:25% 65%;transform-origin:25% 65%;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.w-outline-control .outline-icon.outline-icon-expanded{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.w-outline-control .outline-content{flex:1 1 auto;flex-wrap:wrap;padding:0 4px}.w-outline-control .outline-content.outline-content-selected{cursor:default;font-weight:700}.outline-u-unselectable-text{-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;-ms-user-select:none;user-select:none;cursor:auto}"],
                },] },
    ];
    /** @nocollapse */
    OutlineControlComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: OutlineState, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(function () { return OutlineState; }),] }] },
        { type: OutlineControlComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return OutlineControlComponent; }),] }] },
        { type: OutlineForComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return OutlineForComponent; }),] }] }
    ]; };
    OutlineControlComponent.propDecorators = {
        title: [{ type: Input }],
        allowSelection: [{ type: Input }],
        action: [{ type: Output }]
    };
    return OutlineControlComponent;
}(BaseComponent));
export { OutlineControlComponent };
function OutlineControlComponent_tsickle_Closure_declarations() {
    /**
     * List of items that needs to be rendered.
     * @type {?}
     */
    OutlineControlComponent.prototype.title;
    /**
     *
     *  If TRUE it changes the behavior of the outline node text which click is triggered
     *  it selects the item and broadcast the `onItemSelected` event
     *
     * @type {?}
     */
    OutlineControlComponent.prototype.allowSelection;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL291dGxpbmUvb3V0bGluZS1jb250cm9sL291dGxpbmUtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFvQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixRQUFRLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDN0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNkZELG1EQUFhO0lBMEN0RCxpQ0FBb0IsR0FBZ0IsRUFFZixZQUEwQixFQUUxQixhQUFzQyxFQUV2QyxVQUErQjtRQU5uRCxZQVFJLGtCQUFNLEdBQUcsQ0FBQyxTQUViO1FBVm1CLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFFZixrQkFBWSxHQUFaLFlBQVksQ0FBYztRQUUxQixtQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUFFdkMsZ0JBQVUsR0FBVixVQUFVLENBQXFCOzs7Ozs7OytCQS9CekIsS0FBSzs7Ozs7O3VCQVFILElBQUksWUFBWSxFQUFFOzJCQWV4QixLQUFLOztLQVkxQjs7OztJQUVELDBDQUFROzs7SUFBUjtRQUVJLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN6QjtJQUdE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O2tDQXRKWDtFQThINkMsYUFBYTtTQUE3Qyx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgU2tpcFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2Fzc2VydCwgRW52aXJvbm1lbnQsIGlzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHtPdXRsaW5lRm9yQ29tcG9uZW50fSBmcm9tICcuLi9vdXRsaW5lLWZvci5jb21wb25lbnQnO1xuaW1wb3J0IHtPdXRsaW5lU3RhdGV9IGZyb20gJy4uL291dGxpbmUtc3RhdGUnO1xuXG5cbi8qKlxuICogT3V0bGluZUNvbnRyb2xDb21wb25lbnQgcmVuZGVycyB0aGUgaW5kZW50YXRpb24sIGFycm93LCBhbmQgdGV4dCBmb3IgYSBub2RlIGluIGFuIG91dGxpbmUuXG4gKiBJdCBzaG91bGQgYmUgdXNlZCBlaXRoZXIgaW4gdGhlIGJvZHkgb2YgYW4gT3V0bGluZUZvciBjb21wb25lbnQsIG9yIGluc2lkZSBkYXRhdGFibGVcbiAqXG4gKlxuICogIyNVc2FnZSBpbnNpZGUgYm9keTpcbiAqXG4gKiAgSGVyZSB5b3UgY2FuIHNlZSB0aGF0IHdlIG5lZWQgdG8gd3JhcCBvdXQgY29udGVudCBpbnNpZGUgbmctdGVtcGxhdGUgd2hpY2ggd2lsbCBwdXNoIHVzXG4gKiAgZ2l2ZSB1cyBjdXJyZW50IGl0ZW0gaXRlbSBhbmQgdGhlbiB3ZSBjYW4gcGxhY2UgT3V0bGluZUNvbnRyb2xDb21wb25lbnQgdG8gY29udHJvbFxuICogIHRoZSB0cmVlLlxuICpcbiAqIGBgYFxuICogIDxhdy1vdXRsaW5lLWZvcjIgI29vbyBbbGlzdF09XCJsaXN0XCIgW2hhc0NoaWxkcmVuXT1cImhhc0NoaWxkcmVuXCI+XG4gKlxuICogICAgICA8bmctdGVtcGxhdGUgI291dGxpbmUgbGV0LWl0ZW0+XG4gKiAgICAgICAgICA8ZGl2IGNsYXNzPVwibXktc2VjdGlvblwiPlxuICogICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvdXRsaW5lXCI+XG4gKiAgICAgICAgICAgICAgICAgIDxhdy1vdXRsaW5lLWNvbnRyb2w+XG4gKiAgICAgICAgICAgICAgICAgICAgICB7e2l0ZW0/LmNvbnRlbnR9fVxuICogICAgICAgICAgICAgICAgICA8L2F3LW91dGxpbmUtY29udHJvbD5cbiAqICAgICAgICAgICAgICA8L2Rpdj4qXG4gKiAgICAgICAgICA8L2Rpdj5cbiAqICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAqICA8L2F3LW91dGxpbmUtZm9yMj5cbiAqXG4gKlxuICogYGBgXG4gKlxuICogV2UgY2FuXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1vdXRsaW5lLWNvbnRyb2wnLFxuICAgIHRlbXBsYXRlOiBgPCEtLVxuICAgIENvbnRyb2wgaXMganVzdCB0aGUgdHdvIGZsZXggYm94IGl0ZW1zIGZvciBkaXNwbGF5aW5nIGV4cGFuZC9jb2xsYXBzZSBpY29uIGFuZCBjb250ZW50XG5cbiAgICBTaW5jZSB3ZSBhbmltYXRlIG9ubHkgc3RhbmRhbG9uZS9ub24tZW1iZWRkZWQgY2FzZSBub3cgdGhlbiB3ZSBuZWVkIHRvIGFsc28gYW5pbWF0ZSB0aGUgaWNvblxuICAgIHNvIHdlIHVzZSBvbmx5IGljb24tc2xpbS1hcnJvdy1yaWdodCBhbmQgZG8gdHJhbmZvcm1hdGlvbiBvbiB0b3Agb2YgdGhpcyB0byBtYWtlIGl0IHJvdGF0ZS5cblxuICAgIElmIGVtYmVkZGVkIGNhc2Ugd2UgdXNlIGJvdGggaWNvbnMgaWNvbi1zbGltLWFycm93LXJpZ2h0IC8gaWNvbi1zbGltLWFycm93LWRvd25cbi0tPlxuPGRpdiBjbGFzcz1cInctb3V0bGluZS1jb250cm9sXCJcbiAgICAgW25nQ2xhc3NdPVwieydvdXRsaW5lLXUtdW5zZWxlY3RhYmxlLXRleHQnOiBvdXRsaW5lRm9yLnB1c2hSb290U2VjdGlvbk9uTmV3TGluZSAmJiAhaXRlbS4kJHBhcmVudEl0ZW19XCI+XG4gICAgPGRpdiBjbGFzcz1cIm91dGxpbmUtaWNvbiBzYXAtaWNvblwiXG4gICAgICAgICAqbmdJZj1cIiFvdXRsaW5lRm9yLnB1c2hSb290U2VjdGlvbk9uTmV3TGluZSB8fCAhaXNSb290SXRlbVwiXG4gICAgICAgICAoY2xpY2spPVwidG9nZ2xlRXhwYW5zaW9uKCRldmVudClcIlxuICAgICAgICAgW3N0eWxlLm1hcmdpbi1sZWZ0LnB4XT1cImluZGVudGF0aW9uXCJcbiAgICAgICAgIFtuZ0NsYXNzXT1cImNhbGN1bGF0ZVN0eWxlQ2xhc3MoKVwiPlxuICAgIDwvZGl2PlxuXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImFsbG93U2VsZWN0aW9uOyB0aGVuIHdpdGhTZWxlY3Rpb24gZWxzZSB3aXRob3V0U2VsZWN0aW9uXCI+XG4gICAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cblxuPCEtLVxuIFdlIHN1cHBvcnQgdHdvIGNhc2UgZm9yIHRoZSBjb250ZW50XG5cbiBTZWxlY3Rpb246IFdoZW4geW91IGNsaWNrIG9uIHRoZSBjb250ZW50IGl0IHdpbGwgYWRkIGV4dHJhIGNsYXNzIHNvIHlvdSBjYW4gc3R5bGUgY3VycmVudGx5XG4gc2VsZWN0ZWQgaXRlbSBhcyB3ZWxsIGFzIGJyb2FkY2FzdCBldmVudCBvdXRzaWRlIHNvIGRldmVsb3BlciBjYW4gaG9vayBpbiBzb21lIGN1c3RvbSBsb2dpY1xuXG4gSWYgd2UgZG9udCBzdXBwb3J0IHNlbGVjdGlvbjogVGhlbiBjbGlja2luZyBvbiB0aGUgY29udGVudCBpcyBqdXN0IGxpa2UgY2xpY2tpbmcgb24gZXhwYW5kYWJsZVxuIGljb24sIGl0IHRvZ2dsZXMgdGhlIHN0YXRlXG4tLT5cblxuPG5nLXRlbXBsYXRlICN3aXRoU2VsZWN0aW9uPlxuICAgICA8c3BhbiBjbGFzcz1cIm91dGxpbmUtY29udGVudCBvdXRsaW5lLWNvbnRlbnQtc2VsZWN0ZWRcIiAqbmdJZj1cImlzU2VsZWN0ZWQoKVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibmdDb250ZW50XCI+PC9uZy1jb250YWluZXI+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwib3V0bGluZS1jb250ZW50XCIgKm5nSWY9XCIhaXNTZWxlY3RlZCgpXCIgKGNsaWNrKT1cInNlbGVjdCgpXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJuZ0NvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L3NwYW4+XG5cbjwvbmctdGVtcGxhdGU+XG5cblxuPG5nLXRlbXBsYXRlICN3aXRob3V0U2VsZWN0aW9uPlxuICAgIDxzcGFuIGNsYXNzPVwib3V0bGluZS1jb250ZW50XCIgKGNsaWNrKT1cInRvZ2dsZUV4cGFuc2lvbigkZXZlbnQpXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJuZ0NvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L3NwYW4+XG48L25nLXRlbXBsYXRlPlxuXG5cbjxuZy10ZW1wbGF0ZSAjbmdDb250ZW50PlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvbmctdGVtcGxhdGU+XG5cbmAsXG4gICAgc3R5bGVzOiBbYC53LW91dGxpbmUtY29udHJvbHtvdmVyZmxvdzpoaWRkZW47ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDpub3dyYXA7Y3Vyc29yOnBvaW50ZXJ9Lnctb3V0bGluZS1jb250cm9sIC5vdXRsaW5lLWljb257ZmxleDowIDAgMTVweDtjb2xvcjojYWJhYmFiO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjcwMDttaW4td2lkdGg6MTFweDthbGlnbi1zZWxmOmNlbnRlcjt0cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIDUwbXMgZWFzZS1pbjt0cmFuc2l0aW9uOnRyYW5zZm9ybSA1MG1zIGVhc2UtaW47dHJhbnNpdGlvbjp0cmFuc2Zvcm0gNTBtcyBlYXNlLWluLC13ZWJraXQtdHJhbnNmb3JtIDUwbXMgZWFzZS1pbjstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MjUlIDY1JTt0cmFuc2Zvcm0tb3JpZ2luOjI1JSA2NSU7LXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6cHJlc2VydmUtM2Q7dHJhbnNmb3JtLXN0eWxlOnByZXNlcnZlLTNkfS53LW91dGxpbmUtY29udHJvbCAub3V0bGluZS1pY29uLm91dGxpbmUtaWNvbi1leHBhbmRlZHstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoOTBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoOTBkZWcpfS53LW91dGxpbmUtY29udHJvbCAub3V0bGluZS1jb250ZW50e2ZsZXg6MSAxIGF1dG87ZmxleC13cmFwOndyYXA7cGFkZGluZzowIDRweH0udy1vdXRsaW5lLWNvbnRyb2wgLm91dGxpbmUtY29udGVudC5vdXRsaW5lLWNvbnRlbnQtc2VsZWN0ZWR7Y3Vyc29yOmRlZmF1bHQ7Zm9udC13ZWlnaHQ6NzAwfS5vdXRsaW5lLXUtdW5zZWxlY3RhYmxlLXRleHR7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstby11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7Y3Vyc29yOmF1dG99YF0sXG59KVxuZXhwb3J0IGNsYXNzIE91dGxpbmVDb250cm9sQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBpdGVtcyB0aGF0IG5lZWRzIHRvIGJlIHJlbmRlcmVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdGl0bGU6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiAgSWYgVFJVRSBpdCBjaGFuZ2VzIHRoZSBiZWhhdmlvciBvZiB0aGUgb3V0bGluZSBub2RlIHRleHQgd2hpY2ggY2xpY2sgaXMgdHJpZ2dlcmVkXG4gICAgICogIGl0IHNlbGVjdHMgdGhlIGl0ZW0gYW5kIGJyb2FkY2FzdCB0aGUgYG9uSXRlbVNlbGVjdGVkYCBldmVudFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBhbGxvd1NlbGVjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUcmlnZ2VycyBhY3Rpb24gd2hlbiBvdXRsaW5lIGl0ZW0gaXMgZXhwYW5kZWRcbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIGFjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGl0ZW0gdXNlZCBmb3IgdGhpcyBgT3V0bGluZUNvbnRyb2xgXG4gICAgICpcbiAgICAgKi9cbiAgICBpdGVtOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVkIGluZGVudGF0aW9uIHVzZWQgdG8gc2hpZnQgdGhlIG5lc3RlZCBzZWN0aW9uIHRvIHRoZSBsZWZ0LiBUaGlzIGlzIHVzZWQgZm9yXG4gICAgICogZW1iZWRkZWQgbW9kZSBlLmcuIHRyZWUgdGFibGUgd2hlcmUgd2UgY2Fubm90IGluZGVudCBwYXJlbnRcbiAgICAgKi9cbiAgICBpbmRlbnRhdGlvbjogbnVtYmVyO1xuXG5cbiAgICBpc1Jvb3RJdGVtOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvciAocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBPdXRsaW5lU3RhdGUpKVxuICAgICAgICAgICAgICAgICBwcml2YXRlIG91dGxpbmVTdGF0ZTogT3V0bGluZVN0YXRlLFxuICAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gT3V0bGluZUNvbnRyb2xDb21wb25lbnQpKVxuICAgICAgICAgICAgICAgICBwcml2YXRlIHBhcmVudENvbnRyb2w6IE91dGxpbmVDb250cm9sQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gT3V0bGluZUZvckNvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgIHB1YmxpYyBvdXRsaW5lRm9yOiBPdXRsaW5lRm9yQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcblxuICAgIH1cblxuICAgIG5nT25Jbml0ICgpXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgICAgIHRoaXMucHJlcGFyZUNvbnRyb2woKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2UgZG9udCBzaG93IGV4cGFuc2lvbiBpY29ucyB3aGVuIHRoZXJlIG5vIGNoaWxkcmVuXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNFeHBhbnNpb25Db250cm9sICgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5vdXRsaW5lRm9yLmhhc0NoaWxkcmVuKHRoaXMuaXRlbSkgJiYgdGhpcy5vdXRsaW5lRm9yLnNob3dFeHBhbnNpb25Db250cm9sO1xuICAgIH1cblxuXG4gICAgaXNTZWxlY3RlZCAoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3V0bGluZUZvci5zdGF0ZS5zZWxlY3RlZEl0ZW0gPT09IHRoaXMuaXRlbTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVTdHlsZUNsYXNzICgpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGlmICghdGhpcy5oYXNFeHBhbnNpb25Db250cm9sKCkgfHxcbiAgICAgICAgICAgICh0aGlzLm91dGxpbmVGb3IucHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lICYmIGlzQmxhbmsodGhpcy5pdGVtLiQkcGFyZW50SXRlbSkpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vdXRsaW5lRm9yLmVtYmVkZGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vdXRsaW5lRm9yLmlzRXhwYW5kZWQodGhpcy5pdGVtKSA/ICdpY29uLXNsaW0tYXJyb3ctZG93bidcbiAgICAgICAgICAgICAgICA6ICdpY29uLXNsaW0tYXJyb3ctcmlnaHQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3V0bGluZUZvci5pc0V4cGFuZGVkKHRoaXMuaXRlbSlcbiAgICAgICAgICAgICAgICA/ICdpY29uLXNsaW0tYXJyb3ctcmlnaHQgb3V0bGluZS1pY29uLWV4cGFuZGVkJyA6ICdpY29uLXNsaW0tYXJyb3ctcmlnaHQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29sbGFwc2VzIGFuZCBleHBhbmRzIGN1cnJlbnQgbm9kZVxuICAgICAqXG4gICAgICovXG4gICAgdG9nZ2xlRXhwYW5zaW9uIChldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5vdXRsaW5lRm9yLnN0YXRlLmN1cnJlbnRQYXRoID0gW107XG4gICAgICAgIGxldCBjdXJyZW50UGF0aCA9IHRoaXMuaXRlbTtcblxuICAgICAgICB3aGlsZSAoaXNQcmVzZW50KGN1cnJlbnRQYXRoKSkge1xuICAgICAgICAgICAgdGhpcy5vdXRsaW5lRm9yLnN0YXRlLmN1cnJlbnRQYXRoLnVuc2hpZnQoY3VycmVudFBhdGgpO1xuICAgICAgICAgICAgY3VycmVudFBhdGggPSBjdXJyZW50UGF0aC4kJHBhcmVudEl0ZW07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm91dGxpbmVGb3IudG9nZ2xlRXhwYW5zaW9uKCk7XG4gICAgICAgIGxldCBwYXlsb2FkID0ge1xuICAgICAgICAgICAgaXRlbTogdGhpcy5pdGVtLFxuICAgICAgICAgICAgZXhwYW5kZWQ6IHRoaXMub3V0bGluZUZvci5zdGF0ZS5pc0V4cGFuZGVkKHRoaXMuaXRlbSlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hY3Rpb24uZW1pdChwYXlsb2FkKTtcbiAgICAgICAgdGhpcy5vdXRsaW5lRm9yLm9uRXhwYW5kQ2hhbmdlLmVtaXQocGF5bG9hZCk7XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0ICgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLm91dGxpbmVGb3Iuc3RhdGUuc2VsZWN0ZWRJdGVtID0gdGhpcy5pdGVtO1xuICAgICAgICB0aGlzLm91dGxpbmVGb3Iub25JdGVtU2VsZWN0ZWQuZW1pdCh0aGlzLml0ZW0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZUNvbnRyb2wgKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMub3V0bGluZUZvcikgJiYgaXNQcmVzZW50KHRoaXMub3V0bGluZVN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy5vdXRsaW5lRm9yID0gdGhpcy5vdXRsaW5lU3RhdGUub3V0bGluZUZvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQodGhpcy5vdXRsaW5lRm9yKSwgJ01pc3Npbmcgb3V0bGluZUZvciBjb21wb25lbnQnKTtcbiAgICAgICAgaWYgKHRoaXMub3V0bGluZUZvci5lbWJlZGRlZCkge1xuICAgICAgICAgICAgbGV0IGxldmVsID0gdGhpcy5vdXRsaW5lRm9yLnN0YXRlLmN1cnJlbnRMZXZlbDtcbiAgICAgICAgICAgIGlmICh0aGlzLm91dGxpbmVGb3IucHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lICYmIGxldmVsID4gMCkge1xuICAgICAgICAgICAgICAgIGxldmVsIC09IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaW5kZW50YXRpb24gPSAodGhpcy5vdXRsaW5lRm9yLmluZGVudGF0aW9uUGVyTGV2ZWwgKiBsZXZlbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pdGVtID0gdGhpcy5vdXRsaW5lRm9yLmN1cnJlbnRJdGVtO1xuICAgICAgICB0aGlzLmlzUm9vdEl0ZW0gPSBpc0JsYW5rKHRoaXMuaXRlbS4kJHBhcmVudEl0ZW0pO1xuICAgIH1cblxufVxuIl19