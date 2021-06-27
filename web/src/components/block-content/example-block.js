import React from 'react'
import * as styles from './example-block.module.css'
import BlockContent from './index'

function ExampleBlock ({ content }) {
  
  return (
    <div className={styles.root}>
      {content && <BlockContent blocks={content} />}
    </div>
  )
}

export default ExampleBlock