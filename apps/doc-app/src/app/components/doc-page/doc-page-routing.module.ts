import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocPageComponent } from './doc-page.component';

const routes: Routes = [
  {
    path: '',
    component: DocPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocPageRoutingModule { }
