import React, { useState, useEffect } from 'react'
import * as styles from './style.module.css'
import { cn, arrayFindWithAttr } from '../../../lib/helpers'
import FileField from './FileField'
import InputField from './InputField'
import TextareaField from './TextareaField'
import SelectField from './SelectField'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'
import PhoneField from './PhoneField'
import TimezoneField from './TimezoneField'
import EditButton from './EditButton'
import AvatarField from './AvatarField'
import ImageCropper from './ImageCropper'
import FormContainer from './FormContainer'
import FormTitle from './FormTitle'
import LinkButton from './LinkButton'
import SubmitButton from './SubmitButton'
import CheckboxField from './CheckboxField'
import Fieldset from './Fieldset'
import RadioField from './RadioField'
import ReadonlyField from './ReadonlyField'
import ErrorMessage from './ErrorMessage'
import ProgressMeter from './ProgressMeter'
import FormInfo from './FormInfo'

export { 
  FileField, 
  InputField, 
  TextareaField, 
  SelectField, 
  PrimaryButton, 
  SecondaryButton,
  PhoneField,
  SubmitButton,
  TimezoneField,
  EditButton,
  AvatarField,
  LinkButton,
  FormContainer,
  FormTitle,
  CheckboxField,
  ReadonlyField,
  ImageCropper,
  RadioField,
  Fieldset,
  ErrorMessage,
  ProgressMeter,
  FormInfo,
}
 
export const Form = ({children, register, name, ...props}) => {
  return (
    <form
      className={styles.root} 
      noValidate
      name={name}
      {...props}
    >
      {children}

    </form>
  )
}

export const NetlifyForm = ({children, register, name, ...props}) => {
  return (
    <form
      className={styles.root} 
      noValidate
      data-netlify="true"
      netlify-honeypot="got-ya" 
      name={name}
      {...props}
    >
      <input type="hidden" name="form-name" value={name} />
      <input
        type="hidden"
        name="formId"
        value={name}
        {...register('formId')}
      />


      <input tabIndex="-1" name="got-ya" {...register('got-ya')} />
      {children}

    </form>
  )
}