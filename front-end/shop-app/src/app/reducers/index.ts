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

export interface AppState {
  user: UserStore.UserState;
  success: SuccessStore.SuccessState,
  error: ErrorStore.ErrorState
}

export const reducers: ActionReducerMap<AppState> = {
  user: UserStore.userReducer,
  success: SuccessStore.successReducer,
  error: ErrorStore.errorReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const rootReducers = 'root';

export const getAppState = createFeatureSelector(rootReducers);
export const getUserState = createSelector(getAppState, (state: AppState) => state.user);
