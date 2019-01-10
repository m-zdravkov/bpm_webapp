import { Component } from '@angular/core';
import { RegistrationUser } from '../models/RegistrationUser';
import { AuthServiceInstance, IAuthService } from '../auth/services/AuthService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'bpm-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  authService: IAuthService;

  constructor(
    private httpClient: HttpClient,
    authServiceInstance: AuthServiceInstance) {
    this.authService = authServiceInstance.getInstance();
  }

  registrationUser = new RegistrationUser('', '', '');

  register() {
    this.authService.register(this.registrationUser, this.httpClient);
  }
}
