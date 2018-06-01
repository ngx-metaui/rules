
###Rendering magic

_This describes how metaui rendering worked in our old java based MetaUI_


Let's start with something simple. Without having layout in place, just render simple object with a operation using Form.
Let's assume we need to render following object _$user_  which is inside UserFomSimple.awl

```
<m:Context object="$user" operation="edit">
    <m:Form/>
</m:Context>
```

1. AWL parser reads recursively every tags and converts it into Component reference and definition
  + In this case it reads and parses m:Context and instantiate _MetaContext_ component
  + It reads m:Form and instantiate MetaForm
  + It continues into MetaForm and here parses every single elements

Uptill now there are only instances

2. Once all is ready and component is about to be rendered this first part kicks in and _pushPop_ is invoked where:

  ```
    <m:Context object="$user" operation="edit">
  ```

  + Retrieves current Context from env.
    + env. is on the page itself
    + so it either creates and put the context into the env or retrieves existing ones
  + Pushes current properties into the stacks
    + untill now the stakc is empty - nothing is evaluated
    + set (object, $user)
    + set (operation, edit)
  + This will trigger Meta Rule matching and a list of properties is available now on the context

3. Let the super class to render. This will try to render the next component which is MetaForm
  + _We are in MetaForm now_
  + MetaContext is invoked again and properties are pushed to stack.
    + set (scopeKey, class)

```
<m:Context scopeKey="class">

```
  + Once we push the class scope properties are recalculated and now we have available _list of fields to be rendered_


4. Now we are in the includeBlock in order to render ROW. And here again we call metaContext to get context based properties to render actuall row.
  + Get existing context from env.
  + push set of properties
    + set (field, firstName)

```
<a:Block name="RowTemplate">\
    <m:Context field="$field">
        <a:SetValue properties="$metaContext.properties"/>
```
  + pass all the required bindings into FormRow. All properties for current field are available on the _context_.
 ```
  <w:FormRow  hidden="$!properties.visible"
                          label="$properties.label"
                          cueTip="$properties.cueTip"
                          required="$properties.required"
                          errorValueSource="$object"
                          errorFieldPath="$properties.field"
                          labelNowrap="$properties.bindings.labelNowrap"
                          dragType="$dragType"
                          dragAction="$dragAction" dropAction="$dropAction"
                          dragHandleClickAction="$handleClickedAction"
                          highlightRow="$isInspectedField"
                          useNoLabelLayout="$^useNoLabelLayout:$properties.bindings.useNoLabelLayout">\
                      <m:IncludeComponent/>\
              </w:FormRow>

```

5. Component is Rendered. In this case AWTextField. Here is where magics happends.

 ```

         <m:IncludeComponent/>\
```


  + We invoke _MetaIncludeComponent_ which inherits from AWIncludeComponent
  + _AWIncludeComponent_ tries to lookup component reference
    + _MetaIncludeComponent_ overrides all this functionality and here what it does, it retrieves all the properties for current context
    + based on these props it lookups a cached version of component  - inside Meta.identityCacheMap
    + If it does not exists creates component Ref and stores it into  Meta.identityCacheMap for later user. But in before it does:
      + From current context properties reads calculated _Component Name_ e.g.: AWTextField
      + Reads all the required bindings from Props and prepare them for the new component
        + Here depending on the value it is either FieldPath, ContextFieldPath or PropertyValue.Dynamic.
    + before we actually retrieve just created _component reference_ we check if we have component wrapper.
        + if we do we create componentWrapper adn wrap above create component
  + AWInclude at this point has all the data to render component just like anywhere else in AWL enviornment.
        + In upstream this is known as SwitchComponent.



###Rendering magic - Layout

In this example I am looking at the usecase where I am using a _m:form_ but _meta layout_ and let the rule engine to figure out what needs to be rendered.

before:

```
<m:Context object="$user" operation="edit">
    <m:Form/>
</m:Context>
```


now:

```
<m:Context object="$user" operation="edit" layout="Inspect">
    <m:IncludeComponent/>
</m:Context>
```

1. Once again we are starting from UserForm Simple where I modified the context. Once it enters into MetaContext, at this time it pushes to context:
 + set (layout, Inspect)
 + set (operation, edit)
 + set (object, ...)

2. The flow is identical like in previous case except, now when we try to pass the rendering to super.render(..)  we do not have _m:Form_ anymore but _metainclude_
 + checks if we already have cached version
 + Since we passed _layout_=_Inspect_ in the first place we have now available component on the context
 + when _AWIncludeComponent_ is trying find component reference the _MetaIncludeComponent_'s overriden method returns MetaForm, because what is on the current context.


_MetaIncludeComponent_ is such glue, without it it would not work. Its a key components that hooks up the calculated properties available on the context and the actual UI component that needs to be rendered.


###Rendering magic - Advanced Layout

In this case I show little more advanced example. So far we seen how the _MetaIncludeComponent_ and _MetaContext_ was gluing all this together. now I will describe
case where we have custom and stacked Layouts.

**Image this case:**


