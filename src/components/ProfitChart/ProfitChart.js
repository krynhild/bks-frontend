import moment from "moment";
import React from "react";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Area, Tooltip } from "recharts";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { profitReport } from "../../lib/profitReport";
import { getAccountReinvest } from "../../store/account.selectors";
import { formatCash } from "../../lib/formatCash";

const useStyles = makeStyles((theme) => ({
  root: {
    "margin-left": "-20px"
  },
  tooltip: {
    margin: 0,
    padding: 10,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
  },
  total: {
    color: "#82ca9d"
  },
  invested: {
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
            <div className={classes.total}>
              Всего: {formatCash(payload[0].payload.returned + payload[0].payload.invested)}
            </div>
            <div className={classes.invested}>
              В облигациях: {formatCash(payload[0].payload.invested)}
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export const ProfitChart = ({ end, withTax }) => {
  const classes = useStyles();
  const startDate = moment().startOf('day').unix();
  const endDate = moment(end).unix();

  const reinvest = useSelector(getAccountReinvest);
  const bonds = useSelector(state => state.bonds);

  const data = profitReport(startDate, endDate, bonds, reinvest, withTax).map(slice => ({
    ...slice,
    total: slice.invested + slice.returned,
    month: slice.date.format("MMM YYYY")
  }))

  return (
    <div className={classes.root}>
      <ResponsiveContainer width={"100%"} height={250}>
        <AreaChart data={data}
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
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="total" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
          <Area type="monotone" dataKey="invested" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
