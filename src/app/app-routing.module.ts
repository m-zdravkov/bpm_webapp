import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterFormComponent } from './register/register-form.component';
import { AuthGuardService as AuthGuard} from './auth/services/AuthService';
import { LoginFormComponent } from './login/LoginFormComponent';
import { CreateLobbyComponent } from './create-lobby/create-lobby.component';
import { LobbyComponent } from './lobby/lobby.component';

const routes: Routes = [
  { path: 'register', component: RegisterFormComponent},
  /* As authorized { path: 'register', component: RegisterFormComponent, canActivate: [AuthGuard] },*/
  { path: 'login', component: LoginFormComponent  },
  { path: 'lobby/create', component: CreateLobbyComponent, canActivate: [AuthGuard]  },
  { path: 'lobby/view/:id', component: LobbyComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
