import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppConfig, MetaUIRulesModule} from '@ngx-metaui/rules';
import * as userRules from './rules/user-rules';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {AgeRatingComponent} from './age-rating/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    AgeRatingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MetaUIRulesModule.forRoot({})
  ],
  entryComponents: [AgeRatingComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private appConfig: AppConfig) {

// mandatory - you need to register user's defined rules and types since there is no
    // introspection in js

    const rules: any[] = appConfig.get('metaui.rules.user-rules') || [];
    rules.push(userRules);
    appConfig.set('metaui.rules.user-rules', rules);

  }
}
