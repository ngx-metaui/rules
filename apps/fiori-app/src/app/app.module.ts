import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MetaConfig, MetaUIRulesModule} from '@ngx-metaui/rules';
import {FioriRulesModule} from '@ngx-metaui/fiori-rules';
import * as userRules from './user-rules';
import {UserDetailComponent} from './user-detail/user-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MetaUIRulesModule.forRoot(),
    FioriRulesModule.forRoot(),
    AppRoutingModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private config: MetaConfig) {
    this.config.registerRules(userRules);
  }
}
