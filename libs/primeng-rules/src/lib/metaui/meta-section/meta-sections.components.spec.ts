/**
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
 */
import {Component} from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  BaseComponent,
  Entity,
  Environment,
  META_RULES,
  MetaRules,
  MetaUIActionEvent,
  MetaUIRulesModule, MetaUITestRulesModule
} from '@ngx-metaui/rules';
import {PrimeNgRulesModule} from '../../primeng-rules.module';


// @formatter:off
/* tslint:disable */
export const InvoiceSectionRule =
  'class=InvoiceTest {\n' +
  '      layout {\n' +
  '          trait:labelsOnTop;\n' +
  '      }\n' +
  ' \n' +
  '      zNone => *;\n' +
  '      Header.zLeft => uniqueName => itemPrice;\n' +
  '      Header.zRight => supplier => requestor;\n' +
  '      Footer.zBottom => itemDescription;\n' +
  ' \n' +
  '  }\n' +
  ' \n' +
  ' \n' +
  '  layout=InvoiceTestPage#Sections {\n' +
  '      @layout=Header#Form {\n' +
  '          zonePath:Header;\n' +
  '          label:"Label for header section";\n' +
  '          description:$object.itemDescription;\n' +
  '          opened:false;\n' +
  '      }\n' +
  ' \n' +
  '      @layout=Participant {\n' +
  '          label:"Label for Participant section";\n' +
  '          visible:true;\n' +
  '          canEdit:true;\n' +
  '          component:StringComponent;\n' +
  '          bindings:{value:" Section Content Participant"; };\n' +
  ' \n' +
  '      }\n' +
  ' \n' +
  '       @layout=Lines {\n' +
  '          label:"Label for Line Item section";\n' +
  '          visible:true;\n' +
  '          canEdit:true;\n' +
  '          editMode:"external";\n' +
  '          actionIcon:"icon-positive";\n' +
  '          component:StringComponent;\n' +
  '          bindings:{value:" Section Content Participant"; };\n' +
  '      }\n' +
  ' \n' +
  '      @layout=Footer#Form {\n' +
  '         label:"Label for footer section";\n' +
  '         zonePath:Footer;\n' +
  '      }\n' +
  '  }';

// @formatter:on
/* tslint:disable */

