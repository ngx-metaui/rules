import {NgModule} from '@angular/core';
import {PlayComponent} from './play.component';
import {CommonModule} from '@angular/common';
import {FioriRulesModule} from '@ngx-metaui/fiori-rules';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
