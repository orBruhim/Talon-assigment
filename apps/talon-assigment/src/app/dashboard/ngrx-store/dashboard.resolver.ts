import { Injectable } from '@angular/core';
import { Resolver } from 'cypress/types/bluebird';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { finalize, first, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadAllEvents } from './dashboard-actions';

@Injectable({ providedIn: 'root' })
export class DashboardResolver implements Resolver<any> {
  isLoading = false;

  constructor(private store: Store) {}

  // @ts-ignore
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
