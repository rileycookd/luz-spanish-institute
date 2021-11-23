import React from 'react'
import * as styles from './style.module.css'
import { cn } from '../../../../lib/helpers'

const ProgressMeter = (props) => {

  const {
    title,
    step,
    steps
  } = props

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>{`${step}. ${title}`}</h3>
      <div className={styles.meter}>
        <div className={styles.progress} style={{width: `${(step - 1) / (steps - 1) * 100}%`}}></div>
      </div>
      <h5 className={cn(step === steps ? styles.active : '', styles.subtitle)}>{`${step}/${steps}`}</h5>
    </div>
  )
}

export default ProgressMeter