import React, { useState } from 'react'
import * as styles from './style.module.css'
import blankProfilePic from '../../../../images/blank-profile.svg'
import { IoMdCloudUpload as UploadIcon } from 'react-icons/io'

 

 const FileField = ({ register, control, accept, Controller, currentStep, currentImage, email, unregister, step, readOnly, disabled, pattern, setValue, defaultValue, getValues, isRequired, errors, errorMessage, min, max, label, name, placeholder, type, onChange, children, callback }) => {

  const errorMessageValue = errorMessage ? errorMessage : "Please enter a valid value"

  const [selectedImage, setSelectedImage] = useState(null);


  return (
    <div className={styles.root}>
      <img className={styles.image} src={selectedImage ? URL.createObjectURL(selectedImage) : blankProfilePic} />
      <input
        id={name}
        type='file'
        name={name}
        accept={accept}
        disabled={disabled}
        className={errors && errors[name] ? cn(styles.error, styles.input) : styles.input}
        placeholder={placeholder}
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }}
        // onChange={onChange}
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
        style={children ? {paddingLeft: '3.5rem'} : {}}
      />
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor={name}>
          <UploadIcon />{label}
        </label>
        <p>At least 200 x 200 PNG or JPG file</p>
      </div>     
      <p className={styles.inputError}>{errors && errors[name] && errors[name].message}</p>
    </div>
  )
};

export default FileField