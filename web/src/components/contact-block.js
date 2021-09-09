import React, { useState } from 'react'
import * as styles from './contact-block.module.css'
import { ImPhone as PhoneIcon, ImFacebook as FacebookIcon, ImLinkedin2 as LinkedinIcon } from 'react-icons/im'
import { IoLogoInstagram as InstagramIcon } from 'react-icons/io5'
import { Form, Step, InputField, TextareaField } from './forms/Form'
import { IoPerson as NameIcon, IoMail as MailIcon, IoLocationSharp as LocationIcon } from 'react-icons/io5'

function ContactBlock (props) {

  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(1);
  const [formStatus, setFormStatus] = useState('default')

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <h1 className={styles.title}>Contact us</h1>
        <div className={styles.contact}>
          <div className={styles.contactItem}>
            <PhoneIcon className={styles.contactIcon} />
            <p className={styles.contactInfo}>+56 9 5555 5555</p>
          </div>
          <div className={styles.contactItem}>
            <MailIcon className={styles.contactIcon} />
            <p className={styles.contactInfo}>hola@luzdamelio.com</p>
          </div>
        </div>
        <div className={styles.socialLinks}>
          <InstagramIcon />
          <FacebookIcon />
          <LinkedinIcon />
        </div>
      </div>
      <div className={styles.formWrapper}>
      <Form 
        name="contact-form"
        method="POST"
        action="/success/"
        formStatus={formStatus}
        setFormStatus={setFormStatus}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        totalSteps={totalSteps}
        cta="Send message"
      >
        <Step title="How can we help you?" style="dark">
          <InputField
            label="Full name:"
            required={true}
            errorMessage="Please enter your full name"
            name="name"
            placeholder="Your full name" 
            type="text"
          >
            <NameIcon />
          </InputField>
          <InputField
            label="Email:"
            name="email"
            placeholder="you@email.com" 
            type="text"
            errorMessage="Please enter a valid email"
            pattern={/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/}
          >
            <MailIcon />
          </InputField>
          <TextareaField
            label="Message:"
            name="message"
            errorMessage="Please include a message"
            placeholder="Write your message here" 
            type="text"
          ></TextareaField>
        </Step>
      </Form>
      </div>
    </div>
  )
}

export default ContactBlock