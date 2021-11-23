import React from 'react'
import * as styles from './style.module.css'

const SuccessSpan = ({children}) => {
  return (
    <span className={styles.root}>{children}</span>
  )
}

export default SuccessSpan