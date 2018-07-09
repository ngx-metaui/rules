## Parser

Now you can directly edit oss files and it will generate typescript file for you. the only thing you need to do is:

1. Install java 1.8
2. java command needs to be in your path. 


###Usage


Assuming that you run ng serve in one terminal which and this is with live reload, then in another terminal in the 
project directory you run 

```
    npm run oss-user

```

this will regenerate all the available rules files. Wait for the angular-cli to re-bundle all again and then just
refresh your page.


## Todo

Currently its pretty big fat JAR file which is result of one of my other serverside project running in spring boot. 
But in the future we want to either:

1. write simple java command with spring dependencies
2. even better write AST parser ourself based on the parser.jj that exists in java. 


### Note for system rules

If you also need to regenerate system rules because you created some widgets and you want to plug it in then go to the 
``` shared/metaui/core/oss/WidgetsRules.oss ``` do your changes and run 

```
    npm run oss-sys
```



