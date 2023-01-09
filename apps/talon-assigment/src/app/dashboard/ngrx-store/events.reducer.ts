import { TalonEvent } from '../../app.model';
import { createReducer, on } from '@ngrx/store';
import { allEventsHasBeenLoaded } from './events.actions';

export interface EventsState {
  events: TalonEvent[];
}

export const initialEventsState: EventsState = {
  events: [],
};

export const EventsReducer = createReducer(
  initialEventsState,
  on(allEventsHasBeenLoaded, (state, action) => {
    return {
      events: action.events,
    };
  })
);
