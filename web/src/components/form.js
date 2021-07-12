import React, { useState, useEffect } from 'react'
import * as styles from './form.module.css'
import { button, buttonSmall, buttonLarge, buttonSecondary } from './CTALink.module.css'
import { cn, arrayFindWithAttr } from '../lib/helpers'
import { useForm, Controller } from "react-hook-form"
import CTALink from './CTALink'
import { IoRemove as SubtractIcon, IoAdd as AddIcon } from 'react-icons/io5'
import Select from 'react-select'

import { IoEye, IoEyeOff } from 'react-icons/io5'

export function Form (props) {

  // Get props
  const { 
    currentStep, 
    confirmStep, 
    cta, 
    onSubmit, 
    formStatus, 
    setFormStatus, 
    setCurrentStep, 
    totalSteps, 
    name, 
    method, 
    action, 
    children 
  } = props

  // Get React Hook Form props
  const { 
    watch, 
    control, 
    register, 
    handleSubmit, 
    setError, 
    clearErrors, 
    setValue, 
    unregister, 
    getValues, 
    reset, 
    formState: { errors, isValid }
   } = useForm({ mode: 'all' })

  const [steps, setSteps] = useState([])

  // Transforms the form data from the React Hook Form output to a format Netlify can read
  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&")
  }

   // Handles the post process to Netlify so we can access their serverless functions
   const handlePost = (formData, event) => {
    console.log(formData)
    fetch(`/`, {
      method: method,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": name, ...formData }),
    })
      .then((response) => {
        reset()
        if(response.status === 200 || response.status === 201 || response.status === 203) {
          setFormStatus("success")
          onSubmit()
        } else {
          setFormStatus("error")
        }
        console.log(response)
      })
      .catch((error) => {
        setFormStatus("error")
        console.log(error)
      })
    event.preventDefault()
  }
 
  const _next = (e) => {
    e.preventDefault()
    currentStep >= steps.length - 1
    ? setCurrentStep(steps.length)
    : setCurrentStep(currentStep + 1)
  }

  const _prev = (e) => {
    e.preventDefault()

    currentStep <= 1
    ? setCurrentStep(1)
    : setCurrentStep(currentStep - 1)
  }

  const previousButton = () => {
    if(currentStep !== 1){
      return (
        <button className={cn(button, buttonLarge, buttonSecondary)} onClick={(e) => _prev(e)}>Previous</button> 
      )
    }
    return null;
  }
  
  const nextButton = () => {
    if(currentStep < steps.length){
      const nextButtonText = currentStep === (steps.length - 1) ? 'Confirm' : 'Next step'
      return (
        <button disabled={!isValid} className={cn(button, buttonLarge)} onClick={(e) => _next(e)}>{nextButtonText}</button>
      )
    }
    return null;
  }

  const submitButton = () => {
    if(currentStep === (steps.length)){
      return (
        <button disabled={!isValid} type="submit" className={cn(button, buttonLarge)}>{cta}</button>
      )
    }
    // ...else render nothing
    return null;
  }

  useEffect(() => {
    let stepCounter = 0;
    const childrenWithProps = React.Children.map(children, (child) => {

      if (React.isValidElement(child)) {
        stepCounter++
        return React.cloneElement(child, { 
          currentStep: currentStep,
          step: stepCounter,
          totalSteps: steps.length,
          register: register,
          errors: errors,
          setValue: setValue,
          getValues: getValues,
          unregister: unregister,
          control: control,
          Controller: Controller,
          setError: setError,
          clearErrors: clearErrors
        });
      }
    
      return child;
    });
    setSteps(childrenWithProps)
  }, [children])  
    
  return(
    <form 
      className={styles.root} 
      onSubmit={handleSubmit(handlePost)}
      name={name}
      method={method}
      data-netlify="true"
      netlify-honeypot="got-ya"
    >

      <input type="hidden" name="form-name" value={name} />
      <input
        type="hidden"
        name="formId"
        value={name}
        ref={register}
      />

      {steps}

      <input tabIndex="-1" name="got-ya" ref={register} />

      <div className={styles.formButtons}>
        {previousButton()}
        {nextButton()}
        {submitButton()}
      </div>
      {/* <pre>{JSON.stringify(watch(), null, 2)}</pre>
      <div>{JSON.stringify(errors)}</div>
      <div>{isValid.toString()}</div> */}
    </form>
  )
}

