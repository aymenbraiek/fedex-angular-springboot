import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AdminActions from '../actions/admin.action';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../services/user.service';
import * as rootReducers from '../reducers/index';
import { Store } from '@ngrx/store';

@Injectable()
export class AdminEffects {
  constructor(
    private actions$: Actions,
    private store: Store<rootReducers.AppState>
  ) { }

  adminDeleteUser = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.LOAD_EMPLOYEES),
      switchMap(allUsers => {
        // console.log(allUsers)
        const employees = [];

        allUsers.payload.forEach(user => {
          user.roles.forEach(roleObj => {
            if (roleObj.role === 'EMPLOYEE') {
              employees.push(user);
            }
          })
        })
        // console.log(employees);
        return [
          AdminActions.LOAD_EMPLOYEES_SUCCESS({ payload: employees })
        ]
      })
    )
  )
}