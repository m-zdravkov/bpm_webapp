import { Component } from '@angular/core';
import { User } from '../models/User';
import { AuthServiceInstance, IAuthService } from '../auth/services/AuthService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'bpm-register-form',
  templateUrl: './register-form.component.html',
  styleUrls:['./register-form.component.scss']
})
export class RegisterFormComponent {
  authService: IAuthService;

  constructor(
    private httpClient: HttpClient,
    authServiceInstance: AuthServiceInstance) {

    this.authService = authServiceInstance.getInstance();
  }

  user = new User('', '');

  register() {
    this.authService.register(this.user, this.httpClient);
  }
}
