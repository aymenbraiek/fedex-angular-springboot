import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/user.action';
import { mergeMap, map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {

  login = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LOG_IN),
      mergeMap((data) => {
        return this.userService.logIn(data.payload.email, data.payload.password).pipe(
          map((res) => {
            if (!res.valid) {
              return UserActions.LOG_IN_FAILURE({ payload: res });
            }
            localStorage.setItem('jwtToken', res.jwtToken);
            return UserActions.LOG_IN_SUCCESS({ payload: res });
          })
        )
      })
    )
  )

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }
}
