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
  OssAstVisitor,
  OSSBindingValueAst,
  OSSFileAst,
  OSSLocalizedStringValueAst,
  OSSMapValueAst,
  OSSPrecedenceChainAst,
  OSSPrecedenceChainNodeAst,
  OSSRuleAst,
  OSSRuleBodyAst,
  OSSRuleBodyPropertyAst,
  OSSSelectorAst,
  OSSSelectorKeyAst,
  OSSSimpleValueAst,
  OSSTraitAst,
  OSSValueAst,
  OSSValueOrListValueAst,
  OSSWrappedListValueAst
} from './metaui-ast';
import {NullMarker} from '../meta-rules';
import {Selector} from '../rule';
import {assert, isArray} from '../utils/lang';

/**
 *
 * Base class traversing Rule AST tree with specific extension points to register rule.
 *
 */
export abstract class RulesVisitor implements OssAstVisitor {
  protected ruleCheck: Array<number> = [];
  protected ruleStack: Array<InputRule> = [];

  constructor(protected ossFile?: OSSFileAst, private context: any = {}) {
  }

  visit(): void {
    this.ossFile.visit(this, this.context);
  }

  visitRuleFile(ast: OSSFileAst, context?: any): any {
    ast.rules.forEach((rule: OSSRuleAst) => rule.visit(this, context));
  }

  visitRule(ast: OSSRuleAst, context?: any): any {
    this.push(new InputRule());

    if (ast.selectorList) {
      ast.selectorList.forEach((s) => {
        s.visit(this, context);
      });
    }

    if (ast.traitList) {
      ast.traitList.forEach((t: OSSTraitAst, index: number, array: OSSTraitAst[]) => {
        t.visit(this, context);
      });
    }

    if (ast.ruleBody && ast.ruleBody.statements.length > 0) {
      ast.ruleBody.visit(this, context);

    } else {
      this.registerRule();
    }
    this.pop();
  }

  visitSelector(ast: OSSSelectorAst, context?: any): any {
    const selector = this.currentSelector(context, true);

    ast.selectorKey.visit(this, context);

    selector._isDecl = ast.isDeclaration;
    if (ast.hasNullMarker) {
      selector._value = NullMarker;
    } else {
      if (ast.selectorValue.value !== '*') {
        selector._value = ast.selectorValue.visit(this, context);
      } else {
        selector._value = ast.selectorValue.value;
      }
    }

  }

  visitRuleSelectorKey(ast: OSSSelectorKeyAst, context?: any): any {
    const selector = this.currentSelector(context);
    selector._key = ast.identifierKey;
  }

  visitTrait(ast: OSSTraitAst, context?: any): any {
    const map = this.currentProperties(context);
    const trait = map.get('trait');
    if (trait) {
      const traitList = isArray(trait) ? [...trait, ast.identifier] : [trait, ast.identifier];
      map.set('trait', traitList);
    } else {
      map.set('trait', ast.identifier);
    }


  }

  visitRuleBody(ast: OSSRuleBodyAst, context?: any): any {
    if (ast.hasNestedRule()) {
      this.registerRule();
    }

    ast.statements.forEach((stm) => {
      if (stm instanceof OSSRuleBodyPropertyAst) {
        stm.visit(this, context);

      } else if (stm instanceof OSSRuleAst) {
        this.registerRule();
        stm.visit(this, context);

      } else if (stm instanceof OSSPrecedenceChainAst) {
        this.registerRule();
        stm.visit(this, context);

      } else {
        throw new Error('Parsing error. Unexpected token');
      }
    });

    this.registerRule();
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

  visitPrecedenceChain(ast: OSSPrecedenceChainAst, context?: any): any {
    ast.nodes.forEach((node, index, array) => node.visit(this, context));
  }

  visitPrecedenceChainNode(ast: OSSPrecedenceChainNodeAst, context?: any): any {
    let traits = null;
    if (ast.traitList) {
      traits = ast.traitList.map((t) => t.identifier);
    }
    const preds = this.peak();

    if (traits || ast.predecessor) {
      this.addPredecessorRule(ast.token.value, this.toSelectors(preds),
        ast.predecessor.token.value, traits, ast.token.line);
    }
  }

  visitValue(ast: OSSValueAst, context?: any): any {
    return ast.value;
  }

  visitValueOrListValue(ast: OSSValueOrListValueAst, context?: any): any {
    const value = [];

    if (ast.value && ast.value.length > 0) {
      ast.value.forEach((item, index, array) => {
        value.push(item.visit(this, context));
      });

      return (value.length === 1) ? value[0] : value;
    }
  }

  visitSimpleValue(ast: OSSSimpleValueAst, context?: any): any {
    return ast.value;
  }

  visitWrappedListValue(ast: OSSWrappedListValueAst, context?: any): any {
    const value = [];
    if (ast.value && ast.value.length) {
      ast.value.forEach((item, index, array) => {
        value.push(item.visit(this, context));
      });
    }
    return value;
  }

  visitMapValue(ast: OSSMapValueAst, context?: any): any {
    if (ast.value) {
      const value = new Map<string, any>();

      ast.value.forEach((v, k) => {
        value.set(k, v.visit(this, context));
      });
      return value;
    }
    return null;
  }

  abstract visitBindingValue(ast: OSSBindingValueAst, context?: any): any;


  abstract visitExprValue(ast: OSSBindingValueAst, context?: any): any;


  abstract visitI18Value(ast: OSSLocalizedStringValueAst, context?: any): any;


  /**
   * Add rule to the list and clear current one
   */
  protected registerRule(): void {
    const template = this.peak();
    const rule = Object.assign(new InputRule(), template);
    if (rule._properties && rule._properties.size === 0) {
      rule._properties = undefined;
    }
    this.addRule(rule);

    template._properties = undefined;
  }

  protected abstract addPredecessorRule(itemName: string, contextPreds: Array<Selector>,
                                        predecessor: string,
                                        traits: Array<string>, lineNumber: number): void;


  protected toSelectors(rule: InputRule): Array<Selector> {
    const selectors: Array<Selector> = [];

    if (rule._selectors && rule._selectors.length > 0) {
      rule._selectors.forEach((s) => {
        selectors.push(new Selector(s._key, s._value, s._isDecl));
      });
    }
    return selectors;
  }


  protected push(rule: InputRule): void {
    this.ruleCheck.push(this.ruleStack.length);
    this.ruleStack.push(rule);
  }

  protected peak(): InputRule {
    const size = this.ruleCheck.length;
    assert(size > 0, 'Popping empty stack');
    return this.ruleStack[this.ruleStack.length - 1];
  }


  protected pop(): InputRule {
    const size = this.ruleCheck.length;
    assert(size > 0, 'Popping empty stack');
    this.ruleCheck.pop();
    return this.ruleStack.pop();
  }

  protected abstract addRule(rule: InputRule): void;


  protected currentSelector(context: any, createNew: boolean = false): InputSelector {
    const selectors = this.peak()._selectors;

    if (createNew) {
      selectors.push(new InputSelector());
    }
    return this.peak()._selectors[selectors.length - 1];
  }

  protected currentProperties(context: any): Map<string, any> {
    const inputRule = this.peak();
    if (!inputRule._properties) {
      inputRule._properties = new Map<string, any>();
    }
    return inputRule._properties;
  }

}


export class InputRule {
  public _selectors: Array<InputSelector> = [];
  public _properties: Map<string, any> = new Map<string, any>();
  public _rank = 0;

  constructor() {

  }
}

export class InputSelector {

  constructor(public _key?: string, public _value?: any, public _isDecl: boolean = false) {
  }
}
