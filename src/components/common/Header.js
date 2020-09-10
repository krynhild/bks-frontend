import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  stretch: {
    margin: "0 -500px",
    "background": "#3a4fcc"
  },
  wrapper: {
    display: "flex",
    "align-items": "center",
    padding: "20px 0",
    margin: "0 auto",
    "max-width": "900px"
  },
  title: {
    "margin-left": "10px",
    "font-size": "16px",
    "font-weight": 600,
    color: "white"
  }
})

export const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.stretch}>
      <div className={classes.wrapper}>
        <img alt="logo" src={"logo.svg"} width={26} height={26} />
        <span className={classes.title}>BCS EXPRESS</span>
      </div>
    </div>
  );
}
