# Rules UI for Angular (MetaUI)



## Table of Contents

* [Description](#description)
* [What is our Goal](#what-is-our-goal)
* [How to obtain support](#howto-obtain-support)
* [License](#license)





## Description

**MetaUI** is set of API and components which uses your model (in this case _model_ is your domain object and meta data 
describing this object - called Meta Rules) to dynamically assemble User Interface for you on the fly without templates. 
Rather than letting you layout your fields for every usecase. 

This project is based on our original work of the `@aribaui` and the `MetaUI` was extracted out in order to give it attention 
it needs and mainly focus to make it lightweight framework without any UI dependencies like it is now.

You can also read more in the [High Level Architecture][1].


### Why MetaUI

```
Most of the UI code written in traditional frameworks is a mechanical application of 
(unstated) rules rooted in the domain object data model.
  						            
  						            -- Craig Federighi 	
```


### What is our Goal

We will be executing this project in 3 stages, which will gradually add tons of new features and as well as add enterprise 
robustness.


#### Stage #1 - Initial Setup
* New project structure 
* Basic documentation
* Schematics tools to make the start easier
* Hook in CI + publish initial version

#### Stage #2 - Detach MetaUI from UI

* Separate MetaUI from its UI layer
* Make UI plugable to be easily extended by any UI framework
* Create two default implementations for PrimeNG & Material  


#### Stage #3 - OSS Files and its next stage


- Analyze in more details OSS and how it could be replaced with more natural tools that TS gives us
- Ability to register rules on the fly from the server 
- Since metadata deals with dynamic object we need to answer how any schema changes will propagate to the UI without changing single line
- Client side / server side data validation
- Ability to generate default views out of the domain objects (master-detail view (list view), detail view, etcs.)
- How to deal and handle different customer customization and differences from the out of box solution. 
-  Let customers and third parties defines their own conditions (visibility, validity, editability) and actions
    - This one of the major need for enterprise you need to allow custom fields to be added on top of your domain objects with its own behavior.
- Define best practices in terms of how to structure an application having default set of rules, and application rules and customer rules.
- MetaUI Inspector
   -  At this point we will support heavy enterprise customization we need the inspector that tells us how a single element / component was 
   rendered so we need to be able to print the whole stack and assignments and rules. Something like CSS inspector.



## How to obtain support

Please stay tuned we will create necessary social channels to communicate out news as well to listen all your questions

 [1]: https://github.com/ngx-meta/rules/blob/master/packages/metaui/docs/architecture.md
 
  

 
 
