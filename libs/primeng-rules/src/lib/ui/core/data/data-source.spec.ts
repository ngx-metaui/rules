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
/* tslint:disable:no-unused-variable */
import {fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {isArray, isPresent, isString} from '../../core/utils/lang';
import {AWCoreComponentModule} from '../core.module';
import {DATA_SOURCE, DataSource} from './data-source';
import {Observable} from 'rxjs';
import {DataProviders} from './data-providers';
import {DataFinder, DataFinders, FullTextArrayDataFinder, QueryType} from './data-finders';
import {DataProvider, DataTypeProviderRegistry} from './datatype-registry.service';
import {ArrayDataProvider} from './array-data-provider';
import {MetaUIRulesModule} from '@ngx-metaui/rules';
import {PrimeNgRulesModule} from '../../../primeng-rules.module';


describe('DataSource core with the', () => {

  // Simulates common cases where we just pass list of values into the component and we need to
  // wrap this list with a DataSource to work with the data unified way
  describe('case where we have plain array wrapped by DS ', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          MetaUIRulesModule.forRoot({'i18n.enabled': false, 'env.test': true}),
          PrimeNgRulesModule.forRoot()
        ],
        providers: [
          DataTypeProviderRegistry,
          DataFinders,
          {provide: DataProviders, useClass: DataProvidersMock},
          {
            provide: DATA_SOURCE, useClass: ChooserDataSourcePlainArray,
            deps: [DataProviders, DataFinders]
          }
        ]
      });

    });


    it('should inject correct instantiated DataSource',
      inject([DATA_SOURCE], (ds: ChooserDataSourcePlainArray) => {

        expect(ds).toBeDefined();
        expect(ds.dataProviders).toBeDefined();
        expect(ds.finders).toBeDefined();
      }));


    it('should fetch array of values when we initialize it',
      inject([DATA_SOURCE], (ds: ChooserDataSourcePlainArray) => {
        ds.init(['aa', 'bb']);

        const instant: string[] = ds.instant<string>();
        expect(instant).toBeDefined();
        expect(instant.length).toBe(2);


      }));


    it('should fetch array of values when we subscribe to change stream ',
      inject([DATA_SOURCE], fakeAsync((ds: ChooserDataSourcePlainArray) => {
        ds.init(['aa', 'bb']);

        let initializedData = [];
        ds.open<string>().subscribe((data: string[]) => {
          initializedData = data;
        });
        tick();
        expect(initializedData.length).toBe(2);

      })));


    it('should broadcast change when data are modified ',
      inject([DATA_SOURCE], fakeAsync((ds: ChooserDataSourcePlainArray) => {
        ds.init(['aa', 'bb']);

        let initializedData = [];
        ds.open<string>().subscribe((data: string[]) => {
          initializedData = data;
        });
        tick();

        ds.addNewItem();
        tick();

        expect(initializedData.length).toBe(3);

      })));
  });


  // In this case component just get information that we are dealing with type e.g. Invoice and
  // DS should be able to read data using Injected Providers
  describe('case where DS reads data from registered DataProvider ', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          MetaUIRulesModule.forRoot({'i18n.enabled': false, 'env.test': true}),
          PrimeNgRulesModule.forRoot(),
          AWCoreComponentModule
        ],
        providers: [
          {
            provide: DATA_SOURCE, useClass: ChooserDataSourcePlain,
            deps: [DataProviders, DataFinders]
          }
        ]
      });

    });


    it('should fetch instant data after DS is initialized with a Type',
      inject([DATA_SOURCE, DataProviders],
        (ds: ChooserDataSourcePlain, dp: DataProviders) => {
          dp.register(Car, new ArrayDataProvider([
            new Car('a'), new Car('b'),
            new Car('c')
          ]));
          ds.init(Car);

          const cars = ds.instant<Car>();

          expect(cars).toBeDefined();
          expect(cars.length).toBe(3);
        }));


    it('should fetch instant data after DS is initialized with a type name',
      inject([DATA_SOURCE, DataProviders],
        (ds: ChooserDataSourcePlain, dp: DataProviders) => {
          dp.register(Car, new ArrayDataProvider([
            new Car('a'), new Car('b'),
            new Car('c')
          ]));
          ds.init('Car');

          const cars = ds.instant<Car>();

          expect(cars).toBeDefined();
          expect(cars.length).toBe(3);
        }));


    it('should fetch data when we subscribe to change stream ',
      inject([DATA_SOURCE, DataProviders],
        fakeAsync((ds: ChooserDataSourcePlain, dp: DataProviders) => {
          dp.register(Car, new ArrayDataProvider([
            new Car('a'), new Car('b'),
            new Car('c')
          ]));
          ds.init(Car);

          let initializedData: Car[] = [];
          ds.open<Car>().subscribe((data: Car[]) => {
            initializedData = data;
          });

          tick();
          expect(initializedData).toBeDefined();
          expect(initializedData.length).toBe(3);
        })));


    it('should broadcast the change when data are modified ',
      inject([DATA_SOURCE, DataProviders],
        fakeAsync((ds: ChooserDataSourcePlain, dp: DataProviders) => {
          dp.register(Car, new ArrayDataProvider([
            new Car('a'), new Car('b'),
            new Car('c')
          ]));
          ds.init(Car);

          let initializedData: Car[] = [];
          ds.open<Car>().subscribe((data: Car[]) => {
            initializedData = data;
          });


          ds.addNewItem();
          tick();
          expect(initializedData).toBeDefined();
          expect(initializedData.length).toBe(4);
        })));

  });


  describe('case where DS is using DataFinder', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          MetaUIRulesModule.forRoot({'i18n.enabled': false, 'env.test': true}),
          PrimeNgRulesModule.forRoot(),
          AWCoreComponentModule
        ],
        providers: [
          {
            provide: DATA_SOURCE, useClass: ChooserDataSourcePlainArrayWithFinder,
            deps: [DataProviders, DataFinders]
          }
        ]
      });

    });


    it('should have correct DataFinder set after we call init which depends on type of ' +
      'data and QueryType',
      inject([DATA_SOURCE], (ds: ChooserDataSourcePlainArrayWithFinder) => {
        ds.init(['aa', 'bb'], QueryType.FullText);

        expect(ds.dataFinder instanceof FullTextArrayDataFinder);

      }));


    it('should find all records with "aa" when using instant find',
      inject([DATA_SOURCE], (ds: ChooserDataSourcePlainArrayWithFinder) => {
        ds.init(['aaa', 'bbaa', 'bb'], QueryType.FullText);

        const results = ds.instantFindBy('aa');
        expect(results.length).toBe(2);

      }));


    it('should find all records with "aa" when using async find',
      inject([DATA_SOURCE], (ds: ChooserDataSourcePlainArrayWithFinder) => {
        ds.init(['aaa', 'bbaa', 'bb'], QueryType.FullText);

        let results = [];
        ds.findBy('aa').subscribe((res: string[]) => results = res);

        expect(results.length).toBe(2);

      }));


  });


});


