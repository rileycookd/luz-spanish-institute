import React from 'react'
import * as styles from './info-block.module.css'
import BlockText from './block-text'
import Testimonial from './testimonial'
import { buildImageObj, cn } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

function infoBlock ({images, description, subtitle, title, reverse}) {

  const imageList = images.map((i) => (
    <img
      className={styles.image}
      src={imageUrlFor(buildImageObj(i))
        .width(400)
        .height(400)
        .auto("format")
        .url()}
      alt={i.alt}
    />
  ))

  const imageContainer = (
    <div className={styles.imageContainer}>
      {imageList}
    </div>
  )


  const infoBox = (
    <div className={reverse ? cn(styles.infoBox, styles.reverse) : styles.infoBox}>
      {title && (
        <h4 className={styles.title}>{title}</h4>
      )}
      {subtitle && (
        <p className={styles.subtitle}>{subtitle}</p>
      )}
      {description && (
        <div className={styles.info}>
          <BlockText blocks={description} />
        </div>
      )}
    </div>
  )

  return (
    <div className={styles.root}>
      {reverse ? imageContainer : infoBox}
      {reverse ? infoBox : imageContainer}
    </div>
  )
}

export default infoBlock