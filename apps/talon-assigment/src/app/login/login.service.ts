import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService implements OnDestroy {
  user$ = new Subject<LoginResponse | null>();

  private destroySubject = new Subject<void>();

  constructor(private http: HttpClient, private router: Router) {}

  // get user$(): Observable<LoginResponse | null> {
  //   return this.userSubject.asObservable();
  // }

  signUp(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>('http://localhost:3000/register', {
        email,
        password,
      })
      .pipe(
        takeUntil(this.destroySubject),
        tap((loginResponse) => {
          this.handleAuth(loginResponse);
        })
      );
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>('http://localhost:3000/login', {
        email,
        password,
      })
      .pipe(
        takeUntil(this.destroySubject),
        tap((loginResponse) => {
          this.handleAuth(loginResponse);
        })
      );
  }
  logout(): void {
    this.user$.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
  }

  autoLogin(): void {
    const user = JSON.parse(localStorage.getItem('userData')!);

    if (!user) {
      return;
    }
    this.user$.next(user);
    this.autoLogout(60 * 60 * 1000);
  }

  autoLogout(tokenTime: number): void {
    setTimeout(() => {
      this.logout();
    }, tokenTime);
  }

  private handleAuth(loginResponse: LoginResponse) {
    this.user$.next(loginResponse);
    debugger;
    loginResponse &&
      localStorage.setItem('userData', JSON.stringify(loginResponse));
    this.autoLogout(60 * 60 * 1000);
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }
}
