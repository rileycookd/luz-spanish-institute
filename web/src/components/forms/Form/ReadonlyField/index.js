import React from 'react'
import * as styles from './style.module.css'
import { cn } from '../../../../lib/helpers'

const ReadonlyField = ({children, label, ...props}) => {

  return (
    <div className={styles.inputGroup}>
      <input
        {...props} 
        className={cn(styles.input, styles.valid)}
        style={children ? {paddingLeft: '3.5rem'} : {}}
      />
      {label && <label className={styles.inputLabel}>{label}</label>}
      {children}
    </div>
  )
};

export default ReadonlyField