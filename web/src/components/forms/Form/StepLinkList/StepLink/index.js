import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { cn } from '../../../../../lib/helpers'
import * as styles from './style.module.css'

const StepLink = ({ to, children, index, isCurrent }) => {

  return (
    <Link 
      className={styles.root}
      activeClassName={styles.active}
      to={to}
    >
      <div className={styles.iconContainer}>
        <p className={styles.icon}>{index + 1}</p>
      </div> 
      <h4 className={styles.title}>{children}</h4>
    </Link>
  )
}

export default StepLink
