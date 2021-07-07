import React, { useState, useEffect } from 'react';
import * as styles from './testimonial-block.module.css' 
import Testimonial from './testimonial'
import { cn } from '../lib/helpers'
import { ImArrowRight2 as RightArrowIcon, ImArrowLeft2 as LeftArrowIcon } from 'react-icons/im'


function TestimonialBlock ({testimonials, title}) {
 
  const [slides, setSlides] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    let newState = []
    let slidePair = []
    testimonials.map((t, i) => {
      if(slidePair.length === 2) {
        newState.push(slidePair)
        slidePair = []
        slidePair.push(t)
      } else {
        slidePair.push(t)
      }
    })
    if(slidePair.length) newState.push(slidePair)
    setSlides([...newState])
  }, [testimonials])

  const handlePrevious = () => {
    if(currentSlide === 0) {
      setCurrentSlide(slides.length - 1)
    } else {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleSelect = (i) => {
    if(currentSlide !== i) {
      setCurrentSlide(i)
    }
  }

  const handleNext = () => {
    if(currentSlide === slides.length - 1) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(currentSlide + 1)
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.content}>
          {slides && slides.length && slides[currentSlide].map((t) => (
            <Testimonial key={t._key} {...t} />
          ))}
        </div>
        {slides.length > 1 && (
          <div className={styles.control}>
            <button className={styles.arrow} onClick={() => handlePrevious()}><LeftArrowIcon /></button>
            {slides.map((s,i) => (
              <button 
                className={cn(styles.button, currentSlide === i && styles.selected)}
                onClick={() => handleSelect(i)}
              ></button>
            ))}
            <button className={styles.arrow} onClick={() => handleNext()}><RightArrowIcon /></button>
          </div>
        )}   
      </div>
    </div>
  )
}

export default TestimonialBlock