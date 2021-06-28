import React, { useEffect, useState } from 'react'
import * as styles from './quiz-inline.module.css'
import * as buttonStyles from '../CTALink.module.css'
import { cn } from '../../lib/helpers'
import { RiAddFill } from 'react-icons/ri'

import QuizMultipleChoice from '../quizzes/multiple-choice'
import QuizFillInTheBlank from '../quizzes/fill-in-the-blank'
import QuizFillInTheBlankText from '../quizzes/fill-in-the-blank-text'
import QuizCategories from '../quizzes/categories'
import QuizOrdering from '../quizzes/ordering'
import QuizWrapper from '../quizzes/quiz-wrapper'

function QuizInline (props) {
  const {
    _key,
    blockKey,
    title,
    content,
  } = props

  const [totalNumCorrect, setTotalNumCorrect] = useState(0);
  const [totalNum, setTotalNum] = useState(0);
  const [quizNumAnswered, setQuizNumAnswered] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if(quizNumAnswered === totalNum) {
      
    }
    setIsQuizFinished(true)
  }

  const quizContent = (content || [])
    .map((c, i) => {
      let el = null;
      switch (c._type) {
        case "quizMultipleChoice":
          el = (
              <QuizMultipleChoice  
                {...c} 
                blockKey={blockKey} 
                setTotalNum={setTotalNum} 
                setQuizNumAnswered={setQuizNumAnswered} 
                isQuizFinished={isQuizFinished}
              />
          );
          break;
        case "quizFillBlank":
          el = (
              <QuizFillInTheBlank
                {...c} 
                blockKey={blockKey} 
                setTotalNum={setTotalNum} 
                setQuizNumAnswered={setQuizNumAnswered} 
                isQuizFinished={isQuizFinished}
              />
          );
          break;
        case "quizFillBlankText":
          el = (
              <QuizFillInTheBlankText
                {...c} 
                blockKey={blockKey} 
                setTotalNum={setTotalNum} 
                setQuizNumAnswered={setQuizNumAnswered} 
                isQuizFinished={isQuizFinished}
              />
          );
          break;
        case "quizCategories":
          el = (
              <QuizCategories 
                {...c} 
                blockKey={blockKey} 
                setTotalNum={setTotalNum} 
                setQuizNumAnswered={setQuizNumAnswered} 
                isQuizFinished={isQuizFinished}
              />
          );
          break;
        case "quizOrdering":
          el = (
              <QuizOrdering
                {...c} 
                blockKey={blockKey} 
                setTotalNum={setTotalNum} 
                setQuizNumAnswered={setQuizNumAnswered} 
                isQuizFinished={isQuizFinished}
              />
          );
          break;
        default:
          el = null;
      }
      return (
        <QuizWrapper 
          key={c._key} 
          {...c} 
          isQuizFinished={isQuizFinished} 
          setTotalNumCorrect={setTotalNumCorrect}
        >
          {el}
        </QuizWrapper>
      )
    });

  const renderMeta = () => {
    if(!isQuizFinished) {
      return `${quizNumAnswered}/${totalNum} answered`
    } else {
      return `Total: ${totalNumCorrect}/${totalNum}`
    }
  }


  return (
    <div className={styles.root}>
      <input className={styles.trigger} id={blockKey} type="checkbox" />
      <label htmlFor={blockKey} className={styles.header}>
        <h3 className={styles.headerTitle}>Quiz</h3>
        <RiAddFill />
      </label>
      <div className={styles.quizWrapper}>
        <div className={styles.quizHeader}>
          <h3 className={styles.quizTitle}>{title}</h3>
          <p className={styles.quizMeta}>{renderMeta()}</p>
        </div>
        {quizContent}
        <div className={styles.quizFooter}>
          <p className={styles.quizMeta}>{renderMeta()}</p>
        </div>
        {!isQuizFinished && (
          <button 
            className={cn(
              buttonStyles.button, 
              buttonStyles.buttonLarge,
              styles.submit
            )}
            onClick={(e) => handleSubmit(e)}
          >
            Finish
          </button>
        )}  
      </div>
    </div>
  )
}

export default QuizInline