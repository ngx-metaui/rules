import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {InvoiceComponent} from './domain/invoice/invoice.component';
import {MetaContentPageComponent} from '@ngx-metaui/fiori-rules';
import {EntityResolver} from './domain/rest/entity-resolver.service';


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
