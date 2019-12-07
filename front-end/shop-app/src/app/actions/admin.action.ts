import { createAction, props } from '@ngrx/store';
import * as actionTypes from '../actions/types.action';

export const ADMIN_DELETE_USER = createAction(
  actionTypes.ADMIN_DELETE_USER,
  props<{ payload: any }>()
)