import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../login.model';
import { Router } from '@angular/router';
import { TalonUser } from '../../app.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user$ = new Subject<LoginResponse | null>();

  constructor(private http: HttpClient, private router: Router) {}

  signUp(user: TalonUser): Observable<LoginResponse> {
    const { email, password } = user;
    return this.http.post<LoginResponse>('http://localhost:3000/register', {
      email,
      password,
    });
  }

  login(user: TalonUser): Observable<LoginResponse> {
    const { email, password } = user;
    return this.http.post<LoginResponse>('http://localhost:3000/login', {
      email,
      password,
    });
  }
  logout(): void {
    this.user$.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
  }
}
