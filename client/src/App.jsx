/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import DataTableV2 from "./components/DataTable/DataTableV2";
import OptionsProvider from "./contexts/OptionsContext";
import IndexProvider from "./contexts/IndexContext";
import OptionNamesProvider from "./contexts/OptionNamesContext";
import DropdownContainer from "./components/Dropdown/Dropdown";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <IndexProvider>
        <OptionsProvider>
          <DropdownContainer />
          <DataTableV2 />
        </OptionsProvider>
      </IndexProvider>
    </>
  );
}

export default App;
