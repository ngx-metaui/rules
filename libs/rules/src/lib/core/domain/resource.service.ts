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


import {map} from 'rxjs/operators';

import {Injectable, Type} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpProgressEvent,
  HttpResponse
} from '@angular/common/http';
import {Entity, isEntity, isValue, Value} from './domain-model';
import {AppConfig} from '../config/app-config';
import {
  ActionSegment,
  ContextSegment,
  HostSegment,
  IdentifierSegment,
  OfParentSegment,
  ResourceSegment,
  RestAction,
  RestSegmentType
} from './url/segment';
import {Observable, Subscription} from 'rxjs';
import {DefaultRestBuilder} from './url/builder';
import {RestUrlGroup} from './url/url-group';
import {assert, isArray, isBlank, isDate, isPresent} from '../utils/lang';


/**
 * Response is the generic wrapper interface encapsulating a response from the micro service.
 * Currently we have only body field, but later on we need to extend it for different notifications,
 * errors, paging information and much more.
 *
 *
 *
 */
export interface Response<T> {
  payload: T;
}


/**
 *
 * To simplify work with current HttpClient the Resource provides fluent API on top of it. You dont
 * assemble URL traditional way rather more fluent and functional way, working with real data types
 * such a Value and Entity.
 *
 * Entity and Value are two main key interfaces that all domain objects should inherit from if they
 * want to leverage this functionality.
 *
 * ###Example
 *
 * 1.  to simply assemble following URL http://api.ariba.com/myService/v1/requisitions/123 and
 *  and fetch Requisition data:
 *
 * ```ts
 *  let r: Resource
 *
 *  r.load()
 *   .resource(Requisition)
 *   .withId('123')
 *   .asEntity<Requisition>((r: Requisition) => receivedR = r);
 *
 * ```
 * You you can simply read it: load resource Requisition with ID 123 and return this as Entity
 *
 * 2. Current fluent API also support partial updates and subcontext resource
 *  to load data from this REST API endpoint
 *      http://api.ariba.com/myService/v1/requisitions/123/suppliers


 * ```ts
 *  let r: Resource
 *
 *  r.load()
 *   .resource(Supplier)
 *   .of
 *   .resource(Requisition)
 *   .withId('123')
 *   .asEntity<Supplier>((r:  Supplier[]) => receivedR = r);
 *
 * ```
 *
 *  You can read above: Load all from resource Supplier of Requisition (or supplier belongs to
 *  Requisition)  with ID 123 and return this as Entity.
 *
 *
 * 3. To save data you follow the same syntax
 *      Save requisition so we are PUTting data to following URL
 *      http://api.ariba.com/myService/v1/requisitions/123
 *
 * ```ts
 *  let r: Resource
 *
 *          r
 *        .save()
 *        .resource(Requisition)
 *        .withId('123')
 *        .withData(pr)
 *        .asEntity<Requisition>((r: Requisition) => receivedR = r);
 *
 *
 * ```
 *
 *  You can read above: Save resource Requisition with ID 123 and with Data .... and return it as
 *  a Entity
 *
 *
 *  4. API can also for you assemble and execute actions sometimes called interaction. Not all is
 *  about CRUD. Our current syntax for actions is
 *
 *                       http://api.ariba.com/myService/v1/requisitions/123/actions/approve
 *
 * ```ts
 *  let r: Resource
 *
 *        r
 *        .do('approve')
 *        .resource(Requisition)
 *        .withId('123')
 *        .asEntity<Requisition>((r: Requisition) => receivedR = r);
 *
 *
 * ```
 *
 * To make it easily extensible they are 3 main pieces
 *  - Resource: This class just put together abstract structure URLSegment
 *  - URLSegments: More like AST style to assemble the URL
 *  - builder: that read this AST to assemble the URL
 *
 *
 * Later on we might want to expose builder as a provider and you can have your own implementation
 *
 *
 *
 *
 */
@Injectable()
export class Resource {
  /**
   * RestUrlGroup aggregates UrlSegments
   *
   */
  private _urlGroup: RestUrlGroup;

  /**
   * Once all URL are assembled the builder returns final URL to be used for the HttpClient
   */
  private _urlBuilder: DefaultRestBuilder;

  /**
   * Cached url, so we dont have to assemble this everytime somebody calls url
   */
  private _url: string;


  constructor(private http: HttpClient, private appConfig: AppConfig) {
  }

  /**
   * Identifies GET operation
   *
   */
  load(): Resource {
    this.init();

    this.urlGroup.push(new ActionSegment(RestAction.Load));
    return this;
  }


