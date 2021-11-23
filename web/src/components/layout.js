import React from 'react'
import * as styles from './layout.module.css'
import Navbar from './navbar'

function Layout (props) {
  const {
    children,
    onHideNav,
    onShowNav,
    showNav,
    siteTitle,
    navMenuItems,
  } = props;


  return (
    <div className={styles.root}>
      {navMenuItems && (
        <Navbar navMenuItems={navMenuItems ? navMenuItems : []} />
      )}
      {children}
    </div> 
  )
}

export default Layout
