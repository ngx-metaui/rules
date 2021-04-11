import {AddSchema} from '../../common/add-schema';
import {
  apply, branchAndMerge,
  chain, mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';
import {classify, dasherize} from '@angular-devkit/core/src/utils/strings';

const stringUtils = {dasherize, classify};


export function addRulesSubsystem(options: AddSchema): Rule {
  return (host: Tree, context: SchematicContext) => {

    try {
      const movePath = normalize(options.path);
      const templateSource = apply(url('../files'), [
        template({
          ...stringUtils,
          ...options as object
        }),
        move(movePath)
      ]);
      return chain([
          branchAndMerge(chain([
            mergeWith(templateSource)
          ]))
        ]
      );

    } catch (e) {
      context.logger.log('warn',
        `✅️ Failed to add scripts into angular.json`);
    }
  };
}
