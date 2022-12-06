import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { LoginService } from './login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.loginService.user$.pipe(
      switchMap((user) => {
        if (!user) {
          return next.handle(request);
        }
        const cloneRequest = request.clone({
          params: new HttpParams().set('auth', user.accessToken),
        });
        return next.handle(cloneRequest);
      })
    );
  }
}
