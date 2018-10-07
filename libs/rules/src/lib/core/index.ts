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
 *
 */


export {AppConfig, makeConfig} from './config/app-config';
export {Environment} from './config/environment';

export {Response, Resource} from './domain/resource.service';
export {DefaultRestBuilder} from './domain/url/builder';
export {
  isEntity, Value, Entity, Identity, CompositeType, Deserializable, isValue
} from './domain/domain-model';
export {
  ActionSegment, RestAction, ResourceSegment, RestSegmentType, UrlSegment, ContextSegment,
  HostSegment, IdentifierSegment, OfParentSegment
} from './domain/url/segment';
export {RestUrlGroup} from './domain/url/url-group';

export {
  MapWrapper, StringMapWrapper, Predicate, ListWrapper, isListLikeIterable,
  areIterablesEqual, iterateListLike, findLast
} from './utils/collection';
export {
  getTypeNameForDebugging, unimplemented, isPresent, isBlank, isBoolean, isNumber, isString,
  isFunction, isType, isStringMap, isStrictStringMap, isPromise, isArray, isDate, isWindow,
  isRegExp, noop, stringify, className, applyMixins, StringWrapper, StringJoiner,
  NumberWrapper, FunctionWrapper, looseIdentical, getMapKey, normalizeBlank,
  normalizeBool, isJsObject, print, warn, assert, checksum, crc32, Json, DateWrapper,
  BooleanWrapper, getSymbolIterator, evalExpression, evalExpressionWithCntx,
  isPrimitive, hasConstructor, escape, escapeRegExp, hashCode, objectToName, equals,
  shiftLeft, shiftRight, Extensible, readGlobalParam, decamelize, nonPrivatePrefix,
  hasGetter, uuid, objectValues
} from './utils/lang';


export {NotFoundComponent} from './not-found/not-found.component';
export {RoutingService} from './routing/routing.service';

export {
  AribaCoreModule
} from './ariba.core.module';

export {FieldPath} from './utils/field-path';

export {AribaApplication} from './ariba-application';
export {Notifications} from './messaging/notifications.service';




