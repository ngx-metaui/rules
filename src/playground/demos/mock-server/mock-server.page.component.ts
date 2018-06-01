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
import {Component} from '@angular/core';
import {BaseFormComponent} from '@aribaui/components';
import {Environment, Resource} from '@aribaui/core';
import {FormGroup} from '@angular/forms';
import {User} from '../../domain/user';
import {HttpClient, HttpResponse} from '@angular/common/http';


@Component({
    templateUrl: './mock-server.page.component.html',
    styleUrls: ['./mock-server.page.component.scss']
})
export class MockServerPageComponent extends BaseFormComponent
{
    list: User[] = [];

    formGroup: FormGroup;
    showDetails: boolean = false;

    constructor(public env: Environment, private httpClient: HttpClient,
                private entityRes: Resource)
    {
        super(env, null);
        this.editable = false;
    }

    ngOnInit()
    {
        this.formGroup = new FormGroup({});
        this.entityRes
            .load()
            .resource(User)
            .asEntity((res: User[]) => {
                this.list = res;

            });
    }

    onView(event: any, formId: string): void
    {

        this.editable = false;
        this.showDetails = true;

        this.entityRes
            .load()
            .resource(User)
            .withId(formId)
            .asEntity((res: User) => {
                setTimeout(() => {
                    this.formGroup.setValue(res);
                }, 300);
            });
    }


    onEdit(event: any, formId: string): void
    {
        this.editable = true;
        this.showDetails = true;


        this.entityRes
            .load()
            .resource(User)
            .withId(formId)
            .asEntity((res: User) => {
                setTimeout(() => {
                    this.formGroup.setValue(res);
                }, 300);
            });
    }

    save(event: any): void
    {
        let rawValue: User = this.formGroup.getRawValue();

        this.entityRes.save()
            .resource(User)
            .withId(rawValue.identity())
            .withData(rawValue)
            .asEntity((u: User) => {
                this.list = [];

                this.entityRes.load()
                    .resource(User)
                    .asEntity((res: User[]) => {
                        setTimeout(() => {
                            this.list = res;

                            this.editable = false;
                            this.showDetails = false;

                        }, 300);
                    });
            });
    }
}
