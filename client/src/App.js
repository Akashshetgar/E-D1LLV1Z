import Navbar from "./Components/Navbar";

import About from "./Section/About";
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
				<About />
				<Contact />
			</div>
			<ContactBar />
			<Footer />
		</main>
	);
}

export default App;