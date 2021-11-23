import React from 'react'
import * as styles from './style.module.css'

const SubmitButton = ({children, ...props}) => {
  return (
    <button type="submit" className={styles.root} {...props}>{children}</button>
  )
}

export default SubmitButton