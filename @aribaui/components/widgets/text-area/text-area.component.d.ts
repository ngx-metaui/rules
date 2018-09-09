import { Environment } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
/**
 * Renders html text area component

 *
 * ### Example
 *
 * ```typescript
 *
 *      @Component({
 *          selector: 'myNote' ,
 *          template: '<aw-text-area [value]="inputValue" [autoResize]="autoResize" >
 *              </aw-text-area>'
 *      })
 *      export class MyNoteComponent
 *      {
 *          inputValue: string = 'Some really long text';
 *          autoResize: false;
 *      }
 *
 * ```
 *  Note: if you are using this outside of FormTable please provide your own FormGroup
 */
export declare const TEXTAREA_CONTROL_VALUE_ACCESSOR: any;
export declare class TextAreaComponent extends BaseFormComponent {
    env: Environment;
    protected parentContainer: BaseFormComponent;
    /**
     *
     * A value used to store and read user input
     *
     */
    value: any;
    /**
     * Spefifies visible number of lines
     */
    rows: number;
    /**
     * Specifies visible width
     */
    columns: number;
    /**
     * when this option is TRUE and user starts typing it will maximize textarea's width and height
     */
    autoResize: boolean;
    constructor(env: Environment, parentContainer: BaseFormComponent);
    ngOnInit(): void;
    /**
     * Internal. Please see ControlValueAccessor
     *
     */
    writeValue(value: any): void;
}
