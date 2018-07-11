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
import {AribaCoreModule} from '@aribaui/core';
import {AWStepperModule} from '../../../src/widgets/stepper/stepper.module';
import {AWFormTableModule} from '../../../src/layouts/form-table/form-table.module';
import {AWButtonModule} from '../../../src/widgets/button/button.module';
import {StepperComponent} from '../../../src/widgets/stepper/stepper.component';
import {AribaComponentsTestProviderModule} from '../../../src/ariba.component.provider.module';


describe('Stepper component', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                BasicStepperTestComponent,
                StepperWithColorsOverridenTestComponent,
                StepperWithColorArrayTestComponent,
            ],
            imports: [
                AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
                AribaComponentsTestProviderModule.forRoot(),
                AWStepperModule,
                AWFormTableModule,
                AWButtonModule
            ]
        });

        TestBed.compileComponents();
    });

    describe('methods', () => {

        it('should be able to go previous and next step with method()', fakeAsync(() => {
            let colorCompleted = 'rgb(88, 185, 87)',
                colorCurrent = 'rgb(0, 118, 203)',
                colorRemaining = 'rgb(215, 215, 215)';

            let fixtureWrapper = TestBed.createComponent(BasicStepperTestComponent);
            fixtureWrapper.detectChanges();

            // verify current step
            expect(fixtureWrapper.componentInstance.stepper.currentStep).toBe(1);

            // goto next step.
            fixtureWrapper.componentInstance.stepper.nextStep();

            tick();
            fixtureWrapper.detectChanges();

            // Verify that the stepper has advanced
            expect(fixtureWrapper.componentInstance.stepper.currentStep).toBe(2);

            // Verify that the colors are correct.
            let colors = fixtureWrapper.nativeElement.querySelectorAll('.outer-circle');
            expect(colors.length).toEqual(3);

            expect(borderColor(colors[0])).toEqual(colorCompleted);
            expect(borderColor(colors[1])).toEqual(colorCompleted);
            expect(borderColor(colors[2])).toEqual(colorCurrent);


            // go back two steps.
            fixtureWrapper.componentInstance.stepper.prevStep();
            fixtureWrapper.componentInstance.stepper.prevStep();

            tick();
            fixtureWrapper.detectChanges();

            // Verify that the stepper has advanced
            expect(fixtureWrapper.componentInstance.stepper.currentStep).toBe(0);

            // Verify that the colors are correct.
            colors = fixtureWrapper.nativeElement.querySelectorAll('.outer-circle');
            expect(colors.length).toEqual(3);

            expect(borderColor(colors[0])).toEqual(colorCurrent);
            expect(borderColor(colors[1])).toEqual(colorRemaining);
            expect(borderColor(colors[2])).toEqual(colorRemaining);

        }));

        it('should be able to go previous and next step with button click action', fakeAsync(() => {
            let colorCompleted = 'rgb(151, 168, 34)',
                colorCurrent = 'rgb(255, 153, 0)',
                colorRemaining = 'rgb(204, 0, 0)';

            let fixtureWrapper = TestBed.createComponent(StepperWithColorsOverridenTestComponent);
            fixtureWrapper.detectChanges();

            // verify current step
            expect(fixtureWrapper.componentInstance.stepper.currentStep).toBe(2);

            // goto next step.
            let button = fixtureWrapper.nativeElement.querySelector('#next');
            button.dispatchEvent(new Event('click'));


            fixtureWrapper.detectChanges();
            tick();

            fixtureWrapper.detectChanges();
            tick();

            // Verify that the stepper has advanced
            expect(fixtureWrapper.componentInstance.stepper.currentStep).toBe(3);

            // Verify that the colors are correct.
            let colors = fixtureWrapper.nativeElement.querySelectorAll('.outer-circle');
            expect(colors.length).toEqual(5);


            expect(borderColor(colors[0])).toEqual(colorCompleted);
            expect(borderColor(colors[1])).toEqual(colorCompleted);
            expect(borderColor(colors[2])).toEqual(colorCompleted);
            expect(borderColor(colors[3])).toEqual(colorCurrent);
            expect(borderColor(colors[4])).toEqual(colorRemaining);

            // go back two steps.
            button = fixtureWrapper.nativeElement.querySelector('#prev');
            button.dispatchEvent(new Event('click'));

            fixtureWrapper.detectChanges();
            tick();

            fixtureWrapper.detectChanges();
            tick();

            button.dispatchEvent(new Event('click'));

            fixtureWrapper.detectChanges();
            tick();

            fixtureWrapper.detectChanges();
            tick();

            // Verify that the stepper has advanced
            expect(fixtureWrapper.componentInstance.stepper.currentStep).toBe(1);

            // Verify that the colors are correct.
            colors = fixtureWrapper.nativeElement.querySelectorAll('.outer-circle');
            expect(colors.length).toEqual(5);


            expect(borderColor(colors[0])).toEqual(colorCompleted);
            expect(borderColor(colors[1])).toEqual(colorCurrent);
            expect(borderColor(colors[2])).toEqual(colorRemaining);
            expect(borderColor(colors[3])).toEqual(colorRemaining);
            expect(borderColor(colors[4])).toEqual(colorRemaining);

        }));
    });


    describe('attributes', () => {
        beforeEach(() => {

        });

        it('should correctly have titles, colors, and number of steps displayed', () => {
            let fixtureWrapper = TestBed.createComponent(BasicStepperTestComponent);
            fixtureWrapper.detectChanges();

            // Verify three titles are correct.
            let titles = fixtureWrapper.nativeElement.querySelectorAll('.step-title');
            expect(titles.length).toEqual(3);

            expect(titles[0].textContent.trim()).toEqual('Monitor');
            expect(titles[1].textContent.trim()).toEqual('Add Supplier');
            expect(titles[2].textContent.trim()).toEqual('Get Quote');

            // Verify that the colors are correct.
            let colors = fixtureWrapper.nativeElement.querySelectorAll('.outer-circle');
            expect(colors.length).toEqual(3);

            expect(borderColor(colors[0])).toEqual('rgb(88, 185, 87)');
            expect(borderColor(colors[1])).toEqual('rgb(0, 118, 203)');
            expect(borderColor(colors[2])).toEqual('rgb(215, 215, 215)');

            let steps = fixtureWrapper.nativeElement.querySelectorAll('.step-container');

            // ensure all the steps are present.
            expect(steps.length).toEqual(3);

            // Check default variables are  initialized correctly.
            expect(fixtureWrapper.componentInstance.stepper.bUseColorArray).toBeFalsy();
            expect(fixtureWrapper.componentInstance.stepper.currentStep).toBe(1);
        });


        it('should display with custom color when colors are overriden', () => {
            let fixtureWrapper = TestBed.createComponent(StepperWithColorsOverridenTestComponent);
            fixtureWrapper.detectChanges();

            // ensure all the steps are present.
            let steps = fixtureWrapper.nativeElement.querySelectorAll('.step-container');
            expect(steps.length).toEqual(5);

            // Check default variables are  initialized correctly.
            expect(fixtureWrapper.componentInstance.stepper.bUseColorArray).toBeFalsy();
            expect(fixtureWrapper.componentInstance.stepper.currentStep).toBe(2);

            // Get the colors
            let colors = fixtureWrapper.nativeElement.querySelectorAll('.outer-circle');
            expect(colors.length).toEqual(5);

            // Current step is 2, so the first two have completed colors.
            expect(borderColor(colors[0])).toEqual('rgb(151, 168, 34)');
            expect(borderColor(colors[1])).toEqual('rgb(151, 168, 34)');

            // Current step color
            expect(borderColor(colors[2])).toEqual('rgb(255, 153, 0)');

            // remaining step colors
            expect(borderColor(colors[3])).toEqual('rgb(204, 0, 0)');
            expect(borderColor(colors[4])).toEqual('rgb(204, 0, 0)');

        });


        it('should display with color array when colors array are provided.', fakeAsync(() => {

            let fixtureWrapper = TestBed.createComponent(StepperWithColorArrayTestComponent);
            fixtureWrapper.detectChanges();

            // ensure all the steps are present.
            let steps = fixtureWrapper.nativeElement.querySelectorAll('.step-container');
            expect(steps.length).toEqual(6);

            // Check default variables are  initialized correctly.
            expect(fixtureWrapper.componentInstance.stepper.bUseColorArray).toBeTruthy();
            expect(fixtureWrapper.componentInstance.stepper.currentStep).toBe(0);

            // Get the colors
            let colors = fixtureWrapper.nativeElement.querySelectorAll('.outer-circle');
            expect(colors.length).toEqual(6);

            expect(borderColor(colors[0])).toEqual('rgb(0, 153, 153)');
            expect(borderColor(colors[1])).toEqual('rgb(84, 117, 122)');
            expect(borderColor(colors[2])).toEqual('rgb(255, 255, 0)');
            expect(borderColor(colors[3])).toEqual('rgb(151, 168, 34)');
            expect(borderColor(colors[4])).toEqual('rgb(204, 0, 0)');
            expect(borderColor(colors[5])).toEqual('rgb(237, 141, 27)');
        }));
    });
});


