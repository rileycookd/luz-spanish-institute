import React from 'react'
import * as styles from './cta-link-list.module.css'
import { ImArrowRight2 as ArrowIcon } from 'react-icons/im'
import CTALink from './CTALink'

function CTALinkList ({links, innerRef}) {
  
  return (
    <div ref={innerRef} className={styles.root}>
      {links && links.map((l) => (
        <CTALink key={l._key} {...l.cta} custom>
          <div className={styles.link}>
            <h6 className={styles.title}>{l.title}</h6>
            <p className={styles.subtitle}>{l.subtitle}</p>
            <ArrowIcon />
          </div>
        </CTALink>
      ))}
    </div>
    
  )
}

export default CTALinkList