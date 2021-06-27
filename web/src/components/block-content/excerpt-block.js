import React from 'react'
import * as styles from './excerpt-block.module.css'

function ExcerptBlock ({ content }) {
  
  return (
    <div className={styles.root}>
      {content && <p>{content}</p>}
    </div>
  )
}

export default ExcerptBlock