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
export const InvoiceSectionRule = {
  oss: [
    {
      '_selectors': [{'_key': 'class', '_value': 'InvoiceTest', '_isDecl': false}],
      '_rank': 0
    }, {
      '_selectors': [
        {
          '_key': 'class', '_value': 'InvoiceTest',
          '_isDecl': false
        }, {'_key': 'layout', '_value': '*', '_isDecl': false}
      ],
      '_properties': {'trait': 'labelsOnTop'}, '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'class', '_value': 'InvoiceTest', '_isDecl': false}
      ], '_rank': 0
    },
    {
      '_selectors': [
        {'_key': 'class', '_value': 'InvoiceTest', '_isDecl': false},
        {'_key': 'field', '_value': '*', '_isDecl': false}
      ], '_properties': {'after': 'zNone'}, '_rank': 0
    }, {
      '_selectors': [
        {
          '_key': 'class', '_value': 'InvoiceTest', '_isDecl': false
        }
      ], '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'class', '_value': 'InvoiceTest', '_isDecl': false},
        {'_key': 'field', '_value': 'uniqueName', '_isDecl': false}
      ], '_properties': {'after': 'Header.zLeft'}, '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'class', '_value': 'InvoiceTest', '_isDecl': false},
        {'_key': 'field', '_value': 'itemPrice', '_isDecl': false}
      ], '_properties': {'after': 'uniqueName'}, '_rank': 0
    },
    {'_selectors': [{'_key': 'class', '_value': 'InvoiceTest', '_isDecl': false}], '_rank': 0},
    {
      '_selectors': [
        {'_key': 'class', '_value': 'InvoiceTest', '_isDecl': false},
        {'_key': 'field', '_value': 'supplier', '_isDecl': false}
      ], '_properties': {'after': 'Header.zRight'}, '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'class', '_value': 'InvoiceTest', '_isDecl': false},
        {'_key': 'field', '_value': 'requestor', '_isDecl': false}
      ], '_properties': {'after': 'supplier'}, '_rank': 0
    },
    {'_selectors': [{'_key': 'class', '_value': 'InvoiceTest', '_isDecl': false}], '_rank': 0},
    {
      '_selectors': [
        {'_key': 'class', '_value': 'InvoiceTest', '_isDecl': false},
        {'_key': 'field', '_value': 'itemDescription', '_isDecl': false}
      ], '_properties': {'after': 'Footer.zBottom'}, '_rank': 0
    },
    {'_selectors': [{'_key': 'class', '_value': 'InvoiceTest', '_isDecl': false}], '_rank': 0},
    {
      '_selectors': [{'_key': 'layout', '_value': 'InvoiceTestPage', '_isDecl': false}],
      '_properties': {'trait': 'Sections'}, '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'layout', '_value': 'InvoiceTestPage', '_isDecl': false},
        {'_key': 'layout', '_value': 'Header', '_isDecl': true}
      ], '_properties': {
        'trait': 'Form', 'description': {'t': 'CFP', 'v': 'object.itemDescription'},
        'opened': false, 'label': 'Label for header section', 'zonePath': 'Header'
      }, '_rank': 0
    }, {
      '_selectors': [{'_key': 'layout', '_value': 'InvoiceTestPage', '_isDecl': false}],
      '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'layout', '_value': 'InvoiceTestPage', '_isDecl': false},
        {'_key': 'layout', '_value': 'Participant', '_isDecl': true}
      ], '_properties': {
        'component': 'StringComponent', 'visible': true, 'canEdit': true,
        'bindings': {'value': ' Section Content Participant'},
        'label': 'Label for Participant section'
      }, '_rank': 0
    }, {
      '_selectors': [{'_key': 'layout', '_value': 'InvoiceTestPage', '_isDecl': false}],
      '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'layout', '_value': 'InvoiceTestPage', '_isDecl': false},
        {'_key': 'layout', '_value': 'Lines', '_isDecl': true}
      ], '_properties': {
        'component': 'StringComponent', 'visible': true, 'actionIcon': 'icon-positive',
        'canEdit': true, 'editMode': 'external',
        'bindings': {'value': ' Section Content Participant'},
        'label': 'Label for Line Item section'
      }, '_rank': 0
    }, {
      '_selectors': [{'_key': 'layout', '_value': 'InvoiceTestPage', '_isDecl': false}],
      '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'layout', '_value': 'InvoiceTestPage', '_isDecl': false},
        {'_key': 'layout', '_value': 'Footer', '_isDecl': true}
      ], '_properties': {
        'trait': 'Form', 'label': 'Label for footer section', 'zonePath': 'Footer'
      }, '_rank': 0
    }, {
      '_selectors': [{'_key': 'layout', '_value': 'InvoiceTestPage', '_isDecl': false}],
      '_rank': 0
    }
  ]
};
// @formatter:on
/* tslint:disable */

