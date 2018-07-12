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
import { Type } from '@angular/core';
import { AppConfig, Environment, RoutingService } from '@aribaui/core';
import { ObjectMeta } from './object-meta';
import { Context, UIContext } from './context';
import { DynamicPropertyValue, StaticallyResolvable } from './property-value';
import { Rule, Selector } from './rule';
import { ItemProperties } from './item-properties';
/**
 * UIMeta is responsible setting layouts and all around this. We can either use this as a singleton
 * or use it as a service using Angular @Inject()
 * Right now we use still singleton as we need this class as a library for some other projects
 *
 *
 * todo: Convert to Injectable
 */
export declare class UIMeta extends ObjectMeta {
    static KeyOperation: string;
    static KeyModule: string;
    static KeyLayout: string;
    static KeyArea: string;
    static KeyEditing: string;
    static KeyAfter: string;
    static KeyHidden: string;
    static KeyLabel: string;
    static KeyComponentName: string;
    static KeyBindings: string;
    static KeyHomePage: string;
    static KeyZonePath: string;
    static PropFieldsByZone: string;
    static PropIsFieldsByZone: string;
    static PropActionsByCategory: string;
    static PropActionCategories: string;
    static PropFieldPropertyList: string;
    static PropLayoutsByZone: string;
    static KeyWrapperComponent: string;
    static KeyWrapperBinding: string;
    static RootPredecessorKey: string;
    static readonly ZoneMain: string;
    static readonly ZoneTop: string;
    static readonly ZoneLeft: string;
    static readonly ZoneMiddle: string;
    static readonly ZoneRight: string;
    static readonly ZoneBottom: string;
    static readonly ZoneDetail: string;
    static readonly AppConfigRuleFilesParam: string;
    static readonly AppConfigUserRulesParam: string;
    static ZonesTLRMB: string[];
    static ZonesMTLRB: string[];
    static ZonesDetail: string[];
    private static _instance;
    static ModuleActionZones: string[];
    static ActionZones: string[];
    static getInstance(): UIMeta;
    static defaultLabelForIdentifier(fieldName: string): string;
    static beautifyClassName(className: string): string;
    static beautifyFileName(field: string): string;
    private constructor();
    zones(context: Context): Array<string>;
    zonePath(context: Context): string;
    newContext(isNested?: boolean): Context;
    loadDefaultRuleFiles(references?: any): boolean;
    /**
     * loads application level rules. Application level rules are global rules
     */
    loadApplicationRules(): void;
    loadUserRule(source: any, userClass: string): boolean;
    defaultLabelGeneratorForKey(key: string): DynamicPropertyValue;
    registerDerivedValue(propKey: string, dynamicValue: DynamicPropertyValue, contextKey: string, contextValue: string): void;
    registerStaticallyResolvable(propKey: string, dynamicValue: StaticallyResolvable, contextKey: string): void;
    registerDefaultLabelGeneratorForKey(key: string): void;
    fieldList(context: Context): Array<ItemProperties>;
    fieldsByZones(context: Context): Map<string, any>;
    itemNamesByZones(context: Context, key: string, zones: string[]): Map<string, any>;
    mapItemPropsToNames(itemsByZones: Map<string, any>): Map<string, any>;
    predecessorMap(context: Context, key: string, defaultPredecessor: string): Map<string, Array<ItemProperties>>;
    itemList(context: Context, key: string, zones: string[]): Array<ItemProperties>;
    isZoneReference(key: string): boolean;
    itemsByZones(context: Context, property: string, zones: string[]): Map<string, any>;
    accumulatePrecessors(predecessors: Map<string, Array<ItemProperties>>, key: string, result: any): void;
    /**
     * Called by Parser to handle decls like 'zLeft => lastName#required'
     *
     */
    addPredecessorRule(itemName: string, contextPreds: Array<Selector>, predecessor: string, traits: any, lineNumber: number): Rule;
    flattenVisible(fieldsByZones: Map<string, Array<string>>, zoneList: string[], key: string, context: Context): string[];
    displayKeyForClass(className: string): string;
    displayLabel(className: string, propertiesValue: string): string;
    createLocalizedString(key: string, defaultValue: string): LocalizedString;
    readonly routingService: RoutingService;
    readonly env: Environment;
    readonly appConfig: AppConfig;
    /**
     * Registers framework level components and listen for user level rules to be registered.
     * After we register user level rules it will load application.oss.
     *
     *
     */
    private registerComponents(sysReferences);
    /**
     *
     * Just need to call it different than the other fireAction as I can not do any method
     * overloading here.
     *
     */
    fireActionFromProps(action: ItemProperties, context: Context): void;
    fireAction(context: UIContext, withBackAction?: boolean): void;
    private _fireAction(context, withBackAction);
    naviateToPage(context: Context, route: any, withBackAction: boolean): void;
    prepareRoute(context: Context, withBackAction: boolean): any;
    prepareRouteForComponent(component: any, context: Context, withBackAction: boolean): any;
    gotoModule(module: ItemProperties, activatedPath?: string): void;
    private isRoute(actionResult);
    compPageWithName(name: string): Type<any>;
    actionsByCategory(context: Context, result: Map<string, Array<ItemProperties>>, zones: string[]): Array<ItemProperties>;
    addActionsForCategories(context: Context, result: Map<string, Array<ItemProperties>>, catNames: string[]): void;
    collectActionsByCategory(context: Context, result: Map<string, Array<ItemProperties>>, targetCat: string): void;
    computeModuleInfo(context?: Context, checkVisibility?: boolean): ModuleInfo;
    currentModuleLabel(moduleName: string, context?: Context): string;
}
export declare class ModuleInfo {
    modules: Array<ItemProperties>;
    moduleNames: Array<string>;
    moduleByNames: Map<string, ItemProperties>;
    actionCategories: Array<ItemProperties>;
    actionsByCategory: Map<string, Array<ItemProperties>>;
}
export declare class LocalizedString extends DynamicPropertyValue {
    protected meta: UIMeta;
    protected _module: string;
    protected _key: string;
    protected _defaultValue: string;
    constructor(meta: UIMeta, _module: string, _key: string, _defaultValue: string);
    evaluate(context: Context): any;
    toString(): string;
}
