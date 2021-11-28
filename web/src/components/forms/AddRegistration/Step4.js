import React, { useState, useEffect } from 'react'
import * as styles from './style.module.css'

// REDUX imports
import { useDispatch, useSelector } from 'react-redux'
import { changeDays } from '../../../features/addRegistration'

// REACT ICONS imports
import { 
  Form, 
  TimezoneField, 
  PrimaryButton,
  LinkButton,
  Fieldset,
  SubmitButton,
  CheckboxField,
  SelectField,
  ErrorMessage, 
  FormTitle,
  FormContainer,
  ProgressMeter,
} from '../Form'

import { 
  IoToday as DayIcon, 
  IoTime as TimeIcon
} from 'react-icons/io5'

import {
  GiSandsOfTime as DurationIcon
} from 'react-icons/gi'

// REACT HOOK FORM imports
import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { navigate } from "gatsby"


function Step4(props) {

  const schema = yup.object().shape({
    days: yup.array().min(1, 'Select at least one day').required('Select at least one day'),
  })

  const dispatch = useDispatch()

  const { 
    watch, 
    register, 
    control, 
    handleSubmit, 
    reset, 
    getValues,
    unregister,
    setValue,
    formState: { errors, isDirty, isValid } 
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      days: [...useSelector(state => state.addRegistration.days)].map(d => d.day),
    },
    resolver: yupResolver(schema),
  })

   const onSubmit = (data) => {
      dispatch(changeDays([...data.days]))   
      navigate('../step5')
   }

  return (
    <FormContainer>
      <FormTitle>Register for classes</FormTitle>
      <ProgressMeter title="Weekly schedule" step={4} steps={7} />
      
      <Form
        onSubmit={handleSubmit(onSubmit)}
        name="add-registration-form-step-4"
        register={register}
      >

        <Fieldset>
          <legend>Choose a schedule that works for you.</legend>
          <CheckboxField 
            id="monday" 
            label="Monday"
            name="days" 
            value="Monday"
            error={errors?.days}
            isDirty={isDirty?.days}
            register={register}
          />
          <CheckboxField 
            id="tuesday" 
            name="days" 
            label="Tuesday"
            value="Tuesday"
            error={errors?.days}
            isDirty={isDirty?.days}
            register={register}
          />
          <CheckboxField 
            id="wednesday" 
            name="days" 
            label="Wednesday"
            value="Wednesday"
            error={errors?.days}
            isDirty={isDirty?.days}
            register={register}
          />
          <CheckboxField 
            id="thursday" 
            name="days" 
            label="Thursday"
            value="Thursday"
            error={errors?.days}
            isDirty={isDirty?.days}
            register={register}
          />
          <CheckboxField 
            id="friday" 
            name="days" 
            label="Friday"
            value="Friday"
            error={errors?.days}
            isDirty={isDirty?.days}
            register={register}
          />
          <ErrorMessage>{errors?.days && errors.days.message}</ErrorMessage>
        </Fieldset>
      

        <div className={styles.buttonContainer}> 
          <LinkButton onClick={(e) => {
            e.preventDefault()
            dispatch(changeDays([...getValues('days')]))
            navigate('../step3')
            }}>Back</LinkButton>

          <PrimaryButton>Next</PrimaryButton>
        </div>



        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre>
        <div>{JSON.stringify(errors)}</div>
        <div>{isValid.toString()}</div> */}

      </Form>
      
    </FormContainer>
  )
}

export default Step4