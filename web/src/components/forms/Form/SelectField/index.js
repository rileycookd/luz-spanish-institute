import React, { useEffect } from 'react'
import * as styles from './style.module.css'
import Select from 'react-select'
import { Controller } from 'react-hook-form'
import { cn } from '../../../../lib/helpers'

const SelectField = (props) => {

  const { 
    isSearchable, 
    placeholder, 
    options,
    children, 
    control, 
    disabled, 
    error, 
    id, 
    label,
    name, 
    handleChange,
    isDirty
  } = props

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
      border: disabled ? '1px solid #E5E5E5' : '1px solid #c4c4c4',
      boxShadow: error ? '0 0 0 1px #D44D5C' : 'none'
    }),
    placeholder: (provided, state) => ({
      ...provided,
      top: 'calc(50% + .25rem)',
      paddingLeft: '1.8rem',
      fontSize: '14px',
      fontFamily: 'Montserrat',
      fontWeight: '500',
      color: disabled ? '#E5E5E5' : '#c4c4c4'
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
      color: disabled ? '#ADBCC2' : '#082735'
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
      fontSize: '14px',
      color: '#082735'
    })
  }

  const validStyles = () => {
    if(!disabled) {
      if(isDirty) {
        return cn(styles.inputGroup, styles.valid)
      } else {
        return styles.inputGroup
      }
    } else {
      return cn(styles.inputGroup, styles.disabled)
    }
  }


  return (
    <div className={validStyles()}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <Select 
            inputRef={ref}
            isDisabled={disabled} 
            id={id}
            value={options.find(c => c.value === value)}
            onChange={(val) => onChange(val.value)}
            labelStyle='altName'
            styles={customStyles}
            options={options}
            isSearchable={isSearchable ? true : false}
            placeholder={placeholder ? placeholder : isSearchable ? 'search...' : 'select...'} 
          /> 
        )}
      />
      
      {label && <label className={styles.inputLabel} htmlFor={name}>{label}</label>}
      <p className={styles.inputError}>{error && error && error.message}</p>
      {children}
    </div>   
  )
}

export default SelectField