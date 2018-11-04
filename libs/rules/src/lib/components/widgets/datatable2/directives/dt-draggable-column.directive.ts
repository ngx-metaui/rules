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
  Directive,
  ElementRef,
  forwardRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit
} from '@angular/core';
import {Datatable2Component} from '../datatable2.component';
import {DomUtilsService} from '../../../core/dom-utils.service';
import {isPresent} from '../../../../core/utils/lang';
import {DragColumnDirection, DragEvents, DropPosition} from '../aw-datatable';


/**
 * Directive used inside DT in order to support table column re-ordering. This manages all the
 * D&D necessary logic for this functionality.
 *
 * [dtDraggableCol] is used inside the `DTColumnComponent` like this:
 *
 *
 * todo: Figure out better way how to highligt dropping target. now we using linear-gradient
 * background which is not ideal. Maybe create a DIV and move around as we are dragging ?
 *
 *
 */
@Directive({
  selector: '[dtDraggableCol]'
})
export class DTDraggableColumnDirective implements OnInit, OnDestroy {
  /**
   * Current Column index number
   *
   */
  @Input()
  dndIndex: number = 0;

  /**
   * Holds information about our dragging direction UP and DOWN in order to assign correct style
   * that highlights the row at the top or bottom
   *
   */
  private dragDir: DragColumnDirection = DragColumnDirection.None;

  /**
   * This property tells us if we are on Left part of the column or right part of the column
   * Just reusing this enum with its left/right
   */
  private dropPos: DragColumnDirection = DragColumnDirection.None;

  /**
   *
   * Current drag Y coordinates which is used together with the dragDir when assinging dragging
   * direction.
   *
   */
  private dragX: number = 0;

  /**
   * listeners handlers here - the return from .bind(this).
   */
  private eventHandlers: { [name: string]: any };

  constructor(private element: ElementRef,
              @Inject(forwardRef(() => Datatable2Component))
              private dt: Datatable2Component,
              private domUtils: DomUtilsService,
              private ngZone: NgZone) {
  }


  ngOnInit(): void {
    if (this.dt.dndColumnEnabled) {
      this.setupEventListeners();
    }
  }


  ngOnDestroy(): void {
    if (this.dt.dndColumnEnabled) {
      this.releaseEventListeners();
    }
  }

