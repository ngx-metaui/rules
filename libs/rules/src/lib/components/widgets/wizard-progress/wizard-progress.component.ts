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

import {Component, EventEmitter, Input, Output} from '@angular/core';

export interface Step {
  complete: boolean;
  current: boolean;
  title?: string;
}

@Component({
  selector: 'aw-wizard-progress',
  templateUrl: './wizard-progress.component.html',
  styleUrls: ['./wizard-progress.component.scss']
})
export class WizardProgressComponent {
  @Input()
  steps: Array<Step>;

  @Input()
  currentStep: number = 0;

  @Output()
  stepChanged: EventEmitter<any> = new EventEmitter<any>();

  totalSteps: number = 0;

  constructor() {
  }

  ngOnInit() {
    if (this.steps) {
      const currentIndex = this.steps.indexOf(this.steps.filter(step => step.current)[0]);
      this.totalSteps = this.steps.length;
      this.setCurrentStep(~currentIndex ? currentIndex : 0);
    }
  }

  setCurrentStep(index: number = 0) {
    this.steps[index].current = true;
    this.currentStep = index;
    this.stepChanged.emit({current: this.currentStep});
  }

  goToStep(index: number) {
    if (!this.steps[index].complete) {
      return;
    }

    const currentIndex = this.steps.indexOf(this.steps.filter(step => step.current)[0]);
    this.steps[currentIndex].current = false;

    this.setCurrentStep(index);
  }
}
