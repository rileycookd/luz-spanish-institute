import React, { useState } from 'react'
import * as styles from './navbar.module.css'
import CTALink from './CTALink'
import { Link, navigate } from 'gatsby'
import { imageUrlFor } from '../lib/image-url'
import { buildImageObj } from '../lib/helpers'
import { cn } from '../lib/helpers'
import { IoChevronDown as DropdownArrow } from 'react-icons/io5'
import { ImArrowRight2 as ArrowIcon } from 'react-icons/im'
import { useIdentityContext } from "react-netlify-identity-widget"


function Navbar ({ navMenuItems }) {
  
  const [dropDownLinks, setDropDownLinks] = useState([])
  const { user, isLoggedIn, logoutUser } = useIdentityContext()

  const handleClick = async event => {
    event.preventDefault()
    await logoutUser()
    navigate(`/app/login`)
  }

  const renderDropdownLink = (link) => {
    let image = link.innerPageRoute && link.innerPageRoute.image || link.image || null
    let title = link.innerPageRoute && link.innerPageRoute.title || link.title || ''
    if(link._type === 'dropdownThumbnailCta') {
      return (
        <CTALink {...link} className={cn(styles.dropdownCta)}>
          {image && image.asset && (
            <>
              <img className={styles.dropdownThumbnail}
                src={imageUrlFor(buildImageObj(image))
                  .width(350)
                  .height(Math.floor((2 / 3) * 350))
                  .fit('crop')
                  .url()}
                alt={image.alt}
              />
              <h3 className={styles.dropdownTitle}>{title}</h3>
            </>
          )}
        </CTALink>
      )
    }
    if(link._type === 'dropdownCta') {
      return (
        <div className={styles.dropdownCta}>
          <p className={styles.dropdownDescription}>{link.description}</p>
          <CTALink {...link}><h3 className={styles.dropdownTitle} style={{marginTop: '.5rem'}}>{link.title} <span><ArrowIcon /></span></h3></CTALink>
        </div>
      )
    }
    // return link.map((d) => (
    //   <li key={d._key} className={cn(styles.link, styles.dropdownLink)}>
    //     <CTALink {...d} />
    //   </li>
    // ))
  }

  const navLinks = navMenuItems && navMenuItems.map((i) => {
    if(i._type === 'cta') {
      return (
        <li key={i._key} className={styles.link}>
          <CTALink {...i} />
        </li>
      )
    } else if(i._type === 'dropdownMenu') {
      return (
        <li 
          key={i._key} 
          className={cn(styles.link, styles.dropdown)}
        >
          <h3 className={styles.link}>{i.title}</h3> <DropdownArrow />
          <div className={styles.dropdownMenu}>
            {i.content && (
              <ul className={styles.dropdownMenuContent}>
                {i.content.map(c => (
                  <li className={styles.dropdownMenuContentGroup}>
                    {renderDropdownLink(c)}
                  </li>
                ))}
                {i.cta && (
                  <>
                    {renderDropdownLink(i.cta)}
                  </>
                )}
              </ul>
            )}
            
          </div>
        </li>
      )
    }
  })

  return (
    <div className={styles.root}>
      <Link className={styles.logo} to="/">Luz.</Link>

      {navMenuItems && (
        <ul className={styles.links}>
          {navLinks}
        </ul>
      )}

      <ul className={styles.links}>
        {isLoggedIn ? (<a href="/" onClick={handleClick}>Logout</a>) : (<CTALink route="/app/login" title='Login' />)}
        <CTALink kind='small button' title='Enroll' />
      </ul>
    </div>
  )
}

export default Navbar;