import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FioriRulesModule} from '@ngx-metaui/fiori-rules';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { FormModule } from '@fundamental-ngx/core';
import { DatePickerModule } from '@fundamental-ngx/core';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FioriRulesModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    NoopAnimationsModule,
    FormModule,
    DatePickerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
