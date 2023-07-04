import styles from "./styles1.module.css";
import logoImage from "/logo.svg"; // Replace "logo.png" with the path to your image file

const Navbar = () => {
  return (
    <nav className={styles.nav_container}>
      <div className={styles.nav_left} >
        <a href="#home">
          <img src={logoImage} alt="Logo" className={styles.logo_image}  />
          <span className={styles.logo_text} style={{ paddingLeft: "10px" }}>E-D1LLV1Z</span>
        </a>
      </div>
      <div className={styles.nav_right}>
        <a href="#MarketData" className={styles.nav_link}>
          <span>01.</span>MarketData
        </a>
        <a href="#Pricing" className={styles.nav_link}>
          <span>02.</span>Pricing
        </a>
        <a href="#Data" className={styles.nav_link}>
          <span>03.</span> Data
        </a>
        <a href="#contact" className={styles.nav_link}>
          <span>04.</span>Contact
        </a>
      </div>
    </nav>
  );
}

export default Navbar