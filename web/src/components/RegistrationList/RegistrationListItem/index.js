import React from 'react'
import * as styles from './style.module.css'

import Flag from 'react-world-flags'

import { IoChevronForward as ChevronIcon, IoLanguage as LanguageIcon } from 'react-icons/io5'
import { Link } from 'gatsby'
import { cn } from '../../../lib/helpers'



import { capitalizeWords } from '../../../lib/helpers'

const RegistrationListItem = (props) => {
  const {
    classType,
    _createdAt,
    _id,
    students,
    language,
    schedule,
    state,
  } = props

  console.log("REGISTRATION DETAILS: ", classType)

  return (
    <Link className={styles.root} to={`/app/enrollment/${_id}`}>
      <div className={styles.header}>
        {language.code ? (
          <Flag className={styles.image} code={language.code} height="48" />
        ) : (
          <LanguageIcon />
        )}
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{classType.title}</h3>
        </div>
      </div>
      
      <div className={styles.footer}>
        <div className={styles.cta}>
          <p className={styles.remaining}>30 classes left</p>
          {state === "pending" ? (
            <p className={cn(styles.status, styles.pending)}>Pending</p>
          ) : state === 'active' ? (
            <p className={cn(styles.status, styles.active)}>Active</p>
          ) : null}
        </div>
        <ChevronIcon />
      </div>
    </Link>
  )
}

export default RegistrationListItem