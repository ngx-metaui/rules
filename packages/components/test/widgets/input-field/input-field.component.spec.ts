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
import {By} from '@angular/platform-browser';
import {TestBed} from '@angular/core/testing';
import {InputFieldComponent} from '../../../src/widgets/input-field/input-field.component';
import {FormControl, FormGroup} from '@angular/forms';
import {AribaCoreModule} from '@aribaui/core';
import {AWInputFieldModule} from '../../../src/widgets/input-field/input-field.module';
import {AWFormTableModule} from '../../../src/layouts/form-table/form-table.module';
import {AribaComponentsTestProviderModule} from '../../../src/ariba.component.provider.module';


describe(' Input field', () => {


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
                AribaComponentsTestProviderModule.forRoot(),
                AWInputFieldModule,
                AWFormTableModule
            ],
            declarations: [
                TestInputInstantiationComponent,
                TestInputTypenComponent,
                TestInputWithImplicitValuesComponent,
                TestInputSizeComponent,
                TestInputInitWithNgModelComponent
            ]

        });

        TestBed.compileComponents();
    });

    describe(' instantiation of the InputFieldComponent so it have correct values ' +
        'under certain considered situation', () => {


        it('It should setup a default values when just a value bindings is passed.',
            () => {

                let fixtureWrapper = TestBed.createComponent(TestInputInstantiationComponent);
                fixtureWrapper.detectChanges();

                expect(fixtureWrapper.componentInstance.inputComponent.editable)
                    .toEqual(true);
                expect(fixtureWrapper.componentInstance.inputComponent.env.currentForm)
                    .toBeDefined();
                expect(fixtureWrapper.componentInstance.inputComponent.formControl)
                    .toBeDefined();
                expect(fixtureWrapper.componentInstance.inputComponent.name)
                    .toBeDefined();
            });


        it('it should be instantiated with correct input value that we pass in ' +
            'which is => Some text', () => {

            let fixtureWrapper = TestBed.createComponent(TestInputInstantiationComponent);
            fixtureWrapper.detectChanges();

            expect(fixtureWrapper.componentInstance.inputComponent.value)
                .toEqual('Some text');


            let formInput = fixtureWrapper.debugElement.query(By.css('.w-input-field'));
            expect(formInput.nativeElement.value).toEqual('Some text');
        });


        it('It should have default input field type  = text if not specified.',
            () => {

                let fixtureWrapper = TestBed.createComponent(TestInputInstantiationComponent);
                fixtureWrapper.detectChanges();


                let formInput = fixtureWrapper.debugElement.query(By.css('.w-input-field'));
                expect(formInput.nativeElement.type).toEqual('text');
            });


        it('It should have default input field type text when we pass string or text. ' +
            'or number of we pass number as binding', () => {

            let fixtureWrapper = TestBed.createComponent(TestInputTypenComponent);
            fixtureWrapper.detectChanges();

            fixtureWrapper.componentInstance.inputType = 'string';
            fixtureWrapper.detectChanges();

            let formInput = fixtureWrapper.debugElement.query(By.css('.w-input-field'));
            expect(formInput.nativeElement.type).toEqual('text');

            fixtureWrapper.componentInstance.inputType = 'text';
            fixtureWrapper.detectChanges();

            formInput = fixtureWrapper.debugElement.query(By.css('.w-input-field'));
            expect(formInput.nativeElement.type).toEqual('text');

            fixtureWrapper.componentInstance.inputType = 'number';
            fixtureWrapper.detectChanges();

            formInput = fixtureWrapper.debugElement.query(By.css('.w-input-field'));
            expect(formInput.nativeElement.type).toEqual('number');
        });


        it('It should recognize all types as incase sensitive', () => {

            let fixtureWrapper = TestBed.createComponent(TestInputTypenComponent);
            fixtureWrapper.detectChanges();

            fixtureWrapper.componentInstance.inputType = 'StrIng';
            fixtureWrapper.detectChanges();

            let formInput = fixtureWrapper.debugElement.query(By.css('.w-input-field'));
            expect(formInput.nativeElement.type).toEqual('text');

            fixtureWrapper.componentInstance.inputType = 'TEXT';
            fixtureWrapper.detectChanges();

            formInput = fixtureWrapper.debugElement.query(By.css('.w-input-field'));
            expect(formInput.nativeElement.type).toEqual('text');

            fixtureWrapper.componentInstance.inputType = 'Number';
            fixtureWrapper.detectChanges();

            formInput = fixtureWrapper.debugElement.query(By.css('.w-input-field'));
            expect(formInput.nativeElement.type).toEqual('number');
        });


    });


    describe('describe how it inherits values from FormContainer and FormRowComponents',
        () => {


            it('It should corectly inherit editability mode', () => {

                let fixtureWrapper = TestBed.createComponent(TestInputWithImplicitValuesComponent);
                fixtureWrapper.detectChanges();

                expect(fixtureWrapper.componentInstance.inputComponent.editable).toEqual(true);

                // its rendered as a text field
                let formInput = fixtureWrapper.debugElement.query(By.css('.w-input-field'));
                expect(formInput.nativeElement.value).toEqual('Some text');


                fixtureWrapper.componentInstance.editing = false;
                fixtureWrapper.detectChanges();


                expect(fixtureWrapper.componentInstance.inputComponent.editable).toEqual(false);

                let stringComp = fixtureWrapper.debugElement.query(By.css('.w-string-field'));
                expect(stringComp.nativeElement.textContent).toEqual('Some text');

            });


            it('It should corectly display a label that comes from parent as well as has ' +
                'placeHolder',
                () => {
                    let fixtureWrapper = TestBed
                        .createComponent(TestInputWithImplicitValuesComponent);
                    fixtureWrapper.detectChanges();

                    expect(fixtureWrapper.componentInstance.inputComponent.placeHolder)
                        .toEqual('My Name');

                    let formInput = fixtureWrapper.debugElement
                        .query(By.css('.ui-g-12 > label'));
                    expect(formInput.nativeElement.textContent).toEqual('My Name');
                });


            it('It should inherit and render the required flag just next the the ' +
                'label and field', () => {
                let fixtureWrapper = TestBed.createComponent(TestInputWithImplicitValuesComponent);
                fixtureWrapper.detectChanges();

                expect(fixtureWrapper.componentInstance.inputComponent.placeHolder)
                    .toEqual('My Name');

                let formInput = fixtureWrapper.debugElement.query(By.css('.w-form-row'));
                expect(formInput.classes['required']).toBeTruthy();
            });
        });


    describe('Describe how input field behaves inside FormRow - this focuses mainly on' +
        ' size', () => {


        it('The field size should be 1 grid column when we pass size x-small',
            () => {

            let fixtureWrapper = TestBed.createComponent(TestInputSizeComponent);
            fixtureWrapper.detectChanges();


            // its rendered as a text field
            let formInput = fixtureWrapper.debugElement.query(By.css('.w-form-row'));
            expect(formInput.children[1].nativeElement.classList.contains('ui-md-1')).toBeTruthy();

        });


        it('The field size should 3 column when we pass size small', () => {

            let fixtureWrapper = TestBed.createComponent(TestInputSizeComponent);
            fixtureWrapper.detectChanges();


            fixtureWrapper.componentInstance.size = 'small';
            fixtureWrapper.detectChanges();

            // its rendered as a text field
            let formInput = fixtureWrapper.debugElement.query(By.css('.w-form-row'));
            expect(formInput.children[1].nativeElement.classList.contains('ui-md-3')).toBeTruthy();

        });


    });


    describe('how w-input-field can be initialized externally using ngModel ', () => {


        it('should get initialized using ControlValueAccessor so we know writeValue is triggered',
            () => {
                let fixtureWrapper = TestBed.createComponent(TestInputInitWithNgModelComponent);
                fixtureWrapper.detectChanges();

                fixtureWrapper.componentInstance.inputValue = 'xxxx';
                fixtureWrapper.detectChanges();

                fixtureWrapper.whenStable().then(() => {
                    expect(
                        fixtureWrapper.componentInstance.inputComponent.value)
                        .toBe('xxxx');
                });


            });


    });

});


