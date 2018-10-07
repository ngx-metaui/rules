/**
 *
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
 *
 */
/* tslint:disable:no-unused-variable */
import {TestBed} from '@angular/core/testing';
import {Routes} from '@angular/router';
import {Component, ElementRef, OnInit} from '@angular/core';
import {AribaCoreModule} from '../ariba.core.module';
import {AppConfig} from './app-config';


export const testModules: Routes = [
  {
    path: '', redirectTo: 'test/', pathMatch: 'full'
  }
];


describe('Application configuration', () => {

  beforeEach(() => {
    setUserAgent(window,
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/601.6.17 ' +
      '(KHTML, like Gecko) Version/9.1.1 Safari/601.6.17');

    setPlatform(window, 'MacIntel');
    document.documentElement.dir = 'ltr';

  });


  it('should have some default values configured during app boostrap and import module',
    () => {


      setUserAgent(window,
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/601.6.17 ' +
        '(KHTML, like Gecko) Version/9.1.1 Safari/601.6.17');

      setPlatform(window, 'MacIntel');
      document.documentElement.dir = 'ltr';
      setLang(window, 'cz');

      TestBed.configureTestingModule({
        imports: [
          AribaCoreModule.forRoot({
            'prop1': 'val1',
            'restapi.project': '/myuserservice/v1/',
            'i18n.enabled': false,
            'env.test': true,
            'devmode.enabled': true
          })
        ],
      });


      let config: AppConfig = TestBed.get(AppConfig);
      expect(config.get('prop1')).toEqual('val1');
      expect(config.get('restapi.project')).toEqual('/myuserservice/v1/');
      expect(config.get('i18n.enabled')).toEqual(false);
      expect(config.get('devmode.enabled')).toEqual(true);
      expect(config.isProductionMode()).toEqual(false);
    });


  it('should have some default values pre-set read from environemnt',
    () => {


      setUserAgent(window,
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/601.6.17 ' +
        '(KHTML, like Gecko) Version/9.1.1 Safari/601.6.17');

      setPlatform(window, 'MacIntel');
      document.documentElement.dir = 'ltr';
      setLang(window, 'cz');

      TestBed.configureTestingModule({
        imports: [
          AribaCoreModule.forRoot({
            'prop1': 'val1',
            'restapi.project': '/myuserservice/v1/',
            'i18n.enabled': false,
            'env.test': true
          })
        ],
      });

      let config: AppConfig = TestBed.get(AppConfig);
      expect(config.get(AppConfig.UserAgent))
        .toContain('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5)');
      expect(config.get(AppConfig.Lang)).toContain('cz');
      expect(config.get(AppConfig.Direction)).toContain('ltr');
      expect(config.get(AppConfig.NavPlatform)).toContain('MacIntel');
      expect(config.get(AppConfig.ContentType)).toContain('application/json; charset=utf-8');
    });


  it('it should read environment variables from Embedded scripts that is ' +
    'passed by server', () => {

    setUserAgent(window,
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/601.6.17 ' +
      '(KHTML, like Gecko) Version/9.1.1 Safari/601.6.17');

    setPlatform(window, 'MacIntel');
    document.documentElement.dir = 'ltr';

    TestBed.configureTestingModule({
      declarations: [
        TestAppConfigGlobalEmbeddedComponent
      ],
      imports: [
        AribaCoreModule.forRoot({
          'prop1': 'val1',
          'restapi.project': '/myuserservice/v1/',
          'i18n.enabled': false,
          'env.test': true,
          'env.test.url': '/aa/app?lang=fr&prop.aa=yes'
        })
      ],
    });


    TestBed.compileComponents();
    let fixtureWrapper = TestBed.createComponent(TestAppConfigGlobalEmbeddedComponent);
    fixtureWrapper.detectChanges();

    let config: AppConfig = TestBed.get(AppConfig);


    // In life app it will read directly from the page but for the test purposes we need
    // to call it this way as AribaCoreModule.forRoot was already called.
    config.parseGlobalParams();

    expect(config.get('app.pro1')).toBe('value1');
    expect(config.get('app.pro2')).toBe('value2');
    expect(config.get('lang')).toBe('ch');
  });

});


function setUserAgent(window: any, userAgent: any) {
  if (window.navigator.userAgent !== userAgent) {
    let userAgentProp = {
      get: function () {
        return userAgent;
      }
    };
    try {
      Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
    } catch (e) {
      window.navigator = Object.create(navigator, {
        userAgent: userAgentProp
      });
    }
  }
}


function setLang(window: any, language: any) {
  if (window.navigator.language !== language) {
    let languageProp = {
      get: function () {
        return language;
      }
    };
    try {
      Object.defineProperty(window.navigator, 'language', languageProp);
    } catch (e) {
      window.navigator = Object.create(navigator, {
        language: languageProp
      });
    }
  }
}

function setPlatform(window: any, userAgent: any) {
  if (window.navigator.userAgent !== userAgent) {
    let platformProp = {
      get: function () {
        return userAgent;
      }
    };
    try {
      Object.defineProperty(window.navigator, 'platform', platformProp);
    } catch (e) {
      window.navigator = Object.create(navigator, {
        platform: platformProp
      });
    }
  }
}


@Component({
  selector: 'wrapper-comp',
  template: `
        <span></span>
    `
})
class TestAppConfigGlobalEmbeddedComponent implements OnInit {

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    let s = document.createElement('script');

    s.type = 'text/javascript';
    /* tslint:disable:no-var-keyword */
    s.innerHTML = `
                var AppConfigGlobal = {
                    'app.pro1': 'value1',
                    'app.pro2': 'value2',
                    'lang': 'ch'
                };
        `;

    /* tslint:enable:no-var-keyword */

    this.elementRef.nativeElement.appendChild(s);
  }
}



