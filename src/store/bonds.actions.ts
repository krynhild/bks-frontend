export const ADD_BOND = "[BONDS] ADD_BOND";
export const REMOVE_BOND = "[BONDS] REMOVE_BOND";

export const addBond = (companyName: string) => ({
  type: ADD_BOND,
  payload: { companyName }
});

export const removeBond = (companyName: string) => ({
  type: REMOVE_BOND,
  payload: { companyName }
});
