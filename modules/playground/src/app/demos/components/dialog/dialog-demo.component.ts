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
 */
import {Component, Renderer2} from '@angular/core';
import {
    ModalService, DialogComponent, ConfirmationComponent, OverlayComponent
} from '@aribaui/components';

@Component({
    templateUrl: './dialog-demo.component.html',
    styleUrls: ['./dialog-demo.component.scss']
})
export class DialogDemoComponent
{
    hasDialogOpenedWithService: boolean = false;
    display: boolean = false;
    dialogAction: string;


    hasConfirmationOpenedWithService: boolean = false;
    displayConfirmation: boolean = false;
    confirmationAction: string;


    hasOverlayOpenedWithService: boolean = false;
    overlayAction: string;

    constructor(private modalService: ModalService, public renderer: Renderer2)
    {

    }

    close()
    {
        this.display = false;
    }

    open()
    {
        this.display = true;
    }

    openAction()
    {
        this.dialogAction = 'open';
    }

    closeAction()
    {
        this.dialogAction = 'close';
    }

    toggleDialogWithService()
    {
        if (!this.hasDialogOpenedWithService) {

            this.modalService.open<DialogComponent>(DialogComponent, {
                title: 'GodFather I ?',
                body: `
                                 The story begins as Don Vito Corleone, the head of a New York
                                 Mafia family, oversees his daughter's wedding. His beloved son
                                 Michael has just come home from the war, but does not intend
                                 to become part of his father's business. Through Michael's life
                                 the nature of the family business becomes clear. The business
                                 of the family is just like the head of the family, kind and
                                 benevolent to those who give respect, but given to ruthless
                                 violence whenever anything stands against the good of the
                                 family.`,
                width: 200,
                modal: false,
                onClose: () =>
                {
                    // If the x button is clicked.
                    this.hasDialogOpenedWithService = false;
                }
            });

            this.hasDialogOpenedWithService = true;

        } else {

            this.hasDialogOpenedWithService = false;

            this.modalService.close();
        }
    }

    // Confirmation
    openConfirmation()
    {
        this.displayConfirmation = true;
    }

    closeConfirmation()
    {
        this.displayConfirmation = false;
    }

    confirmAction()
    {
        this.confirmationAction = 'confirm';
    }

    cancelAction()
    {
        this.confirmationAction = 'cancel';
    }


    toggleConfirmationWithService()
    {
        if (!this.hasConfirmationOpenedWithService) {

            this.modalService.open<ConfirmationComponent>(ConfirmationComponent, {
                title: 'GodFather I',
                body: `
                                 Is GodFather the best movie made? `,
                width: 300,
                onConfirm: () =>
                {

                    this.confirmAction();

                    this.hasConfirmationOpenedWithService = false;
                },

                onCancel: () =>
                {
                    this.cancelAction();

                    this.hasConfirmationOpenedWithService = false;
                }
            });

            this.hasConfirmationOpenedWithService = true;

        } else {
            this.hasConfirmationOpenedWithService = false;

            this.modalService.close();
        }
    }


    // Overlay
    toggleOverlayWithService(event: any)
    {
        if (!this.hasOverlayOpenedWithService) {

            let overlay = this.modalService.open<OverlayComponent>(OverlayComponent, {});

            // Add content. There's not support for dynamic content projection yet.
            // So have add content directly.
            // This is probably not the best way.
            overlay.instance.overlay.el.nativeElement.querySelector('.ui-overlaypanel-content')
                .innerHTML = `<img style='width:300px;' src="sales.png" alt="Sales" />`;

            // delay the opening after ng lifecycle has been initalized.
            setTimeout(() =>
            {
                overlay.instance.open(event);
            }, 1);

            this.hasOverlayOpenedWithService = true;

        } else {

            this.hasOverlayOpenedWithService = false;

            this.modalService.close();
        }
    }

}
