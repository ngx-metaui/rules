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
import {Component, ViewChild} from '@angular/core';
import {FormTableComponent} from './form-table.component';
import {FormRowComponent} from './form-row/form-row.component';
import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AWFormTableModule} from './form-table.module';
import {AWInputFieldModule} from '../../widgets/input-field/input-field.module';
import {AbstractControl, ValidatorFn} from '@angular/forms';
import {InputFieldComponent} from '../../widgets//input-field/input-field.component';
import {MetaUIRulesModule, MetaUITestRulesModule} from '@ngx-metaui/rules';
import {PrimeNgRulesModule} from '../../../primeng-rules.module';

describe('Form Table behavior ', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        OneColLayoutTestComponent,
        TwoColLayoutTestComponent,
        TopBottomTestComponent,
        TwoColAndTopLayoutTestComponent,
        RowValidationWithInputFieldTestComponent
      ],
      imports: [
        MetaUITestRulesModule.forRoot({'i18n.enabled': false, 'env.test': true}),
        PrimeNgRulesModule.forRoot(),
        AWFormTableModule,
        AWInputFieldModule
      ]

    });

    TestBed.compileComponents();

  });


  describe('its 1  column simple Layout', () => {

    it(' should be editable by default and labelsOnTop should be FALSE, useFiveZone should ' +
      'be false', () => {

      const fixtureWrapper = TestBed.createComponent(OneColLayoutTestComponent);
      fixtureWrapper.detectChanges();

      expect(fixtureWrapper.componentInstance.formTable.editable).toBeTruthy();
      expect(fixtureWrapper.componentInstance.formTable.labelsOnTop).toBeFalsy();
      expect(fixtureWrapper.componentInstance.formTable.useFiveZone).toBeFalsy();
    });


    it(' should render component wrapped in Form and layout in 2 columns 1 for labels and 1 ' +
      'for control', () => {

      const fixtureWrapper = TestBed.createComponent(OneColLayoutTestComponent);
      fixtureWrapper.detectChanges();

      expect(fixtureWrapper.componentInstance.formTable.useFiveZone).toBeFalsy();

      const formRow = fixtureWrapper.nativeElement.querySelectorAll('.w-form-row');
      expect(formRow).toBeDefined();
      expect(formRow.length).toBe(2);

      expect(formRow[0].children.length).toBe(2);
      expect(formRow[1].children.length).toBe(2);

      expect(formRow[0].children[0].classList[3]).toEqual('ui-md-3');
      expect(formRow[0].children[1].classList[3]).toEqual('ui-md-6');


      expect(formRow[1].children[0].classList[3]).toEqual('ui-md-3');
      expect(formRow[1].children[1].classList[3]).toEqual('ui-md-6');


    });


    it(' it should render 12 columns for control when labelsOnTop is TRUE', () => {
      const fixtureWrapper = TestBed.createComponent(OneColLayoutTestComponent);
      fixtureWrapper.componentInstance.labelsOnTop = true;
      fixtureWrapper.detectChanges();


      const formRow = fixtureWrapper.nativeElement.querySelectorAll('.w-form-row');

      expect(formRow).toBeDefined();
      expect(formRow.length).toBe(2);


      expect(formRow[0].children[0].classList[1]).toEqual('ui-g-12');


    });
  });


  describe('its 5 zone  column Layout', () => {

    it(' it should have default zone zLeft defauled when we have 5 zone layout and nothing ' +
      'is passed in', () => {

      const fixtureWrapper = TestBed.createComponent(TwoColLayoutTestComponent);
      fixtureWrapper.detectChanges();

      expect(fixtureWrapper.componentInstance.formTable.useFiveZone).toBeTruthy();
    });


    it(' it should render controls in two column layout', () => {

      const fixtureWrapper = TestBed.createComponent(TwoColLayoutTestComponent);
      fixtureWrapper.detectChanges();

      const left = fixtureWrapper.nativeElement.querySelectorAll('aw-left');
      const right = fixtureWrapper.nativeElement.querySelectorAll('aw-right');
      const top = fixtureWrapper.nativeElement.querySelectorAll('aw-top');
      const bottom = fixtureWrapper.nativeElement.querySelectorAll('aw-bottom');

      expect(left.length).toEqual(1);
      expect(right.length).toEqual(1);
      expect(top.length).toEqual(0);
      expect(bottom.length).toEqual(0);

    });


    it(' it should render controls in two column layout and Top zone', () => {

      const fixtureWrapper = TestBed.createComponent(TwoColAndTopLayoutTestComponent);
      fixtureWrapper.detectChanges();

      fixtureWrapper.detectChanges();

      const left = fixtureWrapper.nativeElement.querySelectorAll('aw-left');
      const right = fixtureWrapper.nativeElement.querySelectorAll('aw-right');
      const top = fixtureWrapper.nativeElement.querySelectorAll('aw-top');
      const bottom = fixtureWrapper.nativeElement.querySelectorAll('aw-bottom');

      expect(left.length).toEqual(1);
      expect(right.length).toEqual(1);
      expect(top.length).toEqual(1);
      expect(bottom.length).toEqual(0);
    });


    it(' it should render controls in two rows with zones top and bottom', () => {

      const fixtureWrapper = TestBed.createComponent(TopBottomTestComponent);
      fixtureWrapper.detectChanges();


      const left = fixtureWrapper.nativeElement.querySelectorAll('aw-left');
      const right = fixtureWrapper.nativeElement.querySelectorAll('aw-right');
      const top = fixtureWrapper.nativeElement.querySelectorAll('aw-top');

      expect(left.length).toEqual(0);
      expect(right.length).toEqual(0);
      expect(top.length).toEqual(1);
    });


    it(' should  says TRUE when calling hasTwoColumns when we have LEFT, RIGHT columns' +
      ' present', fakeAsync(() => {

      const fixtureWrapper = TestBed.createComponent(TwoColLayoutTestComponent);
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      expect(fixtureWrapper.componentInstance.formTable.hasTwoColumn).toBeTruthy();
    }));


  });

  describe('FormTable row level validation', () => {
    it('should apply correct maxLength validation and set FormControl.valid property',
      async(() => {
        const fixtureWrapper =
          TestBed.createComponent(RowValidationWithInputFieldTestComponent);
        fixtureWrapper.componentInstance.type = 1;
        fixtureWrapper.detectChanges();

        fixtureWrapper.componentInstance.inputValue = '123456';
        fixtureWrapper.detectChanges();

        fixtureWrapper.whenStable().then(() => {
          expect(fixtureWrapper.componentInstance.inputComponent.formControl.dirty)
            .toBe(false);
          expect(fixtureWrapper.componentInstance.inputComponent.formControl.valid)
            .toBe(true);
          fixtureWrapper.componentInstance.inputValue = '12345678901234567890';
          fixtureWrapper.detectChanges();

          fixtureWrapper.whenStable().then(() => {
            expect(fixtureWrapper.componentInstance.inputComponent.formControl.dirty)
              .toBe(false);
            expect(
              fixtureWrapper.componentInstance.inputComponent.formControl.valid)
              .toBe(false);
          });
        });
      }));

    it('should apply correct minLength validation and set FormControl.valid property',
      async(() => {
        const fixtureWrapper =
          TestBed.createComponent(RowValidationWithInputFieldTestComponent);
        fixtureWrapper.componentInstance.type = 2;
        fixtureWrapper.detectChanges();

        fixtureWrapper.componentInstance.inputValue = '123456';
        fixtureWrapper.detectChanges();

        fixtureWrapper.whenStable().then(() => {
          expect(fixtureWrapper.componentInstance.inputComponent.formControl.dirty)
            .toBe(false);
          expect(fixtureWrapper.componentInstance.inputComponent.formControl.valid)
            .toBe(false);
          fixtureWrapper.componentInstance.inputValue = '12345678901234567890';
          fixtureWrapper.detectChanges();

          fixtureWrapper.whenStable().then(() => {
            expect(fixtureWrapper.componentInstance.inputComponent.formControl.dirty)
              .toBe(false);
            expect(fixtureWrapper.componentInstance.inputComponent.formControl.valid)
              .toBe(true);
          });
        });
      }));

    it('should apply pattern validation and set FormControl.valid property',
      async(() => {
        const fixtureWrapper =
          TestBed.createComponent(RowValidationWithInputFieldTestComponent);
        fixtureWrapper.componentInstance.type = 3;
        fixtureWrapper.detectChanges();

        fixtureWrapper.componentInstance.inputValue = '123456';
        fixtureWrapper.detectChanges();

        fixtureWrapper.whenStable().then(() => {
          expect(fixtureWrapper.componentInstance.inputComponent.formControl.dirty)
            .toBe(false);
          expect(fixtureWrapper.componentInstance.inputComponent.formControl.valid)
            .toBe(true);
          fixtureWrapper.componentInstance.inputValue = '123456abc';
          fixtureWrapper.detectChanges();

          fixtureWrapper.whenStable().then(() => {
            expect(fixtureWrapper.componentInstance.inputComponent.formControl.dirty)
              .toBe(false);
            expect(fixtureWrapper.componentInstance.inputComponent.formControl.valid)
              .toBe(false);
          });
        });
      }));

    it('should apply required validation and set FormControl.valid property',
      async(() => {
        const fixtureWrapper =
          TestBed.createComponent(RowValidationWithInputFieldTestComponent);
        fixtureWrapper.componentInstance.type = 4;
        fixtureWrapper.detectChanges();

        fixtureWrapper.componentInstance.inputValue = '';
        fixtureWrapper.detectChanges();

        fixtureWrapper.whenStable().then(() => {
          expect(fixtureWrapper.componentInstance.inputComponent.formControl.dirty)
            .toBe(false);
          expect(fixtureWrapper.componentInstance.inputComponent.formControl.valid)
            .toBe(false);
          fixtureWrapper.componentInstance.inputValue = '123456abc';
          fixtureWrapper.detectChanges();

          fixtureWrapper.whenStable().then(() => {
            expect(fixtureWrapper.componentInstance.inputComponent.formControl.dirty)
              .toBe(false);
            expect(fixtureWrapper.componentInstance.inputComponent.formControl.valid)
              .toBe(true);
          });
        });
      }));

    it('should apply customed validators and set FormControl.valid property',
      async(() => {
        const fixtureWrapper =
          TestBed.createComponent(RowValidationWithInputFieldTestComponent);
        fixtureWrapper.componentInstance.type = 5;
        fixtureWrapper.detectChanges();

        fixtureWrapper.componentInstance.inputValue = 'abc';
        fixtureWrapper.detectChanges();

        fixtureWrapper.whenStable().then(() => {
          expect(fixtureWrapper.componentInstance.inputComponent.formControl.dirty)
            .toBe(false);
          expect(fixtureWrapper.componentInstance.inputComponent.formControl.valid)
            .toBe(true);
          fixtureWrapper.componentInstance.inputValue = '123456-abc';
          fixtureWrapper.detectChanges();

          fixtureWrapper.whenStable().then(() => {
            expect(fixtureWrapper.componentInstance.inputComponent.formControl.dirty)
              .toBe(false);
            expect(fixtureWrapper.componentInstance.inputComponent.formControl.valid)
              .toBe(false);
            // I tried to verify the text of error message also. The error message
            // is shown after the input widget lost focus. Then tried to trigger
            // "blur" event for the input widget to force it to render the error
            // message. But it seems there is some tricky in the Angular testing
            // framework, so I cannot trigger the "blur" event. What I tried:
            //
            // Approache 1:
            //     fixtureWrapper.nativeElement.querySelector('.w-input-field').blur();
            //
            // Apporache 2:
            //     var ele =
            //         fixtureWrapper.nativeElement.querySelector('.w-input-field');
            //     var event = new Event('blur');
            //     event.initEvent('blur', true, true);
            //     ele.dispatchEvent(event);
          });
        });
      }));
  });
});


