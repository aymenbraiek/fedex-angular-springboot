import { createReducer, on } from '@ngrx/store';
import * as errorActions from '../actions/error.action';

export interface ErrorState {
  type: string;
  error_msg: string;
  errors: string[];
}

const initialstate = {
  type: undefined,
  error_msg: undefined,
  errors: []
}

const _errorReducer = createReducer(initialstate,
  on(errorActions.SET_ERROR, (state, action) => {
    if (typeof action.payload === 'object') {
      return {
        ...state,
        type: action.type,
        error_msg: '',
        errors: action.payload
      }
    }
    return {
      ...state,
      type: action.type,
      error_msg: action.payload,
      errors: []
    }
  }),
  on(errorActions.CLEAR_ERROR, (state, action) => {
    return {
      type: undefined,
      error_msg: undefined,
      errors: []
    }
  })
)

export function errorReducer(state, action) {
  return _errorReducer(state, action);
}