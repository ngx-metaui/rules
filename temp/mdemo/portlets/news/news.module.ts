import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsComponent} from './news.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {IconModule} from '@fundamental-ngx/core';

@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    IconModule,
    BrowserAnimationsModule,
    FormsModule
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
