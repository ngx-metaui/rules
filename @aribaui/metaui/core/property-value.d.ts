/**
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
 * Based on original work: MetaUI: Craig Federighi (2008)
 *
 */
import { FieldPath } from '@aribaui/core';
import { PropertyMap, PropertyMapAwaking, PropertyMerger } from './meta';
import { Context } from './context';
export declare abstract class DynamicPropertyValue {
    evaluate(context: Context): any;
    bind(context: any): void;
}
export interface DynamicSettablePropertyValue {
    settable: boolean;
    evaluateSet(context: Context, value: any): void;
}
/**
 * ;marker; interface for DynamicPropertyValues that depend only on their match context and
 * therefore can be computed and cached statically in the Context Activation tree
 */
export declare class StaticallyResolvable extends DynamicPropertyValue {
}
export declare class StaticDynamicWrapper extends StaticallyResolvable implements PropertyMapAwaking {
    private _orig;
    private _cached;
    propertyAwaking: boolean;
    constructor(_orig: StaticallyResolvable);
    getDynamicValue(): StaticallyResolvable;
    awakeForPropertyMap(map: PropertyMap): any;
    evaluate(context: Context): any;
    toString(): string;
}
export declare class StaticallyResolvableWrapper extends StaticallyResolvable {
    private _orig;
    constructor(_orig: DynamicPropertyValue);
    evaluate(context: Context): any;
    toString(): string;
}
export declare class ContextFieldPath extends DynamicPropertyValue implements DynamicSettablePropertyValue {
    settable: boolean;
    protected fieldPath: FieldPath;
    constructor(path: string);
    evaluate(context: Context): any;
    evaluateSet(context: Context, value: any): void;
}
export declare function isDynamicSettable(arg: any): arg is DynamicSettablePropertyValue;
export declare class Expr extends DynamicPropertyValue {
    private _expressionString;
    private _extendedObjects;
    constructor(_expressionString: string);
    addTypeToContext(name: string, context: any): void;
    evaluate(context: Context): any;
    toString(): string;
}
export declare class DeferredOperationChain extends DynamicPropertyValue implements PropertyMapAwaking {
    private _merger;
    private _orig;
    private _override;
    propertyAwaking: boolean;
    constructor(_merger: PropertyMerger, _orig: any, _override: any);
    evaluate(context: Context): any;
    awakeForPropertyMap(map: PropertyMap): any;
    toString(): string;
}
export declare class ValueConverter {
    static value(toType: string, value: any): any;
}
