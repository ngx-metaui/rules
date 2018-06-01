### Deprecated changelog to keep the history

<a name="0.23.7"></a>
## [0.23.7](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.23.6...0.23.7) (2018-05-17)


### Bug Fixes

* **table:** Added null/undefined check for adding and removing dragging class ([07d29d4](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/07d29d4))


### Features

* **table:** Support for D&D rows for simple tables ([a296224](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/a296224))



<a name="0.23.6"></a>
## [0.23.6](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.23.5...0.23.6) (2018-05-15)

### Bug Fixes

* **table:** Remove export from the unused component. ([c2d6bfef](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/pull/58/commits/ffa4d82bb32bf18995195b5a53f7a008c2d6bfef))



<a name="0.23.5"></a>
## [0.23.5](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.23.6...0.23.5) (2018-05-10)


### Bug Fixes

* **currency:** Should respect user inputted currency when initializing. ([23639bd](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/23639bd))


### Features

* **72-font:** Adding "72" font face to resources ([ac214f2](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/ac214f2))
* **currency:** When set value to the component, it should update currency selection and display money string. ([b9fb471](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/b9fb471))
* **SAP icons:** Adding newer version of SAP icons ([70fc77b](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/70fc77b))



<a name="0.23.4"></a>
## [0.23.4](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.23.3...0.23.4) (2018-04-30)


### Bug Fixes

* Adding null check for `term` ([3365b98](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/3365b98))
* IE does not support method `NodeList.forEach`, converting to Array type ([3db80f3](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/3db80f3))


### Features

* **table:** Limited support for MaxWidth for DT column ([682a8e6](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/682a8e6))



<a name="0.23.3"></a>
## [0.23.3](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.23.2...0.23.3) (2018-04-13)


### Bug Fixes

* **utils:** IE compatible fix for checking if expr is RegExp ([88afec7](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/88afec7))



<a name="0.23.2"></a>
## [0.23.2](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.23.1...0.23.2) (2018-04-12)

### Bug Fixes

* **input-field:** Expose sorting to the datasource ([cdc72dd](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/b99b748c36334fd1545951fd15cf7573ae931e25))


## [0.23.1](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.23.0...0.23.1) (2018-04-11)


### Bug Fixes

* **table:** Expose sorting to the datasource ([cdc7227](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/cdc7227))


### Features

* **date-time:** Add new yearRange binding to make year navigation to work. ([e0abce3](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/e0abce3))



<a name="0.23.0"></a>
# [0.23.0](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.22.2...0.23.0) (2018-04-10)


### Bug Fixes

* **animation:** Added new polyfills for the web animation (IE). ([7808a20](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/7808a20))
* **table:** Removed unnecessary comma ([da13dab](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/da13dab))


### Features

* **table:** Frozen column support ([475dca0](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/475dca0))



<a name="0.22.2"></a>
## [0.22.2](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.22.1...0.22.2) (2018-03-28)


### Bug Fixes

* **core:** Force providers to be instantiated only once ([d7d5001](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/d7d5001))


### Features

* **awName:** Adding switch to disable name generation in production ([9c3f3a4](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/9c3f3a4))

### Breaking Changes
* **AribaComponentsModule** providers are now extracted out into `.forRoot()` so when using this module please make 
sure that you import this module at the root level with the `.forRoot()` call in following way:

example with `AribaCoreModule`.
```ts
imports: [
        AribaCoreModule.forRoot({
            'app.title': 'Strategic Sourcing'
        }) ,
        AribaComponentsModule.forRoot() ,
    ] ,

```
* You will call `AribaComponentsModule.forRoot()` only once. In the child modules nothing should change and you 
should leave existing imports `AribaComponentsModule` as it is
* **AribaCoreModule** does not import `TranslateModule` anymore as it caused several issues in child modules where it 
instantiated new duplicate services when importing the `AribaCoreModule`.
    * Due to the nature of `@ngx-translate` we can not extract their services and move them into our 
    `AribaCoreModule.forRoot` as it would ideal solution since some of the services are private and not exported.
    * Therefore new Module `AribaCoreI18nModule` was created that needs to be imported also at the root level encapsulating 
    `TranslateModule` initialization with ariba `TranslateLoader` implementation as well as custom errror
    handling. 

