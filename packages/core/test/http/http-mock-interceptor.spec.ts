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
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AribaCoreModule} from '../../src/ariba.core.module';
import {Resource, Response} from '../../src/domain/resource.service';
import {Entity} from '../../src/domain/domain-model';

describe('Interceptor: Mock-Server', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AribaCoreModule.forRoot({
                    'restapi.context': '/v1/',
                    'i18n.enabled': false,
                    'env.test': true,
                    'connection.mock-server.enabled': true,
                    // What routes we should register
                    'connection.mock-server.routes': ['usertests'],

                })
            ]
        });
    });


    it('should retrieve object from mock json when calling real URL to get user with id 1',
        inject([HttpClient, Resource],
            (http: HttpClient, service: Resource) => {

                service.load()
                    .resource(UserTest)
                    .withId('1')
                    .asEntity<UserTest>((user: UserTest) => {
                            expect(user.uniqueName).toEqual('1');
                        }
                    );


            }));


    it('should retrieve object from mock json when calling real URL to get user with id 1',
        inject([HttpClient, Resource],
            (http: HttpClient, service: Resource) => {
                service.load()
                    .resource(UserTest)
                    .asEntity<UserTest>((users: UserTest[]) => {
                        expect(users.length).toEqual(2);
                        expect(users[0].name).toBe('Peter');
                        expect(users[1].name).toBe('John');
                    });

            }));

    // todo: enable once its clear how the search API looks like
    // it('should find and retrieve specific user objects by query ',
    //     inject([HttpClient, Resource],
    //         (http: HttpClient, service: Resource) => {
    //
    //             let params = new Map<string, string>().set('term', 'John');
    //
    //             service.bind(UserTest).findAll(params).subscribe((users: UserTest[]) => {
    //                 expect(users.length).toEqual(1);
    //
    //             });
    //
    //         }));


    xit('can save new user by posting new object and getting object with Id and 201 response ',
        inject([HttpClient, Resource],
            (http: HttpClient, service: Resource) => {

                let newUser = new UserTest();
                newUser.name = 'Frank1';

                service
                    .save()
                    .resource(UserTest)
                    .withId(newUser.identity())
                    .withData(newUser)
                    .asHttpResponse((resp: HttpResponse<Response<UserTest>>) => {
                        expect(resp.status).toEqual(201);
                        expect(resp.body.payload.name).toEqual('Frank1');
                        expect(resp.body.payload.uniqueName).toEqual('F1');
                    });

            }));

    it('can update existing user by PUTing it and getting object with Id and 200 response ',
        inject([HttpClient, Resource],
            (http: HttpClient, service: Resource) => {

                let newUser = new UserTest();
                newUser.uniqueName = 'F1';
                newUser.name = 'Frank1';

                service.save()
                    .resource(UserTest)
                    .withId('F1')
                    .withData(newUser)
                    .asHttpResponse<UserTest>(
                        (resp: HttpResponse<Response<UserTest>>) => {
                            expect(resp.status).toEqual(200);
                            expect(resp.body.payload.name).toEqual('Frank1-2');
                            expect(resp.body.payload.uniqueName).toEqual('F1');
                        });

            }));


    it('should throw HttpErrorResponse with 404 when record is not found',
        inject([HttpClient, Resource],
            (http: HttpClient, service: Resource) => {
                let err;


                service.load()
                    .resource(UserTest)
                    .withId('F2')
                    .asHttpResponse<UserTest>(() => {
                    }, (error: HttpErrorResponse) => {
                        expect(error.status).toBe(404);
                        expect(error.error).toBe('NOT FOUND');
                        expect(error.statusText).toBe('Not Found');
                    });
            }));
});


class UserTest implements Entity {
    uniqueName: string;
    name: string;


    getTypes(): any {
        return {
            uniqueName: String,
            name: String
        };
    }


    identity(): string {
        return this.uniqueName;
    }

    $proto(): Entity {
        return null;
    }

    className(): string {
        return null;
    }
}



