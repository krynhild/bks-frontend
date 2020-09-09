import moment from "moment";
import { Bond } from "../store/account.types";

export type Slice = {
  date: moment.Moment,
  invested: number,
  returned: number
}

export function getCouponValue(
  rate: number,
  sellingPrice: number,
  bondQuantity: number,
  withTax?: boolean
) {
  return Math.floor(rate * sellingPrice * bondQuantity * (withTax ? 0.77 : 1));
}

export function hasSliceBondPayment(sliceDate: moment.Moment, bondPaymentDates: Array<moment.Moment>, chartStartDate: moment.Moment): boolean {
  return bondPaymentDates.some(
    (paymentDate: moment.Moment) => {
      return paymentDate.isAfter(chartStartDate) &&
        paymentDate.isBetween(sliceDate.clone().startOf('month'), sliceDate.clone().endOf('month'))
    }
  )
}

export function getBondPaymentDates(bond: Bond): Array<moment.Moment> {
  let bondPaymentDates: Array<moment.Moment> = [];

  const frequency = 12 / bond.couponFrequency;
  const bondEnd = moment(bond.sellingDate * 1000).add(1, 'day');
  let temp = moment(bond.purchaseDate * 1000).add(6, 'month'); //19.10.2002

  while (temp.isBefore(bondEnd)) {
    bondPaymentDates.push(temp.clone());
    temp.add(frequency, 'month');
  }

  return bondPaymentDates;
}

export function applyBondCoupons(
  bond: Bond,
  slices: Array<Slice>,
  withTax?: boolean
): Array<Slice> {
  const chartStart = slices[0].date;
  const bondPaymentDates = getBondPaymentDates(bond)
  const bondValue = bond.quantity * bond.sellingPrice;
  const couponValue = getCouponValue(bond.interestRate, bond.sellingPrice, bond.quantity, withTax);
  let profitAcc = 0;

  return slices.map(slice => {
    const hasPayment = hasSliceBondPayment(slice.date, bondPaymentDates, chartStart);
    profitAcc = hasPayment ? profitAcc + couponValue : profitAcc;

    return ({
      date: slice.date,
      invested: slice.invested + (moment(bond.sellingDate * 1000).isAfter(slice.date) ? bondValue : 0),
      returned: slice.returned + profitAcc + (moment(bond.sellingDate * 1000).isSameOrBefore(slice.date) ? bondValue : 0)
    })
  });
}

export function getChartSlices(start: number, end: number): Array<Slice> {
  let result: Array<Slice> = [];
  let date = moment(start * 1000);
  let endDate = moment(end * 1000);

  while (date.isBefore(endDate)) {
    result.push({
      date: date.clone(),
      invested: 0,
      returned: 0
    });

    date.add(1, 'month');
  }

  return result;
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
    let bondValue = bondQuantity * bond.sellingPrice;
    let couponValue;

    if (!hasPayment) {
      return ({
        date: slice.date,
        invested: slice.invested + bondValue,
        returned: slice.returned + profitAcc
      })
    }

    couponValue = getCouponValue(bond.interestRate, bond.sellingPrice, bondQuantity, withTax);
    profitAcc = profitAcc + couponValue;
    if (profitAcc < bond.purchasePrice) {
      return ({
        date: slice.date,
        invested: slice.invested + bondValue,
        returned: slice.returned + profitAcc
      })
    }

    const additionalBondCount = Math.floor(profitAcc / bond.purchasePrice);
    profitAcc = profitAcc - bond.purchasePrice * additionalBondCount;
    bondQuantity += additionalBondCount;
    bondValue = bondQuantity * bond.sellingPrice;

    return ({
      date: slice.date,
      invested: slice.invested + bondValue,
      returned: slice.returned + profitAcc
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

export const report = (
  start: number,
  end: number,
  bonds: Array<Bond>,
  reinvest?: boolean,
  withTax: boolean = true
): Array<Slice> => {
  return reinvest ? reinvestStrategy(start, end, bonds, withTax) : basicStrategy(start, end, bonds, withTax);
};
