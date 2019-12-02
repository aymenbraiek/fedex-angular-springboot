import { createReducer, on } from '@ngrx/store';
import * as errorActions from '../actions/error.action';

export interface ErrorState {
  type: string;
  error_msg: string;
}

const initialstate = {
  type: undefined,
  error_msg: undefined
}

const _errorReducer = createReducer(initialstate,
  on(errorActions.SET_ERROR, (state, action) => {
    return {
      ...state,
      type: action.type,
      error_msg: action.payload
    }
  }),
  on(errorActions.CLEAR_ERROR, (state, action) => {
    return {
      type: undefined,
      error_msg: undefined
    }
  })
)

export function errorReducer(state, action) {
  return _errorReducer(state, action);
}