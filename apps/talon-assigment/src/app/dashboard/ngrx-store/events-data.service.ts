import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { TalonEvent } from '../../app.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EventsDataService extends DefaultDataService<TalonEvent> {
  url = environment.baseUrl;

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Event', http, httpUrlGenerator);
  }

  override getAll(): Observable<TalonEvent[]> {
    console.log('get');
    return this.http.get<TalonEvent[]>(this.url);
  }
}
