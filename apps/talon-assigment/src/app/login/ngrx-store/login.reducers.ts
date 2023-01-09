import { createReducer, on } from '@ngrx/store';
import { TalonUser } from '../../app.model';
import { login, logout } from './login.actions';

export interface LoginState {
  user: TalonUser | null;
}

export const initialLoginState: LoginState = {
  user: null,
};

export const loginReducer = createReducer(
  initialLoginState,
  on(login, (state, action) => {
    return {
      user: action.user,
    };
  }),
  on(logout, () => {
    return {
      user: null,
    };
  })
);
