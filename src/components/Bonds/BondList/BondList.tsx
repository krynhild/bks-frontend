import React from "react";
import { Bond } from "../../../store/account.types";
import { Paper, TableCell, TableContainer, TableBody, TableRow, Table, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { addBond, removeBond } from "../../../store/bonds.actions";

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
  const dispatch = useDispatch();

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
              <TableCell align="right">
                {`${bond.quantity} шт.`}
                <IconButton
                  size="small"
                  onClick={() => dispatch(addBond(bond.company.name))}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => dispatch(removeBond(bond.company.name))}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                {`${bond.interestRate}%`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
