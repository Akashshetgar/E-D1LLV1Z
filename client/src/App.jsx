/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import DataTableV2 from "./components/DataTable/DataTableV2";
import GetJSON from "./components/GetJSON";
import OptionsProvider from "./contexts/OptionsContext";
import IndexProvider from "./contexts/IndexContext";
import OptionNamesProvider from "./contexts/OptionNamesContext";
import AllTradingSymbolsProvider from "./contexts/AllTradingSymbolsContext";
import DataTable from "./components/DataTable/DataTable";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <IndexProvider>
        <OptionsProvider>
          <AllTradingSymbolsProvider>
            <OptionNamesProvider>
              {/* <GetJSON /> */}
              <DataTable />
            </OptionNamesProvider>
          </AllTradingSymbolsProvider>
        </OptionsProvider>
      </IndexProvider>
    </>
  );
}

export default App;
