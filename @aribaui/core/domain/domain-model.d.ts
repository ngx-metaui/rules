/**
 * To unify the work with domain objects we have these set of interfaces that each Entity or Value
 * must use to leverage some of the functionality we have in the core
 *
 */
export interface CompositeType {
    className(): string;
    $proto?(): CompositeType;
}
export interface Identity {
    identity(): string;
}
export interface Deserializable {
    getTypes(): any;
}
/**
 * EntityComposite having identity that can be identified in the storage by its ID. Entities are
 * mutable objects
 */
export interface Entity extends Identity, Deserializable, CompositeType {
}
/**
 * <li>No Identity</li>
 * <li>Immutable</li>
 */
export interface Value extends Deserializable, CompositeType {
    clone(): Value;
}
export declare function isEntity(entity: any): entity is Entity;
export declare function isValue(val: any): val is Value;
