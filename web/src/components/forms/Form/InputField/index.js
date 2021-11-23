import React, { forwardRef } from 'react'
import * as styles from './style.module.css'
import { cn } from '../../../../lib/helpers'

import { IoEye, IoEyeOff } from 'react-icons/io5'

const InputField = ({children, register, error, id, label, ...props}) => {

  return (
    <div className={styles.inputGroup}>
      <input
        {...props}
        {...register(props.name)}
        className={
          error && error.message 
          ? cn(styles.error, styles.input) 
          : cn(styles.input, styles.valid)
        }
        style={children ? {paddingLeft: '3.5rem'} : {}}
      />
      {label && <label className={styles.inputLabel} htmlFor={id}>{label}</label>}
      <p className={styles.inputError}>{error && error.message}</p>
      {children}
    </div>
  )
};

export default InputField

// export const InputField = (props) => {

//   const { 
//     register, 
//     control, 
//     Controller, 
//     currentStep, 
//     unregister, 
//     step, 
//     readOnly, 
//     disabled, 
//     pattern, 
//     setValue, 
//     defaultValue, 
//     getValues, 
//     isRequired, 
//     errors, 
//     errorMessage, 
//     min, 
//     max, 
//     label, 
//     name, 
//     placeholder, 
//     type, 
//     onChange, 
//     children, 
//     callback 
//   } = props

//   const [currentType, setCurrentType] = useState(type)

//   const currentValue = getValues(name)
//   if(type === "number" && min && Number(currentValue) < min) { 
//     setValue(name, min)
//     callback(min)
//   }

//   if(type === "number" && max && Number(currentValue) > max) {
//     setValue(name, max)
//     callback(max)
//   } 
//   const errorMessageValue = errorMessage ? errorMessage : "Please enter a valid value"
//   const defaultValueCheck = defaultValue < min ? min : defaultValue

//   const increment = e => {
//     e.stopPropagation()
//     e.preventDefault()
//     if(!max || currentValue < max) {
//       setValue(name, (Number(currentValue) + 1).toString())
//       callback(Number(currentValue) + 1)
//     }
//   }

//   const decrement = e => {
//     e.stopPropagation()
//     e.preventDefault()
//     if(!min || currentValue > min) {
//       callback(Number(currentValue) - 1)
//       setValue(name, (Number(currentValue) - 1).toString())
//     }
//   }

//   const togglePassword = () => {
//     if(currentType === "password") {
//       setCurrentType("text")
//     } else {
//       setCurrentType("password")
//     }
//   }

//   return (
//     <div className={styles.inputGroup}>
//       {type === "number" && !disabled && !readOnly && <SubtractIcon onClick={(e) => decrement (e)} className={(currentValue == min || currentValue == '') ? cn(styles.inputNumberControl, styles.disabled) : styles.inputNumberControl} />}
//       <input
//         id={name}
//         type={currentType}
//         name={name}
//         min={min}
//         max={max}
//         readOnly={readOnly}
//         disabled={disabled}
//         defaultValue={defaultValueCheck}
//         className={errors && errors[name] ? cn(styles.error, styles.input) : styles.input}
//         placeholder={placeholder}
//         onChange={onChange}
//         {...(currentStep >= step && { ref: register({
//           pattern: {
//             value: pattern,
//             message: errorMessageValue
//           },
//           required: {
//             value: isRequired,
//             pattern: pattern,
//             message: errorMessageValue,
//           }
//         })} )}
//         style={(children || type === "number") ? {paddingLeft: '3.5rem'} : {}}
//       />
//       {type === "password" && (
//         <>
//           {currentType === "password"
//           ? (
//             <span onClick={() => togglePassword()} className={styles.passwordToggle}><IoEye /> Show</span>
//           ) : (
//             <span onClick={() => togglePassword()} className={styles.passwordToggle}><IoEyeOff /> Hide</span>
//           )}
//         </>
//       )}
//       {label && <label className={styles.inputLabel} htmlFor={name}>{label}</label>}
//       <p className={styles.inputError}>{errors && errors[name] && errors[name].message}</p>
//       {children}
//       {type === "number" && !disabled && !readOnly && <AddIcon onClick={(e) => increment(e)} className={currentValue == max ? cn(styles.inputNumberControl, styles.disabled) : styles.inputNumberControl} />}
//     </div>
//   )
// });

// export default InputField