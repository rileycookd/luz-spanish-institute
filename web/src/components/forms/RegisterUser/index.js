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




function RegisterUser(props) {

  const schema = yup.object().shape({
    name: yup.string().required("Please enter your full name"),
    email: yup.string().email("Please enter a valid email").required("Please enter your email"),
    password: yup.string().required("Please enter a password"),
  })

  const { watch, register, getValues, control, handleSubmit, formState: { errors, isDirty } } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const { isValid } = useFormState({
    control
  });

  const identity = useIdentityContext()


  const handleSignup = async () => {
    await identity.signup({
      password: passwordValue,
      email: emailValue,
      user_metadata: {
        full_name: nameValue
      }
    })
      // .then(() => setFormMessage('Please check your email to confirm your account!'))
      // .catch(e => setFormError(e.message))  
  }

  return (
    <div className={styles.root}>
      <div className={styles.formContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Sign up</h1>
        <p className={styles.info}>
          Already have an account?
          <span><CTALink kind="inline" route="/login">Sign up</CTALink></span>
        </p>
      </div>
          <Form
            onSubmit={handleSubmit(handleSignup)}
            name="login-form"
            method="POST"
            action="/success/"
            register={register}
          >
            <InputField
              label="Full name:"
              name="name"
              placeholder="Enter your name" 
              id="email"
              type="text"
              error={errors?.name}
              register={register}
            >
              <MailIcon />
            </InputField>
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
            <InputField
              label="Password:"
              name="password"
              placeholder="Enter your password" 
              id="password"
              type="password"
              error={errors?.password}
              register={register}
            ><PasswordIcon /></InputField>
            <SubmitButton disabled={!isValid} type="Submit">Login</SubmitButton>
          </Form>
      </div>
    </div>
  )
}

export default RegisterUser