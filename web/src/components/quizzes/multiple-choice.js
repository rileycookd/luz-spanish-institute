import React, { useState, useEffect } from 'react'
import * as styles from './multiple-choice.module.css'
import { cn } from '../../lib/helpers'

function QuizMultipleChoice (props) {

  // ********
  // REFACTOR:
  // ********

  // instead of finding ids, use indexes?? Use original questions array for optionsState???
  // Change numAnswerd in the handleChange???

  // Create individual question and option components to maintain individual state? Or not necessary?

  // useRef hook to change classes to label/label? Avoid reRendering all components every state change

  const {
    blockKey,
    questions,
    setNumPoints,
    setTotalNum,
    setQuizNumAnswered,
    setNumCorrect,
    isQuizFinished,
  } = props

  const [numAnswered, setNumAnswered] = useState(0);
  const [optionsState, setOptionsState] = useState([]);

  const handleChange = (e, questionId, selectMultiple) => {
    const { id, checked } = e.target;
    setOptionsState(prevState => prevState.map(q => {
      if(q.id === questionId) {
        let isCorrect = []
        q.options.map(o => {
          if(o.id === id) {
            o.isChecked = checked
          } else if(!selectMultiple) {
            o.isChecked = false
          }
          if(o.correct && o.isChecked || !o.correct && !o.isChecked) {
            isCorrect.push(true)
          } else {
            isCorrect.push(false)
          }
          return o
        })
        if(isCorrect.find(i => i === false) === undefined) {
          q.correct = true
        } else {
          q.correct = false
        }
      }
      return q
    }))
  };

  const renderOptions = (o, questionId, selectMultiple=false) => {
    const optionId = `${blockKey}-${o._key}`

    return (
      <div key={optionId} className={styles.inputGroup}>
        <input 
          className={cn(styles.input, (isQuizFinished && (o.correct ? styles.success : styles.error)))}
          type={selectMultiple ? "checkbox" : "radio"} 
          value={o.option} 
          name={questionId} 
          disabled={isQuizFinished}
          id={optionId}
          onChange={(e) => handleChange(e, questionId, selectMultiple)}
        />
        <label 
          className={cn(styles.label, (isQuizFinished && (o.correct ? styles.success : styles.error)))}
          htmlFor={optionId}
          disabled={isQuizFinished}
        >
          {o.option}
        </label>
      </div>
    )
  }

  const renderQuestions = (q) => {
    const questionId = `${blockKey}-${q._key}`

    return (
      <div className={styles.questionWrapper} key={questionId}>
        <h5 className={styles.questionTitle}>{q.question}</h5>
        <fieldset className={styles.optionsWrapper} id={questionId}>
          {q.options && q.options.map(o => renderOptions(o, questionId, q.selectMultiple))}
        </fieldset>
      </div>
    )
  }

  const mapOptionsToState = (options, selectMultiple) => {
    return options.map(o => {
      const optionId = `${blockKey}-${o._key}`
      let addClass = null
      if(o.correct) addClass = styles.correction
      return {
        id: optionId,
        correct: o.correct ? true : false, 
        selectMultiple: selectMultiple, 
        isChecked: false,
      }
    })
  }

  useEffect(() => {
    questions && questions.map(q => {
      const questionId = `${blockKey}-${q._key}`
      if(optionsState.find(q => q.id === questionId) === undefined) {
        setNumPoints(prevState => prevState + 1)
        setTotalNum(prevState => prevState + 1)
        setOptionsState(prevState => [...prevState, {
          id: questionId, 
          options: mapOptionsToState(q.options, q.selectMultiple), 
          correct: false
        }])
      }
    })
  }, [questions]);

  useEffect(() => {
    let numCorrectAnswers = 0
    let countAnswers = 0
    optionsState.map(q => {
      if(q.correct) numCorrectAnswers++
      if(q.options.find(o => o.isChecked) !== undefined) {
        countAnswers++
      }
    })
    if(numAnswered !== countAnswers) {
      setQuizNumAnswered(prevState => prevState + (countAnswers - numAnswered))
      setNumAnswered(countAnswers)
    }
    setNumCorrect(numCorrectAnswers)
  }, [optionsState])
  
  return (
    <form className={styles.root}>
      {questions && questions.map(q => renderQuestions(q))}
    </form>
  )
}

export default QuizMultipleChoice