import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { allEventsHasBeenLoaded, loadAllEvents } from './dashboard-actions';
import { map, switchMap } from 'rxjs';
import { AppService } from '../../app.service';

@Injectable({ providedIn: 'root' })
export class DashboardEffects {
  constructor(private actions$: Actions, private appService: AppService) {}

  loadedEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllEvents),
      switchMap(() => {
        return this.appService.getEventData();
      }),
      map((events) => allEventsHasBeenLoaded({ events }))
    )
  );
}
