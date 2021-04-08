import React from 'react'
import { BsPeople as StudentsIcon } from 'react-icons/bs'
import * as styles from './class-preview.module.css'
import { buildImageObj } from "../lib/helpers"
import { imageUrlFor } from "../lib/image-url"
import { Link } from 'gatsby'

function ClassPreview ({title, excerpt, image, slug}) {
  return (
    <Link className={styles.root} to={`/classes/${slug.current}`}>
      {image && image.asset && (
        <img
          className={styles.thumbnail}
          src={imageUrlFor(buildImageObj(image))
            .width(400)
            .height(Math.floor((3 / 4) * 400))
            .auto("format")
            .url()}
          alt={image.alt}
        />
      )}
      <div className={styles.content}>
        <div className={styles.titles}>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.excerpt}>{excerpt}</p>
        </div>
        <div className={styles.meta}>
            <div className={styles.metaItem}>
              <StudentsIcon />
              <p className={styles.metaItemInfo}>1-3 students</p>
            </div>
            <p className={styles.metaItemInfo}>starting at: <span>$15</span></p>
        </div>
      </div>
    </Link>
  )
}

export default ClassPreview