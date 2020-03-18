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
import {async} from '@angular/core/testing';
import {OSSLexer, OSSToken, OSSTokenType} from './oss-lexer';


describe('MetaUI Lexer', () => {
  let lexer: OSSLexer;

  beforeEach((done) => {
    window.setTimeout(function () {
      done();
    }, 0);
  });


  describe('Comments lexing', () => {
    it('should tokenize block level comments as well as Line Comments', async(() => {
      /* tslint:disable: no-trailing-whitespace */
      lexer = new OSSLexer(`/**
               some comment

            */


            /**
               some comment 2

            */

            // Test Line Comment
            /**/

        `);

      let token: OSSToken = lexer.nextToken();
      expect(token.value).toBe(`/**
               some comment

            */`);

      token = lexer.nextToken();
      expect(token.value).toBe(`/**
               some comment 2

            */`);


      token = lexer.nextToken();
      expect(token.value.trim()).toBe(`// Test Line Comment`);


      token = lexer.nextToken();
      expect(token.value).toBe(`/**/`);

    }));


    it('should throw error when block comment is not terminated', async(() => {
      lexer = new OSSLexer(`
            /**
               some comment

            */


            /**
               some comment 2


            // Test Line Comment

        `);

      const token: OSSToken = lexer.nextToken();
      expect(() => lexer.nextToken())
        .toThrowMatching((e) =>
          e.toString()
            .indexOf('Error while parsing: block comment is not correctly terminated') > 0);

    }));


    it('should throw error when line level comment is not terminated by new line', async(() => {
      lexer = new OSSLexer(`
            /**
               some comment

            */

            // Test Line Comment`);

      const token: OSSToken = lexer.nextToken();
      expect(() => lexer.nextToken())
        .toThrowMatching((e) =>
          e.toString()
            .indexOf('Error while parsing: line comment is not correctly terminated') > 0);

    }));

  });

  describe('Common Symbols', () => {

    it('should tokenize start and end of the basic block', async(() => {

      lexer = new OSSLexer(`
                class=User#AAAA {
                    visible:true;
                    zNone => aaa;
                }
            `);

      let token = rewindTo(lexer, 6);

      expect(token.value).toBe('{');
      expect(token.type).toBe(OSSTokenType.LBrace);

      token = rewindTo(lexer, 9);
      expect(token.value).toBe('}');
      expect(token.type).toBe(OSSTokenType.RBrace);
    }));

    it('should tokenize start and end of the nested block', async(() => {

      lexer = new OSSLexer(`
            class=User {


                layout=Inspect {
                }

            }
        `);
      let token = rewindTo(lexer, 4);

      expect(token.value).toBe('{');
      expect(token.type).toBe(OSSTokenType.LBrace);

      token = rewindTo(lexer, 4);
      expect(token.value).toBe('{');
      expect(token.type).toBe(OSSTokenType.LBrace);

      token = rewindTo(lexer, 1);
      expect(token.value).toBe('}');
      expect(token.type).toBe(OSSTokenType.RBrace);

      token = rewindTo(lexer, 1);
      expect(token.value).toBe('}');
      expect(token.type).toBe(OSSTokenType.RBrace);

    }));

    it('should tokenize start and end of the inline block', async(() => {

      lexer = new OSSLexer(`
            class=User field=name {

            }
        `);

      let token = rewindTo(lexer, 7);
      expect(token.value).toBe('{');
      expect(token.type).toBe(OSSTokenType.LBrace);

      token = rewindTo(lexer, 1);
      expect(token.value).toBe('}');
      expect(token.type).toBe(OSSTokenType.RBrace);

    }));

    it('should recognize Semi 2 colons', async(() => {

      lexer = new OSSLexer(`
            class=User {
                field:value;
                field1:value2;

            }
        `);

      let token = rewindTo(lexer, 8);
      expect(token.value).toBe(';');
      expect(token.type).toBe(OSSTokenType.Semi);

      token = rewindTo(lexer, 4);
      expect(token.value).toBe(';');
      expect(token.type).toBe(OSSTokenType.Semi);

    }));


    it('should tokenize key: value so it will read 2 colons', async(() => {
      /* tslint:disable: no-trailing-whitespace */
      lexer = new OSSLexer(`
                    class=User {
                        field:value;
                        field1:value2;
                    }
                `);


      let token = rewindTo(lexer, 6);
      expect(token.value).toBe(':');
      expect(token.type).toBe(OSSTokenType.Colon);

      token = rewindTo(lexer, 4);
      expect(token.value).toBe(':');
      expect(token.type).toBe(OSSTokenType.Colon);


    }));


    it('should tokenize array: value so it will read 3 values', async(() => {

      lexer = new OSSLexer(`
                    class=User {
                        field=(aa, bb, cc) {
                        }
                    }
                `);

      let token = rewindTo(lexer, 9);
      expect(token.value).toBe(',');
      expect(token.type).toBe(OSSTokenType.Coma);

      token = rewindTo(lexer, 2);
      expect(token.value).toBe(',');
      expect(token.type).toBe(OSSTokenType.Coma);

    }));


    it('should tokenize commans for aa, bb, cc ', async(() => {
      lexer = new OSSLexer(`
                    class=User {
                        field=(aa, bb, cc) {
                        }
                    }
                `);

      let token = rewindTo(lexer, 9);
      expect(token.value).toBe(',');
      expect(token.type).toBe(OSSTokenType.Coma);

      token = rewindTo(lexer, 2);
      expect(token.value).toBe(',');
      expect(token.type).toBe(OSSTokenType.Coma);

    }));


    it('should recognize Equal for the selectors', async(() => {

      lexer = new OSSLexer(`
                        module=home class=User {

                        }
                `);

      let token = rewindTo(lexer, 2);
      expect(token.value).toBe('=');
      expect(token.type).toBe(OSSTokenType.OpEq);

      token = rewindTo(lexer, 3);
      expect(token.value).toBe('=');
      expect(token.type).toBe(OSSTokenType.OpEq);
    }));


    it('should tokenize properties and precedenceChain path', async(() => {
      lexer = new OSSLexer(`
               // aaas

                class=User#AAAA {
                    visible:true;

                    zNone => aaa;

                }
            `);
      const token = rewindTo(lexer, 13);
      expect(token.value).toBe('=>');
      expect(token.type).toBe(OSSTokenType.NextPrecedenceChain);
    }));


    it('should tokenize precedenceChain path', async(() => {
      lexer = new OSSLexer(`
               // aaas
                class=User {
                    visible:true;

                    zNone => *;
                    zLeft => firstName => lastName#traitOne;
                    zRight => description#traitTwo => label;
                    Notes.zDetail => notes;

                }
            `);
      let token = rewindTo(lexer, 12); // star

      token = rewindTo(lexer, 2); // zLeft
      expect(token.type).toBe(OSSTokenType.Identifier);

      token = rewindTo(lexer, 6); // traitOne
      expect(token.value).toBe('traitOne');

      token = rewindTo(lexer, 6); // traitTwo
      expect(token.value).toBe('traitTwo');


      token = rewindTo(lexer, 4); // Notes.zDetail
      expect(token.type).toBe(OSSTokenType.KeyPath);
    }));


    it('should be able to tokenize boolean values', async(() => {

      lexer = new OSSLexer(
        'class=User { ' +
        'visible:true;  ' +
        'editable:false;  ' +
        '}'
      );

      let token = rewindTo(lexer, 6);

      token = rewindTo(lexer, 1);

      expect(token.type).toBe(OSSTokenType.BOOLTRue);
      expect(token.value).toBe('true');

      token = rewindTo(lexer, 4);
      expect(token.type).toBe(OSSTokenType.BOOLFalse);
      expect(token.value).toBe('false');

    }));

  });

  describe('Expressions', () => {

    it('should read expression literal with in properties section ', async(() => {
      lexer = new OSSLexer(
        'class=User {' +
        '    field=name { ' +
        '       editable:${object.visible}; ' +
        '       }' +
        '   }'
      );
      const token = rewindTo(lexer, 11);
      expect(token.value).toBe('object.visible');
      expect(token.type).toBe(OSSTokenType.ExprLiteral);
    }));


    it('should read static dynamic expression ', async(() => {
      lexer = new OSSLexer(
        'class=User {' +
        '    field=name { ' +
        '       editable:$${object.visible; } ' +
        '       }' +
        '   }'
      );
      const token = rewindTo(lexer, 11);
      expect(token.value).toBe('object.visible');
      expect(token.type).toBe(OSSTokenType.ExprLiteralStaticDyn);
    }));


    it('should Throw Error when Expr does not start with $${  ', async(() => {
      lexer = new OSSLexer(
        'class=User { ' +
        'visible:$$object.aaa};  ' +
        '}'
      );

      expect(() => rewindTo(lexer, 7))
        .toThrowMatching((e) =>
          e.toString().indexOf('Error while parsing: Invalid Expression. Missing {') > 0);

    }));


  });

  describe('KeyPaths', () => {

    it('should read zone based keypath ', async(() => {
      lexer = new OSSLexer(
        `class=User {


                       myForm.zTop => AAA.aaa;
                   }`
      );
      let token = rewindTo(lexer, 5);
      expect(token.value).toBe('myForm.zTop');
      expect(token.type).toBe(OSSTokenType.KeyPath);


      token = rewindTo(lexer, 2);
      expect(token.value).toBe('AAA.aaa');
      expect(token.type).toBe(OSSTokenType.KeyPath);
    }));

  });

  describe('I18n Lokalization keys', () => {
    it('should read zone based keypath ', async(() => {
      lexer = new OSSLexer(
        `class=User {
                    field=aa {
                        label:$[key001]"Default Value";
                    }
              }`
      );
      const token = rewindTo(lexer, 11);
      expect(token.value).toBe('key001');
      expect(token.type).toBe(OSSTokenType.I18nKey);

    }));

    it('should fail when bracket is not terminated ', async(() => {
      lexer = new OSSLexer(
        `class=User {
                    field=aa {
                        label:$[key001"Default Value";
                    }
              }`
      );

      expect(() => rewindTo(lexer, 11))
        .toThrowMatching((e) => {
          return e.toString().indexOf('Error while parsing: i18n key is not correctly terminated');
        });

    }));
  });

  describe('String literals', () => {

    it('should read default string translation that is after the key ', async(() => {
      lexer = new OSSLexer(
        `class=User {
                    field=aa {
                        label:$[key001]"Default Value";
                    }
              }`
      );
      const token = rewindTo(lexer, 12);
      expect(token.value).toBe('Default Value');
      expect(token.type).toBe(OSSTokenType.StringLiteral);

    }));


    it('should fail as string is not terminated ', async(() => {
      lexer = new OSSLexer(
        `class=User {
                            field=aa {
                                label:$[key001]"Default Value;
                            }
                      }`
      );

      expect(() => rewindTo(lexer, 12))
        .toThrowMatching((e) =>
          e.toString()
            .indexOf('Error while parsing: string literal is not correctly terminated.') > 0);

    }));


    it('should read single quote string  ', async(() => {
      lexer = new OSSLexer(
        `class=User {
                    field=aa {
                        label:$[key001]'Default Value';
                    }
              }`
      );
      const token = rewindTo(lexer, 12);
      expect(token.value).toBe('Default Value');
      expect(token.type).toBe(OSSTokenType.StringLiteral);

    }));


    it('should fail as single q. string is not terminated ', async(() => {
      lexer = new OSSLexer(
        `class=User {
                            field=aa {
                                label:$[key001]'Default Value;
                            }
                      }`
      );

      expect(() => rewindTo(lexer, 12))
        .toThrowMatching((e) =>
          e.toString()
            .indexOf('Error while parsing: string literal is not correctly terminated.') > 0);

    }));

    it('should fail as single q. string is is terminated with double q. ', async(() => {
      lexer = new OSSLexer(
        `class=User {
                            field=aa {
                                label:$[key001]'Default Value";
                            }
                      }`
      );

      expect(() => rewindTo(lexer, 12))
        .toThrowMatching((e) =>
          e.toString()
            .indexOf('Error while parsing: string literal is not correctly terminated.') > 0);

    }));

  });

  describe('Dynamic field path bindings', () => {

    it(' Read field path binding ', async(() => {
      lexer = new OSSLexer(
        `class=User {
                        field=aa {
                            value:$object;
                        }
                 }`
      );

      const token = rewindTo(lexer, 11);
      expect(token.value).toBe('object');
      expect(token.type).toBe(OSSTokenType.FieldPathBinding);

    }));


    it(' Read field path binding with dotted path  ', async(() => {
      lexer = new OSSLexer(
        `class=User {
                        field=aa {
                            value:$object.aa;
                        }
                 }`
      );

      const token = rewindTo(lexer, 11);
      expect(token.value).toBe('object.aa');
      expect(token.type).toBe(OSSTokenType.FieldPathBinding);

    }));


    it('Read field path binding with numbers path  ', async(() => {
      lexer = new OSSLexer(
        `class=User {
                        field=aa {
                            value:$object12.aa;
                        }
                 }`
      );
      const token = rewindTo(lexer, 11);
      expect(token.value).toBe('object12.aa');
      expect(token.type).toBe(OSSTokenType.FieldPathBinding);

    }));


    it('should fail if it does not start with "a"-"z","A"-"Z","_"', async(() => {
      lexer = new OSSLexer(
        `class=User {
                        field=aa {
                            value:$1object12.aa;
                        }
                 }`
      );
      const token = rewindTo(lexer, 11);
      expect(token.type).toBe(OSSTokenType.EOF);

    }));


  });

});


export function rewindTo(lexer: OSSLexer, numOfSteps: number) {
  let token;
  for (let i = 0; i < numOfSteps; i++) {
    token = lexer.nextToken();
  }

  return token;
}
