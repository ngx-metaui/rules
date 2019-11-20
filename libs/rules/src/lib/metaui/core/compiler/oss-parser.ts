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
  OSSExprValueAst,
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
  OSSWrappedListValueAst,
  Statement
} from './metaui-ast';
import {
  KeyPredecessorChain,
  KeyPredecessorChainNode,
  KeyProperty,
  OSSLexer,
  OSSToken,
  OSSTokenType,
  SimpleValue
} from './oss-lexer';


export class OSSParser {
  currentToken: OSSToken;


  constructor(private lexer: OSSLexer) {
    this.currentToken = this.lexer.nextToken(false);
  }

  /**
   * Parse OSS Grammar:
   *
   *
   *
   */
  parse(): OSSFileAst {
    const rules = this.ruleList();
    if (!rules || rules.length === 0) {
      this.error('There are no rules to parse.');
    }

    const start = rules[0].start;
    const end = rules[rules.length - 1].end;

    const ossFile: OSSFileAst = new OSSFileAst(start, end, rules);


    if (!this.isToken(OSSTokenType.EOF)) {
      this.error('Invalid state. We should be at end of the file');
    }

    return ossFile;
  }

  parseRuleBody(): OSSRuleBodyAst {
    return this.ruleBody(new OSSRuleAst());
  }


  ruleList(): OSSRuleAst[] {
    const rules: OSSRuleAst[] = [];
    let rule: OSSRuleAst;

    while (!this.isToken(OSSTokenType.EOF) && (rule = this.rule(null)) !== null) {
      rules.push(rule);
    }
    return rules;
  }


  rule(parentRule?: OSSRuleAst): OSSRuleAst {
    const rule = new OSSRuleAst(this.currentToken.starts, this.selectorList(parentRule),
      this.traitList(), parentRule);

    if (this.isToken(OSSTokenType.LBrace)) {
      this.eat(OSSTokenType.LBrace);
      rule.ruleBody = this.ruleBody(rule);
      this.eat(OSSTokenType.RBrace);

    } else {
      this.eat(OSSTokenType.Semi);
    }
    rule.end = this.currentToken.ends;
    return rule;
  }


  ruleBody(context: OSSRuleAst): OSSRuleBodyAst {
    let precedenceChain: OSSPrecedenceChainAst = null;
    let bodyRule: OSSRuleBodyAst = null;
    const bodyStatement: Statement[] = [];

    while (!this.isToken(OSSTokenType.EOF) && !this.isToken(OSSTokenType.RBrace)) {
      const nextToken = this.lexer.peekNextToken(false);

      if (this.containsToken(KeyProperty) && nextToken.type === OSSTokenType.Colon) {
        this.processProperty(bodyStatement);

      } else {
        if ((precedenceChain = this.precedenceChain(context)) != null) {
          bodyStatement.push(precedenceChain);

        } else {
          // then it must be selector parse rule Flush existing rules to preserve rank
          bodyStatement.push(this.rule(context));
        }
      }
    }

    if (bodyStatement.length > 0) {
      bodyRule = new OSSRuleBodyAst(bodyStatement[0].start,
        bodyStatement[bodyStatement.length - 1].end, bodyStatement);
    }
    return bodyRule;
  }


  private precedenceChain(context: OSSRuleAst): OSSPrecedenceChainAst {
    const nodes: OSSPrecedenceChainNodeAst[] = [];
    let predKey: OSSPrecedenceChainNodeAst;

    while (this.containsToken(KeyPredecessorChainNode)) {

      if (this.containsNextToken(KeyPredecessorChain) || this.isNextToken(OSSTokenType.Hash)) {
        predKey = this.predecessorChainNode(context, predKey);
        nodes.push(predKey);

        if (this.isToken(OSSTokenType.Semi)) {
          this.eat(OSSTokenType.Semi);
          break;
        } else if (this.isToken(OSSTokenType.NextPrecedenceChain)) {
          this.eat(OSSTokenType.NextPrecedenceChain);
        }
      } else if (predKey) {
        this.error('Expecting "=>" or ";"');
      } else {
        break;
      }
    }
    if (nodes.length > 0) {
      return new OSSPrecedenceChainAst(nodes[0].token.starts, nodes[nodes.length - 1].token.ends,
        nodes);
    }
    return null;
  }


  private predecessorChainNode(context: OSSRuleAst,
                               predecessor: OSSPrecedenceChainNodeAst): OSSPrecedenceChainNodeAst {
    const node = new OSSPrecedenceChainNodeAst(context, this.currentToken, predecessor);
    this.eat(KeyPredecessorChainNode);

    node.traitList = this.traitList();
    return node;
  }


