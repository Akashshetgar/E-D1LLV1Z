/* eslint-disable react/prop-types */
import { TableCell, TableRow, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { OptionsContext } from "../../contexts/OptionsContext";

const CustomTableRow = ({ colNames, isHead, strk }) => {
  const { optionsState } = useContext(OptionsContext);
  const data = optionsState[strk];
  // console.log(data?.CE);
  // console.log(`data: ${JSON.stringify(data)}`);
  // data = JSON.stringify(data)
  // console.log("strike price", strikePrice);
  return (
    <React.Fragment>
      {isHead ? (
        <TableRow>
          {colNames.map(({ label, dataKey, isCE }, index) => {
            return (
              <TableCell
                key={index}
                variant="head"
                align="center"
                style={{
                  width: 20,
                  backgroundColor:
                    dataKey == "strikePrice" ? "black" : "#1c4684",
                  color: "whitesmoke",
                }}
                sx={{
                  backgroundColor: "grey.300",
                  fontSize: 11,
                  fontWeight: "bold",
                }}
              >
                {label}
              </TableCell>
            );
          })}
        </TableRow>
      ) : (
        data && (
          <TableRow>
            {colNames.map(({ label, dataKey, isCE }, index) => (
              <TableCell
                key={index}
                variant="head"
                align="center"
                style={{
                  width: 20,
                  backgroundColor:
                    dataKey == "strikePrice" ? "black" : "#1c4684",
                  color: "whitesmoke",
                }}
                sx={{
                  backgroundColor: "grey.300",
                  fontSize: 11,
                  fontWeight: "bold",
                }}
              >
                {isCE ? data.CE[dataKey] : data.PE[dataKey]}
              </TableCell>
            ))}
          </TableRow>
        )
      )}
    </React.Fragment>
  );
};

export default CustomTableRow;
