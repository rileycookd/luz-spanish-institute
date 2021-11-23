import React from 'react'
import * as styles from './style.module.css'

const LinkButton = ({children, ...props}) => {
  return (
    <button className={styles.root} {...props}>{children}</button>
  )
}

export default LinkButton