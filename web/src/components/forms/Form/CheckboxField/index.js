import React, { forwardRef } from 'react'
import * as styles from './style.module.css'
import { cn } from '../../../../lib/helpers'

const CheckboxField = ({children, register, id, isDirty, name, error, label, ...props}) => {

  let inputStyles = styles.input
  if(error) inputStyles = cn(styles.input, styles.error)
  if(isDirty) inputStyles = cn(styles.input, styles.isDirty)

  return (
    <>
      <input
        type="checkbox"
        id={id}
        {...props}       
        {...register(name)}
        className={inputStyles}
        style={children ? {paddingLeft: '3.5rem'} : {}}
      />
      <label className={styles.label} htmlFor={id}>
        
        <div className={styles.checkbox}></div>
        {label ? label : ''}
        {children}
      </label>
    </>
  )
};

export default CheckboxField
