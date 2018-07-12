import { Environment } from '@aribaui/core';
/**
 * A class holding a references to components. The methods are self-explanatory.
 *
 */
export declare class ComponentRegistry {
    private env;
    private _nameToType;
    constructor(env: Environment);
    initialize(references: any): Promise<any>;
    registerType(name: string, type: any): void;
    registerTypes(references: any): void;
    readonly nameToType: Map<string, any>;
}
