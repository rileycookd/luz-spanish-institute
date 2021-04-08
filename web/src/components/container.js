import React from 'react'

import * as styles from './container.module.css'

const Container = ({ children, offset }) => {
  return <div style={offset} className={styles.root}>{children}</div>
}

export default Container
