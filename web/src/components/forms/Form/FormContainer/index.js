import React from 'react'
import * as styles from './style.module.css'

const FormContainer = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        {children}     
      </div>
    </div>
  )
}

export default FormContainer