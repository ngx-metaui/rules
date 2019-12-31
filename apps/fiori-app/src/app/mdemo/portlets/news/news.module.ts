import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IdentifierModule} from '@fundamental-ngx/core';
import {NewsComponent} from './news.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    IdentifierModule
  ],
  entryComponents: [
    NewsComponent
  ],
  exports: [
    NewsComponent
  ],
  providers: []
})
export class NewsModule {

}