export const InputField = ({ register, control, Controller, currentStep, unregister, step, readOnly, disabled, pattern, setValue, defaultValue, getValues, isRequired, errors, errorMessage, min, max, label, name, placeholder, type, onChange, children, callback }) => {

  const [currentType, setCurrentType] = useState(type)

  const currentValue = getValues(name)
  if(type === "number" && min && Number(currentValue) < min) { 
    setValue(name, min)
    callback(min)
  }

  if(type === "number" && max && Number(currentValue) > max) {
    setValue(name, max)
    callback(max)
  } 
  const errorMessageValue = errorMessage ? errorMessage : "Please enter a valid value"
  const defaultValueCheck = defaultValue < min ? min : defaultValue

  const increment = e => {
    e.stopPropagation()
    e.preventDefault()
    if(!max || currentValue < max) {
      setValue(name, (Number(currentValue) + 1).toString())
      callback(Number(currentValue) + 1)
    }
  }

  const decrement = e => {
    e.stopPropagation()
    e.preventDefault()
    if(!min || currentValue > min) {
      callback(Number(currentValue) - 1)
      setValue(name, (Number(currentValue) - 1).toString())
    }
  }

  const togglePassword = () => {
    if(currentType === "password") {
      setCurrentType("text")
    } else {
      setCurrentType("password")
    }
  }

  return (
    <div className={styles.inputGroup}>
      {type === "number" && !disabled && !readOnly && <SubtractIcon onClick={(e) => decrement (e)} className={(currentValue == min || currentValue == '') ? cn(styles.inputNumberControl, styles.disabled) : styles.inputNumberControl} />}
      <input
        id={name}
        type={currentType}
        name={name}
        min={min}
        max={max}
        readOnly={readOnly}
        disabled={disabled}
        defaultValue={defaultValueCheck}
        className={errors && errors[name] ? cn(styles.error, styles.input) : styles.input}
        placeholder={placeholder}
        onChange={onChange}
        {...(currentStep >= step && { ref: register({
          pattern: {
            value: pattern,
            message: errorMessageValue
          },
          required: {
            value: isRequired,
            pattern: pattern,
            message: errorMessageValue,
          }
        })} )}
        style={(children || type === "number") ? {paddingLeft: '3.5rem'} : {}}
      />
      {type === "password" && (
        <>
          {currentType === "password"
          ? (
            <span onClick={() => togglePassword()} className={styles.passwordToggle}><IoEye /> Show</span>
          ) : (
            <span onClick={() => togglePassword()} className={styles.passwordToggle}><IoEyeOff /> Hide</span>
          )}
        </>
      )}
      {label && <label className={styles.inputLabel} htmlFor={name}>{label}</label>}
      <p className={styles.inputError}>{errors && errors[name] && errors[name].message}</p>
      {children}
      {type === "number" && !disabled && !readOnly && <AddIcon onClick={(e) => increment(e)} className={currentValue == max ? cn(styles.inputNumberControl, styles.disabled) : styles.inputNumberControl} />}
    </div>
  )
};

export const TextareaField = ({ register, control, Controller, currentStep, unregister, step, readOnly, disabled, pattern, defaultValue, errors, errorMessage, label, name, placeholder, type, onChange }) => {

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

export const SelectField = ({ control, isRequired, clearErrors, error, errors, setError, isSearchable, unregister, Controller, currentStep, step, defaultValue, placeholder, disabled, label, name, options, handleChange }) => {

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
      padding: '0 1.5rem'
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
          render={({ onChange, value, name, ref }) => ( 
            <Select 
              innerRef={ref}
              disabled={disabled} 
              isSearchable={isSearchable ? true : false}
              defaultValue={firstValue}
              value={options.find(c => c.value === value)}
              onChange={(val) => {
                onChange(val.value)
                if(handleChange) handleChange(val.value)
              }} 
              placeholder={placeholder ? placeholder : isSearchable ? 'search...' : 'select...'} 
              options={options} 
              styles={customStyles}
            /> 
          )}
        />
        
        {label && <label className={styles.inputLabel} htmlFor={name}>{label}</label>}
        <p className={styles.inputError}>{errors && errors[name] && errors[name].message}</p>
      </div>
    </div>   
  )
}

export const Step = ({title, errors, control, clearErrors, setError, style, Controller, unregister, getValues, setValue, children, step, currentStep, register, totalSteps}) => {

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { 
        register: register,
        errors: errors,
        setValue: setValue,
        getValues: getValues,
        currentStep: currentStep,
        step: step,
        unregister: unregister,
        control: control,
        Controller: Controller,
        setError: setError,
        clearErrors: clearErrors
      });
    }
  
    return child;
  }); 

  return (
    <div className={styles.formSection} style={currentStep !== step ? {display: 'none'} : {}}>
      {totalSteps > 1 && (
        <h2 
          className={style === "dark" 
            ? cn(styles.formSectionTitle, styles.dark) 
            : styles.formSectionTitle}
        >{title}</h2>
      )}
      <div className={styles.formSectionInputs}>
        {currentStep >= step ? childrenWithProps : ''}
      </div>
    </div>
  )
}

export const StepNavigation = ({steps, currentStep, totalSteps}) => {


  if(!steps.includes('Confirm')) steps.push('Confirm')

  return(
    <div className={styles.formNavigation}>
      {steps && steps.map((s, i) => (
        <div key={`${s}-${i}`} className={currentStep === (i+1) ? cn(styles.formNavigationStep, styles.active) : styles.formNavigationStep}>
          <div className={styles.formNavigationStepIcon}>
            <p className={styles.formNavigationStepNumber}>{i + 1}</p>
          </div>
          <p className={styles.formNavigationStepTitle}>{s}</p>
        </div>
      ))}
    </div>
  )
}

