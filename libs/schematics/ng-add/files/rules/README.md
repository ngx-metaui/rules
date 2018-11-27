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


The reason for this is that our rule engine needs a way how to lazily pre-load some dynamic 
content fast depending on certain path or name. We could probably use
`HttpClient` and it would solve the same problem maybe even better but at the time of writing this
loading offline/local content was not performing as fast as this. Meaning register and cache rules by key,
and use it once its needed.

Please check out [High Level Architecture][1].

_Note: The Dummy.oss can be removed once you have some rel OSS rules. It is only as a place holder_



[1]: https://github.com/ngx-meta/rules/blob/master/docs/metaui-architecture.md
