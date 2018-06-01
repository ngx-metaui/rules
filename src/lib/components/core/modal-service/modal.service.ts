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
import {
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    Injectable,
    Type,
    ViewContainerRef
} from '@angular/core';

/**
 * Modal service is used to to create modal dialogs. It creates modal dialogs dynamically.
 * The service also keeps track of the created modal dialog and can close it by calling the
 * service's close()
 *
 * Modal service requires a ViewContainer to insert newly created modals. This is taken care
 * by the ModalComponent.
 *
 * Usage:
 *     Add   <aw-modal></aw-modal>  into your application main html. It needs to be on every
 *     page where a modal dialog will appear.
 *
 *    1.  Popup a dialog without creating your own component.
 *        Use the existing DialogComponent in widgets.
 *
 *             this.modalService.open<DialogComponent>(DialogComponent, {
 *                     title: 'My Popup Title',
 *                     body: 'My Popup Body'
 *              });
 *
 *
 *   2.   Creating your own Dialog Component to popup.
 *
 *         let componentRef = this.modalService.open<MyDialogComponent>(MyDialogComponent,
 * {inputs});
 *
 *          @Component({
 *                selector: 'aw-mydialog' ,
 *                           template: `
 *                                         <aw-dialog (onClose)="closePopup()">
 *                                              <ng-template #titleTemplate>
 *                                                 <span><i class="fa fa-envira" ></i>This is my
 *     Title </span>
 *                                              </ng-template>
 *                                              <ng-template #bodyTemplate>
 *                                                 <span><i class="fa fa-envira" ></i>This is my
 *     Body </span>
 *                                              </ng-template>
 *                                        </aw-dialog>
 *                                     `
 *         })
 *         export class MyDialogComponent extends DialogComponent implements OnInit {
 *                     constructor(private modalService: ModalService) {
 *                          super();
 *                       }
 *                     ngOnInit() { }
 *
 *                     closePopup() {
 *                            this.modalService.close();
 *                      }
 *         }
 */
@Injectable()
export class ModalService
{
    /**
     * This is a static list of output parameter from Dialog, Confirmation components
     * that needs to be handled.
     *
     * @type {string|string|string[]}
     */
    private static OUTPUT_PARAMETERS: string[] = ['onClose', 'onConfirm', 'onCancel'];


    /**
     * Container for the newly created modal. This is passed in through the
     * registerViewContainerRef().
     */
    private vcRef: ViewContainerRef;

    /**
     * Storing the created modal instance.
     */
    private instance: any;

    /**
     * DI ComponentFactoryResolver to be used to create modal component.
     *
     * @param cfr
     */
    constructor(private cfr: ComponentFactoryResolver)
    {
    }

    /**
     *  PlaceHolder for modal to be inserted.
     *
     * @param vcRef
     */
    registerViewContainerRef(vcRef: ViewContainerRef): void
    {
        this.vcRef = vcRef;
    }

    /**
     * Opens the modal dialog by dynamically creating the component and adding it to vcRef.
     *
     * @param component
     * @param parameters
     * @returns {ComponentRef<T>}
     */
    open<T>(component: Type<T>, parameters?: any): ComponentRef<T>
    {
        const cf: ComponentFactory<T> = this.cfr.resolveComponentFactory(component);
        let componentRef: ComponentRef<T> = this.vcRef.createComponent(cf);

        // Auto set visiblity to true. So that the Dialog will display
        parameters = (parameters) ? parameters : {};
        parameters['visible'] = true;

        // Handle output parameters.
        ModalService.OUTPUT_PARAMETERS.forEach((param) =>
        {
            if (parameters[param]) {
                (<any>componentRef.instance)[param].subscribe(parameters[param]);
                delete parameters[param];
            }
        });

        Object.assign(componentRef.instance, parameters);

        // had to cast it in order to avoid any index Error
        // Attach a destroy method to the newly created component.
        (<any>componentRef.instance)['destroy'] = () =>
        {
            componentRef.destroy();
        };
        // Save the instance, so it can be destroyed later.
        this.instance = componentRef;

        return componentRef;
    }

    /**
     * Calling close() will remove the modal from view.
     */
    close()
    {
        if (this.instance) {
            this.instance.destroy();
            this.instance = null;
        }
    }
}
