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
import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {isPresent} from '../../core/utils/lang';


/**
 * When we have a custom component like dropdown, radiobuttonlist and
 * many more we want to provide a custom content to it like so:
 *
 * ```
 *  <aw-dropdown [list]="listOfUsers" let somehowGetItemOut>
 *      {{item.userName}}
 *
 *   <aw-dropdown
 *
 * ```
 * Who else would know how to render list of objects..
 *
 * But its not possible in current form. if I do not provide Angular some as they call it this
 * syntactic sugar *,
 *
 *
 * ```
 *  <aw-dropdown *mySugerDirective=.....>
 *      {{item.userName}}
 *
 *   <aw-dropdown
 * ```
 *
 *
 * then angular will not know  inside is a template and I wont be able to get hold of TemplateRef
 * inside the component
 *
 * So the only way I found (expecting I do not want to change anything in terms of bindings and the
 * signature I use it. I have to use it like this:
 *
 * ```
 *  <aw-dropdown [list]="listOfUsers" let somehowGetItemOut>
 *      <ng-template let-item> {{item.userName}}</ng-template>
 *
 *   <aw-dropdown
 *
 * ```
 *
 *  This way it could work. Since I am inside ngFor I want to render the item into the correct
 * viewContainer of ngFor's current item.
 *
 *  This way I can also expose item outside using Angular's special local variable called:
 * $implicit.
 *
 * This gets even more complex if we try to pass this template 2 levels down, like in case of
 * RadioButtonList. But later on I might want to refactor this into custom NG FOR
 *
 * @deprecated in favor of ngTemplateOutlet (will be removed in the next version)
 *
 */
@Directive({selector: '[embeddedItem]'})
export class EmbeddedItemDirective implements OnChanges {
  /**
   * Template we want to render N-Times
   */
  @Input()
  embeddedItem: TemplateRef<any>;

  @Input()
  set item(item: any) {
    this._implicitValue = item;
  }

  private _implicitValue: any;
  private _viewRef: EmbeddedViewRef<any>;


  constructor(private _viewContainer: ViewContainerRef) {
  }

  /**
   *
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (isPresent(this._viewRef)) {
      this._viewContainer.remove(this._viewContainer.indexOf(this._viewRef));
    }

    if (isPresent(this.embeddedItem)) {
      const context = new EmbededItem(this._implicitValue);
      this._viewRef = this._viewContainer.createEmbeddedView(this.embeddedItem, context);
    }
  }
}


/**
 * Wrapper class around Angular's EmbeddedViewRef.context()
 *
 */
export class EmbededItem {
  constructor(public $implicit: any) {
  }
}


