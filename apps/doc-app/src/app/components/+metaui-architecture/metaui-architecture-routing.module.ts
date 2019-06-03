import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetauiArchitectureComponent } from './metaui-architecture.component';

const routes: Routes = [
  {
    path: '',
    component: MetauiArchitectureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetauiArchitectureRoutingModule { }
