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
import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Directive,
    DoCheck,
    ElementRef,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChange
} from '@angular/core';
import {isPresent, print} from '@aribaui/core';


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
@Directive({selector: '[spyHooks]'})
export class SpyLifeCycleHooksDirective implements OnDestroy, OnInit, DoCheck, OnChanges,
    AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked
{

    constructor(private elementRef: ElementRef)
    {
    }


    ngOnInit()
    {
        this.logIt('onInit');
    }

    ngOnDestroy()
    {
        this.logIt('onDestroy');
    }


    ngOnChanges(changes: {[ propName: string]: SimpleChange})
    {
        this.logIt('ngOnChanges = ' + changes);
    }

    ngDoCheck()
    {
        this.logIt('ngDoCheck');
    }

    ngAfterContentInit()
    {
        this.logIt('ngAfterContentInit');
    }

    ngAfterContentChecked()
    {

        this.logIt('ngAfterContentChecked');
    }

    ngAfterViewInit()
    {
        this.logIt('ngAfterViewInit');
    }

    ngAfterViewChecked()
    {
        this.logIt('ngAfterViewChecked');
    }

    private logIt(msg: string)
    {
        let level = 0;
        let me = this.elementRef.nativeElement;
        let tagBody = me;

        while ((tagBody = tagBody.parentNode) != null) {
            level++;
            if (tagBody.tagName === 'APP-ROOT' || level === 6) {
                break;
            }
        }
        let indent = '';
        let indentNumber = level;
        while (level > 0) {
            indent += '\t';
            level--;
        }


        let params = '';
        if (isPresent(me.attributes)) {
            for (let i = 0; i < me.attributes.length; i++) {
                let attr: Attr = me.attributes.item(i);
                if (this.ignore(attr.name.toLowerCase())) {
                    continue;
                }


                params += '(' + attr.name + '=' + attr.value + '),  ';
            }
        }
        print(indent + me.tagName + '(' + indentNumber + '): ' + msg + ' => ' + params);
    }

    private ignore(name: string): boolean
    {
        return name.indexOf('_ng') > -1 ||
            name.indexOf('ng-') > -1 ||
            name.indexOf('spyhooks') > -1;
    }
}
