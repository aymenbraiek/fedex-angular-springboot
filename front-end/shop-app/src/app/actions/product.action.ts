import { createAction, props } from '@ngrx/store';
import * as actionTypes from '../actions/types.action';

export const LOAD_PRODUCTS = createAction(
  actionTypes.LOAD_PRODUCTS
)

export const LOAD_PRODUCTS_SUCCESS = createAction(
  actionTypes.LOAD_PRODUCTS_SUCCESS,
  props<{ payload: any }>()
)

export const LOAD_PRODUCTS_FAILURE = createAction(
  actionTypes.LOAD_PRODUCTS_FAILURE
)