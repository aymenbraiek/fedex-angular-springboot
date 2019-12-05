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

  logout = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LOG_OUT),
      tap(() => {
        localStorage.removeItem('jwtToken');
      }),
      switchMap(() => [
        UserActions.SET_CURRENT_USER({ payload: null }),
        SuccessActions.SET_SUCCESS({ payload: 'You have logged out' })
      ])
    )
  )

  editUser = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.EDIT_USER),
      switchMap(data => {
        // console.log(data);
        return this.userService.editUser(data.payload).pipe(
          switchMap(res => [
            UserActions.EDIT_USER_SUCCESS(),
            SuccessActions.SET_SUCCESS({ payload: 'Your profile has been updated' }),
            ErrorActions.CLEAR_ERROR(),
            UserActions.SET_CURRENT_USER({
              payload: {
                firstName: data.payload.firstName,
                lastName: data.payload.lastName,
                email: data.payload.email
              }
            })
          ]),
          catchError(errs => {
            return of(
              UserActions.EDIT_USER_FAILURE(),
              ErrorActions.SET_ERROR({ payload: ['Names can NOT be blanked', 'Invalid name format (should NOT contain numbers or special characters)'] }),
              SuccessActions.CLEAR_SUCCESS()
            )
          })
        )
      })
    )
  )

  deleteUser = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.DELETE_USER),
      switchMap(data => {
        return this.userService.deleteUser(data.payload).pipe(
          tap(res => {
            if (res) {
              localStorage.removeItem('jwtToken');
            }
          }),
          switchMap(res => [
            UserActions.SET_CURRENT_USER({ payload: null }),
            UserActions.DELETE_USER_SUCCESS(),
            ErrorActions.CLEAR_ERROR(),
            SuccessActions.SET_SUCCESS({ payload: 'Your account has been deleted' })
          ]),
          catchError(errs => {
            return of(
              UserActions.DELETE_USER_FAILURE(),
              ErrorActions.SET_ERROR({ payload: 'Account is not found' }),
              SuccessActions.CLEAR_SUCCESS()
            )
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
