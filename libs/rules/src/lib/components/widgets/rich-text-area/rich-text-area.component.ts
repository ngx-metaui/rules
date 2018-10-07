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
import {Component, forwardRef, Inject, Input, Optional, SkipSelf} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Environment} from '../../../core/config/environment';
import {BaseFormComponent} from '../../core/base-form.component';
import {FormRowComponent} from '../../layouts/form-table/form-row/form-row.component';
import {distinctUntilChanged} from 'rxjs/operators';

/**
 * RichTextArea component represents a text editor which allows users to format text input.
 * The editor's toolbar is pre-configured to contain functionalities that are in our design.
 * @see {@link editor/editor.component.html}
 *
 *  ### Example
 *  ```
 *
 *  @Component({
 *    selector: 'rfx-event' ,
 *    template: `
 *
 *        <!-- Basic Usage. -->
 *        <aw-richtextarea [name]="'description'" [value]="description" placeHolder="put
 *        description">
 *        </aw-richtextarea>
 *
 *        <!-- Editor with Full functionality -->
 *      <aw-richtextarea [name]="'comment'" [type]="editorType" [value]="value"
 *      placeHolder="hold this">
 *      </aw-richtextarea>
 *    })
 *    export class MyComponent
 *    {
 *        description: string;
 *
 *        editorType:EditorType = EditorType.Full;
 *        value:String;
 *
 *        constructor ()
 *        {
 *        }
 *    }
 */

/**
 * Represents the different types of text editor. They are preconfigured with
 * functionality based on type. Use custom to add your own toolbar menu.
 */
export enum EditorType {
  Default,    // Default Editor supports Minimal set of functionality
  // [ bold | italic | underline | ordered | bullet | alignment]
  Full,       // The full list of functionality,
  TextFormat, // Functionalities that affects text formatting.
  Custom     // Custom toolbar.
}


export const EDITOR_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RichTextAreaComponent),
  multi: true
};


@Component({
  selector: 'aw-richtextarea',
  templateUrl: 'rich-text-area.component.html',
  styleUrls: ['rich-text-area.component.scss'],
  providers: [
    EDITOR_CONTROL_VALUE_ACCESSOR,
    {provide: BaseFormComponent, useExisting: forwardRef(() => RichTextAreaComponent)}
  ]

})
export class RichTextAreaComponent extends BaseFormComponent {
  /**
   * The type of the editor.  See EditorType for description.
   */
  @Input()
  type: EditorType;

  /**
   * A value used to save and read when rendering and updating this component
   */
  @Input()
  value: any = '';

  /**
   * Expose editorType so that it can be used in this components template.
   */
  EditorType: any = EditorType;


  constructor(public env: Environment,
              @SkipSelf() @Optional() @Inject(forwardRef(() => FormRowComponent))
              protected parentContainer: BaseFormComponent) {
    super(env, parentContainer);

    this.type = EditorType.Default;
    this.styleClass = 'default-editor';
  }


  ngOnInit() {
    super.ngOnInit();
    super.registerFormControl(this.value);

    this.formControl.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(val => {
      this.value = val;
      this.onModelChanged(this.value);
    });
  }

  /**
   * Internal. Please see ControlValueAccessor
   */
  writeValue(value: any) {
    if (value !== this.value) {
      this.value = value;
      this.formControl.setValue(value);
    }
  }
}
