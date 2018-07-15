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
import { ElementRef, EventEmitter, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AnimationBuilder } from '@angular/animations';
import { Environment, Identity } from '@aribaui/core';
import { BaseComponent } from '../../core/base.component';
import { OutlineState } from './outline-state';
/**
 * This interface represent concrete tree structure for the outline tree mode
 */
export interface OutlineNode extends Identity {
    /**
     * Reference to parent node.
     */
    parent: OutlineNode;
    /**
     * Node's children. Even its a field it can be implemented lazily using getter where a target
     * object does not implement this as a public field but a getter with control over the
     * retrieved list
     */
    children: OutlineNode[];
    /**
     * Different states for outline Node
     *
     * isExpanded: boolean;= moving out as this is managed by expansionstate.
     */
    isExpanded: boolean;
    isSelected: boolean;
    isMatch?: boolean;
    readonly?: boolean;
    type?: string;
    draggable?: boolean;
    droppable?: boolean;
    visible?: boolean;
}
/**
 *
 * Checks type for OutlineNode
 *
 */
export declare function isOutlineNode(node: any): node is OutlineNode;
/**
 * Currently outline supports only two modes free, where application is responsible to retrieve
 * children for each node and tree with above OutlineNode structure
 */
export declare type ModelFormat = 'free' | 'tree';
/**
 *
 * OutlineForComponent is like ngFor, but for hierarchical (outline/tree) structures -- i.e. in
 * those cases where an item may have children.
 *
 *
 * It uses outline `<aw-outline-control>` to provide expanding functionality, indentation
 * and other things.
 *
 *
 * This component has minimal styling to make sure it can be changed easily.
 *
 * ### Example rendering tree section, where based on the type we format the out plus
 * for the main root section we always render little popup menu.
 *
 * ```
 *
 *   <aw-outline-for [list]="list" [hasChildren]="hasChildren">
 *
 *       <ng-template #outline let-item>
 *
 *           <div class="my-section">
 *               <div class="outline">
 *                   <aw-outline-control>
 *                       <ng-container [ngSwitch]="item.type">
 *                           <ng-template [ngSwitchCase]="'text'">
 *                               <div class="as-paragraf">
 *                                   {{item?.content}}
 *                               </div>
 *                           </ng-template>
 *
 *
 *                           <ng-template ngSwitchDefault>
 *                               {{item?.content}}
 *                           </ng-template>
 *
 *
 *                       </ng-container>
 *
 *
 *                   </aw-outline-control>
 *               </div>
 *
 *               <div class="filters" *ngIf="item.type === 'section'" >
 *
 *                   <aw-hover-card [linkTitle]="'Filter Items'">
 *                       <aw-list [list]="filterItems" [borderless]="true"></aw-list>
 *                   </aw-hover-card>
 *
 *               </div>
 *           </div>
 *     </ng-template>`
 *   </aw-outline-for>
 *
 * ```
 *
 *
 * We can use it also in embedded mode where we use the `awOutlineFor` directive
 *
 * ## Example
 *
 *
 * ````
 *  <table  class="tree-table" >
 *      <thead>
 *          <tr>
 *              <th>Name</th>
 *              <th>Type</th>
 *          </tr>
 *      </thead>
 *      <tbody #ooo2 awOutlineFor [list]="list"
 *             [hasChildren]="hasChildren"
 *             class="outline-table"
 *      >
 *          <ng-template #outline let-item>
 *              <tr>
 *                  <td class="item-name outline-animation">
 *                      <div><aw-outline-control>
 *                          {{item?.content}}
 *                      </aw-outline-control></div>
 *                  </td>
 *                  <td class="item-type outline-animation">
 *                      <div>{{item.type}}</div>
 *                  </td>
 *              </tr>
 *          </ng-template>
 *      </tbody>
 *  </table>
 *
 * ```
 *
 * I was thinking maybe for first time we don't need the same animation like expanding and
 * collapsing. Maybe we need fade-in. In such case I would probably apply @section anim only
 * on items where level > 0 (in the template I keep levels) and if level == 0 then I would
 * execute the same rendering just without [@section]
 *
 *
 * Todo: Think about how to do animation for the table case. Must also write unitest - due to
 * AribaLive aggressive schedule we are skipping them for now
 *
 */
