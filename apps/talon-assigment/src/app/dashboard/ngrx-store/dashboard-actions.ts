import { createAction, props } from '@ngrx/store';
import { TalonEvent } from '../../app.model';

export const loadAllEvents = createAction(
  '[Events Resolver] load all Events Data'
);

export const allEventsHasBeenLoaded = createAction(
  '[Events Effects] Bring events data from backend',
  props<{ events: TalonEvent[] }>()
);
