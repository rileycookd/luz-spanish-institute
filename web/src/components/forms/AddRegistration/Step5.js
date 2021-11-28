import React, { useState, useEffect } from 'react'
import * as styles from './style.module.css'
import { timeOptions } from './timeOptions'

// REDUX imports
import { useDispatch, useSelector } from 'react-redux'
import { changeTimes } from '../../../features/addRegistration'

// REACT ICONS imports
import { 
  Form, 
  TimezoneField, 
  PrimaryButton,
  LinkButton,
  SubmitButton,
  CheckboxField,
  SelectField, 
  Fieldset,
  FormContainer,
  FormTitle,
  ProgressMeter,
  FormInfo,
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
import { useData } from './FormContext'
import { navigate } from "gatsby"

import { useGetCurrentUserQuery } from '../../../services/sanityApi'
import { useIdentityContext } from "react-netlify-identity-gotrue"



function Step5(props) {

  const [isLoading, setIsLoading] = useState(true)

  const identity = useIdentityContext()
  const { 
    data: userData, 
    error: userError, 
    isLoading: userIsLoading 
  } = useGetCurrentUserQuery(identity.user.id)

  const chosenClassType = useSelector(state => state.addRegistration.chosenClassType)

  const schema = yup.object().shape({
    classes: yup.array().of(
      yup.object().shape({
          day: yup.string(),
          time: yup.string()
            .required('Time is required'),
          duration: yup.string()
            .required('Duration is required'),
      })
    )
  })

  const dispatch = useDispatch()
  const initialState = [...useSelector(state => state.addRegistration.days)]

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
      classes: useSelector(state => state.addRegistration.days)
    },
    resolver: yupResolver(schema),
  })

  const { dirtyFields } = useFormState({
    control
  });

  const createPricingOptions = () => {
    return chosenClassType.pricing.map(p => {
      return {value: `${p.duration}`, label: `${p.duration / 60} hour${p.duration > 60 ? 's' : ''}`}
    })
  }

   // Handles the post process to Netlify so we can access their serverless functions
   const onSubmit = (data) => {
      dispatch(changeTimes([...data.classes]))
      navigate('../step6')
   }

  return (
    <FormContainer>
      <FormTitle>Register for classes</FormTitle>
      <ProgressMeter title="Class times" step={5} steps={7} />
      
      <Form
        onSubmit={handleSubmit(onSubmit)}
        name="add-registration-form-step-5"
        register={register}
      >
        <p>Your account's timezone is set to: <em>{userData?.timezone}</em>. You can change your timezone in your account settings.</p>

        {/* {!isLoading && ( */}
          <>
          {initialState.map((c, i) => (
            <Fieldset key={`${c.day}-${i}`}>
              <legend><strong>{c.day}</strong></legend>
              <SelectField
                label={`${c.day}'s duration:`}
                id={`classes[${i}].duration`}
                name={`classes[${i}].duration`}
                options={createPricingOptions()}
                control={control}
                placeholder="How long of a class?"
                error={errors?.classes?.[i]?.duration}
                isDirty={dirtyFields?.classes?.[i]?.duration || getValues(`classes[${i}].duration`)}
                register={register}
              >
                <DurationIcon />
              </SelectField>
              <SelectField
                label={`${c.day}'s start time:`}
                id={`classes[${i}].time`}
                name={`classes[${i}].time`}
                options={timeOptions}
                control={control}
                placeholder="What time?"
                disabled={getValues(`classes[${i}].duration`) == ""}
                error={errors?.classes?.[i]?.time}
                isDirty={dirtyFields?.classes?.[i]?.time || getValues(`classes[${i}].time`)}
                register={register}
              >
                <TimeIcon />
              </SelectField>
            </Fieldset>
          ))}
      

          <div className={styles.buttonContainer}> 
          <LinkButton onClick={(e) => {
            e.preventDefault()
            dispatch(changeTimes([...getValues('classes')]))
            navigate('../step4', 
              {
                state: { isValid: true }
              }
            )}}>Back</LinkButton>

          <PrimaryButton>Next</PrimaryButton>
          </div>



          {/* <pre>{JSON.stringify(watch(), null, 2)}</pre>
          <div>{JSON.stringify(errors)}</div>
          <div>{isValid.toString()}</div> */}
          </>
        {/* )} */}

        </Form>
      
    </FormContainer>
  )
}

export default Step5