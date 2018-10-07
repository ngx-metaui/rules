import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AribaComponentsModule, AribaCoreModule} from '@ngx-meta/rules';
import {DemoModule} from './demos/demo.module';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AribaCoreModule.forRoot({
      /**
       * Bootstrap init properties
       */
      'app.title': 'Playground Application',

      // optionally specify several global rule files (without oss). Application.oss
      // is always default value
      'metaui.rules.file-names': ['Application', 'Layout'],


      /**
       * Runtime properties
       */
      'restapi.realm': 'myRealm',
      'restapi.context': '/myService/',
      // turning on our MockServer
      'connection.mock-server.enabled': true,
      // What routes we should register
      'connection.mock-server.routes': ['users', 'carrentalrequests']

    }),
    AppRoutingModule,
    AribaComponentsModule.forRoot(),
    DemoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
