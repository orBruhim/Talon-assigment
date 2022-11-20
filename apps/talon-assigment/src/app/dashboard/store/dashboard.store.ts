import { Store, StoreConfig } from '@datorama/akita';
import { TalonEvent } from '../../app.model';
import { Injectable } from '@angular/core';

export interface DashboardState {
  eventData: TalonEvent[];
  isLoading: boolean;
}

export function createInitialState(): DashboardState {
  return {
    eventData: [
      {
        user: {
          name: '',
          email: '',
        },
        os: '',
        eventType: '',
        severity: '',
        time: '',
      },
    ],
    isLoading: false,
  };
}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'dashboard' })
export class DashboardStore extends Store<DashboardState> {
  constructor() {
    super(createInitialState());
  }
}
