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
 */
import {Component, Input} from '@angular/core';
import {BaseComponent, SectionComponent} from '@aribaui/components';
import {Environment} from '@aribaui/core';
import {Invoice} from '../../domain/invoice';
import {MetaUIActionEvent} from '@aribaui/metaui';


@Component({
    templateUrl: './metaui-section.page.component.html',
    styleUrls: ['./metaui-section.page.component.scss']
})
export class MetaUISectionPageComponent extends BaseComponent
{
    op: string = 'view';
    myRequest: Invoice;

    constructor(public env: Environment)
    {
        super(env);

    }


    ngOnInit()
    {
        super.ngOnInit();

        setTimeout(() => {
            this.myRequest = new Invoice();
            this.myRequest.uniqueName = '6';
            this.myRequest.itemName = 'iPhone 8';
            this.myRequest.itemDescription = 'iPhone 8, 16gb';
            this.myRequest.supplier = 'Apple Inc.';
            this.myRequest.itemPrice = '123.11';
            this.myRequest.requestor = 'Dan John';
        }, 1);

    }

    onActionHandler(event: MetaUIActionEvent): void
    {
        if (event.eventName === 'onSaveAction') {
            (<SectionComponent>event.component).completeEditing();
        }

        if (event.eventName === 'onEdit' && event.cnxName === 'Lines') {

            alert('Adding supplier');
            (<SectionComponent>event.component).completeEditing();
        }
    }
}


@Component({
    selector: 'sec1',
    template: `<h3>This is participant section</h3>

        <p>
            This page has only simple H3 and paragraphs that has only some copied text from
             news server.
         </p>
         aa: {{oper}}
    `
})
export class Section2Component
{

    @Input()
    oper: string;

}


@Component({
    selector: 'sec2',
    template: `<h3>This is line item section</h3>
        <p>
            This page has only simple H3 and paragraphs that has only some copied text from
             news server.
         </p>

        ee:  {{oper}}
    `
})
export class Section3Component
{
    @Input()
    oper: string;
}




