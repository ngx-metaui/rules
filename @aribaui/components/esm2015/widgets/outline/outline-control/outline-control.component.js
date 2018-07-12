/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export class OutlineControlComponent extends BaseComponent {
    /**
     * @param {?} env
     * @param {?} outlineState
     * @param {?} parentControl
     * @param {?} outlineFor
     */
    constructor(env, outlineState, parentControl, outlineFor) {
        super(env);
        this.env = env;
        this.outlineState = outlineState;
        this.parentControl = parentControl;
        this.outlineFor = outlineFor;
        /**
         *
         *  If TRUE it changes the behavior of the outline node text which click is triggered
         *  it selects the item and broadcast the `onItemSelected` event
         *
         */
        this.allowSelection = false;
        /**
         *
         * Triggers action when outline item is expanded
         *
         */
        this.action = new EventEmitter();
        this.isRootItem = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.prepareControl();
    }
    /**
     *
     * We dont show expansion icons when there no children
     *
     * @return {?}
     */
    hasExpansionControl() {
        return this.outlineFor.hasChildren(this.item) && this.outlineFor.showExpansionControl;
    }
    /**
     * @return {?}
     */
    isSelected() {
        return this.outlineFor.state.selectedItem === this.item;
    }
    /**
     * @return {?}
     */
    calculateStyleClass() {
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
    }
    /**
     * Collapses and expands current node
     *
     * @param {?} event
     * @return {?}
     */
    toggleExpansion(event) {
        this.outlineFor.state.currentPath = [];
        let /** @type {?} */ currentPath = this.item;
        while (isPresent(currentPath)) {
            this.outlineFor.state.currentPath.unshift(currentPath);
            currentPath = currentPath.$$parentItem;
        }
        this.outlineFor.toggleExpansion();
        let /** @type {?} */ payload = {
            item: this.item,
            expanded: this.outlineFor.state.isExpanded(this.item)
        };
        this.action.emit(payload);
        this.outlineFor.onExpandChange.emit(payload);
        event.stopPropagation();
    }
    /**
     * @return {?}
     */
    select() {
        this.outlineFor.state.selectedItem = this.item;
        this.outlineFor.onItemSelected.emit(this.item);
    }
    /**
     * @return {?}
     */
    prepareControl() {
        if (isBlank(this.outlineFor) && isPresent(this.outlineState)) {
            this.outlineFor = this.outlineState.outlineFor;
        }
        assert(isPresent(this.outlineFor), 'Missing outlineFor component');
        if (this.outlineFor.embedded) {
            let /** @type {?} */ level = this.outlineFor.state.currentLevel;
            if (this.outlineFor.pushRootSectionOnNewLine && level > 0) {
                level -= 1;
            }
            this.indentation = (this.outlineFor.indentationPerLevel * level);
        }
        this.item = this.outlineFor.currentItem;
        this.isRootItem = isBlank(this.item.$$parentItem);
    }
}
OutlineControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-outline-control',
                template: `<!--
    Control is just the two flex box items for displaying expand/collapse icon and content

    Since we animate only standalone/non-embedded case now then we need to also animate the icon
    so we use only icon-slim-arrow-right and do tranformation on top of this to make it rotate.

    If embedded case we use both icons icon-slim-arrow-right / icon-slim-arrow-down
-->
<div class="w-outline-control"
     [ngClass]="{'outline-u-unselectable-text': outlineFor.pushRootSectionOnNewLine && !item.$$parentItem}">
    <div class="outline-icon sap-icon"
         *ngIf="!outlineFor.pushRootSectionOnNewLine || !isRootItem"
         (click)="toggleExpansion($event)"
         [style.margin-left.px]="indentation"
         [ngClass]="calculateStyleClass()">
    </div>

    <ng-container *ngIf="allowSelection; then withSelection else withoutSelection">
    </ng-container>
</div>

<!--
 We support two case for the content

 Selection: When you click on the content it will add extra class so you can style currently
 selected item as well as broadcast event outside so developer can hook in some custom logic

 If we dont support selection: Then clicking on the content is just like clicking on expandable
 icon, it toggles the state
-->

<ng-template #withSelection>
     <span class="outline-content outline-content-selected" *ngIf="isSelected()">
        <ng-container *ngTemplateOutlet="ngContent"></ng-container>
    </span>
    <span class="outline-content" *ngIf="!isSelected()" (click)="select()">
        <ng-container *ngTemplateOutlet="ngContent"></ng-container>
    </span>

</ng-template>


<ng-template #withoutSelection>
    <span class="outline-content" (click)="toggleExpansion($event)">
        <ng-container *ngTemplateOutlet="ngContent"></ng-container>
    </span>
</ng-template>


<ng-template #ngContent>
    <ng-content></ng-content>
</ng-template>

`,
                styles: [`.w-outline-control{overflow:hidden;display:flex;flex-wrap:nowrap;cursor:pointer}.w-outline-control .outline-icon{flex:0 0 15px;color:#ababab;font-size:14px;font-weight:700;min-width:11px;align-self:center;transition:-webkit-transform 50ms ease-in;transition:transform 50ms ease-in;transition:transform 50ms ease-in,-webkit-transform 50ms ease-in;-webkit-transform-origin:25% 65%;transform-origin:25% 65%;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.w-outline-control .outline-icon.outline-icon-expanded{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.w-outline-control .outline-content{flex:1 1 auto;flex-wrap:wrap;padding:0 4px}.w-outline-control .outline-content.outline-content-selected{cursor:default;font-weight:700}.outline-u-unselectable-text{-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;-ms-user-select:none;user-select:none;cursor:auto}`],
            },] },
];
/** @nocollapse */
OutlineControlComponent.ctorParameters = () => [
    { type: Environment },
    { type: OutlineState, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(() => OutlineState),] }] },
    { type: OutlineControlComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => OutlineControlComponent),] }] },
    { type: OutlineForComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => OutlineForComponent),] }] }
];
OutlineControlComponent.propDecorators = {
    title: [{ type: Input }],
    allowSelection: [{ type: Input }],
    action: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL291dGxpbmUvb3V0bGluZS1jb250cm9sL291dGxpbmUtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFFBQVEsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZGOUMsTUFBTSw4QkFBK0IsU0FBUSxhQUFhOzs7Ozs7O0lBMEN0RCxZQUFvQixHQUFnQixFQUVmLFlBQTBCLEVBRTFCLGFBQXNDLEVBRXZDLFVBQStCO1FBRS9DLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQVJLLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFFZixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUUxQixrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUFFdkMsZUFBVSxHQUFWLFVBQVUsQ0FBcUI7Ozs7Ozs7OEJBL0J6QixLQUFLOzs7Ozs7c0JBUUgsSUFBSSxZQUFZLEVBQUU7MEJBZXhCLEtBQUs7S0FZMUI7Ozs7SUFFRCxRQUFRO1FBRUosS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FB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c2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFNraXBTZWxmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHthc3NlcnQsIEVudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7T3V0bGluZUZvckNvbXBvbmVudH0gZnJvbSAnLi4vb3V0bGluZS1mb3IuY29tcG9uZW50JztcbmltcG9ydCB7T3V0bGluZVN0YXRlfSBmcm9tICcuLi9vdXRsaW5lLXN0YXRlJztcblxuXG4vKipcbiAqIE91dGxpbmVDb250cm9sQ29tcG9uZW50IHJlbmRlcnMgdGhlIGluZGVudGF0aW9uLCBhcnJvdywgYW5kIHRleHQgZm9yIGEgbm9kZSBpbiBhbiBvdXRsaW5lLlxuICogSXQgc2hvdWxkIGJlIHVzZWQgZWl0aGVyIGluIHRoZSBib2R5IG9mIGFuIE91dGxpbmVGb3IgY29tcG9uZW50LCBvciBpbnNpZGUgZGF0YXRhYmxlXG4gKlxuICpcbiAqICMjVXNhZ2UgaW5zaWRlIGJvZHk6XG4gKlxuICogIEhlcmUgeW91IGNhbiBzZWUgdGhhdCB3ZSBuZWVkIHRvIHdyYXAgb3V0IGNvbnRlbnQgaW5zaWRlIG5nLXRlbXBsYXRlIHdoaWNoIHdpbGwgcHVzaCB1c1xuICogIGdpdmUgdXMgY3VycmVudCBpdGVtIGl0ZW0gYW5kIHRoZW4gd2UgY2FuIHBsYWNlIE91dGxpbmVDb250cm9sQ29tcG9uZW50IHRvIGNvbnRyb2xcbiAqICB0aGUgdHJlZS5cbiAqXG4gKiBgYGBcbiAqICA8YXctb3V0bGluZS1mb3IyICNvb28gW2xpc3RdPVwibGlzdFwiIFtoYXNDaGlsZHJlbl09XCJoYXNDaGlsZHJlblwiPlxuICpcbiAqICAgICAgPG5nLXRlbXBsYXRlICNvdXRsaW5lIGxldC1pdGVtPlxuICogICAgICAgICAgPGRpdiBjbGFzcz1cIm15LXNlY3Rpb25cIj5cbiAqICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3V0bGluZVwiPlxuICogICAgICAgICAgICAgICAgICA8YXctb3V0bGluZS1jb250cm9sPlxuICogICAgICAgICAgICAgICAgICAgICAge3tpdGVtPy5jb250ZW50fX1cbiAqICAgICAgICAgICAgICAgICAgPC9hdy1vdXRsaW5lLWNvbnRyb2w+XG4gKiAgICAgICAgICAgICAgPC9kaXY+KlxuICogICAgICAgICAgPC9kaXY+XG4gKiAgICAgIDwvbmctdGVtcGxhdGU+XG4gKiAgPC9hdy1vdXRsaW5lLWZvcjI+XG4gKlxuICpcbiAqIGBgYFxuICpcbiAqIFdlIGNhblxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctb3V0bGluZS1jb250cm9sJyxcbiAgICB0ZW1wbGF0ZTogYDwhLS1cbiAgICBDb250cm9sIGlzIGp1c3QgdGhlIHR3byBmbGV4IGJveCBpdGVtcyBmb3IgZGlzcGxheWluZyBleHBhbmQvY29sbGFwc2UgaWNvbiBhbmQgY29udGVudFxuXG4gICAgU2luY2Ugd2UgYW5pbWF0ZSBvbmx5IHN0YW5kYWxvbmUvbm9uLWVtYmVkZGVkIGNhc2Ugbm93IHRoZW4gd2UgbmVlZCB0byBhbHNvIGFuaW1hdGUgdGhlIGljb25cbiAgICBzbyB3ZSB1c2Ugb25seSBpY29uLXNsaW0tYXJyb3ctcmlnaHQgYW5kIGRvIHRyYW5mb3JtYXRpb24gb24gdG9wIG9mIHRoaXMgdG8gbWFrZSBpdCByb3RhdGUuXG5cbiAgICBJZiBlbWJlZGRlZCBjYXNlIHdlIHVzZSBib3RoIGljb25zIGljb24tc2xpbS1hcnJvdy1yaWdodCAvIGljb24tc2xpbS1hcnJvdy1kb3duXG4tLT5cbjxkaXYgY2xhc3M9XCJ3LW91dGxpbmUtY29udHJvbFwiXG4gICAgIFtuZ0NsYXNzXT1cInsnb3V0bGluZS11LXVuc2VsZWN0YWJsZS10ZXh0Jzogb3V0bGluZUZvci5wdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmUgJiYgIWl0ZW0uJCRwYXJlbnRJdGVtfVwiPlxuICAgIDxkaXYgY2xhc3M9XCJvdXRsaW5lLWljb24gc2FwLWljb25cIlxuICAgICAgICAgKm5nSWY9XCIhb3V0bGluZUZvci5wdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmUgfHwgIWlzUm9vdEl0ZW1cIlxuICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUV4cGFuc2lvbigkZXZlbnQpXCJcbiAgICAgICAgIFtzdHlsZS5tYXJnaW4tbGVmdC5weF09XCJpbmRlbnRhdGlvblwiXG4gICAgICAgICBbbmdDbGFzc109XCJjYWxjdWxhdGVTdHlsZUNsYXNzKClcIj5cbiAgICA8L2Rpdj5cblxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJhbGxvd1NlbGVjdGlvbjsgdGhlbiB3aXRoU2VsZWN0aW9uIGVsc2Ugd2l0aG91dFNlbGVjdGlvblwiPlxuICAgIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG5cbjwhLS1cbiBXZSBzdXBwb3J0IHR3byBjYXNlIGZvciB0aGUgY29udGVudFxuXG4gU2VsZWN0aW9uOiBXaGVuIHlvdSBjbGljayBvbiB0aGUgY29udGVudCBpdCB3aWxsIGFkZCBleHRyYSBjbGFzcyBzbyB5b3UgY2FuIHN0eWxlIGN1cnJlbnRseVxuIHNlbGVjdGVkIGl0ZW0gYXMgd2VsbCBhcyBicm9hZGNhc3QgZXZlbnQgb3V0c2lkZSBzbyBkZXZlbG9wZXIgY2FuIGhvb2sgaW4gc29tZSBjdXN0b20gbG9naWNcblxuIElmIHdlIGRvbnQgc3VwcG9ydCBzZWxlY3Rpb246IFRoZW4gY2xpY2tpbmcgb24gdGhlIGNvbnRlbnQgaXMganVzdCBsaWtlIGNsaWNraW5nIG9uIGV4cGFuZGFibGVcbiBpY29uLCBpdCB0b2dnbGVzIHRoZSBzdGF0ZVxuLS0+XG5cbjxuZy10ZW1wbGF0ZSAjd2l0aFNlbGVjdGlvbj5cbiAgICAgPHNwYW4gY2xhc3M9XCJvdXRsaW5lLWNvbnRlbnQgb3V0bGluZS1jb250ZW50LXNlbGVjdGVkXCIgKm5nSWY9XCJpc1NlbGVjdGVkKClcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm5nQ29udGVudFwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cIm91dGxpbmUtY29udGVudFwiICpuZ0lmPVwiIWlzU2VsZWN0ZWQoKVwiIChjbGljayk9XCJzZWxlY3QoKVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibmdDb250ZW50XCI+PC9uZy1jb250YWluZXI+XG4gICAgPC9zcGFuPlxuXG48L25nLXRlbXBsYXRlPlxuXG5cbjxuZy10ZW1wbGF0ZSAjd2l0aG91dFNlbGVjdGlvbj5cbiAgICA8c3BhbiBjbGFzcz1cIm91dGxpbmUtY29udGVudFwiIChjbGljayk9XCJ0b2dnbGVFeHBhbnNpb24oJGV2ZW50KVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibmdDb250ZW50XCI+PC9uZy1jb250YWluZXI+XG4gICAgPC9zcGFuPlxuPC9uZy10ZW1wbGF0ZT5cblxuXG48bmctdGVtcGxhdGUgI25nQ29udGVudD5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L25nLXRlbXBsYXRlPlxuXG5gLFxuICAgIHN0eWxlczogW2Audy1vdXRsaW5lLWNvbnRyb2x7b3ZlcmZsb3c6aGlkZGVuO2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6bm93cmFwO2N1cnNvcjpwb2ludGVyfS53LW91dGxpbmUtY29udHJvbCAub3V0bGluZS1pY29ue2ZsZXg6MCAwIDE1cHg7Y29sb3I6I2FiYWJhYjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo3MDA7bWluLXdpZHRoOjExcHg7YWxpZ24tc2VsZjpjZW50ZXI7dHJhbnNpdGlvbjotd2Via2l0LXRyYW5zZm9ybSA1MG1zIGVhc2UtaW47dHJhbnNpdGlvbjp0cmFuc2Zvcm0gNTBtcyBlYXNlLWluO3RyYW5zaXRpb246dHJhbnNmb3JtIDUwbXMgZWFzZS1pbiwtd2Via2l0LXRyYW5zZm9ybSA1MG1zIGVhc2UtaW47LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjI1JSA2NSU7dHJhbnNmb3JtLW9yaWdpbjoyNSUgNjUlOy13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOnByZXNlcnZlLTNkO3RyYW5zZm9ybS1zdHlsZTpwcmVzZXJ2ZS0zZH0udy1vdXRsaW5lLWNvbnRyb2wgLm91dGxpbmUtaWNvbi5vdXRsaW5lLWljb24tZXhwYW5kZWR7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDkwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDkwZGVnKX0udy1vdXRsaW5lLWNvbnRyb2wgLm91dGxpbmUtY29udGVudHtmbGV4OjEgMSBhdXRvO2ZsZXgtd3JhcDp3cmFwO3BhZGRpbmc6MCA0cHh9Lnctb3V0bGluZS1jb250cm9sIC5vdXRsaW5lLWNvbnRlbnQub3V0bGluZS1jb250ZW50LXNlbGVjdGVke2N1cnNvcjpkZWZhdWx0O2ZvbnQtd2VpZ2h0OjcwMH0ub3V0bGluZS11LXVuc2VsZWN0YWJsZS10ZXh0ey13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW8tdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO2N1cnNvcjphdXRvfWBdLFxufSlcbmV4cG9ydCBjbGFzcyBPdXRsaW5lQ29udHJvbENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgaXRlbXMgdGhhdCBuZWVkcyB0byBiZSByZW5kZXJlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHRpdGxlOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogIElmIFRSVUUgaXQgY2hhbmdlcyB0aGUgYmVoYXZpb3Igb2YgdGhlIG91dGxpbmUgbm9kZSB0ZXh0IHdoaWNoIGNsaWNrIGlzIHRyaWdnZXJlZFxuICAgICAqICBpdCBzZWxlY3RzIHRoZSBpdGVtIGFuZCBicm9hZGNhc3QgdGhlIGBvbkl0ZW1TZWxlY3RlZGAgZXZlbnRcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYWxsb3dTZWxlY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVHJpZ2dlcnMgYWN0aW9uIHdoZW4gb3V0bGluZSBpdGVtIGlzIGV4cGFuZGVkXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBhY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBpdGVtIHVzZWQgZm9yIHRoaXMgYE91dGxpbmVDb250cm9sYFxuICAgICAqXG4gICAgICovXG4gICAgaXRlbTogYW55O1xuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlZCBpbmRlbnRhdGlvbiB1c2VkIHRvIHNoaWZ0IHRoZSBuZXN0ZWQgc2VjdGlvbiB0byB0aGUgbGVmdC4gVGhpcyBpcyB1c2VkIGZvclxuICAgICAqIGVtYmVkZGVkIG1vZGUgZS5nLiB0cmVlIHRhYmxlIHdoZXJlIHdlIGNhbm5vdCBpbmRlbnQgcGFyZW50XG4gICAgICovXG4gICAgaW5kZW50YXRpb246IG51bWJlcjtcblxuXG4gICAgaXNSb290SXRlbTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IgKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gT3V0bGluZVN0YXRlKSlcbiAgICAgICAgICAgICAgICAgcHJpdmF0ZSBvdXRsaW5lU3RhdGU6IE91dGxpbmVTdGF0ZSxcbiAgICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE91dGxpbmVDb250cm9sQ29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICAgcHJpdmF0ZSBwYXJlbnRDb250cm9sOiBPdXRsaW5lQ29udHJvbENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE91dGxpbmVGb3JDb21wb25lbnQpKVxuICAgICAgICAgICAgICAgICBwdWJsaWMgb3V0bGluZUZvcjogT3V0bGluZUZvckNvbXBvbmVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCAoKVxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICB0aGlzLnByZXBhcmVDb250cm9sKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdlIGRvbnQgc2hvdyBleHBhbnNpb24gaWNvbnMgd2hlbiB0aGVyZSBubyBjaGlsZHJlblxuICAgICAqXG4gICAgICovXG4gICAgaGFzRXhwYW5zaW9uQ29udHJvbCAoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3V0bGluZUZvci5oYXNDaGlsZHJlbih0aGlzLml0ZW0pICYmIHRoaXMub3V0bGluZUZvci5zaG93RXhwYW5zaW9uQ29udHJvbDtcbiAgICB9XG5cblxuICAgIGlzU2VsZWN0ZWQgKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLm91dGxpbmVGb3Iuc3RhdGUuc2VsZWN0ZWRJdGVtID09PSB0aGlzLml0ZW07XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlU3R5bGVDbGFzcyAoKTogc3RyaW5nXG4gICAge1xuICAgICAgICBpZiAoIXRoaXMuaGFzRXhwYW5zaW9uQ29udHJvbCgpIHx8XG4gICAgICAgICAgICAodGhpcy5vdXRsaW5lRm9yLnB1c2hSb290U2VjdGlvbk9uTmV3TGluZSAmJiBpc0JsYW5rKHRoaXMuaXRlbS4kJHBhcmVudEl0ZW0pKSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3V0bGluZUZvci5lbWJlZGRlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3V0bGluZUZvci5pc0V4cGFuZGVkKHRoaXMuaXRlbSkgPyAnaWNvbi1zbGltLWFycm93LWRvd24nXG4gICAgICAgICAgICAgICAgOiAnaWNvbi1zbGltLWFycm93LXJpZ2h0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm91dGxpbmVGb3IuaXNFeHBhbmRlZCh0aGlzLml0ZW0pXG4gICAgICAgICAgICAgICAgPyAnaWNvbi1zbGltLWFycm93LXJpZ2h0IG91dGxpbmUtaWNvbi1leHBhbmRlZCcgOiAnaWNvbi1zbGltLWFycm93LXJpZ2h0JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbGxhcHNlcyBhbmQgZXhwYW5kcyBjdXJyZW50IG5vZGVcbiAgICAgKlxuICAgICAqL1xuICAgIHRvZ2dsZUV4cGFuc2lvbiAoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMub3V0bGluZUZvci5zdGF0ZS5jdXJyZW50UGF0aCA9IFtdO1xuICAgICAgICBsZXQgY3VycmVudFBhdGggPSB0aGlzLml0ZW07XG5cbiAgICAgICAgd2hpbGUgKGlzUHJlc2VudChjdXJyZW50UGF0aCkpIHtcbiAgICAgICAgICAgIHRoaXMub3V0bGluZUZvci5zdGF0ZS5jdXJyZW50UGF0aC51bnNoaWZ0KGN1cnJlbnRQYXRoKTtcbiAgICAgICAgICAgIGN1cnJlbnRQYXRoID0gY3VycmVudFBhdGguJCRwYXJlbnRJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vdXRsaW5lRm9yLnRvZ2dsZUV4cGFuc2lvbigpO1xuICAgICAgICBsZXQgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbSxcbiAgICAgICAgICAgIGV4cGFuZGVkOiB0aGlzLm91dGxpbmVGb3Iuc3RhdGUuaXNFeHBhbmRlZCh0aGlzLml0ZW0pXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWN0aW9uLmVtaXQocGF5bG9hZCk7XG4gICAgICAgIHRoaXMub3V0bGluZUZvci5vbkV4cGFuZENoYW5nZS5lbWl0KHBheWxvYWQpO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIHNlbGVjdCAoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5vdXRsaW5lRm9yLnN0YXRlLnNlbGVjdGVkSXRlbSA9IHRoaXMuaXRlbTtcbiAgICAgICAgdGhpcy5vdXRsaW5lRm9yLm9uSXRlbVNlbGVjdGVkLmVtaXQodGhpcy5pdGVtKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVDb250cm9sICgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLm91dGxpbmVGb3IpICYmIGlzUHJlc2VudCh0aGlzLm91dGxpbmVTdGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMub3V0bGluZUZvciA9IHRoaXMub3V0bGluZVN0YXRlLm91dGxpbmVGb3I7XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KHRoaXMub3V0bGluZUZvciksICdNaXNzaW5nIG91dGxpbmVGb3IgY29tcG9uZW50Jyk7XG4gICAgICAgIGlmICh0aGlzLm91dGxpbmVGb3IuZW1iZWRkZWQpIHtcbiAgICAgICAgICAgIGxldCBsZXZlbCA9IHRoaXMub3V0bGluZUZvci5zdGF0ZS5jdXJyZW50TGV2ZWw7XG4gICAgICAgICAgICBpZiAodGhpcy5vdXRsaW5lRm9yLnB1c2hSb290U2VjdGlvbk9uTmV3TGluZSAmJiBsZXZlbCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXZlbCAtPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmluZGVudGF0aW9uID0gKHRoaXMub3V0bGluZUZvci5pbmRlbnRhdGlvblBlckxldmVsICogbGV2ZWwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXRlbSA9IHRoaXMub3V0bGluZUZvci5jdXJyZW50SXRlbTtcbiAgICAgICAgdGhpcy5pc1Jvb3RJdGVtID0gaXNCbGFuayh0aGlzLml0ZW0uJCRwYXJlbnRJdGVtKTtcbiAgICB9XG5cbn1cbiJdfQ==