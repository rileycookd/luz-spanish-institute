import React, { useState, useEffect } from 'react'
import BlockContent from './block-content'
import { imageUrlFor } from '../lib/image-url'
import { buildImageObj } from '../lib/helpers'
import SocialShareLinks from './social-share-links'

import { format, parseISO, distanceInWords, differenceInDays } from 'date-fns'
import * as styles from './article.module.css'

function Article (props) {
  const { 
    _rawContent, 
    author, 
    categories, 
    url,
    title, 
    setAnchorIds,
    description,
    image, 
    _createdAt,
    _updatedAt } = props

  useEffect(() => {
    console.log(_rawContent)
    const ids = _rawContent
      .filter(block => block.style && block.style === "h2" && block.children[0].text)
      .map(block => ({key: block.children[0]._key, value: block.children[0].text}))
    setAnchorIds(ids)
  }, [_rawContent])
  
  return (
    <article className={styles.root}>
        <div className={styles.mainContent}>
          <div className={styles.metaContent}>
            <h5 className={styles.metaTitle}>
              <span className={styles.faded}>By</span>
              {author.name}
            </h5>
            <div className={styles.social}>
              <SocialShareLinks title={title} url={url} />
            </div>
          </div>
          {image && image.asset && (
            <div className={styles.image}>
              <img
                src={imageUrlFor(buildImageObj(image))
                  .width(800)
                  .height(Math.floor((9 / 16) * 800))
                  .fit('crop')
                  .url()}
                alt={image.alt}
              />
            </div>
          )}
          {description && (
            <p className={styles.description}>{description}</p>
          )}
          <p className={styles.date}>{format(parseISO(_createdAt), "dd MMM yyyy")}</p>
          <hr className={styles.divider} />
          <div className={styles.blockContent}>
            {_rawContent && <BlockContent blocks={_rawContent} />}
          </div>
          <hr className={styles.divider} style={{marginTop: '40px'}} />
          <div className={styles.metaContent}>
            <div className={styles.social}>
              <SocialShareLinks title={title} url={url} />
            </div>
          </div>
        </div>
    </article>
  )
}

export default Article

