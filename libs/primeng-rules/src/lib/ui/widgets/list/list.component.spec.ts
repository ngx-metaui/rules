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
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AWListModule} from './list.module';
import {ListComponent} from './list.component';
import {isArray} from '../../core/utils/lang';
import {FormControl, FormGroup} from '@angular/forms';
import {AribaComponentsTestProviderModule} from '../../ariba.component.provider.module';
import {MetaUIRulesModule, Environment} from '@ngx-metaui/rules';


describe('Component: List', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MetaUIRulesModule.forRoot({'i18n.enabled': false, 'env.test': true}),
        AribaComponentsTestProviderModule.forRoot(),
        AWListModule
      ],
      declarations: [
        TestListSimpleComponent,
        TestListMultiComponent,
        TestListBindingComponent,
        TestFieldValueTransformBindingComponent,
        TestWithPreselectedItemMultiComponent,
        TestHeightWidthForListComponent,
        TestNgModelOnListBoxComponent,
        TestFormControlOnListBoxComponent,
        TestZonesForListComponent
      ]

    });

    TestBed.compileComponents();
  });

  describe('basic rendering behavior', () => {


    it('render list with 3 items default single selection mode ', () => {
      const fixtureWrapper = TestBed.createComponent(TestListSimpleComponent);
      fixtureWrapper.detectChanges();


      const items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-wrapper');
      expect(items.length).toBe(3);

    });


    it('can select only 1 item at the time when single selection mode is enabled ',
      fakeAsync(() => {
        const fixtureWrapper = TestBed.createComponent(TestListSimpleComponent);
        fixtureWrapper.detectChanges();


        const items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-middle');
        items[0].click();

        tick();
        fixtureWrapper.detectChanges();

        expect(isArray(fixtureWrapper.componentInstance.list.selection)).toBeFalsy();
        expect(fixtureWrapper.componentInstance.list.selection).toBe('Monday');

        clickWithMeta(items[1]);
        tick();
        fixtureWrapper.detectChanges();

        expect(isArray(fixtureWrapper.componentInstance.list.selection)).toBeFalsy();
        expect(fixtureWrapper.componentInstance.list.selection).toBe('Tuesday');

      }));

    it('render list 3 item and multiselection mode so that checkboxes are not visible ',
      fakeAsync(() => {
        const fixtureWrapper = TestBed.createComponent(TestListMultiComponent);
        fixtureWrapper.detectChanges();

        const items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-left input');

        expect(items.length).toBe(0);
        expect(fixtureWrapper.componentInstance.list.selectionMode).toBe('multi');

      }));


    it('render list 3 item and multiselection with visible checkboxes', fakeAsync(() => {
      const fixtureWrapper = TestBed.createComponent(TestListMultiComponent);
      fixtureWrapper.componentInstance.mode = 'multiWithCheckbox';
      fixtureWrapper.detectChanges();

      const items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-left input');

      expect(items.length).toBe(3);
      expect(fixtureWrapper.componentInstance.list.selectionMode).toBe('multiWithCheckbox');

    }));

    it('can select multiple item when multi selection mode is enabled', fakeAsync(() => {
      const fixtureWrapper = TestBed.createComponent(TestListMultiComponent);
      fixtureWrapper.detectChanges();

      const items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-middle');
      items[0].click();
      //    tick there is a problem that is fixed in new version
      // in writeValue there needs to be call markFor.. inside Plistbox
      fixtureWrapper.detectChanges();

      expect(isArray(fixtureWrapper.componentInstance.list.selection)).toBeTruthy();
      expect(fixtureWrapper.componentInstance.list.selection).toContain('Monday');

      clickWithMeta(items[1]);
      // tick();
      fixtureWrapper.detectChanges();

      expect(isArray(fixtureWrapper.componentInstance.list.selection)).toBeTruthy();
      expect(fixtureWrapper.componentInstance.list.selection).toContain('Monday');
      expect(fixtureWrapper.componentInstance.list.selection).toContain('Tuesday');


    }));


    it('should throw error when [list] binding is not provided', () => {
      const fixtureWrapper = TestBed.createComponent(TestListBindingComponent);

      expect(() => fixtureWrapper.detectChanges())
        .toThrowError('Missing [list] binding.');

    });

    it('should throw error when it has [field] and [valueTransformer] bindings ', () => {
      const fixtureWrapper = TestBed.createComponent(TestFieldValueTransformBindingComponent);

      expect(() => fixtureWrapper.detectChanges())
        .toThrowError('You can have either [field] or [valueTransformer].');

    });


    it('render list with 3 items and  1st item selected ', fakeAsync(() => {
      const fixtureWrapper = TestBed.createComponent(TestWithPreselectedItemMultiComponent);
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();


      const items = fixtureWrapper.nativeElement
        .querySelectorAll('.w-li-wrapper .ui-chkbox-icon');
      expect(items.length).toBe(3);
      expect(fixtureWrapper.componentInstance.list.selection[0]).toBe('Monday');
      expect(items[0].classList).toContain('pi-check');

    }));


    it(' should set the height style on the top level element ', () => {
      const fixtureWrapper = TestBed.createComponent(TestHeightWidthForListComponent);
      fixtureWrapper.detectChanges();

      const listbox = fixtureWrapper.nativeElement.querySelector('.ui-listbox');

      // computed styles does not work on Travis so I just need to check if the style
      // was properly set onto the element

      expect(listbox.attributes.style.textContent.indexOf('height: 100px;') !== -1)
        .toBeTruthy();

    });

    it('should set the with style on the top level element ', () => {
      const fixtureWrapper = TestBed.createComponent(TestHeightWidthForListComponent);
      fixtureWrapper.detectChanges();

      const listbox = fixtureWrapper.nativeElement.querySelector('.ui-listbox');
      const computedStyle = getComputedStyle(listbox);

      expect(listbox.attributes.style.textContent.indexOf('width: 150px;') !== -1)
        .toBeTruthy();
    });

    it('should change overflow-y to auto when height is used ', () => {
      const fixtureWrapper = TestBed.createComponent(TestHeightWidthForListComponent);
      fixtureWrapper.detectChanges();

      const listbox = fixtureWrapper.nativeElement.querySelector('.ui-listbox');
      const computedStyle = getComputedStyle(listbox);

      expect(computedStyle.overflowY).toBe('auto');
    });

    it('hides LIST border when [borderless] is set to TRUE', () => {
      const fixtureWrapper = TestBed.createComponent(TestListSimpleComponent);
      fixtureWrapper.detectChanges();

      fixtureWrapper.componentInstance.noBorder = true;

      fixtureWrapper.detectChanges();

      const listbox = fixtureWrapper.nativeElement.querySelector('.ui-listbox');

      expect(borderColor(listbox)).toBe('rgb(0, 0, 0)');
    });


    it('triggers onSelection event when item is clicked', fakeAsync(() => {
      const fixtureWrapper = TestBed.createComponent(TestListMultiComponent);
      fixtureWrapper.detectChanges();


      const items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-middle');
      items[1].click();

      tick();
      fixtureWrapper.detectChanges();
      expect(fixtureWrapper.componentInstance.itemSelected).toBe('Tuesday');

    }));


    it('prefixes list items with XXX when valueTransformer is used', () => {
      const fixtureWrapper = TestBed.createComponent(TestFieldValueTransformBindingComponent);
      fixtureWrapper.componentInstance.field = null;
      fixtureWrapper.detectChanges();


      const items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-middle');
      expect(items[1].textContent.trim()).toBe('XXX-Tuesday');
    });


  });


  describe('Support for [(ngModel)]', () => {
    it('initialize list selection using [(ngModel)]', fakeAsync(() => {
      const fixtureWrapper = TestBed.createComponent(TestNgModelOnListBoxComponent);
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      expect(fixtureWrapper.componentInstance.list.selection[0]).toBe('Monday');
    }));

    it('propagates selection to [(ngModel)] when item is clicked', fakeAsync(() => {

      const fixtureWrapper = TestBed.createComponent(TestNgModelOnListBoxComponent);
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      const items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-middle');
      items[1].click();

      tick();
      fixtureWrapper.detectChanges();


      tick();
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      expect(fixtureWrapper.componentInstance.selectedItems[0]).toBe('Tuesday');

    }));

  });


  describe('Support for FormGroup', () => {
    it('initialize list selection using Initialized FormGroup', fakeAsync(() => {
      const fixtureWrapper = TestBed.createComponent(TestFormControlOnListBoxComponent);
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      expect(fixtureWrapper.componentInstance.list.selection[0]).toBe('Monday');

    }));

    it('propagates selection to FormControl when item is clicked', fakeAsync(() => {
      const fixtureWrapper = TestBed.createComponent(TestFormControlOnListBoxComponent);
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      const items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-middle');
      items[1].click();

      tick();
      fixtureWrapper.detectChanges();


      tick();
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      expect(fixtureWrapper.componentInstance.fg.controls['weekdays'].value[1])
        .toBe('Tuesday');
    }));

  });


  describe('Custom templates to override list item', () => {

    it('renders LEFT zone with custom template', () => {
      const fixtureWrapper = TestBed.createComponent(TestZonesForListComponent);
      fixtureWrapper.detectChanges();

      const selector = fixtureWrapper.nativeElement.querySelector('.w-li-left');
      expect(selector.textContent.trim()).toBe('I am Left');
    });

    it('renders MIDDLE zone with custom template', () => {
      const fixtureWrapper = TestBed.createComponent(TestZonesForListComponent);
      fixtureWrapper.detectChanges();

      const selector = fixtureWrapper.nativeElement.querySelector('.w-li-middle');
      expect(selector.textContent.trim()).toBe('M-Monday');
    });


    it('renders RIGHT zone with custom template', () => {
      const fixtureWrapper = TestBed.createComponent(TestZonesForListComponent);
      fixtureWrapper.detectChanges();

      const selector = fixtureWrapper.nativeElement.querySelector('.w-li-right');
      expect(selector.textContent.trim()).toBe('I am Right');
    });


    it('can provide custom behavior to show check mark in the right if item ' +
      'is selected', fakeAsync(() => {
      const fixtureWrapper = TestBed.createComponent(TestZonesForListComponent);
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      const items = fixtureWrapper.nativeElement.querySelectorAll('.w-li-right .sap-icon');
      expect(items[0].classList).toContain('icon-accept');
      expect(items[1].classList).not.toContain('icon-accept');
      expect(items[2].classList).not.toContain('icon-accept');
    }));

  });

});

