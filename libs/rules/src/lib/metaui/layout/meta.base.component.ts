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
import {AfterViewChecked} from '@angular/core';
import {assert, isPresent} from '../../core/utils/lang';
import {Environment} from '../../core/config/environment';
import {BaseFormComponent} from '../../components/core/base-form.component';
import {MetaContextComponent} from '../core/meta-context/meta-context.component';
import {Context, Snapshot} from '../core/context';
import {UIMeta} from '../core/uimeta';
import {ObjectMeta} from '../core/object-meta';


/**
 * Common component to setup the context and also create context snapshot for later user.
 */
export abstract class MetaBaseComponent extends BaseFormComponent implements AfterViewChecked {
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

  constructor(public env: Environment,
              protected _metaContext: MetaContextComponent) {
    super(env, _metaContext);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.updateMeta();
  }


  ngDoCheck(): void {
    this.updateMeta();

  }

  ngAfterViewChecked(): void {
  }


  protected updateMeta() {
    this.editing = this.context.booleanPropertyForKey(UIMeta.KeyEditing, false);
    if (this.editing) {
      this.object = this.context.values.get(ObjectMeta.KeyObject);
      this.contextSnapshot = this.context.snapshot();
    }
    this.doUpdate();
  }


  /**
   * Placeholder to be implemented by subclass. this method is triggered when we detect any
   * changes on the MetaContext
   */
  protected doUpdate(): void {
  }


  /**
   * Get the last saved context from the MetaContext component
   *
   */
  protected get context(): Context {
    if (isPresent(this._metaContext) && isPresent(this._metaContext.myContext())) {
      return this._metaContext.myContext();
    }

    assert(false, 'Should always have metaContext available');
  }


  isNestedContext(): boolean {
    return this.context.isNested;
  }

  // remove this ugly solution once I figure out custom value accessor that I can
  // provide as a expression
  properties(key: string, defValue: any = null): any {
    return isPresent(this.context) ? (isPresent(this.context.propertyForKey(key)) ?
      this.context.propertyForKey(key) : defValue) : defValue;

  }


  /**
   * Retrieves active context's properties
   *
   */
  aProperties(me: Context, key: string, defValue: any = null): any {
    const activeContext: Context = this._metaContext.activeContext();
    return isPresent(me) ? me.propertyForKey(key) : defValue;

  }


}

