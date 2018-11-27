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
import {AWSectionModule} from './section.module';
import {AWFormTableModule} from '../../layouts/form-table/form-table.module';
import {AWButtonModule} from '../../widgets/button/button.module';
import {SectionComponent} from '../../widgets/section/section.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MetaUIRulesModule} from '@ngx-metaui/rules';
import {PrimeNgRulesModule} from '../../../primeng-rules.module';


describe('Section component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicSectionTestComponent,
        SectionAttributeEditableTestComponent,
        SectionAttributeClosedTestComponent,
        SectionEditableWithButtonsTestComponent,
        SectionEditableWithCustomEditActionTestComponent,
        SectionWithNoHeaderTestComponent
      ],
      imports: [
        MetaUIRulesModule.forRoot({'i18n.enabled': false, 'env.test': true}),
        PrimeNgRulesModule.forRoot(),
        AWSectionModule,
        AWFormTableModule,
        NoopAnimationsModule,
        AWButtonModule
      ]
    });

    TestBed.compileComponents();

  });

  describe('methods', () => {

    it('should be able to open and close', fakeAsync(() => {


      const fixtureWrapper = TestBed.createComponent(BasicSectionTestComponent);
      fixtureWrapper.detectChanges();

      // Verify that the section is open.
      const contentW = fixtureWrapper.nativeElement.querySelector(
        '.ui-accordion-content-wrapper');
      expect(getComputedStyle(contentW).height).not.toEqual('0px');

      // Send a click to close it.
      const title = fixtureWrapper.nativeElement.querySelector('.section-title');
      title.click();

      // wait for the change
      fixtureWrapper.detectChanges();
      tick();
      fixtureWrapper.detectChanges();

      // Verify that the section is closed.
      // The contents are hidden.  0px
      tick();
      fixtureWrapper.detectChanges();


      // cannot use height as there is animation happening.
      // expect(contentW.style["height"]).toEqual('0px');
      expect(fixtureWrapper.componentInstance.section.expanded).toBeFalsy();

    }));
  });


  describe('attributes', () => {

    beforeEach(() => {

    });

    it('should correctly have title, description and content displayed', () => {

      const fixtureWrapper = TestBed.createComponent(BasicSectionTestComponent);
      fixtureWrapper.detectChanges();

      const title = fixtureWrapper.nativeElement.querySelector('.section-title');
      expect(title.textContent.trim()).toEqual('section title');

      const description = fixtureWrapper.nativeElement.querySelector('.section-description');
      expect(description.textContent.trim()).toEqual('section description');

      const contentW = fixtureWrapper.nativeElement.querySelector(
        '.ui-accordion-content-wrapper');
      expect(getComputedStyle(contentW).height).not.toEqual('0px');

      const content = fixtureWrapper.nativeElement.querySelector('.ui-widget-content');
      expect(content.textContent.trim()).toEqual('section content');
    });


    it('should display edit icon and be editable when editable="true"', () => {

      const fixtureWrapper = TestBed.createComponent(SectionAttributeEditableTestComponent);
      fixtureWrapper.detectChanges();

      const editIcon = fixtureWrapper.nativeElement.querySelector('.icon-edit');
      expect(editIcon).not.toBeNull();

    });


    it('should content be hidden when opened="false"', fakeAsync(() => {

      const fixtureWrapper = TestBed.createComponent(SectionAttributeClosedTestComponent);
      fixtureWrapper.detectChanges();

      const title = fixtureWrapper.nativeElement.querySelector('.section-title');
      expect(title.textContent.trim()).toEqual('section title');

      const description = fixtureWrapper.nativeElement.querySelector('.section-description');
      expect(description.textContent.trim()).toEqual('section description');

      // Have to tick to let animation take place to hide the value.
      tick();

      // The contents are hidden.  0px
      const content = fixtureWrapper.nativeElement.querySelector(
        '.ui-accordion-content-wrapper');
      expect(getComputedStyle(content).getPropertyValue('height')).toEqual('0px');
    }));

    it('should be opened and not closable when title and description are not present', () => {

      const fixtureWrapper = TestBed.createComponent(SectionWithNoHeaderTestComponent);
      fixtureWrapper.detectChanges();

      const title = fixtureWrapper.nativeElement.querySelector('.section-title');
      expect(title.textContent.trim()).toEqual('');

      const description = fixtureWrapper.nativeElement.querySelector('.section-description');
      expect(description).toEqual(null);

      const contentW = fixtureWrapper.nativeElement.querySelector(
        '.ui-accordion-header');
      expect(getComputedStyle(contentW).height).toEqual('1px');

      expect(fixtureWrapper.componentInstance.section.disableClose).toBeTruthy();
    });

  });


  describe('editability support', () => {

    it('should expand section and set editState to TRUE when edit icon is clicked',
      fakeAsync(() => {
        const fixtureWrapper = TestBed.createComponent(SectionAttributeEditableTestComponent);
        fixtureWrapper.detectChanges();

        const editIcon = fixtureWrapper.nativeElement.querySelector('.section-edit-action');
        editIcon.click();

        tick();
        fixtureWrapper.detectChanges();


        tick();
        fixtureWrapper.detectChanges();

        expect(fixtureWrapper.componentInstance.section.expanded).toBeTruthy();
        expect(fixtureWrapper.componentInstance.section.editState).toBeTruthy();

      }));


    it('should not render edit icon when in editing mode (editState=true)', fakeAsync(() => {
      const fixtureWrapper = TestBed.createComponent(SectionAttributeEditableTestComponent);
      fixtureWrapper.detectChanges();

      let editIcon = fixtureWrapper.nativeElement.querySelector('.section-edit-action');
      editIcon.click();


      tick();
      fixtureWrapper.detectChanges();


      editIcon = fixtureWrapper.nativeElement.querySelector('.section-edit-action');

      expect(editIcon).toBeNull();


    }));


    it('should render default buttons when in Editing mode', fakeAsync(() => {
      const fixtureWrapper = TestBed.createComponent(SectionAttributeEditableTestComponent);
      fixtureWrapper.detectChanges();

      const editIcon = fixtureWrapper.nativeElement.querySelector('.section-edit-action');
      editIcon.click();


      tick();
      fixtureWrapper.detectChanges();


      const buttons = fixtureWrapper.nativeElement.querySelectorAll('.footer-actions' +
        ' button');
      expect(buttons.length).toBe(2);

    }));


    it('should render custom actions when action template is used', fakeAsync(() => {
      const fixtureWrapper = TestBed.createComponent(SectionEditableWithButtonsTestComponent);
      fixtureWrapper.detectChanges();

      const editIcon = fixtureWrapper.nativeElement.querySelector('.section-edit-action');
      editIcon.click();


      tick();
      fixtureWrapper.detectChanges();


      const buttons = fixtureWrapper.nativeElement.querySelectorAll('.footer-actions button');
      expect(buttons[0].textContent.trim()).toBe('ButtonTest1');
      expect(buttons[1].textContent.trim()).toBe('ButtonTest2');

    }));


    it('should trigger events when actions Save/Canced are clicked', fakeAsync(() => {
      const fixtureWrapper = TestBed.createComponent(SectionAttributeEditableTestComponent);
      fixtureWrapper.detectChanges();

      // switch to edit mode
      const editIcon = fixtureWrapper.nativeElement.querySelector('.section-edit-action');
      editIcon.click();


      tick();
      fixtureWrapper.detectChanges();


      const buttons = fixtureWrapper.nativeElement.querySelectorAll('.footer-actions button');
      buttons[0].click();

      tick();
      fixtureWrapper.detectChanges();

      buttons[1].click();

      tick();
      fixtureWrapper.detectChanges();
      fixtureWrapper.detectChanges();


      expect(fixtureWrapper.componentInstance.cancelClicked).toBeTruthy();
      expect(fixtureWrapper.componentInstance.saveClicked).toBeTruthy();
    }));


    it('should render custom edit icon when [actionIcon] binding is provided',
      fakeAsync(() => {
        const fixtureWrapper = TestBed.createComponent(
          SectionEditableWithCustomEditActionTestComponent);
        fixtureWrapper.detectChanges();

        const editIcon = fixtureWrapper.nativeElement.querySelector('.section-edit-action');

        expect(editIcon.classList).toContain('icon-positive');

      }));


    it('should emit onEdit event when custom editAction is clicked and editMode=external',
      fakeAsync(() => {
        const fixtureWrapper = TestBed.createComponent(
          SectionEditableWithCustomEditActionTestComponent);
        fixtureWrapper.detectChanges();

        // switch to edit mode
        const editIcon = fixtureWrapper.nativeElement.querySelector('.section-edit-action');
        editIcon.click();


        tick();
        fixtureWrapper.detectChanges();
        fixtureWrapper.detectChanges();


        expect(fixtureWrapper.componentInstance.clicked).toBeTruthy();
      }));


    it('should not render in editable state the footer container with buttons when editMode' +
      ' = external',
      fakeAsync(() => {
        const fixtureWrapper = TestBed.createComponent(
          SectionEditableWithCustomEditActionTestComponent);
        fixtureWrapper.detectChanges();

        // switch to edit mode
        const editIcon = fixtureWrapper.nativeElement.querySelector('.section-edit-action');
        editIcon.click();


        tick();
        fixtureWrapper.detectChanges();
        fixtureWrapper.detectChanges();


        const fAction = fixtureWrapper.nativeElement.querySelector('.footer-actions');

        expect(fAction).toBeNull();
      }));

  });

});


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-section
      [title]="title"
      [description]="description">
      section content
    </aw-section>
  `
})
class BasicSectionTestComponent {
  @ViewChild(SectionComponent)
  section: SectionComponent;


  title: string = 'section title';
  description = 'section description';
}

@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-section
      [title]="title"
      [description]="description"
      [opened]="false">
      section hidden
      The content section should have 0 height.
    </aw-section>
  `
})
class SectionAttributeClosedTestComponent {
  title: string = 'section title';
  description = 'section description';
}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-section
      [title]="title"
      [description]="description"
      (onCancelAction)="cancelClicked = true"
      (onSaveAction)="saveClicked = true"
      [opened]="false"
      [editable]="true">
      section content
    </aw-section>
  `
})
class SectionAttributeEditableTestComponent {

  @ViewChild(SectionComponent)
  section: SectionComponent;

  title: string = 'section title';
  description = 'section description';


  cancelClicked = false;
  saveClicked = false;
}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-section [title]="title"
                [editable]="true">
      section content

      <aw-section-actions>
        <aw-button>
          ButtonTest1
        </aw-button>

        <aw-button>
          ButtonTest2
        </aw-button>
      </aw-section-actions>
    </aw-section>
  `
})
class SectionEditableWithButtonsTestComponent {

  @ViewChild(SectionComponent)
  section: SectionComponent;

  title: string = 'section title';
  description = 'section description';

}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-section #s1 title="User Information"
                [actionIcon]="'icon-positive'"
                (onEdit)="onAddSomething($event)"
                [editable]="true" [editMode]="'external'">

      <div>
        Content
      </div>
    </aw-section>
  `
})
class SectionEditableWithCustomEditActionTestComponent {

  @ViewChild(SectionComponent)
  section: SectionComponent;


  clicked = false;

  onAddSomething(event: any, section: SectionComponent): void {

    this.clicked = true;
    // section.completeEditing()

  }

}

@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-section #s1
                (onEdit)="onAddSomething($event)"
                [editable]="true" [editMode]="'external'">

      <div>
        Content
      </div>
    </aw-section>
  `
})
class SectionWithNoHeaderTestComponent {

  @ViewChild(SectionComponent)
  section: SectionComponent;

  clicked = false;

  onAddSomething(event: any, section: SectionComponent): void {

    this.clicked = true;
  }

}
