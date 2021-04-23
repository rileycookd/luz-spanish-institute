import React, {useState} from 'react'
import * as styles from './form-slide.module.css'
import { Form, Step, InputField, SelectField } from '../components/form'

// import { RegistrationReducer, DefaultRegistration } from '../reducers/registration-reducer'

import { IoPerson as NameIcon, IoMail as MailIcon, IoLocationSharp as LocationIcon } from 'react-icons/io5'

function FormSlide (props) {


  const [nameValue, setNameValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [locationValue, setLocationValue] = useState("")

  const [classTypeValue, setClassTypeValue] = useState("")
  const [spanishLevelValue, setSpanishLevelValue] = useState("")

  const [durationValue, setDurationValue] = useState("")
  const [frequencyValue, setFrequencyValue] = useState("")
  const [quantityValue, setQuantityValue] = useState("")

  

  const handlePost = (formData) => {
    console.log(formData)
  }
 

  return (
    <div className={styles.root}>
      <div className={styles.sidePanel} style={
        {
          backgroundImage: "url(https://source.unsplash.com/random/1920x1080)"
        }
      }>
        <div className={styles.sidePanelOverlay}></div>
      </div>
      <Form 
        onSubmit={handlePost}
        name="registration-form"
        method="POST"
        action="/success/"
      >
        <Step title="Student info">
          <InputField
            value={nameValue}
            label="Full name:"
            name="full-name"
            placeholder="Your full name" 
            type="text"
            onChange={(e) => setNameValue(e.target.value)}
          >
            <NameIcon />
          </InputField>
          <InputField
            value={emailValue}
            label="Email:"
            name="email"
            placeholder="you@email.com" 
            type="text"
            onChange={(e) => setEmailValue(e.target.value)}
          >
            <MailIcon />
          </InputField>
          <InputField
            value={locationValue}
            label="Where do you live?"
            name="location"
            placeholder="Enter a location" 
            type="text"
            onChange={(e) => setLocationValue(e.target.value)}
          ><LocationIcon /></InputField>
        </Step>
        <Step title="Class selection">
          <SelectField
            value={classTypeValue}
            label="Class type:"
            name="class-type"
            options={["Private lessons", "Group lessons", "Conversation club"]}
            onChange={(e) => setClassTypeValue(e.target.value)}
          />
          <SelectField
            value={spanishLevelValue}
            label="Spanish level:"
            name="spanish-level"
            options={["Not sure", "Beginner", "Intermediate", "Advanced"]}
            onChange={(e) => setSpanishLevelValue(e.target.value)}
          />
        </Step>
        <Step title="Scheduling">
          <SelectField
            value={durationValue}
            label="Class duration:"
            name="class-duration"
            options={["1 hour", "1.5 hours", "2 hours"]}
            onChange={(e) => setDurationValue(e.target.value)}
          />
          <SelectField
            value={quantityValue}
            label="Quantity:"
            name="class-quantity"
            options={["1 class", "8 classes", "30 classes"]}
            onChange={(e) => setQuantityValue(e.target.value)}
          />
          {quantityValue !== "1 class" && quantityValue !== "" && (
            <SelectField
              value={frequencyValue}
              label="Frequency:"
              name="class-frequency"
              options={["1x a week", "2x a week", "3x a week"]}
              onChange={(e) => setFrequencyValue(e.target.value)}
            />
          )}
        </Step> 
      </Form>
    </div>
  )
}

export default FormSlide
