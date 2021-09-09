import React, { useEffect, useState } from 'react'
import * as styles from './style.module.css'
import { parseISO, format, formatRelative } from 'date-fns'

import { BsThreeDotsVertical as DotsIcon } from 'react-icons/bs'
import { IoMdCalendar as CalendarIcon } from 'react-icons/io'

function ClassEvent(props) {

  console.log(props)

  const [dayString, setDayString] = useState('')
  const [dateString, setDateString] = useState('')

  useEffect(() => {
    const startDate = parseISO(props.start)
    setDateString(format(startDate, 'dd LLL'))

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

  console.log('========')
  console.log(dayString)
  console.log(dateString)

  return (
    <div className={styles.root}>
      <CalendarIcon />
      <div className={styles.content}>
        <h3 className={styles.title}>{dayString} <span className={styles.titleSpan}>{dateString}</span></h3>
        <p className={styles.subtitle}>{format(parseISO(props.start), 'h:mm')} &mdash; {format(parseISO(props.end), 'h:mmaaa')}</p>
      </div>
      <DotsIcon className={styles.dots} />
    </div>
  )
}

export default ClassEvent