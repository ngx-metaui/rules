import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayComponent} from './playground/play.component';


const appRoutes: Routes = [
  {path: 'play', component: PlayComponent},
  {path: '', redirectTo: '/play', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
