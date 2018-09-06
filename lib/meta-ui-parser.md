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


### What is inside a jar

First, I think to understand this and have enough context I cannot skip our original project called [AribaWeb][3] (you can also
read some of the older blog post  [AribaWeb Blog][3]) that started all this. 

_MetaUI_ a special rule engine with a small footprint, that processes OSS files (**O**bject **S**tyle **S**heet) in order to 
register rules based on which UI is rendered. Rules are read by `Java  parser` which is using the `JavaCC` to parse OSS and output a Javascript compatible 
format. And this is basically inside the JAR file a wrapper with command-line shell support accepting some 
options and rewriting the way rules are registered in order to produce different format.


Bellow is the example of the grammar (BNF format) that we used to generate Intellij IDEA plugin:

```
    {
        ...
    
    
        tokens=[
           LINE_COMMENT='regexp://.*'
           BLOCK_COMMENT='regexp:/\*((?<!\*/)(.|\n))*'
    
            SEMI=";"
            COLON=":"
            COMA=","
            OP_EQ="="
            AT="@"
            HASH="#"
            DOT="."
            LEFT_PARENTH="("
            RIGHT_PARENTH=")"
            LEFT_BRACE="{"
            RIGHT_BRACE="}"
            LEFT_BRACKET="["
            RIGHT_BRACKET="]"
            NEXT="=>"
            STAR="*"
            NEGATE="~"
            EXCL_MARK="!"
            KW_CLASS="class"
            KW_DISPLAYKEY="displayKey"
            KW_SEARCHOPERATION="searchOperation"
            KW_TRAIT="trait"
            KW_OPERATION="operation"
            KW_FIELD="field"
            KW_BINDINGS         ="bindings"
            KW_COMPONENT        ="component"
            KW_OBJECT           ="object"
            KW_VALUEREDIRECTOR  ="valueRedirector"
            KW_ACTION           ="action"
            KW_ACTIONRESULTS    ="actionResults"
            KW_VISIBLE          ="visible"
            KW_PAGENAME         ="pageName"
            KW_PAGEBINDINGS     ="pageBindings"
            KW_AFTER            ="after"
            KW_ZTOP             ="zTop"
            KW_ZBOTTOM          ="zBottom"
            KW_ZLEFT            ="zLeft"
            KW_ZRIGHT           ="zRight"
            KW_ZNONE            ="zNone"
            KW_LAYOUT           ="layout"
            KW_HOMEPAGE         ="homePage"
            KW_MODULE_TRAIT     ="module_trait"
            KW_MODULE     ="module"
            KW_WRAPPERCOMPONENT ="wrapperComponent"
            KW_WRAPPERBINDINGS  ="wrapperBindings"
            KW_PORTLETWRAPPER   ="portletWrapper"
            KW_DISPLAYGROUP     ="displayGroup"
            KW_NEEDSFORM        ="needsForm"
            KW_BEFORE           ="before"
            KW_TEXTSEARCHSUPPORTED           ="textSearchSupported"
            KW_USETEXTINDEX           ="useTextIndex"
            KW_LABEL          ="label"
    
    
            IDENTIFIER='regexp:[a-zA-Z_]([a-zA-Z_0-9])*'
            EXPR_LITERAL='regexp:\${1,2}\{([^}]*)}'
    
            STRING_LITERAL='regexp:"[^"]*"'
            SQ_STRING_LITERAL="regexp:'[^']*'"
            KEY_PATH='regexp:[a-zA-Z_]([a-zA-Z_0-9.\$])*'
            DYN_FIELDPATHBINDING='regexp:\$[a-zA-Z_]([a-zA-Z_0-9.])*'
            LOCALIZATION_KEY='regexp:\$\[[a-zA-Z_0-9]*\]'
            INT_LITERAL='regexp:(0([0-7])*|[1-9]([0-9])*|0[x,X]([0-9,a-f,A-F])+)([l,L,h,H])?'
            FLT_LITERAL='regexp:(([0-9])+\.([0-9])*|\.([0-9])+(e,E]([+,-])?([0-9])+)?([d,D,f,F,b,B])?|([0-9])+[e,E]([+,-])?([0-9])+([d,D,f,F,b,B])?|([0-9])+[d,D,f,F,b,B] )'
        ]
    }
    
    rules ::= rule *
    rule ::= selector+  traitList? ('{' ruleBody  '}' | ';')
    traitList ::= '#' IDENTIFIER  (',' IDENTIFIER)*
    
    selector ::= '@'? (selectorDef |  '~' IDENTIFIER_KEY)
    selectorDef ::=  IDENTIFIER_KEY   selectorValue?
    selectorValue ::= '=' (simpleValue | '(' valueOrList ')' )
    
    ruleBody ::= ruleBodyKeyValue*  rule* ruleBodyKeyValue* rule* precedenceChain*
    ruleBodyKeyValue ::= (key ':' value '!'? ';'? ) {pin=2}
    
    // todo: missing trait list here. Not sure how to define this here
    // (k=<KEYPATH> | k=<IDENT> | k="*") [ ("#" traits=traitList()) ]
    precedenceChain ::= precedenceChainNodeWithTrait ('=>' precedenceChainNodeWithTrait)+   ';' {pin=2}
    private precedenceChainNode ::= DYN_FIELDPATHBINDING | IDENTIFIER_KEY  | '*'  {pin=1}
    private precedenceChainNodeWithTrait ::= precedenceChainNode   traitList?  {pin=1}
    
    
    key ::=  STRING_LITERAL | IDENTIFIER_KEY
    value ::=  valueOrList
                    | wrappedList
                    | map
                    | DYN_FIELDPATHBINDING
                    | localizedString
                    | EXPR_LITERAL
    
     valueOrList ::=  listValue (','  listValue)*
    private listValue ::= simpleValue
                        | wrappedList
                        | map
                        | DYN_FIELDPATHBINDING
                        | localizedString
                        | EXPR_LITERAL
    
    simpleValue ::= simpleVal1
                        | IDENTIFIER_KEY
                        | KEY_PATH
                        | "true"
                        | "false"
                        | "null"
    
    private simpleVal1::= (STRING_LITERAL
                        |  SQ_STRING_LITERAL
                        | INT_LITERAL
                        | FLT_LITERAL )
    
    
    private IDENTIFIER_KEY ::= KW_CLASS
                        | KW_DISPLAYKEY
                        | KW_SEARCHOPERATION
                        | KW_TRAIT
                        | KW_OPERATION
                        | KW_FIELD
                        | KW_BINDINGS
                        | KW_COMPONENT
                        | KW_OBJECT
                        | KW_VALUEREDIRECTOR
                        | KW_ACTION
                        | KW_ACTIONRESULTS
                        | KW_VISIBLE
                        | KW_PAGENAME
                        | KW_PAGEBINDINGS
                        | KW_AFTER
                        | KW_ZLEFT
                        | KW_ZRIGHT
                        | KW_ZTOP
                        | KW_ZBOTTOM
                        | KW_ZNONE
                        | KW_LAYOUT
                        | KW_HOMEPAGE
                        | KW_MODULE_TRAIT
                        | KW_WRAPPERCOMPONENT
                        | KW_WRAPPERBINDINGS
                        | KW_PORTLETWRAPPER
                        | KW_DISPLAYGROUP
                        | KW_NEEDSFORM
                        | KW_BEFORE
                        | KW_TEXTSEARCHSUPPORTED
                        | KW_USETEXTINDEX
                        | KW_LABEL
                        | KW_MODULE
                        | IDENTIFIER
    
    
    wrappedList ::= '[' listValue  (',' listValue) * ']'
    
    map ::= '{' [  mapEntry  (';' mapEntry)*  ';'?  ] '}'
    private mapEntry ::=  key ':' value {pin=2}
    
    localizedString ::= LOCALIZATION_KEY key
    private property ::= key ':' value ';'

```

When we say _"Javascript compatible format"_ it just means that we output string literal like notation that can be easily 
read by javascript.

 




 [1]: http://localhost:4200/play
 [2]: http://localhost:4200/play/metaui
 [3]: https://sourceforge.net/p/aribaweb/wiki/Home/
 [4]: http://aribaweb.blogspot.com/2012/
 