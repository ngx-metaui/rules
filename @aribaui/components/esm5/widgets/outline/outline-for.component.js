/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
            /** @type {?} */
            var children = (/** @type {?} */ (item)).children;
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
        /** @type {?} */
        var currentItem = ListWrapper.last(this.state.currentPath);
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
                },] }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS1mb3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvb3V0bGluZS9vdXRsaW5lLWZvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFvQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULGdCQUFnQixFQUNuQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2pHLE9BQU8sRUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFZLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQzdDLE1BQU0sd0JBQXdCLElBQVM7SUFFbkMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsbUJBQWMsSUFBSSxFQUFDLENBQUM7V0FDakQsU0FBUyxDQUFDLG1CQUFjLElBQUksRUFBQyxDQUFDLE1BQU0sQ0FBQztXQUNyQyxTQUFTLENBQUMsbUJBQWMsSUFBSSxFQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF1SXdDLCtDQUFhO0lBcUpsRCw2QkFBbUIsR0FBZ0IsRUFDZixnQkFDQSxTQUNBO1FBSHBCLFlBS0ksa0JBQU0sR0FBRyxDQUFDLFNBRWI7UUFQa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTtRQUNmLG9CQUFjLEdBQWQsY0FBYztRQUNkLGFBQU8sR0FBUCxPQUFPO1FBQ1AsYUFBTyxHQUFQLE9BQU87Ozs7OztxQ0F2SUssSUFBSTs7Ozs7MEJBdUJmLEtBQUs7Ozs7OztvQ0FpQkksRUFBRTt5Q0FrQkksS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBbUJuQixNQUFNOzs7Ozs7K0JBUVEsSUFBSSxZQUFZLEVBQUU7Ozs7OzsrQkFTbEIsSUFBSSxZQUFZLEVBQUU7eUJBNkJsQyxLQUFLOzs7OztnQ0FNRSxLQUFLOztLQVUvQjs7OztJQUVELHNDQUFROzs7SUFBUjtRQUVJLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztTQUNuQztRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDaEM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1NBQ3JDO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7UUFHMUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztTQUNoRDtRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRXhFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO0tBRUo7Ozs7SUFHRCx1Q0FBUzs7O0lBQVQ7UUFFSSxpQkFBTSxTQUFTLFdBQUUsQ0FBQztLQUNyQjs7OztJQUVELCtDQUFpQjs7O0lBQWpCO1FBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDO0tBQ2pDO0lBRUQ7OztPQUdHOzs7Ozs7OztJQUNILHdDQUFVOzs7Ozs7O0lBQVYsVUFBVyxJQUFTLEVBQUUsWUFBeUI7UUFBekIsNkJBQUEsRUFBQSxnQkFBd0IsQ0FBQztRQUUzQyxFQUFFLENBQUMsQ0FBQyxZQUFZLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7O1lBRXRELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsbUJBQWMsSUFBSSxFQUFDLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzthQUN6QztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0QztJQUVEOzs7Ozs7T0FNRzs7Ozs7Ozs7OztJQUNILDZDQUFlOzs7Ozs7Ozs7SUFBZixVQUFnQixJQUFTO1FBRXJCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsbUJBQWMsSUFBSSxFQUFDLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztTQUM3QztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUNqRTtLQUNKO0lBR0Q7Ozs7T0FJRzs7Ozs7Ozs7SUFDSCx5Q0FBVzs7Ozs7OztJQUFYLFVBQVksSUFBUztRQUVqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7O1lBQzNCLElBQUksUUFBUSxHQUFHLG1CQUFjLElBQUksRUFBQyxDQUFDLFFBQVEsQ0FBQztZQUM1QyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBRXJEO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUQsTUFBTSxDQUFDLEtBQUssRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDO1NBQ3REO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztLQUU5Qzs7Ozs7SUFFRCwyQ0FBYTs7OztJQUFiLFVBQWMsSUFBUztRQUVuQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDcEQ7SUFHRDs7Ozs7OztPQU9HOzs7Ozs7Ozs7O0lBQ0gsNkNBQWU7Ozs7Ozs7OztJQUFmO1FBQUEsaUJBdUJDO1FBckJHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7O1lBRTNCLFVBQVUsQ0FBQztnQkFFUCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDOztvQkFDM0IsS0FBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztpQkFDcEM7YUFDSixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ1IsTUFBTSxDQUFDO1NBQ1Y7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7U0FDbkM7O1FBRUQsSUFBSSxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUV0RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7U0FFbkI7S0FDSjtJQUdEOzs7O09BSUc7Ozs7Ozs7O0lBQ0gsNkNBQWU7Ozs7Ozs7SUFBZixVQUFnQixLQUFZO1FBRXhCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7S0FDcEM7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7O0lBQ0gseUNBQVc7Ozs7Ozs7O0lBQVgsVUFBWSxZQUFvQjtRQUU1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEQsWUFBWSxJQUFJLENBQUMsQ0FBQztTQUNyQjtRQUVELE1BQU0sQ0FBQyxDQUFDLFlBQVksS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLHdCQUF3QixDQUFDO1lBQ3hELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFlBQVksQ0FBQyxDQUFDO0tBQ3ZEO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsdUNBQVM7Ozs7OztJQUFULFVBQVUsSUFBUztRQUVmLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7O2dCQS9WSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGdDQUFnQztvQkFDMUMsczdHQUF5QztvQkFHekMsVUFBVSxFQUFFO3dCQUNSLE9BQU8sQ0FBQyxTQUFTLEVBQUU7NEJBQ2YsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUM7Z0NBQ2IsWUFBWSxFQUFFLFFBQVE7Z0NBQ3RCLFFBQVEsRUFBRSxHQUFHO2dDQUNiLFNBQVMsRUFBRSxHQUFHOzZCQUVqQixDQUFDLENBQUM7NEJBQ0gsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7Z0NBQ2hCLFFBQVEsRUFBRSxHQUFHO2dDQUNiLFNBQVMsRUFBRSxHQUFHO2dDQUNkLFlBQVksRUFBRSxRQUFROzZCQUV6QixDQUFDLENBQUM7NEJBQ0gsVUFBVSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs0QkFDbEQsVUFBVSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7eUJBQ3BELENBQUM7cUJBQ0w7O2lCQUNKOzs7O2dCQXZMZSxXQUFXO2dCQUh2QixnQkFBZ0I7Z0JBRUgsZ0JBQWdCO2dCQVQ3QixVQUFVOzs7dUJBeU1ULEtBQUs7dUNBU0wsS0FBSzsyQkFPTCxLQUFLOzRCQVFMLEtBQUs7NEJBUUwsS0FBSzt3QkFTTCxLQUFLO3NDQVFMLEtBQUs7bUNBT0wsS0FBSzswQkFPTCxLQUFLOzJDQUlMLEtBQUs7eUJBbUJMLEtBQUs7aUNBUUwsTUFBTTtpQ0FTTixNQUFNO2tDQU1OLFlBQVksU0FBQyxTQUFTOzhCQUl0QixTQUFTLFNBQUMsY0FBYzs7OEJBbFY3QjtFQTBOeUMsYUFBYTtTQUF6QyxtQkFBbUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFrVzVCLDhCQUFvQixPQUE0QjtRQUE1QixZQUFPLEdBQVAsT0FBTyxDQUFxQjtLQUUvQzs7OztJQUdELHVDQUFROzs7SUFBUjtRQUVJLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ25EO1FBR0QsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUVoRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUM7c0JBQ2xDLG1CQUFjLElBQUksQ0FBQyxlQUFlLEVBQUMsQ0FBQyxNQUFNLENBQUM7YUFDcEQ7U0FDSjtRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDakU7S0FDSjs7Z0JBMUNKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZUFBZTtpQkFDNUI7Ozs7Z0JBZ0JnQyxtQkFBbUI7OzsyQkFaL0MsS0FBSztrQ0FJTCxLQUFLO2dDQUlMLEtBQUs7OytCQXhqQlY7O1NBNmlCYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7YW5pbWF0ZSwgQW5pbWF0aW9uQnVpbGRlciwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7YXNzZXJ0LCBFbnZpcm9ubWVudCwgSWRlbnRpdHksIGlzQmxhbmssIGlzUHJlc2VudCwgTGlzdFdyYXBwZXJ9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7T3V0bGluZVN0YXRlfSBmcm9tICcuL291dGxpbmUtc3RhdGUnO1xuXG5cbi8qKlxuICogVGhpcyBpbnRlcmZhY2UgcmVwcmVzZW50IGNvbmNyZXRlIHRyZWUgc3RydWN0dXJlIGZvciB0aGUgb3V0bGluZSB0cmVlIG1vZGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBPdXRsaW5lTm9kZSBleHRlbmRzIElkZW50aXR5XG57XG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHRvIHBhcmVudCBub2RlLlxuICAgICAqL1xuICAgIHBhcmVudDogT3V0bGluZU5vZGU7XG5cbiAgICAvKipcbiAgICAgKiBOb2RlJ3MgY2hpbGRyZW4uIEV2ZW4gaXRzIGEgZmllbGQgaXQgY2FuIGJlIGltcGxlbWVudGVkIGxhemlseSB1c2luZyBnZXR0ZXIgd2hlcmUgYSB0YXJnZXRcbiAgICAgKiBvYmplY3QgZG9lcyBub3QgaW1wbGVtZW50IHRoaXMgYXMgYSBwdWJsaWMgZmllbGQgYnV0IGEgZ2V0dGVyIHdpdGggY29udHJvbCBvdmVyIHRoZVxuICAgICAqIHJldHJpZXZlZCBsaXN0XG4gICAgICovXG4gICAgY2hpbGRyZW46IE91dGxpbmVOb2RlW107XG5cbiAgICAvKipcbiAgICAgKiBEaWZmZXJlbnQgc3RhdGVzIGZvciBvdXRsaW5lIE5vZGVcbiAgICAgKlxuICAgICAqIGlzRXhwYW5kZWQ6IGJvb2xlYW47PSBtb3Zpbmcgb3V0IGFzIHRoaXMgaXMgbWFuYWdlZCBieSBleHBhbnNpb25zdGF0ZS5cbiAgICAgKi9cbiAgICBpc0V4cGFuZGVkOiBib29sZWFuO1xuICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW47XG4gICAgaXNNYXRjaD86IGJvb2xlYW47XG4gICAgcmVhZG9ubHk/OiBib29sZWFuO1xuICAgIHR5cGU/OiBzdHJpbmc7XG4gICAgZHJhZ2dhYmxlPzogYm9vbGVhbjtcbiAgICBkcm9wcGFibGU/OiBib29sZWFuO1xuICAgIHZpc2libGU/OiBib29sZWFuO1xuXG59XG5cblxuLyoqXG4gKlxuICogQ2hlY2tzIHR5cGUgZm9yIE91dGxpbmVOb2RlXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPdXRsaW5lTm9kZShub2RlOiBhbnkpOiBub2RlIGlzIE91dGxpbmVOb2RlXG57XG4gICAgcmV0dXJuIGlzUHJlc2VudChub2RlKSAmJiBpc1ByZXNlbnQoKDxPdXRsaW5lTm9kZT5ub2RlKSlcbiAgICAgICAgJiYgaXNQcmVzZW50KCg8T3V0bGluZU5vZGU+bm9kZSkucGFyZW50KVxuICAgICAgICAmJiBpc1ByZXNlbnQoKDxPdXRsaW5lTm9kZT5ub2RlKS5jaGlsZHJlbik7XG59XG5cblxuLyoqXG4gKiBDdXJyZW50bHkgb3V0bGluZSBzdXBwb3J0cyBvbmx5IHR3byBtb2RlcyBmcmVlLCB3aGVyZSBhcHBsaWNhdGlvbiBpcyByZXNwb25zaWJsZSB0byByZXRyaWV2ZVxuICogY2hpbGRyZW4gZm9yIGVhY2ggbm9kZSBhbmQgdHJlZSB3aXRoIGFib3ZlIE91dGxpbmVOb2RlIHN0cnVjdHVyZVxuICovXG5leHBvcnQgdHlwZSBNb2RlbEZvcm1hdCA9ICdmcmVlJyB8ICd0cmVlJztcblxuXG4vKipcbiAqXG4gKiBPdXRsaW5lRm9yQ29tcG9uZW50IGlzIGxpa2UgbmdGb3IsIGJ1dCBmb3IgaGllcmFyY2hpY2FsIChvdXRsaW5lL3RyZWUpIHN0cnVjdHVyZXMgLS0gaS5lLiBpblxuICogdGhvc2UgY2FzZXMgd2hlcmUgYW4gaXRlbSBtYXkgaGF2ZSBjaGlsZHJlbi5cbiAqXG4gKlxuICogSXQgdXNlcyBvdXRsaW5lIGA8YXctb3V0bGluZS1jb250cm9sPmAgdG8gcHJvdmlkZSBleHBhbmRpbmcgZnVuY3Rpb25hbGl0eSwgaW5kZW50YXRpb25cbiAqIGFuZCBvdGhlciB0aGluZ3MuXG4gKlxuICpcbiAqIFRoaXMgY29tcG9uZW50IGhhcyBtaW5pbWFsIHN0eWxpbmcgdG8gbWFrZSBzdXJlIGl0IGNhbiBiZSBjaGFuZ2VkIGVhc2lseS5cbiAqXG4gKiAjIyMgRXhhbXBsZSByZW5kZXJpbmcgdHJlZSBzZWN0aW9uLCB3aGVyZSBiYXNlZCBvbiB0aGUgdHlwZSB3ZSBmb3JtYXQgdGhlIG91dCBwbHVzXG4gKiBmb3IgdGhlIG1haW4gcm9vdCBzZWN0aW9uIHdlIGFsd2F5cyByZW5kZXIgbGl0dGxlIHBvcHVwIG1lbnUuXG4gKlxuICogYGBgXG4gKlxuICogICA8YXctb3V0bGluZS1mb3IgW2xpc3RdPVwibGlzdFwiIFtoYXNDaGlsZHJlbl09XCJoYXNDaGlsZHJlblwiPlxuICpcbiAqICAgICAgIDxuZy10ZW1wbGF0ZSAjb3V0bGluZSBsZXQtaXRlbT5cbiAqXG4gKiAgICAgICAgICAgPGRpdiBjbGFzcz1cIm15LXNlY3Rpb25cIj5cbiAqICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm91dGxpbmVcIj5cbiAqICAgICAgICAgICAgICAgICAgIDxhdy1vdXRsaW5lLWNvbnRyb2w+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiaXRlbS50eXBlXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdTd2l0Y2hDYXNlXT1cIid0ZXh0J1wiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFzLXBhcmFncmFmXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tpdGVtPy5jb250ZW50fX1cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICpcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ1N3aXRjaERlZmF1bHQ+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2l0ZW0/LmNvbnRlbnR9fVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICpcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gKlxuICpcbiAqICAgICAgICAgICAgICAgICAgIDwvYXctb3V0bGluZS1jb250cm9sPlxuICogICAgICAgICAgICAgICA8L2Rpdj5cbiAqXG4gKiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWx0ZXJzXCIgKm5nSWY9XCJpdGVtLnR5cGUgPT09ICdzZWN0aW9uJ1wiID5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICA8YXctaG92ZXItY2FyZCBbbGlua1RpdGxlXT1cIidGaWx0ZXIgSXRlbXMnXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgPGF3LWxpc3QgW2xpc3RdPVwiZmlsdGVySXRlbXNcIiBbYm9yZGVybGVzc109XCJ0cnVlXCI+PC9hdy1saXN0PlxuICogICAgICAgICAgICAgICAgICAgPC9hdy1ob3Zlci1jYXJkPlxuICpcbiAqICAgICAgICAgICAgICAgPC9kaXY+XG4gKiAgICAgICAgICAgPC9kaXY+XG4gKiAgICAgPC9uZy10ZW1wbGF0ZT5gXG4gKiAgIDwvYXctb3V0bGluZS1mb3I+XG4gKlxuICogYGBgXG4gKlxuICpcbiAqIFdlIGNhbiB1c2UgaXQgYWxzbyBpbiBlbWJlZGRlZCBtb2RlIHdoZXJlIHdlIHVzZSB0aGUgYGF3T3V0bGluZUZvcmAgZGlyZWN0aXZlXG4gKlxuICogIyMgRXhhbXBsZVxuICpcbiAqXG4gKiBgYGBgXG4gKiAgPHRhYmxlICBjbGFzcz1cInRyZWUtdGFibGVcIiA+XG4gKiAgICAgIDx0aGVhZD5cbiAqICAgICAgICAgIDx0cj5cbiAqICAgICAgICAgICAgICA8dGg+TmFtZTwvdGg+XG4gKiAgICAgICAgICAgICAgPHRoPlR5cGU8L3RoPlxuICogICAgICAgICAgPC90cj5cbiAqICAgICAgPC90aGVhZD5cbiAqICAgICAgPHRib2R5ICNvb28yIGF3T3V0bGluZUZvciBbbGlzdF09XCJsaXN0XCJcbiAqICAgICAgICAgICAgIFtoYXNDaGlsZHJlbl09XCJoYXNDaGlsZHJlblwiXG4gKiAgICAgICAgICAgICBjbGFzcz1cIm91dGxpbmUtdGFibGVcIlxuICogICAgICA+XG4gKiAgICAgICAgICA8bmctdGVtcGxhdGUgI291dGxpbmUgbGV0LWl0ZW0+XG4gKiAgICAgICAgICAgICAgPHRyPlxuICogICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJpdGVtLW5hbWUgb3V0bGluZS1hbmltYXRpb25cIj5cbiAqICAgICAgICAgICAgICAgICAgICAgIDxkaXY+PGF3LW91dGxpbmUtY29udHJvbD5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICB7e2l0ZW0/LmNvbnRlbnR9fVxuICogICAgICAgICAgICAgICAgICAgICAgPC9hdy1vdXRsaW5lLWNvbnRyb2w+PC9kaXY+XG4gKiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gKiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cIml0ZW0tdHlwZSBvdXRsaW5lLWFuaW1hdGlvblwiPlxuICogICAgICAgICAgICAgICAgICAgICAgPGRpdj57e2l0ZW0udHlwZX19PC9kaXY+XG4gKiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gKiAgICAgICAgICAgICAgPC90cj5cbiAqICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKiAgICAgIDwvdGJvZHk+XG4gKiAgPC90YWJsZT5cbiAqXG4gKiBgYGBcbiAqXG4gKiBJIHdhcyB0aGlua2luZyBtYXliZSBmb3IgZmlyc3QgdGltZSB3ZSBkb24ndCBuZWVkIHRoZSBzYW1lIGFuaW1hdGlvbiBsaWtlIGV4cGFuZGluZyBhbmRcbiAqIGNvbGxhcHNpbmcuIE1heWJlIHdlIG5lZWQgZmFkZS1pbi4gSW4gc3VjaCBjYXNlIEkgd291bGQgcHJvYmFibHkgYXBwbHkgQHNlY3Rpb24gYW5pbSBvbmx5XG4gKiBvbiBpdGVtcyB3aGVyZSBsZXZlbCA+IDAgKGluIHRoZSB0ZW1wbGF0ZSBJIGtlZXAgbGV2ZWxzKSBhbmQgaWYgbGV2ZWwgPT0gMCB0aGVuIEkgd291bGRcbiAqIGV4ZWN1dGUgdGhlIHNhbWUgcmVuZGVyaW5nIGp1c3Qgd2l0aG91dCBbQHNlY3Rpb25dXG4gKlxuICpcbiAqIFRvZG86IFRoaW5rIGFib3V0IGhvdyB0byBkbyBhbmltYXRpb24gZm9yIHRoZSB0YWJsZSBjYXNlLiBNdXN0IGFsc28gd3JpdGUgdW5pdGVzdCAtIGR1ZSB0b1xuICogQXJpYmFMaXZlIGFnZ3Jlc3NpdmUgc2NoZWR1bGUgd2UgYXJlIHNraXBwaW5nIHRoZW0gZm9yIG5vd1xuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1vdXRsaW5lLWZvciwgW2F3T3V0bGluZUZvcl0nLFxuICAgIHRlbXBsYXRlVXJsOiAnb3V0bGluZS1mb3IuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydvdXRsaW5lLWZvci5jb21wb25lbnQuc2NzcyddLFxuXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdzZWN0aW9uJywgW1xuICAgICAgICAgICAgc3RhdGUoJyonLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgJ292ZXJmbG93LXknOiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogJyonLFxuICAgICAgICAgICAgICAgICdvcGFjaXR5JzogJzEnXG5cbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgICdoZWlnaHQnOiAnMCcsXG4gICAgICAgICAgICAgICAgJ29wYWNpdHknOiAnMCcsXG4gICAgICAgICAgICAgICAgJ292ZXJmbG93LXknOiAnaGlkZGVuJ1xuXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBhbmltYXRlKCcyMDBtcyBlYXNlLW91dCcpKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4nKSlcbiAgICAgICAgXSksXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBPdXRsaW5lRm9yQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBpdGVtcyB0aGF0IG5lZWRzIHRvIGJlIHJlbmRlcmVkLiBJdCBkb2VzIG5vdCBoYXZlIHRvIGluIGhpZXJhcmNoaWNhbCBvcmRlciBvciB3ZVxuICAgICAqIGxlYXZlIGl0IHVwIHRvIHRoZSBhcHBsaWNhdGlvbiB0byBkZWNpZGUgYWJvdXQgdGhlIHN0cnVjdHVyZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGxpc3Q/OiBhbnlbXTtcblxuXG4gICAgLyoqXG4gICAgICogVGVsbHMgdGhlIGNvbXBvbmVudCBub3QgdG8gcmVuZGVyIGV4cGFuc2lvbiBjb250cm9sLCBpbiBzdWNoIGNhc2Ugd2UgZXhwYW5kQWxsIGFzIGFcbiAgICAgKiBkZWZhdWx0IGJlaGF2aW9yXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dFeHBhbnNpb25Db250cm9sOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIEN1c3RvbSBtZXRob2QgcHJvdmlkZWQgYnkgYXBwbGljYXRpb24gdG8gcmV0cmlldmUgbGlzdCBvZiBjaGlsZHJlbiBmb3IgY3VycmVudCBpdGVtLiBJZlxuICAgICAqIGNoaWxkcmVuIGlzIHVuZGVmaW5lZCB0aGVuLCBkZWZhdWx0ICdjaGlsZHJlbicgZmllbGQgaXMgdXNlZCA8Y3VycmVudEl0ZW0+LmNoaWxkcmVuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjaGlsZHJlbjogKHZhbHVlOiBhbnkpID0+IGFueVtdO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBPcHRpb24gdG8gY29uZGl0aW9uYWxseSByZW5kZXIgb25seSBpdGVtcyB0aGF0IGFyZSBzYXRpc2Z5aW5nIGZpbHRlciBjb25kaXRpb25cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZmlsdGVyT3V0OiAodmFsdWU6IGFueSkgPT4gYm9vbGVhbjtcblxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgYWxsIHRyZWUgbm9kZXMuXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGV4cGFuZEFsbDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICAvKipcbiAgICAgKiAgTWFuYWdlcyB0aGUgc3RhdGUgZm9yIHRoZSBPdXRsaW5lIGNvbXBvbmVudC4gTGF0ZXIgb24gd2UgY2FuIHByb3ZpZGUgZWFzaWVyIHdlIGhvdyB0b1xuICAgICAqICBpbml0aWFsaXplIGFuZCBzZXQgc2VsZWN0aW9uUGF0aHMgYW5kIHNlbGVjdGlvblN0YXRlcyBmcm9tIHRoZSBhcHBsaWNhdGlvblxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzdGF0ZTogT3V0bGluZVN0YXRlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZXQgaW5kZW50YXRpb24gc2l6ZSB0byBiZSB1c2VkIGZvciBlYWNoIGxldmVsXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGluZGVudGF0aW9uUGVyTGV2ZWw6IG51bWJlciA9IDI1O1xuXG5cbiAgICAvKipcbiAgICAgKiBJbiBjYXNlIHRlbXBsYXRlIGlzIG91dHNpZGUgb2YgdGhlIG91dGxpbmVGb3JcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGV4dGVybmFsVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSB0byBjdXJyZW50IG9iamVjdCB1c2luZyB0aGlzIGNvbXBvbmVudFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29udGV4dDogYW55O1xuXG5cbiAgICBASW5wdXQoKVxuICAgIHB1c2hSb290U2VjdGlvbk9uTmV3TGluZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJZGVudGlmaWVzIGN1cnJlbnQgbW9kZWwgbW9kZS5cbiAgICAgKlxuICAgICAqIFdlIHJlY29nbml6ZSB0d28gbW9kZXM6XG4gICAgICpcbiAgICAgKiBGcmVlIC0gQXBwbGljYXRpb24gbmVlZHMgdG8gaW1wbGVtZW50IGEgY2hpbGRyZW4gbWV0aG9kIHRvIHJldHJpZXZlIGEgbGlzdCBvZiBjaGlsZHJlbiBmb3JcbiAgICAgKiBlYWNoIG5vZGUgYW5kIGZvcm1hdCBpcyBwcmV0dHkgbXVjaCB1cHQgdG8gdGhlIGFwcGxpY2F0aW9uXG4gICAgICpcbiAgICAgKiBUcmVlIC0gdGhpcyBpcyBtb3JlIHJlc3RyaWN0aXZlIHdoZXJlIHdlIGhhdmUgY29uY3JldGUgZGF0YSBzdHJ1Y3R1cmVcbiAgICAgKiBpbnRlcmZhY2UgdGhhdCBuZWVkcyB0byBiZSBmb2xsZWRcbiAgICAgKlxuICAgICAqIHRvZG86IGluc3RlYWQgb2YgcGFzc2luZyBmb3JtYXQgYmluZGluZyB0cnkgdG8gbG9vayBpbnRvIHRoZSBsaXN0IHRvIHNlZSB3aGF0IHR5cGUgc29cbiAgICAgKiB3ZSBkb250IG1ha2UgaXQgbWFuZGF0b3J5XG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGZvcm1hdDogTW9kZWxGb3JtYXQgPSAnZnJlZSc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFVzZWQgd2hlbiBpbiBzZWxlY3Rpb24gbW9kZSB0byBwdXNoIGN1cnJlbnQgc2VsZWN0ZWQgSXRlbSB0byB0aGUgYXBwbGljYXRpb25cbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uSXRlbVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUaGlzIGV2ZW50IGlzIHRyaWdnZXJlZCBieSBPdXRsaW5lQ29udHJvbCB3aGVuIG5vZGUgaXMgZXhwYW5kZWQgb3IgY29sbGFwc2VkXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkV4cGFuZENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBBIHRlbXBsYXRlIHRvIHVzZSBvbiBhcHBsaWNhdGlvbiBsZXZlbCB0byByZW5kZXIgaW5kaXZpZHVhbCBpdGVtc1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ291dGxpbmUnKVxuICAgIGNvbnRyb2xUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuXG4gICAgQFZpZXdDaGlsZCgncmVuZGVyZWRJdGVtJylcbiAgICBvdXRsaW5lSXRlbTogRWxlbWVudFJlZjtcblxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWxzXG4gICAgICpcbiAgICAgKiBjdXJyZW50SXRlbSBhbmQgcGFyZW50SXRlbSBhcmUgdXNlZCB0byBjYXB0dXJlIGN1cnJlbnQgcHJvY2Vzc2VkIGl0ZW0gb2YgbmdGb3IuIFRoaXMgaXNcbiAgICAgKiBzZXQgYnkgZGlyZWN0aXZlIGBJbml0TmVzdGluZ0RpcmVjdGl2ZWBcbiAgICAgKlxuICAgICAqIGFuaW1hdGlvbkluUHJvZ3Jlc3M6IHVzZWQgYnkgYW5pbWF0aW9uIGVuZ2luZSB0byBtYWtlIHN1cmUgd2UgZG9udCBkbyBhbnkgYWN0aW9ucyB3aGlsZVxuICAgICAqIGFuaW1hdGlvbiBpcyBpbiB0aGUgcHJvZ3Jlc3NcbiAgICAgKlxuICAgICAqIGVtYmVkZGVkOiBJbmRpY2F0ZXMgdGhhdCB3ZSBhcmUgdXNpbmcgZGlyZWN0aXZlIHNvIGl0IHdpbGwgbm90IGhhdmUgZGVmYXVsdCBjb21wb25lbnRcbiAgICAgKiB3cmFwcGVyXG4gICAgICpcbiAgICAgKi9cbiAgICBjdXJyZW50SXRlbTogYW55O1xuICAgIHBhcmVudEl0ZW06IGFueTtcbiAgICBhbmltYXRpb25JblByb2dyZXNzOiBib29sZWFuO1xuICAgIGVtYmVkZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBGbGFnIHRoYXQgdGVsbHMgdXMgdGhhdCBjb21wb25lbnQgaXMgZnVsbHkgcmVuZGVyZWRcbiAgICAgKlxuICAgICAqL1xuICAgIHZpZXdJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgYnVpbGRlcjogQW5pbWF0aW9uQnVpbGRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IG5ldyBPdXRsaW5lU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnN0YXRlLm91dGxpbmVGb3IpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLm91dGxpbmVGb3IgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZXhwYW5kQWxsKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dFeHBhbnNpb25Db250cm9sID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlLmlzRXhwYW5kZWRBbGwgPSB0aGlzLmV4cGFuZEFsbDtcblxuICAgICAgICAvLyBpbiBjYXNlIHdlIHdhbnQgdG8gcmVuZGVyIGNvbnRlbnQgb2YgdHJlZSBvdXRzaWRlIG9mIG91dGxpbmVGb3JcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmV4dGVybmFsVGVtcGxhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xUZW1wbGF0ZSA9IHRoaXMuZXh0ZXJuYWxUZW1wbGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW1iZWRkZWQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2F3b3V0bGluZWZvcicpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuY29udGV4dCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXM7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgbmdEb0NoZWNrKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nRG9DaGVjaygpO1xuICAgIH1cblxuICAgIGlzVHJlZU1vZGVsRm9ybWF0KCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdCA9PT0gJ3RyZWUnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZWQgYnkgdGVtcGxhdGUgYW5kIE91dGxpbmVDb250cm9sIHRvIGlkZW50aWZ5IHdoaWNoIGl0ZW0gaXMgZXhwYW5kZWQgYW5kIGNvbGxhcHNlZFxuICAgICAqXG4gICAgICovXG4gICAgaXNFeHBhbmRlZChpdGVtOiBhbnksIGN1cnJlbnRMZXZlbDogbnVtYmVyID0gLTEpOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAoY3VycmVudExldmVsID09PSAwICYmIHRoaXMucHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lKSB7XG4gICAgICAgICAgICAvLyBhbHdheXMgb3ZlcnJpZGUvcmVzZXQgZm9yIHJvb3Qgbm9kZXNcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVHJlZU1vZGVsRm9ybWF0KCkpIHtcbiAgICAgICAgICAgICAgICAoPE91dGxpbmVOb2RlPml0ZW0pLmlzRXhwYW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaXNFeHBhbmRlZChpdGVtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNpbmNlIHdlIGhhdmUgY3VycmVudGx5IHR3byB3YXlzIGhvdyB0byBwYXNzIGNoaWxkcmVuIGl0ZW1zIHdlIG5lZWQgaGF2ZSB0aGlzIG1ldGhvZCB0b1xuICAgICAqIHVuaWZ5IHRoZSB3YXkgaG93IHdlIGFjY2VzcyBpdC4gSWYgd2UgcGFzcyBgY2hpbGRyZW5gIGJpbmRpbmcgd2UgdXNlIHRoaXMgaW5zdGVhZCwgb3RoZXJ3aXNlXG4gICAgICogd2UgZXhwZWN0IGN1cnJlbnQgb2JqZWN0IHRvIGhhdmUgYGNoaWxkcmVuYCBmaWVsZFxuICAgICAqXG4gICAgICovXG4gICAgY2hpbGRyZW5Gb3JJdGVtKGl0ZW06IGFueSk6IGFueVtdXG4gICAge1xuICAgICAgICBpZiAodGhpcy5pc1RyZWVNb2RlbEZvcm1hdCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gKDxPdXRsaW5lTm9kZT5pdGVtKS5jaGlsZHJlbiB8fCBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc0NoaWxkcmVuKGl0ZW0pID8gdGhpcy5kb0dldENoaWxkcmVuKGl0ZW0pIDogW107XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ2hlY2sgaWYgdGhlIGN1cnJlbnQgaXRlbSBoYXMgYSBjaGlsZHJlbiBhbmQgbmVlZHMgdG8gYmUgcmVuZGVyZWRcbiAgICAgKlxuICAgICAqL1xuICAgIGhhc0NoaWxkcmVuKGl0ZW06IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmlzVHJlZU1vZGVsRm9ybWF0KCkpIHtcbiAgICAgICAgICAgIGxldCBjaGlsZHJlbiA9ICg8T3V0bGluZU5vZGU+aXRlbSkuY2hpbGRyZW47XG4gICAgICAgICAgICByZXR1cm4gaXNQcmVzZW50KGNoaWxkcmVuKSAmJiBjaGlsZHJlbi5sZW5ndGggPiAwO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNCbGFuayh0aGlzLmNoaWxkcmVuKSAmJiBpc0JsYW5rKGl0ZW0uY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICBhc3NlcnQoZmFsc2UsICdNaXNzaW5nIFtjaGlsZHJlbl0gbWV0aG9kIGJpbmRpbmcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRvR2V0Q2hpbGRyZW4oaXRlbSkubGVuZ3RoID4gMDtcblxuICAgIH1cblxuICAgIGRvR2V0Q2hpbGRyZW4oaXRlbTogYW55KTogYW55W11cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmFwcGx5KHRoaXMuY29udGV4dCwgW2l0ZW1dKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqICBVc2VzIHRoZSBgT3V0bGluZVN0YXRlYCB0byB0b2dnbGUgc3RhdGUgb2YgY3VycmVudCBzZWxlY3Rpb25QYXRoLiBUaGUgYHNlbGVjdGlvblBhdGhgIGlzXG4gICAgICogIHB1dCB0b2dldGhlciBpbnNpZGUgYE91dGxpbmVDb250cm9sYCB3aGVyZSB3ZSBpdGVyYXRlIGFsbCB0aGUgd2F5IHRvIHRoZSByb290IGFuZCBhZGRcbiAgICAgKiAgZWFjaCBpdGVtIHRvIHRoZSBgY3VycmVudFBhdGhgIGFycmF5LiBUaGlzIHdheSB3ZSBjb2xsZWN0IGxpc3Qgb2YgaXRlbSByZXByZXNlbnRpbmcgY3VycmVudFxuICAgICAqICBjdXJyZW50IGV4cGFuc2lvblBhdGguXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHRvZ2dsZUV4cGFuc2lvbigpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5hbmltYXRpb25JblByb2dyZXNzKSB7XG4gICAgICAgICAgICAvLyBiYWNrdXAgcHJvY2VkdXJlIGluIGNhc2Ugb25BbmltYXRpb25Eb25lIGZhaWxzXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uSW5Qcm9ncmVzcykgeyAvLyBjaGFuZ2Ugb25seSBpZiBpdHMgZmFpbHNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25JblByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5lbWJlZGRlZCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25JblByb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjdXJyZW50SXRlbSA9IExpc3RXcmFwcGVyLmxhc3QodGhpcy5zdGF0ZS5jdXJyZW50UGF0aCk7XG4gICAgICAgIHRoaXMuc3RhdGUudG9nZ2xlRXhwYW5zaW9uKHRoaXMuc3RhdGUuY3VycmVudFBhdGgsIHRoaXMuY2hpbGRyZW5Gb3JJdGVtKGN1cnJlbnRJdGVtKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZW1iZWRkZWQpIHtcbiAgICAgICAgICAgIC8vIHRoaXMuYW5pbWF0ZUVtYmVkZGVkSXRlbSgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBbmd1bGFyIGFuaW0uIGNhbGxiYWNrIHRoYXQgc2V0cyBiYWNrIHRoZSBmbGFnIHRvIG1ha2Ugc3VyZSB3ZSBkb24ndCB0cmlnZ2VyIGFuaW1hdGlvbnNcbiAgICAgKiB3aGVuIG9uZSBpcyBpbiBwcm9ncmVzcy5cbiAgICAgKlxuICAgICAqL1xuICAgIG9uQW5pbWF0aW9uRG9uZShldmVudDogRXZlbnQpXG4gICAge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbkluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVkIGluZGVudGF0aW9uIHVzZWQgdG8gc2hpZnQgdGhlIG5lc3RlZCBzZWN0aW9uIHRvIHRoZSByaWdodCBvciBsYXRlciBvbiB0byB0aGVcbiAgICAgKiBsZWZ0IHdoZW4gUlRMIGlzIHN1cHBvcnRlZFxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBpbmRlbnRhdGlvbihjdXJyZW50TGV2ZWw6IG51bWJlcik6IG51bWJlclxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMucHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lICYmIGN1cnJlbnRMZXZlbCA+IDApIHtcbiAgICAgICAgICAgIGN1cnJlbnRMZXZlbCAtPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChjdXJyZW50TGV2ZWwgPT09IDAgJiYgdGhpcy5wdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmUpXG4gICAgICAgICAgICA/IDAgOiAodGhpcy5pbmRlbnRhdGlvblBlckxldmVsICogY3VycmVudExldmVsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOb3QgYWxsIHJvd3MgYXJlIHZpc2libGUgYnkgZGVmYXVsdCwgdGhlcmUgY2FuIGJlIGEgY2FzZSB3aGVyZSB5b3UgZG9udCB3YW50IHRvIHJlbmRlciBpdGVtc1xuICAgICAqIHVzaW5nIG91dGxpbmUuIGUuZy4gRGF0YXRhYmxlIHdpdGggZGV0YWlsIHJvdy5cbiAgICAgKi9cbiAgICBpc1Zpc2libGUoaXRlbTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmZpbHRlck91dCkpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5maWx0ZXJPdXQoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuXG4vKipcbiAqXG4gKiBTaW5jZSB3ZSBjYW4gbm90IGRpcmVjdGx5IHNldCBgKm5nVGVtcGxhdGVPdXRsZXRgIGNvbnRleHQgdmFyaWFibGVzIHRvIHRoZSB0eXBlc2NyaXB0IGNsYXNzIHdlXG4gKiB1c2UgdGhpcyBkaXJlY3RpdmUgdG8gZG8gdGhlIEpvYlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbaW5pdE5lc3RpbmddJ1xufSlcbmV4cG9ydCBjbGFzcyBJbml0TmVzdGluZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdFxue1xuXG4gICAgQElucHV0KClcbiAgICBzZXRMZXZlbDogbnVtYmVyO1xuXG5cbiAgICBASW5wdXQoKVxuICAgIHNldEN1cnJyZW50SXRlbTogYW55O1xuXG5cbiAgICBASW5wdXQoKVxuICAgIHNldFBhcmVudEl0ZW06IGFueTtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBvdXRsaW5lOiBPdXRsaW5lRm9yQ29tcG9uZW50KVxuICAgIHtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5zZXRMZXZlbCkpIHtcbiAgICAgICAgICAgIHRoaXMub3V0bGluZS5zdGF0ZS5jdXJyZW50TGV2ZWwgPSB0aGlzLnNldExldmVsO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuc2V0Q3VycnJlbnRJdGVtKSkge1xuICAgICAgICAgICAgdGhpcy5vdXRsaW5lLmN1cnJlbnRJdGVtID0gdGhpcy5zZXRDdXJycmVudEl0ZW07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm91dGxpbmUuaXNUcmVlTW9kZWxGb3JtYXQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3V0bGluZS5jdXJyZW50SXRlbVsnJCRwYXJlbnRJdGVtJ11cbiAgICAgICAgICAgICAgICAgICAgPSAoPE91dGxpbmVOb2RlPnRoaXMuc2V0Q3VycnJlbnRJdGVtKS5wYXJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMub3V0bGluZS5pc1RyZWVNb2RlbEZvcm1hdCgpICYmIGlzUHJlc2VudCh0aGlzLnNldFBhcmVudEl0ZW0pKSB7XG4gICAgICAgICAgICB0aGlzLm91dGxpbmUuY3VycmVudEl0ZW1bJyQkcGFyZW50SXRlbSddID0gdGhpcy5zZXRQYXJlbnRJdGVtO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbiJdfQ==