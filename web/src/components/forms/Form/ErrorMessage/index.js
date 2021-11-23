import React from 'react'
import * as styles from './style.module.css'

const ErrorMessage = ({children}) => {
  return (
    <p className={styles.root}>{children}</p>
  )
}

export default ErrorMessage