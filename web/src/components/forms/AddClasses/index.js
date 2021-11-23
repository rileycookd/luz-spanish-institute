import React from 'react'
import { Router } from '@reach/router'
import Step1 from './Step1'
import { FormDataProvider } from './FormContext'
import Step2 from './Step2'

const AddClasses = (props) => {

  return (
    <FormDataProvider>
      <Router>
        <Step1 {...props} path="/" />
        <Step2 {...props} path="/Step2" />
      </Router>
    </FormDataProvider>
  )
}

export default AddClasses