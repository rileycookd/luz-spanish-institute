import React, { useState } from 'react'
import * as styles from './contact-block.module.css'
import { ImPhone as PhoneIcon, ImFacebook as FacebookIcon, ImLinkedin2 as LinkedinIcon } from 'react-icons/im'
import { IoLogoInstagram as InstagramIcon } from 'react-icons/io5'
import { Form, FormContainer, FormTitle, InputField, TextareaField } from './forms/Form'
import ContactUs from './forms/Contact'
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
        <ContactUs />
      </div>
    </div>
  )
}

export default ContactBlock