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
import {RichTextAreaComponent} from './rich-text-area.component';
import {Component, ViewChild} from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormGroup} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {AribaCoreModule} from '../../../core/ariba.core.module';
import {AWRichTextAreaModule} from './rich-text-area.module';
import {AWFormTableModule} from '../../layouts/form-table/form-table.module';
import {AribaComponentsTestProviderModule} from '../../ariba.component.provider.module';


describe('RichTextArea component behavior', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditorInstantiationComponent,
        EditorInsideParentContainerComponent,
        EditorReadOnlyComponent
      ],
      imports: [
        AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
        AribaComponentsTestProviderModule.forRoot(),
        AWRichTextAreaModule,
        AWFormTableModule,
      ]
    });
    TestBed.compileComponents();

  });


  it('It should setup a default values when just a value bindings is passed', () => {

    let fixtureWrapper = TestBed.createComponent(EditorInstantiationComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.editorComponent.editable).toEqual(true);
    expect(fixtureWrapper.componentInstance.editorComponent.env.currentForm).toBeDefined();
    expect(fixtureWrapper.componentInstance.editorComponent.formControl).toBeDefined();
    expect(fixtureWrapper.componentInstance.editorComponent.name).toBeDefined();
    expect(fixtureWrapper.componentInstance.editorComponent.value).toEqual('Some text');
    expect(fixtureWrapper.componentInstance.editorComponent.placeHolder)
      .toEqual('This is place holder');
  });


  it('should pass the correct value based on new template value', fakeAsync(() => {


    let tmpl = '<aw-richtextarea [value]="inputValue"></aw-richtextarea>';
    TestBed.overrideComponent(EditorInstantiationComponent, {set: {template: tmpl}});


    let fixtureWrapper = TestBed.createComponent(EditorInstantiationComponent);
    fixtureWrapper.detectChanges();

    // Editor uses javascript to update it's inner content. Needs to wait until that's done.
    tick(100);
    fixtureWrapper.detectChanges();

    let editor = fixtureWrapper.debugElement.query(By.css('.ui-editor-content'));
    expect(editor.nativeElement.firstChild.innerHTML).toEqual('<p>Some text</p>');

  }));


  it('should inherit values from parent component such as name, formControl, formGroup.', () => {

    let fixtureWrapper = TestBed.createComponent(EditorInsideParentContainerComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.editorComponent.editable).toEqual(true);
    expect(fixtureWrapper.componentInstance.editorComponent.formControl).toBeDefined();
    expect(fixtureWrapper.componentInstance.editorComponent.env.currentForm).toBeDefined();
    expect(fixtureWrapper.componentInstance.editorComponent.name).toEqual('Description');


  });

  it('should render in readonly mode when editable is FALSE. ', () => {
    let fixtureWrapper = TestBed.createComponent(EditorReadOnlyComponent);
    fixtureWrapper.detectChanges();


    let txtArea = fixtureWrapper.debugElement.query(By.css('.w-string-field'));
    expect(txtArea.nativeElement.textContent).toEqual('Some text-ReadOnly');
  });


});


@Component({
  selector: 'wrapper-comp',
  template: '<aw-richtextarea [value]="inputValue" [placeHolder]="placeHolderText">' +
    '</aw-richtextarea>'
})
class EditorInstantiationComponent {
  @ViewChild(RichTextAreaComponent)
  editorComponent: RichTextAreaComponent;
  inputValue: string = 'Some text';
  placeHolderText: string = 'This is place holder';

  formGroup: FormGroup = new FormGroup({});
}


@Component({
  selector: 'wrapper-comp',
  template: '<aw-richtextarea [value]="inputValue" [editable]="editable"  ></aw-richtextarea>'
})
class EditorReadOnlyComponent {
  @ViewChild(RichTextAreaComponent)
  editorComponent: RichTextAreaComponent;
  inputValue: string = 'Some text-ReadOnly';

  formGroup: FormGroup = new FormGroup({});

  editable = false;
}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-form-table [editable]="editing" [labelsOnTop]="labelsOnTop">
      <aw-form-row [required]="required" [label]="label">
        <aw-richtextarea [name]="'Description'" [value]="inputValue">
        </aw-richtextarea>
      </aw-form-row>
    </aw-form-table>
  `
})
class EditorInsideParentContainerComponent {

  @ViewChild(RichTextAreaComponent)
  editorComponent: RichTextAreaComponent;
  inputValue: string = 'Some text';

  inputType: string = 'string';
  label: string = 'My Name';
  required: boolean = true;
  editing: boolean = true;
  labelsOnTop: boolean = false;
}
