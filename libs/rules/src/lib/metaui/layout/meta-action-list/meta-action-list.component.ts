/**
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
 * Based on original work: MetaUI: Craig Federighi (2008)
 *
 */
import {Component, Input} from '@angular/core';
import {isBlank, isPresent} from '../../../core/utils/lang';
import {Environment} from '../../../core/config/environment';
import {MetaContextComponent} from '../../core/meta-context/meta-context.component';
import {MetaBaseComponent} from '../meta.base.component';
import {Context, UIContext} from '../../core/context';
import {UIMeta} from '../../core/uimeta';
import {ItemProperties} from '../../core/item-properties';
import {MenuItem} from 'primeng/components/common/api';


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
@Component({
  templateUrl: 'meta-action-list.component.html',
  styleUrls: ['meta-action-list.component.scss']
})
export class MetaActionListComponent extends MetaBaseComponent {

  /**
   *
   * Defines type of components that renders our actions. We have 3 types:
   * Buttons, Links and Popup Menu
   *
   */
  @Input()
  renderAs: string = 'buttons';


  /**
   * Default style used for the buttons if none is specified
   *
   */
  @Input()
  defaultStyle: string = 'info';


  /**
   * Tells us if the action should be rendered on the left or right side
   *
   */
  @Input()
  align: string = 'right';


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
  @Input()
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
  _contextMap: Map<string, Context> = new Map<string, Context>();


  constructor(protected _metaContext: MetaContextComponent, public env: Environment) {
    super(env, _metaContext);

  }


  protected updateMeta(): any {
    if (this.actionChanged()) {
      this._actionsByCategory = null;

      this.actionCategories();
    }
  }

  /**
   * Read and stores current action categories available to current Context
   *
   */
  actionCategories(): ItemProperties[] {
    if (isBlank(this._actionsByCategory) || isBlank(this._actionsByName)) {

      if (isPresent(this.filterActions)) {
        this.context.set('filterActions', this.filterActions);
      }

      const meta: UIMeta = <UIMeta> this.context.meta;
      this.context.push();

      this.menuModel = [];
      this._actionsByCategory = new Map<string, ItemProperties[]>();
      this._actionsByName = new Map<string, ItemProperties>();
      this.categories = meta.actionsByCategory(this.context, this._actionsByCategory,
        UIMeta.ActionZones);
      this.context.pop();

      this._actionsByCategory.forEach((v: ItemProperties[], k: string) => {
        v.forEach((item: ItemProperties) => this._actionsByName.set(item.name, item));
      });
    }

    return this.categories;
  }

  private actionChanged(): boolean {
    const meta: UIMeta = <UIMeta> this.context.meta;
    const actionByCat = new Map<string, ItemProperties[]>();

    this.context.push();
    const cat = meta.actionsByCategory(this.context, actionByCat, UIMeta.ActionZones);
    this.context.pop();


    if (this._actionsByCategory && this.categories) {

      return (actionByCat.size !== this._actionsByCategory.size) ||
        (cat.length !== this.categories.length);
    }

    return false;
  }


  /**
   *
   * Action belonging to current category..
   *
   */
  actions(category: ItemProperties): ItemProperties[] {
    return this._actionsByCategory.get(category.name);
  }


  /**
   *
   * When action clicked this method delegates it into meta layer to be executed.
   *
   */
  actionClicked(action: any): void {
    const context = this._contextMap.get(action);
    const meta: UIMeta = <UIMeta> context.meta;

    meta.fireActionFromProps(this._actionsByName.get(action), <UIContext> context);
  }


  /**
   * A hook used to store the most current context for each action.
   *
   */
  onAfterContextSet(actionName: string): void {
    const aContext = this._metaContext.activeContext().snapshot().hydrate(false);
    this._contextMap.set(actionName, aContext);


    if (this.renderAs === 'menu') {
      this.populateMenu(actionName);
    }
  }


  /**
   * A hook used to store the most current context for each action.
   *
   */
  onContextChanged(change: string): void {

  }

  label(actionName: string): string {
    const context: Context = this._contextMap.get(actionName);
    return super.aProperties(context, UIMeta.KeyLabel);
  }

  isActionDisabled(actionName: string): boolean {
    const context: Context = this._contextMap.get(actionName);
    return isPresent(context) ? !context.booleanPropertyForKey('enabled', false) : true;
  }

  alignRight(): boolean {
    return this.align === 'right';
  }

  style(actionName: string): string {
    const context: Context = this._contextMap.get(actionName);
    const style = super.aProperties(context, 'buttonStyle');

    return isPresent(style) ? style : this.defaultStyle;
  }


  private populateMenu(actionName: string): void {
    const label = this.label(actionName);
    const index = this.menuModel.findIndex(
      (item: MenuItemCommand) => item.actionName === actionName);

    const itemCommand: MenuItemCommand = {
      label: label,
      actionName: actionName,
      disabled: this.isActionDisabled(actionName),
      command: (event: any) => {
        this.actionClicked(event.item.actionName);
      }
    };
    if (index === -1) {
      this.menuModel.push(itemCommand);
    } else {
      this.menuModel[index] = itemCommand;
    }
  }

}
