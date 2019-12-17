import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DemoModule} from './demo/demo.module';
import {PlaygroundModule} from './playground/play.module';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MetaConfig, MetaUIRulesModule} from '@ngx-metaui/rules';
import {FioriRulesModule} from '@ngx-metaui/fiori-rules';
import * as userRules from './user-rules';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DemoModule,
    PlaygroundModule,
    // AppRoutingModule,
    MetaUIRulesModule.forRoot(),
    FioriRulesModule.forRoot()
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private config: MetaConfig) {

    const rules: any[] = config.get('metaui.rules.user-rules') || [];
    rules.push(userRules);
    config.set('metaui.rules.user-rules', rules);
  }
}
