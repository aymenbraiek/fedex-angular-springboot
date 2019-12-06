import { createAction, props } from '@ngrx/store';
import * as actionTypes from '../actions/types.action';

/** ============================
 * Authentication for user
 * ============================
 */

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

export const LOG_OUT = createAction(
  actionTypes.LOG_OUT
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

/** ============================
 * CRUD operations for user
 * ============================
 */
export const EDIT_USER = createAction(
  actionTypes.EDIT_USER,
  props<{ payload: any }>()
)

export const EDIT_USER_SUCCESS = createAction(
  actionTypes.EDIT_USER_SUCCESS
)

export const EDIT_USER_FAILURE = createAction(
  actionTypes.EDIT_USER_FAILURE
)

export const DELETE_USER = createAction(
  actionTypes.DELETE_USER,
  props<{ payload: any }>()
)

export const DELETE_USER_SUCCESS = createAction(
  actionTypes.DELETE_USER_SUCCESS
)

export const DELETE_USER_FAILURE = createAction(
  actionTypes.DELETE_USER_FAILURE
)