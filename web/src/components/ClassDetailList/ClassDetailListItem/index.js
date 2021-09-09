import React, { useEffect, useState } from 'react'
import * as styles from './style.module.css'
import { format, parseISO } from 'date-fns'
import { BsThreeDotsVertical as DotsIcon } from 'react-icons/bs'
import Homework from './Homework'
import Resource from './Resource'

// rename to ClassListItem ?

function ClassDetail (props) {
  const {
    classData
  } = props

  const [currentContent, setCurrentContent] = useState([])
  console.log(classData)

  useEffect(() => {
    if(classData.content) {
      setCurrentContent(
        classData.content.map(c => {
          let el = null
          switch (c._type) {
            case 'resource':
              el = <Resource {...c} />
              break;
            case 'homework':
              el = <Homework {...c} />
              break;
            default: 
              el = null
          }
          return el;
        })
      )
    } 
  }, [classData.content])



  

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h3 className={styles.date}>{format(parseISO(classData.start), 'EEEE, dd LLLL')}</h3>
        {classData.title && (<h5 className={styles.title}>{classData.title}</h5>)}
        <DotsIcon className={styles.dots} />
      </div>
      {classData.content && (
        <div className={styles.content}>
          {currentContent}
        </div>
      )}
      
    </div>
  )
}

export default ClassDetail