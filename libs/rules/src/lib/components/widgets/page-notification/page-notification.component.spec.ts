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
import {PageNotification, PageNotificationComponent} from './page-notification.component';
import {AfterContentInit, Component, TemplateRef, ViewChild} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {AribaCoreModule} from '../../../core/ariba.core.module';
import {AWPageNotificationModule} from './page-notification.module';
import {AWHyperlinkModule} from '../../widgets/hyperlink/hyperlink.module';
import {AribaComponentsTestProviderModule} from '../../ariba.component.provider.module';

describe('Page Notification component behavior', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageNotificationSuccessComponent,
        PageNotificationInfoComponent,
        PageNotificationWarningComponent,
        PageNotificationErrorComponent,
        PageNotificationWithCustomTemplComponent
      ],
      imports: [
        AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
        AribaComponentsTestProviderModule.forRoot(),
        AWPageNotificationModule,
        AWHyperlinkModule
      ]
    });

    TestBed.compileComponents();
  });


  it('It should have the title, description and style for a success notification', () => {
    let fixtureWrapper = TestBed.createComponent(PageNotificationSuccessComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.notification.notification.type).toEqual('success');
    expect(fixtureWrapper.componentInstance.notification.notification.title)
      .toEqual('Success');
    expect(fixtureWrapper.componentInstance.notification.notification.description)
      .toEqual('This request has been saved.');

    // Make sure the icon is there.
    let icon = fixtureWrapper.debugElement.query(By.css('.icon-success'));
    expect(icon.nativeElement).toBeDefined();
  });

  it('It should have the title, description and style for a information notification', () => {
    let fixtureWrapper = TestBed.createComponent(PageNotificationInfoComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.notification.notification.type).toEqual('info');
    expect(fixtureWrapper.componentInstance.notification.notification.title)
      .toEqual('Information');
    expect(fixtureWrapper.componentInstance.notification.notification.description)
      .toEqual('Use the community panel to help you with your questions.');

    // Make sure the icon is there.
    let icon = fixtureWrapper.debugElement.query(By.css('.icon-info'));
    expect(icon.nativeElement).toBeDefined();
  });

  it('It should have the title, description and style for a warning notification', () => {
    let fixtureWrapper = TestBed.createComponent(PageNotificationWarningComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.notification.notification.type)
      .toEqual('warning');
    expect(fixtureWrapper.componentInstance.notification.notification.title)
      .toEqual('Policy Warning');
    expect(fixtureWrapper.componentInstance.notification.notification.description)
      .toEqual('This request requires 3 bids.');

    // Make sure the icon is there.
    let icon = fixtureWrapper.debugElement.query(By.css('.icon-warning'));
    expect(icon.nativeElement).toBeDefined();
  });

  it('It should have the title, description and style for a error notification', () => {
    let fixtureWrapper = TestBed.createComponent(PageNotificationErrorComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.notification.notification.type).toEqual('error');
    expect(fixtureWrapper.componentInstance.notification.notification.title)
      .toEqual('Error');
    expect(fixtureWrapper.componentInstance.notification.notification.description)
      .toEqual('The server is offline!');

    // Make sure the icon is there.
    let icon = fixtureWrapper.debugElement.query(By.css('.icon-error'));
    expect(icon.nativeElement).toBeDefined();
  });


  it('should render notification with custom content', () => {
    let fixtureWrapper = TestBed.createComponent(PageNotificationWithCustomTemplComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.notification.notification.contentTmpl)
      .toBeDefined();

    let templ = fixtureWrapper.nativeElement.querySelector('.my-noti-cnt');
    expect(templ).toBeDefined();
  });

});

@Component({
  selector: 'wrapper-comp',
  template: '<aw-page-notification [notification]="successNotification"></aw-page-notification>'
})
class PageNotificationSuccessComponent {
  @ViewChild(PageNotificationComponent)
  notification: PageNotificationComponent;

  successNotification: PageNotification = new PageNotification('success',
    'Success', 'This request has been saved.');
}

@Component({
  selector: 'wrapper-comp',
  template: '<aw-page-notification [notification]="infoNotification"></aw-page-notification>'
})
class PageNotificationInfoComponent {
  @ViewChild(PageNotificationComponent)
  notification: PageNotificationComponent;

  infoNotification: PageNotification = new PageNotification('info',
    'Information', 'Use the community panel to help you with your questions.');
}

@Component({
  selector: 'wrapper-comp',
  template: '<aw-page-notification [notification]="warningNotification"></aw-page-notification>'
})
class PageNotificationWarningComponent {
  @ViewChild(PageNotificationComponent)
  notification: PageNotificationComponent;

  warningNotification: PageNotification = new PageNotification('warning',
    'Policy Warning', 'This request requires 3 bids.');
}

@Component({
  selector: 'wrapper-comp',
  template: '<aw-page-notification [notification]="errorNotification"></aw-page-notification>'
})
class PageNotificationErrorComponent {
  @ViewChild(PageNotificationComponent)
  notification: PageNotificationComponent;

  errorNotification: PageNotification = new PageNotification('error',
    'Error', 'The server is offline!');
}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-page-notification [notification]="errorNotification"></aw-page-notification>

    <ng-template #templ1>
            <span class="my-noti-cnt">This is custom template with link
            <aw-hyperlink (action)="alert($event)"> click here</aw-hyperlink> and some
            text</span>
    </ng-template>
  `
})
class PageNotificationWithCustomTemplComponent implements AfterContentInit {
  @ViewChild(PageNotificationComponent)
  notification: PageNotificationComponent;

  errorNotification: PageNotification = new PageNotification('error',
    'Error', null);


  @ViewChild('templ1')
  itemTemplate: TemplateRef<any>;

  ngAfterContentInit(): void {
    this.errorNotification.contentTmpl = this.itemTemplate;
  }
}
