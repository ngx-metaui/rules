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
import {CurrencyPipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

/**
 * This currency formatter will ignore null and empty string for value.
 * Issue : https://github.com/angular/angular/issues/8694  DI fails when extends other classes
 */
@Pipe({
  name: 'currencyFormat',
  pure: false
})
export class CurrencyFormatPipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe) {
  }

  transform(value: string, ...args: any[]): any {

    // Default values
    let currencyCode = 'USD', symbolDisplay = true, digits = '1.0-2';

    if (!value || value.length === 0) {
      return value;
    }

    if (args && args.length > 0) {
      let code = args[0];
      if (code && code.length > 0) {
        currencyCode = code;
      }
    }

    return this.currencyPipe.transform(value, currencyCode, symbolDisplay, digits);
  }
}

