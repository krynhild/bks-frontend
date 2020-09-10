import React from "react";
import moment from "moment";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useSelector } from "react-redux";
import { getAccountReinvest } from "../../store/account.selectors";
import { paymentReport } from "../../lib/paymentReport";
import { makeStyles } from "@material-ui/core/styles";
import { formatCash } from "../../lib/formatCash";

const useStyles = makeStyles(() => ({
  root: {},
  tooltip: {
    margin: 0,
    padding: 10,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
  },
  tooltipLabel: {
    "margin-bottom": "5px"
  },
  tooltipContent: {
    color: "#8884d8"
  }
}));

const CustomTooltip = ({ active, payload, label }) => {
  const classes = useStyles();

  if (active) {
    return (
      <>
        <div className={classes.tooltip}>
          <div className={classes.tooltipLabel}>{label}</div>
          <div className={classes.tooltipContent}>
            {
              payload[0].payload.details.map(
                bond => bond.returned ? <div>{bond.name}: {formatCash(bond.returned)}</div> : null
              )
            }
          </div>
        </div>
      </>
    );
  }

  return null;
};

export const PaymentChart = ({ end, withTax }) => {
  const classes = useStyles();
  const startDate = moment().startOf('day').unix();
  const endDate = moment(end).unix();

  const reinvest = useSelector(getAccountReinvest);
  const bonds = useSelector(state => state.bonds);

  const data = paymentReport(startDate, endDate, bonds, reinvest, withTax).map(slice => ({
    ...slice,
    month: slice.date.format("MMM YY")
  }))

  return (
    <div className={classes.root}>
      <ResponsiveContainer width={"100%"} height={250}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="returned" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
