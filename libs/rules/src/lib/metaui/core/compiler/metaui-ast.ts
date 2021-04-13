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
import {OSSToken, OSSTokenType} from './oss-lexer';


/**
 *
 *   MetaUI uses so called "OSS files" and the OSS stands for Object style sheet.
 *
 *  It has following grammar in BNF format:
 *
 *   rules ::= rule *
 *   rule ::= selector+  traitList? ('{' ruleBody  '}' | ';')
 *   traitList ::= '#' IDENTIFIER  (',' IDENTIFIER)*
 *
 *   selector ::= '@'? (selectorDef |  '~' IDENTIFIER_KEY)
 *   selectorDef ::=  IDENTIFIER_KEY   selectorValue?
 *   selectorValue ::= '=' (simpleValue | '(' valueOrList ')' )
 *
 *   ruleBody ::= ruleBodyKeyValue*  rule* ruleBodyKeyValue* rule* precedenceChain*
 *   ruleBodyKeyValue ::= (key ':' value '!'? ';'? ) {pin=2}
 *
 *   precedenceChain ::= precedenceChainNodeWithTrait ('=>' precedenceChainNodeWithTrait)+   ';'
 *         {pin=2} private precedenceChainNode ::= DYN_FIELDPATHBINDING | IDENTIFIER_KEY
 *                  | '*'  {pin=1}
 * private precedenceChainNode ::= DYN_FIELDPATHBINDING | IDENTIFIER_KEY  | '*'  {pin=1}
 * private precedenceChainNodeWithTrait ::= precedenceChainNode   traitList?  {pin=1}
 *
 *
 *  TOKENS:
 *
 *           SEMI=";"
 *           COLON=":"
 *           COMA=","
 *           OP_EQ="="
 *           AT="@"
 *           HASH="#"
 *           DOT="."
 *           LEFT_PARENTH="("
 *           RIGHT_PARENTH=")"
 *           LEFT_BRACE="{"
 *           RIGHT_BRACE="}"
 *           LEFT_BRACKET="["
 *           RIGHT_BRACKET="]"
 *           NEXT="=>"
 *           STAR="*"
 *           NEGATE="~"
 *           EXCL_MARK="!"
 *           KW_CLASS="class"
 *           KW_DISPLAYKEY="displayKey"
 *           KW_SEARCHOPERATION="searchOperation"
 *           KW_TRAIT="trait"
 *           KW_OPERATION="operation"
 *           KW_FIELD="field"
 *           KW_BINDINGS         ="bindings"
 *           KW_COMPONENT        ="component"
 *           KW_OBJECT           ="object"
 *           KW_VALUEREDIRECTOR  ="valueRedirector"
 *           KW_ACTION           ="action"
 *           KW_ACTIONRESULTS    ="actionResults"
 *           KW_VISIBLE          ="visible"
 *           KW_PAGENAME         ="pageName"
 *           KW_PAGEBINDINGS     ="pageBindings"
 *           KW_AFTER            ="after"
 *           KW_ZTOP             ="zTop"
 *           KW_ZBOTTOM          ="zBottom"
 *           KW_ZLEFT            ="zLeft"
 *           KW_ZRIGHT           ="zRight"
 *           KW_ZNONE            ="zNone"
 *           KW_ZONE            ="zOne"
 *           KW_ZTWO            ="zTwo"
 *           KW_ZTHREE          ="zThree"
 *           KW_ZFOUR            ="zFour"
 *           KW_ZFOUR            ="zFour"
 *           KW_LAYOUT           ="layout"
 *           KW_HOMEPAGE         ="homePage"
 *           KW_MODULE_TRAIT     ="module_trait"
 *           KW_MODULE     ="module"
 *           KW_WRAPPERCOMPONENT ="wrapperComponent"
 *           KW_WRAPPERBINDINGS  ="wrapperBindings"
 *           KW_PORTLETWRAPPER   ="portletWrapper"
 *           KW_DISPLAYGROUP     ="displayGroup"
 *           KW_NEEDSFORM        ="needsForm"
 *           KW_BEFORE           ="before"
 *           KW_TEXTSEARCHSUPPORTED           ="textSearchSupported"
 *           KW_USETEXTINDEX           ="useTextIndex"
 *           KW_LABEL          ="label"
 *
 *
 *           IDENTIFIER='regexp:[a-zA-Z_]([a-zA-Z_0-9])*'
 *           EXPR_LITERAL='regexp:\${1,2}\{([^}]*)}'
 *
 *           STRING_LITERAL='regexp:"[^"]*"'
 *           SQ_STRING_LITERAL="regexp:'[^']*'"
 *           KEY_PATH='regexp:[a-zA-Z_]([a-zA-Z_0-9.\$])*'
 *           DYN_FIELDPATHBINDING='regexp:\$[a-zA-Z_]([a-zA-Z_0-9.])*'
 *           LOCALIZATION_KEY='regexp:\$\[[a-zA-Z_0-9]*\]'
 *           INT_LITERAL='regexp:(0([0-7])*|[1-9]([0-9])*|0[x,X]([0-9,a-f,A-F])+)([l,L,h,H])?'
 *           FLT_LITERAL='regexp:(([0-9])+\.([0-9])*|\.([0-9])+(e,E]([+,-])?([0-9])+)?([d,D,f,F,b,
 *           B])?|([0-9])+[e,E]([+,-])?([0-9])+([d,D,f,F,b,B])?|([0-9])+[d,D,f,F,b,B]
 * )'
 *
 *
 *
 *      key ::=  STRING_LITERAL | IDENTIFIER_KEY
 *      value ::=  valueOrList
 *                      | wrappedList
 *                      | map
 *                      | DYN_FIELDPATHBINDING
 *                      | localizedString
 *                      | EXPR_LITERAL
 *
 *       valueOrList ::=  listValue (','  listValue)*
 *      private listValue ::= simpleValue
 *                          | wrappedList
 *                          | map
 *                          | DYN_FIELDPATHBINDING
 *                          | localizedString
 *                          | EXPR_LITERAL
 *
 *      simpleValue ::= simpleVal1
 *                          | IDENTIFIER
 *                          | KEY_PATH
 *                          | "true"
 *                          | "false"
 *                          | "null"
 *
 *      private simpleVal1::= (STRING_LITERAL
 *                          |  SQ_STRING_LITERAL
 *                          | INT_LITERAL
 *                          | FLT_LITERAL )
 *
 *
 *      private IDENTIFIER_KEY ::= KW_CLASS
 *                          | KW_DISPLAYKEY
 *                          | KW_SEARCHOPERATION
 *                          | KW_TRAIT
 *                          | KW_OPERATION
 *                          | KW_FIELD
 *                          | KW_BINDINGS
 *                          | KW_COMPONENT
 *                          | KW_OBJECT
 *                          | KW_VALUEREDIRECTOR
 *                          | KW_ACTION
 *                          | KW_ACTIONRESULTS
 *                          | KW_VISIBLE
 *                          | KW_PAGENAME
 *                          | KW_PAGEBINDINGS
 *                          | KW_AFTER
 *                          | KW_ZLEFT
 *                          | KW_ZRIGHT
 *                          | KW_ZTOP
 *                          | KW_ZBOTTOM
 *                          | KW_ZNONE
 *                          | KW_LAYOUT
 *                          | KW_HOMEPAGE
 *                          | KW_MODULE_TRAIT
 *                          | KW_WRAPPERCOMPONENT
 *                          | KW_WRAPPERBINDINGS
 *                          | KW_PORTLETWRAPPER
 *                          | KW_DISPLAYGROUP
 *                          | KW_NEEDSFORM
 *                          | KW_BEFORE
 *                          | KW_TEXTSEARCHSUPPORTED
 *                          | KW_USETEXTINDEX
 *                          | KW_LABEL
 *                          | KW_MODULE
 *                          | IDENTIFIER
 *
 *
 *      wrappedList ::= '[' listValue  (',' listValue) * ']'
 *
 *      map ::= '{' [  mapEntry  (';' mapEntry)*  ';'?  ] '}'
 *      private mapEntry ::=  key ':' value {pin=2}
 *
 *      localizedString ::= LOCALIZATION_KEY key
 *      private property ::= key ':' value ';'
 *
 *
 */


