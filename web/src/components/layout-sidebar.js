import React from 'react'
import * as styles from './layout-sidebar.module.css'
import { cn } from '../lib/helpers'
import CTALink from './CTALink'

export function SidebarCta (props) {
  const {
    title,
    subtitle,
    cta
  } = props

  return (
    <div className={styles.cta}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && (
        <p className={styles.subtitle}>{subtitle}</p>
      )}
      {cta && (
        <CTALink {...cta} />
      )}
    </div>
  )
}

function LayoutSidebar ({children, style, reverse, scroll, wide}) {
  return (
    <div 
      style={style} 
      className={cn(
        styles.root, 
        reverse && styles.reverse, 
        scroll && styles.scroll,
        wide && styles.wide
      )}
    >
      {children}
    </div>
  )
}

export default LayoutSidebar