import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {InvoiceComponent} from './domain/invoice/invoice.component';


const demoRouting: Routes = [
  {
    path: 'mdemo', component: HomeComponent,
    children: [
      {
        path: '',
        component: InvoiceComponent
      }
    ]
  }

];


@NgModule({
  imports: [
    RouterModule.forChild(demoRouting)
  ],
  exports: [
    RouterModule
  ]
})
export class MetaDemoRoutingModule {
}
