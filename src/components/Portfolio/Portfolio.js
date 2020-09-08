import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import Box from "@material-ui/core/Box";
import { ProfitChart } from "../ProfitChart/ProfitChart";
import { CompositionChart } from "../CompositionChart/CompositionChart";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { TabPanel } from "../common/TabPanel";
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

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
  }
}));

const TABS = { Profit: 0, Composition: 1 };

export const Portfolio = () => {
  const classes = useStyles();
  const [activeTab, setTab] = useState(TABS.Profit);
  const [date, setDate] = useState("2020-10-24");

  return (
    <Box className={classes.root}>
      <Box className={classes.header} textAlign="left" fontSize="h6.fontSize">Доходы</Box>
      <Tabs
        className={classes.tabs}
        indicatorColor="primary"
        textColor={"primary"}
        value={activeTab}
        onChange={(e, tab) => setTab(tab)}
      >
        <Tab label="Прогноз" />
        <Tab label="Состав портфеля" />
      </Tabs>
      <TabPanel activeTab={activeTab} index={0}>
        <div className={classes.leftAlign}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              className={classes.picker}
              views={["year", "month"]}
              label="Конечная дата расчета"
              minDate={new Date("2020-09-01")}
              maxDate={new Date("2021-06-01")}
              value={date}
              onChange={(value) => setDate(value)}
            />
            <ProfitChart end={date} />
          </MuiPickersUtilsProvider>
        </div>
      </TabPanel>
      <TabPanel activeTab={activeTab} index={1}>
        <CompositionChart />
      </TabPanel>
    </Box>
  );
}
