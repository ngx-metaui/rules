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
        redirectTo: 'create',
        pathMatch: 'prefix'
      },
      {
        path: 'edit',
        component: InvoiceComponent
      },
      {
        path: 'view',
        component: InvoiceComponent
      },
      {
        path: 'create',
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
