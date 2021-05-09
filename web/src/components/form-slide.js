import React, {useState, useEffect} from 'react'
import * as styles from './form-slide.module.css'
import { cn } from '../lib/helpers'
import { button, buttonSmall, buttonLarge, buttonSecondary } from './CTALink.module.css'
import CTALink from './CTALink'
import { Link } from 'gatsby'
import { altOption } from './cta-form.module.css'
import { Form, Step, InputField, SelectField, StepNavigation } from '../components/form'

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
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [pricePerStudent, setPricePerStudent] = useState(0)
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(4);
  const [formStatus, setFormStatus] = useState('default')


  let classTypeDurations = currentClassType.pricing.map(p => (
    `${p.duration / 60} hour${p.duration / 60 > 1 ? 's' : ''}`
  ))

  let classTypePackages = ['1 class']
  currentClassType.packages.map(p => (
    classTypePackages.push(`${p.quantity} class${p.quantity > 1 ? 'es' : ''}`)
  ))

  const formatTotalPrice = () => {
    return estimatedPrice ? (Math.round((estimatedPrice + Number.EPSILON) * 100) / 100).toFixed(2): '—'
  }

  const formatPricePerStudent = () => {
    return Number(classSizeValue) > 1 ? (Math.round((pricePerStudent + Number.EPSILON) * 100) / 100).toFixed(2) : 0
  }

  const calculateSizeDiscount = () => {
    let { min, maxDiscount, sizeDiscount } = currentClassType
    let currentSizeDiscount = 0;
    if (sizeDiscount && classSizeValue > min) {
      currentSizeDiscount = sizeDiscount * (classSizeValue - min);
      if(currentSizeDiscount > maxDiscount) {
        currentSizeDiscount = maxDiscount / 100;
      } else {
        currentSizeDiscount = currentSizeDiscount / 100;
      }
    }
    return currentSizeDiscount
  }

  const renderConfirmStep = () => {
    return (
      <>
        <h2 className={styles.confirmStepTitle}>Please confirm your registration details</h2>
        <div className={styles.confirmContainer}>
          <div className={styles.confirmInput}>
            <h5 className={styles.confirmInputTitle}>Class:</h5>
            <p className={styles.confirmInputValue}>{classTypeValue}</p>
          </div>
          <div className={styles.confirmInput}>
            <h5 className={styles.confirmInputTitle}>Level:</h5>
            <p className={styles.confirmInputValue}>{spanishLevelValue}</p>
          </div>
          <div className={styles.confirmInput}>
            <h5 className={styles.confirmInputTitle}>Size:</h5>
            <p className={styles.confirmInputValue}>{classSizeValue} student{classSizeValue > 1 ? 's' : ''}</p>
          </div>
          <div className={styles.confirmInput}>
            <h5 className={styles.confirmInputTitle}>Duration:</h5>
            <p className={styles.confirmInputValue}>{durationValue}</p>
          </div>
          <div className={styles.confirmInput}>
            <h5 className={styles.confirmInputTitle}>Quantity:</h5>
            <p className={styles.confirmInputValue}>{quantityValue}</p>
          </div>
          <div className={styles.confirmInput}>
            <h5 className={styles.confirmInputTitle}>Frequency:</h5>
            <p className={styles.confirmInputValue}>{frequencyValue}</p>
          </div>
          <div className={styles.confirmInput}>
            <h5 className={styles.confirmInputTitle}>Name:</h5>
            <p className={styles.confirmInputValue}>{nameValue}</p>
          </div>
          <div className={styles.confirmInput}>
            <h5 className={styles.confirmInputTitle}>Email:</h5>
            <p className={styles.confirmInputValue}>{emailValue}</p>
          </div>
          <div className={styles.confirmInput}>
            <h5 className={styles.confirmInputTitle}>Location:</h5>
            <p className={styles.confirmInputValue}>{locationValue}</p>
          </div>
        </div>
      </>
    )
  }

  const calculateBasePrice = (basePrice) => {
    let { min } = currentClassType
    let classPrice = basePrice;
    let currentSizeDiscount = calculateSizeDiscount()
    if(currentSizeDiscount && classSizeValue > min) {
      classPrice = classPrice - (classPrice * (currentSizeDiscount))
    }
    return classPrice;
  }

  const calculatePackagePrice = (basePrice, quantity, discount) => {
    let classPrice = basePrice * quantity;
    if(discount) {
      classPrice = classPrice - (classPrice * (discount / 100));
    }
    return classPrice
  }

  useEffect(() => {
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
    setEstimatedPrice(newCalculatedPrice * classSizeValue)
    setPricePerStudent(newCalculatedPrice)
  }, [currentClassType, quantityValue, durationValue, classSizeValue])

  return (
    <div className={styles.root}>
      <div className={styles.formNavigation}>
        {formStatus === 'default' && (
          <StepNavigation steps={['Class selection', 'Scheduling', 'Student info']} currentStep={currentStep} totalSteps={totalSteps} />
        )}
        {formStatus === 'error' && (
          <h2 className={styles.formNavigationStatus}>Resistration unsuccessful</h2>
        )}
        {formStatus === 'success' && (
          <h2 className={styles.formNavigationStatus}>Resistration successful</h2>
        )}
      </div>
      {formStatus === 'default' && (
        <div className={styles.content}>
          <div className={styles.sidePanel}>
            <div className={styles.sidePanelContent}>
              <h1 className={styles.formTitle}>Start your Spanish journey today</h1>
              <div className={styles.costIndicator}>
                <h4 className={styles.costIndicatorTitle}>Estimated cost: </h4>
                <p className={styles.costIndicatorCost}>
                  {`$${formatTotalPrice()} USD`}{formatPricePerStudent() !== 0 && <span>{` ($${formatPricePerStudent()} per student)`}</span>}
                </p>
              </div>
            </div>
            <div className={styles.sidePanelFooter}>
              <p className={styles.contactLink}>Questions? <span className={altOption}><Link to={'/contact'}>Contact us</Link></span></p>
              <p className={styles.finePrint}>We will contact you to confirm enrollment before payment</p>
            </div>
          </div>
          <Form 
            // onSubmit={handlePost}
            name="registration-form"
            method="POST"
            action="/success/"
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            totalSteps={totalSteps}
            confirmStep={renderConfirmStep()}
            formStatus={formStatus}
            setFormStatus={setFormStatus}
            cta="Enroll"
          >
            <Step title="Class selection">
              <SelectField
                label="Class type:"
                name="classType"
                options={classTypeTitles}
                onChange={(e) => setClassTypeValue(e.target.value)}
              />
              <SelectField
                label="Spanish level:"
                name="level"
                options={["Not sure", "Beginner", "Intermediate", "Advanced"]}
                onChange={(e) => setSpanishLevelValue(e.target.value)}
              />
              <InputField
                readOnly={currentClassType.max === 1}
                label="How many students?"
                name="classSize"
                type="number"
                defaultValue={classSizeValue}
                min={currentClassType.min || 1}
                max={currentClassType.max || null}
                callback={setClassSizeValue}
                onChange={(e) => setClassSizeValue(e.target.value)}
              />
            </Step>
            <Step title="Scheduling">
              <SelectField
                label="Class duration:"
                name="duration"
                options={classTypeDurations}
                onChange={(e) => setDurationValue(e.target.value)}
              />
              <SelectField
                label="Quantity:"
                name="quantity"
                options={classTypePackages}
                onChange={(e) => setQuantityValue(e.target.value)}
              />
              <SelectField
                defaultValue={frequencyValue}
                label="Frequency:"
                name="frequency"
                options={classTypePackages.length > 1 ? ["1x a week", "2x a week", "3x a week"] : ["1x a week"]}
                onChange={(e) => setFrequencyValue(e.target.value)}
              />
            </Step> 
            <Step title="Student info">
              <InputField
                defaultValue={nameValue}
                label="Full name:"
                required={true}
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
                placeholder="you@email.com" 
                type="text"
                errorMessage="Please enter a valid email"
                pattern={/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/}
                onChange={(e) => setEmailValue(e.target.value)}
              >
                <MailIcon />
              </InputField>
              <InputField
                defaultValue={locationValue}
                label="Where do you live?"
                name="location"
                errorMessage="Please enter your city and country"
                placeholder="City, Country" 
                type="text"
                onChange={(e) => setLocationValue(e.target.value)}
              ><LocationIcon /></InputField>
            </Step>
          </Form>
        </div>
      )}
      {formStatus === 'success' && (
        <div className={styles.formResult} style={{justifyItems: 'center', textAlign: 'center'}}>
          <h1 className={styles.formTitle}>Thanks for enrolling!</h1>
          <p>Check your email for a confirmation of your registration. We’ll contact you soon to confirm your enrollment and schedule your classes. </p>
          <CTALink kind="small button" route="/" title="Go home" />
        </div>
      )}
      {formStatus === 'error' && (
        <div className={styles.formResult} style={{justifyItems: 'center', textAlign: 'center'}}>
          <h1 className={styles.formTitle}>Hm... something went wrong</h1>
          <p>We’re sorry! We couldn’t complete your registration at this time. You can try again or contact us directly.</p>   
          <button className={cn(button, buttonSmall)} onClick={() => window.location.reload()}>Try again</button> 
        </div>
      )}
      
    </div>
  )
}

export default FormSlide
