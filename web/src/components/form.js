import React, { useState, useEffect } from 'react'
import * as styles from './form.module.css'
import { button, buttonLarge, buttonSecondary } from './CTALink.module.css'
import { cn } from '../lib/helpers'
import { useForm } from "react-hook-form"


export function Form ({ onSubmit, name, method, action, children }) {

  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(1);

  const { register, handleSubmit, errors, reset } = useForm()

  const stepCustomProps = { 
    currentStep: currentStep,
    register: register
  }

  useEffect(() => {
    console.log(totalSteps)
    let numSteps = React.Children.toArray(children).length;
    setTotalSteps(numSteps)
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
    fetch(`/`, {
      method: method,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": name, ...formData }),
    })
      .then((response) => {
        // navigate("/success/")
        reset()
        console.log(response)
      })
      .catch((error) => {
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
      return (
        <button className={cn(button, buttonLarge)} onClick={(e) => _next(e)}>Next step</button>
      )
    }
    return null;
  }

  const submitButton = () => {
    if(currentStep === totalSteps){
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
        register: register
      });
    }
  
    return child;
  });
    
  return(
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

      <input type="hidden" name="form-name" value={name} />
      <input
        type="hidden"
        name="formId"
        value={name}
        ref={register}
      />

      {childrenWithProps}

      <input tabIndex="-1" name="got-ya" ref={register} />
      
      <div className={styles.formFooter}>
        <div className={styles.formFooterInfo}>
          <div className={styles.costIndicator}>
            <h4 className={styles.costIndicatorTitle}>Estimated cost: </h4>
            <p className={styles.costIndicatorCost}>&#8212;</p>
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
  )
}

export const InputField = ({ register, value, label, name, placeholder, type, onChange, children }) => (
  <div className={styles.inputGroup}>
    {label && <label className={styles.inputLabel} htmlFor={name}>{label}</label>}
    <input
      id={name}
      type={type}
      value={value}
      name={name}
      className={styles.input}
      placeholder={placeholder}
      onChange={onChange}
      ref={register}
    />
    {children}
  </div>
);

export const SelectField = ({ register, value, label, name, options, onChange }) => (
  <div className={styles.inputGroup}>
    {label && <label className={styles.inputLabel} htmlFor={name}>{label}</label>}
    <select className={styles.select} id={name} name={name} value={value} onChange={onChange} ref={register}>
      <option disabled hidden defaultValue>Select your level</option>
      {options && options.map((o, i) => (
        <option key={`${name}-${i}`} value={o}>{o}</option>
      ))}
    </select>
  </div>
)

export const Step = ({title, children, step, currentStep, register}) => {

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { 
        register: register
      });
    }
  
    return child;
  }); 

  return (
    <div className={styles.formSection} style={currentStep !== step ? {display: 'none'} : {}}>
      <h2 className={styles.formSectionTitle}>{title}</h2>
      <div className={styles.formRow}>
        {childrenWithProps}
      </div>
    </div>
  )
}

