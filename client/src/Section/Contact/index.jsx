import Heading from "../../Components/Heading";
import styles from "./styles.module.css";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';


function Contact() {
	return (
		<section className={styles.contact_section} id="contact">
			<div className={styles.heading_1}>
				<Heading index="04" heading="My Team" />
			</div>
			<h1 className={styles.heading_2}>Get In Touch</h1>
			<p className={styles.desc}>
				Sample text
			</p>
			<a href="mailto:swarangikule@gmail.com">
				<button className={styles.btn}>
                    <MailIcon/>
                    </button>
			</a>
            <a href="https://github.com/swarangi3128">
				<button className={styles.btn}>
                    <GitHubIcon/>
                    </button>
			</a>
            <a href="https://www.linkedin.com/in/swarangi-kule-b8613720a/">
				<button className={styles.btn}>
                    <LinkedInIcon/>
                    </button>
			</a>
            <p className={styles.desc}>
                Phone Number
            </p>

		</section>
	);
}

export default Contact;





