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
import {AribaCoreModule} from '../../../core/ariba.core.module';
import {isPresent} from '../../../core/utils/lang';
import {AWCoreComponentModule} from '../../core/core.module';
import {DataFinders, FullTextArrayDataFinder, QueryType} from '../../core/data/data-finders';
import {DataProviders} from '../../core/data/data-providers';
import {AribaComponentsTestProviderModule} from '../../ariba.component.provider.module';


describe('Data Finders', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
        AribaComponentsTestProviderModule.forRoot(),
        AWCoreComponentModule
      ]
    });

  });

  it('should retrieve a correct finder if we work with list of values and query is string',
    inject([DataFinders, DataProviders],
      (finders: DataFinders, dataProviders: DataProviders) => {
        let cars = ['aaron', 'ben', 'baloon'];

        let dataProvider = dataProviders.find(cars);
        let dataFinder = finders.find(dataProvider, QueryType.FullText);

        expect(isPresent(dataFinder)).toBeTruthy();
        expect(dataFinder instanceof FullTextArrayDataFinder).toBeTruthy();
      }));


  it('should find correct matching element with the Finder found',
    inject([DataFinders, DataProviders],
      (finders: DataFinders, dataProviders: DataProviders) => {
        let cars = ['aaron', 'ben', 'baloon'];

        let dataProvider = dataProviders.find(cars);
        let dataFinder = finders.find(dataProvider, QueryType.FullText);

        let match = dataFinder.forData(dataProvider).instantMatch<string>('aa', 100);
        expect(match).toContain('aaron');
      }));


  it('should set DataProvider instance to the Finder during a find process',
    inject([DataFinders, DataProviders],
      (finders: DataFinders, dataProviders: DataProviders) => {
        let cars = ['aaron', 'ben', 'baloon'];

        let dataProvider = dataProviders.find(cars);
        let dataFinder = finders.find(dataProvider, QueryType.FullText);

        expect(() => dataFinder.instantMatch<string>('aa', 100)).not
          .toThrowError(/Missing DataProvider/);
      }));


  it('should throw error when DataProvider is not set ',
    inject([DataFinders, DataProviders],
      (finders: DataFinders, dataProviders: DataProviders) => {
        let dataFinder = new FullTextArrayDataFinder();

        expect(() => dataFinder.instantMatch<string>('aa', 100))
          .toThrowError(/Missing DataProvider/);
      }));


});

