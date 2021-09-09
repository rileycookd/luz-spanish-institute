import React, { useState } from 'react'
import * as styles from './style.module.css'
import blankProfilePic from '../../../../images/blank-profile.svg'
import { IoMdCloudUpload as UploadIcon } from 'react-icons/io'
import { ImageCropper } from '../../Form'

 

 const AvatarField = ({ register, disabled, accept, currentStep, step, pattern, isRequired, errors, errorMessage, label, name, placeholder, children }) => { 

  const errorMessageValue = errorMessage ? errorMessage : "Please enter a valid value"

  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  console.log("CROPPED: ", croppedImage)
  console.log("SELECTED: ", selectedImage)

  return (
    <div className={styles.root}>
      <img className={styles.image} src={croppedImage ? croppedImage : blankProfilePic} />
      {selectedImage && (
        <ImageCropper onSubmit={setCroppedImage} onCancel={() => setSelectedImage(null)} image={selectedImage} />
      )}
      {!disabled && (
        <>
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
        </>
      )}

    </div>
  )
};

export default AvatarField