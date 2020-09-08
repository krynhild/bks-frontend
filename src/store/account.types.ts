import { Company } from "./companies";

export enum AccountType { Broker, IIS};
export enum Risk {AAA, AA, A, BBB, BB, B, CC, C};

export type Bond = 	{
  company: Company,
  purchasePrice: number,
  purchaseDate: number,
  sellingPrice: number,
  sellingDate: number,
  risk: Risk,
  interestRate: number,
  couponFrequency: number,
  quantity: number
}

export type Account = {
  type: AccountType,
  reinvest: boolean,
  total: number
}
