import React, { useState, useEffect } from 'react'
import { Router } from '@reach/router'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Step6 from './Step6'
import Step7 from './Step7'
import Success from './Success'
import Error from './Error'
import { FormContainer, FormTitle, ProgressMeter } from '../Form'

const AddRegistration = (props) => {

  const [currentStep, setCurrentStep] = useState(0) 

  return (
    <Router>
      <Step1 path="/" />
      <Step2 path="step2" />
      <Step3 path="step3" />
      <Step4 path="step4" />
      <Step5 path="step5" />
      <Step6 path="step6" />
      <Step7 path="step7" />
      <Success path="success" />
      <Error path="error" />
    </Router>
  )
}

export default AddRegistration