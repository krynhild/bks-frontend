import React from "react";
import { useSelector } from "react-redux";
import { BondList } from "./BondList/BondList";
import { Bond } from "../../store/account.types";
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    "margin-bottom": "50px",
  },
  header: {
    "margin-bottom": "25px",
    "text-align": "left"
  }
}));

export const Bonds = () => {
  const classes = useStyles();
  const bonds = useSelector(({ bonds }: { bonds: Array<Bond> }) => bonds);

  return (
    <div className={classes.root}>
      <Box className={classes.header} textAlign="left" fontSize="h6.fontSize">Ваши облигации</Box>
      <BondList bonds={bonds} />
    </div>
  )
}
