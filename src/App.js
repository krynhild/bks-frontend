import React from 'react';
import './App.css';
import { Summary } from "./components/Summary/Summary";
import { Portfolio } from "./components/Portfolio/Portfolio";
import { Bonds } from "./components/Bonds/Bonds";

function App() {
  return (
    <div className="app">
      <Summary />
      <Portfolio/>
      <Bonds/>
    </div>
  );
}

export default App;
