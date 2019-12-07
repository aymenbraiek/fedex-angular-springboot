import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AdminActions from '../actions/admin.action';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../services/user.service';
import * as UserActions from '../actions/user.action';
import * as ErrorActions from '../actions/error.action';
import * as SuccessActions from '../actions/success.action';

@Injectable()
export class AdminEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }

  adminDeleteUser = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.ADMIN_DELETE_USER),
      switchMap(data => {
        return this.userService.deleteUser(data.payload).pipe(
          switchMap(res => [
            UserActions.DELETE_USER_SUCCESS(),
            ErrorActions.CLEAR_ERROR(),
            SuccessActions.SET_SUCCESS({ payload: `Account "${data.payload.email}" has been deleted` })
          ]),
          catchError(errs => {
            return of(
              UserActions.DELETE_USER_FAILURE(),
              ErrorActions.SET_ERROR({ payload: 'Errors occurred while deleting this account' }),
              SuccessActions.CLEAR_SUCCESS()
            )
          })
        )
      })
    )
  )
}