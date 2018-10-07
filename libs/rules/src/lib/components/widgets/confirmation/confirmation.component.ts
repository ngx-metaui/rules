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
import {Component, ContentChild, EventEmitter, Input, Output} from '@angular/core';
import {isPresent} from '../../../core/utils/lang';
import {Environment} from '../../../core/config/environment';
import {ModalContainer} from '../../core/modal-service/modal-container';
import {ConfirmationHeaderComponent} from './confirmation-header.component';
import {ConfirmationFooterComponent} from './confirmation-footer.component';

/**
 * Confirmation Component is a specific version of the dialog where it supports confirm and cancel
 * functionality. It behaves like a dialog, is modal, and not closable by default.
 *
 * There are three types of popup.
 *   1.  a regular dialog box that has header, body and footer. It's the most customizable.
 *   2.  a confirmation box is similar to a dialog box but has accept and reject action buttons.
 *   3.  a overlay, which is a very basic popup with what you put inside.
 *       It doesn't have header and footer.
 *
 * There are two ways to use any popup component.
 *   1.  Either directly by using component, aw-dialog, aw-confirmation or aw-overlay
 *   2.  or the ModalService  service.open(<ConfirmationComponent>), service.close()
 *
 * Usage:
 *    1.  Using ModalService directly to display a modal popup. This usage is a quick way to show
 *        a confirmation to the user.
 *
 *          this.modalService.open<ConfirmationComponent>(ConfirmationComponent, {
 *                        title: 'Confirmation',
 *                        body: ` Are you sure ? `,
 *                        width: 300,
 *                        onConfirm: () => {
 *                              this.confirmAction();
 *                        },
 *                        onCancel: () => {
 *                              this.cancelAction();
 *                        }
 *           });
 *
 *
 *   2.   Use the component inside your template.
 *
 *          @Component({
 *                selector: 'aw-page' ,
 *                           template: `
 *                              <aw-confirmation [title]="'Confirmation'"
 *                                      [(visible)]="display"
 *                                     (onConfirm)="confirmAction()"
 *                                    (onCancel)="cancelAction()">
 *                                       <i class="sap-icon icon-alert"></i>
 *                                       Are you sure you want to delete your hard drive?
 *                            </aw-confirmation>
 *
 *                                   <aw-button [size]="'small'" (click)="open()">
 *                                       Open Confirmation
 *                                   </aw-button>
 *                  `
 *         export class MyPageComponent implements OnInit {
 *
 *                     display: boolean = false;
 *
 *                     confirmAction: string;
 *
 *                     constructor(private modalService: ModalService) {
 *                          super();
 *                       }
 *                     ngOnInit() { }
 *
 *                     open() {
 *                        this.display = true;
 *                     }
 *
 *                     confirmAction()  {
 *                        this.confirmAction = "confirmed";
 *                      }
 *
 *                      close() {
 *                         this.display = false;
 *                      }
 *
 *                      cancelAction() {
 *                          this.confirmAction = "canceled";
 *                      }
 *
 *       }
 *
 *
 */
@Component({
  selector: 'aw-confirmation',
  templateUrl: 'confirmation.component.html',
  styleUrls: ['confirmation.component.scss']
})
export class ConfirmationComponent extends ModalContainer {
  /**
   * Title for the Dialog.  if title and 'TitleTemplate' are both set, titleTemplate takes
   * precedence.
   */
  @Input()
  title: string;

  /**
   * Body section for Dialog. Caller should use either the body string, or content projection
   * to add values to the dialog. If both are used, they will both show up.
   */
  @Input()
  body: string;

  /**
   * If you are not using custom buttons you can pass a label to OK action
   *
   * Default value is OK
   */
  @Input()
  confirmActionLabel: string;

  /**
   * If you are not using custom buttons you can pass a label to Cancel action
   *
   * Default value is OK
   */
  @Input()
  cancelActionLabel: string;


  /**
   * support two way data binding on visible property.
   */
  @Output()
  visibleChange: EventEmitter<any> = new EventEmitter();

  /**
   * Whether there's an x at the top right that makes the dialog closable.
   */
  @Input()
  closable: boolean = false;

  /**
   * Target element to attach the dialog. "body" or local ng-template variable are valid.
   */
  @Input()
  appendTo: any;

  /**
   * Event fired when dialog is closed.
   */
  @Output()
  onClose: EventEmitter<any> = new EventEmitter();

  /**
   * Event fired when the dialog is opened.
   */
  @Output()
  onOpen: EventEmitter<any> = new EventEmitter();

  /**
   * Fired when user clicked on confirm button.
   */
  @Output()
  onConfirm: EventEmitter<any> = new EventEmitter();

  /**
   * Fired when user clicked on cancel button.
   */
  @Output()
  onCancel: EventEmitter<any> = new EventEmitter();

  /**
   * Header component. Usually contains the title.
   */
  @ContentChild(ConfirmationHeaderComponent) header: ConfirmationHeaderComponent;

  /**
   * Dialog footer. Usually contains buttons
   */
  @ContentChild(ConfirmationFooterComponent) footer: ConfirmationFooterComponent;


  constructor(public env: Environment) {
    super(env);

    this.width = 400;
    this.height = 'auto';
    // Todo: internationalize.
    this.confirmActionLabel = 'Confirm';
    this.cancelActionLabel = 'Cancel';
  }

  /**
   * open confirmation.
   */
  open() {
    this.visible = true;
    this.onOpen.emit();

    this.visibleChange.emit(true);
  }

  /**
   * close confirmation.
   */
  close() {
    this.visible = false;
    this.onClose.emit();

    // Important to make sure change is set on parent binding.
    // Otherwise, the variable and dialog open/close state can be out
    // of sync and we wouldn't trigger change detection.
    this.visibleChange.emit(false);
  }

  /**
   * Does the confirmation have header content?
   */
  hasHeader(): boolean {
    return isPresent(this.header);
  }

  /**
   * Does the confirmation have footer content?
   */
  hasFooter(): boolean {
    return isPresent(this.footer);
  }

  /**
   * Confirm action.
   */
  confirm() {
    this.close();
    this.onConfirm.emit();
  }

  /**
   * Cancel action.
   */
  cancel() {
    this.close();
    this.onCancel.emit();
  }
}
