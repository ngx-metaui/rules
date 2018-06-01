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
import {TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AribaCoreModule} from '../ariba.core.module';
import {AppConfig} from '../config/app-config';
import {AribaApplication} from '../ariba-application';
import {AribaCoreI18nModule} from '../index';


describe('generic Ariba application ', () =>
{

    beforeEach(() =>
    {

        TestBed.configureTestingModule({
            declarations: [
                MyTodoAppTestComponent
            ],
            imports: [
                AribaCoreI18nModule,
                AribaCoreModule.forRoot({
                    'app.title': 'My Todos',
                    'i18n.enabled': false,
                    'env.test': true
                }),

            ]
        });
        TestBed.compileComponents();

    });

    it('should have Title and MetaTags service defined', () =>
        {
            let fixtureWrapper = TestBed.createComponent(MyTodoAppTestComponent);
            fixtureWrapper.detectChanges();

            expect(fixtureWrapper.componentInstance.title).toBeDefined();
            expect(fixtureWrapper.componentInstance.metaTags).toBeDefined();
        }
    );


    it('should set page title when application starts', () =>
        {
            let fixtureWrapper = TestBed.createComponent(MyTodoAppTestComponent);
            let titleS = TestBed.get(Title);
            spyOn(titleS, 'setTitle');

            fixtureWrapper.detectChanges();
            expect(titleS.setTitle).toHaveBeenCalledWith('My Todos');
        }
    );

});


@Component({
    selector: 'wrapper-comp',
    template: `
            Todo
        `
})
class MyTodoAppTestComponent extends AribaApplication
{


    constructor(appConfig: AppConfig)
    {
        super(appConfig);
    }
}
