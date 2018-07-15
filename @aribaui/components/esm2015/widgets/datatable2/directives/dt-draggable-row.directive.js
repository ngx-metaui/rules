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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtZHJhZ2dhYmxlLXJvdy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2RpcmVjdGl2ZXMvZHQtZHJhZ2dhYmxlLXJvdy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE9BQU8sRUFDSCxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFFM0QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4QnhFLE1BQU07Ozs7Ozs7SUE2Q0YsWUFBb0IsT0FBbUIsRUFFbkIsRUFBdUIsRUFDdkIsVUFDQTtRQUpBLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFFbkIsT0FBRSxHQUFGLEVBQUUsQ0FBcUI7UUFDdkIsYUFBUSxHQUFSLFFBQVE7UUFDUixXQUFNLEdBQU4sTUFBTTs7Ozs7OzsrQkF2Q0MsS0FBSzs7Ozs7MkJBT1YsQ0FBQzs7Ozs7O3VCQU9VLGFBQWEsQ0FBQyxJQUFJOzs7Ozt3QkFNdkIsS0FBSzs7Ozs7OztxQkFRVCxDQUFDO0tBYXhCOzs7O0lBR0QsUUFBUTtRQUVKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUM5QjtLQUNKOzs7O0lBR0QsV0FB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RUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN2QyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Ozs7Ozs7SUFPcEMsZUFBZTtRQUVuQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNuQixLQUFLLGFBQWEsQ0FBQyxFQUFFO2dCQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLEtBQUssYUFBYSxDQUFDLElBQUk7Z0JBQ25CLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEI7Z0JBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQztTQUN6Qjs7OztZQWhWUixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjthQUMvQjs7OztZQW5DYyxVQUFVO1lBR2pCLG1CQUFtQix1QkErRVYsTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztZQTlFckQsZUFBZTtZQUorQixNQUFNOzs7OEJBNkN2RCxLQUFLOzBCQU9MLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE5nWm9uZSwgT25EZXN0cm95LFxuICAgIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGF0YXRhYmxlMkNvbXBvbmVudH0gZnJvbSAnLi4vZGF0YXRhYmxlMi5jb21wb25lbnQnO1xuaW1wb3J0IHtEb21VdGlsc1NlcnZpY2V9IGZyb20gJy4uLy4uLy4uL2NvcmUvZG9tLXV0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHtpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtEcmFnRGlyZWN0aW9uLCBEcmFnRXZlbnRzLCBEcm9wUG9zaXRpb259IGZyb20gJy4uL2F3LWRhdGF0YWJsZSc7XG5cblxuLyoqXG4gKiBEaXJlY3RpdmUgdXNlZCBpbnNpZGUgRFQgaW4gb3JkZXIgdG8gc3VwcG9ydCB0YWJsZSByb3dzIHJlLW9yZGVyaW5nLiBUaGlzIG1hbmFnZXMgYWxsIHRoZVxuICogRCZEIG5lY2Vzc2FyeSBsb2dpYyBmb3IgdGhpcyBmdW5jdGlvbmFsaXR5LlxuICpcbiAqIFtkdERyYWdnYWJsZVJvd10gaXMgdXNlZCBpbnNpZGUgdGhlIGByb3dUZW1wbGF0ZWAgbGlrZSB0aGlzOlxuICpcbiAqXG4gKiBgYGBodG1sXG4gKlxuICogPG5nLXRlbXBsYXRlICNyb3dUZW1wbGF0ZSBsZXQtcm93RGF0YSBsZXQtZXZlbj0nZXZlbnRcIiBsZXQtb2RkPVwib2RkXCIgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIlxuICogICAgICAgICAgICAgIGxldC1uZXN0aW5nTGV2ZWw9XCJuZXN0aW5nTGV2ZWxcIiBsZXQtY29sc1RvUmVuZGVyPVwiY29sc1RvUmVuZGVyXCI+XG4gKlxuICogICAgIDx0ciAjcm93RWxlbWVudCBkdERyYWdnYWJsZVJvdyBbZG5kUm93SW5kZXhdPVwicm93SW5kZXhcIlxuICogICAgICAgICAgY2xhc3M9XCJkdC1ib2R5LXJvd1wiXG4gKlxuICpcbiAqXG4gKiBgYGBcbiAqXG4gKiB3aGljaCBlbmFibGVkIG9yIGRpc2FibGVzIGJhc2VkIG9uIHRoZSB1c2VkIERUIGJpbmRpbmcgW2RuZFJvd0VuYWJsZWRdLiBCeSBkZWZhdWx0IGl0cyBkaXNhYmxlZC5cbiAqXG4gKlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbZHREcmFnZ2FibGVSb3ddJ1xufSlcbmV4cG9ydCBjbGFzcyBEVERyYWdnYWJsZVJvd0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XG57XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRlbGxzIHRoZSBkaXJlY3RpdmUgaWYgd2UgZW5hYmxlIG1pZGRsZSByb3cgem9uZSB0byBjcmVhdGUgYW4gZWZmZWN0IHRoYXQgd2UgYXJlIGRyb3BwaW5nXG4gICAgICogaW50byB0aGUgcm93LiBVc2VkIGZvciBvdXRsaW5lIERUIG1haW5seS5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZHJvcEludG9FbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IFRSIGluZGV4IG51bWJlclxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkbmRSb3dJbmRleDogbnVtYmVyID0gMDtcblxuICAgIC8qKlxuICAgICAqIEhvbGRzIGluZm9ybWF0aW9uIGFib3V0IG91ciBkcmFnZ2luZyBkaXJlY3Rpb24gVVAgYW5kIERPV04gaW4gb3JkZXIgdG8gYXNzaWduIGNvcnJlY3Qgc3R5bGVcbiAgICAgKiB0aGF0IGhpZ2hsaWdodHMgdGhlIHJvdyBhdCB0aGUgdG9wIG9yIGJvdHRvbVxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBkcmFnRGlyOiBEcmFnRGlyZWN0aW9uID0gRHJhZ0RpcmVjdGlvbi5Ob25lO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRoYXQgd2UgZHJhZ2dlZCBvdXIgcm93IGFuZCBzdG9wcGVkIGluIHRoZSBtaWRkbGUgb2YgdGhlIG90aGVyIHJvd1xuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbk1pZGRsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDdXJyZW50IGRyYWcgWSBjb29yZGluYXRlcyB3aGljaCBpcyB1c2VkIHRvZ2V0aGVyIHdpdGggdGhlIGRyYWdEaXIgd2hlbiBhc3NpbmdpbmcgZHJhZ2dpbmdcbiAgICAgKiBkaXJlY3Rpb24uXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGRyYWdZOiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogbGlzdGVuZXJzIGhhbmRsZXJzIGhlcmUgLSB0aGUgcmV0dXJuIGZyb20gLmJpbmQodGhpcykuXG4gICAgICovXG4gICAgcHJpdmF0ZSBldmVudEhhbmRsZXJzOiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGF0YXRhYmxlMkNvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBkdDogRGF0YXRhYmxlMkNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGRvbVV0aWxzOiBEb21VdGlsc1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSlcbiAgICB7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5kdC5kbmRSb3dFbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuZHQuZG5kUm93RW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5yZWxlYXNlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHVwcyBsaXN0ZW5lcnMgYW5kIHJldHVybnMgaGFuZGxlIHRvIHRoZW0gc28gd2UgY2FuIGxhdGVyIG9uIHVuc3Vic2NyaWJlLlxuICAgICAqL1xuICAgIHByaXZhdGUgc2V0dXBFdmVudExpc3RlbmVycygpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnMgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyc1snbW91c2Vkb3duJ10gPSB0aGlzLm9uTW91c2VEb3duRXZlbnQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzWydtb3VzZWRvd24nXSk7XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyc1snZHJhZ3N0YXJ0J10gPSB0aGlzLm9uRHJhZ1N0YXJ0RXZlbnQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzWydkcmFnc3RhcnQnXSk7XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyc1snZHJhZ292ZXInXSA9IHRoaXMub25EcmFnT3ZlckV2ZW50LmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzWydkcmFnb3ZlciddKTtcblxuICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzWydkcmFnbGVhdmUnXSA9IHRoaXMub25EcmFnTGVhdmVFdmVudC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJyxcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnNbJ2RyYWdsZWF2ZSddKTtcblxuICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzWydkcm9wJ10gPSB0aGlzLm9uRHJvcEV2ZW50LmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJyxcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnNbJ2Ryb3AnXSk7XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyc1snZHJhZ2VuZCddID0gdGhpcy5vbkRyYWdFbmRFdmVudC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzWydkcmFnZW5kJ10pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCB0aGUgY3JlYXRlZCBsaXN0ZW5lcnMgaW5zaWRlIGRlc3Ryb3koKSBjYWxsYmFja1xuICAgICAqL1xuICAgIHByaXZhdGUgcmVsZWFzZUV2ZW50TGlzdGVuZXJzKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIERyYWdFdmVudHMuZm9yRWFjaCgobmFtZTogc3RyaW5nKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCduYW1lJywgdGhpcy5ldmVudEhhbmRsZXJzW25hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRoaXMgaXMgZmlyc3QgZXZlbnQgd2hlcmUgd2U6XG4gICAgICpcbiAgICAgKiAgLSBNYXJrIGVsZW1lbnQgZHJhZ2dhYmxlIHRvIGVuYWJsZSBEJkRcbiAgICAgKiAgLSBTZXQgY2xpY2sgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlIG1pZGRsZSBvZiB0aGUgY3VycmVudCByb3dcbiAgICAgKiAgICAgIFRoaXMgaXMgbWFpbmx5IG5lZWRlZCB3aGVuIHdlIGFyZSB0cnlpbmcgdG8gY2FsY3VsYXRlIHNvbWV0aGluZyBmb3JcbiAgICAgKiAgICAgIGRyb3BJbnRvIHJvdyAob3V0bGluZSlcbiAgICAgKlxuICAgICAqIGV2ZW50LnRhcmdldCB1c3VhbGx5IGNvbnRhaW5zIHJlZmVyZW5jZSB0byBURCBlbGVtZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBvbk1vdXNlRG93bkV2ZW50KGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoZXZlbnQuYWx0S2V5ICYmIHRoaXMuZG9tVXRpbHMuaGFzUGFyZW50KGV2ZW50LnRhcmdldCwgJy5kdC1yb3ctZHJhZ2dhYmxlJykpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmRyYWdnYWJsZSA9IHRydWU7XG4gICAgICAgICAgICBsZXQgZWxUb0JlRHJhZ2dlZCA9IHRoaXMuZG9tVXRpbHMuZWxlbWVudERpbWVuc2lvbnMoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgIHRoaXMuZHQuZW52LnNldFZhbHVlKCdkZENsaWNrRGV2aWFuY2UnLCAoZWxUb0JlRHJhZ2dlZC5oZWlnaHQgLyAyKSAtIGV2ZW50Lm9mZnNldFkpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5kcmFnZ2FibGUgPSBmYWxzZTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBzZWNvbmQgdHJpZ2dlcmVkIGV2ZW50IHdoZW4gdGhlIGFjdHVhbCBkcmFnZ2luZyBzdGFydHMuIEhlcmUgd2UgbmVlZCB0byBkaXNhYmxlXG4gICAgICogZHJhZ2dlZCByb3cgYW5kIHNhdmUgaW5mb3JtYXRpb24gdGhhdCBhcmUgY29tbW9uIHRvIGEgdGFibGUuXG4gICAgICpcbiAgICAgKiBNYXJraW5nIHJvdyBkaXNhYmxlZCB3aXRoIHRoZSBzdHlsZSAuZHQtcm93LWRyYWdnaW5nIHVzaW5nIHNldFRpbWVvdXQgaXMgbmVlZGVkIGFzXG4gICAgICogaWYgd2Ugd291bGQgZ28gd2l0aG91dCBpdCB0aGVuIEQmRCBmcmFtZXdvcmsgd291bGQgY3JlYXRlIGEgY29weSBvZiByb3cgaW4gZGlzYWJsZWQgc3RhdGUuXG4gICAgICogTm93IHdlIGdyYWIgYSByb3cgd2l0aCBhY3RpdmUgc3RhdGUgYW5kIGFmdGVyIGEgMjAwbXMgZGVsYXkgd2UgZGlzYWJsZSB0aGUgb3JpZ2luYWwgcm93LlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbkRyYWdTdGFydEV2ZW50KGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdCkpIHtcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHQtcm93LWRyYWdnaW5nJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgdGhpcy5kdC5lbnYuc2V0VmFsdWUoJ2lzRHJhZ2dpbmcnLCB0cnVlKTtcbiAgICAgICAgdGhpcy5kdC5lbnYuc2V0VmFsdWUoJ2RuZElkJywgdGhpcy5kbmRSb3dJbmRleCk7XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgdGhpcy5kbmRSb3dJbmRleCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUaGlzIGV2ZW50cyBoYXBwZW5zIGFueXRpbWUgYXMgd2UgZHJhZyBvdmVyIHJvd3MuIFRoaXMgZXZlbnQgdHJpZ2dlcmVkIGFmdGVyIGNlcnRhaW5cbiAgICAgKiBkZWxheS4gSW4gaGVyZSB3ZSBjYWxjdWxhdGUgdGhlIG1vdXNlIG1vdmVtZW50IHRvIGlkZW50aWZ5IGlmIHdlIGFyZSBnb2luZyBVUCBvciBET1dOLlxuICAgICAqXG4gICAgICogVGhpcyBpcyBtYWlubHkgbmVlZGVkIHRvIG1hcmsgYSByb3cgd2l0aCB0aGUgY29ycmVjdCBsaW5lIG9uIFRPUCBvciBCT1RUT00gdG8gdmlzdWFsbHlcbiAgICAgKiBzaG93IGEgdXNlciB3aGVyZSB3ZSBhcmUuXG4gICAgICpcbiAgICAgKiBPbmNlIHdlIGtub3cgdGhlIGRpcmVjdGlvbiBhbmQgdGhlIGRyb3AgdGFyZ2V0IGlzIHZhbGlkIHdlIG1hcmsgdGhlIHJvdyB3aXRoIGNvcnJlY3QgY2xhc3NcbiAgICAgKiB0aGF0IGRvZXMgdGhlIHRyaWNrXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbkRyYWdPdmVyRXZlbnQoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICAgICAgICBpZiAodGhpcy5kcmFnWSA8IGV2ZW50LnBhZ2VZKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdEaXIgPSBEcmFnRGlyZWN0aW9uLkRvd247XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kcmFnWSA+IGV2ZW50LnBhZ2VZKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdEaXIgPSBEcmFnRGlyZWN0aW9uLlVwO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRvbnQgc2V0IGFnYWluIHVubGVzcyBpdHMgZGlmZmVyZW50XG4gICAgICAgIGlmICh0aGlzLmRyYWdZICE9PSBldmVudC5wYWdlWSkge1xuICAgICAgICAgICAgdGhpcy5kcmFnWSA9IGV2ZW50LnBhZ2VZO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZERyb3BUYXJnZXQoZXZlbnQpKSB7XG4gICAgICAgICAgICAvLyB0b2RvIHRlc3QgdGhpcyBwcmV2ZW50RGVmYXVsdCgpIHNvIGl0IGRvZXMgbm90IGNyZWF0ZSBzb21lIHNpZGVlZmZlY3RcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm1hcmtSb3dXaXRoQ2xhc3MoZXZlbnQsIHRoaXMuZG9tVXRpbHMuY2xvc2VzdChldmVudC50YXJnZXQsICd0cicpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgZmluaXNoaW5nIGV2ZW50IGp1c3QgYmVmb3JlIEQmRCBpcyBkb25lLiBJdCB0YWtlcyBjdXJyZW50IGluZm9ybWF0aW9uIGFuZFxuICAgICAqIGJyb2FkY2FzdCB0aGVtIHRvIHRoZSBEVCBzbyBEVCBjYW4gZG8gbmVjZXNzYXJ5IHJvdyByZW9yZGVyaW5nXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgb25Ecm9wRXZlbnQoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuY2xlYXJDbGFzc2VzKGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgLy8gZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgb3JpZ0luZHggPSB0aGlzLmR0LmVudi5nZXRWYWx1ZSgnZG5kSWQnKTtcbiAgICAgICAgbGV0IGRyb3BQb3M6IERyb3BQb3NpdGlvbiA9IHRoaXMuaW5NaWRkbGUgPyBEcm9wUG9zaXRpb24uSW50byA6IChcbiAgICAgICAgICAgIHRoaXMuZHJhZ0RpciA9PT0gRHJhZ0RpcmVjdGlvbi5VcCA/IERyb3BQb3NpdGlvbi5CZWZvcmUgOiBEcm9wUG9zaXRpb24uQWZ0ZXJcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5kdC5vbkRuRFJvd0Ryb3Aob3JpZ0luZHgsIHRoaXMuZG5kUm93SW5kZXgsIGRyb3BQb3MpO1xuXG4gICAgICAgIHRoaXMuaW5NaWRkbGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kcmFnWSA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXZlcnkgdGltZSB3ZSBkcmFnIG92ZXIgdGhlIGVsZW1lbnQgd2UgYXBwbHkgc29tZSBjbGFzc2VzIHRvIHRoZSBpdC4gdGhpcyBtZXRob2QgZG9lcyB0aGVcbiAgICAgKiBvcHBvc2l0ZSB3aGljaCBpcyB0byByZW1vdmUgZXZlcnl0aGluZyBzbyB3ZSBhcmUgcmVhZHkgZm9yIHRoZSBuZXh0IHJvd1xuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIG9uRHJhZ0xlYXZlRXZlbnQoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCB0ciA9IHRoaXMuZG9tVXRpbHMuY2xvc2VzdChldmVudC50YXJnZXQsICd0cicpO1xuICAgICAgICB0aGlzLmNsZWFyQ2xhc3Nlcyh0cik7XG5cbiAgICAgICAgdGhpcy5kdC5lbnYuZGVsZXRlVmFsdWUoJ2RuZE9uSG9sZEluZGV4Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIGxhc3QgZXZlbnQgd2l0aGluIEQmRCBmbG93LiBNYWlubHkgdXNlZCB0byBjbGVhbiB1cCBhbGwgdGhlIHJlc291cmNlIHRoYXQgaGFzIG5vdFxuICAgICAqIGJlZW4gY2xlYW4gdXAgYWxyZWFkeSBpbnNpZGUgb25Ecm9wRXZlbnQuXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIG9uRHJhZ0VuZEV2ZW50KGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KGV2ZW50LnRhcmdldC5jbGFzc0xpc3QpKSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHQtcm93LWRyYWdnaW5nJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsZWFyQ2xhc3NlcyhldmVudC50YXJnZXQpO1xuICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kdC5lbnYuZGVsZXRlVmFsdWUoJ2lzRHJhZ2dpbmcnKTtcbiAgICAgICAgdGhpcy5kdC5lbnYuZGVsZXRlVmFsdWUoJ2RuZElkJyk7XG4gICAgICAgIHRoaXMuZHQuZW52LmRlbGV0ZVZhbHVlKCdkZENsaWNrRGV2aWFuY2UnKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFzc2lnbiBDU1MgY2xhc3NlcyB0byB0aGUgcm93IHRvIGNyZWF0ZSBhbiBoaWdobGlnaHRpbmcgZWZmZWN0IHRvIGNhcHR1cmUgY3VycmVudCBwb3NpdGlvblxuICAgICAqIGZvciB0aGUgdXNlci5cbiAgICAgKlxuICAgICAqIEJhc2VkIG9uIHRoZSBEcmFnIGRpcmVjdGlvbiB3ZSBlaXRoZXIgYXBwbHlcbiAgICAgKiBjc3MgY2xhc3MgdGhhdCBjcmVhdGVzIGEgbGluZSBvbiB0b3Agb3IgYm90dG9tLiAgT25seSBmb3IgdGhlIGRyb3BJbnRvIGZ1bmN0aW9uYWxpdHkgd2VcbiAgICAgKiBuZWVkIHRvIGNhbGN1bGF0ZSBzb21lIG1vcmUgdG8gaWRlbnRpZnkgaWYgd2UgYXJlIHJlYWxseSBpbiB0aGUgbWlkZGxlIG9mIHRoZSByb3cuXG4gICAgICpcbiAgICAgKiBEcm9wSW50bzpcbiAgICAgKiAtLS0tLS0tLS1cbiAgICAgKlxuICAgICAqIEluaXRpYWxseSB3ZSBjYXB0dXJlZCBhIHBvc2l0aW9uIChpbiBtb3VzZWRvd24pIHRoZSBkaXN0YW5jZSB0byB0aGUgbWlkZGxlIG9mIHRoZSByb3cgYW5kXG4gICAgICogdGhpcyB3ZSBhcmUgdXNpbmcgaGVyZSB3aXRoIHNvbWUgdGhyZXNob2xkIG9mIDIgcGl4ZXMgc28gd2UgZG9udCBoYXZlIHRvIGJlIGV4YWN0bHkgb24gcGl4ZWxcbiAgICAgKiBwZXJmZWN0LlxuICAgICAqXG4gICAgICogLSBsZXQgY3VycmVudFRyQ2VudGVyID0gdGhpcy5kb21VdGlscy5lbGVtZW50RGltZW5zaW9ucyhhY3RpdmVSb3cpLmhlaWdodCAvIDI7XG4gICAgICogICAgICBSZWFkIGNlbnRlciBvZiBjdXJyZW50IHJvd1xuICAgICAqXG4gICAgICogLSBsZXQgZHJhZ2dlZFRyQ2VudGVyID0gZXZlbnQub2Zmc2V0WSArIHRoaXMuZHQuZW52LmdldFZhbHVlKCdkZENsaWNrRGV2aWFuY2UnKTtcbiAgICAgKiAgICAgIFJlYWQgbW91c2UgY29vcmRpbmF0ZXMgcmVsYXRpdmUgdG8gY3VycmVudCByb3cvdGQgYW5kIGFkZCB0byBpdCBvdXIgZGV2aWF0aW9uLlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIG1hcmtSb3dXaXRoQ2xhc3MoZXZlbnQ6IGFueSwgYWN0aXZlUm93OiBhbnkpOiB2b2lkXG4gICAge1xuXG4gICAgICAgIHRoaXMuY2xlYXJDbGFzc2VzKGFjdGl2ZVJvdyk7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgZHJhZyBpdGVtIGlzIGluIHRoZSBtaWRkbGUgb2Ygb3RoZXIgcm93XG4gICAgICAgIGxldCBjdXJyZW50VHJDZW50ZXIgPSB0aGlzLmRvbVV0aWxzLmVsZW1lbnREaW1lbnNpb25zKGFjdGl2ZVJvdykuaGVpZ2h0IC8gMjtcbiAgICAgICAgbGV0IGRyYWdnZWRUckNlbnRlciA9IGV2ZW50Lm9mZnNldFkgKyB0aGlzLmR0LmVudi5nZXRWYWx1ZSgnZGRDbGlja0RldmlhbmNlJyk7XG5cbiAgICAgICAgaWYgKHRoaXMuZHJvcEludG9FbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmluTWlkZGxlID0gTWF0aC5hYnMoY3VycmVudFRyQ2VudGVyIC0gZHJhZ2dlZFRyQ2VudGVyKSA8IDI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pbk1pZGRsZSkge1xuICAgICAgICAgICAgYWN0aXZlUm93LmNsYXNzTGlzdC5hZGQoRHJhZ0RpcmVjdGlvbi5NaWRkbGUpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY3RpdmVSb3cuY2xhc3NMaXN0LmFkZCh0aGlzLmRyYWdEaXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBEcm9wIHRhcmdldCBtdXN0IGJlIG9ubHkgYW5vdGhlciBUUiBhbmQgaXQgY2Fubm90IGJlIHRoZSBlbGVtZW50IGl0c2VsZiB0aGUgb25lIHdlIGFyZVxuICAgICAqIGRyYWdnaW5nIGFuZCBpdCBkb2VzIG5vdCBtYWtlIHNlbnNlIHRvIGFsbG93IHRvIGRyb3AgdG8gdGhlIHNhbWUgcG9zaXRpb24gd2Ugc3RhcnRlZCBmcm9tXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGlzVmFsaWREcm9wVGFyZ2V0KGV2ZW50OiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICBsZXQgb3JpZ0lueCA9IHRoaXMuZHQuZW52LmdldFZhbHVlKCdkbmRJZCcpO1xuICAgICAgICBsZXQgc2libGluZ1JvdyA9IHRoaXMuZG5kUm93SW5kZXggLSBvcmlnSW54O1xuXG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC50YWdOYW1lID09PSAnVFInICYmIHRoaXMuZG5kUm93SW5kZXggIT09IG9yaWdJbnggJiZcbiAgICAgICAgICAgICEoc2libGluZ1JvdyA9PT0gMSAmJiB0aGlzLmRyYWdEaXIgPT09IERyYWdEaXJlY3Rpb24uVXApICYmXG4gICAgICAgICAgICAhKHNpYmxpbmdSb3cgPT09IC0xICYmIHRoaXMuZHJhZ0RpciA9PT0gRHJhZ0RpcmVjdGlvbi5Eb3duKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqICBwcml2YXRlXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGNsZWFyQ2xhc3Nlcyh0cjogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdHIuY2xhc3NMaXN0LnJlbW92ZSgnZHQtZHJhZy1yb3ctdG9wJyk7XG4gICAgICAgIHRyLmNsYXNzTGlzdC5yZW1vdmUoJ2R0LWRyYWctcm93LWJvdHRvbScpO1xuICAgICAgICB0ci5jbGFzc0xpc3QucmVtb3ZlKCdkdC1kcmFnLXJvdy1ib3RoJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIHByaXZhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgZHJhZ0RpclRvU3RyaW5nKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmRyYWdEaXIpIHtcbiAgICAgICAgICAgIGNhc2UgRHJhZ0RpcmVjdGlvbi5VcDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1VwJztcbiAgICAgICAgICAgIGNhc2UgRHJhZ0RpcmVjdGlvbi5Eb3duOlxuICAgICAgICAgICAgICAgIHJldHVybiAnRG93bic7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnTm90IFN1cmUnO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19