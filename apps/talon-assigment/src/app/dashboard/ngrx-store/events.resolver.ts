import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { filter, first, Observable, tap } from 'rxjs';
import { EventsEntityService } from './events-entity.service';

@Injectable({ providedIn: 'root' })
export class EventsResolver implements Resolve<boolean> {
  constructor(private eventsEntityService: EventsEntityService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.eventsEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.eventsEntityService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
