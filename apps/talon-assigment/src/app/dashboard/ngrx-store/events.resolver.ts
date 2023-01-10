import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { TalonEvent } from '../../app.model';
import { finalize, first, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadAllEvents } from './events.actions';

@Injectable({ providedIn: 'root' })
export class EventsResolver implements Resolve<TalonEvent> {
  isLoading = false;
  constructor(private store: Store) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      tap(() => {
        if (!this.isLoading) {
          this.isLoading = true;
          this.store.dispatch(loadAllEvents());
        }
      }),
      first(),
      finalize(() => (this.isLoading = false))
    );
  }
}