/**
 *
 * Testing uses following oss layout:
 *
 * class=InvoiceTest {
 *     layout {
 *         trait:labelsOnTop;
 *     }
 *
 *     zNone => *;
 *     Header.zLeft => uniqueName => itemPrice;
 *     Header.zRight => supplier => requestor;
 *     Footer.zBottom => itemDescription;
 *
 * }
 *
 *
 * layout=InvoiceTestPage#Sections {
 *     @layout=Header#Form {
 *         zonePath:Header;
 *         label:"Label for header section";
 *         description:$object.itemDescription;
 *         opened:false;
 *     }
 *
 *     @layout=Participant {
 *         label:"Label for Participant section";
 *         visible:true;
 *         canEdit:true;
 *         component:StringComponent;
 *         bindings:{value:" Section Content Participant" };
 *
 *     }
 *
 *      @layout=Lines {
 *         label:"Label for Line Item section";
 *         visible:true;
 *         canEdit:true;
 *         editMode:"external";
 *         actionIcon:"icon-positive";
 *         component:StringComponent;
 *         bindings:{value:" Section Content Participant" };
 *     }
 *
 *     @layout=Footer#Form {
 *        label:"Label for footer section";
 *        zonePath:Footer;
 *     }
 * }
 *
 *
 *
 *
 */
describe('Meta Sections', () => {
  beforeEach(() => {
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
  });


  it('It should render 4 section 1. forms, 2. string, 3. string, 4.form', () => {


    const metaUI: MetaRules = TestBed.get(META_RULES);
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

    const metaUI: MetaRules = TestBed.get(META_RULES);
    metaUI.addTestUserRule('InvoiceTestRule', InvoiceSectionRule);

    TestBed.compileComponents();
    let fixtureWrapper = TestBed.createComponent(TestMetaSectionComponent);
    fixtureWrapper.detectChanges();

    let sections = fixtureWrapper.nativeElement.querySelectorAll('.section-container ');
    let closedIconElem = sections[0].querySelectorAll('.fa-caret-right');

    expect(closedIconElem).toBeDefined();

  });


  it('should render last section expended with rendered one invoice field', () => {
    const metaUI: MetaRules = TestBed.get(META_RULES);
    metaUI.addTestUserRule('InvoiceTestRule', InvoiceSectionRule);

    let fixtureWrapper = TestBed.createComponent(TestMetaSectionComponent);
    fixtureWrapper.detectChanges();

    let sections = fixtureWrapper.nativeElement.querySelectorAll('.section-container ');
    let formLabel = sections[3].querySelectorAll('.control-label > label');

    expect(formLabel.length).toBe(1);
    expect(formLabel[0].textContent.trim()).toBe('Item Description');
  });


  it('should show edit button for 2nd section when we add property "editable:true"', () => {
    const metaUI: MetaRules = TestBed.get(META_RULES);
    metaUI.addTestUserRule('InvoiceTestRule', InvoiceSectionRule);

    let fixtureWrapper = TestBed.createComponent(TestMetaSectionComponent);
    fixtureWrapper.detectChanges();

    let sections = fixtureWrapper.nativeElement.querySelectorAll('.section-container ');
    let editIcon = sections[1].querySelectorAll('.section-edit-action');

    expect(editIcon.length).toBe(1);
  });


  it('should show custom icon for 3d section when using property actionIcon:"icon-positive"',
    () => {
      const metaUI: MetaRules = TestBed.get(META_RULES);

      metaUI.addTestUserRule('InvoiceTestRule', InvoiceSectionRule);

      let fixtureWrapper = TestBed.createComponent(TestMetaSectionComponent);
      fixtureWrapper.detectChanges();

      let sections = fixtureWrapper.nativeElement.querySelectorAll('.section-container ');
      let customIcon = sections[2].querySelectorAll('.icon-positive');

      expect(customIcon.length).toBe(1);
    });


  it('broadcasts event onEdit when clicking on edit icon (2nd section)',
    fakeAsync(() => {
      const metaUI: MetaRules = TestBed.get(META_RULES);
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
      const metaUI: MetaRules = TestBed.get(META_RULES);
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
      const metaUI: MetaRules = TestBed.get(META_RULES);
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
      const metaUI: MetaRules = TestBed.get(META_RULES);
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
