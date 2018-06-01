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
import {Component, ContentChildren, QueryList} from '@angular/core';
import {HeaderColumnGroup} from 'primeng/primeng';
import {DTRowComponent} from '../row/row.component';

/**
 * Column header group that can combine multiple columns into one.
 * Use to format column headers.
 *
 * See {@link DataTableComponent} for more explanation.
 */

@Component({
    selector: 'aw-dt-headerColumnGroup',
    template: ``
})
export class DTHeaderColumnGroupComponent extends HeaderColumnGroup
{

    @ContentChildren(DTRowComponent) rows: QueryList<any>;
}
