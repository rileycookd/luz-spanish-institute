import React from 'react'
import ClassDetailListItem from './ClassDetailListItem'
import * as styles from './style.module.css'
import { parseISO } from 'date-fns'
import { useGetCurrentUserQuery } from '../../services/sanityApi'
import { useIdentityContext } from "react-netlify-identity-gotrue"


function ClassDetailList(props) {

  const identity = useIdentityContext()
  const { data, error, isLoading } = useGetCurrentUserQuery(identity.user.id)

  const classes = data?.classes?.filter(c => parseISO(c.start) < new Date())
  

  return (
    <div className={styles.root}>

      { error ? (

        <p>Whoops, something went wrong. Try again later</p>

      ) : isLoading ? (

        <p>Loading...</p>

      ) : data ? (

        <>
          {classes?.length ? (
            <>
              <h3 className={styles.title}>Past classes</h3>
              <ul className={styles.container}>
                {classes?.map(c => <li><ClassDetailListItem {...c} /></li>)}
              </ul>      
            </>
          ) : (
            <p>You don't have any upcoming classes</p>
          )}
        </>
        
      ) : null}
    </div>
  )
}

export default ClassDetailList