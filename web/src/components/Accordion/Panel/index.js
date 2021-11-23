import React, { useState, useEffect } from 'react'
import * as styles from './style.module.css'

const Panel = ({children, activeTab, tabIndex, activateTab}) => {


  const [childrenWithProps, setChildrenWithProps] = useState([])

  useEffect(() => {
    const mappedChildren = React.Children.map(children, (child) => {

      if (React.isValidElement(child)) {
        return React.cloneElement(child, { 
          activateTab: activateTab,
          activeTab: activeTab,
          tabIndex: tabIndex
        });
      }
    
      return child;
    });
    setChildrenWithProps(mappedChildren)
  }, []) 

  return (
    <div className={styles.root}>
      {childrenWithProps}
    </div>
  )
}

export default Panel