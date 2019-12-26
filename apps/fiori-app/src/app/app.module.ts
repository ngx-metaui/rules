import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import {AppComponent} from './app.component';
import {DemoModule} from './demo/demo.module';
import {PlaygroundModule} from './playground/play.module';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MetaConfig, MetaUIRulesModule} from '@ngx-metaui/rules';
import {FioriRulesModule} from '@ngx-metaui/fiori-rules';
import * as userRules from './user-rules';
import {MetaDemoModule} from './mdemo/meta-demo.module';



const LOCALE = 'us';
import localeStr from '@angular/common/locales/es-US';
registerLocaleData(localeStr, LOCALE);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DemoModule,
    MetaDemoModule,
    PlaygroundModule,
    MetaUIRulesModule.forRoot(),
    FioriRulesModule.forRoot(),
    AppRoutingModule,

  ],
  exports: [],
  providers: [
    { provide: LOCALE_ID, useValue: LOCALE }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private config: MetaConfig) {

    const rules: any[] = config.get('metaui.rules.user-rules') || [];
    rules.push(userRules);
    config.set('metaui.rules.user-rules', rules);
  }
}
