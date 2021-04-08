import { Link } from 'gatsby'
import React from 'react'
import { cn } from '../lib/helpers'
import { ImPhone as PhoneIcon, ImFacebook as FacebookIcon, ImLinkedin2 as LinkedinIcon } from 'react-icons/im'
import { IoMdMail as MailIcon } from 'react-icons/io'
import { IoLogoInstagram as InstagramIcon } from 'react-icons/io5'
import CtaForm from './cta-form'
import * as styles from './footer.module.css'

function Footer (props) {
  return (
    <div className={styles.root}>
      <footer className={styles.footer}>
        <div className={styles.row}>

          <div className={styles.contact}>
            <div className={styles.contactItem}>
              <PhoneIcon className={styles.contactIcon} />
              <p className={styles.contactInfo}>+56 9 5555 5555</p>
            </div>
            <div className={styles.contactItem}>
              <MailIcon className={styles.contactIcon} />
              <p className={styles.contactInfo}>hola@luzdamelio.com</p>
            </div>
          </div>

          <div className={styles.siteMap}>

            <div className={styles.siteMapColumn}>
              <h5 className={styles.siteMapTitle}>Classes</h5>
              <ul className={styles.siteMapLinks}>
                <li className={styles.siteMapLink}>
                  <a href="#">Private</a>
                </li>
                <li className={styles.siteMapLink}>
                  <a href="#">Group</a>
                </li>
                <li className={styles.siteMapLink}>
                  <a href="#">Conversation</a>
                </li>
              </ul>
            </div>
            <div className={styles.siteMapColumn}>
              <h5 className={styles.siteMapTitle}>Resources</h5>
              <ul className={styles.siteMapLinks}>
                <li className={styles.siteMapLink}>
                  <a href="#">Grammar</a>
                </li>
                <li className={styles.siteMapLink}>
                  <a href="#">Vocabulary</a>
                </li>
                <li className={styles.siteMapLink}>
                  <a href="#">Pronunciation</a>
                </li>
              </ul>
            </div>
            <div className={styles.siteMapColumn}>
              <h5 className={styles.siteMapTitle}>Events</h5>
              <ul className={styles.siteMapLinks}>
                <li className={styles.siteMapLink}>
                  <a href="#">Conversation club</a>
                </li>
                <li className={styles.siteMapLink}>
                  <a href="#">Workshops</a>
                </li>
                <li className={styles.siteMapLink}>
                  <a href="#">Demo Lessons</a>
                </li>
              </ul>
            </div>
            <div className={styles.siteMapColumn}>
              <h5 className={styles.siteMapTitle}>Contact</h5>
              <ul className={styles.siteMapLinks}>
                <li className={styles.siteMapLink}>
                  <a href="#">Prospective students</a>
                </li>
                <li className={styles.siteMapLink}>
                  <a href="#">Current students</a>
                </li>
                <li className={styles.siteMapLink}>
                  <a href="#">General inquiries</a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.socialLinks}>
            <InstagramIcon />
            <FacebookIcon />
            <LinkedinIcon />
          </div>
          <div className={styles.copyright}>
            © Luz D'Amelio {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer