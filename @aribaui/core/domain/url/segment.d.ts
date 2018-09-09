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
import { Type } from '@angular/core';
export declare enum RestSegmentType {
    Host = 0,
    Context = 1,
    Action = 2,
    Resource = 3,
    Identifier = 4,
    OfParent = 5,
}
export declare enum RestAction {
    Load = 0,
    Query = 1,
    Save = 2,
    Do = 3,
}
/**
 * Set of AST like classes to keep the fluent API grammar in the abstract format to give developers
 * changes to provide their own implementation
 *
 * Todo: Expose Builder as a service
 *
 */
export declare abstract class UrlSegment {
    type: RestSegmentType;
    value: any;
    params: Map<string, string>;
    rank: number;
    constructor(type: RestSegmentType, value?: any, params?: Map<string, string>, rank?: number);
    assertSegment(prevSegment: RestSegmentType): void;
    assertMsg(): string;
}
export declare class HostSegment extends UrlSegment {
    value: any;
    params: Map<string, string>;
    constructor(value: any, params?: Map<string, string>);
    assertSegment(prevSegment: RestSegmentType): void;
    assertMsg(): string;
}
export declare class ContextSegment extends UrlSegment {
    value: any;
    params: Map<string, string>;
    constructor(value: any, params?: Map<string, string>);
    assertSegment(prevSegment: RestSegmentType): void;
    assertMsg(): string;
}
export declare class ActionSegment extends UrlSegment {
    action: RestAction;
    data: any;
    params: Map<string, string>;
    actionType: RestAction;
    constructor(action: RestAction, data?: any, params?: Map<string, string>);
    assertSegment(prevSegment: RestSegmentType): void;
    assertMsg(): string;
}
export declare class ResourceSegment extends UrlSegment {
    value: Type<any>;
    params: Map<string, string>;
    resourceName: string;
    constructor(value: Type<any>, params?: Map<string, string>);
    assertSegment(prevSegment: RestSegmentType): void;
    assertMsg(): string;
}
export declare class IdentifierSegment extends UrlSegment {
    value: any;
    params: Map<string, string>;
    constructor(value: any, params?: Map<string, string>);
    assertSegment(prevSegment: RestSegmentType): void;
    assertMsg(): string;
}
export declare class OfParentSegment extends UrlSegment {
    constructor();
    assertSegment(prevSegment: RestSegmentType): void;
    assertMsg(): string;
}
