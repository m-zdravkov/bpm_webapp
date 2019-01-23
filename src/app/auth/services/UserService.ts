import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LocalStorageService} from '../../utils/LocalStorageService';
import {Router} from '@angular/router';
import {Urls} from '../../utils/Urls';
import {RegistrationUser} from '../../models/RegistrationUser';


export interface IUserService {
  updateUser(user: RegistrationUser, httpClient: HttpClient): void;
  getUser(httpClient: HttpClient): void;

}
@Injectable()
export class UserServiceInstance {
  constructor(public lsService: LocalStorageService, private router: Router) {}

  getInstance(): IUserService {
    return new UserService(this.lsService, this.router);
  }
}

class UserService implements IUserService {
  constructor(private lsService: LocalStorageService, private  router: Router) {}

  updateUser(user: RegistrationUser, httpClient: HttpClient): void {
    const urls = new Urls();
    httpClient.put<RegistrationUser>(urls.getUrl('updateUser').toString(), user).subscribe(
      responseUser => {
      this.lsService.registrationUser = responseUser;
      },
      err => {
        console.log(err);
      });
  }
  getUser(httpClient: HttpClient): void {
    const urls = new Urls();
    console.log(this.lsService.accessToken);
    httpClient.get<RegistrationUser>(urls.getUrl('profile').toString()).subscribe(responseUser => {
        this.lsService.registrationUser = responseUser;
      },
      err => {
        console.log(err);
      });
  }
}
