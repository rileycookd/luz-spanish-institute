import React from 'react'
import * as styles from './style.module.css'

const FormTitle = ({ children }) => {
  return (
    <h1 className={styles.root}>
      {children}
    </h1>
  )
}

export default FormTitle