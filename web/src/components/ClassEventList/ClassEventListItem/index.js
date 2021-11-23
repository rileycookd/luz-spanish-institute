import React, { useEffect, useState } from 'react'
import * as styles from './style.module.css'
import { parseISO, format, formatRelative } from 'date-fns'

import { BsThreeDotsVertical as DotsIcon } from 'react-icons/bs'

function ClassEvent(props) {

  console.log(props)

  const [dayString, setDayString] = useState('')
  const [dateString, setDateString] = useState('')
  const [monthString, setMonthString] = useState('')

  useEffect(() => {
    const startDate = parseISO(props.start)
    const date = format(startDate, 'dd:LLL').split(':')
    setDateString(date[0])
    setMonthString(date[1])

    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if(startDate.getDate() == today.getDate() 
      && startDate.getMonth == today.getMonth 
      && startDate.getFullYear() == today.getFullYear()) {
        setDayString('Today')
    } else if(startDate.getDate() == tomorrow.getDate() 
      && startDate.getMonth == tomorrow.getMonth 
      && startDate.getFullYear() == tomorrow.getFullYear()) {
        setDayString('Tomorrow')
    } else {
      setDayString(format(startDate, 'EEEE'))
    }
  }, [props.start])

  return (
    <li className={styles.root}>
      <div className={styles.dateContainer}>
        <h6 className={styles.date}>{dateString}</h6>
        <h6 className={styles.date}>{monthString}</h6>
      </div>
      <div className={styles.timeContainer}>
        <p className={styles.time}>{dayString}</p>
        <p className={styles.time}>{format(parseISO(props.start), 'h:mm')} &mdash; {format(parseISO(props.end), 'h:mmaaa')}</p>
      </div>
      <DotsIcon className={styles.dots} />
    </li>
  )
}

export default ClassEvent