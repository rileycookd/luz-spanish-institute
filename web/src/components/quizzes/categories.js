import React, { useEffect, useState, useRef } from 'react'
import * as styles from './categories.module.css'
import { cn } from '../../lib/helpers'
import { IoTrashBin, IoClose } from 'react-icons/io5'

function QuizCategories (props) {
  const {
    blockKey,
    categories,
    isQuizFinished,
    setNumPoints,
    setTotalNum,
    setNumCorrect,
    setQuizNumAnswered,
  } = props

  const [options, setOptions] = useState([])
  const [correctCounter, setCorrectCounter] = useState({previous: 0, current: 0})
  const [selectedOption, setSelectedOption] = useState(null)
  
  const handleSelectOption = (i) => {
    if(!isQuizFinished) {
      if(selectedOption !== i) {
        setSelectedOption(i)
      } else {
        setSelectedOption(null)
      }
    }
  }

  const handleSelectCategory = (title) => {
    if(selectedOption !== null) {
      const newOptions = options.map((o, i) => {
        if(i === selectedOption) {
          o.location = title
          if(o.location === o.category) {
            setCorrectCounter(prevState => (
              {
                previous: prevState.current, 
                current: prevState.current + 1
              }
            ))
          }
          return o
        }
        return o
      })
      setOptions([...newOptions])
      setQuizNumAnswered(prevState => prevState + 1)
      setSelectedOption(null)
    }
  }

  const handleRemoveOption = (ind) => {
    if(selectedOption === null && !isQuizFinished) {
      const newOptions = options.map((o, i) => {
        if(i === ind) {
          if(o.location === o.category) {
            setCorrectCounter(prevState => (
              {
                previous: prevState.current, 
                current: prevState.current - 1
              }
            ))
          }
          o.location = ''
          return o
        }
        return o
      })
      setOptions([...newOptions])
      setQuizNumAnswered(prevState => prevState - 1)
    }
  }

  useEffect(() => {
    const numChange = correctCounter.current - correctCounter.previous
    setNumCorrect(prevState => prevState + numChange)
  }, [correctCounter])

  useEffect(() => {
    const items = []
    categories.map(c => {
      c.content.map(item => {
        items.push({
          value: item,
          category: c.title,
          location: '',
        })
      })
    })
    setOptions(items)
    setTotalNum(prevState => prevState + items.length)
    setNumPoints(prevState => prevState + items.length)

    return (items) => {
      setNumPoints(prevState => prevState - items.length);
      setTotalNum(prevState => prevState - items.length);
    };
  }, [categories])

  const renderOptionsBank = (o, i) => {
    if(!o.location) {
      return (
        <p 
          key={`${blockKey}-option-${o.value}-${i}`} 
          className={cn(
            styles.option, 
            selectedOption === i && styles.selected, 
            isQuizFinished && styles.disabled
          )}
          onClick={() => handleSelectOption(i)}
        >
          {o.value}
        </p>
      )
    }
  }

  const renderCategoryBank = (o, i, catTitle) => {
    if(o.location === catTitle) {
      return (
        <div 
          key={`${blockKey}-answer-${o.value}-${i}`} 
          className={cn(styles.categoryContainerRow, selectedOption !== null && styles.selectMode)}
        >
          {isQuizFinished
          ? (
            <IoClose style={o.category === catTitle ? {visibility: 'hidden' } : {}} />
          )
          : (
            <IoTrashBin onClick={() => handleRemoveOption(i)} />
          )
          }
          
          <p className={styles.categoryOption}>{o.value}</p>
        </div>
      )
    }
  }

  const renderCategory = (c) => {
    return (
      <div 
        key={`${blockKey}-category-${c._key}`} 
        className={cn(styles.category, selectedOption !== null && styles.selectMode)}
        onClick={() => handleSelectCategory(c.title)}
      >
        <div className={styles.categoryHeader}>
          <h5 className={styles.categoryTitle}>{c.title}</h5>
        </div>
        <div className={styles.categoryContainer}>
          {options.map((o, i) => (
            renderCategoryBank(o, i, c.title)
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.optionsContainer}>
        {options.length && options.map((o, i) => (
          renderOptionsBank(o, i)
        ))}
      </div>
      {categories && categories.length && categories.map(c => (
        renderCategory(c)
      ))}
    </div>
  )
}

export default QuizCategories