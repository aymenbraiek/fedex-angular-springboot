import { createReducer, on } from '@ngrx/store';
import { User } from '../models/User.model';
import * as UserActions from '../actions/user.action';

export interface UserState {
  current_user: User;
}

const initialState = {
  current_user: null

}

const _userReducer = createReducer(initialState,
  on(UserActions.LOG_IN, (state, action) => {
    console.log('this is: ' + action.payload.userName);
    return {
      ...state
    }
  })
);

export function userReducer(state, action) {
  return _userReducer(state, action);
}