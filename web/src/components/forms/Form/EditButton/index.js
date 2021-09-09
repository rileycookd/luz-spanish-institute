import React from 'react'
import { MdEdit as EditIcon } from 'react-icons/md'
import { IoClose as CancelIcon } from 'react-icons/io5'
import * as styles from './style.module.css'


const EditButton = (props) => {
  const {
    active,
    onClick
  } = props

  return (
    <button 
      className={styles.root} 
      onClick={(e) => onClick(e)}
      {...props}>
      {active
      ? (
        <>
          <CancelIcon className={styles.icon} />
          <span className={styles.label}>Cancel</span>
        </>
      )
      : (
        <>
          <EditIcon className={styles.icon} />
          <span className={styles.label}>Edit</span>
        </>
      )
      }
    </button>
  )
}

export default EditButton