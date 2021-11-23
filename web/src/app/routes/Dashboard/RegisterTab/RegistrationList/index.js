import React from 'react'
import { useGetUserRegistrationsQuery, useGetCurrentUserQuery } from '../../../../../services/sanityApi'
import { useIdentityContext } from "react-netlify-identity-gotrue"
import * as styles from './style.module.css'
import RegistrationListItem from './RegistrationListItem'

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
      <h1>Registrations List</h1>
      {userError ? (
        <p>Sorry, we couldn't load your registrations. Try again later</p>
      ) : isUserLoading ? (
        <p>Loading...</p>
      ) : userData?.registrations?.length ? (
        <ul className={styles.list}>
          {userData.registrations.map(r => (
            <RegistrationListItem key={r._key} {...r} />
          ))}
        </ul>
      ) : (
        <p>You aren't currently registered for any classes. </p>
      )}
    </div>
  )
}

export default RegistrationList