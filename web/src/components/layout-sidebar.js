import React from 'react'
import * as styles from './layout-sidebar.module.css'

function LayoutSidebar ({children}) {
  return (
    <div className={styles.root}>
      {children}
    </div>
  )
}

export default LayoutSidebar