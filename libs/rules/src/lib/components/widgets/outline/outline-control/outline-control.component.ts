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
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  Optional,
  Output,
  SkipSelf
} from '@angular/core';
import {assert, isBlank, isPresent} from '../../../../core/utils/lang';
import {Environment} from '../../../../core/config/environment';
import {BaseComponent} from '../../../core/base.component';
import {OutlineForComponent} from '../outline-for.component';
import {OutlineState} from '../outline-state';


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
@Component({
  selector: 'aw-outline-control',
  templateUrl: 'outline-control.component.html',
  styleUrls: ['outline-control.component.scss'],
})
export class OutlineControlComponent extends BaseComponent {

  /**
   *
   *  If TRUE it changes the behavior of the outline node text which click is triggered
   *  it selects the item and broadcast the `onItemSelected` event
   *
   */
  @Input()
  allowSelection: boolean = false;

  @Input()
  allowEdit: boolean = false;

  /**
   *
   * Triggers action when outline item is expanded
   *
   */
  @Output()
  action: EventEmitter<any> = new EventEmitter();

  /**
   * Current item used for this `OutlineControl`
   *
   */
  item: any;

  /**
   * Calculated indentation used to shift the nested section to the left. This is used for
   * embedded mode e.g. tree table where we cannot indent parent
   */
  indentation: number;


  isRootItem: boolean = false;

  constructor(public env: Environment,
              @Optional() @Inject(forwardRef(() => OutlineState))
              private outlineState: OutlineState,
              @SkipSelf() @Optional() @Inject(forwardRef(() => OutlineControlComponent))
              private parentControl: OutlineControlComponent,
              @SkipSelf() @Optional() @Inject(forwardRef(() => OutlineForComponent))
              public outlineFor: OutlineForComponent) {
    super(env);

  }

  ngOnInit() {
    super.ngOnInit();

    this.prepareControl();
  }


  /**
   *
   * We dont show expansion icons when there no children
   *
   */
  hasExpansionControl(): boolean {
    return this.outlineFor.hasChildren(this.item) && this.outlineFor.showExpansionControl;
  }


  isSelected(): boolean {
    return this.outlineFor.state.selectedItem === this.item;
  }

  calculateStyleClass(): string {
    if (!this.hasExpansionControl() ||
      (this.outlineFor.pushRootSectionOnNewLine && isBlank(this.item.$$parentItem))) {
      return '';
    }

    if (this.outlineFor.embedded) {
      return this.outlineFor.isExpanded(this.item) ? 'icon-slim-arrow-down'
        : 'icon-slim-arrow-right';
    } else {
      return this.outlineFor.isExpanded(this.item)
        ? 'icon-slim-arrow-right outline-icon-expanded' : 'icon-slim-arrow-right';
    }
  }

  /**
   * Collapses and expands current node
   *
   */
  toggleExpansion(event: any): void {
    this.outlineFor.state.currentPath = [];
    let currentPath = this.item;

    while (isPresent(currentPath)) {
      this.outlineFor.state.currentPath.unshift(currentPath);
      currentPath = currentPath.$$parentItem;
    }

    this.outlineFor.toggleExpansion();
    const payload = {
      item: this.item,
      expanded: this.outlineFor.state.isExpanded(this.item)
    };
    this.action.emit(payload);
    this.outlineFor.onExpandChange.emit(payload);

    event.stopPropagation();
  }

  select(): void {
    this.outlineFor.state.selectedItem = this.item;
    this.outlineFor.onItemSelected.emit(this.item);
  }

  private prepareControl(): void {
    if (isBlank(this.outlineFor) && isPresent(this.outlineState)) {
      this.outlineFor = this.outlineState.outlineFor;
    }

    assert(isPresent(this.outlineFor), 'Missing outlineFor component');
    if (this.outlineFor.embedded) {
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
