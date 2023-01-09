import { createAction, props } from '@ngrx/store';
import { TalonEvent } from '../../app.model';

export const loadAllEvents = createAction('[Events Resolver] Load all events');

export const allEventsHasBeenLoaded = createAction(
  '[Events Resolver] All events has been loaded from backend',
  props<{ events: TalonEvent[] }>()
);
