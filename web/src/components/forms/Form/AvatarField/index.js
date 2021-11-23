import React, { useState, useRef } from 'react'
import * as styles from './style.module.css'
import blankProfilePic from '../../../../images/blank-profile.svg'
import { IoMdCloudUpload as UploadIcon } from 'react-icons/io'
import { ImageCropper } from '../../Form'

 

 const AvatarField = ({ register, disabled, accept, currentStep, step, pattern, isRequired, errors, errorMessage, label, name, placeholder, children }) => { 

  const errorMessageValue = errorMessage ? errorMessage : "Please enter a valid value"
  const uploadInputRef = React.useRef();
  const croppedInputRef = React.useRef();

  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleCancel = () => {
    uploadInputRef.current.value = null
    setSelectedImage(null)
  }

  console.log("CROPPED: ", croppedImage)
  console.log("SELECTED: ", selectedImage)

  

  return (
    <div className={styles.root}>
      <img className={styles.image} src={croppedImage ? URL.createObjectURL(croppedImage) : blankProfilePic} />
      {selectedImage && (
        <ImageCropper onSubmit={setCroppedImage} onCancel={() => handleCancel()} image={selectedImage} />
      )}
      {!disabled && (
        <>
          <input
            ref={uploadInputRef}
            id={name}
            type='file'
            onChange={(event) => {
              setSelectedImage(event.target.files[0]);
            }}
          />
          <input 
            ref={croppedInputRef}
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
          />
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor={name}>
              <UploadIcon />{label}
            </label>
            <p>At least 200 x 200 PNG or JPG file</p>
          </div>     
          <p className={styles.inputError}>{errors && errors[name] && errors[name].message}</p>
        </>
      )}

    </div>
  )
};

export default AvatarField