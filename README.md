# Core UI  - Angular 


Based on our Ariba's past effort and its unique framework called _AribaWeb_ we are bringing over one of 
its core library called **MetaUI** along with some other additional packages (core, components) 
into Angular world based fully on typescripts. 

<small>_Credit:  Based on original work: MetaUI: Craig Federighi (Ariba 2008)_</small> 


### What is core UI about
Our current focus can be broken down into 3 main areas:
 
 * **Core UI framework** providing reusable API which gives you additional layer on top of angular:
    * i18n support
        * hopefully this can be replaced by native Angular i18n support.    
    * App Configuration & bootstraping
    * Wrappers and services to work with restful API    
    * Convenient utility API for collections, language based operations
    * Unified Error management and Handling
 *  **UI Components** providing set of services and reusable components
    * Layouts
    * Widgets
    * Offers basic set of widgets which extending existing 3th-party libraries http://www.primefaces.org/primeng/ to match our custom usecases. 
    * Error handling
    * Formatters
    * Dom Utilities
 * **Meta UI** is our biggest thing which can assemble UI for you using rules
    * MetaUI is set of API and components which uses your model (in this case model is your domain 
    object and meta data describing this object - called Meta Rules) to dynamically assemble User 
    Interface for you on the fly without templates. Rather than letting you layout your fields 
    for every use case.
    
    
    

## What is our GOAL
Our mission is pretty simple! Introduce one core framework which helps you generate applications on 
the fly (declaratively) using only Rules (please see above MetaUI). To accomplish this we are 
building necessary components and API giving full stack support.
What is not our goal is to build just like we did for AW rich component libraries when something 
is already out-there. Therefore we did several evaluation between different 3th-party libraries 
which are available today (10/2016 - 01/2017) to help us ramp up quickly instead of spending a year 
trying to achieve the same ourself.  

Later on **MetaUI** must be independent from any component or widget framework.


## Feedback
Project is currently under active development and we welcome any feedback and mainly help in 
terms of extending current functionality or updating existing in order to improve its quality.



## To Get started

Install npm packages:

```
    npm install --no-audit
```

Build for first time:

```
    npm run build
```


Build for first time:

```
    ng serve
```


Now access [http://localhost:4200/play][6]


To read more about MetaUI:  [MetaUI.md][5]


    
 [5]: MetaUI.md
 [6]: http://localhost:4200/play
 
 
 
 
 