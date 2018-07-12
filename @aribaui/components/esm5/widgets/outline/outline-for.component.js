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
        this.state.globalState = this.expandAll;
        // in case we want to render content of tree outside of outlineFor
        if (isPresent(this.externalTemplate)) {
            this.controlTemplate = this.externalTemplate;
        }
        this.embedded = this.element.nativeElement.hasAttribute('awoutlinefor');
        if (isBlank(this.context)) {
            this.context = this;
        }
        // // when root section needs to be on new line, then automatically expand second level
        // if (this.pushRootSectionOnNewLine) {
        //     this.list.forEach((item: any) => {
        //         let currentItem = ListWrapper.last(this.state.currentPath);
        //         this.state.toggleExpansion(item);
        //     })
        // }
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
        return (currentLevel === 0 && this.pushRootSectionOnNewLine)
            ? true : this.state.isExpanded(item);
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
        return this.hasChildren(item) ? this.doGetChildren(item) : [];
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
        if (isBlank(this.children) && isBlank(item.children)) {
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
                    template: "<!--\n    Starts with the list, where nestingLevel is -1.\n    call template outlineItems to iterate and render each item\n-->\n<ng-container [ngIf]=\"list\" *ngTemplateOutlet=\"outlineItems;\n            context:{ $implicit: list, nestingLevel: 0, parentItem: null, expanded: true}\">\n</ng-container>\n\n<!--\n    Main Entry point for the recursion. this is called by the block above as well as byt the inner\n    piece that calls this template recursively again when an item has children\n-->\n<ng-template #outlineItems let-children let-nestingLevel=\"nestingLevel\"\n             let-parent=\"parentItem\" let-expanded=\"expanded\">\n\n    <ng-template ngFor let-item [ngForOf]=\"children\"  let-rowIndex=\"index\">\n\n        <ng-container *ngTemplateOutlet=\"outlineItem;\n            context:{ $implicit: item, nestingLevel: nestingLevel, parentItem: parent,\n            expanded: expanded, rowIndex:rowIndex}\">\n        </ng-container>\n\n        <!--\n\n            Recursion piece:\n\n            For non embedded case when even if its not expanded we need to iterate children\n            as we want to apply animation that should go with ngIf which inside the outineItem\n            template\n\n            Dont recurse/ render items that are not visible.\n        -->\n\n        <ng-template [ngIf]=\"hasChildren(item) && (isExpanded(item, nestingLevel) || !embedded) && isVisible(item)\">\n            <ng-container *ngTemplateOutlet=\"outlineItems;\n                        context:{ $implicit: childrenForItem(item),\n                                nestingLevel: nestingLevel+1,\n                                expanded: isExpanded(item, nestingLevel),\n                                parentItem:item }\">\n            </ng-container>\n        </ng-template>\n    </ng-template>\n</ng-template>\n\n\n<!--\n    Renders actual outline node and applies animation while expanding and collapsing\n\n    [@section]=\"expanded || isExpanded(item) ? 'visible' : 'hidden'\"\n-->\n<ng-template #outlineItem let-item let-nestingLevel=\"nestingLevel\" let-parent=\"parentItem\"\n             let-rowIndex=\"rowIndex\"\n             let-expanded=\"expanded\">\n\n    <div class=\"w-outline-item\"\n         *ngIf=\"!embedded && expanded\"\n         [style.padding-left.px]=\"indentation(nestingLevel)\"\n         initNesting [setLevel]=\"nestingLevel\" [setParentItem]=\"parent\"\n         [setCurrrentItem]=\"item\"\n         [@section]\n         (@section.done)=\"onAnimationDone($event)\">\n\n        <ng-container *ngTemplateOutlet=\"controlTemplate;\n                        context:{ $implicit: item, nestingLevel: nestingLevel, rowIndex:rowIndex }\">\n        </ng-container>\n    </div>\n\n    <!--\n        When outline control is used as embedded meaning its inside e..g datatable we\n        cannot have any tags around it.\n\n        Todo: Refactor this in the way so we can do animation when table lines are\n        expanded. Since its embedded we can not have any wrapping element around, the template\n        is fully responsible\n    -->\n    <ng-template [ngIf]=\"embedded && expanded\"\n                 initNesting [setLevel]=\"nestingLevel\" [setParentItem]=\"parent\"\n                 [setCurrrentItem]=\"item\"\n    >\n        <ng-container #renderedItem *ngTemplateOutlet=\"controlTemplate;\n                        context:{ $implicit: item, nestingLevel: nestingLevel, rowIndex:rowIndex  }\">\n        </ng-container>\n    </ng-template>\n\n</ng-template>\n\n\n",
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
        }
        if (isPresent(this.setParentItem)) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS1mb3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvb3V0bGluZS9vdXRsaW5lLWZvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFvQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULGdCQUFnQixFQUNuQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2pHLE9BQU8sRUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF1TkosK0NBQWE7SUFrSWxELDZCQUFvQixHQUFnQixFQUNmLGdCQUNBLFNBQ0E7UUFIckIsWUFLSSxrQkFBTSxHQUFHLENBQUMsU0FFYjtRQVBtQixTQUFHLEdBQUgsR0FBRyxDQUFhO1FBQ2Ysb0JBQWMsR0FBZCxjQUFjO1FBQ2QsYUFBTyxHQUFQLE9BQU87UUFDUCxhQUFPLEdBQVAsT0FBTzs7Ozs7O3FDQXBISSxJQUFJOzs7OzswQkF1QmYsS0FBSzs7Ozs7O29DQWlCSSxFQUFFO3lDQWtCSSxLQUFLOzs7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bGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7YW5pbWF0ZSwgQW5pbWF0aW9uQnVpbGRlciwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7YXNzZXJ0LCBFbnZpcm9ubWVudCwgaXNCbGFuaywgaXNQcmVzZW50LCBMaXN0V3JhcHBlcn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHtPdXRsaW5lU3RhdGV9IGZyb20gJy4vb3V0bGluZS1zdGF0ZSc7XG5cblxuLyoqXG4gKlxuICogT3V0bGluZUZvckNvbXBvbmVudCBpcyBsaWtlIG5nRm9yLCBidXQgZm9yIGhpZXJhcmNoaWNhbCAob3V0bGluZS90cmVlKSBzdHJ1Y3R1cmVzIC0tIGkuZS4gaW5cbiAqIHRob3NlIGNhc2VzIHdoZXJlIGFuIGl0ZW0gbWF5IGhhdmUgY2hpbGRyZW4uXG4gKlxuICpcbiAqIEl0IHVzZXMgb3V0bGluZSBgPGF3LW91dGxpbmUtY29udHJvbD5gIHRvIHByb3ZpZGUgZXhwYW5kaW5nIGZ1bmN0aW9uYWxpdHksIGluZGVudGF0aW9uXG4gKiBhbmQgb3RoZXIgdGhpbmdzLlxuICpcbiAqXG4gKiBUaGlzIGNvbXBvbmVudCBoYXMgbWluaW1hbCBzdHlsaW5nIHRvIG1ha2Ugc3VyZSBpdCBjYW4gYmUgY2hhbmdlZCBlYXNpbHkuXG4gKlxuICogIyMjIEV4YW1wbGUgcmVuZGVyaW5nIHRyZWUgc2VjdGlvbiwgd2hlcmUgYmFzZWQgb24gdGhlIHR5cGUgd2UgZm9ybWF0IHRoZSBvdXQgcGx1c1xuICogZm9yIHRoZSBtYWluIHJvb3Qgc2VjdGlvbiB3ZSBhbHdheXMgcmVuZGVyIGxpdHRsZSBwb3B1cCBtZW51LlxuICpcbiAqIGBgYFxuICpcbiAqICAgPGF3LW91dGxpbmUtZm9yIFtsaXN0XT1cImxpc3RcIiBbaGFzQ2hpbGRyZW5dPVwiaGFzQ2hpbGRyZW5cIj5cbiAqXG4gKiAgICAgICA8bmctdGVtcGxhdGUgI291dGxpbmUgbGV0LWl0ZW0+XG4gKlxuICogICAgICAgICAgIDxkaXYgY2xhc3M9XCJteS1zZWN0aW9uXCI+XG4gKiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvdXRsaW5lXCI+XG4gKiAgICAgICAgICAgICAgICAgICA8YXctb3V0bGluZS1jb250cm9sPlxuICogICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIml0ZW0udHlwZVwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nU3dpdGNoQ2FzZV09XCIndGV4dCdcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcy1wYXJhZ3JhZlwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7aXRlbT8uY29udGVudH19XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAqXG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdTd2l0Y2hEZWZhdWx0PlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tpdGVtPy5jb250ZW50fX1cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAqXG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICpcbiAqXG4gKiAgICAgICAgICAgICAgICAgICA8L2F3LW91dGxpbmUtY29udHJvbD5cbiAqICAgICAgICAgICAgICAgPC9kaXY+XG4gKlxuICogICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyc1wiICpuZ0lmPVwiaXRlbS50eXBlID09PSAnc2VjdGlvbidcIiA+XG4gKlxuICogICAgICAgICAgICAgICAgICAgPGF3LWhvdmVyLWNhcmQgW2xpbmtUaXRsZV09XCInRmlsdGVyIEl0ZW1zJ1wiPlxuICogICAgICAgICAgICAgICAgICAgICAgIDxhdy1saXN0IFtsaXN0XT1cImZpbHRlckl0ZW1zXCIgW2JvcmRlcmxlc3NdPVwidHJ1ZVwiPjwvYXctbGlzdD5cbiAqICAgICAgICAgICAgICAgICAgIDwvYXctaG92ZXItY2FyZD5cbiAqXG4gKiAgICAgICAgICAgICAgIDwvZGl2PlxuICogICAgICAgICAgIDwvZGl2PlxuICogICAgIDwvbmctdGVtcGxhdGU+YFxuICogICA8L2F3LW91dGxpbmUtZm9yPlxuICpcbiAqIGBgYFxuICpcbiAqXG4gKiBXZSBjYW4gdXNlIGl0IGFsc28gaW4gZW1iZWRkZWQgbW9kZSB3aGVyZSB3ZSB1c2UgdGhlIGBhd091dGxpbmVGb3JgIGRpcmVjdGl2ZVxuICpcbiAqICMjIEV4YW1wbGVcbiAqXG4gKlxuICogYGBgYFxuICogIDx0YWJsZSAgY2xhc3M9XCJ0cmVlLXRhYmxlXCIgPlxuICogICAgICA8dGhlYWQ+XG4gKiAgICAgICAgICA8dHI+XG4gKiAgICAgICAgICAgICAgPHRoPk5hbWU8L3RoPlxuICogICAgICAgICAgICAgIDx0aD5UeXBlPC90aD5cbiAqICAgICAgICAgIDwvdHI+XG4gKiAgICAgIDwvdGhlYWQ+XG4gKiAgICAgIDx0Ym9keSAjb29vMiBhd091dGxpbmVGb3IgW2xpc3RdPVwibGlzdFwiXG4gKiAgICAgICAgICAgICBbaGFzQ2hpbGRyZW5dPVwiaGFzQ2hpbGRyZW5cIlxuICogICAgICAgICAgICAgY2xhc3M9XCJvdXRsaW5lLXRhYmxlXCJcbiAqICAgICAgPlxuICogICAgICAgICAgPG5nLXRlbXBsYXRlICNvdXRsaW5lIGxldC1pdGVtPlxuICogICAgICAgICAgICAgIDx0cj5cbiAqICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiaXRlbS1uYW1lIG91dGxpbmUtYW5pbWF0aW9uXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICA8ZGl2Pjxhdy1vdXRsaW5lLWNvbnRyb2w+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAge3tpdGVtPy5jb250ZW50fX1cbiAqICAgICAgICAgICAgICAgICAgICAgIDwvYXctb3V0bGluZS1jb250cm9sPjwvZGl2PlxuICogICAgICAgICAgICAgICAgICA8L3RkPlxuICogICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJpdGVtLXR5cGUgb3V0bGluZS1hbmltYXRpb25cIj5cbiAqICAgICAgICAgICAgICAgICAgICAgIDxkaXY+e3tpdGVtLnR5cGV9fTwvZGl2PlxuICogICAgICAgICAgICAgICAgICA8L3RkPlxuICogICAgICAgICAgICAgIDwvdHI+XG4gKiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICogICAgICA8L3Rib2R5PlxuICogIDwvdGFibGU+XG4gKlxuICogYGBgXG4gKlxuICogSSB3YXMgdGhpbmtpbmcgbWF5YmUgZm9yIGZpcnN0IHRpbWUgd2UgZG9uJ3QgbmVlZCB0aGUgc2FtZSBhbmltYXRpb24gbGlrZSBleHBhbmRpbmcgYW5kXG4gKiBjb2xsYXBzaW5nLiBNYXliZSB3ZSBuZWVkIGZhZGUtaW4uIEluIHN1Y2ggY2FzZSBJIHdvdWxkIHByb2JhYmx5IGFwcGx5IEBzZWN0aW9uIGFuaW0gb25seVxuICogb24gaXRlbXMgd2hlcmUgbGV2ZWwgPiAwIChpbiB0aGUgdGVtcGxhdGUgSSBrZWVwIGxldmVscykgYW5kIGlmIGxldmVsID09IDAgdGhlbiBJIHdvdWxkXG4gKiBleGVjdXRlIHRoZSBzYW1lIHJlbmRlcmluZyBqdXN0IHdpdGhvdXQgW0BzZWN0aW9uXVxuICpcbiAqXG4gKiBUb2RvOiBUaGluayBhYm91dCBob3cgdG8gZG8gYW5pbWF0aW9uIGZvciB0aGUgdGFibGUgY2FzZS4gTXVzdCBhbHNvIHdyaXRlIHVuaXRlc3QgLSBkdWUgdG9cbiAqIEFyaWJhTGl2ZSBhZ2dyZXNzaXZlIHNjaGVkdWxlIHdlIGFyZSBza2lwcGluZyB0aGVtIGZvciBub3dcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctb3V0bGluZS1mb3IsIFthd091dGxpbmVGb3JdJyxcbiAgICB0ZW1wbGF0ZTogYDwhLS1cbiAgICBTdGFydHMgd2l0aCB0aGUgbGlzdCwgd2hlcmUgbmVzdGluZ0xldmVsIGlzIC0xLlxuICAgIGNhbGwgdGVtcGxhdGUgb3V0bGluZUl0ZW1zIHRvIGl0ZXJhdGUgYW5kIHJlbmRlciBlYWNoIGl0ZW1cbi0tPlxuPG5nLWNvbnRhaW5lciBbbmdJZl09XCJsaXN0XCIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJvdXRsaW5lSXRlbXM7XG4gICAgICAgICAgICBjb250ZXh0OnsgJGltcGxpY2l0OiBsaXN0LCBuZXN0aW5nTGV2ZWw6IDAsIHBhcmVudEl0ZW06IG51bGwsIGV4cGFuZGVkOiB0cnVlfVwiPlxuPC9uZy1jb250YWluZXI+XG5cbjwhLS1cbiAgICBNYWluIEVudHJ5IHBvaW50IGZvciB0aGUgcmVjdXJzaW9uLiB0aGlzIGlzIGNhbGxlZCBieSB0aGUgYmxvY2sgYWJvdmUgYXMgd2VsbCBhcyBieXQgdGhlIGlubmVyXG4gICAgcGllY2UgdGhhdCBjYWxscyB0aGlzIHRlbXBsYXRlIHJlY3Vyc2l2ZWx5IGFnYWluIHdoZW4gYW4gaXRlbSBoYXMgY2hpbGRyZW5cbi0tPlxuPG5nLXRlbXBsYXRlICNvdXRsaW5lSXRlbXMgbGV0LWNoaWxkcmVuIGxldC1uZXN0aW5nTGV2ZWw9XCJuZXN0aW5nTGV2ZWxcIlxuICAgICAgICAgICAgIGxldC1wYXJlbnQ9XCJwYXJlbnRJdGVtXCIgbGV0LWV4cGFuZGVkPVwiZXhwYW5kZWRcIj5cblxuICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtaXRlbSBbbmdGb3JPZl09XCJjaGlsZHJlblwiICBsZXQtcm93SW5kZXg9XCJpbmRleFwiPlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJvdXRsaW5lSXRlbTtcbiAgICAgICAgICAgIGNvbnRleHQ6eyAkaW1wbGljaXQ6IGl0ZW0sIG5lc3RpbmdMZXZlbDogbmVzdGluZ0xldmVsLCBwYXJlbnRJdGVtOiBwYXJlbnQsXG4gICAgICAgICAgICBleHBhbmRlZDogZXhwYW5kZWQsIHJvd0luZGV4OnJvd0luZGV4fVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8IS0tXG5cbiAgICAgICAgICAgIFJlY3Vyc2lvbiBwaWVjZTpcblxuICAgICAgICAgICAgRm9yIG5vbiBlbWJlZGRlZCBjYXNlIHdoZW4gZXZlbiBpZiBpdHMgbm90IGV4cGFuZGVkIHdlIG5lZWQgdG8gaXRlcmF0ZSBjaGlsZHJlblxuICAgICAgICAgICAgYXMgd2Ugd2FudCB0byBhcHBseSBhbmltYXRpb24gdGhhdCBzaG91bGQgZ28gd2l0aCBuZ0lmIHdoaWNoIGluc2lkZSB0aGUgb3V0aW5lSXRlbVxuICAgICAgICAgICAgdGVtcGxhdGVcblxuICAgICAgICAgICAgRG9udCByZWN1cnNlLyByZW5kZXIgaXRlbXMgdGhhdCBhcmUgbm90IHZpc2libGUuXG4gICAgICAgIC0tPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJoYXNDaGlsZHJlbihpdGVtKSAmJiAoaXNFeHBhbmRlZChpdGVtLCBuZXN0aW5nTGV2ZWwpIHx8ICFlbWJlZGRlZCkgJiYgaXNWaXNpYmxlKGl0ZW0pXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwib3V0bGluZUl0ZW1zO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDp7ICRpbXBsaWNpdDogY2hpbGRyZW5Gb3JJdGVtKGl0ZW0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXN0aW5nTGV2ZWw6IG5lc3RpbmdMZXZlbCsxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBhbmRlZDogaXNFeHBhbmRlZChpdGVtLCBuZXN0aW5nTGV2ZWwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRJdGVtOml0ZW0gfVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbjwvbmctdGVtcGxhdGU+XG5cblxuPCEtLVxuICAgIFJlbmRlcnMgYWN0dWFsIG91dGxpbmUgbm9kZSBhbmQgYXBwbGllcyBhbmltYXRpb24gd2hpbGUgZXhwYW5kaW5nIGFuZCBjb2xsYXBzaW5nXG5cbiAgICBbQHNlY3Rpb25dPVwiZXhwYW5kZWQgfHwgaXNFeHBhbmRlZChpdGVtKSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nXCJcbi0tPlxuPG5nLXRlbXBsYXRlICNvdXRsaW5lSXRlbSBsZXQtaXRlbSBsZXQtbmVzdGluZ0xldmVsPVwibmVzdGluZ0xldmVsXCIgbGV0LXBhcmVudD1cInBhcmVudEl0ZW1cIlxuICAgICAgICAgICAgIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCJcbiAgICAgICAgICAgICBsZXQtZXhwYW5kZWQ9XCJleHBhbmRlZFwiPlxuXG4gICAgPGRpdiBjbGFzcz1cInctb3V0bGluZS1pdGVtXCJcbiAgICAgICAgICpuZ0lmPVwiIWVtYmVkZGVkICYmIGV4cGFuZGVkXCJcbiAgICAgICAgIFtzdHlsZS5wYWRkaW5nLWxlZnQucHhdPVwiaW5kZW50YXRpb24obmVzdGluZ0xldmVsKVwiXG4gICAgICAgICBpbml0TmVzdGluZyBbc2V0TGV2ZWxdPVwibmVzdGluZ0xldmVsXCIgW3NldFBhcmVudEl0ZW1dPVwicGFyZW50XCJcbiAgICAgICAgIFtzZXRDdXJycmVudEl0ZW1dPVwiaXRlbVwiXG4gICAgICAgICBbQHNlY3Rpb25dXG4gICAgICAgICAoQHNlY3Rpb24uZG9uZSk9XCJvbkFuaW1hdGlvbkRvbmUoJGV2ZW50KVwiPlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250cm9sVGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OnsgJGltcGxpY2l0OiBpdGVtLCBuZXN0aW5nTGV2ZWw6IG5lc3RpbmdMZXZlbCwgcm93SW5kZXg6cm93SW5kZXggfVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS1cbiAgICAgICAgV2hlbiBvdXRsaW5lIGNvbnRyb2wgaXMgdXNlZCBhcyBlbWJlZGRlZCBtZWFuaW5nIGl0cyBpbnNpZGUgZS4uZyBkYXRhdGFibGUgd2VcbiAgICAgICAgY2Fubm90IGhhdmUgYW55IHRhZ3MgYXJvdW5kIGl0LlxuXG4gICAgICAgIFRvZG86IFJlZmFjdG9yIHRoaXMgaW4gdGhlIHdheSBzbyB3ZSBjYW4gZG8gYW5pbWF0aW9uIHdoZW4gdGFibGUgbGluZXMgYXJlXG4gICAgICAgIGV4cGFuZGVkLiBTaW5jZSBpdHMgZW1iZWRkZWQgd2UgY2FuIG5vdCBoYXZlIGFueSB3cmFwcGluZyBlbGVtZW50IGFyb3VuZCwgdGhlIHRlbXBsYXRlXG4gICAgICAgIGlzIGZ1bGx5IHJlc3BvbnNpYmxlXG4gICAgLS0+XG4gICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImVtYmVkZGVkICYmIGV4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICAgaW5pdE5lc3RpbmcgW3NldExldmVsXT1cIm5lc3RpbmdMZXZlbFwiIFtzZXRQYXJlbnRJdGVtXT1cInBhcmVudFwiXG4gICAgICAgICAgICAgICAgIFtzZXRDdXJycmVudEl0ZW1dPVwiaXRlbVwiXG4gICAgPlxuICAgICAgICA8bmctY29udGFpbmVyICNyZW5kZXJlZEl0ZW0gKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250cm9sVGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OnsgJGltcGxpY2l0OiBpdGVtLCBuZXN0aW5nTGV2ZWw6IG5lc3RpbmdMZXZlbCwgcm93SW5kZXg6cm93SW5kZXggIH1cIj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuPC9uZy10ZW1wbGF0ZT5cblxuXG5gLFxuICAgIHN0eWxlczogW2AuaXMtb3V0bGluZS1hbmltYXRpb24+ZGl2LDo6bmctZGVlcCAudy1vdXRsaW5lLWl0ZW17b3ZlcmZsb3c6aGlkZGVufWBdLFxuXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdzZWN0aW9uJywgW1xuICAgICAgICAgICAgc3RhdGUoJyonLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgJ292ZXJmbG93LXknOiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogJyonLFxuICAgICAgICAgICAgICAgICdvcGFjaXR5JzogJzEnXG5cbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgICdoZWlnaHQnOiAnMCcsXG4gICAgICAgICAgICAgICAgJ29wYWNpdHknOiAnMCcsXG4gICAgICAgICAgICAgICAgJ292ZXJmbG93LXknOiAnaGlkZGVuJ1xuXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBhbmltYXRlKCcyMDBtcyBlYXNlLW91dCcpKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4nKSlcbiAgICAgICAgXSksXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBPdXRsaW5lRm9yQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBpdGVtcyB0aGF0IG5lZWRzIHRvIGJlIHJlbmRlcmVkLiBJdCBkb2VzIG5vdCBoYXZlIHRvIGluIGhpZXJhcmNoaWNhbCBvcmRlciBvciB3ZVxuICAgICAqIGxlYXZlIGl0IHVwIHRvIHRoZSBhcHBsaWNhdGlvbiB0byBkZWNpZGUgYWJvdXQgdGhlIHN0cnVjdHVyZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGxpc3Q/OiBhbnlbXTtcblxuXG4gICAgLyoqXG4gICAgICogVGVsbHMgdGhlIGNvbXBvbmVudCBub3QgdG8gcmVuZGVyIGV4cGFuc2lvbiBjb250cm9sLCBpbiBzdWNoIGNhc2Ugd2UgZXhwYW5kQWxsIGFzIGFcbiAgICAgKiBkZWZhdWx0IGJlaGF2aW9yXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dFeHBhbnNpb25Db250cm9sOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIEN1c3RvbSBtZXRob2QgcHJvdmlkZWQgYnkgYXBwbGljYXRpb24gdG8gcmV0cmlldmUgbGlzdCBvZiBjaGlsZHJlbiBmb3IgY3VycmVudCBpdGVtLiBJZlxuICAgICAqIGNoaWxkcmVuIGlzIHVuZGVmaW5lZCB0aGVuLCBkZWZhdWx0ICdjaGlsZHJlbicgZmllbGQgaXMgdXNlZCA8Y3VycmVudEl0ZW0+LmNoaWxkcmVuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjaGlsZHJlbjogKHZhbHVlOiBhbnkpID0+IGFueVtdO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBPcHRpb24gdG8gY29uZGl0aW9uYWxseSByZW5kZXIgb25seSBpdGVtcyB0aGF0IGFyZSBzYXRpc2Z5aW5nIGZpbHRlciBjb25kaXRpb25cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZmlsdGVyT3V0OiAodmFsdWU6IGFueSkgPT4gYm9vbGVhbjtcblxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgYWxsIHRyZWUgbm9kZXMuXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGV4cGFuZEFsbDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICAvKipcbiAgICAgKiAgTWFuYWdlcyB0aGUgc3RhdGUgZm9yIHRoZSBPdXRsaW5lIGNvbXBvbmVudC4gTGF0ZXIgb24gd2UgY2FuIHByb3ZpZGUgZWFzaWVyIHdlIGhvdyB0b1xuICAgICAqICBpbml0aWFsaXplIGFuZCBzZXQgc2VsZWN0aW9uUGF0aHMgYW5kIHNlbGVjdGlvblN0YXRlcyBmcm9tIHRoZSBhcHBsaWNhdGlvblxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzdGF0ZTogT3V0bGluZVN0YXRlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZXQgaW5kZW50YXRpb24gc2l6ZSB0byBiZSB1c2VkIGZvciBlYWNoIGxldmVsXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGluZGVudGF0aW9uUGVyTGV2ZWw6IG51bWJlciA9IDI1O1xuXG5cbiAgICAvKipcbiAgICAgKiBJbiBjYXNlIHRlbXBsYXRlIGlzIG91dHNpZGUgb2YgdGhlIG91dGxpbmVGb3JcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGV4dGVybmFsVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSB0byBjdXJyZW50IG9iamVjdCB1c2luZyB0aGlzIGNvbXBvbmVudFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29udGV4dDogYW55O1xuXG5cbiAgICBASW5wdXQoKVxuICAgIHB1c2hSb290U2VjdGlvbk9uTmV3TGluZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBVc2VkIHdoZW4gaW4gc2VsZWN0aW9uIG1vZGUgdG8gcHVzaCBjdXJyZW50IHNlbGVjdGVkIEl0ZW0gdG8gdGhlIGFwcGxpY2F0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkl0ZW1TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVGhpcyBldmVudCBpcyB0cmlnZ2VyZWQgYnkgT3V0bGluZUNvbnRyb2wgd2hlbiBub2RlIGlzIGV4cGFuZGVkIG9yIGNvbGxhcHNlZFxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25FeHBhbmRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogQSB0ZW1wbGF0ZSB0byB1c2Ugb24gYXBwbGljYXRpb24gbGV2ZWwgdG8gcmVuZGVyIGluZGl2aWR1YWwgaXRlbXNcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdvdXRsaW5lJylcbiAgICBjb250cm9sVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIEBWaWV3Q2hpbGQoJ3JlbmRlcmVkSXRlbScpXG4gICAgb3V0bGluZUl0ZW06IEVsZW1lbnRSZWY7XG5cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsc1xuICAgICAqXG4gICAgICogY3VycmVudEl0ZW0gYW5kIHBhcmVudEl0ZW0gYXJlIHVzZWQgdG8gY2FwdHVyZSBjdXJyZW50IHByb2Nlc3NlZCBpdGVtIG9mIG5nRm9yLiBUaGlzIGlzXG4gICAgICogc2V0IGJ5IGRpcmVjdGl2ZSBgSW5pdE5lc3RpbmdEaXJlY3RpdmVgXG4gICAgICpcbiAgICAgKiBhbmltYXRpb25JblByb2dyZXNzOiB1c2VkIGJ5IGFuaW1hdGlvbiBlbmdpbmUgdG8gbWFrZSBzdXJlIHdlIGRvbnQgZG8gYW55IGFjdGlvbnMgd2hpbGVcbiAgICAgKiBhbmltYXRpb24gaXMgaW4gdGhlIHByb2dyZXNzXG4gICAgICpcbiAgICAgKiBlbWJlZGRlZDogSW5kaWNhdGVzIHRoYXQgd2UgYXJlIHVzaW5nIGRpcmVjdGl2ZSBzbyBpdCB3aWxsIG5vdCBoYXZlIGRlZmF1bHQgY29tcG9uZW50XG4gICAgICogd3JhcHBlclxuICAgICAqXG4gICAgICovXG4gICAgY3VycmVudEl0ZW06IGFueTtcbiAgICBwYXJlbnRJdGVtOiBhbnk7XG4gICAgYW5pbWF0aW9uSW5Qcm9ncmVzczogYm9vbGVhbjtcbiAgICBlbWJlZGRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogRmxhZyB0aGF0IHRlbGxzIHVzIHRoYXQgY29tcG9uZW50IGlzIGZ1bGx5IHJlbmRlcmVkXG4gICAgICpcbiAgICAgKi9cbiAgICB2aWV3SW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgY29uc3RydWN0b3IgKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICAgICBwcml2YXRlIGJ1aWxkZXI6IEFuaW1hdGlvbkJ1aWxkZXIsXG4gICAgICAgICAgICAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZilcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCAoKVxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IG5ldyBPdXRsaW5lU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnN0YXRlLm91dGxpbmVGb3IpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLm91dGxpbmVGb3IgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZXhwYW5kQWxsKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dFeHBhbnNpb25Db250cm9sID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlLmdsb2JhbFN0YXRlID0gdGhpcy5leHBhbmRBbGw7XG5cbiAgICAgICAgLy8gaW4gY2FzZSB3ZSB3YW50IHRvIHJlbmRlciBjb250ZW50IG9mIHRyZWUgb3V0c2lkZSBvZiBvdXRsaW5lRm9yXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5leHRlcm5hbFRlbXBsYXRlKSkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sVGVtcGxhdGUgPSB0aGlzLmV4dGVybmFsVGVtcGxhdGU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVtYmVkZGVkID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKCdhd291dGxpbmVmb3InKTtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmNvbnRleHQpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gLy8gd2hlbiByb290IHNlY3Rpb24gbmVlZHMgdG8gYmUgb24gbmV3IGxpbmUsIHRoZW4gYXV0b21hdGljYWxseSBleHBhbmQgc2Vjb25kIGxldmVsXG4gICAgICAgIC8vIGlmICh0aGlzLnB1c2hSb290U2VjdGlvbk9uTmV3TGluZSkge1xuICAgICAgICAvLyAgICAgdGhpcy5saXN0LmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAvLyAgICAgICAgIGxldCBjdXJyZW50SXRlbSA9IExpc3RXcmFwcGVyLmxhc3QodGhpcy5zdGF0ZS5jdXJyZW50UGF0aCk7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zdGF0ZS50b2dnbGVFeHBhbnNpb24oaXRlbSk7XG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyB9XG4gICAgfVxuXG5cbiAgICBuZ0RvQ2hlY2sgKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nRG9DaGVjaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZWQgYnkgdGVtcGxhdGUgYW5kIE91dGxpbmVDb250cm9sIHRvIGlkZW50aWZ5IHdoaWNoIGl0ZW0gaXMgZXhwYW5kZWQgYW5kIGNvbGxhcHNlZFxuICAgICAqXG4gICAgICovXG4gICAgaXNFeHBhbmRlZCAoaXRlbTogYW55LCBjdXJyZW50TGV2ZWw6IG51bWJlciA9IC0xKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIChjdXJyZW50TGV2ZWwgPT09IDAgJiYgdGhpcy5wdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmUpXG4gICAgICAgICAgICA/IHRydWUgOiB0aGlzLnN0YXRlLmlzRXhwYW5kZWQoaXRlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTaW5jZSB3ZSBoYXZlIGN1cnJlbnRseSB0d28gd2F5cyBob3cgdG8gcGFzcyBjaGlsZHJlbiBpdGVtcyB3ZSBuZWVkIGhhdmUgdGhpcyBtZXRob2QgdG9cbiAgICAgKiB1bmlmeSB0aGUgd2F5IGhvdyB3ZSBhY2Nlc3MgaXQuIElmIHdlIHBhc3MgYGNoaWxkcmVuYCBiaW5kaW5nIHdlIHVzZSB0aGlzIGluc3RlYWQsIG90aGVyd2lzZVxuICAgICAqIHdlIGV4cGVjdCBjdXJyZW50IG9iamVjdCB0byBoYXZlIGBjaGlsZHJlbmAgZmllbGRcbiAgICAgKlxuICAgICAqL1xuICAgIGNoaWxkcmVuRm9ySXRlbSAoaXRlbTogYW55KTogYW55W11cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0NoaWxkcmVuKGl0ZW0pID8gdGhpcy5kb0dldENoaWxkcmVuKGl0ZW0pIDogW107XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENoZWNrIGlmIHRoZSBjdXJyZW50IGl0ZW0gaGFzIGEgY2hpbGRyZW4gYW5kIG5lZWRzIHRvIGJlIHJlbmRlcmVkXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNDaGlsZHJlbiAoaXRlbTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5jaGlsZHJlbikgJiYgaXNCbGFuayhpdGVtLmNoaWxkcmVuKSkge1xuICAgICAgICAgICAgYXNzZXJ0KGZhbHNlLCAnTWlzc2luZyBbY2hpbGRyZW5dIG1ldGhvZCBiaW5kaW5nJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5kb0dldENoaWxkcmVuKGl0ZW0pLmxlbmd0aCA+IDA7XG5cbiAgICB9XG5cbiAgICBkb0dldENoaWxkcmVuIChpdGVtOiBhbnkpOiBhbnlbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uYXBwbHkodGhpcy5jb250ZXh0LCBbaXRlbV0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogIFVzZXMgdGhlIGBPdXRsaW5lU3RhdGVgIHRvIHRvZ2dsZSBzdGF0ZSBvZiBjdXJyZW50IHNlbGVjdGlvblBhdGguIFRoZSBgc2VsZWN0aW9uUGF0aGAgaXNcbiAgICAgKiAgcHV0IHRvZ2V0aGVyIGluc2lkZSBgT3V0bGluZUNvbnRyb2xgIHdoZXJlIHdlIGl0ZXJhdGUgYWxsIHRoZSB3YXkgdG8gdGhlIHJvb3QgYW5kIGFkZFxuICAgICAqICBlYWNoIGl0ZW0gdG8gdGhlIGBjdXJyZW50UGF0aGAgYXJyYXkuIFRoaXMgd2F5IHdlIGNvbGxlY3QgbGlzdCBvZiBpdGVtIHJlcHJlc2VudGluZyBjdXJyZW50XG4gICAgICogIGN1cnJlbnQgZXhwYW5zaW9uUGF0aC5cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgdG9nZ2xlRXhwYW5zaW9uICgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5hbmltYXRpb25JblByb2dyZXNzKSB7XG4gICAgICAgICAgICAvLyBiYWNrdXAgcHJvY2VkdXJlIGluIGNhc2Ugb25BbmltYXRpb25Eb25lIGZhaWxzXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uSW5Qcm9ncmVzcykgeyAvLyBjaGFuZ2Ugb25seSBpZiBpdHMgZmFpbHNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25JblByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5lbWJlZGRlZCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25JblByb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjdXJyZW50SXRlbSA9IExpc3RXcmFwcGVyLmxhc3QodGhpcy5zdGF0ZS5jdXJyZW50UGF0aCk7XG4gICAgICAgIHRoaXMuc3RhdGUudG9nZ2xlRXhwYW5zaW9uKHRoaXMuc3RhdGUuY3VycmVudFBhdGgsIHRoaXMuY2hpbGRyZW5Gb3JJdGVtKGN1cnJlbnRJdGVtKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZW1iZWRkZWQpIHtcbiAgICAgICAgICAgIC8vIHRoaXMuYW5pbWF0ZUVtYmVkZGVkSXRlbSgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBbmd1bGFyIGFuaW0uIGNhbGxiYWNrIHRoYXQgc2V0cyBiYWNrIHRoZSBmbGFnIHRvIG1ha2Ugc3VyZSB3ZSBkb24ndCB0cmlnZ2VyIGFuaW1hdGlvbnNcbiAgICAgKiB3aGVuIG9uZSBpcyBpbiBwcm9ncmVzcy5cbiAgICAgKlxuICAgICAqL1xuICAgIG9uQW5pbWF0aW9uRG9uZSAoZXZlbnQ6IEV2ZW50KVxuICAgIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25JblByb2dyZXNzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlZCBpbmRlbnRhdGlvbiB1c2VkIHRvIHNoaWZ0IHRoZSBuZXN0ZWQgc2VjdGlvbiB0byB0aGUgcmlnaHQgb3IgbGF0ZXIgb24gdG8gdGhlXG4gICAgICogbGVmdCB3aGVuIFJUTCBpcyBzdXBwb3J0ZWRcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgaW5kZW50YXRpb24gKGN1cnJlbnRMZXZlbDogbnVtYmVyKTogbnVtYmVyXG4gICAge1xuICAgICAgICBpZiAodGhpcy5wdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmUgJiYgY3VycmVudExldmVsID4gMCkge1xuICAgICAgICAgICAgY3VycmVudExldmVsIC09IDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKGN1cnJlbnRMZXZlbCA9PT0gMCAmJiB0aGlzLnB1c2hSb290U2VjdGlvbk9uTmV3TGluZSlcbiAgICAgICAgICAgID8gMCA6ICh0aGlzLmluZGVudGF0aW9uUGVyTGV2ZWwgKiBjdXJyZW50TGV2ZWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5vdCBhbGwgcm93cyBhcmUgdmlzaWJsZSBieSBkZWZhdWx0LCB0aGVyZSBjYW4gYmUgYSBjYXNlIHdoZXJlIHlvdSBkb250IHdhbnQgdG8gcmVuZGVyIGl0ZW1zXG4gICAgICogdXNpbmcgb3V0bGluZS4gZS5nLiBEYXRhdGFibGUgd2l0aCBkZXRhaWwgcm93LlxuICAgICAqL1xuICAgIGlzVmlzaWJsZSAoaXRlbTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmZpbHRlck91dCkpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5maWx0ZXJPdXQoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuXG4vKipcbiAqXG4gKiBTaW5jZSB3ZSBjYW4gbm90IGRpcmVjdGx5IHNldCBgKm5nVGVtcGxhdGVPdXRsZXRgIGNvbnRleHQgdmFyaWFibGVzIHRvIHRoZSB0eXBlc2NyaXB0IGNsYXNzIHdlXG4gKiB1c2UgdGhpcyBkaXJlY3RpdmUgdG8gZG8gdGhlIEpvYlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbaW5pdE5lc3RpbmddJ1xufSlcbmV4cG9ydCBjbGFzcyBJbml0TmVzdGluZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdFxue1xuXG4gICAgQElucHV0KClcbiAgICBzZXRMZXZlbDogbnVtYmVyO1xuXG5cbiAgICBASW5wdXQoKVxuICAgIHNldEN1cnJyZW50SXRlbTogYW55O1xuXG5cbiAgICBASW5wdXQoKVxuICAgIHNldFBhcmVudEl0ZW06IGFueTtcblxuXG4gICAgY29uc3RydWN0b3IgKHByaXZhdGUgb3V0bGluZTogT3V0bGluZUZvckNvbXBvbmVudClcbiAgICB7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCAoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnNldExldmVsKSkge1xuICAgICAgICAgICAgdGhpcy5vdXRsaW5lLnN0YXRlLmN1cnJlbnRMZXZlbCA9IHRoaXMuc2V0TGV2ZWw7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5zZXRDdXJycmVudEl0ZW0pKSB7XG4gICAgICAgICAgICB0aGlzLm91dGxpbmUuY3VycmVudEl0ZW0gPSB0aGlzLnNldEN1cnJyZW50SXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5zZXRQYXJlbnRJdGVtKSkge1xuICAgICAgICAgICAgdGhpcy5vdXRsaW5lLmN1cnJlbnRJdGVtWyckJHBhcmVudEl0ZW0nXSA9IHRoaXMuc2V0UGFyZW50SXRlbTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG4iXX0=