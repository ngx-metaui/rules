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