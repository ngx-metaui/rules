import {AddSchema} from '../../common/add-schema';
import {chain, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {addModuleImportToModule, insertImport, parseSourceFile} from '@angular/cdk/schematics';
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
      const imports = [
        'MaterialRulesModule.forRoot()', '@ngx-metaui/material-rules',
        'FioriRulesModule.forRoot()', '@ngx-metaui/fiori-rules',
      ];


      const modulePath = options.module as string;
      const sourceText = host.read(modulePath)!.toString('utf-8');

      if (options.uiLib === 'material') {
        const hasModule = sourceText.includes('MaterialRulesModule.forRoot');
        if (!hasModule) {
          addModuleImportToModule(host, modulePath, imports[0], imports[1]);
        }
      }
      if (options.uiLib === 'fiori') {
        const hasModule = sourceText.includes('MaterialRulesModule');
        if (!hasModule) {
          addModuleImportToModule(host, modulePath, imports[2], imports[3]);
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
    const modulePath = options.module as string;
    const moduleSource: any = parseSourceFile(host, modulePath);

    const recorder = host.beginUpdate(modulePath);
    const changes: Change[] = [];

    if (options.uiLib === 'material') {
      changes.push(
        insertImport(moduleSource, modulePath, 'MaterialRulesModule',
          '@ngx-metaui/material-rules')
      );
    }

    // else if (options.uiLib === 'fiori') {
    //   changes.push(
    //     insertImport(moduleSource, modulePath, 'FioriRulesModule',
    //       '@ngx-metaui/fiori-rules')
    //   );
    // }
    changes.forEach((change) => {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    });

    host.commitUpdate(recorder);
    return host;
  };
}
