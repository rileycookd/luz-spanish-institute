import React, { useState, useEffect } from 'react'
import * as styles from './style.module.css'

import { 
  Form, 
  Step, 
  InputField, 
  FileField, 
  SelectField, 
  TimezoneField, 
  PrimaryButton, 
  PhoneField,
  EditButton,
  AvatarField
} from '../Form'

import { 
  IoPerson as NameIcon, 
  IoPersonCircle as PicIcon, 
  IoBriefcase as CompanyIcon, 
  IoMail as MailIcon 
} from 'react-icons/io5'
import { BsLockFill as PasswordIcon } from 'react-icons/bs'
import { ImPhone as PhoneIcon } from 'react-icons/im'
import { useIdentityContext } from 'react-netlify-identity-gotrue'
import { MdLocationCity as CityIcon } from 'react-icons/md'
import { BiWorld as CountryIcon } from 'react-icons/bi'
import { RiMapPinTimeLine as TimezoneIcon } from 'react-icons/ri'

import { cn } from '../../../lib/helpers'
import CTALink from '../../CTALink'

import { navigate } from 'gatsby'

import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

function EditUser(props) {

  const schema = yup.object().shape({
    name: yup.string().required("Please enter your full name"),
    email: yup.string().email("Please enter a valid email").required("Please enter your email"),
    city: yup.string(),
    country: yup.string(),
    timezone: yup.string().required("Choose your timezone"),
  })

  const { watch, register, control, handleSubmit, formState: { errors, isDirty } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: props.name,
      email: props.email,
      city: props.city,
      country: props.country,
      timezone: props.timezone || ''
    },
    resolver: yupResolver(schema),

  })

  const { dirtyFields } = useFormState({
    control
  });


  const [formStatus, setFormStatus] = useState('default')
  const [editMode, setEditMode] = useState(false) 


  console.log(props)


  const identity = useIdentityContext()

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
    event.preventDefault()
    console.log(formData)
    debugger
    fetch(`/`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": 'edit-user-form', "_id": props._id, ...formData }),
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

  return (
    <div className={styles.root}>
      <div className={styles.formContainer}>
        {formStatus === "default" && (
          <>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{editMode ? 'Edit' : 'My'} profile</h1>
            <EditButton active={editMode} onClick={(e) => {
              e.preventDefault()
              setEditMode(!editMode)
              }} 
            />
          </div>
          <Form
            onSubmit={handleSubmit(handlePost)}
            name="edit-user-form"
            method="POST"
            action="/success/"
            // formStatus={formStatus}
            // setFormStatus={setFormStatus}
          >

            <AvatarField
              label="Upload photo"
              name="photo"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setPicValue(e.target.value)}
              currentImage={props.image}
              disabled={!editMode}
            />
            <InputField
              label="Full name:"
              id="name"
              name="name"
              placeholder="Your full name"
              type="text"
              error={errors?.name}
              register={register}
              disabled={!editMode}
            >
              <NameIcon />
            </InputField>
            <InputField
              label="Email:"
              id="email"
              name="email"
              placeholder="you@email.com"
              type="text"
              error={errors?.email}
              register={register}
              disabled={!editMode}
            >
              <MailIcon />
            </InputField>
            <PhoneField
              label="Phone:"
              id="phone"
              name="phone"
              error={errors?.phone}
              register={register}
              control={control}
              disabled={!editMode}
              isDirty={props.phone || dirtyFields.phone}
            >
              <PhoneIcon />
            </PhoneField>
            <InputField
              label="City:"
              id="city"
              name="city"
              placeholder="What city are you in?"
              type="text"
              error={errors?.city}
              register={register}
              disabled={!editMode}
            >
              <CityIcon />
            </InputField>
            <InputField
              label="Country:"
              id="country"
              name="country"
              placeholder="What country are you in?"
              type="text"
              error={errors?.country}
              register={register}
              disabled={!editMode}
            >
              <CountryIcon />
            </InputField>
            <TimezoneField 
              // placeholder="Search..." 
              label="Select your timezone:" 
              name="timezone"
              id="timezone"
              control={control}
              error={errors?.timezone}
              disabled={!editMode}
              isDirty={props.timezone || dirtyFields.timezone}
            >
              <TimezoneIcon />
            </TimezoneField> 
            <InputField
              label="Company:"
              id="company"
              name="company"
              placeholder="Where do you work?"
              type="text"
              error={errors?.company}
              register={register}
              disabled={!editMode}
            >
              <CompanyIcon />
            </InputField>
            {editMode && <PrimaryButton type="Submit">Save changes</PrimaryButton>}


<pre>{JSON.stringify(watch(), null, 2)}</pre>
{/* //       <div>{JSON.stringify(errors)}</div> */}
{/* //       <div>{isValid.toString()}</div> */}
          </Form>
          </>
        )}
        {formStatus === 'success' && (
          <div className={styles.titleContainer} style={{justifyItems: 'center', textAlign: 'center'}}>
            <h1 className={styles.formTitle}>Check your email</h1>
            <p className={styles.info}>We just sent you a confirmation link. Click the link in your email to verify your account.</p>
          </div>
        )}
        {formStatus === 'error' && (
          <div className={styles.titleContainer} style={{justifyItems: 'center', textAlign: 'center'}}>
            <h1 className={styles.formTitle}>Hm... something went wrong</h1>
            <p className={styles.info}>We’re sorry! We couldn’t create your account. Please try again or try contacting us directly if you need help.</p>   
            <button className={cn(button, buttonSmall)} onClick={() => window.location.reload()}>Try again</button> 
          </div>
        )}
      </div>
    </div>
  )
}

export default EditUser