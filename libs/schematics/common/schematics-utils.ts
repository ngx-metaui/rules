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
  ProjectType,
  WorkspaceProject,
  WorkspaceSchema
} from '@schematics/angular/utility/workspace-models';
import {Schema} from './schema';
import {
  dirname,
  join,
  JsonParseMode,
  normalize,
  NormalizedRoot,
  parseJson,
  Path
} from '@angular-devkit/core';
import {DirEntry, SchematicContext, SchematicsException, Tree} from '@angular-devkit/schematics';
import {
  MODULE_EXT,
  ModuleOptions,
  ROUTING_MODULE_EXT
} from '@schematics/angular/utility/find-module';

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


export async function setupOptions(host: Tree, options: Schema, context: SchematicContext) {
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
  const project = getProject(host, options.project);


  if (project.projectType !== ProjectType.Application) {
    throw Error('At the moment we support only application project type !');
  }
  if (!options.path) {
    options.path = buildDefaultPath(project);
  }
  options.module = findModuleFromOptions(host, options);
}


export function buildDefaultPath(project: WorkspaceProject): string {
  const root = project.sourceRoot
    ? `/${project.sourceRoot}/`
    : `/${project.root}/src/`;

  const projectDirName =
    project.projectType === ProjectType.Application ? 'app' : 'lib';

  return `${root}${projectDirName}`;
}

export function sortObjectByKeys(obj: object): object {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => (result[key] = obj[key]) && result, {});
}

export function getWorkspacePath(host: Tree): string {
  const possibleFiles = ['/angular.json', '/.angular.json'];
  return possibleFiles.filter((path) => host.exists(path))[0];
}

export function getWorkspace(host: Tree): WorkspaceSchema {
  const path = getWorkspacePath(host);
  const configBuffer = host.read(path);
  if (configBuffer === null) {
    throw new SchematicsException(`Could not find (${path})`);
  }
  const content = configBuffer.toString();

  return (parseJson(content, JsonParseMode.Loose) as {}) as WorkspaceSchema;
}

export function getProject(
  workspaceOrHost: WorkspaceSchema | Tree,
  projectName: string
): WorkspaceProject {
  const workspace = isWorkspaceSchema(workspaceOrHost)
    ? workspaceOrHost
    : getWorkspace(workspaceOrHost);

  return workspace.projects[projectName];
}

export function isWorkspaceSchema(
  workspace: any
): workspace is WorkspaceSchema {
  return !!(workspace && (workspace as WorkspaceSchema).projects);
}


export function findModuleFromOptions(
  host: Tree,
  options: ModuleOptions
): Path | undefined {
  if (options.hasOwnProperty('skipImport') && options.skipImport) {
    return undefined;
  }

  const moduleExt = options.moduleExt || MODULE_EXT;
  const routingModuleExt = options.routingModuleExt || ROUTING_MODULE_EXT;

  if (!options.module) {
    const pathToCheck = (options.path || '') + '/' + options.name;

    return normalize(
      findModule(host, pathToCheck, moduleExt, routingModuleExt)
    );
  } else {
    const modulePath = normalize(`/${options.path}/${options.module}`);
    const componentPath = normalize(`/${options.path}/${options.name}`);
    const moduleBaseName = normalize(modulePath)
      .split('/')
      .pop();

    const candidateSet = new Set<Path>([normalize(options.path || '/')]);

    for (let dir = modulePath; dir !== NormalizedRoot; dir = dirname(dir)) {
      candidateSet.add(dir);
    }
    for (let dir = componentPath; dir !== NormalizedRoot; dir = dirname(dir)) {
      candidateSet.add(dir);
    }

    const candidatesDirs = [...candidateSet].sort(
      (a, b) => b.length - a.length
    );
    for (const c of candidatesDirs) {
      const candidateFiles = [
        '',
        `${moduleBaseName}.ts`,
        `${moduleBaseName}${moduleExt}`
      ].map(x => join(c, x));

      for (const sc of candidateFiles) {
        if (host.exists(sc)) {
          return normalize(sc);
        }
      }
    }

    throw new Error(
      `Specified module '${options.module}' does not exist.\n` +
      `Looked in the following directories:\n    ${candidatesDirs.join(
        '\n    '
      )}`
    );
  }
}

export function findModule(
  host: Tree,
  generateDir: string,
  moduleExt = MODULE_EXT,
  routingModuleExt = ROUTING_MODULE_EXT
): Path {
  let dir: DirEntry | null = host.getDir('/' + generateDir);
  let foundRoutingModule = false;

  while (dir) {
    const allMatches = dir.subfiles.filter(p => p.endsWith(moduleExt));
    const filteredMatches = allMatches.filter(
      p => !p.endsWith(routingModuleExt)
    );

    foundRoutingModule =
      foundRoutingModule || allMatches.length !== filteredMatches.length;

    if (filteredMatches.length === 1) {
      return join(dir.path, filteredMatches[0]);
    } else if (filteredMatches.length > 1) {
      throw new Error(
        'More than one module matches. Use skip-import option to skip importing ' +
        'into the closest module.'
      );
    }

    dir = dir.parent;
  }

  const errorMsg = foundRoutingModule
    ? 'Could not find a non Routing NgModule.' +
    `\nModules with suffix '${routingModuleExt}' are strictly reserved for routing.` +
    '\nUse the skip-import option to skip importing in NgModule.'
    : 'Could not find an NgModule. Use the skip-import option to skip importing in NgModule.';

  throw new Error(errorMsg);
}


