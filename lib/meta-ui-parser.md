# OSS Parser

In order to start hacking rules files that sits under `src/playground/rules/*.oss `and to see how your UI changes you need to use
this` executable jar `file. It contains OSS parser that produces internal format consumed by javascript loader.  

We do work on native javascript/typescript parser which could work in both JIT mode as well as offline mode. 

This parses OSS file and produces map-like structure that is read by javascript. You can checkout
generated files under `src/playground/rules/ts/*.ts`


### Prerequisites 

* Java run-time (1.8)



### Usage


Assuming that you run `ng serve` in one terminal and you are able to access [http://localhost:4200/play][1] or better 
[http://localhost:4200/play/metaui][2] and then:

*  Open the `src/playground/rules/CarRentalRequest.oss`
*  Copy content e.g. from `src/playground/rules/demo/2.1CarRentalRequest-MoreField-1Col.oss` into `src/playground/rules/CarRentalRequest.oss`  
*  Now you need to regenerate rules. In second terminal inside this project run 

```
    npm run oss-user
```
 
* Go back to your browser and you should see updated UI 
 
 You did it! You are generating UI on the fly using rules decoratively. 


### OSS Grammar

In progress ...


 [1]: http://localhost:4200/play
 [2]: http://localhost:4200/play/metaui
 