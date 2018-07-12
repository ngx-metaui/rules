/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { Environment, isBlank, isPresent } from '@aribaui/core';
import { MetaContextComponent } from '../../core/meta-context/meta-context.component';
import { MetaBaseComponent } from '../meta.base.component';
import { UIMeta } from '../../core/uimeta';
/**
 * @record
 */
export function MenuItemCommand() { }
function MenuItemCommand_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    MenuItemCommand.prototype.actionName;
    /** @type {?|undefined} */
    MenuItemCommand.prototype.moduleName;
    /** @type {?|undefined} */
    MenuItemCommand.prototype.routePath;
}
/**
 * MetaActionList provides a way how to attach actions to the screen. We can use \@action declaration
 * to define new action and their actionResults. actionResults is an expression that is executed
 * and either redirect you to different page or some logic is executed.
 *
 * Actions can be organized into action categories but if we do not provide any action category
 * default one is used.
 *
 * This way we define placeholder using a layout where actions are inserted
 *
 *
 * ```html
 *
 *    layout=Inspect2#Stack {
 * \@layout=MenuTop#ActionButtons {
 *       }
 *
 * \@layout=First#Form {
 *     }
 *
 * \@layout=Second#Form { zonePath:Second; }
 *  }
 *
 *
 * ```
 *
 * And this is how we define actions for current page/class/object
 *
 * ```
 * \@action=update {
 *             actionResults:${ object.firstName = "Mr." +  object.firstName };
 *             visible: ${ properties.editing };
 *    }
 *
 *
 * \@action=Save {
 *             label: "My Save";
 *             actionResults:${ object.firstName = "Ms." +  object.firstName };
 *             visible: ${ properties.editing };
 *             buttonStyle:info;
 *    }
 * ```
 *
 *
 *
 *
 *
 *
 *
 */