export declare class OutlineForComponent extends BaseComponent {
    env: Environment;
    private _viewContainer;
    private builder;
    private element;
    /**
     * List of items that needs to be rendered. It does not have to in hierarchical order or we
     * leave it up to the application to decide about the structure.
     */
    list?: any[];
    /**
     * Tells the component not to render expansion control, in such case we expandAll as a
     * default behavior
     *
     */
    showExpansionControl: boolean;
    /**
     * Custom method provided by application to retrieve list of children for current item. If
     * children is undefined then, default 'children' field is used <currentItem>.children
     */
    children: (value: any) => any[];
    /**
     *
     * Option to conditionally render only items that are satisfying filter condition
     *
     */
    filterOut: (value: any) => boolean;
    /**
     * Opens all tree nodes.
     *
     */
    expandAll: boolean;
    /**
     *  Manages the state for the Outline component. Later on we can provide easier we how to
     *  initialize and set selectionPaths and selectionStates from the application
     *
     */
    state: OutlineState;
    /**
     *
     * Set indentation size to be used for each level
     *
     */
    indentationPerLevel: number;
    /**
     * In case template is outside of the outlineFor
     */
    externalTemplate: TemplateRef<any>;
    /**
     * Reference to current object using this component
     */
    context: any;
    pushRootSectionOnNewLine: boolean;
    /**
     *
     * Identifies current model mode.
     *
     * We recognize two modes:
     *
     * Free - Application needs to implement a children method to retrieve a list of children for
     * each node and format is pretty much upt to the application
     *
     * Tree - this is more restrictive where we have concrete data structure
     * interface that needs to be folled
     *
     * todo: instead of passing format binding try to look into the list to see what type so
     * we dont make it mandatory
     *
     */
    format: ModelFormat;
    /**
     *
     * Used when in selection mode to push current selected Item to the application
     *
     */
    onItemSelected: EventEmitter<any>;
    /**
     *
     * This event is triggered by OutlineControl when node is expanded or collapsed
     *
     */
    onExpandChange: EventEmitter<any>;
    /**
     * A template to use on application level to render individual items
     */
    controlTemplate: TemplateRef<any>;
    outlineItem: ElementRef;
    /**
     * Internals
     *
     * currentItem and parentItem are used to capture current processed item of ngFor. This is
     * set by directive `InitNestingDirective`
     *
     * animationInProgress: used by animation engine to make sure we dont do any actions while
     * animation is in the progress
     *
     * embedded: Indicates that we are using directive so it will not have default component
     * wrapper
     *
     */
    currentItem: any;
    parentItem: any;
    animationInProgress: boolean;
    embedded: boolean;
    /**
     * Flag that tells us that component is fully rendered
     *
     */
    viewInitialized: boolean;
    constructor(env: Environment, _viewContainer: ViewContainerRef, builder: AnimationBuilder, element: ElementRef);
    ngOnInit(): void;
    ngDoCheck(): void;
    isTreeModelFormat(): boolean;
    /**
     * Used by template and OutlineControl to identify which item is expanded and collapsed
     *
     */
    isExpanded(item: any, currentLevel?: number): boolean;
    /**
     *
     * Since we have currently two ways how to pass children items we need have this method to
     * unify the way how we access it. If we pass `children` binding we use this instead, otherwise
     * we expect current object to have `children` field
     *
     */
    childrenForItem(item: any): any[];
    /**
     *
     * Check if the current item has a children and needs to be rendered
     *
     */
    hasChildren(item: any): boolean;
    doGetChildren(item: any): any[];
    /**
     *  Uses the `OutlineState` to toggle state of current selectionPath. The `selectionPath` is
     *  put together inside `OutlineControl` where we iterate all the way to the root and add
     *  each item to the `currentPath` array. This way we collect list of item representing current
     *  current expansionPath.
     *
     *
     */
    toggleExpansion(): void;
    /**
     * Angular anim. callback that sets back the flag to make sure we don't trigger animations
     * when one is in progress.
     *
     */
    onAnimationDone(event: Event): void;
    /**
     * Calculated indentation used to shift the nested section to the right or later on to the
     * left when RTL is supported
     *
     *
     */
    indentation(currentLevel: number): number;
    /**
     * Not all rows are visible by default, there can be a case where you dont want to render items
     * using outline. e.g. Datatable with detail row.
     */
    isVisible(item: any): boolean;
}
/**
 *
 * Since we can not directly set `*ngTemplateOutlet` context variables to the typescript class we
 * use this directive to do the Job
 *
 */
export declare class InitNestingDirective implements OnInit {
    private outline;
    setLevel: number;
    setCurrrentItem: any;
    setParentItem: any;
    constructor(outline: OutlineForComponent);
    ngOnInit(): void;
}
