import styles from "./styles.module.css";

function Home() {
	return (
		<section className={styles.home_section} id="home">
			<p className={styles.greet}>Options Chain Tool</p>
			<h1 className={styles.heading_1}>E-D1LLV1Z</h1>
			<h3 className={styles.heading_2}>Sample text.</h3>
			<p className={styles.desc}>
			...
			</p>
			<a href="#work">
				<button className={styles.btn}>..</button>
			</a>
		</section>
	);
}

export default Home;
