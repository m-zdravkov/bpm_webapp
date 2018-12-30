import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { AuthServiceInstance, IAuthService } from '../auth/services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'bpm-login-form',
  templateUrl: './bpm-login-form.component.html',
  styleUrls: ['./bpm-login-form.component.scss']
})
export class LoginFormComponent {
  constructor(private httpClient: HttpClient, private router: Router, public authServiceInstance: AuthServiceInstance) { }
  user = new User('', '');
  authService: IAuthService = this.authServiceInstance.getInstance();
  login() {
    this.authService.login(this.user, this.httpClient);
  }
}
