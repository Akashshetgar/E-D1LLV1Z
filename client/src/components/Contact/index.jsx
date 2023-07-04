import React from 'react';
import Heading from '../Heading/Heading';
import styles from './styles.module.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';

const contacts = [
  {
    name: 'Swarangi Kule',
    // profilePic: 'person1.jpg',
    github: 'https://github.com/swarangi3128',
    linkedin: 'https://www.linkedin.com/in/swarangi-kule-b8613720a/',
    email: 'swarangi.kule@somaiya.edu',
    phone: '+91 9619553845',
  },
  {
    name: 'Aakash Wagle',
    // profilePic: 'person2.jpg',
    github: 'https://github.com/aakash-wagle/',
    linkedin: 'https://www.linkedin.com/in/aakash-wagle-826a21235/',
    email: 'aakash.wagle@somaiya.edu',
    phone: '+91 8369686436',
  },
  {
    name: 'Akash Shetgar',
    // profilePic: 'person3.jpg',
    github: 'https://github.com/Akashshetgar',
    linkedin: 'https://www.linkedin.com/in/akash-shetgar-122654209/',
    email: 'akash.shetgar@somaiya.edu',
    phone: '+91 7093108528',
  },
  {
    name: 'Dwayne Vaz Nigel',
    // profilePic: 'person4.jpg',
    github: 'https://github.com/Dwayne232001',
    linkedin: 'https://www.linkedin.com/in/dwayne-vaz',
    email: 'dwayne.vaz@somaiya.edu',
    phone: '+91 9930530439',
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