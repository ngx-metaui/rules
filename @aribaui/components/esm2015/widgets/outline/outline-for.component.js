/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
/** @typedef {?} */
var ModelFormat;
export { ModelFormat };
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
            /** @type {?} */
            let children = (/** @type {?} */ (item)).children;
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
        /** @type {?} */
        let currentItem = ListWrapper.last(this.state.currentPath);
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
                template: "<!--\n    Starts with the list, where nestingLevel is -1.\n    call template outlineItems to iterate and render each item\n-->\n<ng-container [ngIf]=\"list\" *ngTemplateOutlet=\"outlineItems;\n            context:{ $implicit: list, nestingLevel: 0, parentItem: null, expanded: true}\">\n</ng-container>\n\n<!--\n    Main Entry point for the recursion. this is called by the block above as well as byt the inner\n    piece that calls this template recursively again when an item has children\n-->\n<ng-template #outlineItems let-children let-nestingLevel=\"nestingLevel\"\n             let-parent=\"parentItem\" let-expanded=\"expanded\">\n\n    <ng-template ngFor let-item [ngForOf]=\"children\" let-rowIndex=\"index\">\n\n        <ng-container *ngTemplateOutlet=\"outlineItem;\n            context:{ $implicit: item, nestingLevel: nestingLevel, parentItem: parent,\n            expanded: expanded, rowIndex:rowIndex}\">\n        </ng-container>\n\n        <!--\n\n            Recursion piece:\n\n            For non embedded case when even if its not expanded we need to iterate children\n            as we want to apply animation that should go with ngIf which inside the outineItem\n            template\n\n            Dont recurse/ render items that are not visible.\n        -->\n\n        <ng-template [ngIf]=\"hasChildren(item) && (isExpanded(item, nestingLevel) || !embedded) && isVisible(item)\">\n            <ng-container *ngTemplateOutlet=\"outlineItems;\n                        context:{ $implicit: childrenForItem(item),\n                                nestingLevel: nestingLevel+1,\n                                expanded: isExpanded(item, nestingLevel),\n                                parentItem:item }\">\n            </ng-container>\n        </ng-template>\n    </ng-template>\n</ng-template>\n\n\n<!--\n    Renders actual outline node and applies animation while expanding and collapsing\n\n    [@section]=\"expanded || isExpanded(item) ? 'visible' : 'hidden'\"\n-->\n<ng-template #outlineItem let-item let-nestingLevel=\"nestingLevel\" let-parent=\"parentItem\"\n             let-rowIndex=\"rowIndex\"\n             let-expanded=\"expanded\">\n\n    <div class=\"w-outline-item\"\n         *ngIf=\"!embedded && expanded\"\n         [style.padding-left.px]=\"indentation(nestingLevel)\"\n         initNesting [setLevel]=\"nestingLevel\" [setParentItem]=\"parent\"\n         [setCurrrentItem]=\"item\"\n         [@section]\n         (@section.done)=\"onAnimationDone($event)\">\n\n        <ng-container *ngTemplateOutlet=\"controlTemplate;\n                        context:{ $implicit: item, nestingLevel: nestingLevel, rowIndex:rowIndex }\">\n        </ng-container>\n    </div>\n\n    <!--\n        When outline control is used as embedded meaning its inside e..g datatable we\n        cannot have any tags around it.\n\n        Todo: Refactor this in the way so we can do animation when table lines are\n        expanded. Since its embedded we can not have any wrapping element around, the template\n        is fully responsible\n    -->\n    <ng-template [ngIf]=\"embedded && expanded\"\n                 initNesting [setLevel]=\"nestingLevel\" [setParentItem]=\"parent\"\n                 [setCurrrentItem]=\"item\"\n    >\n        <ng-container #renderedItem *ngTemplateOutlet=\"controlTemplate;\n                        context:{ $implicit: item, nestingLevel: nestingLevel, rowIndex:rowIndex  }\">\n        </ng-container>\n    </ng-template>\n\n</ng-template>\n\n\n",
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
                ],
                styles: [".is-outline-animation>div,::ng-deep .w-outline-item{overflow:hidden}"]
            }] }
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
if (false) {
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
            },] }
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
if (false) {
    /** @type {?} */
    InitNestingDirective.prototype.setLevel;
    /** @type {?} */
    InitNestingDirective.prototype.setCurrrentItem;
    /** @type {?} */
    InitNestingDirective.prototype.setParentItem;
    /** @type {?} */
    InitNestingDirective.prototype.outline;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS1mb3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvb3V0bGluZS9vdXRsaW5lLWZvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDakcsT0FBTyxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQVksT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0YsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBDN0MsTUFBTSx3QkFBd0IsSUFBUztJQUVuQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxtQkFBYyxJQUFJLEVBQUMsQ0FBQztXQUNqRCxTQUFTLENBQUMsbUJBQWMsSUFBSSxFQUFDLENBQUMsTUFBTSxDQUFDO1dBQ3JDLFNBQVMsQ0FBQyxtQkFBYyxJQUFJLEVBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUNsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ25EO1FBR0QsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUVoRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUM7c0JBQ2xDLG1CQUFjLElBQUksQ0FBQyxlQUFlLEVBQUMsQ0FBQyxNQUFNLENBQUM7YUFDcEQ7U0FDSjtRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDakU7S0FDSjs7O1lBMUNKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTthQUM1Qjs7OztZQWdCZ0MsbUJBQW1COzs7dUJBWi9DLEtBQUs7OEJBSUwsS0FBSzs0QkFJTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2FuaW1hdGUsIEFuaW1hdGlvbkJ1aWxkZXIsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlcn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge2Fzc2VydCwgRW52aXJvbm1lbnQsIElkZW50aXR5LCBpc0JsYW5rLCBpc1ByZXNlbnQsIExpc3RXcmFwcGVyfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQge091dGxpbmVTdGF0ZX0gZnJvbSAnLi9vdXRsaW5lLXN0YXRlJztcblxuXG4vKipcbiAqIFRoaXMgaW50ZXJmYWNlIHJlcHJlc2VudCBjb25jcmV0ZSB0cmVlIHN0cnVjdHVyZSBmb3IgdGhlIG91dGxpbmUgdHJlZSBtb2RlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgT3V0bGluZU5vZGUgZXh0ZW5kcyBJZGVudGl0eVxue1xuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSB0byBwYXJlbnQgbm9kZS5cbiAgICAgKi9cbiAgICBwYXJlbnQ6IE91dGxpbmVOb2RlO1xuXG4gICAgLyoqXG4gICAgICogTm9kZSdzIGNoaWxkcmVuLiBFdmVuIGl0cyBhIGZpZWxkIGl0IGNhbiBiZSBpbXBsZW1lbnRlZCBsYXppbHkgdXNpbmcgZ2V0dGVyIHdoZXJlIGEgdGFyZ2V0XG4gICAgICogb2JqZWN0IGRvZXMgbm90IGltcGxlbWVudCB0aGlzIGFzIGEgcHVibGljIGZpZWxkIGJ1dCBhIGdldHRlciB3aXRoIGNvbnRyb2wgb3ZlciB0aGVcbiAgICAgKiByZXRyaWV2ZWQgbGlzdFxuICAgICAqL1xuICAgIGNoaWxkcmVuOiBPdXRsaW5lTm9kZVtdO1xuXG4gICAgLyoqXG4gICAgICogRGlmZmVyZW50IHN0YXRlcyBmb3Igb3V0bGluZSBOb2RlXG4gICAgICpcbiAgICAgKiBpc0V4cGFuZGVkOiBib29sZWFuOz0gbW92aW5nIG91dCBhcyB0aGlzIGlzIG1hbmFnZWQgYnkgZXhwYW5zaW9uc3RhdGUuXG4gICAgICovXG4gICAgaXNFeHBhbmRlZDogYm9vbGVhbjtcbiAgICBpc1NlbGVjdGVkOiBib29sZWFuO1xuICAgIGlzTWF0Y2g/OiBib29sZWFuO1xuICAgIHJlYWRvbmx5PzogYm9vbGVhbjtcbiAgICB0eXBlPzogc3RyaW5nO1xuICAgIGRyYWdnYWJsZT86IGJvb2xlYW47XG4gICAgZHJvcHBhYmxlPzogYm9vbGVhbjtcbiAgICB2aXNpYmxlPzogYm9vbGVhbjtcblxufVxuXG5cbi8qKlxuICpcbiAqIENoZWNrcyB0eXBlIGZvciBPdXRsaW5lTm9kZVxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT3V0bGluZU5vZGUobm9kZTogYW55KTogbm9kZSBpcyBPdXRsaW5lTm9kZVxue1xuICAgIHJldHVybiBpc1ByZXNlbnQobm9kZSkgJiYgaXNQcmVzZW50KCg8T3V0bGluZU5vZGU+bm9kZSkpXG4gICAgICAgICYmIGlzUHJlc2VudCgoPE91dGxpbmVOb2RlPm5vZGUpLnBhcmVudClcbiAgICAgICAgJiYgaXNQcmVzZW50KCg8T3V0bGluZU5vZGU+bm9kZSkuY2hpbGRyZW4pO1xufVxuXG5cbi8qKlxuICogQ3VycmVudGx5IG91dGxpbmUgc3VwcG9ydHMgb25seSB0d28gbW9kZXMgZnJlZSwgd2hlcmUgYXBwbGljYXRpb24gaXMgcmVzcG9uc2libGUgdG8gcmV0cmlldmVcbiAqIGNoaWxkcmVuIGZvciBlYWNoIG5vZGUgYW5kIHRyZWUgd2l0aCBhYm92ZSBPdXRsaW5lTm9kZSBzdHJ1Y3R1cmVcbiAqL1xuZXhwb3J0IHR5cGUgTW9kZWxGb3JtYXQgPSAnZnJlZScgfCAndHJlZSc7XG5cblxuLyoqXG4gKlxuICogT3V0bGluZUZvckNvbXBvbmVudCBpcyBsaWtlIG5nRm9yLCBidXQgZm9yIGhpZXJhcmNoaWNhbCAob3V0bGluZS90cmVlKSBzdHJ1Y3R1cmVzIC0tIGkuZS4gaW5cbiAqIHRob3NlIGNhc2VzIHdoZXJlIGFuIGl0ZW0gbWF5IGhhdmUgY2hpbGRyZW4uXG4gKlxuICpcbiAqIEl0IHVzZXMgb3V0bGluZSBgPGF3LW91dGxpbmUtY29udHJvbD5gIHRvIHByb3ZpZGUgZXhwYW5kaW5nIGZ1bmN0aW9uYWxpdHksIGluZGVudGF0aW9uXG4gKiBhbmQgb3RoZXIgdGhpbmdzLlxuICpcbiAqXG4gKiBUaGlzIGNvbXBvbmVudCBoYXMgbWluaW1hbCBzdHlsaW5nIHRvIG1ha2Ugc3VyZSBpdCBjYW4gYmUgY2hhbmdlZCBlYXNpbHkuXG4gKlxuICogIyMjIEV4YW1wbGUgcmVuZGVyaW5nIHRyZWUgc2VjdGlvbiwgd2hlcmUgYmFzZWQgb24gdGhlIHR5cGUgd2UgZm9ybWF0IHRoZSBvdXQgcGx1c1xuICogZm9yIHRoZSBtYWluIHJvb3Qgc2VjdGlvbiB3ZSBhbHdheXMgcmVuZGVyIGxpdHRsZSBwb3B1cCBtZW51LlxuICpcbiAqIGBgYFxuICpcbiAqICAgPGF3LW91dGxpbmUtZm9yIFtsaXN0XT1cImxpc3RcIiBbaGFzQ2hpbGRyZW5dPVwiaGFzQ2hpbGRyZW5cIj5cbiAqXG4gKiAgICAgICA8bmctdGVtcGxhdGUgI291dGxpbmUgbGV0LWl0ZW0+XG4gKlxuICogICAgICAgICAgIDxkaXYgY2xhc3M9XCJteS1zZWN0aW9uXCI+XG4gKiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvdXRsaW5lXCI+XG4gKiAgICAgICAgICAgICAgICAgICA8YXctb3V0bGluZS1jb250cm9sPlxuICogICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIml0ZW0udHlwZVwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nU3dpdGNoQ2FzZV09XCIndGV4dCdcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcy1wYXJhZ3JhZlwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7aXRlbT8uY29udGVudH19XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAqXG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdTd2l0Y2hEZWZhdWx0PlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tpdGVtPy5jb250ZW50fX1cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAqXG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICpcbiAqXG4gKiAgICAgICAgICAgICAgICAgICA8L2F3LW91dGxpbmUtY29udHJvbD5cbiAqICAgICAgICAgICAgICAgPC9kaXY+XG4gKlxuICogICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyc1wiICpuZ0lmPVwiaXRlbS50eXBlID09PSAnc2VjdGlvbidcIiA+XG4gKlxuICogICAgICAgICAgICAgICAgICAgPGF3LWhvdmVyLWNhcmQgW2xpbmtUaXRsZV09XCInRmlsdGVyIEl0ZW1zJ1wiPlxuICogICAgICAgICAgICAgICAgICAgICAgIDxhdy1saXN0IFtsaXN0XT1cImZpbHRlckl0ZW1zXCIgW2JvcmRlcmxlc3NdPVwidHJ1ZVwiPjwvYXctbGlzdD5cbiAqICAgICAgICAgICAgICAgICAgIDwvYXctaG92ZXItY2FyZD5cbiAqXG4gKiAgICAgICAgICAgICAgIDwvZGl2PlxuICogICAgICAgICAgIDwvZGl2PlxuICogICAgIDwvbmctdGVtcGxhdGU+YFxuICogICA8L2F3LW91dGxpbmUtZm9yPlxuICpcbiAqIGBgYFxuICpcbiAqXG4gKiBXZSBjYW4gdXNlIGl0IGFsc28gaW4gZW1iZWRkZWQgbW9kZSB3aGVyZSB3ZSB1c2UgdGhlIGBhd091dGxpbmVGb3JgIGRpcmVjdGl2ZVxuICpcbiAqICMjIEV4YW1wbGVcbiAqXG4gKlxuICogYGBgYFxuICogIDx0YWJsZSAgY2xhc3M9XCJ0cmVlLXRhYmxlXCIgPlxuICogICAgICA8dGhlYWQ+XG4gKiAgICAgICAgICA8dHI+XG4gKiAgICAgICAgICAgICAgPHRoPk5hbWU8L3RoPlxuICogICAgICAgICAgICAgIDx0aD5UeXBlPC90aD5cbiAqICAgICAgICAgIDwvdHI+XG4gKiAgICAgIDwvdGhlYWQ+XG4gKiAgICAgIDx0Ym9keSAjb29vMiBhd091dGxpbmVGb3IgW2xpc3RdPVwibGlzdFwiXG4gKiAgICAgICAgICAgICBbaGFzQ2hpbGRyZW5dPVwiaGFzQ2hpbGRyZW5cIlxuICogICAgICAgICAgICAgY2xhc3M9XCJvdXRsaW5lLXRhYmxlXCJcbiAqICAgICAgPlxuICogICAgICAgICAgPG5nLXRlbXBsYXRlICNvdXRsaW5lIGxldC1pdGVtPlxuICogICAgICAgICAgICAgIDx0cj5cbiAqICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiaXRlbS1uYW1lIG91dGxpbmUtYW5pbWF0aW9uXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICA8ZGl2Pjxhdy1vdXRsaW5lLWNvbnRyb2w+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAge3tpdGVtPy5jb250ZW50fX1cbiAqICAgICAgICAgICAgICAgICAgICAgIDwvYXctb3V0bGluZS1jb250cm9sPjwvZGl2PlxuICogICAgICAgICAgICAgICAgICA8L3RkPlxuICogICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJpdGVtLXR5cGUgb3V0bGluZS1hbmltYXRpb25cIj5cbiAqICAgICAgICAgICAgICAgICAgICAgIDxkaXY+e3tpdGVtLnR5cGV9fTwvZGl2PlxuICogICAgICAgICAgICAgICAgICA8L3RkPlxuICogICAgICAgICAgICAgIDwvdHI+XG4gKiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICogICAgICA8L3Rib2R5PlxuICogIDwvdGFibGU+XG4gKlxuICogYGBgXG4gKlxuICogSSB3YXMgdGhpbmtpbmcgbWF5YmUgZm9yIGZpcnN0IHRpbWUgd2UgZG9uJ3QgbmVlZCB0aGUgc2FtZSBhbmltYXRpb24gbGlrZSBleHBhbmRpbmcgYW5kXG4gKiBjb2xsYXBzaW5nLiBNYXliZSB3ZSBuZWVkIGZhZGUtaW4uIEluIHN1Y2ggY2FzZSBJIHdvdWxkIHByb2JhYmx5IGFwcGx5IEBzZWN0aW9uIGFuaW0gb25seVxuICogb24gaXRlbXMgd2hlcmUgbGV2ZWwgPiAwIChpbiB0aGUgdGVtcGxhdGUgSSBrZWVwIGxldmVscykgYW5kIGlmIGxldmVsID09IDAgdGhlbiBJIHdvdWxkXG4gKiBleGVjdXRlIHRoZSBzYW1lIHJlbmRlcmluZyBqdXN0IHdpdGhvdXQgW0BzZWN0aW9uXVxuICpcbiAqXG4gKiBUb2RvOiBUaGluayBhYm91dCBob3cgdG8gZG8gYW5pbWF0aW9uIGZvciB0aGUgdGFibGUgY2FzZS4gTXVzdCBhbHNvIHdyaXRlIHVuaXRlc3QgLSBkdWUgdG9cbiAqIEFyaWJhTGl2ZSBhZ2dyZXNzaXZlIHNjaGVkdWxlIHdlIGFyZSBza2lwcGluZyB0aGVtIGZvciBub3dcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctb3V0bGluZS1mb3IsIFthd091dGxpbmVGb3JdJyxcbiAgICB0ZW1wbGF0ZVVybDogJ291dGxpbmUtZm9yLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnb3V0bGluZS1mb3IuY29tcG9uZW50LnNjc3MnXSxcblxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignc2VjdGlvbicsIFtcbiAgICAgICAgICAgIHN0YXRlKCcqJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgICdvdmVyZmxvdy15JzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6ICcqJyxcbiAgICAgICAgICAgICAgICAnb3BhY2l0eSc6ICcxJ1xuXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogJzAnLFxuICAgICAgICAgICAgICAgICdvcGFjaXR5JzogJzAnLFxuICAgICAgICAgICAgICAgICdvdmVyZmxvdy15JzogJ2hpZGRlbidcblxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgYW5pbWF0ZSgnMjAwbXMgZWFzZS1vdXQnKSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBhbmltYXRlKCcyMDBtcyBlYXNlLWluJykpXG4gICAgICAgIF0pLFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgT3V0bGluZUZvckNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgaXRlbXMgdGhhdCBuZWVkcyB0byBiZSByZW5kZXJlZC4gSXQgZG9lcyBub3QgaGF2ZSB0byBpbiBoaWVyYXJjaGljYWwgb3JkZXIgb3Igd2VcbiAgICAgKiBsZWF2ZSBpdCB1cCB0byB0aGUgYXBwbGljYXRpb24gdG8gZGVjaWRlIGFib3V0IHRoZSBzdHJ1Y3R1cmUuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBsaXN0PzogYW55W107XG5cblxuICAgIC8qKlxuICAgICAqIFRlbGxzIHRoZSBjb21wb25lbnQgbm90IHRvIHJlbmRlciBleHBhbnNpb24gY29udHJvbCwgaW4gc3VjaCBjYXNlIHdlIGV4cGFuZEFsbCBhcyBhXG4gICAgICogZGVmYXVsdCBiZWhhdmlvclxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93RXhwYW5zaW9uQ29udHJvbDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBDdXN0b20gbWV0aG9kIHByb3ZpZGVkIGJ5IGFwcGxpY2F0aW9uIHRvIHJldHJpZXZlIGxpc3Qgb2YgY2hpbGRyZW4gZm9yIGN1cnJlbnQgaXRlbS4gSWZcbiAgICAgKiBjaGlsZHJlbiBpcyB1bmRlZmluZWQgdGhlbiwgZGVmYXVsdCAnY2hpbGRyZW4nIGZpZWxkIGlzIHVzZWQgPGN1cnJlbnRJdGVtPi5jaGlsZHJlblxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2hpbGRyZW46ICh2YWx1ZTogYW55KSA9PiBhbnlbXTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogT3B0aW9uIHRvIGNvbmRpdGlvbmFsbHkgcmVuZGVyIG9ubHkgaXRlbXMgdGhhdCBhcmUgc2F0aXNmeWluZyBmaWx0ZXIgY29uZGl0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGZpbHRlck91dDogKHZhbHVlOiBhbnkpID0+IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqIE9wZW5zIGFsbCB0cmVlIG5vZGVzLlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBleHBhbmRBbGw6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgLyoqXG4gICAgICogIE1hbmFnZXMgdGhlIHN0YXRlIGZvciB0aGUgT3V0bGluZSBjb21wb25lbnQuIExhdGVyIG9uIHdlIGNhbiBwcm92aWRlIGVhc2llciB3ZSBob3cgdG9cbiAgICAgKiAgaW5pdGlhbGl6ZSBhbmQgc2V0IHNlbGVjdGlvblBhdGhzIGFuZCBzZWxlY3Rpb25TdGF0ZXMgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc3RhdGU6IE91dGxpbmVTdGF0ZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2V0IGluZGVudGF0aW9uIHNpemUgdG8gYmUgdXNlZCBmb3IgZWFjaCBsZXZlbFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpbmRlbnRhdGlvblBlckxldmVsOiBudW1iZXIgPSAyNTtcblxuXG4gICAgLyoqXG4gICAgICogSW4gY2FzZSB0ZW1wbGF0ZSBpcyBvdXRzaWRlIG9mIHRoZSBvdXRsaW5lRm9yXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBleHRlcm5hbFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgdG8gY3VycmVudCBvYmplY3QgdXNpbmcgdGhpcyBjb21wb25lbnRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbnRleHQ6IGFueTtcblxuXG4gICAgQElucHV0KClcbiAgICBwdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSWRlbnRpZmllcyBjdXJyZW50IG1vZGVsIG1vZGUuXG4gICAgICpcbiAgICAgKiBXZSByZWNvZ25pemUgdHdvIG1vZGVzOlxuICAgICAqXG4gICAgICogRnJlZSAtIEFwcGxpY2F0aW9uIG5lZWRzIHRvIGltcGxlbWVudCBhIGNoaWxkcmVuIG1ldGhvZCB0byByZXRyaWV2ZSBhIGxpc3Qgb2YgY2hpbGRyZW4gZm9yXG4gICAgICogZWFjaCBub2RlIGFuZCBmb3JtYXQgaXMgcHJldHR5IG11Y2ggdXB0IHRvIHRoZSBhcHBsaWNhdGlvblxuICAgICAqXG4gICAgICogVHJlZSAtIHRoaXMgaXMgbW9yZSByZXN0cmljdGl2ZSB3aGVyZSB3ZSBoYXZlIGNvbmNyZXRlIGRhdGEgc3RydWN0dXJlXG4gICAgICogaW50ZXJmYWNlIHRoYXQgbmVlZHMgdG8gYmUgZm9sbGVkXG4gICAgICpcbiAgICAgKiB0b2RvOiBpbnN0ZWFkIG9mIHBhc3NpbmcgZm9ybWF0IGJpbmRpbmcgdHJ5IHRvIGxvb2sgaW50byB0aGUgbGlzdCB0byBzZWUgd2hhdCB0eXBlIHNvXG4gICAgICogd2UgZG9udCBtYWtlIGl0IG1hbmRhdG9yeVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBmb3JtYXQ6IE1vZGVsRm9ybWF0ID0gJ2ZyZWUnO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBVc2VkIHdoZW4gaW4gc2VsZWN0aW9uIG1vZGUgdG8gcHVzaCBjdXJyZW50IHNlbGVjdGVkIEl0ZW0gdG8gdGhlIGFwcGxpY2F0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkl0ZW1TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVGhpcyBldmVudCBpcyB0cmlnZ2VyZWQgYnkgT3V0bGluZUNvbnRyb2wgd2hlbiBub2RlIGlzIGV4cGFuZGVkIG9yIGNvbGxhcHNlZFxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25FeHBhbmRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogQSB0ZW1wbGF0ZSB0byB1c2Ugb24gYXBwbGljYXRpb24gbGV2ZWwgdG8gcmVuZGVyIGluZGl2aWR1YWwgaXRlbXNcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdvdXRsaW5lJylcbiAgICBjb250cm9sVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIEBWaWV3Q2hpbGQoJ3JlbmRlcmVkSXRlbScpXG4gICAgb3V0bGluZUl0ZW06IEVsZW1lbnRSZWY7XG5cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsc1xuICAgICAqXG4gICAgICogY3VycmVudEl0ZW0gYW5kIHBhcmVudEl0ZW0gYXJlIHVzZWQgdG8gY2FwdHVyZSBjdXJyZW50IHByb2Nlc3NlZCBpdGVtIG9mIG5nRm9yLiBUaGlzIGlzXG4gICAgICogc2V0IGJ5IGRpcmVjdGl2ZSBgSW5pdE5lc3RpbmdEaXJlY3RpdmVgXG4gICAgICpcbiAgICAgKiBhbmltYXRpb25JblByb2dyZXNzOiB1c2VkIGJ5IGFuaW1hdGlvbiBlbmdpbmUgdG8gbWFrZSBzdXJlIHdlIGRvbnQgZG8gYW55IGFjdGlvbnMgd2hpbGVcbiAgICAgKiBhbmltYXRpb24gaXMgaW4gdGhlIHByb2dyZXNzXG4gICAgICpcbiAgICAgKiBlbWJlZGRlZDogSW5kaWNhdGVzIHRoYXQgd2UgYXJlIHVzaW5nIGRpcmVjdGl2ZSBzbyBpdCB3aWxsIG5vdCBoYXZlIGRlZmF1bHQgY29tcG9uZW50XG4gICAgICogd3JhcHBlclxuICAgICAqXG4gICAgICovXG4gICAgY3VycmVudEl0ZW06IGFueTtcbiAgICBwYXJlbnRJdGVtOiBhbnk7XG4gICAgYW5pbWF0aW9uSW5Qcm9ncmVzczogYm9vbGVhbjtcbiAgICBlbWJlZGRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogRmxhZyB0aGF0IHRlbGxzIHVzIHRoYXQgY29tcG9uZW50IGlzIGZ1bGx5IHJlbmRlcmVkXG4gICAgICpcbiAgICAgKi9cbiAgICB2aWV3SW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGJ1aWxkZXI6IEFuaW1hdGlvbkJ1aWxkZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmKVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5zdGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBuZXcgT3V0bGluZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5zdGF0ZS5vdXRsaW5lRm9yKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5vdXRsaW5lRm9yID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmV4cGFuZEFsbCkge1xuICAgICAgICAgICAgdGhpcy5zaG93RXhwYW5zaW9uQ29udHJvbCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZS5pc0V4cGFuZGVkQWxsID0gdGhpcy5leHBhbmRBbGw7XG5cbiAgICAgICAgLy8gaW4gY2FzZSB3ZSB3YW50IHRvIHJlbmRlciBjb250ZW50IG9mIHRyZWUgb3V0c2lkZSBvZiBvdXRsaW5lRm9yXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5leHRlcm5hbFRlbXBsYXRlKSkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sVGVtcGxhdGUgPSB0aGlzLmV4dGVybmFsVGVtcGxhdGU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVtYmVkZGVkID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKCdhd291dGxpbmVmb3InKTtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmNvbnRleHQpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIG5nRG9DaGVjaygpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ0RvQ2hlY2soKTtcbiAgICB9XG5cbiAgICBpc1RyZWVNb2RlbEZvcm1hdCgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQgPT09ICd0cmVlJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGJ5IHRlbXBsYXRlIGFuZCBPdXRsaW5lQ29udHJvbCB0byBpZGVudGlmeSB3aGljaCBpdGVtIGlzIGV4cGFuZGVkIGFuZCBjb2xsYXBzZWRcbiAgICAgKlxuICAgICAqL1xuICAgIGlzRXhwYW5kZWQoaXRlbTogYW55LCBjdXJyZW50TGV2ZWw6IG51bWJlciA9IC0xKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKGN1cnJlbnRMZXZlbCA9PT0gMCAmJiB0aGlzLnB1c2hSb290U2VjdGlvbk9uTmV3TGluZSkge1xuICAgICAgICAgICAgLy8gYWx3YXlzIG92ZXJyaWRlL3Jlc2V0IGZvciByb290IG5vZGVzXG4gICAgICAgICAgICBpZiAodGhpcy5pc1RyZWVNb2RlbEZvcm1hdCgpKSB7XG4gICAgICAgICAgICAgICAgKDxPdXRsaW5lTm9kZT5pdGVtKS5pc0V4cGFuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmlzRXhwYW5kZWQoaXRlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTaW5jZSB3ZSBoYXZlIGN1cnJlbnRseSB0d28gd2F5cyBob3cgdG8gcGFzcyBjaGlsZHJlbiBpdGVtcyB3ZSBuZWVkIGhhdmUgdGhpcyBtZXRob2QgdG9cbiAgICAgKiB1bmlmeSB0aGUgd2F5IGhvdyB3ZSBhY2Nlc3MgaXQuIElmIHdlIHBhc3MgYGNoaWxkcmVuYCBiaW5kaW5nIHdlIHVzZSB0aGlzIGluc3RlYWQsIG90aGVyd2lzZVxuICAgICAqIHdlIGV4cGVjdCBjdXJyZW50IG9iamVjdCB0byBoYXZlIGBjaGlsZHJlbmAgZmllbGRcbiAgICAgKlxuICAgICAqL1xuICAgIGNoaWxkcmVuRm9ySXRlbShpdGVtOiBhbnkpOiBhbnlbXVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuaXNUcmVlTW9kZWxGb3JtYXQoKSkge1xuICAgICAgICAgICAgcmV0dXJuICg8T3V0bGluZU5vZGU+aXRlbSkuY2hpbGRyZW4gfHwgW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXNDaGlsZHJlbihpdGVtKSA/IHRoaXMuZG9HZXRDaGlsZHJlbihpdGVtKSA6IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENoZWNrIGlmIHRoZSBjdXJyZW50IGl0ZW0gaGFzIGEgY2hpbGRyZW4gYW5kIG5lZWRzIHRvIGJlIHJlbmRlcmVkXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNDaGlsZHJlbihpdGVtOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAodGhpcy5pc1RyZWVNb2RlbEZvcm1hdCgpKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSAoPE91dGxpbmVOb2RlPml0ZW0pLmNoaWxkcmVuO1xuICAgICAgICAgICAgcmV0dXJuIGlzUHJlc2VudChjaGlsZHJlbikgJiYgY2hpbGRyZW4ubGVuZ3RoID4gMDtcblxuICAgICAgICB9IGVsc2UgaWYgKGlzQmxhbmsodGhpcy5jaGlsZHJlbikgJiYgaXNCbGFuayhpdGVtLmNoaWxkcmVuKSkge1xuICAgICAgICAgICAgYXNzZXJ0KGZhbHNlLCAnTWlzc2luZyBbY2hpbGRyZW5dIG1ldGhvZCBiaW5kaW5nJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5kb0dldENoaWxkcmVuKGl0ZW0pLmxlbmd0aCA+IDA7XG5cbiAgICB9XG5cbiAgICBkb0dldENoaWxkcmVuKGl0ZW06IGFueSk6IGFueVtdXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5hcHBseSh0aGlzLmNvbnRleHQsIFtpdGVtXSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiAgVXNlcyB0aGUgYE91dGxpbmVTdGF0ZWAgdG8gdG9nZ2xlIHN0YXRlIG9mIGN1cnJlbnQgc2VsZWN0aW9uUGF0aC4gVGhlIGBzZWxlY3Rpb25QYXRoYCBpc1xuICAgICAqICBwdXQgdG9nZXRoZXIgaW5zaWRlIGBPdXRsaW5lQ29udHJvbGAgd2hlcmUgd2UgaXRlcmF0ZSBhbGwgdGhlIHdheSB0byB0aGUgcm9vdCBhbmQgYWRkXG4gICAgICogIGVhY2ggaXRlbSB0byB0aGUgYGN1cnJlbnRQYXRoYCBhcnJheS4gVGhpcyB3YXkgd2UgY29sbGVjdCBsaXN0IG9mIGl0ZW0gcmVwcmVzZW50aW5nIGN1cnJlbnRcbiAgICAgKiAgY3VycmVudCBleHBhbnNpb25QYXRoLlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICB0b2dnbGVFeHBhbnNpb24oKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uSW5Qcm9ncmVzcykge1xuICAgICAgICAgICAgLy8gYmFja3VwIHByb2NlZHVyZSBpbiBjYXNlIG9uQW5pbWF0aW9uRG9uZSBmYWlsc1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbkluUHJvZ3Jlc3MpIHsgLy8gY2hhbmdlIG9ubHkgaWYgaXRzIGZhaWxzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZW1iZWRkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VycmVudEl0ZW0gPSBMaXN0V3JhcHBlci5sYXN0KHRoaXMuc3RhdGUuY3VycmVudFBhdGgpO1xuICAgICAgICB0aGlzLnN0YXRlLnRvZ2dsZUV4cGFuc2lvbih0aGlzLnN0YXRlLmN1cnJlbnRQYXRoLCB0aGlzLmNoaWxkcmVuRm9ySXRlbShjdXJyZW50SXRlbSkpO1xuXG4gICAgICAgIGlmICh0aGlzLmVtYmVkZGVkKSB7XG4gICAgICAgICAgICAvLyB0aGlzLmFuaW1hdGVFbWJlZGRlZEl0ZW0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQW5ndWxhciBhbmltLiBjYWxsYmFjayB0aGF0IHNldHMgYmFjayB0aGUgZmxhZyB0byBtYWtlIHN1cmUgd2UgZG9uJ3QgdHJpZ2dlciBhbmltYXRpb25zXG4gICAgICogd2hlbiBvbmUgaXMgaW4gcHJvZ3Jlc3MuXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkFuaW1hdGlvbkRvbmUoZXZlbnQ6IEV2ZW50KVxuICAgIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25JblByb2dyZXNzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlZCBpbmRlbnRhdGlvbiB1c2VkIHRvIHNoaWZ0IHRoZSBuZXN0ZWQgc2VjdGlvbiB0byB0aGUgcmlnaHQgb3IgbGF0ZXIgb24gdG8gdGhlXG4gICAgICogbGVmdCB3aGVuIFJUTCBpcyBzdXBwb3J0ZWRcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgaW5kZW50YXRpb24oY3VycmVudExldmVsOiBudW1iZXIpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLnB1c2hSb290U2VjdGlvbk9uTmV3TGluZSAmJiBjdXJyZW50TGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICBjdXJyZW50TGV2ZWwgLT0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoY3VycmVudExldmVsID09PSAwICYmIHRoaXMucHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lKVxuICAgICAgICAgICAgPyAwIDogKHRoaXMuaW5kZW50YXRpb25QZXJMZXZlbCAqIGN1cnJlbnRMZXZlbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTm90IGFsbCByb3dzIGFyZSB2aXNpYmxlIGJ5IGRlZmF1bHQsIHRoZXJlIGNhbiBiZSBhIGNhc2Ugd2hlcmUgeW91IGRvbnQgd2FudCB0byByZW5kZXIgaXRlbXNcbiAgICAgKiB1c2luZyBvdXRsaW5lLiBlLmcuIERhdGF0YWJsZSB3aXRoIGRldGFpbCByb3cuXG4gICAgICovXG4gICAgaXNWaXNpYmxlKGl0ZW06IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5maWx0ZXJPdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuZmlsdGVyT3V0KGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuLyoqXG4gKlxuICogU2luY2Ugd2UgY2FuIG5vdCBkaXJlY3RseSBzZXQgYCpuZ1RlbXBsYXRlT3V0bGV0YCBjb250ZXh0IHZhcmlhYmxlcyB0byB0aGUgdHlwZXNjcmlwdCBjbGFzcyB3ZVxuICogdXNlIHRoaXMgZGlyZWN0aXZlIHRvIGRvIHRoZSBKb2JcbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2luaXROZXN0aW5nXSdcbn0pXG5leHBvcnQgY2xhc3MgSW5pdE5lc3RpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXRcbntcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0TGV2ZWw6IG51bWJlcjtcblxuXG4gICAgQElucHV0KClcbiAgICBzZXRDdXJycmVudEl0ZW06IGFueTtcblxuXG4gICAgQElucHV0KClcbiAgICBzZXRQYXJlbnRJdGVtOiBhbnk7XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgb3V0bGluZTogT3V0bGluZUZvckNvbXBvbmVudClcbiAgICB7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuc2V0TGV2ZWwpKSB7XG4gICAgICAgICAgICB0aGlzLm91dGxpbmUuc3RhdGUuY3VycmVudExldmVsID0gdGhpcy5zZXRMZXZlbDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnNldEN1cnJyZW50SXRlbSkpIHtcbiAgICAgICAgICAgIHRoaXMub3V0bGluZS5jdXJyZW50SXRlbSA9IHRoaXMuc2V0Q3VycnJlbnRJdGVtO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vdXRsaW5lLmlzVHJlZU1vZGVsRm9ybWF0KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm91dGxpbmUuY3VycmVudEl0ZW1bJyQkcGFyZW50SXRlbSddXG4gICAgICAgICAgICAgICAgICAgID0gKDxPdXRsaW5lTm9kZT50aGlzLnNldEN1cnJyZW50SXRlbSkucGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm91dGxpbmUuaXNUcmVlTW9kZWxGb3JtYXQoKSAmJiBpc1ByZXNlbnQodGhpcy5zZXRQYXJlbnRJdGVtKSkge1xuICAgICAgICAgICAgdGhpcy5vdXRsaW5lLmN1cnJlbnRJdGVtWyckJHBhcmVudEl0ZW0nXSA9IHRoaXMuc2V0UGFyZW50SXRlbTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG4iXX0=