example with `AribaCoreModule` and `AribaComponentsModule`
```ts
imports: [
        AribaCoreI18nModule,
        AribaCoreModule.forRoot({
            'app.title': 'Strategic Sourcing'
        }) ,
        AribaComponentsModule.forRoot() ,
    ] ,

```


<a name="0.22.1"></a>
## [0.22.1](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.22.0...0.22.1) (2018-03-27)


### Features

* **bug-fix:** empty string display when input field is not editable ([10601cf](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/10601cf))
* **currency:** When using ngModel, number did not format correctly. ([12177d5](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/12177d5))



<a name="0.22.0"></a>
# [0.22.0](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.21.5...0.22.0) (2018-03-22)


### Bug Fixes

* **table:** Unload data added by infinite scroll when going up ([679fae6](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/679fae6))
* **currency:** Adding one extra test case for read only currency code. ([314a3f6](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/314a3f6))


### Features

* **awName:** Adding awName directive to core library ([764e234](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/764e234))
* **currency:** Support to display readonly currency code. ([6812dec](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/6812dec))
* **table:** Dynamic sizing for infinite scroll ([af23714](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/af23714))



<a name="0.21.5"></a>
## [0.21.5](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.21.4...0.21.5) (2018-03-16)


### Bug Fixes

* **table:** Unload data added by infinite scroll when going up ([85c3f94](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/85c3f94))


### Features

* **table:** Dynamic sizing for infinite scroll ([f646278](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/f646278))



<a name="0.21.4"></a>
## [0.21.4](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.21.3...0.21.4) (2018-03-16)


### Features

* **currency:** When using ngModel, number did not format correctly. ([d5d3cd0](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/d5d3cd0))



<a name="0.21.3"></a>
## [0.21.3](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.21.2...0.21.3) (2018-03-15)


### Features

* **datatable:** Added full screen expand/collapse support ([19e089c](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/19e089c))
* **datatable:** Added infinite scrolling in full page mode ([8d41e1c](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/8d41e1c))
* **currency:** Support precision for money and number ([4447ba](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/4447ba34085b7d4cff6ecf5ec080b756ff9e16f6))


<a name="0.21.2"></a>
## [0.21.2](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.21.1...0.21.2) (2018-03-01)


### Bug Fixes

* **datatable:** Allow to pass custom Datasource ([e70bfc6](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/e70bfc6))
* **datatable:** Special multiselection handling fix for outline table ([ad9b59e](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/ad9b59e))


### Features

* **datatable:** Support for multiselection ([b93e656](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/b93e656))
* **datatable:** Support for single select ([7e738b3](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/7e738b3))



<a name="0.21.1"></a>
## [0.21.1](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.21.0...0.21.1) (2018-02-16)


### Bug Fixes

* **hover-card:** Make it work also with parent containers that are relative ([b768fbe](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/b768fbe))


### Features

* **datatable:** Support for search and state persisting ([af0a582](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/af0a582))



<a name="0.21.0"></a>
# [0.21.0](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.20.0...0.21.0) (2018-02-13)


### Features

* **table:** Detail expand/collapse column control implemented ([489f168](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/489f168))
* **table:** Implemented Detail row that works with outline ([275f277](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/275f277))

### Bug Fixes

* **hovercard:** Changes for pop-up component to extend ([275f277](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/3fc4563dbf57e5e343ff07f29677eb99869ac5f8))


<a name="0.20.0"></a>
# [0.20.0](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.19.1...0.20.0) (2018-01-24)


### Bug Fixes

