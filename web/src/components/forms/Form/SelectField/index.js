import React, { useEffect } from 'react'
import * as styles from './style.module.css'
import Select from 'react-select'
import TimezoneSelect from 'react-timezone-select'



const SelectField = (props) => {

  const { 
    control, 
    isRequired, 
    clearErrors, 
    error, 
    errors, 
    setError, 
    isSearchable, 
    unregister, 
    Controller, 
    currentStep, 
    step, 
    onChange,
    defaultValue, 
    placeholder, 
    disabled, 
    label, 
    name, 
    options,
    value, 
    handleChange, 
    type,
  } = props

  useEffect(() => {
    if(error && error.message) {
      setError(name, error)
    } else {
      clearErrors(name)
    }
  }, [error])

  const customStyles = {
    valueContainer: (provided, state) => ({
      ...provided,
      border: 'none',
      outline: 'none',
      padding: '2.5rem 1.5rem 2rem 1.5rem',
    }),
    container: (provided, state) => ({
      ...provided,
      width: '100%'
    }),
    placeholder: (provided, state) => ({
      ...provided,
      top: 'calc(50% + .5rem)'
    }),
    input: (provided, state) => ({
      ...provided,
      margin: 0,
      paddingBottom: 0,
      paddingTop: '.5rem'
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      padding: '0 1rem 0 1.5rem'
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      backgroundColor: '#e5e5e5'
    }),
    singleValue: (provided, state) => ({
      ...provided,
      top: 'calc(50% + .5rem)',
      fontFamily: 'Montserrat',
      fontWeight: 700,
      fontSize: '14px'
    })
  }

  let firstValue = ''
  if(defaultValue) {
    defaultValue.value 
      ? firstValue = options.find(c => c.value === defaultValue.value).value 
      : firstValue = options[arrayFindWithAttr(options, 'value', defaultValue)]
  }

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputGroup}>
        <Controller
          control={control}
          name={name}
          rules={{ required: isRequired }}
          shouldUnregister={true}
          defaultValue={firstValue}
          render={({ field, ref }) => (
            <> 
              {type !== 'timezone' ? (
                <Select 
                  innerRef={ref}
                  disabled={disabled} 
                  isSearchable={isSearchable ? true : false}
                  defaultValue={firstValue}
                  value={options.find(c => c.value === field.value)}
                  onChange={(val) => {
                    field.onChange(val.value)
                    onChange(onChange)
                  }} 
                  placeholder={placeholder ? placeholder : isSearchable ? 'search...' : 'select...'} 
                  options={options} 
                  styles={customStyles}
                /> 
              ) : (
                <TimezoneSelect 
                  innerRef={ref}
                  disabled={disabled} 
                  value={value}
                  onChange={(val) => {
                    console.log(field)
                    field.onChange(val)
                    onChange(onChange)
                  }}  
                  labelStyle='altName'
                  placeholder={placeholder ? placeholder : isSearchable ? 'search...' : 'select...'} 
                  styles={customStyles}
                /> 
              )}
              
            </>
          )}
        />
        
        {label && <label className={styles.inputLabel} htmlFor={name}>{label}</label>}
        <p className={styles.inputError}>{errors && errors[name] && errors[name].message}</p>
      </div>
    </div>   
  )
}

export default SelectField