/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
import { isPresent } from '../utils/lang';
/**
 * To unify the work with domain objects we have these set of interfaces that each Entity or Value
 * must use to leverage some of the functionality we have in the core
 *
 * @record
 */
export function CompositeType() { }
/** @type {?} */
CompositeType.prototype.className;
/** @type {?|undefined} */
CompositeType.prototype.$proto;
/**
 * @record
 */
export function Identity() { }
/** @type {?} */
Identity.prototype.identity;
/**
 * @record
 */
export function Deserializable() { }
/** @type {?} */
Deserializable.prototype.getTypes;
/**
 * EntityComposite having identity that can be identified in the storage by its ID. Entities are
 * mutable objects
 * @record
 */
export function Entity() { }
/**
 * <li>No Identity</li>
 * <li>Immutable</li>
 * @record
 */
export function Value() { }
/** @type {?} */
Value.prototype.clone;
/**
 * @param {?} entity
 * @return {?}
 */
export function isEntity(entity) {
    return isPresent(entity) && isPresent((/** @type {?} */ (entity)).identity);
}
/**
 * @param {?} val
 * @return {?}
 */
export function isValue(val) {
    return isPresent(val) && isPresent((/** @type {?} */ (val)).clone);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLW1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29yZS8iLCJzb3VyY2VzIjpbImRvbWFpbi9kb21haW4tbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtEeEMsTUFBTSxtQkFBbUIsTUFBVztJQUVoQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxtQkFBUyxNQUFNLEVBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUNwRTs7Ozs7QUFFRCxNQUFNLGtCQUFrQixHQUFRO0lBRTVCLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUssU0FBUyxDQUFDLG1CQUFRLEdBQUcsRUFBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzNEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5cbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tICcuLi91dGlscy9sYW5nJztcblxuLyoqXG4gKiBUbyB1bmlmeSB0aGUgd29yayB3aXRoIGRvbWFpbiBvYmplY3RzIHdlIGhhdmUgdGhlc2Ugc2V0IG9mIGludGVyZmFjZXMgdGhhdCBlYWNoIEVudGl0eSBvciBWYWx1ZVxuICogbXVzdCB1c2UgdG8gbGV2ZXJhZ2Ugc29tZSBvZiB0aGUgZnVuY3Rpb25hbGl0eSB3ZSBoYXZlIGluIHRoZSBjb3JlXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbXBvc2l0ZVR5cGVcbntcblxuICAgIGNsYXNzTmFtZSgpOiBzdHJpbmc7XG5cbiAgICAkcHJvdG8/KCk6IENvbXBvc2l0ZVR5cGU7XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBJZGVudGl0eVxue1xuXG4gICAgaWRlbnRpdHkoKTogc3RyaW5nO1xuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVzZXJpYWxpemFibGVcbntcbiAgICBnZXRUeXBlcygpOiBhbnk7XG59XG5cblxuLyoqXG4gKiBFbnRpdHlDb21wb3NpdGUgaGF2aW5nIGlkZW50aXR5IHRoYXQgY2FuIGJlIGlkZW50aWZpZWQgaW4gdGhlIHN0b3JhZ2UgYnkgaXRzIElELiBFbnRpdGllcyBhcmVcbiAqIG11dGFibGUgb2JqZWN0c1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eSBleHRlbmRzIElkZW50aXR5LFxuICAgIERlc2VyaWFsaXphYmxlLFxuICAgIENvbXBvc2l0ZVR5cGVcbntcbn1cblxuLyoqXG4gKiA8bGk+Tm8gSWRlbnRpdHk8L2xpPlxuICogPGxpPkltbXV0YWJsZTwvbGk+XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmFsdWUgZXh0ZW5kcyBEZXNlcmlhbGl6YWJsZSxcbiAgICBDb21wb3NpdGVUeXBlXG57XG4gICAgLy8gZm9yIHVzZSBvZiB0eXBlIGd1YXJkIG9ubHksIGxhdGVyIG9uIHdlIGNhbiB1c2UgaXQgZm9yIHNvbWV0aGluZ1xuICAgIGNsb25lKCk6IFZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFbnRpdHkoZW50aXR5OiBhbnkpOiBlbnRpdHkgaXMgRW50aXR5XG57XG4gICAgcmV0dXJuIGlzUHJlc2VudChlbnRpdHkpICYmIGlzUHJlc2VudCgoPEVudGl0eT5lbnRpdHkpLmlkZW50aXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsdWUodmFsOiBhbnkpOiB2YWwgaXMgVmFsdWVcbntcbiAgICByZXR1cm4gaXNQcmVzZW50KHZhbCkgICYmIGlzUHJlc2VudCgoPFZhbHVlPnZhbCkuY2xvbmUpO1xufVxuIl19