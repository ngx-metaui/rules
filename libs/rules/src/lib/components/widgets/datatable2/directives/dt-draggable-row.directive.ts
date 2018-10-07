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

import {
    Directive, ElementRef, forwardRef, Inject, Input, NgZone, OnDestroy,
    OnInit
} from '@angular/core';
import {Datatable2Component} from '../datatable2.component';
import {DomUtilsService} from '../../../core/dom-utils.service';
import {isPresent} from '../../../../core/utils/lang';
import {DragRowDirection, DragEvents, DropPosition} from '../aw-datatable';


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
@Directive({
    selector: '[dtDraggableRow]'
})
export class DTDraggableRowDirective implements OnInit, OnDestroy
{

    /**
     *
     * Tells the directive if we enable middle row zone to create an effect that we are dropping
     * into the row. Used for outline DT mainly.
     *
     */
    @Input()
    dropIntoEnabled: boolean = false;

    /**
     * Current TR index number
     *
     */
    @Input()
    dndRowIndex: number = 0;

    /**
     * Holds information about our dragging direction UP and DOWN in order to assign correct style
     * that highlights the row at the top or bottom
     *
     */
    private dragDir: DragRowDirection = DragRowDirection.None;

    /**
     * Indicates that we dragged our row and stopped in the middle of the other row
     *
     */
    private inMiddle: boolean = false;

    /**
     *
     * Current drag Y coordinates which is used together with the dragDir when assinging dragging
     * direction.
     *
     */
    private dragY: number = 0;

    /**
     * listeners handlers here - the return from .bind(this).
     */
    private eventHandlers: { [name: string]: any };

    constructor(private element: ElementRef,
                @Inject(forwardRef(() => Datatable2Component))
                private dt: Datatable2Component,
                private domUtils: DomUtilsService,
                private ngZone: NgZone)
    {
    }


    ngOnInit(): void
    {
        if (this.dt.dndRowEnabled) {
            this.setupEventListeners();
        }
    }


    ngOnDestroy(): void
    {
        if (this.dt.dndRowEnabled) {
            this.releaseEventListeners();
        }
    }

    /**
     * Setups listeners and returns handle to them so we can later on unsubscribe.
     */
    private setupEventListeners(): void
    {
        this.ngZone.runOutsideAngular(() =>
        {
            this.eventHandlers = {};
            this.eventHandlers['mousedown'] = this.onMouseDownEvent.bind(this);
            this.element.nativeElement.addEventListener('mousedown',
                this.eventHandlers['mousedown']);

            this.eventHandlers['dragstart'] = this.onDragStartEvent.bind(this);
            this.element.nativeElement.addEventListener('dragstart',
                this.eventHandlers['dragstart']);

            this.eventHandlers['dragover'] = this.onDragOverEvent.bind(this);
            this.element.nativeElement.addEventListener('dragover',
                this.eventHandlers['dragover']);

            this.eventHandlers['dragleave'] = this.onDragLeaveEvent.bind(this);
            this.element.nativeElement.addEventListener('dragleave',
                this.eventHandlers['dragleave']);

            this.eventHandlers['drop'] = this.onDropEvent.bind(this);
            this.element.nativeElement.addEventListener('drop',
                this.eventHandlers['drop']);

            this.eventHandlers['dragend'] = this.onDragEndEvent.bind(this);
            this.element.nativeElement.addEventListener('dragend',
                this.eventHandlers['dragend']);
        });
    }

    /**
     * Removes all the created listeners inside destroy() callback
     */
    private releaseEventListeners(): void
    {
        DragEvents.forEach((name: string) =>
        {
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
     */
    private onMouseDownEvent(event: any): void
    {
        if (event.altKey && this.domUtils.hasParent(event.target, '.dt-row-draggable')) {
            this.element.nativeElement.draggable = true;
            let elToBeDragged = this.domUtils.elementDimensions(event.target);
            this.dt.env.setValue('ddClickDeviance', (elToBeDragged.height / 2) - event.offsetY);

        } else {
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
     */
    private onDragStartEvent(event: any): void
    {
        setTimeout(() =>
        {
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
     */
    private onDragOverEvent(event: any): void
    {
        event.dataTransfer.dropEffect = 'move';
        if (this.dragY < event.pageY) {
            this.dragDir = DragRowDirection.Down;
        } else if (this.dragY > event.pageY) {
            this.dragDir = DragRowDirection.Up;
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
     */
    private onDropEvent(event: any): void
    {
        this.clearClasses(event.target.parentElement);
        // event.preventDefault();

        let origIndx = this.dt.env.getValue('dndId');
        let dropPos: DropPosition = this.inMiddle ? DropPosition.Into : (
            this.dragDir === DragRowDirection.Up ? DropPosition.Before : DropPosition.After
        );
        this.dt.onDnDRowDrop(origIndx, this.dndRowIndex, dropPos);

        this.inMiddle = false;
        this.dragY = 0;
    }

    /**
     * Every time we drag over the element we apply some classes to the it. this method does the
     * opposite which is to remove everything so we are ready for the next row
     *
     *
     */
    private onDragLeaveEvent(event: any): void
    {
        let tr = this.domUtils.closest(event.target, 'tr');
        this.clearClasses(tr);

        this.dt.env.deleteValue('dndOnHoldIndex');
    }

    /**
     *
     * This is last event within D&D flow. Mainly used to clean up all the resource that has not
     * been clean up already inside onDropEvent.
     *
     */
    private onDragEndEvent(event: any): void
    {
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
     */
    private markRowWithClass(event: any, activeRow: any): void
    {

        this.clearClasses(activeRow);

        // Check if drag item is in the middle of other row
        let currentTrCenter = this.domUtils.elementDimensions(activeRow).height / 2;
        let draggedTrCenter = event.offsetY + this.dt.env.getValue('ddClickDeviance');

        if (this.dropIntoEnabled) {
            this.inMiddle = Math.abs(currentTrCenter - draggedTrCenter) < 2;
        }

        if (this.inMiddle) {
            activeRow.classList.add(DragRowDirection.Middle);

        } else {
            activeRow.classList.add(this.dragDir);
        }
    }

    /**
     *
     * Drop target must be only another TR and it cannot be the element itself the one we are
     * dragging and it does not make sense to allow to drop to the same position we started from
     *
     */
    private isValidDropTarget(event: any): boolean
    {
        let origInx = this.dt.env.getValue('dndId');
        let siblingRow = this.dndRowIndex - origInx;

        return event.target.parentElement.tagName === 'TR' && this.dndRowIndex !== origInx &&
            !(siblingRow === 1 && this.dragDir === DragRowDirection.Up) &&
            !(siblingRow === -1 && this.dragDir === DragRowDirection.Down);
    }


    /**
     *  private
     *
     */
    private clearClasses(tr: any): void
    {
        tr.classList.remove('dt-drag-row-top');
        tr.classList.remove('dt-drag-row-bottom');
        tr.classList.remove('dt-drag-row-both');
    }

    /**
     *  private
     *
     */
    private dragDirToString(): string
    {
        switch (this.dragDir) {
            case DragRowDirection.Up:
                return 'Up';
            case DragRowDirection.Down:
                return 'Down';
            default:
                return 'Not Sure';
        }
    }
}
