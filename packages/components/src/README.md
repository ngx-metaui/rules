# components
 
Components module has 3 main parts:

####Core
Mostly services, dom utilities and interesting core directives such as:

**`IncludeComponentDirective`** which is key building block in order to render dynamic UI. 
 
 e.g:
 
 ```html
 <aw-include-component [name]="'TextFieldComponent'"  [bindings]=bindings >
 </aw-include-component>
```

You just pass a string and component is rendered dynamically. 

Another interesting directive is **`EmbeddedItemDirective`**  which helps you project `ng-template` in 
place just like you know it from  `*ngIf` or `ngFor`. Please checkout `DropdownComponent` or 
`ChooserComponent` to learn more how its used.

e.g.: To prefix every item in the Dropdown popup you use a `template`


```html
<aw-dropdown [selection]="selection4" [list]="list" [noSelectionString]="'Select Color'">

    <ng-template #itemTemplate let-item>
        My-Prefix - {{item.label}}
    </ng-template>
</aw-dropdown>

```  

which you can then project in the component: 

**DropdownComponent.html**:
```
<ng-template [embeddedItem]="itemTemplate" [item]="item" 
    *ngIf="hasEmbeddedTemplate() && itemExist(item)">
</ng-template>
```

**`GenericContainerComponent`** is really generic component which can help you literary render any
html element. Also key building block for generating UI on the fly. We are using this component to 
dynamically wrap other components.


```html
<aw-generic-container tagName="h1" >
    My title
</aw-generic-container>

```


####Layouts

`FormTable` is implementation of AW FormTable in Angular. Pretty much every place that needs to 
render form fields uses this component. It support either only 1 zone layout (1 column) or multi 
zone layout:
 

```html
<aw-form-table [labelsOnTop]="labelsOnTop" >
   <aw-form-row [label]="'a label 1'" [name]="'name'" [size]="'medium'">
           <aw-input-field [name]="'name'" [value]="value1"></aw-input-field>
    </aw-form-row>

    <aw-form-row [label]="'a label 2'" [name]="'name2'" [size]="'medium'">
        <aw-input-field [name]="'name'" [value]="value1"></aw-input-field>
    </aw-form-row>=
</aw-form-table>
```

or 

```html
<aw-form-table [useFiveZone]="fiveZone" >
    <aw-left>
        <aw-form-row [label]="'a label 1'" [name]="'name'" [size]="'medium'">
            <aw-input-field [name]="'name'" [value]="value1"></aw-input-field>
        </aw-form-row>
    </aw-left>


    <aw-right>
        <aw-form-row [label]="'a label 1'" [name]="'name'" [size]="'medium'">
            <aw-input-field [name]="'name'"  [value]="value1"></aw-input-field>
        </aw-form-row>
    </aw-right>
</aw-form-table>
```

**`Declarative layout`**

This is still on our _todo_ list in order to loose dependency on PrimeNG grid system or any css
 grid system we might use in the future. We just want to have a component that could look like this 
 e.g. :

```html
<aw-flex-layout pattern=" (hbox (vzone MYLEFT) (vzone MYRIGHT))" >
        <aw-flex-content zone="MYLEFT">
                some fields
        </aw-flex-content>
              
         <aw-flex-content zone="MYRIGHT">
                some fields        
         </aw-flex-content>

</aw-flex-layout>

```

It would render one horizontal box with two named columns _left_ and _right_ for 
holding a content. `aw-flex-content` would just place your content into specific area. With this 
you can define any kinds of layouts on the page. Basically the layout pattern would be parsed into a
tree and then we would traverse a tree and render each box and zone.


 
####Widgets

Contains set of reusable component. For more details please checkout each component individually:
* Every component should enough documentation (jsdoc) to get you started as well as unit tests.

