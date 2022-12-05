import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:3000/register', {
      email,
      password,
    });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:3000/login', {
      email,
      password,
    });
  }
}
