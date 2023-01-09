import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { isLoggedIn } from './ngrx-store/login.selector';
import { LoginService } from './ngrx-store/login.service';
import { login, signup } from './ngrx-store/login.actions';

@Component({
  selector: 'talon-assigment-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  isLoggedIn$ = this.store.pipe(select(isLoggedIn));

  constructor(
    private loginService: LoginService,
    private router: Router,
    private store: Store
  ) {}

  login(): void {
    const user = {
      email: this.loginForm.controls.email.value || '',
      password: this.loginForm.controls.password.value || '',
    };
    this.loginService
      .login(user)
      .pipe(
        tap(() => {
          this.store.dispatch(login({ user }));
        })
      )
      .subscribe();
  }

  signUp(): void {
    const user = {
      email: this.loginForm.controls.email.value || '',
      password: this.loginForm.controls.password.value || '',
    };
    this.loginService.signUp(user).subscribe(() => {
      this.store.dispatch(signup({ user }));
      this.router.navigate(['/dashboard']);
    });
  }
}
