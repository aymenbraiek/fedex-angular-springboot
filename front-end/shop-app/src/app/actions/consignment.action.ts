import { createAction, props } from '@ngrx/store';
import * as actionTypes from './types.action';

export const LOAD_CONSIGNMENTS = createAction(
  actionTypes.LOAD_CONSIGNMENTS,
  props<{ payload: any }>()
)

export const LOAD_CONSIGNMENTS_SUCCESS = createAction(
  actionTypes.LOAD_CONSIGNMENTS_SUCCESS,
  props<{ payload: any }>()
)

export const LOAD_CONSIGNMENTS_FAILURE = createAction(
  actionTypes.LOAD_CONSIGNMENTS_FAILURE
)