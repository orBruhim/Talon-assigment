import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TalonEvent } from '../../app.model';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class EventsDataService extends DefaultDataService<TalonEvent> {
  url = environment.baseUrl;

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Event', http, httpUrlGenerator);
  }

  override getAll(): Observable<TalonEvent[]> {
    return this.http.get<TalonEvent[]>(this.url);
  }
}
