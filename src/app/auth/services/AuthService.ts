import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';
import { Urls } from '../../utils/Urls';
import { AccessToken } from '../../models/AccessToken';
import * as moment from 'moment';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from '../../utils/LocalStorageService';
import { ToastrService } from 'ngx-toastr';

export interface IAuthService {
  setToken(res: AccessToken): void;
  register(user: User, httpClient: HttpClient): void;
  login(user: User, httpClient: HttpClient): Observable<AccessToken>;
  isAuthenticated(nextVal?: AccessToken): boolean;
  logout(): void;
}

@Injectable()
export class AuthServiceInstance {
  constructor(
    public lsService: LocalStorageService,
    public toastrService: ToastrService
  ) {}

  getInstance(): IAuthService {
    return new AuthService(this.lsService, this.toastrService);
  }
}

class AuthService implements IAuthService {

  constructor(
    private lsService: LocalStorageService,
    private toastrService: ToastrService
  ) {}

  setToken(res: AccessToken): void {
    this.lsService.accessToken = res;
  }

  register(user: User, httpClient: HttpClient): void {
    const urls = new Urls();
    httpClient.post<AccessToken>(urls.getUrl('register').toString(), user)
      .subscribe(accessToken => {
          this.setToken(accessToken);
          this.toastrService.success('You have been registered', 'Welcome');
        },
        err => {
          console.log(err);
          this.toastrService.error(err.error.msg, 'Something went wrong with your registration.');
        });
  }

  login(user: User, httpClient: HttpClient): Observable<AccessToken> {
    const urls = new Urls();
    httpClient.post<AccessToken>(urls.getUrl('login').toString(), user)
      .subscribe(accessToken => {
          this.setToken(accessToken);
          this.toastrService.success('Ready to look for a game?', 'Hi again!');
        },
        err => {
          console.log(err);
          this.toastrService.error(err.error.msg, 'Oops! Could not log in.');
        });
    return httpClient.post<AccessToken>(urls.getUrl('login').toString(), user);
  }

  logout() {
    this.lsService.accessToken = new AccessToken();
    this.toastrService.info('You have logged out.', 'Bye!');
  }

  isAuthenticated(nextVal?: AccessToken): boolean {
    try {
      let token: AccessToken = this.lsService.accessToken;
      if (nextVal) {
        token = nextVal;
      }
      return token.expireTime && moment(token.expireTime).isAfter(moment()) && token.token !== undefined;
    } catch (err) {
      return false;
    }
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  public auth: IAuthService;
  constructor( public router: Router, authServiceInstance: AuthServiceInstance) {
    this.auth = authServiceInstance.getInstance();
  }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

@Injectable()
export class LoginRedirectService implements CanActivate {
  public auth: IAuthService;
  constructor( public router: Router, authServiceInstance: AuthServiceInstance) {
    this.auth = authServiceInstance.getInstance();
  }

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
