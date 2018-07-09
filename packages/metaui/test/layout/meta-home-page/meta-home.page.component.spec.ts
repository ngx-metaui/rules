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
import {UIMeta} from '../../../src/core/uimeta';
import {Meta} from '../../../src/core/meta';
import {Context} from '../../../src/core/context';
import {RuleLoaderService} from '../../../src/core/rule-loader.service';


describe('How we can retrieve homepage from module', () => {
    beforeEach(() => {
        let metaUI = UIMeta.getInstance();
        metaUI._rules.forEach((v) => {
            v.disable();
        });

        metaUI._testRules.clear();
        UIMeta['_instance'] = undefined;

        metaUI = UIMeta.getInstance();

    });


    it('should retrieve generic module homepage called MetaHomePageComponent', () => {
        let metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();

        let context: Context = metaUI.newContext();
        context.push();
        context.set(UIMeta.KeyModule, Meta.KeyAny);

        let homePage = context.propertyForKey(UIMeta.KeyHomePage);
        // meta.naviateToPage(context, '', false)

        context.pop();

        expect(homePage).toEqual('MetaHomePageComponent');

    });


    it('should retrieve generic module component representing layout called' +
        ' MetaDashboardLayoutComponent', () => {
        let metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();

        let context: Context = metaUI.newContext();
        context.push();
        context.set(UIMeta.KeyModule, Meta.KeyAny);

        let homePage = context.propertyForKey(UIMeta.KeyComponentName);
        // meta.naviateToPage(context, '', false)

        context.pop();

        expect(homePage).toEqual('MetaDashboardLayoutComponent');

    });


    // @formatter:off
    /* tslint:disable */
    const ApplicationRule: { oss: any } = {
        oss: [
            {
                '_selectors': [
                    {
                        '_key': 'module',
                        '_value': 'Home',
                        '_isDecl': true
                    }
                ],
                '_properties': {
                    'pageTitle': 'My Home Title',
                    'homePage': 'TestMetaHomePage'
                },
                '_rank': 0
            },
            {
                '_selectors': [
                    {
                        '_key': 'module',
                        '_value': 'Product',
                        '_isDecl': true
                    }
                ],
                '_properties': {
                    'pageTitle': 'My Product Title',
                    'homePage': 'Test2MetaHomePage'
                },
                '_rank': 0
            }
        ]
    };
    // @formatter:on
    /* tslint:disable */
    it('should retrieve application based module and its homePage TestMetaHomePage', () => {
        let metaUI = UIMeta.getInstance();
        metaUI.addTestUserRule('ApplicationRule', ApplicationRule);

        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();
        metaUI.loadApplicationRules();

        let context: Context = metaUI.newContext();
        context.push();
        context.set(UIMeta.KeyModule, 'Home');

        let homePage = context.propertyForKey(UIMeta.KeyHomePage);
        context.pop();

        expect(homePage).toEqual('TestMetaHomePage');


        context = metaUI.newContext();
        context.push();
        context.set(UIMeta.KeyModule, 'Product');

        homePage = context.propertyForKey(UIMeta.KeyHomePage);
        context.pop();
        expect(homePage).toEqual('Test2MetaHomePage');

    });

});

