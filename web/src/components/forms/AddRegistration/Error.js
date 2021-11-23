import React, { useState, useEffect } from 'react'
import * as styles from './style.module.css'
import { 
  FormContainer,
  FormTitle,
  LinkButton
} from '../Form'

import ErrorSpan from '../../ErrorSpan'

import { BiErrorCircle as ErrorIcon} from 'react-icons/bi'
import { BsArrowRightShort as RightArrow } from 'react-icons/bs'
import { navigate } from '@reach/router'

function Success(props) {

  return (
    <FormContainer>
      <FormTitle>
        <ErrorSpan><ErrorIcon /></ErrorSpan> Something went wrong.
      </FormTitle>
      <p>
        We're sorry, but we couldn't complete your registration. Please try again or contact us directly to make your registration.
      </p>
      <LinkButton onClick={() => navigate("/app/enrollment/new")} style={{justifySelf: 'flex-end'}}>Try again<RightArrow /></LinkButton>
    </FormContainer>
  )
}

export default Success