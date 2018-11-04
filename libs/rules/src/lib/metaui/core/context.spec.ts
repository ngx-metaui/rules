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
import {Component, DebugElement, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Expr, NestedMap, ObjectMeta, RuleLoaderService, UIContext, UIMeta} from './index';
import {ContextFieldPath} from './property-value';
import {Match} from './match';
import {ComponentRegistry} from '../../components/core/component-registry.service';
import {Environment} from '../../core/config/environment';
import {Entity} from '../../core/domain/domain-model';


describe('Meta Context behaivor ', () => {

  describe('how Context Nested map work ', () => {
    beforeEach(() => {
      let metaUI = UIMeta.getInstance();
      metaUI._rules.forEach((v) => {
        v.disable();
      });

      metaUI._testRules.clear();
      UIMeta['_instance'] = undefined;

      metaUI = UIMeta.getInstance();

    });


    it(' it should instantiate and retrieve entries with out any runtime error and in the ' +
      'correct order ', () => {


        const xx = new Map<string, any>();
        xx.set('a', ' this is value a');
        xx.set('b', ' this is value b');
        xx.set('c', ' this is value c');


        const nestedMap = new NestedMap<string, any>(xx);

        const expectedOrder = ['a', 'b', 'c'];
        nestedMap.forEach((v, k) => {
          const key = expectedOrder.shift();
          expect(k).toEqual(key);

        });

      }
    );


    it(' it should instantiate and retrieve nested and parent entries in specified order ',
      () => {

        const xx = new Map<string, any>();
        xx.set('a', ' this is value a');
        xx.set('b', ' this is value b');
        xx.set('c', ' this is value c');


        const child = new Map<string, any>();
        child.set('a1', ' this is value a');
        child.set('b1', ' this is value b');
        child.set('c1', ' this is value c');


        const nestedMap = new NestedMap<string, any>(xx, child);

        const expectedOrder = ['a1', 'b1', 'c1', 'a', 'b', 'c'];
        nestedMap.forEach((v, k) => {
          const key = expectedOrder.shift();
          expect(k).toEqual(key);

        });


      }
    );

  });

  describe('Context Layout representing context assignments  ', () => {

    beforeEach(() => {
      const metaUI = UIMeta.getInstance();
      metaUI._rules.forEach((v) => {
        v.disable();
      });
      metaUI._testRules.clear();
      UIMeta['_instance'] = undefined;


    });

    it(' It should retrieve Default Empty context with preset letiables ', () => {
        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();

        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        const context = metaUI.newContext();

        expect(context.meta).toBeDefined();

        expect(context.values).toBeDefined();
        expect(context.values.size).toEqual(0);

        expect(context._entries).toBeDefined();
        expect(context._entries.length).toEqual(0);

        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(0);

        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(0);

        expect(context._accessor).toBeDefined();

        expect(context.recPool).toBeDefined();
        expect(context.recPool.length).toEqual(0);

        expect(context.currentActivation).toBeDefined();
        expect(context.currentActivation._recs.length).toEqual(0);


      }
    );


    it(' It should keep consistent push/pop frames so when we push for 1st time we expect 1 ' +
      'record size of 1 and ' + 'after we pop zero ', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        const context = metaUI.newContext();

        context.push();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(1);
        expect(context.frameStarts[0]).toEqual(0);


        context.pop();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(0);
      }
    );


    it(' It should keep consistent push/pop frames so when we push for N-times time we ' +
      'expect correct framestarts records size as well as internal numbers ', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        const context = metaUI.newContext();

        context.push();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(1);
        expect(context.frameStarts[0]).toEqual(0);

        context.set('aaa', 'valueaaa ');
        context.set('bbbb', 'valuebbb ');
        context.set('cccc', 'valueccc ');

        context.push();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(2);
        expect(context.frameStarts[1]).toEqual(3);

        context.set('dddd', 'valueddd ');
        context.set('eeee', 'valueee');

        context.push();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(3);
        expect(context.frameStarts[2]).toEqual(5);

        context.set('zzz', 'valuezzz');


        context.pop();

        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(2);
        expect(context.frameStarts[1]).toEqual(3);


        context.pop();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(1);
        expect(context.frameStarts[0]).toEqual(0);

        context.pop();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(0);
      }
    );


    it(' It should retrive default exaclty for basic when no user rules are loaded  and no ' +
      'class is specified after we push layout=Inspect', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        const context = metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');


        const propertyMap = context.allProperties();


        expect(propertyMap.size).toEqual(5);
        expect(propertyMap.has('label')).toBeTruthy();
        expect(propertyMap.has('zones')).toBeTruthy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.has('component')).toBeTruthy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.get('component')).toEqual('StringComponent');

        context.pop();
      }
    );

    it(' It should retrieve  property map when user rules are not loaded, after we push ' +
      'layout=Inspect and operation. It must retrive editing = true mode', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        const context = metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'edit');


        const propertyMap = context.allProperties();


        expect(propertyMap.size).toEqual(6);
        expect(propertyMap.has('label')).toBeTruthy();
        expect(propertyMap.has('zones')).toBeTruthy();
        expect(propertyMap.has('editing')).toBeTruthy();
        expect(propertyMap.get('editing')).toEqual(true);
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.has('component')).toBeTruthy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.get('component')).toEqual('StringComponent');

        context.pop();
      }
    );


    it(' It should retrieve  property, after we push layout=Inspect and operation=view. ' +
      'we expect editing false in properties', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        const context = metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'view');

        const propertyMap = context.allProperties();

        expect(propertyMap.size).toEqual(6);
        expect(propertyMap.has('label')).toBeTruthy();
        expect(propertyMap.has('zones')).toBeTruthy();
        expect(propertyMap.has('editing')).toBeTruthy();
        expect(propertyMap.get('editing')).toBeFalsy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.has('component')).toBeTruthy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.get('component')).toEqual('StringComponent');

        context.pop();
      }
    );

  });


  describe('basic context functinality regarding consistency of pushed stack and simple layout' +
    ' evaluation', () => {


    beforeEach(() => {
      const metaUI = UIMeta.getInstance();
      metaUI._rules.forEach((v) => {
        v.disable();
      });
      metaUI._testRules.clear();
      UIMeta['_instance'] = undefined;


    });

    it(' It should retrieve Default Empty context with preset letiables ', () => {
        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        const context = metaUI.newContext();

        expect(context.meta).toBeDefined();

        expect(context.values).toBeDefined();
        expect(context.values.size).toEqual(0);

        expect(context._entries).toBeDefined();
        expect(context._entries.length).toEqual(0);

        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(0);

        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(0);

        expect(context._accessor).toBeDefined();

        expect(context.recPool).toBeDefined();
        expect(context.recPool.length).toEqual(0);

        expect(context.currentActivation).toBeDefined();
        expect(context.currentActivation._recs.length).toEqual(0);


      }
    );


    it(' It should keep consistent push/pop frames so when we push for 1st time we expect 1 ' +
      'record size of 1 and after we pop zero ', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        const context = metaUI.newContext();

        context.push();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(1);
        expect(context.frameStarts[0]).toEqual(0);


        context.pop();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(0);
      }
    );


    it(' It should keep consistent push/pop frames so when we push for N-times time we ' +
      'expect correct framestarts records size as well as internal numbers ', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        const context = metaUI.newContext();

        context.push();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(1);
        expect(context.frameStarts[0]).toEqual(0);

        context.set('aaa', 'valueaaa ');
        context.set('bbbb', 'valuebbb ');
        context.set('cccc', 'valueccc ');

        context.push();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(2);
        expect(context.frameStarts[1]).toEqual(3);

        context.set('dddd', 'valueddd ');
        context.set('eeee', 'valueee');

        context.push();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(3);
        expect(context.frameStarts[2]).toEqual(5);

        context.set('zzz', 'valuezzz');


        context.pop();

        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(2);
        expect(context.frameStarts[1]).toEqual(3);


        context.pop();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(1);
        expect(context.frameStarts[0]).toEqual(0);

        context.pop();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(0);
      }
    );


    it(' It should retrive default exaclty for basic when no user rules are loaded  and no ' +
      'class is specified after we push layout=Inspect', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        const context = metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');


        const propertyMap = context.allProperties();

        expect(propertyMap.size).toEqual(5);
        expect(propertyMap.has('label')).toBeTruthy();
        expect(propertyMap.has('zones')).toBeTruthy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.has('component')).toBeTruthy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.get('component')).toEqual('StringComponent');

        context.pop();
      }
    );

    it(' It should retrieve  property map when user rules are not loaded, after we push ' +
      'layout=Inspect and operation. It must retrive editing = true mode', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        const context = metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'edit');


        const propertyMap = context.allProperties();


        expect(propertyMap.size).toEqual(6);
        expect(propertyMap.has('label')).toBeTruthy();
        expect(propertyMap.has('zones')).toBeTruthy();
        expect(propertyMap.has('editing')).toBeTruthy();
        expect(propertyMap.get('editing')).toEqual(true);
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.has('component')).toBeTruthy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.get('component')).toEqual('StringComponent');

        context.pop();
      }
    );


    it(' It should retrieve  property map after we push layout=Inspect ' +
      'and operation=view. we expect editing false in properties', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        const context = metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'view');

        const propertyMap = context.allProperties();

        expect(propertyMap.size).toEqual(6);
        expect(propertyMap.has('label')).toBeTruthy();
        expect(propertyMap.has('zones')).toBeTruthy();
        expect(propertyMap.has('editing')).toBeTruthy();
        expect(propertyMap.get('editing')).toBeFalsy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.has('component')).toBeTruthy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.get('component')).toEqual('StringComponent');

        context.pop();
      }
    );


  });


  describe('push/pop Meta Context behavior when Object is present and set', () => {


    beforeEach(() => {
      const metaUI = UIMeta.getInstance();
      metaUI._rules.forEach((v) => {
        v.disable();
      });
      metaUI._testRules.clear();
      UIMeta['_instance'] = undefined;

    });


    it('It should retrieve correct Form Component  a MetaForm with fiveZones trait to render ' +
      'all the fields ', () => {
        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        const props = context.allProperties();
        context.pop();


        expect(props.has('label')).toBeTruthy();
        expect(props.has('objectTitle')).toBeTruthy();
        expect(props.get('class_trait')).toEqual('fiveZones');
        expect(props.get('component')).toEqual('MetaFormComponent');
      }
    );

    it(' It should switch into different layout component (MetaElementList) in case we push ' +
      'Stack trait ', () => {
        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('trait', 'Stack');
        context.set('operation', 'edit');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        const props = context.allProperties();

        // props.forEach((v , k) =>
        // {
        //     print(k + ' = = ' + v);
        // });
        //

        context.pop();

        expect(props.has('label')).toBeTruthy();
        expect(props.has('objectTitle')).toBeTruthy();
        expect(props.get('class_trait')).toEqual('fiveZones');
        expect(props.get('component')).toEqual('MetaElementListComponent');
      }
    );

    it('It should change layout to tableZone trait in case I push operation list so that it ' +
      'will have  6 zone layout ', () => {
        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'list');
        context.set('object', new MyUserTestClass('Frank', 'Kolar', 16,
          'From Czech Republic'));
        const props = context.allProperties();

        // props.forEach((v , k) =>
        // {
        //     print(k + ' = ' + v);
        // });

        context.pop();

        expect(props.has('label')).toBeTruthy();
        expect(props.has('objectTitle')).toBeTruthy();
        expect(props.get('class_trait')).toEqual('tableZones');
        expect(props.get('component')).toEqual('MetaFormComponent');
      }
    );


    it('field: It should retrieve correct component type => TextField for firstName when in ' +
      'editing mode', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        context.set('field', 'firstName');

        const props = context.allProperties();

        const componentName = context.propertyForKey(UIMeta.KeyComponentName);


        expect(componentName).toEqual('InputFieldComponent');
        expect(context.propertyForKey('layout_trait')).toEqual('Form');
        expect(context.propertyForKey(ObjectMeta.KeyEditable)).toEqual(true);
        context.pop();
      }
    );


    it('field: It should have correct class trait, editability to false as well as change ' +
      'component to String if we change operation from Edit to list ', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'list');
        context.set('object', new MyUserTestClass('Frank', 'Kolar', 16,
          'From Czech Republic'));
        context.setScopeKey('class');


        context.set('field', 'firstName');

        const props = context.allProperties();

        const componentName = context.propertyForKey(UIMeta.KeyComponentName);

        // print(componentName);

        expect(componentName).toEqual('StringComponent');
        expect(context.propertyForKey('layout_trait')).toEqual('Form');
        expect(context.propertyForKey(ObjectMeta.KeyEditable)).toEqual(false);
        context.pop();
      }
    );


    it('It should change component name from TextField to StringComponent when in View mode',
      () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        context.set('field', 'firstName');

        const props = context.allProperties();

        const componentName = context.propertyForKey(UIMeta.KeyComponentName);

        // print(componentName);

        expect(componentName).toEqual('StringComponent');
        expect(context.propertyForKey('layout_trait')).toEqual('Form');
        expect(context.propertyForKey(ObjectMeta.KeyEditable)).toEqual(false);
        context.pop();
      }
    );


    it('It should retrieve a label My First Name specified in the rules', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object', new MyUserTestClass('Frank', 'Kolar', 16,
          'From Czech Republic'));
        context.setScopeKey('class');


        context.set('field', 'firstName');

        const props = context.allProperties();

        const label = context.propertyForKey(UIMeta.KeyLabel);

        expect(label).toEqual('My First Name');
        context.pop();
      }
    );

    it(' firstName should be required as specified in the rule', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'view');

        context.set('object', new MyUserTestClass('Frank', 'Kolar', 16,
          'From Czech Republicc'));
        context.setScopeKey('class');


        context.set('field', 'firstName');

        const props = context.allProperties();

        //
        // props.forEach((v , k) =>
        // {
        //     print(k + ' = ' + v);
        // });
        //
        expect(context.propertyForKey('field_trait')).toBeTruthy();
        context.pop();
      }
    );


    it(' it should layout fields in their rank order so that firstName => lastName ' +
      '=> age => bio ', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        context.push();
        context.set('field', 'firstName');
        expect(context.propertyForKey(UIMeta.KeyAfter)).toEqual(UIMeta.ZoneLeft);
        context.pop();

        context.push();
        context.set('field', 'lastName');
        expect(context.propertyForKey(UIMeta.KeyAfter)).toEqual('firstName');
        context.pop();

        context.push();
        context.set('field', 'age');
        expect(context.propertyForKey(UIMeta.KeyAfter)).toEqual('lastName');
        context.pop();

        context.push();
        context.set('field', 'bio');
        expect(context.propertyForKey(UIMeta.KeyAfter)).toEqual('age');
        context.pop();


        context.pop();
      }
    );


    it('it should retrive correct component for field Age whcih is a number and it will be ' +
      'rendered as a numer', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        context.push();
        context.set('field', 'age');

        expect(context.propertyForKey(UIMeta.KeyComponentName))
          .toEqual('InputFieldComponent');

        const type = context.propertyForKey(UIMeta.KeyType);
        expect(type).toEqual('Number');


        context.pop();
        context.pop();
      }
    );


    it('it should render field age which is a number in view only mode as a StringComponent',
      () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        context.push();
        context.set('field', 'age');
        expect(context.propertyForKey(UIMeta.KeyComponentName)).toEqual('StringComponent');
        context.pop();

        context.pop();
      }
    );


    it('it should render a label for field age as a My age', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object', new MyUserTestClass('Frank', 'Kolar', 16,
          'From Czech Republic'));
        context.setScopeKey('class');


        context.push();
        context.set('field', 'age');
        expect(context.propertyForKey(UIMeta.KeyLabel)).toEqual('My Age');
        context.pop();

        context.pop();
      }
    );


    it('age field should have a validity condition ', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object', new MyUserTestClass('Frank', 'Kolar', 16,
          'From Czech Republic'));
        context.setScopeKey('class');


        context.push();
        context.set('field', 'age');

        // I do not want to resolve it right away, therefore using directly propertyMap
        const validity = context.allProperties().get(UIMeta.KeyValid);
        expect(validity instanceof Expr).toBeTruthy();
        context.pop();

        context.pop();
      }
    );


    it('age bio should have a visibility condition ', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object', new MyUserTestClass('Frank', 'Kolar', 16,
          'From Czech Republic'));
        context.setScopeKey('class');


        context.push();
        context.set('field', 'bio');

        // visibilty is deffered value so we need to access directly the expression
        const visibility = context.allProperties().get(UIMeta.KeyVisible);
        // print('XXXXX:' + visibility);
        expect(visibility._override instanceof Expr).toBeTruthy();
        context.pop();

        context.pop();
      }
    );


    // Safari issue
    it('it should render correct value when switching operation from edit to view', () => {
        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const ob = new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic');
        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object', ob);
        context.setScopeKey('class');

        let fields = context.propertyForKey('fieldsByZone');
        // console.log(' fields -----')
        // fields.forEach((v, k) => {
        //     console.log(k + ' = ' + v);
        //
        // });

        // context.pop();

        expect(fields.has('zLeft')).toBeTruthy();
        expect(fields.get('zLeft').length).toEqual(4);


        const context2 = metaUI.newContext();
        context2.push();

        context2.set('layout', 'Inspect');
        context2.set('operation', 'view');
        context2.set('object', ob);
        context2.setScopeKey('class');

        fields = context2.propertyForKey('fieldsByZone');
        // console.log(' fields -----')
        // fields.forEach((v, k) => {
        //     console.log(k + ' = ' + v);
        //
        // });

        // context2.pop();
        expect(fields.has('zLeft')).toBeTruthy();
        expect(fields.get('zLeft').length).toEqual(4);

      }
    );
  });


  // @formatter:on
  describe(
    'layout based behavior with neested selectors such as operation=create, view and check ' +
    'how the ' +
    'structure and content can be changed so that we can e.g. hide show certain fields per ' +
    'operation or overide ' +
    'existing properties for for different situations.  ', () => {


      beforeEach(() => {
        const metaUI = UIMeta.getInstance();
        metaUI._rules.forEach((v) => {
          v.disable();
        });
        metaUI._testRules.clear();
        UIMeta['_instance'] = undefined;

      });

      it('it should change the label of the age field when switching from editable mode to ' +
        'ready only mode', () => {

          const metaUI = UIMeta.getInstance();
          metaUI.registerLoader(new RuleLoaderService());
          metaUI.loadDefaultRuleFiles();
          const env: Environment = new Environment();
          metaUI.componentRegistry = new ComponentRegistry(env);

          metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClas2sRule);
          const context = metaUI.newContext();


          context.push();
          context.set('layout', 'Inspect');
          context.set('operation', 'edit');
          context.set('object',
            new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
          context.setScopeKey('class');


          context.push();
          context.set('field', 'age');
          expect(context.propertyForKey(UIMeta.KeyLabel)).toEqual('My Age');

          context.push();
          context.set('operation', 'view');
          expect(context.propertyForKey(UIMeta.KeyLabel)).toEqual('Age Label For View');
          context.pop();

          context.pop();


          context.pop();
        }
      );


      it('it should change the label of the firstName field when switching from editable ' +
        'mode to create  mode', () => {

          const metaUI = UIMeta.getInstance();
          metaUI.registerLoader(new RuleLoaderService());
          metaUI.loadDefaultRuleFiles();
          const env: Environment = new Environment();
          metaUI.componentRegistry = new ComponentRegistry(env);

          metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClas2sRule);
          const context = metaUI.newContext();


          context.push();
          context.set('layout', 'Inspect');
          context.set('operation', 'edit');
          context.set('object',
            new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
          context.setScopeKey('class');


          context.push();
          context.set('field', 'firstName');
          expect(context.propertyForKey(UIMeta.KeyLabel)).toEqual('My First Name');

          context.push();
          context.set('operation', 'create');
          expect(context.propertyForKey(UIMeta.KeyLabel))
            .toEqual('Enter your first Name');
          context.pop();

          context.pop();
          context.pop();
        }
      );

      /**
       * class=UserProfile {
                    field=userId {
                        label:'User Id';
                    }
                    field=firstName#required {
                        label:'You First Name';
                    }
                    field=lastName#required {
                        label:'You Last Name';
                    }
                    field=age {
                        label:'Age';
                    }
                    field=note {
                        label:'Info About User';
                    }
                    @field=fullName {
                        trait:derived;
                        label:'Full Name';
                        type:String;
                        value: ${object.firstName + ' ' + object.lastName };
                    }
                    @field=extraInfo {
                        trait:derived;
                        label:'Warning';
                        type:String;
                        value: 'This user is too young !!';
                        visible:${ object.age < 18}
                    }
                    operation=edit {
                        field {
                            after:zNone;
                        }
                        field=(firstName, lastName, age, note, fullName) {
                            after:zLeft;
                        }
                    }
                    operation=view {
                        field {
                            after:zNone
                        }
                        field=(userId, firstName, lastName, age, note, fullName, extraInfo) {
                            after:zLeft
                        }
                   }
            }
       class=UserProfile role=admin {
                operation=(edit, view) {
                        field {
                            after:zNone;
                        }
                        field=(userId, firstName, lastName, age, note, fullName, extraInfo,
                        password, locale,
                        lastAccessTime) {
                            after:zLeft;
                        }
                    }
            }
       */
      it(' it should resolve for edit operation 5 fields in zNone and 5 fields in zLeft so ' +
        'that it matches above ' +
        'rule, but once we push it role=admin we should see all the fields', () => {

          const metaUI = UIMeta.getInstance();
          metaUI.registerLoader(new RuleLoaderService());
          metaUI.loadDefaultRuleFiles();
          const env: Environment = new Environment();
          metaUI.componentRegistry = new ComponentRegistry(env);
          metaUI.addTestUserRule('UserProfileTeRule', UserProfileTestRule);

          let context = metaUI.newContext();


          context.push();
          context.set('layout', 'Inspect');
          context.set('operation', 'edit');
          context.set('object',
            new UserProfileTe('U123', 'Frank', 'Kolar', 16,
              'From Czech Republic', 'pasw', 'asdf', '11'));
          context.setScopeKey('class');

          let mapp = context.propertyForKey(UIMeta.PropFieldsByZone);

          expect(mapp.size).toEqual(2);

          let zLeft = mapp.get('zLeft');
          let zNone = mapp.get('zNone');

          expect(zLeft.length).toEqual(5);
          expect(zNone.length).toEqual(5);

          context.pop();

          context = metaUI.newContext();

          context.push();
          context.set('layout', 'Inspect');
          context.set('role', 'admin');
          context.set('operation', 'edit');
          context.set('object',
            new UserProfileTe('U123', 'Frank', 'Kolar', 16, 'From Czech Republic',
              'pasw', 'asdf', '11'));
          context.setScopeKey('class');

          mapp = context.propertyForKey(UIMeta.PropFieldsByZone);

          expect(mapp.size).toEqual(1);

          zLeft = mapp.get('zLeft');
          zNone = mapp.get('zNone');

          expect(zLeft.length).toEqual(10);
          expect(zNone).not.toBeDefined();
          context.pop();


          context = metaUI.newContext();
          context.push();
          context.set('role', 'admin');
          context.set('layout', 'Inspect');
          context.set('operation', 'edit');
          context.set('object',
            new UserProfileTe('U123', 'Frank', 'Kolar', 16, 'From Czech Republic',
              'pasw', 'asdf', '11'));
          context.setScopeKey('class');

          mapp = context.propertyForKey(UIMeta.PropFieldsByZone);

          expect(mapp.size).toEqual(1);

          zLeft = mapp.get('zLeft');
          zNone = mapp.get('zNone');

          expect(zLeft.length).toEqual(10);
          expect(zNone).not.toBeDefined();

          context.pop();

          context = metaUI.newContext();
          context.push();
          context.set('layout', 'Inspect');
          context.set('operation', 'edit');
          context.set('object',
            new UserProfileTe('U123', 'Frank', 'Kolar', 16, 'From Czech Republic',
              'pasw', 'asdf', '11'));
          context.setScopeKey('class');
          context.set('role', 'admin');

          mapp = context.propertyForKey(UIMeta.PropFieldsByZone);

          expect(mapp.size).toEqual(1);

          zLeft = mapp.get('zLeft');
          zNone = mapp.get('zNone');

          expect(zLeft.length).toEqual(10);
          expect(zNone).not.toBeDefined();

          context.pop();


          context = metaUI.newContext();
          context.push();
          context.set('layout', 'Inspect');
          context.set('operation', 'view');
          context.set('object',
            new UserProfileTe('U123', 'Frank', 'Kolar', 16, 'From Czech Republic',
              'pasw', 'asdf', '11'));
          context.setScopeKey('class');
          context.set('role', 'admin');

          mapp = context.propertyForKey(UIMeta.PropFieldsByZone);

          expect(mapp.size).toEqual(1);

          zLeft = mapp.get('zLeft');
          zNone = mapp.get('zNone');

          expect(zLeft.length).toEqual(10);
          expect(zNone).not.toBeDefined();

          context.pop();

        }
      );


      /**
       class=UserProfile role=admin {
                operation=(edit, view) {
                        field {
                            after:zNone;
                        }
                        field=(userId, firstName, lastName, age, note, fullName, extraInfo,
                        password, locale,
                        lastAccessTime) {
                            after:zLeft;
                        }
                    }
            }
       */
      it('it should not match top level selectors extending a class=xxx for class=xxx ' +
        'role=admin no earlier ' +
        'then after settings a objects', () => {

          const metaUI = UIMeta.getInstance();
          metaUI.registerLoader(new RuleLoaderService());
          metaUI.loadDefaultRuleFiles();
          const env: Environment = new Environment();
          metaUI.componentRegistry = new ComponentRegistry(env);
          metaUI.addTestUserRule('UserProfileTeRule', UserProfileTestRule);

          const context = metaUI.newContext();


          context.push();


          context.set('layout', 'Inspect');
          context.set('operation', 'edit');
          context.set('role', 'admin');
          context.set('object',
            new UserProfileTe('U123', 'Frank', 'Kolar', 16, 'From Czech Republic',
              'pasw', 'asdf', '11'));
          context.setScopeKey('class');


          const mapp = context.propertyForKey(UIMeta.PropFieldsByZone);

          expect(mapp.size).toEqual(2);

          const zLeft = mapp.get('zLeft');
          const zNone = mapp.get('zNone');

          expect(zLeft.length).toEqual(5);
          expect(zNone.length).toEqual(5);

          context.pop();

        }
      );


      /**
       class=UserProfile role=admin {
                operation=(edit, view) {
                        field {
                            after:zNone;
                        }
                        field=(userId, firstName, lastName, age, note, fullName, extraInfo,
                         password,
                        locale, lastAccessTime) {
                            after:zLeft;
                        }
                    }
            }
       */
      it('it should match top level selectors extending a class=xxx for class=xxx ' +
        'role=admin ' + 'no earlier then after settings a objects', () => {

          const metaUI = UIMeta.getInstance();
          metaUI.registerLoader(new RuleLoaderService());
          metaUI.loadDefaultRuleFiles();
          const env: Environment = new Environment();
          metaUI.componentRegistry = new ComponentRegistry(env);
          metaUI.addTestUserRule('UserProfileTeRule', UserProfileTestRule);

          const context = metaUI.newContext();


          context.push();


          context.set('layout', 'Inspect');
          context.set('operation', 'edit');
          context.set('object',
            new UserProfileTe('U123', 'Frank', 'Kolar', 16, 'From Czech Republic',
              'pasw', 'asdf', '11'));
          context.set('role', 'admin');
          context.setScopeKey('class');


          const mapp = context.propertyForKey(UIMeta.PropFieldsByZone);

          expect(mapp.size).toEqual(1);

          const zLeft = mapp.get('zLeft');
          const zNone = mapp.get('zNone');

          expect(zLeft.length).toEqual(10);
          expect(zLeft.length).toEqual(10);
          expect(zNone).not.toBeDefined();

          context.pop();


        }
      );


    });


  describe('basic expression resolution and the way how we can handle dynamic fields which are ' +
    'resolve just before we render the field. as well as how we can distribute fields ' +
    'into different zones', () => {


    beforeEach(() => {
      const metaUI = UIMeta.getInstance();
      metaUI._rules.forEach((v) => {
        v.disable();
      });
      metaUI._testRules.clear();
      UIMeta['_instance'] = undefined;

    });

    it('It should resolve dynamic validity condition ${ value > 19}  so that it can give ' +
      'info back if the field is valid', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context: UIContext = <UIContext> metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');

        context.push();
        context.set('field', 'age');
        expect(context.propertyForKey(UIMeta.KeyValid)).toBeFalsy();
        context.pop();

        context.push();
        context.object.age = 20;

        context.set('field', 'age');
        expect(context.propertyForKey(UIMeta.KeyValid)).toBeTruthy();
        context.pop();


        context.pop();
      }
    );


    it('It should resolve visiblity condition that depends on the value of other fields so ' +
      'that it check the field AGE ${object.age > 18}', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context: UIContext = <UIContext> metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');

        context.push();
        context.set('field', 'bio');
        expect(context.propertyForKey(UIMeta.KeyVisible)).toBeFalsy();
        context.pop();

        context.push();
        context.object.age = 20;

        context.set('field', 'bio');
        expect(context.propertyForKey(UIMeta.KeyVisible)).toBeTruthy();
        context.pop();


        context.pop();
      }
    );


    it(' it should be able to translate a className to the page title so it resolve our ' +
      'page title ', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context: UIContext = <UIContext> metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');

        const title = context.propertyForKey('objectTitle');
        expect(title).toEqual('My User Test Class');

        context.pop();
      }
    );


    /**
     *   operation=view {
     *          @field=bioView {
     *              type=String;
     *              visible: ${ object.bio.length > 15 };
     *              value: ${object.bio.substring(0, 10) + '...'};
     *              after:age;
     *          }
     *    }
     */
    it('It should resolve a context field paths that is attached to custom derived field ' +
      'concatenates result form 2 other fields. value:' +
      ' ${object.bio.substring(0, 10) + ... };', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClas2sRule);
        const context = metaUI.newContext();


        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'Country: From Czech Republic, ' +
            'City:Prague'));
        context.setScopeKey('class');


        context.push();
        context.set('field', 'bioView');

        expect(context.propertyForKey(ObjectMeta.KeyValue)).toEqual('Country: F...');
        context.pop();


        context.pop();
      }
    );


    /**
     *   operation=view {
     *          @field=bioView {
     *              type=String;
     *              visible: ${ object.bio.length > 15 };
     *              value: ${object.bio.substring(0, 10) + '...'};
     *              after:age;
     *          }
     *    }
     */
    it(' a bioView should be visible only if bio field len is more then 15 and only in ' +
      'view mode', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClas2sRule);
        const context: UIContext = <UIContext> metaUI.newContext();


        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'Country: From Czech Republic, ' +
            'City:Prague'));
        context.setScopeKey('class');

        context.push();
        context.set('field', 'bioView');
        expect(context.propertyForKey(ObjectMeta.KeyVisible)).toBeTruthy();
        context.pop();


        context.push();
        context.object.bio = 'This short Bio';

        context.set('field', 'bioView');
        expect(context.propertyForKey(ObjectMeta.KeyVisible)).toBeFalsy();
        context.pop();

        context.pop();
      }
    );

    it('It should resolve all the field that belongs to current class MyUserTestClass for ' +
      'operation EDIT', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClas2sRule);
        const context = metaUI.newContext();


        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        const field = metaUI.itemNames(context, 'field');

        expect(field.length).toEqual(4);
        expect(field[0]).toEqual('firstName');
        expect(field[1]).toEqual('lastName');
        expect(field[2]).toEqual('age');
        expect(field[3]).toEqual('bio');

        context.pop();
      }
    );


    it('It should resolve all the field that belongs to current class MyUserTestClass VIEW ' +
      'so that we will get 5 fields as 1 is derived', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClas2sRule);
        const context = metaUI.newContext();


        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        const field = metaUI.itemNames(context, 'field');
        // print(field);

        expect(field.length).toEqual(5);
        expect(field[0]).toEqual('firstName');
        expect(field[1]).toEqual('lastName');
        expect(field[2]).toEqual('age');
        expect(field[3]).toEqual('bio');
        expect(field[4]).toEqual('bioView');

        context.pop();
      }
    );


    it('It should resolve all the VISIBILE fields that belongs to current class for view ' +
      'operations VIEW', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClas2sRule);
        const context = metaUI.newContext();


        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        const byZone = context.propertyForKey(UIMeta.PropFieldsByZone);
        expect(byZone.has('zLeft')).toBeTruthy();


        const expResult: Map<string, boolean> = new Map<string, boolean>().set(
          'firstName', true)
          .set('lastName',
            true).set('age', true).set('bio', false).set('bioView', true);

        const fields = byZone.get('zLeft');

        for (const fieldName of fields) {
          context.push();
          context.set('field', fieldName);
          const visible = context.propertyForKey(UIMeta.KeyVisible);
          expect(expResult.get(fieldName)).toEqual(visible);

          context.pop();
        }

        context.pop();
      }
    );


    /**
     *
     * We expect 3 zones zTop, zLeft, z Bottom based on the following rule:
     *
     *
     *         zNone => *;
     *         zLeft => lastName => age => bio;
     *         zTop => firstName;
     *         zBottom => bioView;
     *
     */
    it('It should resolve our fields into 3 different zones zTop = firstName, ' +
      'zLeft=lastName,age, bio, zBottom=bioView ignoring their visibility properties', () => {


        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClasForZonesRule);
        const context = metaUI.newContext();


        context.push();
        context.set('operation', 'view');
        context.set('layout', 'Inspect');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        const byZone = context.propertyForKey(UIMeta.PropFieldsByZone);
        expect(byZone.has('zLeft')).toBeTruthy();
        expect(byZone.has('zTop')).toBeTruthy();
        expect(byZone.has('zBottom')).toBeTruthy();


        const fieldsL = byZone.get('zLeft');
        const fieldsT = byZone.get('zTop');
        const fieldsB = byZone.get('zBottom');


        expect(fieldsL.length).toBe(3);
        expect(fieldsT.length).toBe(1);
        expect(fieldsB.length).toBe(1);

        // check also order of each fields
        expect(fieldsL[0]).toEqual('lastName');
        expect(fieldsL[1]).toEqual('age');
        expect(fieldsL[2]).toEqual('bio');

        expect(fieldsT[0]).toEqual('firstName');

        expect(fieldsB[0]).toEqual('bioView');

        context.pop();
      }
    );

    it('It should resolve our fields in the real UserProfile object where we will see zLeft ' +
      'fields', () => {


        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);
        metaUI.loadDefaultRuleFiles();
        metaUI.addTestUserRule('UserProfileTeRule', UserProfileTestRule);


        const context = metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object',
          new UserProfileTe('123', 'a', 'b', 213, 'adsfas asdfas adf'));
        context.setScopeKey('class');


        const byZone = context.propertyForKey(UIMeta.PropFieldsByZone);
        expect(byZone.has('zLeft')).toBeTruthy();

        const zLeft = byZone.get('zLeft');
        expect(zLeft.length).toEqual(5);

        context.pop();
      }
    );


    it('It should read bindings and resolve their dynamic values wher when we ask for ' +
      'userId we expect 123',
      () => {


        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);
        metaUI.loadDefaultRuleFiles();
        metaUI.addTestUserRule('UserProfileTeRule', UserProfileTestRule);


        const context = metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object',
          new UserProfileTe('123', 'a', 'b', 213, 'adsfas asdfas adf'));
        context.setScopeKey('class');


        context.push();
        context.set('field', 'userId');


        const bindings = context.propertyForKey(UIMeta.KeyBindings);
        // print(bindings.size);


        const value: ContextFieldPath = bindings.get('value');
        expect(value.evaluate(context)).toEqual('123');


        context.pop();
        context.pop();
      }
    );

    it('it should automatically resolve a field label if not specified. All this by ' +
      'decamelizing its Field', () => {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        const env: Environment = new Environment();
        metaUI.componentRegistry = new ComponentRegistry(env);
        metaUI.loadDefaultRuleFiles();

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClas2sRule);
        const context = metaUI.newContext();


        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        context.push();
        // bioView does not have any label but check if we can figure out correct one.
        context.set('field', 'bioView');
        expect(context.propertyForKey(UIMeta.KeyLabel)).toEqual('Bio View');

        context.pop();


        context.pop();
      }
    );

  });


  describe('how components are rendered using dynamic values', () => {
    let compWrapper: TestContainerComponent;
    let compChild: SFComponent;

    let fixtureWrapper: ComponentFixture<TestContainerComponent>;
    let fixtureChild: ComponentFixture<SFComponent>;
    let compNativeElement: DebugElement;


    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          TestContainerComponent, SFComponent
        ]
        // providers: [
        //     { provide: ComponentFixtureAutoDetect,
        //         useValue: true }
        // ]
      }).compileComponents();


      Object.defineProperty(SFComponent.prototype, 'title', {

        get: () => {
          return this.title + '-patched';
        },

        set: (value) => {
          this.title = value;
        },
        enumerable: true,
        configurable: true
      });

      fixtureWrapper = TestBed.createComponent(TestContainerComponent);
      fixtureChild = TestBed.createComponent(SFComponent);


      fixtureWrapper.detectChanges();
      compWrapper = fixtureWrapper.componentInstance;
      compChild = fixtureChild.componentInstance;

      // get title DebugElement by element name
      compNativeElement = fixtureWrapper.debugElement.query(By.css('span'));

    });


    it('It should display a simple text San Franscisco', () => {
      fixtureWrapper.detectChanges();
      expect(compNativeElement.nativeElement.textContent).toContain('San Francisco');
    });


    it('It should change a behavior of the @Input() field so that it uses some patched on ' +
      'the fly created getter' +
      ' and setter to retrive a computed value', () => {

      fixtureWrapper.detectChanges();
      expect(compNativeElement.nativeElement.textContent).toContain('San Francisco-patched');
    });

  });


  describe('=> Concurency of MetaUI ', () => {


    beforeEach(() => {
      let metaUI = UIMeta.getInstance();
      metaUI._rules.forEach((v) => {
        v.disable();
      });

      metaUI._testRules.clear();
      UIMeta['_instance'] = undefined;

      metaUI = UIMeta.getInstance();
    });

    xit('should process more then 800 000 rule index entries in less than 2 sec', () => {


      const metaPefr = UIMeta.getInstance();
      metaPefr.registerLoader(new RuleLoaderService());

      metaPefr.loadDefaultRuleFiles();
      const env: Environment = new Environment();
      metaPefr.componentRegistry = new ComponentRegistry(env);

      metaPefr.componentRegistry.registerType('MyUserTestClass', MyUserTestClass);

      metaPefr.addTestUserRule('MyUserTestClassRule', MyUserTestClas2sRule);

      const start = Date.now();

      for (let i = 0; i < 1000; i++) {
        const context = metaPefr.newContext();
        context.push();

        // console.log('#### ################ activation #', i)
        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('class', 'MyUserTestClass');

        context.push();
        context.set('field', 'age');
        expect(context.propertyForKey(UIMeta.KeyLabel)).toEqual('My Age');

        context.push();
        context.set('operation', 'view');
        expect(context.propertyForKey(UIMeta.KeyLabel)).toEqual('Age Label For View');
        context.pop();

        context.pop();
        context.pop();
      }

      const processedIn = Date.now() - start;

      expect(processedIn).toBeLessThan(5000);
      expect(Match._Debug_ElementProcessCount).toBeGreaterThan(800000);

      // console.log('Rule index entries processed:', Match._Debug_ElementProcessCount)
      // console.log('Processed in:',  processedIn);
    });
  });


  /**
   *
   * This test is based on following oss
   *
   *        class=UserWithDetail {
   *
   *            field=name {
   *                trait:asHover;
   *                label:"Frank Kolar";
   *            }
   *        }
   */

  describe('how class can get object details ', () => {

    beforeEach(() => {
      let metaUI = UIMeta.getInstance();
      metaUI._rules.forEach((v) => {
        v.disable();
      });

      metaUI._testRules.clear();
      UIMeta['_instance'] = undefined;

      metaUI = UIMeta.getInstance();

    });

    it('should retrieve correct component to render when trait asHover is used and' +
      ' overriden by user rules', () => {

      const metaUI = UIMeta.getInstance();
      metaUI.registerLoader(new RuleLoaderService());
      const env: Environment = new Environment();
      metaUI.componentRegistry = new ComponentRegistry(env);

      metaUI.loadDefaultRuleFiles();

      metaUI.addTestUserRule('UserWithDetailRule', UserWithDetailRule);
      const context = metaUI.newContext();

      context.push();
      context.set('layout', 'Inspect');
      context.set('operation', 'view');
      context.set('object', new UserWithDetail('Frank Kolar'));
      context.setScopeKey('class');

      context.push();
      context.set('field', 'name');

      expect(context.propertyForKey('component')).toBe('HoverCardComponent');
      const bindings = context.propertyForKey('bindings');

      context.push();
      context.set('layout', bindings.get('ngcontentLayout'));
      expect(context.propertyForKey('component')).toBe('NewStringComponent');

      context.pop();


      context.pop();
      context.pop();
    });
  });
});


