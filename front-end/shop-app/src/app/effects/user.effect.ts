import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/user.action';
import * as SuccessActions from '../actions/success.action';
import * as ErrorActions from '../actions/error.action';
import { mergeMap, map, catchError, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {

  login = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LOG_IN),
      switchMap((data) => {
        return this.userService.logIn(data.payload.email, data.payload.password).pipe(
          tap(res => localStorage.setItem('jwtToken', res.jwtToken)),
          switchMap(res => [
            SuccessActions.SET_SUCCESS({ payload: res.successMsg }),
            UserActions.LOG_IN_SUCCESS({ payload: res })
          ]),
          catchError(errs => {
            return of(
              ErrorActions.CLEAR_ERROR(),
              SuccessActions.CLEAR_SUCCESS(),
              UserActions.LOG_IN_FAILURE({ payload: errs.error })
            );
          })
        )
      })
    )
  )

  register = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.REGISTER),
      switchMap((data) => {
        return this.userService.register(data.payload).pipe(
          // tap(res => console.log(res)),
          switchMap(res => [
            SuccessActions.SET_SUCCESS({ payload: res.successMsg }),
            UserActions.REGISTER_SUCCESS({ payload: res })
          ]),
          catchError(errs => {
            // console.log(errs);
            return of(
              UserActions.REGISTER_FAILURE({ payload: errs.error }),
              ErrorActions.SET_ERROR({ payload: errs.error.generalErr })
            );
          })
        )
      })
    )
  )

  setCurrentUser = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.GET_CURRENT_USER),
      mergeMap((data) => {
        return this.userService.getCurrentUser(data.payload).pipe(
          map((user) => {
            // console.log(user);
            return UserActions.SET_CURRENT_USER({ payload: user });
          }),
          catchError(errs => {
            return of(ErrorActions.SET_ERROR({ payload: errs.error }));
          })
        )
      })
    )
  )

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) { }
}
