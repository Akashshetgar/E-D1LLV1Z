/* eslint-disable react/prop-types */
import React, { useState, useContext, createContext } from "react";

export const OptionsContext = createContext(null);

const initialState = {};

const OptionsProvider = (props) => {
  const [optionsState, setOptionsState] = useState(initialState);

  return (
    <OptionsContext.Provider value={{ optionsState, setOptionsState }}>
      {props.children}
    </OptionsContext.Provider>
  );
};

export default OptionsProvider;
