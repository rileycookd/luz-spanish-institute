import React, { useEffect, useState } from 'react'
import * as styles from './style.module.css'

import { AiOutlineLink as Icon} from 'react-icons/ai'
import CTALink from '../../../CTALink'
import { Link } from 'gatsby'

function Resource(props) {

  console.log("PROPS: ", props)

  const {
    title,
    pathPrefix,
    slug
  } = props
  
  return (
    <div className={styles.root}>
       <Icon />
       <Link to={`/${pathPrefix ? `${pathPrefix}/` : ''}${slug.current}`} className={styles.link}>{title}</Link>
    </div>
  )
}

export default Resource