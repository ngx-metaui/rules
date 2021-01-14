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
import {OSSLexer, OSSTokenType} from './oss-lexer';
import {OSSParser} from './oss-parser';
import {
  OSSMapValueAst,
  OSSPrecedenceChainAst,
  OSSRuleAst,
  OSSRuleBodyPropertyAst,
  OSSSelectorKeyAst,
  OSSSimpleValueAst,
  OSSTraitAst,
  OSSValueOrListValueAst,
  OSSWrappedListValueAst
} from './metaui-ast';


describe('MetaUI parser', () => {
  let lexer: OSSLexer;


  beforeEach((done) => {
    window.setTimeout(function () {
      done();
    }, 0);
  });


  describe('Selectors', () => {
    it('parses simple selector with key=class and value=User and has correct ' +
      'token types',
      () => {
        /* tslint:disable: no-trailing-whitespace */
        lexer = new OSSLexer(`
                    class=User;
                `);
        const parser = new OSSParser(lexer);
        const ossFileAst = parser.parse();

        const rules = ossFileAst.rules;
        expect(rules.length).toBe(1);

        const rule: OSSRuleAst = rules[0];
        expect(rule.selectorList.length).toBe(1);

        expect(rule.selectorList[0].hasNullMarker).toBeFalsy();
        expect(rule.selectorList[0].isDeclaration).toBeFalsy();
        const selectorKey: OSSSelectorKeyAst = rule.selectorList[0].selectorKey;
        expect(selectorKey.identifierKey).toBe('class');
        expect(selectorKey.nodeType).toBe(OSSTokenType.Identifier);

        const selectorValue: OSSSimpleValueAst =
          <OSSSimpleValueAst>rule.selectorList[0].selectorValue;
        expect(selectorValue.value).toBe('User');
      });


    it('should parse inlined selectors role=admin class=User',
      () => {

        lexer = new OSSLexer(`
                    role=admin class=User;
                `);
        const parser = new OSSParser(lexer);
        const ossFileAst = parser.parse();

        const rules = ossFileAst.rules;
        expect(rules.length).toBe(1);

        const rule: OSSRuleAst = rules[0];
        const rule2: OSSRuleAst = rules[1];
        expect(rule.selectorList.length).toBe(2);
        const selector1 = rule.selectorList[0];
        const selector2 = rule.selectorList[1];
        expect(selector1.selectorKey.identifierKey).toBe('role');
        expect(selector1.selectorValue.value).toBe('admin');

        expect(selector2.selectorKey.identifierKey).toBe('class');
        expect(selector2.selectorValue.value).toBe('User');
      });


    it('should throw exception if missing comma ',
      () => {

        lexer = new OSSLexer(`
                    role=admin class=User
                `);

        const parser = new OSSParser(lexer);

        expect(() => parser.parse()).toThrowError(/';' expected./);
      });


    it('parse selector declaration ', () => {

      lexer = new OSSLexer(`
                    class=User @field=test;
                `);

      const parser = new OSSParser(lexer);
      const ossFileAst = parser.parse();

      const rules = ossFileAst.rules;
      const selector = rules[0].selectorList[1];
      expect(selector.isDeclaration).toBeTruthy();
      expect(selector.selectorKey.identifierKey).toBe('field');
      expect(selector.selectorValue.value).toBe('test');
    });


    it('parse null marker with identifier ', () => {

      lexer = new OSSLexer(`
                    ~class;
                `);

      const parser = new OSSParser(lexer);
      const ossFileAst = parser.parse();

      const rules = ossFileAst.rules;
      const selector = rules[0].selectorList[0];
      expect(selector.hasNullMarker).toBeTruthy();
      expect(selector.selectorKey.identifierKey).toBe('class');
    });


    it('should recognize unqualified key selectors *  ', () => {

      lexer = new OSSLexer(`
                    class field;
                `);

      const parser = new OSSParser(lexer);
      const ossFileAst = parser.parse();

      const rules = ossFileAst.rules;
      let selector = rules[0].selectorList[0];
      expect(selector.selectorKey.identifierKey).toBe('class');
      expect(selector.selectorValue.value).toBe('*');


      selector = rules[0].selectorList[1];
      expect(selector.selectorKey.identifierKey).toBe('field');
      expect(selector.selectorValue.value).toBe('*');
    });


    it('should parse selector s traits #required', () => {

      lexer = new OSSLexer(`
                    class=test#required;
                `);

      const parser = new OSSParser(lexer);
      const ossFileAst = parser.parse();

      const rules = ossFileAst.rules;
      const selector = rules[0].selectorList[0];
      expect(selector.selectorKey.identifierKey).toBe('class');
      expect(selector.selectorValue.value).toBe('test');

      const trait: OSSTraitAst = rules[0].traitList[0];
      expect(trait.identifier).toBe('required');
    });


    it('should parse selector with traits #required,bold', () => {

      lexer = new OSSLexer(`
                    class=test#required,bold;
                `);

      const parser = new OSSParser(lexer);
      const ossFileAst = parser.parse();

      const rules = ossFileAst.rules;
      const selector = rules[0].selectorList[0];
      expect(selector.selectorKey.identifierKey).toBe('class');
      expect(selector.selectorValue.value).toBe('test');

      const traitList: OSSTraitAst[] = rules[0].traitList;
      expect(traitList[0].identifier).toBe('required');
      expect(traitList[1].identifier).toBe('bold');
    });


    it('should parse unqualified selector with trait #required', () => {

      lexer = new OSSLexer(`
                    class#required,bold;
                `);

      const parser = new OSSParser(lexer);
      const ossFileAst = parser.parse();

      const rules = ossFileAst.rules;
      const selector = rules[0].selectorList[0];
      expect(selector.selectorKey.identifierKey).toBe('class');
      expect(selector.selectorValue.value).toBe('*');

      const traitList: OSSTraitAst[] = rules[0].traitList;
      expect(traitList[0].identifier).toBe('required');
      expect(traitList[1].identifier).toBe('bold');
    });


    it('should read List of values in selector operation=(view,edit)', () => {

      lexer = new OSSLexer(`
                    operation=(view,edit);
                `);

      const parser = new OSSParser(lexer);
      const ossFileAst = parser.parse();

      const rules = ossFileAst.rules;
      const selector = rules[0].selectorList[0];
      expect(selector.selectorKey.identifierKey).toBe('operation');

      const listValue: OSSValueOrListValueAst = selector.selectorValue;
      expect(listValue.value[0].value).toBe('view');
      expect(listValue.value[1].value).toBe('edit');
    });


    it('should read List of values in form operation=(view,edit) for nested form',
      () => {

        lexer = new OSSLexer(`
                    class=user operation=(view,edit);
                `);

        const parser = new OSSParser(lexer);
        const ossFileAst = parser.parse();

        const rules = ossFileAst.rules;
        const selector = rules[0].selectorList[1];
        expect(selector.selectorKey.identifierKey).toBe('operation');

        const listValue: OSSValueOrListValueAst = selector.selectorValue;
        expect(listValue.value[0].value).toBe('view');
        expect(listValue.value[1].value).toBe('edit');
      });


    it('should support string literal as selector value', () => {

      lexer = new OSSLexer(`
                    class='Test';
                `);

      const parser = new OSSParser(lexer);
      const ossFileAst = parser.parse();

      const rules = ossFileAst.rules;
      const selector = rules[0].selectorList[0];

      const value: OSSSimpleValueAst = selector.selectorValue;
      expect(value.nodeType).toBe(OSSTokenType.StringLiteral);

    });


    it('should support Integer  as selector value', () => {
      lexer = new OSSLexer(`
                    class=1;
                `);

      const parser = new OSSParser(lexer);
      const ossFileAst = parser.parse();

      const rules = ossFileAst.rules;
      const selector = rules[0].selectorList[0];

      const value: OSSSimpleValueAst = selector.selectorValue;
      expect(value.nodeType).toBe(OSSTokenType.IntLiteral);

    });


    it('should support float  as selector value', () => {
      lexer = new OSSLexer(`
                    class=12.22;
                `);

      const parser = new OSSParser(lexer);
      const ossFileAst = parser.parse();

      const rules = ossFileAst.rules;
      const selector = rules[0].selectorList[0];

      const value: OSSSimpleValueAst = selector.selectorValue;
      expect(value.nodeType).toBe(OSSTokenType.FltLiteral);
    });

    it('should support keyPath  as selector value', () => {
      lexer = new OSSLexer(`
                    class=aa.aas;
                `);
      const parser = new OSSParser(lexer);
      const ossFileAst = parser.parse();

      const rules = ossFileAst.rules;
      const selector = rules[0].selectorList[0];

      const value: OSSSimpleValueAst = selector.selectorValue;
      expect(value.nodeType).toBe(OSSTokenType.KeyPath);

    });


    it('should support boolean TRUE  as selector value', () => {
      lexer = new OSSLexer(`
                    class=true;
                `);

      const parser = new OSSParser(lexer);
      const ossFileAst = parser.parse();

      const rules = ossFileAst.rules;
      const selector = rules[0].selectorList[0];

      const value: OSSSimpleValueAst = selector.selectorValue;
      expect(value.nodeType).toBe(OSSTokenType.BOOLTRue);

    });


    it('should support boolean FALSE  as selector value', () => {
      lexer = new OSSLexer(`
                    class=false;
                `);

      const parser = new OSSParser(lexer);
      const ossFileAst = parser.parse();

      const rules = ossFileAst.rules;
      const selector = rules[0].selectorList[0];

      const value: OSSSimpleValueAst = selector.selectorValue;
      expect(value.nodeType).toBe(OSSTokenType.BOOLFalse);

    });


    it('should support NULL  as selector value', () => {
      lexer = new OSSLexer(`
                    class=null;
                `);
      const parser = new OSSParser(lexer);
      const ossFileAst = parser.parse();

      const rules = ossFileAst.rules;
      const selector = rules[0].selectorList[0];

      const value: OSSSimpleValueAst = selector.selectorValue;
      expect(value.nodeType).toBe(OSSTokenType.Null);

    });

    it('Can parse two root rules in the file',
      () => {
        /* tslint:disable: no-trailing-whitespace */
        lexer = new OSSLexer(
          `
          field {
            type  {
               component:StringField;
            }
          }

          class=model.Issue {
            Notes.zDetail => notes;

            field=subject {
                operation=edit  {
                  trait:bold;
                }
                editable:false;
            }
            operation=list {
                zNone => *;
                zLeft => category => owner => priority => status => lastModified;
                zDetail => subject#italic;
            }
           }
           `
        );

        const parser = new OSSParser(lexer);

        const ossFileAst = parser.parse();
        expect(ossFileAst.rules.length).toBe(2);
      });


  });


  describe('Properties', () => {

    it('can parse single property under class user selector',
      () => {
        /* tslint:disable: no-trailing-whitespace */
        lexer = new OSSLexer(`class=User {
                                          visible:true;
                                       }
                `);
        const parser = new OSSParser(lexer);

        const ossFileAst = parser.parse();

        expect(ossFileAst.rules.length).toBe(1);
        expect(ossFileAst.rules[0].selectorList.length).toBe(1);
        expect(ossFileAst.rules[0].selectorList[0].selectorKey.identifierKey)
          .toBe('class');
        expect(ossFileAst.rules[0].selectorList[0].selectorValue.value)
          .toBe('User');

        expect(ossFileAst.rules[0].ruleBody.statements.length).toBe(1);

        const property = (<OSSRuleBodyPropertyAst>ossFileAst.rules[0].ruleBody.statements[0]);
        expect(property.key).toBe('visible');

        expect(property.value.nodeType).toBe(OSSTokenType.BOOLTRue);
        expect(property.value.value).toBe(true);
      });


    it('can parse multiple properties under class=user selector',
      () => {
        /* tslint:disable: no-trailing-whitespace */
        lexer = new OSSLexer(
          'class=User {' +
          '   visible:true; ' +
          '   component:"InputComponent";' +
          '   value:$value; ' +
          '}'
        );

        const parser = new OSSParser(lexer);

        const ossFileAst = parser.parse();

        expect(ossFileAst.rules.length).toBe(1);
        expect(ossFileAst.rules[0].selectorList.length).toBe(1);
        expect(ossFileAst.rules[0].selectorList[0].selectorKey.identifierKey)
          .toBe('class');
        expect(ossFileAst.rules[0].selectorList[0].selectorValue.value)
          .toBe('User');

        expect(ossFileAst.rules[0].ruleBody.statements.length).toBe(3);

        const property = (<OSSRuleBodyPropertyAst>ossFileAst.rules[0].ruleBody.statements[0]);
        expect(property.key).toBe('visible');

        expect(property.value.nodeType).toBe(OSSTokenType.BOOLTRue);
        expect(property.value.value).toBe(true);


        const property2 = (<OSSRuleBodyPropertyAst>ossFileAst.rules[0].ruleBody.statements[1]);
        expect(property2.key).toBe('component');

        expect(property2.value.nodeType).toBe(OSSTokenType.StringLiteral);
        expect(property2.value.value).toBe('InputComponent');


        const property3 = (<OSSRuleBodyPropertyAst>ossFileAst.rules[0].ruleBody.statements[2]);
        expect(property3.key).toBe('value');

        expect(property3.value.nodeType).toBe(OSSTokenType.FieldPathBinding);
        expect(property3.value.value).toBe('value');

      });

    it('Can parse  values under 2 nested selectors',
      () => {
        /* tslint:disable: no-trailing-whitespace */
        lexer = new OSSLexer(
          'class=User {' +
          '         field=firstName {' +
          '           visible:true; ' +
          '           component:"InputComponent";' +
          '           value:$value; ' +
          '         }' +
          '      }'
        )
        ;

        const parser = new OSSParser(lexer);
        const ossFileAst = parser.parse();

        expect(ossFileAst.rules.length).toBe(1);
        expect(ossFileAst.rules[0].selectorList.length).toBe(1);
        expect(ossFileAst.rules[0].selectorList[0].selectorKey.identifierKey)
          .toBe('class');
        expect(ossFileAst.rules[0].selectorList[0].selectorValue.value)
          .toBe('User');

        expect(ossFileAst.rules[0].ruleBody.statements.length).toBe(1);
        expect(ossFileAst.rules[0].ruleBody.statements[0] instanceof OSSRuleAst)
          .toBeTruthy();


        const nestedFieldRule = <OSSRuleAst>ossFileAst.rules[0].ruleBody.statements[0];
        expect(nestedFieldRule.selectorList.length).toBe(2);
        expect(nestedFieldRule.selectorList[0].selectorKey.identifierKey).toBe('class');
        expect(nestedFieldRule.selectorList[0].selectorValue.value).toBe('User');

        expect(nestedFieldRule.selectorList[1].selectorKey.identifierKey).toBe('field');
        expect(nestedFieldRule.selectorList[1].selectorValue.value).toBe('firstName');

        expect(nestedFieldRule.parentRule).not.toBeNull();

        const statements = nestedFieldRule.ruleBody.statements;
        expect(statements.length).toBe(3);

        const property = (<OSSRuleBodyPropertyAst>statements[0]);
        expect(property.key).toBe('visible');

        expect(property.value.nodeType).toBe(OSSTokenType.BOOLTRue);
        expect(property.value.value).toBe(true);


        const property2 = (<OSSRuleBodyPropertyAst>statements[1]);
        expect(property2.key).toBe('component');

        expect(property2.value.nodeType).toBe(OSSTokenType.StringLiteral);
        expect(property2.value.value).toBe('InputComponent');


        const property3 = (<OSSRuleBodyPropertyAst>statements[2]);
        expect(property3.key).toBe('value');

        expect(property3.value.nodeType).toBe(OSSTokenType.FieldPathBinding);
        expect(property3.value.value).toBe('value');
      });


    it('Can parse values under 3 nested selectors where first is selector without value',
      () => {
        /* tslint:disable: no-trailing-whitespace */
        lexer = new OSSLexer(
          'layout {' +
          '         class=User {' +
          '           field=firstName {' +
          '             visible:true; ' +
          '             component:"InputComponent";' +
          '             value:$value; ' +
          '           }' +
          '         }' +
          '      }'
        );

        const parser = new OSSParser(lexer);

        const ossFileAst = parser.parse();

        expect(ossFileAst.rules.length).toBe(1);
        expect(ossFileAst.rules[0].selectorList.length).toBe(1);
        expect(ossFileAst.rules[0].selectorList[0].selectorKey.identifierKey)
          .toBe('layout');
        expect(ossFileAst.rules[0].selectorList[0].selectorValue.value)
          .toBe('*');

        expect(ossFileAst.rules[0].ruleBody.statements.length).toBe(1);
        expect(ossFileAst.rules[0].ruleBody.statements[0] instanceof OSSRuleAst)
          .toBeTruthy();


        const nestedClassRule = <OSSRuleAst>ossFileAst.rules[0].ruleBody.statements[0];
        expect(nestedClassRule.selectorList.length).toBe(2);
        expect(nestedClassRule.selectorList[0].selectorKey.identifierKey).toBe('layout');
        expect(nestedClassRule.selectorList[0].selectorValue.value).toBe('*');

        expect(nestedClassRule.selectorList[1].selectorKey.identifierKey).toBe('class');
        expect(nestedClassRule.selectorList[1].selectorValue.value).toBe('User');
        expect(nestedClassRule.parentRule).not.toBeNull();

        let statements = nestedClassRule.ruleBody.statements;

        expect(statements.length).toBe(1);
        expect(statements[0] instanceof OSSRuleAst).toBeTruthy();

        const nestedFieldRule = <OSSRuleAst>statements[0];
        expect(nestedFieldRule.selectorList.length).toBe(3);

        expect(nestedFieldRule.selectorList[0].selectorKey.identifierKey).toBe('layout');
        expect(nestedFieldRule.selectorList[0].selectorValue.value).toBe('*');

        expect(nestedFieldRule.selectorList[1].selectorKey.identifierKey).toBe('class');
        expect(nestedFieldRule.selectorList[1].selectorValue.value).toBe('User');

        expect(nestedFieldRule.selectorList[2].selectorKey.identifierKey).toBe('field');
        expect(nestedFieldRule.selectorList[2].selectorValue.value).toBe('firstName');

        expect(nestedFieldRule.parentRule).not.toBeNull();


        statements = nestedFieldRule.ruleBody.statements;
        const property = (<OSSRuleBodyPropertyAst>statements[0]);
        expect(property.key).toBe('visible');

        expect(property.value.nodeType).toBe(OSSTokenType.BOOLTRue);
        expect(property.value.value).toBe(true);


        const property2 = (<OSSRuleBodyPropertyAst>statements[1]);
        expect(property2.key).toBe('component');

        expect(property2.value.nodeType).toBe(OSSTokenType.StringLiteral);
        expect(property2.value.value).toBe('InputComponent');


        const property3 = (<OSSRuleBodyPropertyAst>statements[2]);
        expect(property3.key).toBe('value');

        expect(property3.value.nodeType).toBe(OSSTokenType.FieldPathBinding);
        expect(property3.value.value).toBe('value');
      });


    it('Can parse values under 1 selector where each level has properties',
      () => {
        /* tslint:disable: no-trailing-whitespace */
        lexer = new OSSLexer(
          `
          class {
            displayKey:toString;

            searchOperation:search;

            trait=Searchable {
                textSearchSupported:true;
                searchOperation:keywordSearch;
            }


            operation=keywordSearch {
                useTextIndex:true;

                field { visible:false;}
                @field=keywords#SearchableProperty{
                    visiblex:true!;
                    type:String;
                    rank:0;
                    after:zTop;
                }
            }
            operation=textSearch {
                field {
                    trait=SearchableProperty {
                        visible:true!;
                    }
                }
            }
        }`
        );

        const parser = new OSSParser(lexer);

        const ossFileAst = parser.parse();
        expect(ossFileAst.rules.length).toBe(1);

        expect(ossFileAst.rules[0].selectorList.length).toBe(1);
        expect(ossFileAst.rules[0].selectorList[0].selectorKey.identifierKey)
          .toBe('class');
        expect(ossFileAst.rules[0].selectorList[0].selectorValue.value)
          .toBe('*');

        // 2 properties, 3 rules
        expect(ossFileAst.rules[0].ruleBody.statements.length).toBe(5);

        // displayKey:toString;
        expect(ossFileAst.rules[0].ruleBody.statements[0] instanceof OSSRuleBodyPropertyAst)
          .toBeTruthy();

        // searchOperation:search;
        expect(ossFileAst.rules[0].ruleBody.statements[1] instanceof OSSRuleBodyPropertyAst)
          .toBeTruthy();


        const traitSearchable = <OSSRuleAst>ossFileAst.rules[0].ruleBody.statements[2];
        expect(traitSearchable.selectorList.length).toBe(2);
        expect(traitSearchable.selectorList[0].selectorKey.identifierKey).toBe('class');
        expect(traitSearchable.selectorList[0].selectorValue.value).toBe('*');

        expect(traitSearchable.selectorList[1].selectorKey.identifierKey).toBe('trait');
        expect(traitSearchable.selectorList[1].selectorValue.value).toBe('Searchable');


        let statements = traitSearchable.ruleBody.statements;

        expect(statements.length).toBe(2);
        expect(statements[0] instanceof OSSRuleBodyPropertyAst).toBeTruthy();
        expect(statements[1] instanceof OSSRuleBodyPropertyAst).toBeTruthy();

        const operKeywordSearch = <OSSRuleAst>ossFileAst.rules[0].ruleBody.statements[3];
        expect(operKeywordSearch.selectorList.length).toBe(2);
        expect(operKeywordSearch.selectorList[0].selectorKey.identifierKey).toBe('class');
        expect(operKeywordSearch.selectorList[0].selectorValue.value).toBe('*');

        expect(operKeywordSearch.selectorList[1].selectorKey.identifierKey)
          .toBe('operation');
        expect(operKeywordSearch.selectorList[1].selectorValue.value)
          .toBe('keywordSearch');

        statements = operKeywordSearch.ruleBody.statements;
        expect(statements.length).toBe(3);
        expect(statements[0] instanceof OSSRuleBodyPropertyAst).toBeTruthy();
        expect(statements[2] instanceof OSSRuleAst).toBeTruthy();

        expect((<OSSRuleAst>statements[2]).selectorList.length).toBe(3);
        expect((<OSSRuleAst>statements[2]).selectorList[2].isDeclaration).toBeTruthy();
        expect((<OSSRuleAst>statements[2]).traitList.length).toBe(1);

        statements = (<OSSRuleAst>statements[2]).ruleBody.statements;
        expect(statements.length).toBe(4);
        expect((<OSSRuleBodyPropertyAst>statements[0]).isOverride).toBeTruthy();

        const operTxtSearch = <OSSRuleAst>ossFileAst.rules[0].ruleBody.statements[4];
        expect(operTxtSearch.selectorList.length).toBe(2);
        expect(operTxtSearch.selectorList[0].selectorKey.identifierKey).toBe('class');
        expect(operTxtSearch.selectorList[0].selectorValue.value).toBe('*');

        expect(operTxtSearch.selectorList[1].selectorKey.identifierKey).toBe('operation');
        expect(operTxtSearch.selectorList[1].selectorValue.value).toBe('textSearch');

        expect((<OSSRuleAst>operTxtSearch.ruleBody.statements[0]).selectorList.length)
          .toBe(3);

      });

    it('It can parse is 1 selector and Array property',
      () => {
        /* tslint:disable: no-trailing-whitespace */
        lexer = new OSSLexer(
          `
          class=User {
            displayKey:One, two;

          }`
        );

        const parser = new OSSParser(lexer);

        const ossFileAst = parser.parse();
        expect(ossFileAst.rules.length).toBe(1);
        expect((<OSSRuleBodyPropertyAst>ossFileAst.rules[0].ruleBody.statements[0]).key)
          .toBe('displayKey');
        const value = (<OSSRuleBodyPropertyAst>ossFileAst.rules[0].ruleBody.statements[0]).value;
        expect(value instanceof OSSValueOrListValueAst).toBeTruthy();
        expect([...(<OSSValueOrListValueAst>value).value].length).toBe(2);
        expect([...(<OSSValueOrListValueAst>value).value][1].value).toBe('two');

      });


    it('It can parse is 1 selector and Array property',
      () => {
        /* tslint:disable: no-trailing-whitespace */
        lexer = new OSSLexer(
          `
          class=User {
            displayKey:One, two;

          }`
        );

        const parser = new OSSParser(lexer);

        const ossFileAst = parser.parse();
        expect(ossFileAst.rules.length).toBe(1);
        expect((<OSSRuleBodyPropertyAst>ossFileAst.rules[0].ruleBody.statements[0]).key)
          .toBe('displayKey');
        const value = (<OSSRuleBodyPropertyAst>ossFileAst.rules[0].ruleBody.statements[0]).value;
        expect(value instanceof OSSValueOrListValueAst).toBeTruthy();
        expect([...(<OSSValueOrListValueAst>value).value].length).toBe(2);
        expect([...(<OSSValueOrListValueAst>value).value][1].value).toBe('two');
      });


    it('It can parse is Wrapped List in in List Property',
      () => {
        /* tslint:disable: no-trailing-whitespace */
        lexer = new OSSLexer(
          `
          class=User {
            displayKey:One, [two, three];

          }`
        );

        const parser = new OSSParser(lexer);
        const ossFileAst = parser.parse();
        expect(ossFileAst.rules.length).toBe(1);

        const value = (<OSSRuleBodyPropertyAst>ossFileAst.rules[0].ruleBody.statements[0]).value;
        expect(value instanceof OSSValueOrListValueAst).toBeTruthy();
        expect([...(<OSSValueOrListValueAst>value).value].length).toBe(2);
        expect([...(<OSSValueOrListValueAst>value).value][0].value).toBe('One');

        const wrappedList = [...(<OSSWrappedListValueAst>value).value][1];
        expect([...wrappedList.value][0].value).toBe('two');
        expect([...wrappedList.value][1].value).toBe('three');
      });


    it('can parse is standalone Wrapped List in property',
      () => {
        /* tslint:disable: no-trailing-whitespace */
        lexer = new OSSLexer(
          `
          class=User {
            displayKey: [one, two];

          }`
        );
        const parser = new OSSParser(lexer);
        const ossFileAst = parser.parse();
        expect(ossFileAst.rules.length).toBe(1);

        const wrappedList = (<OSSRuleBodyPropertyAst>ossFileAst.rules[0].ruleBody.statements[0])
          .value;
        expect(wrappedList instanceof OSSWrappedListValueAst).toBeTruthy();
        expect([...wrappedList.value][0].value).toBe('one');
        expect([...wrappedList.value][1].value).toBe('two');
      });


    it('can parse map  as property value',
      () => {
        /* tslint:disable: no-trailing-whitespace */
        lexer = new OSSLexer(
          `
          class=User {
            displayKey: {
               renderAs:menu;
               align:right;
            };

          }`
        );
        const parser = new OSSParser(lexer);

        const ossFileAst = parser.parse();
        expect(ossFileAst.rules.length).toBe(1);

        const prop = <OSSRuleBodyPropertyAst>ossFileAst.rules[0].ruleBody.statements[0];
        expect((<OSSMapValueAst>prop.value).value.size).toBe(2);


      });


    it('can parse Dynamic field path binding. ',
      () => {
        /* tslint:disable: no-trailing-whitespace */
        lexer = new OSSLexer(
          `
          class=User {
            renderAs:$type;
            value:$object.name;
          }`
        );
        const parser = new OSSParser(lexer);

        const ossFileAst = parser.parse();
        expect(ossFileAst.rules.length).toBe(1);

        const prop1 = <OSSRuleBodyPropertyAst>ossFileAst.rules[0].ruleBody.statements[0];
        expect(prop1.value.value).toBe('type');
        expect(prop1.value.nodeType).toBe(OSSTokenType.FieldPathBinding);

        const prop2 = <OSSRuleBodyPropertyAst>ossFileAst.rules[0].ruleBody.statements[1];
        expect(prop2.value.value).toBe('object.name');
        expect(prop2.value.nodeType).toBe(OSSTokenType.FieldPathBinding);

      });

    it('can parse key path inside predecessor chain node',
      () => {
        /* tslint:disable: no-trailing-whitespace */
        lexer = new OSSLexer(
          `class=Issue {
                    zLeft => name => address.city;
                }`
        );

        const parser = new OSSParser(lexer);

        const ossFileAst = parser.parse();
        expect(ossFileAst.rules.length).toBe(1);

        const prChain = <OSSPrecedenceChainAst>ossFileAst.rules[0].ruleBody.statements[0];
        expect(prChain.nodes[2].token.type).toBe(OSSTokenType.KeyPath);


      });


    it('can parse expression property',
      () => {
        /* tslint:disable: no-trailing-whitespace */
        lexer = new OSSLexer(
          'class=Issue {              \n' +
          '         key:${value.len > 0};\n' +
          '       }'
        );

        const parser = new OSSParser(lexer);

        const ossFileAst = parser.parse();
        expect(ossFileAst.rules.length).toBe(1);

        const prop = <OSSRuleBodyPropertyAst>ossFileAst.rules[0].ruleBody.statements[0];
        expect(prop.key).toBe('key');
        expect(prop.value.nodeType).toBe(OSSTokenType.ExprLiteral);

      });

    it('can parse dynamic static expressopn',
      () => {
        /* tslint:disable: no-trailing-whitespace */
        lexer = new OSSLexer('class=User { visible:$${true}; }');
        const parser = new OSSParser(lexer);

        const ossFileAst = parser.parse();

        expect(ossFileAst.rules.length).toBe(1);

      });

  });


  describe('OSSPrecedenceChain', () => {
    it('Can parse property and OSSPrecedenceChainAst under 1 selector',
      () => {
        /* tslint:disable: no-trailing-whitespace */
        lexer = new OSSLexer(
          `
          class {
            displayKey:toString;

            zNone => *;
            zLeft => firstName => lastName;
           }`
        );

        const parser = new OSSParser(lexer);

        const ossFileAst = parser.parse();
        expect(ossFileAst.rules.length).toBe(1);

        expect(ossFileAst.rules[0].selectorList[0].selectorKey.identifierKey)
          .toBe('class');
        expect(ossFileAst.rules[0].selectorList[0].selectorValue.value)
          .toBe('*');

        const statements = ossFileAst.rules[0].ruleBody.statements;
        expect(statements.length).toBe(3);

        expect(statements[0] instanceof OSSRuleBodyPropertyAst).toBeTruthy();
        expect(statements[1] instanceof OSSPrecedenceChainAst).toBeTruthy();
        expect(statements[2] instanceof OSSPrecedenceChainAst).toBeTruthy();

      });


    it('Can parse nested selector with OSSPrecedenceChainAst',
      () => {
        /* tslint:disable: no-trailing-whitespace */
        lexer = new OSSLexer(
          `
          class=model.Issue {
            Notes.zDetail => notes;

            field=subject {
                operation=edit  {
                  trait:bold;
                }
                editable:false;
            }
            operation=list {
                zNone => *;
                zLeft => category => owner => priority => status => lastModified;
                zDetail => subject#italic;
            }
           }`
        );

        const parser = new OSSParser(lexer);
        const ossFileAst = parser.parse();

        expect(ossFileAst.rules.length).toBe(1);
        expect(ossFileAst.rules[0].selectorList.length).toBe(1);
        expect(ossFileAst.rules[0].ruleBody.statements.length).toBe(3);

        expect(ossFileAst.rules[0].ruleBody.statements[0] instanceof OSSPrecedenceChainAst)
          .toBeTruthy();
        expect(ossFileAst.rules[0].ruleBody.statements[1] instanceof OSSRuleAst)
          .toBeTruthy();
        expect(ossFileAst.rules[0].ruleBody.statements[2] instanceof OSSRuleAst)
          .toBeTruthy();


        expect((<OSSRuleAst>ossFileAst.rules[0].ruleBody.statements[1]).selectorList.length)
          .toBe(2);

        const lastRule = <OSSRuleAst>ossFileAst.rules[0].ruleBody.statements[2];
        expect(lastRule.ruleBody.statements.length).toBe(3);

        const chain = <OSSPrecedenceChainAst>lastRule.ruleBody.statements[2];
        expect(chain.nodes.length).toBe(2);

        expect(chain.nodes[1].token.value).toBe('subject');
        expect(chain.nodes[1].traitList.length).toBe(1);


      });

    it('should throw Error when ; is missing',
      () => {
        /* tslint:disable: no-trailing-whitespace */
        lexer = new OSSLexer(
          `class=Issue {
              zNone => *;
              zLeft => lastModified
           }`
        );

        const parser = new OSSParser(lexer);

        expect(() => parser.parse()).toThrowMatching((e) => {
          return e.toString().indexOf('Parse error (Expecting "=>" or ";")') > 0;
        });

      });

  });

  describe('Complex rule parsing', function () {
    it('can parse full file', () => {
      lexer = new OSSLexer('/**\n' +
        '    sdsds\n' +
        '*/\n' +
        '\n' +
        '\n' +
        'class {\n' +
        '    displayKey:toString;\n' +
        '\n' +
        '    searchOperation:search;\n' +
        '\n' +
        '    trait=Searchable {\n' +
        '        textSearchSupported:true;\n' +
        '        searchOperation:keywordSearch;\n' +
        '    }\n' +
        '\n' +
        '\n' +
        '    operation=keywordSearch {\n' +
        '        useTextIndex:true;\n' +
        '\n' +
        '        field {\n' +
        '           visible:false;\n' +
        '        }\n' +
        '        @field=keywords#SearchableProperty{\n' +
        '          visible:true!;\n' +
        '          rank:0;\n' +
        '          after:zTop;\n' +
        '          bindings:{\n' +
        '            size:30;\n' +
        '          };\n' +
        '        }\n' +
        '    }\n' +
        '    \n' +
        '    operation=textSearch {\n' +
        '        field {\n' +
        '            trait=SearchableProperty {\n' +
        '                visible:true!;\n' +
        '            }\n' +
        '        }\n' +
        '    }\n' +
        '}\n' +
        '\n' +
        'field {\n' +
        '    trait=toOneRelationship {\n' +
        '        editable {\n' +
        '            component:GenericChooser;\n' +
        '            bindings:{\n' +
        '                object:${object};\n' +
        '                key:${field};\n' +
        '                destinationClass:${type};\n' +
        '                displayKey:${ariba.ui.meta.core.UIMeta.getInstance()' +
        '.displayKeyForClass(type)};\n' +
        '            };\n' +
        '        }\n' +
        '        editable=false {\n' +
        '            component:AWHyperlink;\n' +
        '            bindings:{\n' +
        '                action:${\n' +
        '                    set("object", value);\n' +
        '                    set("actionCategory", "General");\n' +
        '                    set("action", "Inspect");\n' +
        '                    ariba.ui.meta.core.UIMeta.getInstance().fireAction(this,' +
        ' requestContext)\n' +
        '                };\n' +
        '                awcontent:${value ? ariba.util.fieldvalue.FieldValue.getFieldValue(' +
        'value, ariba.ui.meta.core.UIMeta.getInstance().displayKeyForClass(type)) : null};\n' +
        '            };\n' +
        '        }\n' +
        '    }\n' +
        '\n' +
        '    trait=toManyChooser {\n' +
        '        component:GenericChooser;\n' +
        '    }\n' +
        '\n' +
        '    trait=toManyTable {\n' +
        '        component:MetaDetailTable;\n' +
        '    }\n' +
        '\n' +
        '    trait=toManyLink {\n' +
        '        component:AWHyperlink;\n' +
        '        bindings:{\n' +
        '            action:${\n' +
        '                set("object", value);\n' +
        '                set("actionCategory", "General");\n' +
        '                set("action", "Inspect");\n' +
        '                ariba.ui.meta.core.UIMeta.getInstance().fireAction(this, ' +
        'requestContext)\n' +
        '            };\n' +
        '            omitTags:${!value || value.size() ==0};\n' +
        '            awcontent:${value ? ("" + value.size() + " items") : "(none)"};\n' +
        '        };\n' +
        '    }\n' +
        '    \n' +
        '    trait=(toManyChooser,toManyTable) {\n' +
        '        bindings:{\n' +
        '            object:${object};\n' +
        '            key:${field};\n' +
        '            destinationClass:${elementType};\n' +
        '            multiSelect:true;\n' +
        '            displayKey:${ariba.ui.meta.core.UIMeta.getInstance()' +
        '.displayKeyForClass(elementType)};\n' +
        '        };\n' +
        '    }\n' +
        '\n' +
        '    trait=toManyRelationship {\n' +
        '        editable {\n' +
        '            trait:toManyChooser;\n' +
        '        }\n' +
        '        editable=false  { trait: toManyLink;}\n' +
        '        trait=ownedToMany { trait: toManyTable;}\n' +
        '    }\n' +
        '\n' +
        '    valueRedirector {\n' +
        '        value:$values.valueRedirector.val;\n' +
        '    }\n' +
        '    operation=search ~valueRedirector  {\n' +
        '        type=(java.util.Date,java.lang.Number) {\n' +
        '            component:MetaRange;\n' +
        '        }\n' +
        '    }\n' +
        '}\n' +
        '\n' +
        '\n' +
        '@traitGroup=RelViewers {\n' +
        '    @trait=toManyChooser;\n' +
        '    @trait=toManyTable;\n' +
        '    @trait=toManyLink;\n' +
        '}\n' +
        '\n' +
        'action {\n' +
        '    trait=newContext {\n' +
        '        actionResults:${ariba.ui.meta.persistence.ObjectContext.bindNewContext();\n' +
        '                    requestContext.pageWithName(properties.pageName)};\n' +
        '    }\n' +
        '    trait=nestedContext {\n' +
        '        actionResults:${ariba.ui.meta.persistence.ObjectContext.bindNestedContext();\n' +
        '                    requestContext.pageWithName(properties.pageName)};\n' +
        '    }\n' +
        '}\n' +
        '\n' +
        'action=Create {\n' +
        '    visible:true;\n' +
        '    trait:pageAction;\n' +
        '    pageName:MetaContentPage;\n' +
        '    pageBindings:{\n' +
        '        /* Should bind a new session */\n' +
        '        object:${ariba.ui.meta.persistence.ObjectContext.get()' +
        '.create(values().get("class"))};\n' +
        '        operation:create;\n' +
        '        layout:Inspect;\n' +
        '        clientPanel:true;\n' +
        '    };\n' +
        '\n' +
        '    displayGroup dataSourceType {\n' +
        '        pageBindings:{\n' +
        '            object:${displayGroup.insert()};\n' +
        '        };\n' +
        '    }\n' +
        '\n' +
        '    displayGroup dataSourceType="ariba.ui.meta.persistence.DetailDataSource" {\n' +
        '        label:$[a001]"Add";\n' +
        '        visible:${displayGroup.dataSource.parentObject != null};\n' +
        '    }\n' +
        '}\n' +
        '\n' +
        '@actionCategory=Manage {\n' +
        '    after:zNav;\n' +
        '}\n' +
        '\n' +
        '@actionCategory=Editing {\n' +
        '    label:$[a003]Editing;\n' +
        '    after:zMain;\n' +
        '\n' +
        '    layout=(SelectionButtonArea,TableRow) {\n' +
        '        @action=Inspect {\n' +
        '            trait:instance, pageAction;\n' +
        '            visible:true;\n' +
        '            component:TextButton;\n' +
        '            bindings:{\n' +
        '                awcontent:"Inspect";\n' +
        '            };\n' +
        '            pageName:MetaContentPage;\n' +
        '            pageBindings:{\n' +
        '                object:${ariba.ui.meta.persistence.ObjectContext.get().merge(object)};\n' +
        '                layout:Inspect;\n' +
        '                operation:edit;\n' +
        '                clientPanel:true;\n' +
        '            };\n' +
        '        }\n' +
        '\n' +
        '        @action=Delete {\n' +
        '            trait:instance;\n' +
        '            actionResults:${\n' +
        '                ctx = ariba.ui.meta.persistence.ObjectContext.get();\n' +
        '                ctx.remove(object);\n' +
        '                ctx.save();\n' +
        '                ariba.ui.widgets.AribaPageContent.setMessage("Item Deleted",' +
        ' requestContext.session());\n' +
        '                null};\n' +
        '\n' +
        '            displayGroup dataSourceType="ariba.ui.meta.persistence.DetailDataSource" {\n' +
        '                label:$[a004]"Remove";\n' +
        '                actionResults:${\n' +
        '                    displayGroup.dataSource.delete(object);\n' +
        '                    null};\n' +
        '            }\n' +
        '        }\n' +
        '    }\n' +
        '    layout=ButtonArea {\n' +
        '        @action=Create {}\n' +
        '    }\n' +
        '}\n' +
        '\n' +
        'operation=list {\n' +
        '    field=ActionCol {\n' +
        '        after:zBottom;\n' +
        '    }\n' +
        '}\n' +
        '\n' +
        'module {\n' +
        '    @trait=ModuleClassPage {\n' +
        '        label:$${pushAndResolve([class:properties.moduleClassName], "label", true)};\n' +
        '        layout:SearchPage;\n' +
        '        homePage:MetaContentPage;\n' +
        '        pageBindings:{\n' +
        '            class:${properties.moduleClassName};\n' +
        '            displayGroup:${new ariba.ui.table.AWTDisplayGroup()};\n' +
        '            module:$module;\n' +
        '            scopeKey:layout;\n' +
        '        };\n' +
        '    }\n' +
        '\n' +
        '    @trait=SearchDetail {\n' +
        '        layout:SearchDetailPage;\n' +
        '        homePage:MetaContentPage;\n' +
        '        pageBindings:{\n' +
        '            class:${properties.moduleClassName};\n' +
        '            displayGroup:${new ariba.ui.table.AWTDisplayGroup()};\n' +
        '            module:$module;\n' +
        '            scopeKey:layout;\n' +
        '        };\n' +
        '    }\n' +
        '\n' +
        '    @trait=SearchInToc;\n' +
        '}\n' +
        '\n' +
        'layout=SearchPage {\n' +
        '    label:${pushAndResolve([module:"*"], "label")};\n' +
        '    component:MetaDashboardLayout;\n' +
        '    @layout=SearchTOC {\n' +
        '       label:$[a005]"Actions";\n' +
        '       component:MetaActionList;\n' +
        '       bindings:{ filterActions:static; showGlobal:true;};\n' +
        '       after:zToc;\n' +
        '       area:Global;\n' +
        '    }\n' +
        '    @layout=Search {\n' +
        '       label:$[a006]"Search";\n' +
        '       component:MetaSearch;\n' +
        '       after:zTop;\n' +
        '    }\n' +
        '}\n' +
        '\n' +
        'layout=Search layout=Table {\n' +
        '    class { bindings:{ showHeadingArea:true;};}\n' +
        '    layout=HeadingArea {\n' +
        '        component:MetaSearchForm;\n' +
        '    }\n' +
        '}\n' +
        '\n' +
        'module_trait=SearchDetail {\n' +
        '    layout=SearchDetailPage {\n' +
        '        component:MetaDashboardLayout;\n' +
        '        visible:true;\n' +
        '        bindings:{widthLeft:"450px"; widthRight:auto;};\n' +
        '        label:${pushAndResolve([module:"*"], "label")};\n' +
        '\n' +
        '        @layout=Search {\n' +
        '            label:$[a007]"Search";\n' +
        '            component:MetaSearch;\n' +
        '            after:zLeft;\n' +
        '        }\n' +
        '\n' +
        '        layout=SearchForm {\n' +
        '            wrapperComponent:AWGenericContainer;\n' +
        '            wrapperBindings:{ tagName:div; style:"padding:0px 5px";};\n' +
        '            class { bindings:{ omitLabelPadding:true;};}\n' +
        '        }\n' +
        '\n' +
        '        @layout=Detail {\n' +
        '            after:zRight;\n' +
        '            component:MetaContext;\n' +
        '            portletWrapper:AWTNullWrapper;\n' +
        '            bindings:{\n' +
        '                object:$displayGroup.selectedObject;\n' +
        '                layout:InspectStack;\n' +
        '                operation:${displayGroup.selectedObject ? "edit" : "view"};\n' +
        '                awcontentElement:MetaIncludeComponent;\n' +
        '            };\n' +
        '            layout=Actions#ActionButtons{\n' +
        '                elementStyle:"padding-top:10px";\n' +
        '                bindings:{showGlobal:false;};\n' +
        '                @actionCategory=Data {\n' +
        '                    @action=Save {\n' +
        '                        actionResults:${ariba.ui.meta.persistence.PersistenceMeta' +
        '.validateAndSave(this)};\n' +
        '                        visible:${properties.editing};\n' +
        '                    }\n' +
        '                }\n' +
        '            }\n' +
        '        }\n' +
        '    }\n' +
        '\n' +
        '    displayGroup dataSourceType="ariba.ui.meta.persistence.ObjectContextDataSource" {\n' +
        '        action=Create {\n' +
        '            label:$[a008]"New";\n' +
        '            actionResults:${displayGroup.insert(); null};\n' +
        '        }\n' +
        '        action=Inspect {\n' +
        '            visible:false;\n' +
        '        }\n' +
        '    }\n' +
        '\n' +
        '    component=MetaForm {\n' +
        '        wrapperComponent:AWGenericContainer;\n' +
        '        wrapperBindings:{ tagName:div; class:smallForm;};\n' +
        '    }\n' +
        '\n' +
        '    field=ActionCol { after:zNone;}\n' +
        '}\n' +
        '\n' +
        'module_trait=SearchInToc {\n' +
        '    layout {\n' +
        '        @layout=SearchToc {\n' +
        '            label:$[a009]"Search";\n' +
        '            component:MetaSearchForm;\n' +
        '            after:zToc;\n' +
        '            layout=SearchForm#labelsOnTop{\n' +
        '                class {\n' +
        '                    trait:oneZone;\n' +
        '                }\n' +
        '            }\n' +
        '        }\n' +
        '        layout=Search {\n' +
        '            label:$[a010]"Search Results";\n' +
        '            layout=Table { class { bindings:{ showHeadingArea:false; title:null;};}}\n' +
        '        }\n' +
        '    }\n' +
        '}\n' +
        '\n' +
        '\n' +
        '/* Used for Dashboard modules rules */\n' +
        '@module=Home  {\n' +
        '    label:$[a001]Home;\n' +
        '    @layout=Main {\n' +
        '       after:zTop;\n' +
        '       label:$[a003]"Welcome to AribaWeb!";\n' +
        '       component:HomeContent;\n' +
        '    }\n' +
        '\n' +
        '    @layout=Actions {\n' +
        '       label:$[a004]Actions;\n' +
        '       after:zToc;\n' +
        '       component:Toc;\n' +
        '    }\n' +
        '}\n' +
        '\n' +
        '@module=Documentation {\n' +
        '    label:$[a005]Documentation;\n' +
        '    homePage:SearchSource;\n' +
        '}\n' +
        '\n' +
        '@module=DataTables  {\n' +
        '    label:$[a002]"Data Tables";\n' +
        '    needsForm:true;\n' +
        '    component:MetaTabs;\n' +
        '    layout {\n' +
        '        bindings:{ vertical:true;};\n' +
        '        @layout=SimpleTable     { component:SimpleTable;}\n' +
        '        @layout=AdvancedTable   { component:AdvancedTable;}\n' +
        '        @layout=GroupingTable   { component:GroupingTable;}\n' +
        '        @layout=OutlineTable    { component:OutlineTable;}\n' +
        '        @layout=XMLTable        { component:XMLDataTable;}\n' +
        '        @layout=RemoteTable     { component:MetaContentTable;}\n' +
        '        @layout=ExplorerPage    { component:ExplorerPage;}\n' +
        '        @layout=PersonMasterDetail { component:PersonMasterDetail;}\n' +
        '    }\n' +
        '}\n' +
        '\n' +
        '@module=PivotTables  {\n' +
        '    label:$[a006]"Pivot Tables";\n' +
        '    homePage:"PivotTabs";\n' +
        '}\n' +
        '\n' +
        '@module="Forms"  {\n' +
        '    label:$[a007]Forms;\n' +
        '    homePage:MetaUIForms;\n' +
        '\n' +
        '}\n' +
        '\n' +
        '@module=MiniApp {\n' +
        '    label:$[a008]"Mini App";\n' +
        '    homePage:ERPage;\n' +
        '\n' +
        '    visible:${false};\n' +
        '}\n' +
        '\n' +
        '/* Action Set up */\n' +
        '@actionCategory=Favorites {\n' +
        '    after:zNav; \n' +
        '    label:$[a009]Favorites;\n' +
        '    @action=MiniApp#pageAction{ pageName:ERPage;}\n' +
        '    @action=Documentation#pageAction{ pageName:SearchSource;}\n' +
        '}\n');
      const parser = new OSSParser(lexer);

      const ossFileAst = parser.parse();
      expect(ossFileAst.rules.length).toBe(20);


    });
  });

});
