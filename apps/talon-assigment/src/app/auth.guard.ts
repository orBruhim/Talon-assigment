import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginService } from './login/login.service';
import { select, Store } from '@ngrx/store';
import { isLoggedIn } from './login/login.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private store: Store
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    // console.log('can');
    // return this.loginService.user$.pipe(
    //   map((user) => {
    //     debugger;
    //     const isLogin = !!user;
    //     if (isLogin) {
    //       return true;
    //     }
    //     return this.router.createUrlTree(['/login']);
    //   })
    // );
    return this.store.pipe(
      select(isLoggedIn),
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
