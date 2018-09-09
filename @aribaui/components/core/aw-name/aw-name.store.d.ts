export declare class AwNameStore {
    private store;
    constructor();
    add(name: string, el: any): Map<string, any>;
    remove(name: string): boolean;
    collides(name: string): boolean;
    clear(): void;
}
