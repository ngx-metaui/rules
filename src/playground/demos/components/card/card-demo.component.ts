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
import {Component, ViewChild} from '@angular/core';
import {isPresent} from '@aribaui/core';
import {CardComponent} from '@aribaui/components';

const SUPPLIERS: Supplier[] = [
    {
        supplierName: 'Metpro',
        location: 'Palo Alto, CA, USA',
        contactPerson: [
            {
                name: 'John Davis',
                designation: 'Manufacturing lead'
            }
        ],
        preferred: true,
        qualified: true,
        incumbent: false
    },
    {
        supplierName: 'SSC Pumps',
        location: 'Palo Alto, CA, USA',
        contactPerson: [
            {
                name: 'Teri Williams',
                designation: 'Design manager'
            }
        ],
        preferred: true,
        qualified: true,
        incumbent: false
    },
    {
        supplierName: 'Haight Pumps',
        location: 'Morgan Hills, CA, USA',
        contactPerson: [
            {
                name: 'Tony Kent',
                designation: 'Factory manager'
            }
        ],
        preferred: false,
        qualified: true,
        incumbent: false
    },
    {
        supplierName: 'March Industries',
        location: 'Morgan Hills, CA, USA',
        contactPerson: [
            {
                name: 'John Davis',
                designation: 'Manufacturing lead'
            },
            {
                name: 'Teri Williams',
                designation: 'Design manager'
            },
            {
                name: 'Tony Kent',
                designation: 'Factory manager'
            },
            {
                name: 'John Davis',
                designation: 'Manufacturing lead'
            },
            {
                name: 'Teri Williams',
                designation: 'Design manager'
            }
        ],
        preferred: false,
        qualified: true,
        incumbent: true
    },
    {
        supplierName: 'Stamford Pump Industries Ltd',
        location: 'Gilory, CA, USA',
        contactPerson: [
            {
                name: 'John Davis',
                designation: 'Manufacturing lead'
            },
            {
                name: 'Teri Williams',
                designation: 'Design manager'
            },
            {
                name: 'Tony Kent',
                designation: 'Factory manager'
            },
            {
                name: 'John Davis',
                designation: 'Manufacturing lead'
            },
            {
                name: 'Teri Williams',
                designation: 'Design manager'
            },
            {
                name: 'Tony Kent',
                designation: 'Factory manager'
            },
            {
                name: 'John Davis',
                designation: 'Manufacturing lead'
            }
        ],
        preferred: true,
        qualified: false,
        incumbent: false
    }
];

@Component({
    templateUrl: './card-demo.component.html',
    styleUrls: ['./card-demo.component.scss']
})
export class CardDemoComponent
{
    suppliers = SUPPLIERS;
    events1: string = '';
    events2: string = '';
    events3: string = '';

    cards: {[name: string]: number} = {
        card3: 0,
        card4: 0,
        card5: 0,
        card6: 0,
        card7: 0,
        card8: 0
    };


    @ViewChild('withUserTempl')
    cardWithBody: CardComponent;

    onAction(cardNum: number, event: any): void
    {
        this.cards['card' + cardNum] = this.cards['card' + cardNum] + 1;

        if (cardNum === 8 && isPresent(this.cardWithBody)) {
            this.cardWithBody.useBodyTemplate = true;
        }
    }


    submitAction(element: string, supplier: Supplier)
    {
        console.log('Card-Demo: supplier was submitted: ' + supplier.supplierName);
        return (`'${supplier.supplierName}' submitted.\n`) + element;
    }

    selectAction(element: string, supplier: Supplier)
    {
        console.log('Card-Demo: supplier was selected: ' + supplier.supplierName);
        return (`'${supplier.supplierName}' selected.\n`) + element;
    }

    unselectAction(element: string, supplier: Supplier)
    {
        console.log('Card-Demo: supplier was un-selected: ' + supplier.supplierName);
        return (`'${supplier.supplierName}' un-selected.\n`) + element;
    }

    hoverSelectAction(element: string, supplier: Supplier)
    {
        console.log('Card-Demo: supplier was hover-selected: ' + supplier.supplierName);
        return (`'${supplier.supplierName}' hover-selected.\n`) + element;
    }
}

export class Supplier
{
    supplierName: string;
    location: string;
    contactPerson: ContactPerson[];
    preferred: boolean;
    qualified: boolean;
    incumbent: boolean;
}

export class ContactPerson
{
    name: string;
    designation: string;
}
