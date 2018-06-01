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
import {DataTypeProviderRegistry} from '../datatype-registry.service';
import {AribaCoreModule} from '@aribaui/core';
import {AWCoreComponentModule} from '../../core.module';
import {ArrayDataProvider} from '../array-data-provider';
import {DataProviders} from '../data-providers';
import {AribaComponentsTestProviderModule} from '../../../ariba.component.provider.module';
import {AribaCoreI18nModule} from '../../../../core';


describe('Data Providers', () =>
{

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            imports: [
                AribaCoreI18nModule,
                AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
                AribaComponentsTestProviderModule.forRoot(),
                AWCoreComponentModule
            ]
        });

    });


    describe('Data Provider Registry', () =>
    {
        it('should have registered DataTypeProviderRegistry service',
            inject([DataTypeProviderRegistry], (registry: DataTypeProviderRegistry) =>
            {

                expect(registry).toBeDefined();
                expect(registry).not.toBeNull();

            }));


        it('can register different providers per class type',
            inject([DataTypeProviderRegistry], (registry: DataTypeProviderRegistry) =>
            {

                registry.registerProvider(Car, new MyCoolProvider<Car>([]));
                registry.registerProvider(Motorcycle, new MyCoolProvider<Motorcycle>([]));


                expect(registry.bestMatchForClass('Car')).not.toBeNull();
                expect(registry.bestMatchForClass('Motorcycle')).not.toBeNull();
                expect(registry.bestMatchForClass('Place')).toBeNull();

            }));


        it('should throw error when we try to register a string or null',
            inject([DataTypeProviderRegistry], (registry: DataTypeProviderRegistry) =>
            {

                expect(() => registry.registerProvider('Car', new MyCoolProvider<Car>([])))
                    .toThrowError(/Cannot register non-object/);


                expect(() => registry.registerProvider(null, new MyCoolProvider<Car>([])))
                    .toThrowError(/Cannot register non-object/);


                expect(() => registry.registerProvider(undefined, new MyCoolProvider<Car>([])))
                    .toThrowError(/Cannot register non-object/);

            }));


        it('should find registered provider for parent class Person if none is registered for ' +
            'Agent class',
            inject([DataTypeProviderRegistry], (registry: DataTypeProviderRegistry) =>
            {

                registry.registerProvider(Car, new MyCoolProvider<Car>([]));
                registry.registerProvider(Motorcycle, new MyCoolProvider<Motorcycle>([]));
                registry.registerProvider(Person, new MyCoolProvider<Person>([]));


                expect(registry.bestMatchForType(Person)).not.toBeNull();
                expect(registry.bestMatchForType(Agent)).not.toBeNull();

            }));
    });


    describe('DataProviders Factory', () =>
    {
        it('should have registered DataProviders',
            inject([DataTypeProviderRegistry, DataProviders],
                (registry: DataTypeProviderRegistry, dataProviders: DataProviders) =>
                {
                    expect(dataProviders).toBeDefined();
                    expect(dataProviders).not.toBeNull();

                }));


        it('should fine registered Provider Car by string',
            inject([DataTypeProviderRegistry, DataProviders],
                (registry: DataTypeProviderRegistry, dataProviders: DataProviders) =>
                {

                    registry.registerProvider(Car, new MyCoolProvider<Car>([]));

                    expect(dataProviders.find('Car')).toBeDefined();
                    expect(dataProviders.find('Car')).not.toBeNull();


                }));


        it('should fine registered Provider Car by Type',
            inject([DataTypeProviderRegistry, DataProviders],
                (registry: DataTypeProviderRegistry, dataProviders: DataProviders) =>
                {

                    registry.registerProvider(Car, new MyCoolProvider<Car>([]));

                    expect(dataProviders.find(Car)).toBeDefined();
                    expect(dataProviders.find(Car)).not.toBeNull();


                }));


        it('should create new provider if we are dealing with Array type',
            inject([DataTypeProviderRegistry, DataProviders],
                (registry: DataTypeProviderRegistry, dataProviders: DataProviders) =>
                {
                    let arrProvider = dataProviders.find(['aa']);
                    expect(arrProvider instanceof ArrayDataProvider).toBeTruthy();

                }));


        it('should throw Error when we pass null or undefined',
            inject([DataTypeProviderRegistry, DataProviders],
                (registry: DataTypeProviderRegistry, dataProviders: DataProviders) =>
                {

                    expect(() => dataProviders.find(null))
                        .toThrowError(/Cannot convert. Uknown object/);

                    expect(() => dataProviders.find(undefined))
                        .toThrowError(/Cannot convert. Uknown object/);

                }));


        it('should be able to register new providers using DataProviders',
            inject([DataProviders], (dataProviders: DataProviders) =>
            {

                dataProviders.register(Car, new MyCoolProvider<Car>([]));

                let arrProvider = dataProviders.find(['aa']);
                expect(arrProvider instanceof ArrayDataProvider).toBeTruthy();

            }));

    });

});

class Person
{

}

class Agent extends Person
{

}

class Car
{

}


class Motorcycle
{

}


class MyCoolProvider<T> extends ArrayDataProvider<T>
{


    constructor(protected  values: Array<T>)
    {
        super(values);
    }

    expectedCount(params?: Map<string, any>): number
    {
        return 10;
    }

}