function dumpComputedStyles(cs: any) {
  const len = cs.length;
  for (let i = 0; i < len; i++) {

    const style = cs[i];
    console.log(style + ' : ' + cs.getPropertyValue(style));
  }

}

function borderColor(element: any) {
  const computedStyle = getComputedStyle(element);

  return computedStyle.borderColor !== '' ? computedStyle.borderColor :
    computedStyle.borderBottomColor;


}

@Component({
  selector: 'wrapper-comp',
  template: '<aw-list [list]="data" [borderless]="noBorder"></aw-list>'
})
class TestListSimpleComponent {
  @ViewChild(ListComponent)
  list: ListComponent;

  data = ['Monday', 'Tuesday', 'Sunday'];
  noBorder = false;
}


@Component({
  selector: 'wrapper-comp',
  template: '<aw-list ></aw-list>'
})
class TestListBindingComponent {
  @ViewChild(ListComponent)
  list: ListComponent;


  data = ['Monday', 'Tuesday', 'Sunday'];
}


@Component({
  selector: 'wrapper-comp',
  template: '<aw-list [list]="data" [field]="field" [valueTransformer]="convert"></aw-list>'
})
class TestFieldValueTransformBindingComponent {
  @ViewChild(ListComponent)
  list: ListComponent;

  data = ['Monday', 'Tuesday', 'Sunday'];
  field = 'aa';

