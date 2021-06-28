import React, { useEffect, useState } from 'react'
import * as styles from './ordering.module.css'
import { cn } from '../../lib/helpers'

function QuestionOrdering (props) {
  const {
    blockKey,
    question,
    index,
    setQuestionsState,
    questionsState,
    isQuizFinished,
    setNumCorrect,
    setQuizNumAnswered,
  } = props

  const [selectedOption, setSelectedOption] = useState(null)
  const [correctCounter, setCorrectCounter] = useState({previous: 0, current: 0})


  const handleSelectOption = (i) => {
    if(!isQuizFinished) {
      if(selectedOption !== i) {
        setSelectedOption(i)
      } else {
        setSelectedOption(null)
      }
    }
  }
  
  const handleAddItem = () => {
    if(selectedOption !== null) {
      const newQuestionsState = questionsState.map((q, qi) => {
        if(qi === index) {
          q.answer = [...q.answer, q.shuffle[selectedOption]]
          if(q.answer.length === q.items.length) {
            setQuizNumAnswered(prevState => prevState + 1)
          }
          q.currentOrder = [...q.currentOrder, selectedOption]
          if(
            !q.state && 
            q.answer.length === q.items.length && 
            JSON.stringify(q.answer)==JSON.stringify(q.items)
          ) {
            q.state = true
            setNumCorrect(prevState => prevState + 1)
          }
          return q
        }
        return q
      })
      setQuestionsState([...newQuestionsState])
      setSelectedOption(null)

    }
  }

  const handleRemoveOption = (i) => {
    if(selectedOption === null && !isQuizFinished) {
      let answerArray = questionsState[index].answer
      if(answerArray.length === questionsState[index].items.length) {
        setQuizNumAnswered(prevState => prevState - 1)
      }
      let currentOrderArray = questionsState[index].currentOrder
      answerArray.splice(i, 1)
      currentOrderArray.splice(i, 1)
      const newQuestionsState = questionsState.map((q, qi) => {
        if(qi === index) {
          q.answer = [...answerArray]  
          q.currentOrder = [...currentOrderArray]
          if(q.state) {
            setNumCorrect(prevState => prevState - 1)
            q.state = false
          }
          return q
        }
        return q
      })
      setQuestionsState([...newQuestionsState])
    }
  }

  const renderOption = (item, i) => {
    if(questionsState[index].currentOrder.indexOf(i) === -1) {
      return (
        <p 
          key={`${blockKey}-option-${item}-${i}`} 
          className={cn(
            styles.option, 
            selectedOption === i && styles.selected,
            isQuizFinished && styles.disabled
          )}
          onClick={() => handleSelectOption(i)}
        >
          {item}
        </p>
      )
    }
  }

  return (
    <div className={styles.questionContainer}>
      <div 
        className={cn(
          styles.answerBox, 
          selectedOption !== null && styles.selectMode,
          isQuizFinished && !questionsState[index].answer.length && styles.error
        )}
        onClick={() => selectedOption !== null && handleAddItem()}
      >
        {!questionsState[index].answer.length 
        ? (
          <p 
            className={styles.answerPlaceholder}
          >
            {!isQuizFinished && (selectedOption === null ? 'Select an option' : 'Click to add')}
          </p>
        ) : (
          <>
            {questionsState[index].answer.map((a, i) => (
              <p 
                key={`${blockKey}-answer-${a}-${i}`} 
                className={cn(
                  styles.option, 
                  styles.answer, 
                  selectedOption !== null && styles.selectMode,
                  isQuizFinished && styles.disabled,
                  isQuizFinished && !questionsState[index].state && styles.error
                )}
                onClick={() => handleRemoveOption(i)}
              >
                {a}
              </p>
            ))}
          </>
        )}
      </div>
      <div className={styles.optionsContainer}>
        {questionsState[index].shuffle.map((item, i) => (
          renderOption(item, i)
        ))}
      </div>
    </div>
  )
}

function QuizOrdering (props) {
  const {
    blockKey,
    questions,
    isQuizFinished,
    setNumPoints,
    setTotalNum,
    setNumCorrect,
    setQuizNumAnswered,
  } = props

  const [questionsState, setQuestionsState] = useState([])

  const shuffle = (array) => {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  useEffect(() => {
    setQuestionsState(questions.map(q => {
      return {
        ...q,
        shuffle: shuffle([...q.items]),
        answer: [],
        currentOrder: [],
        state: false
      }
    }))
    setTotalNum(prevState => prevState + questions.length)
    setNumPoints(prevState => prevState + questions.length)

    return (questions) => {
      setNumPoints(prevState => prevState - questions.length);
      setTotalNum(prevState => prevState - questions.length);
    }
  }, [questions])

  return (
    <div className={styles.root}>
      {questionsState.map((q, i) => (
        <QuestionOrdering 
          key={`${blockKey}-question-${q._key}`}
          blockKey={blockKey}
          question={q}
          index={i}
          setNumCorrect={setNumCorrect}
          isQuizFinished={isQuizFinished}
          setQuizNumAnswered={setQuizNumAnswered}
          questionsState={questionsState}
          setQuestionsState={setQuestionsState}
        />
      ))}
    </div>
  )
}

export default QuizOrdering