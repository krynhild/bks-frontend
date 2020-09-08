import React from "react";
import { Bond } from "../../../store/account.types";
import { Paper, TableCell, TableContainer, TableBody, TableRow, Table } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  th: {
    "display": "flex",
    "align-items": "center"
  },
  img: {
    "margin-right": "10px"
  }
}));

export const BondList = ({ bonds }: { bonds: Array<Bond> }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {bonds.map((bond, index) => (
            <TableRow key={index}>
              <TableCell className={classes.th} component="th" scope="row">
                <img className={classes.img} height={30} src={bond.company.logo} />
                {bond.company.name}
              </TableCell>
              <TableCell align="right">{`${bond.quantity} шт.`}</TableCell>
              <TableCell align="right">{`${bond.interestRate}%`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