@Component({
  selector: 'wrapper-comp',
  template: `

    <aw-form-table [labelsOnTop]="labelsOnTop">
      <aw-form-row [label]="'a label 1'" [name]="'name'" [size]="'medium'">
        <aw-input-field [name]="'name'" [value]="value1"></aw-input-field>
      </aw-form-row>

      <aw-form-row [label]="'a label 2'" [name]="'name2'" [size]="'medium'">
        <aw-input-field [name]="'name'" [value]="value1"></aw-input-field>
      </aw-form-row>
      =
    </aw-form-table>

  `
})
class OneColLayoutTestComponent {
  @ViewChild(FormTableComponent, {static: false})
  formTable: FormTableComponent;

  value1: string = 'value1';

  labelsOnTop = false;


}


@Component({
  selector: 'wrapper-comp',
  template: `

    <aw-form-table [useFiveZone]="fiveZone">
      <aw-left>
        <aw-form-row [label]="'a label 1'" [name]="'name'" [size]="'medium'">
          <aw-input-field [name]="'name'" [value]="value1"></aw-input-field>
        </aw-form-row>
      </aw-left>


      <aw-right>
        <aw-form-row [label]="'a label 1'" [name]="'name'" [size]="'medium'">
          <aw-input-field [name]="'name'" [value]="value1"></aw-input-field>
        </aw-form-row>
      </aw-right>
    </aw-form-table>

  `
})
class TwoColLayoutTestComponent {
  @ViewChild(FormTableComponent, {static: false})
  formTable: FormTableComponent;

