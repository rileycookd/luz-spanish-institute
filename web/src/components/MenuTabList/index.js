import React, { useEffect, useState } from 'react'
import MenuTab from './MenuTab'
import * as styles from './style.module.css'
import { cn } from '../../lib/helpers'
import MenuLink  from './MenuLink'
import { Accordion } from '../Accordion'

export { MenuTab, MenuLink }

export const MenuTabList = ({ children }) => {

  const [activeTab, setActiveTab] = useState(null)
  const [childrenWithProps, setChildrenWithProps] = useState([])

  const activateTab = (index) => {
		setActiveTab(prev => (
      prev === index ? -1 : index
    ));
	}

  useEffect(() => {
    let indexCounter = -1
    const mappedChildren = React.Children.map(children, (child) => {

      if (React.isValidElement(child)) {
        indexCounter++
        return React.cloneElement(child, { 
          setActiveTab: activateTab,
          activeTab: activeTab,
          tabIndex: indexCounter
        });
      }
    
      return child;
    });
    setChildrenWithProps(mappedChildren)
  }, [activeTab]) 

  return (
    <div className={styles.root}>
      {childrenWithProps}
    </div>
  )
}
