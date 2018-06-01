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
import {Component, OnInit, ViewChild} from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AribaCoreModule} from '../../../../core/ariba.core.module';
import {AWListModule} from '../list.module';
import {ListComponent} from '../list.component';
import {Environment, isArray} from '@aribaui/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AribaComponentsTestProviderModule} from '../../../ariba.component.provider.module';
import {AribaCoreI18nModule} from '../../../../core';


describe('Component: List', () =>
{


    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            imports: [
                AribaCoreI18nModule,
                AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
                AribaComponentsTestProviderModule.forRoot(),
                AWListModule
            ],
            declarations: [
                TestListSimpleComponent,
                TestListMultiComponent,
                TestListBindingComponent,
                TestFieldValueTransformBindingComponent,
                TestWithPreselectedItemMultiComponent,
                TestHeightWidthForListComponent,
                TestNgModelOnListBoxComponent,
                TestFormControlOnListBoxComponent,
                TestZonesForListComponent
            ]

        });

        TestBed.compileComponents();
    });

    describe('basic rendering behavior', () =>
    {


        it('render list with 3 items default single selection mode ', () =>
        {
            let fixtureWrapper = TestBed.createComponent(TestListSimpleComponent);
            fixtureWrapper.detectChanges();


            let items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-wrapper');
            expect(items.length).toBe(3);

        });


        it('can select only 1 item at the time when single selection mode is enabled ',
            fakeAsync(() =>
            {
                let fixtureWrapper = TestBed.createComponent(TestListSimpleComponent);
                fixtureWrapper.detectChanges();


                let items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-middle');
                items[0].click();

                tick();
                fixtureWrapper.detectChanges();

                expect(isArray(fixtureWrapper.componentInstance.list.selection)).toBeFalsy();
                expect(fixtureWrapper.componentInstance.list.selection).toBe('Monday');

                clickWithMeta(items[1]);
                tick();
                fixtureWrapper.detectChanges();

                expect(isArray(fixtureWrapper.componentInstance.list.selection)).toBeFalsy();
                expect(fixtureWrapper.componentInstance.list.selection).toBe('Tuesday');

            }));

        it('render list 3 item and multiselection mode so that checkboxes are not visible ',
            fakeAsync(() =>
            {
                let fixtureWrapper = TestBed.createComponent(TestListMultiComponent);
                fixtureWrapper.detectChanges();

                let items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-left input');

                expect(items.length).toBe(0);
                expect(fixtureWrapper.componentInstance.list.selectionMode).toBe('multi');

            }));


        it('render list 3 item and multiselection with visible checkboxes', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestListMultiComponent);
            fixtureWrapper.componentInstance.mode = 'multiWithCheckbox';
            fixtureWrapper.detectChanges();

            let items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-left input');

            expect(items.length).toBe(3);
            expect(fixtureWrapper.componentInstance.list.selectionMode).toBe('multiWithCheckbox');

        }));

        it('can select multiple item when multi selection mode is enabled', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestListMultiComponent);
            fixtureWrapper.detectChanges();

            let items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-middle');
            items[0].click();
            //    tick there is a problem that is fixed in new version
            // in writeValue there needs to be call markFor.. inside Plistbox
            fixtureWrapper.detectChanges();

            expect(isArray(fixtureWrapper.componentInstance.list.selection)).toBeTruthy();
            expect(fixtureWrapper.componentInstance.list.selection).toContain('Monday');

            clickWithMeta(items[1]);
            // tick();
            fixtureWrapper.detectChanges();

            expect(isArray(fixtureWrapper.componentInstance.list.selection)).toBeTruthy();
            expect(fixtureWrapper.componentInstance.list.selection).toContain('Monday');
            expect(fixtureWrapper.componentInstance.list.selection).toContain('Tuesday');


        }));


        it('should throw error when [list] binding is not provided', () =>
        {
            let fixtureWrapper = TestBed.createComponent(TestListBindingComponent);

            expect(() => fixtureWrapper.detectChanges())
                .toThrowError('Missing [list] binding.');

        });

        it('should throw error when it has [field] and [valueTransformer] bindings ', () =>
        {
            let fixtureWrapper = TestBed.createComponent(TestFieldValueTransformBindingComponent);

            expect(() => fixtureWrapper.detectChanges())
                .toThrowError('You can have either [field] or [valueTransformer].');

        });


        it('render list with 3 items and  1st item selected ', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestWithPreselectedItemMultiComponent);
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();


            let items = fixtureWrapper.nativeElement
                .querySelectorAll('.w-li-wrapper .ui-chkbox-icon');
            expect(items.length).toBe(3);
            expect(fixtureWrapper.componentInstance.list.selection[0]).toBe('Monday');
            expect(items[0].classList).toContain('fa-check');

        }));


        it(' should set the height style on the top level element ', () =>
        {
            let fixtureWrapper = TestBed.createComponent(TestHeightWidthForListComponent);
            fixtureWrapper.detectChanges();

            let listbox = fixtureWrapper.nativeElement.querySelector('.ui-listbox');
            let computedStyle = getComputedStyle(listbox);

            expect(computedStyle.height).toBe('100px');

        });

        it('should set the with style on the top level element ', () =>
        {
            let fixtureWrapper = TestBed.createComponent(TestHeightWidthForListComponent);
            fixtureWrapper.detectChanges();

            let listbox = fixtureWrapper.nativeElement.querySelector('.ui-listbox');
            let computedStyle = getComputedStyle(listbox);

            expect(computedStyle.width).toBe('150px');
        });

        it('should change overflow-y to auto when height is used ', () =>
        {
            let fixtureWrapper = TestBed.createComponent(TestHeightWidthForListComponent);
            fixtureWrapper.detectChanges();

            let listbox = fixtureWrapper.nativeElement.querySelector('.ui-listbox');
            let computedStyle = getComputedStyle(listbox);

            expect(computedStyle.overflowY).toBe('auto');
        });

        it('hides LIST border when [borderless] is set to TRUE', () =>
        {
            let fixtureWrapper = TestBed.createComponent(TestListSimpleComponent);
            fixtureWrapper.detectChanges();

            fixtureWrapper.componentInstance.noBorder = true;

            fixtureWrapper.detectChanges();

            let listbox = fixtureWrapper.nativeElement.querySelector('.ui-listbox');
            let computedStyle = getComputedStyle(listbox);

            expect(computedStyle.borderColor).toBe('rgb(0, 0, 0)');
        });


        it('triggers onSelection event when item is clicked', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestListMultiComponent);
            fixtureWrapper.detectChanges();


            let items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-middle');
            items[1].click();

            tick();
            fixtureWrapper.detectChanges();
            expect(fixtureWrapper.componentInstance.itemSelected).toBe('Tuesday');

        }));


        it('prefixes list items with XXX when valueTransformer is used', () =>
        {
            let fixtureWrapper = TestBed.createComponent(TestFieldValueTransformBindingComponent);
            fixtureWrapper.componentInstance.field = null;
            fixtureWrapper.detectChanges();


            let items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-middle');
            expect(items[1].textContent.trim()).toBe('XXX-Tuesday');
        });


    });


    describe('Support for [(ngModel)]', () =>
    {
        it('initialize list selection using [(ngModel)]', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestNgModelOnListBoxComponent);
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            expect(fixtureWrapper.componentInstance.list.selection[0]).toBe('Monday');
        }));

        it('propagates selection to [(ngModel)] when item is clicked', fakeAsync(() =>
        {

            let fixtureWrapper = TestBed.createComponent(TestNgModelOnListBoxComponent);
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            let items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-middle');
            items[1].click();

            tick();
            fixtureWrapper.detectChanges();


            tick();
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            expect(fixtureWrapper.componentInstance.selectedItems[0]).toBe('Tuesday');

        }));

    });


    describe('Support for FormGroup', () =>
    {
        it('initialize list selection using Initialized FormGroup', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestFormControlOnListBoxComponent);
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            expect(fixtureWrapper.componentInstance.list.selection[0]).toBe('Monday');

        }));

        it('propagates selection to FormControl when item is clicked', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestFormControlOnListBoxComponent);
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            let items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-middle');
            items[1].click();

            tick();
            fixtureWrapper.detectChanges();


            tick();
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            expect(fixtureWrapper.componentInstance.fg.controls['weekdays'].value[0])
                .toBe('Tuesday');
        }));

    });


    describe('Custom templates to override list item', () =>
    {

        it('renders LEFT zone with custom template', () =>
        {
            let fixtureWrapper = TestBed.createComponent(TestZonesForListComponent);
            fixtureWrapper.detectChanges();

            let selector = fixtureWrapper.nativeElement.querySelector('.w-li-left');
            expect(selector.textContent.trim()).toBe('I am Left');
        });

        it('renders MIDDLE zone with custom template', () =>
        {
            let fixtureWrapper = TestBed.createComponent(TestZonesForListComponent);
            fixtureWrapper.detectChanges();

            let selector = fixtureWrapper.nativeElement.querySelector('.w-li-middle');
            expect(selector.textContent.trim()).toBe('M-Monday');
        });


        it('renders RIGHT zone with custom template', () =>
        {
            let fixtureWrapper = TestBed.createComponent(TestZonesForListComponent);
            fixtureWrapper.detectChanges();

            let selector = fixtureWrapper.nativeElement.querySelector('.w-li-right');
            expect(selector.textContent.trim()).toBe('I am Right');
        });


        it('can provide custom behavior to show check mark in the right if item ' +
            'is selected', fakeAsync(() =>
        {
            let fixtureWrapper = TestBed.createComponent(TestZonesForListComponent);
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            tick();
            fixtureWrapper.detectChanges();

            let items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-right .sap-icon');
            expect(items[0].classList).toContain('icon-accept');
            expect(items[1].classList).not.toContain('icon-accept');
            expect(items[2].classList).not.toContain('icon-accept');
        }));

    });

});


