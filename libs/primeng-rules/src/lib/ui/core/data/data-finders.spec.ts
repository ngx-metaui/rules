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
import {inject, TestBed} from '@angular/core/testing';
import {isPresent} from '../../core/utils/lang';
import {DataFinders, FullTextArrayDataFinder, QueryType} from '../../core/data/data-finders';
import {DataProviders} from '../../core/data/data-providers';
import {MetaUIRulesModule, MetaUITestRulesModule} from '@ngx-metaui/rules';
import {PrimeNgRulesModule} from '../../../primeng-rules.module';


describe('Data Finders', () => {

  beforeEach((done) => {
    TestBed.configureTestingModule({
      imports: [
        MetaUITestRulesModule.forRoot({'i18n.enabled': false, 'env.test': true}),
        PrimeNgRulesModule.forRoot()

      ]
    });

    window.setTimeout(function() {
      done();
    }, 0);

  });

  it('should retrieve a correct finder if we work with list of values and query is string',
    inject([DataFinders, DataProviders],
      (finders: DataFinders, dataProviders: DataProviders) => {
        const cars = ['aaron', 'ben', 'baloon'];

        const dataProvider = dataProviders.find(cars);
        const dataFinder = finders.find(dataProvider, QueryType.FullText);

        expect(isPresent(dataFinder)).toBeTruthy();
        expect(dataFinder instanceof FullTextArrayDataFinder).toBeTruthy();
      }));


  it('should find correct matching element with the Finder found',
    inject([DataFinders, DataProviders],
      (finders: DataFinders, dataProviders: DataProviders) => {
        const cars = ['aaron', 'ben', 'baloon'];

        const dataProvider = dataProviders.find(cars);
        const dataFinder = finders.find(dataProvider, QueryType.FullText);

        const match = dataFinder.forData(dataProvider).instantMatch<string>('aa', 100);
        expect(match).toContain('aaron');
      }));


  it('should set DataProvider instance to the Finder during a find process',
    inject([DataFinders, DataProviders],
      (finders: DataFinders, dataProviders: DataProviders) => {
        const cars = ['aaron', 'ben', 'baloon'];

        const dataProvider = dataProviders.find(cars);
        const dataFinder = finders.find(dataProvider, QueryType.FullText);

        expect(() => dataFinder.instantMatch<string>('aa', 100)).not
          .toThrowError(/Missing DataProvider/);
      }));


  it('should throw error when DataProvider is not set ',
    inject([DataFinders, DataProviders],
      (finders: DataFinders, dataProviders: DataProviders) => {
        const dataFinder = new FullTextArrayDataFinder();

        expect(() => dataFinder.instantMatch<string>('aa', 100))
          .toThrowError(/Missing DataProvider/);
      }));


});

