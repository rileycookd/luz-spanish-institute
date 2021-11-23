import React from 'react'
import * as styles from './style.module.css'

import { 
  IoNotificationsOutline as NotificationsIcon,
  IoChevronDown as ChevronDownIcon,
} from 'react-icons/io5'

const StudentAppHeader = (props) => {

  const {
    children,
    title,
  } = props

  return (
    <div className={styles.header}>
      {title && (<h1 className={styles.title}>{title}</h1>)}
      <div className={styles.userLinks}>
        <div className={styles.button}><NotificationsIcon /></div>
        <div className={styles.currentUser}>
          <img src="https://source.unsplash.com/mjRwhvqEC0U/150x150" />
          <div className={styles.userTitles}>
            <h5 className={styles.name}>Rodrigo Gomez</h5>
            <p className={styles.role}>Student</p>
          </div>
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  )
}

export default StudentAppHeader