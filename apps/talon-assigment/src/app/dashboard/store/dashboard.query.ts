import { Query } from '@datorama/akita';
import { DashboardState, DashboardStore } from './dashboard.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DashboardQuery extends Query<DashboardState> {
  selectedEventData$ = this.select((store) => store.eventData);

  selectedIsLoading$ = this.select((store) => store.isLoading);

  constructor(protected override store: DashboardStore) {
    super(store);
  }
}
