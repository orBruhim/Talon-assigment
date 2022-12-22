import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    console.log('can');
    return this.loginService.user$.pipe(
      map((user) => {
        debugger;
        const isLogin = !!user;
        if (isLogin) {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}
