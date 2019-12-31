import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ButtonGroupModule,
  IconModule,
  IdentifierModule,
  InputGroupModule,
  PanelModule,
  TableModule
} from '@fundamental-ngx/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {Landing3Component} from './landing3.component';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [
    Landing3Component
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PanelModule,
    ButtonGroupModule,
    IdentifierModule,
    TableModule,
    IconModule,
    InputGroupModule

  ],
  exports: [
    Landing3Component
  ],
  providers: []
})
export class Landing3Module {

}
