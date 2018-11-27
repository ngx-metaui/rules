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
import {Component, ElementRef, ViewChild} from '@angular/core';
import {discardPeriodicTasks, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HoverCardComponent} from './hover-card.component';
import {AWHoverCardModule} from './hover-card.module';
import {AWStringFieldModule} from '../../widgets/string/string.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MetaUIRulesModule} from '@ngx-metaui/rules';
import {PrimeNgRulesModule} from '../../../primeng-rules.module';


describe('Component: Hover card', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHCSimpleComponent
      ],
      imports: [
        MetaUIRulesModule.forRoot({'i18n.enabled': false, 'env.test': true}),
        PrimeNgRulesModule.forRoot(),
        AWHoverCardModule,
        AWStringFieldModule,
        NoopAnimationsModule

      ]
    });

    TestBed.compileComponents();

  });


  it('must throw an Error if link Title is not used', () => {
    const fixtureWrapper = TestBed.createComponent(TestHCSimpleComponent);
    fixtureWrapper.componentInstance.title = null;

    expect(() => fixtureWrapper.detectChanges())
      .toThrowError('You must provide [linkTitle] binding !');


  });


  describe('with forceClose Enable', () => {
    it('can render a title with action icon', () => {
      const fixtureWrapper = TestBed.createComponent(TestHCSimpleComponent);
      fixtureWrapper.detectChanges();

      const hcTitle = fixtureWrapper.nativeElement
        .querySelector('.w-hc-title .w-string-field');


      const hcIcon = fixtureWrapper.nativeElement
        .querySelector('.w-hc-title .sap-icon');

      expect(hcTitle.textContent).toBe('testTitle');
      expect(hcIcon).toBeDefined();
      expect(hcIcon).not.toBeNull();

    });


    it('displays a Card on hover with content having close icon',

      fakeAsync(() => {

        const fixtureWrapper = TestBed.createComponent(TestHCSimpleComponent);
        fixtureWrapper.detectChanges();

        const hcIcon = fixtureWrapper.nativeElement.querySelector('.w-hc-title .sap-icon');
        const target = fixtureWrapper.nativeElement.querySelector('.placeholder');

        fixtureWrapper.componentInstance.hover.awOverlay.overlay.show(
          newEvent('mouseover'), target);
        fixtureWrapper.componentInstance.hover.awOverlay.onOpened(null);

        tick();
        fixtureWrapper.detectChanges();

        tick();
        fixtureWrapper.detectChanges();


        const cardPanel = document.querySelector('.ui-overlaypanel');
        const contentPanel = document
          .querySelector('.ui-overlaypanel-content .my-test-content');
        const closeIcon = document.querySelector('.ui-overlaypanel-close');

        const computedStyles = getComputedStyle(cardPanel);

        expect(computedStyles.display).toBe('block');
        expect(contentPanel.textContent.trim()).toBe('AAAA');
        expect(closeIcon).toBeDefined();
        expect(closeIcon).not.toBeNull();
      }));


    it('must close when clicked on close icon', fakeAsync(() => {
      const fixtureWrapper = TestBed.createComponent(TestHCSimpleComponent);
      fixtureWrapper.detectChanges();

      const hcIcon = fixtureWrapper.nativeElement.querySelector('.w-hc-title .sap-icon');
      const target = fixtureWrapper.nativeElement.querySelector('.placeholder');

      fixtureWrapper.componentInstance.hover.awOverlay.overlay
        .show(newEvent('mouseover'), target);
      fixtureWrapper.componentInstance.hover.awOverlay.onOpened(null);

      tick();
      fixtureWrapper.detectChanges();

      let cardPanel = document.querySelector('.ui-overlaypanel');
      const closeIcon = document.querySelector('.ui-overlaypanel-close');

      const computedStyles = getComputedStyle(cardPanel);
      expect(computedStyles.display).toBe('block');
      expect(cardPanel.textContent.trim()).toBe('AAAA');

      (<any>closeIcon).click();

      tick();
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();


      cardPanel = document.querySelector('.ui-overlaypanel');
      expect(cardPanel).toBeNull();

      discardPeriodicTasks();

    }));
  });

  xdescribe('with forceClose disable', () => {
    it('can render a title with action icon', () => {
      const fixtureWrapper = TestBed.createComponent(TestHCSimpleComponent);
      fixtureWrapper.componentInstance.forceClose = false;
      fixtureWrapper.detectChanges();

      const hcTitle = fixtureWrapper.nativeElement
        .querySelector('.w-hc-title .w-string-field');


      const hcIcon = fixtureWrapper.nativeElement
        .querySelector('.w-hc-title .sap-icon');

      expect(hcTitle.textContent).toBe('testTitle');
      expect(hcIcon).toBeDefined();
      expect(hcIcon).not.toBeNull();
    });


    it('displays a Card container with content not having close icon', () => {

      const fixtureWrapper = TestBed.createComponent(TestHCSimpleComponent);
      fixtureWrapper.componentInstance.forceClose = false;
      fixtureWrapper.detectChanges();

      const hcIcon = fixtureWrapper.nativeElement.querySelector('.w-hc-title .sap-icon');
      const target = fixtureWrapper.nativeElement.querySelector('.placeholder');

      hcIcon.dispatchEvent(newEvent('mouseover'), target);
      fixtureWrapper.detectChanges();

      const closeIcon = fixtureWrapper.nativeElement.querySelector('.ui-overlaypanel-close');
      expect(closeIcon).toBeNull();
    });
  });


});


@Component({
  selector: 'wrapper-comp',
  template: `
    <div class="placeholder"></div>
    <aw-hover-card [linkTitle]="title" [forceClose]="forceClose">
      <span class="my-test-content">AAAA</span>
    </aw-hover-card>

    <button type="button" class="close-card"></button>
  `
})
class TestHCSimpleComponent {
  @ViewChild(HoverCardComponent)
  hover: HoverCardComponent;

  title: string = 'testTitle';
  forceClose: boolean = true;

  constructor(private el: ElementRef) {

  }
}


export function newEvent(eventName: string) {
  const evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(eventName, false, false, null);
  return evt;
}
