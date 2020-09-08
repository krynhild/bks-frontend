import {Action, ActionCreator, Dispatch} from 'redux';

export const SET_TOTAL = "[ACCOUNT] SET_AMOUNT";
export const LOAD_SUCCESS = "[ACCOUNT] LOAD_SUCCESS";
export const LOAD_FAILURE = "[ACCOUNT] LOAD_FAILURE";

export const load = () => async (dispatch: Dispatch, getState: Function) => {}

export const setTotal = (total: number) => ({
  type: SET_TOTAL,
  payload: total
});

export const loadSuccess: ActionCreator<Action> = (data: any) => ({
  type: LOAD_SUCCESS,
  payload: data
});

export const loadFailure: ActionCreator<Action> = (error: any) => ({
  type: LOAD_FAILURE,
  payload: error
});


