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
import { Environment } from '@aribaui/core';
import { MetaBaseComponent } from './meta.base.component';
import { ItemProperties } from '../core/item-properties';
import { PropertyMap } from '../core/meta';
import { MetaContextComponent } from '../core/meta-context/meta-context.component';
import { Context } from '../core/context';
import { OnDestroy } from '@angular/core';
/**
 * MetaLayout represent a high level rule that aggregates defined layout. When we iterate thru the
 * different layout we need to remember both current rendered context as well as ItemProperties.
 *
 *
 *
 */
export declare class MetaLayout extends MetaBaseComponent implements OnDestroy {
    protected _metaContext: MetaContextComponent;
    env: Environment;
    /**
     * List all available Layouts defines for current Context
     */
    protected _allLayouts: ItemProperties[];
    /**
     * Layout sorted by zones. Each implementation can support different zones.
     */
    protected _layoutsByZones: Map<string, any>;
    /**
     * Context properties for current active rendered layout
     *
     */
    protected _propertyMap: PropertyMap;
    /**
     * Current Layout being rendered
     */
    protected _layout: ItemProperties;
    /**
     * Layout definitions by its name
     *
     */
    protected nameToLayout: Map<string, ItemProperties>;
    /**
     * A map linking the name of the layout to the actual context. We need this when we need
     * to access current content.
     *
     */
    contextMap: Map<string, Context>;
    /**
     * Current context being rendered
     */
    layoutContext: Context;
    constructor(_metaContext: MetaContextComponent, env: Environment);
    /**
     * Can be called by m-content to @Output when context properties are pushed to stack
     *
     */
    afterContextSet(layoutName: any): void;
    /**
     * Can be called by m-content to @Output after context properties are pushed to stack
     *
     */
    beforeContextSet(layoutName: any): void;
    readonly activeContext: Context;
    /**
     * Retrieves all available and active layouts for zones defined by subclasses
     *
     */
    readonly allLayouts: ItemProperties[];
    /**
     * Retrieves all available and active layouts and aggregate them their name
     *
     */
    readonly layoutsByZones: Map<string, any>;
    layout: ItemProperties;
    readonly propertyMap: PropertyMap;
    label(): string;
    labelForContext(name: string): string;
    zones(): string[];
    properties(key: string, defValue?: any): any;
    debugString(name: string): string;
    ngOnDestroy(): void;
}
