import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayComponent} from './playground/play.component';


const appRoutes: Routes = [
  {path: 'play', component: PlayComponent},
  {path: '', redirectTo: '/demo/home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
