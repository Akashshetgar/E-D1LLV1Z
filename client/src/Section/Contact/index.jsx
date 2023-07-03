import React from 'react';
import Heading from '../../Components/Heading';
import styles from './styles.module.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';

const contacts = [
  {
    name: 'Person 1',
    profilePic: 'person1.jpg',
    github: 'https://github.com/person1',
    linkedin: 'https://www.linkedin.com/in/swarangi-kule-b8613720a/',
    email: 'person1@example.com',
    phone: '9619553845',
  },
  {
    name: 'Person 2',
    profilePic: 'person2.jpg',
    github: 'https://github.com/person2',
    linkedin: 'https://linkedin.com/in/person2',
    email: 'person2@example.com',
    phone: '9876543210',
  },
  {
    name: 'Person 3',
    profilePic: 'person3.jpg',
    github: 'https://github.com/person3',
    linkedin: 'https://linkedin.com/in/person3',
    email: 'person3@example.com',
    phone: '4567891230',
  },
  {
    name: 'Person 4',
    profilePic: 'person4.jpg',
    github: 'https://github.com/person4',
    linkedin: 'https://linkedin.com/in/person4',
    email: 'person4@example.com',
    phone: '3219876540',
  },
];

function Contact() {
  return (
    <section className={styles.contact_section} id="contact">
      <div className={styles.heading_1}>
        <Heading index="04" heading="Meet Our Team" />
      </div>
      <h1 className={styles.heading_2}>Get In Touch</h1>
      
      <div className={styles.contact_row}>
        <div className={styles.contact_card}>
          <img src={contacts[0].profilePic} alt={contacts[0].name} className={styles.profile_pic} />
          <div className={styles.contact_info}>
            <h2>{contacts[0].name}</h2>
            <div className={styles.social_links}>
              <a href={contacts[0].github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon />
              </a>
              <a href={contacts[0].linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon />
              </a>
              <a href={`mailto:${contacts[0].email}`}>
                <MailIcon />
              </a>
            </div>
            <p>{contacts[0].phone}</p>
          </div>
        </div>
        <div className={styles.contact_card}>
          <img src={contacts[1].profilePic} alt={contacts[1].name} className={styles.profile_pic} />
          <div className={styles.contact_info}>
            <h2>{contacts[1].name}</h2>
            <div className={styles.social_links}>
              <a href={contacts[1].github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon />
              </a>
              <a href={contacts[1].linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon />
              </a>
              <a href={`mailto:${contacts[1].email}`}>
                <MailIcon />
              </a>
            </div>
            <p>{contacts[1].phone}</p>
          </div>
        </div>
      </div>
      <div className={styles.contact_row}>
        <div className={styles.contact_card}>
          <img src={contacts[2].profilePic} alt={contacts[2].name} className={styles.profile_pic} />
          <div className={styles.contact_info}>
            <h2>{contacts[2].name}</h2>
            <div className={styles.social_links}>
              <a href={contacts[2].github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon />
              </a>
              <a href={contacts[2].linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon />
              </a>
              <a href={`mailto:${contacts[2].email}`}>
                <MailIcon />
              </a>
            </div>
            <p>{contacts[2].phone}</p>
          </div>
        </div>
        <div className={styles.contact_card}>
          <img src={contacts[3].profilePic} alt={contacts[3].name} className={styles.profile_pic} />
          <div className={styles.contact_info}>
            <h2>{contacts[3].name}</h2>
            <div className={styles.social_links}>
              <a href={contacts[3].github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon />
              </a>
              <a href={contacts[3].linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon />
              </a>
              <a href={`mailto:${contacts[3].email}`}>
                <MailIcon />
              </a>
            </div>
            <p>{contacts[3].phone}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
