import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  IconModule,
  ListModule,
  PanelModule,
  TableModule
} from '@fundamental-ngx/core';
import {FioriRulesModule} from '@ngx-metaui/fiori-rules';
import {NewsModule} from '../portlets/news/news.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {LandingComponent} from './landing.component';
import {BrowserModule} from '@angular/platform-browser';
import {MyDocumentsModule} from '../portlets/my-documents/my-documents.module';
import {MySpendModule} from '../portlets/my-spend/my-spend.module';
import {CommodityModule} from '../portlets/commodity/commodity.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PanelModule,
    TableModule,
    IconModule,
    FioriRulesModule,
    ListModule,
    NewsModule,
    MyDocumentsModule,
    MySpendModule,
    CommodityModule,
    RouterModule

  ],
  exports: [
    LandingComponent
  ],
  providers: []
})
export class LandingModule {

}
