import React, { useState, useEffect, useRef } from 'react'
import { cn } from '../../lib/helpers'
import * as styles from './fill-in-the-blank.module.css'

function QuizFillInTheBlank (props) {
  const {
    blockKey,
    questions,
    setNumPoints,
    setNumCorrect,
    isQuizFinished,
    setQuizNumAnswered,
    setTotalNum
  } = props

  const [blankInputs, setBlankInputs] = useState([])
  const [questionValues, setQuestionValues] = useState([])

  const handleChange = (e, i) => {
    if(!blankInputs[i].value && e.target.value) {
      setQuizNumAnswered(prevState => prevState + 1)
    } else if(blankInputs[i].value && !e.target.value) {
      setQuizNumAnswered(prevState => prevState - 1)
    }
    blankInputs[i].value = e.target.value
    if(blankInputs[i].answers.indexOf(e.target.value) !== -1) {
      if(!blankInputs[i].state) {
        blankInputs[i].state = true
        setNumCorrect(prevState => prevState + 1)
      }
    } else if(blankInputs[i].state) {
      if(blankInputs[i].state) {
        blankInputs[i].state = false
        setNumCorrect(prevState => prevState - 1)
      }
    }
    setBlankInputs([...blankInputs])
  }

  useEffect(() => {
    const regQ = /(\[.*?\])/g;
    const regA = /\[|\]/g;
    let inputIndex = -1
    setQuestionValues(
      questions.map(q => {
        const parts = q.trim().split(regQ)
        const identifyInputs = parts.map(p => {
          if(p.match(regA)) {
            const answers = p.replace(regA,'').split(';').map(i => i.trim())
            setBlankInputs(prevState => [...prevState, {
              answers: answers,
              value: '',
              state: false
            }])
            inputIndex++
            return inputIndex
          }
          return p
        })
        return identifyInputs
      })
    )
    setTotalNum(prevState => prevState + inputIndex + 1)
    setNumPoints(prevState => prevState + inputIndex + 1)

    return (inputIndex) => {
      setNumPoints(prevState => prevState - inputIndex - 1);
      setTotalNum(prevState => prevState - inputIndex - 1);
    };
  }, [questions])

  const renderQuestion = (q) => {
    const addInputsToQ = q.map((p) => {
      if(typeof p === "number") {
        return (
          <span key={`${blockKey}-blank-${p}`}>
            <input 
              type="text" 
              className={cn(styles.input, isQuizFinished && (blankInputs[p].state ? styles.success : styles.error))} 
              value={blankInputs[p].value} 
              disabled={isQuizFinished}
              onChange={(e) => handleChange(e, p)}
            />
          </span>
        )
      }
      return p
    })

    return (
      <h5 className={styles.questionTitle}>{addInputsToQ}</h5>
    )
  }

  return (
    <form className={styles.root}>
      <ol className={styles.list}>
        {questionValues.length && questionValues.map((q, i) => (
          <li className={styles.questionWrapper} key={`${blockKey}-question-${i}`}>
            {renderQuestion(q)}
          </li>
        ))}
      </ol>
    </form>
  )
}

export default QuizFillInTheBlank