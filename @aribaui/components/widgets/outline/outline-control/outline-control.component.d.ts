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
import { EventEmitter } from '@angular/core';
import { Environment } from '@aribaui/core';
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
export declare class OutlineControlComponent extends BaseComponent {
    env: Environment;
    private outlineState;
    private parentControl;
    outlineFor: OutlineForComponent;
    /**
     * List of items that needs to be rendered.
     */
    title: string;
    /**
     *
     *  If TRUE it changes the behavior of the outline node text which click is triggered
     *  it selects the item and broadcast the `onItemSelected` event
     *
     */
    allowSelection: boolean;
    /**
     *
     * Triggers action when outline item is expanded
     *
     */
    action: EventEmitter<any>;
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
    isRootItem: boolean;
    constructor(env: Environment, outlineState: OutlineState, parentControl: OutlineControlComponent, outlineFor: OutlineForComponent);
    ngOnInit(): void;
    /**
     *
     * We dont show expansion icons when there no children
     *
     */
    hasExpansionControl(): boolean;
    isSelected(): boolean;
    calculateStyleClass(): string;
    /**
     * Collapses and expands current node
     *
     */
    toggleExpansion(event: any): void;
    select(): void;
    private prepareControl();
}
