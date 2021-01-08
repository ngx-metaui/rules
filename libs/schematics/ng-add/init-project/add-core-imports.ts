import {AddSchema} from '../add-schema';
import {chain, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {getWorkspace} from '@schematics/angular/utility/config';
import {
  addModuleImportToModule,
  addModuleImportToRootModule,
  getAppModulePath,
  getProjectFromWorkspace,
  getProjectMainFile,
  insertImport,
  parseSourceFile
} from '@angular/cdk/schematics';
import {InsertChange} from '@schematics/angular/utility/change';


export function addRulesRequiredModulesAndImports(options: AddSchema): Rule {
  return chain([
    addFileHeaderImports(options),
    addNgModuleImports(options)
  ]);
}

function addNgModuleImports(options: AddSchema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const animImport = ['BrowserAnimationsModule', '@angular/platform-browser/animations'];

    try {
      const workspace = getWorkspace(host);
      const project = getProjectFromWorkspace(workspace);
      const modulePath = getAppModulePath(host, getProjectMainFile(project));
      const sourceText = host.read(modulePath)!.toString('utf-8');
      const hasNxModule = sourceText.includes('MetaUIRulesModule.forRoot({})');

      if (!hasNxModule) {
        addModuleImportToModule(host, modulePath, animImport[0], animImport[1]);
        addModuleImportToRootModule(host, 'MetaUIRulesModule.forRoot({})',
          '@ngx-metaui/rules', project);
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
    const changes = [
      insertImport(moduleSource, modulePath, 'MetaConfig, MetaUIRulesModule',
        '@ngx-metaui/rules'),
      insertImport(moduleSource, modulePath, '* as userRules',
        './rules/user-rules', true)
    ];

    changes.forEach((change) => {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    });

    host.commitUpdate(recorder);
    return host;
  };
}
