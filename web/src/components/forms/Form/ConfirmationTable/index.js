import React from 'react'
import * as styles from './style.module.css'

export const Row = ({children}) => {
  return (
    <tr className={styles.row}>
      {children}
    </tr>
  )
} 

export const Header = ({children}) => {
  return (
    <thead className={styles.header}>
      {children}
    </thead>
  )
}

export const Body = ({children}) => {
  return (
    <tbody className={styles.body}>
      {children}
    </tbody>
  )
}

export const HeaderCell = ({children}) => {
  return (
    <th className={styles.cell}>
      {children}
    </th>
  )
}


export const Cell = ({children}) => {
  return (
    <td className={styles.cell}>
      {children}
    </td>
  )
}

export const ConfirmationTable = ({children}) => {
  return (
    <table className={styles.root}>
      {children}
    </table>
  )
}