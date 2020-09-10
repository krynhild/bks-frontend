import React from "react";
import Grid from "@material-ui/core/Grid";
import { CompositionChart } from "./CompositionChart";
import { useSelector } from "react-redux";
import { getAccountReinvest, getAccountTotal } from "../../store/account.selectors";
import { getBondsTotal } from "../../store/bonds.selector";
import { profitReport } from "../../lib/profitReport";
import moment from "moment";
import { Box } from "@material-ui/core";

//слайдер - accountTotal = slice.invested[first] + freeMoney
//первый чарт - slice.invested[first] | freeMoney
//второй чарт - slice.invested[last] | slice.returned + accountTotal - slice.invested[first]

// 1 000 000 <-слайдер
//500 K - bondsTotal, 500 K - free money
//550 K - slice.invested, 20 K - slice.returned, freeMoney - 500 K

export const PortfolioChart = ({ end, withTax }) => {
  const accountTotal = useSelector(getAccountTotal); //slider
  const initialInvestment = useSelector(getBondsTotal); // slice.invested[first]

  const startDate = moment().startOf('day').unix();
  const endDate = moment(end).unix();

  const reinvest = useSelector(getAccountReinvest);
  const bonds = useSelector(state => state.bonds);

  const lastSlice = profitReport(startDate, endDate, bonds, reinvest, withTax).pop()

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Box fontSize={"h6.fontSize"}>Сейчас</Box>
        <CompositionChart cash={accountTotal - initialInvestment} invested={initialInvestment} />
      </Grid>
      <Grid item xs={6}>
        <Box fontSize={"h6.fontSize"}>В конце периода</Box>
        <CompositionChart
          cash={accountTotal - initialInvestment + lastSlice.returned}
          invested={lastSlice.invested}
        />
      </Grid>
    </Grid>
  );
}
