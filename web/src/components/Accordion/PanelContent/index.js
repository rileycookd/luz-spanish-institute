import React from 'react'
import * as styles from './style.module.css'

const PanelContent = ({children}) => {
  return (
    <div className={styles.root}>
      {children}
    </div>
  )
}

export default PanelContent