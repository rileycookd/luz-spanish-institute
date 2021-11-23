import React from 'react'
import { cn } from '../../../lib/helpers'
import * as styles from './style.module.css'

const PanelHeader = (props) => {
  const {
    children,
    className,
    activateTab,
    activeTab,
    tabIndex
  } = props

  return (
    <div className={cn(styles.root, className)} onClick={() => activateTab(tabIndex)}>
      {children}
    </div>
  )
}

export default PanelHeader