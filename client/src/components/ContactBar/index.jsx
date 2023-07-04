import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import styles from "./styles.module.css";

function ContactBar() {
	return (
		<div className={styles.contact_bar_wrapper}>
			<div className={styles.contact_bar}>
				<a href="" target="_blank" rel="noopener noreferrer" className={styles.icon} >
					<LinkedInIcon  />
				</a>
				<a href="" target="_blank" rel="noopener noreferrer" className={styles.icon} >
					<GitHubIcon  />
				</a>
				
				<div className={styles.line}></div>
			</div>
			<div className={styles.contact_bar}>
				<a href="" className={styles.email}>
					E-D1LLV1Z
				</a>
				<div className={styles.line}></div>
			</div>
		</div>
	);
}

export default ContactBar;