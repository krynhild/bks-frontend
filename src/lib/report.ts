import _ from "lodash";
import moment from "moment";
import { Bond } from "../store/account.types";

export type Slice = {
  date: number,
  invested: number,
  returned: number
}

export function hasSliceBondPayment(sliceDate: moment.Moment, bondPaymentDates: Array<moment.Moment>, chartStartDate: moment.Moment): boolean {
  return bondPaymentDates.some(
    (paymentDate: moment.Moment) => paymentDate.isAfter(chartStartDate) &&
      paymentDate.isBetween(sliceDate, sliceDate.endOf('month'))
  )
}

export function getBondPaymentDates(bond: Bond): Array<moment.Moment> {
  let bondPaymentDates: Array<moment.Moment> = [];

  let temp = moment(bond.purchaseDate*1000); //19.10.2002
  const bondEnd = moment(bond.sellingDate*1000);
  const frequency = 12 / bond.couponFrequency;

  while (temp.isBefore(bondEnd)) {
    bondPaymentDates.push(temp.clone());
    temp.add(frequency, 'month');
  }

  return bondPaymentDates;
}

export function getBondProfits(
  bond: Bond,
  slices: Array<Slice>
): Array<Slice> {
  const chartStart = moment(slices[0].date);
  const bondPaymentDates = getBondPaymentDates(bond)
  const profit = Math.floor(bond.interestRate * bond.sellingPrice * bond.quantity);

  return slices.map(slice => {
    const sliceMoment = moment(slice.date);

    return ({
      date: slice.date,
      invested: slice.invested + (moment(bond.sellingDate).isAfter(slice.date) ? bond.quantity * bond.sellingPrice : 0),
      returned: slice.returned + (hasSliceBondPayment(sliceMoment, bondPaymentDates, chartStart) ? profit : 0)
    })
  });
}

export const report = (
  start: number,
  end: number,
  bonds: Array<Bond>,
  reinvesting: boolean,
  iis: boolean
): Array<Slice> => {
//   result = []
//   start = start_of_chart
//   while start <= end_of_chart:
//   values = dict(date = start, invested=0, all_money=0)
//   result.append(values)
//   start += relativedelta(months=1)
//   #     result = list(map(lambda x: datetime.timestamp(x) , result))
//   if reinvesting == 0:
//   rosbank_ret = add_bond_return_to_portfolio_in_period(bonds[0], start_of_chart, end_of_chart, result)
// else :
//   rosbank_ret = result_with_reinvesting(bonds[0], start_of_chart, end_of_chart, result)
//   print(result)

  let result: Array<Slice> = [];
  let date = moment(start);
  let endDate = moment(end);

  while (date.isBefore(endDate)) {
    result.push({
      date: date.unix(),
      invested: 0,
      returned: 0
    });

    date.add(1, 'month');
  }


  return result;
};
