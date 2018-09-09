/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
var DTDraggableRowDirective = /** @class */ (function () {
    function DTDraggableRowDirective(element, dt, domUtils, ngZone) {
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
    DTDraggableRowDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.dt.dndRowEnabled) {
            this.setupEventListeners();
        }
    };
    /**
     * @return {?}
     */
    DTDraggableRowDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.dt.dndRowEnabled) {
            this.releaseEventListeners();
        }
    };
    /**
     * Setups listeners and returns handle to them so we can later on unsubscribe.
     * @return {?}
     */
    DTDraggableRowDirective.prototype.setupEventListeners = /**
     * Setups listeners and returns handle to them so we can later on unsubscribe.
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.eventHandlers = {};
            _this.eventHandlers['mousedown'] = _this.onMouseDownEvent.bind(_this);
            _this.element.nativeElement.addEventListener('mousedown', _this.eventHandlers['mousedown']);
            _this.eventHandlers['dragstart'] = _this.onDragStartEvent.bind(_this);
            _this.element.nativeElement.addEventListener('dragstart', _this.eventHandlers['dragstart']);
            _this.eventHandlers['dragover'] = _this.onDragOverEvent.bind(_this);
            _this.element.nativeElement.addEventListener('dragover', _this.eventHandlers['dragover']);
            _this.eventHandlers['dragleave'] = _this.onDragLeaveEvent.bind(_this);
            _this.element.nativeElement.addEventListener('dragleave', _this.eventHandlers['dragleave']);
            _this.eventHandlers['drop'] = _this.onDropEvent.bind(_this);
            _this.element.nativeElement.addEventListener('drop', _this.eventHandlers['drop']);
            _this.eventHandlers['dragend'] = _this.onDragEndEvent.bind(_this);
            _this.element.nativeElement.addEventListener('dragend', _this.eventHandlers['dragend']);
        });
    };
    /**
     * Removes all the created listeners inside destroy() callback
     * @return {?}
     */
    DTDraggableRowDirective.prototype.releaseEventListeners = /**
     * Removes all the created listeners inside destroy() callback
     * @return {?}
     */
    function () {
        var _this = this;
        DragEvents.forEach(function (name) {
            document.removeEventListener('name', _this.eventHandlers[name]);
        });
    };
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
    DTDraggableRowDirective.prototype.onMouseDownEvent = /**
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
    function (event) {
        if (event.altKey && this.domUtils.hasParent(event.target, '.dt-row-draggable')) {
            this.element.nativeElement.draggable = true;
            /** @type {?} */
            var elToBeDragged = this.domUtils.elementDimensions(event.target);
            this.dt.env.setValue('ddClickDeviance', (elToBeDragged.height / 2) - event.offsetY);
        }
        else {
            this.element.nativeElement.draggable = false;
        }
    };
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
    DTDraggableRowDirective.prototype.onDragStartEvent = /**
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
    function (event) {
        setTimeout(function () {
            if (isPresent(event.target.classList)) {
                event.target.classList.add('dt-row-dragging');
            }
        }, 200);
        this.dt.env.setValue('isDragging', true);
        this.dt.env.setValue('dndId', this.dndRowIndex);
        event.dataTransfer.setData('text', this.dndRowIndex);
    };
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
    DTDraggableRowDirective.prototype.onDragOverEvent = /**
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
    function (event) {
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
    };
    /**
     * This is finishing event just before D&D is done. It takes current information and
     * broadcast them to the DT so DT can do necessary row reordering
     *
     *
     * @param {?} event
     * @return {?}
     */
    DTDraggableRowDirective.prototype.onDropEvent = /**
     * This is finishing event just before D&D is done. It takes current information and
     * broadcast them to the DT so DT can do necessary row reordering
     *
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.clearClasses(event.target.parentElement);
        /** @type {?} */
        var origIndx = this.dt.env.getValue('dndId');
        /** @type {?} */
        var dropPos = this.inMiddle ? DropPosition.Into : (this.dragDir === DragDirection.Up ? DropPosition.Before : DropPosition.After);
        this.dt.onDnDRowDrop(origIndx, this.dndRowIndex, dropPos);
        this.inMiddle = false;
        this.dragY = 0;
    };
    /**
     * Every time we drag over the element we apply some classes to the it. this method does the
     * opposite which is to remove everything so we are ready for the next row
     *
     *
     * @param {?} event
     * @return {?}
     */
    DTDraggableRowDirective.prototype.onDragLeaveEvent = /**
     * Every time we drag over the element we apply some classes to the it. this method does the
     * opposite which is to remove everything so we are ready for the next row
     *
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var tr = this.domUtils.closest(event.target, 'tr');
        this.clearClasses(tr);
        this.dt.env.deleteValue('dndOnHoldIndex');
    };
    /**
     *
     * This is last event within D&D flow. Mainly used to clean up all the resource that has not
     * been clean up already inside onDropEvent.
     *
     * @param {?} event
     * @return {?}
     */
    DTDraggableRowDirective.prototype.onDragEndEvent = /**
     *
     * This is last event within D&D flow. Mainly used to clean up all the resource that has not
     * been clean up already inside onDropEvent.
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (isPresent(event.target.classList)) {
            event.target.classList.remove('dt-row-dragging');
        }
        this.clearClasses(event.target);
        this.element.nativeElement.draggable = false;
        this.dt.env.deleteValue('isDragging');
        this.dt.env.deleteValue('dndId');
        this.dt.env.deleteValue('ddClickDeviance');
    };
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
    DTDraggableRowDirective.prototype.markRowWithClass = /**
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
    function (event, activeRow) {
        this.clearClasses(activeRow);
        /** @type {?} */
        var currentTrCenter = this.domUtils.elementDimensions(activeRow).height / 2;
        /** @type {?} */
        var draggedTrCenter = event.offsetY + this.dt.env.getValue('ddClickDeviance');
        if (this.dropIntoEnabled) {
            this.inMiddle = Math.abs(currentTrCenter - draggedTrCenter) < 2;
        }
        if (this.inMiddle) {
            activeRow.classList.add(DragDirection.Middle);
        }
        else {
            activeRow.classList.add(this.dragDir);
        }
    };
    /**
     *
     * Drop target must be only another TR and it cannot be the element itself the one we are
     * dragging and it does not make sense to allow to drop to the same position we started from
     *
     * @param {?} event
     * @return {?}
     */
    DTDraggableRowDirective.prototype.isValidDropTarget = /**
     *
     * Drop target must be only another TR and it cannot be the element itself the one we are
     * dragging and it does not make sense to allow to drop to the same position we started from
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var origInx = this.dt.env.getValue('dndId');
        /** @type {?} */
        var siblingRow = this.dndRowIndex - origInx;
        return event.target.parentElement.tagName === 'TR' && this.dndRowIndex !== origInx &&
            !(siblingRow === 1 && this.dragDir === DragDirection.Up) &&
            !(siblingRow === -1 && this.dragDir === DragDirection.Down);
    };
    /**
     *  private
     *
     * @param {?} tr
     * @return {?}
     */
    DTDraggableRowDirective.prototype.clearClasses = /**
     *  private
     *
     * @param {?} tr
     * @return {?}
     */
    function (tr) {
        tr.classList.remove('dt-drag-row-top');
        tr.classList.remove('dt-drag-row-bottom');
        tr.classList.remove('dt-drag-row-both');
    };
    /**
     *  private
     *
     * @return {?}
     */
    DTDraggableRowDirective.prototype.dragDirToString = /**
     *  private
     *
     * @return {?}
     */
    function () {
        switch (this.dragDir) {
            case DragDirection.Up:
                return 'Up';
            case DragDirection.Down:
                return 'Down';
            default:
                return 'Not Sure';
        }
    };
    DTDraggableRowDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[dtDraggableRow]'
                },] }
    ];
    /** @nocollapse */
    DTDraggableRowDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Datatable2Component, decorators: [{ type: Inject, args: [forwardRef(function () { return Datatable2Component; }),] }] },
        { type: DomUtilsService },
        { type: NgZone }
    ]; };
    DTDraggableRowDirective.propDecorators = {
        dropIntoEnabled: [{ type: Input }],
        dndRowIndex: [{ type: Input }]
    };
    return DTDraggableRowDirective;
}());
export { DTDraggableRowDirective };
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtZHJhZ2dhYmxlLXJvdy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2RpcmVjdGl2ZXMvZHQtZHJhZ2dhYmxlLXJvdy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE9BQU8sRUFDSCxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFFM0QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBMkVwRSxpQ0FBb0IsT0FBbUIsRUFFbkIsRUFBdUIsRUFDdkIsVUFDQTtRQUpBLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFFbkIsT0FBRSxHQUFGLEVBQUUsQ0FBcUI7UUFDdkIsYUFBUSxHQUFSLFFBQVE7UUFDUixXQUFNLEdBQU4sTUFBTTs7Ozs7OzsrQkF2Q0MsS0FBSzs7Ozs7MkJBT1YsQ0FBQzs7Ozs7O3VCQU9VLGFBQWEsQ0FBQyxJQUFJOzs7Ozt3QkFNdkIsS0FBSzs7Ozs7OztxQkFRVCxDQUFDO0tBYXhCOzs7O0lBR0QsMENBQVE7OztJQUFSO1FBRUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzlCO0tBQ0o7Ozs7SUFHRCw2Q0FBVzs7O0lB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T0FBTyxLQUFLLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7SUFRNUQsOENBQVk7Ozs7OztjQUFDLEVBQU87UUFFeEIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN2QyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Ozs7Ozs7SUFPcEMsaURBQWU7Ozs7OztRQUVuQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNuQixLQUFLLGFBQWEsQ0FBQyxFQUFFO2dCQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLEtBQUssYUFBYSxDQUFDLElBQUk7Z0JBQ25CLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEI7Z0JBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQztTQUN6Qjs7O2dCQWhWUixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtpQkFDL0I7Ozs7Z0JBbkNjLFVBQVU7Z0JBR2pCLG1CQUFtQix1QkErRVYsTUFBTSxTQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsbUJBQW1CLEVBQW5CLENBQW1CLENBQUM7Z0JBOUVyRCxlQUFlO2dCQUorQixNQUFNOzs7a0NBNkN2RCxLQUFLOzhCQU9MLEtBQUs7O2tDQTFFVjs7U0EwRGEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5cbmltcG9ydCB7XG4gICAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBOZ1pvbmUsIE9uRGVzdHJveSxcbiAgICBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RhdGF0YWJsZTJDb21wb25lbnR9IGZyb20gJy4uL2RhdGF0YWJsZTIuY29tcG9uZW50JztcbmltcG9ydCB7RG9tVXRpbHNTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2RvbS11dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7RHJhZ0RpcmVjdGlvbiwgRHJhZ0V2ZW50cywgRHJvcFBvc2l0aW9ufSBmcm9tICcuLi9hdy1kYXRhdGFibGUnO1xuXG5cbi8qKlxuICogRGlyZWN0aXZlIHVzZWQgaW5zaWRlIERUIGluIG9yZGVyIHRvIHN1cHBvcnQgdGFibGUgcm93cyByZS1vcmRlcmluZy4gVGhpcyBtYW5hZ2VzIGFsbCB0aGVcbiAqIEQmRCBuZWNlc3NhcnkgbG9naWMgZm9yIHRoaXMgZnVuY3Rpb25hbGl0eS5cbiAqXG4gKiBbZHREcmFnZ2FibGVSb3ddIGlzIHVzZWQgaW5zaWRlIHRoZSBgcm93VGVtcGxhdGVgIGxpa2UgdGhpczpcbiAqXG4gKlxuICogYGBgaHRtbFxuICpcbiAqIDxuZy10ZW1wbGF0ZSAjcm93VGVtcGxhdGUgbGV0LXJvd0RhdGEgbGV0LWV2ZW49J2V2ZW50XCIgbGV0LW9kZD1cIm9kZFwiIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCJcbiAqICAgICAgICAgICAgICBsZXQtbmVzdGluZ0xldmVsPVwibmVzdGluZ0xldmVsXCIgbGV0LWNvbHNUb1JlbmRlcj1cImNvbHNUb1JlbmRlclwiPlxuICpcbiAqICAgICA8dHIgI3Jvd0VsZW1lbnQgZHREcmFnZ2FibGVSb3cgW2RuZFJvd0luZGV4XT1cInJvd0luZGV4XCJcbiAqICAgICAgICAgIGNsYXNzPVwiZHQtYm9keS1yb3dcIlxuICpcbiAqXG4gKlxuICogYGBgXG4gKlxuICogd2hpY2ggZW5hYmxlZCBvciBkaXNhYmxlcyBiYXNlZCBvbiB0aGUgdXNlZCBEVCBiaW5kaW5nIFtkbmRSb3dFbmFibGVkXS4gQnkgZGVmYXVsdCBpdHMgZGlzYWJsZWQuXG4gKlxuICpcbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2R0RHJhZ2dhYmxlUm93XSdcbn0pXG5leHBvcnQgY2xhc3MgRFREcmFnZ2FibGVSb3dEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxue1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUZWxscyB0aGUgZGlyZWN0aXZlIGlmIHdlIGVuYWJsZSBtaWRkbGUgcm93IHpvbmUgdG8gY3JlYXRlIGFuIGVmZmVjdCB0aGF0IHdlIGFyZSBkcm9wcGluZ1xuICAgICAqIGludG8gdGhlIHJvdy4gVXNlZCBmb3Igb3V0bGluZSBEVCBtYWlubHkuXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRyb3BJbnRvRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBUUiBpbmRleCBudW1iZXJcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZG5kUm93SW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBIb2xkcyBpbmZvcm1hdGlvbiBhYm91dCBvdXIgZHJhZ2dpbmcgZGlyZWN0aW9uIFVQIGFuZCBET1dOIGluIG9yZGVyIHRvIGFzc2lnbiBjb3JyZWN0IHN0eWxlXG4gICAgICogdGhhdCBoaWdobGlnaHRzIHRoZSByb3cgYXQgdGhlIHRvcCBvciBib3R0b21cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgZHJhZ0RpcjogRHJhZ0RpcmVjdGlvbiA9IERyYWdEaXJlY3Rpb24uTm9uZTtcblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0aGF0IHdlIGRyYWdnZWQgb3VyIHJvdyBhbmQgc3RvcHBlZCBpbiB0aGUgbWlkZGxlIG9mIHRoZSBvdGhlciByb3dcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgaW5NaWRkbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ3VycmVudCBkcmFnIFkgY29vcmRpbmF0ZXMgd2hpY2ggaXMgdXNlZCB0b2dldGhlciB3aXRoIHRoZSBkcmFnRGlyIHdoZW4gYXNzaW5naW5nIGRyYWdnaW5nXG4gICAgICogZGlyZWN0aW9uLlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBkcmFnWTogbnVtYmVyID0gMDtcblxuICAgIC8qKlxuICAgICAqIGxpc3RlbmVycyBoYW5kbGVycyBoZXJlIC0gdGhlIHJldHVybiBmcm9tIC5iaW5kKHRoaXMpLlxuICAgICAqL1xuICAgIHByaXZhdGUgZXZlbnRIYW5kbGVyczogeyBbbmFtZTogc3RyaW5nXTogYW55IH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERhdGF0YWJsZTJDb21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHByaXZhdGUgZHQ6IERhdGF0YWJsZTJDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBkb21VdGlsczogRG9tVXRpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpXG4gICAge1xuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuZHQuZG5kUm93RW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmR0LmRuZFJvd0VuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVsZWFzZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cHMgbGlzdGVuZXJzIGFuZCByZXR1cm5zIGhhbmRsZSB0byB0aGVtIHNvIHdlIGNhbiBsYXRlciBvbiB1bnN1YnNjcmliZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNldHVwRXZlbnRMaXN0ZW5lcnMoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzID0ge307XG4gICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnNbJ21vdXNlZG93biddID0gdGhpcy5vbk1vdXNlRG93bkV2ZW50LmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLFxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyc1snbW91c2Vkb3duJ10pO1xuXG4gICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnNbJ2RyYWdzdGFydCddID0gdGhpcy5vbkRyYWdTdGFydEV2ZW50LmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLFxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyc1snZHJhZ3N0YXJ0J10pO1xuXG4gICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnNbJ2RyYWdvdmVyJ10gPSB0aGlzLm9uRHJhZ092ZXJFdmVudC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLFxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyc1snZHJhZ292ZXInXSk7XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyc1snZHJhZ2xlYXZlJ10gPSB0aGlzLm9uRHJhZ0xlYXZlRXZlbnQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzWydkcmFnbGVhdmUnXSk7XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyc1snZHJvcCddID0gdGhpcy5vbkRyb3BFdmVudC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzWydkcm9wJ10pO1xuXG4gICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnNbJ2RyYWdlbmQnXSA9IHRoaXMub25EcmFnRW5kRXZlbnQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLFxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyc1snZHJhZ2VuZCddKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgdGhlIGNyZWF0ZWQgbGlzdGVuZXJzIGluc2lkZSBkZXN0cm95KCkgY2FsbGJhY2tcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlbGVhc2VFdmVudExpc3RlbmVycygpOiB2b2lkXG4gICAge1xuICAgICAgICBEcmFnRXZlbnRzLmZvckVhY2goKG5hbWU6IHN0cmluZykgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbmFtZScsIHRoaXMuZXZlbnRIYW5kbGVyc1tuYW1lXSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIGZpcnN0IGV2ZW50IHdoZXJlIHdlOlxuICAgICAqXG4gICAgICogIC0gTWFyayBlbGVtZW50IGRyYWdnYWJsZSB0byBlbmFibGUgRCZEXG4gICAgICogIC0gU2V0IGNsaWNrIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZSBtaWRkbGUgb2YgdGhlIGN1cnJlbnQgcm93XG4gICAgICogICAgICBUaGlzIGlzIG1haW5seSBuZWVkZWQgd2hlbiB3ZSBhcmUgdHJ5aW5nIHRvIGNhbGN1bGF0ZSBzb21ldGhpbmcgZm9yXG4gICAgICogICAgICBkcm9wSW50byByb3cgKG91dGxpbmUpXG4gICAgICpcbiAgICAgKiBldmVudC50YXJnZXQgdXN1YWxseSBjb250YWlucyByZWZlcmVuY2UgdG8gVEQgZWxlbWVudFxuICAgICAqL1xuICAgIHByaXZhdGUgb25Nb3VzZURvd25FdmVudChldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGV2ZW50LmFsdEtleSAmJiB0aGlzLmRvbVV0aWxzLmhhc1BhcmVudChldmVudC50YXJnZXQsICcuZHQtcm93LWRyYWdnYWJsZScpKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IGVsVG9CZURyYWdnZWQgPSB0aGlzLmRvbVV0aWxzLmVsZW1lbnREaW1lbnNpb25zKGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICB0aGlzLmR0LmVudi5zZXRWYWx1ZSgnZGRDbGlja0RldmlhbmNlJywgKGVsVG9CZURyYWdnZWQuaGVpZ2h0IC8gMikgLSBldmVudC5vZmZzZXRZKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZHJhZ2dhYmxlID0gZmFsc2U7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgc2Vjb25kIHRyaWdnZXJlZCBldmVudCB3aGVuIHRoZSBhY3R1YWwgZHJhZ2dpbmcgc3RhcnRzLiBIZXJlIHdlIG5lZWQgdG8gZGlzYWJsZVxuICAgICAqIGRyYWdnZWQgcm93IGFuZCBzYXZlIGluZm9ybWF0aW9uIHRoYXQgYXJlIGNvbW1vbiB0byBhIHRhYmxlLlxuICAgICAqXG4gICAgICogTWFya2luZyByb3cgZGlzYWJsZWQgd2l0aCB0aGUgc3R5bGUgLmR0LXJvdy1kcmFnZ2luZyB1c2luZyBzZXRUaW1lb3V0IGlzIG5lZWRlZCBhc1xuICAgICAqIGlmIHdlIHdvdWxkIGdvIHdpdGhvdXQgaXQgdGhlbiBEJkQgZnJhbWV3b3JrIHdvdWxkIGNyZWF0ZSBhIGNvcHkgb2Ygcm93IGluIGRpc2FibGVkIHN0YXRlLlxuICAgICAqIE5vdyB3ZSBncmFiIGEgcm93IHdpdGggYWN0aXZlIHN0YXRlIGFuZCBhZnRlciBhIDIwMG1zIGRlbGF5IHdlIGRpc2FibGUgdGhlIG9yaWdpbmFsIHJvdy5cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgb25EcmFnU3RhcnRFdmVudChldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KGV2ZW50LnRhcmdldC5jbGFzc0xpc3QpKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2R0LXJvdy1kcmFnZ2luZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIHRoaXMuZHQuZW52LnNldFZhbHVlKCdpc0RyYWdnaW5nJywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuZHQuZW52LnNldFZhbHVlKCdkbmRJZCcsIHRoaXMuZG5kUm93SW5kZXgpO1xuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsIHRoaXMuZG5kUm93SW5kZXgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVGhpcyBldmVudHMgaGFwcGVucyBhbnl0aW1lIGFzIHdlIGRyYWcgb3ZlciByb3dzLiBUaGlzIGV2ZW50IHRyaWdnZXJlZCBhZnRlciBjZXJ0YWluXG4gICAgICogZGVsYXkuIEluIGhlcmUgd2UgY2FsY3VsYXRlIHRoZSBtb3VzZSBtb3ZlbWVudCB0byBpZGVudGlmeSBpZiB3ZSBhcmUgZ29pbmcgVVAgb3IgRE9XTi5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgbWFpbmx5IG5lZWRlZCB0byBtYXJrIGEgcm93IHdpdGggdGhlIGNvcnJlY3QgbGluZSBvbiBUT1Agb3IgQk9UVE9NIHRvIHZpc3VhbGx5XG4gICAgICogc2hvdyBhIHVzZXIgd2hlcmUgd2UgYXJlLlxuICAgICAqXG4gICAgICogT25jZSB3ZSBrbm93IHRoZSBkaXJlY3Rpb24gYW5kIHRoZSBkcm9wIHRhcmdldCBpcyB2YWxpZCB3ZSBtYXJrIHRoZSByb3cgd2l0aCBjb3JyZWN0IGNsYXNzXG4gICAgICogdGhhdCBkb2VzIHRoZSB0cmlja1xuICAgICAqL1xuICAgIHByaXZhdGUgb25EcmFnT3ZlckV2ZW50KGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgICAgICAgaWYgKHRoaXMuZHJhZ1kgPCBldmVudC5wYWdlWSkge1xuICAgICAgICAgICAgdGhpcy5kcmFnRGlyID0gRHJhZ0RpcmVjdGlvbi5Eb3duO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZHJhZ1kgPiBldmVudC5wYWdlWSkge1xuICAgICAgICAgICAgdGhpcy5kcmFnRGlyID0gRHJhZ0RpcmVjdGlvbi5VcDtcbiAgICAgICAgfVxuICAgICAgICAvLyBkb250IHNldCBhZ2FpbiB1bmxlc3MgaXRzIGRpZmZlcmVudFxuICAgICAgICBpZiAodGhpcy5kcmFnWSAhPT0gZXZlbnQucGFnZVkpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1kgPSBldmVudC5wYWdlWTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWREcm9wVGFyZ2V0KGV2ZW50KSkge1xuICAgICAgICAgICAgLy8gdG9kbyB0ZXN0IHRoaXMgcHJldmVudERlZmF1bHQoKSBzbyBpdCBkb2VzIG5vdCBjcmVhdGUgc29tZSBzaWRlZWZmZWN0XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5tYXJrUm93V2l0aENsYXNzKGV2ZW50LCB0aGlzLmRvbVV0aWxzLmNsb3Nlc3QoZXZlbnQudGFyZ2V0LCAndHInKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIGZpbmlzaGluZyBldmVudCBqdXN0IGJlZm9yZSBEJkQgaXMgZG9uZS4gSXQgdGFrZXMgY3VycmVudCBpbmZvcm1hdGlvbiBhbmRcbiAgICAgKiBicm9hZGNhc3QgdGhlbSB0byB0aGUgRFQgc28gRFQgY2FuIGRvIG5lY2Vzc2FyeSByb3cgcmVvcmRlcmluZ1xuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIG9uRHJvcEV2ZW50KGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmNsZWFyQ2xhc3NlcyhldmVudC50YXJnZXQucGFyZW50RWxlbWVudCk7XG4gICAgICAgIC8vIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IG9yaWdJbmR4ID0gdGhpcy5kdC5lbnYuZ2V0VmFsdWUoJ2RuZElkJyk7XG4gICAgICAgIGxldCBkcm9wUG9zOiBEcm9wUG9zaXRpb24gPSB0aGlzLmluTWlkZGxlID8gRHJvcFBvc2l0aW9uLkludG8gOiAoXG4gICAgICAgICAgICB0aGlzLmRyYWdEaXIgPT09IERyYWdEaXJlY3Rpb24uVXAgPyBEcm9wUG9zaXRpb24uQmVmb3JlIDogRHJvcFBvc2l0aW9uLkFmdGVyXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZHQub25EbkRSb3dEcm9wKG9yaWdJbmR4LCB0aGlzLmRuZFJvd0luZGV4LCBkcm9wUG9zKTtcblxuICAgICAgICB0aGlzLmluTWlkZGxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJhZ1kgPSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV2ZXJ5IHRpbWUgd2UgZHJhZyBvdmVyIHRoZSBlbGVtZW50IHdlIGFwcGx5IHNvbWUgY2xhc3NlcyB0byB0aGUgaXQuIHRoaXMgbWV0aG9kIGRvZXMgdGhlXG4gICAgICogb3Bwb3NpdGUgd2hpY2ggaXMgdG8gcmVtb3ZlIGV2ZXJ5dGhpbmcgc28gd2UgYXJlIHJlYWR5IGZvciB0aGUgbmV4dCByb3dcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbkRyYWdMZWF2ZUV2ZW50KGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgdHIgPSB0aGlzLmRvbVV0aWxzLmNsb3Nlc3QoZXZlbnQudGFyZ2V0LCAndHInKTtcbiAgICAgICAgdGhpcy5jbGVhckNsYXNzZXModHIpO1xuXG4gICAgICAgIHRoaXMuZHQuZW52LmRlbGV0ZVZhbHVlKCdkbmRPbkhvbGRJbmRleCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVGhpcyBpcyBsYXN0IGV2ZW50IHdpdGhpbiBEJkQgZmxvdy4gTWFpbmx5IHVzZWQgdG8gY2xlYW4gdXAgYWxsIHRoZSByZXNvdXJjZSB0aGF0IGhhcyBub3RcbiAgICAgKiBiZWVuIGNsZWFuIHVwIGFscmVhZHkgaW5zaWRlIG9uRHJvcEV2ZW50LlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbkRyYWdFbmRFdmVudChldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudChldmVudC50YXJnZXQuY2xhc3NMaXN0KSkge1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2R0LXJvdy1kcmFnZ2luZycpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbGVhckNsYXNzZXMoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHQuZW52LmRlbGV0ZVZhbHVlKCdpc0RyYWdnaW5nJyk7XG4gICAgICAgIHRoaXMuZHQuZW52LmRlbGV0ZVZhbHVlKCdkbmRJZCcpO1xuICAgICAgICB0aGlzLmR0LmVudi5kZWxldGVWYWx1ZSgnZGRDbGlja0RldmlhbmNlJyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBc3NpZ24gQ1NTIGNsYXNzZXMgdG8gdGhlIHJvdyB0byBjcmVhdGUgYW4gaGlnaGxpZ2h0aW5nIGVmZmVjdCB0byBjYXB0dXJlIGN1cnJlbnQgcG9zaXRpb25cbiAgICAgKiBmb3IgdGhlIHVzZXIuXG4gICAgICpcbiAgICAgKiBCYXNlZCBvbiB0aGUgRHJhZyBkaXJlY3Rpb24gd2UgZWl0aGVyIGFwcGx5XG4gICAgICogY3NzIGNsYXNzIHRoYXQgY3JlYXRlcyBhIGxpbmUgb24gdG9wIG9yIGJvdHRvbS4gIE9ubHkgZm9yIHRoZSBkcm9wSW50byBmdW5jdGlvbmFsaXR5IHdlXG4gICAgICogbmVlZCB0byBjYWxjdWxhdGUgc29tZSBtb3JlIHRvIGlkZW50aWZ5IGlmIHdlIGFyZSByZWFsbHkgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcm93LlxuICAgICAqXG4gICAgICogRHJvcEludG86XG4gICAgICogLS0tLS0tLS0tXG4gICAgICpcbiAgICAgKiBJbml0aWFsbHkgd2UgY2FwdHVyZWQgYSBwb3NpdGlvbiAoaW4gbW91c2Vkb3duKSB0aGUgZGlzdGFuY2UgdG8gdGhlIG1pZGRsZSBvZiB0aGUgcm93IGFuZFxuICAgICAqIHRoaXMgd2UgYXJlIHVzaW5nIGhlcmUgd2l0aCBzb21lIHRocmVzaG9sZCBvZiAyIHBpeGVzIHNvIHdlIGRvbnQgaGF2ZSB0byBiZSBleGFjdGx5IG9uIHBpeGVsXG4gICAgICogcGVyZmVjdC5cbiAgICAgKlxuICAgICAqIC0gbGV0IGN1cnJlbnRUckNlbnRlciA9IHRoaXMuZG9tVXRpbHMuZWxlbWVudERpbWVuc2lvbnMoYWN0aXZlUm93KS5oZWlnaHQgLyAyO1xuICAgICAqICAgICAgUmVhZCBjZW50ZXIgb2YgY3VycmVudCByb3dcbiAgICAgKlxuICAgICAqIC0gbGV0IGRyYWdnZWRUckNlbnRlciA9IGV2ZW50Lm9mZnNldFkgKyB0aGlzLmR0LmVudi5nZXRWYWx1ZSgnZGRDbGlja0RldmlhbmNlJyk7XG4gICAgICogICAgICBSZWFkIG1vdXNlIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIGN1cnJlbnQgcm93L3RkIGFuZCBhZGQgdG8gaXQgb3VyIGRldmlhdGlvbi5cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBtYXJrUm93V2l0aENsYXNzKGV2ZW50OiBhbnksIGFjdGl2ZVJvdzogYW55KTogdm9pZFxuICAgIHtcblxuICAgICAgICB0aGlzLmNsZWFyQ2xhc3NlcyhhY3RpdmVSb3cpO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIGRyYWcgaXRlbSBpcyBpbiB0aGUgbWlkZGxlIG9mIG90aGVyIHJvd1xuICAgICAgICBsZXQgY3VycmVudFRyQ2VudGVyID0gdGhpcy5kb21VdGlscy5lbGVtZW50RGltZW5zaW9ucyhhY3RpdmVSb3cpLmhlaWdodCAvIDI7XG4gICAgICAgIGxldCBkcmFnZ2VkVHJDZW50ZXIgPSBldmVudC5vZmZzZXRZICsgdGhpcy5kdC5lbnYuZ2V0VmFsdWUoJ2RkQ2xpY2tEZXZpYW5jZScpO1xuXG4gICAgICAgIGlmICh0aGlzLmRyb3BJbnRvRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5pbk1pZGRsZSA9IE1hdGguYWJzKGN1cnJlbnRUckNlbnRlciAtIGRyYWdnZWRUckNlbnRlcikgPCAyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaW5NaWRkbGUpIHtcbiAgICAgICAgICAgIGFjdGl2ZVJvdy5jbGFzc0xpc3QuYWRkKERyYWdEaXJlY3Rpb24uTWlkZGxlKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZlUm93LmNsYXNzTGlzdC5hZGQodGhpcy5kcmFnRGlyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRHJvcCB0YXJnZXQgbXVzdCBiZSBvbmx5IGFub3RoZXIgVFIgYW5kIGl0IGNhbm5vdCBiZSB0aGUgZWxlbWVudCBpdHNlbGYgdGhlIG9uZSB3ZSBhcmVcbiAgICAgKiBkcmFnZ2luZyBhbmQgaXQgZG9lcyBub3QgbWFrZSBzZW5zZSB0byBhbGxvdyB0byBkcm9wIHRvIHRoZSBzYW1lIHBvc2l0aW9uIHdlIHN0YXJ0ZWQgZnJvbVxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBpc1ZhbGlkRHJvcFRhcmdldChldmVudDogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgbGV0IG9yaWdJbnggPSB0aGlzLmR0LmVudi5nZXRWYWx1ZSgnZG5kSWQnKTtcbiAgICAgICAgbGV0IHNpYmxpbmdSb3cgPSB0aGlzLmRuZFJvd0luZGV4IC0gb3JpZ0lueDtcblxuICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQudGFnTmFtZSA9PT0gJ1RSJyAmJiB0aGlzLmRuZFJvd0luZGV4ICE9PSBvcmlnSW54ICYmXG4gICAgICAgICAgICAhKHNpYmxpbmdSb3cgPT09IDEgJiYgdGhpcy5kcmFnRGlyID09PSBEcmFnRGlyZWN0aW9uLlVwKSAmJlxuICAgICAgICAgICAgIShzaWJsaW5nUm93ID09PSAtMSAmJiB0aGlzLmRyYWdEaXIgPT09IERyYWdEaXJlY3Rpb24uRG93bik7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiAgcHJpdmF0ZVxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBjbGVhckNsYXNzZXModHI6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRyLmNsYXNzTGlzdC5yZW1vdmUoJ2R0LWRyYWctcm93LXRvcCcpO1xuICAgICAgICB0ci5jbGFzc0xpc3QucmVtb3ZlKCdkdC1kcmFnLXJvdy1ib3R0b20nKTtcbiAgICAgICAgdHIuY2xhc3NMaXN0LnJlbW92ZSgnZHQtZHJhZy1yb3ctYm90aCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBwcml2YXRlXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGRyYWdEaXJUb1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5kcmFnRGlyKSB7XG4gICAgICAgICAgICBjYXNlIERyYWdEaXJlY3Rpb24uVXA6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdVcCc7XG4gICAgICAgICAgICBjYXNlIERyYWdEaXJlY3Rpb24uRG93bjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0Rvd24nO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ05vdCBTdXJlJztcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==