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
import {TextAreaComponent} from './text-area.component';
import {Component, ViewChild} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {FormGroup} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {AribaCoreModule} from '../../../core/ariba.core.module';
import {AWTextAreaModule} from './text-area.module';
import {AWFormTableModule} from '../../layouts/form-table/form-table.module';
import {AribaComponentsTestProviderModule} from '../../ariba.component.provider.module';


describe('TextArea component behavior', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TextAreaInstantiationComponent,
        TextAreaInsideParentContainerComponent,
        TextAreaReadOnlyComponent
      ],
      imports: [
        AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
        AribaComponentsTestProviderModule.forRoot(),
        AWTextAreaModule,
        AWFormTableModule
      ]
    });

    TestBed.compileComponents();

  });


  it('It should setup a default values when just a value bindings is passed', () => {

    const fixtureWrapper = TestBed.createComponent(TextAreaInstantiationComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.textAreaComponent.editable).toEqual(true);
    expect(fixtureWrapper.componentInstance.textAreaComponent.env.currentForm).toBeDefined();
    expect(fixtureWrapper.componentInstance.textAreaComponent.formControl).toBeDefined();
    expect(fixtureWrapper.componentInstance.textAreaComponent.name).toBeDefined();
    expect(fixtureWrapper.componentInstance.textAreaComponent.rows).toEqual(2);
    expect(fixtureWrapper.componentInstance.textAreaComponent.columns).toEqual(20);
  });


  it('should size the text area correct based on the passed input rows and columns.', () => {

    const tmpl = '<aw-text-area [value]="inputValue" [rows]="rows" ' +
      '[columns]="cols"></aw-text-area>';
    TestBed.overrideComponent(TextAreaInstantiationComponent, {set: {template: tmpl}});


    const fixtureWrapper = TestBed.createComponent(TextAreaInstantiationComponent);
    fixtureWrapper.detectChanges();


    const txtArea = fixtureWrapper.debugElement.query(By.css('.w-text-area'));
    expect(txtArea.nativeElement.cols).toEqual(50);
    expect(txtArea.nativeElement.rows).toEqual(40);

  });


  it('should inherit values from parent component such as name, formControl, formGroup.', () => {

    const fixtureWrapper = TestBed.createComponent(TextAreaInsideParentContainerComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.textAreaComponent.editable).toEqual(true);
    expect(fixtureWrapper.componentInstance.textAreaComponent.formControl).toBeDefined();
    expect(fixtureWrapper.componentInstance.textAreaComponent.env.currentForm).toBeDefined();
    expect(fixtureWrapper.componentInstance.textAreaComponent.name).toEqual('firstName');


  });


  // todo: think about also how text area values should or should not be wrapped
  it('should render in readonly mode when editable is FALSE. ', () => {

    const fixtureWrapper = TestBed.createComponent(TextAreaReadOnlyComponent);
    fixtureWrapper.detectChanges();


    const txtArea = fixtureWrapper.debugElement.query(By.css('.w-string-field'));
    expect(txtArea.nativeElement.textContent).toEqual('Some text-ReadOnly');
  });


});


@Component({
  selector: 'wrapper-comp',
  template: '<aw-text-area [value]="inputValue" [autoResize]="autoResize" ></aw-text-area>'
})
class TextAreaInstantiationComponent {
  @ViewChild(TextAreaComponent)
  textAreaComponent: TextAreaComponent;
  inputValue: string = 'Some text';

  formGroup: FormGroup = new FormGroup({});

  rows = 40;
  cols = 50;

  autoResize = false;
}


@Component({
  selector: 'wrapper-comp',
  template: '<aw-text-area [value]="inputValue" [editable]="editable"  ></aw-text-area>'
})
class TextAreaReadOnlyComponent {
  @ViewChild(TextAreaComponent)
  textAreaComponent: TextAreaComponent;
  inputValue: string = 'Some text-ReadOnly';

  formGroup: FormGroup = new FormGroup({});

  editable = false;

  rows = 40;
  cols = 50;

  autoResize = false;
}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-form-table [editable]="editing" [labelsOnTop]="labelsOnTop">
      <aw-form-row [required]="required" [label]="label">
        <aw-text-area [name]="fieldName" [value]="inputValue"
                      [autoResize]="autoResize"></aw-text-area>
      </aw-form-row>
    </aw-form-table>
  `
})
class TextAreaInsideParentContainerComponent {

  @ViewChild(TextAreaComponent)
  textAreaComponent: TextAreaComponent;
  inputValue: string = 'Some text';

  inputType: string = 'string';
  fieldName: string = 'firstName';
  label: string = 'My Name';
  required: boolean = true;
  editing: boolean = true;
  labelsOnTop: boolean = false;


  rows = 40;
  cols = 50;

  autoResize = false;


}
