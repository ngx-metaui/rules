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

import {isPresent} from '../utils/lang';

/**
 * To unify the work with domain objects we have these set of interfaces that each Entity or Value
 * must use to leverage some of the functionality we have in the core
 *
 */
export interface CompositeType
{

    className(): string;

    $proto?(): CompositeType;
}


export interface Identity
{

    identity(): string;

}

export interface Deserializable
{
    getTypes(): any;
}


/**
 * EntityComposite having identity that can be identified in the storage by its ID. Entities are
 * mutable objects
 */
export interface Entity extends Identity,
    Deserializable,
    CompositeType
{
}

/**
 * <li>No Identity</li>
 * <li>Immutable</li>
 */
export interface Value extends Deserializable,
    CompositeType
{
    // for use of type guard only, later on we can use it for something
    clone(): Value;
}

export function isEntity(entity: any): entity is Entity
{
    return isPresent(entity) && isPresent((<Entity>entity).identity);
}

export function isValue(val: any): val is Value
{
    return isPresent(val)  && isPresent((<Value>val).clone);
}
