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
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        super.ngDoCheck();
    }
    /**
     * Used by template and OutlineControl to identify which item is expanded and collapsed
     *
     * @param {?} item
     * @param {?=} currentLevel
     * @return {?}
     */
    isExpanded(item, currentLevel = -1) {
        return (currentLevel === 0 && this.pushRootSectionOnNewLine)
            ? true : this.state.isExpanded(item);
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
        return this.hasChildren(item) ? this.doGetChildren(item) : [];
    }
    /**
     *
     * Check if the current item has a children and needs to be rendered
     *
     * @param {?} item
     * @return {?}
     */
    hasChildren(item) {
        if (isBlank(this.children) && isBlank(item.children)) {
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

    <ng-template ngFor let-item [ngForOf]="children"  let-rowIndex="index">

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
        }
        if (isPresent(this.setParentItem)) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS1mb3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvb3V0bGluZS9vdXRsaW5lLWZvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDakcsT0FBTyxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdU43QyxNQUFNLDBCQUEyQixTQUFRLGFBQWE7Ozs7Ozs7SUFrSWxELFlBQW9CLEdBQWdCLEVBQ2YsZ0JBQ0EsU0FDQTtRQUVqQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFMSyxRQUFHLEdBQUgsR0FBRyxDQUFhO1FBQ2YsbUJBQWMsR0FBZCxjQUFjO1FBQ2QsWUFBTyxHQUFQLE9BQU87UUFDUCxZQUFPLEdBQVAsT0FBTzs7Ozs7O29DQXBISSxJQUFJOzs7Ozt5QkF1QmYsS0FBSzs7Ozs7O21DQWlCSSxF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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErTTdCLE1BQU07Ozs7SUFlRixZQUFxQixPQUE0QjtRQUE1QixZQUFPLEdBQVAsT0FBTyxDQUFxQjtLQUVoRDs7OztJQUdELFFBQVE7UUFFSixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNuRDtRQUdELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDbkQ7UUFFRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQ2pFO0tBQ0o7OztZQXJDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7YUFDNUI7Ozs7WUFnQmlDLG1CQUFtQjs7O3VCQVpoRCxLQUFLOzhCQUlMLEtBQUs7NEJBSUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHthbmltYXRlLCBBbmltYXRpb25CdWlsZGVyLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXJ9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHthc3NlcnQsIEVudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnQsIExpc3RXcmFwcGVyfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQge091dGxpbmVTdGF0ZX0gZnJvbSAnLi9vdXRsaW5lLXN0YXRlJztcblxuXG4vKipcbiAqXG4gKiBPdXRsaW5lRm9yQ29tcG9uZW50IGlzIGxpa2UgbmdGb3IsIGJ1dCBmb3IgaGllcmFyY2hpY2FsIChvdXRsaW5lL3RyZWUpIHN0cnVjdHVyZXMgLS0gaS5lLiBpblxuICogdGhvc2UgY2FzZXMgd2hlcmUgYW4gaXRlbSBtYXkgaGF2ZSBjaGlsZHJlbi5cbiAqXG4gKlxuICogSXQgdXNlcyBvdXRsaW5lIGA8YXctb3V0bGluZS1jb250cm9sPmAgdG8gcHJvdmlkZSBleHBhbmRpbmcgZnVuY3Rpb25hbGl0eSwgaW5kZW50YXRpb25cbiAqIGFuZCBvdGhlciB0aGluZ3MuXG4gKlxuICpcbiAqIFRoaXMgY29tcG9uZW50IGhhcyBtaW5pbWFsIHN0eWxpbmcgdG8gbWFrZSBzdXJlIGl0IGNhbiBiZSBjaGFuZ2VkIGVhc2lseS5cbiAqXG4gKiAjIyMgRXhhbXBsZSByZW5kZXJpbmcgdHJlZSBzZWN0aW9uLCB3aGVyZSBiYXNlZCBvbiB0aGUgdHlwZSB3ZSBmb3JtYXQgdGhlIG91dCBwbHVzXG4gKiBmb3IgdGhlIG1haW4gcm9vdCBzZWN0aW9uIHdlIGFsd2F5cyByZW5kZXIgbGl0dGxlIHBvcHVwIG1lbnUuXG4gKlxuICogYGBgXG4gKlxuICogICA8YXctb3V0bGluZS1mb3IgW2xpc3RdPVwibGlzdFwiIFtoYXNDaGlsZHJlbl09XCJoYXNDaGlsZHJlblwiPlxuICpcbiAqICAgICAgIDxuZy10ZW1wbGF0ZSAjb3V0bGluZSBsZXQtaXRlbT5cbiAqXG4gKiAgICAgICAgICAgPGRpdiBjbGFzcz1cIm15LXNlY3Rpb25cIj5cbiAqICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm91dGxpbmVcIj5cbiAqICAgICAgICAgICAgICAgICAgIDxhdy1vdXRsaW5lLWNvbnRyb2w+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiaXRlbS50eXBlXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdTd2l0Y2hDYXNlXT1cIid0ZXh0J1wiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFzLXBhcmFncmFmXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tpdGVtPy5jb250ZW50fX1cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICpcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ1N3aXRjaERlZmF1bHQ+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2l0ZW0/LmNvbnRlbnR9fVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICpcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gKlxuICpcbiAqICAgICAgICAgICAgICAgICAgIDwvYXctb3V0bGluZS1jb250cm9sPlxuICogICAgICAgICAgICAgICA8L2Rpdj5cbiAqXG4gKiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWx0ZXJzXCIgKm5nSWY9XCJpdGVtLnR5cGUgPT09ICdzZWN0aW9uJ1wiID5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICA8YXctaG92ZXItY2FyZCBbbGlua1RpdGxlXT1cIidGaWx0ZXIgSXRlbXMnXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgPGF3LWxpc3QgW2xpc3RdPVwiZmlsdGVySXRlbXNcIiBbYm9yZGVybGVzc109XCJ0cnVlXCI+PC9hdy1saXN0PlxuICogICAgICAgICAgICAgICAgICAgPC9hdy1ob3Zlci1jYXJkPlxuICpcbiAqICAgICAgICAgICAgICAgPC9kaXY+XG4gKiAgICAgICAgICAgPC9kaXY+XG4gKiAgICAgPC9uZy10ZW1wbGF0ZT5gXG4gKiAgIDwvYXctb3V0bGluZS1mb3I+XG4gKlxuICogYGBgXG4gKlxuICpcbiAqIFdlIGNhbiB1c2UgaXQgYWxzbyBpbiBlbWJlZGRlZCBtb2RlIHdoZXJlIHdlIHVzZSB0aGUgYGF3T3V0bGluZUZvcmAgZGlyZWN0aXZlXG4gKlxuICogIyMgRXhhbXBsZVxuICpcbiAqXG4gKiBgYGBgXG4gKiAgPHRhYmxlICBjbGFzcz1cInRyZWUtdGFibGVcIiA+XG4gKiAgICAgIDx0aGVhZD5cbiAqICAgICAgICAgIDx0cj5cbiAqICAgICAgICAgICAgICA8dGg+TmFtZTwvdGg+XG4gKiAgICAgICAgICAgICAgPHRoPlR5cGU8L3RoPlxuICogICAgICAgICAgPC90cj5cbiAqICAgICAgPC90aGVhZD5cbiAqICAgICAgPHRib2R5ICNvb28yIGF3T3V0bGluZUZvciBbbGlzdF09XCJsaXN0XCJcbiAqICAgICAgICAgICAgIFtoYXNDaGlsZHJlbl09XCJoYXNDaGlsZHJlblwiXG4gKiAgICAgICAgICAgICBjbGFzcz1cIm91dGxpbmUtdGFibGVcIlxuICogICAgICA+XG4gKiAgICAgICAgICA8bmctdGVtcGxhdGUgI291dGxpbmUgbGV0LWl0ZW0+XG4gKiAgICAgICAgICAgICAgPHRyPlxuICogICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJpdGVtLW5hbWUgb3V0bGluZS1hbmltYXRpb25cIj5cbiAqICAgICAgICAgICAgICAgICAgICAgIDxkaXY+PGF3LW91dGxpbmUtY29udHJvbD5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICB7e2l0ZW0/LmNvbnRlbnR9fVxuICogICAgICAgICAgICAgICAgICAgICAgPC9hdy1vdXRsaW5lLWNvbnRyb2w+PC9kaXY+XG4gKiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gKiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cIml0ZW0tdHlwZSBvdXRsaW5lLWFuaW1hdGlvblwiPlxuICogICAgICAgICAgICAgICAgICAgICAgPGRpdj57e2l0ZW0udHlwZX19PC9kaXY+XG4gKiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gKiAgICAgICAgICAgICAgPC90cj5cbiAqICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKiAgICAgIDwvdGJvZHk+XG4gKiAgPC90YWJsZT5cbiAqXG4gKiBgYGBcbiAqXG4gKiBJIHdhcyB0aGlua2luZyBtYXliZSBmb3IgZmlyc3QgdGltZSB3ZSBkb24ndCBuZWVkIHRoZSBzYW1lIGFuaW1hdGlvbiBsaWtlIGV4cGFuZGluZyBhbmRcbiAqIGNvbGxhcHNpbmcuIE1heWJlIHdlIG5lZWQgZmFkZS1pbi4gSW4gc3VjaCBjYXNlIEkgd291bGQgcHJvYmFibHkgYXBwbHkgQHNlY3Rpb24gYW5pbSBvbmx5XG4gKiBvbiBpdGVtcyB3aGVyZSBsZXZlbCA+IDAgKGluIHRoZSB0ZW1wbGF0ZSBJIGtlZXAgbGV2ZWxzKSBhbmQgaWYgbGV2ZWwgPT0gMCB0aGVuIEkgd291bGRcbiAqIGV4ZWN1dGUgdGhlIHNhbWUgcmVuZGVyaW5nIGp1c3Qgd2l0aG91dCBbQHNlY3Rpb25dXG4gKlxuICpcbiAqIFRvZG86IFRoaW5rIGFib3V0IGhvdyB0byBkbyBhbmltYXRpb24gZm9yIHRoZSB0YWJsZSBjYXNlLiBNdXN0IGFsc28gd3JpdGUgdW5pdGVzdCAtIGR1ZSB0b1xuICogQXJpYmFMaXZlIGFnZ3Jlc3NpdmUgc2NoZWR1bGUgd2UgYXJlIHNraXBwaW5nIHRoZW0gZm9yIG5vd1xuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1vdXRsaW5lLWZvciwgW2F3T3V0bGluZUZvcl0nLFxuICAgIHRlbXBsYXRlOiBgPCEtLVxuICAgIFN0YXJ0cyB3aXRoIHRoZSBsaXN0LCB3aGVyZSBuZXN0aW5nTGV2ZWwgaXMgLTEuXG4gICAgY2FsbCB0ZW1wbGF0ZSBvdXRsaW5lSXRlbXMgdG8gaXRlcmF0ZSBhbmQgcmVuZGVyIGVhY2ggaXRlbVxuLS0+XG48bmctY29udGFpbmVyIFtuZ0lmXT1cImxpc3RcIiAqbmdUZW1wbGF0ZU91dGxldD1cIm91dGxpbmVJdGVtcztcbiAgICAgICAgICAgIGNvbnRleHQ6eyAkaW1wbGljaXQ6IGxpc3QsIG5lc3RpbmdMZXZlbDogMCwgcGFyZW50SXRlbTogbnVsbCwgZXhwYW5kZWQ6IHRydWV9XCI+XG48L25nLWNvbnRhaW5lcj5cblxuPCEtLVxuICAgIE1haW4gRW50cnkgcG9pbnQgZm9yIHRoZSByZWN1cnNpb24uIHRoaXMgaXMgY2FsbGVkIGJ5IHRoZSBibG9jayBhYm92ZSBhcyB3ZWxsIGFzIGJ5dCB0aGUgaW5uZXJcbiAgICBwaWVjZSB0aGF0IGNhbGxzIHRoaXMgdGVtcGxhdGUgcmVjdXJzaXZlbHkgYWdhaW4gd2hlbiBhbiBpdGVtIGhhcyBjaGlsZHJlblxuLS0+XG48bmctdGVtcGxhdGUgI291dGxpbmVJdGVtcyBsZXQtY2hpbGRyZW4gbGV0LW5lc3RpbmdMZXZlbD1cIm5lc3RpbmdMZXZlbFwiXG4gICAgICAgICAgICAgbGV0LXBhcmVudD1cInBhcmVudEl0ZW1cIiBsZXQtZXhwYW5kZWQ9XCJleHBhbmRlZFwiPlxuXG4gICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1pdGVtIFtuZ0Zvck9mXT1cImNoaWxkcmVuXCIgIGxldC1yb3dJbmRleD1cImluZGV4XCI+XG5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm91dGxpbmVJdGVtO1xuICAgICAgICAgICAgY29udGV4dDp7ICRpbXBsaWNpdDogaXRlbSwgbmVzdGluZ0xldmVsOiBuZXN0aW5nTGV2ZWwsIHBhcmVudEl0ZW06IHBhcmVudCxcbiAgICAgICAgICAgIGV4cGFuZGVkOiBleHBhbmRlZCwgcm93SW5kZXg6cm93SW5kZXh9XCI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDwhLS1cblxuICAgICAgICAgICAgUmVjdXJzaW9uIHBpZWNlOlxuXG4gICAgICAgICAgICBGb3Igbm9uIGVtYmVkZGVkIGNhc2Ugd2hlbiBldmVuIGlmIGl0cyBub3QgZXhwYW5kZWQgd2UgbmVlZCB0byBpdGVyYXRlIGNoaWxkcmVuXG4gICAgICAgICAgICBhcyB3ZSB3YW50IHRvIGFwcGx5IGFuaW1hdGlvbiB0aGF0IHNob3VsZCBnbyB3aXRoIG5nSWYgd2hpY2ggaW5zaWRlIHRoZSBvdXRpbmVJdGVtXG4gICAgICAgICAgICB0ZW1wbGF0ZVxuXG4gICAgICAgICAgICBEb250IHJlY3Vyc2UvIHJlbmRlciBpdGVtcyB0aGF0IGFyZSBub3QgdmlzaWJsZS5cbiAgICAgICAgLS0+XG5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImhhc0NoaWxkcmVuKGl0ZW0pICYmIChpc0V4cGFuZGVkKGl0ZW0sIG5lc3RpbmdMZXZlbCkgfHwgIWVtYmVkZGVkKSAmJiBpc1Zpc2libGUoaXRlbSlcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJvdXRsaW5lSXRlbXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OnsgJGltcGxpY2l0OiBjaGlsZHJlbkZvckl0ZW0oaXRlbSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lc3RpbmdMZXZlbDogbmVzdGluZ0xldmVsKzEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkOiBpc0V4cGFuZGVkKGl0ZW0sIG5lc3RpbmdMZXZlbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudEl0ZW06aXRlbSB9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLXRlbXBsYXRlPlxuPC9uZy10ZW1wbGF0ZT5cblxuXG48IS0tXG4gICAgUmVuZGVycyBhY3R1YWwgb3V0bGluZSBub2RlIGFuZCBhcHBsaWVzIGFuaW1hdGlvbiB3aGlsZSBleHBhbmRpbmcgYW5kIGNvbGxhcHNpbmdcblxuICAgIFtAc2VjdGlvbl09XCJleHBhbmRlZCB8fCBpc0V4cGFuZGVkKGl0ZW0pID8gJ3Zpc2libGUnIDogJ2hpZGRlbidcIlxuLS0+XG48bmctdGVtcGxhdGUgI291dGxpbmVJdGVtIGxldC1pdGVtIGxldC1uZXN0aW5nTGV2ZWw9XCJuZXN0aW5nTGV2ZWxcIiBsZXQtcGFyZW50PVwicGFyZW50SXRlbVwiXG4gICAgICAgICAgICAgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIlxuICAgICAgICAgICAgIGxldC1leHBhbmRlZD1cImV4cGFuZGVkXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwidy1vdXRsaW5lLWl0ZW1cIlxuICAgICAgICAgKm5nSWY9XCIhZW1iZWRkZWQgJiYgZXhwYW5kZWRcIlxuICAgICAgICAgW3N0eWxlLnBhZGRpbmctbGVmdC5weF09XCJpbmRlbnRhdGlvbihuZXN0aW5nTGV2ZWwpXCJcbiAgICAgICAgIGluaXROZXN0aW5nIFtzZXRMZXZlbF09XCJuZXN0aW5nTGV2ZWxcIiBbc2V0UGFyZW50SXRlbV09XCJwYXJlbnRcIlxuICAgICAgICAgW3NldEN1cnJyZW50SXRlbV09XCJpdGVtXCJcbiAgICAgICAgIFtAc2VjdGlvbl1cbiAgICAgICAgIChAc2VjdGlvbi5kb25lKT1cIm9uQW5pbWF0aW9uRG9uZSgkZXZlbnQpXCI+XG5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRyb2xUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6eyAkaW1wbGljaXQ6IGl0ZW0sIG5lc3RpbmdMZXZlbDogbmVzdGluZ0xldmVsLCByb3dJbmRleDpyb3dJbmRleCB9XCI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLVxuICAgICAgICBXaGVuIG91dGxpbmUgY29udHJvbCBpcyB1c2VkIGFzIGVtYmVkZGVkIG1lYW5pbmcgaXRzIGluc2lkZSBlLi5nIGRhdGF0YWJsZSB3ZVxuICAgICAgICBjYW5ub3QgaGF2ZSBhbnkgdGFncyBhcm91bmQgaXQuXG5cbiAgICAgICAgVG9kbzogUmVmYWN0b3IgdGhpcyBpbiB0aGUgd2F5IHNvIHdlIGNhbiBkbyBhbmltYXRpb24gd2hlbiB0YWJsZSBsaW5lcyBhcmVcbiAgICAgICAgZXhwYW5kZWQuIFNpbmNlIGl0cyBlbWJlZGRlZCB3ZSBjYW4gbm90IGhhdmUgYW55IHdyYXBwaW5nIGVsZW1lbnQgYXJvdW5kLCB0aGUgdGVtcGxhdGVcbiAgICAgICAgaXMgZnVsbHkgcmVzcG9uc2libGVcbiAgICAtLT5cbiAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiZW1iZWRkZWQgJiYgZXhwYW5kZWRcIlxuICAgICAgICAgICAgICAgICBpbml0TmVzdGluZyBbc2V0TGV2ZWxdPVwibmVzdGluZ0xldmVsXCIgW3NldFBhcmVudEl0ZW1dPVwicGFyZW50XCJcbiAgICAgICAgICAgICAgICAgW3NldEN1cnJyZW50SXRlbV09XCJpdGVtXCJcbiAgICA+XG4gICAgICAgIDxuZy1jb250YWluZXIgI3JlbmRlcmVkSXRlbSAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRyb2xUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6eyAkaW1wbGljaXQ6IGl0ZW0sIG5lc3RpbmdMZXZlbDogbmVzdGluZ0xldmVsLCByb3dJbmRleDpyb3dJbmRleCAgfVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG48L25nLXRlbXBsYXRlPlxuXG5cbmAsXG4gICAgc3R5bGVzOiBbYC5pcy1vdXRsaW5lLWFuaW1hdGlvbj5kaXYsOjpuZy1kZWVwIC53LW91dGxpbmUtaXRlbXtvdmVyZmxvdzpoaWRkZW59YF0sXG5cbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ3NlY3Rpb24nLCBbXG4gICAgICAgICAgICBzdGF0ZSgnKicsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAnb3ZlcmZsb3cteSc6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgICdoZWlnaHQnOiAnKicsXG4gICAgICAgICAgICAgICAgJ29wYWNpdHknOiAnMSdcblxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6ICcwJyxcbiAgICAgICAgICAgICAgICAnb3BhY2l0eSc6ICcwJyxcbiAgICAgICAgICAgICAgICAnb3ZlcmZsb3cteSc6ICdoaWRkZW4nXG5cbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJyogPT4gdm9pZCcsIGFuaW1hdGUoJzIwMG1zIGVhc2Utb3V0JykpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiAqJywgYW5pbWF0ZSgnMjAwbXMgZWFzZS1pbicpKVxuICAgICAgICBdKSxcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE91dGxpbmVGb3JDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XG57XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIGl0ZW1zIHRoYXQgbmVlZHMgdG8gYmUgcmVuZGVyZWQuIEl0IGRvZXMgbm90IGhhdmUgdG8gaW4gaGllcmFyY2hpY2FsIG9yZGVyIG9yIHdlXG4gICAgICogbGVhdmUgaXQgdXAgdG8gdGhlIGFwcGxpY2F0aW9uIHRvIGRlY2lkZSBhYm91dCB0aGUgc3RydWN0dXJlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGlzdD86IGFueVtdO1xuXG5cbiAgICAvKipcbiAgICAgKiBUZWxscyB0aGUgY29tcG9uZW50IG5vdCB0byByZW5kZXIgZXhwYW5zaW9uIGNvbnRyb2wsIGluIHN1Y2ggY2FzZSB3ZSBleHBhbmRBbGwgYXMgYVxuICAgICAqIGRlZmF1bHQgYmVoYXZpb3JcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd0V4cGFuc2lvbkNvbnRyb2w6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogQ3VzdG9tIG1ldGhvZCBwcm92aWRlZCBieSBhcHBsaWNhdGlvbiB0byByZXRyaWV2ZSBsaXN0IG9mIGNoaWxkcmVuIGZvciBjdXJyZW50IGl0ZW0uIElmXG4gICAgICogY2hpbGRyZW4gaXMgdW5kZWZpbmVkIHRoZW4sIGRlZmF1bHQgJ2NoaWxkcmVuJyBmaWVsZCBpcyB1c2VkIDxjdXJyZW50SXRlbT4uY2hpbGRyZW5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGNoaWxkcmVuOiAodmFsdWU6IGFueSkgPT4gYW55W107XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIE9wdGlvbiB0byBjb25kaXRpb25hbGx5IHJlbmRlciBvbmx5IGl0ZW1zIHRoYXQgYXJlIHNhdGlzZnlpbmcgZmlsdGVyIGNvbmRpdGlvblxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBmaWx0ZXJPdXQ6ICh2YWx1ZTogYW55KSA9PiBib29sZWFuO1xuXG5cbiAgICAvKipcbiAgICAgKiBPcGVucyBhbGwgdHJlZSBub2Rlcy5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZXhwYW5kQWxsOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIC8qKlxuICAgICAqICBNYW5hZ2VzIHRoZSBzdGF0ZSBmb3IgdGhlIE91dGxpbmUgY29tcG9uZW50LiBMYXRlciBvbiB3ZSBjYW4gcHJvdmlkZSBlYXNpZXIgd2UgaG93IHRvXG4gICAgICogIGluaXRpYWxpemUgYW5kIHNldCBzZWxlY3Rpb25QYXRocyBhbmQgc2VsZWN0aW9uU3RhdGVzIGZyb20gdGhlIGFwcGxpY2F0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHN0YXRlOiBPdXRsaW5lU3RhdGU7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNldCBpbmRlbnRhdGlvbiBzaXplIHRvIGJlIHVzZWQgZm9yIGVhY2ggbGV2ZWxcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaW5kZW50YXRpb25QZXJMZXZlbDogbnVtYmVyID0gMjU7XG5cblxuICAgIC8qKlxuICAgICAqIEluIGNhc2UgdGVtcGxhdGUgaXMgb3V0c2lkZSBvZiB0aGUgb3V0bGluZUZvclxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZXh0ZXJuYWxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuXG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHRvIGN1cnJlbnQgb2JqZWN0IHVzaW5nIHRoaXMgY29tcG9uZW50XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjb250ZXh0OiBhbnk7XG5cblxuICAgIEBJbnB1dCgpXG4gICAgcHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFVzZWQgd2hlbiBpbiBzZWxlY3Rpb24gbW9kZSB0byBwdXNoIGN1cnJlbnQgc2VsZWN0ZWQgSXRlbSB0byB0aGUgYXBwbGljYXRpb25cbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uSXRlbVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUaGlzIGV2ZW50IGlzIHRyaWdnZXJlZCBieSBPdXRsaW5lQ29udHJvbCB3aGVuIG5vZGUgaXMgZXhwYW5kZWQgb3IgY29sbGFwc2VkXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkV4cGFuZENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBBIHRlbXBsYXRlIHRvIHVzZSBvbiBhcHBsaWNhdGlvbiBsZXZlbCB0byByZW5kZXIgaW5kaXZpZHVhbCBpdGVtc1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ291dGxpbmUnKVxuICAgIGNvbnRyb2xUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuXG4gICAgQFZpZXdDaGlsZCgncmVuZGVyZWRJdGVtJylcbiAgICBvdXRsaW5lSXRlbTogRWxlbWVudFJlZjtcblxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWxzXG4gICAgICpcbiAgICAgKiBjdXJyZW50SXRlbSBhbmQgcGFyZW50SXRlbSBhcmUgdXNlZCB0byBjYXB0dXJlIGN1cnJlbnQgcHJvY2Vzc2VkIGl0ZW0gb2YgbmdGb3IuIFRoaXMgaXNcbiAgICAgKiBzZXQgYnkgZGlyZWN0aXZlIGBJbml0TmVzdGluZ0RpcmVjdGl2ZWBcbiAgICAgKlxuICAgICAqIGFuaW1hdGlvbkluUHJvZ3Jlc3M6IHVzZWQgYnkgYW5pbWF0aW9uIGVuZ2luZSB0byBtYWtlIHN1cmUgd2UgZG9udCBkbyBhbnkgYWN0aW9ucyB3aGlsZVxuICAgICAqIGFuaW1hdGlvbiBpcyBpbiB0aGUgcHJvZ3Jlc3NcbiAgICAgKlxuICAgICAqIGVtYmVkZGVkOiBJbmRpY2F0ZXMgdGhhdCB3ZSBhcmUgdXNpbmcgZGlyZWN0aXZlIHNvIGl0IHdpbGwgbm90IGhhdmUgZGVmYXVsdCBjb21wb25lbnRcbiAgICAgKiB3cmFwcGVyXG4gICAgICpcbiAgICAgKi9cbiAgICBjdXJyZW50SXRlbTogYW55O1xuICAgIHBhcmVudEl0ZW06IGFueTtcbiAgICBhbmltYXRpb25JblByb2dyZXNzOiBib29sZWFuO1xuICAgIGVtYmVkZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBGbGFnIHRoYXQgdGVsbHMgdXMgdGhhdCBjb21wb25lbnQgaXMgZnVsbHkgcmVuZGVyZWRcbiAgICAgKlxuICAgICAqL1xuICAgIHZpZXdJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICBjb25zdHJ1Y3RvciAocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgICAgIHByaXZhdGUgYnVpbGRlcjogQW5pbWF0aW9uQnVpbGRlcixcbiAgICAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmKVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcblxuICAgIH1cblxuICAgIG5nT25Jbml0ICgpXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuc3RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gbmV3IE91dGxpbmVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuc3RhdGUub3V0bGluZUZvcikpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUub3V0bGluZUZvciA9IHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5leHBhbmRBbGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0V4cGFuc2lvbkNvbnRyb2wgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGUuZ2xvYmFsU3RhdGUgPSB0aGlzLmV4cGFuZEFsbDtcblxuICAgICAgICAvLyBpbiBjYXNlIHdlIHdhbnQgdG8gcmVuZGVyIGNvbnRlbnQgb2YgdHJlZSBvdXRzaWRlIG9mIG91dGxpbmVGb3JcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmV4dGVybmFsVGVtcGxhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xUZW1wbGF0ZSA9IHRoaXMuZXh0ZXJuYWxUZW1wbGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW1iZWRkZWQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2F3b3V0bGluZWZvcicpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuY29udGV4dCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAvLyB3aGVuIHJvb3Qgc2VjdGlvbiBuZWVkcyB0byBiZSBvbiBuZXcgbGluZSwgdGhlbiBhdXRvbWF0aWNhbGx5IGV4cGFuZCBzZWNvbmQgbGV2ZWxcbiAgICAgICAgLy8gaWYgKHRoaXMucHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmxpc3QuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgbGV0IGN1cnJlbnRJdGVtID0gTGlzdFdyYXBwZXIubGFzdCh0aGlzLnN0YXRlLmN1cnJlbnRQYXRoKTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnN0YXRlLnRvZ2dsZUV4cGFuc2lvbihpdGVtKTtcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIH1cbiAgICB9XG5cblxuICAgIG5nRG9DaGVjayAoKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIubmdEb0NoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXNlZCBieSB0ZW1wbGF0ZSBhbmQgT3V0bGluZUNvbnRyb2wgdG8gaWRlbnRpZnkgd2hpY2ggaXRlbSBpcyBleHBhbmRlZCBhbmQgY29sbGFwc2VkXG4gICAgICpcbiAgICAgKi9cbiAgICBpc0V4cGFuZGVkIChpdGVtOiBhbnksIGN1cnJlbnRMZXZlbDogbnVtYmVyID0gLTEpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gKGN1cnJlbnRMZXZlbCA9PT0gMCAmJiB0aGlzLnB1c2hSb290U2VjdGlvbk9uTmV3TGluZSlcbiAgICAgICAgICAgID8gdHJ1ZSA6IHRoaXMuc3RhdGUuaXNFeHBhbmRlZChpdGVtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNpbmNlIHdlIGhhdmUgY3VycmVudGx5IHR3byB3YXlzIGhvdyB0byBwYXNzIGNoaWxkcmVuIGl0ZW1zIHdlIG5lZWQgaGF2ZSB0aGlzIG1ldGhvZCB0b1xuICAgICAqIHVuaWZ5IHRoZSB3YXkgaG93IHdlIGFjY2VzcyBpdC4gSWYgd2UgcGFzcyBgY2hpbGRyZW5gIGJpbmRpbmcgd2UgdXNlIHRoaXMgaW5zdGVhZCwgb3RoZXJ3aXNlXG4gICAgICogd2UgZXhwZWN0IGN1cnJlbnQgb2JqZWN0IHRvIGhhdmUgYGNoaWxkcmVuYCBmaWVsZFxuICAgICAqXG4gICAgICovXG4gICAgY2hpbGRyZW5Gb3JJdGVtIChpdGVtOiBhbnkpOiBhbnlbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQ2hpbGRyZW4oaXRlbSkgPyB0aGlzLmRvR2V0Q2hpbGRyZW4oaXRlbSkgOiBbXTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ2hlY2sgaWYgdGhlIGN1cnJlbnQgaXRlbSBoYXMgYSBjaGlsZHJlbiBhbmQgbmVlZHMgdG8gYmUgcmVuZGVyZWRcbiAgICAgKlxuICAgICAqL1xuICAgIGhhc0NoaWxkcmVuIChpdGVtOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmNoaWxkcmVuKSAmJiBpc0JsYW5rKGl0ZW0uY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICBhc3NlcnQoZmFsc2UsICdNaXNzaW5nIFtjaGlsZHJlbl0gbWV0aG9kIGJpbmRpbmcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRvR2V0Q2hpbGRyZW4oaXRlbSkubGVuZ3RoID4gMDtcblxuICAgIH1cblxuICAgIGRvR2V0Q2hpbGRyZW4gKGl0ZW06IGFueSk6IGFueVtdXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5hcHBseSh0aGlzLmNvbnRleHQsIFtpdGVtXSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiAgVXNlcyB0aGUgYE91dGxpbmVTdGF0ZWAgdG8gdG9nZ2xlIHN0YXRlIG9mIGN1cnJlbnQgc2VsZWN0aW9uUGF0aC4gVGhlIGBzZWxlY3Rpb25QYXRoYCBpc1xuICAgICAqICBwdXQgdG9nZXRoZXIgaW5zaWRlIGBPdXRsaW5lQ29udHJvbGAgd2hlcmUgd2UgaXRlcmF0ZSBhbGwgdGhlIHdheSB0byB0aGUgcm9vdCBhbmQgYWRkXG4gICAgICogIGVhY2ggaXRlbSB0byB0aGUgYGN1cnJlbnRQYXRoYCBhcnJheS4gVGhpcyB3YXkgd2UgY29sbGVjdCBsaXN0IG9mIGl0ZW0gcmVwcmVzZW50aW5nIGN1cnJlbnRcbiAgICAgKiAgY3VycmVudCBleHBhbnNpb25QYXRoLlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICB0b2dnbGVFeHBhbnNpb24gKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbkluUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIC8vIGJhY2t1cCBwcm9jZWR1cmUgaW4gY2FzZSBvbkFuaW1hdGlvbkRvbmUgZmFpbHNcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb25JblByb2dyZXNzKSB7IC8vIGNoYW5nZSBvbmx5IGlmIGl0cyBmYWlsc1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmVtYmVkZGVkKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1cnJlbnRJdGVtID0gTGlzdFdyYXBwZXIubGFzdCh0aGlzLnN0YXRlLmN1cnJlbnRQYXRoKTtcbiAgICAgICAgdGhpcy5zdGF0ZS50b2dnbGVFeHBhbnNpb24odGhpcy5zdGF0ZS5jdXJyZW50UGF0aCwgdGhpcy5jaGlsZHJlbkZvckl0ZW0oY3VycmVudEl0ZW0pKTtcblxuICAgICAgICBpZiAodGhpcy5lbWJlZGRlZCkge1xuICAgICAgICAgICAgLy8gdGhpcy5hbmltYXRlRW1iZWRkZWRJdGVtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFuZ3VsYXIgYW5pbS4gY2FsbGJhY2sgdGhhdCBzZXRzIGJhY2sgdGhlIGZsYWcgdG8gbWFrZSBzdXJlIHdlIGRvbid0IHRyaWdnZXIgYW5pbWF0aW9uc1xuICAgICAqIHdoZW4gb25lIGlzIGluIHByb2dyZXNzLlxuICAgICAqXG4gICAgICovXG4gICAgb25BbmltYXRpb25Eb25lIChldmVudDogRXZlbnQpXG4gICAge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbkluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVkIGluZGVudGF0aW9uIHVzZWQgdG8gc2hpZnQgdGhlIG5lc3RlZCBzZWN0aW9uIHRvIHRoZSByaWdodCBvciBsYXRlciBvbiB0byB0aGVcbiAgICAgKiBsZWZ0IHdoZW4gUlRMIGlzIHN1cHBvcnRlZFxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBpbmRlbnRhdGlvbiAoY3VycmVudExldmVsOiBudW1iZXIpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLnB1c2hSb290U2VjdGlvbk9uTmV3TGluZSAmJiBjdXJyZW50TGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICBjdXJyZW50TGV2ZWwgLT0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoY3VycmVudExldmVsID09PSAwICYmIHRoaXMucHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lKVxuICAgICAgICAgICAgPyAwIDogKHRoaXMuaW5kZW50YXRpb25QZXJMZXZlbCAqIGN1cnJlbnRMZXZlbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTm90IGFsbCByb3dzIGFyZSB2aXNpYmxlIGJ5IGRlZmF1bHQsIHRoZXJlIGNhbiBiZSBhIGNhc2Ugd2hlcmUgeW91IGRvbnQgd2FudCB0byByZW5kZXIgaXRlbXNcbiAgICAgKiB1c2luZyBvdXRsaW5lLiBlLmcuIERhdGF0YWJsZSB3aXRoIGRldGFpbCByb3cuXG4gICAgICovXG4gICAgaXNWaXNpYmxlIChpdGVtOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZmlsdGVyT3V0KSkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLmZpbHRlck91dChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbi8qKlxuICpcbiAqIFNpbmNlIHdlIGNhbiBub3QgZGlyZWN0bHkgc2V0IGAqbmdUZW1wbGF0ZU91dGxldGAgY29udGV4dCB2YXJpYWJsZXMgdG8gdGhlIHR5cGVzY3JpcHQgY2xhc3Mgd2VcbiAqIHVzZSB0aGlzIGRpcmVjdGl2ZSB0byBkbyB0aGUgSm9iXG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tpbml0TmVzdGluZ10nXG59KVxuZXhwb3J0IGNsYXNzIEluaXROZXN0aW5nRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0XG57XG5cbiAgICBASW5wdXQoKVxuICAgIHNldExldmVsOiBudW1iZXI7XG5cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0Q3VycnJlbnRJdGVtOiBhbnk7XG5cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0UGFyZW50SXRlbTogYW55O1xuXG5cbiAgICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBvdXRsaW5lOiBPdXRsaW5lRm9yQ29tcG9uZW50KVxuICAgIHtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0ICgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuc2V0TGV2ZWwpKSB7XG4gICAgICAgICAgICB0aGlzLm91dGxpbmUuc3RhdGUuY3VycmVudExldmVsID0gdGhpcy5zZXRMZXZlbDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnNldEN1cnJyZW50SXRlbSkpIHtcbiAgICAgICAgICAgIHRoaXMub3V0bGluZS5jdXJyZW50SXRlbSA9IHRoaXMuc2V0Q3VycnJlbnRJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnNldFBhcmVudEl0ZW0pKSB7XG4gICAgICAgICAgICB0aGlzLm91dGxpbmUuY3VycmVudEl0ZW1bJyQkcGFyZW50SXRlbSddID0gdGhpcy5zZXRQYXJlbnRJdGVtO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbiJdfQ==