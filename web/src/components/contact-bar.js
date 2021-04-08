import React from 'react'
import * as styles from './contact-bar.module.css'
import { ImPhone as PhoneIcon, ImFacebook as FacebookIcon, ImLinkedin2 as LinkedinIcon } from 'react-icons/im'
import { IoMdMail as MailIcon } from 'react-icons/io'
import { IoLogoInstagram as InstagramIcon } from 'react-icons/io5'

function ContactBar (props) {
  return (
    <div className={styles.root}>
      <div className={styles.column}>
        <h5 className={styles.title}>Contact info</h5>
          <div className={styles.contactItem}>
            <PhoneIcon className={styles.contactIcon} />
            <p className={styles.contactInfo}>+56 9 5555 5555</p>
          </div>
          <div className={styles.contactItem}>
            <MailIcon className={styles.contactIcon} />
            <p className={styles.contactInfo}>hola@luzdamelio.com</p>
          </div>
      </div>
      <div className={styles.column}>
        <h5 className={styles.title}>Social media</h5>
        <div className={styles.socialLinks}>
          <InstagramIcon />
          <FacebookIcon />
          <LinkedinIcon />
        </div>
      </div>
    </div>
  )
}

export default ContactBar