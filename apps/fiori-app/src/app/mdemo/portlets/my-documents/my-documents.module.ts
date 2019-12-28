import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconModule, IdentifierModule, TableModule} from '@fundamental-ngx/core';
import {MyDocumentsComponent} from './my-documents.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    MyDocumentsComponent
  ],
  imports: [
    CommonModule,
    IdentifierModule,
    TableModule,
    IconModule,
    RouterModule
  ],
  exports: [
    MyDocumentsComponent
  ],
  entryComponents: [
    MyDocumentsComponent
  ],

  providers: []
})
export class MyDocumentsModule {

}
