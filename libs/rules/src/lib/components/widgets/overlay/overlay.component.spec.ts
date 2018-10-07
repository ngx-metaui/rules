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
import {isPresent, readGlobalParam} from '../../../core/utils/lang';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {OverlayComponent} from './overlay.component';
import {AribaCoreModule} from '../../../core/ariba.core.module';
import {ModalService} from '../../core/modal-service/modal.service';
import {AWOverlayModule} from '../../widgets/overlay/overlay.module';
import {AWButtonModule} from '../../widgets/button/button.module';
import {AWCoreComponentModule} from '../../core/core.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AribaComponentsTestProviderModule} from '../../ariba.component.provider.module';

describe('Component: overlay', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestOverlayDefaultComponent
      ],
      imports: [
        AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
        AribaComponentsTestProviderModule.forRoot(),
        NoopAnimationsModule,
        AWCoreComponentModule,
        AWOverlayModule,
        AWButtonModule
      ]
    });

    TestBed.compileComponents();
  });

  it('should instantiate overlay component and values for title and body', () => {
    let fixtureWrapper = TestBed.createComponent(TestOverlayDefaultComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.overlay.dismissable).toEqual(true);
    expect(fixtureWrapper.componentInstance.overlay.showCloseIcon).toBe(false);
  });

  it('should display overlay component as popup', fakeAsync(() => {
    let fixtureWrapper = TestBed.createComponent(TestOverlayDefaultComponent);
    fixtureWrapper.detectChanges();

    // Find the open button
    let button = fixtureWrapper.nativeElement.querySelector('button');
    button.click();


    tick();
    fixtureWrapper.detectChanges();

    tick();
    fixtureWrapper.detectChanges();

    tick();
    fixtureWrapper.detectChanges();


    // Verify that the overlay has been opened.
    let overlayContent = fixtureWrapper.nativeElement.querySelector('.ui-overlaypanel');
    let display = getComputedStyle(overlayContent).display;
    expect(display).toBe('block');

    // find close button and click it.
    button = fixtureWrapper.nativeElement.querySelector('button[name="close"]');
    button.click();

    tick();
    fixtureWrapper.detectChanges();

    tick();
    fixtureWrapper.detectChanges();

    flushPendingTimers();

    // verify that the confirm action has been clicked.
    overlayContent = fixtureWrapper.nativeElement.querySelector('.ui-overlaypanel');
    expect(overlayContent).toBeNull();
  }));
});

/* jshint ignore:start */
@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-overlay #overlay (onOpen)="overlayAction='open'" (onClose)="overlayAction='close'">
      <img [style.width]="'300px'" src="assets/images/sales.png" alt="Sales Chart"/>
    </aw-overlay>

    <aw-button [size]="'small'" (click)="open($event)">Open Overlay</aw-button>
    <aw-button name="close" [size]="'small'" (click)="overlay.close($event)">
      Close Overlay
    </aw-button>
  `
})
  /* jshint ignore:end */
  /**
   * Class that will only draw a overlay.
   */
class TestOverlayDefaultComponent {
  @ViewChild(OverlayComponent)
  overlay: OverlayComponent;

  constructor() {
  }

  open(event: any): void {
    this.overlay.overlay.show(event);
    this.overlay.onOpened(null);
  }
}

/* jshint ignore:start */
@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-modal></aw-modal>
    <aw-button [size]="'small'" (click)="open($event)">open</aw-button>
  `
})
  /* jshint ignore:end */
class TestOverlayServiceBehaviorComponent {
  confirmation: OverlayComponent;

  constructor(private modalService: ModalService) {
  }

  openOverlay() {
    let overlay = this.modalService.open<OverlayComponent>(OverlayComponent, {});

    // Add content. There's not support for dynamic content projection yet.
    // So have add content directly.
    // This is probably not the best way.
    overlay.instance.overlay.el.nativeElement.querySelector('.ui-overlaypanel-content')
      .innerHTML = `<img style='width:300px;' src="assets/images/sales.png" alt="Sales" />`;

    tick();

    // delay the opening after ng lifecycle has been initalized.
    setTimeout(() => {
      overlay.instance.open(event);
    }, 1);
  }
}

/**
 * This is workaround to get rid of XX timer(s) still in the queue, as Autocomplete from PrimeNg
 * is using Timers and they are not cleared before tests finishes I get this error
 */
function flushPendingTimers() {

  let zone: any = readGlobalParam('Zone');

  if (isPresent(zone) &&
    isPresent(zone['ProxyZoneSpec'].get().properties.FakeAsyncTestZoneSpec)) {

    zone['ProxyZoneSpec'].get().properties.FakeAsyncTestZoneSpec.pendingTimers = [];
  }
}
