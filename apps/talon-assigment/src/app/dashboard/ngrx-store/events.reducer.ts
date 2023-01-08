import { TalonEvent } from '../../app.model';
import { createReducer, on } from '@ngrx/store';
import { events } from './events.actions';

export interface EventState {
  events: TalonEvent[];
}

export const initialEventsState = {
  events: [],
};

export const eventsReducer = createReducer(
  initialEventsState,
  on('events', (state, aciton) => {
    return {
      events: aciton.events,
    };
  })
);
