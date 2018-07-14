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
import {Component, ViewEncapsulation} from '@angular/core';
import {Environment} from '@aribaui/core';
import {DomHandler} from 'primeng/primeng';
import {DTColumn2Component} from '../dt-column.component';


/**
 *
 *
 *
 *
 */
@Component({
    selector: 'aw-dt-detail-column-expand',
    templateUrl: 'dt-detail-row-expander.component.html',
    styleUrls: ['dt-detail-row-expander.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [DomHandler]

})
export class DTDetailRowExpanderComponent extends DTColumn2Component
{

    constructor(public env: Environment, public domHandler: DomHandler)
    {
        super(env, domHandler);

        // we dont want to show the row/column unless application says so
        this.isVisible = false;

        // default width of the selection control
        this.width = '45px';
    }


    ngOnInit(): void
    {
        // just to get around the check in parent class
        this.key = '';

        super.ngOnInit();
    }

    toggleExpansion(event: any, item: any): void
    {
        this.dt.detailRowExpansionState.toggle(item);
        event.stopPropagation();
    }

    calculateStyleClass(item: any): string
    {
        return this.dt.detailRowExpansionState.isExpanded(item) ?
            'icon-slim-arrow-down' : 'icon-slim-arrow-right';
    }
}

