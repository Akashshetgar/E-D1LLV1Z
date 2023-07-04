import styles from "./styles.module.css";

function Home() {
	return (
		<section className={styles.home_section} id="home">
			<h1 className={styles.heading_1}>E-D1LLV1Z</h1>
			<h3 className={styles.heading_2}>Your options start here...</h3>
			<p className={styles.greet} style={{ paddingLeft: "300px" }}> Options Chain Tool</p>
			<p className={styles.desc}>
			...
			</p>
			<div className={styles.right}>
					<img
						src="/opt.jpg"
						alt="profile"
						className={styles.profile_img}
					/>
					<div className={styles.img_border}></div>
				</div>
		</section>
	);
}

export default Home;