describe('Meta Sections', () => {
  beforeEach((done) => {


    TestBed.configureTestingModule({
      declarations: [
        TestMetaSectionComponent,
        TestMetaSectionDeferredComponent
      ],
      imports: [
        MetaUITestRulesModule.forRoot({'env.test': true}),
        PrimeNgRulesModule.forRoot(),
        NoopAnimationsModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]

    });

    TestBed.compileComponents();

    window.setTimeout(function() {
      done();
    }, 0);
  });


  it('It should render 4 section 1. forms, 2. string, 3. string, 4.form', () => {

    const metaUI: MetaRules = TestBed.inject(META_RULES);
    metaUI.addTestUserRule('InvoiceTestRule', InvoiceSectionRule);

    TestBed.compileComponents();
    let fixtureWrapper = TestBed.createComponent(TestMetaSectionComponent);
    fixtureWrapper.detectChanges();

    let sections = fixtureWrapper.nativeElement.querySelectorAll('.section-container ');
    let formTables = fixtureWrapper.debugElement.queryAllNodes(By.css('.w-form-table'));


    let stringComponents = fixtureWrapper.nativeElement
      .querySelectorAll('.section-container .ui-accordion-content > aw-string');

    expect(sections.length).toBe(4);
    expect(stringComponents.length).toBe(2);
    expect(formTables.length).toEqual(2);
  });

  it('It should render first section collapsed', () => {

    const metaUI: MetaRules = TestBed.inject(META_RULES);
    metaUI.addTestUserRule('InvoiceTestRule', InvoiceSectionRule);

    TestBed.compileComponents();
    let fixtureWrapper = TestBed.createComponent(TestMetaSectionComponent);
    fixtureWrapper.detectChanges();

    let sections = fixtureWrapper.nativeElement.querySelectorAll('.section-container ');
    let closedIconElem = sections[0].querySelectorAll('.fa-caret-right');

    expect(closedIconElem).toBeDefined();

  });


  it('should render last section expended with rendered one invoice field', () => {
    const metaUI: MetaRules = TestBed.inject(META_RULES);
    metaUI.addTestUserRule('InvoiceTestRule', InvoiceSectionRule);

    let fixtureWrapper = TestBed.createComponent(TestMetaSectionComponent);
    fixtureWrapper.detectChanges();

    let sections = fixtureWrapper.nativeElement.querySelectorAll('.section-container ');
    let formLabel = sections[3].querySelectorAll('.control-label > label');

    expect(formLabel.length).toBe(1);
    expect(formLabel[0].textContent.trim()).toBe('Item Description');
  });


  it('should show edit button for 2nd section when we add property "editable:true"', () => {
    const metaUI: MetaRules = TestBed.inject(META_RULES);
    metaUI.addTestUserRule('InvoiceTestRule', InvoiceSectionRule);

    let fixtureWrapper = TestBed.createComponent(TestMetaSectionComponent);
    fixtureWrapper.detectChanges();

    let sections = fixtureWrapper.nativeElement.querySelectorAll('.section-container ');
    let editIcon = sections[1].querySelectorAll('.section-edit-action');

    expect(editIcon.length).toBe(1);
  });


  it('should show custom icon for 3d section when using property actionIcon:"icon-positive"',
    () => {
      const metaUI: MetaRules = TestBed.inject(META_RULES);

      metaUI.addTestUserRule('InvoiceTestRule', InvoiceSectionRule);

      let fixtureWrapper = TestBed.createComponent(TestMetaSectionComponent);
      fixtureWrapper.detectChanges();

      let sections = fixtureWrapper.nativeElement.querySelectorAll('.section-container ');
      let customIcon = sections[2].querySelectorAll('.icon-positive');

      expect(customIcon.length).toBe(1);
    });


  it('broadcasts event onEdit when clicking on edit icon (2nd section)',
    fakeAsync(() => {
      const metaUI: MetaRules = TestBed.inject(META_RULES);
      metaUI.addTestUserRule('InvoiceTestRule', InvoiceSectionRule);

      let fixtureWrapper = TestBed.createComponent(TestMetaSectionComponent);
      fixtureWrapper.detectChanges();

      let sections = fixtureWrapper.nativeElement.querySelectorAll('.section-container ');
      let editIcon = sections[1].querySelectorAll('.icon-edit');
      expect(editIcon.length).toBe(1);

      editIcon[0].click();

      tick();
      fixtureWrapper.detectChanges();
      expect(fixtureWrapper.componentInstance.actionClicked).toBe('onEdit');

    }));


  it('shows cancel and save button when edit icon is clicked on 2nd Section',
    fakeAsync(() => {
      const metaUI: MetaRules = TestBed.inject(META_RULES);
      metaUI.addTestUserRule('InvoiceTestRule', InvoiceSectionRule);

      let fixtureWrapper = TestBed.createComponent(TestMetaSectionComponent);
      fixtureWrapper.detectChanges();

      let sections = fixtureWrapper.nativeElement.querySelectorAll('.section-container ');
      let editIcon = sections[1].querySelectorAll('.icon-edit');
      expect(editIcon.length).toBe(1);

      editIcon[0].click();
      tick();
      fixtureWrapper.detectChanges();

      let buttons = fixtureWrapper.nativeElement.querySelectorAll('.footer-actions button');
      expect(buttons.length).toBe(2);

    }));


  it('hides footer buttons (cancel, save) when we click on Save action button',
    fakeAsync(() => {
      const metaUI: MetaRules = TestBed.inject(META_RULES);
      metaUI.addTestUserRule('InvoiceTestRule', InvoiceSectionRule);

      let fixtureWrapper = TestBed.createComponent(TestMetaSectionComponent);
      fixtureWrapper.detectChanges();

      let sections = fixtureWrapper.nativeElement.querySelectorAll('.section-container ');
      let editIcon = sections[1].querySelectorAll('.icon-edit');
      expect(editIcon.length).toBe(1);

      editIcon[0].click();
      tick();
      fixtureWrapper.detectChanges();

      let buttons = fixtureWrapper.nativeElement.querySelectorAll('.footer-actions button');
      expect(buttons.length).toBe(2);
      buttons[1].click();

      tick();
      fixtureWrapper.detectChanges();

      buttons = fixtureWrapper.nativeElement.querySelectorAll('.footer-actions button');
      expect(buttons.length).toBe(0);

    }));


  it('Render a expanded form with rendered 1 field when object loaded is deferred using timer',
    fakeAsync(() => {
      const metaUI: MetaRules = TestBed.inject(META_RULES);
      metaUI.addTestUserRule('InvoiceTestRule', InvoiceSectionRule);

      let fixtureWrapper = TestBed.createComponent(TestMetaSectionDeferredComponent);
      fixtureWrapper.detectChanges();

      tick(50);
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      let sections = fixtureWrapper.nativeElement.querySelectorAll('.section-container ');
      let formLabel = sections[3].querySelectorAll('.control-label > label');

      expect(formLabel.length).toBe(1);
      expect(formLabel[0].textContent.trim()).toBe('Item Description');


    }));


});


