/**
 *
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
 *
 */
import {DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Environment} from '../../core/config/environment';
import {AppConfig} from '../../core/config/app-config';


/**
 *  Base component shares common functionality among all the components (layouts, widgets).
 *
 */
export abstract class BaseComponent implements OnInit, OnChanges, DoCheck, OnDestroy {

  /**
   * Adds disabled flag to the component
   *
   */
  @Input()
  disabled: boolean = false;


  /**
   * Weather this component is visible
   * Default is false;
   */
  @Input()
  visible: boolean = false;

  /**
   * Tell  the component if we are in editing mode.
   *
   */
  @Input()
  editable?: boolean = true;

  /**
   * Every component have option to set a custom with
   *
   */
  @Input()
  width: any;

  /**
   * Every component have option to set a custom with
   */
  @Input()
  height: any;

  /**
   * optional css class which can be utilized by component
   */
  @Input()
  styleClass: any;

  /**
   * Removes padding from the component. Usually used when we are nesting other component with
   * its own grid.
   */
  @Input()
  omitPadding = false;

  /**
   * Class extension support register here any dynamic field that does not existing on the
   * class/component
   */
  extBindings: Map<string, any>;


  /**
   * Prefix for the correct asset path
   */
  assetFolder: string = 'assets';

  constructor(public env?: Environment) {
    this.extBindings = new Map<string, any>();
    this.omitPadding = false;
  }


  ngOnInit(): void {
    this.assetFolder = this.env.getValue(AppConfig.AssetFolder);
  }


  ngOnChanges(changes: SimpleChanges): void {
  }


  ngDoCheck(): void {
  }


  ngOnDestroy(): void {
  }
}


