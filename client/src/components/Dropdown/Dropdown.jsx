/* eslint-disable react/prop-types */
import Heading from "../Heading/Heading";
import styles from "./styles.module.css";
import * as React from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from '@mui/material/Container';

function Dropdown({ label, options, selectedOption, onOptionChange }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`${label}-label`} sx={{ color: "whitesmoke" }}>
          {label}
        </InputLabel>
        <Select
          labelId={`${label}-label`}
          id={`${label}-select`}
          value={selectedOption}
          label={label}
          onChange={onOptionChange}
          sx={{
            backgroundColor: "#1c4684",
            color: "whitesmoke",
            width: 150,
            "& .MuiSelect-icon": {
              color: "#0a1d2f",
            },
          }}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

function DropdownContainer() {
  const contractOptions = ["Contract 1", "Contract 2", "Contract 3"];
  const symbolOptions = ["Symbol 1", "Symbol 2", "Symbol 3"];
  const expiryDateOptions = ["Expiry Date 1", "Expiry Date 2", "Expiry Date 3"];
  const strikePriceOptions = [
    "Strike Price 1",
    "Strike Price 2",
    "Strike Price 3",
  ];

  const [contract, setContract] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  const [expiryDate, setExpiryDate] = React.useState("");
  const [strikePrice, setStrikePrice] = React.useState("");

  return (
    <Container id="MarketData1" sx={{pb: 2}}>
      <Heading index="01" heading="Option Chain (Equity Derivatives)" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Dropdown
          label="View Options Contract for"
          options={contractOptions}
          selectedOption={contract}
          onOptionChange={(e) => setContract(e.target.value)}
        />
        <span style={{ margin: "0 10px" }}> OR </span>
        <Dropdown
          label="Select Symbol"
          options={symbolOptions}
          selectedOption={symbol}
          onOptionChange={(e) => setSymbol(e.target.value)}
        />
        <span style={{ margin: "0 10px" }}></span>
        <Dropdown
          label="Expiry Date"
          options={expiryDateOptions}
          selectedOption={expiryDate}
          onOptionChange={(e) => setExpiryDate(e.target.value)}
        />
        <span style={{ margin: "0 10px" }}> OR </span>
        <Dropdown
          label="Strike Price"
          options={strikePriceOptions}
          selectedOption={strikePrice}
          onOptionChange={(e) => setStrikePrice(e.target.value)}
        />
      </div>
    </Container>
  );
}

export default DropdownContainer;
