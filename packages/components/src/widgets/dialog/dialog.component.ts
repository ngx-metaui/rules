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
import {Environment, isPresent} from '@aribaui/core';
import {ModalContainer} from '../../core/modal-service/modal-container';
import {DialogHeaderComponent} from './dialog-header.component';
import {DialogFooterComponent} from './dialog-footer.component';

/**
 * Dialog Component that provides the look and feel for a modal dialog. This component has three
 * sections: header, body, and footer. It can be used by itself or extended.
 *
 * There are three types of popup.
 *   1.  a regular dialog box that has header, body and footer. It's the most customizable.
 *   2.  a confirmation box is similar to a dialog box but has accept and reject action buttons.
 *   3.  a overlay, which is a very basic popup with what you put inside.
 *       It doesn't have header and footer.
 *
 * There are two ways to use any popup component.
 *   1.  Either directly by using component, aw-dialog, aw-confirmation or aw-overlay
 *   2.  or the ModalService  service.open(<DialogComponent>), service.close()
 *
 * Usage:
 *    1.  Using Dialog directly to display a modal popup. This usage is a quick way to show a
 * message to the user.
 *
 *             this.modalService.open<DialogComponent>( DialogComponent, {
 *                     title: 'My Popup Title',
 *                     body: 'My Popup Body'
 *              });
 *
 *
 *   2.   Use the component inside your template.
 *
 *          @Component({
 *                selector: 'aw-page' ,
 *                           template: `
 *                              <aw-dialog [(visible)]="display" [modal]="true"
 *                                        (onOpen)="openAction()" (onClose)="closeAction()">
 *
 *                                    <aw-dialog-header>Dialog Header</aw-dialog-header>
 *
 *                                     Dialog Body: Creating a dialog using the dialog component
 *
 *                                    <aw-dialog-footer>
 *                                      <aw-button [size]="'small'" [style]="'primary'"
 *                                                 (click)="close()">OK</aw-button>
 *                                    </aw-dialog-footer>
 *                              </aw-dialog>
 *
 *                          <aw-button [size]="'small'" (click)="open()">Open Dialog</aw-button>
 *                  `
 *         export class MyPageComponent implements OnInit {
 *
 *                     display: boolean = false;
 *
 *                     dialogAction: string;
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
 *                     openAction()  {
 *                        this.dialogAction = "open";
 *                      }
 *       }
 *
 *
 */
@Component({
    selector: 'aw-dialog',
    templateUrl: 'dialog.component.html',
    styleUrls: ['dialog.component.scss']
})
export class DialogComponent extends ModalContainer
{
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
     * support two way data binding on visible property.
     */
    @Output()
    visibleChange: EventEmitter<any> = new EventEmitter();

    /**
     * whether this dialog blocks the rest of the page or not when displayed.
     */
    @Input()
    modal: boolean = true;

    /**
     * Whether there's an x at the top right that makes the dialog closable.
     */
    @Input()
    closable: boolean = true;

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
     * Header component. Usually contains the title.
     */
    @ContentChild(DialogHeaderComponent) header: DialogHeaderComponent;

    /**
     * Dialog footer. Usually contains buttons
     */
    @ContentChild(DialogFooterComponent) footer: DialogFooterComponent;


    constructor(public env: Environment)
    {
        super(env);

        this.width = 300;
        this.height = 'auto';
    }

    /**
     * Open this dialog.
     */
    open()
    {
        this.visible = true;
        this.onOpen.emit();

        // visible is a 2-way binding variable.
        this.visibleChange.emit(true);
    }

    /**
     * close the dialog
     */
    close()
    {
        this.visible = false;
        this.onClose.emit();

        // Important to make sure change is set on parent binding.
        // Otherwise, the variable and dialog open/close state can be out
        // of sync and we wouldn't trigger change detection.
        this.visibleChange.emit(false);
    }

    /**
     * Does this dialog have header.
     *
     */
    hasHeader(): boolean
    {
        return isPresent(this.header);
    }

    /**
     * Does this dialog have footer.
     *
     */
    hasFooter(): boolean
    {
        return isPresent(this.footer);
    }
}
