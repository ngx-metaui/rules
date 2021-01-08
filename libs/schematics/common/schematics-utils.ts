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
import {SchematicContext, SchematicsException, Tree} from '@angular-devkit/schematics';
import {getWorkspace} from '@schematics/angular/utility/config';
import {
  ProjectType,
  WorkspaceProject,
  WorkspaceSchema
} from '@schematics/angular/utility/workspace-models';
import {Schema} from './schema';
import {getProjectFromWorkspace} from '@angular/cdk/schematics';

const CONFIG_FILE_NAME = 'angular.json';


export type ProjectSettings = Schema & {
  workspace: WorkspaceSchema;
  projectWorkspace: WorkspaceProject<any>;
  config: any;
  standalone: boolean;
};

/**
 *
 *
 * Set of utilities copied and modified from schematics core for use of this project
 *
 *
 */


export function setupOptions(host: Tree, options: Schema, context: SchematicContext): Tree {
  if (!host.exists(CONFIG_FILE_NAME)) {
    throw new SchematicsException('Could not install MetaUI it requires Angular and ' +
      'Angular CLI version 10 or greater');
  }
  const file = host.get(CONFIG_FILE_NAME);

  let config;
  try {
    config = JSON.parse(file!.content.toString());
  } catch (e) {
    throw new SchematicsException(`Cant parse file under  ${CONFIG_FILE_NAME}!`);
  }

  if (!options.project) {
    if (!config.defaultProject) {
      throw new SchematicsException('Could not find a default project, please specify ' +
        '--project PROJECT_NAME');
    }
    options.project = config.defaultProject;
  }
  const workspace = getWorkspace(host);
  const projectWorkspace = getProjectFromWorkspace(workspace);

  if (projectWorkspace.projectType !== 'application') {
    throw Error('At the moment we support only application project type !');
  }
  if (!options.path) {
    options.path = buildDefaultPath(projectWorkspace);
  }
  return host;
}


function buildDefaultPath(project: any) {
  const root = project.sourceRoot ? `/${project.sourceRoot}/` : `/${project.root}/src/`;
  const projectDirName = project.projectType === ProjectType.Application ? 'app' : 'lib';
  return `${root}${projectDirName}`;
}
