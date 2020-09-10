import React from 'react';
import './App.css';
import { Summary } from "./components/Summary/Summary";
import { Portfolio } from "./components/Portfolio/Portfolio";
import { Bonds } from "./components/Bonds/Bonds";
import { InvestmentConditions } from "./components/InvestmentConditions/InvestmentConditions";
import { Header } from "./components/common/Header";
import { Box, Typography } from "@material-ui/core";

function App() {
  return (
    <div className="app">
      <Header />
      <div style={{ "max-width": "1000px", "margin": "0 auto" }}>
        <Box style={{ "margin": "35px 0" }} textAlign={"left"}>
          <Typography variant={"h4"}>
            Календарь инвестиций
          </Typography>
        </Box>
        <Summary />
        <InvestmentConditions />
        <Portfolio />
        <Bonds />
      </div>
    </div>
  );
}

export default App;
