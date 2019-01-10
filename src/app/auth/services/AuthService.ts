import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';
import { Urls } from '../../utils/Urls';
import { AccessToken } from '../../models/AccessToken';
import * as moment from 'moment';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from '../../utils/LocalStorageService';
import {Observable} from 'rxjs';

export interface IAuthService {
  setToken(res: AccessToken): void;
  register(user: User, httpClient: HttpClient): void;
  login(user: User, httpClient: HttpClient): Observable<AccessToken>;
  isAuthenticated(nextVal?: AccessToken): boolean;
  logout(): void;
}

@Injectable()
export class AuthServiceInstance {
  constructor(public lsService: LocalStorageService, private router: Router) {}

  getInstance(): IAuthService {
    return new AuthService(this.lsService, this.router);
  }
}

class AuthService implements IAuthService {

  constructor(private lsService: LocalStorageService, private router: Router) {}

  setToken(res: AccessToken): void {
    this.lsService.accessToken = res;
  }

  register(user: User, httpClient: HttpClient): void {
    const urls = new Urls();
    httpClient.post<AccessToken>(urls.getUrl('register').toString(), user)
      .subscribe(accessToken => {
          this.setToken(accessToken);
          this.router.navigate(['/']);
        },
        err => {
          console.log(err);
        });
  }

  login(user: User, httpClient: HttpClient): Observable<AccessToken> {
    const urls = new Urls();
    return httpClient.post<AccessToken>(urls.getUrl('login').toString(), user);
  }

  logout() {
    this.lsService.accessToken = new AccessToken();
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
