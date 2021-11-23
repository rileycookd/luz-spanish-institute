import React from 'react'
import * as styles from './style.module.css'
import { parseISO, format } from 'date-fns'
import { 
  IoIosPeople as ClassSizeIcon, 
} from 'react-icons/io'

import { 
  IoLanguage as LanguageIcon,
  IoCalendar as CalendarIcon,
} from 'react-icons/io5'

import {
  AiOutlineNumber as NumberIcon,
} from 'react-icons/ai'

import { capitalizeWords } from '../../../../../../lib/helpers'

const RegistrationListItem = (props) => {
  const {
    classType,
    _createdAt,
    students,
    language,
    schedule,
  } = props

  console.log("REGISTRATION LIST ITEM: ", props)

  return (
    <li className={styles.root}>
      <div className={styles.header}>
        <h3 className={styles.title}>{classType}</h3>
        <p className={styles.status}>Active</p>

      </div>
      <div className={styles.content}>
        {/* <h5 className={styles.date}>{format(parseISO(_createdAt), 'dd MMM yyyy')}</h5> */}
        <div className={styles.contentItem}>
          <ClassSizeIcon />
          <p className={styles.subtitle}>
            {students.map((s, i) => (
              i < students.length - 1
              ? `${s.name}, `
              : `${s.name}`
            ))}
          </p>
        </div>
        <div className={styles.contentItem}>
          <LanguageIcon />
          <p className={styles.subtitle}>{language}</p>
        </div>
        <div className={styles.contentItem}>
          <CalendarIcon />
          <ul className={styles.schedule}>
            {schedule?.map(d => (
              <div key={d._key} className={styles.scheduleItem}>
                <p className={styles.day}>{capitalizeWords(d.day)}</p>
                <p className={styles.time}>{d.time.start} &mdash; {d.time.end}</p>
              </div>
            ))}
          </ul>
        </div>

      </div>
      
      <div className={styles.footer}>
        <div className={styles.cta}>
          <p className={styles.remaining}>30 remaining</p>
          <button className={styles.button}>Add classes</button>
        </div>

      </div>
    </li>
  )
}

export default RegistrationListItem