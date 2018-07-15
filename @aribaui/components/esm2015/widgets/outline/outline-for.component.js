/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild, Directive, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { animate, AnimationBuilder, state, style, transition, trigger } from '@angular/animations';
import { assert, Environment, isBlank, isPresent, ListWrapper } from '@aribaui/core';
import { BaseComponent } from '../../core/base.component';
import { OutlineState } from './outline-state';
/**
 * This interface represent concrete tree structure for the outline tree mode
 * @record
 */
export function OutlineNode() { }
function OutlineNode_tsickle_Closure_declarations() {
    /**
     * Reference to parent node.
     * @type {?}
     */
    OutlineNode.prototype.parent;
    /**
     * Node's children. Even its a field it can be implemented lazily using getter where a target
     * object does not implement this as a public field but a getter with control over the
     * retrieved list
     * @type {?}
     */
    OutlineNode.prototype.children;
    /**
     * Different states for outline Node
     *
     * isExpanded: boolean;= moving out as this is managed by expansionstate.
     * @type {?}
     */
    OutlineNode.prototype.isExpanded;
    /** @type {?} */
    OutlineNode.prototype.isSelected;
    /** @type {?|undefined} */
    OutlineNode.prototype.isMatch;
    /** @type {?|undefined} */
    OutlineNode.prototype.readonly;
    /** @type {?|undefined} */
    OutlineNode.prototype.type;
    /** @type {?|undefined} */
    OutlineNode.prototype.draggable;
    /** @type {?|undefined} */
    OutlineNode.prototype.droppable;
    /** @type {?|undefined} */
    OutlineNode.prototype.visible;
}
/**
 *
 * Checks type for OutlineNode
 *
 * @param {?} node
 * @return {?}
 */
export function isOutlineNode(node) {
    return isPresent(node) && isPresent((/** @type {?} */ (node)))
        && isPresent((/** @type {?} */ (node)).parent)
        && isPresent((/** @type {?} */ (node)).children);
}
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
 * collapsing. Maybe we need fade-in. In such case I would probably apply \@section anim only
 * on items where level > 0 (in the template I keep levels) and if level == 0 then I would
 * execute the same rendering just without [\@section]
 *
 *
 * Todo: Think about how to do animation for the table case. Must also write unitest - due to
 * AribaLive aggressive schedule we are skipping them for now
 *
 */
