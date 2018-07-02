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
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Environment} from '@aribaui/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';


/**
 * Before MetaUI Page Is loaded we need to make sure that all the translation are ready otherwise
 * resolving values which have $[xxx] localization expression will fail
 */
@Injectable()
export class I18nMetaResolve implements Resolve<any>
{

    constructor(private env: Environment, private i18nService: TranslateService)
    {
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string>
    {
        return this.i18nService.get('123');
    }

}

