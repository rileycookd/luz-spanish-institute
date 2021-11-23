import React, { forwardRef } from 'react'
import * as styles from './style.module.css'
import { cn } from '../../../../lib/helpers'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './styles.override.css'
import { Controller } from 'react-hook-form'

import { IoEye, IoEyeOff } from 'react-icons/io5'

const PhoneField = ({children, register, isDirty, disabled, control, error, id, label, name}) => {

  const validStyles = () => {
    if(!disabled) {
      if(isDirty) {
        return cn(styles.inputGroup, styles.valid)
      } else {
        return styles.inputGroup
      }
    } else {
      return cn(styles.disabled, styles.inputGroup)
    }
  }

  return (
    <div className={validStyles()}>
      <Controller
          name={name}
          control={control}
          // rules={{
          //   validate: (value) => isValidPhoneNumber(value)
          // }}
          render={({ field: { onChange, value } }) => (
            <PhoneInput
              value={value}
              enableSearch={true}
              onChange={onChange}
              country='us'
              disabled={disabled}
              id={id}
              className={
                error && error.message 
                ? cn(styles.error, styles.input) 
                : cn(styles.input, styles.valid)
              }
              inputClass={styles.input}
              buttonClass={styles.button}
              dropdownClass={styles.dropdown}
              containerClass={styles.container}
              searchClass={styles.search}
            />
          )}
        />
      {label && <label className={styles.inputLabel} htmlFor={id}>{label}</label>}
      <p className={styles.inputError}>{error && error.message}</p>
      {children}
    </div>
  )
};

export default PhoneField