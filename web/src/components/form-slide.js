import React, {useState, useEffect} from 'react'
import * as styles from './form-slide.module.css'
import { cn } from '../lib/helpers'
import { button, buttonSmall, buttonLarge, buttonSecondary } from './CTALink.module.css'
import CTALink from './CTALink'
import { differenceInDays } from 'date-fns'
import { getTimezoneOffset } from 'date-fns-tz'
import { Link } from 'gatsby'
import { altOption } from './cta-form.module.css'
import { Form, Step, InputField, SelectField, StepNavigation, SelectSearchField } from '../components/form'

// import { RegistrationReducer, DefaultRegistration } from '../reducers/registration-reducer'

import { IoPerson as NameIcon, IoMail as MailIcon, IoLocationSharp as LocationIcon } from 'react-icons/io5'
import { getTimeZones, rawTimeZones, timeZonesNames } from "@vvo/tzdb";
import { render } from 'react-dom'

function FormSlide ({ classTypes, teachers, timezone}) {

  const classTypeTitles = classTypes.map(c => c.title)

  // FORM FIELD STATE
  // Step Student Info
  const [nameValue, setNameValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [locationValue, setLocationValue] = useState("")
  // Step Class type
  const [classTypeValue, setClassTypeValue] = useState(classTypeTitles[0])
  const [spanishLevelValue, setSpanishLevelValue] = useState("Not sure")
  const [classSizeValue, setClassSizeValue] = useState("1")
  // Step Class info
  const [durationValue, setDurationValue] = useState(classTypes[0].pricing[0].duration)
  const [frequencyValue, setFrequencyValue] = useState("1x a week")
  const [quantityValue, setQuantityValue] = useState("1 class")
  // Step Schedule
  const [timezoneValue, setTimeZoneValue] = useState("")
  const [classSchedule1Value, setClassSchedule1Value] = useState("")
  const [classSchedule2Value, setClassSchedule2Value] = useState("")
  const [classSchedule3Value, setClassSchedule3Value] = useState("")

  // COMPONENT STATE
  const [currentClassType, setCurrentClassType] = useState(classTypes[0])
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [pricePerStudent, setPricePerStudent] = useState(0)
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(5);
  const [formStatus, setFormStatus] = useState('default')
  const [classScheduleError, setClassScheduleError] = useState({})
  const [timeOffsetDiff, setTimeOffsetDiff] = useState(0)
  const [availabilityValues, setAvailabilityValues] = useState([])


  let classTypeDurations = currentClassType.pricing.map(p => (
     p.duration
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
        <div></div>
        {/* <h2 className={styles.confirmStepTitle}>Please confirm your registration details</h2>
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
        </div> */}
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
    setDurationValue(classTypes.filter(c => c.title === classTypeValue)[0].pricing[0].duration)
    setQuantityValue('1 class')
    setCurrentClassType(classTypes.filter(c => c.title === classTypeValue)[0])
  }, [classTypeValue]);

  useEffect(() => {
    let classDay1 = classSchedule1Value.substr(0, classSchedule1Value.indexOf(':'))
    let classDay2 = (classSchedule2Value.substr(0, classSchedule2Value.indexOf(':')))
    let classDay3 = (classSchedule3Value.substr(0, classSchedule3Value.indexOf(':')))
    if ((classDay2 && classDay1 === classDay2) || (classDay3 && classDay1 === classDay3) || (classDay3 &&classDay2 === classDay3)) {
      setClassScheduleError({
        type: "manual",
        message: "Classes must be on different days"
      })
    } else {
      setClassScheduleError({})
    }
  }, [classSchedule1Value, classSchedule2Value, classSchedule3Value])

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
  
  const addMinutesToTime = (time, minsAdd) => {
    const z = (n) => (
      (n<10? '0':'') + n
    )
    let bits = time.split(':');
    let mins = bits[0]*60 + +bits[1] + +minsAdd;
    return z(mins%(24*60)/60 | 0) + ':' + z(mins%60);  
  } 

  const convertToMinutes = (time) => {
    let bits = time.split(':')
    return Number((+bits[0]) * 60 + (+bits[1]))
  }


  const addClassIntervals = (start, end, day) => {

    let classTimes = []
    let days = ["Sundays", "Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays"]
    let dayName = day[0].toUpperCase() + day.substring(1) + 's'
    let offsetDayName = dayName
    let startMinutes = convertToMinutes(start)
    let endMinutes = convertToMinutes(end)
    if(endMinutes < startMinutes) endMinutes = endMinutes + 1440
    let currentInterval = start
    while(startMinutes <= endMinutes) {
      convertToMinutes(currentInterval) < convertToMinutes(start) 
        ? offsetDayName = days[days.indexOf(dayName) + 1]
        : offsetDayName = dayName
      let endTime = addMinutesToTime(currentInterval, durationValue)
      classTimes.push(`${offsetDayName}: ${currentInterval}-${endTime}`)
      currentInterval = endTime
      startMinutes = startMinutes + durationValue
      
    }
    return classTimes
  }

  const teacherAvailability = (teacher) => (
    teacher.availability.map(d => {
      let day = d.day
      let times = d.availableTimes.map(t => {
        let offsetStart = addMinutesToTime(t.start, -timeOffsetDiff)
        let offsetEnd = addMinutesToTime(t.end, -timeOffsetDiff)
        return addClassIntervals(offsetStart, offsetEnd, day)
      })
      return times.flat(2)
    })
  )

  const rawTimeZones = getTimeZones();
  const timeZoneOptions = rawTimeZones.map(t => ({label: t.rawFormat, value: t.name}))

  useEffect(() => {
    if(timezoneValue) {
      let originalTimeOffset = getTimezoneOffset(timezone, new Date()) / 60000
      let convertedTimeOffset = getTimezoneOffset(timezoneValue, new Date()) / 60000
      setTimeOffsetDiff(originalTimeOffset - convertedTimeOffset)
    }
  }, [timezoneValue])

  useEffect(() => {
    let options = teacherAvailability(teachers[0]).flat(3)
    let convertedOptions = []
    if(availabilityValues.length) {
      convertedOptions = availabilityValues.map((v, i) => (
        {value: v.value, label: options[i]}
      ))
    } else {
      convertedOptions = options.map(o => (
        {value: o, label: o}
      ))
    }
    console.log("UPDATE:", convertedOptions)
    setAvailabilityValues(convertedOptions)
  }, [timeOffsetDiff, durationValue])

  const renderSchedulerInputs = () => {
    let numberPattern = /\d+/g;
    let frequencyNumber = Number(frequencyValue.match(numberPattern)[0])
    const schedulerInputs = [];
    const onChangeHandlers = [(v) => setClassSchedule1Value(v), (v) => setClassSchedule2Value(v), (v) => setClassSchedule3Value(v)]

    for (let i = 1; i <= frequencyNumber; i++) {
      
      schedulerInputs.push(
        <SelectField
          label={`Class ${i}:`}
          isRequired={true}
          error={classScheduleError}
          handleChange={onChangeHandlers[i-1]}
          name={`classSchedule${i}`}
          options={availabilityValues}
        />
      );
    }
    return schedulerInputs;
  }

  const classPackageOptions = classTypePackages.map(p => ({value: p, label: p}))
  const classFrequencyOptions = quantityValue !== '1 class' ? [{value: "1 per week", label: "1 per week"}, {value: "2 per week", label: "2 per week"}, {value: "3 per week", label: "3 per week"}] : [{value: "1 per week", label: "1 per week"}]
  let classDurationOptions = classTypeDurations.map(d => (
    { label: `${d / 60} hour${d / 60 > 1 ? 's' : ''}`, value: d }
  ))

  return (
    <div className={styles.root}>
      <div className={styles.formNavigation}>
        {formStatus === 'default' && (
          <StepNavigation steps={['Class selection', 'Package', 'Scheduling', 'Student info']} currentStep={currentStep} totalSteps={totalSteps} />
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
                defaultValue={{value: classTypeTitles[0], label: classTypeTitles[0]}}
                options={classTypeTitles.map(t => ({label: t, value: t}))}
                handleChange={value => setClassTypeValue(value)}
              />
              <SelectField
                label="Spanish level:"
                name="level"
                defaultValue={{value: "Not sure", label: "Not sure"}}
                handleChange={value => setSpanishLevelValue(value)}
                options={[{value: "Not sure", label: "Not sure"}, {value: "Beginner", label: "Beginner"}, {value: "Intermediate", label: "Intermediate"}, {value: "Advanced", label: "Advanced"}]}
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
            <Step title="Package">

              <SelectField
                label="How many classes?"
                name="quantity"
                defaultValue={classPackageOptions[0]}
                options={classPackageOptions}
                handleChange={(value) => setQuantityValue(value)}
              />
              <SelectField
                defaultValue={frequencyValue}
                label="Classes per week?"
                name="frequency"
                defaultValue={classFrequencyOptions[0]}
                options={classFrequencyOptions}
                handleChange={(value) => setFrequencyValue(value)}
              />
              <SelectField
                label="Class length:"
                name="duration"
                defaultValue={classDurationOptions[0]}
                options={classDurationOptions}
                handleChange={(value) => setDurationValue(value)}
              />
            </Step>
            <Step title="Scheduling">
              <SelectField 
                label="Select your timezone:" 
                name="timezone"
                isRequired={true}
                defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}
                handleChange={(value) => setTimeZoneValue(value)}
                isSearchable={true}
                options={timeZoneOptions} /> 
              {renderSchedulerInputs()} 
            </Step> 
            <Step title="Student info">
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
                defaultValue={locationValue}
                label="Where do you live?"
                name="location"
                isRequired={true}
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
