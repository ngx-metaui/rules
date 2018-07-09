# core
 
 + Core module contains common functionality including:
 
**Configuration and bootstrapping** (`config/`)
* This folder contains useful services to initialize your application and pass some static 
properties into your application both during initialization and runtime.
    
_**e.g:**_     
```ts
imports:      [
    BrowserModule,
    AribaCoreModule.forRoot({
      'app.title': 'My first application'
    })
```    


    
```ts
    export class AppComponent {
      title = 'app';
    
    
      constructor(appConfig: AppConfig) {
        console.log(appConfig.get('app.title'));
      }
    }    
``` 

  
**Domain object and REST API** (`domain/`)

* We have two main types of domain object `Values` and `Entities`
    * `Entity` is a domain object that has its own unique identifier so their instances are uniquely
    identifiable across their type and space
    * `Value` object as compared to `Entities`  they dont need to be unique and Value objects are usually immutable. 
    They are always part of the entity. They dont live outside and by themself  
* Both of them are deserializable so if you implement your domain structure correctly there is `Resource` service
that can make your live easier. For example let's consider we have this User object. 
You just need to say that User is a `Entity`
     

**e.g:**

```ts
class User implements Entity
{

    uniqueName: string;
    created: Date;


    identity(): string
    {
        return this.uniqueName;
    }

    getTypes(): any
    {
        return {
            created: Date,
        };
    }


    $proto(): Entity
    {
        return null;
    }

    className(): string
    {
        return null;
    }
}
```

and then you can use `Resource` service to retrieve your domain object from server 
and convert them into correct types. 

* `Resource` service provides fluent and high level API on top of HttpClient so you dont
assemble URL traditional way rather more fluentish and functionalish way, working with real data types
such a Value and Entity.
 
  *  To simply assemble following URL http://api.ariba.com/myService/v1/requisitions/123 and
       and fetch Requisition data:
     
     
```ts  
   let r: Resource
 
   r.load()
    .resource(Requisition)
    .withId('123')
    .asEntity<Requisition>((r: Requisition) => receivedR = r);
 
```  
 
 * You you can simply read it: _Load resource `Requisition` with ID **123** and return this as `Entity`_
 * For more information please checkout `domain/resource.service.ts`
        

**HTTP services** (`http/`)
* This folder contains useful implementation of HTTP service but as of ``Angular 4.3+`` we will 
be deprecating it in favor of Http Client API
* Another key service is the mock server to simulate HTTP
 communication if not connected to REST backend (this is not for the unit tests)
    * Todo: we need to update this to use latest ``Http client API``
    
To use it define your routing for given entity. e.g.: Under the `assets/mock-routing` folder 
create `json` files per resource 

_users.json_

```json

{
  "resource": "users",
  "routes": [
    {
      "path": "/users",
      "method": "GET",
      "responseCode": 200,
      "data": [...]
```

and then you turn this on when importing your `AribaCoreModule` at the root level


```ts
        AribaCoreModule.forRoot({           
            // turning on our MockServer
            'connection.mock-server.enabled': true,
            // What routes we should register
            'connection.mock-server.routes': ['users'],

        })
```

and any call will be redirected thru this Mock server
    
**Internationalization services** (`i18n/`)
    
* Implementation of basic `i18n` loaders. _I18n_ is backed up by `@ngx-translate/core` but ideally we
 want to migrate to native support that `angular` and `angular-cli` provides now.

* Every component that needs to support some translation needs to define just `assets/` folder 
with a resource files

```
    /<component-name>/assets/
                         i18n/
                            en/
                              resource.widgets.<component-name>.json       

```
and extends loader to load this new file. 
* Need to improve this in the way that `Loader` will load only 1 one library resource file. 
    * _todo:_ update gulp tasks to merge all resource.widgets.<component-name>.json files into one.
    
    
**Messaging** (`messaging/`)
* Notifications service is a implementation of the publish/subscribe event bus for publishing
   and listening for application level events.
   
**e.g.:**
```ts
notifications.subscribe('user:signed-in', (message: any) =>
               {
                   // load user profile
               });

```   
 
  
 **Utilities** (`utils/`)
 * Set of reusable globals originating from the `Angular` and extended, something that every 
 application needs and you use on daily basis. 
  * This includes global language functions to work with types and collections and much more.