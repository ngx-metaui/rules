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
/* tslint:disable:no-unused-variable */
import {Component, ViewChild} from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {DatatableComponent} from '../datatable.component';
import {AribaCoreModule} from '@aribaui/core';
import {AWDatatableModule} from '../datatable.module';
import {
    AWButtonModule,
    AWDateAndTimeModule,
    AWInputFieldModule,
    AWStringFieldModule
} from '../../../../components/entry-components';
import '../../../../../../node_modules/primeng/resources/primeng.min.css';
import {FormControl, FormGroup} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AribaComponentsTestProviderModule} from '../../../ariba.component.provider.module';
import {AribaCoreI18nModule} from '../../../../core';

describe('Component: Datatable', () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TestDatatableBasicBehaviorComponent,
                TestDatatableTemplateBehaviorComponent,
                TestDatatableEditBehaviorComponent,
                TestDatatableSelectBehaviorComponent,
                DTngModelTestComponent,
                DTFormGroupTestComponent
            ],
            imports: [
                AribaCoreI18nModule,
                AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
                AribaComponentsTestProviderModule.forRoot(),
                AWDatatableModule,
                AWStringFieldModule,
                NoopAnimationsModule,
                AWButtonModule,
                AWInputFieldModule,
                AWDateAndTimeModule
            ]
        });

        TestBed.compileComponents();

    });

    describe('and its initial state and basic rendering', () =>
    {
        it('with rendered 3 lines that are part of the passed LIST.', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestDatatableBasicBehaviorComponent);
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            let cells = fixtureWrapper.nativeElement.querySelectorAll('.ui-cell-data');
            expect(cells.length).toBe(18);

            let rows = fixtureWrapper.nativeElement.querySelectorAll('tr.ui-widget-content');
            expect(rows.length).toBe(3);

            let subCells = rows[0].querySelectorAll('.ui-cell-data');
            expect(subCells.length).toBe(6);
            expect(subCells[0].textContent).toEqual('Mobile phones for new sales agents in Brazil');
            expect(subCells[1].textContent).toEqual('50');
            expect(subCells[2].textContent).toEqual('25,000.00');
            expect(subCells[3].textContent).toEqual('10%');
            expect(subCells[4].textContent).toEqual('10%');
            expect(subCells[5].textContent).toEqual('25,000.00 (fx)');

            subCells = rows[1].querySelectorAll('.ui-cell-data');
            expect(subCells.length).toBe(6);
            expect(subCells[0].textContent).toEqual('Notebook computers for IT in Argentina');
            expect(subCells[1].textContent).toEqual('35');
            expect(subCells[2].textContent).toEqual('35,000.00');
            expect(subCells[3].textContent).toEqual('15%');
            expect(subCells[4].textContent).toEqual('15%');
            expect(subCells[5].textContent).toEqual('35,000.00 (fx)');

            subCells = rows[2].querySelectorAll('.ui-cell-data');
            expect(subCells.length).toBe(6);
            expect(subCells[0].textContent).toEqual('New employee starter pack');
            expect(subCells[1].textContent).toEqual('100');
            expect(subCells[2].textContent).toEqual('10,000.00');
            expect(subCells[3].textContent).toEqual('8%');
            expect(subCells[4].textContent).toEqual('8%');
            expect(subCells[5].textContent).toEqual('100,000.00 (fx)');
        }));


        it('with correct number of columns that we specify in the template', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestDatatableBasicBehaviorComponent);
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            let items = fixtureWrapper.nativeElement.querySelectorAll('.ui-column-title');
            expect(items.length).toBe(6);
        }));


        it('with correct columns names when we use binding "header" for each column.',
            fakeAsync(() =>
            {
                let fixtureWrapper = TestBed.createComponent(TestDatatableBasicBehaviorComponent);
                fixtureWrapper.componentInstance.type = 1;
                fixtureWrapper.detectChanges();

                tick();
                fixtureWrapper.detectChanges();

                let items = fixtureWrapper.nativeElement.querySelectorAll('.ui-column-title');

                expect(items.length).toBe(6);
                expect(items[0].textContent.trim()).toEqual('item');
                expect(items[1].textContent.trim()).toEqual('quantity');
                expect(items[2].textContent.trim()).toEqual('cost');
                expect(items[3].textContent.trim()).toEqual('tax');
                expect(items[4].textContent.trim()).toEqual('discount');
                expect(items[5].textContent.trim()).toEqual('total');
            }));

        it('with columns represented by aw-dt-column tag', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestDatatableBasicBehaviorComponent);
            fixtureWrapper.detectChanges();

            let items = fixtureWrapper.nativeElement.querySelectorAll('.ui-column-title');
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            expect(items.length).toBe(6);

            expect(items[0].textContent.trim()).toEqual('item');
            expect(items[1].textContent.trim()).toEqual('quantity');
            expect(items[2].textContent.trim()).toEqual('cost');
            expect(items[3].textContent.trim()).toEqual('tax');
            expect(items[4].textContent.trim()).toEqual('discount');
            expect(items[5].textContent.trim()).toEqual('total');
        }));


        it('with column class "dt-column-data"', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestDatatableBasicBehaviorComponent);
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            let items = fixtureWrapper.nativeElement.querySelectorAll('td.dt-column-data');

            expect(items.length).toBe(18);
        }));


        it('having immutable list of values so adding new item to list will not change # of rows',
            fakeAsync(() =>
            {
                let fixtureWrapper = TestBed.createComponent(TestDatatableBasicBehaviorComponent);
                fixtureWrapper.detectChanges();

                tick();
                fixtureWrapper.detectChanges();

                let items = fixtureWrapper.nativeElement.querySelectorAll('td.dt-column-data');
                expect(items.length).toBe(18);

                fixtureWrapper.componentInstance.items.push({
                    id: 3, item: 'New employee starter pack', quantity: 100, cost: '10,000.00',
                    tax: '8%', discount: '8%', total: '10,0000.00 (fx)'
                });

                tick();
                fixtureWrapper.detectChanges();

                expect(items.length).toBe(18);
            }));


        it('with rendered rows represented by "aw-dt-row"',
            fakeAsync(() =>
            {
                let fixtureWrapper = TestBed.createComponent(TestDatatableBasicBehaviorComponent);
                fixtureWrapper.detectChanges();

                tick();
                fixtureWrapper.detectChanges();

                let cells = fixtureWrapper.nativeElement.querySelectorAll('.ui-cell-data');
                expect(cells.length).toBe(18);

                let rows = fixtureWrapper.nativeElement.querySelectorAll('tr.ui-widget-content');
                expect(rows.length).toBe(3);
            }));

        //
        // xit('should throw error when two column names are the same',
        //     () =>
        //     {
        //         // TODO: The feature is not implemented yet.
        //         let fixtureWrapper = TestBed
        // .createComponent(TestDatatableBasicBehaviorComponent);
        //         fixtureWrapper.componentInstance.type = 2;
        //         fixtureWrapper.detectChanges();
        //
        //         let items = fixtureWrapper.nativeElement.querySelectorAll('.ui-column-title');
        //         fixtureWrapper.detectChanges();
        //
        //         expect(items.length).toBe(6);
        //     });


        it('should not fail when passed LIST is undefined', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestDatatableBasicBehaviorComponent);
            fixtureWrapper.componentInstance.type = 3;
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            let items = fixtureWrapper.nativeElement.querySelectorAll('.ui-column-title');

            expect(items.length).toBe(6);
            expect(items[0].textContent.trim()).toEqual('item');
            expect(items[1].textContent.trim()).toEqual('quantity');
            expect(items[2].textContent.trim()).toEqual('cost');
            expect(items[3].textContent.trim()).toEqual('tax');
            expect(items[4].textContent.trim()).toEqual('discount');
            expect(items[5].textContent.trim()).toEqual('total');
        }));


        it('should not fail when passed LIST is null', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestDatatableBasicBehaviorComponent);
            fixtureWrapper.componentInstance.type = 4;
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            let items = fixtureWrapper.nativeElement.querySelectorAll('.ui-column-title');


            expect(items.length).toBe(6);
            expect(items[0].textContent.trim()).toEqual('item');
            expect(items[1].textContent.trim()).toEqual('quantity');
            expect(items[2].textContent.trim()).toEqual('cost');
            expect(items[3].textContent.trim()).toEqual('tax');
            expect(items[4].textContent.trim()).toEqual('discount');
            expect(items[5].textContent.trim()).toEqual('total');
        }));


        it('should refresh the rows when list changes as a whole object',
            fakeAsync((() =>
            {
                let fixtureWrapper = TestBed.createComponent(TestDatatableBasicBehaviorComponent);
                fixtureWrapper.detectChanges();

                tick();
                fixtureWrapper.detectChanges();

                let items = fixtureWrapper.nativeElement.querySelectorAll('td.dt-column-data');

                expect(items.length).toBe(18);
                let item = [
                    {
                        id: 4, item: 'New employee starter pack', quantity: 100, cost: '10,000.00',
                        tax: '8%', discount: '8%', total: '10,0000.00 (fx)'
                    }
                ];
                fixtureWrapper.componentInstance.items =
                    [...fixtureWrapper.componentInstance.items, ...item];

                tick();
                fixtureWrapper.detectChanges();

                tick();
                fixtureWrapper.detectChanges();

                items = fixtureWrapper.nativeElement.querySelectorAll('td.dt-column-data');
                expect(items.length).toBe(24);
            })));


        it('items passed to the datatable should be displayed. ', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestDatatableBasicBehaviorComponent);
            fixtureWrapper.detectChanges();


            tick();
            fixtureWrapper.detectChanges();

            let items = fixtureWrapper.nativeElement.querySelectorAll('td.dt-column-data');

            expect(items[0].textContent.trim())
                .toEqual(fixtureWrapper.componentInstance.items[0].item);
            expect(items[1].textContent.trim()).toEqual(
                fixtureWrapper.componentInstance.items[0].quantity.toString());
            expect(items[2].textContent.trim()).toEqual(
                fixtureWrapper.componentInstance.items[0].cost);
            expect(items[3].textContent.trim())
                .toEqual(fixtureWrapper.componentInstance.items[0].tax);
            expect(items[4].textContent.trim()).toEqual(
                fixtureWrapper.componentInstance.items[0].discount);
            expect(items[5].textContent.trim()).toEqual(
                fixtureWrapper.componentInstance.items[0].total);
        }));

    });

    describe('and its ability to use custom templates for column body', () =>
    {
        it('with custom rendered 1st column having wrappped content with html span and' +
            ' class=test-red', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestDatatableTemplateBehaviorComponent);
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            let items = fixtureWrapper.nativeElement.querySelectorAll('.test-red');
            expect(items.length).toBe(3);
        }));

        it('with custom component aw-string that takes value and render it', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestDatatableTemplateBehaviorComponent);
            fixtureWrapper.componentInstance.type = 1;
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            let items = fixtureWrapper.nativeElement.querySelectorAll('.w-string-field');
            expect(items.length).toBe(3);
        }));


        it('can also render button and fire action that will carry on current context (column,' +
            ' value)', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestDatatableTemplateBehaviorComponent);
            fixtureWrapper.componentInstance.type = 2;
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            let buttons = fixtureWrapper.nativeElement.querySelectorAll('button');
            expect(buttons.length).toBe(3);

            buttons[0].click();
            tick();
            expect(fixtureWrapper.componentInstance.obj)
                .toEqual('Mobile phones for new sales agents in Brazil');

            buttons[1].click();
            tick();
            expect(fixtureWrapper.componentInstance.obj)
                .toEqual('Notebook computers for IT in Argentina');

            buttons[2].click();
            tick();
            expect(fixtureWrapper.componentInstance.obj).toEqual('New employee starter pack');
        }));

    });


    describe('and editability support where', () =>
    {
        xit('can turn all cells into editable mode when "editMode" is wholeTable', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestDatatableEditBehaviorComponent);

            fixtureWrapper.componentInstance.datatable.editMode = 'wholeTable';
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            let i = 0;
            let awCols = fixtureWrapper.componentInstance.datatable.cols.toArray();

            if (fixtureWrapper.componentInstance.datatable.dataTable &&
                fixtureWrapper.componentInstance.datatable.dataTable.cols) {

                fixtureWrapper.componentInstance.datatable.dataTable.cols.forEach((dtCol) =>
                {
                    fixtureWrapper.componentInstance.datatable.editable = false;
                    dtCol.bodyTemplate = awCols[i].editorTemplate;
                    // dtCol.editorTemplate = null;
                    i++;
                });
            }
            tick();
            fixtureWrapper.detectChanges();
            let eles = fixtureWrapper.nativeElement.querySelectorAll('aw-input-field');
            expect(eles.length).toBe(6);

            for (i = 0; i < eles.length; i++) {
                if (i % 2 === 0) {
                    // inside 'ui-cell-data' as a body template.
                    expect(getComputedStyle(eles[i].parentNode).display).toEqual('inline');
                } else {
                    // inside 'ui-cell-editor' which are invisible.
                    expect(getComputedStyle(eles[i].parentNode).display).toEqual('none');
                }
            }
        }));

        it('make editable only single cell when cells gets active when "editMode" is inline',
            fakeAsync(() =>
            {
                let fixtureWrapper = TestBed.createComponent(TestDatatableEditBehaviorComponent);

                fixtureWrapper.componentInstance.datatable.editMode = 'inline';
                fixtureWrapper.detectChanges();

                tick();
                fixtureWrapper.detectChanges();

                let i = 0;
                let awCols = fixtureWrapper.componentInstance.datatable.cols.toArray();

                if (fixtureWrapper.componentInstance.datatable.dataTable &&
                    fixtureWrapper.componentInstance.datatable.dataTable.cols) {

                    fixtureWrapper.componentInstance.datatable.dataTable.cols.forEach((dtCol) =>
                    {
                        fixtureWrapper.componentInstance.datatable.editable = true;
                        dtCol.bodyTemplate = awCols[i].bodyTemplate;
                        dtCol.editorTemplate = awCols[i].editorTemplate;

                        i++;
                    });
                }

                fixtureWrapper.detectChanges();
                let eles = fixtureWrapper.nativeElement.querySelectorAll('aw-input-field');
                // click on 'ui-data-cell' element.
                eles[0].parentNode.click();

                tick(100);
                fixtureWrapper.detectChanges();

                eles = fixtureWrapper.nativeElement.querySelectorAll('aw-input-field');
                expect(eles.length).toBe(3);
                expect(getComputedStyle(eles[0].parentNode).display).toEqual('block');
                expect(getComputedStyle(eles[1].parentNode).display).toEqual('none');
                expect(getComputedStyle(eles[2].parentNode).display).toEqual('none');

            }));

        it('can have custom editor template for date field rendered as aw-date-time',
            fakeAsync(() =>
            {
                let fixtureWrapper = TestBed.createComponent(TestDatatableEditBehaviorComponent);

                fixtureWrapper.componentInstance.datatable.editMode = 'inline';
                fixtureWrapper.componentInstance.type = 1;
                fixtureWrapper.detectChanges();

                tick();
                fixtureWrapper.detectChanges();


                let i = 0;
                let awCols = fixtureWrapper.componentInstance.datatable.cols.toArray();

                if (fixtureWrapper.componentInstance.datatable.dataTable &&
                    fixtureWrapper.componentInstance.datatable.dataTable.cols) {

                    fixtureWrapper.componentInstance.datatable.dataTable.cols.forEach((dtCol) =>
                    {
                        fixtureWrapper.componentInstance.datatable.editable = true;
                        dtCol.bodyTemplate = awCols[i].bodyTemplate;
                        dtCol.editorTemplate = awCols[i].editorTemplate;

                        i++;
                    });
                }

                fixtureWrapper.detectChanges();
                let eles = fixtureWrapper.nativeElement.querySelectorAll('.ui-cell-data');
                // console.log(eles[5]);
                // click on 'ui-data-cell' element.
                eles[5].click();

                tick(100);
                fixtureWrapper.detectChanges();

                eles = fixtureWrapper.nativeElement.querySelectorAll('aw-date-time');
                expect(eles.length).toBe(3);
                expect(getComputedStyle(eles[0].parentNode).display).toEqual('block');
                expect(getComputedStyle(eles[1].parentNode).display).toEqual('none');
                expect(getComputedStyle(eles[2].parentNode).display).toEqual('none');

            }));

        xit('should switch all the fields to readonly when we switch "editMode" from "wholeTable"' +
            ' to "inline" ', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestDatatableEditBehaviorComponent);

            fixtureWrapper.componentInstance.datatable.editMode = 'wholeTable';
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            let i = 0;
            let awCols = fixtureWrapper.componentInstance.datatable.cols.toArray();

            if (fixtureWrapper.componentInstance.datatable.dataTable &&
                fixtureWrapper.componentInstance.datatable.dataTable.cols) {

                fixtureWrapper.componentInstance.datatable.dataTable.cols.forEach((dtCol) =>
                {
                    fixtureWrapper.componentInstance.datatable.editable = false;
                    dtCol.bodyTemplate = awCols[i].editorTemplate;
                    // dtCol.editorTemplate = null;
                    i++;
                });
            }
            tick();
            fixtureWrapper.detectChanges();
            let eles = fixtureWrapper.nativeElement.querySelectorAll('aw-input-field');
            expect(eles.length).toBe(6);

            for (i = 0; i < eles.length; i++) {
                if (i % 2 === 0) {
                    // inside 'ui-cell-data' as a body template.
                    expect(getComputedStyle(eles[i].parentNode).display).toEqual('inline');
                } else {
                    // inside 'ui-cell-editor' which are invisible.
                    expect(getComputedStyle(eles[i].parentNode).display).toEqual('none');
                }
            }

            // switch to "inline".
            fixtureWrapper.componentInstance.datatable.editMode = 'inline';
            i = 0;
            awCols = fixtureWrapper.componentInstance.datatable.cols.toArray();

            if (fixtureWrapper.componentInstance.datatable.dataTable &&
                fixtureWrapper.componentInstance.datatable.dataTable.cols) {

                fixtureWrapper.componentInstance.datatable.dataTable.cols.forEach((dtCol) =>
                {
                    fixtureWrapper.componentInstance.datatable.editable = true;
                    dtCol.bodyTemplate = awCols[i].bodyTemplate;
                    dtCol.editorTemplate = awCols[i].editorTemplate;

                    i++;
                });
            }
            fixtureWrapper.detectChanges();

            eles = fixtureWrapper.nativeElement.querySelectorAll('aw-input-field');
            for (i = 0; i < eles.length; i++) {
                expect(getComputedStyle(eles[i].parentNode).display).toEqual('none');
            }
        }));
    });


    describe('and single selection support', () =>
    {
        it('should get selected row and get nothing when unselected it.', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestDatatableSelectBehaviorComponent);

            fixtureWrapper.componentInstance.datatable.multiselect = false;
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            let eles = fixtureWrapper.nativeElement.querySelectorAll('.ui-radiobutton-box');
            expect(eles.length).toBe(3);

            eles[0].click();
            tick(100);
            let isArray = Array.isArray(fixtureWrapper.componentInstance.datatable.selectedRows);
            expect(isArray).toBeFalsy();
            expect(fixtureWrapper.componentInstance.selectedItem).toBe(fixtureWrapper
                .componentInstance.items[0]);

            eles[1].click();
            tick(100);
            isArray = Array.isArray(fixtureWrapper.componentInstance.datatable.selectedRows);
            expect(isArray).toBeFalsy();
            expect(fixtureWrapper.componentInstance.selectedItem).toBe(fixtureWrapper
                .componentInstance.items[1]);

        }));

    });


    describe('and multi selection support', () =>
    {
        it('should get selected correct rows when select/unselect', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestDatatableSelectBehaviorComponent);
            fixtureWrapper.componentInstance.multiselect = true;
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            let eles = fixtureWrapper.nativeElement.querySelectorAll('.ui-chkbox-box');
            expect(eles.length).toBe(4);

            eles[1].click();
            tick(100);
            let isArray = Array.isArray(fixtureWrapper.componentInstance.datatable.selectedRows);
            expect(isArray).toBeTruthy();
            expect(fixtureWrapper.componentInstance.datatable.selectedRows.length).toBe(1);
            expect(fixtureWrapper.componentInstance.datatable.selectedRows[0])
                .toBe(fixtureWrapper.componentInstance.items[0]);

            eles[2].click();
            tick(100);
            isArray = Array.isArray(fixtureWrapper.componentInstance.datatable.selectedRows);
            expect(isArray).toBeTruthy();
            expect(fixtureWrapper.componentInstance.datatable.selectedRows.length).toBe(2);
            expect(fixtureWrapper.componentInstance.datatable.selectedRows[0])
                .toBe(fixtureWrapper.componentInstance.items[0]);
            expect(fixtureWrapper.componentInstance.datatable.selectedRows[1])
                .toBe(fixtureWrapper.componentInstance.items[1]);

            eles[1].click();
            tick(100);
            isArray = Array.isArray(fixtureWrapper.componentInstance.datatable.selectedRows);
            expect(isArray).toBeTruthy();
            expect(fixtureWrapper.componentInstance.datatable.selectedRows.length).toBe(1);
            expect(fixtureWrapper.componentInstance.datatable.selectedRows[0])
                .toBe(fixtureWrapper.componentInstance.items[1]);
        }));
    });

    describe('and ngModel support', () =>
    {

        it('should render initialized list with [(ngMode)] and display 3 item',
            fakeAsync(() =>
            {
                let fixtureWrapper = TestBed.createComponent(DTngModelTestComponent);
                fixtureWrapper.detectChanges();

                tick();
                fixtureWrapper.detectChanges();

                let rows = fixtureWrapper.nativeElement.querySelectorAll('tr.ui-widget-content');
                expect(rows.length).toBe(3);

            }));


        it('should reflect changes inside datatable and propagate them DTngModelTestComponent ',
            fakeAsync(() =>
            {
                let fixtureWrapper = TestBed.createComponent(DTngModelTestComponent);
                fixtureWrapper.detectChanges();

                tick();
                fixtureWrapper.detectChanges();

                let rows = fixtureWrapper.nativeElement.querySelectorAll('tr.ui-widget-content');
                expect(rows.length).toBe(3);

                fixtureWrapper.componentInstance.datatable.dataSource.insert(
                    {
                        id: 4, item: 'Test Item 4', quantity: 50,
                        cost: '25,000.00', tax: '10%', discount: '10%', total: '25,000.00 (fx)',
                        creationDate: new Date(2000, 1, 1)
                    }
                );

                tick();
                fixtureWrapper.detectChanges();
                // tick();
                // fixtureWrapper.detectChanges();

                expect(fixtureWrapper.componentInstance.items.length).toBe(4);

            }));
    });


    describe('and FormGroup support', () =>
    {

        it('should render initialized list with [(ngMode)] and display 3 item',
            fakeAsync(() =>
            {
                let fixtureWrapper = TestBed.createComponent(DTFormGroupTestComponent);
                fixtureWrapper.detectChanges();

                tick();
                fixtureWrapper.detectChanges();

                let rows = fixtureWrapper.nativeElement.querySelectorAll('tr.ui-widget-content');
                expect(rows.length).toBe(3);

            }));


        it('should reflect changes inside datatable and propagate them DTngModelTestComponent ',
            fakeAsync(() =>
            {
                let fixtureWrapper = TestBed.createComponent(DTFormGroupTestComponent);
                fixtureWrapper.detectChanges();

                tick();
                fixtureWrapper.detectChanges();

                let rows = fixtureWrapper.nativeElement.querySelectorAll('tr.ui-widget-content');
                expect(rows.length).toBe(3);

                fixtureWrapper.componentInstance.datatable.dataSource.insert(
                    {
                        id: 4, item: 'Test Item 4', quantity: 50,
                        cost: '25,000.00', tax: '10%', discount: '10%', total: '25,000.00 (fx)',
                        creationDate: new Date(2000, 1, 1)
                    }
                );

                tick();
                fixtureWrapper.detectChanges();

                expect(fixtureWrapper.componentInstance.datatable.formControl.value.length)
                    .toBe(4);

            }));
    });

});


