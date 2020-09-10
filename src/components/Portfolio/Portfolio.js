import moment from "moment";
import MomentUtils from '@date-io/moment';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles, Tab, Tabs, Box } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { TabPanel } from "../common/TabPanel";
import { isAccountIIS } from "../../store/account.selectors";
import { ProfitChart } from "../ProfitChart/ProfitChart";
import { PaymentChart } from "../PaymentChart/PaymentChart";
import { PortfolioChart } from "../CompositionChart/PortfolioChart";

const useStyles = makeStyles((theme) => ({
  root: {
    "margin-bottom": "50px",
  },
  header: {
    "margin-bottom": "25px",
    "text-align": "left"
  },
  picker: {
    width: "200px",
    "margin-bottom": "20px"
  },
  tabs: {
    "margin-bottom": "25px"
  },
  leftAlign: {
    "text-align": "left"
  },
  flex: {
    display: "flex",
    "justify-content": "space-between"
  }
}));

const TABS = { Profit: 0, Composition: 1 };

export const Portfolio = () => {
  const classes = useStyles();
  const [activeTab, setTab] = useState(TABS.Profit);
  const [date, setDate] = useState(moment().add(1, 'year'));
  const iis = useSelector(isAccountIIS);

  return (
    <Box className={classes.root}>
      <div className={classes.flex}>
        <Box className={classes.header} textAlign="left" fontSize="h6.fontSize">Посчитаем доходы?</Box>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <div className={classes.leftAlign}>
            <DatePicker
              className={classes.picker}
              views={["year", "month"]}
              label="Изменить конечную дату"
              minDate={moment().add(1, 'year')}
              maxDate={moment().add(5, 'year')}
              value={date}
              onChange={(value) => setDate(value)}
            />
          </div>
        </MuiPickersUtilsProvider>
      </div>
      <Tabs
        className={classes.tabs}
        indicatorColor="primary"
        textColor={"primary"}
        value={activeTab}
        onChange={(e, tab) => setTab(tab)}
      >
        <Tab label="Прогноз доходов" />
        <Tab label="Состав портфеля" />
        <Tab label="Расписание выплат" />
      </Tabs>
      <TabPanel activeTab={activeTab} index={0}>
        <ProfitChart end={date} withTax={!iis} />
      </TabPanel>
      <TabPanel activeTab={activeTab} index={1}>
        <PortfolioChart end={date} withTax={!iis} />
      </TabPanel>
      <TabPanel activeTab={activeTab} index={2}>
        <PaymentChart end={date} withTax={!iis} />
      </TabPanel>
    </Box>
  );
}
