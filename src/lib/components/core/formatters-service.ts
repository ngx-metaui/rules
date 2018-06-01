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
import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {BooleanWrapper, isDate, isNumber, StringJoiner} from '@aribaui/core';

/**
 *
 * Provides a default (localized) set of formatters accessible via "$formatters.{name}" bindings
 * off of BaseComponent.
 *
 * Bundled formatters include:
 *
 * <ol>
 *     <li>boolean</li>
 *     <li>shortDate</li>
 *     <li>longDDate</li>
 *     <li>dateTime</li>
 *     <li>timeMillis</li>
 *     <li>duration</li>
 *
 * </ol>
 */


@Injectable()
export class FormattersService
{
    static readonly BooleanFormatter = 'boolean';
    static readonly ShortDateFormatter = 'shortDate';
    static readonly LongDateFormatter = 'longDate';
    static readonly DateTimeFormatter = 'dateTime';
    static readonly TimeMillisFormatter = 'timeMillis';
    static readonly DurationFormatter = 'duration';
    static readonly CurrencyFormatter = 'currency';

    private formatters: Map<string, PipeTransform>;


    constructor(private _i18nService: TranslateService)
    {
        this.formatters = new Map<string, PipeTransform>();
    }

    register(name: string, formatter: PipeTransform)
    {
        this.formatters.set(name, formatter);

    }

    get i18nService(): TranslateService
    {
        return this._i18nService;
    }

    get(name: string): PipeTransform
    {
        return this.formatters.get(name);
    }

    populate(): Promise<any>
    {
        let promise: Promise<any> = new Promise((resolve: any) =>
        {
            this.register(FormattersService.BooleanFormatter, {
                transform(value: any): string
                {
                    if (value instanceof Boolean || value instanceof String) {
                        return BooleanWrapper.boleanValue(value) ? 'true' : 'false';
                    }
                    return value;
                }
            });

            this.register(FormattersService.ShortDateFormatter,
                new DateFormatter(this._i18nService, FormattersService.ShortDateFormatter));

            this.register(FormattersService.LongDateFormatter,
                new DateFormatter(this._i18nService, FormattersService.LongDateFormatter));

            this.register(FormattersService.DateTimeFormatter,
                new DateFormatter(this._i18nService, FormattersService.DateTimeFormatter));

            this.register(FormattersService.TimeMillisFormatter, {

                transform(value: any): string
                {
                    if (isDate(value)) {
                        return value.getTime() + '';
                    }
                    return value;
                }
            });

            // Covert time in seconds to format like 1:23:22.01
            this.register(FormattersService.DurationFormatter, new TimeDurationFormatter());

            this.register(FormattersService.CurrencyFormatter,
                new CurrencyFormatter(this._i18nService));

            resolve(true);
        });
        return promise;
    }
}

/**
 * Generic DateFormatter which reads <code>resources.widgets.date</code> and retrieve  a date
 * pattern which is then used GenericFormatter PIPE to do the final formatter.
 *
 * The PipeTransform interface is clearly to make sure we are in sync with Angular's Pipe
 * definition
 */
export class DateFormatter implements PipeTransform
{
    static readonly DateFormatterPrefix = 'Widgets.date.';
    private datePipe: DatePipe;

    private _pattern: string;
    private _patternNG: string;

    constructor(protected _i18nService: TranslateService, public format: string)
    {
        this.datePipe = new DatePipe(this._i18nService.currentLang || 'en');
    }


    /**
     * Components might call directly transform or just use the date formatting pattern
     *
     *
     */
    get pattern(): string
    {
        this._pattern = this._i18nService.instant(DateFormatter.DateFormatterPrefix + this.format);
        return this._pattern;
    }

    /**
     * This is a workaround as formatting of PrimeNg calendar and angular pipes are different
     *
     */
    get patternNG(): string
    {
        this._patternNG = this._i18nService.instant(
            DateFormatter.DateFormatterPrefix + this.format +
            'NG');
        return this._patternNG;
    }

    transform(value: any): string
    {
        let ngPattern = this.patternNG || this.pattern;
        return this.datePipe.transform(value, ngPattern);
    }
}

/**
 * CurrencyFormatter which reads a number value and formats it based on the locale and currency
 * code. The locale is set based on the TranslateService. CurrencyCode and symbolDisplay are
 * optional.
 *
 */
export class CurrencyFormatter implements PipeTransform
{
    static readonly CurrencyFormatterPrefix = 'Widgets.currency.';

    private currencyPipe: CurrencyPipe;
    private _currencyCode: string;
    private _symbolDisplay: boolean;

    constructor(protected _i18nService: TranslateService,
                private format: string = 'CurrencyPattern')
    {
        this._i18nService.onLangChange.subscribe((event: LangChangeEvent) =>
        {

            this.currencyPipe = new CurrencyPipe(event.lang);
        });
    }

    get currencyCode(): string
    {
        this._currencyCode = this._i18nService.instant(
            CurrencyFormatter.CurrencyFormatterPrefix + this.format).CURRENCY_CODE;
        return this._currencyCode;
    }

    get symbolDisplay(): boolean
    {
        this._symbolDisplay = this._i18nService.instant(
            CurrencyFormatter.CurrencyFormatterPrefix + this.format).SYMBOL_DISPLAY;
        return this._symbolDisplay;
    }

    transform(value: any): string
    {
        return this.currencyPipe.transform(value, this.currencyCode, this.symbolDisplay);
    }
}


/**
 * A Generic Formatter Pipe used to format values using Locale specific patters and inputs.
 *
 * ###Usage
 *
 * ```
 *  {{myDate | formatTo:'shortDate'}}
 *
 * ```
 *
 * The above example will retrieve registered formater and from specific resource file will
 * retrieve a pattern and do the formatting.
 *
 */
@Pipe({name: 'formatTo', pure: false})
export class GenericFormatterPipe implements PipeTransform
{

    constructor(protected formatters: FormattersService)
    {
    }

    transform(value: any, formatterId: string): string
    {
        return this.formatters.get(formatterId).transform(value);
    }
}


/**
 * Generic DateFormatter which reads <code>resources.widgets.date</code> and retrieve  a date
 * pattern which is then used GenericFormatter PIPE to do the final formatter.
 *
 * The PipeTransform interface is clearly to make sure we are in sync with Angular's Pipe
 * definition
 */
export class TimeDurationFormatter implements PipeTransform
{
    constructor()
    {
    }

    transform(value: any): string
    {
        if (isNumber(value)) {
            let buf: StringJoiner = new StringJoiner([]);

            let currentValue: number = value;
            let time = currentValue * 1000;
            let millis = time % 1000;
            let seconds = (time / 1000) % 60;
            let minutes = (time / 60000) % 60;
            let hours = (time / 3600000) % 24;

            if (hours !== 0) {
                this.append(buf, hours, ':');
            }
            this.append(buf, minutes, ':');
            this.append(buf, seconds, (millis !== 0) ? ':' : null);

            if (millis !== 0) {
                this.append(buf, millis, null);
            }
            return buf.toString();
        }

        return value;
    }

    append(buf: StringJoiner, comp: number, sep: string): void
    {
        let s = comp + '';
        if (s.length < 2) {
            buf.add('0');
        }
        buf.add(s);
        if (sep != null) {
            buf.add(sep);
        }
    }
}



