import React, { useState, useEffect } from 'react'

import { Form, InputField, SubmitButton } from '../Form'
import { IoMail as MailIcon } from 'react-icons/io5'
import { BsLockFill as PasswordIcon } from 'react-icons/bs'
import { useIdentityContext } from 'react-netlify-identity-gotrue'

import { cn } from '../../../lib/helpers'
import { button, buttonSmall } from '../../CTALink'

import * as styles from '../RegisterUser/style.module.css'
import CTALink from '../../CTALink'

import { navigate } from 'gatsby'

import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'




function LoginUser(props) {

  const schema = yup.object().shape({
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



  const handleLogin = async () => {
    await identity.login({
      password: getValues('password'),
      email: getValues('email'),
    })
      .then(() => navigate('/app'))
      .catch(e => setErrorMessage(e.message))
  }

  // useEffect(() => {
  //   if(identity.user) {
  //     navigate('/app')
  //   }
  // }, [])


  return (
    <div className={styles.root}>
      <div className={styles.formContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.info}>
          Don't already have an account?
          <span><CTALink kind="inline" route="/register">Sign up</CTALink></span>
        </p>
      </div>
          <Form
            onSubmit={handleSubmit(handleLogin)}
            name="login-form"
            method="POST"
            action="/success/"
            register={register}
          >
            <InputField
              label="Email:"
              name="email"
              placeholder="you@email.com" 
              id="email"
              type="text"
              error={errors?.name}
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
              error={errors?.name}
              register={register}
            ><PasswordIcon /></InputField>
            <SubmitButton disabled={!isValid} type="Submit">Login</SubmitButton>
          </Form>
      </div>
    </div>
  )
}

export default LoginUser