/**
 *
 * Almost identical like above case , here we just distribute fields into different ZONES
 *
 *  class=MyUserTestClass {
 *
 *		field=firstName#required {
 *				label:'My First Name';
 *
 *				operation=create {
 *					label:'Enter your first Name';
 *				}
 *			}
 *
 *			field=lastName#required {
 *				label:'My Last Name';
 *			}
 *
 *			field=age#required {
 *				label:'My Age';
 *				valid: ${value > 19};
 *
 *				operation=view {
 *					label:'Age Label For View';
 *				}
 *			}
 *
 *			field=bio {
 *				label:'This is my biography';
 *				visible:${object.age > 18};
 *
 *				operation=view {
 *					after:zNone;
 *				}
 *
 *			}
 *
 *			zNone => *;
 *			zLeft => lastName => age => bio;
 *			zTop => firstName;
 *
 *			operation=view {
 *            @field=bioView {
 *   		       type=String;
 *					visible: ${ object.bio.length > 15 };
 *					value: ${object.bio.substring(0, 10) + '...'};
 *    		        after:zBottom;
 *				}
 *         }
 * }
 *
 * Map format bellow:
 *
 */


// @formatter:off
/**
 *
 *
 *
 *       class=MyUserTestClass {
 *
 *            field=firstName#required {
 *                label:'My First Name';
 *            }
 *
 *            field=lastName#required {
 *                label:'My Last Name';
 *           }
 *
 *            field=age#required {
 *                label:'My Age';
 *               valid: ${value > 19};
 *          }
 *
 *            field=bio {
 *                label:'This is my biography';
 *                visible:${object.age > 18};
 *            }
 *
 *            zNone => *;
 *            zLeft => firstName => lastName => age => bio;
 *        }
 *
 *
 */

