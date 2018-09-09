import { BaseComponent } from '../../core/base.component';
import { Environment } from '@aribaui/core';
/**
 * Renders a Toggle Switch
 *
 * ### Example
 *
 * ```typescript
 *
 *      @Component({
 *          selector: 'myToggleSection' ,
 *          template: '<aw-toggle [model]="inputValue" [labelText]="labelText" >
 *              </aw-toggle>'
 *      })
 *      export class MyNoteComponent
 *      {
 *          inputValue: boolean = false;
 *          labelText: string = 'my label';
 *      }
 *
 * ```
 */
export declare class ToggleSwitchComponent extends BaseComponent {
    env: Environment;
    /**
     * toggle model
     */
    model: boolean;
    /**
     * label text
     */
    labelText: string;
    constructor(env: Environment);
    /**
     * click handler for toggle
     */
    changeHandler(): void;
}