  value1: string = 'value1';

  labelsOnTop = false;
  fiveZone = true;


}


@Component({
  selector: 'wrapper-comp',
  template: `

    <aw-form-table [useFiveZone]="fiveZone">
      <aw-left>
        <aw-form-row [label]="'a label 1'" [name]="'name'" [size]="'medium'">
          <aw-input-field [name]="'name'" [value]="value1"></aw-input-field>
        </aw-form-row>
      </aw-left>

      <aw-right>
        <aw-form-row [label]="'a label 1'" [name]="'name'" [size]="'medium'">
          <aw-input-field [name]="'name'" [value]="value1"></aw-input-field>
        </aw-form-row>
      </aw-right>

      <aw-top>
        <aw-form-row [label]="'a label 1'" [name]="'name'" [size]="'medium'">
          <aw-input-field [name]="'name'" [value]="value1"></aw-input-field>
        </aw-form-row>
      </aw-top>
    </aw-form-table>

  `
})
class TwoColAndTopLayoutTestComponent {
  @ViewChild(FormTableComponent, {static: false})
  formTable: FormTableComponent;

  value1: string = 'value1';

  labelsOnTop = false;
  fiveZone = true;

}


@Component({
  selector: 'wrapper-comp',
  template: `

    <aw-form-table [useFiveZone]="fiveZone">
      <aw-top>
        <aw-form-row [label]="'a label 1'" [name]="'name'" [size]="'medium'">
          <aw-input-field [name]="'name'" [value]="value1"></aw-input-field>
        </aw-form-row>
      </aw-top>

      <aw-bottom>
        <aw-form-row [label]="'a label 1'" [name]="'name'" [size]="'medium'">
          <aw-input-field [name]="'name'" [value]="value1"></aw-input-field>
        </aw-form-row>
      </aw-bottom>
    </aw-form-table>

  `
})
class TopBottomTestComponent {
  @ViewChild(FormTableComponent, {static: false})
  formTable: FormTableComponent;

