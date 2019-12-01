import { createReducer, on } from '@ngrx/store';
import { User } from '../models/User.model';
import * as UserActions from '../actions/user.action';

export interface UserState {
  current_user: User;
  passwordErrMsg: string;
  emailErrMsg: string;
  valid: boolean;
}

const initialState = {
  current_user: null,
  passwordErrMsg: undefined,
  emailErrMsg: undefined,
  valid: undefined
}

const _userReducer = createReducer(initialState,
  on(UserActions.LOG_IN_SUCCESS, (state, action) => {
    //console.log(action.payload);
    return {
      ...state,
      current_user: action.payload.current_user,
      passwordErrMsg: action.payload.passwordErrMsg,
      emailErrMsg: action.payload.emailErrMsg,
      valid: action.payload.valid
    }
  }),
  on(UserActions.LOG_IN_FAILURE, (state, action) => {
    //console.log(action.payload);
    return {
      ...state,
      current_user: action.payload.current_user,
      passwordErrMsg: action.payload.passwordErrMsg,
      emailErrMsg: action.payload.emailErrMsg,
      valid: action.payload.valid
    }
  })
);

export function userReducer(state, action) {
  return _userReducer(state, action);
}