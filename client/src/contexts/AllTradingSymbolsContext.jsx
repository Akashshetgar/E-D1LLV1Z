/* eslint-disable react/prop-types */
import React, { useState, useContext, createContext } from "react";

export const AllTradingSymbolsContext = createContext(null);

const initialState = [];

const AllTradingSymbolsProvider = (props) => {
  const [AllTradingSymbolsState, setAllTradingSymbolsState] = useState(initialState);

  return (
    <AllTradingSymbolsContext.Provider value={{ AllTradingSymbolsState, setAllTradingSymbolsState }}>
      {props.children}
    </AllTradingSymbolsContext.Provider>
  );
};

export default AllTradingSymbolsProvider;