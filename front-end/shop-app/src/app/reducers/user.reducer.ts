import { createReducer, on } from '@ngrx/store';
import { User } from '../models/User.model';
import * as UserActions from '../actions/user.action';

export interface UserState {
  current_user: User;
  firstNameErrMsg: string;
  lastNameErrMsg: string;
  emailErrMsg: string;
  passwordErrMsg: string;
  confirmPasswordErrMsg: string;
  generalErr: string;
  successMsg: string;
  valid: boolean;
  loading: boolean;
}

const initialState = {
  current_user: null,
  firstNameErrMsg: undefined,
  lastNameErrMsg: undefined,
  emailErrMsg: undefined,
  passwordErrMsg: undefined,
  confirmPasswordErrMsg: undefined,
  generalErr: undefined,
  successMsg: undefined,
  valid: undefined,
  loading: false
}

const _userReducer = createReducer(initialState,
  on(UserActions.LOG_IN, (state, action) => {
    return { ...state, loading: true }
  }),
  on(UserActions.LOG_IN_SUCCESS, (state, action) => {
    return {
      ...action.payload,
      loading: false
    }
  }),
  on(UserActions.LOG_IN_FAILURE, (state, action) => {
    //console.log(action.payload);
    return {
      ...action.payload,
      loading: false
    }
  }),
  on(UserActions.REGISTER, (state, action) => {
    return { ...state, loading: true }
  }),
  on(UserActions.REGISTER_SUCCESS, (state, action) => {
    //console.log(action.payload);
    return {
      ...action.payload,
      loading: false
    }
  }),
  on(UserActions.REGISTER_FAILURE, (state, action) => {
    //console.log(action.payload);
    return {
      ...action.payload,
      loading: false
    }
  })
);

export function userReducer(state, action) {
  return _userReducer(state, action);
}