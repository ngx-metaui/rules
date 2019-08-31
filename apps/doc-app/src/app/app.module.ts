import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {AsideNavComponent} from './layout/aside-nav/aside-nav.component';
import {NgxPageScrollCoreModule} from 'ngx-page-scroll-core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AsideNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatToolbarModule,
    NgxPageScrollCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
