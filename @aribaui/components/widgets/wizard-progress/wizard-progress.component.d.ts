/**
 * @license
 * @author amanul.chowdhury
 * Copyright 2018 SAP Ariba
 *
 * WizardProgressComponent can be used as a step progress
 * in a page that has multiple steps
 * `<aw-wizard-progress
 *  [steps]="steps"
 *  [currentStep]="currentStep"
 *  (stepChanged)="onStepChanged($event)">
 * </aw-wizard-progress>`
 */
import { EventEmitter } from '@angular/core';
export interface Step {
    complete: boolean;
    current: boolean;
    title?: string;
}
export declare class WizardProgressComponent {
    steps: Array<Step>;
    currentStep: number;
    stepChanged: EventEmitter<any>;
    totalSteps: number;
    constructor();
    ngOnInit(): void;
    setCurrentStep(index?: number): void;
    goToStep(index: number): void;
}
