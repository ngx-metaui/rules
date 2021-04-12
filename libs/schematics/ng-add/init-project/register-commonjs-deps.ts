import {AddSchema} from '../../common/add-schema';
import {Rule, Tree} from '@angular-devkit/schematics';
import {getProject, getWorkspace} from '../../common/schematics-utils';
import {getWorkspacePath} from '@schematics/angular/utility/config';


export function registerCommonJSDependecies(options: AddSchema): Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProject(host, options.project);
    const targetOptions = workspace.projects[options.project].architect?.build?.options || {};

    if (!targetOptions['allowedCommonJsDependencies']) {
      targetOptions['allowedCommonJsDependencies'] = [];
    }

    targetOptions['allowedCommonJsDependencies'].push('big-integer');
    targetOptions['allowedCommonJsDependencies'].push('object-path');
    targetOptions['allowedCommonJsDependencies'].push('typescript-collections');


    host.overwrite(getWorkspacePath(host), JSON.stringify(workspace, null, 2));

    return host;
  };
}
