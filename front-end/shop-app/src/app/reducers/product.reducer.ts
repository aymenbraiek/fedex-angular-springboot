import { Product } from "../models/Product.model";
import { createReducer, on } from "@ngrx/store";
import * as ProductActions from '../actions/product.action';

export interface ProductState {
  products: Product[];
  loading: boolean;
}

const initialState = {
  products: [],
  loading: false
}

const _productReducer = createReducer(initialState,
  on(ProductActions.LOAD_PRODUCTS, (state, action) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(ProductActions.LOAD_PRODUCTS_SUCCESS, (state, action) => {
    return {
      ...state,
      loading: false,
      products: action.payload
    }
  }),
  on(ProductActions.LOAD_PRODUCTS_FAILURE, (state, action) => {
    return {
      ...state,
      loading: false
    }
  }),
)

export function productReducer(state, action) {
  return _productReducer(state, action);
}