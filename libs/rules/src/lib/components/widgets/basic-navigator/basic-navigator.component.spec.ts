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
import {Component, OnInit, ViewChild} from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AribaCoreModule} from '../../../core/ariba.core.module';
import {BasicNavigatorComponent} from './basic-navigator.component';
import {AWBasicNavigatorModule} from './basic-navigator.module';
import {AribaComponentsTestProviderModule} from '../../ariba.component.provider.module';

describe('Basic navigator component ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicNavigatorTestComponent,
        BNCustomLabelComponent,
        BNActionsComponent,
        BNCustomBrandComponent,
        BNCustomButtonsComponent

      ],
      imports: [
        AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
        AribaComponentsTestProviderModule.forRoot(),
        AWBasicNavigatorModule
      ]
    });

    TestBed.compileComponents();

  });

  it('should  render default buttons OK and cancel on the top and bottom', () => {


    const fixtureWrapper = TestBed.createComponent(BasicNavigatorTestComponent);
    fixtureWrapper.detectChanges();


    const buttons = fixtureWrapper.nativeElement.querySelectorAll('.ui-button');
    expect(buttons.length).toEqual(4);
    expect(buttons[0].textContent.trim()).toEqual('Cancel');
    expect(buttons[1].textContent.trim()).toEqual('OK');
    expect(buttons[2].textContent.trim()).toEqual('Cancel');
    expect(buttons[3].textContent.trim()).toEqual('OK');

  });


  it('should  render default buttons OK and cancel With Custom label Save Done', () => {

    const fixtureWrapper = TestBed.createComponent(BNCustomLabelComponent);
    fixtureWrapper.detectChanges();


    const buttons = fixtureWrapper.nativeElement.querySelectorAll('.ui-button');
    expect(buttons.length).toEqual(4);
    expect(buttons[0].textContent.trim()).toEqual('Done');
    expect(buttons[1].textContent.trim()).toEqual('Save');
    expect(buttons[2].textContent.trim()).toEqual('Done');
    expect(buttons[3].textContent.trim()).toEqual('Save');

  });


  it('should  it should emit action even when registered and we click on save, cancel',
    fakeAsync(() => {

      const fixtureWrapper = TestBed.createComponent(BNActionsComponent);
      fixtureWrapper.detectChanges();

      const buttons = fixtureWrapper.nativeElement.querySelectorAll('.ui-button');
      buttons[1].click();

      tick();
      fixtureWrapper.detectChanges();

      expect(fixtureWrapper.componentInstance.ok).toBeTruthy();
      expect(fixtureWrapper.componentInstance.cancel).toBeFalsy();

      buttons[0].click();
      tick();
      fixtureWrapper.detectChanges();
      expect(fixtureWrapper.componentInstance.cancel).toBeTruthy();
    }));


  it('should attach custom brand template', () => {

    const fixtureWrapper = TestBed.createComponent(BNCustomBrandComponent);
    fixtureWrapper.detectChanges();


    const brand = fixtureWrapper.nativeElement.querySelector('.brand-title');

    expect(brand.textContent.trim()).toEqual('xxxxx');

  });


  it('should attach custom buttons template', () => {

    const fixtureWrapper = TestBed.createComponent(BNCustomButtonsComponent);
    fixtureWrapper.detectChanges();


    const btns = fixtureWrapper.nativeElement.querySelectorAll('.btn');
    expect(btns.length).toEqual(2);
  });

});


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-basic-navigator>
      <span> some content</span>

    </aw-basic-navigator>
  `
})
class BasicNavigatorTestComponent implements OnInit {
  @ViewChild(BasicNavigatorComponent)
  navigator: BasicNavigatorComponent;

  ngOnInit() {

  }
}

@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-basic-navigator [okActionLabel]="'Save'" [cancelActionLabel]="'Done'">
      <span> some content</span>

    </aw-basic-navigator>
  `
})
class BNCustomLabelComponent implements OnInit {
  @ViewChild(BasicNavigatorComponent)
  navigator: BasicNavigatorComponent;

  ngOnInit() {

  }
}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-basic-navigator (onOKAction)="okClicked($event)"
                        (onCancelAction)="cancelClicked($event)">
      <span> some content</span>

    </aw-basic-navigator>
  `
})
class BNActionsComponent implements OnInit {
  @ViewChild(BasicNavigatorComponent)
  navigator: BasicNavigatorComponent;

  ok: boolean = false;
  cancel: boolean = false;


  ngOnInit() {

  }

  okClicked(event: any): void {
    this.ok = true;

  }

  cancelClicked(event: any): void {
    this.cancel = true;
  }
}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-basic-navigator>
      <ng-template #brand>
        <span class="brand-title">xxxxx</span>
      </ng-template>
    </aw-basic-navigator>
  `
})
class BNCustomBrandComponent implements OnInit {
  @ViewChild(BasicNavigatorComponent)
  navigator: BasicNavigatorComponent;

  ngOnInit() {

  }
}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-basic-navigator>
      <ng-template #buttons>
        <button class="btn btn-primary">XX</button>
      </ng-template>
    </aw-basic-navigator>
  `
})
class BNCustomButtonsComponent implements OnInit {
  @ViewChild(BasicNavigatorComponent)
  navigator: BasicNavigatorComponent;

  ngOnInit() {

  }
}