  private processProperty(bodyStatement: Statement[]) {
    const property = new OSSRuleBodyPropertyAst();
    property.start = this.currentToken.starts;

    property.key = this.currentToken.value;
    this.eat(this.currentToken.type).eat(OSSTokenType.Colon);
    const valueAst: OSSValueAst = this.value();

    property.value = valueAst;
    property.end = valueAst.end;

    property.isOverride = this.isToken(OSSTokenType.ExclMark);
    if (property.isOverride) {
      this.eat(OSSTokenType.ExclMark);
    }
    this.eat(OSSTokenType.Semi);
    bodyStatement.push(property);
  }

  private value(): OSSValueAst {

    return this.valueOrList() || this.wrappedList() || this.map() || this.bindingValue()
      || this.localizedString() || this.exprValue();
  }

  private selectorList(parentRule?: OSSRuleAst): OSSSelectorAst[] {
    const selectors: OSSSelectorAst[] = [];
    let selector: OSSSelectorAst;

    while ((selector = this.selector()) !== null) {
      selectors.push(selector);
    }
    if (selectors.length === 0) {
      this.error('no selectors');
    }

    if (parentRule && parentRule.selectorList.length > 0) {
      selectors.unshift(...parentRule.selectorList);
    }
    return selectors;
  }

  private traitList(): OSSTraitAst[] {
    if (this.isToken(OSSTokenType.Hash)) {
      this.eat(OSSTokenType.Hash);
      const traits = [];

      while (true) {
        if (this.isToken(OSSTokenType.Coma)) {
          this.eat(OSSTokenType.Coma);
        } else if (this.isToken(OSSTokenType.Identifier)) {
          traits.push(new OSSTraitAst(this.currentToken.starts, this.currentToken.ends,
            this.currentToken.value, this.currentToken.type));

          this.eat(OSSTokenType.Identifier);
        } else {
          break;
        }
      }
      return traits;
    }
    return null;
  }

  private selector(): OSSSelectorAst {
    const selector: OSSSelectorAst = new OSSSelectorAst(this.currentToken.starts);

    if (this.isToken(OSSTokenType.At)) {
      selector.isDeclaration = true;
      this.eat(OSSTokenType.At);
    }

    if (this.isToken(OSSTokenType.NullMarker)) {
      selector.hasNullMarker = true;
      this.eat(OSSTokenType.NullMarker);
      selector.selectorKey = this.selectorKey();

      selector.end = this.currentToken.ends;
      return selector;

    } else if (this.isToken(OSSTokenType.Identifier)) {
      selector.selectorKey = this.selectorKey();

      if (this.isToken(OSSTokenType.OpEq)) {
        this.eat(OSSTokenType.OpEq);
        selector.selectorValue = this.selectorValue();
      } else {
        selector.selectorValue = new OSSSimpleValueAst(this.currentToken.starts,
          this.currentToken.ends, '*', OSSTokenType.Star);

      }
      selector.end = this.currentToken.ends;
      return selector;
    }

    return null;
  }

  private selectorKey(): OSSSelectorKeyAst {
    const key = new OSSSelectorKeyAst(this.currentToken.starts,
      this.currentToken.ends, this.currentToken.value, this.currentToken.type);

    this.eat(OSSTokenType.Identifier);
    return key;
  }

  private selectorValue(): OSSValueAst {
    if (this.containsToken(SimpleValue)) {
      return this.simpleValue();

    } else if (this.isToken(OSSTokenType.LParen)) {
      this.eat(OSSTokenType.LParen);
      const valueOrList = this.valueOrList();
      this.eat(OSSTokenType.RParen);

      return valueOrList;
    }
    this.error('expected selectorValue');
  }


  private simpleValue(): OSSSimpleValueAst {
    if (this.containsToken(SimpleValue)) {
      const value = new OSSSimpleValueAst(this.currentToken.starts, this.currentToken.ends,
        this.typedValue(), this.currentToken.type);

      this.eat(SimpleValue);
      return value;
    }
    return null;
  }

  private valueOrList(): OSSValueAst {
    const values = [];
    let value;
    const start = this.currentToken.starts;

    while ((value = this.listValue())) {
      values.push(value);

      if (this.isToken(OSSTokenType.Coma)) {
        this.eat(OSSTokenType.Coma);
      }
    }
    if (values.length === 1) {
      return values[0];
    } else if (values.length > 1) {
      return new OSSValueOrListValueAst(start, this.currentToken.ends, values);
    }
    return null;
  }

  private listValue(): OSSValueAst {

    return this.simpleValue() || this.wrappedList() || this.map() || this.bindingValue() ||
      this.exprValue();
  }


