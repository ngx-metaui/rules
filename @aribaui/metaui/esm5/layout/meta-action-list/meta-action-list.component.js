/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var MetaActionListComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MetaActionListComponent, _super);
    function MetaActionListComponent(_metaContext, env) {
        var _this = _super.call(this, env, _metaContext) || this;
        _this._metaContext = _metaContext;
        _this.env = env;
        /**
         *
         * Defines type of components that renders our actions. We have 3 types:
         * Buttons, Links and Popup Menu
         *
         */
        _this.renderAs = 'buttons';
        /**
         * Default style used for the buttons if none is specified
         *
         */
        _this.defaultStyle = 'info';
        /**
         * Tells us if the action should be rendered on the left or right side
         *
         */
        _this.align = 'right';
        /**
         * Map linking the name of the layout to the actual context. We need this when we need
         * to access current content.
         *
         */
        _this._contextMap = new Map();
        return _this;
    }
    // protected updateMeta(): any
    // {
    //     // todo: replace it with EventEmmitter.
    //     this._actionsByCategory = null;
    //     this._actionsByName = null;
    //     return super.updateMeta();
    // }
    /**
     * Read and stores current action categories available to current Context
     *
     */
    /**
     * Read and stores current action categories available to current Context
     *
     * @return {?}
     */
    MetaActionListComponent.prototype.actionCategories = /**
     * Read and stores current action categories available to current Context
     *
     * @return {?}
     */
    function () {
        var _this = this;
        if (isBlank(this._actionsByCategory) || isBlank(this._actionsByName)) {
            if (isPresent(this.filterActions)) {
                this.context.set('filterActions', this.filterActions);
            }
            var /** @type {?} */ meta = /** @type {?} */ (this.context.meta);
            this.context.push();
            this.menuModel = [];
            this._actionsByCategory = new Map();
            this._actionsByName = new Map();
            this.categories = meta.actionsByCategory(this.context, this._actionsByCategory, UIMeta.ActionZones);
            this.context.pop();
            this._actionsByCategory.forEach(function (v, k) {
                v.forEach(function (item) { return _this._actionsByName.set(item.name, item); });
            });
        }
        return this.categories;
    };
    /**
     *
     * Action belonging to current category..
     *
     */
    /**
     *
     * Action belonging to current category..
     *
     * @param {?} category
     * @return {?}
     */
    MetaActionListComponent.prototype.actions = /**
     *
     * Action belonging to current category..
     *
     * @param {?} category
     * @return {?}
     */
    function (category) {
        return this._actionsByCategory.get(category.name);
    };
    /**
     *
     * When action clicked this method delegates it into meta layer to be executed.
     *
     */
    /**
     *
     * When action clicked this method delegates it into meta layer to be executed.
     *
     * @param {?} action
     * @return {?}
     */
    MetaActionListComponent.prototype.actionClicked = /**
     *
     * When action clicked this method delegates it into meta layer to be executed.
     *
     * @param {?} action
     * @return {?}
     */
    function (action) {
        var /** @type {?} */ context = this._contextMap.get(action);
        var /** @type {?} */ meta = /** @type {?} */ (context.meta);
        meta.fireActionFromProps(this._actionsByName.get(action), /** @type {?} */ (context));
    };
    /**
     * A hook used to store the most current context for each action.
     *
     */
    /**
     * A hook used to store the most current context for each action.
     *
     * @param {?} actionName
     * @return {?}
     */
    MetaActionListComponent.prototype.onAfterContextSet = /**
     * A hook used to store the most current context for each action.
     *
     * @param {?} actionName
     * @return {?}
     */
    function (actionName) {
        var /** @type {?} */ aContext = this._metaContext.activeContext().snapshot().hydrate(false);
        this._contextMap.set(actionName, aContext);
        if (this.renderAs === 'menu') {
            this.populateMenu(actionName);
        }
    };
    /**
     * A hook used to store the most current context for each action.
     *
     */
    /**
     * A hook used to store the most current context for each action.
     *
     * @param {?} change
     * @return {?}
     */
    MetaActionListComponent.prototype.onContextChanged = /**
     * A hook used to store the most current context for each action.
     *
     * @param {?} change
     * @return {?}
     */
    function (change) {
        console.log('Changed = ' + change);
    };
    /**
     * @param {?} actionName
     * @return {?}
     */
    MetaActionListComponent.prototype.label = /**
     * @param {?} actionName
     * @return {?}
     */
    function (actionName) {
        var /** @type {?} */ context = this._contextMap.get(actionName);
        return _super.prototype.aProperties.call(this, context, UIMeta.KeyLabel);
    };
    /**
     * @param {?} actionName
     * @return {?}
     */
    MetaActionListComponent.prototype.isActionDisabled = /**
     * @param {?} actionName
     * @return {?}
     */
    function (actionName) {
        var /** @type {?} */ context = this._contextMap.get(actionName);
        return isPresent(context) ? !context.booleanPropertyForKey('enabled', false) : true;
    };
    /**
     * @return {?}
     */
    MetaActionListComponent.prototype.alignRight = /**
     * @return {?}
     */
    function () {
        return this.align === 'right';
    };
    /**
     * @param {?} actionName
     * @return {?}
     */
    MetaActionListComponent.prototype.style = /**
     * @param {?} actionName
     * @return {?}
     */
    function (actionName) {
        var /** @type {?} */ context = this._contextMap.get(actionName);
        var /** @type {?} */ style = _super.prototype.aProperties.call(this, context, 'buttonStyle');
        return isPresent(style) ? style : this.defaultStyle;
    };
    /**
     * @param {?} actionName
     * @return {?}
     */
    MetaActionListComponent.prototype.populateMenu = /**
     * @param {?} actionName
     * @return {?}
     */
    function (actionName) {
        var _this = this;
        var /** @type {?} */ label = this.label(actionName);
        var /** @type {?} */ index = this.menuModel.findIndex(function (item) { return item.actionName === actionName; });
        var /** @type {?} */ itemCommand = {
            label: label,
            actionName: actionName,
            disabled: this.isActionDisabled(actionName),
            command: function (event) {
                _this.actionClicked(event.item.actionName);
            }
        };
        if (index === -1) {
            this.menuModel.push(itemCommand);
        }
        else {
            this.menuModel[index] = itemCommand;
        }
    };
    MetaActionListComponent.decorators = [
        { type: Component, args: [{
                    template: "<span [class.u-flr]=\"alignRight()\">\n    <m-context *ngIf=\"renderAs === 'buttons'\">\n        <ng-template ngFor [ngForOf]=\"actionCategories()\" let-category>\n            <m-context [actionCategory]=\"category.name\">\n                <ng-template ngFor [ngForOf]=\"actions(category)\" let-action>\n                    <m-context [action]=\"action.name\"\n                               (onContextChanged)=\"onContextChanged($event)\"\n                               (afterContextSet)=\"onAfterContextSet($event)\">\n                        <aw-button (action)=\"actionClicked(action.name)\"\n                                   [style]=\"style(action.name)\"\n                                   [disabled]=\"isActionDisabled(action.name)\">\n\n                        {{ label(action.name) }}\n                        </aw-button>\n                    </m-context>\n                </ng-template>\n            </m-context>\n\n        </ng-template>\n    </m-context>\n\n    <m-context *ngIf=\"renderAs === 'links'\">\n        <ng-template ngFor [ngForOf]=\"actionCategories()\" let-category>\n            <m-context [actionCategory]=\"category.name\">\n                <ng-template ngFor [ngForOf]=\"actions(category)\" let-action>\n                    <m-context [action]=\"action.name\"\n                               (onContextChanged)=\"onContextChanged($event)\"\n                               (afterContextSet)=\"onAfterContextSet($event)\">\n                        <aw-button (action)=\"actionClicked(action.name)\"\n                                   [style]=\"'link'\"\n                                   [disabled]=\"isActionDisabled(action.name)\">\n\n                        {{ label(action.name) }}\n                        </aw-button>\n                    </m-context>\n                </ng-template>\n            </m-context>\n\n        </ng-template>\n    </m-context>\n\n    <m-context *ngIf=\"renderAs === 'menu'\">\n        <ng-template ngFor [ngForOf]=\"actionCategories()\" let-category>\n            <m-context [actionCategory]=\"category.name\">\n\n                <ng-template ngFor [ngForOf]=\"actions(category)\" let-action>\n                    <m-context [action]=\"action.name\"\n                               (onContextChanged)=\"onContextChanged($event)\"\n                               (afterContextSet)=\"onAfterContextSet($event)\">\n                    </m-context>\n                </ng-template>\n            </m-context>\n        </ng-template>\n\n        <p-menu #menu popup=\"popup\" [model]=\"menuModel\"></p-menu>\n\n        <!-- todo: extend button to support icons -->\n        <aw-button (action)=\"menu.toggle($event)\">\n            Actions\n        </aw-button>\n\n    </m-context>\n</span>\n\n\n\n\n\n",
                    styles: [".m-action-list{width:100%}"]
                },] },
    ];
    /** @nocollapse */
    MetaActionListComponent.ctorParameters = function () { return [
        { type: MetaContextComponent },
        { type: Environment }
    ]; };
    MetaActionListComponent.propDecorators = {
        renderAs: [{ type: Input }],
        defaultStyle: [{ type: Input }],
        align: [{ type: Input }],
        filterActions: [{ type: Input }]
    };
    return MetaActionListComponent;
}(MetaBaseComponent));
export { MetaActionListComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1hY3Rpb24tbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJsYXlvdXQvbWV0YS1hY3Rpb24tbGlzdC9tZXRhLWFjdGlvbi1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW1CQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sZ0RBQWdELENBQUM7QUFDcEYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFekQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBdUlJLG1EQUFpQjtJQTZGMUQsaUNBQXNCLFlBQWtDLEVBQVMsR0FBZ0I7UUFBakYsWUFFSSxrQkFBTSxHQUFHLEVBQUUsWUFBWSxDQUFDLFNBRTNCO1FBSnFCLGtCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUFTLFNBQUcsR0FBSCxHQUFHLENBQWE7Ozs7Ozs7eUJBbkY5RCxTQUFTOzs7Ozs2QkFRTCxNQUFNOzs7OztzQkFRYixPQUFPOzs7Ozs7NEJBZ0VjLElBQUksR0FBRyxFQUFtQjs7S0FPOUQ7SUFHRCw4QkFBOEI7SUFDOUIsSUFBSTtJQUNKLDhDQUE4QztJQUM5QyxzQ0FBc0M7SUFDdEMsa0NBQWtDO0lBQ2xDLGlDQUFpQztJQUNqQyxJQUFJO0lBRUo7OztPQUdHOzs7Ozs7SUFDSCxrREFBZ0I7Ozs7O0lBQWhCO1FBQUEsaUJBeUJDO1FBdkJHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtC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Q0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUM7WUFDM0MsT0FBTyxFQUFFLFVBQUMsS0FBVTtnQkFFaEIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzdDO1NBQ0osQ0FBQztRQUNGLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNwQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxXQUFXLENBQUM7U0FDdkM7OztnQkFuVFIsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSwyc0ZBb0ViO29CQUNHLE1BQU0sRUFBRSxDQUFDLDRCQUE0QixDQUFDO2lCQUN6Qzs7OztnQkF6SU8sb0JBQW9CO2dCQURwQixXQUFXOzs7MkJBb0pkLEtBQUs7K0JBUUwsS0FBSzt3QkFRTCxLQUFLO2dDQXVDTCxLQUFLOztrQ0EvTlY7RUErSjZDLGlCQUFpQjtTQUFqRCx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBCYXNlZCBvbiBvcmlnaW5hbCB3b3JrOiBNZXRhVUk6IENyYWlnIEZlZGVyaWdoaSAoMjAwOClcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtNZXRhQ29udGV4dENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9tZXRhLWNvbnRleHQvbWV0YS1jb250ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQge01ldGFCYXNlQ29tcG9uZW50fSBmcm9tICcuLi9tZXRhLmJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7Q29udGV4dCwgVUlDb250ZXh0fSBmcm9tICcuLi8uLi9jb3JlL2NvbnRleHQnO1xuaW1wb3J0IHtVSU1ldGF9IGZyb20gJy4uLy4uL2NvcmUvdWltZXRhJztcbmltcG9ydCB7SXRlbVByb3BlcnRpZXN9IGZyb20gJy4uLy4uL2NvcmUvaXRlbS1wcm9wZXJ0aWVzJztcbmltcG9ydCB7TWVudUl0ZW19IGZyb20gJ3ByaW1lbmcvY29tcG9uZW50cy9jb21tb24vYXBpJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIE1lbnVJdGVtQ29tbWFuZCBleHRlbmRzIE1lbnVJdGVtXG57XG4gICAgYWN0aW9uTmFtZT86IHN0cmluZztcbiAgICBtb2R1bGVOYW1lPzogc3RyaW5nO1xuICAgIHJvdXRlUGF0aD86IHN0cmluZztcblxufVxuXG4vKipcbiAqIE1ldGFBY3Rpb25MaXN0IHByb3ZpZGVzIGEgd2F5IGhvdyB0byBhdHRhY2ggYWN0aW9ucyB0byB0aGUgc2NyZWVuLiBXZSBjYW4gdXNlIEBhY3Rpb24gZGVjbGFyYXRpb25cbiAqIHRvIGRlZmluZSBuZXcgYWN0aW9uIGFuZCB0aGVpciBhY3Rpb25SZXN1bHRzLiBhY3Rpb25SZXN1bHRzIGlzIGFuIGV4cHJlc3Npb24gdGhhdCBpcyBleGVjdXRlZFxuICogYW5kIGVpdGhlciByZWRpcmVjdCB5b3UgdG8gZGlmZmVyZW50IHBhZ2Ugb3Igc29tZSBsb2dpYyBpcyBleGVjdXRlZC5cbiAqXG4gKiBBY3Rpb25zIGNhbiBiZSBvcmdhbml6ZWQgaW50byBhY3Rpb24gY2F0ZWdvcmllcyBidXQgaWYgd2UgZG8gbm90IHByb3ZpZGUgYW55IGFjdGlvbiBjYXRlZ29yeVxuICogZGVmYXVsdCBvbmUgaXMgdXNlZC5cbiAqXG4gKiBUaGlzIHdheSB3ZSBkZWZpbmUgcGxhY2Vob2xkZXIgdXNpbmcgYSBsYXlvdXQgd2hlcmUgYWN0aW9ucyBhcmUgaW5zZXJ0ZWRcbiAqXG4gKlxuICpgYGBodG1sXG4gKlxuICogICAgbGF5b3V0PUluc3BlY3QyI1N0YWNrIHtcbiAqICAgICAgIEBsYXlvdXQ9TWVudVRvcCNBY3Rpb25CdXR0b25zIHtcbiAqICAgICAgIH1cbiAqXG4gKiAgICAgQGxheW91dD1GaXJzdCNGb3JtIHtcbiAqICAgICB9XG4gKlxuICogICAgIEBsYXlvdXQ9U2Vjb25kI0Zvcm0geyB6b25lUGF0aDpTZWNvbmQ7IH1cbiAqICB9XG4gKlxuICpcbiAqIGBgYFxuICpcbiAqIEFuZCB0aGlzIGlzIGhvdyB3ZSBkZWZpbmUgYWN0aW9ucyBmb3IgY3VycmVudCBwYWdlL2NsYXNzL29iamVjdFxuICpcbiAqIGBgYFxuICogICAgQGFjdGlvbj11cGRhdGUgIHtcbiAqICAgICAgICAgICAgIGFjdGlvblJlc3VsdHM6JHsgb2JqZWN0LmZpcnN0TmFtZSA9IFwiTXIuXCIgKyAgb2JqZWN0LmZpcnN0TmFtZSB9O1xuICogICAgICAgICAgICAgdmlzaWJsZTogJHsgcHJvcGVydGllcy5lZGl0aW5nIH07XG4gKiAgICB9XG4gKlxuICpcbiAqICAgIEBhY3Rpb249U2F2ZSAge1xuICogICAgICAgICAgICAgbGFiZWw6IFwiTXkgU2F2ZVwiO1xuICogICAgICAgICAgICAgYWN0aW9uUmVzdWx0czokeyBvYmplY3QuZmlyc3ROYW1lID0gXCJNcy5cIiArICBvYmplY3QuZmlyc3ROYW1lIH07XG4gKiAgICAgICAgICAgICB2aXNpYmxlOiAkeyBwcm9wZXJ0aWVzLmVkaXRpbmcgfTtcbiAqICAgICAgICAgICAgIGJ1dHRvblN0eWxlOmluZm87XG4gKiAgICB9XG4gKiBgYGBcbiAqXG4gKlxuICpcbiAqXG4gKlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlOiBgPHNwYW4gW2NsYXNzLnUtZmxyXT1cImFsaWduUmlnaHQoKVwiPlxuICAgIDxtLWNvbnRleHQgKm5nSWY9XCJyZW5kZXJBcyA9PT0gJ2J1dHRvbnMnXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJhY3Rpb25DYXRlZ29yaWVzKClcIiBsZXQtY2F0ZWdvcnk+XG4gICAgICAgICAgICA8bS1jb250ZXh0IFthY3Rpb25DYXRlZ29yeV09XCJjYXRlZ29yeS5uYW1lXCI+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIFtuZ0Zvck9mXT1cImFjdGlvbnMoY2F0ZWdvcnkpXCIgbGV0LWFjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG0tY29udGV4dCBbYWN0aW9uXT1cImFjdGlvbi5uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25Db250ZXh0Q2hhbmdlZCk9XCJvbkNvbnRleHRDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhZnRlckNvbnRleHRTZXQpPVwib25BZnRlckNvbnRleHRTZXQoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGF3LWJ1dHRvbiAoYWN0aW9uKT1cImFjdGlvbkNsaWNrZWQoYWN0aW9uLm5hbWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlXT1cInN0eWxlKGFjdGlvbi5uYW1lKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJpc0FjdGlvbkRpc2FibGVkKGFjdGlvbi5uYW1lKVwiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBsYWJlbChhY3Rpb24ubmFtZSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYXctYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L20tY29udGV4dD5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9tLWNvbnRleHQ+XG5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L20tY29udGV4dD5cblxuICAgIDxtLWNvbnRleHQgKm5nSWY9XCJyZW5kZXJBcyA9PT0gJ2xpbmtzJ1wiPlxuICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwiYWN0aW9uQ2F0ZWdvcmllcygpXCIgbGV0LWNhdGVnb3J5PlxuICAgICAgICAgICAgPG0tY29udGV4dCBbYWN0aW9uQ2F0ZWdvcnldPVwiY2F0ZWdvcnkubmFtZVwiPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJhY3Rpb25zKGNhdGVnb3J5KVwiIGxldC1hY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDxtLWNvbnRleHQgW2FjdGlvbl09XCJhY3Rpb24ubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uQ29udGV4dENoYW5nZWQpPVwib25Db250ZXh0Q2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYWZ0ZXJDb250ZXh0U2V0KT1cIm9uQWZ0ZXJDb250ZXh0U2V0KCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1idXR0b24gKGFjdGlvbik9XCJhY3Rpb25DbGlja2VkKGFjdGlvbi5uYW1lKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZV09XCInbGluaydcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNBY3Rpb25EaXNhYmxlZChhY3Rpb24ubmFtZSlcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAge3sgbGFiZWwoYWN0aW9uLm5hbWUpIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2F3LWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9tLWNvbnRleHQ+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvbS1jb250ZXh0PlxuXG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9tLWNvbnRleHQ+XG5cbiAgICA8bS1jb250ZXh0ICpuZ0lmPVwicmVuZGVyQXMgPT09ICdtZW51J1wiPlxuICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwiYWN0aW9uQ2F0ZWdvcmllcygpXCIgbGV0LWNhdGVnb3J5PlxuICAgICAgICAgICAgPG0tY29udGV4dCBbYWN0aW9uQ2F0ZWdvcnldPVwiY2F0ZWdvcnkubmFtZVwiPlxuXG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIFtuZ0Zvck9mXT1cImFjdGlvbnMoY2F0ZWdvcnkpXCIgbGV0LWFjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG0tY29udGV4dCBbYWN0aW9uXT1cImFjdGlvbi5uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25Db250ZXh0Q2hhbmdlZCk9XCJvbkNvbnRleHRDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhZnRlckNvbnRleHRTZXQpPVwib25BZnRlckNvbnRleHRTZXQoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICA8L20tY29udGV4dD5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9tLWNvbnRleHQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgPHAtbWVudSAjbWVudSBwb3B1cD1cInBvcHVwXCIgW21vZGVsXT1cIm1lbnVNb2RlbFwiPjwvcC1tZW51PlxuXG4gICAgICAgIDwhLS0gdG9kbzogZXh0ZW5kIGJ1dHRvbiB0byBzdXBwb3J0IGljb25zIC0tPlxuICAgICAgICA8YXctYnV0dG9uIChhY3Rpb24pPVwibWVudS50b2dnbGUoJGV2ZW50KVwiPlxuICAgICAgICAgICAgQWN0aW9uc1xuICAgICAgICA8L2F3LWJ1dHRvbj5cblxuICAgIDwvbS1jb250ZXh0PlxuPC9zcGFuPlxuXG5cblxuXG5cbmAsXG4gICAgc3R5bGVzOiBbYC5tLWFjdGlvbi1saXN0e3dpZHRoOjEwMCV9YF1cbn0pXG5leHBvcnQgY2xhc3MgTWV0YUFjdGlvbkxpc3RDb21wb25lbnQgZXh0ZW5kcyBNZXRhQmFzZUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBEZWZpbmVzIHR5cGUgb2YgY29tcG9uZW50cyB0aGF0IHJlbmRlcnMgb3VyIGFjdGlvbnMuIFdlIGhhdmUgMyB0eXBlczpcbiAgICAgKiBCdXR0b25zLCBMaW5rcyBhbmQgUG9wdXAgTWVudVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICByZW5kZXJBczogc3RyaW5nID0gJ2J1dHRvbnMnO1xuXG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHN0eWxlIHVzZWQgZm9yIHRoZSBidXR0b25zIGlmIG5vbmUgaXMgc3BlY2lmaWVkXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRlZmF1bHRTdHlsZTogc3RyaW5nID0gJ2luZm8nO1xuXG5cbiAgICAvKipcbiAgICAgKiBUZWxscyB1cyBpZiB0aGUgYWN0aW9uIHNob3VsZCBiZSByZW5kZXJlZCBvbiB0aGUgbGVmdCBvciByaWdodCBzaWRlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGFsaWduOiBzdHJpbmcgPSAncmlnaHQnO1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHNwZWNpYWwgaWRlbnRpZmllciBhbmQgd2hlbiB1c2VkIHdlIHB1c2ggZXh0cmEgc3RhY2sgcHJvcGVydHkgaW4gb3JkZXIgdG8gZ2V0IHNvbWVcbiAgICAgKiBhZGRpdGlvbmFsIHByb3BlcnRpZXMgdGhhdCBhcmUgcHJpbWFyaWx5IHJlbGF0ZWQgdG8gdHlwZSBvZiBhY3Rpb25zIHRoYXQgY2FuIGJlIHZpc2libGUgb3JcbiAgICAgKiBlbmFibGVkXG4gICAgICpcbiAgICAgKiBFLmcuIHdlIGNhbiBzYXkgd2Ugd2FudCBvbmx5IG9iamVjdCBJbnN0YW5jZSBiYXNlZCBidXR0b25zXG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiAgQHRyYWl0PUluc3RhbmNlQWN0aW9uQnV0dG9ucyB7XG4gICAgICogICAgICAgICAgdmlzaWJsZTp0cnVlO1xuICAgICAqICAgICAgICAgIGNvbXBvbmVudDpNZXRhQWN0aW9uTGlzdENvbXBvbmVudDtcbiAgICAgKiAgICAgICAgICBiaW5kaW5nczp7XG4gICAgICogICAgICAgICAgICAgIHJlbmRlckFzOmJ1dHRvbnM7XG4gICAgICogICAgICAgICAgICAgIGFsaWduOnJpZ2h0O1xuICAgICAqICAgICAgICAgICAgICBmaWx0ZXJBY3Rpb25zOmluc3RhbmNlO1xuICAgICAqICAgICAgICAgICB9O1xuICAgICAqICAgICAgICAgICBlbGVtZW50Q2xhc3M6XCJsLWFjdGlvbi1idXR0b25zXCI7XG4gICAgICogICAgICB9XG4gICAgICpcbiAgICAgKiAgYGBgXG4gICAgICpcbiAgICAgKiBXaGVuIHRoaXMgdHJhaXQgaXMgdXNlZCB3ZSBwdXNoIGZpbHRlckFjdGlvbiA9IGluc3RhbmNlIGFuZCBpdCB3aWxsIGdpdmUgdXMgYmFja1xuICAgICAqXG4gICAgICogIGBgYFxuICAgICAqICBmaWx0ZXJBY3Rpb25zPWluc3RhbmNlIHtcbiAgICAgKiAgICAgICAgICB2aXNpYmxlOiR7cHJvcGVydGllcy5pc0luc3RhbmNlQWN0aW9uID09IHRydWV9XG4gICAgICogICAgICB9XG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIFdoaWNoIGNhbiBiZSB1c2VkIHRvIHNob3cgb3IgaGlkZSBidXR0b24gaWYgZS5nLiBvYmplY3QgaW5zdGFuY2UgaXMgc2VsZWN0ZWQgb3IgYXZhaWxhYmxlXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBmaWx0ZXJBY3Rpb25zOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIEp1c3Qgc3RvcmVzIG1hcHBpbmcgYmV0d2VlbiBhY3Rpb24gYW5kIGNvbnRleHQgYW5kIGFjdGlvbiBhbmQgSXRlbVByb3BlcnRpZXMuIFNvIGV2ZXJ5dGltZVxuICAgICAqXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9hY3Rpb25zQnlDYXRlZ29yeTogTWFwPHN0cmluZywgSXRlbVByb3BlcnRpZXNbXT47XG4gICAgcHJvdGVjdGVkIF9hY3Rpb25zQnlOYW1lOiBNYXA8c3RyaW5nLCBJdGVtUHJvcGVydGllcz47XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50ICBhY3Rpb24gZ3JvdXBzIHJldHJpZXZlZCBmcm9tIGN1cnJlbnQgQ29udGV4dFxuICAgICAqL1xuICAgIGNhdGVnb3JpZXM6IEl0ZW1Qcm9wZXJ0aWVzW107XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIEFjdGlvbk1lbnUgdHJhaXQgaXMgdXNlZCB0aGlzIGlzIHRoZSBtZW51IG1vZGVsIHRoYXQgZGVmaW5lcyB3aGF0IGl0ZW1zIGFyZSBhdmFpbGFibGVcbiAgICAgKi9cbiAgICBtZW51TW9kZWw6IE1lbnVJdGVtQ29tbWFuZFtdO1xuXG4gICAgLyoqXG4gICAgICogTWFwIGxpbmtpbmcgdGhlIG5hbWUgb2YgdGhlIGxheW91dCB0byB0aGUgYWN0dWFsIGNvbnRleHQuIFdlIG5lZWQgdGhpcyB3aGVuIHdlIG5lZWRcbiAgICAgKiB0byBhY2Nlc3MgY3VycmVudCBjb250ZW50LlxuICAgICAqXG4gICAgICovXG4gICAgX2NvbnRleHRNYXA6IE1hcCA8c3RyaW5nLCBDb250ZXh0PiA9IG5ldyBNYXA8c3RyaW5nLCBDb250ZXh0PigpO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX21ldGFDb250ZXh0OiBNZXRhQ29udGV4dENvbXBvbmVudCwgcHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIF9tZXRhQ29udGV4dCk7XG5cbiAgICB9XG5cblxuICAgIC8vIHByb3RlY3RlZCB1cGRhdGVNZXRhKCk6IGFueVxuICAgIC8vIHtcbiAgICAvLyAgICAgLy8gdG9kbzogcmVwbGFjZSBpdCB3aXRoIEV2ZW50RW1taXR0ZXIuXG4gICAgLy8gICAgIHRoaXMuX2FjdGlvbnNCeUNhdGVnb3J5ID0gbnVsbDtcbiAgICAvLyAgICAgdGhpcy5fYWN0aW9uc0J5TmFtZSA9IG51bGw7XG4gICAgLy8gICAgIHJldHVybiBzdXBlci51cGRhdGVNZXRhKCk7XG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICogUmVhZCBhbmQgc3RvcmVzIGN1cnJlbnQgYWN0aW9uIGNhdGVnb3JpZXMgYXZhaWxhYmxlIHRvIGN1cnJlbnQgQ29udGV4dFxuICAgICAqXG4gICAgICovXG4gICAgYWN0aW9uQ2F0ZWdvcmllcygpOiBJdGVtUHJvcGVydGllc1tdXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9hY3Rpb25zQnlDYXRlZ29yeSkgfHwgaXNCbGFuayh0aGlzLl9hY3Rpb25zQnlOYW1lKSkge1xuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZmlsdGVyQWN0aW9ucykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuc2V0KCdmaWx0ZXJBY3Rpb25zJywgdGhpcy5maWx0ZXJBY3Rpb25zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG1ldGE6IFVJTWV0YSA9IDxVSU1ldGE+IHRoaXMuY29udGV4dC5tZXRhO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnB1c2goKTtcblxuICAgICAgICAgICAgdGhpcy5tZW51TW9kZWwgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbnNCeUNhdGVnb3J5ID0gbmV3IE1hcDxzdHJpbmcsIEl0ZW1Qcm9wZXJ0aWVzW10+KCk7XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25zQnlOYW1lID0gbmV3IE1hcDxzdHJpbmcsIEl0ZW1Qcm9wZXJ0aWVzPigpO1xuICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzID0gbWV0YS5hY3Rpb25zQnlDYXRlZ29yeSh0aGlzLmNvbnRleHQsIHRoaXMuX2FjdGlvbnNCeUNhdGVnb3J5LFxuICAgICAgICAgICAgICAgIFVJTWV0YS5BY3Rpb25ab25lcyk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucG9wKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbnNCeUNhdGVnb3J5LmZvckVhY2goKHY6IEl0ZW1Qcm9wZXJ0aWVzW10sIGs6IHN0cmluZykgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2LmZvckVhY2goKGl0ZW06IEl0ZW1Qcm9wZXJ0aWVzKSA9PiB0aGlzLl9hY3Rpb25zQnlOYW1lLnNldChpdGVtLm5hbWUsIGl0ZW0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2F0ZWdvcmllcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQWN0aW9uIGJlbG9uZ2luZyB0byBjdXJyZW50IGNhdGVnb3J5Li5cbiAgICAgKlxuICAgICAqL1xuICAgIGFjdGlvbnMoY2F0ZWdvcnk6IEl0ZW1Qcm9wZXJ0aWVzKTogSXRlbVByb3BlcnRpZXNbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGlvbnNCeUNhdGVnb3J5LmdldChjYXRlZ29yeS5uYW1lKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiBhY3Rpb24gY2xpY2tlZCB0aGlzIG1ldGhvZCBkZWxlZ2F0ZXMgaXQgaW50byBtZXRhIGxheWVyIHRvIGJlIGV4ZWN1dGVkLlxuICAgICAqXG4gICAgICovXG4gICAgYWN0aW9uQ2xpY2tlZChhY3Rpb246IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5fY29udGV4dE1hcC5nZXQoYWN0aW9uKTtcbiAgICAgICAgbGV0IG1ldGE6IFVJTWV0YSA9IDxVSU1ldGE+IGNvbnRleHQubWV0YTtcblxuICAgICAgICBtZXRhLmZpcmVBY3Rpb25Gcm9tUHJvcHModGhpcy5fYWN0aW9uc0J5TmFtZS5nZXQoYWN0aW9uKSwgPFVJQ29udGV4dD4gY29udGV4dCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBIGhvb2sgdXNlZCB0byBzdG9yZSB0aGUgbW9zdCBjdXJyZW50IGNvbnRleHQgZm9yIGVhY2ggYWN0aW9uLlxuICAgICAqXG4gICAgICovXG4gICAgb25BZnRlckNvbnRleHRTZXQoYWN0aW9uTmFtZTogc3RyaW5nKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGFDb250ZXh0ID0gdGhpcy5fbWV0YUNvbnRleHQuYWN0aXZlQ29udGV4dCgpLnNuYXBzaG90KCkuaHlkcmF0ZShmYWxzZSk7XG4gICAgICAgIHRoaXMuX2NvbnRleHRNYXAuc2V0KGFjdGlvbk5hbWUsIGFDb250ZXh0KTtcblxuXG4gICAgICAgIGlmICh0aGlzLnJlbmRlckFzID09PSAnbWVudScpIHtcbiAgICAgICAgICAgIHRoaXMucG9wdWxhdGVNZW51KGFjdGlvbk5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBIGhvb2sgdXNlZCB0byBzdG9yZSB0aGUgbW9zdCBjdXJyZW50IGNvbnRleHQgZm9yIGVhY2ggYWN0aW9uLlxuICAgICAqXG4gICAgICovXG4gICAgb25Db250ZXh0Q2hhbmdlZChjaGFuZ2U6IHN0cmluZyk6IHZvaWRcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDaGFuZ2VkID0gJyArIGNoYW5nZSk7XG4gICAgfVxuXG4gICAgbGFiZWwoYWN0aW9uTmFtZTogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICBsZXQgY29udGV4dDogQ29udGV4dCA9IHRoaXMuX2NvbnRleHRNYXAuZ2V0KGFjdGlvbk5hbWUpO1xuICAgICAgICByZXR1cm4gc3VwZXIuYVByb3BlcnRpZXMoY29udGV4dCwgVUlNZXRhLktleUxhYmVsKTtcbiAgICB9XG5cbiAgICBpc0FjdGlvbkRpc2FibGVkKGFjdGlvbk5hbWU6IHN0cmluZyk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGxldCBjb250ZXh0OiBDb250ZXh0ID0gdGhpcy5fY29udGV4dE1hcC5nZXQoYWN0aW9uTmFtZSk7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQoY29udGV4dCkgPyAhY29udGV4dC5ib29sZWFuUHJvcGVydHlGb3JLZXkoJ2VuYWJsZWQnLCBmYWxzZSkgOiB0cnVlO1xuICAgIH1cblxuICAgIGFsaWduUmlnaHQoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxpZ24gPT09ICdyaWdodCc7XG4gICAgfVxuXG4gICAgc3R5bGUoYWN0aW9uTmFtZTogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICBsZXQgY29udGV4dDogQ29udGV4dCA9IHRoaXMuX2NvbnRleHRNYXAuZ2V0KGFjdGlvbk5hbWUpO1xuICAgICAgICBsZXQgc3R5bGUgPSBzdXBlci5hUHJvcGVydGllcyhjb250ZXh0LCAnYnV0dG9uU3R5bGUnKTtcblxuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHN0eWxlKSA/IHN0eWxlIDogdGhpcy5kZWZhdWx0U3R5bGU7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHBvcHVsYXRlTWVudShhY3Rpb25OYW1lOiBzdHJpbmcpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgbGFiZWwgPSB0aGlzLmxhYmVsKGFjdGlvbk5hbWUpO1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLm1lbnVNb2RlbC5maW5kSW5kZXgoXG4gICAgICAgICAgICAoaXRlbTogTWVudUl0ZW1Db21tYW5kKSA9PiBpdGVtLmFjdGlvbk5hbWUgPT09IGFjdGlvbk5hbWUpO1xuXG4gICAgICAgIGxldCBpdGVtQ29tbWFuZDogTWVudUl0ZW1Db21tYW5kID0ge1xuICAgICAgICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgICAgICAgYWN0aW9uTmFtZTogYWN0aW9uTmFtZSxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmlzQWN0aW9uRGlzYWJsZWQoYWN0aW9uTmFtZSksXG4gICAgICAgICAgICBjb21tYW5kOiAoZXZlbnQ6IGFueSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbkNsaWNrZWQoZXZlbnQuaXRlbS5hY3Rpb25OYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5tZW51TW9kZWwucHVzaChpdGVtQ29tbWFuZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1lbnVNb2RlbFtpbmRleF0gPSBpdGVtQ29tbWFuZDtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19