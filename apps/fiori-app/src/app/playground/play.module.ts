import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FioriRulesModule} from '@ngx-metaui/fiori-rules';
import {MetaUIRulesModule} from '@ngx-metaui/rules';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatePickerModule, FormModule} from '@fundamental-ngx/core';
import {PlayComponent} from './play.component';


@NgModule({
  declarations: [
    PlayComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    FioriRulesModule,
    ReactiveFormsModule,
    FormModule,
    DatePickerModule,
    MetaUIRulesModule
  ]
})
export class PlaygroundModule {
}
