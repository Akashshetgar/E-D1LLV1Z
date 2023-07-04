/* eslint-disable no-unused-vars */
import { useState } from "react";
import DataTableV2 from "./components/DataTable/DataTableV2";
import OptionsProvider from "./contexts/OptionsContext";
import IndexProvider from "./contexts/IndexContext";
import DropdownContainer from "./components/Dropdown/Dropdown";
import "./App.css";
import OptionNamesProvider from "./contexts/OptionNamesContext";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <IndexProvider>
        <OptionsProvider>
          <OptionNamesProvider>
            <Navbar />
            <div className="app_section_container">
              <Home />
            </div>
            <Box
              sx={{
                width: 3 / 4,
                ml: 23  
              }}
            >
              <DropdownContainer />
              <DataTableV2 />
              <Contact />
              <Footer />
            </Box>
          </OptionNamesProvider>
        </OptionsProvider>
      </IndexProvider>
    </>
  );
}

export default App;

// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     <>
//       <IndexProvider>
//         <OptionsProvider>
//           <OptionNamesProvider>
//             <DropdownContainer />
//           </OptionNamesProvider>
//           <DataTableV2 />
//         </OptionsProvider>
//       </IndexProvider>
//     </>
//   );
// }

// export default App;
