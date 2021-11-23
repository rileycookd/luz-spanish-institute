import React from 'react'
import { Link } from 'gatsby'
import { cn } from '../../../lib/helpers'
import * as styles from './style.module.css'

const TabLink = ({ to, children, dark }) => {
  return (
    <Link 
      className={dark ? cn(styles.tab, styles.dark) : styles.tab}
      activeClassName={styles.active}
      partiallyActive={true}
      to={to}
    >
      {children}
    </Link>
  )
}

export default TabLink

