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
import {AribaCoreModule} from '../ariba.core.module';
import {Resource, Response} from './resource.service';
import {Entity, Value} from './domain-model';
import {isPresent} from '../utils/lang';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ActionSegment, RestSegmentType} from './url/segment';
import {HttpClient, HttpResponse} from '@angular/common/http';

describe('Resource', () => {


  describe('and Serialize and deserialize', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          AribaCoreModule.forRoot({
            'restapi.context': '/myService/',
            'restapi.context.project': '/myuserservice/v1/',
            'i18n.enabled': false,
            'env.test': true,
            'domain.uniquename': 'id'
          })
        ]
      });
    });


    it('should deserialize value to correct Entity form',
      inject([Resource], (service: Resource) => {
        let jsonUser = {
          uniqueName: 'ID1',
          created: new Date()
        };

        let typeValue = service.deserialize(jsonUser, User);

        expect(typeValue.uniqueName).toBe('ID1');
        expect(typeValue.hasOwnProperty('id')).toBeFalsy();
      }));


    it('should serialize value to correct JSON form',
      inject([Resource], (service: Resource) => {
        let user = new User();
        user.uniqueName = 'U1';
        user.created = new Date();

        let toString = service.serialize<User>(user);
        let jsonValue = JSON.parse(toString);

        expect(jsonValue.uniqueName).toBe('U1');
        expect(jsonValue.hasOwnProperty('uniqName')).toBeFalsy();
      }));

  });


  describe('URL Assembly', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          AribaCoreModule.forRoot({
            'restapi.context': '/myService/v1',
            'restapi.host': 'http://api.ariba.com/',
            'i18n.enabled': false,
            'env.test': true
          })
        ]
      });
    });


    it('should have correctly assembled url for simple fetch',
      inject([Resource], (service: Resource) => {

        let resource = service
          .load()
          .resource(Requisition)
          .withId('123');

        let url = resource.url;

        expect(resource.url)
          .toBe('http://api.ariba.com/myService/v1/requisitions/123');
      }));


    it('should have correctly assembled url for simple fetch with return all',
      inject([Resource], (service: Resource) => {

        let resource = service
          .load()
          .resource(Requisition);

        let url = resource.url;

        expect(resource.url)
          .toBe('http://api.ariba.com/myService/v1/requisitions');

      }));


    it('should have correctly assembled url for subcontext resources',
      inject([Resource], (service: Resource) => {

        let resource = service
          .load()
          .resource(LineItem)
          .of
          .resource(Requisition)
          .withId('123');

        let url = resource.url;

        expect(url)
          .toBe('http://api.ariba.com/myService/v1/requisitions/123/lineitems');

      }));


    it('should have correctly assembled url for subcontext resources resource',
      inject([Resource], (service: Resource) => {

        let resource = service.load()
          .resource(LineItem)
          .withId('abc')
          .of
          .resource(Requisition)
          .withId('123');

        let url = resource.url;

        expect(resource.url)
          .toBe('http://api.ariba.com/myService/v1/requisitions/123/lineitems/abc');

      }));


    it('should have correctly assembled url for simple save',
      inject([Resource], (service: Resource) => {
        let r = new Requisition();
        let resource = service
          .save()
          .resource(Requisition)
          .withId('123')
          .withData(r);

        let url = resource.url;


        let urlSegment: ActionSegment = <ActionSegment>resource
          .urlGroup.lookup(RestSegmentType.Action);
        expect(urlSegment.data).toBeDefined();
        expect((urlSegment.data instanceof Requisition)).toBeTruthy();

        expect(resource.url)
          .toBe('http://api.ariba.com/myService/v1/requisitions/123');
      }));


    it('should have correctly assembled url for simple fetch with return all',
      inject([Resource], (service: Resource) => {

        let r = new Requisition();

        let resource = service
          .save()
          .resource(Requisition)
          .withId('123')
          .withData(r);

        let url = resource.url;

        expect(resource.url)
          .toBe('http://api.ariba.com/myService/v1/requisitions/123');

        let urlSegment: ActionSegment = <ActionSegment>resource
          .urlGroup.lookup(RestSegmentType.Action);
        expect(urlSegment.data).toBeDefined();
        expect((urlSegment.data instanceof Requisition)).toBeTruthy();

      }));


    it('should fail when trying to save subcontext resources without Id',
      inject([Resource], (service: Resource) => {

        let r = new Requisition();

        let resource = service
          .save()
          .resource(LineItem)
          .of
          .resource(Requisition)
          .withData(r);

        expect(() => resource.url)
          .toThrowError('Missing withId(<IDENTIFIER>) call!');

      }));


    it('should have correctly assembled url for subcontext resources resource',
      inject([Resource], (service: Resource) => {

        let r = new Requisition();

        let resource = service.save()
          .resource(LineItem)
          .withId('abc')
          .of
          .resource(Requisition)
          .withId('123')
          .withData(r);

        let url = resource.url;

        expect(resource.url)
          .toBe('http://api.ariba.com/myService/v1/requisitions/123/lineitems/abc');

        let urlSegment: ActionSegment = <ActionSegment>resource
          .urlGroup.lookup(RestSegmentType.Action);

        expect(urlSegment.data).toBeDefined();
        expect((urlSegment.data instanceof Requisition)).toBeTruthy();

      }));


    it('should have correctly assembled url for simple interaction',
      inject([Resource], (service: Resource) => {
        let r = new Requisition();
        let resource = service
          .do('publish')
          .resource(Requisition)
          .withId('123');


        let url = resource.url;

        let urlSegment: ActionSegment = <ActionSegment>resource
          .urlGroup.lookup(RestSegmentType.Action);
        expect(urlSegment.data).toBeDefined();
        expect((urlSegment.data)).toBe('publish');

        expect(resource.url)
          .toBe('http://api.ariba.com/myService/v1/requisitions/' +
            '123/actions/publish');
      }));


    it('should have correctly assembled url for subcontext resources resource',
      inject([Resource], (service: Resource) => {

        let r = new Requisition();

        let resource = service
          .do('triggeremail')
          .resource(LineItem)
          .withId('abc')
          .of
          .resource(Requisition)
          .withId('123');

        let url = resource.url;

        expect(resource.url)
          .toBe('http://api.ariba.com/myService/v1/' +
            'requisitions/123/lineitems/abc/actions/triggeremail');

        let urlSegment: ActionSegment = <ActionSegment>resource
          .urlGroup.lookup(RestSegmentType.Action);

        expect(urlSegment.data).toBe('triggeremail');
      }));


    it('should fail when executing interaction on resource without identifier set',
      inject([Resource], (service: Resource) => {
        let r = new Requisition();
        let resource = service
          .do('publish')
          .resource(Requisition);

        expect(() => resource.url)
          .toThrowError('Missing withId(<IDENTIFIER>) call!');

      }));

  });


  describe('Data manipulation with Object', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          AribaCoreModule.forRoot({
            'restapi.context': '/myService/v1',
            'restapi.host': 'http://api.ariba.com/',
            'i18n.enabled': false,
            'env.test': true
          })
        ]
      });
    });


    describe('For data Load', () => {

      it('can fetch object based on ID, so its deserialized',
        inject([HttpClient, HttpTestingController, Resource],
          (http: HttpClient, httpMock: HttpTestingController, service: Resource) => {

            let matchUrl = 'http://api.ariba.com/myService/v1/requisitions/123';

            let receivedR: Requisition;

            service
              .load()
              .resource(Requisition)
              .withId('123')
              .asEntity<Requisition>((r: Requisition) => receivedR = r);

            let pr = new Requisition('aaa', 'rr');

            let rr: Response<Requisition> = {
              payload: pr
            };
            let testRequest = httpMock.expectOne(matchUrl);
            testRequest.flush(rr);

            expect(receivedR).not.toBeNull();
            expect(receivedR.title).toBe('rr');
            expect(receivedR.uniqueName).toBe('aaa');

            httpMock.verify();
          }));


      it('can fetch objects based for given resource, deserialized',
        inject([HttpClient, HttpTestingController, Resource],
          (http: HttpClient, httpMock: HttpTestingController, service: Resource) => {

            let matchUrl = 'http://api.ariba.com/myService/v1/requisitions/123';

            let receivedR: Requisition[];
            service
              .load()
              .resource(Requisition)
              .withId('123')
              .asEntity<Requisition>((r: Requisition[]) => {
                receivedR = r;
              });

            let pr = new Requisition('aaa', 'rr');
            let pr2 = new Requisition('ssss', 'eeeeee');

            let rr: Response<Requisition[]> = {
              payload: [pr, pr2]
            };
            let testRequest = httpMock.expectOne(matchUrl);
            testRequest.flush(rr);

            expect(receivedR).not.toBeNull();
            expect(receivedR.length).toBe(2);
            expect(receivedR[1].title).toBe('eeeeee');
            expect(receivedR[1].uniqueName).toBe('ssss');

            httpMock.verify();
          }));


      it('can fetch objects for resource subContext and deserialized',
        inject([HttpClient, HttpTestingController, Resource],
          (http: HttpClient, httpMock: HttpTestingController, service: Resource) => {

            let matchUrl = 'http://api.ariba.com/myService/v1/requisitions/123/' +
              'lineitems';

            let receivedLI: LineItem[];

            service
              .load()
              .resource(LineItem)
              .of
              .resource(Requisition)
              .withId('123')
              .asEntity<LineItem>((r: LineItem[]) => receivedLI = r);

            let l1 = new LineItem('iPhone1', 2, 2);
            let l2 = new LineItem('iPhone2', 2, 111);

            let rr: Response<LineItem[]> = {
              payload: [l1, l2]
            };
            let testRequest = httpMock.expectOne(matchUrl);
            testRequest.flush(rr);

            expect(receivedLI).not.toBeNull();
            expect(receivedLI.length).toBe(2);
            expect(receivedLI[1].name).toBe('iPhone2');
            expect(receivedLI[1].qty).toBe(2);
            expect(receivedLI[1].price).toBe(111);

            httpMock.verify();
          }));


      it('can fetch 1 object for specific resource subContext and deserialized',
        inject([HttpClient, HttpTestingController, Resource],
          (http: HttpClient, httpMock: HttpTestingController, service: Resource) => {

            let matchUrl = 'http://api.ariba.com/myService/v1/requisitions/123/' +
              'lineitems/aa';

            let receivedLI: LineItem;

            service
              .load()
              .resource(LineItem)
              .withId('aa')
              .of
              .resource(Requisition)
              .withId('123')
              .asEntity<LineItem>((r: LineItem) => receivedLI = r);

            let l1 = new LineItem('iPhone1', 2, 2);

            let rr: Response<LineItem> = {
              payload: l1
            };
            let testRequest = httpMock.expectOne(matchUrl);
            testRequest.flush(rr);

            expect(receivedLI).not.toBeNull();
            expect(receivedLI.name).toBe('iPhone1');
            expect(receivedLI.qty).toBe(2);
            expect(receivedLI.price).toBe(2);

            httpMock.verify();
          }));

    });


    describe('For data Save  (both post and put)', () => {

      it('can save updated object using PUT',
        inject([HttpClient, HttpTestingController, Resource],
          (http: HttpClient, httpMock: HttpTestingController, service: Resource) => {

            let matchUrl = 'http://api.ariba.com/myService/v1/requisitions/123';
            let pr = new Requisition('aaa', 'rr');
            let receivedR: Requisition;

            service
              .save()
              .resource(Requisition)
              .withId('123')
              .withData(pr)
              .asEntity<Requisition>((r: Requisition) => receivedR = r);

            let updPr = new Requisition(pr.uniqueName, 'updated');
            let r4: Response<Requisition> = {
              payload: updPr
            };
            let testRequest = httpMock.expectOne({
              url: matchUrl,
              method: 'PUT'
            });
            testRequest.flush(r4);

            expect(receivedR).not.toBeNull();
            expect(receivedR.title).toBe('updated');
            expect(receivedR.uniqueName).toBe('aaa');

            httpMock.verify();
          }));


      it('can save newly created object using POST',
        inject([HttpClient, HttpTestingController, Resource],
          (http: HttpClient, httpMock: HttpTestingController, service: Resource) => {

            let matchUrl = 'http://api.ariba.com/myService/v1/requisitions/123';
            let pr = new Requisition(null, 'rr');
            let receivedR: Requisition;

            service
              .save()
              .resource(Requisition)
              .withId('123')
              .withData(pr)
              .asEntity<Requisition>((r: Requisition) => receivedR = r);

            let updPr = new Requisition('Pr12', 'updated');
            let rr: Response<Requisition> = {
              payload: updPr
            };
            let testRequest = httpMock.expectOne({
              url: matchUrl,
              method: 'POST'
            });
            testRequest.flush(rr);

            expect(receivedR).not.toBeNull();
            expect(receivedR.title).toBe('updated');
            expect(receivedR.uniqueName).toBe('Pr12');

            httpMock.verify();
          }));


      it('can save 1 object for specific resource subContext and deserialized',
        inject([HttpClient, HttpTestingController, Resource],
          (http: HttpClient, httpMock: HttpTestingController, service: Resource) => {

            let matchUrl = 'http://api.ariba.com/myService/v1/requisitions/123/' +
              'lineitems';

            let li: LineItem = new LineItem('aaa', 1, 2);
            let receivedLi: LineItem;

            service
              .save()
              .resource(LineItem)
              .withData(li)
              .of
              .resource(Requisition)
              .withId('123')
              .asEntity<LineItem>((r: LineItem) => receivedLi = r);

            let l1 = new LineItem('aaa-update', 2, 2);

            let rr: Response<LineItem> = {
              payload: l1
            };
            let testRequest = httpMock.expectOne({
              url: matchUrl,
              method: 'PUT'
            });
            testRequest.flush(rr);

            expect(receivedLi).not.toBeNull();
            expect(receivedLi.name).toBe('aaa-update');
            expect(receivedLi.qty).toBe(2);
            expect(receivedLi.price).toBe(2);

            httpMock.verify();
          }));


    });


    describe('For executing interactions action', () => {

      it('can save updated object using PUT',
        inject([HttpClient, HttpTestingController, Resource],
          (http: HttpClient, httpMock: HttpTestingController, service: Resource) => {

            let matchUrl = 'http://api.ariba.com/myService/v1/requisitions/' +
              '123/actions/approve';

            // just sending back PR, i dont know what MS will send
            let pr = new Requisition('aaa', 'rr');
            let receivedR: Requisition;

            service
              .do('approve')
              .resource(Requisition)
              .withId('123')
              .asEntity<Requisition>((r: Requisition) => receivedR = r);

            let rr: Response<Requisition> = {
              payload: pr
            };
            let testRequest = httpMock.expectOne({
              url: matchUrl,
              method: 'POST'
            });
            testRequest.flush(rr);

            expect(receivedR).not.toBeNull();
            expect(receivedR.title).toBe('rr');
            expect(receivedR.uniqueName).toBe('aaa');

            httpMock.verify();
          }));

    });


  });


  describe('Data manipulation with HttpResponse', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          AribaCoreModule.forRoot({
            'restapi.context': '/myService/v1',
            'restapi.host': 'http://api.ariba.com/',
            'i18n.enabled': false,
            'env.test': true
          })
        ]
      });
    });


    describe('For data Load', () => {

      it('can fetch object based on ID, so its deserialized',
        inject([HttpClient, HttpTestingController, Resource],
          (http: HttpClient, httpMock: HttpTestingController, service: Resource) => {

            let matchUrl = 'http://api.ariba.com/myService/v1/requisitions/123';

            let resp: HttpResponse<Response<Requisition>>;
            service
              .load()
              .resource(Requisition)
              .withId('123')
              .asHttpResponse<Requisition>(
                (r: HttpResponse<Response<Requisition>>) => resp = r);

            let pr = new Requisition('aaa', 'rr');

            let rr: Response<Requisition> = {
              payload: pr
            };
            let testRequest = httpMock.expectOne(matchUrl);
            testRequest.flush(rr);

            expect(resp.status).toBe(200);
            expect(resp.body).not.toBeNull();
            expect(resp.body.payload.title).toBe('rr');
            expect(resp.body.payload.uniqueName).toBe('aaa');

            httpMock.verify();
          }));


      it('can fetch objects based for given resource, deserialized',
        inject([HttpClient, HttpTestingController, Resource],
          (http: HttpClient, httpMock: HttpTestingController, service: Resource) => {

            let matchUrl = 'http://api.ariba.com/myService/v1/requisitions/123';

            let resp: HttpResponse<Response<Requisition[]>>;
            service
              .load()
              .resource(Requisition)
              .withId('123')
              .asHttpResponse<Requisition>(
                (r: HttpResponse<Response<Requisition[]>>) => resp = r);

            let pr = new Requisition('aaa', 'rr');
            let pr2 = new Requisition('ssss', 'eeeeee');

            let rr: Response<Requisition[]> = {
              payload: [pr, pr2]
            };
            let testRequest = httpMock.expectOne(matchUrl);
            testRequest.flush(rr);

            expect(resp).not.toBeNull();
            expect(resp.body).not.toBeNull();
            expect(resp.status).toBe(200);
            expect(resp.body.payload.length).toBe(2);
            expect(resp.body.payload[1].title).toBe('eeeeee');
            expect(resp.body.payload[1].uniqueName).toBe('ssss');

            httpMock.verify();
          }));


      it('can fetch objects for resource subContext and deserialized',
        inject([HttpClient, HttpTestingController, Resource],
          (http: HttpClient, httpMock: HttpTestingController, service: Resource) => {

            let matchUrl = 'http://api.ariba.com/myService/v1/' +
              'requisitions/123/lineitems';

            let resp: HttpResponse<Response<LineItem[]>>;

            service
              .load()
              .resource(LineItem)
              .of
              .resource(Requisition)
              .withId('123')
              .asHttpResponse<LineItem>(
                (r: HttpResponse<Response<LineItem[]>>) => resp = r);

            let l1 = new LineItem('iPhone1', 2, 2);
            let l2 = new LineItem('iPhone2', 2, 111);

            let rr: Response<LineItem[]> = {
              payload: [l1, l2]
            };
            let testRequest = httpMock.expectOne(matchUrl);
            testRequest.flush(rr);

            expect(resp).not.toBeNull();
            expect(resp.status).toBe(200);
            expect(resp.body.payload.length).toBe(2);
            expect(resp.body.payload[1].name).toBe('iPhone2');
            expect(resp.body.payload[1].qty).toBe(2);
            expect(resp.body.payload[1].price).toBe(111);

            httpMock.verify();
          }));


      it('can fetch 1 object for specific resource subContext and deserialized',
        inject([HttpClient, HttpTestingController, Resource],
          (http: HttpClient, httpMock: HttpTestingController, service: Resource) => {

            let matchUrl = 'http://api.ariba.com/myService/v1/requisitions/123/' +
              'lineitems/aa';

            let resp: HttpResponse<Response<LineItem>>;


            service
              .load()
              .resource(LineItem)
              .withId('aa')
              .of
              .resource(Requisition)
              .withId('123')
              .asHttpResponse<LineItem>(
                (r: HttpResponse<Response<LineItem>>) => resp = r);

            let l1 = new LineItem('iPhone1', 2, 2);

            let rr: Response<LineItem> = {
              payload: l1
            };
            let testRequest = httpMock.expectOne(matchUrl);
            testRequest.flush(rr);

            expect(resp).not.toBeNull();
            expect(resp.body.payload.name).toBe('iPhone1');
            expect(resp.body.payload.qty).toBe(2);
            expect(resp.body.payload.price).toBe(2);

            httpMock.verify();
          }));

    });


    describe('For data Save  (both post and put)', () => {

      it('can save updated object using PUT',
        inject([HttpClient, HttpTestingController, Resource],
          (http: HttpClient, httpMock: HttpTestingController, service: Resource) => {

            let matchUrl = 'http://api.ariba.com/myService/v1/requisitions/123';
            let pr = new Requisition('aaa', 'rr');

            let resp: HttpResponse<Response<Requisition>>;

            service
              .save()
              .resource(Requisition)
              .withId('123')
              .withData(pr)
              .asHttpResponse<Requisition>(
                (r: HttpResponse<Response<Requisition>>) => resp = r);

            let updPr = new Requisition(pr.uniqueName, 'updated');
            let rr: Response<Requisition> = {
              payload: updPr
            };
            let testRequest = httpMock.expectOne({
              url: matchUrl,
              method: 'PUT'
            });
            testRequest.flush(rr);

            expect(resp).not.toBeNull();
            expect(resp.status).toBe(200);
            expect(resp.body.payload.title).toBe('updated');
            expect(resp.body.payload.uniqueName).toBe('aaa');

            httpMock.verify();
          }));


      it('can save newly created object using POST',
        inject([HttpClient, HttpTestingController, Resource],
          (http: HttpClient, httpMock: HttpTestingController, service: Resource) => {

            let matchUrl = 'http://api.ariba.com/myService/v1/requisitions/123';
            let pr = new Requisition(null, 'rr');
            let resp: HttpResponse<Response<Requisition>>;

            service
              .save()
              .resource(Requisition)
              .withId('123')
              .withData(pr)
              .asHttpResponse<Requisition>(
                (r: HttpResponse<Response<Requisition>>) => resp = r);

            let updPr = new Requisition('Pr12', 'updated');
            let rr: Response<Requisition> = {
              payload: updPr
            };
            let testRequest = httpMock.expectOne({
              url: matchUrl,
              method: 'POST'
            });
            testRequest.flush(rr);

            expect(resp).not.toBeNull();
            expect(resp.status).toBe(200);
            expect(resp.body.payload.title).toBe('updated');
            expect(resp.body.payload.uniqueName).toBe('Pr12');

            httpMock.verify();
          }));


      it('can save 1 object for specific resource subContext and deserialized',
        inject([HttpClient, HttpTestingController, Resource],
          (http: HttpClient, httpMock: HttpTestingController, service: Resource) => {

            let matchUrl = 'http://api.ariba.com/myService/v1/' +
              'requisitions/123/lineitems';

            let li: LineItem = new LineItem('aaa', 1, 2);
            let resp: HttpResponse<Response<LineItem>>;

            service
              .save()
              .resource(LineItem)
              .withData(li)
              .of
              .resource(Requisition)
              .withId('123')
              .asHttpResponse<LineItem>(
                (r: HttpResponse<Response<LineItem>>) => resp = r);

            let l1 = new LineItem('aaa-update', 2, 2);

            let rr: Response<LineItem> = {
              payload: l1
            };
            let testRequest = httpMock.expectOne({
              url: matchUrl,
              method: 'PUT'
            });
            testRequest.flush(rr);

            expect(resp).not.toBeNull();
            expect(resp.status).toBe(200);
            expect(resp.body.payload.name).toBe('aaa-update');
            expect(resp.body.payload.qty).toBe(2);
            expect(resp.body.payload.price).toBe(2);

            httpMock.verify();
          }));


    });


    describe('For executing interactions action', () => {

      it('can save updated object using PUT',
        inject([HttpClient, HttpTestingController, Resource],
          (http: HttpClient, httpMock: HttpTestingController, service: Resource) => {

            let matchUrl = 'http://api.ariba.com/myService/v1/requisitions/' +
              '123/actions/approve';

            // just sending back PR, i dont know what MS will send
            let pr = new Requisition('aaa', 'rr');
            let resp: HttpResponse<Response<Requisition>>;


            service
              .do('approve')
              .resource(Requisition)
              .withId('123')
              .asHttpResponse<Requisition>(
                (r: HttpResponse<Response<Requisition>>) => resp = r);

            let rr: Response<Requisition> = {
              payload: pr
            };
            let testRequest = httpMock.expectOne({
              url: matchUrl,
              method: 'POST'
            });
            testRequest.flush(rr);

            expect(resp).not.toBeNull();
            expect(resp.status).toBe(200);
            expect(resp.body.payload.title).toBe('rr');
            expect(resp.body.payload.uniqueName).toBe('aaa');

            httpMock.verify();
          }));

    });


  });


});


