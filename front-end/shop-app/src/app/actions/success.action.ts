import { createAction, props } from '@ngrx/store';
import * as actionTypes from '../actions/types.action';

export const SET_SUCCESS = createAction(
  actionTypes.SET_SUCCESS,
  props<{ payload: any }>()
)

export const CLEAR_SUCCESS = createAction(
  actionTypes.CLEAR_SUCCESS
)