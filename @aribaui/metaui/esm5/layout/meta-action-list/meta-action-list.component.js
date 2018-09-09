/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
            /** @type {?} */
            var meta = /** @type {?} */ (this.context.meta);
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
        /** @type {?} */
        var context = this._contextMap.get(action);
        /** @type {?} */
        var meta = /** @type {?} */ (context.meta);
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
        /** @type {?} */
        var aContext = this._metaContext.activeContext().snapshot().hydrate(false);
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
        /** @type {?} */
        var context = this._contextMap.get(actionName);
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
        /** @type {?} */
        var context = this._contextMap.get(actionName);
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
        /** @type {?} */
        var context = this._contextMap.get(actionName);
        /** @type {?} */
        var style = _super.prototype.aProperties.call(this, context, 'buttonStyle');
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
        /** @type {?} */
        var label = this.label(actionName);
        /** @type {?} */
        var index = this.menuModel.findIndex(function (item) { return item.actionName === actionName; });
        /** @type {?} */
        var itemCommand = {
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
                }] }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1hY3Rpb24tbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJsYXlvdXQvbWV0YS1hY3Rpb24tbGlzdC9tZXRhLWFjdGlvbi1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW1CQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sZ0RBQWdELENBQUM7QUFDcEYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFekQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW1FSSxtREFBaUI7SUE2RjFELGlDQUFzQixZQUFrQyxFQUFTLEdBQWdCO1FBQWpGLFlBRUksa0JBQU0sR0FBRyxFQUFFLFlBQVksQ0FBQyxTQUUzQjtRQUpxQixrQkFBWSxHQUFaLFlBQVksQ0FBc0I7UUFBUyxTQUFHLEdBQUgsR0FBRyxDQUFhOzs7Ozs7O3lCQW5GOUQsU0FBUzs7Ozs7NkJBUUwsTUFBTTs7Ozs7c0JBUWIsT0FBTzs7Ozs7OzRCQWdFYyxJQUFJLEdBQUcsRUFBbUI7O0tBTzlEO0lBR0QsOEJBQThCO0lBQzlCLElBQUk7SUFDSiw4Q0FBOEM7SUFDOUMsc0NBQXNDO0lBQ3RDLGtDQUFrQztJQUNsQyxpQ0FBaUM7SUFDakMsSUFBSTtJQUVKOzs7T0FHRzs7Ozs7O0lBQ0gsa0RBQWdCOzs7OztJQUFoQjtRQUFBLGlCQXlCQztRQXZCRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixD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Q0FBQyxVQUFVLENBQUM7WUFDM0MsT0FBTyxFQUFFLFVBQUMsS0FBVTtnQkFFaEIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzdDO1NBQ0osQ0FBQztRQUNGLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNwQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxXQUFXLENBQUM7U0FDdkM7OztnQkEvT1IsU0FBUyxTQUFDO29CQUNQLHF0RkFBOEM7O2lCQUVqRDs7OztnQkFyRU8sb0JBQW9CO2dCQURwQixXQUFXOzs7MkJBZ0ZkLEtBQUs7K0JBUUwsS0FBSzt3QkFRTCxLQUFLO2dDQXVDTCxLQUFLOztrQ0EzSlY7RUEyRjZDLGlCQUFpQjtTQUFqRCx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBCYXNlZCBvbiBvcmlnaW5hbCB3b3JrOiBNZXRhVUk6IENyYWlnIEZlZGVyaWdoaSAoMjAwOClcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtNZXRhQ29udGV4dENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9tZXRhLWNvbnRleHQvbWV0YS1jb250ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQge01ldGFCYXNlQ29tcG9uZW50fSBmcm9tICcuLi9tZXRhLmJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7Q29udGV4dCwgVUlDb250ZXh0fSBmcm9tICcuLi8uLi9jb3JlL2NvbnRleHQnO1xuaW1wb3J0IHtVSU1ldGF9IGZyb20gJy4uLy4uL2NvcmUvdWltZXRhJztcbmltcG9ydCB7SXRlbVByb3BlcnRpZXN9IGZyb20gJy4uLy4uL2NvcmUvaXRlbS1wcm9wZXJ0aWVzJztcbmltcG9ydCB7TWVudUl0ZW19IGZyb20gJ3ByaW1lbmcvY29tcG9uZW50cy9jb21tb24vYXBpJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIE1lbnVJdGVtQ29tbWFuZCBleHRlbmRzIE1lbnVJdGVtXG57XG4gICAgYWN0aW9uTmFtZT86IHN0cmluZztcbiAgICBtb2R1bGVOYW1lPzogc3RyaW5nO1xuICAgIHJvdXRlUGF0aD86IHN0cmluZztcblxufVxuXG4vKipcbiAqIE1ldGFBY3Rpb25MaXN0IHByb3ZpZGVzIGEgd2F5IGhvdyB0byBhdHRhY2ggYWN0aW9ucyB0byB0aGUgc2NyZWVuLiBXZSBjYW4gdXNlIEBhY3Rpb24gZGVjbGFyYXRpb25cbiAqIHRvIGRlZmluZSBuZXcgYWN0aW9uIGFuZCB0aGVpciBhY3Rpb25SZXN1bHRzLiBhY3Rpb25SZXN1bHRzIGlzIGFuIGV4cHJlc3Npb24gdGhhdCBpcyBleGVjdXRlZFxuICogYW5kIGVpdGhlciByZWRpcmVjdCB5b3UgdG8gZGlmZmVyZW50IHBhZ2Ugb3Igc29tZSBsb2dpYyBpcyBleGVjdXRlZC5cbiAqXG4gKiBBY3Rpb25zIGNhbiBiZSBvcmdhbml6ZWQgaW50byBhY3Rpb24gY2F0ZWdvcmllcyBidXQgaWYgd2UgZG8gbm90IHByb3ZpZGUgYW55IGFjdGlvbiBjYXRlZ29yeVxuICogZGVmYXVsdCBvbmUgaXMgdXNlZC5cbiAqXG4gKiBUaGlzIHdheSB3ZSBkZWZpbmUgcGxhY2Vob2xkZXIgdXNpbmcgYSBsYXlvdXQgd2hlcmUgYWN0aW9ucyBhcmUgaW5zZXJ0ZWRcbiAqXG4gKlxuICpgYGBodG1sXG4gKlxuICogICAgbGF5b3V0PUluc3BlY3QyI1N0YWNrIHtcbiAqICAgICAgIEBsYXlvdXQ9TWVudVRvcCNBY3Rpb25CdXR0b25zIHtcbiAqICAgICAgIH1cbiAqXG4gKiAgICAgQGxheW91dD1GaXJzdCNGb3JtIHtcbiAqICAgICB9XG4gKlxuICogICAgIEBsYXlvdXQ9U2Vjb25kI0Zvcm0geyB6b25lUGF0aDpTZWNvbmQ7IH1cbiAqICB9XG4gKlxuICpcbiAqIGBgYFxuICpcbiAqIEFuZCB0aGlzIGlzIGhvdyB3ZSBkZWZpbmUgYWN0aW9ucyBmb3IgY3VycmVudCBwYWdlL2NsYXNzL29iamVjdFxuICpcbiAqIGBgYFxuICogICAgQGFjdGlvbj11cGRhdGUgIHtcbiAqICAgICAgICAgICAgIGFjdGlvblJlc3VsdHM6JHsgb2JqZWN0LmZpcnN0TmFtZSA9IFwiTXIuXCIgKyAgb2JqZWN0LmZpcnN0TmFtZSB9O1xuICogICAgICAgICAgICAgdmlzaWJsZTogJHsgcHJvcGVydGllcy5lZGl0aW5nIH07XG4gKiAgICB9XG4gKlxuICpcbiAqICAgIEBhY3Rpb249U2F2ZSAge1xuICogICAgICAgICAgICAgbGFiZWw6IFwiTXkgU2F2ZVwiO1xuICogICAgICAgICAgICAgYWN0aW9uUmVzdWx0czokeyBvYmplY3QuZmlyc3ROYW1lID0gXCJNcy5cIiArICBvYmplY3QuZmlyc3ROYW1lIH07XG4gKiAgICAgICAgICAgICB2aXNpYmxlOiAkeyBwcm9wZXJ0aWVzLmVkaXRpbmcgfTtcbiAqICAgICAgICAgICAgIGJ1dHRvblN0eWxlOmluZm87XG4gKiAgICB9XG4gKiBgYGBcbiAqXG4gKlxuICpcbiAqXG4gKlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnbWV0YS1hY3Rpb24tbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ21ldGEtYWN0aW9uLWxpc3QuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNZXRhQWN0aW9uTGlzdENvbXBvbmVudCBleHRlbmRzIE1ldGFCYXNlQ29tcG9uZW50XG57XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIERlZmluZXMgdHlwZSBvZiBjb21wb25lbnRzIHRoYXQgcmVuZGVycyBvdXIgYWN0aW9ucy4gV2UgaGF2ZSAzIHR5cGVzOlxuICAgICAqIEJ1dHRvbnMsIExpbmtzIGFuZCBQb3B1cCBNZW51XG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHJlbmRlckFzOiBzdHJpbmcgPSAnYnV0dG9ucyc7XG5cblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgc3R5bGUgdXNlZCBmb3IgdGhlIGJ1dHRvbnMgaWYgbm9uZSBpcyBzcGVjaWZpZWRcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGVmYXVsdFN0eWxlOiBzdHJpbmcgPSAnaW5mbyc7XG5cblxuICAgIC8qKlxuICAgICAqIFRlbGxzIHVzIGlmIHRoZSBhY3Rpb24gc2hvdWxkIGJlIHJlbmRlcmVkIG9uIHRoZSBsZWZ0IG9yIHJpZ2h0IHNpZGVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYWxpZ246IHN0cmluZyA9ICdyaWdodCc7XG5cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgc3BlY2lhbCBpZGVudGlmaWVyIGFuZCB3aGVuIHVzZWQgd2UgcHVzaCBleHRyYSBzdGFjayBwcm9wZXJ0eSBpbiBvcmRlciB0byBnZXQgc29tZVxuICAgICAqIGFkZGl0aW9uYWwgcHJvcGVydGllcyB0aGF0IGFyZSBwcmltYXJpbHkgcmVsYXRlZCB0byB0eXBlIG9mIGFjdGlvbnMgdGhhdCBjYW4gYmUgdmlzaWJsZSBvclxuICAgICAqIGVuYWJsZWRcbiAgICAgKlxuICAgICAqIEUuZy4gd2UgY2FuIHNheSB3ZSB3YW50IG9ubHkgb2JqZWN0IEluc3RhbmNlIGJhc2VkIGJ1dHRvbnNcbiAgICAgKlxuICAgICAqIGBgYFxuICAgICAqICBAdHJhaXQ9SW5zdGFuY2VBY3Rpb25CdXR0b25zIHtcbiAgICAgKiAgICAgICAgICB2aXNpYmxlOnRydWU7XG4gICAgICogICAgICAgICAgY29tcG9uZW50Ok1ldGFBY3Rpb25MaXN0Q29tcG9uZW50O1xuICAgICAqICAgICAgICAgIGJpbmRpbmdzOntcbiAgICAgKiAgICAgICAgICAgICAgcmVuZGVyQXM6YnV0dG9ucztcbiAgICAgKiAgICAgICAgICAgICAgYWxpZ246cmlnaHQ7XG4gICAgICogICAgICAgICAgICAgIGZpbHRlckFjdGlvbnM6aW5zdGFuY2U7XG4gICAgICogICAgICAgICAgIH07XG4gICAgICogICAgICAgICAgIGVsZW1lbnRDbGFzczpcImwtYWN0aW9uLWJ1dHRvbnNcIjtcbiAgICAgKiAgICAgIH1cbiAgICAgKlxuICAgICAqICBgYGBcbiAgICAgKlxuICAgICAqIFdoZW4gdGhpcyB0cmFpdCBpcyB1c2VkIHdlIHB1c2ggZmlsdGVyQWN0aW9uID0gaW5zdGFuY2UgYW5kIGl0IHdpbGwgZ2l2ZSB1cyBiYWNrXG4gICAgICpcbiAgICAgKiAgYGBgXG4gICAgICogIGZpbHRlckFjdGlvbnM9aW5zdGFuY2Uge1xuICAgICAqICAgICAgICAgIHZpc2libGU6JHtwcm9wZXJ0aWVzLmlzSW5zdGFuY2VBY3Rpb24gPT0gdHJ1ZX1cbiAgICAgKiAgICAgIH1cbiAgICAgKlxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogV2hpY2ggY2FuIGJlIHVzZWQgdG8gc2hvdyBvciBoaWRlIGJ1dHRvbiBpZiBlLmcuIG9iamVjdCBpbnN0YW5jZSBpcyBzZWxlY3RlZCBvciBhdmFpbGFibGVcbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGZpbHRlckFjdGlvbnM6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogSnVzdCBzdG9yZXMgbWFwcGluZyBiZXR3ZWVuIGFjdGlvbiBhbmQgY29udGV4dCBhbmQgYWN0aW9uIGFuZCBJdGVtUHJvcGVydGllcy4gU28gZXZlcnl0aW1lXG4gICAgICpcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX2FjdGlvbnNCeUNhdGVnb3J5OiBNYXA8c3RyaW5nLCBJdGVtUHJvcGVydGllc1tdPjtcbiAgICBwcm90ZWN0ZWQgX2FjdGlvbnNCeU5hbWU6IE1hcDxzdHJpbmcsIEl0ZW1Qcm9wZXJ0aWVzPjtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgIGFjdGlvbiBncm91cHMgcmV0cmlldmVkIGZyb20gY3VycmVudCBDb250ZXh0XG4gICAgICovXG4gICAgY2F0ZWdvcmllczogSXRlbVByb3BlcnRpZXNbXTtcblxuICAgIC8qKlxuICAgICAqIFdoZW4gQWN0aW9uTWVudSB0cmFpdCBpcyB1c2VkIHRoaXMgaXMgdGhlIG1lbnUgbW9kZWwgdGhhdCBkZWZpbmVzIHdoYXQgaXRlbXMgYXJlIGF2YWlsYWJsZVxuICAgICAqL1xuICAgIG1lbnVNb2RlbDogTWVudUl0ZW1Db21tYW5kW107XG5cbiAgICAvKipcbiAgICAgKiBNYXAgbGlua2luZyB0aGUgbmFtZSBvZiB0aGUgbGF5b3V0IHRvIHRoZSBhY3R1YWwgY29udGV4dC4gV2UgbmVlZCB0aGlzIHdoZW4gd2UgbmVlZFxuICAgICAqIHRvIGFjY2VzcyBjdXJyZW50IGNvbnRlbnQuXG4gICAgICpcbiAgICAgKi9cbiAgICBfY29udGV4dE1hcDogTWFwIDxzdHJpbmcsIENvbnRleHQ+ID0gbmV3IE1hcDxzdHJpbmcsIENvbnRleHQ+KCk7XG5cblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfbWV0YUNvbnRleHQ6IE1ldGFDb250ZXh0Q29tcG9uZW50LCBwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgX21ldGFDb250ZXh0KTtcblxuICAgIH1cblxuXG4gICAgLy8gcHJvdGVjdGVkIHVwZGF0ZU1ldGEoKTogYW55XG4gICAgLy8ge1xuICAgIC8vICAgICAvLyB0b2RvOiByZXBsYWNlIGl0IHdpdGggRXZlbnRFbW1pdHRlci5cbiAgICAvLyAgICAgdGhpcy5fYWN0aW9uc0J5Q2F0ZWdvcnkgPSBudWxsO1xuICAgIC8vICAgICB0aGlzLl9hY3Rpb25zQnlOYW1lID0gbnVsbDtcbiAgICAvLyAgICAgcmV0dXJuIHN1cGVyLnVwZGF0ZU1ldGEoKTtcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGFuZCBzdG9yZXMgY3VycmVudCBhY3Rpb24gY2F0ZWdvcmllcyBhdmFpbGFibGUgdG8gY3VycmVudCBDb250ZXh0XG4gICAgICpcbiAgICAgKi9cbiAgICBhY3Rpb25DYXRlZ29yaWVzKCk6IEl0ZW1Qcm9wZXJ0aWVzW11cbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX2FjdGlvbnNCeUNhdGVnb3J5KSB8fCBpc0JsYW5rKHRoaXMuX2FjdGlvbnNCeU5hbWUpKSB7XG5cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5maWx0ZXJBY3Rpb25zKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5zZXQoJ2ZpbHRlckFjdGlvbnMnLCB0aGlzLmZpbHRlckFjdGlvbnMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbWV0YTogVUlNZXRhID0gPFVJTWV0YT4gdGhpcy5jb250ZXh0Lm1ldGE7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucHVzaCgpO1xuXG4gICAgICAgICAgICB0aGlzLm1lbnVNb2RlbCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fYWN0aW9uc0J5Q2F0ZWdvcnkgPSBuZXcgTWFwPHN0cmluZywgSXRlbVByb3BlcnRpZXNbXT4oKTtcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbnNCeU5hbWUgPSBuZXcgTWFwPHN0cmluZywgSXRlbVByb3BlcnRpZXM+KCk7XG4gICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSBtZXRhLmFjdGlvbnNCeUNhdGVnb3J5KHRoaXMuY29udGV4dCwgdGhpcy5fYWN0aW9uc0J5Q2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgVUlNZXRhLkFjdGlvblpvbmVzKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5wb3AoKTtcblxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uc0J5Q2F0ZWdvcnkuZm9yRWFjaCgodjogSXRlbVByb3BlcnRpZXNbXSwgazogc3RyaW5nKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHYuZm9yRWFjaCgoaXRlbTogSXRlbVByb3BlcnRpZXMpID0+IHRoaXMuX2FjdGlvbnNCeU5hbWUuc2V0KGl0ZW0ubmFtZSwgaXRlbSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5jYXRlZ29yaWVzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBBY3Rpb24gYmVsb25naW5nIHRvIGN1cnJlbnQgY2F0ZWdvcnkuLlxuICAgICAqXG4gICAgICovXG4gICAgYWN0aW9ucyhjYXRlZ29yeTogSXRlbVByb3BlcnRpZXMpOiBJdGVtUHJvcGVydGllc1tdXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aW9uc0J5Q2F0ZWdvcnkuZ2V0KGNhdGVnb3J5Lm5hbWUpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXaGVuIGFjdGlvbiBjbGlja2VkIHRoaXMgbWV0aG9kIGRlbGVnYXRlcyBpdCBpbnRvIG1ldGEgbGF5ZXIgdG8gYmUgZXhlY3V0ZWQuXG4gICAgICpcbiAgICAgKi9cbiAgICBhY3Rpb25DbGlja2VkKGFjdGlvbjogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLl9jb250ZXh0TWFwLmdldChhY3Rpb24pO1xuICAgICAgICBsZXQgbWV0YTogVUlNZXRhID0gPFVJTWV0YT4gY29udGV4dC5tZXRhO1xuXG4gICAgICAgIG1ldGEuZmlyZUFjdGlvbkZyb21Qcm9wcyh0aGlzLl9hY3Rpb25zQnlOYW1lLmdldChhY3Rpb24pLCA8VUlDb250ZXh0PiBjb250ZXh0KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEEgaG9vayB1c2VkIHRvIHN0b3JlIHRoZSBtb3N0IGN1cnJlbnQgY29udGV4dCBmb3IgZWFjaCBhY3Rpb24uXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkFmdGVyQ29udGV4dFNldChhY3Rpb25OYW1lOiBzdHJpbmcpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgYUNvbnRleHQgPSB0aGlzLl9tZXRhQ29udGV4dC5hY3RpdmVDb250ZXh0KCkuc25hcHNob3QoKS5oeWRyYXRlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5fY29udGV4dE1hcC5zZXQoYWN0aW9uTmFtZSwgYUNvbnRleHQpO1xuXG5cbiAgICAgICAgaWYgKHRoaXMucmVuZGVyQXMgPT09ICdtZW51Jykge1xuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZU1lbnUoYWN0aW9uTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEEgaG9vayB1c2VkIHRvIHN0b3JlIHRoZSBtb3N0IGN1cnJlbnQgY29udGV4dCBmb3IgZWFjaCBhY3Rpb24uXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkNvbnRleHRDaGFuZ2VkKGNoYW5nZTogc3RyaW5nKTogdm9pZFxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NoYW5nZWQgPSAnICsgY2hhbmdlKTtcbiAgICB9XG5cbiAgICBsYWJlbChhY3Rpb25OYW1lOiBzdHJpbmcpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGxldCBjb250ZXh0OiBDb250ZXh0ID0gdGhpcy5fY29udGV4dE1hcC5nZXQoYWN0aW9uTmFtZSk7XG4gICAgICAgIHJldHVybiBzdXBlci5hUHJvcGVydGllcyhjb250ZXh0LCBVSU1ldGEuS2V5TGFiZWwpO1xuICAgIH1cblxuICAgIGlzQWN0aW9uRGlzYWJsZWQoYWN0aW9uTmFtZTogc3RyaW5nKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgbGV0IGNvbnRleHQ6IENvbnRleHQgPSB0aGlzLl9jb250ZXh0TWFwLmdldChhY3Rpb25OYW1lKTtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudChjb250ZXh0KSA/ICFjb250ZXh0LmJvb2xlYW5Qcm9wZXJ0eUZvcktleSgnZW5hYmxlZCcsIGZhbHNlKSA6IHRydWU7XG4gICAgfVxuXG4gICAgYWxpZ25SaWdodCgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGlnbiA9PT0gJ3JpZ2h0JztcbiAgICB9XG5cbiAgICBzdHlsZShhY3Rpb25OYW1lOiBzdHJpbmcpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGxldCBjb250ZXh0OiBDb250ZXh0ID0gdGhpcy5fY29udGV4dE1hcC5nZXQoYWN0aW9uTmFtZSk7XG4gICAgICAgIGxldCBzdHlsZSA9IHN1cGVyLmFQcm9wZXJ0aWVzKGNvbnRleHQsICdidXR0b25TdHlsZScpO1xuXG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQoc3R5bGUpID8gc3R5bGUgOiB0aGlzLmRlZmF1bHRTdHlsZTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgcG9wdWxhdGVNZW51KGFjdGlvbk5hbWU6IHN0cmluZyk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBsYWJlbCA9IHRoaXMubGFiZWwoYWN0aW9uTmFtZSk7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMubWVudU1vZGVsLmZpbmRJbmRleChcbiAgICAgICAgICAgIChpdGVtOiBNZW51SXRlbUNvbW1hbmQpID0+IGl0ZW0uYWN0aW9uTmFtZSA9PT0gYWN0aW9uTmFtZSk7XG5cbiAgICAgICAgbGV0IGl0ZW1Db21tYW5kOiBNZW51SXRlbUNvbW1hbmQgPSB7XG4gICAgICAgICAgICBsYWJlbDogbGFiZWwsXG4gICAgICAgICAgICBhY3Rpb25OYW1lOiBhY3Rpb25OYW1lLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuaXNBY3Rpb25EaXNhYmxlZChhY3Rpb25OYW1lKSxcbiAgICAgICAgICAgIGNvbW1hbmQ6IChldmVudDogYW55KSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uQ2xpY2tlZChldmVudC5pdGVtLmFjdGlvbk5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnVNb2RlbC5wdXNoKGl0ZW1Db21tYW5kKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWVudU1vZGVsW2luZGV4XSA9IGl0ZW1Db21tYW5kO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=