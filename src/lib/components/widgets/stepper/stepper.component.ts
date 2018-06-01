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
import {Component, Input} from '@angular/core';
import {Environment, isPresent} from '@aribaui/core';
import {BaseComponent} from '../../core/base.component';


const STEPPER_COMPLETED_STEP_COLOR = '#58b957';
const STEPPER_CURRENT_STEP_COLOR = '#0076CB';
const STEPPER_REMAINING_STEP_COLOR = '#D7D7D7';

/**
 * Stepper component displays a list of steps for user to follow. It can be used as a checklist
 * to indicate completed, current and remaining items. It could be also be used to indicate
 * the state of an document, created, submitted, approved, etc...
 *
 *
 * Usage:
 *   1.   Use the component inside your template. provide a list of steps and the current step.
 *
 *          @Component({
 *                selector: 'aw-page' ,
 *                           template: `
 *                <aw-stepper [steps]="steps" [currentStep]="currentStep"></aw-stepper>
 *
 *                  `
 *         export class MyPageComponent implements OnInit {
 *
 *                     steps: string[] = ['Monitor', 'Add Supplier', 'Get Quote'];
 *                     currentStep: number = 1;
 *
 *                     constructor(private modalService: ModalService) {
 *                          super();
 *                       }
 *                     ngOnInit() { }
 *       }
 *
 *   2.  Override the default colors.
 *
 *         @Component({
 *                selector: 'aw-page' ,
 *                           template: `
 *                            <aw-stepper [steps]="steps" [stepColorCurrent]="'#ff9900'"
 *                                        [stepColorRemaining]="'#CC0000'"
 *                                        [stepColorCompleted]="'#97a822'"
 *                                        [currentStep]="currentStep">
 *                            </aw-stepper>
 *                  `
 */
@Component({
    selector: 'aw-stepper',
    templateUrl: 'stepper.component.html',
    styleUrls: ['stepper.component.scss']
})
export class StepperComponent extends BaseComponent
{
    /**
     * Required
     * Array of steps. Order of the steps should be in array order.
     */
    @Input()
    steps: string[];


    /**
     * specify the colors associated with steps above. The number of colors
     * and number of steps must match.
     * Optional:, if empty, default colors or colors from stepColor inputs will be used.
     */
    @Input()
    colors: string[];

    /**
     * Local variable to indicate whether to use the colors array or not.
     * @type {boolean}
     */
    bUseColorArray: boolean = false;

    /**
     * Optional Input for caller to override the color of completed step.
     */
    @Input()
    stepColorCompleted: string;

    /**
     * Optional Input for caller to override the color of current step.
     */
    @Input()
    stepColorCurrent: string;

    /**
     * Optional Input for caller to override the color of remaining step.
     */
    @Input()
    stepColorRemaining: string;

    /**
     * The current step that's on. If not provided default to the first step.
     */
    @Input()
    currentStep: number = 0;

    /**
     * calculated the width of connectors between steps. The calculations is so
     * that the steps are spread out evenly.
     */
    connectorWidth: any;

    constructor(public env: Environment)
    {
        super(env);
        // Initial color for the different stages of steps.
        this.stepColorCompleted = STEPPER_COMPLETED_STEP_COLOR;
        this.stepColorCurrent = STEPPER_CURRENT_STEP_COLOR;
        this.stepColorRemaining = STEPPER_REMAINING_STEP_COLOR;
    }

    ngOnInit()
    {
        // Calculate the connector width based on how many steps
        if (isPresent(this.steps) && this.steps.length > 1) {

            // (100% - 20% (side margins)) / (NumOfSteps -1)
            this.connectorWidth = Math.ceil(80 / (this.steps.length - 1)) + '%';
        }

        /**
         * Use the color array if it's defined.
         */
        if (isPresent(this.colors)) {

            this.bUseColorArray = true;

            if (this.colors.length !== this.steps.length) {
                throw new Error(`The size of the steps and colors don't match:
                  (steps.length = ${this.steps.length}), (colors.length = ${this.colors.length}`);
            }
        }
    }

    /**
     * Getting the color of the step for the current index
     *
     * @param index
     * @returns {string}
     */
    getStepColor(index: number)
    {
        // Color Array overrides everything else.
        if (this.bUseColorArray) {
            return this.colors[index];
        }

        if (index < this.currentStep) {

            return this.stepColorCompleted;

        } else if (index === this.currentStep) {

            return this.stepColorCurrent;

        } else {

            return this.stepColorRemaining;
        }
    }

    /**
     * The connector colors are driven by the step colors.
     *
     * @param index
     * @returns {string}
     */
    getConnectorColor(index: number)
    {
        // Color Array overrides everything else.
        if (this.bUseColorArray) {
            return this.colors[index];
        }

        if (index < this.currentStep) {

            return this.stepColorCompleted;

        } else {

            return this.stepColorRemaining;
        }
    }

    /**
     * Next step.
     */
    nextStep()
    {
        this.currentStep++;
    }

    /**
     * previous step.
     */
    prevStep()
    {
        this.currentStep--;
    }
}
