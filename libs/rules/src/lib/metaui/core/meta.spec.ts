/**
 * @license
 * Copyright 2017 SAP Ariba
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
import {evalExpression} from './utils/lang';
import {TestBed} from '@angular/core/testing';
import {MetaUIRulesModule} from '../rules.module';
import {Rule, Selector} from './rule';
import {ContextFieldPath, Expr, isDynamicSettable} from './property-value';
import {ClassRulePriority, KeyClass, KeyField, META_RULES, MetaRules} from './meta-rules';
import {MatchResult} from './match';
import {Context} from './context';
import {MetaUITestRulesModule} from '../test.rules.module';


describe('Loading rules functionality', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MetaUITestRulesModule.forRoot({'env.test': true})
      ]
    });
  });

  it(' should load all the system rules in the rule engine based on WidgetsRules. ', () => {

      try {
        const metaUI: MetaRules = TestBed.inject(META_RULES);

        expect(metaUI).toBeDefined();
        expect(metaUI.rules.length).toEqual(212); // commented out toOneRelationShip

      } catch (e) {
        fail(e);

      }
    }
  );
});


describe('Rule matching functionality on preloaded ruleset', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MetaUIRulesModule.forRoot({'env.test': true})
      ]
    });

    const ossFile: any = require(
      '!!raw-loader!../../resources/compiler/metaspec/uilib.oss');


    const metaUI: MetaRules = TestBed.inject(META_RULES);
    metaUI.loadUILibSystemRuleFiles({}, ossFile.default, {});
  });

  it(' it must pick the best selector to Index from list of selectors ', () => {

      const metaUI: MetaRules = TestBed.inject(META_RULES);

      const classSel: Selector = new Selector('class', '*');
      const operSel: Selector = new Selector('operation', 'view');

      let bestMatch = metaUI.bestSelectorToIndex([classSel, operSel]);

      expect(bestMatch.key).toEqual('operation');

      const visibleSel: Selector = new Selector('visible', 'true');
      bestMatch = metaUI.bestSelectorToIndex([operSel, visibleSel]);
      expect(bestMatch.key).toEqual('visible');


      const visibleSel2: Selector = new Selector('visible', true);
      bestMatch = metaUI.bestSelectorToIndex([operSel, visibleSel2]);
      expect(bestMatch.key).toEqual('operation');

    }
  );


  it(' it should recognized as scope properties and scope property must be set to thru for ' +
    'field, action,' + ' action category, class, layout', () => {

      const metaUI: MetaRules = TestBed.inject(META_RULES);

      let keyData = metaUI.keyData('field');
      expect(keyData.isPropertyScope).toBeTruthy();

      keyData = metaUI.keyData('action');
      expect(keyData.isPropertyScope).toBeTruthy();

      keyData = metaUI.keyData('class');
      expect(keyData.isPropertyScope).toBeTruthy();

      keyData = metaUI.keyData('layout');
      expect(keyData.isPropertyScope).toBeTruthy();

      keyData = metaUI.keyData('actionCategory');
      expect(keyData.isPropertyScope).toBeTruthy();

    }
  );


  it(' it should not recognized as scope properties for anything but  field, action,' +
    ' action category, class, layout', () => {
      const metaUI: MetaRules = TestBed.inject(META_RULES);

      let keyData = metaUI.keyData('operation');
      expect(keyData.isPropertyScope).toBeFalsy();

      keyData = metaUI.keyData('trait');
      expect(keyData.isPropertyScope).toBeFalsy();
      //
      keyData = metaUI.keyData('object');
      expect(keyData.isPropertyScope).toBeFalsy();

    }
  );

  it(' It can match properties layout=Inspect, operation=edit, field=*, type=int and ' +
    'return MatchResult ', () => {

      const metaUI: MetaRules = TestBed.inject(META_RULES);


      let prevMatch: MatchResult = metaUI.match('layout', 'Inspect', null);
      prevMatch = metaUI.match('operation', 'edit', prevMatch);
      prevMatch = metaUI.match('field', '*', prevMatch);
      prevMatch = metaUI.match('type', 'Number', prevMatch);

      for (let i = 1; i < prevMatch.matches()[0]; i++) {
        const rule = metaUI.rules[prevMatch.matches()[i]].toString();

        // print(rule);
        expect(rule)
          .toMatch(
            /layout|Inspect|operation|edit|field|type|Number|InputFieldComponent/);
      }
    }
  );
  it(' It can match properties for string and Editing and expect InputFieldComponent in  the ' +
    'retrieved rule properties', () => {

      const metaUI: MetaRules = TestBed.inject(META_RULES);

      let prevMatch: MatchResult = metaUI.match('operation', 'edit', null);
      prevMatch = metaUI.match('field', '*', prevMatch);
      prevMatch = metaUI.match('type', 'String', prevMatch);


      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI.rules[prevMatch.matches()[i]].properties;

        if (properties.has('component')) {
          expect(properties.get('component')).toEqual('InputFieldComponent');
          found = true;
          break;
        }
      }

      if (!found) {
        fail();
      }
    }
  );

  it(' It can match properties for date and viewing and expect DateAndTimeComponent in of ' +
    'the retrieve rule properties ', () => {

      const metaUI: MetaRules = TestBed.inject(META_RULES);

      let prevMatch: MatchResult = metaUI.match('operation', 'view', null);
      prevMatch = metaUI.match('field', '*', prevMatch);
      prevMatch = metaUI.match('type', 'Date', prevMatch);


      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI.rules[prevMatch.matches()[i]].properties;

        if (properties.has('component')) {
          expect(properties.get('component')).toEqual('DateAndTimeComponent');
          found = true;
          break;
        }
      }

      if (!found) {
        fail();
      }
    }
  );


  it('It can match string with trait richtext expect RichTextArea in the retrieved rule ' +
    'properties', () => {

      const metaUI: MetaRules = TestBed.inject(META_RULES);

      let prevMatch: MatchResult = metaUI.match('operation', 'view', null);
      prevMatch = metaUI.match('field', '*', prevMatch);
      prevMatch = metaUI.match('type', 'String', prevMatch);
      prevMatch = metaUI.match('trait', 'richtext', prevMatch);


      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI.rules[prevMatch.matches()[i]].properties;

        if (properties.has('component')) {
          expect(properties.get('component')).toEqual('RichTextAreaComponent');
          found = true;
          break;
        }
      }

      if (!found) {
        fail();
      }
    }
  );

  it('It can match layout Inspect and retrieve StringComponent component if ~class', () => {

      const metaUI: MetaRules = TestBed.inject(META_RULES);

      let prevMatch: MatchResult = metaUI.match('class', '*', null);
      prevMatch = metaUI.match('layout', 'Inspect', prevMatch);

      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI.rules[prevMatch.matches()[i]].properties;

        if (properties.has('component')) {
          expect(properties.get('component')).toEqual('StringComponent');
          found = true;
          break;
        }
      }

      if (!found) {
        fail();
      }
    }
  );

  it('It can match class with trait  form and retrieve MetaForm', () => {
      const metaUI: MetaRules = TestBed.inject(META_RULES);

      let prevMatch: MatchResult = metaUI.match('class', '*', null);
      prevMatch = metaUI.match('trait', 'Form', prevMatch);


      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI.rules[prevMatch.matches()[i]].properties;

        if (properties.has('component')) {
          expect(properties.get('component')).toEqual('MetaFormComponent');
          found = true;
          break;
        }
      }

      if (!found) {
        fail();
      }

    }
  );

  it('It can match class with trait Stack and retrieve MetaElementList', () => {
      const metaUI: MetaRules = TestBed.inject(META_RULES);


      let prevMatch: MatchResult = metaUI.match('class', '*', null);
      prevMatch = metaUI.match('trait', 'Stack', prevMatch);


      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI.rules[prevMatch.matches()[i]].properties;

        if (properties.has('component')) {
          expect(properties.get('component')).toEqual('MetaElementListComponent');
          found = true;
          break;
        }
      }

      if (!found) {
        fail();
      }

    }
  );

  it('It can match trait with form  and field name and retrieve InputFieldComponent component ',
    () => {
      const metaUI: MetaRules = TestBed.inject(META_RULES);


      metaUI.keyData(KeyClass).setParent('MyClass', 'Object');

      metaUI.beginRuleSet('MyIntrospection');

      const selectorClass = new Selector(KeyClass, 'MyClass');
      const selectorField = new Selector(KeyField, 'name', true);

      const mp = new Map<string, any>();
      mp.set('type', 'String');
      mp.set('visible', true);
      mp.set('field', 'name');
      metaUI.addRule(
        new Rule([selectorClass, selectorField], mp, ClassRulePriority));
      metaUI.endRuleSet();


      let prevMatch: MatchResult = metaUI.match('class', '*', null);

      prevMatch = metaUI.match('trait', 'Form', prevMatch);
      prevMatch = metaUI.match('scopeKey', 'field', prevMatch);
      prevMatch = metaUI.match('field', 'name', prevMatch);
      prevMatch = metaUI.match('type', 'String', prevMatch);


      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI.rules[prevMatch.matches()[i]].properties;
        const selectors = metaUI.rules[prevMatch.matches()[i]].selectors;

        if (selectors[0].key === 'field' && properties.has('component')) {
          expect(properties.get('component')).toEqual('InputFieldComponent');
          found = true;
          break;
        }
      }

      if (!found) {
        fail();
      }
    }
  );


  it('It checks if observers were registered and called when we do match on class or field ',
    () => {
      const metaUI: MetaRules = TestBed.inject(META_RULES);


      const observers = metaUI.keyData(KeyClass).observers;
      const spy = spyOn(observers[0], 'notify');
      const spy2 = spyOn(observers[1], 'notify');


      metaUI.keyData(KeyClass).setParent('MyClass', 'Object');

      metaUI.beginRuleSet('MyIntrospection');

      const selectorClass = new Selector(KeyClass, 'MyClass');
      const selectorField = new Selector(KeyField, 'name', true);

      const mp = new Map<string, any>();
      mp.set('type', 'String');
      mp.set('visible', true);
      mp.set('field', 'name');
      metaUI.addRule(
        new Rule([selectorClass, selectorField], mp, ClassRulePriority));
      metaUI.endRuleSet();


      let prevMatch: MatchResult = metaUI.match('class', 'MyClass',
        null);

      prevMatch = metaUI.match('trait', 'Form', prevMatch);
      prevMatch = metaUI.match('scopeKey', 'field', prevMatch);
      prevMatch = metaUI.match('field', 'name', prevMatch);
      prevMatch = metaUI.match('type', 'String', prevMatch);


      expect(observers.length).toEqual(2);


      expect(observers[0].notify).toHaveBeenCalled();
      expect(observers[1].notify).toHaveBeenCalled();
    }
  );


});


describe('Expression eval of Matched properties how they can be resolved on the fly', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MetaUIRulesModule.forRoot({'env.test': true})
      ]
    });
  });


  it('It evaluates correct expression and return result of 1 + 2', () => {

      const result = evalExpression(' num1 + num2;', 'let  context1;', {num1: 1, num2: 2});
      expect(result).toEqual(3);
    }
  );


  it('It evaluates expression object.firstName.length > 4 on Context', () => {

      const metaUI: MetaRules = TestBed.inject(META_RULES);

      class MyContext extends Context {
        private _someObject: any;


        constructor() {
          super(metaUI);
        }

        get values(): Map<string, any> {
          return new Map<string, any>();
        }

        set someObject(value: any) {
          this._someObject = value;
        }


        get object(): any {
          return this._someObject;
        }
      }


      class User {
        firstName: string;


        constructor(firstName: string) {
          this.firstName = firstName;
        }
      }

      const context = new MyContext();
      context.someObject = new User('Frank');


      const ex = new Expr('object.firstName.length > 4', metaUI);
      const isTruthy = ex.evaluate(context);

      expect(isTruthy).toBeTruthy();
    }
  );


  it('It evaluates expression object.firstName === Frank on Context', () => {

      const metaUI: MetaRules = TestBed.inject(META_RULES);

      class MyContext extends Context {
        private _someObject: any;


        get values(): Map<string, any> {
          return new Map<string, any>();
        }

        constructor() {
          super(metaUI);
        }

        set someObject(value: any) {
          this._someObject = value;
        }


        get object(): any {
          return this._someObject;
        }
      }


      class User {
        firstName: string;


        constructor(firstName: string) {
          this.firstName = firstName;
        }
      }

      const context = new MyContext();
      context.someObject = new User('Frank');


      let ex = new Expr('object.firstName === "Frank" ', metaUI);
      let isTruthy = ex.evaluate(context);
      expect(isTruthy).toBeTruthy();

      ex = new Expr('object.firstName === "Peter" ', metaUI);
      isTruthy = ex.evaluate(context);
      expect(isTruthy).toBeFalsy();
    }
  );


  it('It evaluates context field path  on Context to get value from a object', () => {

      const metaUI: MetaRules = TestBed.inject(META_RULES);

      class MyContext extends Context {
        private _someObject: any;


        constructor() {
          super(metaUI);
        }

        get values(): Map<string, any> {
          return new Map<string, any>();
        }

        set someObject(value: any) {
          this._someObject = value;
        }


        get object(): any {
          return this._someObject;
        }
      }


      class User {
        firstName: string;
        lastName: string;


        constructor(firstName: string, lastName: string) {
          this.firstName = firstName;
          this.lastName = lastName;
        }
      }

      const context = new MyContext();
      context.someObject = new User('Frank', 'Kolar');


      const cnxFp = new ContextFieldPath('object.firstName');
      const any = cnxFp.evaluate(context);
      expect(any).toEqual('Frank');

    }
  );

  it('It evaluates context field path  on Context to set a value to a object',
    () => {

      const metaUI: MetaRules = TestBed.inject(META_RULES);

      class MyContext extends Context {
        private _someObject: any;


        constructor() {
          super(metaUI);
        }

        set someObject(value: any) {
          this._someObject = value;
        }

        get values(): Map<string, any> {
          return new Map<string, any>();
        }


        get object(): any {
          return this._someObject;
        }
      }


      class User {
        firstName: string;
        lastName: string;


        constructor(firstName: string, lastName: string) {
          this.firstName = firstName;
          this.lastName = lastName;
        }
      }

      const context = new MyContext();
      context.someObject = new User('Frank', 'Kolar');


      const cnxFp = new ContextFieldPath('object.firstName');
      let someval = cnxFp.evaluate(context);
      expect(someval).toEqual('Frank');


      if (isDynamicSettable(cnxFp)) {
        cnxFp.evaluateSet(context, 'John');
      }

      someval = cnxFp.evaluate(context);
      expect(someval).toEqual('John');

    }
  );
});

