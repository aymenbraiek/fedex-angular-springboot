import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../services/product.service';
import { mergeMap, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ProductActions from '../actions/product.action';
import * as SuccessActions from '../actions/success.action';
import * as ErrorActions from '../actions/error.action';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) { }

  loadProducts = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.LOAD_PRODUCTS),
      mergeMap(() => {
        return this.productService.getAllProducts().pipe(
          // tap(products => console.log(products)),
          switchMap(products => [
            ProductActions.LOAD_PRODUCTS_SUCCESS({ payload: products }),
            ErrorActions.CLEAR_ERROR(),
            SuccessActions.CLEAR_SUCCESS()
          ]),
          catchError(errs => {
            return of(
              ProductActions.LOAD_PRODUCTS_FAILURE(),
              ErrorActions.SET_ERROR({ payload: 'Error occurred while loading products' }),
              SuccessActions.CLEAR_SUCCESS()
            )
          })
        )
      })
    )
  )
}