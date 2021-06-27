import React from 'react'
import BlockContent from './block-content'
import { FaFacebookF as FacebookIcon, FaTwitter as TwitterIcon } from 'react-icons/fa'
import { MdMail as MailIcon, MdContentCopy as LinkIcon } from 'react-icons/md'

import { format, distanceInWords, differenceInDays } from 'date-fns'
import * as styles from './article.module.css'

function Article (props) {
  const { 
    _rawContent, 
    author, 
    categories, 
    title, 
    mainImage, 
    _createdAt,
    _updatedAt } = props

    // const wordCount = _rawContent.filter(child => child.children).map(child => child.children.map(child => child.text).join(" ")).join(" ").split(" ").length
    // const readTime = Math.round(wordCount / 200)

  
  return (
    <article className={styles.root}>
      {/* {mainImage && mainImage.asset && (
        <div className={styles.mainImage}>
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit('crop')
              .url()}
            alt={mainImage.alt}
          />
        </div>
      )} */}
        <div className={styles.mainContent}>
          {_rawContent && <BlockContent blocks={_rawContent} />}
          <div className={styles.footer}>
              {/* <p className={styles.updatedAt}>
                Updated: {differenceInDays(new Date(_updatedAt), new Date()) < 7
                ? `${distanceInWords(new Date(_updatedAt), new Date())} ago`
                : format(new Date(_updatedAt), 'Do MMM YYYY')}
              </p> */}
              <hr/>
              <div className={styles.social}>
                <FacebookIcon />
                <TwitterIcon />
                <MailIcon />
                <LinkIcon />
              </div>
          </div>
        </div>
    </article>
  )
}

export default Article

