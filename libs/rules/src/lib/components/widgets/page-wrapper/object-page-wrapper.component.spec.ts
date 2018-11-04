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
import {RouterTestingModule} from '@angular/router/testing';
import {
  ObjectPageWrapperComponent
} from '../../widgets/page-wrapper/object-page-wrapper/object-page-wrapper.component';
import {PageNotification} from '../../widgets/page-notification/page-notification.component';
import {AWPageWrapperModule} from '../../widgets/page-wrapper/page-wrapper.module';
import {AWButtonModule} from '../../widgets/button/button.module';
import {AribaComponentsTestProviderModule} from '../../ariba.component.provider.module';

describe('Describe basic page wrapper component ', () => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        BasicPageWrapperTestComponent,
        ButtonAndNotificationPageWrapperTestComponent,
        PageWrapperContentTestComponent,
        PageActionPageWrapperTestComponent

      ],
      imports: [
        AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
        AribaComponentsTestProviderModule.forRoot(),
        AWPageWrapperModule,
        RouterTestingModule,
        AWButtonModule
      ]
    });

    TestBed.compileComponents();
  });

  it('should render object object page wrapper with title, header, footer', () => {
    const fixtureWrapper = TestBed.createComponent(BasicPageWrapperTestComponent);
    fixtureWrapper.detectChanges();


    const title = fixtureWrapper.nativeElement.querySelector('.page-title-text');
    expect(title.textContent.trim()).toEqual('Object Page Title');

    const header = fixtureWrapper.nativeElement.querySelectorAll('.page-header');
    expect(header.length).toEqual(1);

    const footer = fixtureWrapper.nativeElement.querySelectorAll('.page-footer');
    expect(footer.length).toEqual(1);

    // verify object status and label.
    const statusLabel = fixtureWrapper.nativeElement.querySelector('.object-status-label');
    expect(statusLabel.textContent.trim()).toEqual('Event Status');

    const status = fixtureWrapper.nativeElement.querySelector('.object-status');
    expect(status.textContent.trim()).toEqual('Draft');

  });


  it('should render object page wrapper with page notification and buttons', () => {

    const fixtureWrapper = TestBed.createComponent(ButtonAndNotificationPageWrapperTestComponent);
    fixtureWrapper.detectChanges();


    const buttons = fixtureWrapper.nativeElement.querySelectorAll('.ui-button');
    expect(buttons.length).toEqual(2);
    expect(buttons[0].textContent.trim()).toEqual('Edit');
    expect(buttons[1].textContent.trim()).toEqual('Cancel');

    const notifications = fixtureWrapper.nativeElement.querySelectorAll('.page-notification');
    expect(notifications.length).toEqual(1);
    expect(notifications[0].querySelector('.title').textContent.trim())
      .toEqual('Policy Warning');
  });

  it('should render the page content with items put into the content area.',
    fakeAsync(() => {
      const fixtureWrapper = TestBed.createComponent(PageWrapperContentTestComponent);
      fixtureWrapper.detectChanges();

      const contents = fixtureWrapper.nativeElement.querySelectorAll('aw-page-content');
      expect(contents.length).toEqual(1);
      expect(contents[0].textContent.trim()).toEqual('This is my page content Success');
    }));


  it('should respond on page when page action is triggered.', fakeAsync(() => {

    const fixtureWrapper = TestBed.createComponent(PageActionPageWrapperTestComponent);
    fixtureWrapper.detectChanges();

    const el = fixtureWrapper.nativeElement.querySelector('button');
    el.dispatchEvent(new Event('click'));

    fixtureWrapper.detectChanges();
    tick();
    fixtureWrapper.detectChanges();

    const contents = fixtureWrapper.nativeElement.querySelectorAll('aw-page-content');
    expect(contents.length).toEqual(1);
    expect(contents[0].textContent.trim()).toEqual('This is my page content edit');

  }));

});


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-object-page-wrapper
      [title]="title"
      objectType="Event"
      objectStatusLabel="Event Status"
      objectStatus="Draft"
      [notifications]="pageNotifications">

    </aw-object-page-wrapper>
  `
})
class BasicPageWrapperTestComponent implements OnInit {
  @ViewChild(ObjectPageWrapperComponent)
  pageWrapper: ObjectPageWrapperComponent;

  title: string = 'Object Page Title';

  pageNotifications: PageNotification[] = null;


  ngOnInit() {

  }
}

@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-object-page-wrapper
      [title]="title"
      [notifications]="pageNotifications">

      <ng-template #pageActions>
        <aw-page-actions>
          <aw-button [type]="'submit'" [name]="'edit'" [value]="edit" [style]="'primary'">
            Edit
          </aw-button>
          <aw-button [type]="'button'" [name]="'cancel'" [value]="cancel"
                     [style]="'secondary'">
            Cancel
          </aw-button>
        </aw-page-actions>
      </ng-template>

    </aw-object-page-wrapper>
  `
})
class ButtonAndNotificationPageWrapperTestComponent implements OnInit {
  @ViewChild(ObjectPageWrapperComponent)
  pageWrapper: ObjectPageWrapperComponent;

  title: string = 'Object Page Title';

  pageNotifications: PageNotification[] = [
    new PageNotification('warning', 'Policy Warning',
      'This request requires 3 bids.')
  ];

  ngOnInit() {

  }
}

@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-object-page-wrapper
      [title]="title"
      [notifications]="pageNotifications">

      <aw-page-content>
        This is my page content {{status}}
      </aw-page-content>

    </aw-object-page-wrapper>
  `
})
class PageWrapperContentTestComponent implements OnInit {
  @ViewChild(ObjectPageWrapperComponent)
  pageWrapper: ObjectPageWrapperComponent;

  status: string = 'Success';

  pageNotifications: PageNotification[] = null;

  ngOnInit() {

  }
}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-object-page-wrapper
      [title]="title"
      [notifications]="pageNotifications">

      <ng-template #pageActions>
        <aw-page-actions>
          <aw-button [type]="'submit'" [name]="'edit'" (action)="onClicked($event)"
                     [value]="edit" [style]="'primary'">
            Edit
          </aw-button>
        </aw-page-actions>
      </ng-template>

      <aw-page-content>
        This is my page content {{status}}
      </aw-page-content>

    </aw-object-page-wrapper>
  `
})
class PageActionPageWrapperTestComponent implements OnInit {
  @ViewChild(ObjectPageWrapperComponent)
  pageWrapper: ObjectPageWrapperComponent;

  status: string = 'Success';

  pageNotifications: PageNotification[] = null;

  ngOnInit() {
  }

  onClicked(event: any) {
    this.status = event.target.name;
  }
}
