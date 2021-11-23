import React, { useState, useEffect } from 'react'
import * as styles from './style.module.css'

import { addHours, addMinutes, format } from 'date-fns'
import qs from 'qs'

import { 
  Form, 
  LinkButton,
  SubmitButton,
  FormContainer,
  FormTitle,
  ProgressMeter
} from '../Form'

import { 
  ConfirmationTable,
  Cell,
  Header,
  HeaderCell,
  Row,
  Body,
} from '../Form/ConfirmationTable'

import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { navigate } from "gatsby"

import { useDispatch, useSelector } from 'react-redux'

import { useIdentityContext } from "react-netlify-identity-gotrue"
import { useGetCurrentUserQuery, useGetLanguagesQuery } from '../../../services/sanityApi'

function Step7(props) {

  const [totalPrice, setTotalPrice] = useState(0)

  const addHoursToString = (start, duration) => {
    console.log("START: ", start, "DURATION: ", duration)
    return format(
      addMinutes(
        new Date(2012, 1, 29, start.split(":")[0], start.split(":")[1]), 
        duration
      ), 
        'HH:mm'
    )
  }

 const { size, days, chosenPackage, chosenLanguage, chosenClassType } = useSelector(state => state.addRegistration)


  const calculatePrice = () => {
    if(chosenClassType?.pricing) {
      let durations = days.map(d => d.duration)
      console.log("Durations: ", durations)
      console.log("Chosen class type: ", chosenClassType)
      let basePrices = durations.map(d => {
        let classPricing = chosenClassType.pricing.find(o => o.duration === Number(d))
        console.log("Duration pricing: ", classPricing)
        if(size > chosenClassType.min && classPricing?.groupDiscounts?.length) {
          let discountSizes = [...classPricing.groupDiscounts]
            .sort((a,b) => a.size - b.size)
            .filter(d => d.size <= size)
          console.log("Group discounts", discountSizes)
          if(discountSizes?.length) {
            return discountSizes[discountSizes.length - 1].price
          } else {
            return classPricing?.price
          }
        } else {
          return classPricing?.price
        }
      })
      let remainder = chosenPackage.quantity % basePrices.length
      let quotient = Math.floor(chosenPackage.quantity / basePrices.length)
      let totalPrices = basePrices.map((p, i) => {
        if(i <= (remainder - 1)) {
          return p * (quotient + 1)
        } else {
          return p * quotient
        }
      })
      let totalPrice = totalPrices.reduce((a, b) => a + b, 0);
      // console.log("Base Prices", basePrices)
      // console.log("Quotient", quotient)
      // console.log("Total Prices", totalPrices)
      // console.log("Total Price", totalPrice)
      return (totalPrice - totalPrice * (chosenPackage.discount / 100)).toFixed(2);
    } else {
      return 0
    }
  }

  useEffect(() => {
    setTotalPrice(calculatePrice())
  }, [chosenClassType])
  

  const identity = useIdentityContext()
  const { 
    data: userData, 
    isError: isUserDataError, 
    isLoading: isUserDataLoading 
  } = useGetCurrentUserQuery(identity.user.id)


  const initialState = {...useSelector(state => state.addRegistration)}


  initialState.days = initialState?.days?.map((d, i) => {
    return {
      day: d.day,
      start: d.time,
      end: addHoursToString(d.time, d.duration)
    }
  })

  console.log("Initial State: ", initialState)


  const schema = yup.object().shape({
    classType: yup.string()
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
      _id: userData?._id || null,
      language: initialState.chosenLanguage._id,
      classType: initialState.chosenClassType._id,
      size: initialState.size,
      days: initialState.days,
      quantity: initialState.chosenPackage.quantity,
    },
    resolver: yupResolver(schema),
  })

  // Transforms the form data from the React Hook Form output to a format Netlify can read
  const encode = (data) => {
    return qs.stringify(data)
  } 


   // Handles the post process to Netlify so we can access their serverless functions
   const handlePost = (formData, event) => {
    event.preventDefault()

    fetch(`/`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": 'add-registration-form', ...formData }),
    })
      .then((response) => {
        reset()
        if(response.status === 200 || response.status === 201 || response.status === 203) {
          navigate("../success")
        } else {
          navigate("../error")
        }
        console.log(response)
      })
      .catch((error) => {
        navigate("../error")
        console.log(error)
      })
  }

  return (
    <FormContainer>
      <FormTitle>Register for classes</FormTitle>
      <ProgressMeter title="Confirm" step={7} steps={7} />
      <Form
        onSubmit={handleSubmit(handlePost)}
        name="add-registration-form"
        register={register}
      >

        <input type="hidden" {...register('_id')} />

        <p>Confirm your enrollment details:</p>


          <> 
            <ConfirmationTable>
              <Header>
                <Row>
                  <HeaderCell>Course</HeaderCell>
                  <HeaderCell>Language</HeaderCell>
                </Row>
              </Header>
              <Body>
                <Row>
                  <Cell>{initialState.classType}</Cell>
                  <Cell>{initialState.chosenLanguage.title}</Cell>
                </Row>
              </Body>
              <Header>
                <Row>
                  <HeaderCell>Package</HeaderCell>
                  <HeaderCell>Size</HeaderCell>
                </Row>
              </Header>
              <Body>
                <Row>
                <Cell>{`${initialState?.chosenPackage?.quantity} class${initialState?.chosenPackage?.quantity > 1 ? 'es' : ''}`}</Cell>
                  <Cell>{initialState.size} student{initialState.size > 1 ? 's' : ''}</Cell>
                </Row>
              </Body>
              <Header>
                <Row>
                  <HeaderCell>Schedule</HeaderCell>
                  <HeaderCell>Time</HeaderCell>
                </Row>
              </Header>
              <Body>
                {initialState.days?.map(d => (
                  <Row>
                    <Cell>{d.day}</Cell>
                    <Cell>{d.start}-{d.end}</Cell>
                  </Row>
                ))}      
              </Body>
              <Header>
                <Row>
                  <HeaderCell></HeaderCell>
                  <HeaderCell>Quote</HeaderCell>
                </Row>
              </Header>
              <Body>
                <Row>
                  <Cell></Cell>
                  <Cell>${totalPrice}</Cell>
                </Row>
              </Body>
            </ConfirmationTable>

         
            <pre>{JSON.stringify(watch(), null, 2)}</pre>
            <div>{JSON.stringify(errors)}</div>
            <div>{isValid.toString()}</div>
          </>
        <p>No credit card required. Payment will be due once your registration has been accepted.</p>
        <div className={styles.buttonContainer}> 
          <LinkButton onClick={(e) => {
            e.preventDefault()
            navigate('../step6')
            }}>Back</LinkButton>

          <SubmitButton>Register</SubmitButton>
        </div>
      </Form>
    
    </FormContainer>
  )
}

export default Step7