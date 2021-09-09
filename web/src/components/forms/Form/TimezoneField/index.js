import React, { useState } from 'react'
import * as styles from './style.module.css'
import { Controller } from 'react-hook-form'
import TimezoneSelect from 'react-timezone-select'
import { cn } from '../../../../lib/helpers'


const TimezoneField = ({children, control, disabled, error, id, label, name, isDirty}) => {

  const customStyles = {
    valueContainer: (provided, state) => ({
      ...provided,
      border: 'none',
      outline: 'none',
      padding: '2.5rem 1.5rem 2rem 1.5rem',
    }),
    container: (provided, state) => ({
      ...provided,
      width: '100%',
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: disabled ? 'transparent' : 'white',
      border: disabled ? 'none' : '1px solid #c4c4c4'
    }),
    placeholder: (provided, state) => ({
      ...provided,
      top: 'calc(50% + .25rem)',
      paddingLeft: '1.8rem',
      fontSize: '14px',
      fontFamily: 'Montserrat',
      fontWeight: '500',
      color: '#c4c4c4'
    }),
    input: (provided, state) => ({
      ...provided,
      margin: 0,
      paddingBottom: 0,
      paddingTop: '0',
      top: 'calc(50% + 2px)',
      paddingLeft: '2rem',
      fontSize: '14px',
      fontWeight: '700',
      color: 'c4c4c4'
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      padding: '0 1rem 0 1.5rem',
      color: disabled ? 'transparent' : '#c4c4c4'
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      background: 'none'
    }),
    singleValue: (provided, state) => ({
      ...provided,
      top: 'calc(50% + 2px)',
      left: '3.5rem',
      marginLeft: '0',
      fontFamily: 'Montserrat',
      fontWeight: 700,
      fontSize: '14px'
    })
  }

  return (
    <div className={isDirty ? cn(styles.inputGroup, styles.valid) : styles.inputGroup}>
      <Controller
          name={name}
          control={control}
          // rules={{
          //   validate: (value) => isValidPhoneNumber(value)
          // }}
          render={({ field: { onChange, value } }) => (
            <TimezoneSelect 
              // innerRef={ref}
              isDisabled={disabled} 
              id={id}
              value={value}
              onChange={(val) => onChange(val.value)}
              labelStyle='altName'
              styles={customStyles}
            /> 
          )}
        />
      {label && <label className={styles.inputLabel} htmlFor={id}>{label}</label>}
      <p className={styles.inputError}>{error && error.message}</p>
      {children}
    </div>
  )
};

export default TimezoneField