import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TabsModule} from '@fundamental-ngx/core';
import {DashboardComponent} from './dashboard.component';
import {LandingModule} from '../landing/landing.module';
import {FormsModule} from '@angular/forms';
import {Landing2Module} from '../landing2/landing2.module';
import {Landing3Module} from '../landing3/landing3.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TabsModule,
    LandingModule,
    Landing2Module,
    Landing3Module
  ],
  providers: []
})
export class DashboardModule {
}
