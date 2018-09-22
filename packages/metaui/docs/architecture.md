# MetaUI Architecture

This document describes `MetaUI framework` architecture and shows you how to use it in
Typescript (Javascript) environment. In addition, it outlines the current limitations and provides few workarounds.


_`Note: Please read this document first when integrating your project with MetaUI!`_



Let's start with this simplified picture:

![alt text](../../../docs/img/meta/meta-1.0.png?size=small "High Level Diagram")

The 3 main modules that compose `MetaUI` framework. So Let's start from the bottom:

#### Rule Engine

_Rule engine_ is implemented by `UIMeta` class along with other helper classes. It accepts assignments (Ex: {object: user})
from _UIContext_, evaluates the best possible match and returns a set of properties used to  render _User Interface_.  
This is analogous to how CSS works. CSS are rules that apply to a DOM element. Multiple CSS could target an element and the css rule engine determine which style takes precedence.

Rules are defined in `files` and loaded during startup.  They are applied to properties derived from `objects` by introspecting their typescript class. For example, a field on object, `User.lastLogin`, can have `Date` type.
Afterward, a rule can be apply to this field type specifying the browser to render the field with a DateTime Picker. This is why _Domain Object_ implements interface `Deserializable` 
for retrieving types.  You might also notice there's `$proto()` method, it was used before but will be removed soon.


```ts

export class User implements Entity
{


    constructor(public uniqueName?: string, public firstName?: string,
                public lastName?: string, public age?: number, public dob?: Date)
    {
    }

    identity(): string
    {
        return this.uniqueName;
    }


    /**
     * Used by MetaUI
     *
     */
    getTypes(): any
    {
        return {
            uniqueName: String,
            age: Number,
            firstName: String,
            lastName: String,
            dob: Date
        };
    }

    /**
     * Used by MetaUI
     *
     */
    $proto(): User
    {
        let user = new User();
        user.uniqueName = '6';
        user.age = 1;
        user.firstName = 'a';
        user.lastName = 'a';
        user.dob = new Date();
        return user;
    }
   ...

```


In order to load rules from files, they are first compiled to TS class and then packaged with the application. Examples of the compiled TS classes can be seen in `playground` and 
 `metaui-evolution` app. See `user-rules.ts`, it references all the pre-defined rules and import user defined rules with this line:

```ts
    import * as userRules from './user-rules';
``` 

All rules are registered with `AppConfig` and `Rule engine` will iterate over all the compiled rules, index and store them locally.



#### UI Context

`UI Context` communicates with the `Rule Engine` and holds a stack of current assignments that were pushed via the `MetaContext` component. 



```html
   <m-context [object]="userObject" operation="edit" layout="Inspect">
        <m-include-component></m-include-component>
   </m-context>

```

The above HTML fragment treats bindings as a list of key/values and results following calls:


```ts
    context: Context = ...    
    //context.set(key, value);
    context.set('layout', 'Inspect');
    context.set('operation', 'edit');
    context.set('object', userObject);
    
```

Every `.set()` call pushes key /value property onto the Stack (`Context`). This context is passed to the `Rule Engine` and gets back a list of properties.

Example of retrieved properties:

```
        {
        'visible': true,
        'class_trait': 'fiveZones',
        'editable': true,
        'bindings': {
            'value': 'Default Title'
        },
        'field_trait': 'required',
        'label': 'Title',
        'type': 'string',
        'required': true,
        'editing': true,
        'valid': '{{(value && value.length > 0) ? true : \'Answer required\'}}',
        'component': 'InputFieldComponent',
        'field': 'title',
        'layout_trait': 'Form',
        'trait': 'required',
        'rank': 20,
        'after': 'zLeft',
        'class': 'CheckRequest1'
    }

```

#### UI Generation

After rules are evaluated and properties are retrieved, next the `MetaIncludeComponent` will take care of the remaining work to render UI.

Looking at the html below, `<m-context>` gathers all the properties from the evaluation of `object`, `operation` and `layout` and passes them to the `<m-include-component>` 
`<m-include-component>` will read these properties and render the UI.
 

```html
   <m-context [object]="userObject" operation="edit" layout="Inspect">
        <m-include-component></m-include-component>
   </m-context>

```

This gives you possibility to put in additional content around the `<m-include-component>`: 

ex.:
```html
   <m-context [object]="userObject" operation="edit" layout="Inspect">
        
        <h2> User Detail Page: </h2>
    
        <m-include-component></m-include-component>
        
        <user-org-chart [user]="userObject" ></user-org-chart>
   </m-context>

```

To render a UI we use Angular's API (`ComponentFactoryResolver`, `ViewContainerRef`) and some DOM native operations.


**Example**


After a quick introduction, let's look at this design diagram that takes us one level down. Even I am not really _Michelangelo_
I hope we can get some information out of it. 


![alt text](../../../docs/img/meta/meta-1.1.jpg "Sketch")

Let's start from the top left corner:

1) We push 3 assignments using ` <m-contex>` 
2) Value is pre-processed and push one by one to the Stack
3) Inside our Stack `(Context)`, we check and try to retrieve existing Activation which is sharable object that holds Assignments hierarchy
4) If it does not exists we initiate `match`
5) Before it reaches Indexed KEYDATA store (completely on the right), on its way it broadcasts several notifications (see the phone)
6) These notification are received by Observers that are responsible to pre-load and register
new rules relevant to current data
7) `Rules Engine` gives back `Value Matches` which is at this point just pointers to RuleDB (not real properties)
8) Assignment is created and its cached. If additional rule chaining needs to happen it is here, where certain
properties are mirrored and pushed again to (step #1)
9) If no further chaining is needed we cache `Activation` for later use (step #3)
10) Retrieve and convert match result to real properties that are used to render UI.
 

