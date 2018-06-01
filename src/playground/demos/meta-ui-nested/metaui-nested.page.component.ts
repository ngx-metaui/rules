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
import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {BaseComponent} from '@aribaui/components';
import {Environment} from '@aribaui/core';
import {Invoice, InvHeader} from '../../domain/invoice';
import {MetaUIActionEvent} from '@aribaui/metaui';


@Component({
    templateUrl: './metaui-nested.page.component.html',
    styleUrls: ['./metaui-nested.page.component.scss']
})
export class MetaUINestedPageComponent extends BaseComponent implements OnInit
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

        this.myRequest = new Invoice();
        this.myRequest.uniqueName = '6';
        this.myRequest.itemName = 'iPhone 8';
        this.myRequest.itemDescription = 'iPhone 8, 16gb';
        this.myRequest.supplier = 'Apple Inc.';
        this.myRequest.itemPrice = '123.11';
        this.myRequest.requestor = 'Dan John';
    }

    onAction(event: MetaUIActionEvent): void
    {
        console.log(event);
    }

}


@Component({
    selector: 'sec1',
    template: `
         <m-context [pushNewContext]="true" [object]="header" operation="view" layout="Inspect" >
            <m-include-component></m-include-component>
        </m-context>
        <!--<aw-button (action)="handleClick($event)">Test</aw-button>-->
    `
})
export class NestedMetaComponent
{

    @Input()
    header: InvHeader;

    @Output()
    onClick: EventEmitter<MetaUIActionEvent> = new EventEmitter();


    handleClick(event: any): void
    {
        this.onClick.emit(new MetaUIActionEvent(this, 'onClick', 'onClick', event));
    }

}




