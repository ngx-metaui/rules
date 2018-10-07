import {Component, ElementRef, Input, TemplateRef} from '@angular/core';
import {isPresent} from '../../../core/utils/lang';
import {Environment} from '../../../core/config/environment';
import {BaseComponent} from '../../core/base.component';

/**
 *
 * Page-Notification component that implements a notification system for the user regarding
 * the current object he's working on. Typical notification are:
 *      Success - saved.
 *      Warning - Sourcing request requires 3 suppliers.
 *      Error   - cannot connect to server, check internet connection.
 *
 *
 *
 * Usage 1:  As part of page wrapper.
 *
 *  @Component({
 *    selector: 'MyPage' ,
 *    template: `
 *       <aw-object-page-wrapper
 *                        [title]="MyPage"
 *                        [objectType]="MyType"
 *                        [notification]="pageNotification">
 *             page content
 *          `
 *       </aw-object-pager-wrapper>
 *    })
 *    export class MyPage
 *    {
 *
 *        pageNotification: PageNotification = new PageNotification("warn",
 *                              "Policy Warning", "This request requires 3 bids.");
 *
 *        constructor ()
 *        {
 *        }
 *    }
 *
 * Usage 2: directly into the page.
 *
 *  @Component({
 *    selector: 'registration' ,
 *    template: `
 *      <aw-header></aw-header>
 *        Page Header
 *
 *        <ng-template [ngIf]="hasNotifications()">
 *          <div class="ui-g-12 u-nopadding">
 *            <aw-page-notification [notification]="notification"></aw-page-notification>
 *          </div>
 *        </ng-template>
 *
 *      <aw-footer></aw-footer>
 *    `
 *    })
 *    export class MyPage
 *    {
 *
 *        notification: PageNotification = new PageNotification("warning",
 *                              "Policy Warning", "This request requires 3 bids.");
 *
 *        constructor ()
 *        {
 *        }
 *    }
 *
 */
@Component({
  selector: 'aw-page-notification',
  templateUrl: 'page-notification.component.html',
  styleUrls: ['page-notification.component.scss']
})
export class PageNotificationComponent extends BaseComponent {

  /**
   * Any info, Error, or Warn for this page.
   */
  @Input()
  notification: PageNotification;

  constructor(protected element: ElementRef, public env: Environment) {
    super(env);
  }

  notificationClass(): string {
    return `notification-${this.notification.type}`;
  }

  notificationIcon(): string {
    return `ariba-icon icon-${this.notification.type}`;
  }

}

/**
 * Page Notification are messages for this page only. It displays in the center of the page
 * right under page title. Typical page notifications are 'save confirmation',
 * 'error during submit', warnings of field requirements, etc.
 */
export class PageNotification {
  constructor(public type: PageNotificationType, public title: string,
              public description: string, public contentTmpl?: TemplateRef<any>) {
  }

  hasTemplate(): boolean {
    return isPresent(this.contentTmpl);
  }

  toString(): string {
    return this.type + ', title: ' + this.title + ', description:  ' + this.description;
  }
}

export type PageNotificationType = 'success' | 'info' | 'warning' | 'error';
