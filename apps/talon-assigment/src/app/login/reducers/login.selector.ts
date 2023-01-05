import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from './index';

export const selectLoginState = createFeatureSelector<LoginState>('login');

export const isLoggedIn = createSelector(
  selectLoginState,
  (login) => !!login.user
);