## Typescript specifics


### Rule file loading

For performance reasons, rule files aren't loaded directly from the server, but they are compiled into Javascript objects, 'TS files', and bundled together with the project.

For example: rules applying to an order object:

```js
class=Order {
     @field=title#derived {
        type:String;
        value:${"Purchase Order: " + object.name };
        bindings:{
            useNoLabelLayout:true;
        }
        wrapperComponent:GenericContainerComponent;
        wrapperBindings: { tagName:h2; }
    }

    field=uniqueName {
        label:"PO #"
    }

    field=description {
        bindings: {
            styleClass: 'u-description';
        }
    }
    ...
  }
```

is compiled into OrderRule object:

```
/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const OrderRule = {
 	oss:			[
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'Order',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'Order',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'title',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'wrapperComponent': 'GenericContainerComponent',
			      'wrapperBindings': {
			        'tagName': 'h2'
			      },
			      'bindings': {
			        'useNoLabelLayout': true
			      },
			      'trait': 'derived',
			      'type': 'String',
			      'value': {
			        't': 'Expr',
			        'v': '"Purchase Order: " + object.name'
			      }
			    }
            ..
         }			    			    
   ]

```

Afterwards, `OrderRule` is read by `RuleLoader` which registers it with the rule engine (the `Meta` class).
 
```ts

export interface RuleLoader
{
    loadRules (meta: Meta, source: any, module: string, onRule: (rule: Rule) => void): void;
}

```

Therefore we are using following directory structure. Here we store `Rule files (.oss)`

![alt text](../../../docs/img/meta/meta-1.2.png?size=small "Directory structure")

and barrel `index.ts` that just exports all from this directory. It is worth mentioning that you can pick any structure 
you want as long you can have one file at the end like `user-rules.ts` that exports everything so it can be imported 
and used in the app module. The rest is standard cli's project.

Everytime you change rules, you need to run a OSS compiler on it.

_Here's how it's used in the packages.json_

```
java -jar lib/meta-ui-parser.jar --gen --user ./packages/metaui/src/core ./modules/metaui-evolution/src/app/rules

java -jar <PATH TO meta-ui-parser> --gen --user <PATH to the system rules> <DIRECTORY WITH YOUR USER FILES>

if you are using it in your application then it will be probably something like: 

    =>  <PATH TO meta-ui-parser> - node_modules/@aribaui/resources/tools/oss/meta-ui-parser.jar
    
    => <PATH to the system rules> -   node_modules/@aribaui/metaui/core

    => <DIRECTORY WITH YOUR USER FILES> -   ~/<PATH TO YOUR PROJECT>/src/app/rules
    
ex: 

java -jar node_modules/@aribaui/resources/tools/oss/meta-ui-parser.jar --gen --user node_modules/@aribaui/metaui/core ~/<PATH TO YOUR PROJECT>/src/app/rules
    
```

Once you run this command it will create `ts` directory under the `<DIRECTORY WITH YOUR USER FILES>`


`Note: Rules are loaded lazily so a specific rule file for example the  order.oss (order.ts) is loaded after you really push Order object to a stack`

**There is on going work to port the rules parser to TS** (there is a branch called compiler). 
With the new parser in TS, MetaUI can load rule's files directly into the client and support system level as well as user level rule's updates on the fly. 



### Domain object introspection

Just like in css world where CSS selectors match against HTML and attribute on a page, Meta Rules works the same way to match again your domain object.  

So far we've loaded and registered `OSS files (TS files) ` and now we need to introspect object to understand its internal structure so we 
can register additional rules that are not covered by our `OSS files`.


Let's remember OSS stands for `Object style sheet`, meaning there is the same analogy with CSS:

* You first need to have rules in place
* You throw in an `Object` and a selector(s) are matched
* It returns properties that are defined under these selectors. 
* Properties are picked by `m-include-component`
* UI is rendered


Some example how we register rules for specific object:

```ts

// IntrospectionMetaProvider.ts

private registerRulesForFields(object: any, className: string): void {
        let fieldNames =...

        let rank = 0;
        for (let name of fieldNames) {
            ...
            let type = instance[name]. => GET TYPE
            let properties = new Map<string, any>();

            properties.set(ObjectMeta.KeyField, name);
            properties.set(ObjectMeta.KeyType, type);
            properties.set(ObjectMeta.KeyVisible, true);

            // if we are dealing with array we need to know a type of actual element
            if (isArray(instance[name])) {
                ....
                properties.set(ObjectMeta.KeyElementType, collectionElementType);                
            }

            // create programatically selector and proeprties
            let selectorList: Array<Selector> = [
                new Selector(ObjectMeta.KeyClass, className),
                new Selector(ObjectMeta.KeyField, name),
            ];            
            properties.set(ObjectMeta.KeyRank, (rank++ + 1) * 10);
            let rule: Rule = new Rule(selectorList, properties, ObjectMeta.ClassRulePriority);
            this._meta.addRule(rule);
        }
    }
}

```

This way we automatically pre-register additional rules for  an `Object` such as data type for class field.
























