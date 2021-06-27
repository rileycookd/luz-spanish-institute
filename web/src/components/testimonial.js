import React from 'react'
import * as styles from './testimonial.module.css'
import { ImQuotesLeft as QuoteIcon } from 'react-icons/im'
import { IoLocationSharp as LocationIcon } from 'react-icons/io5'
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

function Testimonial ({ student, quote }) {

  return (
    <div className={styles.root}>
      <QuoteIcon className={styles.icon} />
      <div className={styles.content}>
        <p className={styles.quote}>{quote}</p>
        <div className={styles.bio}>
        <img
          className={styles.bioPic}
          src={imageUrlFor(buildImageObj(student.image))
            .width(400)
            .height(Math.floor((3 / 4) * 400))
            .auto("format")
            .url()}
          alt={student.image.alt}
        />
          <div className={styles.bioContent}>
            <h6 className={styles.bioName}>{student.name}</h6>
            <div className={styles.bioLocation}>
              <LocationIcon />
              <h6 className={styles.bioLocationTitle}>{student.city}, {student.country}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial