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
    ContentChild,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {animate, AnimationBuilder, state, style, transition, trigger} from '@angular/animations';
import {assert, Environment, isBlank, isPresent, ListWrapper} from '@aribaui/core';
import {BaseComponent} from '../../core/base.component';
import {OutlineState} from './outline-state';


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
@Component({
    selector: 'aw-outline-for, [awOutlineFor]',
    templateUrl: 'outline-for.component.html',
    styleUrls: ['outline-for.component.scss'],

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
})
export class OutlineForComponent extends BaseComponent
{

    /**
     * List of items that needs to be rendered. It does not have to in hierarchical order or we
     * leave it up to the application to decide about the structure.
     */
    @Input()
    list?: any[];


    /**
     * Tells the component not to render expansion control, in such case we expandAll as a
     * default behavior
     *
     */
    @Input()
    showExpansionControl: boolean = true;

    /**
     * Custom method provided by application to retrieve list of children for current item. If
     * children is undefined then, default 'children' field is used <currentItem>.children
     */
    @Input()
    children: (value: any) => any[];

    /**
     *
     * Option to conditionally render only items that are satisfying filter condition
     *
     */
    @Input()
    filterOut: (value: any) => boolean;


    /**
     * Opens all tree nodes.
     *
     */
    @Input()
    expandAll: boolean = false;


    /**
     *  Manages the state for the Outline component. Later on we can provide easier we how to
     *  initialize and set selectionPaths and selectionStates from the application
     *
     */
    @Input()
    state: OutlineState;

    /**
     *
     * Set indentation size to be used for each level
     *
     */
    @Input()
    indentationPerLevel: number = 25;


    /**
     * In case template is outside of the outlineFor
     */
    @Input()
    externalTemplate: TemplateRef<any>;


    /**
     * Reference to current object using this component
     */
    @Input()
    context: any;


    @Input()
    pushRootSectionOnNewLine: boolean = false;

    /**
     *
     * Used when in selection mode to push current selected Item to the application
     *
     */
    @Output()
    onItemSelected: EventEmitter<any> = new EventEmitter();


    /**
     *
     * This event is triggered by OutlineControl when node is expanded or collapsed
     *
     */
    @Output()
    onExpandChange: EventEmitter<any> = new EventEmitter();

    /**
     * A template to use on application level to render individual items
     */
    @ContentChild('outline')
    controlTemplate: TemplateRef<any>;


    @ViewChild('renderedItem')
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
    embedded: boolean = false;

    /**
     * Flag that tells us that component is fully rendered
     *
     */
    viewInitialized: boolean = false;


    constructor (public env: Environment,
                 private _viewContainer: ViewContainerRef,
                 private builder: AnimationBuilder,
                 private element: ElementRef)
    {
        super(env);

    }

    ngOnInit ()
    {
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


    ngDoCheck (): void
    {
        super.ngDoCheck();
    }

    /**
     * Used by template and OutlineControl to identify which item is expanded and collapsed
     *
     */
    isExpanded (item: any, currentLevel: number = -1): boolean
    {
        return (currentLevel === 0 && this.pushRootSectionOnNewLine)
            ? true : this.state.isExpanded(item);
    }

    /**
     *
     * Since we have currently two ways how to pass children items we need have this method to
     * unify the way how we access it. If we pass `children` binding we use this instead, otherwise
     * we expect current object to have `children` field
     *
     */
    childrenForItem (item: any): any[]
    {
        return this.hasChildren(item) ? this.doGetChildren(item) : [];
    }


    /**
     *
     * Check if the current item has a children and needs to be rendered
     *
     */
    hasChildren (item: any): boolean
    {
        if (isBlank(this.children) && isBlank(item.children)) {
            assert(false, 'Missing [children] method binding');
        }

        return this.doGetChildren(item).length > 0;

    }

    doGetChildren (item: any): any[]
    {
        return this.children.apply(this.context, [item]);
    }


    /**
     *  Uses the `OutlineState` to toggle state of current selectionPath. The `selectionPath` is
     *  put together inside `OutlineControl` where we iterate all the way to the root and add
     *  each item to the `currentPath` array. This way we collect list of item representing current
     *  current expansionPath.
     *
     *
     */
    toggleExpansion (): void
    {
        if (this.animationInProgress) {
            // backup procedure in case onAnimationDone fails
            setTimeout(() =>
            {
                if (this.animationInProgress) { // change only if its fails
                    this.animationInProgress = false;
                }
            }, 200);
            return;
        }

        if (!this.embedded) {
            this.animationInProgress = true;
        }

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
     */
    onAnimationDone (event: Event)
    {
        this.animationInProgress = false;
    }

    /**
     * Calculated indentation used to shift the nested section to the right or later on to the
     * left when RTL is supported
     *
     *
     */
    indentation (currentLevel: number): number
    {
        if (this.pushRootSectionOnNewLine && currentLevel > 0) {
            currentLevel -= 1;
        }

        return (currentLevel === 0 && this.pushRootSectionOnNewLine)
            ? 0 : (this.indentationPerLevel * currentLevel);
    }

    /**
     * Not all rows are visible by default, there can be a case where you dont want to render items
     * using outline. e.g. Datatable with detail row.
     */
    isVisible (item: any): boolean
    {
        if (isPresent(this.filterOut)) {
            return !this.filterOut(item);
        }
        return true;
    }
}

/**
 *
 * Since we can not directly set `*ngTemplateOutlet` context variables to the typescript class we
 * use this directive to do the Job
 *
 */
@Directive({
    selector: '[initNesting]'
})
export class InitNestingDirective implements OnInit
{

    @Input()
    setLevel: number;


    @Input()
    setCurrrentItem: any;


    @Input()
    setParentItem: any;


    constructor (private outline: OutlineForComponent)
    {
    }


    ngOnInit (): void
    {
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
