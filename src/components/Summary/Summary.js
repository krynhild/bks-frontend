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
import { getAccountTotal } from "../../store/account.selectors";
import { setTotal } from "../../store/account.actions";

const useStyles = makeStyles({
  root: {
    "margin-bottom": '100px',
  },
  header: {
    "margin-bottom": "40px",
    "text-align": "left"
  },
  rightBox: {
    "margin-left": "80px"
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
  const classes = useStyles();
  const total = useSelector(getAccountTotal);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Box className={classes.header} textAlign="left" fontSize="h6.fontSize">Сумма на счету</Box>
          <Slider
            value={total/1000}
            onChange={(e, val) => dispatch(setTotal(val*1000))}
            min={0}
            max={1000}
            step={50}
            marks={getMarks()}
            valueLabelDisplay="on"
            valueLabelFormat={num => num ? `${num}K` : num}
          />
        </Grid>
        <Grid item xs={3}>
          <Box className={classes.rightBox}>
            <Box className={classes.typesHeader} textAlign="left" fontSize="h6.fontSize">Тип счета</Box>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={true}
                    name="IIS"
                    color="primary"
                  />
                }
                label="ИИС"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={true}
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
