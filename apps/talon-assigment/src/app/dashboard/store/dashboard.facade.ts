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

  loadEventsData(): Observable<TalonEvent[]> {
    return this.appService.getEventData().pipe(
      tap((eventData: TalonEvent[]) => {
        this.dashboardStore.update((store) => {
          return {
            ...store,
            eventData,
          };
        });
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
}
