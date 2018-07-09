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
import {AfterContentInit, Component, ContentChild, ElementRef} from '@angular/core';
import {Environment, isPresent} from '@aribaui/core';
import {BaseComponent} from '../../../core/base.component';

/**
 * Footer component that implements consistent styling, behavior.
 * This footer component self contained.
 *
 *  @Component({
 *    selector: 'registration' ,
 *    template: `
 *
 *          <aw-page-footer>
 *               <div class="page-footer-logo">
 *                   <img src="images/ariba_logo_white_bkgd.png">
 *               </div>
 *               <div class="page-footer-user-info">
 *                   Chad Noll (cnoll) last visit {{last_visited | date:'MM/dd/yyyy h:mma' }}
  *                   | Buyer Organization
 *               </div>
 *               <span class="page-footer-copyright" #copyright>
 *                   <p>© 2020–2028 The Future, Inc. All rights reserved</p>
 *               </span>
 *           </aw-page-footer>
 *    `
 *    })
 *    export class MyPage
 *    {
 *        constructor ()
 *        {
 *        }
 *
 *    }
 */
@Component({
    selector: 'aw-page-footer',
    templateUrl: 'page-footer.component.html',
    styleUrls: ['page-footer.component.scss']
})
export class PageFooterComponent extends BaseComponent implements AfterContentInit
{

    /**
     * copyright content
     */
    @ContentChild('copyright') copyright: any;

    /**
     * show default copyright. If copyright is passed in, then show the passed in one.
     */
    showDefaultCopyright: boolean = true;

    constructor(protected element: ElementRef, public env: Environment)
    {
        super(env);
    }


    ngOnInit(): void
    {
        super.ngOnInit();
    }

    ngAfterContentInit()
    {
        this.showDefaultCopyright = !isPresent(this.copyright);
    }
}