class Requisition implements Entity {


  constructor(public uniqueName?: string, public title?: string, public lines: LineItem[] = []) {
  }

  identity(): string {
    return this.uniqueName;
  }

  className(): string {
    return 'Requisition';
  }


  getTypes(): any {
    return {
      uniqueName: String,
      title: String
    };
  }
}


class LineItem implements Value {

  constructor(public readonly name?: string, public readonly qty?: number,
              public readonly price?: number) {
  }

  className(): string {
    return 'LineItem';
  }

  getTypes(): any {
    return {
      name: String,
      qty: Number,
      price: Number
    };
  }

  clone(): LineItem;

  clone(data: { name?: string, qty?: number, price?: number } = {}): LineItem {
    return new LineItem(
      isPresent(data.name) ? data.name : this.name,
      isPresent(data.qty) ? data.qty : this.qty,
      isPresent(data.price) ? data.price : this.price
    );
  }
}


class User implements Entity {

  uniqueName: string;
  created: Date;


  identity(): string {
    return this.uniqueName;
  }

  getTypes(): any {
    return {
      created: Date,
    };
  }


  $proto(): Entity {
    return null;
  }

  className(): string {
    return null;
  }
}

//
// class Resource
// {
//     private op: ResOp = ResOp.None;
//     private returnType: Type<any>;
//
//
//     load(): Resource
//     {
//         this.op = ResOp.Load;
//         return this;
//     }
//
//
//     resource<T>(type: Type<T>): Resource
//     {
//         this.returnType = type;
//         return this;
//     }
//
//     asHttpResponse<T>(callback: (res: HttpResponse<T>) => void): Subscription
//     {
//         let neObs = Observable.create();
//         return neObs.subscribe(callback)
//     }
//
//
//       templateFor<T>( type: Type<T> ):  T
//       {
//           return null;
//
//       }
//
// }