/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
            <aw-datatable [list]="items" *ngIf="type === 0">
                <aw-dt-column label="item" field="item"></aw-dt-column>
                <aw-dt-column label="quantity" field="quantity"></aw-dt-column>
                <aw-dt-column label="cost"  field="cost"></aw-dt-column>
                <aw-dt-column label="tax" field="tax"></aw-dt-column>
                <aw-dt-column label="discount" field="discount"></aw-dt-column>
                <aw-dt-column label="total" field="total"></aw-dt-column>
            </aw-datatable>
            <aw-datatable [list]="items" *ngIf="type === 1">
                <aw-dt-column header="item" field="item"></aw-dt-column>
                <aw-dt-column header="quantity" field="quantity"></aw-dt-column>
                <aw-dt-column header="cost"  field="cost"></aw-dt-column>
                <aw-dt-column header="tax" field="tax"></aw-dt-column>
                <aw-dt-column header="discount" field="discount"></aw-dt-column>
                <aw-dt-column header="total" field="total"></aw-dt-column>
            </aw-datatable>
            <aw-datatable [list]="items" *ngIf="type === 2">
                <aw-dt-column header="item" field="item"></aw-dt-column>
                <aw-dt-column header="item" field="item"></aw-dt-column>
                <aw-dt-column header="cost"  field="cost"></aw-dt-column>
                <aw-dt-column header="tax" field="tax"></aw-dt-column>
                <aw-dt-column header="discount" field="discount"></aw-dt-column>
                <aw-dt-column header="total" field="total"></aw-dt-column>
            </aw-datatable>
            <aw-datatable [list]="items1" *ngIf="type === 3">
                <aw-dt-column label="item" field="item"></aw-dt-column>
                <aw-dt-column label="quantity" field="quantity"></aw-dt-column>
                <aw-dt-column label="cost"  field="cost"></aw-dt-column>
                <aw-dt-column label="tax" field="tax"></aw-dt-column>
                <aw-dt-column label="discount" field="discount"></aw-dt-column>
                <aw-dt-column label="total" field="total"></aw-dt-column>
            </aw-datatable>
            <aw-datatable [list]="items2" *ngIf="type === 4">
                <aw-dt-column label="item" field="item"></aw-dt-column>
                <aw-dt-column label="quantity" field="quantity"></aw-dt-column>
                <aw-dt-column label="cost"  field="cost"></aw-dt-column>
                <aw-dt-column label="tax" field="tax"></aw-dt-column>
                <aw-dt-column label="discount" field="discount"></aw-dt-column>
                <aw-dt-column label="total" field="total"></aw-dt-column>
            </aw-datatable>
            `,
})
    /* jshint ignore:end */
class TestDatatableBasicBehaviorComponent
{
    @ViewChild(DatatableComponent)
    datatable: DatatableComponent;

    items: any[];

    items1: any[];
    items2: any[] = null;

    type: number = 0;

    constructor()
    {
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
                tax: '8%', discount: '8%', total: '100,000.00 (fx)'
            }
        ];
    }
}


/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
            <aw-datatable [list]="items">
                <aw-dt-column label="Item" field="item">
                    <ng-template let-col let-item="rowData" pTemplate="body" *ngIf="type===0">
                        <span class="test-red">{{item[col.field]}}</span>
                    </ng-template>
                    <ng-template let-col let-item="rowData" pTemplate="body" *ngIf="type===1">
                        <aw-string value="{{item[col.field]}}"></aw-string>
                    </ng-template>
                    <ng-template let-col let-item="rowData" pTemplate="body" *ngIf="type===2">
                        <aw-button type="submit" name="Button" (action)="onClicked($event)"
                                   value="{{item[col.field]}}">
                            Button
                        </aw-button>
                    </ng-template>
                </aw-dt-column>
                <aw-dt-column field="quantity" label="Quantity">
                </aw-dt-column>
                <aw-dt-column label="Cost"  field="cost"></aw-dt-column>
                <aw-dt-column label="Tax" field="tax"></aw-dt-column>
                <aw-dt-column label="Total" field="total"></aw-dt-column>
            </aw-datatable>
            `,
    styles: ['.test-red { color: red; }']
})
    /* jshint ignore:end */
