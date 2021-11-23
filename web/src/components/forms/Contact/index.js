import React, { useState, useEffect } from 'react'

import { Form, InputField, SubmitButton } from '../Form'
import { IoMail as MailIcon } from 'react-icons/io5'
import { BsLockFill as PasswordIcon } from 'react-icons/bs'
import { useIdentityContext } from 'react-netlify-identity-gotrue'

import * as styles from '../RegisterUser/style.module.css'
import CTALink from '../../CTALink'

import { navigate } from 'gatsby'

import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'




function ContactUs(props) {

  const schema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Please enter your email"),
    name: yup.string().required("Please enter a name"),
    message: yup.string().required("Please enter a message"),
  })

  const { watch, register, getValues, control, handleSubmit, formState: { errors, isDirty } } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const { isValid } = useFormState({
    control
  });


 // Transforms the form data from the React Hook Form output to a format Netlify can read
  const encode = (data) => {
    return qs.stringify(data)
  } 


   // Handles the post process to Netlify so we can access their serverless functions
   const handlePost = (formData, event) => {
    event.preventDefault()

    fetch(`/`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": 'add-registration-form', ...formData }),
    })
      .then((response) => {
        reset()
        if(response.status === 200 || response.status === 201 || response.status === 203) {
          // navigate("../success")
        } else {
          // navigate("../error")
        }
        console.log(response)
      })
      .catch((error) => {
        // navigate("../error")
        console.log(error)
      })
  }

  return (
		<Form
			onSubmit={handleSubmit(handlePost)}
			name="login-form"
			method="POST"
			action="/success/"
			register={register}
		>
			<InputField
				label="Name:"
				name="name"
				placeholder="Enter your name" 
				id="name"
				type="text"
				error={errors?.name}
				register={register}
			><PasswordIcon /></InputField>
			<InputField
				label="Email:"
				name="email"
				placeholder="you@email.com" 
				id="email"
				type="text"
				error={errors?.email}
				register={register}
			>
				<MailIcon />
			</InputField>
			
			<SubmitButton disabled={!isValid} type="Submit">Contact us</SubmitButton>
		</Form>
  )
}

export default ContactUs