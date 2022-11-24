import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TalonEvent } from '../../app.model';
import { AppService } from '../../app.service';
import { DashboardStore } from './dashboard.store';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  constructor(
    private appService: AppService,
    private dashboardStore: DashboardStore
  ) {}

  sortEventData(): Observable<TalonEvent[]> {
    return this.appService.getEventData().pipe(
      tap((eventData: TalonEvent[]) => {
        eventData.sort((currEvent, nextEvent) => {
          if (currEvent.time > nextEvent.time) {
            return 1;
          }

          if (currEvent.time < nextEvent.time) {
            return -1;
          }

          return 0;
        });
      })
    );
  }

  loadEventData(): Observable<TalonEvent[]> {
    return this.sortEventData().pipe(
      tap((eventData: TalonEvent[]) => {
        this.dashboardStore.update((state) => {
          return {
            ...state,
            eventData,
          };
        });
      })
    );
  }
}
