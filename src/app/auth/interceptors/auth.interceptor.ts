import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.curentUser || localStorage.accessToken) {
      const currentUser = localStorage.currentUser || { accessToken: localStorage.accessToken};
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.accessToken}`,
          'refresh-token' : currentUser['refresh-token']
        }
      });
    }
    return next.handle(req);
  }
}
