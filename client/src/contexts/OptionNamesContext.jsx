/* eslint-disable react/prop-types */
import React, { useState, useContext, createContext } from "react";

export const OptionNamesContext = createContext(null);

const initialState = [];

const OptionNamesProvider = (props) => {
  const [optionNames, setOptionNames] = useState(initialState);

  return (
    <OptionNamesContext.Provider value={{ optionNames, setOptionNames }}>
      {props.children}
    </OptionNamesContext.Provider>
  );
};

export default OptionNamesProvider;
