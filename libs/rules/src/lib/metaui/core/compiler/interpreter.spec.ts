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
import {OSSLexer} from './oss-lexer';
import {OSSParser} from './oss-parser';
import {OSSFileAst} from './metaui-ast';
import {OfflineRulesVisitor} from './offline-rules-visitor';


describe('MetaUI Interpreter that test parsing against existing string literal js ' +
  'behavior',
  () => {
    let lexer: OSSLexer;

    beforeEach((done) => {
      window.setTimeout(function () {
        done();
      }, 0);
    });


    describe('how real rules is parsed for offline compiler', () => {

      it('should parse core WidgetRules OSS and match the version produced by java',
        () => {
          /* tslint:disable: no-trailing-whitespace */
          const ossFile: any = require(
            '!!raw-loader!../../../resources/compiler/WidgetsRules-core.oss');

          const extendedResult = readCompiledFile(
            require('!!raw-loader!../../../resources/compiler/widgets-rules-core.ts')
          );

          lexer = new OSSLexer(ossFile.default.toString());
          const parser = new OSSParser(lexer);
          const ossFileAst: OSSFileAst = parser.parse();


          const newRules = [];
          const v = new OfflineRulesVisitor(ossFileAst);

          v.ossRules.forEach((item) => {
            const rNew = JSON.stringify(item, (n, val) => {
              if (n === '_properties' && val) {
                return mapToObject(val);
              }
              return val;
            }).replace(/\"/g, '').replace(/\s/g, '');
            newRules.push(rNew);
          });

          for (let i = 0; i < extendedResult.length; i++) {
            const rule = extendedResult[i];
            if (!newRules.includes(rule)) {
              fail('Rule not found: ' + rule);
            }
          }

          for (let i = 0; i < newRules.length; i++) {
            const rule = newRules[i];
            if (!extendedResult.includes(rule)) {
              fail('Rule not found: ' + rule);
            }
          }

          expect(true).toBeTruthy();
        });


      it('should parse UI WidgetRules OSS and match the version produced by java',
        () => {
          /* tslint:disable: no-trailing-whitespace */
          const ossFile: any = require(
            '!!raw-loader!../../../resources/compiler/WidgetsRules-ui.oss');

          const extendedResult = readCompiledFile(
            require('!!raw-loader!../../../resources/compiler/widgets-rules-ui.ts')
          );

          lexer = new OSSLexer(ossFile.default.toString());
          const parser = new OSSParser(lexer);
          const ossFileAst: OSSFileAst = parser.parse();


          const newRules = [];
          const v = new OfflineRulesVisitor(ossFileAst);

          v.ossRules.forEach((item) => {
            const rNew = JSON.stringify(item, (n, val) => {
              if (n === '_properties' && val) {
                return mapToObject(val);
              }
              return val;
            }).replace(/\"/g, '').replace(/\s/g, '');
            newRules.push(rNew);
          });

          for (let i = 0; i < extendedResult.length; i++) {
            const rule = extendedResult[i];
            if (!newRules.includes(rule)) {
              fail('Rule not found: ' + rule);
            }
          }

          for (let i = 0; i < newRules.length; i++) {
            const rule = newRules[i];
            if (!extendedResult.includes(rule)) {
              fail('Rule not found: ' + rule);
            }
          }

          expect(true).toBeTruthy();
        });


      it('should parse PersitenceRules OSS and match the version produced by java',
        () => {
          /* tslint:disable: no-trailing-whitespace */
          const ossFile: any = require(
            '!!raw-loader!../../../resources/compiler/PersistenceRules-core.oss');

          const extendedResult = readCompiledFile(
            require('!!raw-loader!../../../resources/compiler/persistencerules-core.ts')
          );

          lexer = new OSSLexer(ossFile.default.toString());
          const parser = new OSSParser(lexer);

          const ossFileAst: OSSFileAst = parser.parse();


          const newRules = [];
          const v = new OfflineRulesVisitor(ossFileAst);

          v.ossRules.forEach((item) => {
            const rNew = JSON.stringify(item, (n, val) => {
              if (n === '_properties' && val) {
                return mapToObject(val);
              }
              return val;
            }).replace(/\"/g, '').replace(/\s/g, '');
            newRules.push(rNew);
          });

          for (let i = 0; i < extendedResult.length; i++) {
            const rule = extendedResult[i];
            if (!newRules.includes(rule)) {
              fail('Rule not found: ' + rule);
            }
          }

          for (let i = 0; i < newRules.length; i++) {
            const rule = newRules[i];
            if (!extendedResult.includes(rule)) {
              fail('Rule not found: ' + rule);
            }
          }

          expect(true).toBeTruthy();
        });


      it('should parse UI PersitenceRules OSS and match the version produced by java',
        () => {
          /* tslint:disable: no-trailing-whitespace */
          const ossFile: any = require(
            '!!raw-loader!../../../resources/compiler/PersistenceRules-ui.oss');

          const extendedResult = readCompiledFile(
            require('!!raw-loader!../../../resources/compiler/persistencerules-ui.ts')
          );

          lexer = new OSSLexer(ossFile.default.toString());
          const parser = new OSSParser(lexer);

          const ossFileAst: OSSFileAst = parser.parse();


          const newRules = [];
          const v = new OfflineRulesVisitor(ossFileAst);

          v.ossRules.forEach((item) => {
            const rNew = JSON.stringify(item, (n, val) => {
              if (n === '_properties' && val) {
                return mapToObject(val);
              }
              return val;
            }).replace(/\"/g, '')
              .replace(/\s/g, '')
              .replace(/;\\n/g, ',')
              .replace(/\\n/g, '');
            newRules.push(rNew);
          });

          for (let i = 0; i < extendedResult.length; i++) {
            const rule = extendedResult[i];
            if (!newRules.includes(rule)) {
              fail('Rule not found: ' + rule);
            }
          }

          for (let i = 0; i < newRules.length; i++) {
            const rule = newRules[i];
            if (!extendedResult.includes(rule)) {
              fail('Rule not found: ' + rule);
            }
          }

          expect(true).toBeTruthy();
        });


    });


    describe('expected speed of parsing of regular rule file.', () => {

      it('should parse at least 500 larger rules under 150ms ',
        () => {
          /* tslint:disable: no-trailing-whitespace */

          const start = Date.now();
          for (let i = 1; i < 10; i++) {
            const ossFile: any = require(
              '!!raw-loader!../../../resources/compiler/WidgetsRules-core.oss');

            lexer = new OSSLexer(ossFile.default.toString());
            const parser = new OSSParser(lexer);
            const ossFileAst: OSSFileAst = parser.parse();
          }


          const end = Date.now() - start;
          expect(end).toBeLessThanOrEqual(150);
        });


      it('should parse at least 10 larger rules under 50ms ',
        () => {
          /* tslint:disable: no-trailing-whitespace */
          const start = Date.now();
          for (let i = 1; i < 10; i++) {
            const ossFile: any = require(
              '!!raw-loader!../../../resources/compiler/WidgetsRules-core.oss');
            lexer = new OSSLexer(ossFile.default.toString());
            const parser = new OSSParser(lexer);
            const ossFileAst: OSSFileAst = parser.parse();
          }


          const end = Date.now() - start;
          expect(end).toBeLessThanOrEqual(50);
        });

    });

  });


function readCompiledFile(tsFile: any) {
  const content = tsFile.default.toString().replace(/(\r\n|\n|\r(  ))/gm, '').replace(/\t/g, '');

  const bRule = content.substring(content.indexOf('= {') + 1)
    .substring(0, content.lastIndexOf('};'));
  const bRuleJson: any[] = JSON.parse(bRule.substring(bRule
    .indexOf('['), bRule.lastIndexOf(']') + 1).replace(/\"/g, '\\"').replace(/\'/g, '"'));

  const bRulesList = [];

  for (let i = 0; i < bRuleJson.length; i++) {
    const s = JSON.stringify(bRuleJson[i]).replace(/\"/g, '')
      .replace(/\s/g, '');
    if (!bRulesList.includes(s)) {
      bRulesList.push(s);
    }
  }

  return bRulesList;
}


function mapToObject(m: Map<string, any>) {
  const obj = {};
  m.forEach((val, ke) => {
    if (val instanceof Map) {
      obj[ke] = mapToObject(val);
    } else {
      obj[ke] = val;
    }
  });
  return obj;
}


