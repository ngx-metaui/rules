import { Environment } from '@aribaui/core';
import { DomHandler } from 'primeng/primeng';
import { DTColumn2Component } from '../dt-column.component';
/**
 *
 * Custom column implementation to render detail row spaning its column across whole table width.
 *
 *
 */
export declare class DTDetailRowComponent extends DTColumn2Component {
    env: Environment;
    domHandler: DomHandler;
    /**
     * Defines current visibility for current data row using method reference
     *
     */
    isVisibleFn: (column: DTColumn2Component, item: any) => boolean;
    /**
     *
     * tells if we need to render a line between item row and its detail
     *
     */
    showRowLine: boolean;
    constructor(env: Environment, domHandler: DomHandler);
    ngOnInit(): void;
    /**
     * Check if we need to keep some leading TDs
     *
     */
    visibleLeadingCols(): number;
    /**
     *
     * Check if we can show detail row/column using either [isVisible] or [isVisibleFn] bindings.
     * Here can hook on application level custom method to decide if current item has detail row
     * or not
     *
     * Or we can use isVisible=true to tell all row have detail row
     *
     */
    showDetailRow(item: any): boolean;
}
