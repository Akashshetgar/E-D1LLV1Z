/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import DataTableV2 from "./components/DataTable/DataTableV2";
import GetJSON from "./components/GetJSON";
import OptionsProvider from "./contexts/OptionsContext";
import IndexProvider from "./contexts/IndexContext";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <IndexProvider>
        <OptionsProvider>
          {/* <GetJSON /> */}
          <DataTableV2 />
        </OptionsProvider>
      </IndexProvider>
    </>
  );
}

export default App;
