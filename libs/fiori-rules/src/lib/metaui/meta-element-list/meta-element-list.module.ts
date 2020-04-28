import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MetaUIRulesModule} from '@ngx-metaui/rules';
import {MetaElementListComponent} from './meta-element-list.component';

@NgModule({
  declarations: [
    MetaElementListComponent
  ],
  imports: [
    CommonModule,
    MetaUIRulesModule
  ],
  providers: []
})
export class MetaElementListModule {
}
