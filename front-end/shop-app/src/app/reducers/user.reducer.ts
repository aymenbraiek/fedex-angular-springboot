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
      ...state,
      firstNameErrMsg: null,
      lastNameErrMsg: null,
      emailErrMsg: null,
      passwordErrMsg: null,
      confirmPasswordErrMsg: null,
      generalErr: null,
      successMsg: action.payload.successMsg,
      valid: true,
      loading: false,
      current_user: {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email
      }
    }
  }),
  on(UserActions.LOG_IN_FAILURE, (state, action) => {
    //console.log(action.payload);
    return {
      ...action.payload,
      loading: false
    }
  }),
  on(UserActions.SET_CURRENT_USER, (state, action) => {
    if (action.payload !== null && typeof action.payload !== 'undefined') {
      return {
        ...state,
        current_user: {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          roles: action.payload.roles.map(roleObj => roleObj.role)
        }
      }
    }
    return {
      ...state,
      current_user: null
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
  }),
  on(UserActions.EDIT_USER, (state, action) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(UserActions.EDIT_USER_SUCCESS, (state, action) => {
    return {
      ...state,
      loading: false
    }
  }),
  on(UserActions.EDIT_USER_FAILURE, (state, action) => {
    return {
      ...state,
      loading: false
    }
  }),
  on(UserActions.DELETE_USER, (state, action) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(UserActions.DELETE_USER_SUCCESS, (state, action) => {
    return {
      ...state,
      loading: false
    }
  }),
  on(UserActions.DELETE_USER_FAILURE, (state, action) => {
    return {
      ...state,
      loading: false
    }
  })
);

export function userReducer(state, action) {
  return _userReducer(state, action);
}