import {AddSchema} from '../add-schema';
import {Rule, Tree} from '@angular-devkit/schematics';
import {getWorkspace} from '@schematics/angular/utility/config';
import {getProjectFromWorkspace, getProjectTargetOptions} from '@angular/cdk/schematics';


export function registerCommonJSDependecies(options: AddSchema): Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const targetOptions = getProjectTargetOptions(project, 'build');

    if (!targetOptions.allowedCommonJsDependencies) {
      targetOptions.allowedCommonJsDependencies = [];
    }
    targetOptions.allowedCommonJsDependencies.push('big-integer');
    targetOptions.allowedCommonJsDependencies.push('object-path');
    targetOptions.allowedCommonJsDependencies.push('typescript-collections');


    host.overwrite('angular.json', JSON.stringify(workspace,
      null,
      2));
    return host;
  };
}
