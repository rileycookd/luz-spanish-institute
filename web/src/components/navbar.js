import React, { useState } from 'react'
import * as styles from './navbar.module.css'
import CTALink from './CTALink'
import { Link, navigate } from 'gatsby'
import { cn } from '../lib/helpers'
import { IoChevronDown as DropdownArrow } from 'react-icons/io5'

function Navbar ({navMenuItems, navMenuCtas}) {
  
  const [dropDownLinks, setDropDownLinks] = useState([])

  const renderLinks = (data) => {
    return data.map((d) => (
      <li key={d._key} className={cn(styles.link, styles.dropdownLink)}>
        <CTALink {...d} />
      </li>
    ))
  }

  const navLinks = navMenuItems.map((i) => (
    i._type === 'cta' ? (
    <li key={i._key} className={styles.link}>
      <CTALink {...i} />
    </li>
    ) : (
    <li 
      key={i._key} 
      className={cn(styles.link, styles.dropdown)}
    >
      {i.title} <DropdownArrow />
      {i.links && (
        <ul 
          className={styles.dropdownMenu}
        >
          {renderLinks(i.links)}
        </ul>
      )}
    </li>
    )
  ))

  const navCtas = navMenuCtas.map((i) => (
    <li key={i._key} className={styles.link}>
      <CTALink {...i} />
    </li>
  ))

  return (
    <div className={styles.root}>
      <Link className={styles.logo} to="/">Luz.</Link>

      {navMenuItems && (
        <ul className={cn(styles.links, styles.navMain)}>
          {navLinks}
        </ul>
      )}

      <ul className={cn(styles.links, styles.navCTA)}>
        {navCtas}
      </ul>
    </div>
  )
}

export default Navbar;