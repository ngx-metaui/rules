/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isEntity, isValue } from './domain-model';
import { AppConfig } from '../config/app-config';
import { ActionSegment, ContextSegment, HostSegment, IdentifierSegment, OfParentSegment, ResourceSegment, RestAction, RestSegmentType } from './url/segment';
import { DefaultRestBuilder } from './url/builder';
import { RestUrlGroup } from './url/url-group';
import { assert, isArray, isBlank, isDate, isPresent } from '../utils/lang';
/**
 * Response is the generic wrapper interface encapsulating a response from the micro service.
 * Currently we have only body field, but later on we need to extend it for different notifications,
 * errors, paging information and much more.
 *
 *
 *
 * @record
 * @template T
 */
export function Response() { }
function Response_tsickle_Closure_declarations() {
    /** @type {?} */
    Response.prototype.payload;
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
export class Resource {
    /**
     * @param {?} http
     * @param {?} appConfig
     */
    constructor(http, appConfig) {
        this.http = http;
        this.appConfig = appConfig;
    }
    /**
     * Identifies GET operation
     *
     * @return {?}
     */
    load() {
        this.init();
        this.urlGroup.push(new ActionSegment(RestAction.Load));
        return this;
    }
    /**
     * Identifies PUT or POST operation. Depending on the object. If the object has already
     * populated its identifier, then we use PUT, otherwise POST
     *
     * @return {?}
     */
    save() {
        this.init();
        this.urlGroup.push(new ActionSegment(RestAction.Save));
        return this;
    }
    /**
     * Identifies interaction. For this we use POST
     *
     * @param {?} action
     * @return {?}
     */
    do(action) {
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
     * @return {?}
     */
    query() {
        this.init();
        throw new Error('Not implemented');
    }
    /**
     * @return {?}
     */
    where() {
        this.init();
        throw new Error('Not implemented');
    }
    /**
     *
     * Identifies ResourceSegment with specific type that must be either Entity or Value
     *
     * @template T
     * @param {?} type
     * @return {?}
     */
    resource(type) {
        this.urlGroup.push(new ResourceSegment(type));
        return this;
    }
    /**
     * Identifier IdentifierSegment
     *
     * @param {?} identifier
     * @return {?}
     */
    withId(identifier) {
        this.urlGroup.push(new IdentifierSegment(identifier));
        return this;
    }
    /**
     * When we are saving data this method is used to insert a payload to the ActionSegment
     *
     * @template T
     * @param {?} data
     * @return {?}
     */
    withData(data) {
        let /** @type {?} */ urlSegment = this.urlGroup.lookup(RestSegmentType.Action);
        let /** @type {?} */ isSave = (/** @type {?} */ (urlSegment)).actionType === RestAction.Save;
        assert(isSave, 'withData can be used with SAVE operation only!');
        (/** @type {?} */ (urlSegment)).data = data;
        return this;
    }
    /**
     * OF is just a syntactic suggar for better readability and to easier work with sub resources.
     * using OF we are able to tell that some resource belongs to other resource
     *
     * @return {?}
     */
    get of() {
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
     * @template T
     * @param {?} subscriber
     * @param {?=} options
     * @return {?}
     */
    asEntity(subscriber, options = { observe: 'body' }) {
        let /** @type {?} */ segment = /** @type {?} */ (this.urlGroup.lookup(RestSegmentType.Action));
        assert(isPresent(segment), 'Missing Http method. Not sure how to handle this!');
        let /** @type {?} */ observable;
        let /** @type {?} */ actionType = segment.value;
        switch (actionType) {
            case RestAction.Load:
                observable = this.http.get(this.url, options);
                break;
            case RestAction.Do:
                observable = this.http.post(this.url, {}, options);
                break;
            case RestAction.Save:
                // we dont have right now other usecase subcontext resource will be always some
                // array
                if (isEntity(segment.data)) {
                    if (isBlank((/** @type {?} */ (segment.data)).identity())) {
                        observable = this.http.post(this.url, segment.data, options);
                    }
                    else {
                        observable = this.http.put(this.url, segment.data, options);
                    }
                }
                else if (isValue(segment.data)) {
                    // we expect value will be always pushed
                    observable = this.http.put(this.url, segment.data, options);
                }
                break;
        }
        return observable.pipe(map(res => this.convertToComposite(res, true, false))).subscribe(subscriber);
    }
    /**
     * @template T
     * @param {?} subscriber
     * @param {?=} error
     * @param {?=} options
     * @return {?}
     */
    asHttpResponse(subscriber, error, options = { observe: 'response' }) {
        let /** @type {?} */ segment = /** @type {?} */ (this.urlGroup.lookup(RestSegmentType.Action));
        assert(isPresent(segment), 'Missing Http method. Not sure how to handle this!');
        let /** @type {?} */ observable;
        let /** @type {?} */ actionType = segment.value;
        switch (actionType) {
            case RestAction.Load:
                observable = this.http.get(this.url, options);
                break;
            case RestAction.Do:
                observable = this.http.post(this.url, {}, options);
                break;
            case RestAction.Save:
                // we dont have right now other usecase subcontext resource will be always some
                // array
                if (isEntity(segment.data)) {
                    if (isBlank((/** @type {?} */ (segment.data)).identity())) {
                        observable = this.http.post(this.url, segment.data, options);
                    }
                    else {
                        observable = this.http.put(this.url, segment.data, options);
                    }
                }
                else if (isValue(segment.data)) {
                    // we expect value will be always pushed
                    observable = this.http.put(this.url, segment.data, options);
                }
                break;
        }
        const /** @type {?} */ hasProgress = options.reportProgress || false;
        return observable.pipe(map(res => this.convertToComposite(res, false, hasProgress)))
            .subscribe(subscriber, error);
    }
    /**
     *
     * Return assebled URL AST -> string
     *
     * @return {?}
     */
    get url() {
        if (isBlank(this._url)) {
            let /** @type {?} */ isMocked = this.appConfig.getBoolean(AppConfig.ConnectionUseMockServer);
            this._url = this._urlBuilder.assembleUrl(isMocked);
        }
        return this._url;
    }
    /**
     * private
     *
     * @return {?}
     */
    get urlGroup() {
        return this._urlGroup;
    }
    /**
     * private
     *
     * @return {?}
     */
    get urlBuilder() {
        return this._urlBuilder;
    }
    /**
     * private
     *
     * @return {?}
     */
    init() {
        this._urlGroup = new RestUrlGroup();
        this._urlBuilder = new DefaultRestBuilder(this._urlGroup);
        this._url = null;
        this.urlGroup.push(new HostSegment(this.appConfig.getRestApiHost()));
        this.urlGroup.push(new ContextSegment(this.appConfig.getRestApiContext()));
    }
    /**
     * Used inside .map to map JSON response or HttpResponse.body to actual type
     *
     * @template T
     * @param {?} res
     * @param {?} isComposite
     * @param {?} hasProgress
     * @return {?}
     */
    convertToComposite(res, isComposite, hasProgress) {
        if (hasProgress) {
            return res;
        }
        // unsorted segments will have have our target resource as first one
        let /** @type {?} */ sgm = /** @type {?} */ (this.urlGroup.lookup(RestSegmentType.Resource));
        if (isComposite) {
            return this.deserialize((/** @type {?} */ (res)).payload, sgm.value);
        }
        else {
            let /** @type {?} */ httpRes = /** @type {?} */ (res);
            let /** @type {?} */ myResp = {
                payload: this.deserialize(httpRes.body.payload, sgm.value)
            };
            return httpRes.clone({ body: myResp });
        }
    }
    /**
     * @template T
     * @param {?} data
     * @return {?}
     */
    serialize(data) {
        return JSON.stringify(data);
    }
    /**
     *
     * Converts JSON object to actual Type. We don't care about primitive types as we dont have to
     * do anything with them. We do instantiate objects or complex types only.
     *
     *
     * @param {?} json
     * @param {?} clazz
     * @return {?}
     */
    deserialize(json, clazz) {
        if (isArray(json)) {
            let /** @type {?} */ instances = [];
            for (let /** @type {?} */ item in json) {
                instances.push(this.deserialize(json[item], clazz));
            }
            return instances;
        }
        else {
            let /** @type {?} */ instance;
            if (clazz === String) {
                instance = json.toString();
            }
            else if (clazz === Number) {
                instance = json;
            }
            else if (clazz === Boolean) {
                instance = json;
            }
            else {
                instance = new clazz();
                let /** @type {?} */ types = instance.getTypes();
                for (let /** @type {?} */ prop in json) {
                    if (!json.hasOwnProperty(prop)) {
                        continue;
                    }
                    if (isPresent(types[prop]) && isPresent(json[prop]) && types[prop] !== Date) {
                        instance[prop] = this.deserialize(json[prop], types[prop]);
                    }
                    else if (isDate(types[prop])) {
                        instance[prop] = new types[prop](json[prop]);
                    }
                    else {
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
Resource.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Resource.ctorParameters = () => [
    { type: HttpClient },
    { type: AppConfig }
];
function Resource_tsickle_Closure_declarations() {
    /**
     * RestUrlGroup aggregates UrlSegments
     *
     * @type {?}
     */
    Resource.prototype._urlGroup;
    /**
     * Once all URL are assembled the builder returns final URL to be used for the HttpClient
     * @type {?}
     */
    Resource.prototype._urlBuilder;
    /**
     * Cached url, so we dont have to assemble this everytime somebody calls url
     * @type {?}
     */
    Resource.prototype._url;
    /** @type {?} */
    Resource.prototype.http;
    /** @type {?} */
    Resource.prototype.appConfig;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvcmUvIiwic291cmNlcyI6WyJkb21haW4vcmVzb3VyY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRW5DLE9BQU8sRUFBQyxVQUFVLEVBQU8sTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUNILFVBQVUsRUFNYixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBUyxRQUFRLEVBQUUsT0FBTyxFQUFRLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFDSCxhQUFhLEVBQ2IsY0FBYyxFQUNkLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsZUFBZSxFQUNmLGVBQWUsRUFDZixVQUFVLEVBQ1YsZUFBZSxFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlIMUUsTUFBTTs7Ozs7SUFrQkYsWUFBb0IsSUFBZ0IsRUFBVSxTQUFvQjtRQUE5QyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztLQUNqRTs7Ozs7O0lBTUQsSUFBSTtRQUNB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c2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5cblxuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtJbmplY3RhYmxlLCBUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgSHR0cENsaWVudCxcbiAgICBIdHRwRXJyb3JSZXNwb25zZSxcbiAgICBIdHRwSGVhZGVycyxcbiAgICBIdHRwUGFyYW1zLFxuICAgIEh0dHBQcm9ncmVzc0V2ZW50LFxuICAgIEh0dHBSZXNwb25zZVxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0VudGl0eSwgaXNFbnRpdHksIGlzVmFsdWUsIFZhbHVlfSBmcm9tICcuL2RvbWFpbi1tb2RlbCc7XG5pbXBvcnQge0FwcENvbmZpZ30gZnJvbSAnLi4vY29uZmlnL2FwcC1jb25maWcnO1xuaW1wb3J0IHtcbiAgICBBY3Rpb25TZWdtZW50LFxuICAgIENvbnRleHRTZWdtZW50LFxuICAgIEhvc3RTZWdtZW50LFxuICAgIElkZW50aWZpZXJTZWdtZW50LFxuICAgIE9mUGFyZW50U2VnbWVudCxcbiAgICBSZXNvdXJjZVNlZ21lbnQsXG4gICAgUmVzdEFjdGlvbixcbiAgICBSZXN0U2VnbWVudFR5cGVcbn0gZnJvbSAnLi91cmwvc2VnbWVudCc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0RlZmF1bHRSZXN0QnVpbGRlcn0gZnJvbSAnLi91cmwvYnVpbGRlcic7XG5pbXBvcnQge1Jlc3RVcmxHcm91cH0gZnJvbSAnLi91cmwvdXJsLWdyb3VwJztcbmltcG9ydCB7YXNzZXJ0LCBpc0FycmF5LCBpc0JsYW5rLCBpc0RhdGUsIGlzUHJlc2VudH0gZnJvbSAnLi4vdXRpbHMvbGFuZyc7XG5cblxuLyoqXG4gKiBSZXNwb25zZSBpcyB0aGUgZ2VuZXJpYyB3cmFwcGVyIGludGVyZmFjZSBlbmNhcHN1bGF0aW5nIGEgcmVzcG9uc2UgZnJvbSB0aGUgbWljcm8gc2VydmljZS5cbiAqIEN1cnJlbnRseSB3ZSBoYXZlIG9ubHkgYm9keSBmaWVsZCwgYnV0IGxhdGVyIG9uIHdlIG5lZWQgdG8gZXh0ZW5kIGl0IGZvciBkaWZmZXJlbnQgbm90aWZpY2F0aW9ucyxcbiAqIGVycm9ycywgcGFnaW5nIGluZm9ybWF0aW9uIGFuZCBtdWNoIG1vcmUuXG4gKlxuICpcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVzcG9uc2U8VD4ge1xuICAgIHBheWxvYWQ6IFQ7XG59XG5cblxuLyoqXG4gKlxuICogVG8gc2ltcGxpZnkgd29yayB3aXRoIGN1cnJlbnQgSHR0cENsaWVudCB0aGUgUmVzb3VyY2UgcHJvdmlkZXMgZmx1ZW50IEFQSSBvbiB0b3Agb2YgaXQuIFlvdSBkb250XG4gKiBhc3NlbWJsZSBVUkwgdHJhZGl0aW9uYWwgd2F5IHJhdGhlciBtb3JlIGZsdWVudCBhbmQgZnVuY3Rpb25hbCB3YXksIHdvcmtpbmcgd2l0aCByZWFsIGRhdGEgdHlwZXNcbiAqIHN1Y2ggYSBWYWx1ZSBhbmQgRW50aXR5LlxuICpcbiAqIEVudGl0eSBhbmQgVmFsdWUgYXJlIHR3byBtYWluIGtleSBpbnRlcmZhY2VzIHRoYXQgYWxsIGRvbWFpbiBvYmplY3RzIHNob3VsZCBpbmhlcml0IGZyb20gaWYgdGhleVxuICogd2FudCB0byBsZXZlcmFnZSB0aGlzIGZ1bmN0aW9uYWxpdHkuXG4gKlxuICogIyMjRXhhbXBsZVxuICpcbiAqIDEuICB0byBzaW1wbHkgYXNzZW1ibGUgZm9sbG93aW5nIFVSTCBodHRwOi8vYXBpLmFyaWJhLmNvbS9teVNlcnZpY2UvdjEvcmVxdWlzaXRpb25zLzEyMyBhbmRcbiAqICBhbmQgZmV0Y2ggUmVxdWlzaXRpb24gZGF0YTpcbiAqXG4gKiBgYGB0c1xuICogIGxldCByOiBSZXNvdXJjZVxuICpcbiAqICByLmxvYWQoKVxuICogICAucmVzb3VyY2UoUmVxdWlzaXRpb24pXG4gKiAgIC53aXRoSWQoJzEyMycpXG4gKiAgIC5hc0VudGl0eTxSZXF1aXNpdGlvbj4oKHI6IFJlcXVpc2l0aW9uKSA9PiByZWNlaXZlZFIgPSByKTtcbiAqXG4gKiBgYGBcbiAqIFlvdSB5b3UgY2FuIHNpbXBseSByZWFkIGl0OiBsb2FkIHJlc291cmNlIFJlcXVpc2l0aW9uIHdpdGggSUQgMTIzIGFuZCByZXR1cm4gdGhpcyBhcyBFbnRpdHlcbiAqXG4gKiAyLiBDdXJyZW50IGZsdWVudCBBUEkgYWxzbyBzdXBwb3J0IHBhcnRpYWwgdXBkYXRlcyBhbmQgc3ViY29udGV4dCByZXNvdXJjZVxuICogIHRvIGxvYWQgZGF0YSBmcm9tIHRoaXMgUkVTVCBBUEkgZW5kcG9pbnRcbiAqICAgICAgaHR0cDovL2FwaS5hcmliYS5jb20vbXlTZXJ2aWNlL3YxL3JlcXVpc2l0aW9ucy8xMjMvc3VwcGxpZXJzXG5cblxuICogYGBgdHNcbiAqICBsZXQgcjogUmVzb3VyY2VcbiAqXG4gKiAgci5sb2FkKClcbiAqICAgLnJlc291cmNlKFN1cHBsaWVyKVxuICogICAub2ZcbiAqICAgLnJlc291cmNlKFJlcXVpc2l0aW9uKVxuICogICAud2l0aElkKCcxMjMnKVxuICogICAuYXNFbnRpdHk8U3VwcGxpZXI+KChyOiAgU3VwcGxpZXJbXSkgPT4gcmVjZWl2ZWRSID0gcik7XG4gKlxuICogYGBgXG4gKlxuICogIFlvdSBjYW4gcmVhZCBhYm92ZTogTG9hZCBhbGwgZnJvbSByZXNvdXJjZSBTdXBwbGllciBvZiBSZXF1aXNpdGlvbiAob3Igc3VwcGxpZXIgYmVsb25ncyB0b1xuICogIFJlcXVpc2l0aW9uKSAgd2l0aCBJRCAxMjMgYW5kIHJldHVybiB0aGlzIGFzIEVudGl0eS5cbiAqXG4gKlxuICogMy4gVG8gc2F2ZSBkYXRhIHlvdSBmb2xsb3cgdGhlIHNhbWUgc3ludGF4XG4gKiAgICAgIFNhdmUgcmVxdWlzaXRpb24gc28gd2UgYXJlIFBVVHRpbmcgZGF0YSB0byBmb2xsb3dpbmcgVVJMXG4gKiAgICAgIGh0dHA6Ly9hcGkuYXJpYmEuY29tL215U2VydmljZS92MS9yZXF1aXNpdGlvbnMvMTIzXG4gKlxuICogYGBgdHNcbiAqICBsZXQgcjogUmVzb3VyY2VcbiAqXG4gKiAgICAgICAgICByXG4gKiAgICAgICAgLnNhdmUoKVxuICogICAgICAgIC5yZXNvdXJjZShSZXF1aXNpdGlvbilcbiAqICAgICAgICAud2l0aElkKCcxMjMnKVxuICogICAgICAgIC53aXRoRGF0YShwcilcbiAqICAgICAgICAuYXNFbnRpdHk8UmVxdWlzaXRpb24+KChyOiBSZXF1aXNpdGlvbikgPT4gcmVjZWl2ZWRSID0gcik7XG4gKlxuICpcbiAqIGBgYFxuICpcbiAqICBZb3UgY2FuIHJlYWQgYWJvdmU6IFNhdmUgcmVzb3VyY2UgUmVxdWlzaXRpb24gd2l0aCBJRCAxMjMgYW5kIHdpdGggRGF0YSAuLi4uIGFuZCByZXR1cm4gaXQgYXNcbiAqICBhIEVudGl0eVxuICpcbiAqXG4gKiAgNC4gQVBJIGNhbiBhbHNvIGZvciB5b3UgYXNzZW1ibGUgYW5kIGV4ZWN1dGUgYWN0aW9ucyBzb21ldGltZXMgY2FsbGVkIGludGVyYWN0aW9uLiBOb3QgYWxsIGlzXG4gKiAgYWJvdXQgQ1JVRC4gT3VyIGN1cnJlbnQgc3ludGF4IGZvciBhY3Rpb25zIGlzXG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgIGh0dHA6Ly9hcGkuYXJpYmEuY29tL215U2VydmljZS92MS9yZXF1aXNpdGlvbnMvMTIzL2FjdGlvbnMvYXBwcm92ZVxuICpcbiAqIGBgYHRzXG4gKiAgbGV0IHI6IFJlc291cmNlXG4gKlxuICogICAgICAgIHJcbiAqICAgICAgICAuZG8oJ2FwcHJvdmUnKVxuICogICAgICAgIC5yZXNvdXJjZShSZXF1aXNpdGlvbilcbiAqICAgICAgICAud2l0aElkKCcxMjMnKVxuICogICAgICAgIC5hc0VudGl0eTxSZXF1aXNpdGlvbj4oKHI6IFJlcXVpc2l0aW9uKSA9PiByZWNlaXZlZFIgPSByKTtcbiAqXG4gKlxuICogYGBgXG4gKlxuICogVG8gbWFrZSBpdCBlYXNpbHkgZXh0ZW5zaWJsZSB0aGV5IGFyZSAzIG1haW4gcGllY2VzXG4gKiAgLSBSZXNvdXJjZTogVGhpcyBjbGFzcyBqdXN0IHB1dCB0b2dldGhlciBhYnN0cmFjdCBzdHJ1Y3R1cmUgVVJMU2VnbWVudFxuICogIC0gVVJMU2VnbWVudHM6IE1vcmUgbGlrZSBBU1Qgc3R5bGUgdG8gYXNzZW1ibGUgdGhlIFVSTFxuICogIC0gYnVpbGRlcjogdGhhdCByZWFkIHRoaXMgQVNUIHRvIGFzc2VtYmxlIHRoZSBVUkxcbiAqXG4gKlxuICogTGF0ZXIgb24gd2UgbWlnaHQgd2FudCB0byBleHBvc2UgYnVpbGRlciBhcyBhIHByb3ZpZGVyIGFuZCB5b3UgY2FuIGhhdmUgeW91ciBvd24gaW1wbGVtZW50YXRpb25cbiAqXG4gKlxuICpcbiAqXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZSB7XG4gICAgLyoqXG4gICAgICogUmVzdFVybEdyb3VwIGFnZ3JlZ2F0ZXMgVXJsU2VnbWVudHNcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgX3VybEdyb3VwOiBSZXN0VXJsR3JvdXA7XG5cbiAgICAvKipcbiAgICAgKiBPbmNlIGFsbCBVUkwgYXJlIGFzc2VtYmxlZCB0aGUgYnVpbGRlciByZXR1cm5zIGZpbmFsIFVSTCB0byBiZSB1c2VkIGZvciB0aGUgSHR0cENsaWVudFxuICAgICAqL1xuICAgIHByaXZhdGUgX3VybEJ1aWxkZXI6IERlZmF1bHRSZXN0QnVpbGRlcjtcblxuICAgIC8qKlxuICAgICAqIENhY2hlZCB1cmwsIHNvIHdlIGRvbnQgaGF2ZSB0byBhc3NlbWJsZSB0aGlzIGV2ZXJ5dGltZSBzb21lYm9keSBjYWxscyB1cmxcbiAgICAgKi9cbiAgICBwcml2YXRlIF91cmw6IHN0cmluZztcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGFwcENvbmZpZzogQXBwQ29uZmlnKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllcyBHRVQgb3BlcmF0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBsb2FkKCk6IFJlc291cmNlIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG5cbiAgICAgICAgdGhpcy51cmxHcm91cC5wdXNoKG5ldyBBY3Rpb25TZWdtZW50KFJlc3RBY3Rpb24uTG9hZCkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIElkZW50aWZpZXMgUFVUIG9yIFBPU1Qgb3BlcmF0aW9uLiBEZXBlbmRpbmcgb24gdGhlIG9iamVjdC4gSWYgdGhlIG9iamVjdCBoYXMgYWxyZWFkeVxuICAgICAqIHBvcHVsYXRlZCBpdHMgaWRlbnRpZmllciwgdGhlbiB3ZSB1c2UgUFVULCBvdGhlcndpc2UgUE9TVFxuICAgICAqXG4gICAgICovXG4gICAgc2F2ZSgpOiBSZXNvdXJjZSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICAgIHRoaXMudXJsR3JvdXAucHVzaChuZXcgQWN0aW9uU2VnbWVudChSZXN0QWN0aW9uLlNhdmUpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVzIGludGVyYWN0aW9uLiBGb3IgdGhpcyB3ZSB1c2UgUE9TVFxuICAgICAqXG4gICAgICovXG4gICAgZG8oYWN0aW9uOiBzdHJpbmcpOiBSZXNvdXJjZSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICAgIHRoaXMudXJsR3JvdXAucHVzaChuZXcgQWN0aW9uU2VnbWVudChSZXN0QWN0aW9uLkRvLCBhY3Rpb24pKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRPRE86IFNpbmNlIHF1ZXJ5IEFQSSBpcyBub3QgeWV0IGltcGxlbWVudGVkIG9uIHRoZSBzZXJ2ZXIgc2lkZSA9PiBUQkRcbiAgICAgKlxuICAgICAqIFRoZXJlIHdoZXJlIHNob3VsZCBiZSBhYmxlIHRvIGFjY2VwdHMgaW5kaXZpZHVhbCBxdWVyeSBncmFtbWFyLiBTaW1pbGFyIHN0eWxlIGxpa2Ugcnhqc1xuICAgICAqIG9wZXJhdG9ycy5cbiAgICAgKlxuICAgICAqICBlLmcuOiBSZXNvdXJjZS5wcm90b3R5cGUuY29udGFpbnMgPSAuLi4uXG4gICAgICogICAgICAgIFJlc291cmNlLnByb3RvdHlwZS5lcSA9IC4uLi5cbiAgICAgKlxuICAgICAqIFlvdSBzaG91bGQgYmUgYWJsZSB0byBhZGQgZHluYW1pY2FsbHkgbGV0O3MgY2FsbCBpdCBRdWVyeVNwZWNpZmljYXRpb25cbiAgICAgKlxuICAgICAqICAgICAgcmVzXG4gICAgICogICAgICAucXVlcnkoKVxuICAgICAqICAgICAgLnJlc291cmNlKFJlcXVzaXRpb24pXG4gICAgICogICAgICAud2hlcmUoIGNvbnRhaW5zPHN0cmluZz4ocmVxRW50aXR5LnRpdGxlKCksICcqYXNkZionIClcbiAgICAgKlxuICAgICAqICBzbyBpdCBjb3VsZCBsb29rIGxpa2Ugc29tZXRoaW5nIGxpa2U6XG4gICAgICpcbiAgICAgKlxuICAgICAqICBjb250YWluczxUPih0aXRsZTogc3RyaW5nLCB2YWx1ZTogVCk6IFRcbiAgICAgKlxuICAgICAqICBCdXQgc2luY2UgYWxsIHRoZXNlIFNwZWNpZmljYXRpb24gd291bGQgaGF2ZSBhIHdheSB0byB0cmFuc2xhdGUgdGhpcyBrZXl8dmFsdWUgdG8gdGhlXG4gICAgICogIHF1ZXJ5IHNvIHRoZSB3aGVyZSwgd291bGQganVzdCBsaXN0IGFsbCB0aGUgc3BlY2lmaWNhdGlvbiB0byBidWxpZFxuICAgICAqICB0aGUgcXVlcnlcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgcXVlcnkoKTogUmVzb3VyY2Uge1xuICAgICAgICB0aGlzLmluaXQoKTtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICAgIH1cblxuICAgIHdoZXJlKCk6IFJlc291cmNlIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIElkZW50aWZpZXMgUmVzb3VyY2VTZWdtZW50IHdpdGggc3BlY2lmaWMgdHlwZSB0aGF0IG11c3QgYmUgZWl0aGVyIEVudGl0eSBvciBWYWx1ZVxuICAgICAqXG4gICAgICovXG4gICAgcmVzb3VyY2U8VCBleHRlbmRzIEVudGl0eSB8IFZhbHVlPih0eXBlOiBUeXBlPFQ+KTogUmVzb3VyY2Uge1xuICAgICAgICB0aGlzLnVybEdyb3VwLnB1c2gobmV3IFJlc291cmNlU2VnbWVudCh0eXBlKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElkZW50aWZpZXIgSWRlbnRpZmllclNlZ21lbnRcbiAgICAgKlxuICAgICAqL1xuICAgIHdpdGhJZChpZGVudGlmaWVyOiBzdHJpbmcpOiBSZXNvdXJjZSB7XG4gICAgICAgIHRoaXMudXJsR3JvdXAucHVzaChuZXcgSWRlbnRpZmllclNlZ21lbnQoaWRlbnRpZmllcikpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHdlIGFyZSBzYXZpbmcgZGF0YSB0aGlzIG1ldGhvZCBpcyB1c2VkIHRvIGluc2VydCBhIHBheWxvYWQgdG8gdGhlIEFjdGlvblNlZ21lbnRcbiAgICAgKlxuICAgICAqL1xuICAgIHdpdGhEYXRhPFQgZXh0ZW5kcyBFbnRpdHkgfCBWYWx1ZT4oZGF0YTogVCk6IFJlc291cmNlIHtcbiAgICAgICAgbGV0IHVybFNlZ21lbnQgPSB0aGlzLnVybEdyb3VwLmxvb2t1cChSZXN0U2VnbWVudFR5cGUuQWN0aW9uKTtcbiAgICAgICAgbGV0IGlzU2F2ZSA9ICg8QWN0aW9uU2VnbWVudD51cmxTZWdtZW50KS5hY3Rpb25UeXBlID09PSBSZXN0QWN0aW9uLlNhdmU7XG5cbiAgICAgICAgYXNzZXJ0KGlzU2F2ZSwgJ3dpdGhEYXRhIGNhbiBiZSB1c2VkIHdpdGggU0FWRSBvcGVyYXRpb24gb25seSEnKTtcblxuICAgICAgICAoPEFjdGlvblNlZ21lbnQ+dXJsU2VnbWVudCkuZGF0YSA9IGRhdGE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogT0YgaXMganVzdCBhIHN5bnRhY3RpYyBzdWdnYXIgZm9yIGJldHRlciByZWFkYWJpbGl0eSBhbmQgdG8gZWFzaWVyIHdvcmsgd2l0aCBzdWIgcmVzb3VyY2VzLlxuICAgICAqIHVzaW5nIE9GIHdlIGFyZSBhYmxlIHRvIHRlbGwgdGhhdCBzb21lIHJlc291cmNlIGJlbG9uZ3MgdG8gb3RoZXIgcmVzb3VyY2VcbiAgICAgKlxuICAgICAqL1xuICAgIGdldCBvZigpOiBSZXNvdXJjZSB7XG4gICAgICAgIHRoaXMudXJsR3JvdXAucHVzaChuZXcgT2ZQYXJlbnRTZWdtZW50KCkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogT25jZSB0ZWxsIHdoYXQgeW91IHdhbnQgdGhpcyBpcyB0aGUgbGFzdCBjYWxsIHlvdSB3YW50IHRvIG1ha2UgdG8gcmV0dXJuIHJlc291cmNlcyBhcyBhY3R1YWxcbiAgICAgKiBFbnRpdGllcyBvciBWYWx1ZXMuXG4gICAgICpcbiAgICAgKiBUb2RvOiBNYXliZSByZW5hbWUgYSBtZXRob2QgbmFtZSBhcyB3ZSBjYW4gcmV0dXJuIGJvdGggRW50aXR5IGFuZCBWYWx1ZS5cbiAgICAgKlxuICAgICAqIFlvdSBoYXZlIGFsc28gb3B0aW9uIHRvIGluc2VydCBIdHRwT3B0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBhc0VudGl0eTxUIGV4dGVuZHMgRW50aXR5IHwgVmFsdWU+KHN1YnNjcmliZXI6IChyZXM6IFQgfCBUW10pID0+IHZvaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVycz86IEh0dHBIZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmU6ICdib2R5J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcz86IEh0dHBQYXJhbXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZT86ICdqc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSA9IHtvYnNlcnZlOiAnYm9keSd9KTogU3Vic2NyaXB0aW9uIHtcbiAgICAgICAgbGV0IHNlZ21lbnQ6IEFjdGlvblNlZ21lbnQgPSA8QWN0aW9uU2VnbWVudD4gdGhpcy51cmxHcm91cC5sb29rdXAoUmVzdFNlZ21lbnRUeXBlLkFjdGlvbik7XG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQoc2VnbWVudCksICdNaXNzaW5nIEh0dHAgbWV0aG9kLiBOb3Qgc3VyZSBob3cgdG8gaGFuZGxlIHRoaXMhJyk7XG5cbiAgICAgICAgbGV0IG9ic2VydmFibGU6IE9ic2VydmFibGU8YW55PjtcblxuICAgICAgICBsZXQgYWN0aW9uVHlwZTogUmVzdEFjdGlvbiA9IHNlZ21lbnQudmFsdWU7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBSZXN0QWN0aW9uLkxvYWQ6XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5nZXQ8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBSZXN0QWN0aW9uLkRvOlxuICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHAucG9zdDxSZXNwb25zZTxUIHwgVFtdPj4odGhpcy51cmwsIHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBSZXN0QWN0aW9uLlNhdmU6XG4gICAgICAgICAgICAgICAgLy8gd2UgZG9udCBoYXZlIHJpZ2h0IG5vdyBvdGhlciB1c2VjYXNlIHN1YmNvbnRleHQgcmVzb3VyY2Ugd2lsbCBiZSBhbHdheXMgc29tZVxuICAgICAgICAgICAgICAgIC8vIGFycmF5XG4gICAgICAgICAgICAgICAgaWYgKGlzRW50aXR5KHNlZ21lbnQuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsoKDxFbnRpdHk+c2VnbWVudC5kYXRhKS5pZGVudGl0eSgpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wb3N0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwgc2VnbWVudC5kYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wdXQ8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCBzZWdtZW50LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzVmFsdWUoc2VnbWVudC5kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBleHBlY3QgdmFsdWUgd2lsbCBiZSBhbHdheXMgcHVzaGVkXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHAucHV0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwgc2VnbWVudC5kYXRhLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUobWFwPFJlc3BvbnNlPFQgfCBUW10+LCBUIHwgVFtdPihyZXMgPT4gdGhpcy5jb252ZXJ0VG9Db21wb3NpdGUocmVzLFxuICAgICAgICAgICAgdHJ1ZSwgZmFsc2UpKSkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH1cblxuXG4gICAgYXNIdHRwUmVzcG9uc2U8VCBleHRlbmRzIEVudGl0eSB8XG4gICAgICAgIFZhbHVlPihzdWJzY3JpYmVyOiAocmVzOiBIdHRwUmVzcG9uc2U8UmVzcG9uc2U8VCB8IFRbXT4+IHwgSHR0cFByb2dyZXNzRXZlbnQpID0+IHZvaWQsXG4gICAgICAgICAgICAgICBlcnJvcj86IChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHZvaWQsXG4gICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgaGVhZGVycz86IEh0dHBIZWFkZXJzLCBvYnNlcnZlOiAncmVzcG9uc2UnLFxuICAgICAgICAgICAgICAgICAgIHBhcmFtcz86IEh0dHBQYXJhbXMsIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbixcbiAgICAgICAgICAgICAgICAgICByZXNwb25zZVR5cGU/OiAnanNvbicsIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW5cbiAgICAgICAgICAgICAgIH0gPSB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pOiBTdWJzY3JpcHRpb24ge1xuXG4gICAgICAgIGxldCBzZWdtZW50OiBBY3Rpb25TZWdtZW50ID0gPEFjdGlvblNlZ21lbnQ+IHRoaXMudXJsR3JvdXAubG9va3VwKFJlc3RTZWdtZW50VHlwZS5BY3Rpb24pO1xuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KHNlZ21lbnQpLCAnTWlzc2luZyBIdHRwIG1ldGhvZC4gTm90IHN1cmUgaG93IHRvIGhhbmRsZSB0aGlzIScpO1xuXG4gICAgICAgIGxldCBvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT47XG5cbiAgICAgICAgbGV0IGFjdGlvblR5cGU6IFJlc3RBY3Rpb24gPSBzZWdtZW50LnZhbHVlO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvblR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgUmVzdEFjdGlvbi5Mb2FkOlxuICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHAuZ2V0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgUmVzdEFjdGlvbi5EbzpcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlID0gdGhpcy5odHRwLnBvc3Q8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCB7fSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgUmVzdEFjdGlvbi5TYXZlOlxuICAgICAgICAgICAgICAgIC8vIHdlIGRvbnQgaGF2ZSByaWdodCBub3cgb3RoZXIgdXNlY2FzZSBzdWJjb250ZXh0IHJlc291cmNlIHdpbGwgYmUgYWx3YXlzIHNvbWVcbiAgICAgICAgICAgICAgICAvLyBhcnJheVxuICAgICAgICAgICAgICAgIGlmIChpc0VudGl0eShzZWdtZW50LmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0JsYW5rKCg8RW50aXR5PnNlZ21lbnQuZGF0YSkuaWRlbnRpdHkoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHAucG9zdDxSZXNwb25zZTxUIHwgVFtdPj4odGhpcy51cmwsIHNlZ21lbnQuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHAucHV0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwgc2VnbWVudC5kYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1ZhbHVlKHNlZ21lbnQuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgZXhwZWN0IHZhbHVlIHdpbGwgYmUgYWx3YXlzIHB1c2hlZFxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlID0gdGhpcy5odHRwLnB1dDxSZXNwb25zZTxUIHwgVFtdPj4odGhpcy51cmwsIHNlZ21lbnQuZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaGFzUHJvZ3Jlc3MgPSBvcHRpb25zLnJlcG9ydFByb2dyZXNzIHx8IGZhbHNlO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5waXBlKFxuICAgICAgICAgICAgbWFwKHJlcyA9PiB0aGlzLmNvbnZlcnRUb0NvbXBvc2l0ZShyZXMsIGZhbHNlLCBoYXNQcm9ncmVzcykpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShzdWJzY3JpYmVyLCBlcnJvcik7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFJldHVybiBhc3NlYmxlZCBVUkwgQVNUIC0+IHN0cmluZ1xuICAgICAqXG4gICAgICovXG4gICAgZ2V0IHVybCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl91cmwpKSB7XG4gICAgICAgICAgICBsZXQgaXNNb2NrZWQgPSB0aGlzLmFwcENvbmZpZy5nZXRCb29sZWFuKEFwcENvbmZpZy5Db25uZWN0aW9uVXNlTW9ja1NlcnZlcik7XG5cbiAgICAgICAgICAgIHRoaXMuX3VybCA9IHRoaXMuX3VybEJ1aWxkZXIuYXNzZW1ibGVVcmwoaXNNb2NrZWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl91cmw7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBwcml2YXRlXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXQgdXJsR3JvdXAoKTogUmVzdFVybEdyb3VwIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VybEdyb3VwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHByaXZhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIGdldCB1cmxCdWlsZGVyKCk6IERlZmF1bHRSZXN0QnVpbGRlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl91cmxCdWlsZGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHByaXZhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdXJsR3JvdXAgPSBuZXcgUmVzdFVybEdyb3VwKCk7XG4gICAgICAgIHRoaXMuX3VybEJ1aWxkZXIgPSBuZXcgRGVmYXVsdFJlc3RCdWlsZGVyKHRoaXMuX3VybEdyb3VwKTtcbiAgICAgICAgdGhpcy5fdXJsID0gbnVsbDtcblxuXG4gICAgICAgIHRoaXMudXJsR3JvdXAucHVzaChuZXcgSG9zdFNlZ21lbnQodGhpcy5hcHBDb25maWcuZ2V0UmVzdEFwaUhvc3QoKSkpO1xuICAgICAgICB0aGlzLnVybEdyb3VwLnB1c2gobmV3IENvbnRleHRTZWdtZW50KHRoaXMuYXBwQ29uZmlnLmdldFJlc3RBcGlDb250ZXh0KCkpKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFVzZWQgaW5zaWRlIC5tYXAgdG8gbWFwIEpTT04gcmVzcG9uc2Ugb3IgSHR0cFJlc3BvbnNlLmJvZHkgdG8gYWN0dWFsIHR5cGVcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydFRvQ29tcG9zaXRlPFQgZXh0ZW5kcyBFbnRpdHkgfCBWYWx1ZT4ocmVzOiBSZXNwb25zZTxUIHwgVFtdPiB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSHR0cFJlc3BvbnNlPFJlc3BvbnNlPFQgfCBUW10+PixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcG9zaXRlOiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUHJvZ3Jlc3M6IGJvb2xlYW4pOiBhbnkge1xuICAgICAgICBpZiAoaGFzUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdW5zb3J0ZWQgc2VnbWVudHMgd2lsbCBoYXZlIGhhdmUgb3VyIHRhcmdldCByZXNvdXJjZSBhcyBmaXJzdCBvbmVcbiAgICAgICAgbGV0IHNnbTogUmVzb3VyY2VTZWdtZW50ID0gPFJlc291cmNlU2VnbWVudD50aGlzLnVybEdyb3VwLmxvb2t1cChSZXN0U2VnbWVudFR5cGUuUmVzb3VyY2UpO1xuXG4gICAgICAgIGlmIChpc0NvbXBvc2l0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVzZXJpYWxpemUoKDxSZXNwb25zZTxUPj5yZXMpLnBheWxvYWQsIHNnbS52YWx1ZSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBodHRwUmVzID0gPEh0dHBSZXNwb25zZTxSZXNwb25zZTxUPj4+cmVzO1xuICAgICAgICAgICAgbGV0IG15UmVzcDogUmVzcG9uc2U8VD4gPSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZDogdGhpcy5kZXNlcmlhbGl6ZShodHRwUmVzLmJvZHkucGF5bG9hZCwgc2dtLnZhbHVlKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBodHRwUmVzLmNsb25lKHtib2R5OiBteVJlc3B9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgc2VyaWFsaXplPFQ+KGRhdGE6IFQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDb252ZXJ0cyBKU09OIG9iamVjdCB0byBhY3R1YWwgVHlwZS4gV2UgZG9uJ3QgY2FyZSBhYm91dCBwcmltaXRpdmUgdHlwZXMgYXMgd2UgZG9udCBoYXZlIHRvXG4gICAgICogZG8gYW55dGhpbmcgd2l0aCB0aGVtLiBXZSBkbyBpbnN0YW50aWF0ZSBvYmplY3RzIG9yIGNvbXBsZXggdHlwZXMgb25seS5cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgZGVzZXJpYWxpemUoanNvbjogYW55LCBjbGF6ejogVHlwZTxhbnk+KTogYW55IHtcbiAgICAgICAgaWYgKGlzQXJyYXkoanNvbikpIHtcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gaW4ganNvbikge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlcy5wdXNoKHRoaXMuZGVzZXJpYWxpemUoanNvbltpdGVtXSwgY2xhenopKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgaW5zdGFuY2U7XG4gICAgICAgICAgICBpZiAoY2xhenogPT09IFN0cmluZykge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlID0ganNvbi50b1N0cmluZygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjbGF6eiA9PT0gTnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBqc29uO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjbGF6eiA9PT0gQm9vbGVhbikge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlID0ganNvbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBuZXcgY2xhenooKTtcbiAgICAgICAgICAgICAgICBsZXQgdHlwZXMgPSBpbnN0YW5jZS5nZXRUeXBlcygpO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBqc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghanNvbi5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNQcmVzZW50KHR5cGVzW3Byb3BdKSAmJiBpc1ByZXNlbnQoanNvbltwcm9wXSkgJiYgdHlwZXNbcHJvcF0gIT09IERhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlW3Byb3BdID0gdGhpcy5kZXNlcmlhbGl6ZShqc29uW3Byb3BdLCB0eXBlc1twcm9wXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc0RhdGUodHlwZXNbcHJvcF0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtwcm9wXSA9IG5ldyB0eXBlc1twcm9wXShqc29uW3Byb3BdKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VbcHJvcF0gPSBqc29uW3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZWxzZSBpZiAoaXNTdHJpbmcoanNvbltwcm9wXSkgJiYgaXNFbnRpdHkoaW5zdGFuY2UpXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAmJiBwcm9wID09PSAoPEVudGl0eT5pbnN0YW5jZSkuaWRlbnRpdHkoKSkge1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc3QgaWRTdHJpbmcgPSAoPEVudGl0eT5pbnN0YW5jZSkuaWRlbnRpdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICg8YW55Pmluc3RhbmNlKVtpZFN0cmluZ10gPSA8c3RyaW5nPmpzb25bcHJvcF07XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cblxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG5cbiJdfQ==