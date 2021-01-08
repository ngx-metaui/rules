import {AddSchema} from '../add-schema';
import {chain, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {getWorkspace} from '@schematics/angular/utility/config';
import {
  addModuleImportToRootModule,
  getAppModulePath,
  getProjectFromWorkspace,
  getProjectMainFile,
  insertImport,
  parseSourceFile
} from '@angular/cdk/schematics';
import {Change, InsertChange} from '@schematics/angular/utility/change';


export function addUILibraryRequiredModulesAndImports(options: AddSchema): Rule {
  return chain([
    addFileHeaderImports(options),
    addNgModuleImports(options)
  ]);
}

function addNgModuleImports(options: AddSchema): Rule {
  return (host: Tree, context: SchematicContext) => {
    try {
      const workspace = getWorkspace(host);
      const project = getProjectFromWorkspace(workspace);
      const modulePath = getAppModulePath(host, getProjectMainFile(project));
      const sourceText = host.read(modulePath)!.toString('utf-8');


      if (options.uiLib === 'material') {
        const hasModule = sourceText.includes('MaterialRulesModule.forRoot');
        if (!hasModule) {
          addModuleImportToRootModule(host, 'MaterialRulesModule.forRoot()',
            '@ngx-metaui/material-rules', project);
        }

      } else if (options.uiLib === 'fiori') {
        const hasModule = sourceText.includes('MaterialRulesModule');
        if (!hasModule) {
          addModuleImportToRootModule(host, 'FioriRulesModule.forRoot()',
            '@ngx-metaui/fiori-rules', project);
        }
      }
    } catch (e) {
      context.logger.log('warn',
        `✅️ Failed to add MetaUIRulesModule into NgModule imports ${e}`);
    }
    return host;
  };
}


function addFileHeaderImports(options: AddSchema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace);
    const modulePath = getAppModulePath(host, getProjectMainFile(project));
    const moduleSource: any = parseSourceFile(host, modulePath);

    const recorder = host.beginUpdate(modulePath);
    const changes: Change[] = [];

    if (options.uiLib === 'material') {
      changes.push(
        insertImport(moduleSource, modulePath, 'MaterialRulesModule',
          '@ngx-metaui/material-rules')
      );
    } else if (options.uiLib === 'fiori') {
      changes.push(
        insertImport(moduleSource, modulePath, 'FioriRulesModule',
          '@ngx-metaui/fiori-rules')
      );
    }
    changes.forEach((change) => {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    });

    host.commitUpdate(recorder);
    return host;
  };
}
