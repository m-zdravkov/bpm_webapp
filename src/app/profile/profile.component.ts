import { Component } from '@angular/core';
import {RegistrationUser} from '../models/RegistrationUser';
import {LocalStorageService} from '../utils/LocalStorageService';
import {IUserService, UserServiceInstance} from '../auth/services/UserService';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'bpm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userService: IUserService;

  constructor(private lsService: LocalStorageService, private httpClient: HttpClient,
              userServiceInstance: UserServiceInstance) {
    this.userService = userServiceInstance.getInstance();
  }
  registrationUser = this.lsService.registrationUser;

  updateUser() {
    this.userService.updateUser(this.registrationUser, this.httpClient);
  }
}
