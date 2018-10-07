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
import {Entity, Environment, isPresent, OutlineNode} from '@ngx-meta/rules';


@Component({
  templateUrl: './outline.page.component.html',
  styleUrls: ['./outline.page.component.scss']
})
export class OutlinePageComponent implements OnInit,
  AfterViewInit {
  list: any[];
  listTree: any[];

  currentItem: any;

  filterItems: string[] = ['US', 'EU', 'JP'];

  constructor(protected environment: Environment) {
  }

  ngOnInit() {
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
              }
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
              }
            ]
          }
        ];
      },
      50
    );


    this.populateTree();
  }


  children(item: any): any[] {
    return isPresent(item.children) && item.children.length > 0 ? item.children : [];
  }

  ngAfterViewInit(): void {
  }


  populateTree(): void {

    let parent1 = new MyDomainObject('1.0', 'Section 1.0');
    let parent2 = new MyDomainObject('2.0', 'Section 2.0');
    let parent3 = new MyDomainObject('3.0', 'Section 3.0');


    parent1.addChild(new MyDomainObject('1.1', 'Section 1.1'));
    parent1.addChild(new MyDomainObject('1.2', 'Section 1.2'));

    parent2.addChild(new MyDomainObject('2.1', 'Section 2.1'));
    parent2.addChild(new MyDomainObject('2.2', 'Section 2.2'));

    parent2.children[0].addChild(new MyDomainObject('2.1.1', 'Section 2.1.1'));
    parent2.children[0].addChild(new MyDomainObject('2.1.2', 'Section 2.1.2'));

    parent2.children[0].children[0].addChild(new MyDomainObject('2.1.1.1',
      'Section 2.1.1.1'));
    parent2.children[0].children[0].addChild(new MyDomainObject('2.1.1.1',
      'Section 2.1.1.1'));


    parent3.addChild(new MyDomainObject('3.1', 'Section 3.1'));
    parent3.addChild(new MyDomainObject('3.2', 'Section 3.2'));


    this.listTree = [parent1, parent2, parent3];
  }

}

export class MyDomainObject implements Entity, OutlineNode {

  // OutlineNode needed fields
  parent: MyDomainObject;
  children: MyDomainObject[] = [];
  isSelected: boolean = false;
  isExpanded: boolean = false;

  constructor(public id: string, public title: string) {

  }


  addChild(item: MyDomainObject): void {
    this.children.push(item);
    item.parent = this;
  }

  identity(): string {
    return this.id;
  }

  getTypes(): any {
    return {
      id: String,
      title: String
    };
  }

  className(): string {
    return 'MyDomainObject';
  }
}




