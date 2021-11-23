import React, { useEffect, useState } from 'react'
import { cn } from '../../../../../lib/helpers'
import * as styles from './style.module.css'

const Step = ({ children, index, currentStep }) => {

  return (
    <div
      className={currentStep >= index ? cn(styles.root, styles.active) : styles.root}
    >
      <h4 className={styles.title}>{index + 1}. {children}</h4>
    </div>
  )
}

export default Step
