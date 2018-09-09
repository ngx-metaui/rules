/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
 *
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
        /** @type {?} */
        let currentPath = this.item;
        while (isPresent(currentPath)) {
            this.outlineFor.state.currentPath.unshift(currentPath);
            currentPath = currentPath.$$parentItem;
        }
        this.outlineFor.toggleExpansion();
        /** @type {?} */
        let payload = {
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
            /** @type {?} */
            let level = this.outlineFor.state.currentLevel;
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
                template: "<!--\n    Control is just the two flex box items for displaying expand/collapse icon and content\n\n    Since we animate only standalone/non-embedded case now then we need to also animate the icon\n    so we use only icon-slim-arrow-right and do tranformation on top of this to make it rotate.\n\n    If embedded case we use both icons icon-slim-arrow-right / icon-slim-arrow-down\n-->\n<div class=\"w-outline-control\"\n     [ngClass]=\"{'outline-u-unselectable-text': outlineFor.pushRootSectionOnNewLine && !item.$$parentItem}\">\n    <div class=\"outline-icon sap-icon\"\n         *ngIf=\"!outlineFor.pushRootSectionOnNewLine || !isRootItem\"\n         (click)=\"toggleExpansion($event)\"\n         [style.margin-left.px]=\"indentation\"\n         [ngClass]=\"calculateStyleClass()\">\n    </div>\n\n    <ng-container *ngIf=\"allowSelection; then withSelection else withoutSelection\">\n    </ng-container>\n</div>\n\n<!--\n We support two case for the content\n\n Selection: When you click on the content it will add extra class so you can style currently\n selected item as well as broadcast event outside so developer can hook in some custom logic\n\n If we dont support selection: Then clicking on the content is just like clicking on expandable\n icon, it toggles the state\n-->\n\n<ng-template #withSelection>\n     <span class=\"outline-content outline-content-selected\" *ngIf=\"!allowEdit && isSelected()\">\n        <ng-container *ngTemplateOutlet=\"ngContent\"></ng-container>\n    </span>\n    <span class=\"outline-content\" *ngIf=\"!allowEdit && !isSelected()\" (click)=\"select()\">\n        <ng-container *ngTemplateOutlet=\"ngContent\"></ng-container>\n    </span>\n\n</ng-template>\n\n\n<ng-template #withoutSelection>\n    <span *ngIf=\"!allowEdit\" class=\"outline-content\" (click)=\"toggleExpansion($event)\">\n        <ng-container *ngTemplateOutlet=\"ngContent\"></ng-container>\n    </span>\n    <span *ngIf=\"allowEdit\" class=\"outline-content\">\n        <ng-container *ngTemplateOutlet=\"ngContent\"></ng-container>\n    </span>\n</ng-template>\n\n\n<ng-template #ngContent>\n    <ng-content></ng-content>\n</ng-template>\n\n",
                styles: [".w-outline-control{overflow:hidden;display:flex;flex-wrap:nowrap;cursor:pointer}.w-outline-control .outline-icon{flex:0 0 15px;color:#ababab;font-size:14px;font-weight:700;min-width:11px;-ms-grid-row-align:center;align-self:center;transition:transform 50ms ease-in;transition:transform 50ms ease-in,-webkit-transform 50ms ease-in;-webkit-transform-origin:25% 65%;transform-origin:25% 65%;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.w-outline-control .outline-icon.outline-icon-expanded{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.w-outline-control .outline-content{flex:1 1 auto;flex-wrap:wrap;padding:0 4px}.w-outline-control .outline-content.outline-content-selected{cursor:default;font-weight:700}.outline-u-unselectable-text{-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;-ms-user-select:none;user-select:none;cursor:auto}"]
            }] }
];
/** @nocollapse */
OutlineControlComponent.ctorParameters = () => [
    { type: Environment },
    { type: OutlineState, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(() => OutlineState),] }] },
    { type: OutlineControlComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => OutlineControlComponent),] }] },
    { type: OutlineForComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => OutlineForComponent),] }] }
];
OutlineControlComponent.propDecorators = {
    allowSelection: [{ type: Input }],
    allowEdit: [{ type: Input }],
    action: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL291dGxpbmUvb3V0bGluZS1jb250cm9sL291dGxpbmUtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFFBQVEsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdDOUMsTUFBTSw4QkFBK0IsU0FBUSxhQUFhOzs7Ozs7O0lBc0N0RCxZQUFtQixHQUFnQixFQUVmLFlBQTBCLEVBRTFCLGFBQXNDLEVBRXZDLFVBQStCO1FBRTlDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQVJJLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFFZixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUUxQixrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUFFdkMsZUFBVSxHQUFWLFVBQVUsQ0FBcUI7Ozs7Ozs7OEJBbEN4QixLQUFLO3lCQUdWLEtBQUs7Ozs7OztzQkFRRSxJQUFJLFlBQVksRUFBRTswQkFleEIsS0FBSztLQVkxQjs7OztJQUVELFFBQVE7UUFFSixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLGNB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QVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOztZQUMzQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7WUFDL0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEQsS0FBSyxJQUFJLENBQUMsQ0FBQzthQUNkO1lBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDcEU7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Ozs7WUEvSXpELFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5Qix5bkVBQTZDOzthQUVoRDs7OztZQTFDZSxXQUFXO1lBR25CLFlBQVksdUJBK0VILFFBQVEsWUFBSSxNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQztZQUczQix1QkFBdUIsdUJBRDdDLFFBQVEsWUFBSSxRQUFRLFlBQUksTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztZQWxGakYsbUJBQW1CLHVCQW9GVixRQUFRLFlBQUksUUFBUSxZQUFJLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7Ozs2QkFsQ2hGLEtBQUs7d0JBR0wsS0FBSztxQkFRTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFNraXBTZWxmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHthc3NlcnQsIEVudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7T3V0bGluZUZvckNvbXBvbmVudH0gZnJvbSAnLi4vb3V0bGluZS1mb3IuY29tcG9uZW50JztcbmltcG9ydCB7T3V0bGluZVN0YXRlfSBmcm9tICcuLi9vdXRsaW5lLXN0YXRlJztcblxuXG4vKipcbiAqIE91dGxpbmVDb250cm9sQ29tcG9uZW50IHJlbmRlcnMgdGhlIGluZGVudGF0aW9uLCBhcnJvdywgYW5kIHRleHQgZm9yIGEgbm9kZSBpbiBhbiBvdXRsaW5lLlxuICogSXQgc2hvdWxkIGJlIHVzZWQgZWl0aGVyIGluIHRoZSBib2R5IG9mIGFuIE91dGxpbmVGb3IgY29tcG9uZW50LCBvciBpbnNpZGUgZGF0YXRhYmxlXG4gKlxuICpcbiAqICMjVXNhZ2UgaW5zaWRlIGJvZHk6XG4gKlxuICogIEhlcmUgeW91IGNhbiBzZWUgdGhhdCB3ZSBuZWVkIHRvIHdyYXAgb3V0IGNvbnRlbnQgaW5zaWRlIG5nLXRlbXBsYXRlIHdoaWNoIHdpbGwgcHVzaCB1c1xuICogIGdpdmUgdXMgY3VycmVudCBpdGVtIGl0ZW0gYW5kIHRoZW4gd2UgY2FuIHBsYWNlIE91dGxpbmVDb250cm9sQ29tcG9uZW50IHRvIGNvbnRyb2xcbiAqICB0aGUgdHJlZS5cbiAqXG4gKiBgYGBcbiAqICA8YXctb3V0bGluZS1mb3IyICNvb28gW2xpc3RdPVwibGlzdFwiIFtoYXNDaGlsZHJlbl09XCJoYXNDaGlsZHJlblwiPlxuICpcbiAqICAgICAgPG5nLXRlbXBsYXRlICNvdXRsaW5lIGxldC1pdGVtPlxuICogICAgICAgICAgPGRpdiBjbGFzcz1cIm15LXNlY3Rpb25cIj5cbiAqICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3V0bGluZVwiPlxuICogICAgICAgICAgICAgICAgICA8YXctb3V0bGluZS1jb250cm9sPlxuICogICAgICAgICAgICAgICAgICAgICAge3tpdGVtPy5jb250ZW50fX1cbiAqICAgICAgICAgICAgICAgICAgPC9hdy1vdXRsaW5lLWNvbnRyb2w+XG4gKiAgICAgICAgICAgICAgPC9kaXY+KlxuICogICAgICAgICAgPC9kaXY+XG4gKiAgICAgIDwvbmctdGVtcGxhdGU+XG4gKiAgPC9hdy1vdXRsaW5lLWZvcjI+XG4gKlxuICpcbiAqIGBgYFxuICpcbiAqXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1vdXRsaW5lLWNvbnRyb2wnLFxuICAgIHRlbXBsYXRlVXJsOiAnb3V0bGluZS1jb250cm9sLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnb3V0bGluZS1jb250cm9sLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE91dGxpbmVDb250cm9sQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiAgSWYgVFJVRSBpdCBjaGFuZ2VzIHRoZSBiZWhhdmlvciBvZiB0aGUgb3V0bGluZSBub2RlIHRleHQgd2hpY2ggY2xpY2sgaXMgdHJpZ2dlcmVkXG4gICAgICogIGl0IHNlbGVjdHMgdGhlIGl0ZW0gYW5kIGJyb2FkY2FzdCB0aGUgYG9uSXRlbVNlbGVjdGVkYCBldmVudFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBhbGxvd1NlbGVjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBhbGxvd0VkaXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVHJpZ2dlcnMgYWN0aW9uIHdoZW4gb3V0bGluZSBpdGVtIGlzIGV4cGFuZGVkXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBhY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBpdGVtIHVzZWQgZm9yIHRoaXMgYE91dGxpbmVDb250cm9sYFxuICAgICAqXG4gICAgICovXG4gICAgaXRlbTogYW55O1xuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlZCBpbmRlbnRhdGlvbiB1c2VkIHRvIHNoaWZ0IHRoZSBuZXN0ZWQgc2VjdGlvbiB0byB0aGUgbGVmdC4gVGhpcyBpcyB1c2VkIGZvclxuICAgICAqIGVtYmVkZGVkIG1vZGUgZS5nLiB0cmVlIHRhYmxlIHdoZXJlIHdlIGNhbm5vdCBpbmRlbnQgcGFyZW50XG4gICAgICovXG4gICAgaW5kZW50YXRpb246IG51bWJlcjtcblxuXG4gICAgaXNSb290SXRlbTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE91dGxpbmVTdGF0ZSkpXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBvdXRsaW5lU3RhdGU6IE91dGxpbmVTdGF0ZSxcbiAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gT3V0bGluZUNvbnRyb2xDb21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHByaXZhdGUgcGFyZW50Q29udHJvbDogT3V0bGluZUNvbnRyb2xDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE91dGxpbmVGb3JDb21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdXRsaW5lRm9yOiBPdXRsaW5lRm9yQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgdGhpcy5wcmVwYXJlQ29udHJvbCgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXZSBkb250IHNob3cgZXhwYW5zaW9uIGljb25zIHdoZW4gdGhlcmUgbm8gY2hpbGRyZW5cbiAgICAgKlxuICAgICAqL1xuICAgIGhhc0V4cGFuc2lvbkNvbnRyb2woKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3V0bGluZUZvci5oYXNDaGlsZHJlbih0aGlzLml0ZW0pICYmIHRoaXMub3V0bGluZUZvci5zaG93RXhwYW5zaW9uQ29udHJvbDtcbiAgICB9XG5cblxuICAgIGlzU2VsZWN0ZWQoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3V0bGluZUZvci5zdGF0ZS5zZWxlY3RlZEl0ZW0gPT09IHRoaXMuaXRlbTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVTdHlsZUNsYXNzKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0V4cGFuc2lvbkNvbnRyb2woKSB8fFxuICAgICAgICAgICAgKHRoaXMub3V0bGluZUZvci5wdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmUgJiYgaXNCbGFuayh0aGlzLml0ZW0uJCRwYXJlbnRJdGVtKSkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm91dGxpbmVGb3IuZW1iZWRkZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm91dGxpbmVGb3IuaXNFeHBhbmRlZCh0aGlzLml0ZW0pID8gJ2ljb24tc2xpbS1hcnJvdy1kb3duJ1xuICAgICAgICAgICAgICAgIDogJ2ljb24tc2xpbS1hcnJvdy1yaWdodCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vdXRsaW5lRm9yLmlzRXhwYW5kZWQodGhpcy5pdGVtKVxuICAgICAgICAgICAgICAgID8gJ2ljb24tc2xpbS1hcnJvdy1yaWdodCBvdXRsaW5lLWljb24tZXhwYW5kZWQnIDogJ2ljb24tc2xpbS1hcnJvdy1yaWdodCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb2xsYXBzZXMgYW5kIGV4cGFuZHMgY3VycmVudCBub2RlXG4gICAgICpcbiAgICAgKi9cbiAgICB0b2dnbGVFeHBhbnNpb24oZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMub3V0bGluZUZvci5zdGF0ZS5jdXJyZW50UGF0aCA9IFtdO1xuICAgICAgICBsZXQgY3VycmVudFBhdGggPSB0aGlzLml0ZW07XG5cbiAgICAgICAgd2hpbGUgKGlzUHJlc2VudChjdXJyZW50UGF0aCkpIHtcbiAgICAgICAgICAgIHRoaXMub3V0bGluZUZvci5zdGF0ZS5jdXJyZW50UGF0aC51bnNoaWZ0KGN1cnJlbnRQYXRoKTtcbiAgICAgICAgICAgIGN1cnJlbnRQYXRoID0gY3VycmVudFBhdGguJCRwYXJlbnRJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vdXRsaW5lRm9yLnRvZ2dsZUV4cGFuc2lvbigpO1xuICAgICAgICBsZXQgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbSxcbiAgICAgICAgICAgIGV4cGFuZGVkOiB0aGlzLm91dGxpbmVGb3Iuc3RhdGUuaXNFeHBhbmRlZCh0aGlzLml0ZW0pXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWN0aW9uLmVtaXQocGF5bG9hZCk7XG4gICAgICAgIHRoaXMub3V0bGluZUZvci5vbkV4cGFuZENoYW5nZS5lbWl0KHBheWxvYWQpO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIHNlbGVjdCgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLm91dGxpbmVGb3Iuc3RhdGUuc2VsZWN0ZWRJdGVtID0gdGhpcy5pdGVtO1xuICAgICAgICB0aGlzLm91dGxpbmVGb3Iub25JdGVtU2VsZWN0ZWQuZW1pdCh0aGlzLml0ZW0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZUNvbnRyb2woKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5vdXRsaW5lRm9yKSAmJiBpc1ByZXNlbnQodGhpcy5vdXRsaW5lU3RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLm91dGxpbmVGb3IgPSB0aGlzLm91dGxpbmVTdGF0ZS5vdXRsaW5lRm9yO1xuICAgICAgICB9XG5cbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudCh0aGlzLm91dGxpbmVGb3IpLCAnTWlzc2luZyBvdXRsaW5lRm9yIGNvbXBvbmVudCcpO1xuICAgICAgICBpZiAodGhpcy5vdXRsaW5lRm9yLmVtYmVkZGVkKSB7XG4gICAgICAgICAgICBsZXQgbGV2ZWwgPSB0aGlzLm91dGxpbmVGb3Iuc3RhdGUuY3VycmVudExldmVsO1xuICAgICAgICAgICAgaWYgKHRoaXMub3V0bGluZUZvci5wdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmUgJiYgbGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV2ZWwgLT0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5pbmRlbnRhdGlvbiA9ICh0aGlzLm91dGxpbmVGb3IuaW5kZW50YXRpb25QZXJMZXZlbCAqIGxldmVsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLml0ZW0gPSB0aGlzLm91dGxpbmVGb3IuY3VycmVudEl0ZW07XG4gICAgICAgIHRoaXMuaXNSb290SXRlbSA9IGlzQmxhbmsodGhpcy5pdGVtLiQkcGFyZW50SXRlbSk7XG4gICAgfVxuXG59XG4iXX0=