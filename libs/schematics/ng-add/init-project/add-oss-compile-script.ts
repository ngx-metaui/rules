import {AddSchema} from '../../common/add-schema';
import {Rule, SchematicContext, SchematicsException, Tree} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';

export function addOSScriptsToPackageJson(options: AddSchema): Rule {
  return (host: Tree, context: SchematicContext) => {

    const content = readPackageJson(host);
    if (!content['scripts']) {
      content['scripts'] = {};
    }
    const srcPath = normalize(`./${options.path}/rules`);
    content['scripts']['compile:oss'] = `oss -i ${srcPath} -u -n user-rules`;
    content['scripts']['watch:oss'] = `watch --wait=8 'npm run compile:oss' ${srcPath} `;

    host.overwrite('package.json', JSON.stringify(content, null, 2));
    return host;
  };
}

export function readPackageJson(host: Tree) {
  if (host.exists('package.json')) {
    const jsonStr = host.read('package.json') !.toString('utf-8');
    const json = JSON.parse(jsonStr);

    return json;
  }

  throw new SchematicsException('Cant read package.json in order to add script');
}
