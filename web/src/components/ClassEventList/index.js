import React, { useEffect, useState } from 'react'
import ClassEventListItem from './ClassEventListItem'
import * as styles from './style.module.css'
import { parseISO } from 'date-fns'

import { useGetCurrentUserQuery } from '../../services/sanityApi'
import { useIdentityContext } from "react-netlify-identity-gotrue"

function ClassEventList(props) {

  const identity = useIdentityContext()
  const { data, error, isLoading } = useGetCurrentUserQuery(identity.user.id)

  const classes = data?.classes?.filter(c => parseISO(c.start) > new Date())

  return (
    <>

      { error ? (

        <p>Whoops, something went wrong. Try again later</p>

      ) : isLoading ? (

        <p>Loading...</p>

      ) : data ? (

        <>
          {classes?.length ? (
            <>
              <h3 className={styles.title}>Upcoming classes ({classes.length})</h3>
              <ul className={styles.list}>
                {classes.map(c => <ClassEventListItem {...c} />)}
              </ul>
              
            </>
          ) : (
            <p>You don't have any upcoming classes</p>
          )}
        </>
        
      ) : null}
    </>
  )
}

export default ClassEventList