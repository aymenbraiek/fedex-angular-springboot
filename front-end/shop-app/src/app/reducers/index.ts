import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as UserStore from './user.reducer';

export interface AppState {
  user: UserStore.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  user: UserStore.userReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const rootReducers = 'root';

export const getAppState = createFeatureSelector(rootReducers);
export const getUserState = createSelector(getAppState, (state: AppState) => state.user);
export const getCurrentUser = createSelector(getUserState, (userState: UserStore.UserState) => userState.current_user);
