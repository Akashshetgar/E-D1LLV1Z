/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import DataTable from "./components/DataTable/DataTable";
import GetJSON from "./components/GetJSON";
import OptionsProvider from "./contexts/OptionsContext";
import IndexProvider from "./contexts/IndexContext";
import OptionNamesProvider from "./contexts/OptionNamesContext";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <IndexProvider>
        <OptionsProvider>
          <OptionNamesProvider>
            <GetJSON />
            <DataTable />
          </OptionNamesProvider>
        </OptionsProvider>
      </IndexProvider>
    </>
  );
}

export default App;
