import React from 'react'
import * as styles from './style.module.css'

const Fieldset = ({ children }) => {
  return (
    <fieldset className={styles.root}>
      {children}
    </fieldset>
  )
}

export default Fieldset