  /**
   * Identifies PUT or POST operation. Depending on the object. If the object has already
   * populated its identifier, then we use PUT, otherwise POST
   *
   */
  save(): Resource {
    this.init();

    this.urlGroup.push(new ActionSegment(RestAction.Save));
    return this;
  }


  /**
   * Identifies interaction. For this we use POST
   *
   */
  do(action: string): Resource {
    this.init();

    this.urlGroup.push(new ActionSegment(RestAction.Do, action));
    return this;
  }


  /**
   *
   * TODO: Since query API is not yet implemented on the server side => TBD
   *
   * There where should be able to accepts individual query grammar. Similar style like rxjs
   * operators.
   *
   *  e.g.: Resource.prototype.contains = ....
   *        Resource.prototype.eq = ....
   *
   * You should be able to add dynamically let;s call it QuerySpecification
   *
   *      res
   *      .query()
   *      .resource(Requsition)
   *      .where( contains<string>(reqEntity.title(), '*asdf*' )
   *
   *  so it could look like something like:
   *
   *
   *  contains<T>(title: string, value: T): T
   *
   *  But since all these Specification would have a way to translate this key|value to the
   *  query so the where, would just list all the specification to bulid
   *  the query
   *
   *
   */
  query(): Resource {
    this.init();

    throw new Error('Not implemented');
  }

  where(): Resource {
    this.init();
    throw new Error('Not implemented');
  }


  /**
   *
   * Identifies ResourceSegment with specific type that must be either Entity or Value
   *
   */
  resource<T extends Entity | Value>(type: Type<T>): Resource {
    this.urlGroup.push(new ResourceSegment(type));
    return this;
  }

  /**
   * Identifier IdentifierSegment
   *
   */
  withId(identifier: string): Resource {
    this.urlGroup.push(new IdentifierSegment(identifier));
    return this;
  }

  /**
   * When we are saving data this method is used to insert a payload to the ActionSegment
   *
   */
  withData<T extends Entity | Value>(data: T): Resource {
    let urlSegment = this.urlGroup.lookup(RestSegmentType.Action);
    let isSave = (<ActionSegment>urlSegment).actionType === RestAction.Save;

    assert(isSave, 'withData can be used with SAVE operation only!');

    (<ActionSegment>urlSegment).data = data;
    return this;
  }


  /**
   * OF is just a syntactic suggar for better readability and to easier work with sub resources.
   * using OF we are able to tell that some resource belongs to other resource
   *
   */
  get of(): Resource {
    this.urlGroup.push(new OfParentSegment());
    return this;
  }


  /**
   *
   * Once tell what you want this is the last call you want to make to return resources as actual
   * Entities or Values.
   *
   * Todo: Maybe rename a method name as we can return both Entity and Value.
   *
   * You have also option to insert HttpOption
   *
   */
  asEntity<T extends Entity | Value>(subscriber: (res: T | T[]) => void,
                                     options: {
                                       headers?: HttpHeaders,
                                       observe: 'body'
                                       params?: HttpParams,
                                       reportProgress?: boolean,
                                       responseType?: 'json',
                                       withCredentials?: boolean,
                                     } = {observe: 'body'}): Subscription {
    let segment: ActionSegment = <ActionSegment> this.urlGroup.lookup(RestSegmentType.Action);
    assert(isPresent(segment), 'Missing Http method. Not sure how to handle this!');

    let observable: Observable<any>;

    let actionType: RestAction = segment.value;
    switch (actionType) {
      case RestAction.Load:
        observable = this.http.get<Response<T | T[]>>(this.url, options);
        break;

      case RestAction.Do:
        observable = this.http.post<Response<T | T[]>>(this.url, {}, options);
        break;

      case RestAction.Save:
        // we dont have right now other usecase subcontext resource will be always some
        // array
        if (isEntity(segment.data)) {
          if (isBlank((<Entity>segment.data).identity())) {
            observable = this.http.post<Response<T | T[]>>(this.url, segment.data,
              options);
          } else {
            observable = this.http.put<Response<T | T[]>>(this.url, segment.data,
              options);
          }
        } else if (isValue(segment.data)) {
          // we expect value will be always pushed
          observable = this.http.put<Response<T | T[]>>(this.url, segment.data, options);
        }
        break;
    }


    return observable.pipe(map<Response<T | T[]>, T | T[]>(res => this.convertToComposite(res,
      true, false))).subscribe(subscriber);
  }


