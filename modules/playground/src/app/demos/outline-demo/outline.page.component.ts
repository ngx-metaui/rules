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
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Environment, isPresent, ListWrapper} from '@aribaui/core';
import {OutlineForComponent} from '@aribaui/components';


@Component({
    templateUrl: './outline.page.component.html',
    styleUrls: ['./outline.page.component.scss']
})
export class OutlinePageComponent implements OnInit,
    AfterViewInit
{
    list: any[];

    currentItem: any;

    filterItems: string[] = ['US', 'EU', 'JP'];

    constructor(protected environment: Environment)
    {
    }

    ngOnInit()
    {
        setTimeout(() => {
                this.list = [
                    {
                        content: '1.0 Introduction Terms and Conditions',
                        type: 'section',
                        children: [
                            {
                                content: '1.1 Introduction Terms and Conditions 1 is cool 1.1' +
                                ' Introduction Terms and Conditions 1 is cool 1.1 Introduction ' +
                                'Terms and' + ' Conditions 1 is cool 1.1 Introduction ' +
                                'Terms and Conditions 1 is cool 1.1 Introduction Terms and ' +
                                'Conditions 1 is cool 1.1 Introduction Terms  and Conditions 1' +
                                ' is cool and Conditions 1 is cool and Conditions 1 is' +
                                ' and Conditions 1 is cool and Conditions 1 is cool and ' +
                                'Conditions 1 is'
                                ,
                                type: 'text'
                            }
                        ]
                    },
                    {
                        content: '2.0 Terms and Conditions',
                        type: 'section',
                        children: [
                            {
                                content: '2.1 Terms and Conditionssss 1',
                                type: 'question'
                            },
                        ]
                    },
                    {
                        content: '3.0 Solution',
                        type: 'section',
                        children: [
                            {
                                content: '3.1 Solution 1',
                                type: 'text'
                            },
                            {
                                content: '3.2 Solution 2',
                                type: 'text'
                            },
                            {
                                content: '3.3 Solution 2',
                                type: 'section',
                                children: [
                                    {
                                        content: '3.1.1 Solution ',
                                        type: 'text'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        content: '4.0 Summary and Conditions',
                        type: 'section',
                        children: [
                            {
                                content: '4.1 Summary and Conditionssss 1',
                                type: 'text'
                            },
                        ]
                    },
                ];
            },
            50
        );


    }


    children(item: any): any[]
    {
        return isPresent(item.children) && item.children.length > 0 ? item.children : [];
    }

    ngAfterViewInit(): void
    {
    }

}

