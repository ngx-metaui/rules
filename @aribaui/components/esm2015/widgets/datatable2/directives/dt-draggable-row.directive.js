/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 * @license
 * Copyright 2017 SAP Ariba
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 *
 */
import { Directive, ElementRef, forwardRef, Inject, Input, NgZone } from '@angular/core';
import { Datatable2Component } from '../datatable2.component';
import { DomUtilsService } from '../../../core/dom-utils.service';
import { isPresent } from '@aribaui/core';
import { DragDirection, DragEvents, DropPosition } from '../aw-datatable';
/**
 * Directive used inside DT in order to support table rows re-ordering. This manages all the
 * D&D necessary logic for this functionality.
 *
 * [dtDraggableRow] is used inside the `rowTemplate` like this:
 *
 *
 * ```html
 *
 * <ng-template #rowTemplate let-rowData let-even='event" let-odd="odd" let-rowIndex="rowIndex"
 *              let-nestingLevel="nestingLevel" let-colsToRender="colsToRender">
 *
 *     <tr #rowElement dtDraggableRow [dndRowIndex]="rowIndex"
 *          class="dt-body-row"
 *
 *
 *
 * ```
 *
 * which enabled or disables based on the used DT binding [dndRowEnabled]. By default its disabled.
 *
 *
 *
 */
