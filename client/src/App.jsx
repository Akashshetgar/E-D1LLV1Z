import Navbar from "./Components/Navbar";

import MarketData from "./Section/MarketData";
import Contact from "./Section/Contact";

import Home from "./Section/Home";



import ContactBar from "./Components/ContactBar";
import Footer from "./Components/Footer";
import "./App.css";

function App() {
	return (
		<main className="main">
			<Navbar />
			<div className="app_section_container">
				<Home />
				<MarketData />
				<Contact />
				
			</div>
			<ContactBar />
			<Footer />
		</main>
	);
}

export default App;