/**
 * Root node just holding start and end position of the AST block
 *
 */
export abstract class OSSAst {

  constructor(start: number = -1, end: number = -1) {
  }

  abstract visit(visitor: OssAstVisitor, context?: any): any;
}

/**
 * OSS rule file contains one or more rules
 *
 * rules ::= rule *
 */
export class OSSFileAst extends OSSAst {

  constructor(public start: number, public end: number,
              public rules: OSSRuleAst[]) {
    super(start, end);
  }

  visit(visitor: OssAstVisitor, context?: any): any {
    return visitor.visitRuleFile(this, context);
  }

}

/**
 * Rule is defined by its:
 *
 *  - selectors
 *  - one or more trait
 *  - Body which can contain:
 *      - Properties ( which is key:value pairs)
 *      - other rules
 *      - Precedence chain path (which is just shorthand an expression to tell that we want
 *              to distribute fields into different zones in specific order)
 *
 * rule ::= selector+  traitList? ('{' ruleBody  '}' | ';')
 * traitList ::= '#' IDENTIFIER  (',' IDENTIFIER)*
 */
export class OSSRuleAst extends OSSAst {

  constructor(public start: number = 0, public selectorList?: OSSSelectorAst[],
              public traitList?: OSSTraitAst[], public parentRule?: OSSRuleAst,
              public ruleBody?: OSSRuleBodyAst, public end: number = 0) {
    super(start, end);
  }


