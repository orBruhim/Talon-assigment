import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { isLoggedIn } from './login/login.selector';
import { logout } from './login/reducers/login.actions';

@Component({
  selector: 'talon-assigment-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  // user$ = this.loginService.user$.pipe(tap((user) => {}));
  isLoggedIn$ = this.store.pipe(select(isLoggedIn));
  constructor(
    private loginService: LoginService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.loginService.autoLogin();
  }
  logout(): void {
    this.loginService.logout();
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}
