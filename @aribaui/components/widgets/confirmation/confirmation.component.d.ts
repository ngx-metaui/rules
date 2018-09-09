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
import { EventEmitter } from '@angular/core';
import { Environment } from '@aribaui/core';
import { ModalContainer } from '../../core/modal-service/modal-container';
import { ConfirmationHeaderComponent } from './confirmation-header.component';
import { ConfirmationFooterComponent } from './confirmation-footer.component';
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
export declare class ConfirmationComponent extends ModalContainer {
    env: Environment;
    /**
     * Title for the Dialog.  if title and 'TitleTemplate' are both set, titleTemplate takes
     * precedence.
     */
    title: string;
    /**
     * Body section for Dialog. Caller should use either the body string, or content projection
     * to add values to the dialog. If both are used, they will both show up.
     */
    body: string;
    /**
     * If you are not using custom buttons you can pass a label to OK action
     *
     * Default value is OK
     */
    confirmActionLabel: string;
    /**
     * If you are not using custom buttons you can pass a label to Cancel action
     *
     * Default value is OK
     */
    cancelActionLabel: string;
    /**
     * support two way data binding on visible property.
     */
    visibleChange: EventEmitter<any>;
    /**
     * Whether there's an x at the top right that makes the dialog closable.
     */
    closable: boolean;
    /**
     * Target element to attach the dialog. "body" or local ng-template variable are valid.
     */
    appendTo: any;
    /**
     * Event fired when dialog is closed.
     */
    onClose: EventEmitter<any>;
    /**
     * Event fired when the dialog is opened.
     */
    onOpen: EventEmitter<any>;
    /**
     * Fired when user clicked on confirm button.
     */
    onConfirm: EventEmitter<any>;
    /**
     * Fired when user clicked on cancel button.
     */
    onCancel: EventEmitter<any>;
    /**
     * Header component. Usually contains the title.
     */
    header: ConfirmationHeaderComponent;
    /**
     * Dialog footer. Usually contains buttons
     */
    footer: ConfirmationFooterComponent;
    constructor(env: Environment);
    /**
     * open confirmation.
     */
    open(): void;
    /**
     * close confirmation.
     */
    close(): void;
    /**
     * Does the confirmation have header content?
     */
    hasHeader(): boolean;
    /**
     * Does the confirmation have footer content?
     */
    hasFooter(): boolean;
    /**
     * Confirm action.
     */
    confirm(): void;
    /**
     * Cancel action.
     */
    cancel(): void;
}
