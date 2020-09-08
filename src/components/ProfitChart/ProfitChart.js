import _ from "lodash";
import moment from "moment";
import React from "react";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Area, Tooltip } from "recharts";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { getBondPaymentDates, hasSliceBondPayment } from "../../lib/report";
import { GazProm } from "../../store/companies";
import { Risk } from "../../store/account.types";

// const data = [
//   {
//     "name": "Page A",
//     "uv": 4000,
//     "pv": 2400,
//     "amt": 2400
//   },
//   {
//     "name": "Page B",
//     "uv": 3000,
//     "pv": 1398,
//     "amt": 2210
//   },
//   {
//     "name": "Page C",
//     "uv": 2000,
//     "pv": 9800,
//     "amt": 2290
//   },
//   {
//     "name": "Page D",
//     "uv": 2780,
//     "pv": 3908,
//     "amt": 2000
//   },
//   {
//     "name": "Page E",
//     "uv": 1890,
//     "pv": 4800,
//     "amt": 2181
//   },
//   {
//     "name": "Page F",
//     "uv": 2390,
//     "pv": 3800,
//     "amt": 2500
//   },
//   {
//     "name": "Page G",
//     "uv": 3490,
//     "pv": 4300,
//     "amt": 2100
//   }
// ]

const data2 = _.map(_.range(0, 12, 1), val => ({ "name": moment().month(val).format("MMM") }))

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

const useStyles = makeStyles((theme) => ({
  root: {
    "margin-left": "-110px"
  }
}));

export const ProfitChart = ({ end }) => {
  const classes = useStyles();
  const data = useSelector(state => state.bonds);
  const startDate = moment().startOf('day').unix();
  const endDate = moment(end).unix();

  const sliceDate = moment('2021-01-25');
  const paymentDates = getBondPaymentDates(bond);
  hasSliceBondPayment(sliceDate, paymentDates, moment('2020-09-08'))

  const data2 = _.map(
    _.range(startDate, endDate, (endDate - startDate) / 12),
    val => ({ "name": moment().month(moment(val*1000).get('month')).format("MMM") })
  );

  return (
    <div className={classes.root}>
      <ResponsiveContainer width={"100%"} height={250}>
        <AreaChart data={data2}
                   margin={{ top: 10, right: 50, left: 50, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
