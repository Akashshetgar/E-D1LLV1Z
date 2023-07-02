import styles from "./styles.module.css";



function Navbar() {
	return (
		<nav className={styles.nav_container}>
			<div className={styles.nav_left}>
				<a href="#home">E-D1LLV1Z</a>
			</div>
			<div className={styles.nav_right}>
				<a href="#about" className={styles.nav_link}>
					<span>01.</span>About
				</a>
				<a href="#Pricing" className={styles.nav_link}>
					<span>02.</span>Pricing
				</a>
				<a href="#Data" className={styles.nav_link}>
					<span>03.</span>Market Data
				</a>
				<a href="#contact" className={styles.nav_link}>
					<span>04.</span>Contact
				</a>
				
			</div>
		</nav>
	);
}

export default Navbar;
