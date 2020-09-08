import React from "react";
import { Bond } from "../../../store/account.types";
import { Paper, TableContainer, TableBody } from "@material-ui/core";

export const BondItem = (bond: Bond) => {
  return (
    <TableContainer component={Paper}>
      <TableBody>
      </TableBody>
    </TableContainer>
  );
}
