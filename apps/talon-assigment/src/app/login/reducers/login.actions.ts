import { createAction, props } from '@ngrx/store';
import { TalonUser } from '../../app.model';

export const login = createAction(
  '[Login Page] user login',
  props<{ user: TalonUser }>()
);

export const signup = createAction(
  '[Login Page] user signup',
  props<{ user: TalonUser }>()
);

export const logout = createAction('[Logout Page] user logout');