  convert(item: any): string {
    return 'XXX-' + item;
  }
}

@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-list [list]="data" [selectionMode]="mode"
             (onSelection)="itemClicked($event)">
    </aw-list>`
})
class TestListMultiComponent {
  @ViewChild(ListComponent)
  list: ListComponent;

  mode = 'multi';
  data = ['Monday', 'Tuesday', 'Sunday'];

  itemSelected = '';

  itemClicked(event: any): void {
    this.itemSelected = event[0];
  }
}

@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-list [list]="data" [selectionMode]="mode" [selection]="selectedItems">
    </aw-list>`
})
class TestWithPreselectedItemMultiComponent {
  @ViewChild(ListComponent)
  list: ListComponent;

  mode = 'multiWithCheckbox';
  data = ['Monday', 'Tuesday', 'Sunday'];

  selectedItems = ['Monday'];
}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-list [list]="data" [selectionMode]="mode"
             [height]="h"
             [width]="w"
             [selection]="selectedItems">
    </aw-list>`
})
class TestHeightWidthForListComponent {
  @ViewChild(ListComponent)
  list: ListComponent;

  mode = 'multi';
  data = ['Monday', 'Tuesday', 'Sunday'];

  selectedItems = ['Monday'];
  h = '100px';
  w = '150px';

}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-list #awlist [list]="data" [selectionMode]="mode"
             [selection]="selectedItems">

      <ng-template #left let-item>
        I am Left
      </ng-template>

      <ng-template #middle let-item>
        M-{{item.value}}
      </ng-template>

      <ng-template #right let-item>
        I am Right

        <span class="sap-icon"
              [ngClass]="{'icon-accept': awlist.pListBox.isSelected(item),
                          '': !awlist.pListBox.isSelected(item)}">

                    </span>
      </ng-template>
    </aw-list>`
})
class TestZonesForListComponent {
  @ViewChild(ListComponent)
  list: ListComponent;

