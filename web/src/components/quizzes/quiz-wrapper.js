import React, { useEffect, useState } from 'react'
import { cn } from '../../lib/helpers'
import * as styles from './quiz-wrapper.module.css'
import { FaCheckCircle } from 'react-icons/fa'

function QuizWrapper (props) {
  const {
    title,
    instructions,
    children,
    isQuizFinished,
  } = props

  const [numPoints, setNumPoints] = useState(0)
  const [numCorrect, setNumCorrect] = useState(0)
  const [isPerfect, setIsPerfect] = useState(false)
  const [childrenWithProps, setChildrenWithProps] = useState([])
  const [wrapperStyle, setWrapperStyle] = useState(styles.root)

  useEffect(() => {
    setChildrenWithProps(React.Children.map(children, (child) => {

      if (React.isValidElement(child)) {
        return React.cloneElement(child, { 
          setNumPoints: setNumPoints,
          setNumCorrect: setNumCorrect
        });
      }
    
      return child;
    }))
  }, [children]) 

  useEffect(() => {
    let styleObject = styles.root
    if(isQuizFinished) {
      isPerfect
      ? styleObject = cn(styles.root, styles.success)
      : styleObject = cn(styles.root, styles.error)
    }
    setWrapperStyle(styleObject)
  }, [isQuizFinished])

  return (
    <div className={wrapperStyle}>      
      <div className={styles.titles}>
        {title && <h4 className={styles.title}>{title}</h4>}
        {instructions && <p className={styles.instructions}>{instructions}</p>}
      </div>
      {title && <hr className={styles.divider} />}
        {childrenWithProps}
      <hr className={styles.divider} />
      <div className={styles.resultWrapper}>
        <FaCheckCircle 
          className={styles.success} 
          style={isQuizFinished && (numCorrect === numPoints) ? {} : {visibility: 'hidden'}} />

        {isQuizFinished 
        ? (
          <h5>{numCorrect}/{numPoints}</h5>
        ) : (
          <h5>{numPoints} points</h5>
        )} 
      </div>
    </div>
  )
}

export default QuizWrapper