import { Environment } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
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
export declare enum EditorType {
    Default = 0,
    Full = 1,
    TextFormat = 2,
    Custom = 3,
}
export declare const EDITOR_CONTROL_VALUE_ACCESSOR: any;
export declare class RichTextAreaComponent extends BaseFormComponent {
    env: Environment;
    protected parentContainer: BaseFormComponent;
    /**
     * The type of the editor.  See EditorType for description.
     */
    type: EditorType;
    /**
     * A value used to save and read when rendering and updating this component
     */
    value: any;
    /**
     * Expose editorType so that it can be used in this components template.
     */
    EditorType: any;
    constructor(env: Environment, parentContainer: BaseFormComponent);
    ngOnInit(): void;
    /**
     * Internal. Please see ControlValueAccessor
     */
    writeValue(value: any): void;
}
