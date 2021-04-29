import React, {useState, useEffect} from 'react'
import * as styles from './form-slide.module.css'
import { Form, Step, InputField, SelectField } from '../components/form'

// import { RegistrationReducer, DefaultRegistration } from '../reducers/registration-reducer'

import { IoPerson as NameIcon, IoMail as MailIcon, IoLocationSharp as LocationIcon } from 'react-icons/io5'

function FormSlide ({ classTypes }) {

  const classTypeTitles = classTypes.map(c => c.title)

  // FORM FIELD STATE
  // Step 1
  const [nameValue, setNameValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [locationValue, setLocationValue] = useState("")
  // Step 2
  const [classTypeValue, setClassTypeValue] = useState(classTypeTitles[0])
  const [spanishLevelValue, setSpanishLevelValue] = useState("Not sure")
  const [classSizeValue, setClassSizeValue] = useState("1")
  // Step 3
  const [durationValue, setDurationValue] = useState(`${classTypes[0].pricing[0].duration / 60} hour${classTypes[0].pricing[0].duration / 60 > 1 ? 's' : ''}`)
  const [frequencyValue, setFrequencyValue] = useState("1x a week")
  const [quantityValue, setQuantityValue] = useState("1 class")
  
  // COMPONENT STATE
  const [currentClassType, setCurrentClassType] = useState(classTypes[0])
  const [estimatedPrice, setEstimatedPrice] = useState('—')


  let classTypeDurations = currentClassType.pricing.map(p => (
    `${p.duration / 60} hour${p.duration / 60 > 1 ? 's' : ''}`
  ))

  let classTypePackages = ['1 class']
  currentClassType.packages.map(p => (
    classTypePackages.push(`${p.quantity} class${p.quantity > 1 ? 'es' : ''}`)
  ))

  let { pricing, packages, min, max, maxDiscount, sizeDiscount } = currentClassType
  let currentSizeDiscount = 0;
  if (sizeDiscount && classSizeValue > min) {
    currentSizeDiscount = sizeDiscount * (classSizeValue - min);
    if(currentSizeDiscount > maxDiscount) {
      currentSizeDiscount = maxDiscount / 100;
    } else {
      currentSizeDiscount = currentSizeDiscount / 100;
    }
  }

  const calculateBasePrice = (basePrice) => {
    let classPrice = basePrice;
    if(sizeDiscount && classSizeValue > min) {
      classPrice = classPrice - (classPrice * (currentSizeDiscount))
    }
    classPrice = classPrice * classSizeValue;
    return classPrice;
  }

  const calculatePackagePrice = (basePrice, quantity, discount) => {
    console.log(basePrice, quantity, discount)
    let classPrice = basePrice * quantity;
    if(discount) {
      classPrice = classPrice - (classPrice * (discount / 100));
    }
    return classPrice
  }

  useEffect(() => {
    setClassSizeValue(classTypes.filter(c => c.title === classTypeValue)[0].min || 1)
    setDurationValue(`${classTypes.filter(c => c.title === classTypeValue)[0].pricing[0].duration / 60} hour${classTypes[0].pricing[0].duration / 60 > 1 ? 's' : ''}`|| '1 hour')
    setQuantityValue('1 class')
    setCurrentClassType(classTypes.filter(c => c.title === classTypeValue)[0])
  }, [classTypeValue]);

  useEffect(() => {
    let newCalculatedPrice = calculateBasePrice(
      currentClassType.pricing[classTypeDurations.findIndex(d => d === durationValue)].price
    )
    if(quantityValue !== "1 class") {
      let currentPackageIndex = classTypePackages.findIndex(d => d === quantityValue) - 1
      let currentPackage = currentClassType.packages[currentPackageIndex]
      newCalculatedPrice = calculatePackagePrice(newCalculatedPrice, currentPackage.quantity, currentPackage.discount)
    }
    setEstimatedPrice(newCalculatedPrice)
  }, [currentClassType, quantityValue, durationValue, classSizeValue])

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
        // onSubmit={handlePost}
        name="registration-form"
        method="POST"
        action="/success/"
        estimatedCost={(Math.round((estimatedPrice + Number.EPSILON) * 100) / 100).toFixed(2)}
      >
        <Step title="Class selection">
          <SelectField
            value={classTypeValue}
            label="Class type:"
            name="classType"
            options={classTypeTitles}
            onChange={(e) => setClassTypeValue(e.target.value)}
          />
          <SelectField
            value={spanishLevelValue}
            label="Spanish level:"
            name="level"
            options={["Not sure", "Beginner", "Intermediate", "Advanced"]}
            onChange={(e) => setSpanishLevelValue(e.target.value)}
          />
          {(!currentClassType.max || currentClassType.max > 1) && (
            <InputField
              value={classSizeValue}
              label="How many students?"
              name="classSize"
              type="number"
              min={currentClassType.min || 1}
              max={currentClassType.max || null}
              callback={setClassSizeValue}
              onChange={(e) => setClassSizeValue(e.target.value)}
            />
          )}
        </Step>
        <Step title="Scheduling">
          <SelectField
            value={durationValue}
            label="Class duration:"
            name="duration"
            options={classTypeDurations}
            onChange={(e) => setDurationValue(e.target.value)}
          />
          <SelectField
            value={quantityValue}
            label="Quantity:"
            name="quantity"
            options={classTypePackages}
            onChange={(e) => setQuantityValue(e.target.value)}
          />
          {quantityValue !== "1 class" && quantityValue !== "" && (
            <SelectField
              value={frequencyValue}
              label="Frequency:"
              name="frequency"
              options={["1x a week", "2x a week", "3x a week"]}
              onChange={(e) => setFrequencyValue(e.target.value)}
            />
          )}
        </Step> 
        <Step title="Student info">
          <InputField
            value={nameValue}
            label="Full name:"
            name="name"
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
      </Form>
    </div>
  )
}

export default FormSlide
