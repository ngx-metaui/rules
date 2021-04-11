import {chain, Rule} from '@angular-devkit/schematics';
import {addRulesSubsystem} from './add-rules-subsystem';
import {addRulesRequiredModulesAndImports} from './add-core-imports';
import {addOSScriptsToPackageJson} from './add-oss-compile-script';
import {AddSchema} from '../../common/add-schema';
import {addUILibraryRequiredModulesAndImports} from './add-ui-lib-imports';
import {registerUserRulesWithMetaConfig} from './register-app-rules';
import {registerCommonJSDependecies} from './register-commonjs-deps';

export default function (options: AddSchema): Rule {
  return chain([
    registerCommonJSDependecies(options),
    addRulesSubsystem(options),
    addRulesRequiredModulesAndImports(options),
    registerUserRulesWithMetaConfig(options),
    addUILibraryRequiredModulesAndImports(options),
    addOSScriptsToPackageJson(options)
  ]);
}
