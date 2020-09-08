import { Account } from "./account.types";

export const getAccountTotal = (state: {account: Account}) => state.account.total;
