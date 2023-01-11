import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventsState } from './events.reducer';

import * as fromEvents from '../ngrx-store/events.reducer';

export const selectEventsState = createFeatureSelector<EventsState>('events');

export const selectAllEvents = createSelector(
  selectEventsState,
  fromEvents.selectAll
);
