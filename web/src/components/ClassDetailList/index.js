import React from 'react'
import ClassDetailListItem from './ClassDetailListItem'
import * as styles from './style.module.css'

function ClassDetailList(props) {
  const {
    children
  } = props

  return (
    <ul className={styles.root}>
      <h3 className={styles.title}>Past classes</h3>
      {children?.map(c => <li><ClassDetailListItem classData={c} /></li>)}
    </ul>
  )
}

export default ClassDetailList