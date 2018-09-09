import { Environment } from '@aribaui/core';
import { DomHandler } from 'primeng/primeng';
import { DTColumn2Component } from '../dt-column.component';
/**
 *
 * Column implementation for the Multiselection where we show checkbox control
 *
 *
 */
export declare class DTMultiSelectColumnComponent extends DTColumn2Component {
    env: Environment;
    domHandler: DomHandler;
    constructor(env: Environment, domHandler: DomHandler);
}