@Component({
    selector: 'wrapper-comp',
    template: '<aw-list [list]="data" [borderless]="noBorder"></aw-list>'
})
class TestListSimpleComponent
{
    @ViewChild(ListComponent)
    list: ListComponent;

    data = ['Monday', 'Tuesday', 'Sunday'];
    noBorder = false;
}


@Component({
    selector: 'wrapper-comp',
    template: '<aw-list ></aw-list>'
})
class TestListBindingComponent
{
    @ViewChild(ListComponent)
    list: ListComponent;


    data = ['Monday', 'Tuesday', 'Sunday'];
}


@Component({
    selector: 'wrapper-comp',
    template: '<aw-list [list]="data" [field]="field" [valueTransformer]="convert"></aw-list>'
})
class TestFieldValueTransformBindingComponent
{
    @ViewChild(ListComponent)
    list: ListComponent;

    data = ['Monday', 'Tuesday', 'Sunday'];
    field = 'aa';

    convert(item: any): string
    {
        return 'XXX-' + item;
    }
}

@Component({
    selector: 'wrapper-comp',
    template: `<aw-list [list]="data" [selectionMode]="mode"
        (onSelection)="itemClicked($event)" >
                </aw-list>`
})
class TestListMultiComponent
{
    @ViewChild(ListComponent)
    list: ListComponent;

