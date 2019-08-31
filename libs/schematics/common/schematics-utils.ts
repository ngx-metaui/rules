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
import {Rule, SchematicContext, SchematicsException, Tree} from '@angular-devkit/schematics';
import {addPackageJsonDependency, NodeDependency} from '@schematics/angular/utility/dependencies';
import {NodePackageInstallTask} from '@angular-devkit/schematics/tasks';
import {getWorkspace} from '@schematics/angular/utility/config';
import {getAppModulePath} from '@schematics/angular/utility/ng-ast-utils';
import {getSourceNodes, insertImport, isImported} from '@schematics/angular/utility/ast-utils';
import {Change, InsertChange, NoopChange} from '@schematics/angular/utility/change';
import * as ts from 'typescript';
import {buildDefaultPath, getProject} from '@schematics/angular/utility/project';
import {WorkspaceProject, WorkspaceSchema} from '@schematics/angular/utility/workspace-models';
import {Schema} from './schema';


/**
 *
 *
 * Set of utilities copied and modified from schematics core for use of this project
 *
 *
 */

const RegisterBody =
  `\n   // mandatory - you need to register app defined rules and types since there is no
   // introspection in js

    const rules: any[] = config.get('metaui.rules.user-rules') || [];
    rules.push(userRules);
    config.set('metaui.rules.user-rules', rules);
`;

export function addDependenciesToPackageJson(dependencies: NodeDependency[],
                                             skipInstall: boolean): Rule {
  return (host: Tree, context: SchematicContext) => {


    dependencies.forEach(dependency => {
      addPackageJsonDependency(host, dependency);
    });
    context.logger.log('info',
      `✅️ Added ${dependencies.length} packages into dependencies section`);

    if (!skipInstall) {
      context.addTask(new NodePackageInstallTask());
      context.logger.log('info', `🔍 Installing packages...`);
    }
    return host;
  };
}



export function addFileHeaderImports(options: Schema, importSymbol: string,
                                     importPath: string, isDefault?: boolean): Rule {

  return (host: Tree, context: SchematicContext) => {
    try {

      const modulePath = getAppModulePath(host, getMainProjectPath(host, options));
      const srcPath = getSourceFile(host, modulePath);

      if (!isImported(srcPath, importSymbol, importPath)) {
        const changes = doAddImportStatement(srcPath, modulePath, importSymbol, importPath,
          isDefault);

        const recorder = host.beginUpdate(modulePath);
        changes.forEach((change) => {
          if (change instanceof InsertChange) {
            recorder.insertLeft(change.pos, change.toAdd);
          }
        });
        host.commitUpdate(recorder);

      } else {
        context.logger.log('info', `✅️ Import MetaUIRulesModule already exists`);
      }

    } catch (e) {
      context.logger.log('warn', `✅️ Failed to add Import module ${e}`);
    }
    return host;
  };
}


export function setupOptions(host: Tree, options: Schema): Tree {
  const workspace = getWorkspace(host);

  const projectName = options.project || workspace.defaultProject;

  if (!projectName) {
    throw Error(`Cant Find project by name ${projectName}`);
  }
  const project = getProject(host, projectName);

  if (project.projectType !== 'application') {
    throw Error('At the moment we support only application project type !');
  }
  if (!options.path) {
    options.path = buildDefaultPath(project);
  }
  return host;
}

/**
 *
 * Please see ast-utils.addSymbolToNgModuleMetadata for more info. I need to be able
 * to insert only import
 *
 */
function doAddImportStatement(source: ts.SourceFile, ngModulePath: string, symbolName: string,
                              importPath: string | null = null, isDefault?: boolean): Change[] {

  if (importPath !== null) {

    return [
      insertImport(source, ngModulePath, symbolName.replace(/\..*$/, ''),
        importPath, isDefault)
    ];
  }
  return [];
}


