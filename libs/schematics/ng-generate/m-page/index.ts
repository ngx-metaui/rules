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
  Rule,
  SchematicContext,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import {MetaPageSchema} from './page-schema';
import {getMainProjectPath, getSourceFile, setupOptions} from '../../common/schematics-utils';
import {normalize, strings} from '@angular-devkit/core';
import {
  addDeclarationToModule,
  addImportToModule,
  getSourceNodes,
  isImported
} from '@schematics/angular/utility/ast-utils';
import * as ts from 'typescript';
import {InsertChange} from '@schematics/angular/utility/change';
import {getAppModulePath} from '@schematics/angular/utility/ng-ast-utils';
import {buildRelativePath} from '@schematics/angular/utility/find-module';
import {black, bold, green} from '@angular-devkit/core/src/terminal';


/**
 * ng-add performs set of task to setup existing or new angular application for basic structure
 * need to develop MetaUI application.
 *
 * Once you run this should be good to go to create and render your domain objects
 *
 *
 *
 */
export default function (options: MetaPageSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    setupOptions(tree, options);


    return chain([
      copyModel(options),
      defineComponent(options),
      setupRules(options),
      printHowTo(options)

    ]);
  };
}

/***
 * Builds component with a basic setup that instantiate above domain class so it can be
 * used in the provided template
 *
 */
function defineComponent(options: MetaPageSchema): Rule {
  return (host: Tree, context: SchematicContext) => {

    try {

      const movePath = (options.flat) ?
        normalize(strings.dasherize(options.path)) :
        normalize(strings.dasherize((options.path) + '/' + strings.dasherize(options.name)));


      const templateSource = apply(url('./files/component'), [
        template({
          ...strings,
          ...options as object
        }),
        move(movePath)
      ]);


      const componentPath = normalize(
        `${movePath}/${strings.dasherize(options.name)}.component`);


      context.logger.log('info', `✅️ ${options.name} component is ready.`);
      return chain([
          branchAndMerge(chain([
            mergeWith(templateSource)
          ])),
          addNgModuleImportAndDefinition(options, componentPath)
        ]
      );

    } catch (e) {
      context.logger.log('warn',
        `✅️ Failed to define ${options.name} component ${e}`);
    }
  };
}


/***
 * Copies into provided location and pre-process domain model class
 *
 */
function copyModel(options: MetaPageSchema): Rule {
  return (host: Tree, context: SchematicContext) => {

    try {
      const movePath = normalize(options.path + '/' + strings.dasherize(options.modelPath));

      const templateSource = apply(url('./files/model'), [
        template({
          ...strings,
          ...options as object
        }),
        move(movePath)
      ]);

      context.logger.log('info',
        `✅️ Model class ${options.modelClass} is created with default attributes`);

      return chain([
          branchAndMerge(chain([
            mergeWith(templateSource)
          ]))
        ]
      );

    } catch (e) {
      context.logger.log('warn',
        `✅️ Failed to copy class model files`);
    }
  };
}

/**
 * Copies domain class and insert exports to user-rules.ts
 *
 */
function setupRules(options: MetaPageSchema): Rule {
  return (host: Tree, context: SchematicContext) => {

    try {
      const movePath = normalize(options.path + '/rules');
      const templateSource = apply(url('./files/rules'), [
        template({
          ...strings,
          ...options as object
        }),
        move(movePath)
      ]);


      context.logger.log('info',
        `✅️ OSS file created inside /rules directory.`);

      return chain([
          branchAndMerge(chain([
            mergeWith(templateSource)
          ])),
          addRecordToUserRules(options)

        ]
      );

    } catch (e) {
      context.logger.log('warn',
        `✅️ Failed to add scripts into angular.json`);
    }
  };
}


/**
 * Copies domain class and insert exports to user-rules.ts
 *
 */
function addRecordToUserRules(options: MetaPageSchema): Rule {
  return (host: Tree, context: SchematicContext) => {

    try {
      const pathToUserRules = normalize(options.path + '/rules/user-rules.ts');
      const path = getSourceFile(host, pathToUserRules);
      const tsClass = strings.classify(options.modelClass);

      const exportList = getSourceNodes(path)
        .find(n => n.kind === ts.SyntaxKind.SyntaxList);

      if (exportList) {
        const exports = exportList.getChildren();

        const lastExport = exports[exports.length - 1];


        const rec = `\n\n/** Auto generated  export */\nexport * from './ts/${tsClass}OSS';`;
        const change = new InsertChange(pathToUserRules, lastExport.getEnd(), rec);

        const declarationRecorder = host.beginUpdate(pathToUserRules);
        declarationRecorder.insertLeft(change.pos, change.toAdd);
        host.commitUpdate(declarationRecorder);

      }

      return host;
    } catch (e) {
      context.logger.log('warn',
        `✅️ Failed to add new export to the user-rules.ts ${e}`);
    }
  };
}


function addNgModuleImportAndDefinition(options: MetaPageSchema, componentPath: string): Rule {
  return (host: Tree, context: SchematicContext) => {

    try {

      const modulePath = getAppModulePath(host, getMainProjectPath(host, options));
      const relativePath = buildRelativePath(modulePath, componentPath);

      const srcPath = getSourceFile(host, modulePath);
      const compName = strings.classify(`${options.name}Component`);

      if (!isImported(srcPath, compName, relativePath)) {
        let changes = addDeclarationToModule(srcPath, modulePath, compName, relativePath);

        if (options.uiLib === 'material') {
          const matButton = ['MatButtonModule', '@angular/material'];
          changes = [...changes, ...addImportToModule(srcPath, modulePath, matButton[0],
            matButton[1])];

        } else if (options.uiLib === 'fiori') {
          const fButton = ['ButtonModule', '@fundamental-ngx/core'];
          changes = [...changes, ...addImportToModule(srcPath, modulePath, fButton[0],
            fButton[1])];
        }

        const recorder = host.beginUpdate(modulePath);
        changes.forEach((change) => {
          if (change instanceof InsertChange) {
            recorder.insertLeft(change.pos, change.toAdd);
          }
        });
        host.commitUpdate(recorder);
        context.logger.log('info', `✅️ Component Added to NgModule declarations`);

      } else {
        context.logger.log('info', `✅️ Import Component already exists`);
      }

    } catch (e) {
      context.logger.log('warn',
        `✅️ Failed to add Component into NgModule declarations ${e}`);
    }
    return host;
  };
}


function printHowTo(options: MetaPageSchema): Rule {
  return (host: Tree, context: SchematicContext) => {

    const header = black('Your MetaUI is ready');
    const body = black('Your MetaUI is ready');

    const hint = `
    \n############ Your MetaUI is ready '######################

    \nThe next step is to run following commands to see all in action:\n
      ► ${bold(green('npm run compile:oss'))}
      ► Attach this newly created component either to your router or defaul AppComponent page
      ► ${bold(green('ng serve'))}

    `;


    context.logger.log('info', hint);


    return host;
  };
}
