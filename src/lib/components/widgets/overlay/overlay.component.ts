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
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalContainer} from '../../core/modal-service/modal-container';
import {OverlayPanel} from 'primeng/primeng';
import {Environment} from '@aribaui/core';

/**
 * Overlay Component is a simple version of the dialog where there's only content.
 * Overlay will appear at the position where the action performed trigger an overlay.
 *
 * There are three types of popup.
 *   1.  a regular dialog box that has header, body and footer. It's the most customizable.
 *   2.  a confirmation box is similar to a dialog box but has accept and reject action buttons.
 *   3.  a overlay, which is a very basic popup with what you put inside.
 *       It doesn't have header and footer.
 *
 * There are two ways to use any popup component.
 *   1.  Either directly by using component, aw-dialog, aw-confirmation or aw-overlay
 *   2.  or the ModalService  service.open(<OverlayComponent>), service.close()
 *
 * Usage:
 *    1.  Using ModalService directly to display a modal popup. The usage is a little tricky
 *        because angular currently doesn't support dynamic content projection.
 *
 *          let overlay = this.modalService.open<OverlayComponent>(OverlayComponent, {});
 *
 *            // Add content. There's not support for dynamic content projection yet.
 *            // So have add content directly.
 *            // This is probably not the best way.
 *          overlay.instance.overlay.el.nativeElement.querySelector(".ui-overlaypanel-content")
 *               .innerHTML = `<img style='width:300px;' src="sales.png" alt="Sales Chart" />`;
 *
 *          // delay the opening after ng lifecycle has been initialized.
 *          setTimeout(() => { overlay.instance.open(event); }, 1);
 *
 *
 *   2.   Use the component inside your template.
 *
 *          @Component({
 *                selector: 'aw-page' ,
 *                           template: `
 *                                <aw-overlay #overlay (onOpen)="overlayAction='open'"
 *                                                     (onClose)="overlayAction='close'">
 *                                      <img src="sales.png" alt="Chart"/>
 *                                </aw-overlay>
 *
 *                                <aw-button [size]="'small'" (click)="overlay.open($event)">
 *                                    Open Overlay
 *                                </aw-button>
 *                  `
 *         export class MyPageComponent implements OnInit {
 *
 *                     overlayAction: string;
 *
 *                     constructor(private modalService: ModalService) {
 *                          super();
 *                       }
 *                     ngOnInit() { }
 *       }
 *
 *
 */
@Component({
    selector: 'aw-overlay',
    templateUrl: 'overlay.component.html',
    styleUrls: ['overlay.component.scss']
})
export class OverlayComponent extends ModalContainer implements OnInit
{
    /**
     * Enables hide overlay when outside is clicked.
     */
    @Input()
    dismissable: boolean = true;

    /**
     * displays the close icon 'x' at top of right corner.
     * @type {boolean}
     */
    @Input()
    showCloseIcon: boolean = false;
    /**
     * Target element to attach the overlay. "body" or local ng-template variable are valid.
     */
    @Input()
    appendTo: any;

    /**
     * Event fired when overlay is closed.
     * @type {EventEmitter}
     */
    @Output()
    onClose: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when the overlay is opened.
     * @type {EventEmitter}
     */
    @Output()
    onOpen: EventEmitter<any> = new EventEmitter();

    /**
     * The internal overlay panel.
     */
    @ViewChild(OverlayPanel)
    overlay: OverlayPanel;

    constructor(public env: Environment)
    {
        super(env);
    }

    ngOnInit()
    {
    }

    /**
     * Open Overlay
     * @param event
     */
    open(event: any)
    {
        this.overlay.show(event);
        this.onOpened(null);
    }

    /**
     * Close Overlay
     */
    close()
    {
        this.overlay.hide();
    }


    /**
     * toggle open and close.
     * @param event
     */
    toggle(event: any)
    {
        this.overlay.toggle(event);
    }


    onOpened(event: any): void
    {
        this.onOpen.emit(event);
    }

    onClosed(event: any): void
    {
        this.onClose.emit(event);
    }
}
