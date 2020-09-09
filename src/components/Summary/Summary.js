import _ from 'lodash';
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { getAccountReinvest, getAccountTotal, isAccountIIS } from "../../store/account.selectors";
import { setAccountType, setReinvest, setTotal } from "../../store/account.actions";
import { AccountType } from "../../store/account.types";

const useStyles = makeStyles({
  root: {
    "margin-bottom": '50px',
  },
  block: {
    "margin-bottom": "50px",
  },
  header: {
    "margin-bottom": "40px",
    "text-align": "left"
  },
  typesHeader: {
    "margin-bottom": "25px",
  }
})

const getMarks = () => _.map(_.range(0, 1001, 200), num => {
  return {
    value: num,
    label: num ? `${num} K` : 0
  }
})

export const Summary = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const total = useSelector(getAccountTotal);
  const reinvest = useSelector(getAccountReinvest);
  const iis = useSelector(isAccountIIS);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid className={classes.block} item xs={12}>
          <Box className={classes.header} textAlign="left" fontSize="h6.fontSize">Сумма на счету</Box>
          <Slider
            value={total / 1000}
            onChange={(e, val) => dispatch(setTotal(val * 1000))}
            min={0}
            max={1000}
            step={50}
            marks={getMarks()}
            valueLabelDisplay="on"
            valueLabelFormat={num => num ? `${num}K` : num}
          />
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Box className={classes.typesHeader} textAlign="left" fontSize="h6.fontSize">Условия инвестирования</Box>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={iis}
                    onChange={
                      (event) =>
                        dispatch(setAccountType(event.target.checked ? AccountType.IIS : AccountType.Broker))
                    }
                    name="IIS"
                    color="primary"
                  />
                }
                label="Индивидуальный инвестиционный счет"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={reinvest}
                    onChange={(event) => dispatch(setReinvest(event.target.checked))}
                    name="Reinvest"
                    color="primary"
                  />
                }
                label="Реинвестировать"
              />
            </FormGroup>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
};