@Component({
    selector: 'wrapper-comp',
    template: '<aw-input-field name="asdf" [value]="inputValue" ></aw-input-field>'
})
class TestInputInstantiationComponent {
    @ViewChild(InputFieldComponent)
    inputComponent: InputFieldComponent;
    inputValue: string = 'Some text';
}


@Component({
    selector: 'wrapper-comp',
    template: '<aw-input-field [value]="inputValue" [type]="inputType"></aw-input-field>'
})
class TestInputTypenComponent {
    @ViewChild(InputFieldComponent)
    inputComponent: InputFieldComponent;
    inputValue: string = 'Some text';
    inputType: string = 'string';
}


@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-form-table [editable]="editing" [labelsOnTop]="labelsOnTop">
            <aw-form-row [name]="fieldName" [required]="required" [label]="label"
                         [size]="size">
                <aw-input-field [value]="inputValue" [type]="inputType"></aw-input-field>
            </aw-form-row>
        </aw-form-table>
    `
})
class TestInputSizeComponent {
    @ViewChild(InputFieldComponent)
    editing: boolean = true;

    inputComponent: InputFieldComponent;
    inputValue: string = 'Some text';
    inputType: string = 'string';
    fieldName: string = 'firstName';
    label: string = 'My Name';
    size: string = 'xsmall';
    required: boolean = true;
    labelsOnTop: boolean = false;


}


@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-form-table [editable]="editing" [labelsOnTop]="labelsOnTop">
            <aw-form-row [name]="fieldName" [required]="required" [label]="label">
                <aw-input-field [placeHolder]="label" [value]="inputValue"
                                [type]="inputType"></aw-input-field>
            </aw-form-row>
        </aw-form-table>
    `
})
class TestInputWithImplicitValuesComponent {
    @ViewChild(InputFieldComponent)
    inputComponent: InputFieldComponent;
    inputValue: string = 'Some text';
    inputType: string = 'string';
    fieldName: string = 'firstName';
    label: string = 'My Name';
    required: boolean = true;
    editing: boolean = true;
    labelsOnTop: boolean = false;


}


@Component({
    selector: 'wrapper-comp',
    template: '<aw-input-field [formControl]="myControl"></aw-input-field>'
})
class TestInputExposeNGModelComponent {
    @ViewChild(InputFieldComponent)
    inputComponent: InputFieldComponent;
    initialValue: string = 'Some text';
    myValue: string = 'Some text';

    myForm = new FormGroup({});
    myControl = new FormControl('x');
}


@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-form-table>
            <aw-form-row [name]="fieldName" [label]="label">
                <aw-input-field [name]="'firstName'"
                                [(ngModel)]="inputValue"></aw-input-field>
            </aw-form-row>
        </aw-form-table>
    `
})
class TestInputInitWithNgModelComponent {
    @ViewChild(InputFieldComponent)
    inputComponent: InputFieldComponent;
    inputValue: string = 'Some text';
    inputType: string = 'string';
    label: string = 'My Name';
    required: boolean = true;
    editing: boolean = true;
    labelsOnTop: boolean = false;


}
