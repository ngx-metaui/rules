import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {InvoiceComponent} from './domain/invoice/invoice.component';
import {MetaContentPageComponent} from '@ngx-metaui/fiori-rules';
import {EntityResolver} from './domain/rest/entity-resolver.service';


const demoRouting: Routes = [
  {
    path: 'mdemo', component: HomeComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'invoice/create',
        component: InvoiceComponent
      },
      {
        path: 'invoice/edit/:id',
        component: InvoiceComponent
      },
      {
        path: 'invoice/view/:id',
        component: InvoiceComponent
      },
      {
        path: 'entity/detail/:type/:id',
        component: MetaContentPageComponent,
        resolve: {
          entity: EntityResolver
        }
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