* **angular-cli.json:** Updated configuration with correct assets paths ([af5452d](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/af5452d))
* **collections:** Compilation error for the release mode ([4755d77](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/4755d77))
* **datatable:** Updated datatable with new functionality to support custom header ([c5a54e0](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/c5a54e0))
* **datatable-demo:** Remove unused code of outline from DT. ([8e6e279](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/8e6e279))
* **http-interceptor:** Fix failing test after changing Response.body to payload ([556b94e](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/556b94e))
* **resource:** Fix wrong returned Resource type by reversing the URL segements. ([a260ab5](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/a260ab5))
* **resource-url:** Fix wrong generated URL with repeat '//' if there is no value for UrlSegment. ([5750a99](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/5750a99))
* **resource.service:** Added catch for "Number" type in "deserialize" ([adb81d2](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/adb81d2))


### Features

* **datatable:** Cell Selection support added ([86dd627](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/86dd627))
* **datatable:** Updated datatable with new outline/tree support ([b4a7cc7](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/b4a7cc7))
* **outline:** New outline component with much better controll and flexibility ([6ee482a](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/6ee482a))



<a name="0.19.1"></a>
## [0.19.1](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.19.0...0.19.1) (2018-01-08)


### Bug Fixes

* **angular dependency:** Update dependency to BrowserModule and BrowserAnimationModule ([e1311e5](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/e1311e5))



<a name="0.19.0"></a>
# [0.19.0](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.18.1...0.19.0) (2018-01-04)


### Bug Fixes

* **npmrc:** Removing `npmrc` from git and keeping only local copy ([67644b9](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/67644b9))
* **package.json:** Update package.json to point into new npm repository ([b01d356](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/b01d356))
* **page-wrapper:** Add null change for currentState test inside ngOnChanges ([5638451](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/5638451))


### Features

* **rest:** New Resource service for restful calls ([a9f60d5](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/a9f60d5))

### Breaking changes
* Removed .npmrc as we moved to different `npm registry`. Please keep your own copy of `.npmrc` with following content:

```
    registry=http://registry.mo.sap.corp/api/npm/npmjs
    strict-ssl=false
    https-proxy=http://proxy.ariba.com:8080/
    progress=true
    proxy=http://proxy.ariba.com:8080/
    no_proxy=10.9.40.69,localhost,sap.corp,mo.sap.corp,cc.mo.sap.corp,sap.biz,cloud.sap,sap,cc.ondemand.com,moo-repo,moo-repo.wdf.sap.corp,repo,repo.wdf.sap.corp,169.254.169.254,mo-3449ad0a1,127.0.0.1    
    always-auth = false
    
```



<a name="0.18.1"></a>
## [0.18.1](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.18.0...0.18.1) (2017-12-12)


### Bug Fixes

* **page-wrapper:** Exposed currentState when Stepper is used ([febc46b](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/febc46b))

### Build Changes

* **release:** Fixed metadata inside component file (inlineResources) ([09ff769](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/09ff769768adf3cce6e0457f05d9f7ab67ae0e33))




<a name="0.18.0"></a>
# [0.18.0](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.17.4...0.18.0) (2017-12-11)

This our minor release which is now compatible with Angular 5.

### Highlights
* Core UI is now fully updated to the latest angular 5 (5.1.0) as well as :
    * angular-cli: 1.6.0
    * prime-ng: 5.0.2
* MetaUI was refactored to read metadata from ComponentFactory instead of decorators
    * MetaUI now supports fully AOT mode (Not in uglified form now). 
* Updated to the latest ngx-translate 9.0.1


### Deprecations
* Dont use `embeddedItem` directive it will be removed in the next version.
* Try to limit usage of `typescript-collection` and `lodash`, they will be deprecated in the future
releases and replaced with own implementation
    * these libraries are braking our `ng serve --prod --aot=true`
    
    
    



<a name="0.17.4"></a>
## [0.17.4](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.17.3...0.17.4) (2017-12-02)


