/**
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
 */
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
    MissingTranslationHandler,
    TranslateFakeLoader,
    TranslateLoader,
    TranslateModule
} from '@ngx-translate/core';
import {AppConfig} from './config/app-config';
import {Environment} from './config/environment';
import {DefaultTranslateLoader} from './i18n/default-translate-loader';
import {DefaultMissingTranslationHandler} from './i18n/default-translation-handler';


/**
 * Core i18n. Due to the nature of @ng-translate where we can not really override all
 * providers so they can be instantiated only once we need to create this new
 * module that should be imported only at the root level.
 *
 * When we say to instantiate only once means that our AribaCoreModule has one root import with
 * the .forRoot() and then can be imported across application. Originally we wrapped Translate
 * import into AribaCoreModule but it created several shadow copies of TranslateService.
 *
 * I tried to redefine provides inside our .forRoot(), but there is one provider for which it is
 * not possible. Until we find better solution we will have this.
 *
 * Of course we can import directly TranslateModule.forRoot but then every time we would have to
 * provide our custom initialization again
 *
 *
 */
@NgModule({
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: initTranslateLoader,
                deps: [HttpClient, Environment, AppConfig]
            },
            missingTranslationHandler: {
                provide: MissingTranslationHandler,
                useClass: DefaultMissingTranslationHandler
            },
            isolate: false

        }),

    ],
    exports: [
        TranslateModule
    ],
    bootstrap: []
})
export class AribaCoreI18nModule
{
    constructor (@Optional() @SkipSelf() parentModule: AribaCoreI18nModule)
    {

    }

}

export function initTranslateLoader (http: HttpClient, env: Environment, config: AppConfig)
{
    let i18nEnabled = config.getBoolean(AppConfig.i18nEnabled);

    if (i18nEnabled) {
        let assetFolder = env.getValue(AppConfig.AssetFolder);
        return new DefaultTranslateLoader(http, env, `${assetFolder}/i18n`, '.json');
    } else {
        return new TranslateFakeLoader();
    }

}


