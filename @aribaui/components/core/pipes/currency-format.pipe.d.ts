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
import { CurrencyPipe } from '@angular/common';
import { PipeTransform } from '@angular/core';
/**
 * This currency formatter will ignore null and empty string for value.
 * Issue : https://github.com/angular/angular/issues/8694  DI fails when extends other classes
 */
export declare class CurrencyFormatPipe implements PipeTransform {
    private currencyPipe;
    constructor(currencyPipe: CurrencyPipe);
    transform(value: string, ...args: any[]): any;
}
