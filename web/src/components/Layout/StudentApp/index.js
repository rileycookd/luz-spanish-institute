import React from 'react'
import * as styles from './style.module.css'

import { SidebarNav, SidebarLink } from '../../navigation/SidebarNav'

import { 
  IoPersonCircleOutline as AccountIcon, 
  IoPieChartOutline as ResourcesIcon, 
  IoSchool as RegisterIcon,
  IoMailOutline as MailIcon,
  
} from 'react-icons/io5'

import { 
  MdDashboard as DashboardIcon,
} from "react-icons/md"

function StudentApp (props) {

  const {
    children,
    navLinks,
  } = props;

  return (
    <div className={styles.root}>
      <SidebarNav>
        <SidebarLink to="/app/"><DashboardIcon /> Dashboard</SidebarLink>
        <SidebarLink to="/app/resources"><ResourcesIcon /> Resources</SidebarLink>
        <SidebarLink to="/app/messages"><MailIcon /> Messages</SidebarLink>
        <SidebarLink to="/app/account"><AccountIcon /> Account</SidebarLink>
      </SidebarNav>
      <div className={styles.content}>
        {children}
      </div>
    </div> 
  )
}

export default StudentApp
