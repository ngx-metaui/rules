import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
  ButtonModule,
  ComboboxModule,
  ShellbarModule,
  TabsModule
} from '@fundamental-ngx/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MetaApplicationComponent} from './meta-application.component';


@NgModule({
  declarations: [
    MetaApplicationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TabsModule,
    RouterModule,
    ComboboxModule,
    ButtonModule,
    ShellbarModule
  ],
  exports: [
    MetaApplicationComponent
  ],
  providers: []
})
export class MetaApplicationModule {
}
