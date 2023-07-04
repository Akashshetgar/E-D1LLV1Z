/* eslint-disable no-unused-vars */
import { useState } from "react";
import DataTableV2 from "./components/DataTable/DataTableV2";
// import OptionsProvider from "./contexts/OptionsContext";
// import IndexProvider from "./contexts/IndexContext";
// import OptionNamesProvider from "./contexts/OptionNamesContext";
// import DropdownContainer from "./components/Dropdown/Dropdown";
import "./App.css";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="main">
      <Navbar />
      <div className="app_section_container">
        <Home />
        <DataTableV2 />
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     <>
//       <IndexProvider>
//         <OptionsProvider>
//           <DropdownContainer />
//           <DataTableV2 />
//         </OptionsProvider>
//       </IndexProvider>
//     </>
//   );
// }

// export default App;
