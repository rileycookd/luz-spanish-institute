import React from 'react'
import * as styles from './faq.module.css'
import { IoChevronForward as DrawerIcon } from 'react-icons/io5'

function FAQ ({questions}) {
  return (
    <div className={styles.root}>
      {questions.map((q, i) => (
        <div key={q._key} className={styles.drawer}>
          <input className={styles.drawerTrigger} id={`trigger${i}`} type="checkbox" />
          <DrawerIcon />
          <div className={styles.infoWrapper}>
            <label className={styles.question} for={`trigger${i}`}>{q.question}</label>
            <div className={styles.answerWrapper}>
              <p className={styles.answer}>
                {q.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FAQ