  /**
   * Setups listeners and returns handle to them so we can later on unsubscribe.
   */
  private setupEventListeners(): void {
    this.ngZone.runOutsideAngular(() => {
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
  private releaseEventListeners(): void {
    DragEvents.forEach((name: string) => {
      document.removeEventListener('name', this.eventHandlers[name]);
    });
  }


  /**
   *
   * This is first event where we:
   *
   *  - Mark element draggable to enable D&D
   *
   * event.target usually contains reference to TD element
   */
  private onMouseDownEvent(event: any): void {
    const isDragHandleClicked = event.target.classList.contains('icon-grab');

    if (isDragHandleClicked &&
      this.domUtils.hasParent(event.target, '.dt-col-draggable')) {
      this.element.nativeElement.draggable = true;
      event.stopPropagation();

    } else {
      this.element.nativeElement.draggable = false;
    }
  }

  /**
   * This is second triggered event when the actual dragging starts. Here we need to disable
   * dragged columns and save information that are common to a table.
   *
   * Marking column disabled with the style .dt-col-dragging using setTimeout is needed as
   * if we would go without it then D&D framework would create a copy of column in disabled state.
   * Now we grab a col with active state and after a 200ms delay we disable the original col.
   *
   */
  private onDragStartEvent(event: any): void {
    setTimeout(() => {
      if (isPresent(event.target.classList)) {
        event.target.classList.add('dt-col-dragging');
      }
    }, 200);


    if (this.dt.hasFrozenColumns()) {
      this.dt.env.setValue('dragSource', this.tablePos(event.target));
    }

    this.dt.env.setValue('isDragging', true);
    this.dt.env.setValue('dndId', this.dndIndex);
    event.dataTransfer.setData('text', this.dndIndex);
  }

  /**
   * For frozen column column case it return if we are dealing with the left or
   * right table
   *
   */
  private tablePos(target: any): string {
    const wrapper = this.domUtils.closest(event.target, '.dt-body-wrapper');
    return wrapper.classList.contains('dt-body-unfrozen') ? 'right' : 'left';
  }

  /**
   *
   * This events happens anytime as we drag over columns. This event triggered after certain
   * delay. In here we calculate the mouse movement to identify if we are going LEFT or
   * RIGHT.
   *
   * This is mainly needed to mark a col with the correct line on LEFT or RIGHT to visually
   * show a user where we are.
   *
   * Once we know the direction and the drop target is valid we mark the Col with correct class
   * that does the trick
   */
  private onDragOverEvent(event: any): void {

    event.dataTransfer.dropEffect = 'move';
    const currCol = this.domUtils.closest(event.target, 'th') || event.target;
    const currColCenter = this.domUtils.elementDimensions(currCol).width / 2;


    if (this.dragX < event.pageX) {
      this.dragDir = DragColumnDirection.Right;
    } else if (this.dragX > event.pageX) {
      this.dragDir = DragColumnDirection.Left;
    }
    if (event.offsetX > (currColCenter + 5)) {
      this.dropPos = DragColumnDirection.Right;
    } else if (event.offsetX < (currColCenter - 5)) {
      this.dropPos = DragColumnDirection.Left;
    }


    // dont set again unless its different
    if (this.dragX !== event.pageX) {
      this.dragX = event.pageX;
    }

    if (this.isValidDropTarget(event)) {
      event.preventDefault();

      this.markColWithClass(event,
        this.domUtils.closest(event.target, 'th') || event.target);
    }
  }

  /**
   * This is finishing event just before D&D is done. It takes current information and
   * broadcast them to the DT so DT can do necessary row reordering
   *
   *
   */
  private onDropEvent(event: any): void {
    this.clearClasses(event.target.parentElement);

    const origIndx = this.dt.env.getValue('dndId');
    const dropPos: DropPosition = this.dropPos === DragColumnDirection.Left ?
      DropPosition.Before : DropPosition.After;

    if (this.dt.hasFrozenColumns()) {
      this.dt.env.setValue('dragTarget', this.tablePos(event.target));
    }

    this.dt.onDnDColumnDrop(origIndx, this.dndIndex, dropPos);

    this.dragX = 0;
  }

  /**
   * Every time we drag over the element we apply some classes to the it. this method does the
   * opposite which is to remove everything so we are ready for the next row
   *
   *
   */
  private onDragLeaveEvent(event: any): void {
    const td = this.domUtils.closest(event.target, 'th') || event.target;
    this.clearClasses(td);
  }

  /**
   *
   * This is last event within D&D flow. Mainly used to clean up all the resource that has not
   * been clean up already inside onDropEvent.
   *
   */
  private onDragEndEvent(event: any): void {
    if (isPresent(event.target.classList)) {
      event.target.classList.remove('dt-col-dragging');
    }

    this.dt.env.deleteValue('dragTarget');
    this.dt.env.deleteValue('dragSource');

    this.clearClasses(event.target);
    this.element.nativeElement.draggable = false;

    this.dt.env.deleteValue('isDragging');
    this.dt.env.deleteValue('dndId');
    this.dt.env.deleteValue('ddClickDeviance');
  }


  /**
   * Assign CSS classes to the col to create an highlighting effect to capture current position
   * for the user.
   *
   * Based on the Drag direction we either apply
   * css class that creates a line on left or right.
   *
   *
   */
  private markColWithClass(event: any, activeCol: any): void {
    this.clearClasses(activeCol);

    activeCol.classList.add(this.dropPos);
  }

  /**
   *
   * Drop target must be only another TD and it cannot be the element itself plus,
   * if we are dragging across the table (frozen col) then its always ok, otherwise we cannot
   * drop it column itself or e.g. drag column into sibling column and try to drop on the closest
   * half to the original column.
   *
   */
  private isValidDropTarget(event: any): boolean {
    const origInx = this.dt.env.getValue('dndId');
    const siblingCol = this.dndIndex - origInx;

    // We want to limit dropping into the next subling col
    const isRighHalf = this.dragDir === DragColumnDirection.Right &&
      this.dropPos === DragColumnDirection.Right;
    const isLeftHalf = this.dragDir === DragColumnDirection.Left &&
      this.dropPos === DragColumnDirection.Left;

    // console.log('main', (event.target.parentElement.tagName === 'TH' && this.isDroppable()
    // && this.numOfColumnLeftInSource() > 1));

    // console.log('this.isXrossTable()', this.isXrossTable());
    // console.log('this.dndIndex !== origInx', this.dndIndex !== origInx);
    // console.log(' (siblingCol === 1 && isRighHalf)', (siblingCol === 1 && isRighHalf));
    // console.log('(siblingCol > 1 || siblingCol < -1)', ((siblingCol > 1 ||
    // siblingCol < -1)));

    return (
      (event.target.parentElement.tagName === 'TH' && this.isDroppable() &&
        this.numOfColumnLeftInSource() > 1) &&

      (
        this.isXrossTable() || // always allow across dt dragging

        // make sure where are not dropping in the same column
        (this.dndIndex !== origInx &&
          (
            // and when its column next to make sure is on the other half
            (siblingCol === 1 && isRighHalf) ||
            (siblingCol === -1 && isLeftHalf) ||
            (siblingCol > 1 || siblingCol < -1)
          )
        )
      )
    );
  }


  /**
   *  private
   *
   */
  private clearClasses(td: any): void {
    td.classList.remove('dt-drag-col-left');
    td.classList.remove('dt-drag-col-right');
  }

  /**
   * Are we in frozen column mode and are we dragging from one table to another?
   *
   * private
   */
  private isXrossTable(): boolean {
    const source = this.dt.env.getValue('dragSource');
    const target = this.tablePos(event);
    return isPresent(source) && source !== target;
  }


  /**
   * Some column can be marked as NOT droppable in this case we should not allow to move
   * them. This is mainly used for outline tables where we need expandable column first one
   */
  private isDroppable(): boolean {

    if (this.isXrossTable() && this.tablePos(event) === 'left') {
      return this.dt.frozenColumns[this.dndIndex].isDroppable;
    } else {
      return this.dt.columns[this.dndIndex].isDroppable;
    }
  }


  /**
   * Some column can be marked as NOT droppable in this case we should not allow to move
   * them. This is mainly used for outline tables where we need expandable column first one
   */
  private numOfColumnLeftInSource(): number {
    const source = this.dt.env.getValue('dragSource');
    if (this.isXrossTable() && source === 'left') {
      return this.dt.frozenColumns.filter(col => col.isDraggable).length;

    } else {
      return this.dt.columns.filter(col => col.isDraggable).length;
    }
  }

  /**
   *  private
   *
   */
  private dragDirToString(): string {
    switch (this.dragDir) {
      case DragColumnDirection.Left:
        return 'Left';
      case DragColumnDirection.Right:
        return 'Right';
      default:
        return 'Not Sure';
    }
  }
}
