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
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  OnInit
} from '@angular/core';
import {
  ActionZones,
  Context,
  ItemProperties,
  MetaContextComponent,
  UIMeta
} from '@ngx-metaui/rules';


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
 */
@Component({
  selector: 'm-bar-actions',
  templateUrl: 'meta-bar-actions.component.html',
  styles: [`
    m-context {
      display: contents;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetaBarActionsComponent implements OnInit, DoCheck {
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
  filterActions: 'instance' | 'static';

  /**
   * Just stores mapping between action and context and action and ItemProperties.
   *
   */
  protected _actionsByCategory: Map<string, ItemProperties[]>;
  protected _actionsByName: Map<string, ItemProperties>;

  /**
   * Current  action groups retrieved from current Context
   */
  categories: ItemProperties[];

  get metaContext(): MetaContextComponent {
    return this._mc;
  }

  constructor(protected _mc: MetaContextComponent, private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.actionCategories();
  }

  ngDoCheck(): void {
    // todo: check if anythinged changed see changedAction, but instead of comparing sizes
    // compare actual properties
    this._actionsByCategory = null;
    this.actionCategories();

    this.cd.detectChanges();
  }


  /**
   * Read and stores current action categories available to current Context
   *
   */
  actionCategories(): ItemProperties[] {
    if (!this._actionsByCategory || !this._actionsByName) {
      if (this.filterActions) {
        this._mc.context.set('filterActions', this.filterActions);
      }

      const meta: UIMeta = this._mc.context.meta as UIMeta;
      this._mc.context.push();

      this._actionsByCategory = new Map<string, ItemProperties[]>();
      this._actionsByName = new Map<string, ItemProperties>();
      this.categories = meta.actionsByCategory(this._mc.context, this._actionsByCategory,
        ActionZones);
      this._mc.context.pop();

      this._actionsByCategory.forEach((v: ItemProperties[], k: string) => {
        v.forEach((item: ItemProperties) => this._actionsByName.set(item.name, item));
      });
    }

    return this.categories;
  }

  private actionChanged(): boolean {
    const meta: UIMeta = this._mc.context.meta as UIMeta;
    const actionByCat = new Map<string, ItemProperties[]>();

    this._mc.context.push();
    const cat = meta.actionsByCategory(this._mc.context, actionByCat, ActionZones);
    this._mc.context.pop();


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
  actionClicked(event: Event, context: Context, action: any): void {
    context.meta.fireAction(context, this._actionsByName.get(action));

    event.stopPropagation();
  }


}
