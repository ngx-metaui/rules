/**
 *
 * @license
 * Copyright 2017 SAP Ariba
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import {Component} from '@angular/core';
import {
  ArrayDataProvider,
  BaseComponent,
  Datatable2State,
  DT2DataSource,
  DTColumn2Component,
  Entity,
  Environment,
  FullTextArrayDataFinder,
  isBlank,
  isPresent,
  OutlineNode,
  QueryType
} from '@ngx-metaui/rules';


@Component({
  templateUrl: './datatable.page.component.html',
  styleUrls: ['./datatable.page.component.scss']
})
export class DatatablePageComponent extends BaseComponent {
  loading: boolean = true;
  dataset: Item[];
  dataset2: Item[];
  data: Item[];
  dynData: Item[];


  dataTree: MySourcingEvent[];

  dtState: Datatable2State = new Datatable2State();

  dataSource: DT2DataSource;

  constructor(public env: Environment) {
    super(env);
  }


  ngOnInit() {
    super.ngOnInit();
    let myState = window.localStorage.getItem('dtState');
    this.dataset = data;
    this.dataset2 = this.createDynData();


    setTimeout(() => {
      this.data = this.dataset.filter((item: Item) => isBlank(item.parent));
      this.dynData = this.dataset2.filter((item: Item) => isBlank(item.parent));
      this.loading = false;
    }, 200);


    this.populateTree();


    let dataProvider = new ArrayDataProvider(this.dataset
      .filter((item: Item) => isBlank(item.parent)));

    this.dataSource = new DT2DataSource();
    this.dataSource.init({
      dataProvider: dataProvider,
      dataFinder: new FullTextArrayDataFinder().forData(dataProvider),
      queryType: QueryType.FullText,
      multiselect: false
    });


    // Example reading a state adn converting it to the Datatable2State
    if (isPresent(myState)) {
      this.dtState = Datatable2State.fromJSON(myState);

    } else {
      this.dtState.currentSearchQuery = 'con';
    }
  }

  ngDoCheck(): void {
    window.localStorage.setItem('dtState', Datatable2State.toJSON(this.dtState));
  }


  private lookupChildren(item: Item): Item[] {
    return this.dataset.filter((val: Item) => {
      return val.parent === item.itemDescr;
    });
  }

  private lookupChildren2(item: Item): Item[] {
    return this.dataset2.filter((val: Item) => {
      return val.parent === item.itemDescr;
    });
  }


  isRowSelectable(item: any): boolean {
    // ignore root section that has no parent
    return (item.type === 'section' && isPresent(item.parent)) || item.type === 'item';
  }

  calculatedClass(col: DTColumn2Component, item: Item): string {
    if (isBlank(item)) {
      return '';
    }

    if (item.type === 'term') {
      return 'app-dt-item-term';

    } else if (item.type === 'section') {
      return 'app-dt-item-section ';

    } else if (item.type === 'item') {
      if (col.selectable && item.valBySupplier[col.label || col.key] &&
        item.valBySupplier[col.label || col.key].indexOf('350') !== -1) {
        return 'app-dt-item-item dt-is-highlight';
      }

      return 'app-dt-item-item ';
    }

    return '';
  }

  children(item: any): any[] {
    switch (item.type) {
      case 'section':
        let items = this.lookupChildren(item);
        return items;

      case 'item':
        let terms = item.terms;
        return terms;

    }
    return [];
  }

  children2(item: any): any[] {
    switch (item.type) {
      case 'section':
        let items = this.lookupChildren2(item);
        return items;

      case 'item':
        let terms = item.terms;
        return terms;

    }
    return [];
  }


  canRenderForType(col: DTColumn2Component, item: any): boolean {
    return item.type === 'item';
  }


  onRowSelected(selection: any): void {
    console.log('table selection:', selection);
  }


  createDynData(): Item[] {
    let dyn: Item[] = [];

    for (let i = 1; i < 100; i++) {

      let sectionSet = [
        {
          itemDescr: i + '.0 Items',
          type: 'section',
          valBySupplier: {
            'AJ Parts': '',
            'Blue Deck Solution': '',
            'LRK Parts and server': ''
          },
          identity: function () {
            return this.itemDescr;
          }

        },
        {
          itemDescr: 'Items - 13.' + i,
          type: 'section',
          qty: 'Qty',
          parent: i + '.0 Items',
          valBySupplier: {
            'AJ Parts': '$17,170,10.00.00',
            'Blue Deck Solution': '$17,20,10.00.00',
            'LRK Parts and server': '$17,32,10.00.00'
          },
          identity: function () {
            return this.itemDescr;
          }

        },
        {
          itemDescr: i + '.1 Misc. Reimbursable (ex.)',
          type: 'item',
          parent: 'Items - 13.' + i,
          qty: '3',
          valBySupplier: {
            'AJ Parts': '$322.00/ea',
            'Blue Deck Solution': '$350.00/ea',
            'LRK Parts and server': '$211.00/ea'
          },
          identity: function () {
            return this.itemDescr;
          },
          terms: [
            {
              type: 'term',
              itemDescr: 'Historic price',
              valBySupplier: {
                'AJ Parts': '1%',
                'Blue Deck Solution': '1.1%',
                'LRK Parts and server': '1%'
              }
            },
            {
              type: 'term',
              itemDescr: 'Extended Price',
              valBySupplier: {
                'AJ Parts': '1%',
                'Blue Deck Solution': '1.1%',
                'LRK Parts and server': '1%'
              }
            },
            {
              type: 'term',
              itemDescr: 'Type of hotel',
              valBySupplier: {
                'AJ Parts': '3 star',
                'Blue Deck Solution': 'Only Hilton',
                'LRK Parts and server': 'Motels are ok'
              }
            }
          ]
        },
        {
          itemDescr: i + '.2 Misc. Reimbursable (ex.)',
          type: 'item',
          parent: 'Items - 13.' + i,
          qty: '1',
          valBySupplier: {
            'AJ Parts': '$350.00/ea',
            'Blue Deck Solution': '$359.00/ea',
            'LRK Parts and server': '$350.00/ea'
          },
          identity: function () {
            return this.itemDescr;
          },
          terms: [
            {
              itemDescr: 'Historic price',
              type: 'term',
              valBySupplier: {
                'AJ Parts': '1%',
                'Blue Deck Solution': '1.1%',
                'LRK Parts and server': '1%'
              }
            },
            {
              itemDescr: 'Extended Price',
              type: 'term',
              valBySupplier: {
                'AJ Parts': '1%',
                'Blue Deck Solution': '1.1%',
                'LRK Parts and server': '1%'
              }
            },
            {
              itemDescr: 'Type of hotel',
              type: 'term',
              valBySupplier: {
                'AJ Parts': '3 star',
                'Blue Deck Solution': 'Only Hilton',
                'LRK Parts and server': 'Motels are ok'
              }
            }
          ]
        },
        {
          itemDescr: i + '.3 Misc. Reimbursable (ex.)',
          type: 'item',
          qty: '2',
          parent: 'Items - 13.' + i,
          valBySupplier: {
            'AJ Parts': '$350.00/ea',
            'Blue Deck Solution': '$359.00/ea',
            'LRK Parts and server': '$350.00/ea'
          },
          identity: function () {
            return this.itemDescr;
          },
          terms: [
            {
              itemDescr: 'Historic price',
              type: 'term',
              valBySupplier: {
                'AJ Parts': '1%',
                'Blue Deck Solution': '1.1%',
                'LRK Parts and server': '1%'
              }
            },
            {
              itemDescr: 'Extended Price',
              type: 'term',
              valBySupplier: {
                'AJ Parts': '1%',
                'Blue Deck Solution': '1.1%',
                'LRK Parts and server': '1%'
              }
            },
            {
              itemDescr: 'Type of hotel',
              type: 'term',
              valBySupplier: {
                'AJ Parts': '3 star',
                'Blue Deck Solution': 'Only Hilton',
                'LRK Parts and server': 'Motels are ok'
              }
            }
          ]

        },
        {
          itemDescr: i + '.4 Misc. Reimbursable (ex.)',
          type: 'item',
          parent: 'Items - 13.' + i,
          qty: '3',
          valBySupplier: {
            'AJ Parts': '$50.00/ea',
            'Blue Deck Solution': '$39.00/ea',
            'LRK Parts and server': '$150.00/ea'
          },
          identity: function () {
            return this.itemDescr;
          },
          terms: [
            {
              itemDescr: 'Historic price',
              type: 'term',
              valBySupplier: {
                'AJ Parts': '1%',
                'Blue Deck Solution': '1.1%',
                'LRK Parts and server': '1%'
              }
            },
            {
              itemDescr: 'Extended Price',
              type: 'term',
              valBySupplier: {
                'AJ Parts': '1%',
                'Blue Deck Solution': '1.1%',
                'LRK Parts and server': '1%'
              }
            },
            {
              itemDescr: 'Type of hotel',
              type: 'term',
              valBySupplier: {
                'AJ Parts': '3 star',
                'Blue Deck Solution': 'Only Hilton',
                'LRK Parts and server': 'Motels are ok'
              }
            }
          ]
        }
      ];

      dyn.push(...sectionSet);
    }

    return dyn;
  }


  populateTree(): void {

    let parent1 = new MySourcingEvent('1.0 Introduction', 'section');
    let parent2 = new MySourcingEvent('2.0 General Construction', 'section');


    parent1.addChild(new MySourcingEvent('Items - 13', 'section', 'Qty'))
      .withValues('$17,170,10.00.00', '$17,20,10.00.00', '$17,32,10.00.00');

    parent1.addChild(new MySourcingEvent('Items - 18', 'section', 'Qty'))
      .withValues('$17,170,10.11.00', '$17,90,10.00.00', '$14,32,10.00.00');


    parent2.addChild(new MySourcingEvent('Items - 14', 'section', 'Qty'))
      .withValues('$18,7423.00', '$17,7423.00', '$17,7421.00');


    let item1 = new MySourcingEvent('1.1 Misc. Reimbursable (car)', 'item', '3')
      .withValues('$322.00/ea', '$350.00/ea', '' + '$211.00/ea')
      .withTerms('Historic price', '1%', '1.1%', '1%')
      .withTerms('Extended Price', '1.8%', '1.2%', '1%')
      .withTerms('Type of hotel', '2 star', 'Only Hilton',
        'Motels are ok');

    parent1.children[0].addChild(item1);

    let item2 = new MySourcingEvent('1.2 Misc. Reimbursable (tires)', 'item', '1')
      .withValues('$350.00/ea', '$359.00/ea', '' + '$350.00/ea')
      .withTerms('Historic price', '1%', '1.1%', '1%')
      .withTerms('Extended Price', '1%', '1.1%', '1%')
      .withTerms('Type of hotel', '3 star', 'Only Hilton',
        'Motels are ok');

    parent1.children[0].addChild(item2);


    let item3 = new MySourcingEvent('1.3 Misc. Reimbursable (wheel)', 'item', '1')
      .withValues('$350.00/ea', '$359.00/ea', '' + '$350.00/ea')
      .withTerms('Historic price', '1%', '1.1%', '1%')
      .withTerms('Extended Price', '1%', '1.1%', '1%')
      .withTerms('Type of hotel', '3 star', 'Only Hilton',
        'Motels are ok');

    parent1.children[0].addChild(item3);

    let item4 = new MySourcingEvent('1.4 Misc. Reimbursable (wheel)', 'item', '1')
      .withValues('$370.00/ea', '$159.00/ea', '' + '$350.00/ea')
      .withTerms('Historic price', '2%', '1.1%', '1%')
      .withTerms('Extended Price', '1%', '1.1%', '1%')
      .withTerms('Type of hotel', '1 star', 'Only Hilton',
        'Motels are ok');

    parent1.children[0].addChild(item4);


    item1 = new MySourcingEvent('1.5 Misc. Reimbursable (window)', 'item', '3')
      .withValues('$322.00/ea', '$350.00/ea', '' + '$211.00/ea')
      .withTerms('Historic price', '1%', '1.1%', '1%')
      .withTerms('Extended Price', '1.8%', '1.2%', '1%')
      .withTerms('Type of hotel', '2 star', 'Only Marriot',
        'Motels are ok');

    parent1.children[1].addChild(item1);

    item2 = new MySourcingEvent('1.6 Misc. Reimbursable (ex.)', 'item', '1')
      .withValues('$350.00/ea', '$359.00/ea', '' + '$350.00/ea')
      .withTerms('Historic price', '1%', '1.1%', '1%')
      .withTerms('Extended Price', '1%', '1.1%', '1%')
      .withTerms('Type of hotel', '3 star', 'Only Hilton',
        'Motels are ok');

    parent1.children[1].addChild(item2);


    item3 = new MySourcingEvent('1.7 Misc. Reimbursable (ex.)', 'item', '1')
      .withValues('$350.00/ea', '$359.00/ea', '' + '$350.00/ea')
      .withTerms('Historic price', '1%', '1.1%', '1%')
      .withTerms('Extended Price', '1%', '1.1%', '1%')
      .withTerms('Type of hotel', '3 star', 'Only Hilton',
        'Motels are ok');

    parent1.children[1].addChild(item3);

    item4 = new MySourcingEvent('1.8 Misc. Summary', 'item', '1')
      .withValues('$370.00/ea', '$159.00/ea', '' + '$350.00/ea')
      .withTerms('Historic price', '2%', '1.1%', '1%')
      .withTerms('Extended Price', '1%', '1.1%', '1%')
      .withTerms('Type of hotel', '1 star', 'Only Hilton',
        'Motels are ok');

    parent1.children[1].addChild(item4);

    // parent 2
    let item21 = new MySourcingEvent('1.1 Misc. Reimbursable (belt)', 'item', '3')
      .withValues('$322.00/ea', '$350.00/ea', '' + '$211.00/ea')
      .withTerms('Historic price', '1%', '1.1%', '1%')
      .withTerms('Extended Price', '1.8%', '1.2%', '1%')
      .withTerms('Type of hotel', '2 star', 'Only Hilton',
        'Motels are ok');

    parent2.children[0].addChild(item21);

    let item22 = new MySourcingEvent('1.2 Misc. Reimbursable (window)', 'item', '1')
      .withValues('$350.00/ea', '$359.00/ea', '' + '$350.00/ea')
      .withTerms('Historic price', '1%', '1.1%', '1%')
      .withTerms('Extended Price', '1%', '1.1%', '1%')
      .withTerms('Type of hotel', '3 star', 'Only Hilton',
        'Motels are ok');

    parent2.children[0].addChild(item22);


    let item23 = new MySourcingEvent('1.3 Misc. Reimbursable (seats)', 'item', '1')
      .withValues('$350.00/ea', '$359.00/ea', '' + '$350.00/ea')
      .withTerms('Historic price', '1%', '1.1%', '1%')
      .withTerms('Extended Price', '1%', '1.1%', '1%')
      .withTerms('Type of hotel', '3 star', 'Only Hilton',
        'Motels are ok');

    parent2.children[0].addChild(item23);


    this.dataTree = [parent1, parent2];
  }


}


export class MySourcingEvent implements Entity, OutlineNode {


  // OutlineNode properties
  isExpanded: boolean = false;
  parent: MySourcingEvent;
  children: MySourcingEvent[] = [];
  isSelected: boolean = false;

  // specific to this object
  valBySupplier: any;

  constructor(public title: string, public type: string, public qty?: string) {
    this.valBySupplier = {
      'AJ Parts': '',
      'Blue Deck Solution': '',
      'LRK Parts and server': ''
    };


  }

  withValues(ajp: string, bluedesk: string, lrk: string): MySourcingEvent {
    this.valBySupplier['AJ Parts'] = ajp;
    this.valBySupplier['Blue Deck Solution'] = bluedesk;
    this.valBySupplier['LRK Parts and server'] = lrk;

    return this;
  }


  withTerms(name: string, ajp: string, bluedesk: string, lrk: string): MySourcingEvent {

    let mySourcingEvent = new MySourcingEvent(name, 'term')
      .withValues(ajp, bluedesk, lrk);
    this.addChild(mySourcingEvent);

    return this;
  }


  addChild(item: MySourcingEvent): MySourcingEvent {
    this.children.push(item);
    item.parent = this;
    return this;
  }

  identity(): string {
    return this.title;
  }

  getTypes(): any {
    return {
      id: String,
      title: String
    };
  }

  className(): string {
    return 'MySourcingEvent';
  }
}


interface Item {
  itemDescr: string;
  type: string; // Section, Item, Term
  qty?: string;
  parent?: string;
  valBySupplier?: { [name: string]: any };
  terms?: Term[];

  identity?(): string;
}


interface Term extends Item {
  someTerm?: any;
}


export interface Supplier {
  name: string;
  isPreferred: boolean;
}


export interface Car {
  vin?: any;
  year?: any;
  brand?: any;
  color?: any;
  price?: any;
  saleDate?: any;
  children?: any[];


}

// simulate Entity so it implements identity() method for better indexing inside maps
const data = [
  {
    itemDescr: '1.0 Items',
    type: 'section',
    valBySupplier: {
      'AJ Parts': '',
      'Blue Deck Solution': '',
      'LRK Parts and server': ''
    },
    identity: function () {
      return this.itemDescr;
    }

  },
  {
    itemDescr: 'Items - 13',
    type: 'section',
    qty: 'Qty',
    parent: '1.0 Items',
    valBySupplier: {
      'AJ Parts': '$17,170,10.00.00',
      'Blue Deck Solution': '$17,20,10.00.00',
      'LRK Parts and server': '$17,32,10.00.00'
    },
    identity: function () {
      return this.itemDescr;
    }

  },
  {
    itemDescr: '1.1 Misc. Reimbursable (ex.)',
    type: 'item',
    parent: 'Items - 13',
    qty: '3',
    valBySupplier: {
      'AJ Parts': '$322.00/ea',
      'Blue Deck Solution': '$350.00/ea',
      'LRK Parts and server': '$211.00/ea'
    },
    identity: function () {
      return this.itemDescr;
    },
    terms: [
      {
        type: 'term',
        itemDescr: 'Historic price',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        type: 'term',
        itemDescr: 'Extended Price',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        type: 'term',
        itemDescr: 'Type of hotel',
        valBySupplier: {
          'AJ Parts': '3 star',
          'Blue Deck Solution': 'Only Hilton',
          'LRK Parts and server': 'Motels are ok'
        }
      }
    ]
  },
  {
    itemDescr: '1.2 Misc. Reimbursable (ex.)',
    type: 'item',
    parent: 'Items - 13',
    qty: '1',
    valBySupplier: {
      'AJ Parts': '$350.00/ea',
      'Blue Deck Solution': '$359.00/ea',
      'LRK Parts and server': '$350.00/ea'
    },
    identity: function () {
      return this.itemDescr;
    },
    terms: [
      {
        itemDescr: 'Historic price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Extended Price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Type of hotel',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '3 star',
          'Blue Deck Solution': 'Only Hilton',
          'LRK Parts and server': 'Motels are ok'
        }
      }
    ]
  },
  {
    itemDescr: '1.3 Misc. Reimbursable (ex.)',
    type: 'item',
    qty: '2',
    parent: 'Items - 13',
    valBySupplier: {
      'AJ Parts': '$350.00/ea',
      'Blue Deck Solution': '$359.00/ea',
      'LRK Parts and server': '$350.00/ea'
    },
    identity: function () {
      return this.itemDescr;
    },
    terms: [
      {
        itemDescr: 'Historic price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Extended Price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Type of hotel',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '3 star',
          'Blue Deck Solution': 'Only Hilton',
          'LRK Parts and server': 'Motels are ok'
        }
      }
    ]

  },
  {
    itemDescr: '1.4 Misc. Reimbursable (ex.)',
    type: 'item',
    parent: 'Items - 13',
    qty: '3',
    valBySupplier: {
      'AJ Parts': '$50.00/ea',
      'Blue Deck Solution': '$39.00/ea',
      'LRK Parts and server': '$150.00/ea'
    },
    identity: function () {
      return this.itemDescr;
    },
    terms: [
      {
        itemDescr: 'Historic price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Extended Price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Type of hotel',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '3 star',
          'Blue Deck Solution': 'Only Hilton',
          'LRK Parts and server': 'Motels are ok'
        }
      }
    ]
  },

  {
    itemDescr: 'Items - 18',
    type: 'section',
    qty: 'Qty',
    parent: '1.0 Items',
    valBySupplier: {
      'AJ Parts': '$17,170,10.00.00',
      'Blue Deck Solution': '$17,20,10.00.00',
      'LRK Parts and server': '$17,32,10.00.00'
    },
    identity: function () {
      return this.itemDescr;
    }
  },
  {
    itemDescr: '1.5 Misc. Reimbursable (ex.)',
    type: 'item',
    parent: 'Items - 18',
    qty: '3',
    valBySupplier: {
      'AJ Parts': '$322.00/ea',
      'Blue Deck Solution': '$350.00/ea',
      'LRK Parts and server': '$211.00/ea'
    },
    identity: function () {
      return this.itemDescr;
    },
    terms: [
      {
        type: 'term',
        itemDescr: 'Historic price',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        type: 'term',
        itemDescr: 'Extended Price',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        type: 'term',
        itemDescr: 'Type of hotel',
        valBySupplier: {
          'AJ Parts': '3 star',
          'Blue Deck Solution': 'Only Hilton',
          'LRK Parts and server': 'Motels are ok'
        }
      }
    ]
  },
  {
    itemDescr: '1.6 Misc. Reimbursable (ex.)',
    type: 'item',
    parent: 'Items - 18',
    qty: '1',
    valBySupplier: {
      'AJ Parts': '$350.00/ea',
      'Blue Deck Solution': '$359.00/ea',
      'LRK Parts and server': '$350.00/ea'
    },
    identity: function () {
      return this.itemDescr;
    },
    terms: [
      {
        itemDescr: 'Historic price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Extended Price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Type of hotel',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '3 star',
          'Blue Deck Solution': 'Only Hilton',
          'LRK Parts and server': 'Motels are ok'
        }
      }
    ]
  },
  {
    itemDescr: '1.7 Misc. Reimbursable (ex.)',
    type: 'item',
    qty: '2',
    parent: 'Items - 18',
    valBySupplier: {
      'AJ Parts': '$350.00/ea',
      'Blue Deck Solution': '$359.00/ea',
      'LRK Parts and server': '$350.00/ea'
    },
    identity: function () {
      return this.itemDescr;
    },
    terms: [
      {
        itemDescr: 'Historic price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Extended Price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Type of hotel',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '3 star',
          'Blue Deck Solution': 'Only Hilton',
          'LRK Parts and server': 'Motels are ok'
        }
      }
    ]

  },
  {
    itemDescr: '1.8 Misc. Reimbursable (ex.)',
    type: 'item',
    parent: 'Items - 18',
    qty: '3',
    valBySupplier: {
      'AJ Parts': '$50.00/ea',
      'Blue Deck Solution': '$39.00/ea',
      'LRK Parts and server': '$150.00/ea'
    },
    identity: function () {
      return this.itemDescr;
    },
    terms: [
      {
        itemDescr: 'Historic price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Extended Price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Type of hotel',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '3 star',
          'Blue Deck Solution': 'Only Hilton',
          'LRK Parts and server': 'Motels are ok'
        }
      }
    ]
  },

  {
    itemDescr: '2.0 General Construction',
    type: 'section',
    valBySupplier: {
      'AJ Parts': '',
      'Blue Deck Solution': '',
      'LRK Parts and server': ''
    },
    identity: function () {
      return this.itemDescr;
    }
  },
  {
    itemDescr: 'Items - 14',
    type: 'section',
    qty: 'Qty',
    parent: '2.0 General Construction',
    valBySupplier: {
      'AJ Parts': '$18,7423.00',
      'Blue Deck Solution': '$17,7423.00',
      'LRK Parts and server': '$17,7421.00'
    }
  },
  {
    itemDescr: '2.1 Misc. Reimbursable (ex.)',
    type: 'item',
    qty: '3',
    parent: 'Items - 14',
    valBySupplier: {
      'AJ Parts': '$322.00/ea',
      'Blue Deck Solution': '$350.00/ea',
      'LRK Parts and server': '$211.00/ea'
    },
    identity: function () {
      return this.itemDescr;
    },
    terms: [
      {
        itemDescr: 'Historic price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Extended Price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Type of hotel',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '3 star',
          'Blue Deck Solution': 'Only Hilton',
          'LRK Parts and server': 'Motels are ok'
        }
      }
    ]
  },
  {
    itemDescr: '2.2 Misc. Reimbursable (ex.)',
    type: 'item',
    parent: 'Items - 14',
    qty: '4',
    valBySupplier: {
      'AJ Parts': '$350.00/ea',
      'Blue Deck Solution': '$359.00/ea',
      'LRK Parts and server': '$350.00/ea'
    },
    identity: function () {
      return this.itemDescr;
    },
    terms: [
      {
        type: 'term',
        itemDescr: 'Historic price',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        type: 'term',
        itemDescr: 'Extended Price',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        type: 'term',
        itemDescr: 'Type of hotel',
        valBySupplier: {
          'AJ Parts': '3 star',
          'Blue Deck Solution': 'Only Hilton',
          'LRK Parts and server': 'Motels are ok'
        }
      }
    ]
  },
  {
    itemDescr: '2.3 Misc. Reimbursable (ex.)',
    type: 'item',
    qty: '13',
    parent: 'Items - 14',
    valBySupplier: {
      'AJ Parts': '$350.00/ea',
      'Blue Deck Solution': '$359.00/ea',
      'LRK Parts and server': '$350.00/ea'
    },
    identity: function () {
      return this.itemDescr;
    },
    terms: [
      {
        type: 'term',
        itemDescr: 'Historic price',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        type: 'term',
        itemDescr: 'Extended Price',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        type: 'term',
        itemDescr: 'Type of hotel',
        valBySupplier: {
          'AJ Parts': '3 star',
          'Blue Deck Solution': 'Only Hilton',
          'LRK Parts and server': 'Motels are ok'
        }
      }
    ]
  }

];


const Dyn = [
  {
    itemDescr: '1.0 Items',
    type: 'section',
    valBySupplier: {
      'AJ Parts': '',
      'Blue Deck Solution': '',
      'LRK Parts and server': ''
    },
    identity: function () {
      return this.itemDescr;
    }

  },
  {
    itemDescr: 'Items - 13',
    type: 'section',
    qty: 'Qty',
    parent: '1.0 Items',
    valBySupplier: {
      'AJ Parts': '$17,170,10.00.00',
      'Blue Deck Solution': '$17,20,10.00.00',
      'LRK Parts and server': '$17,32,10.00.00'
    },
    identity: function () {
      return this.itemDescr;
    }

  },
  {
    itemDescr: '1.1 Misc. Reimbursable (ex.)',
    type: 'item',
    parent: 'Items - 13',
    qty: '3',
    valBySupplier: {
      'AJ Parts': '$322.00/ea',
      'Blue Deck Solution': '$350.00/ea',
      'LRK Parts and server': '$211.00/ea'
    },
    identity: function () {
      return this.itemDescr;
    },
    terms: [
      {
        type: 'term',
        itemDescr: 'Historic price',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        type: 'term',
        itemDescr: 'Extended Price',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        type: 'term',
        itemDescr: 'Type of hotel',
        valBySupplier: {
          'AJ Parts': '3 star',
          'Blue Deck Solution': 'Only Hilton',
          'LRK Parts and server': 'Motels are ok'
        }
      }
    ]
  },
  {
    itemDescr: '1.2 Misc. Reimbursable (ex.)',
    type: 'item',
    parent: 'Items - 13',
    qty: '1',
    valBySupplier: {
      'AJ Parts': '$350.00/ea',
      'Blue Deck Solution': '$359.00/ea',
      'LRK Parts and server': '$350.00/ea'
    },
    identity: function () {
      return this.itemDescr;
    },
    terms: [
      {
        itemDescr: 'Historic price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Extended Price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Type of hotel',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '3 star',
          'Blue Deck Solution': 'Only Hilton',
          'LRK Parts and server': 'Motels are ok'
        }
      }
    ]
  },
  {
    itemDescr: '1.3 Misc. Reimbursable (ex.)',
    type: 'item',
    qty: '2',
    parent: 'Items - 13',
    valBySupplier: {
      'AJ Parts': '$350.00/ea',
      'Blue Deck Solution': '$359.00/ea',
      'LRK Parts and server': '$350.00/ea'
    },
    identity: function () {
      return this.itemDescr;
    },
    terms: [
      {
        itemDescr: 'Historic price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Extended Price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Type of hotel',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '3 star',
          'Blue Deck Solution': 'Only Hilton',
          'LRK Parts and server': 'Motels are ok'
        }
      }
    ]

  },
  {
    itemDescr: '1.4 Misc. Reimbursable (ex.)',
    type: 'item',
    parent: 'Items - 13',
    qty: '3',
    valBySupplier: {
      'AJ Parts': '$50.00/ea',
      'Blue Deck Solution': '$39.00/ea',
      'LRK Parts and server': '$150.00/ea'
    },
    identity: function () {
      return this.itemDescr;
    },
    terms: [
      {
        itemDescr: 'Historic price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Extended Price',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '1%',
          'Blue Deck Solution': '1.1%',
          'LRK Parts and server': '1%'
        }
      },
      {
        itemDescr: 'Type of hotel',
        type: 'term',
        valBySupplier: {
          'AJ Parts': '3 star',
          'Blue Deck Solution': 'Only Hilton',
          'LRK Parts and server': 'Motels are ok'
        }
      }
    ]
  }
];




