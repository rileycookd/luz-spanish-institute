import React, { useEffect, useState } from 'react'
import * as styles from './style.module.css'

import { AiOutlineLink as Icon} from 'react-icons/ai'
import CTALink from '../../../CTALink'
import { Link } from 'gatsby'

function Resource(props) {

  console.log(props)

  const {
    title
  } = props
  
  return (
    <div className={styles.root}>
       <Icon />
       <Link className={styles.link}>{title}</Link>
    </div>
  )
}

export default Resource