  visit(visitor: OssAstVisitor, context?: any): any {
    return visitor.visitRule(this, context);
  }
}

/**
 * Selector is defined by or can contain:
 *   - its identifier which is either one of the pre-defined keyword or custom
 *   - Simple value or list of values
 *   - declaration '@'
 *
 * selector ::= '@'? (selectorDef |  '~' IDENTIFIER_KEY)
 * selectorDef ::=  IDENTIFIER_KEY   selectorValue?
 *
 */
export class OSSSelectorAst extends OSSAst {


  constructor(public start: number = -1, public end: number = -1,
              public isDeclaration: boolean = false, public hasNullMarker: boolean = false,
              public selectorKey?: OSSSelectorKeyAst,
              public selectorValue?: OSSValueAst) {
    super(start, end);
  }


  visit(visitor: OssAstVisitor, context?: any): any {
    return visitor.visitSelector(this, context);
  }
}


/**
 *
 * Selector key contains:
 *  - anything that is ok with:  ["a"-"z","A"-"Z","_"] ( ["a"-"z","A"-"Z","_","0"-"9"] )*
 *  - keywords
 *
 * IDENTIFIER_KEY
 */
export class OSSSelectorKeyAst extends OSSAst {

  constructor(public start: number, public end: number, public identifierKey: any,
              public nodeType: OSSTokenType) {

    super(start, end);
  }

  visit(visitor: OssAstVisitor, context?: any): any {
    return visitor.visitRuleSelectorKey(this, context);
  }
}


/**
 *
 * Selector value is either:
 *   - String literal or Integer or float
 *   - Common identifier ["a"-"z","A"-"Z","_"] ( ["a"-"z","A"-"Z","_","0"-"9"] )*
 *   - KeyPath ["a"-"z","A"-"Z","_"] ( ["a"-"z","A"-"Z","_","0"-"9", ".", "$"] )*
 *   - true or false
 *   - null
 *
 *
 * selectorValue ::= '=' (simpleValue | '(' valueOrList ')' )
 *
 */
export class OSSValueAst extends OSSAst {

  constructor(public start: number, public end: number, public value: any = '*',
              public nodeType?: OSSTokenType) {

    super(start, end);
  }

