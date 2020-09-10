import moment from "moment";
import { GazProm, Tinkoff } from "../store/companies";
import { Bond, Risk } from "../store/account.types";
import {
  applyBondCoupons, applyBondCouponsWithReinvest,
  getBondPaymentDates,
  getChartSlices,
  hasSliceBondPayment, profitReport,
} from "./profitReport";

const bond = {
  company: GazProm,
  purchasePrice: 1000,
  purchaseDate: 1594764000, // Jul 15 2020
  sellingPrice: 1000,
  sellingDate: 1689372000, // Jul 15 2023
  risk: Risk.AAA,
  interestRate: 0.06,
  couponFrequency: 2,
  quantity: 40,
};

const bonds: Array<Bond> = [
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
    sellingDate: 1626300000,
    risk: Risk.AAA,
    interestRate: 0.07,
    couponFrequency: 2,
    quantity: 30
  }
];

test("correctly calculates payment dates", () => {
  const dates = getBondPaymentDates(bond);
  const snapshot = dates.map((date) => date.format("DD MMMM, YYYY")).join("; ");

  expect(snapshot).toMatchInlineSnapshot(
    `"15 January, 2021; 15 July, 2021; 15 January, 2022; 15 July, 2022; 15 January, 2023; 15 July, 2023"`
  );
});

test("slice does not contain bond payment", () => {
  const sliceDate = moment("2020-09-01");
  const paymentDates = getBondPaymentDates(bond);

  expect(hasSliceBondPayment(sliceDate, paymentDates, sliceDate)).toBe(false);
});

test("slice contains bond payment", () => {
  const sliceDate = moment("2021-07-01");
  const paymentDates = getBondPaymentDates(bond);

  expect(
    hasSliceBondPayment(sliceDate, paymentDates, moment("2020-09-08"))
  ).toBe(true);
});

test("correctly calculates chart slices", () => {
  const slices = getChartSlices(1594764000, 1689372000);
  const snapshot = slices.map((slice) => slice.date.format("DD MMMM, YYYY"));

  expect(snapshot).toMatchSnapshot();
});

test("applies bond profits for one bond type", () => {
  const slices = getChartSlices(1594764000, 1689372000);
  const profits = applyBondCoupons(bond, slices).map((slice) => ({
    ...slice,
    date: slice.date.format("DD MMMM, YYYY")
  }));

  expect(profits).toMatchSnapshot();
});

test("applies bond profits for one bond type with reinvest", () => {
  const slices = getChartSlices(1594764000, 1689372000);
  const profits = applyBondCouponsWithReinvest(bond, slices).map((slice) => ({
    ...slice,
    date: slice.date.format("DD MMMM, YYYY")
  }));

  expect(profits).toMatchSnapshot();
});

test('applies bond profits for two bond types', () => {
  const profits = profitReport(1594764000, 1689372000, bonds);
  expect(profits).toMatchSnapshot();
})
