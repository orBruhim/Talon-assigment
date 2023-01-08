import { createAction, props } from '@ngrx/store';
import { TalonEvent } from '../../app.model';

export const events = createAction(
  'get events',
  props<{ events: TalonEvent[] }>
);