export class DTDraggableRowDirective {
    /**
     * @param {?} element
     * @param {?} dt
     * @param {?} domUtils
     * @param {?} ngZone
     */
    constructor(element, dt, domUtils, ngZone) {
        this.element = element;
        this.dt = dt;
        this.domUtils = domUtils;
        this.ngZone = ngZone;
        /**
         *
         * Tells the directive if we enable middle row zone to create an effect that we are dropping
         * into the row. Used for outline DT mainly.
         *
         */
        this.dropIntoEnabled = false;
        /**
         * Current TR index number
         *
         */
        this.dndRowIndex = 0;
        /**
         * Holds information about our dragging direction UP and DOWN in order to assign correct style
         * that highlights the row at the top or bottom
         *
         */
        this.dragDir = DragDirection.None;
        /**
         * Indicates that we dragged our row and stopped in the middle of the other row
         *
         */
        this.inMiddle = false;
        /**
         *
         * Current drag Y coordinates which is used together with the dragDir when assinging dragging
         * direction.
         *
         */
        this.dragY = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.dt.dndRowEnabled) {
            this.setupEventListeners();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.dt.dndRowEnabled) {
            this.releaseEventListeners();
        }
    }
    /**
     * Setups listeners and returns handle to them so we can later on unsubscribe.
     * @return {?}
     */
    setupEventListeners() {
        this.ngZone.runOutsideAngular(() => {
            this.eventHandlers = {};
            this.eventHandlers['mousedown'] = this.onMouseDownEvent.bind(this);
            this.element.nativeElement.addEventListener('mousedown', this.eventHandlers['mousedown']);
            this.eventHandlers['dragstart'] = this.onDragStartEvent.bind(this);
            this.element.nativeElement.addEventListener('dragstart', this.eventHandlers['dragstart']);
            this.eventHandlers['dragover'] = this.onDragOverEvent.bind(this);
            this.element.nativeElement.addEventListener('dragover', this.eventHandlers['dragover']);
            this.eventHandlers['dragleave'] = this.onDragLeaveEvent.bind(this);
            this.element.nativeElement.addEventListener('dragleave', this.eventHandlers['dragleave']);
            this.eventHandlers['drop'] = this.onDropEvent.bind(this);
            this.element.nativeElement.addEventListener('drop', this.eventHandlers['drop']);
            this.eventHandlers['dragend'] = this.onDragEndEvent.bind(this);
            this.element.nativeElement.addEventListener('dragend', this.eventHandlers['dragend']);
        });
    }
    /**
     * Removes all the created listeners inside destroy() callback
     * @return {?}
     */
    releaseEventListeners() {
        DragEvents.forEach((name) => {
            document.removeEventListener('name', this.eventHandlers[name]);
        });
    }
    /**
     *
     * This is first event where we:
     *
     *  - Mark element draggable to enable D&D
     *  - Set click position relative to the middle of the current row
     *      This is mainly needed when we are trying to calculate something for
     *      dropInto row (outline)
     *
     * event.target usually contains reference to TD element
     * @param {?} event
     * @return {?}
     */
    onMouseDownEvent(event) {
        if (event.altKey && this.domUtils.hasParent(event.target, '.dt-row-draggable')) {
            this.element.nativeElement.draggable = true;
            let /** @type {?} */ elToBeDragged = this.domUtils.elementDimensions(event.target);
            this.dt.env.setValue('ddClickDeviance', (elToBeDragged.height / 2) - event.offsetY);
        }
        else {
            this.element.nativeElement.draggable = false;
        }
    }
    /**
     * This is second triggered event when the actual dragging starts. Here we need to disable
     * dragged row and save information that are common to a table.
     *
     * Marking row disabled with the style .dt-row-dragging using setTimeout is needed as
     * if we would go without it then D&D framework would create a copy of row in disabled state.
     * Now we grab a row with active state and after a 200ms delay we disable the original row.
     *
     * @param {?} event
     * @return {?}
     */
    onDragStartEvent(event) {
        setTimeout(() => {
            if (isPresent(event.target.classList)) {
                event.target.classList.add('dt-row-dragging');
            }
        }, 200);
        this.dt.env.setValue('isDragging', true);
        this.dt.env.setValue('dndId', this.dndRowIndex);
        event.dataTransfer.setData('text', this.dndRowIndex);
    }
    /**
     *
     * This events happens anytime as we drag over rows. This event triggered after certain
     * delay. In here we calculate the mouse movement to identify if we are going UP or DOWN.
     *
     * This is mainly needed to mark a row with the correct line on TOP or BOTTOM to visually
     * show a user where we are.
     *
     * Once we know the direction and the drop target is valid we mark the row with correct class
     * that does the trick
     * @param {?} event
     * @return {?}
     */
    onDragOverEvent(event) {
        event.dataTransfer.dropEffect = 'move';
        if (this.dragY < event.pageY) {
            this.dragDir = DragDirection.Down;
        }
        else if (this.dragY > event.pageY) {
            this.dragDir = DragDirection.Up;
        }
        // dont set again unless its different
        if (this.dragY !== event.pageY) {
            this.dragY = event.pageY;
        }
        if (this.isValidDropTarget(event)) {
            // todo test this preventDefault() so it does not create some sideeffect
            event.preventDefault();
            this.markRowWithClass(event, this.domUtils.closest(event.target, 'tr'));
        }
    }
    /**
     * This is finishing event just before D&D is done. It takes current information and
     * broadcast them to the DT so DT can do necessary row reordering
     *
     *
     * @param {?} event
     * @return {?}
     */
    onDropEvent(event) {
        this.clearClasses(event.target.parentElement);
        // event.preventDefault();
        let /** @type {?} */ origIndx = this.dt.env.getValue('dndId');
        let /** @type {?} */ dropPos = this.inMiddle ? DropPosition.Into : (this.dragDir === DragDirection.Up ? DropPosition.Before : DropPosition.After);
        this.dt.onDnDRowDrop(origIndx, this.dndRowIndex, dropPos);
        this.inMiddle = false;
        this.dragY = 0;
    }
    /**
     * Every time we drag over the element we apply some classes to the it. this method does the
     * opposite which is to remove everything so we are ready for the next row
     *
     *
     * @param {?} event
     * @return {?}
     */
    onDragLeaveEvent(event) {
        let /** @type {?} */ tr = this.domUtils.closest(event.target, 'tr');
        this.clearClasses(tr);
        this.dt.env.deleteValue('dndOnHoldIndex');
    }
    /**
     *
     * This is last event within D&D flow. Mainly used to clean up all the resource that has not
     * been clean up already inside onDropEvent.
     *
     * @param {?} event
     * @return {?}
     */
    onDragEndEvent(event) {
        if (isPresent(event.target.classList)) {
            event.target.classList.remove('dt-row-dragging');
        }
        this.clearClasses(event.target);
        this.element.nativeElement.draggable = false;
        this.dt.env.deleteValue('isDragging');
        this.dt.env.deleteValue('dndId');
        this.dt.env.deleteValue('ddClickDeviance');
    }
    /**
     * Assign CSS classes to the row to create an highlighting effect to capture current position
     * for the user.
     *
     * Based on the Drag direction we either apply
     * css class that creates a line on top or bottom.  Only for the dropInto functionality we
     * need to calculate some more to identify if we are really in the middle of the row.
     *
     * DropInto:
     * ---------
     *
     * Initially we captured a position (in mousedown) the distance to the middle of the row and
     * this we are using here with some threshold of 2 pixes so we dont have to be exactly on pixel
     * perfect.
     *
     * - let currentTrCenter = this.domUtils.elementDimensions(activeRow).height / 2;
     *      Read center of current row
     *
     * - let draggedTrCenter = event.offsetY + this.dt.env.getValue('ddClickDeviance');
     *      Read mouse coordinates relative to current row/td and add to it our deviation.
     *
     *
     * @param {?} event
     * @param {?} activeRow
     * @return {?}
     */
    markRowWithClass(event, activeRow) {
        this.clearClasses(activeRow);
        // Check if drag item is in the middle of other row
        let /** @type {?} */ currentTrCenter = this.domUtils.elementDimensions(activeRow).height / 2;
        let /** @type {?} */ draggedTrCenter = event.offsetY + this.dt.env.getValue('ddClickDeviance');
        if (this.dropIntoEnabled) {
            this.inMiddle = Math.abs(currentTrCenter - draggedTrCenter) < 2;
        }
        if (this.inMiddle) {
            activeRow.classList.add(DragDirection.Middle);
        }
        else {
            activeRow.classList.add(this.dragDir);
        }
    }
    /**
     *
     * Drop target must be only another TR and it cannot be the element itself the one we are
     * dragging and it does not make sense to allow to drop to the same position we started from
     *
     * @param {?} event
     * @return {?}
     */
    isValidDropTarget(event) {
        let /** @type {?} */ origInx = this.dt.env.getValue('dndId');
        let /** @type {?} */ siblingRow = this.dndRowIndex - origInx;
        return event.target.parentElement.tagName === 'TR' && this.dndRowIndex !== origInx &&
            !(siblingRow === 1 && this.dragDir === DragDirection.Up) &&
            !(siblingRow === -1 && this.dragDir === DragDirection.Down);
    }
    /**
     *  private
     *
     * @param {?} tr
     * @return {?}
     */
    clearClasses(tr) {
        tr.classList.remove('dt-drag-row-top');
        tr.classList.remove('dt-drag-row-bottom');
        tr.classList.remove('dt-drag-row-both');
    }
    /**
     *  private
     *
     * @return {?}
     */
    dragDirToString() {
        switch (this.dragDir) {
            case DragDirection.Up:
                return 'Up';
            case DragDirection.Down:
                return 'Down';
            default:
                return 'Not Sure';
        }
    }
}
DTDraggableRowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[dtDraggableRow]'
            },] },
];
/** @nocollapse */
DTDraggableRowDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Datatable2Component, decorators: [{ type: Inject, args: [forwardRef(() => Datatable2Component),] }] },
    { type: DomUtilsService },
    { type: NgZone }
];
DTDraggableRowDirective.propDecorators = {
    dropIntoEnabled: [{ type: Input }],
    dndRowIndex: [{ type: Input }]
};
function DTDraggableRowDirective_tsickle_Closure_declarations() {
    /**
     *
     * Tells the directive if we enable middle row zone to create an effect that we are dropping
     * into the row. Used for outline DT mainly.
     *
     * @type {?}
     */
    DTDraggableRowDirective.prototype.dropIntoEnabled;
    /**
     * Current TR index number
     *
     * @type {?}
     */
    DTDraggableRowDirective.prototype.dndRowIndex;
    /**
     * Holds information about our dragging direction UP and DOWN in order to assign correct style
     * that highlights the row at the top or bottom
     *
     * @type {?}
     */
    DTDraggableRowDirective.prototype.dragDir;
    /**
     * Indicates that we dragged our row and stopped in the middle of the other row
     *
     * @type {?}
     */
    DTDraggableRowDirective.prototype.inMiddle;
    /**
     *
     * Current drag Y coordinates which is used together with the dragDir when assinging dragging
     * direction.
     *
     * @type {?}
     */
    DTDraggableRowDirective.prototype.dragY;
    /**
     * listeners handlers here - the return from .bind(this).
     * @type {?}
     */
    DTDraggableRowDirective.prototype.eventHandlers;
    /** @type {?} */
    DTDraggableRowDirective.prototype.element;
    /** @type {?} */
    DTDraggableRowDirective.prototype.dt;
    /** @type {?} */
    DTDraggableRowDirective.prototype.domUtils;
    /** @type {?} */
    DTDraggableRowDirective.prototype.ngZone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtZHJhZ2dhYmxlLXJvdy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2RpcmVjdGl2ZXMvZHQtZHJhZ2dhYmxlLXJvdy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE9BQU8sRUFDSCxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFFM0QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4QnhFLE1BQU07Ozs7Ozs7SUE0Q0YsWUFBb0IsT0FBbUIsRUFFbkIsRUFBdUIsRUFDdkIsVUFDQTtRQUpBLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFFbkIsT0FBRSxHQUFGLEVBQUUsQ0FBcUI7UUFDdkIsYUFBUSxHQUFSLFFBQVE7UUFDUixXQUFNLEdBQU4sTUFBTTs7Ozs7OzsrQkF2Q0MsS0FBSzs7Ozs7MkJBT1YsQ0FBQzs7Ozs7O3VCQU9VLGFBQWEsQ0FBQyxJQUFJOzs7Ozt3QkFNdkIsS0FBSzs7Ozs7OztxQkFRVCxDQUFDO0tBWXhCOzs7O0lBR0QsUUFBUTtRQUNKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUM5QjtLQUNKOzs7O0lBR0QsV0FB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RUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN2QyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Ozs7Ozs7SUFPcEMsZUFBZTtRQUNuQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNuQixLQUFLLGFBQWEsQ0FBQyxFQUFFO2dCQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLEtBQUssYUFBYSxDQUFDLElBQUk7Z0JBQ25CLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEI7Z0JBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQztTQUN6Qjs7OztZQTdUUixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjthQUMvQjs7OztZQW5DYyxVQUFVO1lBR2pCLG1CQUFtQix1QkE4RVYsTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztZQTdFckQsZUFBZTtZQUorQixNQUFNOzs7OEJBNEN2RCxLQUFLOzBCQU9MLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE5nWm9uZSwgT25EZXN0cm95LFxuICAgIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGF0YXRhYmxlMkNvbXBvbmVudH0gZnJvbSAnLi4vZGF0YXRhYmxlMi5jb21wb25lbnQnO1xuaW1wb3J0IHtEb21VdGlsc1NlcnZpY2V9IGZyb20gJy4uLy4uLy4uL2NvcmUvZG9tLXV0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHtpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtEcmFnRGlyZWN0aW9uLCBEcmFnRXZlbnRzLCBEcm9wUG9zaXRpb259IGZyb20gJy4uL2F3LWRhdGF0YWJsZSc7XG5cblxuLyoqXG4gKiBEaXJlY3RpdmUgdXNlZCBpbnNpZGUgRFQgaW4gb3JkZXIgdG8gc3VwcG9ydCB0YWJsZSByb3dzIHJlLW9yZGVyaW5nLiBUaGlzIG1hbmFnZXMgYWxsIHRoZVxuICogRCZEIG5lY2Vzc2FyeSBsb2dpYyBmb3IgdGhpcyBmdW5jdGlvbmFsaXR5LlxuICpcbiAqIFtkdERyYWdnYWJsZVJvd10gaXMgdXNlZCBpbnNpZGUgdGhlIGByb3dUZW1wbGF0ZWAgbGlrZSB0aGlzOlxuICpcbiAqXG4gKiBgYGBodG1sXG4gKlxuICogPG5nLXRlbXBsYXRlICNyb3dUZW1wbGF0ZSBsZXQtcm93RGF0YSBsZXQtZXZlbj0nZXZlbnRcIiBsZXQtb2RkPVwib2RkXCIgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIlxuICogICAgICAgICAgICAgIGxldC1uZXN0aW5nTGV2ZWw9XCJuZXN0aW5nTGV2ZWxcIiBsZXQtY29sc1RvUmVuZGVyPVwiY29sc1RvUmVuZGVyXCI+XG4gKlxuICogICAgIDx0ciAjcm93RWxlbWVudCBkdERyYWdnYWJsZVJvdyBbZG5kUm93SW5kZXhdPVwicm93SW5kZXhcIlxuICogICAgICAgICAgY2xhc3M9XCJkdC1ib2R5LXJvd1wiXG4gKlxuICpcbiAqXG4gKiBgYGBcbiAqXG4gKiB3aGljaCBlbmFibGVkIG9yIGRpc2FibGVzIGJhc2VkIG9uIHRoZSB1c2VkIERUIGJpbmRpbmcgW2RuZFJvd0VuYWJsZWRdLiBCeSBkZWZhdWx0IGl0cyBkaXNhYmxlZC5cbiAqXG4gKlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbZHREcmFnZ2FibGVSb3ddJ1xufSlcbmV4cG9ydCBjbGFzcyBEVERyYWdnYWJsZVJvd0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVGVsbHMgdGhlIGRpcmVjdGl2ZSBpZiB3ZSBlbmFibGUgbWlkZGxlIHJvdyB6b25lIHRvIGNyZWF0ZSBhbiBlZmZlY3QgdGhhdCB3ZSBhcmUgZHJvcHBpbmdcbiAgICAgKiBpbnRvIHRoZSByb3cuIFVzZWQgZm9yIG91dGxpbmUgRFQgbWFpbmx5LlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkcm9wSW50b0VuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgVFIgaW5kZXggbnVtYmVyXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRuZFJvd0luZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogSG9sZHMgaW5mb3JtYXRpb24gYWJvdXQgb3VyIGRyYWdnaW5nIGRpcmVjdGlvbiBVUCBhbmQgRE9XTiBpbiBvcmRlciB0byBhc3NpZ24gY29ycmVjdCBzdHlsZVxuICAgICAqIHRoYXQgaGlnaGxpZ2h0cyB0aGUgcm93IGF0IHRoZSB0b3Agb3IgYm90dG9tXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGRyYWdEaXI6IERyYWdEaXJlY3Rpb24gPSBEcmFnRGlyZWN0aW9uLk5vbmU7XG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhhdCB3ZSBkcmFnZ2VkIG91ciByb3cgYW5kIHN0b3BwZWQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgb3RoZXIgcm93XG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGluTWlkZGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEN1cnJlbnQgZHJhZyBZIGNvb3JkaW5hdGVzIHdoaWNoIGlzIHVzZWQgdG9nZXRoZXIgd2l0aCB0aGUgZHJhZ0RpciB3aGVuIGFzc2luZ2luZyBkcmFnZ2luZ1xuICAgICAqIGRpcmVjdGlvbi5cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgZHJhZ1k6IG51bWJlciA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBsaXN0ZW5lcnMgaGFuZGxlcnMgaGVyZSAtIHRoZSByZXR1cm4gZnJvbSAuYmluZCh0aGlzKS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGV2ZW50SGFuZGxlcnM6IHsgW25hbWU6IHN0cmluZ106IGFueSB9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEYXRhdGFibGUyQ29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcml2YXRlIGR0OiBEYXRhdGFibGUyQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZG9tVXRpbHM6IERvbVV0aWxzU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZHQuZG5kUm93RW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kdC5kbmRSb3dFbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnJlbGVhc2VFdmVudExpc3RlbmVycygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0dXBzIGxpc3RlbmVycyBhbmQgcmV0dXJucyBoYW5kbGUgdG8gdGhlbSBzbyB3ZSBjYW4gbGF0ZXIgb24gdW5zdWJzY3JpYmUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXR1cEV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnMgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyc1snbW91c2Vkb3duJ10gPSB0aGlzLm9uTW91c2VEb3duRXZlbnQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzWydtb3VzZWRvd24nXSk7XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyc1snZHJhZ3N0YXJ0J10gPSB0aGlzLm9uRHJhZ1N0YXJ0RXZlbnQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzWydkcmFnc3RhcnQnXSk7XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyc1snZHJhZ292ZXInXSA9IHRoaXMub25EcmFnT3ZlckV2ZW50LmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzWydkcmFnb3ZlciddKTtcblxuICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzWydkcmFnbGVhdmUnXSA9IHRoaXMub25EcmFnTGVhdmVFdmVudC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJyxcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnNbJ2RyYWdsZWF2ZSddKTtcblxuICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzWydkcm9wJ10gPSB0aGlzLm9uRHJvcEV2ZW50LmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJyxcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnNbJ2Ryb3AnXSk7XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyc1snZHJhZ2VuZCddID0gdGhpcy5vbkRyYWdFbmRFdmVudC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzWydkcmFnZW5kJ10pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCB0aGUgY3JlYXRlZCBsaXN0ZW5lcnMgaW5zaWRlIGRlc3Ryb3koKSBjYWxsYmFja1xuICAgICAqL1xuICAgIHByaXZhdGUgcmVsZWFzZUV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICBEcmFnRXZlbnRzLmZvckVhY2goKG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbmFtZScsIHRoaXMuZXZlbnRIYW5kbGVyc1tuYW1lXSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIGZpcnN0IGV2ZW50IHdoZXJlIHdlOlxuICAgICAqXG4gICAgICogIC0gTWFyayBlbGVtZW50IGRyYWdnYWJsZSB0byBlbmFibGUgRCZEXG4gICAgICogIC0gU2V0IGNsaWNrIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZSBtaWRkbGUgb2YgdGhlIGN1cnJlbnQgcm93XG4gICAgICogICAgICBUaGlzIGlzIG1haW5seSBuZWVkZWQgd2hlbiB3ZSBhcmUgdHJ5aW5nIHRvIGNhbGN1bGF0ZSBzb21ldGhpbmcgZm9yXG4gICAgICogICAgICBkcm9wSW50byByb3cgKG91dGxpbmUpXG4gICAgICpcbiAgICAgKiBldmVudC50YXJnZXQgdXN1YWxseSBjb250YWlucyByZWZlcmVuY2UgdG8gVEQgZWxlbWVudFxuICAgICAqL1xuICAgIHByaXZhdGUgb25Nb3VzZURvd25FdmVudChldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGlmIChldmVudC5hbHRLZXkgJiYgdGhpcy5kb21VdGlscy5oYXNQYXJlbnQoZXZlbnQudGFyZ2V0LCAnLmR0LXJvdy1kcmFnZ2FibGUnKSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBlbFRvQmVEcmFnZ2VkID0gdGhpcy5kb21VdGlscy5lbGVtZW50RGltZW5zaW9ucyhldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgdGhpcy5kdC5lbnYuc2V0VmFsdWUoJ2RkQ2xpY2tEZXZpYW5jZScsIChlbFRvQmVEcmFnZ2VkLmhlaWdodCAvIDIpIC0gZXZlbnQub2Zmc2V0WSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmRyYWdnYWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHNlY29uZCB0cmlnZ2VyZWQgZXZlbnQgd2hlbiB0aGUgYWN0dWFsIGRyYWdnaW5nIHN0YXJ0cy4gSGVyZSB3ZSBuZWVkIHRvIGRpc2FibGVcbiAgICAgKiBkcmFnZ2VkIHJvdyBhbmQgc2F2ZSBpbmZvcm1hdGlvbiB0aGF0IGFyZSBjb21tb24gdG8gYSB0YWJsZS5cbiAgICAgKlxuICAgICAqIE1hcmtpbmcgcm93IGRpc2FibGVkIHdpdGggdGhlIHN0eWxlIC5kdC1yb3ctZHJhZ2dpbmcgdXNpbmcgc2V0VGltZW91dCBpcyBuZWVkZWQgYXNcbiAgICAgKiBpZiB3ZSB3b3VsZCBnbyB3aXRob3V0IGl0IHRoZW4gRCZEIGZyYW1ld29yayB3b3VsZCBjcmVhdGUgYSBjb3B5IG9mIHJvdyBpbiBkaXNhYmxlZCBzdGF0ZS5cbiAgICAgKiBOb3cgd2UgZ3JhYiBhIHJvdyB3aXRoIGFjdGl2ZSBzdGF0ZSBhbmQgYWZ0ZXIgYSAyMDBtcyBkZWxheSB3ZSBkaXNhYmxlIHRoZSBvcmlnaW5hbCByb3cuXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIG9uRHJhZ1N0YXJ0RXZlbnQoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdCkpIHtcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHQtcm93LWRyYWdnaW5nJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgdGhpcy5kdC5lbnYuc2V0VmFsdWUoJ2lzRHJhZ2dpbmcnLCB0cnVlKTtcbiAgICAgICAgdGhpcy5kdC5lbnYuc2V0VmFsdWUoJ2RuZElkJywgdGhpcy5kbmRSb3dJbmRleCk7XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgdGhpcy5kbmRSb3dJbmRleCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUaGlzIGV2ZW50cyBoYXBwZW5zIGFueXRpbWUgYXMgd2UgZHJhZyBvdmVyIHJvd3MuIFRoaXMgZXZlbnQgdHJpZ2dlcmVkIGFmdGVyIGNlcnRhaW5cbiAgICAgKiBkZWxheS4gSW4gaGVyZSB3ZSBjYWxjdWxhdGUgdGhlIG1vdXNlIG1vdmVtZW50IHRvIGlkZW50aWZ5IGlmIHdlIGFyZSBnb2luZyBVUCBvciBET1dOLlxuICAgICAqXG4gICAgICogVGhpcyBpcyBtYWlubHkgbmVlZGVkIHRvIG1hcmsgYSByb3cgd2l0aCB0aGUgY29ycmVjdCBsaW5lIG9uIFRPUCBvciBCT1RUT00gdG8gdmlzdWFsbHlcbiAgICAgKiBzaG93IGEgdXNlciB3aGVyZSB3ZSBhcmUuXG4gICAgICpcbiAgICAgKiBPbmNlIHdlIGtub3cgdGhlIGRpcmVjdGlvbiBhbmQgdGhlIGRyb3AgdGFyZ2V0IGlzIHZhbGlkIHdlIG1hcmsgdGhlIHJvdyB3aXRoIGNvcnJlY3QgY2xhc3NcbiAgICAgKiB0aGF0IGRvZXMgdGhlIHRyaWNrXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbkRyYWdPdmVyRXZlbnQoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgICAgICAgaWYgKHRoaXMuZHJhZ1kgPCBldmVudC5wYWdlWSkge1xuICAgICAgICAgICAgdGhpcy5kcmFnRGlyID0gRHJhZ0RpcmVjdGlvbi5Eb3duO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZHJhZ1kgPiBldmVudC5wYWdlWSkge1xuICAgICAgICAgICAgdGhpcy5kcmFnRGlyID0gRHJhZ0RpcmVjdGlvbi5VcDtcbiAgICAgICAgfVxuICAgICAgICAvLyBkb250IHNldCBhZ2FpbiB1bmxlc3MgaXRzIGRpZmZlcmVudFxuICAgICAgICBpZiAodGhpcy5kcmFnWSAhPT0gZXZlbnQucGFnZVkpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1kgPSBldmVudC5wYWdlWTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWREcm9wVGFyZ2V0KGV2ZW50KSkge1xuICAgICAgICAgICAgLy8gdG9kbyB0ZXN0IHRoaXMgcHJldmVudERlZmF1bHQoKSBzbyBpdCBkb2VzIG5vdCBjcmVhdGUgc29tZSBzaWRlZWZmZWN0XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5tYXJrUm93V2l0aENsYXNzKGV2ZW50LCB0aGlzLmRvbVV0aWxzLmNsb3Nlc3QoZXZlbnQudGFyZ2V0LCAndHInKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIGZpbmlzaGluZyBldmVudCBqdXN0IGJlZm9yZSBEJkQgaXMgZG9uZS4gSXQgdGFrZXMgY3VycmVudCBpbmZvcm1hdGlvbiBhbmRcbiAgICAgKiBicm9hZGNhc3QgdGhlbSB0byB0aGUgRFQgc28gRFQgY2FuIGRvIG5lY2Vzc2FyeSByb3cgcmVvcmRlcmluZ1xuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIG9uRHJvcEV2ZW50KGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbGVhckNsYXNzZXMoZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQpO1xuICAgICAgICAvLyBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBvcmlnSW5keCA9IHRoaXMuZHQuZW52LmdldFZhbHVlKCdkbmRJZCcpO1xuICAgICAgICBsZXQgZHJvcFBvczogRHJvcFBvc2l0aW9uID0gdGhpcy5pbk1pZGRsZSA/IERyb3BQb3NpdGlvbi5JbnRvIDogKFxuICAgICAgICAgICAgdGhpcy5kcmFnRGlyID09PSBEcmFnRGlyZWN0aW9uLlVwID8gRHJvcFBvc2l0aW9uLkJlZm9yZSA6IERyb3BQb3NpdGlvbi5BZnRlclxuICAgICAgICApO1xuICAgICAgICB0aGlzLmR0Lm9uRG5EUm93RHJvcChvcmlnSW5keCwgdGhpcy5kbmRSb3dJbmRleCwgZHJvcFBvcyk7XG5cbiAgICAgICAgdGhpcy5pbk1pZGRsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRyYWdZID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmVyeSB0aW1lIHdlIGRyYWcgb3ZlciB0aGUgZWxlbWVudCB3ZSBhcHBseSBzb21lIGNsYXNzZXMgdG8gdGhlIGl0LiB0aGlzIG1ldGhvZCBkb2VzIHRoZVxuICAgICAqIG9wcG9zaXRlIHdoaWNoIGlzIHRvIHJlbW92ZSBldmVyeXRoaW5nIHNvIHdlIGFyZSByZWFkeSBmb3IgdGhlIG5leHQgcm93XG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgb25EcmFnTGVhdmVFdmVudChldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCB0ciA9IHRoaXMuZG9tVXRpbHMuY2xvc2VzdChldmVudC50YXJnZXQsICd0cicpO1xuICAgICAgICB0aGlzLmNsZWFyQ2xhc3Nlcyh0cik7XG5cbiAgICAgICAgdGhpcy5kdC5lbnYuZGVsZXRlVmFsdWUoJ2RuZE9uSG9sZEluZGV4Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIGxhc3QgZXZlbnQgd2l0aGluIEQmRCBmbG93LiBNYWlubHkgdXNlZCB0byBjbGVhbiB1cCBhbGwgdGhlIHJlc291cmNlIHRoYXQgaGFzIG5vdFxuICAgICAqIGJlZW4gY2xlYW4gdXAgYWxyZWFkeSBpbnNpZGUgb25Ecm9wRXZlbnQuXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIG9uRHJhZ0VuZEV2ZW50KGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudChldmVudC50YXJnZXQuY2xhc3NMaXN0KSkge1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2R0LXJvdy1kcmFnZ2luZycpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbGVhckNsYXNzZXMoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHQuZW52LmRlbGV0ZVZhbHVlKCdpc0RyYWdnaW5nJyk7XG4gICAgICAgIHRoaXMuZHQuZW52LmRlbGV0ZVZhbHVlKCdkbmRJZCcpO1xuICAgICAgICB0aGlzLmR0LmVudi5kZWxldGVWYWx1ZSgnZGRDbGlja0RldmlhbmNlJyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBc3NpZ24gQ1NTIGNsYXNzZXMgdG8gdGhlIHJvdyB0byBjcmVhdGUgYW4gaGlnaGxpZ2h0aW5nIGVmZmVjdCB0byBjYXB0dXJlIGN1cnJlbnQgcG9zaXRpb25cbiAgICAgKiBmb3IgdGhlIHVzZXIuXG4gICAgICpcbiAgICAgKiBCYXNlZCBvbiB0aGUgRHJhZyBkaXJlY3Rpb24gd2UgZWl0aGVyIGFwcGx5XG4gICAgICogY3NzIGNsYXNzIHRoYXQgY3JlYXRlcyBhIGxpbmUgb24gdG9wIG9yIGJvdHRvbS4gIE9ubHkgZm9yIHRoZSBkcm9wSW50byBmdW5jdGlvbmFsaXR5IHdlXG4gICAgICogbmVlZCB0byBjYWxjdWxhdGUgc29tZSBtb3JlIHRvIGlkZW50aWZ5IGlmIHdlIGFyZSByZWFsbHkgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcm93LlxuICAgICAqXG4gICAgICogRHJvcEludG86XG4gICAgICogLS0tLS0tLS0tXG4gICAgICpcbiAgICAgKiBJbml0aWFsbHkgd2UgY2FwdHVyZWQgYSBwb3NpdGlvbiAoaW4gbW91c2Vkb3duKSB0aGUgZGlzdGFuY2UgdG8gdGhlIG1pZGRsZSBvZiB0aGUgcm93IGFuZFxuICAgICAqIHRoaXMgd2UgYXJlIHVzaW5nIGhlcmUgd2l0aCBzb21lIHRocmVzaG9sZCBvZiAyIHBpeGVzIHNvIHdlIGRvbnQgaGF2ZSB0byBiZSBleGFjdGx5IG9uIHBpeGVsXG4gICAgICogcGVyZmVjdC5cbiAgICAgKlxuICAgICAqIC0gbGV0IGN1cnJlbnRUckNlbnRlciA9IHRoaXMuZG9tVXRpbHMuZWxlbWVudERpbWVuc2lvbnMoYWN0aXZlUm93KS5oZWlnaHQgLyAyO1xuICAgICAqICAgICAgUmVhZCBjZW50ZXIgb2YgY3VycmVudCByb3dcbiAgICAgKlxuICAgICAqIC0gbGV0IGRyYWdnZWRUckNlbnRlciA9IGV2ZW50Lm9mZnNldFkgKyB0aGlzLmR0LmVudi5nZXRWYWx1ZSgnZGRDbGlja0RldmlhbmNlJyk7XG4gICAgICogICAgICBSZWFkIG1vdXNlIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIGN1cnJlbnQgcm93L3RkIGFuZCBhZGQgdG8gaXQgb3VyIGRldmlhdGlvbi5cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBtYXJrUm93V2l0aENsYXNzKGV2ZW50OiBhbnksIGFjdGl2ZVJvdzogYW55KTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5jbGVhckNsYXNzZXMoYWN0aXZlUm93KTtcblxuICAgICAgICAvLyBDaGVjayBpZiBkcmFnIGl0ZW0gaXMgaW4gdGhlIG1pZGRsZSBvZiBvdGhlciByb3dcbiAgICAgICAgbGV0IGN1cnJlbnRUckNlbnRlciA9IHRoaXMuZG9tVXRpbHMuZWxlbWVudERpbWVuc2lvbnMoYWN0aXZlUm93KS5oZWlnaHQgLyAyO1xuICAgICAgICBsZXQgZHJhZ2dlZFRyQ2VudGVyID0gZXZlbnQub2Zmc2V0WSArIHRoaXMuZHQuZW52LmdldFZhbHVlKCdkZENsaWNrRGV2aWFuY2UnKTtcblxuICAgICAgICBpZiAodGhpcy5kcm9wSW50b0VuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5NaWRkbGUgPSBNYXRoLmFicyhjdXJyZW50VHJDZW50ZXIgLSBkcmFnZ2VkVHJDZW50ZXIpIDwgMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmluTWlkZGxlKSB7XG4gICAgICAgICAgICBhY3RpdmVSb3cuY2xhc3NMaXN0LmFkZChEcmFnRGlyZWN0aW9uLk1pZGRsZSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjdGl2ZVJvdy5jbGFzc0xpc3QuYWRkKHRoaXMuZHJhZ0Rpcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIERyb3AgdGFyZ2V0IG11c3QgYmUgb25seSBhbm90aGVyIFRSIGFuZCBpdCBjYW5ub3QgYmUgdGhlIGVsZW1lbnQgaXRzZWxmIHRoZSBvbmUgd2UgYXJlXG4gICAgICogZHJhZ2dpbmcgYW5kIGl0IGRvZXMgbm90IG1ha2Ugc2Vuc2UgdG8gYWxsb3cgdG8gZHJvcCB0byB0aGUgc2FtZSBwb3NpdGlvbiB3ZSBzdGFydGVkIGZyb21cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgaXNWYWxpZERyb3BUYXJnZXQoZXZlbnQ6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgb3JpZ0lueCA9IHRoaXMuZHQuZW52LmdldFZhbHVlKCdkbmRJZCcpO1xuICAgICAgICBsZXQgc2libGluZ1JvdyA9IHRoaXMuZG5kUm93SW5kZXggLSBvcmlnSW54O1xuXG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC50YWdOYW1lID09PSAnVFInICYmIHRoaXMuZG5kUm93SW5kZXggIT09IG9yaWdJbnggJiZcbiAgICAgICAgICAgICEoc2libGluZ1JvdyA9PT0gMSAmJiB0aGlzLmRyYWdEaXIgPT09IERyYWdEaXJlY3Rpb24uVXApICYmXG4gICAgICAgICAgICAhKHNpYmxpbmdSb3cgPT09IC0xICYmIHRoaXMuZHJhZ0RpciA9PT0gRHJhZ0RpcmVjdGlvbi5Eb3duKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqICBwcml2YXRlXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGNsZWFyQ2xhc3Nlcyh0cjogYW55KTogdm9pZCB7XG4gICAgICAgIHRyLmNsYXNzTGlzdC5yZW1vdmUoJ2R0LWRyYWctcm93LXRvcCcpO1xuICAgICAgICB0ci5jbGFzc0xpc3QucmVtb3ZlKCdkdC1kcmFnLXJvdy1ib3R0b20nKTtcbiAgICAgICAgdHIuY2xhc3NMaXN0LnJlbW92ZSgnZHQtZHJhZy1yb3ctYm90aCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBwcml2YXRlXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGRyYWdEaXJUb1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZHJhZ0Rpcikge1xuICAgICAgICAgICAgY2FzZSBEcmFnRGlyZWN0aW9uLlVwOlxuICAgICAgICAgICAgICAgIHJldHVybiAnVXAnO1xuICAgICAgICAgICAgY2FzZSBEcmFnRGlyZWN0aW9uLkRvd246XG4gICAgICAgICAgICAgICAgcmV0dXJuICdEb3duJztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdOb3QgU3VyZSc7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=