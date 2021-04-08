import React from 'react'
import ClassPreview from './class-preview'
import * as styles from './class-preview-grid.module.css'
import CTALink from './CTALink'

function ClassPreviewGrid ({title, subtitle, cta, classTypes}) {

  return (
    <div className={styles.root}>
      <div className={styles.cta}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && (
          <p className={styles.subtitle}>{subtitle}</p>
        )}
        {cta && (
          <CTALink {...cta} />
        )}
      </div>
      <div className={styles.grid}>
        {classTypes.map((c) => (
          <ClassPreview key={c._id} {...c} />
        ))}
      </div>
    </div>
  )
}

export default ClassPreviewGrid