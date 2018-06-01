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
import {task, watch, src, dest} from 'gulp';
import * as path from 'path';
import {Env} from '../env';
import {SOURCE_ROOT, DIST_COMPONENTS_ROOT, PROJECT_ROOT} from '../constants';
import {
    sassBuildTask, tsBuildTask, execNodeTask, copyTask
} from '../task_helpers';
// No typings for this.
const inlineResources = require('../release/inline-resources');
const flatten = require('gulp-flatten');
const libDir = path.join(SOURCE_ROOT, 'lib');
const through = require('through2');
const merge = require('gulp-merge-json');
const gulpClean = require('gulp-clean');
const gulpRunSequence = require('run-sequence');
const glob = require('glob');
const fs = require('fs');

task(':watch:components', () =>
{
    watch(path.join(libDir, '**/*.ts'), [':build:components:ts']);
    watch(path.join(libDir, '**/*.scss'), [':build:components:scss']);
    watch(path.join(libDir, '**/*.html'), [':build:components:assets']);
});


task(':build:components:ts', tsBuildTask(libDir, path.join(libDir, 'tsconfig.json')));
task(':build:components:assets', copyTask(path.join(libDir, '*/**/*'), DIST_COMPONENTS_ROOT));


task(':build:components:assets-imgs', function ()
{
    src(['!src/lib/resources/**/*', 'src/lib/*/**/assets/images/*'])
        .pipe(flatten())
        .pipe(dest(path.join(Env.resourcesOutput(), 'images')));

    if (Env.project() === 'playground') {
        src(['src/lib/resources/images/*'])
            .pipe(flatten())
            .pipe(dest(path.join(Env.resourcesOutput(), 'images')));
    }
});


task(':build:components:assets-i18n', function ()
{
    src(['!src/lib/resources/**/*', 'src/lib/**/assets/i18n/*'])

        .pipe(through.obj((chunk: any, enc: any, cb: any) =>
        {
            let langIndx = chunk.path.lastIndexOf('/');
            let newDestPath = path.join(Env.resourcesOutput(), 'i18n');
            copyTask(chunk.path, path.join(newDestPath, chunk.path.substring(langIndx + 1)))();

            cb(null, chunk);
        }));


    if (Env.project() === 'playground') {
        src(['src/lib/resources/i18n/*'])

            .pipe(through.obj((chunk: any, enc: any, cb: any) =>
            {
                let langIndx = chunk.path.lastIndexOf('/');
                let newDestPath = path.join(Env.resourcesOutput(), 'i18n');
                copyTask(chunk.path, path.join(newDestPath, chunk.path.substring(langIndx + 1)))();

                cb(null, chunk);
            }));
    }
});

task(':build:components:merge-i18n', function ()
{
    let newDestPath = path.join(Env.resourcesOutput(), 'i18n', '*');
    const files = glob.sync(newDestPath, {});

    // Generate all files content with inlined templates.
    files.forEach(filePath =>
    {
        let localePath = path.join(filePath, '**', '*.json');
        src(localePath)
            .pipe(merge({
                fileName: 'i18n.resource.json',
            }))
            .pipe(dest(filePath));
    });
});

task(':build:components:scss', sassBuildTask(DIST_COMPONENTS_ROOT, libDir));

task('copy:assets', function (done: () => void)
{
    gulpRunSequence(
        ':build:components:assets-imgs',
        ':build:components:assets-i18n',
        ':build:components:merge-i18n',
        done
    );
});

task('build:dev', [
    ':build:components:ts',
    ':build:components:assets',
    ':build:components:scss',
    'copy:assets',
], () => inlineResources([DIST_COMPONENTS_ROOT], false));





task(':angular:ngc', [

    ], execNodeTask('@angular/compiler-cli', 'ngc',
    ['-p', path.relative(PROJECT_ROOT, path.join(libDir, 'tsconfig.json'))])
);



task(':build:ngc', function (done: () => void)
{
    gulpRunSequence(
        ':build:components:assets',
        ':build:components:scss',
        'copy:assets',
        ':angular:ngc',
        ':build:components:merge-i18n',
        () =>
        {
            inlineResources([DIST_COMPONENTS_ROOT], true);
            done();
        }
    );
});
