import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';

export const selectDashboardState =
  createFeatureSelector<DashboardState>('events');

export const selectAllEvents = createSelector(
  selectDashboardState,
  (state) => state.events
);
