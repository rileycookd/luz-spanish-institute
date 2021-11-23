import React, { useState, useEffect, useRef } from 'react'
import * as styles from './style.module.css'

import { 
  Form, 
  PrimaryButton,
  Fieldset,
  LinkButton,
  SelectField, 
  ProgressMeter,
  FormContainer,
  FormTitle,
} from '../Form'

import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { navigate } from 'gatsby'

import { useDispatch, useSelector } from 'react-redux'
import { changeSize} from '../../../features/addRegistration'
import { IoIosPeople as SizeIcon } from 'react-icons/io'


import { useGetLanguagesQuery } from '../../../services/sanityApi'

function Step3(props) {

  const dispatch = useDispatch()

  const chosenClassType = useSelector(state => state.addRegistration.chosenClassType)

  useEffect(() => {
    if(!chosenClassType) navigate("../")
  }, [chosenClassType])

  const createSizeOptions = (min, max) => {
    let options = []
    for(let i = min; i <= max; i++ ) {
      options.push({value: i, label: `${i} student${i > 1 ? 's' : ''}`})
    }
    return options
  }

  const schema = yup.object().shape({
    size: yup.number().required("Please choose how many students"),
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
      size: useSelector(state => state.addRegistration.size),
    },
    resolver: yupResolver(schema),
  })

  const { dirtyFields } = useFormState({
    control
  });

   const onSubmit = (data) => {
      dispatch(changeSize(data.size))
      navigate("../step4")
   }


  return (
    <FormContainer>
      <FormTitle>Register for classes</FormTitle>
      <ProgressMeter title="Group details" step={3} steps={7} />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        name="add-registration-form"
        register={register}
      >

        {chosenClassType
        ? (
        <Fieldset>
          <SelectField
            label="How many students?"
            id="size"
            name="size"
            control={control}
            placeholder="How many students?"
            options={
              chosenClassType 
              ? createSizeOptions(chosenClassType.min, chosenClassType.max)
              : ""
            }
            isDirty={dirtyFields?.size || getValues("size")}
            error={errors?.size}
            register={register}
            >
            <SizeIcon />
          </SelectField> 
        </Fieldset>
        ) : (
          <div>Loading...</div>
        )}
        
        <div className={styles.buttonContainer}> 
          <LinkButton onClick={(e) => {
            e.preventDefault()
            dispatch(changeSize(getValues("size")))
            navigate('../step2')
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

export default Step3