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
import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';

/**
 * When translation is not Found in our resources files, return a marker instead
 */
export class DefaultMissingTranslationHandler implements MissingTranslationHandler
{


    constructor()
    {
    }

    handle(params: MissingTranslationHandlerParams): any
    {
        // if (!this.env.inTest) {
        //     console.error('Missing translation even in default language for key: ' + params.key);
        // }
        return params.key;
    }

}