function borderColor(element: any) {
    let computedStyle = getComputedStyle(element);

    return computedStyle.borderColor !== '' ? computedStyle.borderColor :
        computedStyle.borderBottomColor;


}

@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-stepper [steps]="steps1" [currentStep]="currentStep1"></aw-stepper>
    `
})
class BasicStepperTestComponent {
    @ViewChild(StepperComponent)
    stepper: StepperComponent;

    steps1: string[] = ['Monitor', 'Add Supplier', 'Get Quote'];
    currentStep1: number = 1;
}

@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-stepper [steps]="steps2" [stepColorCurrent]="'#ff9900'"
                    [stepColorRemaining]="'#CC0000'"
                    [stepColorCompleted]="'#97a822'" [currentStep]="currentStep2">
        </aw-stepper>

        <button id='prev' size="small" [style]="'secondary'"
                (click)="currentStep2 = currentStep2 - 1;">prev
        </button>
        <button id='next' size="small" [style]="'secondary'"
                (click)="currentStep2 = currentStep2 + 1">next
        </button>
    `
})
class StepperWithColorsOverridenTestComponent {
    @ViewChild(StepperComponent)
    stepper: StepperComponent;

    steps2: string[] = [
        'Guide Buying', 'PD Agent', 'Sourcing App',
        'Supplier bidding', 'Awarding'
    ];
    currentStep2: number = 2;
}


@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-stepper [steps]="steps3" [colors]="colors3" [currentStep]="currentStep3"></aw-stepper>
    `
})
class StepperWithColorArrayTestComponent {

    @ViewChild(StepperComponent)
    stepper: StepperComponent;

    steps3: string[] = ['Home', 'Tasks', 'Search', 'Edit', 'Accounts', 'Manage'];
    colors3: string[] = ['#009999', '#54757a', '#ffff00', '#97a822', '#cc0000', '#ed8d1b'];
    currentStep3: number = 0;
}
