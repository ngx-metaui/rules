/**
 * @license
 * Copyright 2019 Frank Kolar
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
  OSSBindingValueAst,
  OSSFileAst,
  OSSLocalizedStringValueAst,
  OSSRuleBodyPropertyAst, OSSSelectorAst
} from './metaui-ast';
import {OSSTokenType} from './oss-lexer';
import {InputRule, RulesVisitor} from './rules-visitor';
import {Selector} from '../rule';

/**
 * Produces js string literal structure used for Offline rules. Offline Rules are JS based files
 * with pre-compiled content
 */
export class OfflineRulesVisitor extends RulesVisitor {
  public ossRules: Array<InputRule> = [];

  constructor(ossFile: OSSFileAst) {
    super(ossFile);
    this.visit();
  }

  protected addRule(rule: InputRule): void {
    this.ossRules.push(rule);
  }

  protected addPredecessorRule(itemName: string, contextPreds: Array<Selector>,
                               predecessor: string, traits: Array<string>,
                               lineNumber: number): void {
  }


  visitSelector(ast: OSSSelectorAst, context?: any): any {
    super.visitSelector(ast, context);
    const selector = this.currentSelector(context);
    if (ast.hasNullMarker) {
      selector._value = {};
    }
  }

  visitRuleProperty(ast: OSSRuleBodyPropertyAst, context?: any): any {
    const map = this.currentProperties(context);
    const value = ast.value.visit(this, context);

    if (ast.isOverride) {
      map.set(ast.key, {
        t: 'OV',
        v: value
      });
    } else {
      map.set(ast.key, value);
    }
  }

  visitBindingValue(ast: OSSBindingValueAst, context?: any): any {
    return {
      t: 'CFP',
      v: ast.value
    };
  }


  visitExprValue(ast: OSSBindingValueAst, context?: any): any {
    if (ast.nodeType === OSSTokenType.ExprLiteral) {
      return {
        t: 'Expr',
        v: ast.value
      };

    } else if (ast.nodeType === OSSTokenType.ExprLiteralStaticDyn) {
      return {
        t: 'SDW',
        v: ast.value
      };
    }
    return null;
  }


  visitI18Value(ast: OSSLocalizedStringValueAst, context?: any): any {
    return {
      t: 'i18n',
      v: {
        key: ast.localizedKey,
        defVal: ast.value
      }
    };
  }
}