  asHttpResponse<T extends Entity |
    Value>(subscriber: (res: HttpResponse<Response<T | T[]>> | HttpProgressEvent) => void,
           error?: (error: HttpErrorResponse) => void,
           options: {
             headers?: HttpHeaders, observe: 'response',
             params?: HttpParams, reportProgress?: boolean,
             responseType?: 'json', withCredentials?: boolean
           } = {observe: 'response'}): Subscription {

    let segment: ActionSegment = <ActionSegment> this.urlGroup.lookup(RestSegmentType.Action);
    assert(isPresent(segment), 'Missing Http method. Not sure how to handle this!');

    let observable: Observable<any>;

    let actionType: RestAction = segment.value;
    switch (actionType) {
      case RestAction.Load:
        observable = this.http.get<Response<T | T[]>>(this.url, options);
        break;

      case RestAction.Do:
        observable = this.http.post<Response<T | T[]>>(this.url, {}, options);
        break;

      case RestAction.Save:
        // we dont have right now other usecase subcontext resource will be always some
        // array
        if (isEntity(segment.data)) {
          if (isBlank((<Entity>segment.data).identity())) {
            observable = this.http.post<Response<T | T[]>>(this.url, segment.data,
              options);
          } else {
            observable = this.http.put<Response<T | T[]>>(this.url, segment.data,
              options);
          }
        } else if (isValue(segment.data)) {
          // we expect value will be always pushed
          observable = this.http.put<Response<T | T[]>>(this.url, segment.data, options);
        }
        break;
    }

    const hasProgress = options.reportProgress || false;
    return observable.pipe(
      map(res => this.convertToComposite(res, false, hasProgress)))
      .subscribe(subscriber, error);
  }


  /**
   *
   * Return assebled URL AST -> string
   *
   */
  get url(): string {
    if (isBlank(this._url)) {
      let isMocked = this.appConfig.getBoolean(AppConfig.ConnectionUseMockServer);

      this._url = this._urlBuilder.assembleUrl(isMocked);
    }
    return this._url;
  }


  /**
   * private
   *
   */
  get urlGroup(): RestUrlGroup {
    return this._urlGroup;
  }

  /**
   * private
   *
   */
  get urlBuilder(): DefaultRestBuilder {
    return this._urlBuilder;
  }

  /**
   * private
   *
   */
  private init(): void {
    this._urlGroup = new RestUrlGroup();
    this._urlBuilder = new DefaultRestBuilder(this._urlGroup);
    this._url = null;


    this.urlGroup.push(new HostSegment(this.appConfig.getRestApiHost()));
    this.urlGroup.push(new ContextSegment(this.appConfig.getRestApiContext()));
  }


  /**
   * Used inside .map to map JSON response or HttpResponse.body to actual type
   *
   */
  private convertToComposite<T extends Entity | Value>(res: Response<T | T[]> |
                                                         HttpResponse<Response<T | T[]>>,
                                                       isComposite: boolean,
                                                       hasProgress: boolean): any {
    if (hasProgress) {
      return res;
    }
    // unsorted segments will have have our target resource as first one
    let sgm: ResourceSegment = <ResourceSegment>this.urlGroup.lookup(RestSegmentType.Resource);

    if (isComposite) {
      return this.deserialize((<Response<T>>res).payload, sgm.value);

    } else {
      let httpRes = <HttpResponse<Response<T>>>res;
      let myResp: Response<T> = {
        payload: this.deserialize(httpRes.body.payload, sgm.value)
      };
      return httpRes.clone({body: myResp});
    }
  }


  serialize<T>(data: T): string {
    return JSON.stringify(data);
  }

  /**
   *
   * Converts JSON object to actual Type. We don't care about primitive types as we dont have to
   * do anything with them. We do instantiate objects or complex types only.
   *
   *
   */
  deserialize(json: any, clazz: Type<any>): any {
    if (isArray(json)) {
      let instances = [];
      for (let item in json) {
        instances.push(this.deserialize(json[item], clazz));
      }
      return instances;
    } else {
      let instance;
      if (clazz === String) {
        instance = json.toString();
      } else if (clazz === Number) {
        instance = json;
      } else if (clazz === Boolean) {
        instance = json;
      } else {
        instance = new clazz();
        let types = instance.getTypes();

        for (let prop in json) {
          if (!json.hasOwnProperty(prop)) {
            continue;
          }

          if (isPresent(types[prop]) && isPresent(json[prop]) && types[prop] !== Date) {
            instance[prop] = this.deserialize(json[prop], types[prop]);

          } else if (isDate(types[prop])) {
            instance[prop] = new types[prop](json[prop]);

          } else {
            instance[prop] = json[prop];
          }

          // else if (isString(json[prop]) && isEntity(instance)
          //     && prop === (<Entity>instance).identity()) {
          //
          //     const idString = (<Entity>instance).identity();
          //     (<any>instance)[idString] = <string>json[prop];
          //
          // }


        }
      }

      return instance;
    }
  }
}




