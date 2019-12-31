import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {InvoiceComponent} from './domain/invoice/invoice.component';
import {MetaContentPageComponent, MetaHomePageComponent} from '@ngx-metaui/fiori-rules';
import {EntityResolver} from './domain/rest/entity-resolver.service';
import {Landing2Component} from '../mdemo/landing2/landing2.component';
import {Landing3Component} from '../mdemo/landing3/landing3.component';


const demoRouting: Routes = [
  {
    path: 'mdemo', component: HomeComponent,
    children: [
      {
        path: 'home',
        component: MetaHomePageComponent
      },
      {
        path: 'invoicing',
        component: Landing2Component
      },
      {
        path: 'receiving',
        component: Landing3Component
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
