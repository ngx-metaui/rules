import { Environment } from '@aribaui/core';
import { MetaContextComponent } from '../../core/meta-context/meta-context.component';
import { MetaBaseComponent } from '../meta.base.component';
import { Context } from '../../core/context';
import { ItemProperties } from '../../core/item-properties';
import { MenuItem } from 'primeng/components/common/api';
export interface MenuItemCommand extends MenuItem {
    actionName?: string;
    moduleName?: string;
    routePath?: string;
}
/**
 * MetaActionList provides a way how to attach actions to the screen. We can use @action declaration
 * to define new action and their actionResults. actionResults is an expression that is executed
 * and either redirect you to different page or some logic is executed.
 *
 * Actions can be organized into action categories but if we do not provide any action category
 * default one is used.
 *
 * This way we define placeholder using a layout where actions are inserted
 *
 *
 *```html
 *
 *    layout=Inspect2#Stack {
 *       @layout=MenuTop#ActionButtons {
 *       }
 *
 *     @layout=First#Form {
 *     }
 *
 *     @layout=Second#Form { zonePath:Second; }
 *  }
 *
 *
 * ```
 *
 * And this is how we define actions for current page/class/object
 *
 * ```
 *    @action=update  {
 *             actionResults:${ object.firstName = "Mr." +  object.firstName };
 *             visible: ${ properties.editing };
 *    }
 *
 *
 *    @action=Save  {
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
export declare class MetaActionListComponent extends MetaBaseComponent {
    protected _metaContext: MetaContextComponent;
    env: Environment;
    /**
     *
     * Defines type of components that renders our actions. We have 3 types:
     * Buttons, Links and Popup Menu
     *
     */
    renderAs: string;
    /**
     * Default style used for the buttons if none is specified
     *
     */
    defaultStyle: string;
    /**
     * Tells us if the action should be rendered on the left or right side
     *
     */
    align: string;
    /**
     * This is special identifier and when used we push extra stack property in order to get some
     * additional properties that are primarily related to type of actions that can be visible or
     * enabled
     *
     * E.g. we can say we want only object Instance based buttons
     *
     * ```
     *  @trait=InstanceActionButtons {
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
     */
    filterActions: string;
    /**
     * Just stores mapping between action and context and action and ItemProperties. So everytime
     *
     */
    protected _actionsByCategory: Map<string, ItemProperties[]>;
    protected _actionsByName: Map<string, ItemProperties>;
    /**
     * Current  action groups retrieved from current Context
     */
    categories: ItemProperties[];
    /**
     * When ActionMenu trait is used this is the menu model that defines what items are available
     */
    menuModel: MenuItemCommand[];
    /**
     * Map linking the name of the layout to the actual context. We need this when we need
     * to access current content.
     *
     */
    _contextMap: Map<string, Context>;
    constructor(_metaContext: MetaContextComponent, env: Environment);
    /**
     * Read and stores current action categories available to current Context
     *
     */
    actionCategories(): ItemProperties[];
    /**
     *
     * Action belonging to current category..
     *
     */
    actions(category: ItemProperties): ItemProperties[];
    /**
     *
     * When action clicked this method delegates it into meta layer to be executed.
     *
     */
    actionClicked(action: any): void;
    /**
     * A hook used to store the most current context for each action.
     *
     */
    onAfterContextSet(actionName: string): void;
    /**
     * A hook used to store the most current context for each action.
     *
     */
    onContextChanged(change: string): void;
    label(actionName: string): string;
    isActionDisabled(actionName: string): boolean;
    alignRight(): boolean;
    style(actionName: string): string;
    private populateMenu(actionName);
}
