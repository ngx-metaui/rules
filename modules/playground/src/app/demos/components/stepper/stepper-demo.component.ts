import {Component} from '@angular/core';

@Component({
    templateUrl: './stepper-demo.component.html',
    styleUrls: ['./stepper-demo.component.scss']
})
export class StepperDemoComponent
{


    steps1: string[] = ['Monitor', 'Add Supplier', 'Get Quote'];
    currentStep1: number = 1;

    steps2: string[] = ['Guide Buying', 'PD Agent', 'Sourcing App', 'Supplier bidding', 'Awarding'];
    currentStep2: number = 2;

    steps3: string[] = ['Home', 'Tasks', 'Search', 'Edit', 'Accounts', 'Manage'];
    colors3: string[] = ['#009999', '#54757a', '#ffff00', '#97a822', '#cc0000', '#ed8d1b'];
    currentStep3: number = 0;
}