/* tslint:disable */

export const MyUserTestClassRule = {
  oss: [
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    },
    {
      '_properties': {'trait': 'required', 'label': 'My First Name'}, '_rank': 0,
      '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    },
    {
      '_properties': {'trait': 'required', 'label': 'My Last Name'}, '_rank': 0,
      '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'lastName', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    },
    {
      '_properties': {
        'valid': {'t': 'Expr', 'v': 'value > 19'},
        'trait': 'required',
        'label': 'My Age'
      },
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    },
    {
      '_properties': {
        'visible': {'t': 'Expr', 'v': 'object.age > 18'},
        'label': 'This is my biography'
      },
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    },
    {
      '_properties': {'after': 'zNone'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': '*', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    },
    {
      '_properties': {'after': 'zLeft'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    },
    {
      '_properties': {'after': 'firstName'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'lastName', '_key': 'field'}
      ]
    },
    {
      '_properties': {'after': 'lastName'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    },
    {
      '_properties': {'after': 'age'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }
  ]
};
// @formatter:on
/* tslint:enable */


/**
 *  class=MyUserTestClass {
 *
 *		field=firstName#required {
 *				label:'My First Name';
 *
 *				operation=create {
 *					label:'Enter your first Name';
 *				}
 *			}
 *
 *			field=lastName#required {
 *				label:'My Last Name';
 *			}
 *
 *			field=age#required {
 *				label:'My Age';
 *				valid: ${value > 19};
 *
 *				operation=view {
 *					label:'Age Label For View';
 *				}
 *			}
 *
 *			field=bio {
 *				label:'This is my biography';
 *				visible:${object.age > 18};
 *
 *				operation=view {
 *					after:zNone;
 *				}
 *
 *			}
 *
 *			zNone => *;
 *			zLeft => firstName => lastName => age => bio;
 *
 *			operation=view {
 *            @field=bioView {
 *   		       type=String;
 *					visible: ${ object.bio.length > 15 };
 *					value: ${object.bio.substring(0, 10) + '...'};
 *    		        after:age;
 *				}
 *         }
 * }
 *
 * Map format bellow:
 *
 */
/* tslint:disable */

// @formatter:off
export const MyUserTestClas2sRule = {
  oss: [
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {'trait': 'required', 'label': 'My First Name'}, '_rank': 0,
      '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    }, {
      '_properties': {'label': 'Enter your first Name'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'},
        {'_isDecl': false, '_value': 'create', '_key': 'operation'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {'trait': 'required', 'label': 'My Last Name'}, '_rank': 0,
      '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'lastName', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {
        'valid': {'t': 'Expr', 'v': 'value > 19'},
        'trait': 'required',
        'label': 'My Age'
      },
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    }, {
      '_properties': {'label': 'Age Label For View'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {
        'visible': {'t': 'Expr', 'v': 'object.age > 18'},
        'label': 'This is my biography'
      },
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'}
      ]
    }, {
      '_properties': {'after': 'zNone'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {'after': 'zNone'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': '*', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {'after': 'zLeft'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    }, {
      '_properties': {'after': 'firstName'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'lastName', '_key': 'field'}
      ]
    }, {
      '_properties': {'after': 'lastName'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    }, {
      '_properties': {'after': 'age'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'},
        {'_isDecl': true, '_value': 'bioView', '_key': 'field'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'},
        {'_isDecl': true, '_value': 'bioView', '_key': 'field'},
        {'_isDecl': false, '_value': 'String', '_key': 'type'}
      ]
    }, {
      '_properties': {
        'visible': {'t': 'Expr', 'v': 'object.bio.length > 15'}, 'after': 'age',
        'value': {'t': 'Expr', 'v': 'object.bio.substring(0, 10) + \'...\''}
      }, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'},
        {'_isDecl': true, '_value': 'bioView', '_key': 'field'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }
  ]
};
/* tslint:enable */

/* tslint:disable */

export const MyUserTestClasForZonesRule = {
  oss: [
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {'trait': 'required', 'label': 'My First Name'}, '_rank': 0,
      '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    }, {
      '_properties': {'label': 'Enter your first Name'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'},
        {'_isDecl': false, '_value': 'create', '_key': 'operation'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {'trait': 'required', 'label': 'My Last Name'}, '_rank': 0,
      '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'lastName', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {
        'valid': {'t': 'Expr', 'v': 'value > 19'},
        'trait': 'required',
        'label': 'My Age'
      },
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    }, {
      '_properties': {'label': 'Age Label For View'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {
        'visible': {'t': 'Expr', 'v': 'object.age > 18'},
        'label': 'This is my biography'
      },
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'}
      ]
    }, {
      '_properties': {'after': 'zNone'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {'after': 'zNone'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': '*', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {'after': 'zLeft'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'lastName', '_key': 'field'}
      ]
    }, {
      '_properties': {'after': 'lastName'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    }, {
      '_properties': {'after': 'age'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {'after': 'zTop'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'},
        {'_isDecl': true, '_value': 'bioView', '_key': 'field'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'},
        {'_isDecl': true, '_value': 'bioView', '_key': 'field'},
        {'_isDecl': false, '_value': 'String', '_key': 'type'}
      ]
    }, {
      '_properties': {
        'visible': {'t': 'Expr', 'v': 'object.bio.length > 15'}, 'after': 'zBottom',
        'value': {'t': 'Expr', 'v': 'object.bio.substring(0, 10) + \'...\''}
      }, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'},
        {'_isDecl': true, '_value': 'bioView', '_key': 'field'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }
  ]
};

export const UserProfileTestRule = {
  oss: [
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_properties': {'label': 'User Id'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'userId', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_properties': {'trait': 'required', 'label': 'You First Name'}, '_rank': 0,
      '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_properties': {'trait': 'required', 'label': 'You Last Name'}, '_rank': 0,
      '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'lastName', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_properties': {'label': 'Age'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_properties': {'label': 'Info About User'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'note', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_properties': {
        'trait': 'derived', 'label': 'Full Name', 'type': 'String',
        'value': {'t': 'Expr', 'v': 'object.firstName + " "+ object.lastName'}
      }, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': true, '_value': 'fullName', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_properties': {
        'visible': {'t': 'Expr', 'v': 'object.age < 18'}, 'trait': 'derived',
        'label': 'Warning',
        'type': 'String', 'value': 'This user is too young !!'
      }, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': true, '_value': 'extraInfo', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'edit', '_key': 'operation'}
      ]
    }, {
      '_properties': {'after': 'zNone'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'edit', '_key': 'operation'},
        {'_isDecl': false, '_value': '*', '_key': 'field'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'edit', '_key': 'operation'}
      ]
    }, {
      '_properties': {'after': 'zLeft'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'edit', '_key': 'operation'},
        {
          '_isDecl': false,
          '_value': ['firstName', 'lastName', 'age', 'note', 'fullName'],
          '_key': 'field'
        }
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'edit', '_key': 'operation'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_properties': {'after': 'zNone'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'},
        {'_isDecl': false, '_value': '*', '_key': 'field'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_properties': {'after': 'zLeft'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}, {
          '_isDecl': false,
          '_value': [
            'userId', 'firstName', 'lastName', 'age', 'note', 'fullName', 'extraInfo'
          ],
          '_key': 'field'
        }
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'admin', '_key': 'role'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'admin', '_key': 'role'},
        {'_isDecl': false, '_value': ['edit', 'view'], '_key': 'operation'}
      ]
    }, {
      '_properties': {'after': 'zNone'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'admin', '_key': 'role'},
        {'_isDecl': false, '_value': ['edit', 'view'], '_key': 'operation'},
        {'_isDecl': false, '_value': '*', '_key': 'field'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'admin', '_key': 'role'},
        {'_isDecl': false, '_value': ['edit', 'view'], '_key': 'operation'}
      ]
    }, {
      '_properties': {'after': 'zLeft'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'admin', '_key': 'role'},
        {'_isDecl': false, '_value': ['edit', 'view'], '_key': 'operation'}, {
          '_isDecl': false, '_value': [
            'userId', 'firstName', 'lastName', 'age', 'note', 'fullName', 'extraInfo',
            'password', 'locale',
            'lastAccessTime'
          ], '_key': 'field'
        }
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'admin', '_key': 'role'},
        {'_isDecl': false, '_value': ['edit', 'view'], '_key': 'operation'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'admin', '_key': 'role'}
      ]
    }
  ]
};


export const UserWithDetailRule = {
  oss: [
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': 'UserWithDetail',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': 'UserWithDetail',
          '_isDecl': false
        },
        {
          '_key': 'field',
          '_value': 'name',
          '_isDecl': false
        }
      ],
      '_properties': {
        'trait': 'asHover',
        'label': 'Frank Kolar'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': 'UserWithDetail',
          '_isDecl': false
        },
        {
          '_key': 'field',
          '_value': 'name',
          '_isDecl': false
        },
        {
          '_key': 'layout',
          '_value': 'Content',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'NewStringComponent'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': 'UserWithDetail',
          '_isDecl': false
        },
        {
          '_key': 'field',
          '_value': 'name',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': 'UserWithDetail',
          '_isDecl': false
        }
      ],
      '_rank': 0
    }
  ]
};

/* tslint:enable */


class MyUserTestClass implements Entity {
  firstName: string;
  lastName: string;
  age: number;
  bio: string;


  constructor(firstName: string, lastName: string, age: number, bio: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.bio = bio;
  }

  identity(): string {
    return this.lastName;
  }

  className(): string {
    return 'MyUserTestClass';
  }

  getTypes(): any {
    return {
      firstName: String,
      lastName: String,
      age: Number,
      bio: String
    };
  }
}


@Component({
  selector: 'wrapper-comp',
  template: '<test-comp [title]="text"></test-comp>'
})
class TestContainerComponent {
  text = 'San Francisco';
}


@Component({
  selector: 'test-comp',
  template: '<span>{{title}}</span>'
})
class SFComponent {
  @Input()
  title: string = 'Prague';

}


export class UserProfileTe implements Entity {

  constructor(public userId: string, public  firstName: string, public  lastName: string,
              public  age: number,
              public note: string, public password: string = '', public locale: string = '',
              public lastAccessTime = '') {

  }

  identity(): string {
    return this.userId;
  }

  className(): string {
    return 'UserProfileTe';
  }

  getTypes(): any {
    return {
      userId: String,
      firstName: String,
      lastName: String,
      age: Number,
      note: String,
      password: String,
      locale: String,
      lastAccessTime: String
    };
  }
}


class UserWithDetail implements Entity {

  constructor(public name: string) {
  }

  identity(): string {
    return this.name;
  }

  className(): string {
    return 'UserWithDetail';
  }

  getTypes(): any {
    return {
      name: String
    };
  }
}
