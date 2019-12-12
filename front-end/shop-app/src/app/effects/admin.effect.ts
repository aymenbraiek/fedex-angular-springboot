import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AdminActions from '../actions/admin.action';
import { switchMap, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as rootReducers from '../reducers/index';
import { Store } from '@ngrx/store';
import { AdminService } from '../services/admin.service';
import * as TypeActions from '../actions/defineType.action';
import * as actionTypes from '../actions/types.action';

@Injectable()
export class AdminEffects {
  constructor(
    private actions$: Actions,
    private store: Store<rootReducers.AppState>,
    private adminService: AdminService
  ) { }

  loadEmployees = createEffect(() =>
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

  addUser = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.ADMIN_ADD_USER),
      mergeMap(data => {
        return this.adminService.addUser(data.payload).pipe(
          switchMap((newUser) => {
            // console.log(newUser);
            return [
              AdminActions.ADMIN_ADD_USER_SUCCESS({
                payload: {
                  newUser: { ...newUser },
                  success_msg: 'New user added successfully'
                }
              }),
              TypeActions.SET_TYPE({ actionType: actionTypes.ADMIN_ADD_USER_SUCCESS })
            ]
          }),
          catchError(errs => of(
            AdminActions.ADMIN_ADD_USER_FAILED({
              payload:
                [
                  'Please fill out all fields',
                  'Name CANNOT contain numbers or special characters',
                  'Email must be valid format'
                ]
            }),
            TypeActions.SET_TYPE({ actionType: actionTypes.ADMIN_ADD_USER_FAILED })
          ))
        )
      })
    )
  )
}