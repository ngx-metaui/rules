/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
/** @type {?|undefined} */
MenuItemCommand.prototype.actionName;
/** @type {?|undefined} */
MenuItemCommand.prototype.moduleName;
/** @type {?|undefined} */
MenuItemCommand.prototype.routePath;
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
            /** @type {?} */
            let meta = /** @type {?} */ (this.context.meta);
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
        /** @type {?} */
        let context = this._contextMap.get(action);
        /** @type {?} */
        let meta = /** @type {?} */ (context.meta);
        meta.fireActionFromProps(this._actionsByName.get(action), /** @type {?} */ (context));
    }
    /**
     * A hook used to store the most current context for each action.
     *
     * @param {?} actionName
     * @return {?}
     */
    onAfterContextSet(actionName) {
        /** @type {?} */
        let aContext = this._metaContext.activeContext().snapshot().hydrate(false);
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
        /** @type {?} */
        let context = this._contextMap.get(actionName);
        return super.aProperties(context, UIMeta.KeyLabel);
    }
    /**
     * @param {?} actionName
     * @return {?}
     */
    isActionDisabled(actionName) {
        /** @type {?} */
        let context = this._contextMap.get(actionName);
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
        /** @type {?} */
        let context = this._contextMap.get(actionName);
        /** @type {?} */
        let style = super.aProperties(context, 'buttonStyle');
        return isPresent(style) ? style : this.defaultStyle;
    }
    /**
     * @param {?} actionName
     * @return {?}
     */
    populateMenu(actionName) {
        /** @type {?} */
        let label = this.label(actionName);
        /** @type {?} */
        let index = this.menuModel.findIndex((item) => item.actionName === actionName);
        /** @type {?} */
        let itemCommand = {
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
                template: "<span [class.u-flr]=\"alignRight()\">\n    <m-context *ngIf=\"renderAs === 'buttons'\">\n        <ng-template ngFor [ngForOf]=\"actionCategories()\" let-category>\n            <m-context [actionCategory]=\"category.name\">\n                <ng-template ngFor [ngForOf]=\"actions(category)\" let-action>\n                    <m-context [action]=\"action.name\"\n                               (onContextChanged)=\"onContextChanged($event)\"\n                               (afterContextSet)=\"onAfterContextSet($event)\">\n                        <aw-button (action)=\"actionClicked(action.name)\"\n                                   [style]=\"style(action.name)\"\n                                   [disabled]=\"isActionDisabled(action.name)\">\n\n                        {{ label(action.name) }}\n                        </aw-button>\n                    </m-context>\n                </ng-template>\n            </m-context>\n\n        </ng-template>\n    </m-context>\n\n    <m-context *ngIf=\"renderAs === 'links'\">\n        <ng-template ngFor [ngForOf]=\"actionCategories()\" let-category>\n            <m-context [actionCategory]=\"category.name\">\n                <ng-template ngFor [ngForOf]=\"actions(category)\" let-action>\n                    <m-context [action]=\"action.name\"\n                               (onContextChanged)=\"onContextChanged($event)\"\n                               (afterContextSet)=\"onAfterContextSet($event)\">\n                        <aw-button (action)=\"actionClicked(action.name)\"\n                                   [style]=\"'link'\"\n                                   [disabled]=\"isActionDisabled(action.name)\">\n\n                        {{ label(action.name) }}\n                        </aw-button>\n                    </m-context>\n                </ng-template>\n            </m-context>\n\n        </ng-template>\n    </m-context>\n\n    <m-context *ngIf=\"renderAs === 'menu'\">\n        <ng-template ngFor [ngForOf]=\"actionCategories()\" let-category>\n            <m-context [actionCategory]=\"category.name\">\n\n                <ng-template ngFor [ngForOf]=\"actions(category)\" let-action>\n                    <m-context [action]=\"action.name\"\n                               (onContextChanged)=\"onContextChanged($event)\"\n                               (afterContextSet)=\"onAfterContextSet($event)\">\n                    </m-context>\n                </ng-template>\n            </m-context>\n        </ng-template>\n\n        <p-menu #menu popup=\"popup\" [model]=\"menuModel\"></p-menu>\n\n        <!-- todo: extend button to support icons -->\n        <aw-button (action)=\"menu.toggle($event)\">\n            Actions\n        </aw-button>\n\n    </m-context>\n</span>\n\n\n\n\n\n",
                styles: [".m-action-list{width:100%}"]
            }] }
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
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1hY3Rpb24tbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJsYXlvdXQvbWV0YS1hY3Rpb24tbGlzdC9tZXRhLWFjdGlvbi1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBbUJBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQztBQUNwRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUV6RCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtRXpDLE1BQU0sOEJBQStCLFNBQVEsaUJBQWlCOzs7OztJQTZGMUQsWUFBc0IsWUFBa0MsRUFBUyxHQUFnQjtRQUU3RSxLQUFLLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRlAsaUJBQVksR0FBWixZQUFZLENBQXNCO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBYTs7Ozs7Ozt3QkFuRjlELFNBQVM7Ozs7OzRCQVFMLE1BQU07Ozs7O3FCQVFiLE9BQU87Ozs7OzsyQkFnRWMsSUFBSSxHQUFHLEVBQW1CO0tBTzlEOzs7Ozs7SUFlRCxnQkFBZ0I7UUFFWixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbkUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMs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UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsV0FBVyxDQUFDO1NBQ3ZDOzs7O1lBL09SLFNBQVMsU0FBQztnQkFDUCxxdEZBQThDOzthQUVqRDs7OztZQXJFTyxvQkFBb0I7WUFEcEIsV0FBVzs7O3VCQWdGZCxLQUFLOzJCQVFMLEtBQUs7b0JBUUwsS0FBSzs0QkF1Q0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge01ldGFDb250ZXh0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL21ldGEtY29udGV4dC9tZXRhLWNvbnRleHQuY29tcG9uZW50JztcbmltcG9ydCB7TWV0YUJhc2VDb21wb25lbnR9IGZyb20gJy4uL21ldGEuYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHtDb250ZXh0LCBVSUNvbnRleHR9IGZyb20gJy4uLy4uL2NvcmUvY29udGV4dCc7XG5pbXBvcnQge1VJTWV0YX0gZnJvbSAnLi4vLi4vY29yZS91aW1ldGEnO1xuaW1wb3J0IHtJdGVtUHJvcGVydGllc30gZnJvbSAnLi4vLi4vY29yZS9pdGVtLXByb3BlcnRpZXMnO1xuaW1wb3J0IHtNZW51SXRlbX0gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL2NvbW1vbi9hcGknO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVudUl0ZW1Db21tYW5kIGV4dGVuZHMgTWVudUl0ZW1cbntcbiAgICBhY3Rpb25OYW1lPzogc3RyaW5nO1xuICAgIG1vZHVsZU5hbWU/OiBzdHJpbmc7XG4gICAgcm91dGVQYXRoPzogc3RyaW5nO1xuXG59XG5cbi8qKlxuICogTWV0YUFjdGlvbkxpc3QgcHJvdmlkZXMgYSB3YXkgaG93IHRvIGF0dGFjaCBhY3Rpb25zIHRvIHRoZSBzY3JlZW4uIFdlIGNhbiB1c2UgQGFjdGlvbiBkZWNsYXJhdGlvblxuICogdG8gZGVmaW5lIG5ldyBhY3Rpb24gYW5kIHRoZWlyIGFjdGlvblJlc3VsdHMuIGFjdGlvblJlc3VsdHMgaXMgYW4gZXhwcmVzc2lvbiB0aGF0IGlzIGV4ZWN1dGVkXG4gKiBhbmQgZWl0aGVyIHJlZGlyZWN0IHlvdSB0byBkaWZmZXJlbnQgcGFnZSBvciBzb21lIGxvZ2ljIGlzIGV4ZWN1dGVkLlxuICpcbiAqIEFjdGlvbnMgY2FuIGJlIG9yZ2FuaXplZCBpbnRvIGFjdGlvbiBjYXRlZ29yaWVzIGJ1dCBpZiB3ZSBkbyBub3QgcHJvdmlkZSBhbnkgYWN0aW9uIGNhdGVnb3J5XG4gKiBkZWZhdWx0IG9uZSBpcyB1c2VkLlxuICpcbiAqIFRoaXMgd2F5IHdlIGRlZmluZSBwbGFjZWhvbGRlciB1c2luZyBhIGxheW91dCB3aGVyZSBhY3Rpb25zIGFyZSBpbnNlcnRlZFxuICpcbiAqXG4gKmBgYGh0bWxcbiAqXG4gKiAgICBsYXlvdXQ9SW5zcGVjdDIjU3RhY2sge1xuICogICAgICAgQGxheW91dD1NZW51VG9wI0FjdGlvbkJ1dHRvbnMge1xuICogICAgICAgfVxuICpcbiAqICAgICBAbGF5b3V0PUZpcnN0I0Zvcm0ge1xuICogICAgIH1cbiAqXG4gKiAgICAgQGxheW91dD1TZWNvbmQjRm9ybSB7IHpvbmVQYXRoOlNlY29uZDsgfVxuICogIH1cbiAqXG4gKlxuICogYGBgXG4gKlxuICogQW5kIHRoaXMgaXMgaG93IHdlIGRlZmluZSBhY3Rpb25zIGZvciBjdXJyZW50IHBhZ2UvY2xhc3Mvb2JqZWN0XG4gKlxuICogYGBgXG4gKiAgICBAYWN0aW9uPXVwZGF0ZSAge1xuICogICAgICAgICAgICAgYWN0aW9uUmVzdWx0czokeyBvYmplY3QuZmlyc3ROYW1lID0gXCJNci5cIiArICBvYmplY3QuZmlyc3ROYW1lIH07XG4gKiAgICAgICAgICAgICB2aXNpYmxlOiAkeyBwcm9wZXJ0aWVzLmVkaXRpbmcgfTtcbiAqICAgIH1cbiAqXG4gKlxuICogICAgQGFjdGlvbj1TYXZlICB7XG4gKiAgICAgICAgICAgICBsYWJlbDogXCJNeSBTYXZlXCI7XG4gKiAgICAgICAgICAgICBhY3Rpb25SZXN1bHRzOiR7IG9iamVjdC5maXJzdE5hbWUgPSBcIk1zLlwiICsgIG9iamVjdC5maXJzdE5hbWUgfTtcbiAqICAgICAgICAgICAgIHZpc2libGU6ICR7IHByb3BlcnRpZXMuZWRpdGluZyB9O1xuICogICAgICAgICAgICAgYnV0dG9uU3R5bGU6aW5mbztcbiAqICAgIH1cbiAqIGBgYFxuICpcbiAqXG4gKlxuICpcbiAqXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdtZXRhLWFjdGlvbi1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnbWV0YS1hY3Rpb24tbGlzdC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1ldGFBY3Rpb25MaXN0Q29tcG9uZW50IGV4dGVuZHMgTWV0YUJhc2VDb21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRGVmaW5lcyB0eXBlIG9mIGNvbXBvbmVudHMgdGhhdCByZW5kZXJzIG91ciBhY3Rpb25zLiBXZSBoYXZlIDMgdHlwZXM6XG4gICAgICogQnV0dG9ucywgTGlua3MgYW5kIFBvcHVwIE1lbnVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcmVuZGVyQXM6IHN0cmluZyA9ICdidXR0b25zJztcblxuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBzdHlsZSB1c2VkIGZvciB0aGUgYnV0dG9ucyBpZiBub25lIGlzIHNwZWNpZmllZFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkZWZhdWx0U3R5bGU6IHN0cmluZyA9ICdpbmZvJztcblxuXG4gICAgLyoqXG4gICAgICogVGVsbHMgdXMgaWYgdGhlIGFjdGlvbiBzaG91bGQgYmUgcmVuZGVyZWQgb24gdGhlIGxlZnQgb3IgcmlnaHQgc2lkZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBhbGlnbjogc3RyaW5nID0gJ3JpZ2h0JztcblxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBzcGVjaWFsIGlkZW50aWZpZXIgYW5kIHdoZW4gdXNlZCB3ZSBwdXNoIGV4dHJhIHN0YWNrIHByb3BlcnR5IGluIG9yZGVyIHRvIGdldCBzb21lXG4gICAgICogYWRkaXRpb25hbCBwcm9wZXJ0aWVzIHRoYXQgYXJlIHByaW1hcmlseSByZWxhdGVkIHRvIHR5cGUgb2YgYWN0aW9ucyB0aGF0IGNhbiBiZSB2aXNpYmxlIG9yXG4gICAgICogZW5hYmxlZFxuICAgICAqXG4gICAgICogRS5nLiB3ZSBjYW4gc2F5IHdlIHdhbnQgb25seSBvYmplY3QgSW5zdGFuY2UgYmFzZWQgYnV0dG9uc1xuICAgICAqXG4gICAgICogYGBgXG4gICAgICogIEB0cmFpdD1JbnN0YW5jZUFjdGlvbkJ1dHRvbnMge1xuICAgICAqICAgICAgICAgIHZpc2libGU6dHJ1ZTtcbiAgICAgKiAgICAgICAgICBjb21wb25lbnQ6TWV0YUFjdGlvbkxpc3RDb21wb25lbnQ7XG4gICAgICogICAgICAgICAgYmluZGluZ3M6e1xuICAgICAqICAgICAgICAgICAgICByZW5kZXJBczpidXR0b25zO1xuICAgICAqICAgICAgICAgICAgICBhbGlnbjpyaWdodDtcbiAgICAgKiAgICAgICAgICAgICAgZmlsdGVyQWN0aW9uczppbnN0YW5jZTtcbiAgICAgKiAgICAgICAgICAgfTtcbiAgICAgKiAgICAgICAgICAgZWxlbWVudENsYXNzOlwibC1hY3Rpb24tYnV0dG9uc1wiO1xuICAgICAqICAgICAgfVxuICAgICAqXG4gICAgICogIGBgYFxuICAgICAqXG4gICAgICogV2hlbiB0aGlzIHRyYWl0IGlzIHVzZWQgd2UgcHVzaCBmaWx0ZXJBY3Rpb24gPSBpbnN0YW5jZSBhbmQgaXQgd2lsbCBnaXZlIHVzIGJhY2tcbiAgICAgKlxuICAgICAqICBgYGBcbiAgICAgKiAgZmlsdGVyQWN0aW9ucz1pbnN0YW5jZSB7XG4gICAgICogICAgICAgICAgdmlzaWJsZToke3Byb3BlcnRpZXMuaXNJbnN0YW5jZUFjdGlvbiA9PSB0cnVlfVxuICAgICAqICAgICAgfVxuICAgICAqXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBXaGljaCBjYW4gYmUgdXNlZCB0byBzaG93IG9yIGhpZGUgYnV0dG9uIGlmIGUuZy4gb2JqZWN0IGluc3RhbmNlIGlzIHNlbGVjdGVkIG9yIGF2YWlsYWJsZVxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZmlsdGVyQWN0aW9uczogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBKdXN0IHN0b3JlcyBtYXBwaW5nIGJldHdlZW4gYWN0aW9uIGFuZCBjb250ZXh0IGFuZCBhY3Rpb24gYW5kIEl0ZW1Qcm9wZXJ0aWVzLiBTbyBldmVyeXRpbWVcbiAgICAgKlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfYWN0aW9uc0J5Q2F0ZWdvcnk6IE1hcDxzdHJpbmcsIEl0ZW1Qcm9wZXJ0aWVzW10+O1xuICAgIHByb3RlY3RlZCBfYWN0aW9uc0J5TmFtZTogTWFwPHN0cmluZywgSXRlbVByb3BlcnRpZXM+O1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCAgYWN0aW9uIGdyb3VwcyByZXRyaWV2ZWQgZnJvbSBjdXJyZW50IENvbnRleHRcbiAgICAgKi9cbiAgICBjYXRlZ29yaWVzOiBJdGVtUHJvcGVydGllc1tdO1xuXG4gICAgLyoqXG4gICAgICogV2hlbiBBY3Rpb25NZW51IHRyYWl0IGlzIHVzZWQgdGhpcyBpcyB0aGUgbWVudSBtb2RlbCB0aGF0IGRlZmluZXMgd2hhdCBpdGVtcyBhcmUgYXZhaWxhYmxlXG4gICAgICovXG4gICAgbWVudU1vZGVsOiBNZW51SXRlbUNvbW1hbmRbXTtcblxuICAgIC8qKlxuICAgICAqIE1hcCBsaW5raW5nIHRoZSBuYW1lIG9mIHRoZSBsYXlvdXQgdG8gdGhlIGFjdHVhbCBjb250ZXh0LiBXZSBuZWVkIHRoaXMgd2hlbiB3ZSBuZWVkXG4gICAgICogdG8gYWNjZXNzIGN1cnJlbnQgY29udGVudC5cbiAgICAgKlxuICAgICAqL1xuICAgIF9jb250ZXh0TWFwOiBNYXAgPHN0cmluZywgQ29udGV4dD4gPSBuZXcgTWFwPHN0cmluZywgQ29udGV4dD4oKTtcblxuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9tZXRhQ29udGV4dDogTWV0YUNvbnRleHRDb21wb25lbnQsIHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBfbWV0YUNvbnRleHQpO1xuXG4gICAgfVxuXG5cbiAgICAvLyBwcm90ZWN0ZWQgdXBkYXRlTWV0YSgpOiBhbnlcbiAgICAvLyB7XG4gICAgLy8gICAgIC8vIHRvZG86IHJlcGxhY2UgaXQgd2l0aCBFdmVudEVtbWl0dGVyLlxuICAgIC8vICAgICB0aGlzLl9hY3Rpb25zQnlDYXRlZ29yeSA9IG51bGw7XG4gICAgLy8gICAgIHRoaXMuX2FjdGlvbnNCeU5hbWUgPSBudWxsO1xuICAgIC8vICAgICByZXR1cm4gc3VwZXIudXBkYXRlTWV0YSgpO1xuICAgIC8vIH1cblxuICAgIC8qKlxuICAgICAqIFJlYWQgYW5kIHN0b3JlcyBjdXJyZW50IGFjdGlvbiBjYXRlZ29yaWVzIGF2YWlsYWJsZSB0byBjdXJyZW50IENvbnRleHRcbiAgICAgKlxuICAgICAqL1xuICAgIGFjdGlvbkNhdGVnb3JpZXMoKTogSXRlbVByb3BlcnRpZXNbXVxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fYWN0aW9uc0J5Q2F0ZWdvcnkpIHx8IGlzQmxhbmsodGhpcy5fYWN0aW9uc0J5TmFtZSkpIHtcblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmZpbHRlckFjdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnNldCgnZmlsdGVyQWN0aW9ucycsIHRoaXMuZmlsdGVyQWN0aW9ucyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBtZXRhOiBVSU1ldGEgPSA8VUlNZXRhPiB0aGlzLmNvbnRleHQubWV0YTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5wdXNoKCk7XG5cbiAgICAgICAgICAgIHRoaXMubWVudU1vZGVsID0gW107XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25zQnlDYXRlZ29yeSA9IG5ldyBNYXA8c3RyaW5nLCBJdGVtUHJvcGVydGllc1tdPigpO1xuICAgICAgICAgICAgdGhpcy5fYWN0aW9uc0J5TmFtZSA9IG5ldyBNYXA8c3RyaW5nLCBJdGVtUHJvcGVydGllcz4oKTtcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcyA9IG1ldGEuYWN0aW9uc0J5Q2F0ZWdvcnkodGhpcy5jb250ZXh0LCB0aGlzLl9hY3Rpb25zQnlDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICBVSU1ldGEuQWN0aW9uWm9uZXMpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnBvcCgpO1xuXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25zQnlDYXRlZ29yeS5mb3JFYWNoKCh2OiBJdGVtUHJvcGVydGllc1tdLCBrOiBzdHJpbmcpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdi5mb3JFYWNoKChpdGVtOiBJdGVtUHJvcGVydGllcykgPT4gdGhpcy5fYWN0aW9uc0J5TmFtZS5zZXQoaXRlbS5uYW1lLCBpdGVtKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNhdGVnb3JpZXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEFjdGlvbiBiZWxvbmdpbmcgdG8gY3VycmVudCBjYXRlZ29yeS4uXG4gICAgICpcbiAgICAgKi9cbiAgICBhY3Rpb25zKGNhdGVnb3J5OiBJdGVtUHJvcGVydGllcyk6IEl0ZW1Qcm9wZXJ0aWVzW11cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3Rpb25zQnlDYXRlZ29yeS5nZXQoY2F0ZWdvcnkubmFtZSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gYWN0aW9uIGNsaWNrZWQgdGhpcyBtZXRob2QgZGVsZWdhdGVzIGl0IGludG8gbWV0YSBsYXllciB0byBiZSBleGVjdXRlZC5cbiAgICAgKlxuICAgICAqL1xuICAgIGFjdGlvbkNsaWNrZWQoYWN0aW9uOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMuX2NvbnRleHRNYXAuZ2V0KGFjdGlvbik7XG4gICAgICAgIGxldCBtZXRhOiBVSU1ldGEgPSA8VUlNZXRhPiBjb250ZXh0Lm1ldGE7XG5cbiAgICAgICAgbWV0YS5maXJlQWN0aW9uRnJvbVByb3BzKHRoaXMuX2FjdGlvbnNCeU5hbWUuZ2V0KGFjdGlvbiksIDxVSUNvbnRleHQ+IGNvbnRleHQpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQSBob29rIHVzZWQgdG8gc3RvcmUgdGhlIG1vc3QgY3VycmVudCBjb250ZXh0IGZvciBlYWNoIGFjdGlvbi5cbiAgICAgKlxuICAgICAqL1xuICAgIG9uQWZ0ZXJDb250ZXh0U2V0KGFjdGlvbk5hbWU6IHN0cmluZyk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBhQ29udGV4dCA9IHRoaXMuX21ldGFDb250ZXh0LmFjdGl2ZUNvbnRleHQoKS5zbmFwc2hvdCgpLmh5ZHJhdGUoZmFsc2UpO1xuICAgICAgICB0aGlzLl9jb250ZXh0TWFwLnNldChhY3Rpb25OYW1lLCBhQ29udGV4dCk7XG5cblxuICAgICAgICBpZiAodGhpcy5yZW5kZXJBcyA9PT0gJ21lbnUnKSB7XG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRlTWVudShhY3Rpb25OYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQSBob29rIHVzZWQgdG8gc3RvcmUgdGhlIG1vc3QgY3VycmVudCBjb250ZXh0IGZvciBlYWNoIGFjdGlvbi5cbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ29udGV4dENoYW5nZWQoY2hhbmdlOiBzdHJpbmcpOiB2b2lkXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2hhbmdlZCA9ICcgKyBjaGFuZ2UpO1xuICAgIH1cblxuICAgIGxhYmVsKGFjdGlvbk5hbWU6IHN0cmluZyk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgbGV0IGNvbnRleHQ6IENvbnRleHQgPSB0aGlzLl9jb250ZXh0TWFwLmdldChhY3Rpb25OYW1lKTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmFQcm9wZXJ0aWVzKGNvbnRleHQsIFVJTWV0YS5LZXlMYWJlbCk7XG4gICAgfVxuXG4gICAgaXNBY3Rpb25EaXNhYmxlZChhY3Rpb25OYW1lOiBzdHJpbmcpOiBib29sZWFuXG4gICAge1xuICAgICAgICBsZXQgY29udGV4dDogQ29udGV4dCA9IHRoaXMuX2NvbnRleHRNYXAuZ2V0KGFjdGlvbk5hbWUpO1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KGNvbnRleHQpID8gIWNvbnRleHQuYm9vbGVhblByb3BlcnR5Rm9yS2V5KCdlbmFibGVkJywgZmFsc2UpIDogdHJ1ZTtcbiAgICB9XG5cbiAgICBhbGlnblJpZ2h0KCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsaWduID09PSAncmlnaHQnO1xuICAgIH1cblxuICAgIHN0eWxlKGFjdGlvbk5hbWU6IHN0cmluZyk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgbGV0IGNvbnRleHQ6IENvbnRleHQgPSB0aGlzLl9jb250ZXh0TWFwLmdldChhY3Rpb25OYW1lKTtcbiAgICAgICAgbGV0IHN0eWxlID0gc3VwZXIuYVByb3BlcnRpZXMoY29udGV4dCwgJ2J1dHRvblN0eWxlJyk7XG5cbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudChzdHlsZSkgPyBzdHlsZSA6IHRoaXMuZGVmYXVsdFN0eWxlO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBwb3B1bGF0ZU1lbnUoYWN0aW9uTmFtZTogc3RyaW5nKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGxhYmVsID0gdGhpcy5sYWJlbChhY3Rpb25OYW1lKTtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5tZW51TW9kZWwuZmluZEluZGV4KFxuICAgICAgICAgICAgKGl0ZW06IE1lbnVJdGVtQ29tbWFuZCkgPT4gaXRlbS5hY3Rpb25OYW1lID09PSBhY3Rpb25OYW1lKTtcblxuICAgICAgICBsZXQgaXRlbUNvbW1hbmQ6IE1lbnVJdGVtQ29tbWFuZCA9IHtcbiAgICAgICAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgICAgICAgIGFjdGlvbk5hbWU6IGFjdGlvbk5hbWUsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5pc0FjdGlvbkRpc2FibGVkKGFjdGlvbk5hbWUpLFxuICAgICAgICAgICAgY29tbWFuZDogKGV2ZW50OiBhbnkpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25DbGlja2VkKGV2ZW50Lml0ZW0uYWN0aW9uTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMubWVudU1vZGVsLnB1c2goaXRlbUNvbW1hbmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tZW51TW9kZWxbaW5kZXhdID0gaXRlbUNvbW1hbmQ7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==