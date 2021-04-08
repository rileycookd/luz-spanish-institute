import React from 'react'
import InfoCardPreview from './preview-info-card'
import * as styles from './preview-grid.module.css'

function PreviewGrid ({title, classTypes}) {

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>
        {title}
      </h2>
      <div className={styles.grid}>
        {classTypes.map((c) => (
          <InfoCardPreview key={c._id} {...c} />
        ))}
      </div>
    </div>
  )
}

export default PreviewGrid