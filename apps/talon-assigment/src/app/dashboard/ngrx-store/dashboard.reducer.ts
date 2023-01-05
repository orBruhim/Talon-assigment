import { TalonEvent } from '../../app.model';
import { createReducer, on } from '@ngrx/store';
import { allEventsHasBeenLoaded } from './dashboard-actions';

export interface DashboardState {
  events: TalonEvent[];
}

export const initialDashboardState: DashboardState = {
  events: [],
};

export const DashboardReducer = createReducer(
  initialDashboardState,
  on(allEventsHasBeenLoaded, (state, action) => {
    return {
      events: action.events,
    };
  })
);
