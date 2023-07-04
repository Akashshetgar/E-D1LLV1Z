/* eslint-disable react/prop-types */
import React, { useState, useContext, createContext } from "react";

export const IndexContext = createContext(null);

const initialState = {};

const IndexProvider = (props) => {
  const [indexState, setIndexState] = useState(initialState);

  return (
    <IndexContext.Provider value={{ indexState, setIndexState }}>
      {props.children}
    </IndexContext.Provider>
  );
};

export default IndexProvider;
