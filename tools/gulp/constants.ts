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
import {join} from 'path';

//noinspection TypeScriptUnresolvedVariable
export const PROJECT_ROOT = join(__dirname, '../..');
export const SOURCE_ROOT = join(PROJECT_ROOT, 'src');
export const PLAYGROUND_ROOT = join(SOURCE_ROOT, 'playground');
export const PLAYGROUND_ASSETS_ROOT = join(PLAYGROUND_ROOT, 'assets');

export const DIST_ROOT = join(PROJECT_ROOT, 'dist');
export const DIST_COMPONENTS_ROOT = join(DIST_ROOT, '@aribaui');
export const DIST_RESOURCES_ROOT = join(DIST_COMPONENTS_ROOT, 'resources');
export const DIST_STYLES_ROOT = join(DIST_RESOURCES_ROOT, 'styles');
export const DIST_THEMES_ROOT = join(DIST_RESOURCES_ROOT, 'themes');


export const NPM_VENDOR_FILES = [
  '@angular',
  'core-js/client',
  'rxjs',
  'systemjs/dist',
  'zone.js/dist'
];