  private wrappedList(): OSSValueAst {
    const list = [];
    let value;

    if (this.isToken(OSSTokenType.LBracket)) { // wrapped List
      this.eat(OSSTokenType.LBracket);
      const start = this.currentToken.starts - 1; // include just removed [
      while ((value = this.listValue())) {
        list.push(value);
        if (this.isToken(OSSTokenType.Coma)) {
          this.eat(OSSTokenType.Coma);
        }
      }
      this.eat(OSSTokenType.RBracket);

      if (list.length > 0) {
        const end = this.currentToken.ends; // include just removed [
        return new OSSWrappedListValueAst(start, end, list);
      }
    }
    return null;
  }

  private map(): OSSValueAst {
    let map: OSSMapValueAst = null;
    const values: Map<string, OSSValueAst> = new Map();
    let start = 0;
    let end = 0;

    if (this.isToken(OSSTokenType.LBrace)) { // map
      this.eat(OSSTokenType.LBrace);

      while (!this.isToken(OSSTokenType.EOF) && !this.isToken(OSSTokenType.RBrace)) {
        start = (start === 0) ? this.currentToken.starts : start;

        if (!this.containsToken(KeyProperty)) {
          break;
        }
        const key = this.currentToken.value;
        this.eat(this.currentToken.type).eat(OSSTokenType.Colon);
        const ossValueAst = this.value();

        values.set(key, ossValueAst);
        end = ossValueAst.end;
        this.eat(OSSTokenType.Semi);
      }
      if (values.size > 0) {
        map = new OSSMapValueAst(start, end, values);
      }
      this.eat(OSSTokenType.RBrace);
    }
    return map;
  }


  private bindingValue(): OSSValueAst {
    if (!this.isToken(OSSTokenType.FieldPathBinding)) {
      return null;
    }

    const value = new OSSBindingValueAst(this.currentToken.starts, this.currentToken.ends,
      this.currentToken.value, this.currentToken.type);
    this.eat(OSSTokenType.FieldPathBinding);

    return value;
  }


  private exprValue(): OSSValueAst {
    if (this.isToken(OSSTokenType.ExprLiteral) ||
      this.isToken(OSSTokenType.ExprLiteralStaticDyn)) {

      const value = new OSSExprValueAst(this.currentToken.starts, this.currentToken.ends,
        this.currentToken.value, this.currentToken.type);

      this.eat(this.currentToken.type);
      return value;
    }
    return null;
  }

  private localizedString(): OSSValueAst {
    if (!this.isToken(OSSTokenType.I18nKey)) {
      return null;
    }
    const defValue = this.currentToken.value;
    this.eat(OSSTokenType.I18nKey);

    const key = this.currentToken.value;
    this.eat(this.currentToken.type);
    return new OSSLocalizedStringValueAst(this.currentToken.starts, this.currentToken.ends,
      key, defValue, this.currentToken.type);
  }

  /**
   * compare the current token type with the passed token type and if they match then "eat" the
   * current token and move to the next one otherwise throw Error."
   *
   */
  private eat(tokenType: OSSTokenType | OSSTokenType[]): OSSParser {
    if (Array.isArray(tokenType) && this.containsToken(tokenType)) {
      this.currentToken = this.lexer.nextToken(false);
    } else if (this.isToken(<OSSTokenType>tokenType)) {
      this.currentToken = this.lexer.nextToken(false);
    } else {

      const token = Array.isArray(tokenType) ? tokenType[0] : tokenType;
      this.error(this.lexer.toSymbol(token) + ' expected.');
    }
    return this;
  }


  private isToken(expected: OSSTokenType): boolean {
    return this.currentToken.type === expected;
  }

  private isNextToken(expected: OSSTokenType): boolean {
    const nextToken = this.lexer.peekNextToken(false);
    return nextToken.type === expected;
  }

  private containsToken(listOfTokens: OSSTokenType[]): boolean {
    return listOfTokens.indexOf(this.currentToken.type) > -1;
  }

  private containsNextToken(listOfTokens: OSSTokenType[]): boolean {
    const nextToken = this.lexer.peekNextToken(false);
    return listOfTokens.indexOf(nextToken.type) > -1;
  }

  private error(msg: string): void {
    const err = new Error(`Parse error (${msg}).
    line: ${this.lexer.line}, column: ${this.lexer.column},
    context:
    ${this.lexer.errorContext()}...\n `);
    throw  err;
  }

  private typedValue(): any {
    switch (this.currentToken.type) {
      case OSSTokenType.BOOLTRue:
        return true;

      case OSSTokenType.BOOLFalse:
        return false;

      case OSSTokenType.IntLiteral:
        return parseInt(this.currentToken.value);

      case OSSTokenType.FltLiteral:
        return parseFloat(this.currentToken.value);

      case OSSTokenType.Null:
        return null;

      default:
        return this.currentToken.value;
    }
  }

}
