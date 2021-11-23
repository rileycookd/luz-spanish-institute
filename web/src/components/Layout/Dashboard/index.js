import React from 'react'
import * as styles from './style.module.css'

import StudentAppHeader from '../StudentAppHeader'

import ClassEventList from '../../ClassEventList'
import ClassDetailList from '../../ClassDetailList'
import RegistrationList from '../../RegistrationList'



function Dashboard (props) {

  const {
    children,
    navLinks,
  } = props;

  return (
    <>
      <StudentAppHeader title="My Dashboard">

      </StudentAppHeader>
      <div className={styles.content}>

        <div className={styles.main}>
          <RegistrationList />
          <ClassDetailList />
        </div>
        <div className={styles.sidebar}>

          <div className={styles.upcomingList}>
            <ClassEventList />
          </div>

        </div>
      </div>    
    </>
  )
}

export default Dashboard
