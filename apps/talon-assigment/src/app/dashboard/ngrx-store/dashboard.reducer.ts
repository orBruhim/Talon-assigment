import { createReducer, on } from '@ngrx/store';
import { EventDataActions } from './dashboard-actions';
import { TalonEvent } from '../../app.model';

export const initialState: TalonEvent[] = [];

export const loadedEventsDataReducer = createReducer(
  initialState,
  // on(EventDataActions.eventDataApi, (state, { eventData }) => eventData)
  on(EventDataActions.eventDataApi, (state, { eventData }) => eventData)
);
