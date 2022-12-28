import { createAction, createActionGroup, props } from '@ngrx/store';
import { TalonEvent } from '../../app.model';

export const EventDataActions = createActionGroup({
  source: 'Event Data API',
  events: {
    'Event Data API': props<{ eventData: TalonEvent[] }>(),
  },
});
export const updateFilteredData = createAction(
  'updateFilteredData',
  props<{ filteredData: TalonEvent[] }>()
);
export const updateIsLoading = createAction('updateIsLoading');
