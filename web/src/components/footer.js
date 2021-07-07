import { Link } from 'gatsby'
import React from 'react'
import { cn } from '../lib/helpers'
import { ImPhone as PhoneIcon, ImFacebook as FacebookIcon, ImLinkedin2 as LinkedinIcon } from 'react-icons/im'
import { IoMdMail as MailIcon } from 'react-icons/io'
import { IoLogoInstagram as InstagramIcon } from 'react-icons/io5'
import CtaForm from './cta-form'
import * as styles from './footer.module.css'
import CTALink from './CTALink'

function Footer (props) {
  const {
    _rawItems
  } = props

  const renderSiteMapItem = (item) => {
    return (
      <div className={styles.siteMapColumn}>
        <h5 className={styles.siteMapTitle}>{item.title}</h5>
        <ul className={styles.siteMapLinks}>
          {item.links && item.links.map((l => (
            renderLink(l)
          )))}
        </ul>
      </div>
    )
  }

  const renderLink = (l) => {
    
    return (
      <li className={styles.siteMapLink}>
        <CTALink {...l}><span>{l.title || l.innerPageRoute && l.innerPageRoute.title}</span></CTALink>
      </li>
    )
  }


  return (
    <div className={styles.root}>
      <footer className={styles.footer}>
        <div className={styles.row}>

        {_rawItems && (
            <div className={styles.siteMap}>
              {_rawItems.map(item => (renderSiteMapItem(item)))}
            </div>
          )}

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
         
        </div>

        <div className={styles.row}>
          <div className={styles.copyright}>
            © Luz D'Amelio {new Date().getFullYear()}
          </div>
          <div className={styles.socialLinks}>
            <InstagramIcon />
            <FacebookIcon />
            <LinkedinIcon />
          </div> 
        </div>
      </footer>
    </div>
  )
}

export default Footer