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
                    template: "<!--\n    Control is just the two flex box items for displaying expand/collapse icon and content\n\n    Since we animate only standalone/non-embedded case now then we need to also animate the icon\n    so we use only icon-slim-arrow-right and do tranformation on top of this to make it rotate.\n\n    If embedded case we use both icons icon-slim-arrow-right / icon-slim-arrow-down\n-->\n<div class=\"w-outline-control\"\n     [ngClass]=\"{'outline-u-unselectable-text': outlineFor.pushRootSectionOnNewLine && !item.$$parentItem}\">\n    <div class=\"outline-icon sap-icon\"\n         *ngIf=\"!outlineFor.pushRootSectionOnNewLine || !isRootItem\"\n         (click)=\"toggleExpansion($event)\"\n         [style.margin-left.px]=\"indentation\"\n         [ngClass]=\"calculateStyleClass()\">\n    </div>\n\n    <ng-container *ngIf=\"allowSelection; then withSelection else withoutSelection\">\n    </ng-container>\n</div>\n\n<!--\n We support two case for the content\n\n Selection: When you click on the content it will add extra class so you can style currently\n selected item as well as broadcast event outside so developer can hook in some custom logic\n\n If we dont support selection: Then clicking on the content is just like clicking on expandable\n icon, it toggles the state\n-->\n\n<ng-template #withSelection>\n     <span class=\"outline-content outline-content-selected\" *ngIf=\"!allowEdit && isSelected()\">\n        <ng-container *ngTemplateOutlet=\"ngContent\"></ng-container>\n    </span>\n    <span class=\"outline-content\" *ngIf=\"!allowEdit && !isSelected()\" (click)=\"select()\">\n        <ng-container *ngTemplateOutlet=\"ngContent\"></ng-container>\n    </span>\n\n</ng-template>\n\n\n<ng-template #withoutSelection>\n    <span *ngIf=\"!allowEdit\" class=\"outline-content\" (click)=\"toggleExpansion($event)\">\n        <ng-container *ngTemplateOutlet=\"ngContent\"></ng-container>\n    </span>\n    <span *ngIf=\"allowEdit\" class=\"outline-content\">\n        <ng-container *ngTemplateOutlet=\"ngContent\"></ng-container>\n    </span>\n</ng-template>\n\n\n<ng-template #ngContent>\n    <ng-content></ng-content>\n</ng-template>\n\n",
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
        allowEdit: [{ type: Input }],
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL291dGxpbmUvb3V0bGluZS1jb250cm9sL291dGxpbmUtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFvQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixRQUFRLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDN0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZ0dELG1EQUFhO0lBNkN0RCxpQ0FBbUIsR0FBZ0IsRUFFZixZQUEwQixFQUUxQixhQUFzQyxFQUV2QyxVQUErQjtRQU5sRCxZQVFJLGtCQUFNLEdBQUcsQ0FBQyxTQUViO1FBVmtCLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFFZixrQkFBWSxHQUFaLFlBQVksQ0FBYztRQUUxQixtQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUFFdkMsZ0JBQVUsR0FBVixVQUFVLENBQXFCOzs7Ozs7OytCQWxDeEIsS0FBSzswQkFHVixLQUFLOzs7Ozs7dUJBUUUsSUFBSSxZQUFZLEVBQUU7MkJBZXhCLEtBQUs7O0tBWTFCOzs7O0lBRUQsMENBQVE7OztJQUFSO1FBRUksaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFD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NEJBR0wsS0FBSzt5QkFRTCxNQUFNOztrQ0E1Slg7RUFpSTZDLGFBQWE7U0FBN0MsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFNraXBTZWxmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHthc3NlcnQsIEVudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7T3V0bGluZUZvckNvbXBvbmVudH0gZnJvbSAnLi4vb3V0bGluZS1mb3IuY29tcG9uZW50JztcbmltcG9ydCB7T3V0bGluZVN0YXRlfSBmcm9tICcuLi9vdXRsaW5lLXN0YXRlJztcblxuXG4vKipcbiAqIE91dGxpbmVDb250cm9sQ29tcG9uZW50IHJlbmRlcnMgdGhlIGluZGVudGF0aW9uLCBhcnJvdywgYW5kIHRleHQgZm9yIGEgbm9kZSBpbiBhbiBvdXRsaW5lLlxuICogSXQgc2hvdWxkIGJlIHVzZWQgZWl0aGVyIGluIHRoZSBib2R5IG9mIGFuIE91dGxpbmVGb3IgY29tcG9uZW50LCBvciBpbnNpZGUgZGF0YXRhYmxlXG4gKlxuICpcbiAqICMjVXNhZ2UgaW5zaWRlIGJvZHk6XG4gKlxuICogIEhlcmUgeW91IGNhbiBzZWUgdGhhdCB3ZSBuZWVkIHRvIHdyYXAgb3V0IGNvbnRlbnQgaW5zaWRlIG5nLXRlbXBsYXRlIHdoaWNoIHdpbGwgcHVzaCB1c1xuICogIGdpdmUgdXMgY3VycmVudCBpdGVtIGl0ZW0gYW5kIHRoZW4gd2UgY2FuIHBsYWNlIE91dGxpbmVDb250cm9sQ29tcG9uZW50IHRvIGNvbnRyb2xcbiAqICB0aGUgdHJlZS5cbiAqXG4gKiBgYGBcbiAqICA8YXctb3V0bGluZS1mb3IyICNvb28gW2xpc3RdPVwibGlzdFwiIFtoYXNDaGlsZHJlbl09XCJoYXNDaGlsZHJlblwiPlxuICpcbiAqICAgICAgPG5nLXRlbXBsYXRlICNvdXRsaW5lIGxldC1pdGVtPlxuICogICAgICAgICAgPGRpdiBjbGFzcz1cIm15LXNlY3Rpb25cIj5cbiAqICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3V0bGluZVwiPlxuICogICAgICAgICAgICAgICAgICA8YXctb3V0bGluZS1jb250cm9sPlxuICogICAgICAgICAgICAgICAgICAgICAge3tpdGVtPy5jb250ZW50fX1cbiAqICAgICAgICAgICAgICAgICAgPC9hdy1vdXRsaW5lLWNvbnRyb2w+XG4gKiAgICAgICAgICAgICAgPC9kaXY+KlxuICogICAgICAgICAgPC9kaXY+XG4gKiAgICAgIDwvbmctdGVtcGxhdGU+XG4gKiAgPC9hdy1vdXRsaW5lLWZvcjI+XG4gKlxuICpcbiAqIGBgYFxuICpcbiAqIFdlIGNhblxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctb3V0bGluZS1jb250cm9sJyxcbiAgICB0ZW1wbGF0ZTogYDwhLS1cbiAgICBDb250cm9sIGlzIGp1c3QgdGhlIHR3byBmbGV4IGJveCBpdGVtcyBmb3IgZGlzcGxheWluZyBleHBhbmQvY29sbGFwc2UgaWNvbiBhbmQgY29udGVudFxuXG4gICAgU2luY2Ugd2UgYW5pbWF0ZSBvbmx5IHN0YW5kYWxvbmUvbm9uLWVtYmVkZGVkIGNhc2Ugbm93IHRoZW4gd2UgbmVlZCB0byBhbHNvIGFuaW1hdGUgdGhlIGljb25cbiAgICBzbyB3ZSB1c2Ugb25seSBpY29uLXNsaW0tYXJyb3ctcmlnaHQgYW5kIGRvIHRyYW5mb3JtYXRpb24gb24gdG9wIG9mIHRoaXMgdG8gbWFrZSBpdCByb3RhdGUuXG5cbiAgICBJZiBlbWJlZGRlZCBjYXNlIHdlIHVzZSBib3RoIGljb25zIGljb24tc2xpbS1hcnJvdy1yaWdodCAvIGljb24tc2xpbS1hcnJvdy1kb3duXG4tLT5cbjxkaXYgY2xhc3M9XCJ3LW91dGxpbmUtY29udHJvbFwiXG4gICAgIFtuZ0NsYXNzXT1cInsnb3V0bGluZS11LXVuc2VsZWN0YWJsZS10ZXh0Jzogb3V0bGluZUZvci5wdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmUgJiYgIWl0ZW0uJCRwYXJlbnRJdGVtfVwiPlxuICAgIDxkaXYgY2xhc3M9XCJvdXRsaW5lLWljb24gc2FwLWljb25cIlxuICAgICAgICAgKm5nSWY9XCIhb3V0bGluZUZvci5wdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmUgfHwgIWlzUm9vdEl0ZW1cIlxuICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUV4cGFuc2lvbigkZXZlbnQpXCJcbiAgICAgICAgIFtzdHlsZS5tYXJnaW4tbGVmdC5weF09XCJpbmRlbnRhdGlvblwiXG4gICAgICAgICBbbmdDbGFzc109XCJjYWxjdWxhdGVTdHlsZUNsYXNzKClcIj5cbiAgICA8L2Rpdj5cblxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJhbGxvd1NlbGVjdGlvbjsgdGhlbiB3aXRoU2VsZWN0aW9uIGVsc2Ugd2l0aG91dFNlbGVjdGlvblwiPlxuICAgIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG5cbjwhLS1cbiBXZSBzdXBwb3J0IHR3byBjYXNlIGZvciB0aGUgY29udGVudFxuXG4gU2VsZWN0aW9uOiBXaGVuIHlvdSBjbGljayBvbiB0aGUgY29udGVudCBpdCB3aWxsIGFkZCBleHRyYSBjbGFzcyBzbyB5b3UgY2FuIHN0eWxlIGN1cnJlbnRseVxuIHNlbGVjdGVkIGl0ZW0gYXMgd2VsbCBhcyBicm9hZGNhc3QgZXZlbnQgb3V0c2lkZSBzbyBkZXZlbG9wZXIgY2FuIGhvb2sgaW4gc29tZSBjdXN0b20gbG9naWNcblxuIElmIHdlIGRvbnQgc3VwcG9ydCBzZWxlY3Rpb246IFRoZW4gY2xpY2tpbmcgb24gdGhlIGNvbnRlbnQgaXMganVzdCBsaWtlIGNsaWNraW5nIG9uIGV4cGFuZGFibGVcbiBpY29uLCBpdCB0b2dnbGVzIHRoZSBzdGF0ZVxuLS0+XG5cbjxuZy10ZW1wbGF0ZSAjd2l0aFNlbGVjdGlvbj5cbiAgICAgPHNwYW4gY2xhc3M9XCJvdXRsaW5lLWNvbnRlbnQgb3V0bGluZS1jb250ZW50LXNlbGVjdGVkXCIgKm5nSWY9XCIhYWxsb3dFZGl0ICYmIGlzU2VsZWN0ZWQoKVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibmdDb250ZW50XCI+PC9uZy1jb250YWluZXI+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwib3V0bGluZS1jb250ZW50XCIgKm5nSWY9XCIhYWxsb3dFZGl0ICYmICFpc1NlbGVjdGVkKClcIiAoY2xpY2spPVwic2VsZWN0KClcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm5nQ29udGVudFwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvc3Bhbj5cblxuPC9uZy10ZW1wbGF0ZT5cblxuXG48bmctdGVtcGxhdGUgI3dpdGhvdXRTZWxlY3Rpb24+XG4gICAgPHNwYW4gKm5nSWY9XCIhYWxsb3dFZGl0XCIgY2xhc3M9XCJvdXRsaW5lLWNvbnRlbnRcIiAoY2xpY2spPVwidG9nZ2xlRXhwYW5zaW9uKCRldmVudClcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm5nQ29udGVudFwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvc3Bhbj5cbiAgICA8c3BhbiAqbmdJZj1cImFsbG93RWRpdFwiIGNsYXNzPVwib3V0bGluZS1jb250ZW50XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJuZ0NvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L3NwYW4+XG48L25nLXRlbXBsYXRlPlxuXG5cbjxuZy10ZW1wbGF0ZSAjbmdDb250ZW50PlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvbmctdGVtcGxhdGU+XG5cbmAsXG4gICAgc3R5bGVzOiBbYC53LW91dGxpbmUtY29udHJvbHtvdmVyZmxvdzpoaWRkZW47ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDpub3dyYXA7Y3Vyc29yOnBvaW50ZXJ9Lnctb3V0bGluZS1jb250cm9sIC5vdXRsaW5lLWljb257ZmxleDowIDAgMTVweDtjb2xvcjojYWJhYmFiO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjcwMDttaW4td2lkdGg6MTFweDthbGlnbi1zZWxmOmNlbnRlcjt0cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIDUwbXMgZWFzZS1pbjt0cmFuc2l0aW9uOnRyYW5zZm9ybSA1MG1zIGVhc2UtaW47dHJhbnNpdGlvbjp0cmFuc2Zvcm0gNTBtcyBlYXNlLWluLC13ZWJraXQtdHJhbnNmb3JtIDUwbXMgZWFzZS1pbjstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MjUlIDY1JTt0cmFuc2Zvcm0tb3JpZ2luOjI1JSA2NSU7LXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6cHJlc2VydmUtM2Q7dHJhbnNmb3JtLXN0eWxlOnByZXNlcnZlLTNkfS53LW91dGxpbmUtY29udHJvbCAub3V0bGluZS1pY29uLm91dGxpbmUtaWNvbi1leHBhbmRlZHstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoOTBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoOTBkZWcpfS53LW91dGxpbmUtY29udHJvbCAub3V0bGluZS1jb250ZW50e2ZsZXg6MSAxIGF1dG87ZmxleC13cmFwOndyYXA7cGFkZGluZzowIDRweH0udy1vdXRsaW5lLWNvbnRyb2wgLm91dGxpbmUtY29udGVudC5vdXRsaW5lLWNvbnRlbnQtc2VsZWN0ZWR7Y3Vyc29yOmRlZmF1bHQ7Zm9udC13ZWlnaHQ6NzAwfS5vdXRsaW5lLXUtdW5zZWxlY3RhYmxlLXRleHR7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstby11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7Y3Vyc29yOmF1dG99YF0sXG59KVxuZXhwb3J0IGNsYXNzIE91dGxpbmVDb250cm9sQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBpdGVtcyB0aGF0IG5lZWRzIHRvIGJlIHJlbmRlcmVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdGl0bGU6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiAgSWYgVFJVRSBpdCBjaGFuZ2VzIHRoZSBiZWhhdmlvciBvZiB0aGUgb3V0bGluZSBub2RlIHRleHQgd2hpY2ggY2xpY2sgaXMgdHJpZ2dlcmVkXG4gICAgICogIGl0IHNlbGVjdHMgdGhlIGl0ZW0gYW5kIGJyb2FkY2FzdCB0aGUgYG9uSXRlbVNlbGVjdGVkYCBldmVudFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBhbGxvd1NlbGVjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBhbGxvd0VkaXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVHJpZ2dlcnMgYWN0aW9uIHdoZW4gb3V0bGluZSBpdGVtIGlzIGV4cGFuZGVkXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBhY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBpdGVtIHVzZWQgZm9yIHRoaXMgYE91dGxpbmVDb250cm9sYFxuICAgICAqXG4gICAgICovXG4gICAgaXRlbTogYW55O1xuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlZCBpbmRlbnRhdGlvbiB1c2VkIHRvIHNoaWZ0IHRoZSBuZXN0ZWQgc2VjdGlvbiB0byB0aGUgbGVmdC4gVGhpcyBpcyB1c2VkIGZvclxuICAgICAqIGVtYmVkZGVkIG1vZGUgZS5nLiB0cmVlIHRhYmxlIHdoZXJlIHdlIGNhbm5vdCBpbmRlbnQgcGFyZW50XG4gICAgICovXG4gICAgaW5kZW50YXRpb246IG51bWJlcjtcblxuXG4gICAgaXNSb290SXRlbTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE91dGxpbmVTdGF0ZSkpXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBvdXRsaW5lU3RhdGU6IE91dGxpbmVTdGF0ZSxcbiAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gT3V0bGluZUNvbnRyb2xDb21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHByaXZhdGUgcGFyZW50Q29udHJvbDogT3V0bGluZUNvbnRyb2xDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE91dGxpbmVGb3JDb21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdXRsaW5lRm9yOiBPdXRsaW5lRm9yQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgdGhpcy5wcmVwYXJlQ29udHJvbCgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXZSBkb250IHNob3cgZXhwYW5zaW9uIGljb25zIHdoZW4gdGhlcmUgbm8gY2hpbGRyZW5cbiAgICAgKlxuICAgICAqL1xuICAgIGhhc0V4cGFuc2lvbkNvbnRyb2woKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3V0bGluZUZvci5oYXNDaGlsZHJlbih0aGlzLml0ZW0pICYmIHRoaXMub3V0bGluZUZvci5zaG93RXhwYW5zaW9uQ29udHJvbDtcbiAgICB9XG5cblxuICAgIGlzU2VsZWN0ZWQoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3V0bGluZUZvci5zdGF0ZS5zZWxlY3RlZEl0ZW0gPT09IHRoaXMuaXRlbTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVTdHlsZUNsYXNzKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0V4cGFuc2lvbkNvbnRyb2woKSB8fFxuICAgICAgICAgICAgKHRoaXMub3V0bGluZUZvci5wdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmUgJiYgaXNCbGFuayh0aGlzLml0ZW0uJCRwYXJlbnRJdGVtKSkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm91dGxpbmVGb3IuZW1iZWRkZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm91dGxpbmVGb3IuaXNFeHBhbmRlZCh0aGlzLml0ZW0pID8gJ2ljb24tc2xpbS1hcnJvdy1kb3duJ1xuICAgICAgICAgICAgICAgIDogJ2ljb24tc2xpbS1hcnJvdy1yaWdodCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vdXRsaW5lRm9yLmlzRXhwYW5kZWQodGhpcy5pdGVtKVxuICAgICAgICAgICAgICAgID8gJ2ljb24tc2xpbS1hcnJvdy1yaWdodCBvdXRsaW5lLWljb24tZXhwYW5kZWQnIDogJ2ljb24tc2xpbS1hcnJvdy1yaWdodCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb2xsYXBzZXMgYW5kIGV4cGFuZHMgY3VycmVudCBub2RlXG4gICAgICpcbiAgICAgKi9cbiAgICB0b2dnbGVFeHBhbnNpb24oZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMub3V0bGluZUZvci5zdGF0ZS5jdXJyZW50UGF0aCA9IFtdO1xuICAgICAgICBsZXQgY3VycmVudFBhdGggPSB0aGlzLml0ZW07XG5cbiAgICAgICAgd2hpbGUgKGlzUHJlc2VudChjdXJyZW50UGF0aCkpIHtcbiAgICAgICAgICAgIHRoaXMub3V0bGluZUZvci5zdGF0ZS5jdXJyZW50UGF0aC51bnNoaWZ0KGN1cnJlbnRQYXRoKTtcbiAgICAgICAgICAgIGN1cnJlbnRQYXRoID0gY3VycmVudFBhdGguJCRwYXJlbnRJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vdXRsaW5lRm9yLnRvZ2dsZUV4cGFuc2lvbigpO1xuICAgICAgICBsZXQgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbSxcbiAgICAgICAgICAgIGV4cGFuZGVkOiB0aGlzLm91dGxpbmVGb3Iuc3RhdGUuaXNFeHBhbmRlZCh0aGlzLml0ZW0pXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWN0aW9uLmVtaXQocGF5bG9hZCk7XG4gICAgICAgIHRoaXMub3V0bGluZUZvci5vbkV4cGFuZENoYW5nZS5lbWl0KHBheWxvYWQpO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIHNlbGVjdCgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLm91dGxpbmVGb3Iuc3RhdGUuc2VsZWN0ZWRJdGVtID0gdGhpcy5pdGVtO1xuICAgICAgICB0aGlzLm91dGxpbmVGb3Iub25JdGVtU2VsZWN0ZWQuZW1pdCh0aGlzLml0ZW0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZUNvbnRyb2woKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5vdXRsaW5lRm9yKSAmJiBpc1ByZXNlbnQodGhpcy5vdXRsaW5lU3RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLm91dGxpbmVGb3IgPSB0aGlzLm91dGxpbmVTdGF0ZS5vdXRsaW5lRm9yO1xuICAgICAgICB9XG5cbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudCh0aGlzLm91dGxpbmVGb3IpLCAnTWlzc2luZyBvdXRsaW5lRm9yIGNvbXBvbmVudCcpO1xuICAgICAgICBpZiAodGhpcy5vdXRsaW5lRm9yLmVtYmVkZGVkKSB7XG4gICAgICAgICAgICBsZXQgbGV2ZWwgPSB0aGlzLm91dGxpbmVGb3Iuc3RhdGUuY3VycmVudExldmVsO1xuICAgICAgICAgICAgaWYgKHRoaXMub3V0bGluZUZvci5wdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmUgJiYgbGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV2ZWwgLT0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5pbmRlbnRhdGlvbiA9ICh0aGlzLm91dGxpbmVGb3IuaW5kZW50YXRpb25QZXJMZXZlbCAqIGxldmVsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLml0ZW0gPSB0aGlzLm91dGxpbmVGb3IuY3VycmVudEl0ZW07XG4gICAgICAgIHRoaXMuaXNSb290SXRlbSA9IGlzQmxhbmsodGhpcy5pdGVtLiQkcGFyZW50SXRlbSk7XG4gICAgfVxuXG59XG4iXX0=