export function getSourceFile(host: Tree, path: string) {
  const buffer = host.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not find file for path: ${path}`);
  }
  const content = buffer.toString();
  return ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
}


export function getMainProjectPath(host: Tree, options: Schema) {
  const project: WorkspaceProject = getWorkspaceProject(host, options);

  return (<any>project.architect).build.options.main;
}


export function getWorkspaceProject(host: Tree, options: Schema) {

  const workspace: WorkspaceSchema = getWorkspace(host);
  const projectName = options.project || workspace.defaultProject;

  if (!projectName) {
    throw Error(`Cant Find project by name ${projectName}`);
  }
  return workspace.projects[projectName];
}

export function registerUserRulesWithMetaConfig(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {

    const modulePath = getAppModulePath(host, getMainProjectPath(host, options));

    const changes = addConstructorInjectionForAppConfig(host, options);
    const declarationRecorder = host.beginUpdate(modulePath);
    for (const change of changes) {
      if (change instanceof InsertChange) {
        declarationRecorder.insertLeft(change.pos, change.toAdd);
      }
    }
    host.commitUpdate(declarationRecorder);

    context.logger.log('info', '✅️ App module class updated with MetaConfig ' +
      'injection');
    return host;
  };
}


function addConstructorInjectionForAppConfig(host: Tree, options: Schema): Change[] {
  const modulePath = getAppModulePath(host, getMainProjectPath(host, options));
  const srcPath = getSourceFile(host, modulePath);
  const nodes = getSourceNodes(srcPath);
  const ctorNode = nodes.find(n => n.kind === ts.SyntaxKind.Constructor);

  let constructorChange: Change[];
  if (!ctorNode) {
    constructorChange = createConstructorForInjection(modulePath, nodes);

  } else {
    constructorChange = addInjectionToExistingConstructor(modulePath, ctorNode);
  }
  return constructorChange;

}

function createConstructorForInjection(modulePath: string, nodes: ts.Node[]): Change[] {

  const classNode = nodes.find(n => n.kind === ts.SyntaxKind.ClassKeyword);
  if (!classNode) {
    throw new SchematicsException(`expected class in ${modulePath}`);
  }
  if (!classNode.parent) {
    throw new SchematicsException(`expected constructor in ${modulePath}
    to have a parent node`);
  }

  let siblings = classNode.parent.getChildren();
  const classIndex = siblings.indexOf(classNode);

  siblings = siblings.slice(classIndex);
  const classIdentifierNode = siblings.find(n => n.kind === ts.SyntaxKind.Identifier);

  if (!classIdentifierNode) {
    throw new SchematicsException(`expected class in ${modulePath} to have an identifier`);
  }

  const curlyNodeIndex = siblings.findIndex(n => n.kind === ts.SyntaxKind.FirstPunctuation);
  siblings = siblings.slice(curlyNodeIndex);

  const listNode = siblings.find(n => n.kind === ts.SyntaxKind.SyntaxList);

  if (!listNode) {
    throw new SchematicsException(`expected first class in ${modulePath} to have a body`);
  }

  const toAdd = `

  constructor(private config: MetaConfig) {
    ${RegisterBody}
  }
`;

  return [new InsertChange(modulePath, listNode.pos + 1, toAdd)];

}


function addInjectionToExistingConstructor(modulePath: string, ctorNode: ts.Node): Change[] {

  const siblings = ctorNode.getChildren();

  const parameterListNode = siblings.find(n => n.kind === ts.SyntaxKind.SyntaxList);

  if (!parameterListNode) {
    throw new SchematicsException(`expected constructor in ${modulePath} to have a parameter list`);
  }

  const parameterNodes = parameterListNode.getChildren();

  const paramNode = parameterNodes.find(p => {
    const typeNode = findSuccessor(p, [ts.SyntaxKind.TypeReference,
      ts.SyntaxKind.Identifier]);
    if (!typeNode) {
      return false;
    }
    return typeNode.getText() === 'MetaConfig';
  });

  if (!paramNode && parameterNodes.length === 0) {
    const toAdd = `private config: MetaConfig`;
    return [new InsertChange(modulePath, parameterListNode.pos, toAdd)];

  } else if (!paramNode && parameterNodes.length > 0) {

    const toAdd = `, private config: MetaConfig`;
    const lastParameter = parameterNodes[parameterNodes.length - 1];

    const ctorBlock = siblings.find(n => n.kind === ts.SyntaxKind.Block);
    if (!ctorBlock) {
      throw new SchematicsException(`unable to locale ctor block`);
    }

    const bodyStart = ctorBlock.getChildren().find(n => n.kind === ts.SyntaxKind.SyntaxList);
    if (!bodyStart) {
      throw new SchematicsException(`unable to locale ctor body`);
    }

    return [
      new InsertChange(modulePath, lastParameter.end, toAdd),
      new InsertChange(modulePath, bodyStart.pos, RegisterBody)
    ];
  }

  return [new NoopChange()];
}


function findSuccessor(node: ts.Node, searchPath: ts.SyntaxKind[]) {
  let children = node.getChildren();
  let next: ts.Node | undefined;

  for (const syntaxKind of searchPath) {
    next = children.find(n => n.kind === syntaxKind);
    if (!next) {
      return null;
    }
    children = next.getChildren();
  }
  return next;
}


export function showTree(node?: ts.Node, indent: string = '    '): void {
  if (!node) {
    return;
  }

  console.log(indent + ts.SyntaxKind[node.kind]);

  if (node.getChildCount() === 0) {
    console.log(indent + '    Text: ' + node.getText());
  }

  for (const child of node.getChildren()) {
    showTree(child, indent + '    ');
  }
}


export function readPackageJson(host: Tree) {
  if (host.exists('package.json')) {
    const jsonStr = host.read('package.json') !.toString('utf-8');
    const json = JSON.parse(jsonStr);

    return json;
  }

  throw new SchematicsException('Cant read package.json in order to add script');
}
