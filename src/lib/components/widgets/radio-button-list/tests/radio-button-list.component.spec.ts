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
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {RadioButtonListComponent} from '../radio-button-list.component';
import {AribaCoreModule} from '../../../../core/ariba.core.module';
import {Environment} from '@aribaui/core';
import {AWRadioButtonListModule} from '../radio-button-list.module';
import {AribaComponentsTestProviderModule} from '../../../ariba.component.provider.module';
import {AribaCoreI18nModule} from '../../../../core';

describe('RadioButton LIST   behavior', () =>
{


    beforeEach(() =>
    {

        TestBed.configureTestingModule({
            declarations: [
                TestRBListBasicBehaviorComponent

            ],
            imports: [
                AribaCoreI18nModule,
                AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
                AribaComponentsTestProviderModule.forRoot(),
                AWRadioButtonListModule
            ]
        });

        TestBed.compileComponents();
    });

    it(' it should be initialized with all required properties', fakeAsync(() =>
    {

        let fixtureWrapper = TestBed.createComponent(TestRBListBasicBehaviorComponent);
        fixtureWrapper.detectChanges();
        tick();

        expect(fixtureWrapper.componentInstance.rbList.list).toBeDefined();
        expect(fixtureWrapper.componentInstance.rbList.list.length > 0).toBeTruthy();
        expect(fixtureWrapper.componentInstance.rbList.name).toBeDefined();

    }));


    it('should render all the available options based on the input rbListValues', () =>
    {

        let fixtureWrapper = TestBed.createComponent(TestRBListBasicBehaviorComponent);
        fixtureWrapper.detectChanges();

        let items = fixtureWrapper.nativeElement.querySelectorAll('.ui-radiobutton input');

        expect(items.length).toEqual(fixtureWrapper.componentInstance.rbListValues.length);
    });


    it('should have 1 radiobutton already checked based on the selectedValue', fakeAsync(() =>
    {

        let fixtureWrapper = TestBed.createComponent(TestRBListBasicBehaviorComponent);
        fixtureWrapper.detectChanges();
        tick();

        fixtureWrapper.detectChanges();
        tick();

        let items = fixtureWrapper.nativeElement.querySelectorAll('.ui-radiobutton input');

        let checkedCount = 0;
        let checkedValue = 'xxx';
        for (let item of items) {
            if (item.checked) {
                checkedValue = item.value;
            }
            // let the for finish do not break to see there is really one selected with expected
            // name
        }
        fixtureWrapper.detectChanges();
        tick();

        expect(checkedValue).toEqual('2');
    }));


    it('should change the selection when clicking on the "male" option so in the ' +
        'model we should see the change', fakeAsync(() =>
    {

        let fixtureWrapper = TestBed.createComponent(TestRBListBasicBehaviorComponent);

        fixtureWrapper.detectChanges();
        tick();


        let items = fixtureWrapper.nativeElement.querySelectorAll('.w-radiobutton label');

        items[0].click();

        tick();
        fixtureWrapper.detectChanges();
        tick();
        fixtureWrapper.detectChanges();


        // let futureValue = items[0].value;
        //
        // expect(fixtureWrapper.componentInstance.env.currentForm.value['gender'])
        //     .toEqual(futureValue);

    }));


    it('should not have pre-checked any radio option if selection binding s value is null',
        fakeAsync(() =>
        {


            let tmpl = '<aw-radiobutton-list [list]="rbListValues"' +
                '[name]="name"> </aw-radiobutton-list>';
            TestBed.overrideComponent(TestRBListBasicBehaviorComponent, {set: {template: tmpl}});

            let fixtureWrapper = TestBed.createComponent(TestRBListBasicBehaviorComponent);
            fixtureWrapper.detectChanges();
            tick();

            let items = fixtureWrapper.nativeElement.querySelectorAll('.ui-radiobutton input');

            let checkedCount = 0;
            for (let item of items) {
                if (item.checked) {
                    checkedCount++;
                }
                // let the for finish do not break to see there is really one selected with expected
                // name
            }
            expect(checkedCount).toEqual(0);

        }));


});

@Component({
    selector: 'wrapper-comp',
    template: `
    <aw-radiobutton-list [list]="rbListValues" [selection]="selectedValue"
         [name]="name">
    </aw-radiobutton-list>
`
})
class TestRBListBasicBehaviorComponent
{
    @ViewChild(RadioButtonListComponent)
    rbList: RadioButtonListComponent;

    rbListValues: string[] = ['male', 'female', 'other'];
    selectedValue: string;
    layout: string = 'stacked';

    name = 'gender';


    constructor(public env: Environment)
    {
        this.selectedValue = this.rbListValues[2];

    }

    onCBClick(event: any): void
    {
    }

}


