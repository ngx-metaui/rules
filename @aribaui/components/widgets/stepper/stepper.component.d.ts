import { Environment } from '@aribaui/core';
import { BaseComponent } from '../../core/base.component';
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
export declare class StepperComponent extends BaseComponent {
    env: Environment;
    /**
     * Required
     * Array of steps. Order of the steps should be in array order.
     */
    steps: string[];
    /**
     * specify the colors associated with steps above. The number of colors
     * and number of steps must match.
     * Optional:, if empty, default colors or colors from stepColor inputs will be used.
     */
    colors: string[];
    /**
     * Local variable to indicate whether to use the colors array or not.
     */
    bUseColorArray: boolean;
    /**
     * Optional Input for caller to override the color of completed step.
     */
    stepColorCompleted: string;
    /**
     * Optional Input for caller to override the color of current step.
     */
    stepColorCurrent: string;
    /**
     * Optional Input for caller to override the color of remaining step.
     */
    stepColorRemaining: string;
    /**
     * The current step that's on. If not provided default to the first step.
     */
    currentStep: number;
    /**
     * calculated the width of connectors between steps. The calculations is so
     * that the steps are spread out evenly.
     */
    connectorWidth: any;
    constructor(env: Environment);
    ngOnInit(): void;
    /**
     * Getting the color of the step for the current index
     *
     * @param index
     */
    getStepColor(index: number): string;
    /**
     * The connector colors are driven by the step colors.
     *
     */
    getConnectorColor(index: number): string;
    /**
     * Next step.
     */
    nextStep(): void;
    /**
     * previous step.
     */
    prevStep(): void;
}
