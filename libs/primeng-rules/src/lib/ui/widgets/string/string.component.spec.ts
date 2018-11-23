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
import {Component, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {TestBed} from '@angular/core/testing';
import {StringComponent} from './string.component';
import {AWStringFieldModule} from './string.module';
import {AWFormTableModule} from '../../layouts/form-table/form-table.module';
import {AribaComponentsTestProviderModule} from '../../ariba.component.provider.module';
import {MetaUIRulesModule} from '@ngx-metaui/rules';


describe(
  ' Describe instantiation of the StringFieldComponent so it have correct values under ' +
  'certain considered situation', () => {


    beforeEach(() => {
    });

    it(' it should render string value in read only mode  ', () => {
      TestBed.configureTestingModule({
        declarations: [
          TestStringCompComponent
        ],
        imports: [
          MetaUIRulesModule.forRoot({'i18n.enabled': false, 'env.test': true}),
          AribaComponentsTestProviderModule.forRoot(),
          AWStringFieldModule,
          AWFormTableModule

        ]
      });

      TestBed.compileComponents();
      const fixtureWrapper = TestBed.createComponent(TestStringCompComponent);
      fixtureWrapper.detectChanges();

      const formInput = fixtureWrapper.debugElement.query(By.css('.w-string-field'));
      expect(formInput.nativeElement.textContent).toEqual('Some text');
    });


  });


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-form-table [editable]="false" [labelsOnTop]="labelsOnTop">
      <aw-form-row [name]="fieldName" [required]="required" [label]="label">
        <aw-string [value]="inputValue"></aw-string>
      </aw-form-row>
    </aw-form-table>
  `
})
class TestStringCompComponent {
  @ViewChild(StringComponent)
  inputComponent: StringComponent;
  inputValue: string = 'Some text';
  inputType: string = 'string';
  fieldName: string = 'firstName';
  label: string = 'My Name';
  required: boolean = true;
  editing: boolean = true;
  labelsOnTop: boolean = false;

}


