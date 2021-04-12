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
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 */
import {chain, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {NodeDependency, NodeDependencyType} from '@schematics/angular/utility/dependencies';
import {AddSchema} from '../common/add-schema';
import {setupOptions, sortObjectByKeys} from '../common/schematics-utils';
import {WorkspaceProject} from '@schematics/angular/utility/workspace-models';
import {getWorkspace, getWorkspacePath} from '@schematics/angular/utility/config';
import {NodePackageInstallTask, RunSchematicTask} from '@angular-devkit/schematics/tasks';

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
  return async (tree: Tree, context: SchematicContext) => {
    setupOptions(tree, options, context);

    return chain([
      (host: Tree) => {
        addPackageToPackageJson(host, options);

        // Pre-install @Angular CDK as we use some of the schematics API
        const npmInstallID = context.addTask(new NodePackageInstallTask());

        context.addTask(new RunSchematicTask('init-project', options), [
          npmInstallID
        ]);

        if (!options.skipStyles) {
          addStylesToAngularJson(host, context, options);
        }
      },
      async (host: Tree) => {
      },
      (_: Tree, aContext: SchematicContext) => {
        if (options.skipInstall) {
          return;
        }
        aContext.addTask(new NodePackageInstallTask());
      }
    ]);
  };
}


function addPackageToPackageJson(host: Tree, options: AddSchema): Tree {
  let uiLibs: NodeDependency[] = [];
  const core: NodeDependency[] = [
    {
      type: NodeDependencyType.Default, version: '^VERSION_PLACEHOLDER',
      name: '@ngx-metaui/rules'
    },
    {type: NodeDependencyType.Default, version: '1.6.48', name: 'big-integer'},
    {type: NodeDependencyType.Default, version: '^0.11.5', name: 'object-path'},
    {type: NodeDependencyType.Default, version: '^1.3.1', name: 'fnv-plus'},
    {type: NodeDependencyType.Default, version: '1.3.3', name: 'typescript-collections'},
    {type: NodeDependencyType.Dev, version: '^1.0.2', name: 'watch'}
  ];

  if (options.uiLib === 'material') {
    uiLibs = [
      {
        type: NodeDependencyType.Default,
        version: '^VERSION_PLACEHOLDER',
        name: '@ngx-metaui/material-rules'
      },
      {type: NodeDependencyType.Default, version: 'MATERIAL_PLACEHOLDER', name: '@angular/cdk'},
      {
        type: NodeDependencyType.Default, version: 'MATERIAL_PLACEHOLDER',
        name: '@angular/material'
      },
      {type: NodeDependencyType.Default, version: '^6.3.1', name: 'flexboxgrid'},
      {type: NodeDependencyType.Default, version: '6.6.7', name: 'rxjs'}
    ];
  }
  // else if (options.uiLib === 'fiori') {
  //   uiLibs = [
  //     {
  //       type: NodeDependencyType.Default, version: '^VERSION_PLACEHOLDER',
  //       name: '@ngx-metaui/fiori-rules'
  //     }, {
  //       type: NodeDependencyType.Default,
  //       version: 'FD_CORE_PLACEHOLDER',
  //       name: '@fundamental-ngx/core'
  //     }, {
  //       type: NodeDependencyType.Default, version: 'FD_PLATFORM_PLACEHOLDER',
  //       name: '@fundamental-ngx/platform'
  //     },
  //     {type: NodeDependencyType.Default, version: 'MATERIAL_PLACEHOLDER', name: '@angular/cdk'},
  //     {type: NodeDependencyType.Default, version: '^6.3.1', name: 'flexboxgrid'}
  //   ];
  // }

  const dependencies = [...core, ...uiLibs];
  dependencies.forEach(dependency => {
    // context.logger.info(`Adding ${dependency.name}:${dependency.version}`);
    doAddPackageToPackageJson(host, dependency.name, dependency.version);
  });
  return host;
}


function addStylesToAngularJson(host: Tree, context: SchematicContext, options: AddSchema): Tree {
  if (options.uiLib === 'none') {
    return host;
  }

  if (options.uiLib === 'material') {
    const styleEntries: string[] = [
      'node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css',
      'node_modules/flexboxgrid/css/flexboxgrid.css'
    ];
    return addStyles(host, context, styleEntries, options);
  } else if (options.uiLib === 'fiori') {
    const styleEntries: string[] = [
      'node_modules/flexboxgrid/dist/flexboxgrid.css',
      'node_modules/fundamental-styles/dist/fundamental-styles.css',
      'node_modules/fundamental-styles/dist/fonts.css',
      'node_modules/fundamental-styles/dist/icon.css'
    ];
    return addStyles(host, context, styleEntries, options);
  }

  return host;
}

function addStyles(host: Tree, context: SchematicContext,
                   styleEntries: string[], options: AddSchema): Tree {
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
    host.overwrite(getWorkspacePath(host), JSON.stringify(workspace, null, 2));

  } catch (e) {
    context.logger.log('warn',
      `✅️ Failed to add scripts into angular.json`);
  }
  return host;
}


function doAddPackageToPackageJson(host: Tree, pkg: string, version: string): Tree {
  if (host.exists('package.json')) {
    const sourceText = host.read('package.json')!.toString('utf-8');
    const json = JSON.parse(sourceText);

    if (!json.dependencies) {
      json.dependencies = {};
    }
    json.dependencies[pkg] = version;
    json.dependencies = sortObjectByKeys(json.dependencies);

    host.overwrite('package.json', JSON.stringify(json, null, 2));
  }

  return host;
}
