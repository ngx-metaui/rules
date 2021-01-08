import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {HomeComponent} from './home/home.component';
import {UserDetailExposedComponent} from './user-detail-exposed/user-detail-exposed.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {path: 'home', component: HomeComponent},
  {path: 'user', component: UserDetailComponent},
  {path: 'userm', component: UserDetailExposedComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
