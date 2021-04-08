import React from 'react'
import { ImArrowRight2 as ArrowIcon } from 'react-icons/im'
import * as styles from './preview-info-card.module.css'
import { buildImageObj } from "../lib/helpers"
import { imageUrlFor } from "../lib/image-url"
import { Link } from 'gatsby'

function InfoCardPreview ({title, excerpt, image, slug}) {
  return (
    <Link className={styles.root} to={`/classes/${slug.current}`}>
      {image && image.asset && (
        <img
          className={styles.thumbnail}
          src={imageUrlFor(buildImageObj(image))
            .width(400)
            .height(Math.floor((9 / 16) * 400))
            .auto("format")
            .url()}
          alt={image.alt}
        />
      )}
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.excerpt}>{excerpt}</p>
      </div>
      <div className={styles.link}>
        <span className={styles.line}></span>
        <div className={styles.icon}>
          <ArrowIcon />
        </div>
      </div>
    </Link>
  )
}

export default InfoCardPreview