class TestDatatableTemplateBehaviorComponent
{
    @ViewChild(DatatableComponent)
    datatable: DatatableComponent;

    type: Number = 0;

    items: any[];

    obj: any;

    constructor()
    {
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
                tax: '8%', discount: '8%', total: '100,000.00 (fx)'
            }
        ];
    }

    onClicked($event: any)
    {
        this.obj = $event;
    }
}

/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
            <aw-datatable [list]="items" [editMode]="editMode">
                <aw-dt-column header="Item" field="item" [editable]="true">
                    <ng-template pTemplate="editor" let-col let-item="rowData">
                        <aw-input-field [type]="'string'" [(ngModel)]="item[col.field]">
                        </aw-input-field>
                    </ng-template>
                </aw-dt-column>
                <aw-dt-column header="Quantity" field="quantity"></aw-dt-column>
                <aw-dt-column header="Cost"  field="cost"></aw-dt-column>
                <aw-dt-column header="Tax" field="tax"></aw-dt-column>
                <aw-dt-column header="Total" field="total"></aw-dt-column>
                <aw-dt-column header="Create Date" field="creationDate"
                              [editable]="true" *ngIf="type===1">
                    <ng-template pTemplate="editor" let-col let-item="rowData">
                        <aw-date-time [value]="item[col.field]" [editable]="true"></aw-date-time>
                    </ng-template>
                </aw-dt-column>
            </aw-datatable>
            `,
})
    /* jshint ignore:end */
class TestDatatableEditBehaviorComponent
{
    @ViewChild(DatatableComponent)
    datatable: DatatableComponent;

    type: Number = 0;

    items: any[];

    editMode: string = 'wholeTable';

    constructor()
    {
        this.items = [
            {
                id: 1, item: 'Mobile phones for new sales agents in Brazil', quantity: 50,
                cost: '25,000.00', tax: '10%', discount: '10%', total: '25,000.00 (fx)',
                creationDate: new Date(2000, 1, 1)
            },
            {
                id: 2, item: 'Notebook computers for IT in Argentina', quantity: 35,
                cost: '35,000.00', tax: '15%', discount: '15%', total: '35,000.00 (fx)',
                creationDate: new Date(2002, 2, 2)
            },
            {
                id: 3, item: 'New employee starter pack', quantity: 100, cost: '10,000.00',
                tax: '8%', discount: '8%', total: '100,000.00 (fx)',
                creationDate: new Date(2010, 11, 10)
            }
        ];
    }
}

/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
            <aw-datatable [list]="items" [multiselect]="multiselect" dataKey="id"
                          (onRowSelected)="onRowSelected($event)"
                          (onRowUnselected)="onRowUnselected($event)">
                <aw-dt-column label="item" field="item" [sortable]="true"></aw-dt-column>
                <aw-dt-column label="quantity" field="quantity" [sortable]="true"></aw-dt-column>
                <aw-dt-column label="cost"  field="cost"></aw-dt-column>
                <aw-dt-column label="tax" field="tax"></aw-dt-column>
                <aw-dt-column label="discount" field="discount" [sortable]="true"></aw-dt-column>
                <aw-dt-column label="total" field="total"></aw-dt-column>
            </aw-datatable>
            `,
})
    /* jshint ignore:end */
