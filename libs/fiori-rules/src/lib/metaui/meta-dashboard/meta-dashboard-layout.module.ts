import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
  ButtonGroupModule,
  IconModule,
  IdentifierModule,
  ListModule,
  PanelModule
} from '@fundamental-ngx/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {MetaDashboardLayoutComponent} from './meta-dashboard-layout.component';
import {CommonModule} from '@angular/common';
import {FdpFormModule} from '../../ui/form/fdp-form.module';
import {MetaUIRulesModule} from '@ngx-metaui/rules';

@NgModule({
  declarations: [
    MetaDashboardLayoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    PanelModule,
    ButtonGroupModule,
    IdentifierModule,
    IconModule,
    ListModule,
    RouterModule,
    FdpFormModule,
    MetaUIRulesModule


  ],
  providers: []
})
export class MetaDashboardLayoutModule {
}