  visit(visitor: OssAstVisitor, context?: any): any {
    return visitor.visitValue(this, context);
  }
}


export class OSSSimpleValueAst extends OSSValueAst {

  constructor(public start: number, public end: number, public value: any = '*',
              public nodeType?: OSSTokenType) {

    super(start, end, value, nodeType);
  }

  visit(visitor: OssAstVisitor, context?: any): any {
    return visitor.visitSimpleValue(this, context);
  }
}


export class OSSValueOrListValueAst extends OSSValueAst {

  constructor(public start: number, public end: number, public value: any) {
    super(start, end, value);
  }

  visit(visitor: OssAstVisitor, context?: any): any {
    return visitor.visitValueOrListValue(this, context);
  }
}


export class OSSWrappedListValueAst extends OSSValueAst {

  constructor(public start: number, public end: number, public value: OSSValueAst[]) {
    super(start, end, value);
  }

  visit(visitor: OssAstVisitor, context?: any): any {
    return visitor.visitWrappedListValue(this, context);
  }
}


export class OSSMapValueAst extends OSSValueAst {

  constructor(public start: number, public end: number, public value: Map<string, OSSValueAst>) {
    super(start, end, value);
  }

  visit(visitor: OssAstVisitor, context?: any): any {
    return visitor.visitMapValue(this, context);
  }
}


export class OSSBindingValueAst extends OSSValueAst {

  constructor(public start: number, public end: number, public value: any,
              public nodeType?: OSSTokenType) {
    super(start, end, value, nodeType);
  }

  visit(visitor: OssAstVisitor, context?: any): any {
    return visitor.visitBindingValue(this, context);
  }
}

export class OSSLocalizedStringValueAst extends OSSValueAst {

  constructor(public start: number, public end: number, public value: any,
              public localizedKey: string, public nodeType?: OSSTokenType) {
    super(start, end, value, nodeType);
  }

  visit(visitor: OssAstVisitor, context?: any): any {
    return visitor.visitI18Value(this, context);
  }
}

export class OSSExprValueAst extends OSSValueAst {

  constructor(public start: number, public end: number, public value: any,
              public nodeType?: OSSTokenType) {
    super(start, end, value, nodeType);
  }

  visit(visitor: OssAstVisitor, context?: any): any {
    return visitor.visitExprValue(this, context);
  }
}


/**
 * Trait is defined as:
 *  -  Common identifier ["a"-"identifier","_"] ( ["a"-"z","A"-"Z","_","0"-"9"] )*
 *
 *
 * IDENTIFIER
 */
export class OSSTraitAst extends OSSAst {

  constructor(public start: number, public end: number, public identifier: string,
              public nodeType: OSSTokenType) {
    super(start, end);
  }

  visit(visitor: OssAstVisitor, context?: any): any {
    return visitor.visitTrait(this, context);
  }

}


export type Statement = OSSRuleBodyPropertyAst | OSSRuleAst | OSSPrecedenceChainAst;


/**
 * Rule body is defined as:
 *  - One or more of properties
 *      - which are key:value pairs
 *          - Key is either keyword or identifier
 *          - value can be:
 *                 - SimpleValue or List of simple values
 *                 - Wrapped List
 *                 - Map
 *                 - Binding value
 *                 - Localized string
 *                 - Expression
 *  - One or more nested rules
 *  - Precedence chain path
 *
 *
 * ruleBody ::= ( ruleBodyKeyValue | rule )* precedenceChain*
 * ruleBodyKeyValue ::= (key ':' value '!'? ';'? ) {pin=2}
 */
export class OSSRuleBodyAst extends OSSAst {

  constructor(public start: number, public end: number,
              public statements: Statement[]) {
    super(start, end);
  }

  visit(visitor: OssAstVisitor, context?: any): any {
    return visitor.visitRuleBody(this, context);
  }

  hasNestedRule(): boolean {
    if (this.statements && this.statements.length > 0) {
      return this.statements.filter((item) => item instanceof OSSRuleAst).length > 0;
    }
    return false;
  }
}


