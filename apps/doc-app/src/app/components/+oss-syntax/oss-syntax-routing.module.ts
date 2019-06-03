import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OssSyntaxComponent } from './oss-syntax.component';

const routes: Routes = [
  {
    path: '',
    component: OssSyntaxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OssSyntaxRoutingModule { }
