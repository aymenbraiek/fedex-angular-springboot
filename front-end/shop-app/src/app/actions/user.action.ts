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
  '[USER] User Login Error',
  props<{ payload: any }>()
)
