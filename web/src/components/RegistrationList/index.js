import React from 'react'
import { useGetUserRegistrationsQuery, useGetCurrentUserQuery } from '../../services/sanityApi'
import { useIdentityContext } from "react-netlify-identity-gotrue"
import * as styles from './style.module.css'
import RegistrationListItem from './RegistrationListItem'
import { IoAdd as AddIcon } from 'react-icons/io5'
import { Link } from 'gatsby'
 
const RegistrationList = (props) => {

  const identity = useIdentityContext()
  const { 
    data: userData, 
    error: userError, 
    isLoading: isUserLoading 
  } = useGetCurrentUserQuery(identity.user.id)

  console.log("USER DATA: ", userData)

  return ( 
    <div>
      <h2 className={styles.title}>Current Courses</h2>
      {userError ? (
        <p>Sorry, we couldn't load your registrations. Try again later</p>
      ) : isUserLoading ? (
        <p>Loading...</p>
      ) : userData?.registrations?.length ? (
        <ul className={styles.list}>
          {userData.registrations.map(r => (
            <li><RegistrationListItem key={r._id} {...r} /></li>
          ))}
          <div className={styles.actions}><Link to="/app/enrollment/new" className={styles.button}><AddIcon /> Enroll</Link></div>
        </ul>
      ) : (
        <div className={styles.list}>
          <p>You aren't currently registered for any classes. Click "enroll" to get started.</p>
          <div className={styles.actions}><Link to="/app/enrollment/new" className={styles.button}><AddIcon /> Enroll</Link></div>
        </div>
      )}
    </div>
  )
}

export default RegistrationList