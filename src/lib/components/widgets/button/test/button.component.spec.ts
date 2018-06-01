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
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {ButtonComponent} from '../button.component';
import {AribaCoreModule} from '@aribaui/core';
import {AWButtonModule} from '../button.module';
import {AWFormTableModule} from '../../../layouts/form-table/form-table.module';
import {AribaComponentsTestProviderModule} from '../../../ariba.component.provider.module';
import {AribaCoreI18nModule} from '../../../../core';


describe('Component: Button', () =>
{

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TestButtonDefaultBehaviorComponent,
                TestButtonBasicBehaviorComponent,
                TestButtonActionBehaviorComponent,
                TestDTContainerBehaviorComponent
            ],
            imports: [
                AribaCoreI18nModule,
                AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
                AribaComponentsTestProviderModule.forRoot(),
                AWButtonModule,
                AWFormTableModule
            ]
        });

        TestBed.compileComponents();
    });

    it('should instantiate and have default values for value, Button type, class, disabled, ' +
        'value, ' + 'etc', () =>
    {

        let fixtureWrapper = TestBed.createComponent(TestButtonDefaultBehaviorComponent);
        fixtureWrapper.detectChanges();

        expect(fixtureWrapper.componentInstance.button.type).toEqual('button');
        expect(fixtureWrapper.componentInstance.button.style).toEqual('primary');
        expect(fixtureWrapper.componentInstance.button.disabled).toBeFalsy();
        expect(fixtureWrapper.componentInstance.button.target).toEqual(undefined);
        expect(fixtureWrapper.componentInstance.button.value).toEqual(undefined);
    });

    it('Basic behaviors for setting the type, size, name, value properties', fakeAsync(() =>
    {
        let fixtureWrapper = TestBed.createComponent(
            TestButtonBasicBehaviorComponent);
        fixtureWrapper.detectChanges();

        let el = fixtureWrapper.nativeElement.querySelector(
            'button');
        let className = el.className;
        fixtureWrapper.detectChanges();


        expect(fixtureWrapper.componentInstance.button.type) .toEqual('button');
        expect(fixtureWrapper.componentInstance.button.name) .toEqual('name');
        expect(fixtureWrapper.componentInstance.button.style) .toEqual('primary');
        expect(fixtureWrapper.componentInstance.button.disabled) .toBeFalsy();
        expect(fixtureWrapper.componentInstance.button.target) .toEqual(undefined);
        expect(fixtureWrapper.componentInstance.button.value) .toEqual('my button');
    }));

    it('should trigger action behavior when clicking on button', fakeAsync(() =>
    {

        let fixtureWrapper = TestBed.createComponent(
            TestButtonActionBehaviorComponent);
        fixtureWrapper.detectChanges();

        let el = fixtureWrapper.nativeElement.querySelector('button');
        el.dispatchEvent(new Event('click'));

        fixtureWrapper.detectChanges();
        tick();
        fixtureWrapper.detectChanges();

        expect(fixtureWrapper.componentInstance.actionValue) .toEqual('my button');
    }));


    it('should have initialized formControl and formGroup when wrapped inside FormRow', () =>
    {
        let fixtureWrapper = TestBed.createComponent(TestDTContainerBehaviorComponent);
        fixtureWrapper.detectChanges();

        expect(fixtureWrapper.componentInstance.button.type).toEqual('submit');
        expect(fixtureWrapper.componentInstance.button.style).toEqual('primary');
        expect(fixtureWrapper.componentInstance.button.disabled).toBeFalsy();
        expect(fixtureWrapper.componentInstance.button.target).toEqual(undefined);
        expect(fixtureWrapper.componentInstance.button.value).toEqual(undefined);
    });
});


/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-button>Button</aw-button>
`
})
    /* jshint ignore:end */
class TestButtonDefaultBehaviorComponent
{
    @ViewChild(ButtonComponent)
    button: ButtonComponent;

    constructor()
    {
    }
}

/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
          <aw-button [type]="buttonType" [name]="buttonName" [style]="'primary'"
                     [disabled]="false" [value]="'my button'">Button</aw-button>
        `
})
    /* jshint ignore:end */
class TestButtonBasicBehaviorComponent
{
    @ViewChild(ButtonComponent)
    button: ButtonComponent;

    buttonType: string = 'button';
    buttonName: string = 'name';

    constructor()
    {

    }
}

/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
          <aw-button [type]="buttonType" [name]="buttonName" (action)="onClicked($event)"
          [value]="'my button'">
            Button
          </aw-button>
        `
})
    /* jshint ignore:end */
class TestButtonActionBehaviorComponent
{
    @ViewChild(ButtonComponent)
    button: ButtonComponent;

    editable = true;
    actionValue: string;
    buttonType: string = 'submit';
    buttonName: string = 'name';

    constructor()
    {

    }

    onClicked(value: string)
    {
        this.actionValue = value;
    }
}

/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
    <aw-form-table >
        <aw-form-row [label]="'Amount'" [name]="'amount'" [size]="'small'">
            <aw-button [type]="'submit'" [name]="'button'">Button</aw-button>
        </aw-form-row>
    </aw-form-table>
`
})
    /* jshint ignore:end */
class TestDTContainerBehaviorComponent
{
    @ViewChild(ButtonComponent)
    button: ButtonComponent;
}
