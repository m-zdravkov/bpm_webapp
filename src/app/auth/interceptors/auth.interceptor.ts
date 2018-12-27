import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../utils/LocalStorageService';
import { AccessToken } from '../../models/AccessToken';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private lsService: LocalStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.lsService.accessToken && Object.keys(this.lsService.accessToken) > 0) {
      const accessToken: AccessToken = this.lsService.accessToken;
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken.token}`,
          'refresh-token' : accessToken.refreshToken
        }
      });
    }
    console.log(req);
    return next.handle(req);
  }
}
