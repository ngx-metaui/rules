/**
 *
 * @license
 * Copyright 2017 SAP Ariba
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import {Component, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import {Environment, isPresent, isBlank} from '@aribaui/core';
import {DatatableComponent} from '@aribaui/components';

@Component({
    templateUrl: './datatable-demo.component.html',
    styleUrls: ['./datatable-demo.component.scss']
})
export class DatatableDemoComponent implements AfterViewInit
{
    /**
     *  List of items to show in the datatable.
     */
    items: any[];

    /**
     * Suppliers with cost for each item to be compared.
     */
    supplierItems: any[];

    /**
     * Additional Items to be added when the user clicks on add.
     */
    additionalItems: any;

    /**
     * The number of selected rows in the datatable. Buttons in the footer performance
     * actions on the selectedRows.
     */
    selectedRows: any[] = [];

    cars: any[];

    carList: any[];

    brands: any[];

    colors: any[];

    bSingleSortMode: boolean = true;

    sortMode: string = 'single';

    bSingleSelectionMode: boolean = true;

    multiselect: boolean = false;

    bInlineEditMode: boolean = true;

    editMode: string = 'inline';


    @ViewChild('crudDT')
    dataTable: DatatableComponent;


    constructor(protected element: ElementRef, public env: Environment)
    {
        // Initialize the items.
        this.items = [
            {
                id: 1, item: 'Mobile phones for new sales agents in Brazil', quantity: 50,
                cost: '25,000.00', tax: '10%', discount: '10%', total: '25,000.00 (fx)'
            },
            {
                id: 2, item: 'Notebook computers for IT in Argentina', quantity: 35,
                cost: '35,000.00', tax: '15%', discount: '15%', total: '35,000.00 (fx)'
            },
            {
                id: 3, item: 'New employee starter pack', quantity: 100, cost: '10,000.00',
                tax: '8%', discount: '8%', total: '10,0000.00 (fx)'
            }
        ];


        // Additional items in the list to be used when user clicks on add.
        this.additionalItems = [
            {
                id: 4, item: 'Conference room projectors in Palo Alto Office',
                quantity: 20, cost: '20,000.00', tax: '9.25%', discount: '9.25%',
                total: '20,000.00 (fx)'
            },
            {
                id: 5, item: 'Computer Monitors replacements', quantity: 100, cost: '50,000.00',
                tax: '10%', discount: '10%', total: '50,000.00 (fx)'
            },
            {
                id: 6, item: 'Server for data center in Santa Clara ', quantity: 35,
                cost: '700,000.00', tax: '10%', discount: '10%', total: '700,000.00 (fx)'
            },
            {
                id: 7, item: 'Marketing booklet for the upcoming company conference',
                quantity: 3000, cost: '60,0000.00', tax: '10%', discount: '10%',
                total: '60,000.00 (fx)'
            },
            {
                id: 8, item: 'Server for data center in Santa Clara ', quantity: 35,
                cost: '700,000.00', tax: '10%', discount: '10%', total: '700,000.00 (fx)'
            }
        ];

        this.supplierItems = [
            {
                id: 1, item: '1. SQUAREPIN 3-1/2" 13CR L80 9.2#BLUE Top',
                supplier1: 2100, supplier2: 2200, supplier3: 2300,
                supplier4: 2400, supplier5: 2500, supplier6: 2600,
                supplier7: 2700, supplier8: 2800, supplier9: 2900
            },
            {
                id: 2, item: '2. SQUAREPIN 4-1/2" 13CR L80 12.6#BLUE Top',
                supplier1: 2100, supplier2: 2200, supplier3: 2300,
                supplier4: 2400, supplier5: 2500, supplier6: 2600,
                supplier7: 2700, supplier8: 2800, supplier9: 2900
            },
            {
                id: 3, item: '3. SQUAREPIN 2-1/2" 10CR L80 5.2#BLUE Top',
                supplier1: 2100, supplier2: 2200, supplier3: 2300,
                supplier4: 2400, supplier5: 2500, supplier6: 2600,
                supplier7: 2700, supplier8: 2800, supplier9: 2900
            },

        ];


        this.cars = [
            {'vin': 'a1653d4d', 'brand': 'VW', 'year': 1998, 'color': 'White', 'price': 10000},
            {
                'vin': 'ddeb9b10', 'brand': 'Mercedes', 'year': 1985, 'color': 'Green',
                'price': 25000
            },
            {'vin': 'd8ebe413', 'brand': 'Jaguar', 'year': 1979, 'color': 'Silver', 'price': 30000},
            {'vin': 'aab227b7', 'brand': 'Audi', 'year': 1970, 'color': 'Black', 'price': 12000},
            {'vin': '631f7412', 'brand': 'Volvo', 'year': 1992, 'color': 'Red', 'price': 15500},
            {'vin': '7d2d22b0', 'brand': 'VW', 'year': 1993, 'color': 'Maroon', 'price': 40000},
            {'vin': '50e900ca', 'brand': 'Fiat', 'year': 1964, 'color': 'Blue', 'price': 25000},
            {
                'vin': '4bbcd603', 'brand': 'Renault', 'year': 1983, 'color': 'Maroon',
                'price': 22000
            },
            {'vin': '70214c7e', 'brand': 'Renault', 'year': 1961, 'color': 'Black', 'price': 19000},
            {'vin': 'ec229a92', 'brand': 'Audi', 'year': 1984, 'color': 'Brown', 'price': 36000},
            {'vin': '1083ee40', 'brand': 'VW', 'year': 1984, 'color': 'Silver', 'price': 215000},
            {'vin': '6e0da3ab', 'brand': 'Volvo', 'year': 1987, 'color': 'Silver', 'price': 32000},
            {'vin': '5aee636b', 'brand': 'Jaguar', 'year': 1995, 'color': 'Maroon', 'price': 20000},
            {'vin': '7cc43997', 'brand': 'Jaguar', 'year': 1984, 'color': 'Orange', 'price': 14000},
            {'vin': '88ec9f66', 'brand': 'Honda', 'year': 1989, 'color': 'Maroon', 'price': 36000},
            {'vin': 'f5a4a5f5', 'brand': 'BMW', 'year': 1986, 'color': 'Blue', 'price': 28000},
            {
                'vin': '15b9a5c9', 'brand': 'Mercedes', 'year': 1986, 'color': 'Orange',
                'price': 14000
            },
            {
                'vin': 'f7e18d01', 'brand': 'Mercedes', 'year': 1991, 'color': 'White',
                'price': 25000
            },
            {'vin': 'cec593d7', 'brand': 'VW', 'year': 1992, 'color': 'Blue', 'price': 36000},
            {'vin': 'd5bac4f0', 'brand': 'Renault', 'year': 2001, 'color': 'Blue', 'price': 25000},
            {'vin': '56b527c8', 'brand': 'Jaguar', 'year': 1990, 'color': 'Yellow', 'price': 52000},
            {'vin': '1ac011ff', 'brand': 'Audi', 'year': 1966, 'color': 'Maroon', 'price': 45000},
            {'vin': 'fc074185', 'brand': 'BMW', 'year': 1962, 'color': 'Blue', 'price': 54000},
            {'vin': '606ba663', 'brand': 'Honda', 'year': 1982, 'color': 'Blue', 'price': 22000},
            {
                'vin': 'd05060b8', 'brand': 'Mercedes', 'year': 2003, 'color': 'Silver',
                'price': 15000
            },
            {
                'vin': '46e4bbe8', 'brand': 'Mercedes', 'year': 1986, 'color': 'White',
                'price': 18000
            },
            {'vin': 'c29da0d7', 'brand': 'BMW', 'year': 1983, 'color': 'Brown', 'price': 32000},
            {'vin': '24622f70', 'brand': 'VW', 'year': 1973, 'color': 'Maroon', 'price': 36000},
            {'vin': '7f573d2c', 'brand': 'Mercedes', 'year': 1991, 'color': 'Red', 'price': 21000},
            {'vin': 'b69e6f5c', 'brand': 'Jaguar', 'year': 1993, 'color': 'Yellow', 'price': 16000},
            {'vin': 'ead9bf1d', 'brand': 'Fiat', 'year': 1968, 'color': 'Maroon', 'price': 43000},
            {
                'vin': 'bc58113e', 'brand': 'Renault', 'year': 1981, 'color': 'Silver',
                'price': 36000
            },
            {'vin': '2989d5b1', 'brand': 'Honda', 'year': 2006, 'color': 'Blue', 'price': 240000},
            {'vin': 'c243e3a0', 'brand': 'Fiat', 'year': 1990, 'color': 'Maroon', 'price': 15000},
            {'vin': 'e3d3ebf3', 'brand': 'Audi', 'year': 1996, 'color': 'White', 'price': 28000},
            {'vin': '45337e7a', 'brand': 'Mercedes', 'year': 1982, 'color': 'Blue', 'price': 14000},
            {'vin': '36e9cf7e', 'brand': 'Fiat', 'year': 2000, 'color': 'Orange', 'price': 26000},
            {
                'vin': '036bf135', 'brand': 'Mercedes', 'year': 1973, 'color': 'Black',
                'price': 22000
            },
            {'vin': 'ad612e9f', 'brand': 'Mercedes', 'year': 1975, 'color': 'Red', 'price': 45000},
            {'vin': '97c6e1e9', 'brand': 'Volvo', 'year': 1967, 'color': 'Green', 'price': 42000},
            {'vin': 'ae962274', 'brand': 'Volvo', 'year': 1982, 'color': 'Red', 'price': 36000},
            {'vin': '81f8972a', 'brand': 'BMW', 'year': 2007, 'color': 'Black', 'price': 56000},
            {'vin': 'f8506743', 'brand': 'Audi', 'year': 1975, 'color': 'Blue', 'price': 42000},
            {'vin': '596859d1', 'brand': 'Fiat', 'year': 2002, 'color': 'Green', 'price': 48000},
            {'vin': 'd83c1d9a', 'brand': 'Volvo', 'year': 1972, 'color': 'Black', 'price': 29000},
            {
                'vin': '32f41550', 'brand': 'Mercedes', 'year': 1978, 'color': 'Brown',
                'price': 17000
            },
            {'vin': 'c28cd2e4', 'brand': 'Volvo', 'year': 1982, 'color': 'Silver', 'price': 24000},
            {'vin': '80890dcc', 'brand': 'Audi', 'year': 1962, 'color': 'White', 'price': 36000},
            {'vin': '4bf1aeb5', 'brand': 'VW', 'year': 2000, 'color': 'Silver', 'price': 24000},
            {'vin': '45ca4786', 'brand': 'BMW', 'year': 1995, 'color': 'Maroon', 'price': 50000}
        ];

        this.carList = this.cars.slice(0, 3);

        this.brands = [
            'Audi', 'BMW', 'Fiat', 'Honda', 'Jaguar',
            'Mercedes', 'Renault', 'VW', 'Volvo'
        ];

        this.colors = [
            'White', 'Green', 'Silver', 'Black', 'Red', 'Maroon',
            'Brown', 'Orange', 'Blue'
        ];
    }

    ngOnInit()
    {

    }

    ngAfterViewInit(): void
    {

    }

    sortModeChanged(event: any)
    {
        if (this.bSingleSortMode) {
            this.sortMode = 'single';
        } else {
            this.sortMode = 'multiple';
        }
    }

    selectionModeChanged(event: any)
    {
        if (this.bSingleSelectionMode) {
            this.multiselect = false;
        } else {
            this.multiselect = true;
        }
    }

    editModeChanged(event: any)
    {
        if (this.bInlineEditMode) {
            this.editMode = 'inline';
        } else {
            this.editMode = 'wholeTable';
        }
    }

    add(event: any): void
    {

        if (isPresent(this.dataTable)) {
            let item = this.additionalItems.shift();

            this.dataTable.dataSource.insert(item);
        }
    }

    remove(event: any): void
    {
        if (this.selectedRows.length === 0) {
            return;
        }


        this.selectedRows.forEach((item) =>
        {
            this.dataTable.dataSource.remove(item);
        });

        this.selectedRows = [];
    }

    onRowSelect(data: any)
    {
        this.selectedRows.push(data);
    }

    onRowUnselect(data: any)
    {
        if (isBlank(this.selectedRows) && this.selectedRows.length === 0) {
            return;
        }

        this.selectedRows = this.selectedRows.filter((item) => data.identifier !== item.id);
    }
}
