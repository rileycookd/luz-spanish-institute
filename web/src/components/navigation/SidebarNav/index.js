import React from 'react'
import SidebarLink from './SidebarLink'
import * as styles from './style.module.css'
import logoUrl, {ReactComponent as Logo} from '../../../images/logo.svg';

export { SidebarLink }

export const SidebarNav = ({children, ...props}) => {
  return (
    <aside className={styles.root} {...props}>
      <div className={styles.header}><img src={logoUrl} /></div>
      <ul className={styles.list}>
        {children}
      </ul>
    </aside>
  )
}
