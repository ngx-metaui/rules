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
 *
 */
import { AfterViewChecked } from '@angular/core';
import { Environment } from '@aribaui/core';
import { BaseFormComponent } from '@aribaui/components';
import { MetaContextComponent } from '../core/meta-context/meta-context.component';
import { Context, Snapshot } from '../core/context';
/**
 * Common component to setup the context and also create context snapshot for later user.
 */
export declare abstract class MetaBaseComponent extends BaseFormComponent implements AfterViewChecked {
    env: Environment;
    protected _metaContext: MetaContextComponent;
    editing: boolean;
    /**
     * Need to capture current snapshot for edit operation as when we enter editing mode and user
     * start to change values the detection loop runs out of any push/pop cycle and any order and I
     * could not find a way how to detect consistent behavior where root compoennt start ngDoCheck,
     * child component trigger ngDoCheck, child finishes, root finishes.
     *
     * This only works when view is first time rendered, but not when making changes
     *
     */
    protected contextSnapshot: Snapshot;
    protected object: any;
    constructor(env: Environment, _metaContext: MetaContextComponent);
    ngOnInit(): void;
    ngDoCheck(): void;
    ngAfterViewChecked(): void;
    protected updateMeta(): void;
    /**
     * Placeholder to be implemented by subclass. this method is triggered when we detect any
     * changes on the MetaContext
     */
    protected doUpdate(): void;
    /**
     * Get the last saved context from the MetaContext component
     *
     */
    protected readonly context: Context;
    isNestedContext(): boolean;
    properties(key: string, defValue?: any): any;
    /**
     * Retrieves active context's properties
     *
     */
    aProperties(me: Context, key: string, defValue?: any): any;
}
