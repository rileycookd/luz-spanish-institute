import React, { useState, useEffect } from 'react'
import * as styles from './form.module.css'
import { button, buttonSmall, buttonLarge, buttonSecondary } from './CTALink.module.css'
import { cn } from '../lib/helpers'
import { useForm } from "react-hook-form"
import CTALink from './CTALink'
import { IoRemove as SubtractIcon, IoAdd as AddIcon } from 'react-icons/io5'

// NOTES: Should unregister: false if you want to use disabled inputs

export function Form ({ onInputChange, estimatedCost, pricePerStudent, onSubmit, name, method, action, children }) {

  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(1);
  const [formStatus, setFormStatus] = useState('default')
  const [renderHoneyPot, setRenderHoneyPot] = useState(false)

  const { register, handleSubmit, setValue, getValues, reset, formState: { errors, isValid }, } = useForm({ mode: 'all' })

  const stepCustomProps = { 
    currentStep: currentStep,
    register: register
  }

  useEffect(() => {
    let numSteps = React.Children.toArray(children).length + 1;
    setTotalSteps(numSteps)
    setRenderHoneyPot(true)
  }, [totalSteps]);

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
    currentStep >= totalSteps - 1
    ? setCurrentStep(totalSteps)
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
    if(currentStep < totalSteps){
      const nextButtonText = currentStep === (totalSteps - 1) ? 'Confirm' : 'Next step'
      return (
        <button disabled={!isValid} className={cn(button, buttonLarge)} onClick={(e) => _next(e)}>{nextButtonText}</button>
      )
    }
    return null;
  }

  const submitButton = () => {
    if(currentStep === (totalSteps)){
      return (
        <button type="submit" className={cn(button, buttonLarge)}>Enroll</button>
      )
    }
    // ...else render nothing
    return null;
  }

  let stepCounter = 0;
  const childrenWithProps = React.Children.map(children, (child) => {

    if (React.isValidElement(child)) {
      stepCounter++
      return React.cloneElement(child, { 
        currentStep: currentStep,
        step: stepCounter,
        totalSteps: totalSteps,
        register: register,
        errors: errors,
        setValue: setValue,
        getValues: getValues
      });
    }
  
    return child;
  });

  let stepNames = []
  children.map((c) => {
    c.props && c.props.title && (
      stepNames.push(c.props.title)
    )
  })
    
  return(
    <>
      {formStatus === 'default' && (
        <form 
          className={styles.root} 
          onSubmit={handleSubmit(handlePost)}
          name={name}
          method={method}
          action={action}
          data-netlify="true"
          netlify-honeypot="got-ya"
        >
          <h1 className={styles.formTitle}>Start your Spanish journey today</h1>

          <StepNavigation steps={stepNames} currentStep={currentStep} totalSteps={totalSteps} />

          <input type="hidden" name="form-name" value={name} />
          <input
            type="hidden"
            name="formId"
            value={name}
            ref={register}
          />

          {childrenWithProps}

          {renderHoneyPot && currentStep === totalSteps && <input tabIndex="-1" name="got-ya" ref={register} />}

          <div className={styles.formFooter}>
            <div className={styles.formFooterInfo}>
              <div className={styles.costIndicator}>
                <h4 className={styles.costIndicatorTitle}>Estimated cost: </h4>
                <p className={styles.costIndicatorCost}>
                  {`$${estimatedCost} USD`}{pricePerStudent !== 0 && <span>{` ($${pricePerStudent} per student)`}</span>}
                </p>
              </div>
              <p className={styles.costIndicatorSubtitle}>We will contact you to confirm enrollment before payment</p>
            </div>
            <div className={styles.formButtons}>
              {previousButton()}
              {nextButton()}
              {submitButton()}
            </div>
          </div>
        </form>
      )}
      {formStatus === 'success' && (
        <div className={styles.root} style={{justifyItems: 'center', textAlign: 'center'}}>
        <div className={styles.formSection}>
          <h1 className={styles.formTitle}>Thanks for enrolling!</h1>
          <p>Check your email for a confirmation of your registration. We’ll contact you soon to confirm your enrollment and schedule your classes. </p>
        </div>    
        <CTALink kind="small button" route="/" title="Go home" />
      </div>
      )}
      {formStatus === 'error' && (
        <div className={styles.root} style={{justifyItems: 'center', textAlign: 'center'}}>
          <div className={styles.formSection}>
            <h1 className={styles.formTitle}>Hm... something went wrong</h1>
            <p>We’re sorry! We couldn’t complete your registration at this time. You can try again or contact us directly.</p>
          </div>    
          <button className={cn(button, buttonSmall)} onClick={() => window.location.reload()}>Try again</button> 
        </div>
      )}
    </>
  )
}

export const InputField = ({ register, readOnly, disabled, pattern, setValue, defaultValue, getValues, errors, errorMessage, min, max, label, name, placeholder, type, onChange, children, callback }) => {

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

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputGroup}>
        {type === "number" && !disabled && !readOnly && <SubtractIcon onClick={(e) => decrement (e)} className={(currentValue == min || currentValue == '') ? cn(styles.inputNumberControl, styles.disabled) : styles.inputNumberControl} />}
        <input
          id={name}
          type={type}
          name={name}
          min={min}
          max={max}
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={defaultValueCheck}
          className={styles.input}
          placeholder={placeholder}
          onChange={onChange}
          ref={register({
            pattern: {
              value: pattern,
              message: errorMessageValue
            },
            required: {
              value: true,
              pattern: pattern,
              message: errorMessageValue,
            }
          })}
          style={(children || type === "number") ? {paddingLeft: '3.5rem'} : {}}
        />
        {label && <label className={styles.inputLabel} htmlFor={name}>{label}</label>}
        {children}
        {type === "number" && !disabled && !readOnly && <AddIcon onClick={(e) => increment(e)} className={currentValue == max ? cn(styles.inputNumberControl, styles.disabled) : styles.inputNumberControl} />}
      </div>
      <p className={styles.inputError}>{errors && errors[name] && errors[name].message} </p>
    </div>
  )
};

export const SelectField = ({ register, disabled, value, label, name, options, onChange }) => (
  <div className={styles.inputWrapper}>
    <div className={styles.inputGroup}>
      <select className={styles.select} disabled={disabled} id={name} name={name} value={value} onChange={onChange} ref={register}>
        <option disabled hidden defaultValue>Select your level</option>
        {options && options.map((o, i) => (
          <option key={`${name}-${i}`} value={o}>{o}</option>
        ))}
      </select>
      {label && <label className={styles.inputLabel} htmlFor={name}>{label}</label>}
    </div>
    <p className={styles.inputError}> </p>
  </div>        
)

export const Step = ({title, errors, getValues, setValue, children, step, currentStep, register, totalSteps}) => {

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { 
        register: register,
        errors: errors,
        setValue: setValue,
        getValues: getValues
      });
    }
  
    return child;
  }); 

  return (
    <>
    {currentStep >= step && (
      <div className={styles.formSection} style={currentStep !== step && currentStep !== totalSteps ? {display: 'none'} : {}}>
        <h2 className={styles.formSectionTitle}>{title}</h2>
        <div className={styles.formRow}>
          {childrenWithProps}
        </div>
      </div>
    )}
    </>
  )
}

export const StepNavigation = ({steps, currentStep, totalSteps}) => {
  steps.push('Confirm')
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

