import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CompUserLoginComponent } from './tweet-component/comp-user-login/comp-user-login.component';
import { CompUserRegisterComponent } from './tweet-component/comp-user-register/comp-user-register.component';
import { HomeComponentComponent } from './tweet-component/home-component/home-component.component';
import { UserTweetsComponent } from './tweet-component/user-tweets/user-tweets.component';

const routes: Routes = [
  {path:'home', component:HomeComponentComponent, canActivate: [AuthGuard]},
  {path:'userTweets', component:UserTweetsComponent, canActivate: [AuthGuard] },
  {path:'login', component:CompUserLoginComponent},
  {path:'register', component:CompUserRegisterComponent},
  {path:'', redirectTo:"/login", pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
