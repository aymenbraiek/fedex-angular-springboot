import { Consignment } from "../models/Consignment.model";
import { createReducer, on } from "@ngrx/store";
import * as ConsignmentActions from '../actions/consignment.action';

export interface ConsignmentState {
  consignments: {
    notReceived: Consignment[], received: Consignment[]
  };
  loading: boolean;
}

const initialState = {
  consignments: {
    notReceived: [],
    received: []
  },
  loading: false
}

const _consignmentReducer = createReducer(initialState,
  on(ConsignmentActions.LOAD_CONSIGNMENTS, (state, action) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(ConsignmentActions.LOAD_CONSIGNMENTS_SUCCESS, (state, action) => {
    return {
      ...state,
      loading: false,
      consignments: action.payload
    }
  }),
  on(ConsignmentActions.LOAD_CONSIGNMENTS_FAILURE, (state, action) => {
    return {
      ...state,
      loading: false
    }
  }),
  on(ConsignmentActions.ADD_CONSIGNMENT, (state, action) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(ConsignmentActions.ADD_CONSIGNMENT_SUCCESS, (state, action) => {
    return {
      ...state,
      loading: false,
      consignments: {
        ...state.consignments,
        notReceived: [{ ...action.payload, received: false }, ...state.consignments['notReceived']]
      }
    }
  }),
  on(ConsignmentActions.ADD_CONSIGNMENT_FAILURE, (state, action) => {
    return {
      ...state,
      loading: false
    }
  }),
)

export function consignmentReducer(state, action) {
  return _consignmentReducer(state, action);
}