  mode = 'multi';
  data = ['Monday', 'Tuesday', 'Sunday'];

  selectedItems = ['Monday'];


}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-list [list]="data"
             [selectionMode]="'multiWithCheckbox'"
             [(ngModel)]="selectedItems"
             (onSelection)="itemClicked($event)">
    </aw-list>`
})
class TestNgModelOnListBoxComponent {
  @ViewChild(ListComponent)
  list: ListComponent;

  data = ['Monday', 'Tuesday', 'Sunday'];
  selectedItems = ['Monday'];


  itemSelected = '';

  itemClicked(event: any): void {
    this.itemSelected = event[0];
  }


}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-list [list]="data"
             [selectionMode]="'multiWithCheckbox'"
             name="weekdays"
             (onSelection)="itemClicked($event)">
    </aw-list>`
})
class TestFormControlOnListBoxComponent implements OnInit {
  @ViewChild(ListComponent)
  list: ListComponent;
  fg: FormGroup = new FormGroup({});

  data = ['Monday', 'Tuesday', 'Sunday'];
  selectedItems = ['Monday'];

  itemSelected = '';


  constructor(private env: Environment) {
  }

  ngOnInit(): void {
    const formControl = new FormControl();
    formControl.setValue(this.selectedItems);

    this.fg.addControl('weekdays', formControl);

    this.env.currentForm = this.fg;
  }

  itemClicked(event: any): void {

    this.itemSelected = event[0];
  }


}


function clickWithMeta(element: any) {
  const event: MouseEventInit = {
    ctrlKey: true,
    metaKey: true
  };
  element.dispatchEvent(new MouseEvent('click', event));
}


