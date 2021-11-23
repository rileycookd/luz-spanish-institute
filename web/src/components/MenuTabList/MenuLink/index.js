import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { cn } from '../../../lib/helpers'
import * as styles from './style.module.css'

const MenuLink = ({ to, children, isCurrent }) => {

  return (
    <Link 
      className={styles.tab}
      activeClassName={styles.active}
      to={to}
    >
      {children}
    </Link>
  )
}

export default MenuLink
