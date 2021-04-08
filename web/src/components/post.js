import { format, distanceInWords, differenceInDays } from 'date-fns'
import React from 'react'
import { FaFacebookF as FacebookIcon, FaTwitter as TwitterIcon } from 'react-icons/fa'
import { MdMail as MailIcon, MdContentCopy as LinkIcon } from 'react-icons/md'
import BlockContent from './block-content'
import Container from './container'

import styles from './post.module.css'


function Post (props) {
  const { _rawBody, authors, categories, title, mainImage, publishedAt, _updatedAt } = props
  const wordCount = _rawBody.filter(child => child.children).map(child => child.children.map(child => child.text).join(" ")).join(" ").split(" ").length
  const readTime = Math.round(wordCount / 200)
  console.log(readTime);
  
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
      <PostHeader readTime={readTime} {...props} style={{height: `92vh`}}/>
      <Container offset={{position: `relative`, top: `-30px`, left: `0px`, backgroundColor: `white`}}>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            {_rawBody && <BlockContent blocks={_rawBody} />}
            <div className={styles.footer}>
                <p className={styles.updatedAt}>
                  Updated: {differenceInDays(new Date(_updatedAt), new Date()) < 7
                  ? `${distanceInWords(new Date(_updatedAt), new Date())} ago`
                  : format(new Date(_updatedAt), 'Do MMM YYYY')}
                </p>
                <hr/>
                <div className={styles.social}>
                  <FacebookIcon />
                  <TwitterIcon />
                  <MailIcon />
                  <LinkIcon />
                </div>
            </div>
          </div>
          {/* <aside className={styles.metaContent}>
            <p>Photo: {mainImage.caption}</p>
            <p>Credit: {mainImage.credit}</p>


            {authors && <RoleList items={authors} title='Authors' />}
            {categories && (
              <div className={styles.categories}>
                <h3 className={styles.categoriesHeadline}>Categories</h3>
                <ul>
                  {categories.map(category => (
                    <li key={category._id}>{category.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside> */}
        </div>
      </Container>
    </article>
  )
}

export default Essay
