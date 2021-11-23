import React, { useState, useEffect } from 'react'
import * as styles from './style.module.css'
import Step from './Step'

export { Step }

export const StepList = ({ children, currentStep }) => {

  const [childrenWithProps, setChildrenWithProps] = useState([])

  useEffect(() => {
    const mappedChildren = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { 
          index: index,
          currentStep: currentStep
        });
      }
      return child;
    })

    setChildrenWithProps(mappedChildren)
  }, [currentStep])

  return (
    <>
      {currentStep < childrenWithProps.length && (
        <ul className={styles.root}>
        
          {childrenWithProps && childrenWithProps}
        </ul>
      )}
    </>
  )
}