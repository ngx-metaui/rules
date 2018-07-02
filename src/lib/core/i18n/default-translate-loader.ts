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
import {forkJoin as observableForkJoin, of as observableOf, Observable} from 'rxjs';

import {map} from 'rxjs/operators';




import {TranslateLoader} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {isBlank, isString, isStringMap} from '../utils/lang';
import {Environment} from '../config/environment';


/**
 *  @formatter:off
 */
const PLCharacterMap: any = {
    'a': 'à', 'b': 'ƀ', 'c': 'ç', 'd': 'ð', 'e': 'é', 'f': 'ƒ', 'g': 'ĝ', 'h': 'ĥ', 'i': 'î',
    'l': 'ļ', 'k': 'ķ', 'j': 'ĵ', 'm': 'ɱ', 'n': 'ñ', 'o': 'ô', 'p': 'þ', 'q': 'ǫ', 'r': 'ŕ',
    's': 'š', 't': 'ţ', 'u': 'û', 'v': 'ṽ', 'w': 'ŵ', 'x': 'ẋ', 'y': 'ý', 'z': 'ž', 'A': 'À',
    'B': 'Ɓ', 'C': 'Ç', 'D': 'Ð', 'E': 'É', 'F': 'Ƒ', 'G': 'Ĝ', 'H': 'Ĥ', 'I': 'Î', 'L': 'Ļ',
    'K': 'Ķ', 'J': 'Ĵ', 'M': 'Ṁ', 'N': 'Ñ', 'O': 'Ô', 'P': 'Þ', 'Q': 'Ǫ', 'R': 'Ŕ', 'S': 'Š',
    'T': 'Ţ', 'U': 'Û', 'V': 'Ṽ', 'W': 'Ŵ', 'X': 'Ẋ', 'Y': 'Ý', 'Z': 'Ž'
};
/**
 *  @formatter:on
 */


/**
 * Default implementation of NG-translate loader Service that extends JSON FORMAT for the comment
 * as well ass add some more functionality such as pseudolocalizing translation strings
 */
export class DefaultTranslateLoader implements TranslateLoader
{
    private static readonly KEY = 'KEY';
    private static readonly VAL = 'VALUE';
    private static readonly COMMENT = 'COMMENT';
    // public env: Environment;

    /**
     * Resource keys to be skipped for pseudo localization. There are keys in the resource files
     * that are properties. They are meant for configuration for this locale.
     *
     */
    private static readonly SKIP_PSEUDOLOCALIZE: string[] = ['CURRENCY_CODE'];

    constructor(private http: HttpClient,
                public env: Environment,
                private path: string = '/assets/i18n',
                private suffix: string = '.json')
    {
    }


    /**
     * Retrieves translation strings for given language from the <code>path<code>. The main reason
     * behind having custom getTranslation is to:
     *  - to be able to support multiple locale resources, not just en.json like you can see it
     * different demos
     *  - Extend resource files for COMMENT field so we know little bit more about the translation
     *  - pseudolocalization
     *
     *
     */
    getTranslation(lang: string): Observable<any>
    {
        if (this.env.inTest) {
            return observableOf({
                'Common': {
                    'init': '.'
                }
            });
        }
        // todo: merge all this into one file so we dont have to do several http gets
        return observableForkJoin(
            this.http.get(`${this.path}/${lang}/resource.app${this.suffix}`).pipe(
                map((translation: any) =>
                {
                    this.checkAndUpdateValue(translation);
                    return translation;
                }))
            ,
            this.http.get(`${this.path}/${lang}/i18n.resource${this.suffix}`).pipe(
                map((translation: any) =>
                {
                    this.checkAndUpdateValue(translation);
                    return translation;
                })),
        ).pipe(map(data =>
            {
                let app = data[0];
                let lib = data[1];

                let widgetRes = {
                    Widgets: lib['Widgets'],
                    Common: lib['Common']
                };
                return Object.assign(app, widgetRes);
            }
        ));
    }

    /**
     *
     * Reads localized string value and replace its characters with alternative characters which
     * makes it still readable but user can quickly see which text on the screen is translated and
     * which is not.
     *
     * e.g. Instead of rendering Account Settings you will see Àççôûñţ Šéţţîñĝš.
     *
     *
     * TODO: We need extends existing format to have a flag if current translation can be
     * pseudolocailzed or not. For some strings like data dd/mm/YYYY it does not make sense plus
     * it will break the formating
     */
    private pseudoLocalize(str: string): string
    {
        if (isBlank(str) || str.length === 0) {
            return str;
        }
        let re = new RegExp('(\\$[^\\s]+|\\{\\{.+?\\}\\}|<[^>]+?>|&[^;]+)', 'g');
        let position = 0, output = '', match: any;

        while (true) {
            match = re.exec(str);
            if (!match) {
                break;
            }
            output += this.doPseudoLocalizeString(str, position, match.index - 1);
            output += match[0];

            position = match.index + match[0].length;
        }
        if (position < str.length) {
            output += this.doPseudoLocalizeString(str, position, str.length - 1);
        }
        return output;
    }


    /**
     * Do actual character replacement.
     *
     */
    private doPseudoLocalizeString(str: string, start: number, end: number): string
    {
        let output = '', char: any, alternatives: any;
        for (let i = start; i <= end; i++) {
            char = str[i];

            alternatives = PLCharacterMap[char];
            if (!alternatives) {
                output += char;
                continue;
            }
            output += alternatives[i % alternatives.length];
        }
        return output;
    }

    /**
     * Translation handler to remove unnecessary data in translation observable loaded
     * from the JSON file (i.e. COMMENT) and apply pseudo localization when needed
     *
     * @param translation, observable that contains translation strings
     */
    private checkAndUpdateValue(translation: any)
    {

        for (let key in translation) {
            // skip loop if the property is from prototype
            if (!translation.hasOwnProperty(key)) {
                continue;
            }

            let obj = translation[key];
            for (let prop in obj) {
                if (!obj.hasOwnProperty(prop)) {
                    continue;
                }

                // Goal here is to have in our observable only the translation key and its
                // translated string.
                if (prop === DefaultTranslateLoader.VAL) {
                    translation[key] = this.env.isPseudoLocalized ? this.pseudoLocalize(
                            obj[prop]) : obj[prop];
                    break;
                } else if (isStringMap(obj)) {
                    this.checkAndUpdateValue(obj);
                } else if (isString(obj)) {
                    translation[key] = (this.env.isPseudoLocalized &&
                    DefaultTranslateLoader.SKIP_PSEUDOLOCALIZE.indexOf(prop) < 0 ) ?
                        this.pseudoLocalize(obj) :
                        obj;
                    break;
                }
            }
        }
    }

}
