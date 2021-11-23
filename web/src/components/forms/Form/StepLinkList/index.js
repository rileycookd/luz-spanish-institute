import React, { useState, useEffect } from 'react'
import * as styles from './style.module.css'
import StepLink from './StepLink'

export { StepLink }

export const StepLinkList = ({ children }) => {

  const [childrenWithProps, setChildrenWithProps] = useState([])

  useEffect(() => {
    const mappedChildren = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { 
          index: index
        });
      }
      return child;
    })

    setChildrenWithProps(mappedChildren)
  }, [])

  return (
    <ul className={styles.root}>
      {childrenWithProps && childrenWithProps}
    </ul>
  )
}