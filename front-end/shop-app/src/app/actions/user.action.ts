import { createAction, props } from '@ngrx/store';
import * as actionTypes from '../actions/types.action';

export const LOG_IN = createAction(
  actionTypes.LOG_IN,
  props<{ payload: any }>()
)

export const GET_CURRENT_USER = createAction(
  actionTypes.GET_CURRENT_USER,
  props<{ payload: any }>()
)

export const SET_CURRENT_USER = createAction(
  actionTypes.SET_CURRENT_USER,
  props<{ payload: any }>()
)

export const LOG_IN_SUCCESS = createAction(
  actionTypes.LOG_IN_SUCCESS,
  props<{ payload: any }>()
)

export const LOG_IN_FAILURE = createAction(
  actionTypes.LOG_IN_FAILURE,
  props<{ payload: any }>()
)

export const REGISTER = createAction(
  actionTypes.REGISTER,
  props<{ payload: any }>()
)

export const REGISTER_SUCCESS = createAction(
  actionTypes.REGISTER_SUCCESS,
  props<{ payload: any }>()
)

export const REGISTER_FAILURE = createAction(
  actionTypes.REGISTER_FAILURE,
  props<{ payload: any }>()
)