class TestDatatableSelectBehaviorComponent
{
    @ViewChild(DatatableComponent)
    datatable: DatatableComponent;

    items: any[];

    // for multi selection.
    selectedItems: Set<any> = new Set();
    // for single selection.
    selectedItem: any;

    multiselect = false;

    constructor()
    {
        this.items = [
            {
                id: 1, item: 'Mobile phones for new sales agents in Brazil', quantity: 50,
                cost: '25,000.00', tax: '10%', discount: '10%', total: '25,000.00 (fx)',
                creationDate: new Date(2000, 1, 1)
            },
            {
                id: 2, item: 'Notebook computers for IT in Argentina', quantity: 35,
                cost: '35,000.00', tax: '15%', discount: '15%', total: '35,000.00 (fx)',
                creationDate: new Date(2002, 2, 2)
            },
            {
                id: 3, item: 'New employee starter pack', quantity: 100, cost: '10,000.00',
                tax: '8%', discount: '8%', total: '100,000.00 (fx)',
                creationDate: new Date(2010, 11, 10)
            }
        ];
    }

    onRowSelected($event: any)
    {
        if (Array.isArray($event)) {
            let items: any[] = $event;
            items.forEach((item) =>
            {
                this.selectedItems.add(item);
            });
        } else {
            this.selectedItem = $event;
            this.selectedItems.add($event);
        }
    }

