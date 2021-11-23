import React from 'react'
import { Link } from 'gatsby'
import * as styles from './style.module.css'

const SidebarLink = ({ to, children }) => {
  return (
    <Link 
      className={styles.root}
      activeClassName={styles.active}
      partiallyActive={false}
      to={to}
    >
      {children}
    </Link>
  )
}

export default SidebarLink