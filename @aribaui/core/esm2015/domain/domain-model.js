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
import { isPresent } from '../utils/lang';
/**
 * To unify the work with domain objects we have these set of interfaces that each Entity or Value
 * must use to leverage some of the functionality we have in the core
 *
 * @record
 */
export function CompositeType() { }
function CompositeType_tsickle_Closure_declarations() {
    /** @type {?} */
    CompositeType.prototype.className;
    /** @type {?|undefined} */
    CompositeType.prototype.$proto;
}
/**
 * @record
 */
export function Identity() { }
function Identity_tsickle_Closure_declarations() {
    /** @type {?} */
    Identity.prototype.identity;
}
/**
 * @record
 */
export function Deserializable() { }
function Deserializable_tsickle_Closure_declarations() {
    /** @type {?} */
    Deserializable.prototype.getTypes;
}
/**
 * EntityComposite having identity that can be identified in the storage by its ID. Entities are
 * mutable objects
 * @record
 */
export function Entity() { }
function Entity_tsickle_Closure_declarations() {
}
/**
 * <li>No Identity</li>
 * <li>Immutable</li>
 * @record
 */
export function Value() { }
function Value_tsickle_Closure_declarations() {
    /** @type {?} */
    Value.prototype.clone;
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLW1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29yZS8iLCJzb3VyY2VzIjpbImRvbWFpbi9kb21haW4tbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrRHhDLE1BQU0sbUJBQW1CLE1BQVc7SUFFaEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsbUJBQVMsTUFBTSxFQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDcEU7Ozs7O0FBRUQsTUFBTSxrQkFBa0IsR0FBUTtJQUU1QixNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFLLFNBQVMsQ0FBQyxtQkFBUSxHQUFHLEVBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUMzRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuXG5pbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnLi4vdXRpbHMvbGFuZyc7XG5cbi8qKlxuICogVG8gdW5pZnkgdGhlIHdvcmsgd2l0aCBkb21haW4gb2JqZWN0cyB3ZSBoYXZlIHRoZXNlIHNldCBvZiBpbnRlcmZhY2VzIHRoYXQgZWFjaCBFbnRpdHkgb3IgVmFsdWVcbiAqIG11c3QgdXNlIHRvIGxldmVyYWdlIHNvbWUgb2YgdGhlIGZ1bmN0aW9uYWxpdHkgd2UgaGF2ZSBpbiB0aGUgY29yZVxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb21wb3NpdGVUeXBlXG57XG5cbiAgICBjbGFzc05hbWUoKTogc3RyaW5nO1xuXG4gICAgJHByb3RvPygpOiBDb21wb3NpdGVUeXBlO1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSWRlbnRpdHlcbntcblxuICAgIGlkZW50aXR5KCk6IHN0cmluZztcblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlc2VyaWFsaXphYmxlXG57XG4gICAgZ2V0VHlwZXMoKTogYW55O1xufVxuXG5cbi8qKlxuICogRW50aXR5Q29tcG9zaXRlIGhhdmluZyBpZGVudGl0eSB0aGF0IGNhbiBiZSBpZGVudGlmaWVkIGluIHRoZSBzdG9yYWdlIGJ5IGl0cyBJRC4gRW50aXRpZXMgYXJlXG4gKiBtdXRhYmxlIG9iamVjdHNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbnRpdHkgZXh0ZW5kcyBJZGVudGl0eSxcbiAgICBEZXNlcmlhbGl6YWJsZSxcbiAgICBDb21wb3NpdGVUeXBlXG57XG59XG5cbi8qKlxuICogPGxpPk5vIElkZW50aXR5PC9saT5cbiAqIDxsaT5JbW11dGFibGU8L2xpPlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFZhbHVlIGV4dGVuZHMgRGVzZXJpYWxpemFibGUsXG4gICAgQ29tcG9zaXRlVHlwZVxue1xuICAgIC8vIGZvciB1c2Ugb2YgdHlwZSBndWFyZCBvbmx5LCBsYXRlciBvbiB3ZSBjYW4gdXNlIGl0IGZvciBzb21ldGhpbmdcbiAgICBjbG9uZSgpOiBWYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW50aXR5KGVudGl0eTogYW55KTogZW50aXR5IGlzIEVudGl0eVxue1xuICAgIHJldHVybiBpc1ByZXNlbnQoZW50aXR5KSAmJiBpc1ByZXNlbnQoKDxFbnRpdHk+ZW50aXR5KS5pZGVudGl0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbHVlKHZhbDogYW55KTogdmFsIGlzIFZhbHVlXG57XG4gICAgcmV0dXJuIGlzUHJlc2VudCh2YWwpICAmJiBpc1ByZXNlbnQoKDxWYWx1ZT52YWwpLmNsb25lKTtcbn1cbiJdfQ==