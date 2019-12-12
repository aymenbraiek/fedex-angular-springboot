import { createAction, props } from '@ngrx/store';
import * as actionTypes from '../actions/types.action';

export const ADMIN_DELETE_USER = createAction(
  actionTypes.ADMIN_DELETE_USER,
  props<{ payload: any }>()
)

export const ADMIN_ADD_USER = createAction(
  actionTypes.ADMIN_ADD_USER,
  props<{ payload: any }>()
)

export const ADMIN_ADD_USER_SUCCESS = createAction(
  actionTypes.ADMIN_ADD_USER_SUCCESS,
  props<{ payload: any }>()
)

export const ADMIN_ADD_USER_FAILED = createAction(
  actionTypes.ADMIN_ADD_USER_FAILED,
  props<{ payload: any }>()
)

export const LOAD_EMPLOYEES = createAction(
  actionTypes.LOAD_EMPLOYEES,
  props<{ payload: any }>()
)

export const LOAD_EMPLOYEES_SUCCESS = createAction(
  actionTypes.LOAD_EMPLOYEES_SUCCESS,
  props<{ payload: any }>()
)