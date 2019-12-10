import { createReducer, on } from '@ngrx/store';
import { User } from '../models/User.model';
import * as UserActions from '../actions/user.action';
import * as AdminActions from '../actions/admin.action';

export interface UserState {
  current_user: User;
  allUsers: User[];
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
  allUsers: [],
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
  on(UserActions.CLEAR_USER_STATES, (state, action) => {
    console.log(state);
    return { ...initialState }
  }),
  on(UserActions.LOAD_USERS, (state, action) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(UserActions.LOAD_USERS_SUCCESS, (state, action) => {
    return {
      ...state,
      loading: false,
      allUsers: action.payload
    }
  }),
  on(UserActions.LOAD_USERS_FAILURE, (state, action) => {
    return {
      ...state,
      loading: false
    }
  }),
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
      // console.log(action.payload.roles);
      return {
        ...state,
        current_user: {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          roles: new Set(action.payload.roles.map(roleObj => roleObj.role))
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
  }),
  on(AdminActions.ADMIN_DELETE_USER, (state, action) => {
    return {
      ...state,
      allUsers: state.allUsers.filter(user => user.email !== action.payload.email),
      loading: true
    }
  })
);

export function userReducer(state, action) {
  return _userReducer(state, action);
}