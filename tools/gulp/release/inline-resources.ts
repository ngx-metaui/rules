#!/usr/bin/env node
'use strict';

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

const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Simple Promiseify function that takes a Node API and return a version that supports promises.
 * We use promises instead of synchronized functions to make the process less I/O bound and
 * faster. It also simplify the code.
 */
function promiseify(fn)
{
    return function (filePath: string, charset: string)
    {
        const args = [].slice.call(arguments, 0);
        return new Promise((resolve, reject) =>
        {
            fn.apply(this, args.concat([
                function (err, value)
                {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(value);
                    }
                }
            ]));
        });
    };
}

const readFile = promiseify(fs.readFile);
const writeFile = promiseify(fs.writeFile);


function inlineResources(globs, isMeta: false)
{
    /**
     * For every argument, inline the templates and styles under it and write the new file.
     */
    for (let pattern of globs) {
        if (pattern.indexOf('*') < 0) {
            // Argument is a directory target, add glob patterns to include every files.
            pattern = path.join(pattern, '**', '*');
        }

        const files = glob.sync(pattern, {})
            .filter(name => /\.js$/.test(name));  // Matches only JavaScript files.

        // Generate all files content with inlined templates.
        files.forEach(filePath =>
        {
            readFile(filePath, 'utf-8')
                .then(content => inlineTemplate(filePath, content, false))
                .then(content => inlineStyle(filePath, content, false))
                .then(content => writeFile(filePath, content))
                .catch(err =>
                {
                    console.error('An error occured: ', err);
                });
        });
    }
    if (isMeta) {
        inlineMetadata(globs);
    }
}


function inlineMetadata(globs)
{

    for (let pattern of globs) {
        if (pattern.indexOf('*') < 0) {
            // Argument is a directory target, add glob patterns to include every files.
            pattern = path.join(pattern, '**', '*');
        }

        const files = glob.sync(pattern, {})
            .filter(name => /\.metadata.json$/.test(name));  // Matches only JavaScript files.

        // Generate all files content with inlined templates.
        files.forEach(filePath =>
        {

            readFile(filePath, 'utf-8')
                .then(content => inlineTemplate(filePath, content, true))
                .then(content => inlineStyle(filePath, content, true))
                .then(content => writeFile(filePath, content))
                .catch(err =>
                {
                    console.error('An error occured: ', err);
                });
        });
    }
}

if (require.main === module) {
    inlineResources(process.argv.slice(2), false);
}


/**
 * Inline the templates for a source file. Simply search for instances of `templateUrl: ...` and
 * replace with `template: ...` (with the content of the file included).
 * @param filePath {string} The path of the source file.
 * @param content {string} The source file's content.
 * @return {string} The content with all templates inlined.
 */
function inlineTemplate(filePath, content, isMeta)
{
    var templ = isMeta ? /"templateUrl":\s*"([^']+?\.html)"/g : /templateUrl:\s*'([^']+?\.html)'/g;
    return content.replace(templ, function (m, templateUrl)
    {
        const templateFile = path.join(path.dirname(filePath), templateUrl);
        const templateContent = fs.readFileSync(templateFile, 'utf-8');
        const shortenedTemplate = templateContent
            .replace(/([\n\r]\s*)+/gm, ' ')
            .replace(/"/g, '\\"');
        return `"template": "${shortenedTemplate}"`;
    });
}


/**
 * Inline the styles for a source file. Simply search for instances of `styleUrls: [...]` and
 * replace with `styles: [...]` (with the content of the file included).
 * @param filePath {string} The path of the source file.
 * @param content {string} The source file's content.
 * @return {string} The content with all styles inlined.
 */
function inlineStyle(filePath, content, isMeta)
{
    var templ = isMeta ? /"styleUrls":\s*(\[[\s\S]*?\])/gm : /styleUrls:\s*(\[[\s\S]*?\])/gm;
    return content.replace(templ, function (m, styleUrls)
    {
        const urls = eval(styleUrls);
        return '"styles": ['
            + urls.map(styleUrl =>
                {
                    const styleFile = path.join(path.dirname(filePath),
                        styleUrl.replace('scss', 'css'));
                    const styleContent = fs.readFileSync(styleFile, 'utf-8');
                    const shortenedStyle = styleContent
                        .replace(/([\n\r]\s*)+/gm, ' ')
                        .replace(/\\/g, '\\\\')
                        .replace(/"/g, '\\"');
                    return `"${shortenedStyle}"`;
                })
                .join(',\n')
            + ']';
    });
}


module.exports = inlineResources;
