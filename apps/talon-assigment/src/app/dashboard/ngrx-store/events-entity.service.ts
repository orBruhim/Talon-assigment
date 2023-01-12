import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { TalonEvent } from '../../app.model';

@Injectable({ providedIn: 'root' })
export class EventsEntityService extends EntityCollectionServiceBase<TalonEvent> {
  constructor(
    entityCollectionServiceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super('Event', entityCollectionServiceElementsFactory);
  }
}