export class InvoiceTest implements Entity {
  uniqueName: string;
  itemName: string;
  itemPrice: string;
  itemDescription: string;
  supplier: string;
  requestor: string;


  constructor() {
    this.uniqueName = 'Inv123';
  }

  /**
   * Used by Resource in order to deserialize JSON to Typed Object
   */
  getTypes(): any {
    return {
      uniqueName: String,
      itemName: String,
      itemDescription: String,
      supplier: String,
      itemPrice: String,
      requestor: String
    };
  }

  identity(): string {
    return this.uniqueName;
  }


  className(): string {
    return 'InvoiceTest';
  }
}


@Component({
  selector: 'wrapper-comp',
  template: `
    <m-context [object]="inv" operation="view" layout="InvoiceTestPage"
               (onAction)="onActionHandler($event)">
      <m-include-component></m-include-component>
    </m-context>
  `
})
class TestMetaSectionComponent {
  inv: InvoiceTest = new InvoiceTest();
  actionClicked = 'none';

  constructor() {
    this.inv.uniqueName = '6';
    this.inv.itemName = 'iPhone 8';
    this.inv.itemDescription = 'iPhone 8, 16gb';
    this.inv.supplier = 'Apple Inc.';
    this.inv.itemPrice = '123.11';
    this.inv.requestor = 'Dan John';
  }

  onActionHandler(event: MetaUIActionEvent): void {
    this.actionClicked = event.eventName;

    if (event.eventName === 'onSaveAction') {
      (event.component).completeEditing();
    }
  }
}


@Component({
  selector: 'wrapper-comp',
  template: `
    <m-context [object]="inv" operation="view" layout="InvoiceTestPage">
      <m-include-component></m-include-component>
    </m-context>
  `
})
class TestMetaSectionDeferredComponent extends BaseComponent {
  inv: InvoiceTest = new InvoiceTest();
  actionClicked = 'none';

  constructor(public env: Environment) {
    super(env);
  }


  ngOnInit(): void {
    super.ngOnInit();

    setTimeout(() => {
      this.inv.uniqueName = '6';
      this.inv.itemName = 'iPhone 8';
      this.inv.itemDescription = 'iPhone 8, 16gb';
      this.inv.supplier = 'Apple Inc.';
      this.inv.itemPrice = '123.11';
      this.inv.requestor = 'Dan John';
    }, 50);


  }

}
