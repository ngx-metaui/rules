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
import {AribaCoreModule, equals, isPresent} from '@aribaui/core';
import {AWCoreComponentModule} from '../../../core/core.module';
import {DATA_SOURCE} from '../../../core/data/data-source';
import {DataProviders} from '../../../core/data/data-providers';
import {DataFinders, QueryType} from '../../../core/data/data-finders';
import {DatatableState, DTDataSource, DTDSChooserInitParams} from '../datatable-data-source';
import {ArrayDataProvider} from '../../../core/data/array-data-provider';
import {AribaComponentsTestProviderModule} from '../../../ariba.component.provider.module';
import {AribaCoreI18nModule} from '../../../../core';


describe('Datatable datasource and its', () =>
{

    describe('data fetching capability', () =>
    {
        beforeEach(() =>
        {
            TestBed.configureTestingModule({
                imports: [
                    AribaCoreI18nModule,
                    AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
                    AribaComponentsTestProviderModule.forRoot(),
                    AWCoreComponentModule
                ],
                providers: [
                    {
                        provide: DATA_SOURCE, useClass: DTDataSource,
                        deps: [DataProviders, DataFinders]
                    }
                ]
            });

        });


        it('should inject correct instantiated DataSource',
            inject([DATA_SOURCE], (ds: DTDataSource) =>
            {

                expect(ds).toBeDefined();
                expect(ds.dataProviders).toBeDefined();
                expect(ds.finders).toBeDefined();
            }));


        it('should retrieve all available data thru the changeValues stream',
            inject([DATA_SOURCE], fakeAsync((ds: DTDataSource) =>
            {
                let initParams: DTDSChooserInitParams = {
                    obj: [new Phone('aa'), new Phone('bb'), new Phone('cc')],
                    queryType: QueryType.FullText,
                    multiselect: false,

                };

                ds.init(initParams);

                let retrivedData: Phone[] = [];
                ds.open<Phone>().subscribe((phones: Phone[]) => retrivedData = phones);
                ds.fetch();

                tick();

                expect(retrivedData).toBeDefined();
                expect(retrivedData.length).toBe(3);
            })));


        it('should be able to pass params queries to limit the fetch',
            inject([DATA_SOURCE], fakeAsync((ds: DTDataSource) =>
            {
                let dp: FetchArrayDataProvider<Phone> = new FetchArrayDataProvider(
                    [
                        new Phone('aa'), new Phone('bb'), new Phone('cc'),
                        new Phone('aa1'), new Phone('bb2'), new Phone('cc1')
                    ]
                );

                let initParams: DTDSChooserInitParams = {
                    queryType: QueryType.FullText,
                    multiselect: false,
                    dataProvider: dp
                };

                ds.init(initParams);

                let retrivedData: Phone[] = [];
                ds.open<Phone>().subscribe((phones: Phone[]) => retrivedData = phones);


                let state: DatatableState = new DatatableState();
                state.offset = 0;
                state.rowsPerPage = 2;
                ds.fetch(state);

                tick();

                expect(retrivedData).toBeDefined();
                expect(retrivedData.length).toBe(2);

            })));


        it('should throw errors when we ask for instant data as this option should be disabled',
            inject([DATA_SOURCE], (ds: DTDataSource) =>
            {

                let initParams: DTDSChooserInitParams = {
                    obj: [new Phone('aa'), new Phone('bb'), new Phone('cc')],
                    queryType: QueryType.FullText,
                    multiselect: false,
                };

                ds.init(initParams);

                expect(() => ds.instant()).toThrowError(
                    /unimplemented/
                );

            }));
    });


    describe('support for CRUD operation - disabled (local DS operation)', () =>
    {
        beforeEach(() =>
        {
            TestBed.configureTestingModule({
                imports: [
                    AribaCoreI18nModule,
                    AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
                    AribaComponentsTestProviderModule.forRoot(),
                    AWCoreComponentModule
                ],
                providers: [
                    {
                        provide: DATA_SOURCE, useClass: DTDataSource,
                        deps: [DataProviders, DataFinders]
                    }
                ]
            });

        });


        it('insert data to current local state broadcast the change using' +
            ' DataProvider.dataChanges',
            inject([DATA_SOURCE], fakeAsync((ds: DTDataSource) =>
            {
                let dataProvider = new CrudArrayDataProvider([
                    new Phone('aa'),
                    new Phone('bb'), new Phone('cc')
                ]);

                let initParams: DTDSChooserInitParams = {
                    queryType: QueryType.FullText,
                    multiselect: false,
                    dataProvider: dataProvider

                };

                ds.init(initParams);

                let retrivedData: Phone[] = [];
                ds.open<Phone>().subscribe((phones: Phone[]) => retrivedData = phones);

                ds.insert(new Phone('aaaaaa'));
                tick();

                expect(retrivedData).toBeDefined();
                expect(retrivedData.length).toBe(4);
                expect(dataProvider.insertCalled).toBeTruthy();
            })));


        it('remove data from current local state broadcast the change using' +
            ' DataProvider.dataChanges',
            inject([DATA_SOURCE], fakeAsync((ds: DTDataSource) =>
            {

                let toRemove = new Phone('aa');
                let dataProvider = new CrudArrayDataProvider([
                    toRemove,
                    new Phone('bb'), new Phone('cc')
                ]);

                let initParams: DTDSChooserInitParams = {
                    queryType: QueryType.FullText,
                    multiselect: false,
                    dataProvider: dataProvider

                };
                ds.init(initParams);

                let retrivedData: Phone[] = [];
                ds.open<Phone>().subscribe((phones: Phone[]) => retrivedData = phones);

                ds.remove(toRemove);
                tick();

                expect(retrivedData).toBeDefined();
                expect(retrivedData.length).toBe(2);
                expect(dataProvider.removedCalled).toBeTruthy();

            })));


    });


});


