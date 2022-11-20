import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TalonEvent } from './app.model';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  url = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getEventData(): Observable<TalonEvent[]> {
    return this.http.get<TalonEvent[]>(this.url);
  }
}