```
 <m:Context object="$user" layout="Inspect" filterActions="instance">
        <!--- The whole from comes from THIS!  The bindings (i.e. user, operation)
             in its containing context dictate what gets generated here -->
        <m:IncludeComponent/>
    </m:Context>
```


In this case our _Layout_ is redifined in the user rules like this:

```
operation=(view, edit)
            layout=Inspect#Stack {
                @layout=Main#OutlineBox {
                    bindings: {
                        title:"Primary Information";
                    };

                    @layout=Content#Form {}
                    @layout=Actions#ActionButtons {}
                }
                @layout#Tabs {
                    bindings: { contentClass:"tabContentWrapper noPadding"; }
                    @layout=Overview#Form { zonePath:Overview }
                    @layout=Details#Form { zonePath:Details }
                    @layout=Projects#Form {
                        class { bindings:{ width:"100%" } }
                        zonePath:Projects;
                    }
                }
            }
```


For operation _edit,view_ re-define custom layout.

1. When we set _MetaContext_ with Inspect which has our custom layout, it will push _MetaElementList_ into the stack
 + Because we have _#stack_ and this is defined as _MetaElementList_

2. MetaIncludeComponent:  which is inside out _<m:context_  it knows that it should render MetaElementList

3. MetaElementList layout inherits from MetaLayout and it iterates thru defined layout (this is inside MetaLayout)

```
public List<ItemProperties> allLayouts ()
    {
        if (_allLayouts == null) {
            Context context = MetaContext.currentContext(this);
            UIMeta meta = (UIMeta)context.meta();
            _allLayouts = meta.itemList(context, UIMeta.KeyLayout, zones());
        }
        return _allLayouts;
    }

```
   + it will return grouped layouts Main, Tabs and inside thsi MetaElementList we again sets MetaContext adn push
    current layout onthe the stack one by one.

```
<a:For list="$allLayouts" item="$layout">\
    <m:Context layout="$layout.name">\
        -<b>MetaElementList: (layout $layout.name)</b><pre>$metaContext.debugString</pre>
        <a:RefreshRegion tagName="$metaContext.properties.elementTag:div"
                         class="$metaContext.properties.elementClass"
                         style="$metaContext.properties.elementStyle">\
            <m:IncludeComponent/>\
            ....
```

  + When it sets layout=Main it brings another component onto the stack which in this case it is OutlineBox.

  ```
   @layout=Main#OutlineBox {
  ```

4. _MetaInclude_ renders Outlinebox
  + Outlinebox is special component since it has other nested content.

```

awcontentLayouts:{body:Content; buttonArea:Actions};

```

  + this refers exactly to our layout names that needs to match with what is inside rules.
  + Here is extra steps for _MetaIncludeComponent_, before we just let the MetaInclude to render the comopnent, but here we need to also create the content
  + What I mean by this for OutlineBox to work it has this

  ```
 <a:IncludeContent required="$false" templateName="body"/>
 <a:IncludeContent required="$false" templateName="body"/>
  ```

  + _MetaInclude_ with overriden method createElement() it checks if it has defined awcontentLayouts.
  + If yes it retrieves contentLayoutBindings
  + If there is 1 binding and its _main it creates programatically form of :

```
<metaContext Layout=<value>
   <m:IncludeContent>
```

   + else if there are more like in this case it creates: structure in the form of

```
 Template -*> AWContent (name:key) --> MetaContext (layout:value) --> MetaInclude
```

   + then outline box is rendered.

5. Since we added above structure it will render ActionButtons just because we pushed with above statement this:

```
@Layout=Actions#Actionbutons
```

6. Now #ActionButtons is pushed into the _context_, the _MetaIncludeComponent_ is rendering MetaActionList

 + Again this has the same structure with

```
   <metaContext xx=xx>

```

  + where we push key:value adn based onteh evaluated context it renders the content based on the template.


7. Now it renders the content where we have #Form triat
  + here the form renders objects that is on the context field by field


8. Then Layout#Tabs

  + It pushes MetaTabs Components
  + MetaTabs is rendered with scopeKey=layout
  + using pushed properties we rendere tabs.


### ScopeKey

  + Is just the shortCut to set specific context value, just by defining a key.

 e.g:

```
 <metaContex class=xxx>
      <metaContext =layout
            <MetaContext  =Field

```

 + by setting a scope key we are able to rewind state back. so if we are at the Layout level and we want to go back to class, we set the scopeKey adn it iwll lookup
values from from context.values() and set them to context.

```
  public void setScopeKey(String key)
    {
        Assert.that(meta().keyData(key).isPropertyScope(), "%s is not a valid context key", key);
        String current = _currentPropertyScopeKey();
        // Assert.that(current != null, "Can't set %s as context key when no context key on stack", key);
        // FIXME: if current key isChaining then we need to set again to get a non-chaining assignment
        if (!key.equals(current)) {
            Object val = values().get(key);
            // Assert.that(val != null, "Can't set %s as context key when it has no value already on the context", key);
            if (val == null) val = Meta.KeyAny;
            set(key, val);
        }
    }
```


 +  what it does if the scope key is different then current then we reset it, otherwise nothign is changed.




