import React from 'react'
import ClassEventListItem from './ClassEventListItem'
import * as styles from './style.module.css'

function ClassEventList(props) {
  const {
    children
  } = props


  return (
    <ul className={styles.root}>
      <li className={styles.group}>
        <h3 className={styles.title}>Next class</h3>
        {children && children.length && <ClassEventListItem {...children[0]}/>}
      </li>
      <li className={styles.group}>
        {children && children.length && <h3 className={styles.title}>Upcoming classes ({children.length - 1})</h3>}
        {children?.filter((c, i) => i > 0).map(c => <ClassEventListItem {...c} />)}
      </li>
    </ul>
  )
}

export default ClassEventList