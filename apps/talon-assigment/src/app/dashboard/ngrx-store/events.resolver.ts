import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { filter, finalize, first, Observable, tap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { loadAllEvents } from './events.actions';
import { selectAreEventsLoaded } from './events.selector';

@Injectable({ providedIn: 'root' })
export class EventsResolver implements Resolve<boolean> {
  isLoading = false;
  constructor(private store: Store) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(selectAreEventsLoaded),
      tap((areEventsLoaded) => {
        if (!this.isLoading && !areEventsLoaded) {
          this.isLoading = true;
          this.store.dispatch(loadAllEvents());
        }
      }),
      first(),
      filter((areEventsLoaded) => areEventsLoaded),
      finalize(() => (this.isLoading = false))
    );
  }
}