    mode = 'multi';
    data = ['Monday', 'Tuesday', 'Sunday'];

    itemSelected = '';

    itemClicked(event: any): void
    {
        this.itemSelected = event[0];
    }
}

@Component({
    selector: 'wrapper-comp',
    template: `<aw-list [list]="data" [selectionMode]="mode" [selection]="selectedItems" >
               </aw-list>`
})
class TestWithPreselectedItemMultiComponent
{
    @ViewChild(ListComponent)
    list: ListComponent;

    mode = 'multiWithCheckbox';
    data = ['Monday', 'Tuesday', 'Sunday'];

    selectedItems = ['Monday'];
}


@Component({
    selector: 'wrapper-comp',
    template: `<aw-list [list]="data" [selectionMode]="mode"
                [height]="h"
                [width]="w"
                [selection]="selectedItems" >
               </aw-list>`
})
class TestHeightWidthForListComponent
{
    @ViewChild(ListComponent)
    list: ListComponent;

    mode = 'multi';
    data = ['Monday', 'Tuesday', 'Sunday'];

    selectedItems = ['Monday'];
    h = '100px';
    w = '150px';

}


@Component({
    selector: 'wrapper-comp',
    template: `<aw-list #awlist [list]="data" [selectionMode]="mode"
                [selection]="selectedItems" >

                <ng-template #left let-item>
                    I am Left
                </ng-template>

                <ng-template #middle let-item>
                    M-{{item.value}}
                </ng-template>

                <ng-template #right let-item>
                    I am Right

                    <span class="sap-icon"
                          [ngClass]="{'icon-accept': awlist.pListBox.isSelected(item),
                          '': !awlist.pListBox.isSelected(item)}">

                    </span>
                </ng-template>\
           </aw-list>`
})
class TestZonesForListComponent
{
    @ViewChild(ListComponent)
    list: ListComponent;

    mode = 'multi';
    data = ['Monday', 'Tuesday', 'Sunday'];

    selectedItems = ['Monday'];


}


@Component({
    selector: 'wrapper-comp',
    template: `<aw-list [list]="data"
                [selectionMode]="'multiWithCheckbox'"
                [(ngModel)]="selectedItems"
                   (onSelection)="itemClicked($event)" >
               </aw-list>`
})
class TestNgModelOnListBoxComponent
{
    @ViewChild(ListComponent)
    list: ListComponent;

    data = ['Monday', 'Tuesday', 'Sunday'];
    selectedItems = ['Monday'];


    itemSelected = '';

    itemClicked(event: any): void
    {
        this.itemSelected = event[0];
    }


}


@Component({
    selector: 'wrapper-comp',
    template: `<aw-list [list]="data"
                [selectionMode]="'multiWithCheckbox'"
                    name="weekdays"
                   (onSelection)="itemClicked($event)" >
               </aw-list>`
})
class TestFormControlOnListBoxComponent implements OnInit
{
    @ViewChild(ListComponent)
    list: ListComponent;
    fg: FormGroup = new FormGroup({});

    data = ['Monday', 'Tuesday', 'Sunday'];
    selectedItems = ['Monday'];

    itemSelected = '';


    constructor(private env: Environment)
    {
    }

    ngOnInit(): void
    {
        let formControl = new FormControl();
        formControl.setValue(this.selectedItems);

        this.fg.addControl('weekdays', formControl);

        this.env.currentForm = this.fg;
    }

    itemClicked(event: any): void
    {
        this.itemSelected = event[0];
    }


}


function clickWithMeta(element: any)
{
    const event: MouseEventInit = {
        ctrlKey: true,
        metaKey: true
    };
    element.dispatchEvent(new MouseEvent('click', event));
}


