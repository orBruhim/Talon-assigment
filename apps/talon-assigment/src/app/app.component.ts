import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { logout } from './login/ngrx-store/login.actions';
import { isLoggedIn } from './login/ngrx-store/login.selector';
import { LoginService } from './login/ngrx-store/login.service';

@Component({
  selector: 'talon-assigment-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isLoggedIn$ = this.store.pipe(select(isLoggedIn));
  constructor(
    private loginService: LoginService,
    private router: Router,
    private store: Store
  ) {}

  logout(): void {
    this.loginService.logout();
    this.store.dispatch(logout());
  }
}
