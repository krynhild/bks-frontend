import { Account, AccountType } from "./account.types";
import { SET_TOTAL } from "./account.actions";

const initialState: Account = {
  type: AccountType.Broker,
  reinvest: true,
  total: 300000
}

export const reducer = (state: Account = initialState, { type, payload }: { type: string, payload: any }) => {
  switch (type) {
    case SET_TOTAL:
      return {
        ...state,
        total: payload
      };
    default:
      return state;
  }
};

