import React, { useState, useEffect } from 'react'
import * as styles from './style.module.css'
import { button, buttonSmall, buttonLarge, buttonSecondary } from '../../CTALink.module.css'
import { cn, arrayFindWithAttr } from '../../../lib/helpers'
import { useForm, Controller } from "react-hook-form"
import { IoRemove as SubtractIcon, IoAdd as AddIcon } from 'react-icons/io5'
import Select from 'react-select'
import FileField from './FileField'
import InputField from './InputField'
import TextareaField from './TextareaField'
import SelectField from './SelectField'
import PrimaryButton from './PrimaryButton'
import PhoneField from './PhoneField'
import TimezoneField from './TimezoneField'
import EditButton from './EditButton'
import AvatarField from './AvatarField'
import ImageCropper from './ImageCropper'

export { 
  FileField, 
  InputField, 
  TextareaField, 
  SelectField, 
  PrimaryButton, 
  PhoneField,
  TimezoneField,
  EditButton,
  AvatarField,
  ImageCropper,
}

import { IoEye, IoEyeOff } from 'react-icons/io5'
 
export const Form = ({children, register, name, ...props}) => {
  return (
    <form
      className={styles.root} 
      noValidate
      name={name}
      data-netlify="true"
      netlify-honeypot="got-ya" 
      {...props}
    >
      <input type="hidden" name="form-name" value={name} />
      <input
        type="hidden"
        name="formId"
        value={name}
        ref={register}
      />


      <input tabIndex="-1" name="got-ya" ref={register} />
      {children}

    </form>
  )
}

// export function Form (props) {

//   // Get props
//   const { 
//     currentStep, 
//     confirmStep, 
//     cta, 
//     onSubmit, 
//     formStatus, 
//     setFormStatus, 
//     setCurrentStep, 
//     totalSteps, 
//     name, 
//     method, 
//     action, 
//     children 
//   } = props

//   // Get React Hook Form props
//   const { 
//     watch, 
//     control, 
//     register, 
//     handleSubmit, 
//     setError, 
//     clearErrors, 
//     setValue, 
//     unregister, 
//     getValues, 
//     reset, 
//     formState: { errors, isValid }
//    } = useForm({ mode: 'all' })

//   const [steps, setSteps] = useState([])

//   // Transforms the form data from the React Hook Form output to a format Netlify can read
//   const encode = (data) => {
//     return Object.keys(data)
//       .map(
//         (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
//       )
//       .join("&")
//   }

//    // Handles the post process to Netlify so we can access their serverless functions
//    const handlePost = (formData, event) => {
//     console.log(formData)
//     onSubmit()
//     fetch(`/`, {
//       method: method,
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: encode({ "form-name": name, ...formData }),
//     })
//       .then((response) => {
//         reset()
//         if(response.status === 200 || response.status === 201 || response.status === 203) {
//           setFormStatus("success")
//         } else {
//           setFormStatus("error")
//         }
//         console.log(response)
//       })
//       .catch((error) => {
//         setFormStatus("error")
//         console.log(error)
//       })
//     event.preventDefault()
//   }
 
//   const _next = (e) => {
//     e.preventDefault()
//     currentStep >= steps.length - 1
//     ? setCurrentStep(steps.length)
//     : setCurrentStep(currentStep + 1)
//   }

//   const _prev = (e) => {
//     e.preventDefault()

//     currentStep <= 1
//     ? setCurrentStep(1)
//     : setCurrentStep(currentStep - 1)
//   }

//   const previousButton = () => {
//     if(currentStep !== 1){
//       return (
//         <button className={cn(button, buttonLarge, buttonSecondary)} onClick={(e) => _prev(e)}>Previous</button> 
//       )
//     }
//     return null;
//   }
  
//   const nextButton = () => {
//     if(currentStep < steps.length){
//       const nextButtonText = currentStep === (steps.length - 1) ? 'Confirm' : 'Next step'
//       return (
//         <button disabled={!isValid} className={cn(button, buttonLarge)} onClick={(e) => _next(e)}>{nextButtonText}</button>
//       )
//     }
//     return null;
//   }

//   const submitButton = () => {
//     if(currentStep === (steps.length)){
//       return (
//         <button disabled={!isValid} type="submit" className={cn(button, buttonLarge)}>{cta}</button>
//       )
//     }
//     // ...else render nothing
//     return null;
//   }

//   useEffect(() => {
//     let stepCounter = 0;
//     const childrenWithProps = React.Children.map(children, (child) => {

//       if (React.isValidElement(child)) {
//         stepCounter++
//         return React.cloneElement(child, { 
//           currentStep: currentStep,
//           step: stepCounter,
//           totalSteps: steps.length,
//           register: register,
//           errors: errors,
//           setValue: setValue,
//           getValues: getValues,
//           unregister: unregister,
//           control: control,
//           Controller: Controller,
//           setError: setError,
//           clearErrors: clearErrors
//         });
//       }
    
//       return child;
//     });
//     setSteps(childrenWithProps)
//   }, [children])  
    
//   return(
//     <form 
//       className={styles.root} 
//       onSubmit={handleSubmit(handlePost)}
//       name={name}
//       method={method}
//       data-netlify="true"
//       netlify-honeypot="got-ya"
//     >

//       <input type="hidden" name="form-name" value={name} />
//       <input
//         type="hidden"
//         name="formId"
//         value={name}
//         ref={register}
//       />

//       {steps}

//       <input tabIndex="-1" name="got-ya" ref={register} />

//       <div className={styles.formButtons}>
//         {previousButton()}
//         {nextButton()}
//         {submitButton()}
//       </div>
//       <pre>{JSON.stringify(watch(), null, 2)}</pre>
//       <div>{JSON.stringify(errors)}</div>
//       <div>{isValid.toString()}</div>
//     </form>
//   )
// }

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

