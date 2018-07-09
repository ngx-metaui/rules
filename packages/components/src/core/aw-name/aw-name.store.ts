import {Injectable} from '@angular/core';

@Injectable()
export class AwNameStore {

    private store: Map<string, any>;

    constructor() {
        this.store = new Map();
    }

    add(name: string, el: any) {
        if (this.collides(name)) {
            throw new Error('Name is not unique!');
        }
        return this.store.set(name, el);
    }

    remove(name: string) {
        return this.store.delete(name);
    }

    collides(name: string): boolean {
        return this.store.has(name);
    }

    clear() {
        this.store.clear();
    }

}
