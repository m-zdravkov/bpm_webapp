import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { AuthServiceInstance, IAuthService } from '../auth/services/AuthService';
import { Router } from '@angular/router';
import {IUserService, UserServiceInstance} from '../auth/services/UserService';

@Component({
  selector: 'bpm-login-form',
  templateUrl: './bpm-login-form.component.html',
  styleUrls: ['./bpm-login-form.component.scss']
})
export class LoginFormComponent {
  constructor(private httpClient: HttpClient, private router: Router, public authServiceInstance: AuthServiceInstance,
              public userServiceInstance: UserServiceInstance) { }
  user = new User('', '');
  authService: IAuthService = this.authServiceInstance.getInstance();
  userService: IUserService = this.userServiceInstance.getInstance();

  login() {
    this.authService.login(this.user, this.httpClient).subscribe(accessToken => {
        this.router.navigate(['/']);
        this.authService.setToken(accessToken);
        this.userService.getUser(this.httpClient);

      },
      err => {
        console.log(err);
      });
  }
}