export class OutlineForComponent extends BaseComponent {
    /**
     * @param {?} env
     * @param {?} _viewContainer
     * @param {?} builder
     * @param {?} element
     */
    constructor(env, _viewContainer, builder, element) {
        super(env);
        this.env = env;
        this._viewContainer = _viewContainer;
        this.builder = builder;
        this.element = element;
        /**
         * Tells the component not to render expansion control, in such case we expandAll as a
         * default behavior
         *
         */
        this.showExpansionControl = true;
        /**
         * Opens all tree nodes.
         *
         */
        this.expandAll = false;
        /**
         *
         * Set indentation size to be used for each level
         *
         */
        this.indentationPerLevel = 25;
        this.pushRootSectionOnNewLine = false;
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
        this.format = 'free';
        /**
         *
         * Used when in selection mode to push current selected Item to the application
         *
         */
        this.onItemSelected = new EventEmitter();
        /**
         *
         * This event is triggered by OutlineControl when node is expanded or collapsed
         *
         */
        this.onExpandChange = new EventEmitter();
        this.embedded = false;
        /**
         * Flag that tells us that component is fully rendered
         *
         */
        this.viewInitialized = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (isBlank(this.state)) {
            this.state = new OutlineState();
        }
        if (isBlank(this.state.outlineFor)) {
            this.state.outlineFor = this;
        }
        if (this.expandAll) {
            this.showExpansionControl = false;
        }
        this.state.isExpandedAll = this.expandAll;
        // in case we want to render content of tree outside of outlineFor
        if (isPresent(this.externalTemplate)) {
            this.controlTemplate = this.externalTemplate;
        }
        this.embedded = this.element.nativeElement.hasAttribute('awoutlinefor');
        if (isBlank(this.context)) {
            this.context = this;
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        super.ngDoCheck();
    }
    /**
     * @return {?}
     */
    isTreeModelFormat() {
        return this.format === 'tree';
    }
    /**
     * Used by template and OutlineControl to identify which item is expanded and collapsed
     *
     * @param {?} item
     * @param {?=} currentLevel
     * @return {?}
     */
    isExpanded(item, currentLevel = -1) {
        if (currentLevel === 0 && this.pushRootSectionOnNewLine) {
            // always override/reset for root nodes
            if (this.isTreeModelFormat()) {
                (/** @type {?} */ (item)).isExpanded = true;
            }
            return true;
        }
        return this.state.isExpanded(item);
    }
    /**
     *
     * Since we have currently two ways how to pass children items we need have this method to
     * unify the way how we access it. If we pass `children` binding we use this instead, otherwise
     * we expect current object to have `children` field
     *
     * @param {?} item
     * @return {?}
     */
    childrenForItem(item) {
        if (this.isTreeModelFormat()) {
            return (/** @type {?} */ (item)).children || [];
        }
        else {
            return this.hasChildren(item) ? this.doGetChildren(item) : [];
        }
    }
    /**
     *
     * Check if the current item has a children and needs to be rendered
     *
     * @param {?} item
     * @return {?}
     */
    hasChildren(item) {
        if (this.isTreeModelFormat()) {
            let /** @type {?} */ children = (/** @type {?} */ (item)).children;
            return isPresent(children) && children.length > 0;
        }
        else if (isBlank(this.children) && isBlank(item.children)) {
            assert(false, 'Missing [children] method binding');
        }
        return this.doGetChildren(item).length > 0;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    doGetChildren(item) {
        return this.children.apply(this.context, [item]);
    }
    /**
     *  Uses the `OutlineState` to toggle state of current selectionPath. The `selectionPath` is
     *  put together inside `OutlineControl` where we iterate all the way to the root and add
     *  each item to the `currentPath` array. This way we collect list of item representing current
     *  current expansionPath.
     *
     *
     * @return {?}
     */
    toggleExpansion() {
        if (this.animationInProgress) {
            // backup procedure in case onAnimationDone fails
            setTimeout(() => {
                if (this.animationInProgress) {
                    // change only if its fails
                    this.animationInProgress = false;
                }
            }, 200);
            return;
        }
        if (!this.embedded) {
            this.animationInProgress = true;
        }
        let /** @type {?} */ currentItem = ListWrapper.last(this.state.currentPath);
        this.state.toggleExpansion(this.state.currentPath, this.childrenForItem(currentItem));
        if (this.embedded) {
            // this.animateEmbeddedItem();
        }
    }
    /**
     * Angular anim. callback that sets back the flag to make sure we don't trigger animations
     * when one is in progress.
     *
     * @param {?} event
     * @return {?}
     */
    onAnimationDone(event) {
        this.animationInProgress = false;
    }
    /**
     * Calculated indentation used to shift the nested section to the right or later on to the
     * left when RTL is supported
     *
     *
     * @param {?} currentLevel
     * @return {?}
     */
    indentation(currentLevel) {
        if (this.pushRootSectionOnNewLine && currentLevel > 0) {
            currentLevel -= 1;
        }
        return (currentLevel === 0 && this.pushRootSectionOnNewLine)
            ? 0 : (this.indentationPerLevel * currentLevel);
    }
    /**
     * Not all rows are visible by default, there can be a case where you dont want to render items
     * using outline. e.g. Datatable with detail row.
     * @param {?} item
     * @return {?}
     */
    isVisible(item) {
        if (isPresent(this.filterOut)) {
            return !this.filterOut(item);
        }
        return true;
    }
}
OutlineForComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-outline-for, [awOutlineFor]',
                template: `<!--
    Starts with the list, where nestingLevel is -1.
    call template outlineItems to iterate and render each item
-->
<ng-container [ngIf]="list" *ngTemplateOutlet="outlineItems;
            context:{ $implicit: list, nestingLevel: 0, parentItem: null, expanded: true}">
</ng-container>

<!--
    Main Entry point for the recursion. this is called by the block above as well as byt the inner
    piece that calls this template recursively again when an item has children
-->
<ng-template #outlineItems let-children let-nestingLevel="nestingLevel"
             let-parent="parentItem" let-expanded="expanded">

    <ng-template ngFor let-item [ngForOf]="children" let-rowIndex="index">

        <ng-container *ngTemplateOutlet="outlineItem;
            context:{ $implicit: item, nestingLevel: nestingLevel, parentItem: parent,
            expanded: expanded, rowIndex:rowIndex}">
        </ng-container>

        <!--

            Recursion piece:

            For non embedded case when even if its not expanded we need to iterate children
            as we want to apply animation that should go with ngIf which inside the outineItem
            template

            Dont recurse/ render items that are not visible.
        -->

        <ng-template [ngIf]="hasChildren(item) && (isExpanded(item, nestingLevel) || !embedded) && isVisible(item)">
            <ng-container *ngTemplateOutlet="outlineItems;
                        context:{ $implicit: childrenForItem(item),
                                nestingLevel: nestingLevel+1,
                                expanded: isExpanded(item, nestingLevel),
                                parentItem:item }">
            </ng-container>
        </ng-template>
    </ng-template>
</ng-template>


<!--
    Renders actual outline node and applies animation while expanding and collapsing

    [@section]="expanded || isExpanded(item) ? 'visible' : 'hidden'"
-->
<ng-template #outlineItem let-item let-nestingLevel="nestingLevel" let-parent="parentItem"
             let-rowIndex="rowIndex"
             let-expanded="expanded">

    <div class="w-outline-item"
         *ngIf="!embedded && expanded"
         [style.padding-left.px]="indentation(nestingLevel)"
         initNesting [setLevel]="nestingLevel" [setParentItem]="parent"
         [setCurrrentItem]="item"
         [@section]
         (@section.done)="onAnimationDone($event)">

        <ng-container *ngTemplateOutlet="controlTemplate;
                        context:{ $implicit: item, nestingLevel: nestingLevel, rowIndex:rowIndex }">
        </ng-container>
    </div>

    <!--
        When outline control is used as embedded meaning its inside e..g datatable we
        cannot have any tags around it.

        Todo: Refactor this in the way so we can do animation when table lines are
        expanded. Since its embedded we can not have any wrapping element around, the template
        is fully responsible
    -->
    <ng-template [ngIf]="embedded && expanded"
                 initNesting [setLevel]="nestingLevel" [setParentItem]="parent"
                 [setCurrrentItem]="item"
    >
        <ng-container #renderedItem *ngTemplateOutlet="controlTemplate;
                        context:{ $implicit: item, nestingLevel: nestingLevel, rowIndex:rowIndex  }">
        </ng-container>
    </ng-template>

</ng-template>


`,
                styles: [`.is-outline-animation>div,::ng-deep .w-outline-item{overflow:hidden}`],
                animations: [
                    trigger('section', [
                        state('*', style({
                            'overflow-y': 'hidden',
                            'height': '*',
                            'opacity': '1'
                        })),
                        state('void', style({
                            'height': '0',
                            'opacity': '0',
                            'overflow-y': 'hidden'
                        })),
                        transition('* => void', animate('200ms ease-out')),
                        transition('void => *', animate('200ms ease-in'))
                    ]),
                ]
            },] },
];
/** @nocollapse */
OutlineForComponent.ctorParameters = () => [
    { type: Environment },
    { type: ViewContainerRef },
    { type: AnimationBuilder },
    { type: ElementRef }
];
OutlineForComponent.propDecorators = {
    list: [{ type: Input }],
    showExpansionControl: [{ type: Input }],
    children: [{ type: Input }],
    filterOut: [{ type: Input }],
    expandAll: [{ type: Input }],
    state: [{ type: Input }],
    indentationPerLevel: [{ type: Input }],
    externalTemplate: [{ type: Input }],
    context: [{ type: Input }],
    pushRootSectionOnNewLine: [{ type: Input }],
    format: [{ type: Input }],
    onItemSelected: [{ type: Output }],
    onExpandChange: [{ type: Output }],
    controlTemplate: [{ type: ContentChild, args: ['outline',] }],
    outlineItem: [{ type: ViewChild, args: ['renderedItem',] }]
};
function OutlineForComponent_tsickle_Closure_declarations() {
    /**
     * List of items that needs to be rendered. It does not have to in hierarchical order or we
     * leave it up to the application to decide about the structure.
     * @type {?}
     */
    OutlineForComponent.prototype.list;
    /**
     * Tells the component not to render expansion control, in such case we expandAll as a
     * default behavior
     *
     * @type {?}
     */
    OutlineForComponent.prototype.showExpansionControl;
    /**
     * Custom method provided by application to retrieve list of children for current item. If
     * children is undefined then, default 'children' field is used <currentItem>.children
     * @type {?}
     */
    OutlineForComponent.prototype.children;
    /**
     *
     * Option to conditionally render only items that are satisfying filter condition
     *
     * @type {?}
     */
    OutlineForComponent.prototype.filterOut;
    /**
     * Opens all tree nodes.
     *
     * @type {?}
     */
    OutlineForComponent.prototype.expandAll;
    /**
     *  Manages the state for the Outline component. Later on we can provide easier we how to
     *  initialize and set selectionPaths and selectionStates from the application
     *
     * @type {?}
     */
    OutlineForComponent.prototype.state;
    /**
     *
     * Set indentation size to be used for each level
     *
     * @type {?}
     */
    OutlineForComponent.prototype.indentationPerLevel;
    /**
     * In case template is outside of the outlineFor
     * @type {?}
     */
    OutlineForComponent.prototype.externalTemplate;
    /**
     * Reference to current object using this component
     * @type {?}
     */
    OutlineForComponent.prototype.context;
    /** @type {?} */
    OutlineForComponent.prototype.pushRootSectionOnNewLine;
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
     * @type {?}
     */
    OutlineForComponent.prototype.format;
    /**
     *
     * Used when in selection mode to push current selected Item to the application
     *
     * @type {?}
     */
    OutlineForComponent.prototype.onItemSelected;
    /**
     *
     * This event is triggered by OutlineControl when node is expanded or collapsed
     *
     * @type {?}
     */
    OutlineForComponent.prototype.onExpandChange;
    /**
     * A template to use on application level to render individual items
     * @type {?}
     */
    OutlineForComponent.prototype.controlTemplate;
    /** @type {?} */
    OutlineForComponent.prototype.outlineItem;
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
     * @type {?}
     */
    OutlineForComponent.prototype.currentItem;
    /** @type {?} */
    OutlineForComponent.prototype.parentItem;
    /** @type {?} */
    OutlineForComponent.prototype.animationInProgress;
    /** @type {?} */
    OutlineForComponent.prototype.embedded;
    /**
     * Flag that tells us that component is fully rendered
     *
     * @type {?}
     */
    OutlineForComponent.prototype.viewInitialized;
    /** @type {?} */
    OutlineForComponent.prototype.env;
    /** @type {?} */
    OutlineForComponent.prototype._viewContainer;
    /** @type {?} */
    OutlineForComponent.prototype.builder;
    /** @type {?} */
    OutlineForComponent.prototype.element;
}
/**
 *
 * Since we can not directly set `*ngTemplateOutlet` context variables to the typescript class we
 * use this directive to do the Job
 *
 */
