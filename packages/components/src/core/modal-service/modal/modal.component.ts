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
import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalService} from '../modal.service';


/**
 * Place holder for all modal dialogs. This component works with the modalService by providing
 * a place holder for it to inject Dialog component into.
 */
@Component({
    selector: 'aw-modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.scss']
})
export class ModalComponent implements OnInit
{

    @ViewChild('modal', {read: ViewContainerRef})
    viewContainerRef: ViewContainerRef;

    constructor(private modalService: ModalService)
    {
    }

    ngOnInit()
    {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
    }

}
