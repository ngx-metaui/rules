/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var OutlineForComponent = /** @class */ (function (_super) {
    tslib_1.__extends(OutlineForComponent, _super);
    function OutlineForComponent(env, _viewContainer, builder, element) {
        var _this = _super.call(this, env) || this;
        _this.env = env;
        _this._viewContainer = _viewContainer;
        _this.builder = builder;
        _this.element = element;
        /**
         * Tells the component not to render expansion control, in such case we expandAll as a
         * default behavior
         *
         */
        _this.showExpansionControl = true;
        /**
         * Opens all tree nodes.
         *
         */
        _this.expandAll = false;
        /**
         *
         * Set indentation size to be used for each level
         *
         */
        _this.indentationPerLevel = 25;
        _this.pushRootSectionOnNewLine = false;
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
        _this.format = 'free';
        /**
         *
         * Used when in selection mode to push current selected Item to the application
         *
         */
        _this.onItemSelected = new EventEmitter();
        /**
         *
         * This event is triggered by OutlineControl when node is expanded or collapsed
         *
         */
        _this.onExpandChange = new EventEmitter();
        _this.embedded = false;
        /**
         * Flag that tells us that component is fully rendered
         *
         */
        _this.viewInitialized = false;
        return _this;
    }
    /**
     * @return {?}
     */
    OutlineForComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
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
    };
    /**
     * @return {?}
     */
    OutlineForComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngDoCheck.call(this);
    };
    /**
     * @return {?}
     */
    OutlineForComponent.prototype.isTreeModelFormat = /**
     * @return {?}
     */
    function () {
        return this.format === 'tree';
    };
    /**
     * Used by template and OutlineControl to identify which item is expanded and collapsed
     *
     */
    /**
     * Used by template and OutlineControl to identify which item is expanded and collapsed
     *
     * @param {?} item
     * @param {?=} currentLevel
     * @return {?}
     */
    OutlineForComponent.prototype.isExpanded = /**
     * Used by template and OutlineControl to identify which item is expanded and collapsed
     *
     * @param {?} item
     * @param {?=} currentLevel
     * @return {?}
     */
    function (item, currentLevel) {
        if (currentLevel === void 0) { currentLevel = -1; }
        if (currentLevel === 0 && this.pushRootSectionOnNewLine) {
            // always override/reset for root nodes
            if (this.isTreeModelFormat()) {
                (/** @type {?} */ (item)).isExpanded = true;
            }
            return true;
        }
        return this.state.isExpanded(item);
    };
    /**
     *
     * Since we have currently two ways how to pass children items we need have this method to
     * unify the way how we access it. If we pass `children` binding we use this instead, otherwise
     * we expect current object to have `children` field
     *
     */
    /**
     *
     * Since we have currently two ways how to pass children items we need have this method to
     * unify the way how we access it. If we pass `children` binding we use this instead, otherwise
     * we expect current object to have `children` field
     *
     * @param {?} item
     * @return {?}
     */
    OutlineForComponent.prototype.childrenForItem = /**
     *
     * Since we have currently two ways how to pass children items we need have this method to
     * unify the way how we access it. If we pass `children` binding we use this instead, otherwise
     * we expect current object to have `children` field
     *
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this.isTreeModelFormat()) {
            return (/** @type {?} */ (item)).children || [];
        }
        else {
            return this.hasChildren(item) ? this.doGetChildren(item) : [];
        }
    };
    /**
     *
     * Check if the current item has a children and needs to be rendered
     *
     */
    /**
     *
     * Check if the current item has a children and needs to be rendered
     *
     * @param {?} item
     * @return {?}
     */
    OutlineForComponent.prototype.hasChildren = /**
     *
     * Check if the current item has a children and needs to be rendered
     *
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this.isTreeModelFormat()) {
            var /** @type {?} */ children = (/** @type {?} */ (item)).children;
            return isPresent(children) && children.length > 0;
        }
        else if (isBlank(this.children) && isBlank(item.children)) {
            assert(false, 'Missing [children] method binding');
        }
        return this.doGetChildren(item).length > 0;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    OutlineForComponent.prototype.doGetChildren = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return this.children.apply(this.context, [item]);
    };
    /**
     *  Uses the `OutlineState` to toggle state of current selectionPath. The `selectionPath` is
     *  put together inside `OutlineControl` where we iterate all the way to the root and add
     *  each item to the `currentPath` array. This way we collect list of item representing current
     *  current expansionPath.
     *
     *
     */
    /**
     *  Uses the `OutlineState` to toggle state of current selectionPath. The `selectionPath` is
     *  put together inside `OutlineControl` where we iterate all the way to the root and add
     *  each item to the `currentPath` array. This way we collect list of item representing current
     *  current expansionPath.
     *
     *
     * @return {?}
     */
    OutlineForComponent.prototype.toggleExpansion = /**
     *  Uses the `OutlineState` to toggle state of current selectionPath. The `selectionPath` is
     *  put together inside `OutlineControl` where we iterate all the way to the root and add
     *  each item to the `currentPath` array. This way we collect list of item representing current
     *  current expansionPath.
     *
     *
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.animationInProgress) {
            // backup procedure in case onAnimationDone fails
            setTimeout(function () {
                if (_this.animationInProgress) {
                    // change only if its fails
                    _this.animationInProgress = false;
                }
            }, 200);
            return;
        }
        if (!this.embedded) {
            this.animationInProgress = true;
        }
        var /** @type {?} */ currentItem = ListWrapper.last(this.state.currentPath);
        this.state.toggleExpansion(this.state.currentPath, this.childrenForItem(currentItem));
        if (this.embedded) {
            // this.animateEmbeddedItem();
        }
    };
    /**
     * Angular anim. callback that sets back the flag to make sure we don't trigger animations
     * when one is in progress.
     *
     */
    /**
     * Angular anim. callback that sets back the flag to make sure we don't trigger animations
     * when one is in progress.
     *
     * @param {?} event
     * @return {?}
     */
    OutlineForComponent.prototype.onAnimationDone = /**
     * Angular anim. callback that sets back the flag to make sure we don't trigger animations
     * when one is in progress.
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.animationInProgress = false;
    };
    /**
     * Calculated indentation used to shift the nested section to the right or later on to the
     * left when RTL is supported
     *
     *
     */
    /**
     * Calculated indentation used to shift the nested section to the right or later on to the
     * left when RTL is supported
     *
     *
     * @param {?} currentLevel
     * @return {?}
     */
    OutlineForComponent.prototype.indentation = /**
     * Calculated indentation used to shift the nested section to the right or later on to the
     * left when RTL is supported
     *
     *
     * @param {?} currentLevel
     * @return {?}
     */
    function (currentLevel) {
        if (this.pushRootSectionOnNewLine && currentLevel > 0) {
            currentLevel -= 1;
        }
        return (currentLevel === 0 && this.pushRootSectionOnNewLine)
            ? 0 : (this.indentationPerLevel * currentLevel);
    };
    /**
     * Not all rows are visible by default, there can be a case where you dont want to render items
     * using outline. e.g. Datatable with detail row.
     */
    /**
     * Not all rows are visible by default, there can be a case where you dont want to render items
     * using outline. e.g. Datatable with detail row.
     * @param {?} item
     * @return {?}
     */
    OutlineForComponent.prototype.isVisible = /**
     * Not all rows are visible by default, there can be a case where you dont want to render items
     * using outline. e.g. Datatable with detail row.
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (isPresent(this.filterOut)) {
            return !this.filterOut(item);
        }
        return true;
    };
    OutlineForComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-outline-for, [awOutlineFor]',
                    template: "<!--\n    Starts with the list, where nestingLevel is -1.\n    call template outlineItems to iterate and render each item\n-->\n<ng-container [ngIf]=\"list\" *ngTemplateOutlet=\"outlineItems;\n            context:{ $implicit: list, nestingLevel: 0, parentItem: null, expanded: true}\">\n</ng-container>\n\n<!--\n    Main Entry point for the recursion. this is called by the block above as well as byt the inner\n    piece that calls this template recursively again when an item has children\n-->\n<ng-template #outlineItems let-children let-nestingLevel=\"nestingLevel\"\n             let-parent=\"parentItem\" let-expanded=\"expanded\">\n\n    <ng-template ngFor let-item [ngForOf]=\"children\" let-rowIndex=\"index\">\n\n        <ng-container *ngTemplateOutlet=\"outlineItem;\n            context:{ $implicit: item, nestingLevel: nestingLevel, parentItem: parent,\n            expanded: expanded, rowIndex:rowIndex}\">\n        </ng-container>\n\n        <!--\n\n            Recursion piece:\n\n            For non embedded case when even if its not expanded we need to iterate children\n            as we want to apply animation that should go with ngIf which inside the outineItem\n            template\n\n            Dont recurse/ render items that are not visible.\n        -->\n\n        <ng-template [ngIf]=\"hasChildren(item) && (isExpanded(item, nestingLevel) || !embedded) && isVisible(item)\">\n            <ng-container *ngTemplateOutlet=\"outlineItems;\n                        context:{ $implicit: childrenForItem(item),\n                                nestingLevel: nestingLevel+1,\n                                expanded: isExpanded(item, nestingLevel),\n                                parentItem:item }\">\n            </ng-container>\n        </ng-template>\n    </ng-template>\n</ng-template>\n\n\n<!--\n    Renders actual outline node and applies animation while expanding and collapsing\n\n    [@section]=\"expanded || isExpanded(item) ? 'visible' : 'hidden'\"\n-->\n<ng-template #outlineItem let-item let-nestingLevel=\"nestingLevel\" let-parent=\"parentItem\"\n             let-rowIndex=\"rowIndex\"\n             let-expanded=\"expanded\">\n\n    <div class=\"w-outline-item\"\n         *ngIf=\"!embedded && expanded\"\n         [style.padding-left.px]=\"indentation(nestingLevel)\"\n         initNesting [setLevel]=\"nestingLevel\" [setParentItem]=\"parent\"\n         [setCurrrentItem]=\"item\"\n         [@section]\n         (@section.done)=\"onAnimationDone($event)\">\n\n        <ng-container *ngTemplateOutlet=\"controlTemplate;\n                        context:{ $implicit: item, nestingLevel: nestingLevel, rowIndex:rowIndex }\">\n        </ng-container>\n    </div>\n\n    <!--\n        When outline control is used as embedded meaning its inside e..g datatable we\n        cannot have any tags around it.\n\n        Todo: Refactor this in the way so we can do animation when table lines are\n        expanded. Since its embedded we can not have any wrapping element around, the template\n        is fully responsible\n    -->\n    <ng-template [ngIf]=\"embedded && expanded\"\n                 initNesting [setLevel]=\"nestingLevel\" [setParentItem]=\"parent\"\n                 [setCurrrentItem]=\"item\"\n    >\n        <ng-container #renderedItem *ngTemplateOutlet=\"controlTemplate;\n                        context:{ $implicit: item, nestingLevel: nestingLevel, rowIndex:rowIndex  }\">\n        </ng-container>\n    </ng-template>\n\n</ng-template>\n\n\n",
                    styles: [".is-outline-animation>div,::ng-deep .w-outline-item{overflow:hidden}"],
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
    OutlineForComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: ViewContainerRef },
        { type: AnimationBuilder },
        { type: ElementRef }
    ]; };
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
    return OutlineForComponent;
}(BaseComponent));
export { OutlineForComponent };
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
var InitNestingDirective = /** @class */ (function () {
    function InitNestingDirective(outline) {
        this.outline = outline;
    }
    /**
     * @return {?}
     */
    InitNestingDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    };
    InitNestingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[initNesting]'
                },] },
    ];
    /** @nocollapse */
    InitNestingDirective.ctorParameters = function () { return [
        { type: OutlineForComponent }
    ]; };
    InitNestingDirective.propDecorators = {
        setLevel: [{ type: Input }],
        setCurrrentItem: [{ type: Input }],
        setParentItem: [{ type: Input }]
    };
    return InitNestingDirective;
}());
export { InitNestingDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS1mb3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvb3V0bGluZS9vdXRsaW5lLWZvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFvQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULGdCQUFnQixFQUNuQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2pHLE9BQU8sRUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFZLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBDN0MsTUFBTSx3QkFBd0IsSUFBUztJQUVuQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxtQkFBYyxJQUFJLEVBQUMsQ0FBQztXQUNqRCxTQUFTLENBQUMsbUJBQWMsSUFBSSxFQUFDLENBQUMsTUFBTSxDQUFDO1dBQ3JDLFNBQVMsQ0FBQyxtQkFBYyxJQUFJLEVBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUNsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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OztnQkExQ0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxlQUFlO2lCQUM1Qjs7OztnQkFnQmdDLG1CQUFtQjs7OzJCQVovQyxLQUFLO2tDQUlMLEtBQUs7Z0NBSUwsS0FBSzs7K0JBL29CVjs7U0Fvb0JhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHthbmltYXRlLCBBbmltYXRpb25CdWlsZGVyLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXJ9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHthc3NlcnQsIEVudmlyb25tZW50LCBJZGVudGl0eSwgaXNCbGFuaywgaXNQcmVzZW50LCBMaXN0V3JhcHBlcn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHtPdXRsaW5lU3RhdGV9IGZyb20gJy4vb3V0bGluZS1zdGF0ZSc7XG5cblxuLyoqXG4gKiBUaGlzIGludGVyZmFjZSByZXByZXNlbnQgY29uY3JldGUgdHJlZSBzdHJ1Y3R1cmUgZm9yIHRoZSBvdXRsaW5lIHRyZWUgbW9kZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIE91dGxpbmVOb2RlIGV4dGVuZHMgSWRlbnRpdHlcbntcbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgdG8gcGFyZW50IG5vZGUuXG4gICAgICovXG4gICAgcGFyZW50OiBPdXRsaW5lTm9kZTtcblxuICAgIC8qKlxuICAgICAqIE5vZGUncyBjaGlsZHJlbi4gRXZlbiBpdHMgYSBmaWVsZCBpdCBjYW4gYmUgaW1wbGVtZW50ZWQgbGF6aWx5IHVzaW5nIGdldHRlciB3aGVyZSBhIHRhcmdldFxuICAgICAqIG9iamVjdCBkb2VzIG5vdCBpbXBsZW1lbnQgdGhpcyBhcyBhIHB1YmxpYyBmaWVsZCBidXQgYSBnZXR0ZXIgd2l0aCBjb250cm9sIG92ZXIgdGhlXG4gICAgICogcmV0cmlldmVkIGxpc3RcbiAgICAgKi9cbiAgICBjaGlsZHJlbjogT3V0bGluZU5vZGVbXTtcblxuICAgIC8qKlxuICAgICAqIERpZmZlcmVudCBzdGF0ZXMgZm9yIG91dGxpbmUgTm9kZVxuICAgICAqXG4gICAgICogaXNFeHBhbmRlZDogYm9vbGVhbjs9IG1vdmluZyBvdXQgYXMgdGhpcyBpcyBtYW5hZ2VkIGJ5IGV4cGFuc2lvbnN0YXRlLlxuICAgICAqL1xuICAgIGlzRXhwYW5kZWQ6IGJvb2xlYW47XG4gICAgaXNTZWxlY3RlZDogYm9vbGVhbjtcbiAgICBpc01hdGNoPzogYm9vbGVhbjtcbiAgICByZWFkb25seT86IGJvb2xlYW47XG4gICAgdHlwZT86IHN0cmluZztcbiAgICBkcmFnZ2FibGU/OiBib29sZWFuO1xuICAgIGRyb3BwYWJsZT86IGJvb2xlYW47XG4gICAgdmlzaWJsZT86IGJvb2xlYW47XG5cbn1cblxuXG4vKipcbiAqXG4gKiBDaGVja3MgdHlwZSBmb3IgT3V0bGluZU5vZGVcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc091dGxpbmVOb2RlKG5vZGU6IGFueSk6IG5vZGUgaXMgT3V0bGluZU5vZGVcbntcbiAgICByZXR1cm4gaXNQcmVzZW50KG5vZGUpICYmIGlzUHJlc2VudCgoPE91dGxpbmVOb2RlPm5vZGUpKVxuICAgICAgICAmJiBpc1ByZXNlbnQoKDxPdXRsaW5lTm9kZT5ub2RlKS5wYXJlbnQpXG4gICAgICAgICYmIGlzUHJlc2VudCgoPE91dGxpbmVOb2RlPm5vZGUpLmNoaWxkcmVuKTtcbn1cblxuXG4vKipcbiAqIEN1cnJlbnRseSBvdXRsaW5lIHN1cHBvcnRzIG9ubHkgdHdvIG1vZGVzIGZyZWUsIHdoZXJlIGFwcGxpY2F0aW9uIGlzIHJlc3BvbnNpYmxlIHRvIHJldHJpZXZlXG4gKiBjaGlsZHJlbiBmb3IgZWFjaCBub2RlIGFuZCB0cmVlIHdpdGggYWJvdmUgT3V0bGluZU5vZGUgc3RydWN0dXJlXG4gKi9cbmV4cG9ydCB0eXBlIE1vZGVsRm9ybWF0ID0gJ2ZyZWUnIHwgJ3RyZWUnO1xuXG5cbi8qKlxuICpcbiAqIE91dGxpbmVGb3JDb21wb25lbnQgaXMgbGlrZSBuZ0ZvciwgYnV0IGZvciBoaWVyYXJjaGljYWwgKG91dGxpbmUvdHJlZSkgc3RydWN0dXJlcyAtLSBpLmUuIGluXG4gKiB0aG9zZSBjYXNlcyB3aGVyZSBhbiBpdGVtIG1heSBoYXZlIGNoaWxkcmVuLlxuICpcbiAqXG4gKiBJdCB1c2VzIG91dGxpbmUgYDxhdy1vdXRsaW5lLWNvbnRyb2w+YCB0byBwcm92aWRlIGV4cGFuZGluZyBmdW5jdGlvbmFsaXR5LCBpbmRlbnRhdGlvblxuICogYW5kIG90aGVyIHRoaW5ncy5cbiAqXG4gKlxuICogVGhpcyBjb21wb25lbnQgaGFzIG1pbmltYWwgc3R5bGluZyB0byBtYWtlIHN1cmUgaXQgY2FuIGJlIGNoYW5nZWQgZWFzaWx5LlxuICpcbiAqICMjIyBFeGFtcGxlIHJlbmRlcmluZyB0cmVlIHNlY3Rpb24sIHdoZXJlIGJhc2VkIG9uIHRoZSB0eXBlIHdlIGZvcm1hdCB0aGUgb3V0IHBsdXNcbiAqIGZvciB0aGUgbWFpbiByb290IHNlY3Rpb24gd2UgYWx3YXlzIHJlbmRlciBsaXR0bGUgcG9wdXAgbWVudS5cbiAqXG4gKiBgYGBcbiAqXG4gKiAgIDxhdy1vdXRsaW5lLWZvciBbbGlzdF09XCJsaXN0XCIgW2hhc0NoaWxkcmVuXT1cImhhc0NoaWxkcmVuXCI+XG4gKlxuICogICAgICAgPG5nLXRlbXBsYXRlICNvdXRsaW5lIGxldC1pdGVtPlxuICpcbiAqICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXktc2VjdGlvblwiPlxuICogICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3V0bGluZVwiPlxuICogICAgICAgICAgICAgICAgICAgPGF3LW91dGxpbmUtY29udHJvbD5cbiAqICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJpdGVtLnR5cGVcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1N3aXRjaENhc2VdPVwiJ3RleHQnXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXMtcGFyYWdyYWZcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2l0ZW0/LmNvbnRlbnR9fVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKlxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nU3dpdGNoRGVmYXVsdD5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7aXRlbT8uY29udGVudH19XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKlxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAqXG4gKlxuICogICAgICAgICAgICAgICAgICAgPC9hdy1vdXRsaW5lLWNvbnRyb2w+XG4gKiAgICAgICAgICAgICAgIDwvZGl2PlxuICpcbiAqICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpbHRlcnNcIiAqbmdJZj1cIml0ZW0udHlwZSA9PT0gJ3NlY3Rpb24nXCIgPlxuICpcbiAqICAgICAgICAgICAgICAgICAgIDxhdy1ob3Zlci1jYXJkIFtsaW5rVGl0bGVdPVwiJ0ZpbHRlciBJdGVtcydcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICA8YXctbGlzdCBbbGlzdF09XCJmaWx0ZXJJdGVtc1wiIFtib3JkZXJsZXNzXT1cInRydWVcIj48L2F3LWxpc3Q+XG4gKiAgICAgICAgICAgICAgICAgICA8L2F3LWhvdmVyLWNhcmQ+XG4gKlxuICogICAgICAgICAgICAgICA8L2Rpdj5cbiAqICAgICAgICAgICA8L2Rpdj5cbiAqICAgICA8L25nLXRlbXBsYXRlPmBcbiAqICAgPC9hdy1vdXRsaW5lLWZvcj5cbiAqXG4gKiBgYGBcbiAqXG4gKlxuICogV2UgY2FuIHVzZSBpdCBhbHNvIGluIGVtYmVkZGVkIG1vZGUgd2hlcmUgd2UgdXNlIHRoZSBgYXdPdXRsaW5lRm9yYCBkaXJlY3RpdmVcbiAqXG4gKiAjIyBFeGFtcGxlXG4gKlxuICpcbiAqIGBgYGBcbiAqICA8dGFibGUgIGNsYXNzPVwidHJlZS10YWJsZVwiID5cbiAqICAgICAgPHRoZWFkPlxuICogICAgICAgICAgPHRyPlxuICogICAgICAgICAgICAgIDx0aD5OYW1lPC90aD5cbiAqICAgICAgICAgICAgICA8dGg+VHlwZTwvdGg+XG4gKiAgICAgICAgICA8L3RyPlxuICogICAgICA8L3RoZWFkPlxuICogICAgICA8dGJvZHkgI29vbzIgYXdPdXRsaW5lRm9yIFtsaXN0XT1cImxpc3RcIlxuICogICAgICAgICAgICAgW2hhc0NoaWxkcmVuXT1cImhhc0NoaWxkcmVuXCJcbiAqICAgICAgICAgICAgIGNsYXNzPVwib3V0bGluZS10YWJsZVwiXG4gKiAgICAgID5cbiAqICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjb3V0bGluZSBsZXQtaXRlbT5cbiAqICAgICAgICAgICAgICA8dHI+XG4gKiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cIml0ZW0tbmFtZSBvdXRsaW5lLWFuaW1hdGlvblwiPlxuICogICAgICAgICAgICAgICAgICAgICAgPGRpdj48YXctb3V0bGluZS1jb250cm9sPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgIHt7aXRlbT8uY29udGVudH19XG4gKiAgICAgICAgICAgICAgICAgICAgICA8L2F3LW91dGxpbmUtY29udHJvbD48L2Rpdj5cbiAqICAgICAgICAgICAgICAgICAgPC90ZD5cbiAqICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiaXRlbS10eXBlIG91dGxpbmUtYW5pbWF0aW9uXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICA8ZGl2Pnt7aXRlbS50eXBlfX08L2Rpdj5cbiAqICAgICAgICAgICAgICAgICAgPC90ZD5cbiAqICAgICAgICAgICAgICA8L3RyPlxuICogICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAqICAgICAgPC90Ym9keT5cbiAqICA8L3RhYmxlPlxuICpcbiAqIGBgYFxuICpcbiAqIEkgd2FzIHRoaW5raW5nIG1heWJlIGZvciBmaXJzdCB0aW1lIHdlIGRvbid0IG5lZWQgdGhlIHNhbWUgYW5pbWF0aW9uIGxpa2UgZXhwYW5kaW5nIGFuZFxuICogY29sbGFwc2luZy4gTWF5YmUgd2UgbmVlZCBmYWRlLWluLiBJbiBzdWNoIGNhc2UgSSB3b3VsZCBwcm9iYWJseSBhcHBseSBAc2VjdGlvbiBhbmltIG9ubHlcbiAqIG9uIGl0ZW1zIHdoZXJlIGxldmVsID4gMCAoaW4gdGhlIHRlbXBsYXRlIEkga2VlcCBsZXZlbHMpIGFuZCBpZiBsZXZlbCA9PSAwIHRoZW4gSSB3b3VsZFxuICogZXhlY3V0ZSB0aGUgc2FtZSByZW5kZXJpbmcganVzdCB3aXRob3V0IFtAc2VjdGlvbl1cbiAqXG4gKlxuICogVG9kbzogVGhpbmsgYWJvdXQgaG93IHRvIGRvIGFuaW1hdGlvbiBmb3IgdGhlIHRhYmxlIGNhc2UuIE11c3QgYWxzbyB3cml0ZSB1bml0ZXN0IC0gZHVlIHRvXG4gKiBBcmliYUxpdmUgYWdncmVzc2l2ZSBzY2hlZHVsZSB3ZSBhcmUgc2tpcHBpbmcgdGhlbSBmb3Igbm93XG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LW91dGxpbmUtZm9yLCBbYXdPdXRsaW5lRm9yXScsXG4gICAgdGVtcGxhdGU6IGA8IS0tXG4gICAgU3RhcnRzIHdpdGggdGhlIGxpc3QsIHdoZXJlIG5lc3RpbmdMZXZlbCBpcyAtMS5cbiAgICBjYWxsIHRlbXBsYXRlIG91dGxpbmVJdGVtcyB0byBpdGVyYXRlIGFuZCByZW5kZXIgZWFjaCBpdGVtXG4tLT5cbjxuZy1jb250YWluZXIgW25nSWZdPVwibGlzdFwiICpuZ1RlbXBsYXRlT3V0bGV0PVwib3V0bGluZUl0ZW1zO1xuICAgICAgICAgICAgY29udGV4dDp7ICRpbXBsaWNpdDogbGlzdCwgbmVzdGluZ0xldmVsOiAwLCBwYXJlbnRJdGVtOiBudWxsLCBleHBhbmRlZDogdHJ1ZX1cIj5cbjwvbmctY29udGFpbmVyPlxuXG48IS0tXG4gICAgTWFpbiBFbnRyeSBwb2ludCBmb3IgdGhlIHJlY3Vyc2lvbi4gdGhpcyBpcyBjYWxsZWQgYnkgdGhlIGJsb2NrIGFib3ZlIGFzIHdlbGwgYXMgYnl0IHRoZSBpbm5lclxuICAgIHBpZWNlIHRoYXQgY2FsbHMgdGhpcyB0ZW1wbGF0ZSByZWN1cnNpdmVseSBhZ2FpbiB3aGVuIGFuIGl0ZW0gaGFzIGNoaWxkcmVuXG4tLT5cbjxuZy10ZW1wbGF0ZSAjb3V0bGluZUl0ZW1zIGxldC1jaGlsZHJlbiBsZXQtbmVzdGluZ0xldmVsPVwibmVzdGluZ0xldmVsXCJcbiAgICAgICAgICAgICBsZXQtcGFyZW50PVwicGFyZW50SXRlbVwiIGxldC1leHBhbmRlZD1cImV4cGFuZGVkXCI+XG5cbiAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWl0ZW0gW25nRm9yT2ZdPVwiY2hpbGRyZW5cIiBsZXQtcm93SW5kZXg9XCJpbmRleFwiPlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJvdXRsaW5lSXRlbTtcbiAgICAgICAgICAgIGNvbnRleHQ6eyAkaW1wbGljaXQ6IGl0ZW0sIG5lc3RpbmdMZXZlbDogbmVzdGluZ0xldmVsLCBwYXJlbnRJdGVtOiBwYXJlbnQsXG4gICAgICAgICAgICBleHBhbmRlZDogZXhwYW5kZWQsIHJvd0luZGV4OnJvd0luZGV4fVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8IS0tXG5cbiAgICAgICAgICAgIFJlY3Vyc2lvbiBwaWVjZTpcblxuICAgICAgICAgICAgRm9yIG5vbiBlbWJlZGRlZCBjYXNlIHdoZW4gZXZlbiBpZiBpdHMgbm90IGV4cGFuZGVkIHdlIG5lZWQgdG8gaXRlcmF0ZSBjaGlsZHJlblxuICAgICAgICAgICAgYXMgd2Ugd2FudCB0byBhcHBseSBhbmltYXRpb24gdGhhdCBzaG91bGQgZ28gd2l0aCBuZ0lmIHdoaWNoIGluc2lkZSB0aGUgb3V0aW5lSXRlbVxuICAgICAgICAgICAgdGVtcGxhdGVcblxuICAgICAgICAgICAgRG9udCByZWN1cnNlLyByZW5kZXIgaXRlbXMgdGhhdCBhcmUgbm90IHZpc2libGUuXG4gICAgICAgIC0tPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJoYXNDaGlsZHJlbihpdGVtKSAmJiAoaXNFeHBhbmRlZChpdGVtLCBuZXN0aW5nTGV2ZWwpIHx8ICFlbWJlZGRlZCkgJiYgaXNWaXNpYmxlKGl0ZW0pXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwib3V0bGluZUl0ZW1zO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDp7ICRpbXBsaWNpdDogY2hpbGRyZW5Gb3JJdGVtKGl0ZW0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXN0aW5nTGV2ZWw6IG5lc3RpbmdMZXZlbCsxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBhbmRlZDogaXNFeHBhbmRlZChpdGVtLCBuZXN0aW5nTGV2ZWwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRJdGVtOml0ZW0gfVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbjwvbmctdGVtcGxhdGU+XG5cblxuPCEtLVxuICAgIFJlbmRlcnMgYWN0dWFsIG91dGxpbmUgbm9kZSBhbmQgYXBwbGllcyBhbmltYXRpb24gd2hpbGUgZXhwYW5kaW5nIGFuZCBjb2xsYXBzaW5nXG5cbiAgICBbQHNlY3Rpb25dPVwiZXhwYW5kZWQgfHwgaXNFeHBhbmRlZChpdGVtKSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nXCJcbi0tPlxuPG5nLXRlbXBsYXRlICNvdXRsaW5lSXRlbSBsZXQtaXRlbSBsZXQtbmVzdGluZ0xldmVsPVwibmVzdGluZ0xldmVsXCIgbGV0LXBhcmVudD1cInBhcmVudEl0ZW1cIlxuICAgICAgICAgICAgIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCJcbiAgICAgICAgICAgICBsZXQtZXhwYW5kZWQ9XCJleHBhbmRlZFwiPlxuXG4gICAgPGRpdiBjbGFzcz1cInctb3V0bGluZS1pdGVtXCJcbiAgICAgICAgICpuZ0lmPVwiIWVtYmVkZGVkICYmIGV4cGFuZGVkXCJcbiAgICAgICAgIFtzdHlsZS5wYWRkaW5nLWxlZnQucHhdPVwiaW5kZW50YXRpb24obmVzdGluZ0xldmVsKVwiXG4gICAgICAgICBpbml0TmVzdGluZyBbc2V0TGV2ZWxdPVwibmVzdGluZ0xldmVsXCIgW3NldFBhcmVudEl0ZW1dPVwicGFyZW50XCJcbiAgICAgICAgIFtzZXRDdXJycmVudEl0ZW1dPVwiaXRlbVwiXG4gICAgICAgICBbQHNlY3Rpb25dXG4gICAgICAgICAoQHNlY3Rpb24uZG9uZSk9XCJvbkFuaW1hdGlvbkRvbmUoJGV2ZW50KVwiPlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250cm9sVGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OnsgJGltcGxpY2l0OiBpdGVtLCBuZXN0aW5nTGV2ZWw6IG5lc3RpbmdMZXZlbCwgcm93SW5kZXg6cm93SW5kZXggfVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS1cbiAgICAgICAgV2hlbiBvdXRsaW5lIGNvbnRyb2wgaXMgdXNlZCBhcyBlbWJlZGRlZCBtZWFuaW5nIGl0cyBpbnNpZGUgZS4uZyBkYXRhdGFibGUgd2VcbiAgICAgICAgY2Fubm90IGhhdmUgYW55IHRhZ3MgYXJvdW5kIGl0LlxuXG4gICAgICAgIFRvZG86IFJlZmFjdG9yIHRoaXMgaW4gdGhlIHdheSBzbyB3ZSBjYW4gZG8gYW5pbWF0aW9uIHdoZW4gdGFibGUgbGluZXMgYXJlXG4gICAgICAgIGV4cGFuZGVkLiBTaW5jZSBpdHMgZW1iZWRkZWQgd2UgY2FuIG5vdCBoYXZlIGFueSB3cmFwcGluZyBlbGVtZW50IGFyb3VuZCwgdGhlIHRlbXBsYXRlXG4gICAgICAgIGlzIGZ1bGx5IHJlc3BvbnNpYmxlXG4gICAgLS0+XG4gICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImVtYmVkZGVkICYmIGV4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICAgaW5pdE5lc3RpbmcgW3NldExldmVsXT1cIm5lc3RpbmdMZXZlbFwiIFtzZXRQYXJlbnRJdGVtXT1cInBhcmVudFwiXG4gICAgICAgICAgICAgICAgIFtzZXRDdXJycmVudEl0ZW1dPVwiaXRlbVwiXG4gICAgPlxuICAgICAgICA8bmctY29udGFpbmVyICNyZW5kZXJlZEl0ZW0gKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250cm9sVGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OnsgJGltcGxpY2l0OiBpdGVtLCBuZXN0aW5nTGV2ZWw6IG5lc3RpbmdMZXZlbCwgcm93SW5kZXg6cm93SW5kZXggIH1cIj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuPC9uZy10ZW1wbGF0ZT5cblxuXG5gLFxuICAgIHN0eWxlczogW2AuaXMtb3V0bGluZS1hbmltYXRpb24+ZGl2LDo6bmctZGVlcCAudy1vdXRsaW5lLWl0ZW17b3ZlcmZsb3c6aGlkZGVufWBdLFxuXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdzZWN0aW9uJywgW1xuICAgICAgICAgICAgc3RhdGUoJyonLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgJ292ZXJmbG93LXknOiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogJyonLFxuICAgICAgICAgICAgICAgICdvcGFjaXR5JzogJzEnXG5cbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgICdoZWlnaHQnOiAnMCcsXG4gICAgICAgICAgICAgICAgJ29wYWNpdHknOiAnMCcsXG4gICAgICAgICAgICAgICAgJ292ZXJmbG93LXknOiAnaGlkZGVuJ1xuXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBhbmltYXRlKCcyMDBtcyBlYXNlLW91dCcpKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4nKSlcbiAgICAgICAgXSksXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBPdXRsaW5lRm9yQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBpdGVtcyB0aGF0IG5lZWRzIHRvIGJlIHJlbmRlcmVkLiBJdCBkb2VzIG5vdCBoYXZlIHRvIGluIGhpZXJhcmNoaWNhbCBvcmRlciBvciB3ZVxuICAgICAqIGxlYXZlIGl0IHVwIHRvIHRoZSBhcHBsaWNhdGlvbiB0byBkZWNpZGUgYWJvdXQgdGhlIHN0cnVjdHVyZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGxpc3Q/OiBhbnlbXTtcblxuXG4gICAgLyoqXG4gICAgICogVGVsbHMgdGhlIGNvbXBvbmVudCBub3QgdG8gcmVuZGVyIGV4cGFuc2lvbiBjb250cm9sLCBpbiBzdWNoIGNhc2Ugd2UgZXhwYW5kQWxsIGFzIGFcbiAgICAgKiBkZWZhdWx0IGJlaGF2aW9yXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dFeHBhbnNpb25Db250cm9sOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIEN1c3RvbSBtZXRob2QgcHJvdmlkZWQgYnkgYXBwbGljYXRpb24gdG8gcmV0cmlldmUgbGlzdCBvZiBjaGlsZHJlbiBmb3IgY3VycmVudCBpdGVtLiBJZlxuICAgICAqIGNoaWxkcmVuIGlzIHVuZGVmaW5lZCB0aGVuLCBkZWZhdWx0ICdjaGlsZHJlbicgZmllbGQgaXMgdXNlZCA8Y3VycmVudEl0ZW0+LmNoaWxkcmVuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjaGlsZHJlbjogKHZhbHVlOiBhbnkpID0+IGFueVtdO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBPcHRpb24gdG8gY29uZGl0aW9uYWxseSByZW5kZXIgb25seSBpdGVtcyB0aGF0IGFyZSBzYXRpc2Z5aW5nIGZpbHRlciBjb25kaXRpb25cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZmlsdGVyT3V0OiAodmFsdWU6IGFueSkgPT4gYm9vbGVhbjtcblxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgYWxsIHRyZWUgbm9kZXMuXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGV4cGFuZEFsbDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICAvKipcbiAgICAgKiAgTWFuYWdlcyB0aGUgc3RhdGUgZm9yIHRoZSBPdXRsaW5lIGNvbXBvbmVudC4gTGF0ZXIgb24gd2UgY2FuIHByb3ZpZGUgZWFzaWVyIHdlIGhvdyB0b1xuICAgICAqICBpbml0aWFsaXplIGFuZCBzZXQgc2VsZWN0aW9uUGF0aHMgYW5kIHNlbGVjdGlvblN0YXRlcyBmcm9tIHRoZSBhcHBsaWNhdGlvblxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzdGF0ZTogT3V0bGluZVN0YXRlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZXQgaW5kZW50YXRpb24gc2l6ZSB0byBiZSB1c2VkIGZvciBlYWNoIGxldmVsXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGluZGVudGF0aW9uUGVyTGV2ZWw6IG51bWJlciA9IDI1O1xuXG5cbiAgICAvKipcbiAgICAgKiBJbiBjYXNlIHRlbXBsYXRlIGlzIG91dHNpZGUgb2YgdGhlIG91dGxpbmVGb3JcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGV4dGVybmFsVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSB0byBjdXJyZW50IG9iamVjdCB1c2luZyB0aGlzIGNvbXBvbmVudFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29udGV4dDogYW55O1xuXG5cbiAgICBASW5wdXQoKVxuICAgIHB1c2hSb290U2VjdGlvbk9uTmV3TGluZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJZGVudGlmaWVzIGN1cnJlbnQgbW9kZWwgbW9kZS5cbiAgICAgKlxuICAgICAqIFdlIHJlY29nbml6ZSB0d28gbW9kZXM6XG4gICAgICpcbiAgICAgKiBGcmVlIC0gQXBwbGljYXRpb24gbmVlZHMgdG8gaW1wbGVtZW50IGEgY2hpbGRyZW4gbWV0aG9kIHRvIHJldHJpZXZlIGEgbGlzdCBvZiBjaGlsZHJlbiBmb3JcbiAgICAgKiBlYWNoIG5vZGUgYW5kIGZvcm1hdCBpcyBwcmV0dHkgbXVjaCB1cHQgdG8gdGhlIGFwcGxpY2F0aW9uXG4gICAgICpcbiAgICAgKiBUcmVlIC0gdGhpcyBpcyBtb3JlIHJlc3RyaWN0aXZlIHdoZXJlIHdlIGhhdmUgY29uY3JldGUgZGF0YSBzdHJ1Y3R1cmVcbiAgICAgKiBpbnRlcmZhY2UgdGhhdCBuZWVkcyB0byBiZSBmb2xsZWRcbiAgICAgKlxuICAgICAqIHRvZG86IGluc3RlYWQgb2YgcGFzc2luZyBmb3JtYXQgYmluZGluZyB0cnkgdG8gbG9vayBpbnRvIHRoZSBsaXN0IHRvIHNlZSB3aGF0IHR5cGUgc29cbiAgICAgKiB3ZSBkb250IG1ha2UgaXQgbWFuZGF0b3J5XG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGZvcm1hdDogTW9kZWxGb3JtYXQgPSAnZnJlZSc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFVzZWQgd2hlbiBpbiBzZWxlY3Rpb24gbW9kZSB0byBwdXNoIGN1cnJlbnQgc2VsZWN0ZWQgSXRlbSB0byB0aGUgYXBwbGljYXRpb25cbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uSXRlbVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUaGlzIGV2ZW50IGlzIHRyaWdnZXJlZCBieSBPdXRsaW5lQ29udHJvbCB3aGVuIG5vZGUgaXMgZXhwYW5kZWQgb3IgY29sbGFwc2VkXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkV4cGFuZENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBBIHRlbXBsYXRlIHRvIHVzZSBvbiBhcHBsaWNhdGlvbiBsZXZlbCB0byByZW5kZXIgaW5kaXZpZHVhbCBpdGVtc1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ291dGxpbmUnKVxuICAgIGNvbnRyb2xUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuXG4gICAgQFZpZXdDaGlsZCgncmVuZGVyZWRJdGVtJylcbiAgICBvdXRsaW5lSXRlbTogRWxlbWVudFJlZjtcblxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWxzXG4gICAgICpcbiAgICAgKiBjdXJyZW50SXRlbSBhbmQgcGFyZW50SXRlbSBhcmUgdXNlZCB0byBjYXB0dXJlIGN1cnJlbnQgcHJvY2Vzc2VkIGl0ZW0gb2YgbmdGb3IuIFRoaXMgaXNcbiAgICAgKiBzZXQgYnkgZGlyZWN0aXZlIGBJbml0TmVzdGluZ0RpcmVjdGl2ZWBcbiAgICAgKlxuICAgICAqIGFuaW1hdGlvbkluUHJvZ3Jlc3M6IHVzZWQgYnkgYW5pbWF0aW9uIGVuZ2luZSB0byBtYWtlIHN1cmUgd2UgZG9udCBkbyBhbnkgYWN0aW9ucyB3aGlsZVxuICAgICAqIGFuaW1hdGlvbiBpcyBpbiB0aGUgcHJvZ3Jlc3NcbiAgICAgKlxuICAgICAqIGVtYmVkZGVkOiBJbmRpY2F0ZXMgdGhhdCB3ZSBhcmUgdXNpbmcgZGlyZWN0aXZlIHNvIGl0IHdpbGwgbm90IGhhdmUgZGVmYXVsdCBjb21wb25lbnRcbiAgICAgKiB3cmFwcGVyXG4gICAgICpcbiAgICAgKi9cbiAgICBjdXJyZW50SXRlbTogYW55O1xuICAgIHBhcmVudEl0ZW06IGFueTtcbiAgICBhbmltYXRpb25JblByb2dyZXNzOiBib29sZWFuO1xuICAgIGVtYmVkZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBGbGFnIHRoYXQgdGVsbHMgdXMgdGhhdCBjb21wb25lbnQgaXMgZnVsbHkgcmVuZGVyZWRcbiAgICAgKlxuICAgICAqL1xuICAgIHZpZXdJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgYnVpbGRlcjogQW5pbWF0aW9uQnVpbGRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IG5ldyBPdXRsaW5lU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnN0YXRlLm91dGxpbmVGb3IpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLm91dGxpbmVGb3IgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZXhwYW5kQWxsKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dFeHBhbnNpb25Db250cm9sID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlLmlzRXhwYW5kZWRBbGwgPSB0aGlzLmV4cGFuZEFsbDtcblxuICAgICAgICAvLyBpbiBjYXNlIHdlIHdhbnQgdG8gcmVuZGVyIGNvbnRlbnQgb2YgdHJlZSBvdXRzaWRlIG9mIG91dGxpbmVGb3JcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmV4dGVybmFsVGVtcGxhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xUZW1wbGF0ZSA9IHRoaXMuZXh0ZXJuYWxUZW1wbGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW1iZWRkZWQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2F3b3V0bGluZWZvcicpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuY29udGV4dCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXM7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgbmdEb0NoZWNrKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nRG9DaGVjaygpO1xuICAgIH1cblxuICAgIGlzVHJlZU1vZGVsRm9ybWF0KCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdCA9PT0gJ3RyZWUnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZWQgYnkgdGVtcGxhdGUgYW5kIE91dGxpbmVDb250cm9sIHRvIGlkZW50aWZ5IHdoaWNoIGl0ZW0gaXMgZXhwYW5kZWQgYW5kIGNvbGxhcHNlZFxuICAgICAqXG4gICAgICovXG4gICAgaXNFeHBhbmRlZChpdGVtOiBhbnksIGN1cnJlbnRMZXZlbDogbnVtYmVyID0gLTEpOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAoY3VycmVudExldmVsID09PSAwICYmIHRoaXMucHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lKSB7XG4gICAgICAgICAgICAvLyBhbHdheXMgb3ZlcnJpZGUvcmVzZXQgZm9yIHJvb3Qgbm9kZXNcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVHJlZU1vZGVsRm9ybWF0KCkpIHtcbiAgICAgICAgICAgICAgICAoPE91dGxpbmVOb2RlPml0ZW0pLmlzRXhwYW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaXNFeHBhbmRlZChpdGVtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNpbmNlIHdlIGhhdmUgY3VycmVudGx5IHR3byB3YXlzIGhvdyB0byBwYXNzIGNoaWxkcmVuIGl0ZW1zIHdlIG5lZWQgaGF2ZSB0aGlzIG1ldGhvZCB0b1xuICAgICAqIHVuaWZ5IHRoZSB3YXkgaG93IHdlIGFjY2VzcyBpdC4gSWYgd2UgcGFzcyBgY2hpbGRyZW5gIGJpbmRpbmcgd2UgdXNlIHRoaXMgaW5zdGVhZCwgb3RoZXJ3aXNlXG4gICAgICogd2UgZXhwZWN0IGN1cnJlbnQgb2JqZWN0IHRvIGhhdmUgYGNoaWxkcmVuYCBmaWVsZFxuICAgICAqXG4gICAgICovXG4gICAgY2hpbGRyZW5Gb3JJdGVtKGl0ZW06IGFueSk6IGFueVtdXG4gICAge1xuICAgICAgICBpZiAodGhpcy5pc1RyZWVNb2RlbEZvcm1hdCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gKDxPdXRsaW5lTm9kZT5pdGVtKS5jaGlsZHJlbiB8fCBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc0NoaWxkcmVuKGl0ZW0pID8gdGhpcy5kb0dldENoaWxkcmVuKGl0ZW0pIDogW107XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ2hlY2sgaWYgdGhlIGN1cnJlbnQgaXRlbSBoYXMgYSBjaGlsZHJlbiBhbmQgbmVlZHMgdG8gYmUgcmVuZGVyZWRcbiAgICAgKlxuICAgICAqL1xuICAgIGhhc0NoaWxkcmVuKGl0ZW06IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmlzVHJlZU1vZGVsRm9ybWF0KCkpIHtcbiAgICAgICAgICAgIGxldCBjaGlsZHJlbiA9ICg8T3V0bGluZU5vZGU+aXRlbSkuY2hpbGRyZW47XG4gICAgICAgICAgICByZXR1cm4gaXNQcmVzZW50KGNoaWxkcmVuKSAmJiBjaGlsZHJlbi5sZW5ndGggPiAwO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNCbGFuayh0aGlzLmNoaWxkcmVuKSAmJiBpc0JsYW5rKGl0ZW0uY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICBhc3NlcnQoZmFsc2UsICdNaXNzaW5nIFtjaGlsZHJlbl0gbWV0aG9kIGJpbmRpbmcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRvR2V0Q2hpbGRyZW4oaXRlbSkubGVuZ3RoID4gMDtcblxuICAgIH1cblxuICAgIGRvR2V0Q2hpbGRyZW4oaXRlbTogYW55KTogYW55W11cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmFwcGx5KHRoaXMuY29udGV4dCwgW2l0ZW1dKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqICBVc2VzIHRoZSBgT3V0bGluZVN0YXRlYCB0byB0b2dnbGUgc3RhdGUgb2YgY3VycmVudCBzZWxlY3Rpb25QYXRoLiBUaGUgYHNlbGVjdGlvblBhdGhgIGlzXG4gICAgICogIHB1dCB0b2dldGhlciBpbnNpZGUgYE91dGxpbmVDb250cm9sYCB3aGVyZSB3ZSBpdGVyYXRlIGFsbCB0aGUgd2F5IHRvIHRoZSByb290IGFuZCBhZGRcbiAgICAgKiAgZWFjaCBpdGVtIHRvIHRoZSBgY3VycmVudFBhdGhgIGFycmF5LiBUaGlzIHdheSB3ZSBjb2xsZWN0IGxpc3Qgb2YgaXRlbSByZXByZXNlbnRpbmcgY3VycmVudFxuICAgICAqICBjdXJyZW50IGV4cGFuc2lvblBhdGguXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHRvZ2dsZUV4cGFuc2lvbigpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5hbmltYXRpb25JblByb2dyZXNzKSB7XG4gICAgICAgICAgICAvLyBiYWNrdXAgcHJvY2VkdXJlIGluIGNhc2Ugb25BbmltYXRpb25Eb25lIGZhaWxzXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uSW5Qcm9ncmVzcykgeyAvLyBjaGFuZ2Ugb25seSBpZiBpdHMgZmFpbHNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25JblByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5lbWJlZGRlZCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25JblByb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjdXJyZW50SXRlbSA9IExpc3RXcmFwcGVyLmxhc3QodGhpcy5zdGF0ZS5jdXJyZW50UGF0aCk7XG4gICAgICAgIHRoaXMuc3RhdGUudG9nZ2xlRXhwYW5zaW9uKHRoaXMuc3RhdGUuY3VycmVudFBhdGgsIHRoaXMuY2hpbGRyZW5Gb3JJdGVtKGN1cnJlbnRJdGVtKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZW1iZWRkZWQpIHtcbiAgICAgICAgICAgIC8vIHRoaXMuYW5pbWF0ZUVtYmVkZGVkSXRlbSgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBbmd1bGFyIGFuaW0uIGNhbGxiYWNrIHRoYXQgc2V0cyBiYWNrIHRoZSBmbGFnIHRvIG1ha2Ugc3VyZSB3ZSBkb24ndCB0cmlnZ2VyIGFuaW1hdGlvbnNcbiAgICAgKiB3aGVuIG9uZSBpcyBpbiBwcm9ncmVzcy5cbiAgICAgKlxuICAgICAqL1xuICAgIG9uQW5pbWF0aW9uRG9uZShldmVudDogRXZlbnQpXG4gICAge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbkluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVkIGluZGVudGF0aW9uIHVzZWQgdG8gc2hpZnQgdGhlIG5lc3RlZCBzZWN0aW9uIHRvIHRoZSByaWdodCBvciBsYXRlciBvbiB0byB0aGVcbiAgICAgKiBsZWZ0IHdoZW4gUlRMIGlzIHN1cHBvcnRlZFxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBpbmRlbnRhdGlvbihjdXJyZW50TGV2ZWw6IG51bWJlcik6IG51bWJlclxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMucHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lICYmIGN1cnJlbnRMZXZlbCA+IDApIHtcbiAgICAgICAgICAgIGN1cnJlbnRMZXZlbCAtPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChjdXJyZW50TGV2ZWwgPT09IDAgJiYgdGhpcy5wdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmUpXG4gICAgICAgICAgICA/IDAgOiAodGhpcy5pbmRlbnRhdGlvblBlckxldmVsICogY3VycmVudExldmVsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOb3QgYWxsIHJvd3MgYXJlIHZpc2libGUgYnkgZGVmYXVsdCwgdGhlcmUgY2FuIGJlIGEgY2FzZSB3aGVyZSB5b3UgZG9udCB3YW50IHRvIHJlbmRlciBpdGVtc1xuICAgICAqIHVzaW5nIG91dGxpbmUuIGUuZy4gRGF0YXRhYmxlIHdpdGggZGV0YWlsIHJvdy5cbiAgICAgKi9cbiAgICBpc1Zpc2libGUoaXRlbTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmZpbHRlck91dCkpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5maWx0ZXJPdXQoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuXG4vKipcbiAqXG4gKiBTaW5jZSB3ZSBjYW4gbm90IGRpcmVjdGx5IHNldCBgKm5nVGVtcGxhdGVPdXRsZXRgIGNvbnRleHQgdmFyaWFibGVzIHRvIHRoZSB0eXBlc2NyaXB0IGNsYXNzIHdlXG4gKiB1c2UgdGhpcyBkaXJlY3RpdmUgdG8gZG8gdGhlIEpvYlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbaW5pdE5lc3RpbmddJ1xufSlcbmV4cG9ydCBjbGFzcyBJbml0TmVzdGluZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdFxue1xuXG4gICAgQElucHV0KClcbiAgICBzZXRMZXZlbDogbnVtYmVyO1xuXG5cbiAgICBASW5wdXQoKVxuICAgIHNldEN1cnJyZW50SXRlbTogYW55O1xuXG5cbiAgICBASW5wdXQoKVxuICAgIHNldFBhcmVudEl0ZW06IGFueTtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBvdXRsaW5lOiBPdXRsaW5lRm9yQ29tcG9uZW50KVxuICAgIHtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5zZXRMZXZlbCkpIHtcbiAgICAgICAgICAgIHRoaXMub3V0bGluZS5zdGF0ZS5jdXJyZW50TGV2ZWwgPSB0aGlzLnNldExldmVsO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuc2V0Q3VycnJlbnRJdGVtKSkge1xuICAgICAgICAgICAgdGhpcy5vdXRsaW5lLmN1cnJlbnRJdGVtID0gdGhpcy5zZXRDdXJycmVudEl0ZW07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm91dGxpbmUuaXNUcmVlTW9kZWxGb3JtYXQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3V0bGluZS5jdXJyZW50SXRlbVsnJCRwYXJlbnRJdGVtJ11cbiAgICAgICAgICAgICAgICAgICAgPSAoPE91dGxpbmVOb2RlPnRoaXMuc2V0Q3VycnJlbnRJdGVtKS5wYXJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMub3V0bGluZS5pc1RyZWVNb2RlbEZvcm1hdCgpICYmIGlzUHJlc2VudCh0aGlzLnNldFBhcmVudEl0ZW0pKSB7XG4gICAgICAgICAgICB0aGlzLm91dGxpbmUuY3VycmVudEl0ZW1bJyQkcGFyZW50SXRlbSddID0gdGhpcy5zZXRQYXJlbnRJdGVtO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbiJdfQ==