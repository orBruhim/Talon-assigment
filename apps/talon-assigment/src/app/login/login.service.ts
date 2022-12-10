import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userSubject = new Subject<LoginResponse | null>();

  constructor(private http: HttpClient, private router: Router) {}

  get user$(): Observable<LoginResponse | null> {
    return this.userSubject.asObservable();
  }

  signUp(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>('http://localhost:3000/register', {
        email,
        password,
      })
      .pipe(
        tap((loginResponse) => {
          this.userSubject.next(loginResponse);
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
        tap((loginResponse) => {
          this.router.navigate(['/dashboard']);
          this.userSubject.next(loginResponse);
        })
      );
  }
  logout(): void {
    this.userSubject.next(null);
  }

  autoLogin(): void {}

  autoLogout(): void {}
}
