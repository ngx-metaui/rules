# Getting started

In this section we'll cover basics of the MetaUI rules framework `@ngx-metaui/rules` to assemble user interface on the fly without templates.
 

### Prerequisites
+ Knowledge of typescript 
+ Basic Web development
+ Angular 7.x

_Continuing without prior knowledge of all above is not recomended_ and result is unknown.

----

## Quickstart 

To get everything up and running run following commands:

#### Step 1

Create new angular application (unless you are integrating it with existing one)
```
  ng new MyDetailPage --style=scss
```


#### Step 2

Add `@ngx-metaui/rules` to your app
```
  cd MyDetailPage/
  ng add @ngx-metaui/rules --uiLib="material2"
```

Once finished you are fully configured to start some rule driven development but we skip ahead generate some ready to use page!
The `--uiLib="material2"`  switch pre-configures UI Library to be used with the MetaUI. Even we currently support only `PrimeNg`
the `Material 2` library. The integration of your UI Lib is something we are working on right now...



#### Step 3

Create `UserDetail` page with different page modes:  `Create`, `Edit` and `View`  Even this does't do much it will show  
basic aspects of _MetaUI_.

```
ng g  @ngx-metaui/rules:mPage --modelClass=User --name=UserDetail 
```
and follow instructions printed in console such as `compile oss rules` _(We will get to this)_:

```
npm run compile:oss
```

### Step 4

Either attach created page into your router or like in our case  we will simply replace the out of box 
_welcome_ content of the  `app.component.html` with this line

```
<app-user-detail></app-user-detail>
```

### Step 5

Run the application 

```
ng serve
```
and access the page [http://localhost:4200][2] and you just created a page which is based on rules.



#### Let's Recap what just happened and what was created: 

*  `/model/user.ts` to represent our domain object
*  Component `UserDetailComponent` with just 3 main lines to generate whole content and 3 buttons to switch between `Create`, `Edit` and `View` 
modes
* A Rule file `User.oss` ( _OSS - Object style sheet_ ) to style how the object should be rendered and behave for different situations

![alt text](https://raw.githubusercontent.com/ngx-meta/rules/master/docs/meta/getting-started-1.1.png "Generate MetaUI Application")

The page should look like this showing different fields based on selected operation


#### Next Step 

Now we just touched the surface of the rule driven UI development and looked at other ways how web application can be 
built. 

* To understand how this works please jump to the [next topic][2] where we extend this application and give you 
deeper introduction to the MetaUI.

* Or you can read [High level fundamentals][3] that are behind this framework. 
    
 [1]: http://localhost:4200
 [2]: #/oss-rules
 [3]: #/metaui-architecture
 
     