export class MetaActionListComponent extends MetaBaseComponent {
    /**
     * @param {?} _metaContext
     * @param {?} env
     */
    constructor(_metaContext, env) {
        super(env, _metaContext);
        this._metaContext = _metaContext;
        this.env = env;
        /**
         *
         * Defines type of components that renders our actions. We have 3 types:
         * Buttons, Links and Popup Menu
         *
         */
        this.renderAs = 'buttons';
        /**
         * Default style used for the buttons if none is specified
         *
         */
        this.defaultStyle = 'info';
        /**
         * Tells us if the action should be rendered on the left or right side
         *
         */
        this.align = 'right';
        /**
         * Map linking the name of the layout to the actual context. We need this when we need
         * to access current content.
         *
         */
        this._contextMap = new Map();
    }
    /**
     * Read and stores current action categories available to current Context
     *
     * @return {?}
     */
    actionCategories() {
        if (isBlank(this._actionsByCategory) || isBlank(this._actionsByName)) {
            if (isPresent(this.filterActions)) {
                this.context.set('filterActions', this.filterActions);
            }
            let /** @type {?} */ meta = /** @type {?} */ (this.context.meta);
            this.context.push();
            this.menuModel = [];
            this._actionsByCategory = new Map();
            this._actionsByName = new Map();
            this.categories = meta.actionsByCategory(this.context, this._actionsByCategory, UIMeta.ActionZones);
            this.context.pop();
            this._actionsByCategory.forEach((v, k) => {
                v.forEach((item) => this._actionsByName.set(item.name, item));
            });
        }
        return this.categories;
    }
    /**
     *
     * Action belonging to current category..
     *
     * @param {?} category
     * @return {?}
     */
    actions(category) {
        return this._actionsByCategory.get(category.name);
    }
    /**
     *
     * When action clicked this method delegates it into meta layer to be executed.
     *
     * @param {?} action
     * @return {?}
     */
    actionClicked(action) {
        let /** @type {?} */ context = this._contextMap.get(action);
        let /** @type {?} */ meta = /** @type {?} */ (context.meta);
        meta.fireActionFromProps(this._actionsByName.get(action), /** @type {?} */ (context));
    }
    /**
     * A hook used to store the most current context for each action.
     *
     * @param {?} actionName
     * @return {?}
     */
    onAfterContextSet(actionName) {
        let /** @type {?} */ aContext = this._metaContext.activeContext().snapshot().hydrate(false);
        this._contextMap.set(actionName, aContext);
        if (this.renderAs === 'menu') {
            this.populateMenu(actionName);
        }
    }
    /**
     * A hook used to store the most current context for each action.
     *
     * @param {?} change
     * @return {?}
     */
    onContextChanged(change) {
        console.log('Changed = ' + change);
    }
    /**
     * @param {?} actionName
     * @return {?}
     */
    label(actionName) {
        let /** @type {?} */ context = this._contextMap.get(actionName);
        return super.aProperties(context, UIMeta.KeyLabel);
    }
    /**
     * @param {?} actionName
     * @return {?}
     */
    isActionDisabled(actionName) {
        let /** @type {?} */ context = this._contextMap.get(actionName);
        return isPresent(context) ? !context.booleanPropertyForKey('enabled', false) : true;
    }
    /**
     * @return {?}
     */
    alignRight() {
        return this.align === 'right';
    }
    /**
     * @param {?} actionName
     * @return {?}
     */
    style(actionName) {
        let /** @type {?} */ context = this._contextMap.get(actionName);
        let /** @type {?} */ style = super.aProperties(context, 'buttonStyle');
        return isPresent(style) ? style : this.defaultStyle;
    }
    /**
     * @param {?} actionName
     * @return {?}
     */
    populateMenu(actionName) {
        let /** @type {?} */ label = this.label(actionName);
        let /** @type {?} */ index = this.menuModel.findIndex((item) => item.actionName === actionName);
        let /** @type {?} */ itemCommand = {
            label: label,
            actionName: actionName,
            disabled: this.isActionDisabled(actionName),
            command: (event) => {
                this.actionClicked(event.item.actionName);
            }
        };
        if (index === -1) {
            this.menuModel.push(itemCommand);
        }
        else {
            this.menuModel[index] = itemCommand;
        }
    }
}
MetaActionListComponent.decorators = [
    { type: Component, args: [{
                template: `<span [class.u-flr]="alignRight()">
    <m-context *ngIf="renderAs === 'buttons'">
        <ng-template ngFor [ngForOf]="actionCategories()" let-category>
            <m-context [actionCategory]="category.name">
                <ng-template ngFor [ngForOf]="actions(category)" let-action>
                    <m-context [action]="action.name"
                               (onContextChanged)="onContextChanged($event)"
                               (afterContextSet)="onAfterContextSet($event)">
                        <aw-button (action)="actionClicked(action.name)"
                                   [style]="style(action.name)"
                                   [disabled]="isActionDisabled(action.name)">

                        {{ label(action.name) }}
                        </aw-button>
                    </m-context>
                </ng-template>
            </m-context>

        </ng-template>
    </m-context>

    <m-context *ngIf="renderAs === 'links'">
        <ng-template ngFor [ngForOf]="actionCategories()" let-category>
            <m-context [actionCategory]="category.name">
                <ng-template ngFor [ngForOf]="actions(category)" let-action>
                    <m-context [action]="action.name"
                               (onContextChanged)="onContextChanged($event)"
                               (afterContextSet)="onAfterContextSet($event)">
                        <aw-button (action)="actionClicked(action.name)"
                                   [style]="'link'"
                                   [disabled]="isActionDisabled(action.name)">

                        {{ label(action.name) }}
                        </aw-button>
                    </m-context>
                </ng-template>
            </m-context>

        </ng-template>
    </m-context>

    <m-context *ngIf="renderAs === 'menu'">
        <ng-template ngFor [ngForOf]="actionCategories()" let-category>
            <m-context [actionCategory]="category.name">

                <ng-template ngFor [ngForOf]="actions(category)" let-action>
                    <m-context [action]="action.name"
                               (onContextChanged)="onContextChanged($event)"
                               (afterContextSet)="onAfterContextSet($event)">
                    </m-context>
                </ng-template>
            </m-context>
        </ng-template>

        <p-menu #menu popup="popup" [model]="menuModel"></p-menu>

        <!-- todo: extend button to support icons -->
        <aw-button (action)="menu.toggle($event)">
            Actions
        </aw-button>

    </m-context>
</span>





`,
                styles: [`.m-action-list{width:100%}`]
            },] },
];
/** @nocollapse */
MetaActionListComponent.ctorParameters = () => [
    { type: MetaContextComponent },
    { type: Environment }
];
MetaActionListComponent.propDecorators = {
    renderAs: [{ type: Input }],
    defaultStyle: [{ type: Input }],
    align: [{ type: Input }],
    filterActions: [{ type: Input }]
};
function MetaActionListComponent_tsickle_Closure_declarations() {
    /**
     *
     * Defines type of components that renders our actions. We have 3 types:
     * Buttons, Links and Popup Menu
     *
     * @type {?}
     */
    MetaActionListComponent.prototype.renderAs;
    /**
     * Default style used for the buttons if none is specified
     *
     * @type {?}
     */
    MetaActionListComponent.prototype.defaultStyle;
    /**
     * Tells us if the action should be rendered on the left or right side
     *
     * @type {?}
     */
    MetaActionListComponent.prototype.align;
    /**
     * This is special identifier and when used we push extra stack property in order to get some
     * additional properties that are primarily related to type of actions that can be visible or
     * enabled
     *
     * E.g. we can say we want only object Instance based buttons
     *
     * ```
     * \@trait=InstanceActionButtons {
     *          visible:true;
     *          component:MetaActionListComponent;
     *          bindings:{
     *              renderAs:buttons;
     *              align:right;
     *              filterActions:instance;
     *           };
     *           elementClass:"l-action-buttons";
     *      }
     *
     *  ```
     *
     * When this trait is used we push filterAction = instance and it will give us back
     *
     *  ```
     *  filterActions=instance {
     *          visible:${properties.isInstanceAction == true}
     *      }
     *
     * ```
     *
     * Which can be used to show or hide button if e.g. object instance is selected or available
     *
     *
     *
     * @type {?}
     */
    MetaActionListComponent.prototype.filterActions;
    /**
     * Just stores mapping between action and context and action and ItemProperties. So everytime
     *
     * @type {?}
     */
    MetaActionListComponent.prototype._actionsByCategory;
    /** @type {?} */
    MetaActionListComponent.prototype._actionsByName;
    /**
     * Current  action groups retrieved from current Context
     * @type {?}
     */
    MetaActionListComponent.prototype.categories;
    /**
     * When ActionMenu trait is used this is the menu model that defines what items are available
     * @type {?}
     */
    MetaActionListComponent.prototype.menuModel;
    /**
     * Map linking the name of the layout to the actual context. We need this when we need
     * to access current content.
     *
     * @type {?}
     */
    MetaActionListComponent.prototype._contextMap;
    /** @type {?} */
    MetaActionListComponent.prototype._metaContext;
    /** @type {?} */
    MetaActionListComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1hY3Rpb24tbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJsYXlvdXQvbWV0YS1hY3Rpb24tbGlzdC9tZXRhLWFjdGlvbi1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBbUJBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQztBQUNwRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUV6RCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVJekMsTUFBTSw4QkFBK0IsU0FBUSxpQkFBaUI7Ozs7O0lBNkYxRCxZQUFzQixZQUFrQyxFQUFTLEdBQWdCO1FBRTdFLEtBQUssQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFGUCxpQkFBWSxHQUFaLFlBQVksQ0FBc0I7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFhOzs7Ozs7O3dCQW5GOUQsU0FBUzs7Ozs7NEJBUUwsTUFBTTs7Ozs7cUJBUWIsT0FBTzs7Ozs7OzJCQWdFYyxJQUFJLEdBQUcsRUFBbUI7S0FPOUQ7Ozs7OztJQWVELGdCQUFnQjtRQUVaLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVuRSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FB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LENBQUM7U0FDcEM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsV0FBVyxDQUFDO1NBQ3ZDOzs7O1lBblRSLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBb0ViO2dCQUNHLE1BQU0sRUFBRSxDQUFDLDRCQUE0QixDQUFDO2FBQ3pDOzs7O1lBeklPLG9CQUFvQjtZQURwQixXQUFXOzs7dUJBb0pkLEtBQUs7MkJBUUwsS0FBSztvQkFRTCxLQUFLOzRCQXVDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQmFzZWQgb24gb3JpZ2luYWwgd29yazogTWV0YVVJOiBDcmFpZyBGZWRlcmlnaGkgKDIwMDgpXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7TWV0YUNvbnRleHRDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvbWV0YS1jb250ZXh0L21ldGEtY29udGV4dC5jb21wb25lbnQnO1xuaW1wb3J0IHtNZXRhQmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vbWV0YS5iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQge0NvbnRleHQsIFVJQ29udGV4dH0gZnJvbSAnLi4vLi4vY29yZS9jb250ZXh0JztcbmltcG9ydCB7VUlNZXRhfSBmcm9tICcuLi8uLi9jb3JlL3VpbWV0YSc7XG5pbXBvcnQge0l0ZW1Qcm9wZXJ0aWVzfSBmcm9tICcuLi8uLi9jb3JlL2l0ZW0tcHJvcGVydGllcyc7XG5pbXBvcnQge01lbnVJdGVtfSBmcm9tICdwcmltZW5nL2NvbXBvbmVudHMvY29tbW9uL2FwaSc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBNZW51SXRlbUNvbW1hbmQgZXh0ZW5kcyBNZW51SXRlbVxue1xuICAgIGFjdGlvbk5hbWU/OiBzdHJpbmc7XG4gICAgbW9kdWxlTmFtZT86IHN0cmluZztcbiAgICByb3V0ZVBhdGg/OiBzdHJpbmc7XG5cbn1cblxuLyoqXG4gKiBNZXRhQWN0aW9uTGlzdCBwcm92aWRlcyBhIHdheSBob3cgdG8gYXR0YWNoIGFjdGlvbnMgdG8gdGhlIHNjcmVlbi4gV2UgY2FuIHVzZSBAYWN0aW9uIGRlY2xhcmF0aW9uXG4gKiB0byBkZWZpbmUgbmV3IGFjdGlvbiBhbmQgdGhlaXIgYWN0aW9uUmVzdWx0cy4gYWN0aW9uUmVzdWx0cyBpcyBhbiBleHByZXNzaW9uIHRoYXQgaXMgZXhlY3V0ZWRcbiAqIGFuZCBlaXRoZXIgcmVkaXJlY3QgeW91IHRvIGRpZmZlcmVudCBwYWdlIG9yIHNvbWUgbG9naWMgaXMgZXhlY3V0ZWQuXG4gKlxuICogQWN0aW9ucyBjYW4gYmUgb3JnYW5pemVkIGludG8gYWN0aW9uIGNhdGVnb3JpZXMgYnV0IGlmIHdlIGRvIG5vdCBwcm92aWRlIGFueSBhY3Rpb24gY2F0ZWdvcnlcbiAqIGRlZmF1bHQgb25lIGlzIHVzZWQuXG4gKlxuICogVGhpcyB3YXkgd2UgZGVmaW5lIHBsYWNlaG9sZGVyIHVzaW5nIGEgbGF5b3V0IHdoZXJlIGFjdGlvbnMgYXJlIGluc2VydGVkXG4gKlxuICpcbiAqYGBgaHRtbFxuICpcbiAqICAgIGxheW91dD1JbnNwZWN0MiNTdGFjayB7XG4gKiAgICAgICBAbGF5b3V0PU1lbnVUb3AjQWN0aW9uQnV0dG9ucyB7XG4gKiAgICAgICB9XG4gKlxuICogICAgIEBsYXlvdXQ9Rmlyc3QjRm9ybSB7XG4gKiAgICAgfVxuICpcbiAqICAgICBAbGF5b3V0PVNlY29uZCNGb3JtIHsgem9uZVBhdGg6U2Vjb25kOyB9XG4gKiAgfVxuICpcbiAqXG4gKiBgYGBcbiAqXG4gKiBBbmQgdGhpcyBpcyBob3cgd2UgZGVmaW5lIGFjdGlvbnMgZm9yIGN1cnJlbnQgcGFnZS9jbGFzcy9vYmplY3RcbiAqXG4gKiBgYGBcbiAqICAgIEBhY3Rpb249dXBkYXRlICB7XG4gKiAgICAgICAgICAgICBhY3Rpb25SZXN1bHRzOiR7IG9iamVjdC5maXJzdE5hbWUgPSBcIk1yLlwiICsgIG9iamVjdC5maXJzdE5hbWUgfTtcbiAqICAgICAgICAgICAgIHZpc2libGU6ICR7IHByb3BlcnRpZXMuZWRpdGluZyB9O1xuICogICAgfVxuICpcbiAqXG4gKiAgICBAYWN0aW9uPVNhdmUgIHtcbiAqICAgICAgICAgICAgIGxhYmVsOiBcIk15IFNhdmVcIjtcbiAqICAgICAgICAgICAgIGFjdGlvblJlc3VsdHM6JHsgb2JqZWN0LmZpcnN0TmFtZSA9IFwiTXMuXCIgKyAgb2JqZWN0LmZpcnN0TmFtZSB9O1xuICogICAgICAgICAgICAgdmlzaWJsZTogJHsgcHJvcGVydGllcy5lZGl0aW5nIH07XG4gKiAgICAgICAgICAgICBidXR0b25TdHlsZTppbmZvO1xuICogICAgfVxuICogYGBgXG4gKlxuICpcbiAqXG4gKlxuICpcbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZTogYDxzcGFuIFtjbGFzcy51LWZscl09XCJhbGlnblJpZ2h0KClcIj5cbiAgICA8bS1jb250ZXh0ICpuZ0lmPVwicmVuZGVyQXMgPT09ICdidXR0b25zJ1wiPlxuICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwiYWN0aW9uQ2F0ZWdvcmllcygpXCIgbGV0LWNhdGVnb3J5PlxuICAgICAgICAgICAgPG0tY29udGV4dCBbYWN0aW9uQ2F0ZWdvcnldPVwiY2F0ZWdvcnkubmFtZVwiPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJhY3Rpb25zKGNhdGVnb3J5KVwiIGxldC1hY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDxtLWNvbnRleHQgW2FjdGlvbl09XCJhY3Rpb24ubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uQ29udGV4dENoYW5nZWQpPVwib25Db250ZXh0Q2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYWZ0ZXJDb250ZXh0U2V0KT1cIm9uQWZ0ZXJDb250ZXh0U2V0KCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1idXR0b24gKGFjdGlvbik9XCJhY3Rpb25DbGlja2VkKGFjdGlvbi5uYW1lKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZV09XCJzdHlsZShhY3Rpb24ubmFtZSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNBY3Rpb25EaXNhYmxlZChhY3Rpb24ubmFtZSlcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAge3sgbGFiZWwoYWN0aW9uLm5hbWUpIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2F3LWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9tLWNvbnRleHQ+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvbS1jb250ZXh0PlxuXG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9tLWNvbnRleHQ+XG5cbiAgICA8bS1jb250ZXh0ICpuZ0lmPVwicmVuZGVyQXMgPT09ICdsaW5rcydcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIFtuZ0Zvck9mXT1cImFjdGlvbkNhdGVnb3JpZXMoKVwiIGxldC1jYXRlZ29yeT5cbiAgICAgICAgICAgIDxtLWNvbnRleHQgW2FjdGlvbkNhdGVnb3J5XT1cImNhdGVnb3J5Lm5hbWVcIj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwiYWN0aW9ucyhjYXRlZ29yeSlcIiBsZXQtYWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8bS1jb250ZXh0IFthY3Rpb25dPVwiYWN0aW9uLm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbkNvbnRleHRDaGFuZ2VkKT1cIm9uQ29udGV4dENoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFmdGVyQ29udGV4dFNldCk9XCJvbkFmdGVyQ29udGV4dFNldCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YXctYnV0dG9uIChhY3Rpb24pPVwiYWN0aW9uQ2xpY2tlZChhY3Rpb24ubmFtZSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGVdPVwiJ2xpbmsnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImlzQWN0aW9uRGlzYWJsZWQoYWN0aW9uLm5hbWUpXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IGxhYmVsKGFjdGlvbi5uYW1lKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hdy1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvbS1jb250ZXh0PlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L20tY29udGV4dD5cblxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvbS1jb250ZXh0PlxuXG4gICAgPG0tY29udGV4dCAqbmdJZj1cInJlbmRlckFzID09PSAnbWVudSdcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIFtuZ0Zvck9mXT1cImFjdGlvbkNhdGVnb3JpZXMoKVwiIGxldC1jYXRlZ29yeT5cbiAgICAgICAgICAgIDxtLWNvbnRleHQgW2FjdGlvbkNhdGVnb3J5XT1cImNhdGVnb3J5Lm5hbWVcIj5cblxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJhY3Rpb25zKGNhdGVnb3J5KVwiIGxldC1hY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDxtLWNvbnRleHQgW2FjdGlvbl09XCJhY3Rpb24ubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uQ29udGV4dENoYW5nZWQpPVwib25Db250ZXh0Q2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYWZ0ZXJDb250ZXh0U2V0KT1cIm9uQWZ0ZXJDb250ZXh0U2V0KCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9tLWNvbnRleHQ+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvbS1jb250ZXh0PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgIDxwLW1lbnUgI21lbnUgcG9wdXA9XCJwb3B1cFwiIFttb2RlbF09XCJtZW51TW9kZWxcIj48L3AtbWVudT5cblxuICAgICAgICA8IS0tIHRvZG86IGV4dGVuZCBidXR0b24gdG8gc3VwcG9ydCBpY29ucyAtLT5cbiAgICAgICAgPGF3LWJ1dHRvbiAoYWN0aW9uKT1cIm1lbnUudG9nZ2xlKCRldmVudClcIj5cbiAgICAgICAgICAgIEFjdGlvbnNcbiAgICAgICAgPC9hdy1idXR0b24+XG5cbiAgICA8L20tY29udGV4dD5cbjwvc3Bhbj5cblxuXG5cblxuXG5gLFxuICAgIHN0eWxlczogW2AubS1hY3Rpb24tbGlzdHt3aWR0aDoxMDAlfWBdXG59KVxuZXhwb3J0IGNsYXNzIE1ldGFBY3Rpb25MaXN0Q29tcG9uZW50IGV4dGVuZHMgTWV0YUJhc2VDb21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRGVmaW5lcyB0eXBlIG9mIGNvbXBvbmVudHMgdGhhdCByZW5kZXJzIG91ciBhY3Rpb25zLiBXZSBoYXZlIDMgdHlwZXM6XG4gICAgICogQnV0dG9ucywgTGlua3MgYW5kIFBvcHVwIE1lbnVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcmVuZGVyQXM6IHN0cmluZyA9ICdidXR0b25zJztcblxuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBzdHlsZSB1c2VkIGZvciB0aGUgYnV0dG9ucyBpZiBub25lIGlzIHNwZWNpZmllZFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkZWZhdWx0U3R5bGU6IHN0cmluZyA9ICdpbmZvJztcblxuXG4gICAgLyoqXG4gICAgICogVGVsbHMgdXMgaWYgdGhlIGFjdGlvbiBzaG91bGQgYmUgcmVuZGVyZWQgb24gdGhlIGxlZnQgb3IgcmlnaHQgc2lkZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBhbGlnbjogc3RyaW5nID0gJ3JpZ2h0JztcblxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBzcGVjaWFsIGlkZW50aWZpZXIgYW5kIHdoZW4gdXNlZCB3ZSBwdXNoIGV4dHJhIHN0YWNrIHByb3BlcnR5IGluIG9yZGVyIHRvIGdldCBzb21lXG4gICAgICogYWRkaXRpb25hbCBwcm9wZXJ0aWVzIHRoYXQgYXJlIHByaW1hcmlseSByZWxhdGVkIHRvIHR5cGUgb2YgYWN0aW9ucyB0aGF0IGNhbiBiZSB2aXNpYmxlIG9yXG4gICAgICogZW5hYmxlZFxuICAgICAqXG4gICAgICogRS5nLiB3ZSBjYW4gc2F5IHdlIHdhbnQgb25seSBvYmplY3QgSW5zdGFuY2UgYmFzZWQgYnV0dG9uc1xuICAgICAqXG4gICAgICogYGBgXG4gICAgICogIEB0cmFpdD1JbnN0YW5jZUFjdGlvbkJ1dHRvbnMge1xuICAgICAqICAgICAgICAgIHZpc2libGU6dHJ1ZTtcbiAgICAgKiAgICAgICAgICBjb21wb25lbnQ6TWV0YUFjdGlvbkxpc3RDb21wb25lbnQ7XG4gICAgICogICAgICAgICAgYmluZGluZ3M6e1xuICAgICAqICAgICAgICAgICAgICByZW5kZXJBczpidXR0b25zO1xuICAgICAqICAgICAgICAgICAgICBhbGlnbjpyaWdodDtcbiAgICAgKiAgICAgICAgICAgICAgZmlsdGVyQWN0aW9uczppbnN0YW5jZTtcbiAgICAgKiAgICAgICAgICAgfTtcbiAgICAgKiAgICAgICAgICAgZWxlbWVudENsYXNzOlwibC1hY3Rpb24tYnV0dG9uc1wiO1xuICAgICAqICAgICAgfVxuICAgICAqXG4gICAgICogIGBgYFxuICAgICAqXG4gICAgICogV2hlbiB0aGlzIHRyYWl0IGlzIHVzZWQgd2UgcHVzaCBmaWx0ZXJBY3Rpb24gPSBpbnN0YW5jZSBhbmQgaXQgd2lsbCBnaXZlIHVzIGJhY2tcbiAgICAgKlxuICAgICAqICBgYGBcbiAgICAgKiAgZmlsdGVyQWN0aW9ucz1pbnN0YW5jZSB7XG4gICAgICogICAgICAgICAgdmlzaWJsZToke3Byb3BlcnRpZXMuaXNJbnN0YW5jZUFjdGlvbiA9PSB0cnVlfVxuICAgICAqICAgICAgfVxuICAgICAqXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBXaGljaCBjYW4gYmUgdXNlZCB0byBzaG93IG9yIGhpZGUgYnV0dG9uIGlmIGUuZy4gb2JqZWN0IGluc3RhbmNlIGlzIHNlbGVjdGVkIG9yIGF2YWlsYWJsZVxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZmlsdGVyQWN0aW9uczogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBKdXN0IHN0b3JlcyBtYXBwaW5nIGJldHdlZW4gYWN0aW9uIGFuZCBjb250ZXh0IGFuZCBhY3Rpb24gYW5kIEl0ZW1Qcm9wZXJ0aWVzLiBTbyBldmVyeXRpbWVcbiAgICAgKlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfYWN0aW9uc0J5Q2F0ZWdvcnk6IE1hcDxzdHJpbmcsIEl0ZW1Qcm9wZXJ0aWVzW10+O1xuICAgIHByb3RlY3RlZCBfYWN0aW9uc0J5TmFtZTogTWFwPHN0cmluZywgSXRlbVByb3BlcnRpZXM+O1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCAgYWN0aW9uIGdyb3VwcyByZXRyaWV2ZWQgZnJvbSBjdXJyZW50IENvbnRleHRcbiAgICAgKi9cbiAgICBjYXRlZ29yaWVzOiBJdGVtUHJvcGVydGllc1tdO1xuXG4gICAgLyoqXG4gICAgICogV2hlbiBBY3Rpb25NZW51IHRyYWl0IGlzIHVzZWQgdGhpcyBpcyB0aGUgbWVudSBtb2RlbCB0aGF0IGRlZmluZXMgd2hhdCBpdGVtcyBhcmUgYXZhaWxhYmxlXG4gICAgICovXG4gICAgbWVudU1vZGVsOiBNZW51SXRlbUNvbW1hbmRbXTtcblxuICAgIC8qKlxuICAgICAqIE1hcCBsaW5raW5nIHRoZSBuYW1lIG9mIHRoZSBsYXlvdXQgdG8gdGhlIGFjdHVhbCBjb250ZXh0LiBXZSBuZWVkIHRoaXMgd2hlbiB3ZSBuZWVkXG4gICAgICogdG8gYWNjZXNzIGN1cnJlbnQgY29udGVudC5cbiAgICAgKlxuICAgICAqL1xuICAgIF9jb250ZXh0TWFwOiBNYXAgPHN0cmluZywgQ29udGV4dD4gPSBuZXcgTWFwPHN0cmluZywgQ29udGV4dD4oKTtcblxuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9tZXRhQ29udGV4dDogTWV0YUNvbnRleHRDb21wb25lbnQsIHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBfbWV0YUNvbnRleHQpO1xuXG4gICAgfVxuXG5cbiAgICAvLyBwcm90ZWN0ZWQgdXBkYXRlTWV0YSgpOiBhbnlcbiAgICAvLyB7XG4gICAgLy8gICAgIC8vIHRvZG86IHJlcGxhY2UgaXQgd2l0aCBFdmVudEVtbWl0dGVyLlxuICAgIC8vICAgICB0aGlzLl9hY3Rpb25zQnlDYXRlZ29yeSA9IG51bGw7XG4gICAgLy8gICAgIHRoaXMuX2FjdGlvbnNCeU5hbWUgPSBudWxsO1xuICAgIC8vICAgICByZXR1cm4gc3VwZXIudXBkYXRlTWV0YSgpO1xuICAgIC8vIH1cblxuICAgIC8qKlxuICAgICAqIFJlYWQgYW5kIHN0b3JlcyBjdXJyZW50IGFjdGlvbiBjYXRlZ29yaWVzIGF2YWlsYWJsZSB0byBjdXJyZW50IENvbnRleHRcbiAgICAgKlxuICAgICAqL1xuICAgIGFjdGlvbkNhdGVnb3JpZXMoKTogSXRlbVByb3BlcnRpZXNbXVxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fYWN0aW9uc0J5Q2F0ZWdvcnkpIHx8IGlzQmxhbmsodGhpcy5fYWN0aW9uc0J5TmFtZSkpIHtcblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmZpbHRlckFjdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnNldCgnZmlsdGVyQWN0aW9ucycsIHRoaXMuZmlsdGVyQWN0aW9ucyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBtZXRhOiBVSU1ldGEgPSA8VUlNZXRhPiB0aGlzLmNvbnRleHQubWV0YTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5wdXNoKCk7XG5cbiAgICAgICAgICAgIHRoaXMubWVudU1vZGVsID0gW107XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25zQnlDYXRlZ29yeSA9IG5ldyBNYXA8c3RyaW5nLCBJdGVtUHJvcGVydGllc1tdPigpO1xuICAgICAgICAgICAgdGhpcy5fYWN0aW9uc0J5TmFtZSA9IG5ldyBNYXA8c3RyaW5nLCBJdGVtUHJvcGVydGllcz4oKTtcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcyA9IG1ldGEuYWN0aW9uc0J5Q2F0ZWdvcnkodGhpcy5jb250ZXh0LCB0aGlzLl9hY3Rpb25zQnlDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICBVSU1ldGEuQWN0aW9uWm9uZXMpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnBvcCgpO1xuXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25zQnlDYXRlZ29yeS5mb3JFYWNoKCh2OiBJdGVtUHJvcGVydGllc1tdLCBrOiBzdHJpbmcpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdi5mb3JFYWNoKChpdGVtOiBJdGVtUHJvcGVydGllcykgPT4gdGhpcy5fYWN0aW9uc0J5TmFtZS5zZXQoaXRlbS5uYW1lLCBpdGVtKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNhdGVnb3JpZXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEFjdGlvbiBiZWxvbmdpbmcgdG8gY3VycmVudCBjYXRlZ29yeS4uXG4gICAgICpcbiAgICAgKi9cbiAgICBhY3Rpb25zKGNhdGVnb3J5OiBJdGVtUHJvcGVydGllcyk6IEl0ZW1Qcm9wZXJ0aWVzW11cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3Rpb25zQnlDYXRlZ29yeS5nZXQoY2F0ZWdvcnkubmFtZSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gYWN0aW9uIGNsaWNrZWQgdGhpcyBtZXRob2QgZGVsZWdhdGVzIGl0IGludG8gbWV0YSBsYXllciB0byBiZSBleGVjdXRlZC5cbiAgICAgKlxuICAgICAqL1xuICAgIGFjdGlvbkNsaWNrZWQoYWN0aW9uOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMuX2NvbnRleHRNYXAuZ2V0KGFjdGlvbik7XG4gICAgICAgIGxldCBtZXRhOiBVSU1ldGEgPSA8VUlNZXRhPiBjb250ZXh0Lm1ldGE7XG5cbiAgICAgICAgbWV0YS5maXJlQWN0aW9uRnJvbVByb3BzKHRoaXMuX2FjdGlvbnNCeU5hbWUuZ2V0KGFjdGlvbiksIDxVSUNvbnRleHQ+IGNvbnRleHQpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQSBob29rIHVzZWQgdG8gc3RvcmUgdGhlIG1vc3QgY3VycmVudCBjb250ZXh0IGZvciBlYWNoIGFjdGlvbi5cbiAgICAgKlxuICAgICAqL1xuICAgIG9uQWZ0ZXJDb250ZXh0U2V0KGFjdGlvbk5hbWU6IHN0cmluZyk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBhQ29udGV4dCA9IHRoaXMuX21ldGFDb250ZXh0LmFjdGl2ZUNvbnRleHQoKS5zbmFwc2hvdCgpLmh5ZHJhdGUoZmFsc2UpO1xuICAgICAgICB0aGlzLl9jb250ZXh0TWFwLnNldChhY3Rpb25OYW1lLCBhQ29udGV4dCk7XG5cblxuICAgICAgICBpZiAodGhpcy5yZW5kZXJBcyA9PT0gJ21lbnUnKSB7XG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRlTWVudShhY3Rpb25OYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQSBob29rIHVzZWQgdG8gc3RvcmUgdGhlIG1vc3QgY3VycmVudCBjb250ZXh0IGZvciBlYWNoIGFjdGlvbi5cbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ29udGV4dENoYW5nZWQoY2hhbmdlOiBzdHJpbmcpOiB2b2lkXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2hhbmdlZCA9ICcgKyBjaGFuZ2UpO1xuICAgIH1cblxuICAgIGxhYmVsKGFjdGlvbk5hbWU6IHN0cmluZyk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgbGV0IGNvbnRleHQ6IENvbnRleHQgPSB0aGlzLl9jb250ZXh0TWFwLmdldChhY3Rpb25OYW1lKTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmFQcm9wZXJ0aWVzKGNvbnRleHQsIFVJTWV0YS5LZXlMYWJlbCk7XG4gICAgfVxuXG4gICAgaXNBY3Rpb25EaXNhYmxlZChhY3Rpb25OYW1lOiBzdHJpbmcpOiBib29sZWFuXG4gICAge1xuICAgICAgICBsZXQgY29udGV4dDogQ29udGV4dCA9IHRoaXMuX2NvbnRleHRNYXAuZ2V0KGFjdGlvbk5hbWUpO1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KGNvbnRleHQpID8gIWNvbnRleHQuYm9vbGVhblByb3BlcnR5Rm9yS2V5KCdlbmFibGVkJywgZmFsc2UpIDogdHJ1ZTtcbiAgICB9XG5cbiAgICBhbGlnblJpZ2h0KCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsaWduID09PSAncmlnaHQnO1xuICAgIH1cblxuICAgIHN0eWxlKGFjdGlvbk5hbWU6IHN0cmluZyk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgbGV0IGNvbnRleHQ6IENvbnRleHQgPSB0aGlzLl9jb250ZXh0TWFwLmdldChhY3Rpb25OYW1lKTtcbiAgICAgICAgbGV0IHN0eWxlID0gc3VwZXIuYVByb3BlcnRpZXMoY29udGV4dCwgJ2J1dHRvblN0eWxlJyk7XG5cbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudChzdHlsZSkgPyBzdHlsZSA6IHRoaXMuZGVmYXVsdFN0eWxlO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBwb3B1bGF0ZU1lbnUoYWN0aW9uTmFtZTogc3RyaW5nKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGxhYmVsID0gdGhpcy5sYWJlbChhY3Rpb25OYW1lKTtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5tZW51TW9kZWwuZmluZEluZGV4KFxuICAgICAgICAgICAgKGl0ZW06IE1lbnVJdGVtQ29tbWFuZCkgPT4gaXRlbS5hY3Rpb25OYW1lID09PSBhY3Rpb25OYW1lKTtcblxuICAgICAgICBsZXQgaXRlbUNvbW1hbmQ6IE1lbnVJdGVtQ29tbWFuZCA9IHtcbiAgICAgICAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgICAgICAgIGFjdGlvbk5hbWU6IGFjdGlvbk5hbWUsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5pc0FjdGlvbkRpc2FibGVkKGFjdGlvbk5hbWUpLFxuICAgICAgICAgICAgY29tbWFuZDogKGV2ZW50OiBhbnkpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25DbGlja2VkKGV2ZW50Lml0ZW0uYWN0aW9uTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMubWVudU1vZGVsLnB1c2goaXRlbUNvbW1hbmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tZW51TW9kZWxbaW5kZXhdID0gaXRlbUNvbW1hbmQ7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==