import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'talon-assigment-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user$ = this.loginService.user$.pipe(
    tap((data) => {
      console.log(data);
    })
  );
  constructor(private loginService: LoginService, private router: Router) {}
  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