class ChooserDataSourcePlainArray extends DataSource {

  dataProvider: DataProvider<any>;

  constructor(public dataProviders: DataProviders, public finders: DataFinders) {
    super(dataProviders, finders);

  }

  init(...args: any[]): void {
    // lookup DataProvider and DataFinder based on the type or value
    if (isPresent(args) && args.length === 1) {
      this.dataProvider = this.dataProviders.find(args[0]);
    }
  }


  open<T>(): Observable<T[]> {
    return this.dataProvider.dataChanges.asObservable();
  }


  addNewItem(): void {
    const copy = this.instant().slice();
    copy.push('zz');
    this.dataProvider.dataChanges.next(copy);

  }

  close(): void {
    this.dataProvider.dataChanges.unsubscribe();
  }

  instant<T>(): T[] {
    return this.dataProvider.data();
  }
}


class ChooserDataSourcePlain extends DataSource {

  dataProvider: DataProvider<any>;

  constructor(public dataProviders: DataProviders, public finders: DataFinders) {
    super(dataProviders, finders);

  }

  /**
   * Let's say we expect that 1st argument for this DataSource is a type name
   *
   */
  init(...args: any[]): void {
    if (isPresent(args) && args.length === 1) {
      this.dataProvider = this.dataProviders.find(args[0]);
    }
  }


  open<T>(): Observable<T[]> {
    return this.dataProvider.dataChanges.asObservable();
  }

  close(): void {
    this.dataProvider.dataChanges.unsubscribe();
  }

  instant<T>(): T[] {
    return this.dataProvider.data();
  }


  addNewItem(): void {
    const copy = this.instant().slice();
    copy.push(new Car('aaaa'));
    this.dataProvider.dataChanges.next(copy);

  }
}


class ChooserDataSourcePlainArrayWithFinder extends DataSource {

  dataProvider: DataProvider<any>;
  dataFinder: DataFinder;

  constructor(public dataProviders: DataProviders, public finders: DataFinders) {
    super(dataProviders, finders);

  }

  init(...args: any[]): void {
    // lookup DataProvider and DataFinder based on the type or value
    if (isPresent(args) && args.length === 2) {
      this.dataProvider = this.dataProviders.find(args[0]);
      this.dataFinder = this.finders.find(this.dataProvider, args[1]);
      // has query key ?
    } else if (isPresent(args) && args.length === 3) {
      this.dataProvider = this.dataProviders.find(args[0]);
      this.dataFinder = this.finders.find(this.dataProvider, args[1]);

      // this data source expect lookup key
      this.dataFinder.lookupKey = args[2];
    }
  }


  open<T>(): Observable<T[]> {
    return this.dataProvider.dataChanges.asObservable();
  }


  addNewItem(): void {
    const copy = this.instant().slice();
    copy.push('zz');
    this.dataProvider.dataChanges.next(copy);

  }

  close(): void {
    this.dataProvider.dataChanges.unsubscribe();
  }

  instant<T>(): T[] {
    return this.dataProvider.data();
  }

  instantFindBy(pattern: string): string[] {
    return this.dataFinder.instantMatch<string>(pattern, 10);
  }


  findBy(pattern: string): Observable<string[]> {
    return this.dataFinder.match<string>(pattern, 10);
  }

}

class Car {

  constructor(name: string) {
  }
}


export class DataProvidersMock {

  registry: DataTypeProviderRegistry;

  constructor() {
    this.registry = new DataTypeProviderRegistry();
  }

  /**
   * Finds the best matching  DataProvider or create new one in case of Array
   * More room to register and instantiate some other implicit Providers
   */
  find(target: any): DataProvider<any> {
    if (isArray(target)) {
      return new ArrayDataProvider(target);
    } else if (isString(target)) {
      return this.registry.bestMatchForClass(target);
    }

    return this.registry.bestMatchForType(target);
  }


  /**
   * Registers new provider within DataTypeProviderRegistry
   *
   */
  register<T>(target: any, provider: DataProvider<T>): void {
    this.registry.registerProvider(target, provider);
  }

}
