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
import {NgModule} from '@angular/core';
import {AribaCoreModule, AppConfig, isBlank} from '@aribaui/core';
import {AribaComponentsModule} from '@aribaui/components';
import {AppRoutingModule} from './playground-app-routing.module';
import {PlaygroundAppComponent} from './playground-app.component';
import {DemoModule} from './demos/demo.module';
import * as userRules from './user-rules';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        PlaygroundAppComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AribaCoreModule.forRoot({
            /**
             * Bootstrap init properties
             */
            'app.title': 'Playground Application',

            // optionally specify several global rule files (without oss). Application.oss
            // is always default value
            'metaui.rules.file-names': ['Application', 'Layout'],


            /**
             * Runtime properties
             */
            'restapi.realm': 'myRealm',
            'restapi.context': '/myService/',
            // turning on our MockServer
            'connection.mock-server.enabled': true,
            // What routes we should register
            'connection.mock-server.routes': ['users', 'carrentalrequests']

        }),
        AppRoutingModule,
        AribaComponentsModule.forRoot(),
        DemoModule
    ],
    entryComponents: [
        PlaygroundAppComponent
    ],

    exports: [],
    bootstrap: [PlaygroundAppComponent]
})
export class PlaygroundAppModule
{


    constructor(private appConfig: AppConfig)
    {
        // mandatory - you need to specify user's or application defined rules and types
        let rules: any[] = this.appConfig.get('metaui.rules.user-rules');

        if (isBlank(rules)) {
            rules = [];
        }

        rules.push(userRules);
        this.appConfig.set('metaui.rules.user-rules', rules);
    }
}
