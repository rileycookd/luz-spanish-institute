import React, { useState, useEffect } from 'react'

import { Form, Step, InputField } from '../components/form'
import { IoPerson as NameIcon, IoMail as MailIcon } from 'react-icons/io5'
import { BsLockFill as PasswordIcon } from 'react-icons/bs'
import { useIdentityContext } from 'react-netlify-identity-gotrue'

import { cn } from '../lib/helpers'

import * as styles from './register-user.module.css'
import CTALink from './CTALink'



function RegisterUser(props) {

  const [currentStep, setCurrentStep] = useState(1);
  const [formStatus, setFormStatus] = useState('default')

  const [nameValue, setNameValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [emailValue, setEmailValue] = useState("")

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
        {formStatus === "default" && (
          <>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Sign up</h1>
            <p className={styles.info}>
              Already have an account? 
              <span><CTALink kind="inline" route="/login">Login</CTALink></span>
            </p>
          </div>
          <Form 
            onSubmit={handleSignup}
            name="signup-form"
            method="POST"
            action="/success/"
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            formStatus={formStatus}
            setFormStatus={setFormStatus}
            cta="Sign up"
          >
            <Step title="User info">
              <InputField
                defaultValue={nameValue}
                label="Full name:"
                isRequired={true}
                errorMessage="Please enter your full name"
                name="name"
                placeholder="Your full name" 
                type="text"
                onChange={(e) => setNameValue(e.target.value)}
              >
                <NameIcon />
              </InputField>
              <InputField
                defaultValue={emailValue}
                label="Email:"
                name="email"
                isRequired={true}
                placeholder="you@email.com" 
                type="text"
                errorMessage="Please enter a valid email"
                pattern={/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/}
                onChange={(e) => setEmailValue(e.target.value)}
              >
                <MailIcon />
              </InputField>
              <InputField
                defaultValue={passwordValue}
                label="Password:"
                name="password"
                isRequired={true}
                errorMessage="Please enter a secure password"
                placeholder="Enter a password" 
                type="password"
                onChange={(e) => setPasswordValue(e.target.value)}
              ><PasswordIcon /></InputField>
            </Step>
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

export default RegisterUser