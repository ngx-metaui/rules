# Rules UI for Angular (MetaUI)



## Table of Contents

* [Description](#description)
* [Project plan](#project-plan)
* [How to obtain support](#howto-obtain-support)
* [License](#license)





## Description

**MetaUI** is set of APIs and components that dynamically generates User Interface based on your object model (JSON object + its type).
It does so without developers having to layout components in template files. MetaUI uses rules (Meta Rules) to generate the UI.

This project is based on our original work on `@aribaui` and `MetaUI`. The MetaUI portion have been extracted and ported to Javascript. 
Our goal is make it lightweight, framework and component library agnostic. It transforms the typical UI development model from one where
a developer layouts out all UI components in multiple template files to one where a developer defines rules and leverages MetaUI engine to
create UI. MetaUI rules can be applied universally or to a specific object.

You can also read more in the [High Level Architecture][1].


``Sections below focus on the _MetaUI_ therefore it is recommended that you watch our online presentations that give
you some ideas about Rule driven User Interface.

_Links refer to our original repo:_

 - [Introduction declarative UI](https://www.youtube.com/watch?v=-Bv_ceUn1K8) ([Demo](https://sap.github.io/angular-metaui/))
 - [Longer MetaUI presentation](https://www.youtube.com/watch?v=F0BMw_Sxjig)
 



### Why MetaUI

```
Most of the UI code written in traditional frameworks is a mechanical application of 
(unstated) rules rooted in the domain object data model.
  						            
  						            -- Craig Federighi 	
```


### Project plan

We will be executing this project in 3 stages with each stage adding more features on top of the previous one. 


#### Stage #1 - Initial Setup
* New project structure 
* Basic documentation
* Schematics tools to make the start easier
* Hook in CI + publish initial version

#### Stage #2 - Detach MetaUI from UI

* Separate MetaUI from its UI layer
* Make MetaUI plugable so it can be easily adapted by other UI frameworks
* Create two default implementations for PrimeNG & Material Design 


#### Stage #3 - OSS (Object Style Sheet) and improvements


- In depth analyze of OSS and how it could be replaced with more natural tools that TS gives us
- Ability to modify rules dynamically from the server 
- Since metadata deals with dynamic object we need to solve how schema changes will propagate to the UI without updating Meta Rules
- Client side / server side data validation
- Generate default views out of the domain objects (master-detail view (list view), detail view, etcs.)
- How to handle different customer customization out of box 
- Let customers and third parties defines their own conditions (visibility, validity, editability) and actions
    - This is a major requirement for enterprise where customer specific fields, with their own rules, need to be combined with default domain object
- Define best practices in terms of how to structure an application. Create a default set of MetaUI rules.
- MetaUI Inspector
   -  At this point the project will support heavy enterprise customization and it needs an inspector that helps with troubleshooting.
      The inspector needs to show the state of a component and the rules applied to it. It's similar to a CSS inspector.



## How to obtain support

Please stay tuned we will create necessary social channels to communicate out news as well to listen all your questions

 [1]: https://github.com/ngx-meta/rules/blob/master/packages/metaui/docs/architecture.md
 
  

 
 
