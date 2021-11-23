import React, { useState, useEffect, useRef } from 'react'
import * as styles from './style.module.css'

import { 
  Form, 
  PrimaryButton,
  Fieldset,
  LinkButton,
  ErrorMessage,
  RadioField, 
  FormContainer,
  FormTitle,
  ProgressMeter,
} from '../Form'

import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { navigate } from 'gatsby'

import { useDispatch, useSelector } from 'react-redux'
import { changePackage } from '../../../features/addRegistration'


import { useGetLanguagesQuery } from '../../../services/sanityApi'
 


function Step6(props) {

  const dispatch = useDispatch()

  const { chosenClassType, chosenPackage } = useSelector(state => state.addRegistration)

  useEffect(() => {
    if(!chosenClassType) navigate("../")
  }, [chosenClassType])

  const schema = yup.object().shape({
    package: yup.string().required("Please select a package"),
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
      package: chosenPackage?._id || "",
    },
    resolver: yupResolver(schema),
  })

  const { dirtyFields } = useFormState({
    control
  });

   const onSubmit = (data) => {
      dispatch(changePackage(chosenClassType.packages.find( ({ _id }) => _id === data.package)))
      navigate("../step7")
   }

  return (
    <FormContainer>
      <FormTitle>Register for classes</FormTitle>
      <ProgressMeter title="Package" step={6} steps={7} />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        name="add-registration-form"
        register={register}
      >

        {chosenClassType?.packages?.length
        ? (
          <Fieldset>
            <legend>Choose a package:</legend>
            {chosenClassType.packages.map(p => (
              <RadioField 
                id={p.title} 
                label={`${p.quantity} class${p.quantity > 1 ? 'es' : ''}`}
                name="package" 
                value={p._id}
                error={errors?.package}
                isDirty={isDirty?.package || getValues("package")}
                register={register}
              />
            ))}
            <ErrorMessage>{errors?.package && errors.package.message}</ErrorMessage>
          </Fieldset>
        ) : (
          <div>Loading...</div>
        )}
        
        <div className={styles.buttonContainer}> 
          <LinkButton onClick={(e) => {
            e.preventDefault()
            dispatch(changePackage(chosenClassType.packages.find( ({ _id }) => _id === getValues("package"))))
            navigate('../step5')
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

export default Step6


