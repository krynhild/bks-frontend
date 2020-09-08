import _ from "lodash";
import { Bond } from "./account.types";

export const getBondsTotal = ({ bonds }: {bonds: Array<Bond>}): number => {
  return _.reduce(bonds, (acc: number, bond: Bond) => acc + bond.sellingPrice*bond.quantity, 0)
};
