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
    setTotalNumCorrect,
  } = props

  const [numPoints, setNumPoints] = useState(0)
  const [numCorrect, setNumCorrect] = useState(0)
  const [childrenWithProps, setChildrenWithProps] = useState([])

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
    if(isQuizFinished) {
      setTotalNumCorrect(prevState => prevState + numCorrect)
    }
  }, [isQuizFinished])

  return (
    <div className={styles.root}>      
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