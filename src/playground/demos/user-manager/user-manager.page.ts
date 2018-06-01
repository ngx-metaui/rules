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
import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {Environment} from '@aribaui/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

@Component({
    selector: 'app-user-manager',
    templateUrl: './user-manager.page.html',
    styleUrls: ['./user-manager.page.scss']
})
export class UserManagerPageComponent implements OnInit
{
    userObject: User;
    private timerCall: any;

    operation: string = 'edit';


    constructor(private env: Environment)
    {
    }

    ngOnInit()
    {
        let timer = Observable.timer(2000);

        // this.timerCall = timer.subscribe(t => {
        //     this.userObject = new User('Peter', 'Pan', 8, 'BEST', 'peter@neverland.com');
        // });
        this.userObject = new User('Peter', 'Pan', 8, 'BEST', 'peter@neverland.com');


    }

    onEdit(event: any): void
    {

        this.operation = 'edit';
    }


    onView(event: any): void
    {

        this.operation = 'view';
    }
}
