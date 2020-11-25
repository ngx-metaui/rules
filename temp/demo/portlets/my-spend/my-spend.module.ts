import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {BrowserModule} from '@angular/platform-browser';
import {MySpendComponent} from './my-spend.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    MySpendComponent
  ],
  exports: [
    MySpendComponent
  ]
})
export class MySpendModule {

}