class MyCustomParamDTDS extends DTDataSource
{

}


class FetchArrayDataProvider<T> extends ArrayDataProvider<T>
{


    constructor(values: Array<T>)
    {
        super(values);
    }

    dataForParams(params: Map<string, any>): Array<T>
    {
        if (isPresent(params)) {
            let offset = params.get('offset');
            let limit = params.get('limit');
            let orderBy = params.get('orderby');
            let selector = params.get('selector');

            let all = super.dataForParams(null);
            if (all.length > (offset + limit)) {
                return all.slice(offset, limit);
            } else {
                return all.slice(offset, all.length);
            }

        }
    }
}


/**
 * Need to make sure that when canCRUD is true all the CRUD operation goes down to DataProvider
 * then its up to the implementation
 */
class CrudArrayDataProvider<T> extends ArrayDataProvider<T>
{

    removedCalled = false;
    insertCalled = false;

    constructor(values: Array<T>)
    {
        super(values);
    }

    dataForParams(params: Map<string, any>): Array<T>
    {
        if (isPresent(params)) {
            let offset = params.get('offset');
            let limit = params.get('limit');
            let orderBy = params.get('orderby');
            let selector = params.get('selector');

            let all = super.dataForParams(null);
            if (all.length > (offset + limit)) {
                return all.slice(offset, limit);
            } else {
                return all.slice(offset, all.length);
            }

        }
    }


    canCRUD(): boolean
    {
        return true;
    }

    insert(obj: any): void
    {
        this.insertCalled = true;
        let copy = this.data().slice();
        copy.push(obj);

        this.dataChanges.next(copy);

    }

    remove(obj: any): void
    {
        this.removedCalled = true;
        let copy = this.data().slice();
        let afterDelete = copy.filter((elem: any) => !equals(elem, obj));

        this.dataChanges.next(afterDelete);
    }
}

class Phone
{

    constructor(public name: string)
    {
    }
}
