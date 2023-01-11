import { TalonEvent } from '../../app.model';
import { createReducer, on } from '@ngrx/store';
import { allEventsHasBeenLoaded } from './events.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export type EventsState = EntityState<TalonEvent>;

export const adapter = createEntityAdapter<TalonEvent>();

export const initialEventsState: EventsState = adapter.getInitialState();

export const EventsReducer = createReducer(
  initialEventsState,
  on(allEventsHasBeenLoaded, (state, action) =>
    adapter.setAll(action.events, state)
  )
);

export const { selectAll } = adapter.getSelectors();
