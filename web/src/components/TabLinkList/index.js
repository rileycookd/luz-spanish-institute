import React from 'react'
import TabLink from './TabLink'
import * as styles from './style.module.css'
import { cn } from '../../lib/helpers'

export { TabLink }

export const TabLinkList = ({ children, dark }) => {
  return (
    <ul className={dark ? cn(styles.tabList, styles.dark) : styles.tabList}>
      {children}
    </ul>
  )
}

