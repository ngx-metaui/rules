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

/**
 * Meta Common constants
 */
import {isBlank, toList} from './utils/lang';
import {ListWrapper} from './utils/collection';
import {Context} from './context';
import {FieldPath} from './utils/field-path';
import {ItemProperties} from './item-properties';
import {LocalizedString} from './i18n/localized-string';
import {Route} from '@angular/router';
import {Meta} from './meta';
import {InjectionToken} from '@angular/core';


/**
 * Constant represent current active and mainly latest Context
 *
 */
export const ACTIVE_CNTX = 'CurrentMC';
export const CNTX_CHANGED = 'Cntx_Changed';


/**
 * Rule base constants
 */
export const KeyAny = '*';
export const KeyDeclare = 'declare';
export const KeyTrait = 'trait';

export const LowRulePriority = -100000;
export const SystemRulePriority = -200000;
export const UILibraryRulePriority = -180000;
export const ClassRulePriority = -100000;

export const MaxKeyDatas = 64;
export const NullMarker = {markernull: true};

export const ScopeKey = 'scopeKey';
export const DeclRule = 'declRule';

export const _UsePartialIndexing = true;
export const _DebugDoubleCheckMatches = false;


/**
 * Object Meta constatns
 */
export const KeyClass = 'class';
export const KeyField = 'field';
export const KeyAction = 'action';
export const KeyActionCategory = 'actionCategory';
export const KeyObject = 'object';
export const KeyValue = 'value';
export const KeyType = 'type';
export const KeyElementType = 'elementType';
export const KeyTraitGroup = 'traitGroup';
export const KeyVisible = 'visible';
export const KeyEditable = 'editable';
export const KeyValid = 'valid';
export const KeyRank = 'rank';
export const DefaultActionCategory = 'General';

export const FieldPathNullMarker = new FieldPath('null');


/**
 * Layout based constants
 */
export const KeyOperation = 'operation';
export const KeyModule = 'module';
export const KeyLayout = 'layout';
export const KeyArea = 'area';
export const KeyEditing = 'editing';
export const KeyAfter = 'after';
export const KeyHidden = 'hidden';
export const KeyLabel = 'label';
export const KeyComponentName = 'component';
export const KeyComponentModuleName = 'componentModule';
export const KeyBindings = 'bindings';
export const KeyHomePage = 'homePage';
export const KeyZonePath = 'zonePath';
export const PropFieldsByZone = 'fieldsByZone';
export const PropIsFieldsByZone = 'fiveZoneLayout';
export const PropActionsByCategory = 'actionsByCategory';
export const PropActionCategories = 'actionCategories';
export const PropFieldPropertyList = 'fieldPropertyList';
export const PropLayoutsByZone = 'layoutsByZone';
export const KeyWrapperComponent = 'wrapperComponent';
export const KeyWrapperModuleComponent = 'wrapperModuleComponent';
export const KeyWrapperBinding = 'wrapperBindings';


export const RootPredecessorKey = '_root';
export const ZoneMain = 'zMain';
export const ZoneTop = 'zTop';
export const ZoneLeft = 'zLeft';
export const ZoneMiddle = 'zMiddle';
export const ZoneRight = 'zRight';
export const ZoneBottom = 'zBottom';
export const ZoneDetail = 'zDetail';


// 4 columns based zones
export const ZoneOne = 'zOne';
export const ZoneTwo = 'zTwo';
export const ZoneThree = 'zThree';
export const ZoneFour = 'zFour';


export const AppConfigRuleFilesParam = 'metaui.rules.file-names';
export const AppConfigUserRulesParam = 'metaui.rules.user-rules';

export const ZonesTLRMB = [ZoneTop, ZoneLeft, ZoneMiddle, ZoneRight, ZoneBottom];
export const Zones1234 = [ZoneOne, ZoneTwo, ZoneThree, ZoneFour];
export const ZonesMTLRB = [ZoneMain, ZoneTop, ZoneLeft, ZoneRight, ZoneBottom];
export const ZonesDetail = [ZoneDetail];

export const ModuleActionZones = ['zNav', 'zGlobal'];
export const ActionZones = ['zGlobal', 'zMain', 'zGeneral'];


export interface OSSResource {
  filePath: string;
  module?: string;
  content: string;
}


export function resourceToPath(resource: OSSResource) {
  return `${resource.module}/${resource.filePath}`;
}


/**
 * For more info please see `ObjectMeta`
 */
export interface ObjectRule {
  /**
   * Returns list of items for declared key. e.g. If we want to retrieve list of fields in the
   * class.
   *
   */
  itemNames(context: Context, key: string): Array<string>;

  /**
   * Iterates each item name and together with key pushing this key/value pair onto the stack
   * in order to retrieve specific properties that are saved in the `ItemProperties` class
   *
   */
  itemProperties(context: Context, key: string,
                 filterHidden: boolean): Array<ItemProperties>;


  validationError(context: Context): string;
}

/**
 * Methods to work with the layout for more please see `UIMeta`
 */
export interface LayoutRule {
  /**
   *  Retrieves all available zones defined in current context.
   *
   */
  zones(context: Context): Array<string>;


