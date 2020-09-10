import React from 'react';
import './App.css';
import { Summary } from "./components/Summary/Summary";
import { Portfolio } from "./components/Portfolio/Portfolio";
import { Bonds } from "./components/Bonds/Bonds";
import { InvestmentConditions } from "./components/InvestmentConditions/InvestmentConditions";
import { Header } from "./components/common/Header";

function App() {
  return (
    <div className="app">
      <Header />
      <Summary />
      <InvestmentConditions />
      <Portfolio />
      <Bonds />
    </div>
  );
}

export default App;
