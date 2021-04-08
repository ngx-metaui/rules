import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CustomInputComponent} from './custom-input.component';
import {HttpClientModule} from '@angular/common/http';
import {BidiModule} from '@angular/cdk/bidi';

@NgModule({
  declarations: [
    CustomInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BidiModule
  ],
  exports: [],
  providers: []
})
export class CustomInputModule {

  constructor() {
  }
}


