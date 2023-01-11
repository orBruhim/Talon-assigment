import { TalonEvent } from '../../app.model';
import { createReducer, on } from '@ngrx/store';
import { allEventsHasBeenLoaded } from './events.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface EventsState extends EntityState<TalonEvent> {
  areEventsLoaded: boolean;
}

export const adapter = createEntityAdapter<TalonEvent>({
  selectId: (event: TalonEvent) => event.user.email,
});

export const initialEventsState: EventsState = adapter.getInitialState({
  areEventsLoaded: false,
});

export const EventsReducer = createReducer(
  initialEventsState,
  on(allEventsHasBeenLoaded, (state, action) =>
    adapter.setAll(action.events, { ...state, areEventsLoaded: true })
  )
);

export const { selectAll } = adapter.getSelectors();