  /**
   * Check if there is a zonePath property key defined and if there is one then it retrieves for
   * current context and the closest layout defined zonePath' value and together with
   * `itemNamesByZones` method group fields by their zones.
   *
   * Because you can have something like this:
   *
   *    layout=Inspect2#Stack {
   *        @layout=MenuTop#ActionButtons {
   *        }
   *
   *        @layout=First#Form {
   *        }
   *        @layout=Second#Form { zonePath:Second; }
   *    }
   *
   *    Where we defined for the layout named Second and zonePath Second and this will be such
   *    marker for us where to place our future content
   *
   *    Then we can refere to this place like this
   *
   *   ```
   *    zLeft => firstName => lastName => age => department;
   *    Second.zLeft => email;
   *   ```
   *
   *
   */
  zonePath(context: Context): string;


  /**
   *
   * Retrieves items defined by a key (e.g: layouts, fields, etc..) with details (ItemProperties)
   * and sorted by given zones.
   *
   * First it retrieves list of keys which  are group by a zone adn then within each zone fields
   * are sorted by their rank if defined
   *
   * e.g.
   *
   * ```
   *  private fieldList(context: Context): Array<ItemProperties> {
   *     return this.itemList(context, KeyField, ZonesTLRMB);
   *   }
   * ```
   *
   * For current context that is always backed up by some object returns list of its
   * fields along with properties sorted by its zone and the order they
   * should appear in the ui.
   *
   */
  itemList(context: Context, key: string, zones: string[]): Array<ItemProperties>;

  /**
   * Uses itemList to retrieve list of ItemProperties for field context key
   *
   */
  fieldList(context: Context): Array<ItemProperties>;

  /**
   * Retrieves list of items defined by key (property) aggregated by its zone. Its all
   * similar to above method where uses map where they key is zone name and the  value
   * is list of ItemProperties
   *
   * TODO: Change any to proper typings
   *
   */
  itemsByZones(context: Context, property: string, zones: string[]): Map<string, any>;


  /**
   *
   *
   */
  itemNamesByZones(context: Context, key: string, zones: string[]): Map<string, any>;


  /**
   * Flattens fields aggregated into its zone from somethin similar like above itemsByZones
   *
   */
  flattenVisible(fieldsByZones: Map<string, Array<string>>, zoneList: string[], key: string,
                 context: Context): string[];


  /**
   * Each class or object instance needs to have its short representation while rendering it and
   * this one identifies the right class fields that needs to be used to e.g. render a object
   * value in the dropdown
   *
   * By default there could be toString() or you can add special field trait called
   *  trait:LabelField
   *
   */
  displayLabel(className: string, propertiesValue: string, usedByField?: boolean): string;


  /***
   *
   * Returns lazily translated value defined by localization key it uses default one. In oss
   * you can have something like this
   *
   * ```
   *   label:$[a001]"Submit";
   * ```
   *
   * Where the `a001` refers to some key in the resource files and submit is default value if not
   * defined.
   *
   */
  createLocalizedString(key: string, defaultValue: string): LocalizedString;


  /**
   *
   * Executes a action defined by an @action in the body of  `actionResults` property.
   *
   */
  fireAction(context: Context, action?: ItemProperties | Route, withBackAction?: boolean): void;


  /**
   *
   * Even not fully implemented but this methods triggers actions that retrieves current module
   * properties and trigers specified route action that supposed to transition to a new page.
   *
   * @deprecated use go2Module instead
   */
  gotoModule(module: ItemProperties, activatedPath?: string): void;


  go2Module(module: ItemProperties, routePrefix: string): void;

  /**
   *
   *
   * For current contexts retrieves list of actions group by action category.
   *
   * NOTE: Caller must call push / pop before
   *
   */
  actionsByCategory(context: Context, result: Map<string, Array<ItemProperties>>,
                    zones: string[]): Array<ItemProperties>;


  /**
   *
   * Collects module information from Application.oss and retrieves them aggregated in the
   * `ModuleInfo`
   *
   */
  computeModuleInfo(context?: Context, checkVisibility?: boolean): ModuleInfo;

  /**
   *  For given module retrieves a label. If the context is undefined it creates new one
   *
   */
  currentModuleLabel(moduleName: string, context?: Context): string;

}


export class ModuleInfo {
  modules: Array<ItemProperties>;
  moduleNames: Array<string>;
  moduleByNames: Map<string, ItemProperties>;
  actionCategories: Array<ItemProperties>;
  actionsByCategory: Map<string, Array<ItemProperties>>;
}


export interface ValueQueriedObserver {
  notify(meta: Meta, key: string, value: any): void;

}


/*
   A few handy utilities (for which we probably already have superior versions elsewhere)
*/

export function overrideKeyForKey(key: string): string {
  return key + '_o';
}

export function addTraits(traits: string[], map: Map<string, any>): void {
  const current: string[] = map.get(KeyTrait);
  if (isBlank(current)) {
    map.set(KeyTrait, traits);

  } else {
    ListWrapper.addAll(current, traits);
    map.set(KeyTrait, current);
  }
}

export function addTrait(trait: string, map: Map<string, any>): void {
  const current: string[] = map.get(KeyTrait);
  if (isBlank(current)) {
    map.set(KeyTrait, toList(trait));
  } else {
    current.push(trait);
    map.set(KeyTrait, current);
  }
}

