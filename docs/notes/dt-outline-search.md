## Outline datatable search

This documents contains my notes on how to approach search and filtering for the outline datatable.



### Current solution

 Outline datatable implementation is based on free data format which does not force developer to work with tree directly. This gives
 us great flexibility in terms of data structure and application is responsible for the actual format. Datatable only requires 2 things:
 
 ```html
 
 <aw-datatable2 [list]="data" 
                [children]="children"
                >
                
```                

* Array that we want to render / or datasource
* `children` callback method which DT uses to ask application to load children for current node and its up to the application what and where data 
is taken from. 

With this you can have data in format:

```csv

Level,Item,Type,ItemDesc,Commodity Code,Supplier,Region,Year,Quarter,Answer,Price,Quantity,ExtendedPrice,Color,Size,Description
0,1,Section,Introduction,,,,,,,,,,,,Description of 1: Introduction
1,1.1,Question,Question #1,,,,,,Four score and seven years ago our RFX designer ...,,,,,,Description of 1.1: Question #1
1,1.2,Question,Question #2,,,,,,"Another non-matrixed, non-supplier question",,,,,,Description of 1.2: Question #2

```

and `children`  can be simply used to retrieve all the children of the `section` with 

```ts
children (item: any): any[]
    {
        switch (item.type) {
            case 'section':
                let items = this.lookupAllForSection(item);
                return items;            
        }
        return [];
    }
          

```
and `lookupAllForSection` could search all records where `level==1 && Item.StartWith("1.") `. With this can you really render 
any kinds of format.

                   
                
 ##### Limitation
 
 Even this approach would work for most of the cases it still have one problem which is _"how to do search ?"_. Datable has only access to `[list]` binding
 which contains only parent nodes and child nodes are up to the application so you can not really search thru them as they has not been loaded. 
 
 ##### Expected behavior
 
 The new behavior that we want to see is to support really fully `full text ` search, where user can enter any string and DT will filter its result
 across all the available records, and potentially expand all parent nodes all the way to the root of neesseary if entered expression matches some 
 deep child.
 
 This is hard achieve with Free Form Structure. We could probably enhance DataSouce (DS) but this would just bring all of complexity.  
 
 
### New Solution

Let's extends DT  to have two outline modes :

###### 1. Free format mode

This would be used if you want to load data that has flat structure where one record refers to other one and application does not require
extensive full text search and its up to the application how to re-structure data into the a TREE.


###### 2. Tree format mode

Let DT to work with special interface which defines concrete data structure and there is only one input list having all the hierarchy / or DS holding 
the data.  


```ts

export interface OutlineNode {
    data: any;
    parent: OutlineNode;
    children: OutlineNode[];
    isExpended: boolean;    
    isSelected: boolean;
    isMatch: boolean;
    readonly: boolean;
    type: string;
    draggable: boolean;    
    droppable: boolean;
             
}

```
Having this interface that we used to have there before it will give us better control for the search & filtering functionality.  One `Outlinenode` is represented 
by one single object having different states as well as direct reference to its children.

Datasource or even application would be responsible to pre-format data into this `OutlineNode` format but in return it would give you easier 
control over this dataset.

- We could instantiate DS as:

```ts

let dataProvider = new MyAppDataProviderThatCanReadFlatStructureAndRetriveOutlineNodeStrucuter(this.ref2RestAPI);            



this.dataSource = new DT2DataSource();
 
this.dataSource.init({
    dataProvider: dataProvider,
    dataFinder: new MyDataFinderThatCanDecideWhenToPerformQueryOnLocalArrayAndWhenToGoToServer().forData(dataProvider),
    queryType: QueryType.FullText,
    multiselect: false
});

```

and in HTML you would reference the DS:

```html
<aw-datatable2 [dataSource]="dataSource"
               ...

```

* When DS loads the data for first time it checks if we deal with regular DT or Outline, If Outline what mode
* Load data based on the `items.data` assuming, internally inside DT we still have array to be rendered

 ```ts
 
    let dataToRender: any[];
    
    // in case of outline with Tree format mode. Our OutlineNode has data property.
    dataToRender.data.<object Field Name>
      
``` 
* If you click expand, Parent node will be marked as `isExpanded=true`, and we retrieve data from `dataToRender.children`
    * This can be also implemented lazily as well.
    
* When you trigger some search by typing an expression into a input field, then `MyDataFinderThatCanD..` can in memory iterate over whole dataset to perform inMemory search or can 
delegate the call to some RestAPI. 

* The DS or even REST API depending if we do In memory search would mark nodes with actual state and data table would use this state to show the search result
and pre-expend nodes all the way to parent if needed.

### Performance

When I was working on `Cordova` the Hybrid mobile solution both on Ariba App or my personal project such as [http://www.hawaia.com][1], where web application had really small footprint 
I learn one thing in general browsers does not have problem storing in memory hundreds of thousands records as they are ignored from JS processing unless you start adding them all into the DOM. Espetially in 
hawaia, where I stored images and tons of details that I needed to render the card.

Therefore we could do quick and extensive search in memory as well as if needed delegate to the RESTful api if needed.  But sometimes it is quicker to call REST API that can support well 
indexed full text search easier than trying to implement something like this in memory.



# Search / Filter

There is allot of confusion what is what and when to use what. In my opinion the `Search` always goes to the backend (unless you have implemented full text search in JS) and `Filters` just narrow
down whatever is already loaded inside DS.

Search should be full text and we can introduce some expressions as well and filter is just key/value pair that you apply on existing datasets.


###### Search 

e.g.: You initiate the search using whatever search query you have implemented

```ts

GET https://<domain>/Sourcing/api/v2/events/q?exp=XXX

```

where `filter` is more in code. If you have a filter with list regions and you pick one, then in the code its more about:


```ts
  // iterate thru existing dataset and compare values
 applyFilter (filterMap: Map<string, any>): void
    {
        let filteredResult = this.dataProvider.data().filter((item: any) => {
                
                // iterate thru list of filters which is key value and compare them to the filtered item
                // e.g. we know we have region 
                
                let reg = filterMap.get('region'); 
                // access field region and compare              
                return item['region'] === reg;                              
        
        });
        
        // inform DT about the change so it can re-rerender
        this.dataProvider.dataChanges.next(filteredResult);    
                    
    }

```

You could also have combination of both where you have selected region and do full text in this case you could pass the filter to the query 

In this case POST is better choice:

```ts

POST https://<domain>/Sourcing/api/v2/events/q

{
    exp:xxxx;
    filters: {region: "EMEA"}
}

```


### OutlineFor - The outline repetition

We need to start implementation in here and implement the _Tree mode_ as DT is backed up whatever `OutlineFor` has



[1]: http://www.hawaia.com  

 





 
 
 