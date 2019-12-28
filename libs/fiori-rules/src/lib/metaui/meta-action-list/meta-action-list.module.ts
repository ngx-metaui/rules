import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
  ButtonGroupModule, ButtonModule,
  IconModule,
  IdentifierModule,
  ListModule,
  PanelModule
} from '@fundamental-ngx/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MetaActionListComponent} from './meta-action-list.component';
import {MetaUIRulesModule} from '@ngx-metaui/rules';

@NgModule({
  declarations: [
    MetaActionListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    PanelModule,
    ButtonModule,
    IdentifierModule,
    IconModule,
    ListModule,
    RouterModule,
    MetaUIRulesModule


  ],
  entryComponents: [
    MetaActionListComponent
  ],
  providers: []
})
export class MetaActionListModule {
}
