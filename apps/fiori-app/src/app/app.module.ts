import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FioriRulesModule} from '@ngx-metaui/fiori-rules';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FioriRulesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
