import { createAction, props } from '@ngrx/store';

export const LOG_IN = createAction(
  '[USER] User Login',
  props<{ payload: any }>()
)

export const LOG_IN_SUCCESS = createAction(
  '[USER] User Login Success',
  props<{ payload: any }>()
)

export const LOG_IN_FAILURE = createAction(
  '[USER] User Login Failure',
  props<{ payload: any }>()
)

export const REGISTER = createAction(
  '[USER] User register',
  props<{ payload: any }>()
)

export const REGISTER_SUCCESS = createAction(
  '[USER] User register success',
  props<{ payload: any }>()
)

export const REGISTER_FAILURE = createAction(
  '[USER] User register failure',
  props<{ payload: any }>()
)