import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterFormComponent } from './register/register-form.component';
import { AuthGuardService as AuthGuard} from './auth/services/AuthService';
import { LoginRedirectService as RedirectFromLoginGuard} from './auth/services/AuthService';
import { LoginFormComponent } from './login/LoginFormComponent';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  { path: 'register', component: RegisterFormComponent, canActivate: [RedirectFromLoginGuard]},
  /* As authorized { path: 'register', component: RegisterFormComponent, canActivate: [AuthGuard] },*/
  { path: 'login', component: LoginFormComponent, canActivate: [RedirectFromLoginGuard] },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