export class InitNestingDirective {
    /**
     * @param {?} outline
     */
    constructor(outline) {
        this.outline = outline;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isPresent(this.setLevel)) {
            this.outline.state.currentLevel = this.setLevel;
        }
        if (isPresent(this.setCurrrentItem)) {
            this.outline.currentItem = this.setCurrrentItem;
            if (this.outline.isTreeModelFormat()) {
                this.outline.currentItem['$$parentItem']
                    = (/** @type {?} */ (this.setCurrrentItem)).parent;
            }
        }
        if (!this.outline.isTreeModelFormat() && isPresent(this.setParentItem)) {
            this.outline.currentItem['$$parentItem'] = this.setParentItem;
        }
    }
}
InitNestingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[initNesting]'
            },] },
];
/** @nocollapse */
InitNestingDirective.ctorParameters = () => [
    { type: OutlineForComponent }
];
InitNestingDirective.propDecorators = {
    setLevel: [{ type: Input }],
    setCurrrentItem: [{ type: Input }],
    setParentItem: [{ type: Input }]
};
function InitNestingDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    InitNestingDirective.prototype.setLevel;
    /** @type {?} */
    InitNestingDirective.prototype.setCurrrentItem;
    /** @type {?} */
    InitNestingDirective.prototype.setParentItem;
    /** @type {?} */
    InitNestingDirective.prototype.outline;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS1mb3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvb3V0bGluZS9vdXRsaW5lLWZvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDakcsT0FBTyxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQVksT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0YsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEM3QyxNQUFNLHdCQUF3QixJQUFTO0lBRW5DLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLG1CQUFjLElBQUksRUFBQyxDQUFDO1dBQ2pELFNBQVMsQ0FBQyxtQkFBYyxJQUFJLEVBQUMsQ0FBQyxNQUFNLENBQUM7V0FDckMsU0FBUyxDQUFDLG1CQUFjLElBQUksRUFBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQ2xEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMk43QixNQUFNOzs7O0lBZUYsWUFBb0IsT0FBNEI7UUFBNUIsWUFBTyxHQUFQLE9BQU8sQ0FBcUI7S0FFL0M7Ozs7SUFHRCxRQUFRO1FBRUosRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDbkQ7UUFHRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBRWhELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQztzQkFDbEMsbUJBQWMsSUFBSSxDQUFDLGVBQWUsRUFBQyxDQUFDLE1BQU0sQ0FBQzthQUNwRDtTQUNKO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUNqRTtLQUNKOzs7WUExQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxlQUFlO2FBQzVCOzs7O1lBZ0JnQyxtQkFBbUI7Ozt1QkFaL0MsS0FBSzs4QkFJTCxLQUFLOzRCQUlMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7YW5pbWF0ZSwgQW5pbWF0aW9uQnVpbGRlciwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7YXNzZXJ0LCBFbnZpcm9ubWVudCwgSWRlbnRpdHksIGlzQmxhbmssIGlzUHJlc2VudCwgTGlzdFdyYXBwZXJ9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7T3V0bGluZVN0YXRlfSBmcm9tICcuL291dGxpbmUtc3RhdGUnO1xuXG5cbi8qKlxuICogVGhpcyBpbnRlcmZhY2UgcmVwcmVzZW50IGNvbmNyZXRlIHRyZWUgc3RydWN0dXJlIGZvciB0aGUgb3V0bGluZSB0cmVlIG1vZGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBPdXRsaW5lTm9kZSBleHRlbmRzIElkZW50aXR5XG57XG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHRvIHBhcmVudCBub2RlLlxuICAgICAqL1xuICAgIHBhcmVudDogT3V0bGluZU5vZGU7XG5cbiAgICAvKipcbiAgICAgKiBOb2RlJ3MgY2hpbGRyZW4uIEV2ZW4gaXRzIGEgZmllbGQgaXQgY2FuIGJlIGltcGxlbWVudGVkIGxhemlseSB1c2luZyBnZXR0ZXIgd2hlcmUgYSB0YXJnZXRcbiAgICAgKiBvYmplY3QgZG9lcyBub3QgaW1wbGVtZW50IHRoaXMgYXMgYSBwdWJsaWMgZmllbGQgYnV0IGEgZ2V0dGVyIHdpdGggY29udHJvbCBvdmVyIHRoZVxuICAgICAqIHJldHJpZXZlZCBsaXN0XG4gICAgICovXG4gICAgY2hpbGRyZW46IE91dGxpbmVOb2RlW107XG5cbiAgICAvKipcbiAgICAgKiBEaWZmZXJlbnQgc3RhdGVzIGZvciBvdXRsaW5lIE5vZGVcbiAgICAgKlxuICAgICAqIGlzRXhwYW5kZWQ6IGJvb2xlYW47PSBtb3Zpbmcgb3V0IGFzIHRoaXMgaXMgbWFuYWdlZCBieSBleHBhbnNpb25zdGF0ZS5cbiAgICAgKi9cbiAgICBpc0V4cGFuZGVkOiBib29sZWFuO1xuICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW47XG4gICAgaXNNYXRjaD86IGJvb2xlYW47XG4gICAgcmVhZG9ubHk/OiBib29sZWFuO1xuICAgIHR5cGU/OiBzdHJpbmc7XG4gICAgZHJhZ2dhYmxlPzogYm9vbGVhbjtcbiAgICBkcm9wcGFibGU/OiBib29sZWFuO1xuICAgIHZpc2libGU/OiBib29sZWFuO1xuXG59XG5cblxuLyoqXG4gKlxuICogQ2hlY2tzIHR5cGUgZm9yIE91dGxpbmVOb2RlXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPdXRsaW5lTm9kZShub2RlOiBhbnkpOiBub2RlIGlzIE91dGxpbmVOb2RlXG57XG4gICAgcmV0dXJuIGlzUHJlc2VudChub2RlKSAmJiBpc1ByZXNlbnQoKDxPdXRsaW5lTm9kZT5ub2RlKSlcbiAgICAgICAgJiYgaXNQcmVzZW50KCg8T3V0bGluZU5vZGU+bm9kZSkucGFyZW50KVxuICAgICAgICAmJiBpc1ByZXNlbnQoKDxPdXRsaW5lTm9kZT5ub2RlKS5jaGlsZHJlbik7XG59XG5cblxuLyoqXG4gKiBDdXJyZW50bHkgb3V0bGluZSBzdXBwb3J0cyBvbmx5IHR3byBtb2RlcyBmcmVlLCB3aGVyZSBhcHBsaWNhdGlvbiBpcyByZXNwb25zaWJsZSB0byByZXRyaWV2ZVxuICogY2hpbGRyZW4gZm9yIGVhY2ggbm9kZSBhbmQgdHJlZSB3aXRoIGFib3ZlIE91dGxpbmVOb2RlIHN0cnVjdHVyZVxuICovXG5leHBvcnQgdHlwZSBNb2RlbEZvcm1hdCA9ICdmcmVlJyB8ICd0cmVlJztcblxuXG4vKipcbiAqXG4gKiBPdXRsaW5lRm9yQ29tcG9uZW50IGlzIGxpa2UgbmdGb3IsIGJ1dCBmb3IgaGllcmFyY2hpY2FsIChvdXRsaW5lL3RyZWUpIHN0cnVjdHVyZXMgLS0gaS5lLiBpblxuICogdGhvc2UgY2FzZXMgd2hlcmUgYW4gaXRlbSBtYXkgaGF2ZSBjaGlsZHJlbi5cbiAqXG4gKlxuICogSXQgdXNlcyBvdXRsaW5lIGA8YXctb3V0bGluZS1jb250cm9sPmAgdG8gcHJvdmlkZSBleHBhbmRpbmcgZnVuY3Rpb25hbGl0eSwgaW5kZW50YXRpb25cbiAqIGFuZCBvdGhlciB0aGluZ3MuXG4gKlxuICpcbiAqIFRoaXMgY29tcG9uZW50IGhhcyBtaW5pbWFsIHN0eWxpbmcgdG8gbWFrZSBzdXJlIGl0IGNhbiBiZSBjaGFuZ2VkIGVhc2lseS5cbiAqXG4gKiAjIyMgRXhhbXBsZSByZW5kZXJpbmcgdHJlZSBzZWN0aW9uLCB3aGVyZSBiYXNlZCBvbiB0aGUgdHlwZSB3ZSBmb3JtYXQgdGhlIG91dCBwbHVzXG4gKiBmb3IgdGhlIG1haW4gcm9vdCBzZWN0aW9uIHdlIGFsd2F5cyByZW5kZXIgbGl0dGxlIHBvcHVwIG1lbnUuXG4gKlxuICogYGBgXG4gKlxuICogICA8YXctb3V0bGluZS1mb3IgW2xpc3RdPVwibGlzdFwiIFtoYXNDaGlsZHJlbl09XCJoYXNDaGlsZHJlblwiPlxuICpcbiAqICAgICAgIDxuZy10ZW1wbGF0ZSAjb3V0bGluZSBsZXQtaXRlbT5cbiAqXG4gKiAgICAgICAgICAgPGRpdiBjbGFzcz1cIm15LXNlY3Rpb25cIj5cbiAqICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm91dGxpbmVcIj5cbiAqICAgICAgICAgICAgICAgICAgIDxhdy1vdXRsaW5lLWNvbnRyb2w+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiaXRlbS50eXBlXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdTd2l0Y2hDYXNlXT1cIid0ZXh0J1wiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFzLXBhcmFncmFmXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tpdGVtPy5jb250ZW50fX1cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICpcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ1N3aXRjaERlZmF1bHQ+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2l0ZW0/LmNvbnRlbnR9fVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICpcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gKlxuICpcbiAqICAgICAgICAgICAgICAgICAgIDwvYXctb3V0bGluZS1jb250cm9sPlxuICogICAgICAgICAgICAgICA8L2Rpdj5cbiAqXG4gKiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWx0ZXJzXCIgKm5nSWY9XCJpdGVtLnR5cGUgPT09ICdzZWN0aW9uJ1wiID5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICA8YXctaG92ZXItY2FyZCBbbGlua1RpdGxlXT1cIidGaWx0ZXIgSXRlbXMnXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgPGF3LWxpc3QgW2xpc3RdPVwiZmlsdGVySXRlbXNcIiBbYm9yZGVybGVzc109XCJ0cnVlXCI+PC9hdy1saXN0PlxuICogICAgICAgICAgICAgICAgICAgPC9hdy1ob3Zlci1jYXJkPlxuICpcbiAqICAgICAgICAgICAgICAgPC9kaXY+XG4gKiAgICAgICAgICAgPC9kaXY+XG4gKiAgICAgPC9uZy10ZW1wbGF0ZT5gXG4gKiAgIDwvYXctb3V0bGluZS1mb3I+XG4gKlxuICogYGBgXG4gKlxuICpcbiAqIFdlIGNhbiB1c2UgaXQgYWxzbyBpbiBlbWJlZGRlZCBtb2RlIHdoZXJlIHdlIHVzZSB0aGUgYGF3T3V0bGluZUZvcmAgZGlyZWN0aXZlXG4gKlxuICogIyMgRXhhbXBsZVxuICpcbiAqXG4gKiBgYGBgXG4gKiAgPHRhYmxlICBjbGFzcz1cInRyZWUtdGFibGVcIiA+XG4gKiAgICAgIDx0aGVhZD5cbiAqICAgICAgICAgIDx0cj5cbiAqICAgICAgICAgICAgICA8dGg+TmFtZTwvdGg+XG4gKiAgICAgICAgICAgICAgPHRoPlR5cGU8L3RoPlxuICogICAgICAgICAgPC90cj5cbiAqICAgICAgPC90aGVhZD5cbiAqICAgICAgPHRib2R5ICNvb28yIGF3T3V0bGluZUZvciBbbGlzdF09XCJsaXN0XCJcbiAqICAgICAgICAgICAgIFtoYXNDaGlsZHJlbl09XCJoYXNDaGlsZHJlblwiXG4gKiAgICAgICAgICAgICBjbGFzcz1cIm91dGxpbmUtdGFibGVcIlxuICogICAgICA+XG4gKiAgICAgICAgICA8bmctdGVtcGxhdGUgI291dGxpbmUgbGV0LWl0ZW0+XG4gKiAgICAgICAgICAgICAgPHRyPlxuICogICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJpdGVtLW5hbWUgb3V0bGluZS1hbmltYXRpb25cIj5cbiAqICAgICAgICAgICAgICAgICAgICAgIDxkaXY+PGF3LW91dGxpbmUtY29udHJvbD5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICB7e2l0ZW0/LmNvbnRlbnR9fVxuICogICAgICAgICAgICAgICAgICAgICAgPC9hdy1vdXRsaW5lLWNvbnRyb2w+PC9kaXY+XG4gKiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gKiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cIml0ZW0tdHlwZSBvdXRsaW5lLWFuaW1hdGlvblwiPlxuICogICAgICAgICAgICAgICAgICAgICAgPGRpdj57e2l0ZW0udHlwZX19PC9kaXY+XG4gKiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gKiAgICAgICAgICAgICAgPC90cj5cbiAqICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKiAgICAgIDwvdGJvZHk+XG4gKiAgPC90YWJsZT5cbiAqXG4gKiBgYGBcbiAqXG4gKiBJIHdhcyB0aGlua2luZyBtYXliZSBmb3IgZmlyc3QgdGltZSB3ZSBkb24ndCBuZWVkIHRoZSBzYW1lIGFuaW1hdGlvbiBsaWtlIGV4cGFuZGluZyBhbmRcbiAqIGNvbGxhcHNpbmcuIE1heWJlIHdlIG5lZWQgZmFkZS1pbi4gSW4gc3VjaCBjYXNlIEkgd291bGQgcHJvYmFibHkgYXBwbHkgQHNlY3Rpb24gYW5pbSBvbmx5XG4gKiBvbiBpdGVtcyB3aGVyZSBsZXZlbCA+IDAgKGluIHRoZSB0ZW1wbGF0ZSBJIGtlZXAgbGV2ZWxzKSBhbmQgaWYgbGV2ZWwgPT0gMCB0aGVuIEkgd291bGRcbiAqIGV4ZWN1dGUgdGhlIHNhbWUgcmVuZGVyaW5nIGp1c3Qgd2l0aG91dCBbQHNlY3Rpb25dXG4gKlxuICpcbiAqIFRvZG86IFRoaW5rIGFib3V0IGhvdyB0byBkbyBhbmltYXRpb24gZm9yIHRoZSB0YWJsZSBjYXNlLiBNdXN0IGFsc28gd3JpdGUgdW5pdGVzdCAtIGR1ZSB0b1xuICogQXJpYmFMaXZlIGFnZ3Jlc3NpdmUgc2NoZWR1bGUgd2UgYXJlIHNraXBwaW5nIHRoZW0gZm9yIG5vd1xuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1vdXRsaW5lLWZvciwgW2F3T3V0bGluZUZvcl0nLFxuICAgIHRlbXBsYXRlOiBgPCEtLVxuICAgIFN0YXJ0cyB3aXRoIHRoZSBsaXN0LCB3aGVyZSBuZXN0aW5nTGV2ZWwgaXMgLTEuXG4gICAgY2FsbCB0ZW1wbGF0ZSBvdXRsaW5lSXRlbXMgdG8gaXRlcmF0ZSBhbmQgcmVuZGVyIGVhY2ggaXRlbVxuLS0+XG48bmctY29udGFpbmVyIFtuZ0lmXT1cImxpc3RcIiAqbmdUZW1wbGF0ZU91dGxldD1cIm91dGxpbmVJdGVtcztcbiAgICAgICAgICAgIGNvbnRleHQ6eyAkaW1wbGljaXQ6IGxpc3QsIG5lc3RpbmdMZXZlbDogMCwgcGFyZW50SXRlbTogbnVsbCwgZXhwYW5kZWQ6IHRydWV9XCI+XG48L25nLWNvbnRhaW5lcj5cblxuPCEtLVxuICAgIE1haW4gRW50cnkgcG9pbnQgZm9yIHRoZSByZWN1cnNpb24uIHRoaXMgaXMgY2FsbGVkIGJ5IHRoZSBibG9jayBhYm92ZSBhcyB3ZWxsIGFzIGJ5dCB0aGUgaW5uZXJcbiAgICBwaWVjZSB0aGF0IGNhbGxzIHRoaXMgdGVtcGxhdGUgcmVjdXJzaXZlbHkgYWdhaW4gd2hlbiBhbiBpdGVtIGhhcyBjaGlsZHJlblxuLS0+XG48bmctdGVtcGxhdGUgI291dGxpbmVJdGVtcyBsZXQtY2hpbGRyZW4gbGV0LW5lc3RpbmdMZXZlbD1cIm5lc3RpbmdMZXZlbFwiXG4gICAgICAgICAgICAgbGV0LXBhcmVudD1cInBhcmVudEl0ZW1cIiBsZXQtZXhwYW5kZWQ9XCJleHBhbmRlZFwiPlxuXG4gICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1pdGVtIFtuZ0Zvck9mXT1cImNoaWxkcmVuXCIgbGV0LXJvd0luZGV4PVwiaW5kZXhcIj5cblxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwib3V0bGluZUl0ZW07XG4gICAgICAgICAgICBjb250ZXh0OnsgJGltcGxpY2l0OiBpdGVtLCBuZXN0aW5nTGV2ZWw6IG5lc3RpbmdMZXZlbCwgcGFyZW50SXRlbTogcGFyZW50LFxuICAgICAgICAgICAgZXhwYW5kZWQ6IGV4cGFuZGVkLCByb3dJbmRleDpyb3dJbmRleH1cIj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgPCEtLVxuXG4gICAgICAgICAgICBSZWN1cnNpb24gcGllY2U6XG5cbiAgICAgICAgICAgIEZvciBub24gZW1iZWRkZWQgY2FzZSB3aGVuIGV2ZW4gaWYgaXRzIG5vdCBleHBhbmRlZCB3ZSBuZWVkIHRvIGl0ZXJhdGUgY2hpbGRyZW5cbiAgICAgICAgICAgIGFzIHdlIHdhbnQgdG8gYXBwbHkgYW5pbWF0aW9uIHRoYXQgc2hvdWxkIGdvIHdpdGggbmdJZiB3aGljaCBpbnNpZGUgdGhlIG91dGluZUl0ZW1cbiAgICAgICAgICAgIHRlbXBsYXRlXG5cbiAgICAgICAgICAgIERvbnQgcmVjdXJzZS8gcmVuZGVyIGl0ZW1zIHRoYXQgYXJlIG5vdCB2aXNpYmxlLlxuICAgICAgICAtLT5cblxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaGFzQ2hpbGRyZW4oaXRlbSkgJiYgKGlzRXhwYW5kZWQoaXRlbSwgbmVzdGluZ0xldmVsKSB8fCAhZW1iZWRkZWQpICYmIGlzVmlzaWJsZShpdGVtKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm91dGxpbmVJdGVtcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6eyAkaW1wbGljaXQ6IGNoaWxkcmVuRm9ySXRlbShpdGVtKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVzdGluZ0xldmVsOiBuZXN0aW5nTGV2ZWwrMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWQ6IGlzRXhwYW5kZWQoaXRlbSwgbmVzdGluZ0xldmVsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50SXRlbTppdGVtIH1cIj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvbmctdGVtcGxhdGU+XG48L25nLXRlbXBsYXRlPlxuXG5cbjwhLS1cbiAgICBSZW5kZXJzIGFjdHVhbCBvdXRsaW5lIG5vZGUgYW5kIGFwcGxpZXMgYW5pbWF0aW9uIHdoaWxlIGV4cGFuZGluZyBhbmQgY29sbGFwc2luZ1xuXG4gICAgW0BzZWN0aW9uXT1cImV4cGFuZGVkIHx8IGlzRXhwYW5kZWQoaXRlbSkgPyAndmlzaWJsZScgOiAnaGlkZGVuJ1wiXG4tLT5cbjxuZy10ZW1wbGF0ZSAjb3V0bGluZUl0ZW0gbGV0LWl0ZW0gbGV0LW5lc3RpbmdMZXZlbD1cIm5lc3RpbmdMZXZlbFwiIGxldC1wYXJlbnQ9XCJwYXJlbnRJdGVtXCJcbiAgICAgICAgICAgICBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiXG4gICAgICAgICAgICAgbGV0LWV4cGFuZGVkPVwiZXhwYW5kZWRcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJ3LW91dGxpbmUtaXRlbVwiXG4gICAgICAgICAqbmdJZj1cIiFlbWJlZGRlZCAmJiBleHBhbmRlZFwiXG4gICAgICAgICBbc3R5bGUucGFkZGluZy1sZWZ0LnB4XT1cImluZGVudGF0aW9uKG5lc3RpbmdMZXZlbClcIlxuICAgICAgICAgaW5pdE5lc3RpbmcgW3NldExldmVsXT1cIm5lc3RpbmdMZXZlbFwiIFtzZXRQYXJlbnRJdGVtXT1cInBhcmVudFwiXG4gICAgICAgICBbc2V0Q3VycnJlbnRJdGVtXT1cIml0ZW1cIlxuICAgICAgICAgW0BzZWN0aW9uXVxuICAgICAgICAgKEBzZWN0aW9uLmRvbmUpPVwib25BbmltYXRpb25Eb25lKCRldmVudClcIj5cblxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udHJvbFRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDp7ICRpbXBsaWNpdDogaXRlbSwgbmVzdGluZ0xldmVsOiBuZXN0aW5nTGV2ZWwsIHJvd0luZGV4OnJvd0luZGV4IH1cIj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tXG4gICAgICAgIFdoZW4gb3V0bGluZSBjb250cm9sIGlzIHVzZWQgYXMgZW1iZWRkZWQgbWVhbmluZyBpdHMgaW5zaWRlIGUuLmcgZGF0YXRhYmxlIHdlXG4gICAgICAgIGNhbm5vdCBoYXZlIGFueSB0YWdzIGFyb3VuZCBpdC5cblxuICAgICAgICBUb2RvOiBSZWZhY3RvciB0aGlzIGluIHRoZSB3YXkgc28gd2UgY2FuIGRvIGFuaW1hdGlvbiB3aGVuIHRhYmxlIGxpbmVzIGFyZVxuICAgICAgICBleHBhbmRlZC4gU2luY2UgaXRzIGVtYmVkZGVkIHdlIGNhbiBub3QgaGF2ZSBhbnkgd3JhcHBpbmcgZWxlbWVudCBhcm91bmQsIHRoZSB0ZW1wbGF0ZVxuICAgICAgICBpcyBmdWxseSByZXNwb25zaWJsZVxuICAgIC0tPlxuICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJlbWJlZGRlZCAmJiBleHBhbmRlZFwiXG4gICAgICAgICAgICAgICAgIGluaXROZXN0aW5nIFtzZXRMZXZlbF09XCJuZXN0aW5nTGV2ZWxcIiBbc2V0UGFyZW50SXRlbV09XCJwYXJlbnRcIlxuICAgICAgICAgICAgICAgICBbc2V0Q3VycnJlbnRJdGVtXT1cIml0ZW1cIlxuICAgID5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAjcmVuZGVyZWRJdGVtICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udHJvbFRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDp7ICRpbXBsaWNpdDogaXRlbSwgbmVzdGluZ0xldmVsOiBuZXN0aW5nTGV2ZWwsIHJvd0luZGV4OnJvd0luZGV4ICB9XCI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbjwvbmctdGVtcGxhdGU+XG5cblxuYCxcbiAgICBzdHlsZXM6IFtgLmlzLW91dGxpbmUtYW5pbWF0aW9uPmRpdiw6Om5nLWRlZXAgLnctb3V0bGluZS1pdGVte292ZXJmbG93OmhpZGRlbn1gXSxcblxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignc2VjdGlvbicsIFtcbiAgICAgICAgICAgIHN0YXRlKCcqJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgICdvdmVyZmxvdy15JzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6ICcqJyxcbiAgICAgICAgICAgICAgICAnb3BhY2l0eSc6ICcxJ1xuXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogJzAnLFxuICAgICAgICAgICAgICAgICdvcGFjaXR5JzogJzAnLFxuICAgICAgICAgICAgICAgICdvdmVyZmxvdy15JzogJ2hpZGRlbidcblxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgYW5pbWF0ZSgnMjAwbXMgZWFzZS1vdXQnKSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBhbmltYXRlKCcyMDBtcyBlYXNlLWluJykpXG4gICAgICAgIF0pLFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgT3V0bGluZUZvckNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgaXRlbXMgdGhhdCBuZWVkcyB0byBiZSByZW5kZXJlZC4gSXQgZG9lcyBub3QgaGF2ZSB0byBpbiBoaWVyYXJjaGljYWwgb3JkZXIgb3Igd2VcbiAgICAgKiBsZWF2ZSBpdCB1cCB0byB0aGUgYXBwbGljYXRpb24gdG8gZGVjaWRlIGFib3V0IHRoZSBzdHJ1Y3R1cmUuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBsaXN0PzogYW55W107XG5cblxuICAgIC8qKlxuICAgICAqIFRlbGxzIHRoZSBjb21wb25lbnQgbm90IHRvIHJlbmRlciBleHBhbnNpb24gY29udHJvbCwgaW4gc3VjaCBjYXNlIHdlIGV4cGFuZEFsbCBhcyBhXG4gICAgICogZGVmYXVsdCBiZWhhdmlvclxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93RXhwYW5zaW9uQ29udHJvbDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBDdXN0b20gbWV0aG9kIHByb3ZpZGVkIGJ5IGFwcGxpY2F0aW9uIHRvIHJldHJpZXZlIGxpc3Qgb2YgY2hpbGRyZW4gZm9yIGN1cnJlbnQgaXRlbS4gSWZcbiAgICAgKiBjaGlsZHJlbiBpcyB1bmRlZmluZWQgdGhlbiwgZGVmYXVsdCAnY2hpbGRyZW4nIGZpZWxkIGlzIHVzZWQgPGN1cnJlbnRJdGVtPi5jaGlsZHJlblxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2hpbGRyZW46ICh2YWx1ZTogYW55KSA9PiBhbnlbXTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogT3B0aW9uIHRvIGNvbmRpdGlvbmFsbHkgcmVuZGVyIG9ubHkgaXRlbXMgdGhhdCBhcmUgc2F0aXNmeWluZyBmaWx0ZXIgY29uZGl0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGZpbHRlck91dDogKHZhbHVlOiBhbnkpID0+IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqIE9wZW5zIGFsbCB0cmVlIG5vZGVzLlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBleHBhbmRBbGw6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgLyoqXG4gICAgICogIE1hbmFnZXMgdGhlIHN0YXRlIGZvciB0aGUgT3V0bGluZSBjb21wb25lbnQuIExhdGVyIG9uIHdlIGNhbiBwcm92aWRlIGVhc2llciB3ZSBob3cgdG9cbiAgICAgKiAgaW5pdGlhbGl6ZSBhbmQgc2V0IHNlbGVjdGlvblBhdGhzIGFuZCBzZWxlY3Rpb25TdGF0ZXMgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc3RhdGU6IE91dGxpbmVTdGF0ZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2V0IGluZGVudGF0aW9uIHNpemUgdG8gYmUgdXNlZCBmb3IgZWFjaCBsZXZlbFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpbmRlbnRhdGlvblBlckxldmVsOiBudW1iZXIgPSAyNTtcblxuXG4gICAgLyoqXG4gICAgICogSW4gY2FzZSB0ZW1wbGF0ZSBpcyBvdXRzaWRlIG9mIHRoZSBvdXRsaW5lRm9yXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBleHRlcm5hbFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgdG8gY3VycmVudCBvYmplY3QgdXNpbmcgdGhpcyBjb21wb25lbnRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbnRleHQ6IGFueTtcblxuXG4gICAgQElucHV0KClcbiAgICBwdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSWRlbnRpZmllcyBjdXJyZW50IG1vZGVsIG1vZGUuXG4gICAgICpcbiAgICAgKiBXZSByZWNvZ25pemUgdHdvIG1vZGVzOlxuICAgICAqXG4gICAgICogRnJlZSAtIEFwcGxpY2F0aW9uIG5lZWRzIHRvIGltcGxlbWVudCBhIGNoaWxkcmVuIG1ldGhvZCB0byByZXRyaWV2ZSBhIGxpc3Qgb2YgY2hpbGRyZW4gZm9yXG4gICAgICogZWFjaCBub2RlIGFuZCBmb3JtYXQgaXMgcHJldHR5IG11Y2ggdXB0IHRvIHRoZSBhcHBsaWNhdGlvblxuICAgICAqXG4gICAgICogVHJlZSAtIHRoaXMgaXMgbW9yZSByZXN0cmljdGl2ZSB3aGVyZSB3ZSBoYXZlIGNvbmNyZXRlIGRhdGEgc3RydWN0dXJlXG4gICAgICogaW50ZXJmYWNlIHRoYXQgbmVlZHMgdG8gYmUgZm9sbGVkXG4gICAgICpcbiAgICAgKiB0b2RvOiBpbnN0ZWFkIG9mIHBhc3NpbmcgZm9ybWF0IGJpbmRpbmcgdHJ5IHRvIGxvb2sgaW50byB0aGUgbGlzdCB0byBzZWUgd2hhdCB0eXBlIHNvXG4gICAgICogd2UgZG9udCBtYWtlIGl0IG1hbmRhdG9yeVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBmb3JtYXQ6IE1vZGVsRm9ybWF0ID0gJ2ZyZWUnO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBVc2VkIHdoZW4gaW4gc2VsZWN0aW9uIG1vZGUgdG8gcHVzaCBjdXJyZW50IHNlbGVjdGVkIEl0ZW0gdG8gdGhlIGFwcGxpY2F0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkl0ZW1TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVGhpcyBldmVudCBpcyB0cmlnZ2VyZWQgYnkgT3V0bGluZUNvbnRyb2wgd2hlbiBub2RlIGlzIGV4cGFuZGVkIG9yIGNvbGxhcHNlZFxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25FeHBhbmRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogQSB0ZW1wbGF0ZSB0byB1c2Ugb24gYXBwbGljYXRpb24gbGV2ZWwgdG8gcmVuZGVyIGluZGl2aWR1YWwgaXRlbXNcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdvdXRsaW5lJylcbiAgICBjb250cm9sVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIEBWaWV3Q2hpbGQoJ3JlbmRlcmVkSXRlbScpXG4gICAgb3V0bGluZUl0ZW06IEVsZW1lbnRSZWY7XG5cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsc1xuICAgICAqXG4gICAgICogY3VycmVudEl0ZW0gYW5kIHBhcmVudEl0ZW0gYXJlIHVzZWQgdG8gY2FwdHVyZSBjdXJyZW50IHByb2Nlc3NlZCBpdGVtIG9mIG5nRm9yLiBUaGlzIGlzXG4gICAgICogc2V0IGJ5IGRpcmVjdGl2ZSBgSW5pdE5lc3RpbmdEaXJlY3RpdmVgXG4gICAgICpcbiAgICAgKiBhbmltYXRpb25JblByb2dyZXNzOiB1c2VkIGJ5IGFuaW1hdGlvbiBlbmdpbmUgdG8gbWFrZSBzdXJlIHdlIGRvbnQgZG8gYW55IGFjdGlvbnMgd2hpbGVcbiAgICAgKiBhbmltYXRpb24gaXMgaW4gdGhlIHByb2dyZXNzXG4gICAgICpcbiAgICAgKiBlbWJlZGRlZDogSW5kaWNhdGVzIHRoYXQgd2UgYXJlIHVzaW5nIGRpcmVjdGl2ZSBzbyBpdCB3aWxsIG5vdCBoYXZlIGRlZmF1bHQgY29tcG9uZW50XG4gICAgICogd3JhcHBlclxuICAgICAqXG4gICAgICovXG4gICAgY3VycmVudEl0ZW06IGFueTtcbiAgICBwYXJlbnRJdGVtOiBhbnk7XG4gICAgYW5pbWF0aW9uSW5Qcm9ncmVzczogYm9vbGVhbjtcbiAgICBlbWJlZGRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogRmxhZyB0aGF0IHRlbGxzIHVzIHRoYXQgY29tcG9uZW50IGlzIGZ1bGx5IHJlbmRlcmVkXG4gICAgICpcbiAgICAgKi9cbiAgICB2aWV3SW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGJ1aWxkZXI6IEFuaW1hdGlvbkJ1aWxkZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmKVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5zdGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBuZXcgT3V0bGluZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5zdGF0ZS5vdXRsaW5lRm9yKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5vdXRsaW5lRm9yID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmV4cGFuZEFsbCkge1xuICAgICAgICAgICAgdGhpcy5zaG93RXhwYW5zaW9uQ29udHJvbCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZS5pc0V4cGFuZGVkQWxsID0gdGhpcy5leHBhbmRBbGw7XG5cbiAgICAgICAgLy8gaW4gY2FzZSB3ZSB3YW50IHRvIHJlbmRlciBjb250ZW50IG9mIHRyZWUgb3V0c2lkZSBvZiBvdXRsaW5lRm9yXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5leHRlcm5hbFRlbXBsYXRlKSkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sVGVtcGxhdGUgPSB0aGlzLmV4dGVybmFsVGVtcGxhdGU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVtYmVkZGVkID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKCdhd291dGxpbmVmb3InKTtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmNvbnRleHQpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIG5nRG9DaGVjaygpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ0RvQ2hlY2soKTtcbiAgICB9XG5cbiAgICBpc1RyZWVNb2RlbEZvcm1hdCgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQgPT09ICd0cmVlJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGJ5IHRlbXBsYXRlIGFuZCBPdXRsaW5lQ29udHJvbCB0byBpZGVudGlmeSB3aGljaCBpdGVtIGlzIGV4cGFuZGVkIGFuZCBjb2xsYXBzZWRcbiAgICAgKlxuICAgICAqL1xuICAgIGlzRXhwYW5kZWQoaXRlbTogYW55LCBjdXJyZW50TGV2ZWw6IG51bWJlciA9IC0xKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKGN1cnJlbnRMZXZlbCA9PT0gMCAmJiB0aGlzLnB1c2hSb290U2VjdGlvbk9uTmV3TGluZSkge1xuICAgICAgICAgICAgLy8gYWx3YXlzIG92ZXJyaWRlL3Jlc2V0IGZvciByb290IG5vZGVzXG4gICAgICAgICAgICBpZiAodGhpcy5pc1RyZWVNb2RlbEZvcm1hdCgpKSB7XG4gICAgICAgICAgICAgICAgKDxPdXRsaW5lTm9kZT5pdGVtKS5pc0V4cGFuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmlzRXhwYW5kZWQoaXRlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTaW5jZSB3ZSBoYXZlIGN1cnJlbnRseSB0d28gd2F5cyBob3cgdG8gcGFzcyBjaGlsZHJlbiBpdGVtcyB3ZSBuZWVkIGhhdmUgdGhpcyBtZXRob2QgdG9cbiAgICAgKiB1bmlmeSB0aGUgd2F5IGhvdyB3ZSBhY2Nlc3MgaXQuIElmIHdlIHBhc3MgYGNoaWxkcmVuYCBiaW5kaW5nIHdlIHVzZSB0aGlzIGluc3RlYWQsIG90aGVyd2lzZVxuICAgICAqIHdlIGV4cGVjdCBjdXJyZW50IG9iamVjdCB0byBoYXZlIGBjaGlsZHJlbmAgZmllbGRcbiAgICAgKlxuICAgICAqL1xuICAgIGNoaWxkcmVuRm9ySXRlbShpdGVtOiBhbnkpOiBhbnlbXVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuaXNUcmVlTW9kZWxGb3JtYXQoKSkge1xuICAgICAgICAgICAgcmV0dXJuICg8T3V0bGluZU5vZGU+aXRlbSkuY2hpbGRyZW4gfHwgW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXNDaGlsZHJlbihpdGVtKSA/IHRoaXMuZG9HZXRDaGlsZHJlbihpdGVtKSA6IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENoZWNrIGlmIHRoZSBjdXJyZW50IGl0ZW0gaGFzIGEgY2hpbGRyZW4gYW5kIG5lZWRzIHRvIGJlIHJlbmRlcmVkXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNDaGlsZHJlbihpdGVtOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAodGhpcy5pc1RyZWVNb2RlbEZvcm1hdCgpKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSAoPE91dGxpbmVOb2RlPml0ZW0pLmNoaWxkcmVuO1xuICAgICAgICAgICAgcmV0dXJuIGlzUHJlc2VudChjaGlsZHJlbikgJiYgY2hpbGRyZW4ubGVuZ3RoID4gMDtcblxuICAgICAgICB9IGVsc2UgaWYgKGlzQmxhbmsodGhpcy5jaGlsZHJlbikgJiYgaXNCbGFuayhpdGVtLmNoaWxkcmVuKSkge1xuICAgICAgICAgICAgYXNzZXJ0KGZhbHNlLCAnTWlzc2luZyBbY2hpbGRyZW5dIG1ldGhvZCBiaW5kaW5nJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5kb0dldENoaWxkcmVuKGl0ZW0pLmxlbmd0aCA+IDA7XG5cbiAgICB9XG5cbiAgICBkb0dldENoaWxkcmVuKGl0ZW06IGFueSk6IGFueVtdXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5hcHBseSh0aGlzLmNvbnRleHQsIFtpdGVtXSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiAgVXNlcyB0aGUgYE91dGxpbmVTdGF0ZWAgdG8gdG9nZ2xlIHN0YXRlIG9mIGN1cnJlbnQgc2VsZWN0aW9uUGF0aC4gVGhlIGBzZWxlY3Rpb25QYXRoYCBpc1xuICAgICAqICBwdXQgdG9nZXRoZXIgaW5zaWRlIGBPdXRsaW5lQ29udHJvbGAgd2hlcmUgd2UgaXRlcmF0ZSBhbGwgdGhlIHdheSB0byB0aGUgcm9vdCBhbmQgYWRkXG4gICAgICogIGVhY2ggaXRlbSB0byB0aGUgYGN1cnJlbnRQYXRoYCBhcnJheS4gVGhpcyB3YXkgd2UgY29sbGVjdCBsaXN0IG9mIGl0ZW0gcmVwcmVzZW50aW5nIGN1cnJlbnRcbiAgICAgKiAgY3VycmVudCBleHBhbnNpb25QYXRoLlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICB0b2dnbGVFeHBhbnNpb24oKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uSW5Qcm9ncmVzcykge1xuICAgICAgICAgICAgLy8gYmFja3VwIHByb2NlZHVyZSBpbiBjYXNlIG9uQW5pbWF0aW9uRG9uZSBmYWlsc1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbkluUHJvZ3Jlc3MpIHsgLy8gY2hhbmdlIG9ubHkgaWYgaXRzIGZhaWxzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZW1iZWRkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VycmVudEl0ZW0gPSBMaXN0V3JhcHBlci5sYXN0KHRoaXMuc3RhdGUuY3VycmVudFBhdGgpO1xuICAgICAgICB0aGlzLnN0YXRlLnRvZ2dsZUV4cGFuc2lvbih0aGlzLnN0YXRlLmN1cnJlbnRQYXRoLCB0aGlzLmNoaWxkcmVuRm9ySXRlbShjdXJyZW50SXRlbSkpO1xuXG4gICAgICAgIGlmICh0aGlzLmVtYmVkZGVkKSB7XG4gICAgICAgICAgICAvLyB0aGlzLmFuaW1hdGVFbWJlZGRlZEl0ZW0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQW5ndWxhciBhbmltLiBjYWxsYmFjayB0aGF0IHNldHMgYmFjayB0aGUgZmxhZyB0byBtYWtlIHN1cmUgd2UgZG9uJ3QgdHJpZ2dlciBhbmltYXRpb25zXG4gICAgICogd2hlbiBvbmUgaXMgaW4gcHJvZ3Jlc3MuXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkFuaW1hdGlvbkRvbmUoZXZlbnQ6IEV2ZW50KVxuICAgIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25JblByb2dyZXNzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlZCBpbmRlbnRhdGlvbiB1c2VkIHRvIHNoaWZ0IHRoZSBuZXN0ZWQgc2VjdGlvbiB0byB0aGUgcmlnaHQgb3IgbGF0ZXIgb24gdG8gdGhlXG4gICAgICogbGVmdCB3aGVuIFJUTCBpcyBzdXBwb3J0ZWRcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgaW5kZW50YXRpb24oY3VycmVudExldmVsOiBudW1iZXIpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLnB1c2hSb290U2VjdGlvbk9uTmV3TGluZSAmJiBjdXJyZW50TGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICBjdXJyZW50TGV2ZWwgLT0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoY3VycmVudExldmVsID09PSAwICYmIHRoaXMucHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lKVxuICAgICAgICAgICAgPyAwIDogKHRoaXMuaW5kZW50YXRpb25QZXJMZXZlbCAqIGN1cnJlbnRMZXZlbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTm90IGFsbCByb3dzIGFyZSB2aXNpYmxlIGJ5IGRlZmF1bHQsIHRoZXJlIGNhbiBiZSBhIGNhc2Ugd2hlcmUgeW91IGRvbnQgd2FudCB0byByZW5kZXIgaXRlbXNcbiAgICAgKiB1c2luZyBvdXRsaW5lLiBlLmcuIERhdGF0YWJsZSB3aXRoIGRldGFpbCByb3cuXG4gICAgICovXG4gICAgaXNWaXNpYmxlKGl0ZW06IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5maWx0ZXJPdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuZmlsdGVyT3V0KGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuLyoqXG4gKlxuICogU2luY2Ugd2UgY2FuIG5vdCBkaXJlY3RseSBzZXQgYCpuZ1RlbXBsYXRlT3V0bGV0YCBjb250ZXh0IHZhcmlhYmxlcyB0byB0aGUgdHlwZXNjcmlwdCBjbGFzcyB3ZVxuICogdXNlIHRoaXMgZGlyZWN0aXZlIHRvIGRvIHRoZSBKb2JcbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2luaXROZXN0aW5nXSdcbn0pXG5leHBvcnQgY2xhc3MgSW5pdE5lc3RpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXRcbntcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0TGV2ZWw6IG51bWJlcjtcblxuXG4gICAgQElucHV0KClcbiAgICBzZXRDdXJycmVudEl0ZW06IGFueTtcblxuXG4gICAgQElucHV0KClcbiAgICBzZXRQYXJlbnRJdGVtOiBhbnk7XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgb3V0bGluZTogT3V0bGluZUZvckNvbXBvbmVudClcbiAgICB7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuc2V0TGV2ZWwpKSB7XG4gICAgICAgICAgICB0aGlzLm91dGxpbmUuc3RhdGUuY3VycmVudExldmVsID0gdGhpcy5zZXRMZXZlbDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnNldEN1cnJyZW50SXRlbSkpIHtcbiAgICAgICAgICAgIHRoaXMub3V0bGluZS5jdXJyZW50SXRlbSA9IHRoaXMuc2V0Q3VycnJlbnRJdGVtO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vdXRsaW5lLmlzVHJlZU1vZGVsRm9ybWF0KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm91dGxpbmUuY3VycmVudEl0ZW1bJyQkcGFyZW50SXRlbSddXG4gICAgICAgICAgICAgICAgICAgID0gKDxPdXRsaW5lTm9kZT50aGlzLnNldEN1cnJyZW50SXRlbSkucGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm91dGxpbmUuaXNUcmVlTW9kZWxGb3JtYXQoKSAmJiBpc1ByZXNlbnQodGhpcy5zZXRQYXJlbnRJdGVtKSkge1xuICAgICAgICAgICAgdGhpcy5vdXRsaW5lLmN1cnJlbnRJdGVtWyckJHBhcmVudEl0ZW0nXSA9IHRoaXMuc2V0UGFyZW50SXRlbTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG4iXX0=