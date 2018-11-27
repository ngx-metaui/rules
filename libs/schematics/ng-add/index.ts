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
import {AddSchema} from './add-schema';
import {classify, dasherize} from '@angular-devkit/core/src/utils/strings';
import {normalize} from '@angular-devkit/core';
import {getAppModulePath} from '@schematics/angular/utility/ng-ast-utils';
import {
  addImportToModule,
  addSymbolToNgModuleMetadata,
  isImported
} from '@schematics/angular/utility/ast-utils';
import {InsertChange} from '@schematics/angular/utility/change';
import {
  addDependenciesToPackageJson,
  addFileHeaderImports,
  addOssCompilerScriptsToPackageJson,
  addScriptsToAngularJson,
  addStylesToAngularJson,
  getMainProjectPath,
  getSourceFile,
  registerUserRulesWithMetaConfig,
  setupOptions
} from '../common/schematics-utils';

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
export default function (options: AddSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    setupOptions(tree, options);


    return chain([
      options.skipDependencies ? noop() : addDependencies(options),
      options.skipScripts ? noop() : addScripts(options),
      options.skipStyles ? noop() : addStyles(options),
      addRulesSubsystem(options),
      addNgModuleImports(options),
      addFileImportsCore(options),
      addFileImportsUILib(options),
      registerUserRulesWithMetaConfig(options),
      addOssCompilerScriptsToPackageJson(options)

    ]);
  };
}


function addDependencies(options: AddSchema): Rule {
  return (host: Tree, context: SchematicContext) => {
    let uiLibs: NodeDependency[] = [];
    const core: NodeDependency[] = [
      {type: NodeDependencyType.Default, version: '^7.0.0', name: '@ngx-metaui/rules'},
      {type: NodeDependencyType.Default, version: '1.6.36', name: 'big-integer'},
      {type: NodeDependencyType.Default, version: '1.3.0', name: 'object-hash'},
      {type: NodeDependencyType.Default, version: '^0.11.4', name: 'object-path'},
      {type: NodeDependencyType.Default, version: '^1.0.0', name: 'primeicons'},
      {type: NodeDependencyType.Default, version: '7.0.0-beta.1', name: 'primeng'},
      {type: NodeDependencyType.Default, version: '1.3.2', name: 'typescript-collections'},
      {type: NodeDependencyType.Default, version: '1.3.6', name: 'quill'},
      {type: NodeDependencyType.Default, version: '4.7.0', name: 'font-awesome'},
      {type: NodeDependencyType.Dev, version: '^1.0.2', name: 'watch'}
    ];

    if (options.uiLib === 'prime-ng') {
      uiLibs = [
        {type: NodeDependencyType.Default, version: '^7.0.0', name: '@ngx-metaui/primeng-rules'},
        {type: NodeDependencyType.Default, version: '7.0.0-beta.1', name: 'primeng'},
        {type: NodeDependencyType.Default, version: '1.3.6', name: 'quill'},
        {type: NodeDependencyType.Default, version: '4.7.0', name: 'font-awesome'},
        {type: NodeDependencyType.Default, version: '^1.0.0', name: 'primeicons'}
      ];
    }
    return addDependenciesToPackageJson([...core, ...uiLibs], options.skipNpmInstall);
  };
}


function addScripts(options: AddSchema): Rule {
  return (host: Tree, context: SchematicContext) => {
    if (options.uiLib === 'none') {
      return host;
    }
    const scriptsPaths: string[] = [
      'node_modules/quill/dist/quill.js'
    ];
    return addScriptsToAngularJson(scriptsPaths, options);
  };
}


function addStyles(options: AddSchema): Rule {
  return (host: Tree, context: SchematicContext) => {
    if (options.uiLib === 'none') {
      return host;
    }

    // we have only one ui implementations right now
    const styleEntries: string[] = [
      'node_modules/@ngx-metaui/primeng-rules/lib/resources/themes/_normalize.scss',
      'node_modules/primeng/resources/primeng.min.css',
      'node_modules/font-awesome/css/font-awesome.min.css',
      'node_modules/quill/dist/quill.core.css',
      'node_modules/quill/dist/quill.snow.css',
      'node_modules/@ngx-metaui/primeng-rules/lib/resources/fonts/sap-ariba-icon-fonts/' +
      'sap-ariba-icon-fonts.css',
      'node_modules/@ngx-metaui/primeng-rules/lib/resources/fonts/sap-icon-fonts/' +
      'sap-icon-fonts.css',
      'node_modules/primeicons/primeicons.css',
      'node_modules/@ngx-metaui/primeng-rules/lib/resources/themes/ariba/theme.scss',
      'node_modules/@ngx-metaui/primeng-rules/lib/resources/styles/aribaui.scss'
    ];

    return addStylesToAngularJson(styleEntries, options);
  };
}


function addNgModuleImports(options: AddSchema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const animImport = ['BrowserAnimationsModule', '@angular/platform-browser/animations'];

    try {
      const modulePath = getAppModulePath(host, getMainProjectPath(host, options));
      const srcPath = getSourceFile(host, modulePath);

      if (!isImported(srcPath, 'MetaConfig, MetaUIRulesModule',
        '@ngx-metaui/rules')) {

        let changes = [
          ...addImportToModule(srcPath, modulePath, animImport[0], animImport[1]),
          ...addSymbolToNgModuleMetadata(srcPath, modulePath, 'imports',
            'MetaUIRulesModule.forRoot({})')];

        if (options.uiLib === 'prime-ng') {
          changes = [...changes, ...addSymbolToNgModuleMetadata(srcPath, modulePath,
            'imports',
            'PrimeNgRulesModule.forRoot()')];
        }

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


function addRulesSubsystem(options: AddSchema): Rule {
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


function addFileImportsCore(options: AddSchema): Rule {
  return (host: Tree, context: SchematicContext) => {

    return chain([
      addFileHeaderImports(options, 'MetaConfig, MetaUIRulesModule',
        '@ngx-metaui/rules'),

      addFileHeaderImports(options, '* as userRules',
        './rules/user-rules', true)
    ]);
  };
}


function addFileImportsUILib(options: AddSchema): Rule {
  return (host: Tree, context: SchematicContext) => {

    if (options.uiLib === 'prime-ng') {
      return chain([
        addFileHeaderImports(options, 'PrimeNgRulesModule',
          '@ngx-metaui/primeng-rules')
      ]);
    } else {
      return host;
    }
  };
}
