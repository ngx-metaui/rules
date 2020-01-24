### Rules directory

This directory contains user defined `OSS rules` that are compiled by our proprietary OSS parser
into the `./ts` directory (ts stands for `typescript`).

All these rules are references and exported by `user-rules.ts` file which is 
registered inside application module for later use. 

ex:

```ts
   import * as userRules from './rules/user-rules';

    @NgModule({
     ...
    })
    export class AppModule {
    
      constructor(private config: MetaConfig) {
        let rules: any[] = config.get('metaui.rules.user-rules') || [];
        rules.push(userRules);
        config.set('metaui.rules.user-rules', rules);
      }
    }
```


The reason for this is that our rule engine need a way how to lazily pre-load some dynamic 
content fast depending on certain path or name. 

Please check out [High Level Architecture][1].


[1]: https://github.com/ngx-meta/rules/blob/master/docs/metaui-architecture.md
