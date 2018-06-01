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
import {Type} from '@angular/core';
import {assert, objectToName} from '../../utils/lang';

export enum RestSegmentType
{
    Host,
    Context,
    Action,
    Resource,
    Identifier,
    OfParent
}


export enum RestAction
{
    Load,
    Query,
    Save,
    Do
}


/**
 * Set of AST like classes to keep the fluent API grammar in the abstract format to give developers
 * changes to provide their own implementation
 *
 * Todo: Expose Builder as a service
 *
 */

export abstract class UrlSegment
{
    constructor(public type: RestSegmentType, public value?: any,
                public params?: Map<string, string>, public rank: number = -1)
    {

    }


    assertSegment(prevSegment: RestSegmentType): void
    {
    }

    assertMsg(): string
    {
        return 'Wrong Rest Segment order';
    }
}


export class HostSegment extends UrlSegment
{

    constructor(public value: any, public params?: Map<string, string>)
    {
        super(RestSegmentType.Host, value, params, 5);
    }


    assertSegment(prevSegment: RestSegmentType): void
    {
        assert(prevSegment == null, this.assertMsg());
    }


    assertMsg(): string
    {
        return `${super.assertMsg()}. . Host segment must be first!`;
    }
}


export class ContextSegment extends UrlSegment
{

    constructor(public value: any, public params?: Map<string, string>)
    {
        super(RestSegmentType.Context, value, params, 10);
    }


    assertSegment(prevSegment: RestSegmentType): void
    {
        assert(prevSegment === RestSegmentType.Host, this.assertMsg());
    }


    assertMsg(): string
    {
        return `${super.assertMsg()}. . Context segment must follow Host!`;
    }
}


export class ActionSegment extends UrlSegment
{
    actionType: RestAction;

    constructor(public action: RestAction, public data?: any, public params?: Map<string, string>)
    {
        super(RestSegmentType.Action, action, params, 0);

        // save it to local property for easier comparision
        this.actionType = action;
    }


    assertSegment(prevSegment: RestSegmentType): void
    {
        assert(prevSegment === RestSegmentType.Context, this.assertMsg());
    }


    assertMsg(): string
    {
        return `${super.assertMsg()}. . Action must follow Context segment!`;
    }
}


export class ResourceSegment extends UrlSegment
{

    resourceName: string;

    constructor(public value: Type<any>, public params?: Map<string, string>)
    {
        super(RestSegmentType.Resource, value, params, 15);

        this.resourceName = `${objectToName(this.value).toLowerCase()}s`;
    }


    assertSegment(prevSegment: RestSegmentType): void
    {
        assert((prevSegment === RestSegmentType.Action || prevSegment === RestSegmentType.OfParent),
            this.assertMsg());
    }


    assertMsg(): string
    {
        return `${super.assertMsg()}. . Resource must follow either Action or Of!`;
    }
}


export class IdentifierSegment extends UrlSegment
{

    constructor(public value: any, public params?: Map<string, string>)
    {
        super(RestSegmentType.Identifier, value, params, 20);
    }


    assertSegment(prevSegment: RestSegmentType): void
    {
        assert(prevSegment === RestSegmentType.Resource, this.assertMsg());
    }

    assertMsg(): string
    {
        return `${super.assertMsg()}. . Identifier must follow Resource!`;
    }
}


export class OfParentSegment extends UrlSegment
{

    constructor()
    {
        super(RestSegmentType.OfParent);
        this.rank = 2;
    }


    assertSegment(prevSegment: RestSegmentType): void
    {
        assert(prevSegment === RestSegmentType.Resource ||
            prevSegment === RestSegmentType.Identifier,
            this.assertMsg());
    }

    assertMsg(): string
    {
        return `${super.assertMsg()}. . Of must follow Resource!`;
    }
}