    onRowUnselected($event: any)
    {
        if (Array.isArray($event)) {
            let items: any[] = $event;
            items.forEach((item) =>
            {
                this.selectedItems.delete(item);
            });
        } else {
            this.selectedItems.delete($event);
            this.selectedItem = null;
        }
    }
}


/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
            <aw-datatable [(ngModel)]="items">
                <aw-dt-column label="item" field="item"></aw-dt-column>
                <aw-dt-column label="quantity" field="quantity" ></aw-dt-column>
                <aw-dt-column label="cost"  field="cost"></aw-dt-column>
                <aw-dt-column label="tax" field="tax"></aw-dt-column>
                <aw-dt-column label="discount" field="discount"></aw-dt-column>
                <aw-dt-column label="total" field="total"></aw-dt-column>
            </aw-datatable>
            `,
})
    /* jshint ignore:end */
class DTngModelTestComponent
{
    @ViewChild(DatatableComponent)
    datatable: DatatableComponent;

    items: any[];

    constructor()
    {
        this.items = [
            {
                id: 1, item: 'Mobile phones for new sales agents in Brazil', quantity: 50,
                cost: '25,000.00', tax: '10%', discount: '10%', total: '25,000.00 (fx)',
                creationDate: new Date(2000, 1, 1)
            },
            {
                id: 2, item: 'Notebook computers for IT in Argentina', quantity: 35,
                cost: '35,000.00', tax: '15%', discount: '15%', total: '35,000.00 (fx)',
                creationDate: new Date(2002, 2, 2)
            },
            {
                id: 3, item: 'New employee starter pack', quantity: 100, cost: '10,000.00',
                tax: '8%', discount: '8%', total: '100,000.00 (fx)',
                creationDate: new Date(2010, 11, 10)
            }
        ];
    }
}


/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
            <aw-datatable name="testFielda"  [formGroup]="forGroup">
                <aw-dt-column label="item" field="item"></aw-dt-column>
                <aw-dt-column label="quantity" field="quantity" ></aw-dt-column>
                <aw-dt-column label="cost"  field="cost"></aw-dt-column>
                <aw-dt-column label="tax" field="tax"></aw-dt-column>
                <aw-dt-column label="discount" field="discount"></aw-dt-column>
                <aw-dt-column label="total" field="total"></aw-dt-column>
            </aw-datatable>
            `,
})
    /* jshint ignore:end */
class DTFormGroupTestComponent
{
    @ViewChild(DatatableComponent)
    datatable: DatatableComponent;

    items: any[];

    forGroup: FormGroup = new FormGroup({});

    formControl: FormControl;

    constructor()
    {
        this.items = [
            {
                id: 1, item: 'Mobile phones for new sales agents in Brazil', quantity: 50,
                cost: '25,000.00', tax: '10%', discount: '10%', total: '25,000.00 (fx)',
                creationDate: new Date(2000, 1, 1)
            },
            {
                id: 2, item: 'Notebook computers for IT in Argentina', quantity: 35,
                cost: '35,000.00', tax: '15%', discount: '15%', total: '35,000.00 (fx)',
                creationDate: new Date(2002, 2, 2)
            },
            {
                id: 3, item: 'New employee starter pack', quantity: 100, cost: '10,000.00',
                tax: '8%', discount: '8%', total: '100,000.00 (fx)',
                creationDate: new Date(2010, 11, 10)
            }
        ];

        this.formControl = new FormControl();
        this.formControl.setValue(this.items);

        this.forGroup.addControl('testFielda', this.formControl);
    }
}






