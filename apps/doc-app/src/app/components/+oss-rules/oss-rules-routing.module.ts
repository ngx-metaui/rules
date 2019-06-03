import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OssRulesComponent } from './oss-rules.component';

const routes: Routes = [
  {
    path: '',
    component: OssRulesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OssRulesRoutingModule { }
