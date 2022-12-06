import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

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

  constructor(private loginService: LoginService, private router: Router) {}
  login(): void {
    this.loginService
      .login(
        this.loginForm.controls.email.value || '',
        this.loginForm.controls.password.value || ''
      )
      .subscribe((data) => {
        this.router.navigate(['/dashboard']);
        console.log(data);
      });
  }

  signUp(): void {
    this.loginService
      .signUp(
        this.loginForm.controls.email.value || '',
        this.loginForm.controls.password.value || ''
      )
      .subscribe((data) => {
        this.router.navigate(['/dashboard']);
        console.log(data);
      });
  }
}
