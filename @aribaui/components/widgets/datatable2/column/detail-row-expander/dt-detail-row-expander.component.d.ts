import { Environment } from '@aribaui/core';
import { DomHandler } from 'primeng/primeng';
import { DTColumn2Component } from '../dt-column.component';
/**
 *
 *
 *
 *
 */
export declare class DTDetailRowExpanderComponent extends DTColumn2Component {
    env: Environment;
    domHandler: DomHandler;
    constructor(env: Environment, domHandler: DomHandler);
    ngOnInit(): void;
    toggleExpansion(event: any, item: any): void;
    calculateStyleClass(item: any): string;
}
