import React from 'react'
import { BsPeople as StudentsIcon } from 'react-icons/bs'
import * as styles from './post-preview.module.css'
import { buildImageObj, getClassSizeString, getClassStartingPrice } from "../lib/helpers"
import { imageUrlFor } from "../lib/image-url"
import { Link } from 'gatsby'
import { propTypes } from '@sanity/block-content-to-react'


function PostPreview (props) {
  const {
    title,
    excerpt,
    description,
    image,
    slug,
    pathPrefix,
    category,
    _type,
    children,
    min,
    max,
    pricing
  } = props

  const renderMeta = () => {
    if(_type === 'resource') {
      return (
        <h5 className={styles.metaItemLabel}>{category.title}</h5>
      )
    }
    if(_type === 'classType') {
      
      return (
        <>
          <div className={styles.metaItem}>
            <StudentsIcon />
            <p className={styles.metaItemInfo}>{getClassSizeString(min, max)}</p>
          </div>
          <p className={styles.metaItemInfo}>starting at: <span>${getClassStartingPrice(pricing)}</span></p>
        </>
      )
    }
  }

  const fullPath = pathPrefix
    ? `/${pathPrefix}/${slug.current}`
    : `/${slug.current}`

  return (
    <Link className={styles.root} to={fullPath}>
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
          <p className={styles.excerpt}>{excerpt || description}</p>
        </div>
        <div className={styles.meta}>
            {renderMeta()}
        </div>
      </div>
    </Link>
  )
}

export default PostPreview