/**
 * KeyValue is defined as:
 *      - Key is either keyword or identifier
 *      - value can be:
 *                 - SimpleValue or List of simple values
 *                 - Wrapped List
 *                 - Map
 *                 - Binding value
 *                 - Localized string
 *                 - Expression
 *
 * key ::=  STRING_LITERAL | IDENTIFIER_KEY
 * value ::=  valueOrList | wrappedList
 *                            | map
 *                            | DYN_FIELDPATHBINDING
 *                            | localizedString
 *                            | EXPR_LITERAL
 */
export class OSSRuleBodyPropertyAst extends OSSAst {

  constructor(public start?: number, public end?: number, public key?: string,
              public value?: OSSValueAst,
              public isOverride?: boolean) {
    super(start, end);
  }

  visit(visitor: OssAstVisitor, context?: any): any {
    return visitor.visitRuleProperty(this, context);
  }


}


/**
 *
 * Precedence chain defines rank of each field and how they are distributed within the page:
 *   - identifier representing a place
 *          ez.: zLeft, zRight
 *              (zone Left), (zone Right)
 *   - Followed by '=>' character to define how fields are ranked
 *   - Can contain traits
 *
 * precedenceChain ::= precedenceChainNodeWithTrait ('=>' precedenceChainNodeWithTrait)+   ';'
 * private precedenceChainNodeWithTrait ::= precedenceChainNode   traitList?  {pin=1}
 * private precedenceChainNode ::= DYN_FIELDPATHBINDING | IDENTIFIER_KEY  | '*'
 *
 *
 */
export class OSSPrecedenceChainAst extends OSSAst {

  constructor(public start: number, public end: number,
              public nodes: OSSPrecedenceChainNodeAst[]) {
    super(start, end);
  }

  visit(visitor: OssAstVisitor, context?: any): any {
    return visitor.visitPrecedenceChain(this, context);
  }
}


/**
 * Actual definition of chain node which:
 *   - Node is just identifier
 *   - Can contain '#' followed by identifiers to define traits
 *
 * value ::= (KEYPATH | IDENT | "*") (traits)*;
 */
export class OSSPrecedenceChainNodeAst extends OSSValueAst {

  constructor(public preds: OSSRuleAst,
              public token: OSSToken, // precedenceKey
              public predecessor?: OSSPrecedenceChainNodeAst,
              public traitList?: OSSTraitAst[]) {

    super(token.starts, token.ends, token.value, token.type);
  }

  visit(visitor: OssAstVisitor, context?: any): any {
    return visitor.visitPrecedenceChainNode(this, context);
  }

}


export interface OssAstVisitor {
  visitRuleFile(ast: OSSFileAst, context?: any): any;

  visitRule(ast: OSSRuleAst, context?: any): any;

  visitSelector(ast: OSSSelectorAst, context?: any): any;

  visitTrait(ast: OSSTraitAst, context?: any): any;

  visitRuleBody(ast: OSSRuleBodyAst, context?: any): any;

  visitRuleProperty(ast: OSSRuleBodyPropertyAst, context?: any): any;

  visitRuleSelectorKey(ast: OSSSelectorKeyAst, context?: any): any;

  visitPrecedenceChain(ast: OSSPrecedenceChainAst, context?: any): any;

  visitPrecedenceChainNode(ast: OSSPrecedenceChainNodeAst, context?: any): any;

  visitValue(ast: OSSValueAst, context?: any): any;

  visitValueOrListValue(ast: OSSValueOrListValueAst, context?: any): any;

  visitSimpleValue(ast: OSSSimpleValueAst, context?: any): any;

  visitWrappedListValue(ast: OSSWrappedListValueAst, context?: any): any;

  visitMapValue(ast: OSSMapValueAst, context?: any): any;

  visitBindingValue(ast: OSSBindingValueAst, context?: any): any;

  visitExprValue(ast: OSSBindingValueAst, context?: any): any;

  visitI18Value(ast: OSSLocalizedStringValueAst, context?: any): any;


}


