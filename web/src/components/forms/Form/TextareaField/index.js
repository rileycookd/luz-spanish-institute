import React from 'react'
import * as styles from './style.module.css'

const TextareaField = ({ register, control, Controller, currentStep, unregister, step, readOnly, disabled, pattern, defaultValue, errors, errorMessage, label, name, placeholder, type, onChange }) => {

  if(currentStep < step) unregister(name)

  const errorMessageValue = errorMessage ? errorMessage : "Please enter a valid value"

  return (
    <div className={styles.inputGroup}>
      <textarea
        id={name}
        type={type}
        name={name}
        readOnly={readOnly}
        disabled={disabled}
        defaultValue={defaultValue}
        className={errors && errors[name] ? cn(styles.error, styles.input) : styles.input}
        placeholder={placeholder}
        onChange={onChange}
        {...(currentStep >= step && { ref: register({
          pattern: {
            value: pattern,
            message: errorMessageValue
          },
          required: {
            value: true,
            pattern: pattern,
            message: errorMessageValue,
          }
        })} )}
      />
      {label && <label className={styles.inputLabel} htmlFor={name}>{label}</label>}
      <p className={styles.inputError}>{errors && errors[name] && errors[name].message}</p>
    </div>
  )
};

export default TextareaField