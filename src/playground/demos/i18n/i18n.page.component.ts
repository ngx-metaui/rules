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
import {Component, ChangeDetectorRef} from '@angular/core';
import {BaseComponent, Money} from '@aribaui/components';
import {Environment, AppConfig} from '@aribaui/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
    templateUrl: './i18n.page.component.html',
    styleUrls: ['./i18n.page.component.scss']
})
export class I18nPageComponent extends BaseComponent
{

    codeOneColumn: boolean = false;

    lang: string = 'en';

    myParam: String = ' Its me param';
    myDate: Date = new Date();
    myMoney: Money = new Money(123457.89);
    myCurrency: number = 9876543.21;
    pseudoLocaleOn: boolean = false;
    editableControl: boolean = true;
    readOnlyControl: boolean = false;
    refresh: boolean = true;

    constructor(protected environment: Environment, public i18nService: TranslateService,
                private config: AppConfig, private cd: ChangeDetectorRef)
    {
        super(environment);

    }

    ngOnInit()
    {
        super.ngOnInit();

        this.i18nService.onLangChange.subscribe((lang: any) =>
        {
            this.i18nService.onTranslationChange.emit({lang: this.lang,
                translations: this.i18nService.translations[this.lang]});

            this.cd.detectChanges();
        });

        this.i18nService.onTranslationChange.subscribe((lang: any) =>
        {
            this.cd.detectChanges();
        });
    }

    langSelected(lang: any): void
    {
        if (this.lang !== lang) {
            this.lang = lang;
            this.i18nService.use(this.lang);
            this.i18nService.reloadLang(this.lang);

            this.environment.locale = lang;
        }
    }

    onPseudoLocale(event: any): void
    {

        this.pseudoLocaleOn = event.length > 0;
        this.environment.isPseudoLocalized = event;

        this.langSelected(this.lang);
        this.i18nService.reloadLang(this.lang);

        // little hack to force refresh the page and its translation pipes
        this.i18nService.onTranslationChange.emit({lang: this.lang,
            translations: this.i18nService.translations[this.lang]});

    }

    /**
     * Just hackie thing to force controls to refresh
     */
    toggleRefresh(event: any): void
    {
        this.refresh = !this.refresh;
    }

}


