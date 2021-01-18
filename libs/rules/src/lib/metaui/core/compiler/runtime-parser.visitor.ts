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


import {OSSBindingValueAst, OSSLocalizedStringValueAst, OSSRuleBodyPropertyAst} from './metaui-ast';
import {OSSLexer, OSSTokenType} from './oss-lexer';
import {InputRule, InputSelector, RulesVisitor} from './rules-visitor';
import {
  ContextFieldPath,
  Expr,
  StaticallyResolvableWrapper,
  StaticDynamicWrapper
} from '../property-value';
import {OverrideValue} from '../policies/merging-policy';
import {Rule, Selector} from '../rule';
import {OSSParser} from './oss-parser';
import {Meta} from '../meta';
import {UIMeta} from '../uimeta';


/**
 * Registers current rule with the Rule engine using method addRule()
 */
export class RuntimeParser extends RulesVisitor {
  parser: OSSParser;

  constructor(ossRule: any, private _meta: Meta, private module: string = 'system') {
    super();

    const lexer = new OSSLexer(ossRule.default || ossRule);
    this.parser = new OSSParser(lexer);

  }

  registerRules(): void {
    this.ossFile = this.parser.parse();
    this.visit();
  }


  registerRuleBody(selectorList: Array<Selector>): void {
    const context = {};
    const inputRule = new InputRule();
    this.push(inputRule);

    const ruleBodyAst = this.parser.parseRuleBody();
    inputRule._selectors = selectorList.map<InputSelector>((s: Selector) => {
      return new InputSelector(s.key, s.value, s.isDecl);
    });
    ruleBodyAst.visit(this, context);
    this.pop();
  }

  visitRuleProperty(ast: OSSRuleBodyPropertyAst, context?: any): any {
    const map = this.currentProperties(context);
    const value = ast.value.visit(this, context);

    if (ast.isOverride) {
      map.set(ast.key, new OverrideValue(value));

    } else {
      map.set(ast.key, value);
    }
  }

  visitBindingValue(ast: OSSBindingValueAst, context?: any): any {
    return new ContextFieldPath(ast.value);
  }

  visitExprValue(ast: OSSBindingValueAst, context?: any): any {
    if (ast.nodeType === OSSTokenType.ExprLiteral) {
      return new Expr(ast.value, this._meta);

    } else if (ast.nodeType === OSSTokenType.ExprLiteralStaticDyn) {
      const expr = new Expr(ast.value, this._meta);
      return new StaticDynamicWrapper(new StaticallyResolvableWrapper(expr));
    }
    return null;
  }

  visitI18Value(ast: OSSLocalizedStringValueAst, context?: any): any {
    return this._meta.createLocalizedString(ast.localizedKey, ast.value);
  }

  protected addRule(rule: InputRule): void {
    const selectors: Array<Selector> = this.toSelectors(rule);
    this._meta.addRule(new Rule(selectors, rule._properties, 0));
  }

  protected addPredecessorRule(itemName: string, contextPreds: Array<Selector>,
                               predecessor: string, traits: Array<string>,
                               lineNumber: number): void {

    (this._meta as UIMeta).addPredecessorRule(itemName, contextPreds, predecessor, traits, lineNumber);
  }
}
