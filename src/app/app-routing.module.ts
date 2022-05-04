import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompUserLoginComponent } from './tweet-component/comp-user-login/comp-user-login.component';
import { HomeComponentComponent } from './tweet-component/home-component/home-component.component';

const routes: Routes = [
  {path:'home', component:HomeComponentComponent},
  {path:'login', component:CompUserLoginComponent},
  {path:'', redirectTo:"/login", pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