### Bug Fixes

* **card:** Enable styleClass to be used with the card ([24ef56e](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/24ef56e))
* **card:** Removed font-size as we should inherit from parent ([d1d13cd](https://github.wdf.sap .corp/core-ui-platform/AribaCoreUI/commit/d1d13cd))
* **currency:** Updated arguments order for Money Entity ([42ecb08](https://github.wdf.sap
.corp/core-ui-platform/AribaCoreUI/commit/42ecb08))
* **scrollable:** Added methods to check if there is a active scrollbar ([3fcc5ae](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/3fcc5ae))
* **scrollable:** Row flow with wrap support for column direction ([1a0abde](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/1a0abde))



<a name="0.17.3"></a>
## [0.17.3](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.17.2...0.17.3) (2017-11-29)


### Bug Fixes

* **demo:** Updated Playground oss rule to its default state ([757274f](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/757274f))
* **metaui:** Deferred object loading problem ([d5bc3d0](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/d5bc3d0))
* **money:** Changed order of arguments ([61c5bc1](https://github.wdf.sap .corp/core-ui-platform/AribaCoreUI/commit/61c5bc1))


### Features

* **card:**  Support custom body content ([4468142](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/4468142))



<a name="0.17.2"></a>
## [0.17.2](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.17.1...0.17.2) (2017-11-06)


### Bug Fixes

* **components:** Components refactoring and general adjustments ([502e14b](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/502e14b))
* **metaui:** Performance improvements ([bba07f2](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/bba07f2))
* **metaui:** Updated rules for toOneRelationship and toMany ([010f4dc](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/010f4dc))
* **playground:** Adding missing hasAction binding ([8bc4dfc](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/8bc4dfc))
* **rest:** Deserialize arrays support ([7b12cd5](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/7b12cd5))
* **scrollable demo:** Updated styling to make scrollable container auto scroll within its parent ([e62ab6a](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/e62ab6a))


### Features

* **card:** New card component support ([8146852](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/8146852))



<a name="0.17.1"></a>
## [0.17.1](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.17.0...0.17.1) (2017-10-30)


### Bug Fixes

* **entity resource:** EntityResource and BaseEntity support  custom identifier ([077183c](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/077183c))
* **mockserver:** updated mock server implementation with HttpClient ([55bc606](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/55bc606))



<a name="0.17.0"></a>
# [0.17.0](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.16.1...0.17.0) (2017-10-26)


### Bug Fixes

* **coreui:** Update angular-cli to 1.4.9, angular to 4.4.6, prime-ng to 4.2.2 ([83b392b](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/83b392b))
* **page-notification:** Extended page notification to render also a custom content ([37fc43e](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/37fc43e))


### Features

* **chooser:** Chooser selection can be appendTo any given element ([8a4aeb0](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/8a4aeb0))
* **hover-card:** Implemented hover-card component ([ed9e531](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/ed9e531))
* **list:** Implemented listbox component ([2074e6d](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/2074e6d))
* **metaui:** Support for Object detail in the Form Layout ([0d77615](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/0d77615))



<a name="0.16.1"></a>
## [0.16.1](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.16.0...0.16.1) (2017-10-05)


### Bug Fixes

* **widgets:** Expression has changed after it was checked ([9294eee](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/9294eee))


### Features

* **datatable:** ControlValueAccessor support so it can be part of the form ([c8f3010](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/c8f3010))



<a name="0.16.0"></a>
# [0.16.0](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.15.1...0.16.0) (2017-10-03)


### Bug Fixes

* **components:** Updated components to not reference hardcoded links as well as changed header background for datatable. ([6c26bdd](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/6c26bdd))
* **datatable.spec:** Updated formatting to pass ng lint ([7bf4e72](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/7bf4e72))
* **dependencies:** Fixed dependencies between packages ([d6de89f](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/d6de89f))


### Features

* **Chooser:** DataSource support for Component ([31be342](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/31be342))
* **data source:** Core implementation of DataSource ([48ab95c](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/48ab95c))
* **datatable:** Added a number of datatable functionalities. ([bb45242](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/bb45242))
* **datatable:** Change DT to use fully DataSource ([b7e7fc3](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/b7e7fc3))
* **datatable:** Implemented Datatable Datasource ([f6af51e](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/f6af51e))
* **dialog, confirmation, and overlay:** Add new these new components. ([1ffdf60](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/1ffdf60))
* **metaui:** @Output() bindings support ([22887f6](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/22887f6))
* **scrollable:** Implemented scrollable container ([23aeb32](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/23aeb32))



<a name="0.15.1"></a>
## [0.15.1](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.15.0...0.15.1) (2017-08-30)


### Bug Fixes

* **angularCli:** suppress circular dependency warning ([9fd12a6](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/9fd12a6))
* **meta include:** Update dynamic Input binding to read also "editing" property ([c4aa3ad](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/c4aa3ad))
* **meta-section:** Meta section can now propagate editability back to its context ([136d18a](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/136d18a))
* **section component:** Don't apply blue border for EditMode=External and fixed styling issue with cursor ([0abdab1](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/0abdab1))


### Features

* **Add state to Object Page Wrapper:** Added a state features for object page wrapper ([0b6c0db97](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/dc714be9d1b591923c738a9a60af60c0b6c0db97))
* **Stepper Component:**  added stepper component ([45eff4f1c8](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/721b0165407be01e0c3d4d8f7eab7345eff4f1c8))

<a name="0.15.0"></a>
# [0.15.0](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.14.3...0.15.0) (2017-08-28)


### Bug Fixes

* **date component:** Removed dependency on the ui-fluid style and default formatName when we show time ([099fd81](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/099fd81))
* **GenericChooser demo:** Fixed chooser on the component demo page ([630bf3a](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/630bf3a))
* **main readme.md:** Updated to capture latest changes and fixed several outdated statements ([3e88389](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/3e88389))
* **meta rules:** Update OSS rules loading to support rule redefinition ([fe2917f](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/fe2917f))
* **metaui:** Support for nested object rendering ([e44fc61](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/e44fc61))
* **object page wrapper:**  Made improvements based on code review. ([7dc41de](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/7dc41de))
* **packaging:** Updated build script to inline correct stylesheet version ([3e4675b](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/3e4675b))
* **page content:**  fix host style so that it can expand the whole page. ([5708b37](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/5708b37))
* **section and date time:**  section restyling the button to have a smaller size. date time emit onChange event. ([eca4ab8](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/eca4ab8))


### Features

* **meta section:** Support for meta Sections ([a0ded90](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/a0ded90))
* **metaui:** [@Output](https://github.com/Output)() bindings support ([1696611](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/1696611))
* **section:**  added support for no title and description display of section. ([b7d6c45](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/b7d6c45))



<a name="0.14.3"></a>
## [0.14.3](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.14.2...0.14.3) (2017-08-18)

### Bug Fixes

* **cli:** Updated aribaui scripts ([d085226](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/d0852260d6985b55a796132ce815b98c293e44cf))


<a name="0.14.2"></a>
## [0.14.2](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.14.1...0.14.2) (2017-08-17)


### Bug Fixes

* **dependencies:** Fixed dependencies between packages ([44cfc68](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/44cfc68))



<a name="0.14.1"></a>
## [0.14.1](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.13.4...0.14.1) (2017-08-17)


### Bug Fixes
* **cli:** Updated aribaui cli to reflect latest path changes and upgraded version + added postInstall script into core package ([e1e38a4](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/e1e38a4))



<a name="0.14.0"></a>
# [0.14.0](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.13.4...0.14.0) (2017-08-16)


### Bug Fixes

* **aot:** Improvements and refactoring to support offline compilation ([e1e38a4](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/e1e38a4))
* **aot:** Updated source to resolve some of the compilation errors that were in the template ([b3664e4](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/b3664e4))
* **checkbox:** Updated JS doc with usage example ([47028cc](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/47028cc))
* **checkboxlist:** Updated Checkbox List with new component CheckboxComponent and fixed some of the tests to reflect this. ([9023490](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/9023490))
* **chooser:** Updated Chooser Styling and behavior fixes  for multiselect as well as single select ([5e1f328](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/5e1f328))
* **components:** Updated components prefixes from w- to aw- ([d49cc9d](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/d49cc9d))
* **currency:** Updated currency styling and its dependent components (dropdown). ([4fe4845](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/4fe4845))
* **currency:** Updated styles for the smaller resolutions. ([9da38d3](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/9da38d3))
* **dropdown:** Updated styling and fixed embedded template for dropdown ([f9e0f1d](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/f9e0f1d))
* **formatting:** Refactor code  & test based on linting errors ([d9267c8](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/d9267c8))
* **lint:** Fixed lint formatting as comment for TextAreaComponent was over 100 ([3a73276](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/3a73276))
* **notification:** Updated DefaultHttp and GlobalErrorHandler with new notification service ([210280e](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/210280e))
* **radiolist:** Updated Radiobutton List with new component RadioButtonComponent and refactored tests ([f8af29d](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/f8af29d))
* **richtext:** Renamed EditorComponent to RichTextArea component ([7b92b30](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/7b92b30))
* **section:** Updated SectionComponent with option to add custom edit action with custom behavior ([beb6dc2](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/beb6dc2))
* **test:** Refactored all the test to speed up the execution. ([f9e4015](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/f9e4015))


### Features

* **app module:** Added new module to be used for specific Ariba application code. ([bdd643d](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/bdd643d))
* **appConfig:** Support global configuration using script tag ([163832a](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/163832a))
* **checkbox:** Implemented checkbox component on top of PrimeNG ([4ae6fb3](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/4ae6fb3))
* **components:** Implemented new outline control component ([44a48e7](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/44a48e7))
* **core:** Created AribaApplication class/component which can be used as a root class to initialize application with common behaviors. ([2ba2216](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/2ba2216))
* **datepicker:** Added new styling for date component ([6b7f818](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/6b7f818))
* **dialog, confirmation, and overlay:** Add new components. ([bd18eee](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/bd18eee))
* **lib:** Updated to Angular-Cli 1.2.3 + Latest Angular 4.3.1 ([c221877](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/c221877))
* **lib:** Updated to PrimeNG 4.1.1 ([e6aa5a2](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/e6aa5a2))
* **metaui:** Added ability for custom global user rule files and changed the way we register user rules ([b7dc516](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/b7dc516))
* **mock server:** Added Mock Server functionality for the application. ([b295d3b](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/b295d3b))
* **notifications:** Created generic publish/subscribe event bus service to support application messaging ([4fed720](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/4fed720))
* **object-detail-page:** Added new functionality to object details page. ([b6b126f](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/b6b126f))
* **page-header & page-footer:** redesigned page-header and page-footer component. ([0ea6bc3](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/0ea6bc3))
* **radio:** Implemented radio button component on top of PrimeNG ([9965bde](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/9965bde))
* **rest:** Updated a way how we deal with object that are received and sent. Enable conversion json->typed class ([f0538d7](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/f0538d7))
* **section:** Added editability support ([c9bc6fb](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/c9bc6fb))



<a name="0.13.4"></a>
## [0.13.4](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.13.3...0.13.4) (2017-06-08)


### Bug Fixes

* **components:** Fixed FormRow component where we set now correct field size even for labels on 
top 
layouts. ([1fdf388](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/1fdf388))
* **demo-page:** Updated build number to reflect latest version of the AribaCoreUI ([c39aba6](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/c39aba6))



<a name="0.13.3"></a>
## [0.13.3](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.13.2...0.13.3) (2017-06-08)


### Bug Fixes

* **components:** Fixed calendar widgets and layout changes ([75bfdd8](https://github.wdf.sap
.corp/core-ui-platform/AribaCoreUI/commit/75bfdd8))



<a name="0.13.2"></a>
## [0.13.2](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.13.1...0.13.2) (2017-06-08)


### Bug Fixes

* **components:** Fixed calendar widgets as it did not work properly on selection and change was not propagated + updating formating ([91265f8](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/91265f8))
* **metaui:** fixed editability for MetaUI. ([b01166b](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/b01166b))


### Features

* **components:** This is major improvement that changes the way we treat editability. This let each FormTable to control its own editability ([850a47b](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/850a47b))



<a name="0.13.1"></a>
## [0.13.1](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.13.0...0.13.1) (2017-06-07)


### Bug Fixes

* **components:**  Updated ChooserComponent as it was not working properly after upgrading to primeng 4. ([180f3e8](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/180f3e8))
* **components:** Fixed Chooser and Generic chooser after updating to angular 4 and primeng 4. ([4f36fc9](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/4f36fc9))
* **components:** Making adjustments to ForRow and its spacing to properly space the field in LabelOnTop layout as well update playground to reflect the changes. ([8c716ae](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/8c716ae))
* **metaui:** Fix LabelsOnTop layout when applied to user rule. ([46b8b1f](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/46b8b1f))
* **metaui:** Fixed 3 columns layout process as well as formTable where I had to change the Content Queries to execute inside  AfterContentInit ([8792ce6](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/8792ce6))
* **style:** Adjusting styles that breaks calendar widgets and form row ([39e45b8](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/39e45b8))
* **style:** Lint error fixes ([95813f0](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/95813f0))



<a name="0.13.0"></a>
# [0.13.0](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.12.0...0.13.0) (2017-06-05)


### Bug Fixes

* **components:** updated formRow with different default high ([5529d8e](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/5529d8e))


### Features

* **components:** Refactored FormTable to support 3 column layout, updated metup and add ariba theming ([93975f9](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/93975f9))
* **widgets:** Implemented outline control ([3c8b798](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/3c8b798))
* **widgets:** Updated and refactored date and time widgets to be aligned with design. ([a32e017](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/a32e017))



<a name="0.12.0"></a>
# [0.12.0](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.11.2...0.12.0) (2017-05-22)


### Features

* **library:** Updated to latest _angular 4.1.0_ ([e46481a](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/e46481a))


### Breaking Changes

* Since we upgraded to Angular 4+ we are on typescripts 2.2+  many things might not work for 
you.
  * such as any `<template>` usage as it was changed to `<ng-template>`
* Modules: _Core, Components and MetaUI_ were refactored and MetaUI does not export _Core, Components_
 anymore. You need to import them explicitly.
* When you import AribaCoreUI module the i18n is always enabled 
  
```ts

  imports: [
        AribaCoreModule.forRoot({'i18n.enabled': true}),,
        AribaComponentsModule,
        AribaMetaUIModule,
     
    ],
```

* Many _node_modules_ dependencies changed as well. Please check the package.json of this project
 for recommended version. 
  
 
 
    
 



<a name="0.11.2"></a>
## [0.11.2](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.11.1...0.11.2) (2017-03-22)


### Bug Fixes

* **ariba-cli:** updated paths in the install scripts to refer to correct css paths. ([ac1f6c2](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/ac1f6c2))



<a name="0.11.1"></a>
## [0.11.1](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/compare/v0.11.0...0.11.1) (2017-03-22)


### Bug Fixes

* **metaui:** Safari fix that caused many troubles when recalculating rules. ([c31176e](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/c31176e))
* **metaui:** updated meta element list  - fix [style] to ngStyle ([49aeafd](https://github.wdf.sap.corp/core-ui-platform/AribaCoreUI/commit/49aeafd))



<a name="0.11.0"></a>
# [0.11.0](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/compare/v0.10.0...0.11.0) (2017-03-17)


### Bug Fixes

* **libs:** Changed dependency of rxjs to ^ ([a085b8b](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/a085b8b))
* **lint:** Fix formating based on the LINT rules ([ee041b2](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/ee041b2))
* **meta:** Refactored to be compliant with typescript 2.1.0+ ([ccf7b87](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/ccf7b87))
* **test:** Updated test cases for PrimeNg 4. ([41a077f](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/41a077f))


### Features

* **i18n:** Updated to "[@ngx](https://github.com/ngx)-translate v6.0 ([bdaf834](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/bdaf834))



<a name="0.10.0"></a>
# [0.10.0](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/compare/0.9.0...0.10.0) (2017-03-05)


### Bug Fixes

* **core:**  fixes for include components and dynamic component instantiations ([4004d76](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/4004d76))
* **metaui:**  Updated Playground examples ([4e878d1](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/4e878d1))


### Features

* **metaui:** Added limited support for modules & created playground example demostrating it. ([b8567f9](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/b8567f9))



<a name="0.9.0"></a>
# [0.9.0](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/compare/0.8.1...0.9.0) (2017-02-18)


### Bug Fixes

* **oss:** KeyData fix bitwise operation when calculating a mask for integer (N % 32) == 0 
([4cb4daf](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/4cb4daf))
* **oss-action:** Updated rules for Action Layouts ([9fef100](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/9fef100))
* **rules:** This commit primary fixes problem with dynamic fields when they are re-rendered ([d86e125](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/d86e125))
* **sources:** tslint updates ([f551474](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/f551474))


### Features

* **angular-cli:** Update Angular-cli version to .30 ([7814001](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/7814001))
* **aribaui:** Updated to Angular CLI  # 30 ([4ae2dcd](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/4ae2dcd))
* **oss:** Support for OSS layout ([ce6083f](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/ce6083f))
* **oss-action:** This commit introduces actions support for the MetaUI layer ([77532db]
(https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/77532db))



<a name="0.8.1"></a>
## [0.8.1](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/compare/0.8.1...0.9.0) (2017-02-06)


### Bug Fixes

* **configuration:** added repository to package.json ([5a91495](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/5a91495))
* **configuration:** pushed last missing files ([1bd2824](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/1bd2824))
* **i18n:** Fixed loading of localized resources. ([0e5543e](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/0e5543e))
* **i18n:** Fixed loading of localized resources. ([59d8675](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/59d8675))
* **rules:** moved index.html to serve pages from github ([0d3b25c](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/0d3b25c))
* **rules:** Remove rules folder ([be57c27](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/be57c27))
* **widgets:** translation service to ignore properties during psudo localization. ([abbdfcb](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/abbdfcb))


### Features

* **configuration:** app version added to demo page ([e64a322](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/e64a322))
* **docs:** Updated Readme.md with Quickstart guide, created new playground module ([1901496](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/1901496))
* **widgets:** CurrencyComponent and CurrencyFormatter supports localization. ([3d51a4c](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/3d51a4c))
* **widgets:** DatePicker is now fully localized and playground page is updated ([9572152](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/9572152))



<a name="0.7.2"></a>
## [0.7.2](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/compare/0.8.1...0.9.0) (2016-11-29)


### Features

* **doc:** Updated documentation ([2af6cdc](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/2af6cdc))
* **doc:** Updated documentation 2 ([ec90698](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/ec90698))
* **tools:** Added changelog script based on Angular CLI ([9084114](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/commit/9084114))



<a name="0.7.1"></a>
## [0.7.1](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/compare/0.8.1...0.9.0) (2016-11-29)



<a name="0.5.1"></a>
## [0.5.1](https://github.wdf.sap.corp/core-ui-platform/AngularMetaUI/compare/0.8.1...0.9.0) (2016-11-22)



