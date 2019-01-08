import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialRulesModule} from '@ngx-metaui/material-rules';
import {MetaConfig, MetaUIRulesModule} from '@ngx-metaui/rules';
import * as userRules from './rules/user-rules';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,

    MetaUIRulesModule.forRoot(),
    MaterialRulesModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


  constructor(private config: MetaConfig) {
    // mandatory - you need to register user's defined rules and types since there is no
    // introspection in js

    const rules: any[] = config.get('metaui.rules.user-rules') || [];
    rules.push(userRules);
    config.set('metaui.rules.user-rules', rules);
  }
}
