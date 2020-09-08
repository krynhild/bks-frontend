import { Risk, Bond } from "./account.types";
import { GazProm, Tinkoff } from "./companies";

const initialState: Array<Bond> = [
  {
    company: GazProm,
    purchasePrice: 1000,
    purchaseDate: 1594764000,
    sellingPrice: 1000,
    sellingDate: 1689372000,
    risk: Risk.AAA,
    interestRate: 0.06,
    couponFrequency: 2,
    quantity: 40
  },
  {
    company: Tinkoff,
    purchasePrice: 2000,
    purchaseDate: 1586901600,
    sellingPrice: 2000,
    sellingDate: 1681509600,
    risk: Risk.AAA,
    interestRate: 0.07,
    couponFrequency: 2,
    quantity: 30
  }
];

export const reducer = (state: object = initialState) => {
  return state;
};
