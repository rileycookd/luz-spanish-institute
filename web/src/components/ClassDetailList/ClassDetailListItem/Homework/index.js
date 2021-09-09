import React from 'react'
import * as styles from './style.module.css'
import { MdAssignment as Icon } from 'react-icons/md'
import { format, parseISO } from 'date-fns'

function Homework(props) {
  console.log(props)
  
  return (
    <div className={styles.root}>
      <Icon />
      <div className={styles.content}>
        <h3 className={styles.title}>{props.title}</h3>
        {props.due && (<h5 className={styles.subtitle}>{format(parseISO(props.due), 'dd LLL, H:mmaaa')}</h5>)}
      </div>
    </div>
  )
}

export default Homework