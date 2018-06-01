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
import {Component} from '@angular/core';
import {BaseComponent, Money} from '@aribaui/components';
import {Environment, Resource} from '@aribaui/core';
import {CarRentalRequest} from '../../domain/carrentalrequest';
import {ApproverUser} from '../../domain/approver-user';


@Component({
    templateUrl: './metaui.page.component.html',
    styleUrls: ['./metaui.page.component.scss']
})
export class MetaUIPageComponent extends BaseComponent
{

    op: string = 'view';
    myRequest: CarRentalRequest;
    showDebugDlg: boolean = false;

    constructor(public env: Environment, private resource: Resource)
    {
        super(env);

    }


    ngOnInit()
    {
        super.ngOnInit();

        // this.er.bind(CarRentalRequest).get('1').subscribe((data: CarRentalRequest) =>
        // {
        //     console.log('data', data)
        //
        // });

        // simulate REST latency
        setTimeout(() =>
        {
            this.myRequest = new CarRentalRequest('Peter', 'Pan', 'ABC-123', new Date(),
                new Date(), 'San Jose', 'San Jose', ['Bmw X5'], ['GPS'],
                [new ApproverUser('1', 'Yu', 'Han', 10)], 'Some note', 'Good',
                new ApproverUser('10', 'Homer', 'Simson', 44),
                new Money(100));
        }, 50);

    }


    debug(): void
    {
        this.showDebugDlg = true;
    }


    onCreateAction(event: any): void
    {
        console.log('onCreateAction inside MetaForm:' + JSON.stringify(this.env.currentForm.value));
        this.op = 'create';
    }


    onEditAction(event: any): void
    {
        console.log('onEditAction inside MetaForm:' + JSON.stringify(this.env.currentForm.value));
        this.op = 'edit';
    }


    onViewAction(event: any): void
    {
        this.op = 'view';
        console.log('Cancel inside MetaForm:' + JSON.stringify(this.env.currentForm.value));
    }

}