  value1: string = 'value1';

  labelsOnTop = false;
  fiveZone = true;
}

@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-form-table>
      <aw-form-row [name]="'eventName'"
                   [minLength]="minLength"
                   [maxLength]="maxLength"
                   [pattern]="pattern"
                   [required]="required"
                   [customValidators]="inputValidators"
                   [label]="label">
        <aw-input-field [(ngModel)]="inputValue"
                        [name]="'eventName'"
                        [type]="inputType">
        </aw-input-field>
      </aw-form-row>
    </aw-form-table>
  `
})
class RowValidationWithInputFieldTestComponent {
  @ViewChild(InputFieldComponent, {static: false})
  inputComponent: InputFieldComponent;

  @ViewChild(FormRowComponent, {static: false})
  formRowComponent: FormRowComponent;

  inputValue: string = 'my-event-title';
  inputType: string = 'string';
  label: string = 'Event Name';
  editing: boolean = true;
  labelsOnTop: boolean = false;

  minLength: number;
  maxLength: number;
  pattern: string;
  required: boolean;
  inputValidators: ValidatorFn[];

  // For different test purpose.
  type: number;

  ngOnInit() {
    if (this.type === 1) {
      this.maxLength = 10;
    } else if (this.type === 2) {
      this.minLength = 10;
    } else if (this.type === 3) {
      this.pattern = '[0-9]+';
    } else if (this.type === 4) {
      this.required = true;
    } else if (this.type === 5) {
      this.inputValidators = this.getInputValidators();
    }
  }

  getInputValidators(): ValidatorFn[] {
    const inputValidator = (control: AbstractControl): { [key: string]: any } => {
      if (control == null || control.value == null) {
        return null;
      }

      if (control.value.includes('-')) {
        return {'customMsg': {'msg': 'It needs to exclude dashes.'}};
      } else {
        return null;
      }
    };

    return [inputValidator];
  }

}
