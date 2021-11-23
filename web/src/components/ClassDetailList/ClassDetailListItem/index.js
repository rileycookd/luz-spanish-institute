import React, { useEffect, useState } from 'react'
import * as styles from './style.module.css'
import { format, parseISO } from 'date-fns'
import { IoChevronForward as ChevronIcon } from 'react-icons/io5'
import Homework from './Homework'
import Resource from './Resource'

// rename to ClassListItem ?

function ClassDetail (props) {

  console.log(props)

  const [monthString, setMonthString] = useState('')
  const [dateString, setDateString] = useState('')
  const [dayString, setDayString] = useState('')

  useEffect(() => {
    const startDate = parseISO(props.start)
    const date = format(startDate, 'dd:LLL').split(':')
    setDateString(date[0])
    setMonthString(date[1])
    setDayString(format(startDate, 'EEEE'))

  }, [props.start])
  


  return (
    <div className={styles.root}>
      <div className={styles.dateContainer}>
        <h6 className={styles.date}>{dateString}</h6>
        <h6 className={styles.date}>{monthString}</h6>
      </div>
      <div className={styles.header}>
        <h3 className={styles.title}>{props.title || dayString}</h3>
        <h5 className={styles.subtitle}>Private lessons</h5>
        <ChevronIcon className={styles.chevron} />
      </div> 
    </div>
  )
}

export default ClassDetail