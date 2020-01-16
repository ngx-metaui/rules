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
  getMainProjectPath,
  getSourceFile,
  readPackageJson,
  registerUserRulesWithMetaConfig,
  setupOptions
} from '../common/schematics-utils';
import {WorkspaceProject, WorkspaceSchema} from '@schematics/angular/utility/workspace-models';
import {getWorkspace, getWorkspacePath} from '@schematics/angular/utility/config';

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
      {
        type: NodeDependencyType.Default,
        version: '^VERSION_PLACEHOLDER',
        name: '@ngx-metaui/rules'
      },
      {type: NodeDependencyType.Default, version: '1.6.48', name: 'big-integer'},
      {type: NodeDependencyType.Default, version: '1.3.1', name: 'object-hash'},
      {type: NodeDependencyType.Default, version: '^0.11.4', name: 'object-path'},
      {type: NodeDependencyType.Default, version: '1.3.2', name: 'typescript-collections'},
      {type: NodeDependencyType.Dev, version: '^1.0.2', name: 'watch'}
    ];

    if (options.uiLib === 'prime-ng') {
      uiLibs = [
        {
          type: NodeDependencyType.Default,
          version: '^VERSION_PLACEHOLDER',
          name: '@ngx-metaui/primeng-rules'
        },
        {type: NodeDependencyType.Default, version: 'MATERIAL_PLACEHOLDER', name: '@angular/cdk'},
        {type: NodeDependencyType.Default, version: 'PRIMENG_PLACEHOLDER', name: 'primeng'},
        {type: NodeDependencyType.Default, version: '1.3.6', name: 'quill'},
        {type: NodeDependencyType.Default, version: '4.7.0', name: 'font-awesome'},
        {type: NodeDependencyType.Default, version: 'PRIMENG_ICONS_PLACEHOLDER', name: 'primeicons'}
      ];

    } else if (options.uiLib === 'material') {
      uiLibs = [
        {
          type: NodeDependencyType.Default,
          version: '^VERSION_PLACEHOLDER',
          name: '@ngx-metaui/material-rules'
        },
        {type: NodeDependencyType.Default, version: 'MATERIAL_PLACEHOLDER', name: '@angular/cdk'},
        {
          type: NodeDependencyType.Default,
          version: 'MATERIAL_PLACEHOLDER',
          name: '@angular/material'
        },
        {type: NodeDependencyType.Default, version: '^6.3.1', name: 'flexboxgrid'}
      ];
    } else if (options.uiLib === 'fiori') {
      uiLibs = [
        {
          type: NodeDependencyType.Default,
          version: '^VERSION_PLACEHOLDER',
          name: '@ngx-metaui/fiori-rules'
        },
        {
          type: NodeDependencyType.Default,
          version: 'FD_CORE_PLACEHOLDER',
          name: '@fundamental-ngx/core'
        },
        {
          type: NodeDependencyType.Default,
          version: 'FD_PLATFORM_PLACEHOLDER',
          name: '@fundamental-ngx/platform'
        },
        {type: NodeDependencyType.Default, version: 'MATERIAL_PLACEHOLDER', name: '@angular/cdk'},
        {type: NodeDependencyType.Default, version: '^6.3.1', name: 'flexboxgrid'}
      ];
    }


    return addDependenciesToPackageJson([...core, ...uiLibs], options.skipNpmInstall);
  };
}


function addScripts(options: AddSchema): Rule {
  return (host: Tree, context: SchematicContext) => {
    if (options.uiLib === 'none' || options.uiLib === 'material' || options.uiLib === 'fiori') {
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

    if (options.uiLib === 'prime-ng') {
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

    } else if (options.uiLib === 'material') {
      const styleEntries: string[] = [
        'node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css',
        'node_modules/flexboxgrid/css/flexboxgrid.css'
      ];
      return addStylesToAngularJson(styleEntries, options);
    } else if (options.uiLib === 'fiori') {
      const styleEntries: string[] = [
        'node_modules/flexboxgrid/dist/flexboxgrid.css',
        'node_modules/fundamental-styles/dist/fundamental-styles.css',
        'node_modules/fundamental-styles/dist/fonts.css',
        'node_modules/fundamental-styles/dist/icon.css'
      ];
      return addStylesToAngularJson(styleEntries, options);
    }
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

        } else if (options.uiLib === 'material') {
          changes = [...changes, ...addSymbolToNgModuleMetadata(srcPath, modulePath,
            'imports',
            'MaterialRulesModule.forRoot()')];

        } else if (options.uiLib === 'fiori') {
          changes = [...changes, ...addSymbolToNgModuleMetadata(srcPath, modulePath,
            'imports',
            'FioriRulesModule.forRoot()')];
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
    } else if (options.uiLib === 'material') {
      return chain([
        addFileHeaderImports(options, 'MaterialRulesModule',
          '@ngx-metaui/material-rules')
      ]);
    } else if (options.uiLib === 'fiori') {
      return chain([
        addFileHeaderImports(options, 'FioriRulesModule',
          '@ngx-metaui/fiori-rules')
      ]);
    } else {
      return host;
    }
  };
}

function addOssCompilerScriptsToPackageJson(options: AddSchema): Rule {
  return (host: Tree, context: SchematicContext) => {

    const content = readPackageJson(host);
    if (!content['scripts']) {
      content['scripts'] = {};
    }
    const srcPath = normalize(`./${options.path}/rules`);
    content['scripts']['compile:oss'] = `oss -i ${srcPath} -u -n user-rules`;
    content['scripts']['watch:oss'] = `watch --wait=8 'npm run compile:oss' ${srcPath} `;

    host.overwrite('package.json', JSON.stringify(content, null, 2));
    context.logger.log('info', '✅️ Added script into package.json');
    return host;
  };
}


function addScriptsToAngularJson(scriptsPaths: string[], options: AddSchema): Rule {
  return (host: Tree, context: SchematicContext) => {
    try {
      const workspace: WorkspaceSchema = getWorkspace(host);
      const projectName = options.project || workspace.defaultProject;

      if (!projectName) {
        throw Error(`Cant Find project by name ${projectName}`);
      }
      const project: WorkspaceProject = workspace.projects[projectName];
      const scripts: any[] = (<any>project.architect)['build']['options']['scripts'];
      scriptsPaths.forEach(path => {
        if (scripts.indexOf(path) === -1) {
          scripts.push(path);
        }
      });
      context.logger.log('info', `✅️ Added scripts into angular.json`);
      host.overwrite(getWorkspacePath(host), JSON.stringify(workspace, null, 2));

    } catch (e) {
      context.logger.log('warn',
        `✅️ Failed to add scripts into angular.json`);
    }
    return host;
  };
}


function addStylesToAngularJson(styleEntries: string[], options: AddSchema): Rule {
  return (host: Tree, context: SchematicContext) => {
    try {
      const workspace = getWorkspace(host);
      const projectName = options.project || workspace.defaultProject;

      if (!projectName) {
        throw Error(`Cant Find project by name ${projectName}`);
      }
      const project: WorkspaceProject = workspace.projects[projectName];
      const styles: any[] = (<any>project.architect)['build']['options']['styles'];

      styleEntries.reverse().forEach(path => {
        if (styles.indexOf(path) === -1) {
          styles.unshift(path);
        }
      });


      context.logger.log('info', `✅️ Added styles into angular.json`);
      host.overwrite(getWorkspacePath(host), JSON.stringify(workspace, null, 2));

    } catch (e) {
      context.logger.log('warn',
        `✅️ Failed to add scripts into angular.json`);
    }
    return host;
  };
}
