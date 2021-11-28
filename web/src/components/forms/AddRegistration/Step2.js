import React, { useState, useEffect, useRef } from 'react'
import * as styles from './style.module.css'

import { 
  Form, 
  PrimaryButton,
  Fieldset,
  LinkButton,
  SelectField, 
  FormTitle,
  FormContainer,
  ProgressMeter,
} from '../Form'

import { FaChalkboardTeacher as ClassTypeIcon } from 'react-icons/fa'
import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { navigate } from 'gatsby'

import { useDispatch, useSelector } from 'react-redux'
import { changeClassType } from '../../../features/addRegistration'

import { useGetLanguagesQuery } from '../../../services/sanityApi'

function Step2(props) {

  const dispatch = useDispatch()

  const languageData = useSelector(state => state.addRegistration.chosenLanguage)

  const classTypes = 
    languageData?.relatedClasses?.length 
    ? [...languageData.relatedClasses].sort((a, b) => a.order - b.order) 
    : []

  const schema = yup.object().shape({
    classType: yup.string().required("Please select a class type"),
  })

  useEffect(() => {
    if(!languageData) navigate("../")
  }, [languageData])

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
      classType: useSelector(state => state.addRegistration.chosenClassType)._id,
    },
    resolver: yupResolver(schema),
  })

  const { dirtyFields } = useFormState({
    control
  });

   const onSubmit = (data) => {
      console.log(data)
      dispatch(changeClassType(classTypes.find( ({ _id }) => _id === data.classType)))
      navigate("../step3")
   }


  return (
    <FormContainer>
      <FormTitle>Register for classes</FormTitle>
      <ProgressMeter title="Course selection" step={2} steps={7} />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        name="add-registration-form-step-2"
        register={register}
      >

        {languageData
        ? (
        <Fieldset>
          <SelectField
            label="Choose a course:"
            id="classType"
            name="classType"
            control={control}
            placeholder="Select a course from the list"
            options={
              classTypes.map(c => ({value: c._id, label: c.title}))
            }
            error={errors?.classType}
            isDirty={dirtyFields?.classType || getValues("classType")}
            register={register}
          >
            <ClassTypeIcon />
          </SelectField>
        </Fieldset>
        ) : (
          <div>Loading...</div>
        )}
        
        <div className={styles.buttonContainer}> 
          <LinkButton onClick={(e) => {
            e.preventDefault()
            dispatch(changeClassType(
              getValues("classType") 
              ? classTypes.find( ({ _id }) => _id === getValues("classType"))
              : ""
            ))
            navigate('../')
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

export default Step2