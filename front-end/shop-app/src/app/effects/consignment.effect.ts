import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ConsignmentService } from '../services/consignment.service';
import { mergeMap, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ConsignmentActions from '../actions/consignment.action';
import * as SuccessActions from '../actions/success.action';
import * as ErrorActions from '../actions/error.action';

@Injectable()
export class ConsignmentEffects {
  constructor(
    private actions$: Actions,
    private consignmentService: ConsignmentService
  ) { }

  loadConsignments = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsignmentActions.LOAD_CONSIGNMENTS),
      mergeMap((data) => {
        return this.consignmentService.getAllConsignments(data.payload).pipe(
          // tap(consignments => console.log(consignments)),
          switchMap(consignments => [
            ConsignmentActions.LOAD_CONSIGNMENTS_SUCCESS({ payload: consignments }),
            ErrorActions.CLEAR_ERROR(),
            SuccessActions.CLEAR_SUCCESS()
          ]),
          catchError(errs => {
            return of(
              ConsignmentActions.LOAD_CONSIGNMENTS_FAILURE(),
              ErrorActions.SET_ERROR({ payload: 'Error occurred while loading consignments' }),
              SuccessActions.CLEAR_SUCCESS()
            )
          })
        )
      })
    )
  )
}