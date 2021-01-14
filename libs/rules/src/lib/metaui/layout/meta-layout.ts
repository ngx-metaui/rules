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
import {OnDestroy} from '@angular/core';
import {assert, isBlank, isPresent} from '../core/utils/lang';
import {Environment} from '../core/config/environment';
import {MetaBaseComponent} from './meta.base.component';
import {ItemProperties} from '../core/item-properties';
import {MetaContextComponent, OnContextSetEvent} from '../core/meta-context/meta-context.component';
import {Context} from '../core/context';
import {KeyLabel, KeyLayout, ZonesTLRMB} from '../core/constants';
import {PropertyMap} from '../core/policies/merging-policy';


/**
 * MetaLayout represent a high level rule that aggregates defined layout. When we iterate thru the
 * different layout we need to remember both current rendered context as well as ItemProperties.
 *
 *
 *
 */
export class MetaLayout extends MetaBaseComponent implements OnDestroy {
  /**
   * A map linking the name of the layout to the actual context. We need this when we need
   * to access current content.
   *
   */
  contextMap: Map<string, Context> = new Map<string, Context>();
  /**
   * Current context being rendered
   */
  layoutContext: Context;
  /**
   * Layout definitions by its name
   *
   */
  protected nameToLayout: Map<string, ItemProperties> = new Map<string, ItemProperties>();

  constructor(protected _metaContext: MetaContextComponent, public env: Environment) {
    super(env, _metaContext);

  }

  /**
   * List all available Layouts defines for current Context
   */
  protected _allLayouts: ItemProperties[];

  /**
   * Retrieves all available and active layouts for zones defined by subclasses
   *
   */
  get allLayouts(): ItemProperties[] {
    if (isBlank(this._allLayouts)) {
      this._allLayouts = this.activeContext.meta.itemList(this.activeContext, KeyLayout,
        this.zones());
      this.nameToLayout.clear();

      this._allLayouts.forEach((item: ItemProperties) =>
        this.nameToLayout.set(item.name, item));

    }
    return this._allLayouts;
  }

  /**
   * Layout sorted by zones. Each implementation can support different zones.
   */
  protected _layoutsByZones: Map<string, any>;

  /**
   * Retrieves all available and active layouts and aggregate them their name
   *
   */
  get layoutsByZones(): Map<string, any> {
    if (isBlank(this._layoutsByZones)) {
      this._layoutsByZones = this.activeContext.meta.itemsByZones(this.activeContext, KeyLayout,
        this.zones());
    }
    return this._layoutsByZones;
  }

  /**
   * Context properties for current active rendered layout
   *
   */
  protected _propertyMap: PropertyMap;

  // todo: should this be for current layout?
  get propertyMap(): PropertyMap {
    if (isBlank(this._propertyMap)) {
      this.activeContext.push();
      this._propertyMap = this.activeContext.allProperties();
      this.activeContext.pop();
    }
    return this._propertyMap;
  }

  /**
   * Current Layout being rendered
   */
  protected _layout: ItemProperties;

  get layout(): ItemProperties {
    return this._layout;
  }

  set layout(value: ItemProperties) {
    this._layout = value;
    this._propertyMap = null;
  }

  get activeContext(): Context {
    return this._metaContext.activeContext();
  }

  /**
   * Can be called by m-content to @Output when context properties are pushed to stack
   *
   */
  afterContextSet(event: OnContextSetEvent): void {
    this.contextMap.set(event.value, event.context);

  }

  /**
   * Can be called by m-content to @Output before context properties are pushed to stack
   *
   */
  beforeContextSet(layoutName: any): void {
    this.layout = this.nameToLayout.get(layoutName);
  }

  label(): string {
    return this.activeContext.resolveValue(this.propertyMap.get(KeyLabel));
  }


  labelForContext(name: string): string {
    const context: Context = this.contextMap.get(name);
    return super.activeProperty(context, KeyLabel);
  }

  zones(): string[] {
    return ZonesTLRMB;
  }


  // remove this ugly solution once I figure out custom value accessor
  properties(key: string, defValue: any = null): any {
    return isPresent(this.activeContext) ? this.activeContext.propertyForKey(key) : defValue;

  }

  debugString(name: string): string {
    const context = this.contextMap.get(name);
    assert(isPresent(context), 'Trying to retrive debugString on non-existing context');

    return context.debugString();
  }


  ngOnDestroy(): void {
    this.layoutContext = null;
    this.contextMap.clear();
    this.contextMap = null;
  }
}
