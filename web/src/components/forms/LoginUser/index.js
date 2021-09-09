import React, { useState, useEffect } from 'react'

import { Form, Step, InputField } from '../Form'
import { IoMail as MailIcon } from 'react-icons/io5'
import { BsLockFill as PasswordIcon } from 'react-icons/bs'
import { useIdentityContext } from 'react-netlify-identity-gotrue'

import { cn } from '../../../lib/helpers'
import { button, buttonSmall } from '../../CTALink'

import * as styles from '../RegisterUser/style.module.css'
import CTALink from '../../CTALink'

import { navigate } from 'gatsby'




function LoginUser(props) {

  const [currentStep, setCurrentStep] = useState(1);
  const [formStatus, setFormStatus] = useState('default')
  const [errorMessage, setErrorMessage] = useState('')

  const [passwordValue, setPasswordValue] = useState("")
  const [emailValue, setEmailValue] = useState("")

  const identity = useIdentityContext()

  const handleLogin = async () => {
    debugger
    await identity.login({
      password: passwordValue,
      email: emailValue,
    })
      .then(() => navigate('/app'))
      .catch(e => setErrorMessage(e.message))
  }

  useEffect(() => {
    if(identity.user) {
      navigate('/app')
    }
  }, [])


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
        {formStatus === "default" && (
          <Form 
            onSubmit={() => handleLogin()}
            name="login-form"
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            formStatus={formStatus}
            setFormStatus={setFormStatus}
            cta="Login"
          >
            <Step title="Login info">
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
                placeholder="Enter your password" 
                type="password"
                onChange={(e) => setPasswordValue(e.target.value)}
              ><PasswordIcon /></InputField>
            </Step>
          </Form>
        )}
        {errorMessage  && (
          <p className={styles.info}>{errorMessage}</p>   
        )}
      </div>
    </div>
  )
}

export default LoginUser