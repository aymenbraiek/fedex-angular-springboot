import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as UserStore from './user.reducer';
import * as SuccessStore from './success.reducer';
import * as ErrorStore from './error.reducer';
import * as ConsignmentStore from './consignment.reducer';
import * as TypeStore from './type.reducer';

export interface AppState {
  user: UserStore.UserState;
  consignment: ConsignmentStore.ConsignmentState;
  success: SuccessStore.SuccessState;
  error: ErrorStore.ErrorState;
  type: string;
}

export const reducers: ActionReducerMap<AppState> = {
  user: UserStore.userReducer,
  consignment: ConsignmentStore.consignmentReducer,
  success: SuccessStore.successReducer,
  error: ErrorStore.errorReducer,
  type: TypeStore.typeReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const rootReducers = 'root';

export const getAppState = createFeatureSelector(rootReducers);
// User state
export const getUserState = createSelector(getAppState, (state: AppState) => state.user);
export const getCurrentUser = createSelector(getUserState, (state) => state.current_user);

// Consignment state
export const getConsignmentState = createSelector(getAppState, (state: AppState) => state.consignment);
export const getConsignments = createSelector(getConsignmentState, (state) => state.consignments);
