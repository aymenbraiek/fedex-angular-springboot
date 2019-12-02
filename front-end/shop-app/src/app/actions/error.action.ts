import { createAction, props } from '@ngrx/store';
import * as actionTypes from '../actions/types.action';

export const SET_ERROR = createAction(
  actionTypes.SET_ERROR,
  props<{ payload: any }>()
)

export const CLEAR_ERROR = createAction(
  actionTypes.CLEAR_ERROR
)