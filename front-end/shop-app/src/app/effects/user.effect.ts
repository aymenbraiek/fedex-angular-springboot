import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AdminActions from '../actions/admin.action';
import * as UserActions from '../actions/user.action';
import * as SuccessActions from '../actions/success.action';
import * as ErrorActions from '../actions/error.action';
import { mergeMap, map, catchError, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) { }

  loadUsers = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LOAD_USERS),
      switchMap(() => {
        return this.userService.getAllUsers().pipe(
          // tap(users => console.log(users)),
          switchMap(users => [
            UserActions.LOAD_USERS_SUCCESS({ payload: users }),
            ErrorActions.CLEAR_ERROR(),
            SuccessActions.CLEAR_SUCCESS()
          ]),
          catchError(errs => {
            return of(
              UserActions.LOAD_USERS_FAILURE(),
              SuccessActions.CLEAR_SUCCESS(),
              ErrorActions.SET_ERROR({ payload: 'Error occurred while loading users' })
            )
          })
        )
      })
    )
  )

  login = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LOG_IN),
      switchMap((data) => {
        return this.userService.logIn(data.payload.email, data.payload.password).pipe(
          tap(res => {
            localStorage.setItem('jwtToken', res.jwtToken);
          }),
          switchMap(res => {
            this.router.navigate([`/dashboard/${res.current_user.firstName}${res.current_user.lastName}`]);
            return [
              UserActions.GET_CURRENT_USER({ payload: res.current_user.email }),
              ErrorActions.CLEAR_ERROR(),
              SuccessActions.SET_SUCCESS({ payload: res.successMsg }),
              UserActions.LOG_IN_SUCCESS({ payload: res })
            ]
          }),
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
          switchMap(res => {
            this.router.navigate(['/login']);
            return [
              SuccessActions.SET_SUCCESS({ payload: res.successMsg }),
              ErrorActions.CLEAR_ERROR(),
              UserActions.REGISTER_SUCCESS({ payload: res })
            ]
          }),
          catchError(errs => {
            return of(
              UserActions.REGISTER_FAILURE({ payload: errs.error }),
              ErrorActions.SET_ERROR({ payload: errs.error.generalErr }),
              SuccessActions.CLEAR_SUCCESS()
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
          map(user => {
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
      switchMap(() => {
        return [
          UserActions.SET_CURRENT_USER({ payload: null }),
          SuccessActions.SET_SUCCESS({ payload: 'You have logged out' }),
          ErrorActions.CLEAR_ERROR()
        ]
      })
    )
  )

  editUser = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.EDIT_USER),
      switchMap(data => {
        return this.userService.editUser(data.payload).pipe(
          switchMap(res => [
            UserActions.EDIT_USER_SUCCESS(),
            SuccessActions.SET_SUCCESS({ payload: 'Your profile has been updated' }),
            ErrorActions.CLEAR_ERROR(),
            UserActions.SET_CURRENT_USER({
              payload: {
                firstName: data.payload.firstName,
                lastName: data.payload.lastName,
                email: data.payload.email,
                roles: data.payload.roles
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
      mergeMap(data => {
        return this.userService.deleteUser(data.payload.email).pipe(
          tap(res => {
            if (res) {
              if (data.payload.email === data.payload.current_user.email) {
                localStorage.removeItem('jwtToken');
              }
            }
          }),
          switchMap(res => {
            if (data.payload.email === data.payload.current_user.email) {
              this.router.navigate(['/login']);
              return [
                UserActions.SET_CURRENT_USER({ payload: null }),
                UserActions.DELETE_USER_SUCCESS(),
                ErrorActions.CLEAR_ERROR(),
                SuccessActions.SET_SUCCESS({ payload: 'Your account has been deleted' })
              ]
            }
            return [
              AdminActions.ADMIN_DELETE_USER({ payload: { email: data.payload.email } }),
              UserActions.DELETE_USER_SUCCESS(),
              ErrorActions.CLEAR_ERROR(),
              SuccessActions.SET_SUCCESS({ payload: `Account "${data.payload.email}" has been deleted` })
            ]
          }),
          catchError(errs => {
            return of(
              UserActions.DELETE_USER_FAILURE(),
              ErrorActions.SET_ERROR({ payload: 'Error occurred while deleting this account' }),
              SuccessActions.CLEAR_SUCCESS()
            )
          })
        )
      })
    )
  )
}
