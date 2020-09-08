import moment from "moment";
import { GazProm } from "../store/companies";
import { Risk } from "../store/account.types";
import { getBondPaymentDates, hasSliceBondPayment } from "./report";

const bond = {
  company: GazProm,
  purchasePrice: 1000,
  purchaseDate: 1594764000, // Jul 15 2020
  sellingPrice: 1000,
  sellingDate: 1689372000, // Jul 15 2023
  risk: Risk.AAA,
  interestRate: 0.06,
  couponFrequency: 2,
  quantity: 40
}


test('slice does not contain bond payment', () => {
  const sliceDate = moment('2020-09-08');
  const paymentDates = getBondPaymentDates(bond);

  expect(hasSliceBondPayment(sliceDate, paymentDates, sliceDate)).toBe(false);
})

test('slice contains bond payment', () => {
  const sliceDate = moment('2021-07-25');
  const paymentDates = getBondPaymentDates(bond);

  expect(hasSliceBondPayment(sliceDate, paymentDates, moment('2020-09-08'))).toBe(true);
})
