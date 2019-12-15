import {NgModule} from '@angular/core';
import {PlayComponent} from './play.component';
import {CommonModule} from '@angular/common';
import {FioriRulesModule} from '@ngx-metaui/fiori-rules';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatePickerModule, FormModule} from '@fundamental-ngx/core';


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
    MatFormFieldModule,
    MatInputModule,
    FormModule,
    DatePickerModule

  ],
  providers: []
})
export class PlaygroundModule {
}
