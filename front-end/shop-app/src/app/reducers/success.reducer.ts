import { createReducer, on } from '@ngrx/store';
import * as successActions from '../actions/success.action';

export interface SuccessState {
  type: string;
  success_msg: string;
}

const initialstate = {
  type: undefined,
  success_msg: undefined
}

const _successReducer = createReducer(initialstate,
  on(successActions.SET_SUCCESS, (state, action) => {
    // console.log(action);
    return {
      ...state,
      type: action.type,
      success_msg: action.payload
    }
  }),
  on(successActions.CLEAR_SUCCESS, (state, action) => {
    return {
      type: undefined,
      success_msg: undefined
    }
  })
)

export function successReducer(state, action) {
  return _successReducer(state, action);
}