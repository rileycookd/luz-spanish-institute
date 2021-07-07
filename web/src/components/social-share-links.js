import React from 'react'
import * as styles from './social-share-links.module.css'
import { FaFacebook as FacebookIcon, FaTwitter as TwitterIcon } from 'react-icons/fa'
import { MdMail as MailIcon, MdContentCopy as LinkIcon } from 'react-icons/md'
import { RiWhatsappFill as WhatsAppIcon } from 'react-icons/ri'
import { IoLogoLinkedin as LinkedInIcon } from 'react-icons/io5'

function SocialShareLinks(props) {
  const {
    title,
    url
  } = props

  return (
    <>
      <a 
        className={styles.socialShareLink}
        href={`https://www.facebook.com/sharer.php?u=${url}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FacebookIcon />
      </a>
      {/* Include &via=[twitterhandlenamewithout@] */}
      <a 
        className={styles.socialShareLink}
        href={`https://twitter.com/share?url=${url}&text=${title}&hashtags=ameliolanguageinstitute`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <TwitterIcon />
      </a>
      <a 
        className={styles.socialShareLink}
        href={`https://api.whatsapp.com/send?text=${title} ${url}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <WhatsAppIcon />
      </a>
      <a 
        className={styles.socialShareLink}
        href={`https://www.linkedin.com/shareArticle?url=${url}&title=${title}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <LinkedInIcon />
      </a>
      <a 
        className={styles.socialShareLink}
        href={`mailto:?subject=${title}&body=${url}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <MailIcon />
      </a>
      <div
        className={styles.socialShareLink}
        onClick={() =>  navigator.clipboard.writeText(url)}
      >
        <LinkIcon />
      </div>
    </>
  )
}

export default SocialShareLinks