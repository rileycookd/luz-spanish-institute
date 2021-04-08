import React from 'react';
import * as styles from './testimonial-block.module.css' 
import Testimonial from './testimonial'

function TestimonialBlock ({testimonials, title}) {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.content}>
          {testimonials && testimonials.map((t) => (
            <Testimonial {...t} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestimonialBlock