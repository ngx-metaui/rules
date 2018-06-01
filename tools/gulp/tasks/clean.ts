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
import {
    task,
} from 'gulp';
import * as gulp from 'gulp';
const gulpClean = require('gulp-clean');

/**
 * Delete all files in the /dist directory.
 * */
task('clean', cleanTask('dist'));

export function cleanTask(glob: string) {
    return () => gulp.src(glob, { read: false }).pipe(gulpClean(null));
}
