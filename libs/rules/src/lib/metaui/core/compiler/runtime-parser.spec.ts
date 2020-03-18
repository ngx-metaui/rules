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
import {TestBed} from '@angular/core/testing';
import {MetaUITestRulesModule} from '../../test.rules.module';
import {META_RULES, MetaRules} from '../meta-rules';
import {RuntimeParser} from './runtime-parser.visitor';
import {Selector} from '../rule';


describe('Parsing rules on the fly and registering them with the rule engine',
  () => {

    beforeEach((done) => {

      TestBed.configureTestingModule({
        imports: [
          MetaUITestRulesModule.forRoot({'env.test': true})
        ]
      });
      window.setTimeout(function () {
        done();
      }, 0);
    });


    it('should parse core WidgetRules OSS and match the version produced by java',
      () => {
        /* tslint:disable: no-trailing-whitespace */

        const ossFile: any = require(
          '!!raw-loader!../../../resources/compiler/WidgetsRules-ui.oss');

        const metaUI: MetaRules = TestBed.inject(META_RULES);
        metaUI.loadUILibSystemRuleFiles({}, ossFile.default, {});


        expect(true).toBeTruthy();
      });


    it('should parse core WidgetRules OSS and match the version produced by java',
      () => {
        /* tslint:disable: no-trailing-whitespace */

        const ossFile: any = require(
          '!!raw-loader!../../../resources/compiler/WidgetsRules-ui-m.oss');

        try {
          const metaUI: MetaRules = TestBed.inject(META_RULES);
          metaUI.loadUILibSystemRuleFiles({}, ossFile.default, {});
        } catch (e) {
          fail(e);
        }
        expect(true).toBeTruthy();
      });


    it('It should parse rule body',
      () => {
        /* tslint:disable: no-trailing-whitespace */

        try {
          const metaUI: MetaRules = TestBed.inject(META_RULES);

          metaUI.beginRuleSet('User');
          const parser = new RuntimeParser('label:Hahaha;', metaUI);

          const sels: Array<Selector> = [new Selector('class', 'User'),
            new Selector('field', 'firstName', true)];

          parser.registerRuleBody(sels);
          metaUI.endRuleSet();

          const rule = metaUI.rules[metaUI.ruleCount - 1];

          expect(rule._selectors.length).toBe(3);
          expect(rule._selectors[1].value).toBe('firstName');
          expect(rule.properties.has('label')).toBeTruthy();
          expect(rule.properties.get('label')).toBe('Hahaha');

        } catch (e) {
          fail(e);
        }
        expect(true).toBeTruthy();
      });

  });
