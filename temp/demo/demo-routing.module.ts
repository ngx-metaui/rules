import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {InvoiceCreateComponent} from './domain/invoice/invoice-create.component';
import {InvoiceViewComponent} from './domain/invoice/invoice-view.component';
import {InvoiceEditComponent} from './domain/invoice/invoice-edit.component';
import {UserViewComponent} from './domain/user/user-view.component';
import {DemoEntityResolver} from './domain/rest/entity-resolver.service';
import {SupplierViewComponent} from './domain/supplier/supplier-view.component';
import {LandingComponent} from './landing/landing.component';
import {Landing2Component} from './landing2/landing2.component';
import {Landing3Component} from './landing3/landing3.component';


const demoRouting: Routes = [
  {
    path: 'demo', component: HomeComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: '',
            redirectTo: './home',
            pathMatch: 'prefix'
          },
          {
            path: 'home',
            component: LandingComponent
          },
          {
            path: 'invocing',
            component: Landing2Component
          },
          {
            path: 'receiving',
            component: Landing3Component
          }
        ]
      },

      {
        path: 'invoice/create',
        component: InvoiceCreateComponent
      },
      {
        path: 'invoice/edit/:id',
        component: InvoiceEditComponent
      },
      {
        path: 'invoice/view/:id',
        component: InvoiceViewComponent
      },
      {
        path: 'entity/detail/User/:id',
        component: UserViewComponent,
        resolve: {
          entity: DemoEntityResolver
        }
      },
      {
        path: 'entity/detail/Supplier/:id',
        component: SupplierViewComponent,
        resolve: {
          entity: DemoEntityResolver
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
export class DemoRoutingModule {
}
