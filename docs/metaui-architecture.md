# MetaUI Architecture

This document describes `MetaUI framework` fundamentals and also shows you the implementation aspects in the 
Typescript (Javascript) environment, what are the limitations and workarounds that we need to follow. 


_`Note: If you are trying to integrate MetaUI into your project you might want to read this document first!`_

[GETTING-STARTED.md][1]


Let's start with this simplified picture:

![alt text](./meta/meta-1.0.png?size=small "High Level Diagram")

We can see 3 big pieces  here that makes `MetaUI` framework what it is. So Let's start from the bottom:

#### Rule Engine

_Rule engine_ is implemented by `UIMeta` class along with other helper classes and here we accepts different assignments passed 
from _UIContext_ and evaluate the best possible match and return set of properties which are used later on to 
render _User Interface_.  The same way you would expect any Internet Browser to work when parsing CSS. Simple right ?

Rules are loaded from the `files` as well as from `objects` by introspecting typescript class and trying to figure 
some info about the objects such as data types. This is why _Domain Object_ implements interface `Deserializable` 
for retrieving types. 


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
   ...

```


But to load rules from the files we use different method. OSS files are compiled to the 
TS class and then are packaged along with the application. This is why we have in the `playground` or 
in the `metaui-evolution` app file called `user-rules.ts` which references all the available rules and then 
inside our module we have this line:

```ts
    import * as userRules from './user-rules';
``` 

which registers this within the `AppConfig` and `Rule engine` can then iterate over all the compiled rules, load, index and 
store them locally.



#### UI Context

`UI Context` is used to communicate with the `Rule Engine` and to hold stack of current assignments those that 
you push using `MetaContext` component.



```html
   <m-context [object]="userObject" operation="edit" layout="Inspect">
        <m-include-component></m-include-component>
   </m-context>

```

When you use above HTML fragment it treats bindings as a list of key/values and results following calls:


```ts
    context: Context = ...    
    //context.set(key, value);
    context.set('layout', 'Inspect');
    context.set('operation', 'edit');
    context.set('object', userObject);
    
```

Every `.set()` call pushes key /value property onto the Stack (`Context`) followed by passing it the `Rule Engine` to get back a  result which is cached and properties are retrieved.

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

Once rules are evaluated and list of properties is retrieved then the `MetaIncludeComponent`
will take care of the rest.

Here you can notice the second line the `<m-include-component>` that reads generated properties. Therefore the wrapping element
`<m-context>` is responsible for pushing and the `<m-include-component>` is here for collecting whatever is available 
and rendering UI.
 

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


After a quick introduction, let's look at this old picture that takes us one level down. Even I am not really _Michelangelo_
I hope we can get some information out of it. 


![alt text](../../../docs/img/meta/meta-1.1.jpg "Sketch")

Let's start from the top left corner:

1) We push 3 assignments using ` <m-contex>` 
2) Value is pre-processed and push one by one to the Stack
3) Inside our Stack `(Context)`, we check and try to retrieve existing Activation which is sharable object
that holds Assignments hierarchy
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

As already mentioned above we can not simply load a rule file from the system since it's running inside 
a browser but we do take the `OSS file` and compile it, it outputs `TS file`, which is then bundled as a part of the project.

For example something like this:

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

is converted into something like this a Map-like format:

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

And this TS content is then read by our special loader `RuleLoader` which registers them with the rule 
 engine (the `Meta` class).
 
```ts

export interface RuleLoader
{
    loadRules (meta: Meta, source: any, module: string, onRule: (rule: Rule) => void): void;
}

```

Therefore we are using following directory structure. Here we store `Rule files (.oss)`

![alt text](./meta/meta-1.2.png?size=small "Directory structure")

and barrel `index.ts` that just exports all from this directory. It is worth mentioning that you can pick any structure 
you want as long you can have one file at the end like `user-rules.ts` that exports everything so it can be imported 
and used in the app module. The rest is standard cli's project.

Everytime you change rules, you just run a OSS compiler.

_You can see how its used in the packages.json_

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

**Even there is a activity in progress where we try to finish a parser in TS** (there is a branch called compiler) , but it does not go as fast as I 
would like to. Maybe we will drop OSS completely and we will try to replace it somehow with TS support to define system level as well as user level 
rules. 



### Domain object introspection

Just like in css world where you define CSS selectors and you try to match against these selectors your HTML along with some other context properties the same 
works here. 

So far we loaded and registered `OSS files (TS files) ` and now we need to introspect object to understand its internal structure so we 
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


[1]: https://github.com/ngx-meta/rules/blob/master/docs/OSSRules.md























