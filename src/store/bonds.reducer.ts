import { Risk, Bond } from "./account.types";
import { GazProm, Tinkoff } from "./companies";
import { AnyAction } from "redux";
import { ADD_BOND, REMOVE_BOND } from "./bonds.actions";

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
    couponFrequency: 4,
    quantity: 30
  }
];

export const reducer = (state: Array<Bond> = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_BOND:
      return state.map(bond =>
        bond.company.name === action.payload.companyName ?
          {
            ...bond,
            quantity: bond.quantity + 1
          } :
          bond
      );
    case REMOVE_BOND:
      return state.map(bond =>
        bond.company.name === action.payload.companyName ?
          {
            ...bond,
            quantity: bond.quantity > 1 ? bond.quantity - 1 : bond.quantity
          } :
          bond
      );
    default:
      return state;
  }
};
