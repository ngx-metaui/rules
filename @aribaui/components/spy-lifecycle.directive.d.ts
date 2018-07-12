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
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
/**
 * Spy lifecycle directive is used for debugging purposes to track lifecycle callback
 *
 * ###Usage
 *
 * ```
 *   <my-directive spyhooks><my-directive>
 *
 * ```
 */
export declare class SpyLifeCycleHooksDirective implements OnDestroy, OnInit, DoCheck, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
    private elementRef;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    ngDoCheck(): void;
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    private logIt(msg);
    private ignore(name);
}
