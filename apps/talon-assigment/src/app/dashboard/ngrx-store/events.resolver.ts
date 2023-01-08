import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { filter, first, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventsEntityService } from './events-entity-service';
import { EventsDataService } from './events-data.service';

@Injectable({
  providedIn: 'root',
})
export class EventsResolver implements Resolve<any> {
  constructor(
    private eventsEntityService: EventsEntityService,
    private eventsDataService: EventsDataService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.eventsDataService.getAll().pipe(
      map((events) => {
        console.log(events);
        return events;
      })
    );
  }
}
