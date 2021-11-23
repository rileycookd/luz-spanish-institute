import React, { useState, useEffect } from 'react'
import * as styles from './style.module.css'

import { useNavigate } from '@reach/router'

import { 
  Form, 
  InputField, 
  TimezoneField, 
  PrimaryButton,
  SelectField, 
  PhoneField,
  EditButton,
} from '../Form'

import { 
  IoPerson as NameIcon, 
  IoPersonCircle as PicIcon, 
  IoBriefcase as CompanyIcon, 
  IoMail as MailIcon 
} from 'react-icons/io5'

import { ImPhone as PhoneIcon } from 'react-icons/im'
import { useIdentityContext } from 'react-netlify-identity-gotrue'
import { MdLocationCity as CityIcon } from 'react-icons/md'
import { BiWorld as CountryIcon } from 'react-icons/bi'
import { RiMapPinTimeLine as TimezoneIcon } from 'react-icons/ri'

import { cn } from '../../../lib/helpers'
import CTALink from '../../CTALink'

import { navigate } from 'gatsby'
import { useData } from './FormContext'

import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

function Step1(props) {

  const { setValues, data } = useData()


  const [classTypes, setClassTypes] = useState([])
  const [currentClassType, setCurrentClassType] = useState({})
  const [isLoading, setIsLoading] = useState(true)


  const sanityQuery = `
    *[_type == 'classType']
  `

  useEffect(() => {
    fetch(`https://${process.env.GATSBY_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production?query=${sanityQuery}`)
    .then(response => response.json())
    .then(data => {
      setClassTypes(data.result.sort((a, b) => a.order - b.order))
      setIsLoading(false)
    })
    .catch((error) => console.log(error));
  }, [])

  const schema = yup.object().shape({
    classType: yup.string().required("Please select a class type"),
  })
  
  console.log("DATA: ", data)

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
    mode: 'onBlur',
    defaultValues: {
      _id: props._id,
      timezone: props.timezone || '',
      classType: data.classType || '',
      quantity: data.quantity || '',
      size: data.size || '',
    },
    resolver: yupResolver(schema),
  })

  const watchClassType = watch("classType");

  useEffect(() => {
    setCurrentClassType(classTypes.filter(c => c.title === watchClassType)[0])
  }, [watchClassType])

  const { dirtyFields } = useFormState({
    control
  });


  const [formStatus, setFormStatus] = useState('default')

  // const identity = useIdentityContext()

  // Transforms the form data from the React Hook Form output to a format Netlify can read
  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&")
  }

   // Handles the post process to Netlify so we can access their serverless functions
   const onSubmit = (data) => {
      setValues(data)
      unregister([""])
      props.navigate('Step2')
   }

  const createSizeOptions = (min, max) => {
    let sizeOptions = []
    for(let i=min; i <= max; i++) {
      sizeOptions.push(
        {value: i, label: `${i} student${i > 1 ? 's' : ''}`}
      )
    }
    return sizeOptions
  }

  return (
    <div className={styles.root}>
      <div className={styles.formContainer}>
        {formStatus === "default" && (
          <>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Add Classes</h1>
          </div>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            name="add-classes-form"
            register={register}
          >
            <input type="hidden" {...register('_id')} />
            <TimezoneField 
              label="Timezone:" 
              name="timezone"
              id="timezone"
              control={control}
              error={errors?.timezone}
              disabled={true}
              isDirty={props.timezone || dirtyFields.timezone}
            >
              <TimezoneIcon />
            </TimezoneField> 

            {!isLoading 
            ? (
            <>
              <SelectField
                label="Class type:"
                id="classType"
                name="classType"
                control={control}
                placeholder="Select your class type"
                options={
                  classTypes.map(c => ({value: c.title, label: c.title}))
                }
                error={errors?.classType}
                register={register}
                handleChange={() => {
                  getValues("size") && setValue('size', '')
                  watchClassType && setValue('quantity', '')
                }}
              >
                {/* <NameIcon /> */}
              </SelectField>
              {currentClassType && (
                <>
                  {currentClassType.max > 1 && (
                    <SelectField
                      label="Class size"
                      id="size"
                      name="size"
                      control={control}
                      placeholder="How many students?"
                      options={
                        createSizeOptions(currentClassType.min, currentClassType.max)
                      }
                      error={errors?.size}
                      register={register}
                    >
                      {/* <NameIcon /> */}
                    </SelectField>
                  )}
                  <SelectField
                    label="Quantity"
                    id="quantity"
                    name="quantity"
                    control={control}
                    placeholder="How many classes?"
                    options={
                      currentClassType.packages?.map(p => ({value: p.quantity, label: `${p.quantity} class${p.quantity > 1 ? 'es' : ''}`}))
                    }
                    error={errors?.quantity}
                    register={register}
                  >
                    {/* <NameIcon /> */}
                  </SelectField>
                </>

              )}

            </>
            ) : (
              <div>Loading...</div>
            )}
            

            <PrimaryButton>Next</PrimaryButton>


<pre>{JSON.stringify(watch(), null, 2)}</pre>
{/* //       <div>{JSON.stringify(errors)}</div> */}
{/* //       <div>{isValid.toString()}</div> */}
          </Form>
          </>
        )}

      </div>
    </div>
  )
}

export default Step1