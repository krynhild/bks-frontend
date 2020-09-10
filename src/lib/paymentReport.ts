import { Bond } from "../store/account.types";
import {
  getBondPaymentDates,
  getChartSlices, getCouponValue, hasSliceBondPayment,
  Slice
} from "./profitReport";

export function applyBondCoupons(
  bond: Bond,
  slices: Array<Slice>,
  withTax?: boolean
): Array<Slice> {
  const chartStart = slices[0].date;
  const bondPaymentDates = getBondPaymentDates(bond);
  const couponValue = getCouponValue(bond.interestRate, bond.sellingPrice, bond.quantity, withTax);

  return slices.map(slice => {
    const hasPayment = hasSliceBondPayment(slice.date, bondPaymentDates, chartStart);

    return ({
      date: slice.date,
      invested: 0,
      returned: slice.returned + (hasPayment ? couponValue : 0),
      details: slice.details.concat([{
        name: bond.company.name,
        returned: hasPayment ? couponValue : undefined
      }])
    })
  });
}

export const applyBondCouponsWithReinvest = (
  bond: Bond,
  slices: Array<Slice>,
  withTax?: boolean
) => {
  const chartStart = slices[0].date;
  const bondPaymentDates = getBondPaymentDates(bond)

  let profitAcc = 0;
  let bondQuantity = bond.quantity;

  return slices.map(slice => {
    const hasPayment = hasSliceBondPayment(slice.date, bondPaymentDates, chartStart);
    let couponValue;

    if (!hasPayment) {
      return slice;
    }

    couponValue = getCouponValue(bond.interestRate, bond.sellingPrice, bondQuantity, withTax);
    profitAcc = profitAcc + couponValue;
    if (profitAcc < bond.purchasePrice) {
      return ({
        ...slice,
        date: slice.date,
        invested: 0,
        returned: slice.returned + couponValue,
        details: slice.details.concat([{
          name: bond.company.name,
          returned: couponValue
        }])
      })
    }

    const additionalBondCount = Math.floor(profitAcc / bond.purchasePrice);
    profitAcc = profitAcc - bond.purchasePrice * additionalBondCount;
    bondQuantity += additionalBondCount;

    return ({
      ...slice,
      date: slice.date,
      invested: 0,
      returned: slice.returned + profitAcc,
      details: slice.details.concat([{
        name: bond.company.name,
        returned: profitAcc
      }])
    })
  });
}


export const basicStrategy = (
  start: number,
  end: number,
  bonds: Array<Bond>,
  withTax: boolean
) => {
  return bonds.reduce((slices: Array<Slice>, bond: Bond) =>
    applyBondCoupons(bond, slices, withTax), getChartSlices(start, end));
}

export const reinvestStrategy = (
  start: number,
  end: number,
  bonds: Array<Bond>,
  withTax: boolean
) => {
  return bonds.reduce((slices: Array<Slice>, bond: Bond) =>
    applyBondCouponsWithReinvest(bond, slices, withTax), getChartSlices(start, end));
}

export const paymentReport = (
  start: number,
  end: number,
  bonds: Array<Bond>,
  reinvest: boolean,
  withTax: boolean = true
): Array<Slice> => {
  return reinvest ? reinvestStrategy(start, end, bonds, withTax) : basicStrategy(start, end, bonds, withTax);
};
