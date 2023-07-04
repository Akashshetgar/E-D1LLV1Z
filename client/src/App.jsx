/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import DataTable from "./components/DataTable/DataTable";
import GetJSON from "./components/GetJSON";
import OptionsProvider from "./contexts/OptionsContext";
import IndexProvider from "./contexts/IndexContext";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <IndexProvider>
        <OptionsProvider>
          <GetJSON />
          {/* <DataTable /> */}
        </OptionsProvider>
      </IndexProvider>
    </>
  );
}

export default App;
