/**
 * @license
 * Copyright Frank Kolar and others
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
 */
import {
  apply,
  branchAndMerge,
  chain,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicContext,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import {NodeDependency, NodeDependencyType} from '@schematics/angular/utility/dependencies';
import {Schema} from './schema';
import {classify, dasherize} from '@angular-devkit/core/src/utils/strings';
import {normalize} from '@angular-devkit/core';
import {getAppModulePath} from '@schematics/angular/utility/ng-ast-utils';
import {addSymbolToNgModuleMetadata, isImported} from '@schematics/angular/utility/ast-utils';
import {InsertChange} from '@schematics/angular/utility/change';
import {
  addDependenciesToPackageJson,
  addFileHeaderImports,
  addOssCompilerScriptsToPackageJson,
  addScriptsToAngularJson,
  addStylesToAngularJson,
  getMainProjectPath,
  getSourceFile,
  registerUserRulesWithAppConfig,
  setupOptions
} from '../utils/schematics-utils';

const stringUtils = {dasherize, classify};


/**
 * ng-add performs set of task to setup existing or new angular application for basic structure
 * need to develop MetaUI application.
 *
 * Once you run this should be good to go to create and render your domain objects
 *
 *
 *
 */
export default function (options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    setupOptions(tree, options);


    return chain([
      options && options.skipDependencies ? noop() : addDependencies(options),
      options && options.skipScripts ? noop() : addScripts(options),
      options && options.skipStyles ? noop() : addStyles(options),
      addRulesSubsystem(options),
      addNgModuleImports(options),
      addFileImports(options),
      registerUserRulesWithAppConfig(options),
      addOssCompilerScriptsToPackageJson(options)
    ]);
  };
}


function addDependencies(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const dependencies: NodeDependency[] = [
      {type: NodeDependencyType.Default, version: '^6.3.3', name: '@ngx-metaui/rules'},
      {type: NodeDependencyType.Default, version: '1.6.32', name: 'big-integer'},
      {type: NodeDependencyType.Default, version: '1.3.0', name: 'object-hash'},
      {type: NodeDependencyType.Default, version: '^0.11.4', name: 'object-path'},
      {type: NodeDependencyType.Default, version: '^1.0.0-beta.10', name: 'primeicons'},
      {type: NodeDependencyType.Default, version: '6.1.3', name: 'primeng'},
      {type: NodeDependencyType.Default, version: '1.3.2', name: 'typescript-collections'},
      {type: NodeDependencyType.Default, version: '1.3.6', name: 'quill'},
      {type: NodeDependencyType.Default, version: '4.7.0', name: 'font-awesome'},
      {type: NodeDependencyType.Dev, version: '^1.0.2', name: 'watch'}
    ];

    return addDependenciesToPackageJson(dependencies, options && !options.skipNpmInstall);
  };
}


function addScripts(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const scriptsPaths: string[] = [
      'node_modules/quill/dist/quill.js'
    ];

    return addScriptsToAngularJson(scriptsPaths, options);
  };
}


function addStyles(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const styleEntries: string[] = [
      'node_modules/@ngx-metaui/rules/lib/resources/themes/_normalize.scss',
      'node_modules/primeng/resources/primeng.min.css',
      'node_modules/font-awesome/css/font-awesome.min.css',
      'node_modules/quill/dist/quill.core.css',
      'node_modules/quill/dist/quill.snow.css',
      'node_modules/@ngx-metaui/rules/lib/resources/fonts/sap-ariba-icon-fonts/' +
      'sap-ariba-icon-fonts.css',
      'node_modules/@ngx-metaui/rules/lib/resources/fonts/sap-icon-fonts/sap-icon-fonts.css',
      'node_modules/primeicons/primeicons.css',
      'node_modules/@ngx-metaui/rules/lib/resources/themes/ariba/theme.scss',
      'node_modules/@ngx-metaui/rules/lib/resources/styles/aribaui.scss'
    ];

    return addStylesToAngularJson(styleEntries, options);
  };
}


function addNgModuleImports(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {

    try {
      let modulePath = getAppModulePath(host, getMainProjectPath(host, options));
      let srcPath = getSourceFile(host, modulePath);

      if (!isImported(srcPath, 'AppConfig, MetaUIRulesModule',
        '@ngx-metaui/rules')) {

        const changes = addSymbolToNgModuleMetadata(srcPath, modulePath, 'imports',
          'MetaUIRulesModule.forRoot({})');

        const recorder = host.beginUpdate(modulePath);
        changes.forEach((change) => {
          if (change instanceof InsertChange) {
            recorder.insertLeft(change.pos, change.toAdd);
          }
        });
        host.commitUpdate(recorder);
        context.logger.log('info', `✅️ MetaUIRulesModule Added to NgModule imports`);

      } else {
        context.logger.log('info', `✅️ Import MetaUIRulesModule already exists`);
      }

    } catch (e) {
      context.logger.log('warn',
        `✅️ Failed to add MetaUIRulesModule into NgModule imports ${e}`);
    }
    return host;
  };
}


function addRulesSubsystem(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {

    try {
      const movePath = normalize(options.path);
      const templateSource = apply(url('./files'), [
        template({
          ...stringUtils,
          ...options as object
        }),
        move(movePath)
      ]);

      context.logger.log('info', `✅️ Created rules directory layout`);
      return chain([
          branchAndMerge(chain([
            mergeWith(templateSource)
          ]))
        ]
      );

    } catch (e) {
      context.logger.log('warn',
        `✅️ Failed to add scripts into angular.json`);
    }
  };
}


function addFileImports(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {

    return chain([
      addFileHeaderImports(options, 'AppConfig, MetaUIRulesModule',
        '@ngx-metaui/rules'),

      addFileHeaderImports(options, '* as userRules',
        './rules/user-rules', true)
    ]);
  };
}


