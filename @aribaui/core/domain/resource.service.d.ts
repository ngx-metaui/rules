import { Type } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { Entity, Value } from './domain-model';
import { AppConfig } from '../config/app-config';
import { Subscription } from 'rxjs';
import { DefaultRestBuilder } from './url/builder';
import { RestUrlGroup } from './url/url-group';
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
export declare class Resource {
    private http;
    private appConfig;
    /**
     * RestUrlGroup aggregates UrlSegments
     *
     */
    private _urlGroup;
    /**
     * Once all URL are assembled the builder returns final URL to be used for the HttpClient
     */
    private _urlBuilder;
    /**
     * Cached url, so we dont have to assemble this everytime somebody calls url
     */
    private _url;
    constructor(http: HttpClient, appConfig: AppConfig);
    /**
     * Identifies GET operation
     *
     */
    load(): Resource;
    /**
     * Identifies PUT or POST operation. Depending on the object. If the object has already
     * populated its identifier, then we use PUT, otherwise POST
     *
     */
    save(): Resource;
    /**
     * Identifies interaction. For this we use POST
     *
     */
    do(action: string): Resource;
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
    query(): Resource;
    where(): Resource;
    /**
     *
     * Identifies ResourceSegment with specific type that must be either Entity or Value
     *
     */
    resource<T extends Entity | Value>(type: Type<T>): Resource;
    /**
     * Identifier IdentifierSegment
     *
     */
    withId(identifier: string): Resource;
    /**
     * When we are saving data this method is used to insert a payload to the ActionSegment
     *
     */
    withData<T extends Entity | Value>(data: T): Resource;
    /**
     * OF is just a syntactic suggar for better readability and to easier work with sub resources.
     * using OF we are able to tell that some resource belongs to other resource
     *
     */
    readonly of: Resource;
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
    asEntity<T extends Entity | Value>(subscriber: (res: T | T[]) => void, options?: {
        headers?: HttpHeaders;
        observe: 'body';
        params?: HttpParams;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Subscription;
    asHttpResponse<T extends Entity | Value>(subscriber: (res: HttpResponse<Response<T | T[]>> | HttpProgressEvent) => void, error?: (error: HttpErrorResponse) => void, options?: {
        headers?: HttpHeaders;
        observe: 'response';
        params?: HttpParams;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Subscription;
    /**
     *
     * Return assebled URL AST -> string
     *
     */
    readonly url: string;
    /**
     * private
     *
     */
    readonly urlGroup: RestUrlGroup;
    /**
     * private
     *
     */
    readonly urlBuilder: DefaultRestBuilder;
    /**
     * private
     *
     */
    private init();
    /**
     * Used inside .map to map JSON response or HttpResponse.body to actual type
     *
     */
    private convertToComposite<T>(res, isComposite, hasProgress);
    serialize<T>(data: T): string;
    /**
     *
     * Converts JSON object to actual Type. We don't care about primitive types as we dont have to
     * do anything with them. We do instantiate objects or complex types only.
     *
     *
     */
    deserialize(json: any, clazz: Type<any>): any;
}
