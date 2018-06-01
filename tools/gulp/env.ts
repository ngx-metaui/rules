/**
 *
 * @original-license
 *
 * The MIT License
 *
 * MIT-style license that can be found in the LICENSE file at https://angular.io/license
 *
 *
 * Credit: Tooling derived and extend from https://github.com/angular/material2
 *
 */
import minimist = require('minimist')
import * as path from 'path';
import {DIST_RESOURCES_ROOT, PLAYGROUND_ASSETS_ROOT} from './constants';


export type Options = {
    prod: boolean,
    dev: boolean,
    force: boolean,
    p: string,
    project: string,
    env: string
}
let knownOptions = {
    string: ['env', 'project'],
    alias: {
        'project': 'p'
    },
    boolean: ['dev', 'prod', 'force'],
    'default': {dev: false, prod: false, force: false}
};


export class Environment
{
    options: Options;

    constructor()
    {
        this.options = <any>minimist(process.argv.slice(2), knownOptions);
        if (!this.options.env) {
            if (this.options.prod) {
                this.options.env = 'prod'
            } else {
                this.options.env = 'dev'
            }
        }
        if (this.options.p) {
            this.options.project = this.options.p
        }
    }

    env(): string
    {
        return this.options.env
    }


    resourcesOutput(): string
    {
        let out = path.join(DIST_RESOURCES_ROOT);
        if (this.project() === 'playground') {
            out = path.join(PLAYGROUND_ASSETS_ROOT);
        }
        return out;
    }

    project(): string
    {
        return this.options.project;
    }

    get force()
    {
        return this.options.force
    }
}

export const Env = new Environment();

