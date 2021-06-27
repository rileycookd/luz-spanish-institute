import React, { useState, useEffect } from 'react'
import * as styles from './fill-in-the-blank-text.module.css'
import { cn } from '../../lib/helpers'

function QuizFillInTheBlankText (props) {
  const {
    blockKey,
    text,
    setNumPoints,
    setNumCorrect,
    setTotalNum,
    isQuizFinished,
    setQuizNumAnswered,
  } = props

  const [blankInputs, setBlankInputs] = useState([])
  const [textState, setTextState] = useState([])

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
    const regT = /(\[.*?\])/g;
    const regA = /\[|\]/g;
    let inputIndex = -1
    const parts = text.trim().split(regT)
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
    setTotalNum(prevState => prevState + inputIndex + 1)
    setNumPoints(prevState => prevState + inputIndex + 1)
    setTextState(identifyInputs)

    return (inputIndex) => {
      setNumPoints(prevState => prevState - inputIndex - 1);
      setTotalNum(prevState => prevState - inputIndex - 1);
    };
  }, [text])

  const renderPart = (p) => {
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
  }

  return (
    <form className={styles.root}>
      <p className={styles.text}>
        {textState.length && textState.map((p, i) => (
          <span key={`${blockKey}-text-part-${i}`}>
            {renderPart(p)}
          </span>
        ))}
      </p>
    </form>
  )
}

export default QuizFillInTheBlankText