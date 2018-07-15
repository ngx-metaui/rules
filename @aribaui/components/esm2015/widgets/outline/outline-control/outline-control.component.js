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
        this.allowEdit = false;
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
     <span class="outline-content outline-content-selected" *ngIf="!allowEdit && isSelected()">
        <ng-container *ngTemplateOutlet="ngContent"></ng-container>
    </span>
    <span class="outline-content" *ngIf="!allowEdit && !isSelected()" (click)="select()">
        <ng-container *ngTemplateOutlet="ngContent"></ng-container>
    </span>

</ng-template>


<ng-template #withoutSelection>
    <span *ngIf="!allowEdit" class="outline-content" (click)="toggleExpansion($event)">
        <ng-container *ngTemplateOutlet="ngContent"></ng-container>
    </span>
    <span *ngIf="allowEdit" class="outline-content">
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
    allowEdit: [{ type: Input }],
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL291dGxpbmUvb3V0bGluZS1jb250cm9sL291dGxpbmUtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFFBQVEsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdHOUMsTUFBTSw4QkFBK0IsU0FBUSxhQUFhOzs7Ozs7O0lBNkN0RCxZQUFtQixHQUFnQixFQUVmLFlBQTBCLEVBRTFCLGFBQXNDLEVBRXZDLFVBQStCO1FBRTlDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQVJJLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFFZixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUUxQixrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUFFdkMsZUFBVSxHQUFWLFVBQVUsQ0FBcUI7Ozs7Ozs7OEJBbEN4QixLQUFLO3lCQUdWLEtBQUs7Ozs7OztzQkFRRSxJQUFJLFlBQVksRUFBRTswQkFleEIsS0FBSztLQVkxQjs7OztJQUVELFFBQVE7UUFFSixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLGNB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ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBTa2lwU2VsZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7YXNzZXJ0LCBFbnZpcm9ubWVudCwgaXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQge091dGxpbmVGb3JDb21wb25lbnR9IGZyb20gJy4uL291dGxpbmUtZm9yLmNvbXBvbmVudCc7XG5pbXBvcnQge091dGxpbmVTdGF0ZX0gZnJvbSAnLi4vb3V0bGluZS1zdGF0ZSc7XG5cblxuLyoqXG4gKiBPdXRsaW5lQ29udHJvbENvbXBvbmVudCByZW5kZXJzIHRoZSBpbmRlbnRhdGlvbiwgYXJyb3csIGFuZCB0ZXh0IGZvciBhIG5vZGUgaW4gYW4gb3V0bGluZS5cbiAqIEl0IHNob3VsZCBiZSB1c2VkIGVpdGhlciBpbiB0aGUgYm9keSBvZiBhbiBPdXRsaW5lRm9yIGNvbXBvbmVudCwgb3IgaW5zaWRlIGRhdGF0YWJsZVxuICpcbiAqXG4gKiAjI1VzYWdlIGluc2lkZSBib2R5OlxuICpcbiAqICBIZXJlIHlvdSBjYW4gc2VlIHRoYXQgd2UgbmVlZCB0byB3cmFwIG91dCBjb250ZW50IGluc2lkZSBuZy10ZW1wbGF0ZSB3aGljaCB3aWxsIHB1c2ggdXNcbiAqICBnaXZlIHVzIGN1cnJlbnQgaXRlbSBpdGVtIGFuZCB0aGVuIHdlIGNhbiBwbGFjZSBPdXRsaW5lQ29udHJvbENvbXBvbmVudCB0byBjb250cm9sXG4gKiAgdGhlIHRyZWUuXG4gKlxuICogYGBgXG4gKiAgPGF3LW91dGxpbmUtZm9yMiAjb29vIFtsaXN0XT1cImxpc3RcIiBbaGFzQ2hpbGRyZW5dPVwiaGFzQ2hpbGRyZW5cIj5cbiAqXG4gKiAgICAgIDxuZy10ZW1wbGF0ZSAjb3V0bGluZSBsZXQtaXRlbT5cbiAqICAgICAgICAgIDxkaXYgY2xhc3M9XCJteS1zZWN0aW9uXCI+XG4gKiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm91dGxpbmVcIj5cbiAqICAgICAgICAgICAgICAgICAgPGF3LW91dGxpbmUtY29udHJvbD5cbiAqICAgICAgICAgICAgICAgICAgICAgIHt7aXRlbT8uY29udGVudH19XG4gKiAgICAgICAgICAgICAgICAgIDwvYXctb3V0bGluZS1jb250cm9sPlxuICogICAgICAgICAgICAgIDwvZGl2PipcbiAqICAgICAgICAgIDwvZGl2PlxuICogICAgICA8L25nLXRlbXBsYXRlPlxuICogIDwvYXctb3V0bGluZS1mb3IyPlxuICpcbiAqXG4gKiBgYGBcbiAqXG4gKiBXZSBjYW5cbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LW91dGxpbmUtY29udHJvbCcsXG4gICAgdGVtcGxhdGU6IGA8IS0tXG4gICAgQ29udHJvbCBpcyBqdXN0IHRoZSB0d28gZmxleCBib3ggaXRlbXMgZm9yIGRpc3BsYXlpbmcgZXhwYW5kL2NvbGxhcHNlIGljb24gYW5kIGNvbnRlbnRcblxuICAgIFNpbmNlIHdlIGFuaW1hdGUgb25seSBzdGFuZGFsb25lL25vbi1lbWJlZGRlZCBjYXNlIG5vdyB0aGVuIHdlIG5lZWQgdG8gYWxzbyBhbmltYXRlIHRoZSBpY29uXG4gICAgc28gd2UgdXNlIG9ubHkgaWNvbi1zbGltLWFycm93LXJpZ2h0IGFuZCBkbyB0cmFuZm9ybWF0aW9uIG9uIHRvcCBvZiB0aGlzIHRvIG1ha2UgaXQgcm90YXRlLlxuXG4gICAgSWYgZW1iZWRkZWQgY2FzZSB3ZSB1c2UgYm90aCBpY29ucyBpY29uLXNsaW0tYXJyb3ctcmlnaHQgLyBpY29uLXNsaW0tYXJyb3ctZG93blxuLS0+XG48ZGl2IGNsYXNzPVwidy1vdXRsaW5lLWNvbnRyb2xcIlxuICAgICBbbmdDbGFzc109XCJ7J291dGxpbmUtdS11bnNlbGVjdGFibGUtdGV4dCc6IG91dGxpbmVGb3IucHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lICYmICFpdGVtLiQkcGFyZW50SXRlbX1cIj5cbiAgICA8ZGl2IGNsYXNzPVwib3V0bGluZS1pY29uIHNhcC1pY29uXCJcbiAgICAgICAgICpuZ0lmPVwiIW91dGxpbmVGb3IucHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lIHx8ICFpc1Jvb3RJdGVtXCJcbiAgICAgICAgIChjbGljayk9XCJ0b2dnbGVFeHBhbnNpb24oJGV2ZW50KVwiXG4gICAgICAgICBbc3R5bGUubWFyZ2luLWxlZnQucHhdPVwiaW5kZW50YXRpb25cIlxuICAgICAgICAgW25nQ2xhc3NdPVwiY2FsY3VsYXRlU3R5bGVDbGFzcygpXCI+XG4gICAgPC9kaXY+XG5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYWxsb3dTZWxlY3Rpb247IHRoZW4gd2l0aFNlbGVjdGlvbiBlbHNlIHdpdGhvdXRTZWxlY3Rpb25cIj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuXG48IS0tXG4gV2Ugc3VwcG9ydCB0d28gY2FzZSBmb3IgdGhlIGNvbnRlbnRcblxuIFNlbGVjdGlvbjogV2hlbiB5b3UgY2xpY2sgb24gdGhlIGNvbnRlbnQgaXQgd2lsbCBhZGQgZXh0cmEgY2xhc3Mgc28geW91IGNhbiBzdHlsZSBjdXJyZW50bHlcbiBzZWxlY3RlZCBpdGVtIGFzIHdlbGwgYXMgYnJvYWRjYXN0IGV2ZW50IG91dHNpZGUgc28gZGV2ZWxvcGVyIGNhbiBob29rIGluIHNvbWUgY3VzdG9tIGxvZ2ljXG5cbiBJZiB3ZSBkb250IHN1cHBvcnQgc2VsZWN0aW9uOiBUaGVuIGNsaWNraW5nIG9uIHRoZSBjb250ZW50IGlzIGp1c3QgbGlrZSBjbGlja2luZyBvbiBleHBhbmRhYmxlXG4gaWNvbiwgaXQgdG9nZ2xlcyB0aGUgc3RhdGVcbi0tPlxuXG48bmctdGVtcGxhdGUgI3dpdGhTZWxlY3Rpb24+XG4gICAgIDxzcGFuIGNsYXNzPVwib3V0bGluZS1jb250ZW50IG91dGxpbmUtY29udGVudC1zZWxlY3RlZFwiICpuZ0lmPVwiIWFsbG93RWRpdCAmJiBpc1NlbGVjdGVkKClcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm5nQ29udGVudFwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cIm91dGxpbmUtY29udGVudFwiICpuZ0lmPVwiIWFsbG93RWRpdCAmJiAhaXNTZWxlY3RlZCgpXCIgKGNsaWNrKT1cInNlbGVjdCgpXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJuZ0NvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L3NwYW4+XG5cbjwvbmctdGVtcGxhdGU+XG5cblxuPG5nLXRlbXBsYXRlICN3aXRob3V0U2VsZWN0aW9uPlxuICAgIDxzcGFuICpuZ0lmPVwiIWFsbG93RWRpdFwiIGNsYXNzPVwib3V0bGluZS1jb250ZW50XCIgKGNsaWNrKT1cInRvZ2dsZUV4cGFuc2lvbigkZXZlbnQpXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJuZ0NvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW4gKm5nSWY9XCJhbGxvd0VkaXRcIiBjbGFzcz1cIm91dGxpbmUtY29udGVudFwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibmdDb250ZW50XCI+PC9uZy1jb250YWluZXI+XG4gICAgPC9zcGFuPlxuPC9uZy10ZW1wbGF0ZT5cblxuXG48bmctdGVtcGxhdGUgI25nQ29udGVudD5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L25nLXRlbXBsYXRlPlxuXG5gLFxuICAgIHN0eWxlczogW2Audy1vdXRsaW5lLWNvbnRyb2x7b3ZlcmZsb3c6aGlkZGVuO2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6bm93cmFwO2N1cnNvcjpwb2ludGVyfS53LW91dGxpbmUtY29udHJvbCAub3V0bGluZS1pY29ue2ZsZXg6MCAwIDE1cHg7Y29sb3I6I2FiYWJhYjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo3MDA7bWluLXdpZHRoOjExcHg7YWxpZ24tc2VsZjpjZW50ZXI7dHJhbnNpdGlvbjotd2Via2l0LXRyYW5zZm9ybSA1MG1zIGVhc2UtaW47dHJhbnNpdGlvbjp0cmFuc2Zvcm0gNTBtcyBlYXNlLWluO3RyYW5zaXRpb246dHJhbnNmb3JtIDUwbXMgZWFzZS1pbiwtd2Via2l0LXRyYW5zZm9ybSA1MG1zIGVhc2UtaW47LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjI1JSA2NSU7dHJhbnNmb3JtLW9yaWdpbjoyNSUgNjUlOy13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOnByZXNlcnZlLTNkO3RyYW5zZm9ybS1zdHlsZTpwcmVzZXJ2ZS0zZH0udy1vdXRsaW5lLWNvbnRyb2wgLm91dGxpbmUtaWNvbi5vdXRsaW5lLWljb24tZXhwYW5kZWR7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDkwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDkwZGVnKX0udy1vdXRsaW5lLWNvbnRyb2wgLm91dGxpbmUtY29udGVudHtmbGV4OjEgMSBhdXRvO2ZsZXgtd3JhcDp3cmFwO3BhZGRpbmc6MCA0cHh9Lnctb3V0bGluZS1jb250cm9sIC5vdXRsaW5lLWNvbnRlbnQub3V0bGluZS1jb250ZW50LXNlbGVjdGVke2N1cnNvcjpkZWZhdWx0O2ZvbnQtd2VpZ2h0OjcwMH0ub3V0bGluZS11LXVuc2VsZWN0YWJsZS10ZXh0ey13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW8tdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO2N1cnNvcjphdXRvfWBdLFxufSlcbmV4cG9ydCBjbGFzcyBPdXRsaW5lQ29udHJvbENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgaXRlbXMgdGhhdCBuZWVkcyB0byBiZSByZW5kZXJlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHRpdGxlOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogIElmIFRSVUUgaXQgY2hhbmdlcyB0aGUgYmVoYXZpb3Igb2YgdGhlIG91dGxpbmUgbm9kZSB0ZXh0IHdoaWNoIGNsaWNrIGlzIHRyaWdnZXJlZFxuICAgICAqICBpdCBzZWxlY3RzIHRoZSBpdGVtIGFuZCBicm9hZGNhc3QgdGhlIGBvbkl0ZW1TZWxlY3RlZGAgZXZlbnRcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYWxsb3dTZWxlY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgYWxsb3dFZGl0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRyaWdnZXJzIGFjdGlvbiB3aGVuIG91dGxpbmUgaXRlbSBpcyBleHBhbmRlZFxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgYWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgaXRlbSB1c2VkIGZvciB0aGlzIGBPdXRsaW5lQ29udHJvbGBcbiAgICAgKlxuICAgICAqL1xuICAgIGl0ZW06IGFueTtcblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZWQgaW5kZW50YXRpb24gdXNlZCB0byBzaGlmdCB0aGUgbmVzdGVkIHNlY3Rpb24gdG8gdGhlIGxlZnQuIFRoaXMgaXMgdXNlZCBmb3JcbiAgICAgKiBlbWJlZGRlZCBtb2RlIGUuZy4gdHJlZSB0YWJsZSB3aGVyZSB3ZSBjYW5ub3QgaW5kZW50IHBhcmVudFxuICAgICAqL1xuICAgIGluZGVudGF0aW9uOiBudW1iZXI7XG5cblxuICAgIGlzUm9vdEl0ZW06IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBPdXRsaW5lU3RhdGUpKVxuICAgICAgICAgICAgICAgIHByaXZhdGUgb3V0bGluZVN0YXRlOiBPdXRsaW5lU3RhdGUsXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE91dGxpbmVDb250cm9sQ29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcml2YXRlIHBhcmVudENvbnRyb2w6IE91dGxpbmVDb250cm9sQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBPdXRsaW5lRm9yQ29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3V0bGluZUZvcjogT3V0bGluZUZvckNvbXBvbmVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgICAgIHRoaXMucHJlcGFyZUNvbnRyb2woKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2UgZG9udCBzaG93IGV4cGFuc2lvbiBpY29ucyB3aGVuIHRoZXJlIG5vIGNoaWxkcmVuXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNFeHBhbnNpb25Db250cm9sKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLm91dGxpbmVGb3IuaGFzQ2hpbGRyZW4odGhpcy5pdGVtKSAmJiB0aGlzLm91dGxpbmVGb3Iuc2hvd0V4cGFuc2lvbkNvbnRyb2w7XG4gICAgfVxuXG5cbiAgICBpc1NlbGVjdGVkKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLm91dGxpbmVGb3Iuc3RhdGUuc2VsZWN0ZWRJdGVtID09PSB0aGlzLml0ZW07XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlU3R5bGVDbGFzcygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGlmICghdGhpcy5oYXNFeHBhbnNpb25Db250cm9sKCkgfHxcbiAgICAgICAgICAgICh0aGlzLm91dGxpbmVGb3IucHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lICYmIGlzQmxhbmsodGhpcy5pdGVtLiQkcGFyZW50SXRlbSkpKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vdXRsaW5lRm9yLmVtYmVkZGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vdXRsaW5lRm9yLmlzRXhwYW5kZWQodGhpcy5pdGVtKSA/ICdpY29uLXNsaW0tYXJyb3ctZG93bidcbiAgICAgICAgICAgICAgICA6ICdpY29uLXNsaW0tYXJyb3ctcmlnaHQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3V0bGluZUZvci5pc0V4cGFuZGVkKHRoaXMuaXRlbSlcbiAgICAgICAgICAgICAgICA/ICdpY29uLXNsaW0tYXJyb3ctcmlnaHQgb3V0bGluZS1pY29uLWV4cGFuZGVkJyA6ICdpY29uLXNsaW0tYXJyb3ctcmlnaHQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29sbGFwc2VzIGFuZCBleHBhbmRzIGN1cnJlbnQgbm9kZVxuICAgICAqXG4gICAgICovXG4gICAgdG9nZ2xlRXhwYW5zaW9uKGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLm91dGxpbmVGb3Iuc3RhdGUuY3VycmVudFBhdGggPSBbXTtcbiAgICAgICAgbGV0IGN1cnJlbnRQYXRoID0gdGhpcy5pdGVtO1xuXG4gICAgICAgIHdoaWxlIChpc1ByZXNlbnQoY3VycmVudFBhdGgpKSB7XG4gICAgICAgICAgICB0aGlzLm91dGxpbmVGb3Iuc3RhdGUuY3VycmVudFBhdGgudW5zaGlmdChjdXJyZW50UGF0aCk7XG4gICAgICAgICAgICBjdXJyZW50UGF0aCA9IGN1cnJlbnRQYXRoLiQkcGFyZW50SXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3V0bGluZUZvci50b2dnbGVFeHBhbnNpb24oKTtcbiAgICAgICAgbGV0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW0sXG4gICAgICAgICAgICBleHBhbmRlZDogdGhpcy5vdXRsaW5lRm9yLnN0YXRlLmlzRXhwYW5kZWQodGhpcy5pdGVtKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFjdGlvbi5lbWl0KHBheWxvYWQpO1xuICAgICAgICB0aGlzLm91dGxpbmVGb3Iub25FeHBhbmRDaGFuZ2UuZW1pdChwYXlsb2FkKTtcblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5vdXRsaW5lRm9yLnN0YXRlLnNlbGVjdGVkSXRlbSA9IHRoaXMuaXRlbTtcbiAgICAgICAgdGhpcy5vdXRsaW5lRm9yLm9uSXRlbVNlbGVjdGVkLmVtaXQodGhpcy5pdGVtKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVDb250cm9sKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMub3V0bGluZUZvcikgJiYgaXNQcmVzZW50KHRoaXMub3V0bGluZVN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy5vdXRsaW5lRm9yID0gdGhpcy5vdXRsaW5lU3RhdGUub3V0bGluZUZvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQodGhpcy5vdXRsaW5lRm9yKSwgJ01pc3Npbmcgb3V0bGluZUZvciBjb21wb25lbnQnKTtcbiAgICAgICAgaWYgKHRoaXMub3V0bGluZUZvci5lbWJlZGRlZCkge1xuICAgICAgICAgICAgbGV0IGxldmVsID0gdGhpcy5vdXRsaW5lRm9yLnN0YXRlLmN1cnJlbnRMZXZlbDtcbiAgICAgICAgICAgIGlmICh0aGlzLm91dGxpbmVGb3IucHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lICYmIGxldmVsID4gMCkge1xuICAgICAgICAgICAgICAgIGxldmVsIC09IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaW5kZW50YXRpb24gPSAodGhpcy5vdXRsaW5lRm9yLmluZGVudGF0aW9uUGVyTGV2ZWwgKiBsZXZlbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pdGVtID0gdGhpcy5vdXRsaW5lRm9yLmN1cnJlbnRJdGVtO1xuICAgICAgICB0aGlzLmlzUm9vdEl0ZW0gPSBpc0JsYW5rKHRoaXMuaXRlbS4kJHBhcmVudEl0ZW0pO1xuICAgIH1cblxufVxuIl19