import React, { useState, useEffect } from 'react'
import * as styles from './style.module.css'
import { 
  FormContainer,
  FormTitle,
  LinkButton
} from '../Form'

import SuccessSpan from '../../SuccessSpan'

import { IoMdCheckmarkCircleOutline as SuccessIcon} from 'react-icons/io'
import { BsArrowRightShort as RightArrow } from 'react-icons/bs'
import { navigate } from '@reach/router'

function Success(props) {

  return (
    <FormContainer>
      <FormTitle>
        <SuccessSpan><SuccessIcon /></SuccessSpan> Registration sent
      </FormTitle>
      <p>
        We have received your registration. Keep an eye on your email, as we will contact you in the next few days.
      </p>
      <LinkButton onClick={() => navigate("/app/")} style={{justifySelf: 'flex-end'}}>Back to Dashboard <RightArrow /></LinkButton>
    </FormContainer>
  )
}

export default Success