import React, { useState, useEffect, useRef } from 'react'
import * as styles from './style.module.css'

import { 
  Form, 
  PrimaryButton,
  Fieldset,
  ErrorMessage,
  RadioField, 
  FormContainer,
  FormTitle,
  ProgressMeter
} from '../Form'

import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { navigate } from 'gatsby'

import { useDispatch, useSelector } from 'react-redux'
import { changeLanguage } from '../../../features/addRegistration'


import { useGetLanguagesQuery } from '../../../services/sanityApi'
 


function Step1(props) {

  const dispatch = useDispatch()

  const { data: languageData, error, isLoading } = useGetLanguagesQuery()

  const schema = yup.object().shape({
    language: yup.string().required("Please select a language"),
  })

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
      language: useSelector(state => state.addRegistration.chosenLanguage)?._id,
    },
    resolver: yupResolver(schema),
  })

  const { dirtyFields } = useFormState({
    control
  });

   const onSubmit = (data) => {
      dispatch(changeLanguage(languageData.find( ({ _id }) => _id === data.language)))
      navigate("step2")
   }

  return (
    <FormContainer>
      <FormTitle>Register for classes</FormTitle>
      <ProgressMeter title="Language selection" step={1} steps={7} />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        name="add-registration-form-step-1"
        register={register}
      >

        {!isLoading 
        ? (
          <Fieldset>
            <legend>Choose a language:</legend>
            {languageData && languageData.map(l => (
              <RadioField 
                key={l._id}
                id={l.title} 
                label={l.title}
                name="language" 
                value={l._id}
                error={errors?.language}
                isDirty={isDirty?.language}
                register={register}
              />
            ))}
            <ErrorMessage>{errors?.language && errors.language.message}</ErrorMessage>
          </Fieldset>
        ) : (
          <div>Loading...</div>
        )}
        
        <PrimaryButton>Next</PrimaryButton>


        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre>
        <div>{JSON.stringify(errors)}</div>
        <div>{isValid.toString()}</div> */}
      </Form>

    </FormContainer>
  )
}

export default Step1


