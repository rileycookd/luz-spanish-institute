import React from 'react'
import styles from './quote.module.css'

function Quote (props) {
  let credit = ''
  if(props.creditName) {
    credit = props.creditName;
  }
  if(props.creditSource) {
    credit = credit.concat(`, ${props.creditSource}`)
  }

  return (
    <blockquote className={styles.root}>
      <p className={styles.text}>"{props.quote}"</p>
      {credit && (
        <small className={styles.caption}>&mdash;{credit}</small>
      )}
    </blockquote>
  )
}

export default Quote