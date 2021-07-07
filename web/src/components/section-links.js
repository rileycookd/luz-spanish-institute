import React from 'react'
import * as styles from './section-links.module.css'
import { AnchorLink } from "gatsby-plugin-anchor-links";

function SectionLinks (props) {
  const {
    anchorIds,
    path,
  } = props

  return (
    <div className={styles.root}>
      <h3 className={styles.header}>Lesson Guide</h3>
      <ul className={styles.list}>
        {anchorIds && anchorIds.map(a => (
          <li className={styles.listItem}>
          <AnchorLink to={`${path.replace(/\/$/, '')}#${`title${a.key}`}`} className={styles.anchorLink} title={a.value}>
            <span className={styles.sectionTitle}>{a.value}</span>
          </AnchorLink>
        </li>
        ))}
      </ul>
    </div>
  )
}

export default SectionLinks